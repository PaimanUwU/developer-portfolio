import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Briefcase, MapPin, Calendar } from "lucide-react";
import { aboutData } from "../../data/aboutData";
import { CornerMarks, Crosshair, dotGridBg } from "../ui/BlueprintElements";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35, ease: "easeOut" } },
};

// Same horizontal padding as the DevStack header so everything lines up
const gutter = "px-2 tablet:pl-24 pr-6 tablet:pr-8 desktop:pr-12";

type Tab = "experience" | "education";

const tabs: { id: Tab; label: string; icon: typeof Briefcase }[] = [
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
];

export default function AcademicExperience() {
  const [activeTab, setActiveTab] = useState<Tab>("experience");

  // Normalise both data sets into one row shape
  const rows =
    activeTab === "education"
      ? aboutData.education.map((e) => ({
          title: e.degree,
          subtitle: e.institution,
          year: e.year,
          duration: e.duration,
          body: null as string | null,
          status: e.status as string | null,
        }))
      : aboutData.work.map((w) => ({
          title: w.role,
          subtitle: w.company,
          year: w.year,
          duration: w.duration,
          body: w.description as string | null,
          status: null as string | null,
        }));

  const RowIcon = activeTab === "education" ? GraduationCap : Briefcase;

  return (
    <motion.section
      className="w-full flex flex-col bg-white border-t border-dashed border-gray-300"
      style={dotGridBg}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={containerVariants}
    >
      {/* ── Title Block ─────────────────────────────────────────── */}
      <motion.div
        variants={itemVariants}
        className={`flex flex-col tablet:flex-row tablet:items-end justify-between gap-6 border-b border-dashed border-gray-300 pt-16 pb-10 ${gutter}`}
      >
        <div className="flex flex-col gap-1.5">
          <span
            className="font-mono text-[11px] text-primary font-bold tracking-[0.25em] uppercase"
            aria-hidden="true"
          >
            DWG-03 · Timeline
          </span>
          <h2 className="text-5xl tablet:text-7xl font-black tracking-tighter text-gray-900 leading-none">
            Academic &amp;
            <br />
            Experience
          </h2>
        </div>
      </motion.div>

      {/* ── Tab bar — styled as blueprint layer toggles ──────── */}
      <motion.div
        variants={itemVariants}
        role="tablist"
        className="ml-21 pl-2 grid grid-cols-2 tablet:grid-cols-3 border-b border-dashed border-gray-300"
      >
        {tabs.map(({ id, label, icon: Icon }, i) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(id)}
              className={`relative flex items-center gap-2.5 py-5 px-2 border-r border-dashed border-gray-300 text-xs font-mono font-bold transition-colors duration-300 ${
                i === 0 ? "tablet:pl-2" : "tablet:pl-2"
              } ${
                isActive
                  ? "bg-primary text-white"
                  : "bg-white text-gray-400 hover:text-gray-900"
              }`}
            >
              {!isActive && (
                <CornerMarks size={8} className="border-primary/60" />
              )}
              <Icon size={14} />
              <span className="tracking-[0.15em] uppercase">{label}</span>
            </button>
          );
        })}
        {/* Filler cell keeps the grid line rhythm on wide screens */}
        <div className="hidden tablet:block" aria-hidden="true" />
      </motion.div>

      {/* ── Rows ────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          className="ml-21 pl-2 flex flex-col"
        >
          {rows.map((row, idx) => (
            <motion.div
              key={`${activeTab}-${idx}`}
              variants={itemVariants}
              className="group relative grid grid-cols-1 tablet:grid-cols-3 border-b border-dashed border-gray-300 bg-white hover:z-10 cursor-default"
            >
              {/* Blueprint registration marks */}
              <CornerMarks size={12} />

              {/* Phase label — architectural phase annotation */}
              {/* <span */}
              {/*   className="absolute top-3 right-4 font-mono text-[10px] text-primary font-bold tracking-[0.15em] uppercase select-none pointer-events-none" */}
              {/*   aria-hidden="true" */}
              {/* > */}
              {/*   Phase {String(idx + 1).padStart(2, "0")} */}
              {/* </span> */}

              {/* Left cell: when & where in time */}
              <div className="relative flex flex-col gap-4 pt-8 pb-2 tablet:py-10 tablet:pr-8 tablet:border-r border-dashed border-gray-300 transition-colors duration-300 tablet:pl-2">
                {/* Icon with crosshair target */}
                <div className="relative w-10 h-10 border border-dashed border-gray-300 flex items-center justify-center transition-colors duration-300">
                  <Crosshair
                    size={32}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary/30"
                  />
                  <RowIcon
                    size={18}
                    strokeWidth={1.75}
                    className="relative z-[1] text-gray-900 transition-colors duration-300"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <span className="inline-flex items-center gap-2 text-sm font-mono font-bold text-gray-900 transition-colors duration-300">
                    <Calendar size={13} />
                    {row.year}
                  </span>
                  <span className="text-xs font-mono text-gray-400 transition-colors duration-300">
                    {row.duration}
                  </span>
                </div>
              </div>

              {/* Right cell: what */}
              <div className="relative tablet:col-span-2 flex flex-col gap-5 px-6 tablet:px-2 pt-4 pb-8 tablet:py-10">
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-2xl tablet:text-3xl font-black tracking-tight text-gray-900 transition-colors duration-300">
                    {row.title}
                  </h3>
                  <p className="text-sm font-mono text-gray-500 transition-colors duration-300">
                    {row.subtitle}
                  </p>
                </div>

                {row.body && (
                  <p className="text-sm font-mono text-gray-500 leading-relaxed max-w-xl transition-colors duration-300">
                    {row.body}
                  </p>
                )}

                {row.status && (
                  <span className="inline-flex items-center gap-2 w-fit text-xs font-mono text-gray-500 border border-dashed border-gray-300 px-3 py-1 transition-colors duration-300">
                    <MapPin size={12} />
                    {row.status}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* ── Blueprint notes ─────────────────────────────────────── */}
      {/* <div */}
      {/*   className={`flex items-center gap-4 py-4 border-t border-dashed border-gray-300 ${gutter}`} */}
      {/* > */}
      {/*   <span className="font-mono text-[10px] text-gray-500 font-medium tracking-wider uppercase"> */}
      {/*     Notes: Timeline entries verified and up to date */}
      {/*   </span> */}
      {/* </div> */}
    </motion.section>
  );
}
