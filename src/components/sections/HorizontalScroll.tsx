import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import TextReveal from "../TextReveal";

export default function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Hold static until 0.3 progress, then translate horizontally from 0.3 to 1.0
  const x = useTransform(
    scrollYProgress,
    [0, 0.3, 0.8, 1],
    ["0%", "0%", "-50%", "-50%"],
  );

  // Listen to scroll progress changes
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const isFullyHorizontal = latest >= 0.95;
    window.dispatchEvent(
      new CustomEvent("navbar-invert", {
        detail: { invert: isFullyHorizontal },
      }),
    );
  });

  // Featured Works Data
  const projects = [
    { title: "Featured Project One", category: "Web App", span: "col-span-2" },
    { title: "Project Two", category: "Design System", span: "col-span-1" },
    { title: "Project Three", category: "Mobile App", span: "col-span-1" },
    { title: "Project Four", category: "E-Commerce", span: "col-span-1" },
    { title: "Project Five", category: "Branding", span: "col-span-1" },
  ];

  return (
    <div ref={containerRef} className="relative h-[350vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <motion.div
          style={{ x }}
          className="flex w-[200vw] h-full justify-start"
        >
          {/* Panel 1 */}
          <section className="w-[100vw] h-full flex-shrink-0 flex items-center pl-24 pr-12 py-12 bg-white">
            <TextReveal
              client:load
              text="I don't just ship sites, I make everything look beautiful."
              highlightWord="beautiful"
              highlightClass="text-blue-500 drop-shadow-[0_10px_20px_rgba(59,130,246,0.35)]"
              className="text-8xl text-gray-900 font-black tracking-tighter max-w-5xl"
            />
          </section>

          {/* Panel 2 (Featured Works Grid) */}
          <section className="w-[100vw] h-full flex-shrink-0 grid grid-cols-7 gap-6 items-center bg-white text-gray-900 pl-28 pr-12 py-12">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className={`${project.span} h-[70vh] rounded-xl bg-gray-100 hover:bg-gray-200 border border-gray-200/80 p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer group`}
              >
                <div className="flex justify-between items-start">
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/50">
                    {project.category}
                  </span>
                  <span className="text-sm font-bold text-gray-400 group-hover:text-gray-900 transition-colors">
                    0{idx + 1}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                </div>
              </div>
            ))}

            {/* View Works Call-to-Action Card */}
            <a
              href="/works"
              className="col-span-1 h-[70vh] rounded-xl bg-gray-900 hover:bg-blue-600 text-white p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group cursor-pointer"
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 group-hover:text-white transition-colors">
                Archive
              </span>
              <span className="w-full flex justify-center text-8xl group-hover:translate-x-2 transition-transform duration-300">
                →
              </span>
              <div className="flex flex-col gap-4">
                <span className="text-3xl font-black tracking-tight leading-tight">
                  View All Works
                </span>
              </div>
            </a>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
