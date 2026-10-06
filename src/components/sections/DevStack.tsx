import React from "react";
import { motion } from "framer-motion";
import { aboutData } from "../../data/aboutData.ts";
import { CornerMarks, Crosshair, dotGridBg } from "../ui/BlueprintElements";

// Tech name -> simple-icons slug
const techSlugs: Record<string, string> = {
  Astro: "astro",
  TypeScript: "typescript",
  React: "react",
  Laravel: "laravel",
  Figma: "figma",
  TailwindCSS: "tailwindcss",
  Neovim: "neovim",
  MacOS: "apple",
  "Arch Linux": "archlinux",
  Docker: "docker",
  "Framer Motion": "framer",
  Rust: "rust",
  // Zsh: "zsh",
  Tmux: "tmux",
  Git: "git",
  "Node.js": "nodedotjs",
};

// Resting icons are near-black; the hover tile shows them in white.
const iconUrl = (slug: string, color: string) =>
  `https://cdn.simpleicons.org/${slug}/${color}`;

// Deduplicate the tech stack
const uniqueStack = Array.from(new Set(aboutData.techStack));

// The first N items get the big cells on the top row
const FEATURED_COUNT = 3;
const featured = uniqueStack.slice(0, FEATURED_COUNT);
const rest = uniqueStack.slice(FEATURED_COUNT);

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
};

/** Generate blueprint-style grid reference (A.01, A.02, B.01 …) */
const getRef = (index: number, cols: number) => {
  const row = String.fromCharCode(65 + Math.floor(index / cols));
  const col = String((index % cols) + 1).padStart(2, "0");
  return `${row}.${col}`;
};

type CellProps = {
  tech: string;
  size: "large" | "small";
  refLabel: string;
};

const StackCell = ({ tech, size, refLabel }: CellProps) => {
  const slug = techSlugs[tech];
  const isLarge = size === "large";

  return (
    <motion.div
      variants={itemVariants}
      title={tech}
      className={`group relative flex items-center justify-center border-r border-t border-dashed border-gray-300 bg-white hover:z-10 cursor-default ${
        isLarge ? "h-40 tablet:h-64" : "h-24 tablet:h-32"
      }`}
    >
      {/* Blueprint registration marks */}
      <CornerMarks size={isLarge ? 14 : 9} />

      {/* Grid reference */}
      <span
        className="absolute top-1.5 left-2 font-mono text-[9px] text-primary font-medium tracking-[0.15em] select-none pointer-events-none"
        aria-hidden="true"
      >
        {refLabel}
      </span>

      {/* Crosshair target */}
      <Crosshair
        size={isLarge ? 80 : 44}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary/30 transition-opacity duration-300 group-hover:opacity-0"
      />

      {/* Resting state: quiet monochrome logo */}
      {slug ? (
        <img
          src={iconUrl(slug, "171717")}
          alt={tech}
          className={`object-contain opacity-80 transition-opacity duration-300 group-hover:opacity-0 ${
            isLarge
              ? "w-12 h-12 tablet:w-16 tablet:h-16"
              : "w-7 h-7 tablet:w-9 tablet:h-9"
          }`}
        />
      ) : (
        <span className="font-mono text-xs text-gray-700 transition-opacity duration-300 group-hover:opacity-0">
          {tech}
        </span>
      )}

      {/* Hover state: dark tile that slides in */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-primary opacity-0 scale-95 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-100 motion-reduce:transition-none"
      >
        {slug && (
          <img
            src={iconUrl(slug, "ffffff")}
            alt=""
            className={`object-contain ${
              isLarge
                ? "w-12 h-12 tablet:w-16 tablet:h-16"
                : "w-7 h-7 tablet:w-9 tablet:h-9"
            }`}
          />
        )}
        <span className="font-mono text-[10px] tablet:text-xs text-white font-medium truncate max-w-full px-2">
          {tech}
        </span>
      </div>
    </motion.div>
  );
};

const DevStack = () => {
  return (
    <motion.div
      className="w-full mx-auto flex flex-col z-10 pt-8 border-t border-dashed border-gray-300 bg-white"
      style={dotGridBg}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
    >
      {/* ── Title Block ─────────────────────────────────────────── */}
      <div className="flex flex-col tablet:flex-row tablet:items-end justify-between border-b border-dashed border-gray-300 px-6 tablet:pl-24 pr-6 tablet:pr-8 desktop:pr-12 pt-8 pb-10">
        <div className="flex flex-col gap-1.5">
          <span
            className="font-mono text-[11px] text-primary font-bold tracking-[0.25em] uppercase"
            aria-hidden="true"
          >
            DWG-01 · Tools &amp; Stack
          </span>
          <h2 className="text-5xl tablet:text-7xl font-black tracking-tighter text-gray-900 leading-none">
            The tools I use
          </h2>
        </div>
      </div>

      {/* ── Featured row: 3 large cells ─────────────────────────── */}
      {featured.length > 0 && (
        <motion.div
          className="tablet:pl-23 grid grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {featured.map((tech, i) => (
            <StackCell
              key={tech}
              tech={tech}
              size="large"
              refLabel={getRef(i, 3)}
            />
          ))}
        </motion.div>
      )}

      {/* ── Rest: dense grid of small cells ─────────────────────── */}
      {rest.length > 0 && (
        <motion.div
          className="tablet:pl-23 grid grid-cols-3 tablet:grid-cols-4 desktop:grid-cols-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {rest.map((tech, i) => (
            <StackCell
              key={tech}
              tech={tech}
              size="small"
              refLabel={getRef(i + FEATURED_COUNT, 6)}
            />
          ))}
        </motion.div>
      )}

      {/* ── Blueprint notes ─────────────────────────────────────── */}
      {/* <div className="flex items-center gap-4 px-6 tablet:pl-24 py-4 border-t border-dashed border-gray-300"> */}
      {/*   <span className="font-mono text-[10px] text-gray-500 font-medium tracking-wider uppercase"> */}
      {/*     Notes: All tools actively used in production workflows */}
      {/*   </span> */}
      {/* </div> */}
    </motion.div>
  );
};

export default DevStack;
