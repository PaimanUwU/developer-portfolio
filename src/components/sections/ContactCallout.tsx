import React from "react";
import { motion } from "framer-motion";
import { Mail, ExternalLink, Link, ArrowUpRight } from "lucide-react";
import { aboutData } from "../../data/aboutData";

const iconMap: Record<string, React.ElementType> = {
  Github: ExternalLink,
  Linkedin: Link,
  Mail,
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function ContactCallout() {
  return (
    <motion.section
      className="w-full px-6 tablet:px-24 py-20 bg-gray-900 text-white relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      {/* Background decorative grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Glow blob */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-600 rounded-full blur-[120px] opacity-20 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-start gap-10">
        {/* Label */}
        <motion.span
          variants={itemVariants}
          className="text-xs font-mono font-semibold uppercase tracking-widest text-blue-400"
        >
          // contact
        </motion.span>

        {/* Headline */}
        <motion.div variants={itemVariants} className="flex flex-col gap-4 max-w-3xl">
          <h2 className="text-5xl tablet:text-7xl desktop:text-8xl font-black tracking-tighter leading-none">
            Let's Build
            <br />
            <span className="text-blue-400 drop-shadow-[0_8px_24px_rgba(96,165,250,0.4)]">
              Something Great.
            </span>
          </h2>
          <p className="text-sm font-mono text-gray-400 max-w-md leading-relaxed">
            Whether it's a product, a side project, or just a conversation — I am always open to connecting with the right people.
          </p>
        </motion.div>

        {/* CTA Row */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col tablet:flex-row items-start gap-4 w-full"
        >
          {/* Primary CTA */}
          <a
            href={`mailto:${aboutData.socials.find((s) => s.icon === "Mail")?.url.replace("mailto:", "") ?? "your@email.com"}`}
            className="inline-flex items-center gap-3 px-8 py-4 bg-blue-500 hover:bg-blue-400 text-white rounded-lg font-bold text-sm shadow-xl shadow-blue-500/25 hover:-translate-y-0.5 hover:shadow-blue-400/40 transition-all duration-300 group"
          >
            <Mail size={16} />
            Get In Touch
            <ArrowUpRight
              size={14}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
            />
          </a>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {aboutData.socials
              .filter((s) => s.icon !== "Mail")
              .map((social) => {
                const Icon = iconMap[social.icon] ?? ArrowUpRight;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 group"
                    aria-label={social.name}
                  >
                    <Icon size={18} className="group-hover:scale-110 transition-transform duration-200" />
                  </a>
                );
              })}
          </div>
        </motion.div>

        {/* Bottom status bar */}
        <motion.div
          variants={itemVariants}
          className="w-full pt-10 mt-4 border-t border-white/10 flex flex-col tablet:flex-row items-start tablet:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            Available for freelance and contract work
          </div>
          <p className="text-xs font-mono text-gray-600">
            Based in{" "}
            <span className="text-gray-400">{aboutData.location}</span>
            {" · "}
            Open to remote
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
