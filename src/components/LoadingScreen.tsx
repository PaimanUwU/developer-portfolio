import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const INITIAL_LOAD_DURATION = 2000; // 2 seconds for first page load
const PAGE_TRANSITION_DURATION = 700; // 0.7 seconds for switching pages

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const showStartTimeRef = useRef<number>(Date.now());
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isInitialLoadRef = useRef<boolean>(true);

  const startHideSequence = () => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }

    const minDuration = isInitialLoadRef.current
      ? INITIAL_LOAD_DURATION
      : PAGE_TRANSITION_DURATION;

    const elapsed = Date.now() - showStartTimeRef.current;
    const remainingTime = Math.max(0, minDuration - elapsed);

    hideTimerRef.current = setTimeout(() => {
      setIsVisible(false);
      isInitialLoadRef.current = false;
      hideTimerRef.current = null;
    }, remainingTime);
  };

  const showLoading = () => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
    isInitialLoadRef.current = false;
    showStartTimeRef.current = Date.now();
    setIsVisible(true);
  };

  useEffect(() => {
    // 1. Initial Page Load handling
    if (document.readyState === "complete") {
      startHideSequence();
    } else {
      const handleLoad = () => startHideSequence();
      window.addEventListener("load", handleLoad, { once: true });
    }

    // 2. Astro ClientRouter Navigation events
    const handleBeforePreparation = () => {
      showLoading();
    };

    const handlePageLoad = () => {
      startHideSequence();
    };

    document.addEventListener("astro:before-preparation", handleBeforePreparation);
    document.addEventListener("astro:page-load", handlePageLoad);

    return () => {
      document.removeEventListener("astro:before-preparation", handleBeforePreparation);
      document.removeEventListener("astro:page-load", handlePageLoad);
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-white pointer-events-auto select-none"
          aria-live="polite"
          aria-busy="true"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col items-center justify-center gap-7"
          >
            <img
              src="/Branding-Logo.svg"
              alt="Paiman Logo"
              className="w-[72px] h-[72px] object-contain block"
              width={72}
              height={72}
              loading="eager"
            />
            <div className="w-4 h-4 flex items-center justify-center">
              <motion.div
                className="w-3.5 h-3.5 rounded-full border-[1.5px] border-[#151D20]/20 border-t-[#151D20]"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.85, ease: "linear" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
