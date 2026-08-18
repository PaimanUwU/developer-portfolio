import React from 'react';
import { motion } from "framer-motion";
import { MapPin, User, Briefcase, Calendar, MoveRight } from "lucide-react";
import Branding from "../assets/Icon Dark.svg";

// Import the data here
import { aboutData } from "../data/aboutData.ts";

const Section = () => {
  return (
    <motion.div
      className="desktop:sticky top-0 w-full mx-auto desktop:h-[88vh] desktop:pl-4 flex flex-col z-10 pt-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
    >

      <div className="grid grid-cols-10 gap-2 h-full overflow-hidden bg-white shadow-xl rounded-xl border border-gray-200">

        {/* Left Column - Icon */}
        <div className="p-4 phone:hidden desktop:col-span-1 desktop:border-r border-gray-100 desktop:flex flex-col justify-start desktop:bg-gray-50">
          <img src={Branding.src} alt="Branding" className="w-full object-contain" />
        </div>

        {/* Right Column - Content */}
        <div className="col-span-10 desktop:col-span-9 flex flex-col h-full bg-white">
          <div className="p-6 tablet:p-12 h-full overflow-y-auto hide-scrollbar flex flex-col justify-between">

            <div className="grid grid-cols-1 desktop:grid-cols-2 gap-12">
              {/* Left Side: Bio */}
              <div className="flex flex-col gap-6">
                <h2 className="text-3xl tablet:text-6xl font-bold text-gray-900 leading-tight">
                  Hi, I'm <span className="text-blue-500">{aboutData.name}</span>
                </h2>

                <div className="flex flex-col gap-3 text-sm font-mono text-gray-900">
                  <div className="flex items-center gap-3">
                    <MapPin size={18} className="text-gray-900" strokeWidth={2.5} /> Based in {aboutData.location}
                  </div>
                  <div className="flex items-center gap-3">
                    <User size={18} className="text-gray-900" strokeWidth={2.5} /> {aboutData.age} Years Old
                  </div>
                  <div className="flex items-center gap-3">
                    <Briefcase size={18} className="text-gray-900" strokeWidth={2.5} /> {aboutData.role}
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar size={18} className="text-gray-900" strokeWidth={2.5} /> {aboutData.experience} of Work Experience
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed max-w-lg">
                  {aboutData.bio}
                </p>

                <div className="hidden desktop:flex flex-end gap-4 mt-8 w-full">
                  <button className="px-6 py-3 bg-gray-900 text-white rounded-md font-bold shadow-xl hover:scale-105 transition-all group">
                    Get in Touch
                  </button>
                  <a href="/works" className="px-6 py-3 inline-flex gap-4 items-center border border-gray-300 text-gray-900 rounded-md font-bold hover:bg-gray-200 transition-all group">
                    View Works <span className="group-hover:translate-x-2 transition-transform">→</span>
                  </a>
                </div>

              </div>

              {/* Right Side: Skills & Services */}
              <div className="flex flex-col gap-12">
                <div>
                  <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest pb-4">// Main Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {aboutData.skills.map(skill => (
                      <span key={skill} className="px-2.5 py-1 bg-gray-50 border border-gray-100 rounded-md text-[0.6em] font-bold uppercase tracking-wider text-gray-700">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest pb-4">// Services</h3>
                  <div className="flex flex-wrap gap-2">
                    {aboutData.services.map(service => (
                      <span key={service} className="px-2.5 py-1 bg-gray-50 border border-gray-100 rounded-md text-[0.6em] font-bold uppercase tracking-wider text-gray-700">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest pb-4">// Education</h3>
                  <div className="flex flex-col border-l-2 border-gray-100 ml-2">
                    {aboutData.education.map((edu, index) => (
                      <div key={index} className="relative pl-6 pb-6 last:pb-0">
                        {/* Timeline Dot */}
                        <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-2 border-gray-900" />

                        <div className="flex flex-col">
                          <span className="text-xs font-mono text-gray-400 uppercase tracking-tighter">
                            {edu.year} • {edu.duration}
                          </span>
                          <h4 className="text-m font-bold text-gray-900">
                            {edu.degree}
                          </h4>
                          <span className="text-xs text-gray-500 italic">
                            {edu.institution}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest pb-4"> // Professional Path </h3>
                  <div className="flex flex-col border-l-2 border-gray-100 ml-2">
                    {aboutData.work.map((job, index) => (
                      <div key={index} className="relative pl-6 pb-4 last:pb-2">
                        {/* Timeline Dot */}
                        <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-2 border-gray-900" />

                        <div className="flex flex-col">
                          <span className="text-xs font-mono text-gray-400 uppercase tracking-tighter">
                            {job.year} • {job.duration}
                          </span>
                          <h4 className="text-m font-bold text-gray-900">
                            {job.role}
                          </h4>
                          <span className="text-xs text-gray-500 italic">
                            {job.company}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="desktop:hidden flex flex-end gap-4 mt-8 w-full">
                <button className="px-6 py-3 bg-gray-900 text-white rounded-md font-bold shadow-xl hover:scale-105 transition-all group">
                  Get in Touch
                </button>
                <a href="/works" className="px-6 py-3 inline-flex gap-4 items-center border border-gray-300 text-gray-900 rounded-md font-bold hover:bg-gray-200 transition-all group">
                  View Works <span className="group-hover:translate-x-2 transition-transform">→</span>
                </a>
              </div>
            </div>

            {/* Bottom Row: Stats
            <div className="grid grid-cols-1 tablet:grid-cols-3 gap-8 pt-10 p-4 border-t border-gray-100 mt-12">
              {aboutData.stats.map((stat, index) => (
                <div key={index}>
                  <span className="text-4xl font-bold text-gray-900 block">{stat.value}</span>
                  <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold">{stat.label}</span>
                </div>
              ))}
            </div>
 */}
          </div>

          <div className="animate-pattern-move h-6 rounded-b-main bg-[repeating-linear-gradient(135deg,_#f3f4f6_0,_#334155_2px,_transparent_0,_transparent_50%)] bg-[size:15px_15px]"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default Section;
