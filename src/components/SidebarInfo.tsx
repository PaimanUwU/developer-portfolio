import { motion } from "framer-motion";
import { MapPin, Briefcase, FileText } from "lucide-react";
import { aboutData } from "../data/aboutData";

/** Section label row, same treatment as DevStack */
const SectionLabel = ({ code, title }: { code: string; title: string }) => (
  <div className="flex items-center justify-between px-8 tablet:px-14 py-3 border-b border-gray-200 bg-white">
    <span className="font-mono text-[10px] uppercase tracking-widest text-primary font-bold">
      {code}
    </span>
    <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400">
      {title}
    </span>
  </div>
);

export default function SidebarInfo() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
      className="flex flex-col bg-white text-gray-900"
    >
      {/* Profile */}
      <div className="flex flex-col gap-3 px-8 tablet:px-14 py-8 ">
        <h3 className="text-2xl font-black tracking-tight">{aboutData.name}</h3>
        <div className="flex flex-col gap-2 text-sm font-mono text-gray-500">
          <div className="flex items-center gap-2">
            <Briefcase size={14} /> {aboutData.role}
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={14} /> {aboutData.location}
          </div>
        </div>
      </div>

      {/* Main skills */}
      <div className="flex flex-wrap gap-2 px-8 tablet:px-14 py-8 border-b border-gray-200">
        {aboutData.skills.map((skill, i) => (
          <span
            key={skill}
            className="text-xs font-mono text-gray-500 border border-gray-200 px-3 py-1"
          >
            <span className="text-primary font-bold mr-1.5">
              {String(i + 1).padStart(2, "0")}
            </span>
            {skill}
          </span>
        ))}
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2">
        {aboutData.stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col gap-1 px-8 tablet:px-14 py-6 border-b border-gray-200 [&:nth-child(odd)]:border-r"
          >
            <span className="text-xl font-black text-gray-900">
              {stat.value}
            </span>
            <span className="text-[10px] text-gray-500 uppercase font-mono leading-tight">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Resume */}
      <button
        type="button"
        className="w-full flex items-center justify-center gap-2 px-7 py-6 bg-primary text-white font-bold text-sm hover:opacity-90 transition-opacity duration-300"
      >
        <FileText size={16} />
        Download Resume
      </button>
    </motion.div>
  );
}
