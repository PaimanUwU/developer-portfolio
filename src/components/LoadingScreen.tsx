import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

// ---- Look & feel (tweak these) ---------------------------------------------
const COLUMNS = 5; // number of vertical strips
const PANEL_COLOR = "#151D20"; // strip color
const COLUMN_DURATION = 0.45; // seconds for one strip to fully cover / clear
const COLUMN_STAGGER = 0.18; // seconds between neighbouring strips
const EASE: [number, number, number, number] = [0.45, 0, 0.55, 1];
const RESPECT_REDUCED_MOTION = false; // true = fade instead of sweep when the OS asks for reduced motion

// ---- Timing (ms) -------------------------------------------------------------
const SWEEP_MS = ((COLUMNS - 1) * COLUMN_STAGGER + COLUMN_DURATION) * 1000;
const INITIAL_LOAD_DURATION = 2000; // min time shown on first page load
const PAGE_TRANSITION_DURATION = SWEEP_MS + 300; // min time per navigation
const MAX_DURATION = 10000; // safety net: never stay up longer than this
const COVER_WAIT_LIMIT = SWEEP_MS + 1500; // max time navigation waits for the cover

// Each strip delays itself by its index, so the sweep always runs left → right.
// originY flips instantly (duration 0) so strips grow in from the top and
// exit toward the bottom, keeping the motion going in one direction.
const stripVariants: Variants = {
  cover: (i: number) => ({
    scaleY: 1,
    originY: 0,
    transition: {
      duration: COLUMN_DURATION,
      ease: EASE,
      delay: i * COLUMN_STAGGER,
      originY: { duration: 0, delay: i * COLUMN_STAGGER },
    },
  }),
  reveal: (i: number) => ({
    scaleY: 0,
    originY: 1,
    transition: {
      duration: COLUMN_DURATION,
      ease: EASE,
      delay: i * COLUMN_STAGGER,
      originY: { duration: 0, delay: i * COLUMN_STAGGER },
    },
  }),
};

// Reduced-motion fallback: still staggered left → right, but only fades.
const reducedStripVariants: Variants = {
  cover: (i: number) => ({
    opacity: 1,
    transition: { duration: 0.2, delay: i * 0.08 },
  }),
  reveal: (i: number) => ({
    opacity: 0,
    transition: { duration: 0.2, delay: i * 0.08 },
  }),
};

