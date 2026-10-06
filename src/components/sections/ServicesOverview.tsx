import React from "react";
import { motion } from "framer-motion";
import { Code2, Palette, ArrowRight } from "lucide-react";
import { CornerMarks, Crosshair, dotGridBg } from "../ui/BlueprintElements";

const services = [
  {
    icon: Code2,
    title: "Front-End Development",
    description:
      "Custom React/Next.js web applications built with modern UI performance, clean architecture, and pixel-perfect attention to detail.",
    tags: ["React", "Next.js", "TypeScript", "TailwindCSS"],
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "High-fidelity designs, design systems, and interactive prototypes that bridge the gap between great ideas and polished products.",
    tags: ["Figma", "Design Systems", "Prototyping", "Motion"],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35, ease: "easeOut" } },
};

// Same horizontal padding as the DevStack header so everything lines up
const gutter = "px-6 tablet:pl-24 pr-6 tablet:pr-8 desktop:pr-12";

export default function ServicesOverview() {
  return (
    <motion.section
      className="w-full flex flex-col bg-white border-gray-300"
      style={dotGridBg}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      {/* ── Title Block ─────────────────────────────────────────── */}
      <motion.div
        className={`flex flex-col tablet:flex-row tablet:items-end justify-between gap-6 border-y border-dashed border-gray-300 pt-16 pb-10 ml-23 px-2`}
        variants={itemVariants}
      >
        <div className="flex flex-col gap-1.5">
          <span
            className="font-mono text-[11px] text-primary font-bold tracking-[0.25em] uppercase"
            aria-hidden="true"
          >
            DWG-02 · Services
          </span>
          <h2 className="text-5xl tablet:text-7xl font-black tracking-tighter text-gray-900 leading-none">
            What I Can Do
            <br />
            For You
          </h2>
        </div>

        <div className="flex flex-col gap-3 items-start tablet:items-end">
          <p className="text-sm font-mono text-gray-400 max-w-xs tablet:text-right leading-relaxed">
            Custom projects starting at{" "}
            <span className="text-gray-900 font-bold">RM1000</span>
            <br />
            Available for freelance and contract roles
          </p>
        </div>
      </motion.div>

      {/* ── Service cells ───────────────────────────────────────── */}
      <motion.div
        className="tablet:pl-23 grid grid-cols-1 tablet:grid-cols-2"
        variants={containerVariants}
      >
        {services.map((service, idx) => {
          const Icon = service.icon;
          const detailRef = String.fromCharCode(65 + idx);

          return (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="group relative flex flex-col justify-between gap-16 min-h-80 tablet:min-h-96 border-r border-b border-dashed border-gray-300 bg-white hover:z-10 cursor-default py-8 tablet:py-12 px-6 tablet:pr-12 tablet:pl-2"
            >
              {/* Blueprint registration marks */}
              <CornerMarks size={16} />

              {/* Detail reference circle — architectural callout */}
              <span
                className="absolute top-3 right-4 w-7 h-7 rounded-full border border-dashed border-primary/50 flex items-center justify-center font-mono text-[10px] text-primary font-bold select-none pointer-events-none"
                aria-hidden="true"
              >
                {detailRef}
              </span>

              {/* Hover overlay */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-primary opacity-0 scale-90 transition-all duration-600 ease-out motion-reduce:transition-none"
              />

              {/* Icon with crosshair target */}
              <div className="relative w-12 h-12 border border-dashed border-gray-300 flex items-center justify-center transition-colors duration-300">
                <Crosshair
                  size={40}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary/30"
                />
                <Icon
                  size={22}
                  strokeWidth={1.75}
                  className="relative z-[1] text-gray-900 transition-colors duration-300"
                />
              </div>

              {/* Copy */}
              <div className="relative flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <h3 className="text-2xl tablet:text-3xl font-black tracking-tight text-gray-900 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-sm font-mono text-gray-500 leading-relaxed max-w-md transition-colors duration-300">
                    {service.description}
                  </p>
                </div>

                {/* Tags as blueprint specifications */}
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag, tagIdx) => (
                    <span
                      key={tag}
                      className="text-xs font-mono text-gray-500 border border-dashed border-gray-300 px-3 py-1 transition-colors duration-300"
                    >
                      <span className="text-primary font-bold mr-1.5">
                        {String(tagIdx + 1).padStart(2, "0")}
                      </span>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* ── CTA row ─────────────────────────────────────────────── */}
      <motion.div
        className={`flex flex-col h-[8rem] tablet:flex-row items-start tablet:items-center justify-between gap-6 border-gray-300`}
        variants={itemVariants}
      >
        <p className="desktop:ml-23 desktop:pl-2 text-sm font-mono text-gray-400">
          Need something specific?{" "}
          <span className="text-gray-700">Let us talk about your project.</span>
        </p>

        <a
          href="/services"
          className="group h-[8rem] inline-flex items-center gap-3 px-7 py-3.5 bg-primary text-white font-bold text-sm hover:opacity-90 transition-opacity duration-300"
        >
          View Full Services and Pricing
          <ArrowRight size={16} className="transition-transform duration-300" />
        </a>
      </motion.div>
    </motion.section>
  );
}
