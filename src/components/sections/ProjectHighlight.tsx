import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useMotionValue,
  useSpring,
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
  images: string[]; // full-screen backdrop images (placeholder shown when empty)
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
  // {
  //   slug: "uitm-uk-management",
  //   title: "UiTM UK Management",
  //   description:
  //     "A comprehensive management system built for UiTM UK using Oracle 26ai as the primary database.",
  //   stack: ["Laravel", "PHP", "Oracle 26ai", "Tailwind CSS"],
  //   status: "finished",
  //   images: [],
  // },
  // {
  //   slug: "infrastructure-reporting",
  //   title: "Infrastructure Reporting",
  //   description:
  //     "A reporting platform to streamline identifying and fixing infrastructure damages at UITMPG.",
  //   stack: ["Laravel", "PHP", "MySQL", "Tailwind CSS"],
  //   status: "halt",
  //   images: [],
  // },
];

// ─── Timing ───────────────────────────────────────────────────────────────────
const FADE_SECONDS = 0.8; // crossfade between images / projects
const SLIDE_INTERVAL_MS = 4500; // time each image stays before the next fades in

// ─── Scroll length ────────────────────────────────────────────────────────────
const SECTION_VH = 300; // total section height; scroll distance = this minus 100
const SPREAD_START = 0.1; // progress where the cards start leaving the pile
const SPREAD_END = 0.55; // progress where the fan is complete
const EXIT_START = 0.95; // past this the selection clears again

// ─── Fan layout ───────────────────────────────────────────────────────────────
// The outermost cards always tilt/drop by the same amount; the cards in between
// share that arc evenly, so the fan adapts to however many projects there are.
const MAX_TILT = 8; // rotation (deg) of the outermost cards
const MAX_DROP = 24; // how far (px) the outermost cards sit below the middle

function getFanStyle(index: number, total: number) {
  const half = (total - 1) / 2;
  if (half === 0) return { rotate: 0, x: 0, y: 0 }; // a single card stays flat
  const t = (index - half) / half; // -1 = leftmost, 0 = middle, 1 = rightmost
  return { rotate: t * MAX_TILT, x: 0, y: t * t * MAX_DROP };
}

// ─── Responsive sizing ────────────────────────────────────────────────────────
const MOBILE_MAX = 767;

interface Metrics {
  mobile: boolean;
  cardW: number; // card width in px (height follows the 2:3 aspect ratio)
  step: number; // distance between card centres in the fan
  lift: number; // how far the selected card rises
}

function getMetrics(w: number, total: number): Metrics {
  if (w > MOBILE_MAX) return { mobile: false, cardW: 176, step: 160, lift: 48 };
  const cardW = 128;
  // Fit every card into the width with a 16px margin each side
  const gaps = Math.max(1, total - 1);
  const step = Math.round(
    Math.min(cardW - 16, Math.max(36, (w - 32 - cardW) / gaps)),
  );
  return { mobile: true, cardW, step, lift: 36 };
}

