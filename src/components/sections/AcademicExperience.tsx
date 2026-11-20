import { useState } from "react";
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
      className="w-full border-t border-gray-200 bg-white"
      style={dotGridBg}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={containerVariants}
    >
      <div className="grid grid-cols-1 desktop:grid-cols-2">
        {/* ════════ LEFT PANEL: title + tab toggles ════════ */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col border-b desktop:border-b-0 desktop:border-r border-gray-200 bg-white"
        >
          {/* Title block, aligned to top */}
          <div className="flex flex-1 flex-col justify-start gap-1.5 px-8 tablet:px-14 pt-16 pb-10 border-b border-gray-200">
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

          {/* Tab bar styled as blueprint layer toggles */}
          <div role="tablist" className="grid grid-cols-2 desktop:grid-cols-1">
            {tabs.map(({ id, label, icon: Icon }, i) => {
              const isActive = activeTab === id;
              return (
                <button
                  key={id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(id)}
                  className={`relative flex items-center gap-2.5 py-5 px-8 tablet:px-14 text-xs font-mono font-bold transition-colors duration-300 ${
                    i === 0 ? "border-r desktop:border-r-0" : ""
                  } desktop:border-b desktop:last:border-b-0 border-gray-200 ${
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
          </div>
        </motion.div>

        {/* ════════ RIGHT PANEL: timeline rows only ════════ */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="flex flex-col"
          >
            {rows.map((row, idx) => (
              <motion.div
                key={`${activeTab}-${idx}`}
                variants={itemVariants}
                className="group relative flex flex-col gap-8 px-8 tablet:px-14 py-8 tablet:py-12 border-b border-gray-200 bg-white hover:z-10 cursor-default"
              >
                {/* Blueprint registration marks */}
                <CornerMarks size={12} />

                {/* Top row: icon + date */}
                <div className="flex items-start justify-between gap-6">
                  <div className="relative w-10 h-10 border border-gray-200 flex items-center justify-center">
                    <Crosshair
                      size={32}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary/30"
                    />
                    <RowIcon
                      size={18}
                      strokeWidth={1.75}
                      className="relative z-[1] text-gray-900"
                    />
                  </div>

                  <div className="flex flex-col gap-1 items-end text-right">
                    <span className="inline-flex items-center gap-2 text-sm font-mono font-bold text-gray-900">
                      <Calendar size={13} />
                      {row.year}
                    </span>
                    <span className="text-xs font-mono text-gray-400">
                      {row.duration}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="relative flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-2xl tablet:text-3xl font-black tracking-tight text-gray-900">
                      {row.title}
                    </h3>
                    <p className="text-sm font-mono text-gray-500">
                      {row.subtitle}
                    </p>
                  </div>

                  {row.body && (
                    <p className="text-sm font-mono text-gray-500 leading-relaxed max-w-xl">
                      {row.body}
                    </p>
                  )}

                  {row.status && (
                    <span className="inline-flex items-center gap-2 w-fit text-xs font-mono text-gray-500 border border-gray-200 px-3 py-1">
                      <MapPin size={12} />
                      {row.status}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
