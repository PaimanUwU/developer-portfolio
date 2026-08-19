import React from "react";
import { motion } from "framer-motion";
import { MapPin, User, Briefcase, Calendar } from "lucide-react";
import Branding from "../../assets/Icon Dark.svg";
import { aboutData } from "../../data/aboutData.ts";

const Section = () => {
  return (
    <motion.div
      className="top-0 w-full mx-auto desktop:h-[100vh] flex flex-col z-10 p-8"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
    >
      <div className="relative grid grid-cols-10 gap-2 h-full overflow-hidden bg-white shadow-lg shadow-blue-500/20 rounded-xl border border-gray-200">
        {/* 3 Dots */}
        <div className="absolute top-4 right-6 z-10 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-gray-900 inline-block"></span>
          <span className="w-2 h-2 rounded-full bg-gray-900 inline-block"></span>
          <span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>
        </div>

        {/* Left Column - Icon */}
        <div className="p-4 phone:hidden desktop:col-span-1 desktop:border-r border-gray-100 desktop:flex flex-col justify-start desktop:bg-gray-50">
          <img
            src={Branding.src}
            alt="Branding"
            className="w-full object-contain"
          />
        </div>

        {/* Right Column - Content */}
        <div className="col-span-10 desktop:col-span-9 flex flex-col justify-between h-full bg-white p-6 tablet:p-8 desktop:p-12 overflow-y-auto">
          {/* Top Section */}
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl tablet:text-8xl font-bold text-gray-900 leading-tight pr-12">
              Hi, I'm{" "}
              <span className="text-blue-500 text-blue-500 drop-shadow-[0_10px_20px_rgba(59,130,246,0.25)]">
                {aboutData.name}
              </span>
            </h2>

            <div className="flex flex-col gap-3 text-sm font-mono text-gray-700">
              <div className="flex items-center gap-3">
                <Briefcase
                  size={18}
                  className="text-gray-700"
                  strokeWidth={2.5}
                />
                {aboutData.role}
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-gray-700" strokeWidth={2.5} />
                Based in {aboutData.location}
              </div>
              <div className="flex items-center gap-3">
                <Calendar
                  size={18}
                  className="text-gray-700"
                  strokeWidth={2.5}
                />
                {aboutData.experience} of Work Experience
              </div>
              <div className="flex items-center gap-3">
                <User size={18} className="text-gray-700" strokeWidth={2.5} />
                {aboutData.age} Years Old
              </div>
            </div>
          </div>

          {/* Bottom Section (CTA Buttons / Stats) */}
          <div className="">
            <div className="flex w-full justify-between items-end text-gray-700 text-sm leading-relaxed  text-lg">
              <p className="max-w-lg">{aboutData.bio} </p>
              <p className="hidden tablet:flex">
                Developer Portfolio
                <span className="ml-2 text-blue-500 font-bold">V1</span>
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-100 hidden desktop:flex items-center gap-4 w-full">
              <button className="px-6 py-3 bg-blue-500 text-white rounded-md font-bold shadow-xl shadow-blue-400/20 hover:scale-105 transition-all group">
                Get in Touch
              </button>
              {/* <a */}
              {/*   href="/works" */}
              {/*   className="px-6 py-3 inline-flex gap-4 items-center border border-gray-300 text-gray-900 rounded-md font-bold hover:bg-gray-200 transition-all group" */}
              {/* > */}
              {/*   View Works{" "} */}
              {/*   <span className="group-hover:translate-x-2 transition-transform"> */}
              {/*     → */}
              {/*   </span> */}
              {/* </a> */}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Section;