export default function LoadingScreen() {
  // If your OS has "reduce motion" / "animation effects off" enabled,
  // useReducedMotion() is true and the sweep becomes a fade. Set
  // RESPECT_REDUCED_MOTION to false to always play the full sweep.
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = RESPECT_REDUCED_MOTION && prefersReducedMotion;
  const [isVisible, setIsVisible] = useState(true);
  const [showContent, setShowContent] = useState(true);

  const showStartTimeRef = useRef<number>(Date.now());
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const safetyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isInitialLoadRef = useRef<boolean>(true);

  // The server-rendered overlay already covers the screen on first load.
  const isCoveredRef = useRef<boolean>(true);
  const coverWaitersRef = useRef<Array<() => void>>([]);

  const clearTimers = useCallback(() => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
    hideTimerRef.current = null;
    safetyTimerRef.current = null;
  }, []);

  const hide = useCallback(() => {
    clearTimers();
    isCoveredRef.current = false;
    isInitialLoadRef.current = false;
    setShowContent(false);
    setIsVisible(false);
  }, [clearTimers]);

  const startHideSequence = useCallback(() => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);

    const minDuration = isInitialLoadRef.current
      ? INITIAL_LOAD_DURATION
      : PAGE_TRANSITION_DURATION;

    const elapsed = Date.now() - showStartTimeRef.current;
    const remaining = Math.max(0, minDuration - elapsed);

    hideTimerRef.current = setTimeout(hide, remaining);
  }, [hide]);

  const showLoading = useCallback(
    (event: Event) => {
      clearTimers();
      showStartTimeRef.current = Date.now();
      setIsVisible(true);
      safetyTimerRef.current = setTimeout(hide, MAX_DURATION);

      // Hold the DOM swap until the strips fully cover the screen, so the page
      // never visibly changes underneath the sweep. The fetch still runs in
      // parallel, so this costs nothing if the network is slower.
      const nav = event as Event & { loader?: () => Promise<void> };
      if (!isCoveredRef.current && typeof nav.loader === "function") {
        const originalLoader = nav.loader;
        nav.loader = async () => {
          const covered = Promise.race([
            new Promise<void>((resolve) => {
              coverWaitersRef.current.push(resolve);
            }),
            new Promise<void>((resolve) =>
              setTimeout(resolve, COVER_WAIT_LIMIT),
            ),
          ]);
          await Promise.all([originalLoader(), covered]);
        };
      }
    },
    [clearTimers, hide],
  );

  // Called when the LAST strip finishes its cover animation.
  const handleSweepComplete = useCallback((definition: unknown) => {
    if (definition !== "cover") return;
    isCoveredRef.current = true;
    setShowContent(true);
    coverWaitersRef.current.splice(0).forEach((resolve) => resolve());
  }, []);

  useEffect(() => {
    // 1. Initial page load
    const onWindowLoad = () => startHideSequence();

    safetyTimerRef.current = setTimeout(hide, MAX_DURATION);

    if (document.readyState === "complete") {
      startHideSequence();
    } else {
      window.addEventListener("load", onWindowLoad, { once: true });
    }

    // 2. Astro ClientRouter navigation
    document.addEventListener("astro:before-preparation", showLoading);
    document.addEventListener("astro:page-load", startHideSequence);

    return () => {
      window.removeEventListener("load", onWindowLoad);
      document.removeEventListener("astro:before-preparation", showLoading);
      document.removeEventListener("astro:page-load", startHideSequence);
      clearTimers();
    };
  }, [startHideSequence, showLoading, hide, clearTimers]);

  // Lock page scroll while the overlay is up.
  useEffect(() => {
    if (!isVisible) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [isVisible]);

  return (
    <div
      className="fixed inset-0 z-[99999] overflow-hidden select-none"
      // Blocks clicks while covering; lets them through as soon as it reveals.
      style={{ pointerEvents: isVisible ? "auto" : "none" }}
      role="status"
      aria-live="polite"
      aria-busy={isVisible}
      aria-hidden={!isVisible}
    >
      {/* Strips: each one delays itself by index for a left→right sweep.   */}
      {/* initial={false}: the SSR'd overlay already covers the screen.     */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: COLUMNS }, (_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={reduceMotion ? reducedStripVariants : stripVariants}
            initial={false}
            animate={isVisible ? "cover" : "reveal"}
            // Only the LAST strip signals that the screen is fully covered.
            onAnimationComplete={(definition) => {
              if (i === COLUMNS - 1) handleSweepComplete(definition);
            }}
            className="absolute top-0 bottom-0 will-change-transform"
            style={{
              left: `${(i / COLUMNS) * 100}%`,
              // +1px overlap hides hairline seams between neighbouring strips
              width: `calc(${100 / COLUMNS}% + 1px)`,
              backgroundColor: PANEL_COLOR,
            }}
          />
        ))}
      </div>

      {/* Logo layer: fixed to the screen center, independent of the strips. */}
      <motion.div
        initial={false}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        {/* The logo box is the only flex child, so it is always dead center. */}
        <div className="relative w-[72px] h-[72px]">
          <img
            src="/Branding-Logo.svg"
            alt="Paiman Logo"
            // brightness-0 + invert turns the logo white for the dark strips.
            // Remove them if your logo already works on PANEL_COLOR.
            className="w-[72px] h-[72px] object-contain block brightness-0 invert"
            width={72}
            height={72}
            loading="eager"
            draggable={false}
          />

          {/* Spinner hangs below the logo without pushing it off-center. */}
          <div className="absolute left-1/2 top-full mt-7 -translate-x-1/2 w-4 h-4 flex items-center justify-center">
            <motion.div
              className="w-3.5 h-3.5 rounded-full border-[1.5px] border-white/25 border-t-white"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.85, ease: "linear" }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
