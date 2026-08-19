import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Briefcase, MapPin, Calendar, ChevronRight } from "lucide-react";
import { aboutData } from "../../data/aboutData";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

type Tab = "education" | "experience";

export default function AcademicExperience() {
  const [activeTab, setActiveTab] = useState<Tab>("experience");

  return (
    <motion.section
      className="w-full px-6 tablet:px-24 py-16 bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-10">
        <span className="text-xs font-mono font-semibold uppercase tracking-widest text-blue-500 mb-3 block">
          // background
        </span>
        <h2 className="text-5xl tablet:text-7xl font-black tracking-tighter text-gray-900 leading-none">
          Academic &amp;
          <br />
          <span className="text-blue-500 drop-shadow-[0_8px_16px_rgba(59,130,246,0.3)]">
            Experience
          </span>
        </h2>
      </motion.div>

      {/* Tab Toggle */}
      <motion.div variants={itemVariants} className="flex gap-1 mb-10 w-fit border border-gray-200 rounded-lg p-1 bg-gray-50">
        {(["experience", "education"] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-md text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 ${
              activeTab === tab
                ? "bg-gray-900 text-white shadow-sm"
                : "text-gray-400 hover:text-gray-700"
            }`}
          >
            {tab === "education" ? (
              <span className="flex items-center gap-2">
                <GraduationCap size={13} /> Education
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Briefcase size={13} /> Experience
              </span>
            )}
          </button>
        ))}
      </motion.div>

      {/* Timeline Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative flex flex-col gap-0"
        >
          {/* Vertical Line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gray-100" />

          {(activeTab === "education" ? aboutData.education : aboutData.work).map(
            (item: any, idx: number) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="relative flex gap-8 pb-10 last:pb-0 group"
              >
                {/* Dot */}
                <div className="relative z-10 flex-shrink-0 mt-1.5">
                  <div className="w-10 h-10 rounded-full border-2 border-gray-200 bg-white group-hover:border-blue-400 group-hover:bg-blue-50 flex items-center justify-center transition-all duration-300">
                    {activeTab === "education" ? (
                      <GraduationCap size={16} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                    ) : (
                      <Briefcase size={16} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                    )}
                  </div>
                </div>

                {/* Card */}
                <div className="flex-1 border border-gray-100 rounded-xl p-6 bg-gray-50 hover:bg-white hover:border-blue-100 hover:shadow-lg hover:shadow-blue-400/5 transition-all duration-300">
                  <div className="flex flex-col tablet:flex-row tablet:items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-base font-black tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors">
                        {activeTab === "education"
                          ? (item as typeof aboutData.education[0]).degree
                          : (item as typeof aboutData.work[0]).role}
                      </h3>
                      <p className="text-sm font-mono text-gray-500 mt-0.5">
                        {activeTab === "education"
                          ? (item as typeof aboutData.education[0]).institution
                          : (item as typeof aboutData.work[0]).company}
                      </p>
                    </div>

                    <div className="flex flex-col items-start tablet:items-end gap-1 flex-shrink-0">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-blue-500 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full">
                        <Calendar size={10} />
                        {activeTab === "education"
                          ? (item as typeof aboutData.education[0]).year
                          : (item as typeof aboutData.work[0]).year}
                      </span>
                      <span className="text-[10px] font-mono text-gray-400">
                        {activeTab === "education"
                          ? (item as typeof aboutData.education[0]).duration
                          : (item as typeof aboutData.work[0]).duration}
                      </span>
                    </div>
                  </div>

                  {activeTab === "experience" && (
                    <p className="text-sm font-mono text-gray-500 leading-relaxed border-t border-gray-100 pt-3 mt-3">
                      {(item as typeof aboutData.work[0]).description}
                    </p>
                  )}

                  {activeTab === "education" && (
                    <span className="inline-flex items-center gap-1.5 mt-3 text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 border-t border-gray-100 pt-3 w-full">
                      <MapPin size={10} />
                      {(item as typeof aboutData.education[0]).status}
                    </span>
                  )}
                </div>
              </motion.div>
            )
          )}
        </motion.div>
      </AnimatePresence>
    </motion.section>
  );
}
