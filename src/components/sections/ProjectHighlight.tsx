import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useMotionValue,
  useSpring,
  useAnimationFrame,
  type MotionValue,
  AnimatePresence,
} from "framer-motion";
import { ExternalLink } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface ProjectCard {
  slug: string;
  title: string;
  description: string;
  stack: string[];
  status: "halt" | "working" | "finished";
  images: string[]; // project screenshots (blank white frames when empty)
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const projects: ProjectCard[] = [
  {
    slug: "portfolio",
    title: "Personal Portfolio",
    description:
      "A minimal, high-performance portfolio website built with Astro and styled with Tailwind CSS.",
    stack: ["Astro", "React", "Framer Motion", "Tailwind CSS"],
    status: "working",
    images: [],
  },
  {
    slug: "aestrisk",
    title: "Aesterisk UI",
    description:
      "Modern brutalist styled UI Component Library, the same UI design principle used in this portfolio.",
    stack: ["React Typescript", "Vite", "Tailwind CSS"],
    status: "working",
    images: [],
  },
  {
    slug: "seiri",
    title: "Seiri Project",
    description:
      "A modular, high-performance knowledge engine built for people whose brains have too many tabs open.",
    stack: ["Go", "Bubble-Tea", "Wails"],
    status: "working",
    images: [],
  },
  {
    slug: "uitm-uk-management",
    title: "UiTM UK Management",
    description:
      "A comprehensive management system built for UiTM UK using Oracle 26ai as the primary database.",
    stack: ["Laravel", "PHP", "Oracle 26ai", "Tailwind CSS"],
    status: "finished",
    images: [],
  },
  {
    slug: "infrastructure-reporting",
    title: "Infrastructure Reporting",
    description:
      "A reporting platform to streamline identifying and fixing infrastructure damages at UITMPG.",
    stack: ["Laravel", "PHP", "MySQL", "Tailwind CSS"],
    status: "halt",
    images: [],
  },
];

// ─── Fan layout ───────────────────────────────────────────────────────────────
// The outer cards sit lower than the middle one; the selected card lifts up.
const fanOffsets = [
  { rotate: -8, x: 0, y: 24 },
  { rotate: -4, x: 0, y: 4 },
  { rotate: 0, x: 0, y: 0 },
  { rotate: 4, x: 0, y: 4 },
  { rotate: 8, x: 0, y: 24 },
];

// ─── Responsive sizing ────────────────────────────────────────────────────────
// Below 768px the cards shrink and overlap more so the whole fan fits the screen.
const MOBILE_MAX = 767;

interface Metrics {
  mobile: boolean;
  cardW: number; // card width in px (height follows the 2:3 aspect ratio)
  step: number; // distance between card centres in the fan
  lift: number; // how far the selected card rises
  gap: number; // film strip padding + gap between frames
  zone: number; // phones: height reserved at the bottom for the card fan
}

function getMetrics(w: number): Metrics {
  if (w > MOBILE_MAX)
    return { mobile: false, cardW: 176, step: 160, lift: 48, gap: 18, zone: 0 };
  const cardW = 128;
  // Fit five cards into the width with a 16px margin each side
  const step = Math.round(
    Math.min(cardW - 16, Math.max(36, (w - 32 - cardW) / 4)),
  );
  // fan = bottom padding 32 + card height + lift + 16 breathing room
  return {
    mobile: true,
    cardW,
    step,
    lift: 36,
    gap: 12,
    zone: 32 + Math.round(cardW * 1.5) + 36 + 16,
  };
}

function useMetrics(): Metrics {
  const [m, setM] = useState<Metrics>(() => getMetrics(1280));
  useEffect(() => {
    const update = () =>
      setM((prev) => {
        const next = getMetrics(window.innerWidth);
        return prev.mobile === next.mobile &&
          prev.cardW === next.cardW &&
          prev.step === next.step
          ? prev
          : next;
      });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return m;
}

// ─── Film strip (dark band with white frames, auto-scrolling forever) ────────
const STRIP_SPEED = 60; // px per second

function FilmStrip({
  project,
  gap,
  vertical,
}: {
  project: ProjectCard;
  gap: number;
  vertical: boolean; // phones: frames stack and scroll upward, filling the height
}) {
  const base: (string | null)[] =
    project.images.length > 0 ? project.images : [null, null, null, null];

  // Each set has at least 4 frames so it is always longer than the visible window
  const set = Array.from(
    { length: Math.max(4, base.length) },
    (_, i) => base[i % base.length],
  );
  const copies = [0, 1, 2];

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const setRef = useRef<HTMLDivElement>(null);
  const setSize = useRef(0);
  const paused = useRef(false);

  // Track the length of one full set of frames (width or height depending on direction)
  useEffect(() => {
    x.set(0);
    y.set(0);
    const el = setRef.current;
    if (!el) return;
    const measure = () => {
      setSize.current = vertical ? el.offsetHeight : el.offsetWidth;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [vertical, x, y]);

  // Move every frame; once one set has passed, jump back by exactly one set
  useAnimationFrame((_, delta) => {
    if (paused.current || !setSize.current) return;
    const mv = vertical ? y : x;
    let next = mv.get() - (STRIP_SPEED * Math.min(delta, 64)) / 1000;
    if (next <= -setSize.current) next += setSize.current;
    mv.set(next);
  });

  return (
    <div
      className={`w-full overflow-hidden rounded-lg bg-[#151d20] ${vertical ? "h-full" : ""}`}
      style={
        vertical ? { padding: gap } : { paddingBlock: gap, paddingLeft: gap }
      }
    >
      {/* Clip window: frames disappear at the padding edge, like film */}
      <div
        className={`overflow-hidden ${vertical ? "h-full" : ""}`}
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => (paused.current = false)}
      >
        <motion.div
          style={vertical ? { y } : { x }}
          className={`flex will-change-transform ${vertical ? "w-full flex-col" : "w-max"}`}
        >
          {copies.map((c) => (
            <div
              key={c}
              ref={c === 0 ? setRef : undefined}
              aria-hidden={c > 0}
              className={`flex flex-none ${vertical ? "w-full flex-col" : ""}`}
            >
              {set.map((src, idx) => (
                <div
                  key={idx}
                  className="film-frame aspect-video flex-none overflow-hidden rounded-[10px] bg-white"
                  style={
                    vertical
                      ? { width: "100%", marginBottom: gap }
                      : { marginRight: gap }
                  }
                >
                  {src && (
                    <img
                      src={src}
                      alt={`${project.title} screenshot ${(idx % base.length) + 1}`}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// ─── Single Card UI ───────────────────────────────────────────────────────────
function ProjectCardUI({
  project,
  index,
  total,
  spread,
  isSelected,
  onClick,
  fanStyle,
  metrics,
}: {
  project: ProjectCard;
  index: number;
  total: number;
  spread: MotionValue<number>; // 0 = one pile, 1 = fully fanned out
  isSelected: boolean;
  onClick: () => void;
  fanStyle: { rotate: number; x: number; y: number };
  metrics: Metrics;
}) {
  const { cardW, step, lift } = metrics;

  // Pull each card back to the centre of the pile, then release it as `spread` grows
  const offsetMV = useMotionValue((index - (total - 1) / 2) * step);
  useEffect(() => {
    offsetMV.set((index - (total - 1) / 2) * step);
  }, [index, total, step, offsetMV]);
  const x = useTransform([spread, offsetMV], (latest) => {
    const [v, o] = latest as number[];
    return -o * (1 - v);
  });
  const rotate = useTransform(spread, (v) => -fanStyle.rotate * (1 - v));
  const y = useTransform(spread, (v) => -fanStyle.y * (1 - v));
  // Cards can't be clicked or hovered while they are still in the pile
  const pointerEvents = useTransform(spread, (v) =>
    v < 0.9 ? "none" : "auto",
  );

  return (
    <motion.div
      style={{
        x,
        y,
        rotate,
        pointerEvents,
        marginLeft: index === 0 ? 0 : step - cardW,
      }}
      className={`relative flex-none ${isSelected ? "z-20" : "z-10"}`}
    >
      <motion.div
        layout
        onClick={onClick}
        style={{ width: cardW }}
        className={`
          relative aspect-[2/3] cursor-pointer select-none
          rounded-xl bg-[#151d20] p-1.5 transition-shadow duration-300
          ${isSelected ? "ring-4 ring-blue-500" : "hover:shadow-xl"}
        `}
        animate={{
          rotate: isSelected ? 0 : fanStyle.rotate,
          x: fanStyle.x,
          y: isSelected ? -lift : fanStyle.y,
        }}
        whileHover={
          isSelected
            ? {}
            : {
                y: fanStyle.y - 30,
                transition: { duration: 0.25, ease: "easeOut" },
              }
        }
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        {/* Inner face (the darker rim around it is the card's shell) */}
        <div className="flex h-full flex-col justify-between rounded-md bg-[#1c2427] p-1.5 text-white">
          {/* Top: stack chips */}
          <div className="flex flex-wrap content-start gap-x-1.5 gap-y-2">
            {project.stack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-white/20 bg-white/5 px-1.5 py-1 text-[9px] leading-[14px] text-gray-400"
              >
                {tech}
              </span>
            ))}
            {project.stack.length > 3 && (
              <span className="px-1.5 py-1 text-[9px] leading-[14px] text-gray-500">
                +{project.stack.length - 3}
              </span>
            )}
          </div>

          {/* Bottom: title + description */}
          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-bold leading-tight tracking-tight">
              {project.title}
            </h3>
            <p className="line-clamp-3 text-[9px] leading-relaxed text-gray-400">
              {project.description}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function ProjectHighlight() {
  const containerRef = useRef<HTMLDivElement>(null);
  const metrics = useMetrics();
  const { mobile } = metrics;
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Phase mapping across scroll progress:
  //  0.00 – 0.30  →  Quote text visible (fades in, stays)
  //  0.20 – 0.50  →  Cards fan in from below
  //  0.50 – 0.90  →  Cards + film strip sticky (interactive zone)
  //  0.90 – 1.00  →  Exit / fade out

  const quoteOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.25, 0.35],
    [0, 1, 1, 0],
  );
  const quoteY = useTransform(
    scrollYProgress,
    [0, 0.1, 0.25, 0.35],
    [60, 0, 0, -40],
  );

  const cardsOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.35, 0.85, 0.95],
    [0, 1, 1, 0],
  );
  const cardsY = useTransform(scrollYProgress, [0.2, 0.35], [120, 0]);
  const cardsScale = useTransform(scrollYProgress, [0.2, 0.35], [0.85, 1]);

  // Cards first arrive as one pile, then spread into the fan as you keep scrolling
  const spreadRaw = useTransform(scrollYProgress, [0.32, 0.5], [0, 1]);
  const spread = useSpring(spreadRaw, {
    stiffness: 140,
    damping: 26,
    mass: 0.6,
  });

  // Reset selection when user scrolls away from the interactive zone
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.2 || latest > 0.95) {
      setSelectedProject(null);
    }
  });

  const activeProject = projects.find((p) => p.slug === selectedProject);

  return (
    <div ref={containerRef} className="relative h-[450vh]">
      {/* Film strip frame size */}
      <style>{`
        .film-frame {
          /* 45vw wide, but shrinks on short screens so it never hits the cards */
          width: max(240px, min(45vw, calc((100svh - 475px) * 16 / 9)));
        }
      `}</style>

      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* ── Scroll Progress Bar on Top ── */}
        <div className="absolute top-0 left-0 right-0 z-40 h-1 bg-gray-200/80">
          <motion.div
            style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
            className="h-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"
          />
        </div>

        {/* ── Quote / Headline ── */}
        <motion.div
          style={{ opacity: quoteOpacity, y: quoteY }}
          className="absolute inset-0 flex items-center px-8 tablet:px-24"
        >
          <h2 className="max-w-4xl text-5xl font-black leading-[1.05] tracking-tighter text-gray-900 tablet:text-7xl desktop:text-8xl">
            Here are some
            <br />
            of my work
            <br />
            <span className="text-blue-500 drop-shadow-[0_10px_20px_rgba(59,130,246,0.35)]">
              highlight
            </span>
          </h2>
        </motion.div>

        {/* ── Film strip + cards layer ── */}
        <motion.div
          style={{ opacity: cardsOpacity, y: cardsY, scale: cardsScale }}
          className="absolute inset-0"
        >
          {/* Top: film strip + button (pinned to the top, never pushes the cards) */}
          <div
            className={`absolute inset-x-0 top-0 ${
              mobile ? "px-3 pt-[84px]" : "px-[18px] pt-[18px]"
            }`}
            style={mobile ? { bottom: metrics.zone } : undefined}
          >
            <AnimatePresence mode="wait">
              {activeProject && (
                <motion.div
                  key={activeProject.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className={`flex flex-col items-center ${mobile ? "h-full" : ""}`}
                >
                  {/* Desktop: left margin clears the side navbar. Phones: the strip fills the space between the menu button and the cards. */}
                  <div
                    className={`w-full ${mobile ? "min-h-0 flex-1" : "pl-[70px]"}`}
                  >
                    <FilmStrip
                      project={activeProject}
                      gap={metrics.gap}
                      vertical={mobile}
                    />
                  </div>

                  <motion.a
                    href={`/works/${activeProject.slug}`}
                    className={`${mobile ? "mt-3 shrink-0" : "mt-4"} inline-flex items-center gap-2 rounded-md bg-blue-500 px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-blue-600`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    View Project
                    <ExternalLink size={12} />
                  </motion.a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom: card fan, always pinned to the bottom */}
          <div
            className={`absolute inset-x-0 bottom-0 flex justify-center ${mobile ? "pb-8" : "pb-10"}`}
          >
            <div className="relative flex">
              {/* Tray the cards sit in */}
              <motion.div
                aria-hidden
                style={{
                  opacity: spread,
                  left: mobile ? -10 : -40,
                  right: mobile ? -10 : -40,
                  bottom: mobile ? -16 : -22,
                  height: mobile ? 52 : 68,
                }}
                className="absolute rounded-xl border border-gray-300 bg-gray-50"
              />
              {projects.map((project, idx) => (
                <ProjectCardUI
                  key={project.slug}
                  project={project}
                  index={idx}
                  total={projects.length}
                  spread={spread}
                  isSelected={selectedProject === project.slug}
                  onClick={() =>
                    setSelectedProject(
                      selectedProject === project.slug ? null : project.slug,
                    )
                  }
                  fanStyle={fanOffsets[idx] || { rotate: 0, x: 0, y: 0 }}
                  metrics={metrics}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
