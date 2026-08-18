import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectData {
  title: string;
  pubDate: Date | string;
  status: 'halt' | 'working' | 'finished';
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

export default function WorksList({ projects, className }: { projects: Project[], className?: string }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (expandedId) {
      setTimeout(() => {
        const element = document.getElementById(`work-item-${expandedId}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);
    }
  }, [expandedId]);

  const toggleExpand = (id: string, _url: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  const formatDate = (date: Date | string) => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: 'UTC',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(date));
  };

  return (
    <div className={`relative border-l border-gray-200 ml-4 desktop:ml-20 space-y-24 pb-20 ${className || ''}`}>
      {projects.map((project: Project) => {
        const isExpanded = expandedId === project.slug;
        const data = project.data;

        return (
          <motion.div
            id={`work-item-${project.slug}`}
            key={project.slug}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className={`relative pl-8 pr-8 transition-all duration-500 ${isExpanded ? 'bg-gray-50 py-8 rounded-lg shadow-xl shadow-gray-100 ' : 'hover:bg-white/5 py-4 rounded-r-lg'}`}
          >
            {/* Timeline Dot */}
            <div className={`absolute -left-[5px] top-5 w-2 h-2 rounded-full border border-black z-10 transition-colors duration-300 ${isExpanded ? 'bg-white scale-150' : 'bg-gray-600'}`} />

            <header className="mb-2 cursor-pointer group" onClick={() => toggleExpand(project.slug, project.url)}> <p className="font-mono text-xs text-gray-500 uppercase mb-10 tracking-widest transition-colors group-hover:text-gray-300 flex items-center gap-8">
                <span>{formatDate(data.pubDate)}</span>
                <span className="flex items-center gap-2 capitalized">
                  <span className="relative flex h-2 w-2 ">
                    {data.status === 'working' && (
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    )}
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${data.status === 'working' ? 'bg-green-500' : data.status === 'halt' ? 'bg-red-500' : 'bg-gray-500'}`}></span>
                  </span>
                  {data.status}
                </span>
              </p>
              <h2 className="text-4xl font-bold font-bold text-gray-900 leading-tight tracking-tight transition-transform inline-block group-hover:text-blue-500 transition-colors">
                {data.title}
              </h2>
            </header>

            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1 max-w-2xl px-1">
                <p className="text-gray-400 leading-relaxed mb-6 line-clamp-2">
                  {data.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {data.stack.map((tech: string) => (
                    <span key={tech} className="px-2.5 py-1 bg-gray-50 border border-gray-100 rounded-md text-[10px] font-bold uppercase tracking-wider text-gray-700">
                      {tech}
                    </span>
                  ))}
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-gray-800 pt-6 mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                          <div>
                            <h4 className="text-xs font-mono text-gray-500 uppercase mb-2">Role</h4>
                            <p className="text-gray-900">{data.role}</p>
                          </div>
                        </div>

                        <div className="mb-8">
                          <h4 className="text-xs font-mono text-gray-500 uppercase mb-2">Details</h4>
                          <p className="text-gray-400 leading-relaxed italic border-l-2 border-gray-700 pl-4">
                            "{data.bio}"
                          </p>
                        </div>

                        <a
                          href={project.url}
                          className="inline-flex items-center gap-4 px-8 py-3 border border-gray-300 rounded-md bg-white text-black hover:bg-gray-200 transition-all font-mono text-sm font-bold group"
                        >
                          View Full Project
                          <span className="group-hover:translate-x-2 transition-transform">→</span>
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!isExpanded && (
                  <button
                    onClick={() => toggleExpand(project.slug, project.url)}
                    className="inline-block font-mono text-xs text-blue-500 transition-colors py-2"
                  >
                    // View Full Details
                  </button>
                )}
              </div>

              {/* Image Placeholder on the Right - Always visible now */}
              <div className="w-full md:w-64 h-40 flex-none rounded-lg overflow-hidden bg-[repeating-linear-gradient(135deg,_#f3f4f6_0,_#f3f4f6_2px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] relative group flex">
                <div className="absolute inset-0 " />
                <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="absolute bottom-2 right-2 text-[10px] font-mono text-gray-700">// PREVIEW</div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
