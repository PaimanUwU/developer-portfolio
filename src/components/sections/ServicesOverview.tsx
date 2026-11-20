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

export default function ServicesOverview() {
  return (
    <motion.section
      className="w-full border-y border-gray-200 bg-white"
      style={dotGridBg}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="grid grid-cols-1 desktop:grid-cols-2">
        {/* ════════ LEFT PANEL: title, pricing, CTA ════════ */}
        <motion.div
          className="flex flex-col border-b desktop:border-b-0 desktop:border-r border-gray-200 bg-white"
          variants={itemVariants}
        >
          {/* Title block */}
          <div className="flex flex-1 flex-col justify-start gap-6 px-8 tablet:px-14 pt-16 pb-10 border-b border-gray-200">
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

            <p className="text-sm font-mono text-gray-400 max-w-xs leading-relaxed">
              Custom projects starting at{" "}
              <span className="text-gray-900 font-bold">RM1000</span>
              <br />
              Available for freelance and contract roles
            </p>
          </div>

          {/* CTA row */}
          <div className="flex flex-col tablet:flex-row items-start tablet:items-stretch justify-between">
            <p className="px-8 tablet:px-14 py-6 tablet:py-0 tablet:self-center text-sm font-mono text-gray-400">
              Need something specific?{" "}
              <span className="text-gray-700">
                Let us talk about your project.
              </span>
            </p>

            <a
              href="/services"
              className="group w-full tablet:w-auto inline-flex items-center justify-center gap-3 px-7 py-6 bg-primary text-white font-bold text-sm hover:opacity-90 transition-opacity duration-300"
            >
              View Full Services and Pricing
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>
        </motion.div>

        {/* ════════ RIGHT PANEL: service types only ════════ */}
        <motion.div className="flex flex-col" variants={containerVariants}>
          {services.map((service, idx) => {
            const Icon = service.icon;
            const detailRef = String.fromCharCode(65 + idx);

            return (
              <motion.div
                key={service.title}
                variants={itemVariants}
                className="group relative flex flex-1 flex-col justify-between gap-16 min-h-80 tablet:min-h-96 border-gray-200 border-b last:border-b-0 bg-white hover:z-10 cursor-default py-8 tablet:py-12 px-8 tablet:px-14"
              >
                {/* Blueprint registration marks */}
                <CornerMarks size={16} />

                {/* Detail reference circle */}
                <span
                  className="absolute top-3 right-4 w-7 h-7 rounded-full border border-primary/50 flex items-center justify-center font-mono text-[10px] text-primary font-bold select-none pointer-events-none"
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
                <div className="relative w-12 h-12 border border-gray-200 flex items-center justify-center transition-colors duration-300">
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
                        className="text-xs font-mono text-gray-500 border border-gray-200 px-3 py-1 transition-colors duration-300"
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
      </div>
    </motion.section>
  );
}
