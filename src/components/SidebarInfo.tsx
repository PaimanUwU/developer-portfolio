import React from 'react';
import { motion } from 'framer-motion';
// Import everything as a namespace to ensure Vite sees all exports
import * as LucideIcons from 'lucide-react';
import { aboutData } from '../data/aboutData';
import GitHubActivity from "../components/GitHubActivity.tsx";

export default function SidebarInfo() {
  const { MapPin, Briefcase, FileText, Code2 } = LucideIcons;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay:0.2, duration: 0.6, ease: "easeOut" }}
      className="pb-8 desktop:pl-4 desktop:ml-6 space-y-10 text-gray-900"
    >
      {/* Profile Header */}
      <div className="space-y-2">
        <h3 className="text-2xl font-bold tracking-tight">{aboutData.name}</h3>
        <div className="flex flex-col gap-2 text-sm font-mono text-gray-500">
          <div className="flex items-center gap-2">
            <Briefcase size={14} /> {aboutData.role}
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={14} /> {aboutData.location}
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="space-y-4">
        <h4 className="text-xs font-mono text-gray-400 uppercase tracking-widest">// Main Skills</h4>
        <div className="flex flex-wrap gap-2">
          {aboutData.skills.map(skill => (
            <span key={skill} className="px-2.5 py-1 bg-gray-50 border border-gray-100 rounded-md text-[10px] font-bold uppercase tracking-wider text-gray-700">
              {skill}
            </span>
          ))}
        </div>
      </div>

        {/*
      <div className="space-y-4 flex flex-col">
        <h4 className="text-xs font-mono text-gray-400 uppercase tracking-widest">// Git Activity</h4>
        <GitHubActivity username="PaimanUwU" />
      </div>
        */}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 border-t border-b py-4 border-gray-100">
        {aboutData.stats.map((stat, index) => (
          <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
            <span className="block text-xl font-bold text-gray-900">{stat.value}</span>
            <span className="text-[10px] text-gray-500 uppercase font-mono leading-tight">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Socials & Resume */}
      <div className="space-y-6 pt-4 ">
        <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg font-bold text-sm hover:scale-[1.02] transition-all transform active:scale-95 shadow-lg shadow-gray-200">
          <FileText size={16} />
          Download Resume
        </button>
      </div>
    </motion.div>
  );
}