function useMetrics(total: number): Metrics {
  const [m, setM] = useState<Metrics>(() => getMetrics(1280, total));
  useEffect(() => {
    const update = () =>
      setM((prev) => {
        const next = getMetrics(window.innerWidth, total);
        return prev.mobile === next.mobile &&
          prev.cardW === next.cardW &&
          prev.step === next.step
          ? prev
          : next;
      });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [total]);
  return m;
}

// ─── Full-screen backdrop (images crossfade into each other) ─────────────────
function Backdrop({ project }: { project: ProjectCard }) {
  const { images, slug, title } = project;
  const [i, setI] = useState(0);

  // Restart on project change, then cycle through its images
  useEffect(() => {
    setI(0);
    if (images.length < 2) return;
    const id = setInterval(
      () => setI((prev) => (prev + 1) % images.length),
      SLIDE_INTERVAL_MS,
    );
    return () => clearInterval(id);
  }, [slug, images.length]);

  return (
    <div className="absolute inset-0 bg-[#151d20]">
      <AnimatePresence initial={false}>
        {/* The new slide fades in on top; the old one stays fully opaque
            underneath until the fade is done, then is removed (no dip). */}
        <motion.div
          key={`${slug}-${i}`}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { delay: FADE_SECONDS, duration: 0.01 },
          }}
          transition={{ duration: FADE_SECONDS, ease: "easeInOut" }}
        >
          {images.length > 0 ? (
            <img
              src={images[i % images.length]}
              alt={`${title} screenshot ${(i % images.length) + 1}`}
              className="h-full w-full object-cover"
            />
          ) : (
            // Placeholder until real screenshots are added
            <div className="flex h-full w-full items-center justify-center bg-neutral-100">
              <span className="px-6 text-center text-4xl font-bold tracking-tight text-neutral-300 md:text-7xl">
                {title}
              </span>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Keep the menu button (top) and the cards (bottom) readable over any image */}
      {/* <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/40 to-transparent" /> */}
      {/* <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-black/50 to-transparent" /> */}
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
        initial={false}
        onClick={onClick}
        style={{ width: cardW }}
        className={`
          relative aspect-[2/3] cursor-pointer select-none bg-[#151d20] p-1.5 transition-shadow duration-300
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
        <div className="flex h-full flex-col justify-between bg-[#1c2427] p-1.5 text-white">
          <div className="flex flex-wrap content-start gap-x-1.5 gap-y-2">
            {project.stack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="border border-white/20 bg-white/5 px-1.5 py-1 text-[9px] leading-[14px] text-gray-400"
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

          <div className="flex flex-col gap-2">
            <h3 className="text-[14px] font-bold leading-tight tracking-tight">
              {project.title}
            </h3>
            <p className="line-clamp-3 text-[12px] leading-relaxed text-gray-400">
              {project.description}
            </p>
          </div>
        </div>

        {/* View Project: sits on top of the selected card and moves with it.
            The wrapper does the positioning so Framer's scale on the link
            doesn't fight Tailwind's translate. */}
        <AnimatePresence>
          {isSelected && (
            <div className="absolute inset-x-0 bottom-full mb-4 flex justify-center">
              <motion.a
                href={`/works/${project.slug}`}
                // Clicking the button must not toggle the card underneath it
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 whitespace-nowrap bg-blue-500 px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-blue-600"
              >
                View Project
                <ExternalLink size={12} />
              </motion.a>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

// ─── Intro (shown while no card is selected) ─────────────────────────────────
// "pick a card" starts as a tight phrase and stretches to the full width as you
// scroll. The words sit in a flex row with justify-between, so the gap between
// each pair of words is always equal.
function Intro({ progress }: { progress: MotionValue<number> }) {
  // Finishes at the same point the cards finish fanning out
  const width = useTransform(progress, [0.01, SPREAD_END], ["0%", "100%"]);

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0">
      <div className="tablet:px-10 pt-20 tablet:pt-6">
        <h2
          className="font-display font-bold leading-[0.9] tracking-tight text-black"
          style={{ fontSize: "clamp(4rem, 5vw, 9rem)" }}
        >
          Project Highlight
        </h2>
      </div>

      {/* width 0% + min-width: max-content = the natural phrase width at the
          start of the scroll, then it grows to 100% */}
      <motion.div
        style={{
          width,
          minWidth: "max-content",
          fontSize: "clamp(4rem, 5vw, 9rem)",
        }}
        className="flex justify-between gap-2 tablet:px-10 text-base tablet:text-lg leading-[0.9] font-display font-bold text-black"
      >
        <span>pick</span>
        <span>a</span>
        <span>card</span>
      </motion.div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function ProjectHighlight() {
  const containerRef = useRef<HTMLDivElement>(null);
  const metrics = useMetrics(projects.length);
  const { mobile } = metrics;

  // Gate portal rendering to client-side only
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Nothing is selected until the user clicks a card
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Cards first sit as one pile, then spread into the fan as you keep scrolling
  const spreadRaw = useTransform(
    scrollYProgress,
    [SPREAD_START, SPREAD_END],
    [0, 1],
  );
  const spread = useSpring(spreadRaw, {
    stiffness: 140,
    damping: 26,
    mass: 0.6,
  });

  // Progress bar: fully visible while filling, fades out as it completes.
  const progressOpacity = useTransform(scrollYProgress, [0.985, 1], [1, 0]);

  // Scrolling out of the interactive zone clears the selection
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < SPREAD_END || latest > EXIT_START) {
      setSelectedProject(null);
    }
  });

  const activeProject = projects.find((p) => p.slug === selectedProject);

  // Remember the last project so the backdrop can fade out (instead of
  // vanishing) when the selection is cleared.
  const lastProject = useRef<ProjectCard>(projects[0]);
  if (activeProject) lastProject.current = activeProject;

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${SECTION_VH}vh` }}
    >
      {/* ── Scroll Progress Bar – portalled to <body> to escape all stacking contexts ── */}
      {mounted &&
        createPortal(
          <motion.div
            style={{ opacity: progressOpacity }}
            className="fixed top-0 left-0 right-0 h-1 z-[9999] pointer-events-none"
          >
            <motion.div
              style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
              className="h-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"
            />
          </motion.div>,
          document.body,
        )}

      <div className="sticky top-0 h-[100svh] z-[1000] overflow-hidden">
        {/* ── Heading + hint: visible when nothing is selected ── */}
        <Intro progress={scrollYProgress} />

        {/* ── Full-screen backdrop (covers the intro once a card is picked) ── */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          initial={false}
          animate={{ opacity: activeProject ? 1 : 0 }}
          transition={{ duration: FADE_SECONDS, ease: "easeInOut" }}
        >
          <Backdrop project={lastProject.current} />
        </motion.div>

        {/* ── Card fan, pinned to the bottom ── */}
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
              className="absolute border border-gray-300 bg-gray-50"
            />
            {projects.map((project, idx) => (
              <ProjectCardUI
                key={project.slug}
                project={project}
                index={idx}
                total={projects.length}
                spread={spread}
                isSelected={selectedProject === project.slug}
                // Clicking the selected card again deselects it
                onClick={() =>
                  setSelectedProject((cur) =>
                    cur === project.slug ? null : project.slug,
                  )
                }
                fanStyle={getFanStyle(idx, projects.length)}
                metrics={metrics}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
