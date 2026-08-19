import React from "react";
import { motion } from "framer-motion";
import { Code2, Palette, ArrowRight } from "lucide-react";

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
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export default function ServicesOverview() {
  return (
    <motion.section
      className="w-full px-6 tablet:px-24 py-16 bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      {/* Section Header */}
      <motion.div
        className="flex flex-col tablet:flex-row tablet:items-end justify-between gap-4 mb-12"
        variants={cardVariants}
      >
        <div>
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-blue-500 mb-3 block">
            // services
          </span>
          <h2 className="text-5xl tablet:text-7xl font-black tracking-tighter text-gray-900 leading-none">
            What I Can Do
            <br />
            <span className="text-blue-500 drop-shadow-[0_8px_16px_rgba(59,130,246,0.3)]">
              For You
            </span>
          </h2>
        </div>

        <p className="text-sm font-mono text-gray-400 max-w-xs tablet:text-right leading-relaxed">
          Custom projects starting at{" "}
          <span className="text-gray-900 font-bold">RM1000</span>
          <br />
          Available for freelance and contract roles
        </p>
      </motion.div>

      {/* Service Cards */}
      <motion.div
        className="grid grid-cols-1 tablet:grid-cols-2 gap-5 mb-10"
        variants={containerVariants}
      >
        {services.map((service, idx) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="group relative flex flex-col gap-6 p-8 rounded-xl border border-gray-200 bg-gray-50 hover:bg-white hover:border-blue-200 hover:shadow-xl hover:shadow-blue-400/10 transition-all duration-300 cursor-default"
            >
              <span className="absolute top-6 right-8 text-sm font-bold text-gray-300 group-hover:text-blue-400 transition-colors font-mono">
                0{idx + 1}
              </span>

              <div className="w-11 h-11 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center group-hover:bg-blue-500 group-hover:border-blue-500 transition-all duration-300">
                <Icon
                  size={20}
                  className="text-blue-500 group-hover:text-white transition-colors duration-300"
                  strokeWidth={2}
                />
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-black tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm font-mono text-gray-500 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-auto">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono font-medium text-gray-500 bg-gray-100 group-hover:bg-blue-50 group-hover:text-blue-600 border border-gray-200 group-hover:border-blue-200 px-3 py-1 rounded-full transition-all duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* CTA Row */}
      <motion.div
        className="flex flex-col tablet:flex-row items-start tablet:items-center justify-between gap-6 pt-8"
        variants={cardVariants}
      >
        <p className="text-sm font-mono text-gray-400">
          Need something specific?{" "}
          <span className="text-gray-700">Let us talk about your project.</span>
        </p>

        <a
          href="/services"
          className="inline-flex items-center gap-3 px-7 py-3.5 bg-gray-900 text-white rounded-lg font-bold text-sm hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-400/25 hover:-translate-y-0.5 transition-all duration-300 group"
        >
          View Full Services and Pricing
          <ArrowRight
            size={16}
            className="group-hover:translate-x-1 transition-transform duration-300"
          />
        </a>
      </motion.div>
    </motion.section>
  );
}
