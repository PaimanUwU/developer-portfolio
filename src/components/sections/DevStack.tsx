import { motion } from "framer-motion";
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
  Tmux: "tmux",
  Git: "git",
  "Node.js": "nodedotjs",
};

const frameworks = ["Astro", "Laravel"];
const libraries = [
  "TypeScript",
  "Rust",
  "React",
  "TailwindCSS",
  "Framer Motion",
];
const tools = [
  "Neovim",
  "MacOS",
  "Arch Linux",
  "Docker",
  "Tmux",
  "Git",
  "Figma",
  "Node.js",
];

const COLS = 3;

const iconUrl = (slug: string, color: string) =>
  `https://cdn.simpleicons.org/${slug}/${color}`;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
};

type CellProps = {
  tech: string;
  size: "large" | "small";
  refLabel: string;
  className?: string;
};

const StackCell = ({ tech, size, refLabel, className = "" }: CellProps) => {
  const slug = techSlugs[tech];
  const isLarge = size === "large";
  const iconSize = isLarge
    ? "w-16 h-16 tablet:w-24 tablet:h-24"
    : "w-7 h-7 tablet:w-9 tablet:h-9";

  return (
    <motion.div
      variants={itemVariants}
      title={tech}
      className={`group relative flex items-center justify-center border-gray-200 bg-white hover:z-10 cursor-default ${className}`}
    >
      <CornerMarks size={isLarge ? 14 : 9} />

      <span
        className="absolute top-1.5 left-2 font-mono text-[9px] text-primary font-medium tracking-[0.15em] select-none pointer-events-none"
        aria-hidden="true"
      >
        {refLabel}
      </span>

      <Crosshair
        size={isLarge ? 120 : 44}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary/30 transition-opacity duration-300 group-hover:opacity-0"
      />

      {slug ? (
        <img
          src={iconUrl(slug, "171717")}
          alt={tech}
          className={`object-contain opacity-80 transition-opacity duration-300 group-hover:opacity-0 ${iconSize}`}
        />
      ) : (
        <span className="font-mono text-xs text-gray-700 transition-opacity duration-300 group-hover:opacity-0">
          {tech}
        </span>
      )}

      {/* Hover tile */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-primary opacity-0 scale-95 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-100 motion-reduce:transition-none"
      >
        {slug && (
          <img
            src={iconUrl(slug, "ffffff")}
            alt=""
            className={`object-contain ${iconSize}`}
          />
        )}
        <span
          className={`font-mono text-white font-medium truncate max-w-full px-2 ${
            isLarge ? "text-sm tablet:text-base" : "text-[10px] tablet:text-xs"
          }`}
        >
          {tech}
        </span>
      </div>
    </motion.div>
  );
};

/** Section label row, same treatment as the stats labels in Hero */
const SectionLabel = ({ code, title }: { code: string; title: string }) => (
  <div className="flex items-center justify-between px-5 tablet:px-8 py-3 border-b border-gray-200 bg-white">
    <span className="font-mono text-[10px] uppercase tracking-widest text-primary font-bold">
      {code}
    </span>
    <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400">
      {title}
    </span>
  </div>
);

/** Grid of small cells, padded with dot-grid fillers so rows stay complete */
const SmallGrid = ({ items, prefix }: { items: string[]; prefix: string }) => {
  const filler = (COLS - (items.length % COLS)) % COLS;

  return (
    <motion.div
      className="grid grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map((tech, i) => (
        <StackCell
          key={tech}
          tech={tech}
          size="small"
          refLabel={`${prefix}.${String(i + 1).padStart(2, "0")}`}
          className="h-24 tablet:h-32 border-b border-r [&:nth-child(3n)]:border-r-0"
        />
      ))}
      {Array.from({ length: filler }).map((_, i) => (
        <div
          key={`filler-${i}`}
          aria-hidden="true"
          className="h-24 tablet:h-32 border-b border-gray-200 border-r [&:last-child]:border-r-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
      ))}
    </motion.div>
  );
};

const DevStack = () => {
  return (
    <motion.section
      className="w-full border-t border-gray-200 bg-white"
      style={dotGridBg}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
    >
      <div className="grid grid-cols-1 desktop:grid-cols-2">
        {/* ════════ LEFT PANEL: frameworks ════════ */}
        <div className="flex flex-col border-b desktop:border-b-0 desktop:border-r border-gray-200">
          {/* Title block */}
          <div className="flex flex-col gap-1.5 px-8 tablet:px-14 pt-16 pb-10 border-b border-gray-200 bg-white">
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

          <SectionLabel code="A" title="Frameworks" />

          {/* Two big rectangles */}
          <motion.div
            className="flex flex-1 flex-col"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {frameworks.map((tech, i) => (
              <StackCell
                key={tech}
                tech={tech}
                size="large"
                refLabel={`A.${String(i + 1).padStart(2, "0")}`}
                className="flex-1 min-h-[14rem] tablet:min-h-[18rem] border-b last:border-b-0"
              />
            ))}
          </motion.div>
        </div>

        {/* ════════ RIGHT PANEL: libraries + tools ════════ */}
        <div className="flex flex-col">
          <SectionLabel code="B" title="Libraries" />
          <SmallGrid items={libraries} prefix="B" />

          <SectionLabel code="C" title="Tools" />
          <SmallGrid items={tools} prefix="C" />

          {/* Dot-grid filler, same as Hero's bottom-right area */}
          <div
            className="flex-1 min-h-[2rem]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
        </div>
      </div>
    </motion.section>
  );
};

export default DevStack;
