import React, { useState, useEffect } from "react";
import { Cpu, Globe, Blocks } from "lucide-react";
import { aboutData } from "../../data/aboutData";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const [randoms] = useState(() => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    return Array.from({ length: 52 }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length)),
    );
  });

  return (
    <footer className="border-t-2 border-gray-200 bg-gray-50 relative w-full desktop:py-16 ">
      <div className="max-w-[94vw] mx-auto grid grid-cols-1 desktop:grid-cols-12 gap-12">
        {/* Brand & Status Column */}
        <div className="tablet:col-span-7 gap-10 flex flex-col pt-8 pb-4 desktop:pt-0">
          <div>
            <h2 className="desktop:pl-10 desktop:-translate-y-10 translate-y-4 text-5xl tablet:text-9xl font-bold text-gray-900 tracking-tighter ">
              paimanuwu
              <span className="text-blue-500 text-xl tablet:text-2xl tracking-normal">
                .dev
              </span>
            </h2>
          </div>
        </div>

        {/* Links Column */}
        <div className="tablet:col-span-2 flex flex-col gap-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900">
            Connect
          </h3>
          <div className="flex flex-col gap-1 items-start">
            {aboutData.socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-0.5 -ml-2 text-xs font-mono text-gray-500 rounded transition-all duration-200 hover:bg-gray-900 hover:text-white flex items-center gap-2 group"
              >
                {/* Subtle indicator that only shows on hover */}
                <span className="opacity-0 hidden group-hover:opacity-100 group-hover:flex transition-opacity">
                  →
                </span>
                {social.name}
              </a>
            ))}
          </div>
        </div>

        {/* System Info Column */}
        <div className="tablet:col-span-3 flex flex-col gap-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900">
            System Info
          </h3>

          <div className="grid grid-cols-1 gap-y-3">
            <div className="py-0.5 flex items-center gap-2">
              <div class=" flex items-center gap-2 text-xs text-gray-900 font-bold">
                <Cpu size={14} /> OS:
              </div>
              <div className="flex gap-1">
                {["MacOS", "Arch Linux"].map((os) => (
                  <span
                    key={os}
                    className="px-1.5 py-0.5 text-xs font-mono text-gray-500 rounded transition-all duration-200 hover:bg-gray-900 hover:text-white cursor-default"
                  >
                    {os}
                  </span>
                ))}
              </div>
            </div>

            <div className="py-0.5 flex items-center gap-2">
              <div class=" flex items-center gap-2 text-xs text-gray-900 font-bold">
                <Globe size={14} /> Loc:
              </div>
              <span className="px-1.5 py-0.5 text-xs font-mono text-gray-500 rounded transition-all duration-200 hover:bg-gray-900 hover:text-white cursor-default">
                Malaysia
              </span>
            </div>

            <div className="flex flex-row items-start gap-1 mt-1">
              <div className="py-0.5 flex items-center gap-2 text-xs text-gray-900 font-bold group w-fit">
                <Blocks size={14} />
                <span className="text-xs text-gray-900 font-bold">Tech:</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {aboutData.techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="px-1.5 py-0.5 text-xs font-mono text-gray-500 rounded transition-all duration-200 hover:bg-gray-900 hover:text-white cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-16 pt-8 desktop:pl-26 desktop:pr-16 border-t border-gray-200 hidden desktop:flex flex-col flex-row justify-between items-center gap-4 text-[10px] font-mono text-gray-400 uppercase tracking-widest">
        <div className="flex items-center gap-3 w-fit">
          {/* <span className="relative flex h-2 w-2"> */}
          {/*   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span> */}
          {/*   <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span> */}
          {/* </span> */}
          {/* Available for new opportunities */}
          Nice to meet you
        </div>
        <p>Built with Astro & Way Too Much CSS</p>
      </div>

      {/* Pattern Box with Individual Hover Tags */}
      <div className="desktop:pl-26 desktop:pr-16 pt-8 desktop:pt-0">
        <div className="animate-pattern-move flex justify-end items-end  mt-8 min-h-[20vh] desktop:min-h-[30vh] p-4 tablet:p-10 rounded-b-main bg-[repeating-linear-gradient(135deg,_#f3f4f6_0,_#334155_2px,_transparent_0,_transparent_50%)] bg-[size:20px_20px] gap-2">
          <div className="hidden desktop:flex text-sm text-gray-500 font-mono flex-wrap gap-x-0.5 items-center bg-white h-fit p-1 shadow-sm">
            <span className="mr-2 italic">I love caffeine</span>
            <div className="flex flex-wrap gap-x-0.5">
              {randoms.map((char, i) => (
                <span
                  key={i}
                  className="italic transition-all duration-75 hover:bg-gray-900 hover:text-white cursor-none select-none"
                >
                  {char}
                </span>
              ))}
            </div>
            <span>.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
