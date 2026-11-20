import { motion, useReducedMotion, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { aboutData } from "../../data/aboutData.ts";

const interruptEvents = ["wheel", "touchstart", "keydown"] as const;

function useLocalTime() {
  const [time, setTime] = useState(() => {
    return new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  });

  useEffect(() => {
    const id = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
      );
    }, 10_000);
    return () => clearInterval(id);
  }, []);

  return time;
}

const Hero = () => {
  const reduceMotion = useReducedMotion();
  const localTime = useLocalTime();

  const scrollDown = () => {
    const from = window.scrollY;
    const to = from + window.innerHeight;

    if (reduceMotion) {
      window.scrollTo({ top: to, behavior: "instant" });
      return;
    }

    const stop = () => {
      controls.stop();
      interruptEvents.forEach((e) => window.removeEventListener(e, stop));
    };
    const controls = animate(from, to, {
      duration: 1.2,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (y) => window.scrollTo({ top: y, behavior: "instant" }),
      onComplete: stop,
    });
    interruptEvents.forEach((e) =>
      window.addEventListener(e, stop, { passive: true }),
    );
  };

  return (
    <motion.section
      className="w-full border-b border-gray-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* ── Two-column split ── */}
      <div className="grid grid-cols-1 desktop:grid-cols-2 min-h-[90svh] desktop:min-h-[90svh]">
        {/* ════════ LEFT PANEL ════════ */}
        <div className="flex flex-col border-b desktop:border-b-0 desktop:border-r border-gray-200">
          {/* Top portion — large name */}
          <div className="flex-1 flex items-end px-8 tablet:px-14 pt-24 pb-8 border-b border-gray-200">
            <motion.h1
              className="font-display font-bold leading-[0.9] tracking-tight text-black"
              style={{ fontSize: "clamp(4rem, 10vw, 9rem)" }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: 1,
              }}
            >
              {aboutData.name}
            </motion.h1>
          </div>

          {/* Bottom portion — three dots + bio */}
          <div className="flex flex-col">
            {/* Dots indicator */}
            <div className="flex items-center gap-2 px-8 tablet:px-14 py-4 border-b border-gray-200">
              <span className="h-2.5 w-2.5 rounded-full border border-gray-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-primary" />
              <span className="h-2.5 w-2.5 rounded-full bg-black" />
            </div>

            {/* Bio text */}
            <motion.p
              className="px-8 tablet:px-14 py-10 text-base tablet:text-lg leading-relaxed text-gray-700 max-w-sm"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 1.3 }}
            >
              {aboutData.bio}
            </motion.p>
          </div>
        </div>

        {/* ════════ RIGHT PANEL ════════ */}
        <div className="flex flex-col">
          {/* Logo centred in the upper right */}
          <div className="flex flex-1 items-center justify-center border-b border-gray-200 py-16 px-8">
            <motion.img
              src="/Branding-Logo.svg"
              alt={`${aboutData.name} logo`}
              className="w-32 tablet:w-44 desktop:w-52 h-auto object-contain text-[#151D20]"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.2,
              }}
            />
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 border-b border-gray-200">
            {[
              { label: "Local Time", value: localTime },
              { label: "Age", value: `${aboutData.age} Years Old` },
              { label: "Based In", value: aboutData.location },
            ].map(({ label, value }, i) => (
              <div
                key={label}
                className={`flex flex-col gap-0.5 px-5 py-4 ${i < 2 ? "border-r border-gray-200" : ""}`}
              >
                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-mono">
                  {label}
                </span>
                <motion.span
                  className="text-sm font-semibold text-black whitespace-nowrap"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "tween",
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 1.6,
                  }}
                >
                  {value}
                </motion.span>
              </div>
            ))}
          </div>

          {/* Dot-grid decorative area */}
          <div
            className="flex-1 min-h-[12rem]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
        </div>
      </div>

      {/* ── Scroll indicator centred at bottom ── */}
      <button
        type="button"
        onClick={scrollDown}
        aria-label="Scroll down"
        className="w-full flex items-center justify-center gap-2 py-3 border-t border-gray-200 text-[11px] uppercase tracking-widest text-gray-400 font-mono hover:text-black transition-colors"
      >
        <motion.span
          animate={reduceMotion ? undefined : { y: [0, 4, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          ↓
        </motion.span>
      </button>
    </motion.section>
  );
};

export default Hero;
