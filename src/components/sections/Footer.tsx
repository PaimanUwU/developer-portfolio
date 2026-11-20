import { useState } from "react";
import { Cpu, Globe, Blocks } from "lucide-react";
import { aboutData } from "../../data/aboutData";

const chip =
  "px-1.5 py-0.5 text-xs font-mono text-gray-500 rounded transition-all duration-200 hover:bg-gray-900 hover:text-white cursor-default";

const heading =
  "px-8 py-4 border-b border-gray-200 text-sm font-display uppercase tracking-widest text-gray-900";

export default function Footer() {
  const [randoms] = useState(() => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    return Array.from({ length: 52 }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length)),
    );
  });

  return (
    <footer className="relative w-full border-t border-gray-200 bg-gray-50">
      <div>
        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 desktop:grid-cols-12">
          {/* Brand column */}
          <div className="desktop:col-span-7 flex flex-col px-8 tablet:px-14 pt-16 pb-10 border-b desktop:border-b-0 desktop:border-r border-gray-200">
            <h2 className="text-5xl tablet:text-9xl font-bold text-gray-900 tracking-tighter leading-none">
              paimanuwu
              <span className="ml-2 text-blue-500 text-xl tablet:text-2xl tracking-normal">
                .dev
              </span>
            </h2>
          </div>

          {/* Links column */}
          <div className="desktop:col-span-2 flex flex-col border-b desktop:border-b-0 desktop:border-r border-gray-200">
            <h3 className={heading}>Connect</h3>
            <div className="flex flex-col gap-1 items-start px-8 py-8">
              {aboutData.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-2 py-0.5 -ml-2 text-xs font-mono text-gray-500 rounded transition-all duration-200 hover:bg-gray-900 hover:text-white flex items-center gap-2"
                >
                  <span className="opacity-0 hidden group-hover:opacity-100 group-hover:flex transition-opacity">
                    →
                  </span>
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          {/* System info column */}
          <div className="desktop:col-span-3 flex flex-col">
            <h3 className={heading}>System Info</h3>
            <div className="flex flex-col gap-3 px-8 py-8">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 text-xs text-gray-900 font-bold">
                  <Cpu size={14} /> OS:
                </div>
                <div className="flex gap-1">
                  {["MacOS", "Arch Linux"].map((os) => (
                    <span key={os} className={chip}>
                      {os}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 text-xs text-gray-900 font-bold">
                  <Globe size={14} /> Loc:
                </div>
                <span className={chip}>Malaysia</span>
              </div>

              <div className="flex items-start gap-1 mt-1">
                <div className="py-0.5 flex items-center gap-2 text-xs text-gray-900 font-bold w-fit">
                  <Blocks size={14} /> Tech:
                </div>
                <div className="flex flex-wrap gap-1">
                  {aboutData.techStack.map((tech) => (
                    <span key={tech} className={chip}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="hidden desktop:flex flex-row justify-between items-center gap-4 px-8 tablet:px-14 py-4 border-t border-gray-200 text-[10px] font-mono text-gray-400 uppercase tracking-widest">
          <span>Nice to meet you</span>
          <p>Built with Astro &amp; Way Too Much CSS</p>
        </div>

        {/* ── Pattern box ── */}
        <div className="animate-pattern-move flex justify-end items-end min-h-[20vh] desktop:min-h-[30vh] p-4 tablet:p-10 border-t border-gray-200 bg-[repeating-linear-gradient(135deg,_#f3f4f6_0,_#334155_2px,_transparent_0,_transparent_50%)] bg-[size:20px_20px]">
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
