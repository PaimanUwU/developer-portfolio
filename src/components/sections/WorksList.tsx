import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CornerMarks, Crosshair } from "../ui/BlueprintElements";

interface ProjectData {
  title: string;
  pubDate: Date | string;
  status: "halt" | "working" | "finished";
  location: string;
  description: string;
  stack: string[];
  role: string;
  experience: string;
  bio: string;
  github?: string;
}

interface Project {
  slug: string;
  data: ProjectData;
  url: string;
}

const formatDate = (date: Date | string) =>
  new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));

export default function WorksList({
  projects,
  className,
}: {
  projects: Project[];
  className?: string;
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (!expandedId) return;
    const t = setTimeout(() => {
      document
        .getElementById(`work-item-${expandedId}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
    return () => clearTimeout(t);
  }, [expandedId]);

  const toggleExpand = (id: string) =>
    setExpandedId((current) => (current === id ? null : id));

  return (
    <div className={`flex flex-1 flex-col ${className || ""}`}>
      <div className="relative flex flex-col">
        {/* Timeline line */}
        <div
          aria-hidden="true"
          className="absolute top-0 bottom-0 left-6 tablet:left-10 w-px bg-gray-200"
        />

        {projects.map((project, idx) => {
          const isExpanded = expandedId === project.slug;
          const data = project.data;

          return (
            <motion.article
              id={`work-item-${project.slug}`}
              key={project.slug}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: 0.1 + idx * 0.05,
              }}
              className={`group relative flex flex-col gap-6 pl-14 tablet:pl-24 pr-8 tablet:pr-14 py-8 tablet:py-12 border-b border-gray-200 hover:z-10 transition-colors duration-300 ${
                isExpanded ? "bg-gray-50" : "bg-white"
              }`}
            >
              <CornerMarks size={12} />

              {/* Timeline dot */}
              <div
                aria-hidden="true"
                className={`absolute left-[20px] tablet:left-[36px] top-[2.4rem] tablet:top-[3.4rem] z-10 w-2 h-2 rounded-full border border-black transition-all duration-300 group-hover:bg-primary group-hover:border-primary ${
                  isExpanded
                    ? "bg-primary border-primary scale-150"
                    : "bg-white"
                }`}
              />

              {/* Header */}
              <div
                className="cursor-pointer"
                onClick={() => toggleExpand(project.slug)}
              >
                <p className="font-mono text-xs text-gray-400 uppercase mb-4 tracking-widest transition-colors group-hover:text-gray-900 flex flex-wrap items-center gap-x-8 gap-y-2">
                  <span>{formatDate(data.pubDate)}</span>
                  <span className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      {data.status === "working" && (
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      )}
                      <span
                        className={`relative inline-flex rounded-full h-2 w-2 ${
                          data.status === "working"
                            ? "bg-green-500"
                            : data.status === "halt"
                              ? "bg-red-500"
                              : "bg-gray-500"
                        }`}
                      />
                    </span>
                    {data.status}
                  </span>
                </p>
                <h2 className="text-3xl tablet:text-4xl font-black text-gray-900 leading-tight tracking-tight transition-colors group-hover:text-primary">
                  {data.title}
                </h2>
              </div>

              <p className="text-sm font-mono text-gray-500 leading-relaxed max-w-xl line-clamp-2">
                {data.description}
              </p>

              {/* Stack tags */}
              <div className="flex flex-wrap gap-2">
                {data.stack.map((tech, tagIdx) => (
                  <span
                    key={tech}
                    className="text-xs font-mono text-gray-500 border border-gray-200 bg-white px-3 py-1"
                  >
                    <span className="text-primary font-bold mr-1.5">
                      {String(tagIdx + 1).padStart(2, "0")}
                    </span>
                    {tech}
                  </span>
                ))}
              </div>

              {/* Preview placeholder */}
              <div className="relative h-40 tablet:h-52 w-full border border-gray-200 bg-[repeating-linear-gradient(135deg,_#f3f4f6_0,_#f3f4f6_2px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] flex items-center justify-center">
                <Crosshair size={64} className="text-primary/30" />
                <span className="absolute bottom-2 right-3 text-[10px] font-mono text-gray-500">
                  // PREVIEW
                </span>
              </div>

              {/* Expandable details */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-6 border-t border-gray-200 pt-6">
                      <div>
                        <h4 className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-2">
                          Role
                        </h4>
                        <p className="text-sm font-mono text-gray-900">
                          {data.role}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-2">
                          Details
                        </h4>
                        <p className="text-sm font-mono text-gray-500 leading-relaxed italic border-l-2 border-primary/40 pl-4">
                          "{data.bio}"
                        </p>
                      </div>

                      <a
                        href={project.url}
                        className="group/link inline-flex w-fit items-center gap-4 px-7 py-3.5 bg-primary text-white font-bold text-sm hover:opacity-90 transition-opacity duration-300"
                      >
                        View Full Project
                        <span className="group-hover/link:translate-x-1 transition-transform">
                          →
                        </span>
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {!isExpanded && (
                <button
                  type="button"
                  onClick={() => toggleExpand(project.slug)}
                  className="w-fit font-mono text-xs text-primary hover:underline"
                >
                  // View Full Details
                </button>
              )}
            </motion.article>
          );
        })}
      </div>

      {/* Dot-grid filler below the last project */}
      <div
        className="flex-1 min-h-[4rem]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
    </div>
  );
}
