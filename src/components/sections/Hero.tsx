import { animate, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { aboutData } from "../../data/aboutData.ts";

const facts = [
  { label: "Role", value: aboutData.role },
  { label: "Location", value: aboutData.location },
  { label: "Experience", value: aboutData.experience },
  { label: "Age", value: `${aboutData.age} years old` },
];

const interruptEvents = ["wheel", "touchstart", "keydown"] as const;

const Section = () => {
  const reduceMotion = useReducedMotion();

  // Native smooth scroll can't be tuned, so animate the scroll position ourselves.
  const scrollDown = () => {
    const from = window.scrollY;
    const to = from + window.innerHeight;

    if (reduceMotion) {
      window.scrollTo({ top: to, behavior: "instant" });
      return;
    }

    // Let the visitor take over: any wheel, touch or key press cancels the animation.
    const stop = () => {
      controls.stop();
      interruptEvents.forEach((e) => window.removeEventListener(e, stop));
    };
    const controls = animate(from, to, {
      duration: 1.2, // seconds, raise for slower
      ease: [0.65, 0, 0.35, 1], // gentle ease-in-out
      onUpdate: (y) => window.scrollTo({ top: y, behavior: "instant" }),
      onComplete: stop,
    });
    interruptEvents.forEach((e) =>
      window.addEventListener(e, stop, { passive: true }),
    );
  };

  return (
    <motion.div
      className="top-0 w-full mx-auto h-fit flex flex-col z-10"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
    >
      <div className="relative h-full overflow-y-auto bg-white border-b border-gray-200 px-6 tablet:px-12 desktop:px-20 pt-6 pb-24 desktop:pb-28">
        <div className="flex h-full flex-col">
          {/* Top bar: dash left, dots right */}
          <div className="flex h-10 items-center justify-between">
            <span aria-hidden="true" className="block h-0.5 w-10 bg-primary" />
            <div className="flex items-center gap-2" aria-hidden="true">
              <span className="h-2 w-2 rounded-full bg-black" />
              <span className="h-2 w-2 rounded-full bg-black" />
              <span className="h-2 w-2 rounded-full bg-primary" />
            </div>
          </div>

          {/* Main block, centered in the free space */}
          <div className="flex flex-1 flex-col justify-center gap-14 py-12">
            <h1 className="flex items-baseline gap-[0.18em] font-display font-light leading-none tracking-tight-3 text-black text-6xl tablet:text-8xl desktop:text-hero">
              <img
                src="/Branding-Logo.svg"
                alt=""
                aria-hidden="true"
                className="h-[0.72em] w-auto shrink-0 object-contain"
              />
              <span className="token-hero">{aboutData.name}</span>
            </h1>

            <div className="grid gap-10 pt-8 desktop:grid-cols-12">
              {/* Bio + CTA */}
              <div className="desktop:col-span-6">
                <p className="max-w-md text-lg leading-relaxed text-gray-600">
                  {aboutData.bio}
                </p>
                <button className="mt-8 inline-flex items-center gap-2  bg-primary px-6 py-3 text-white token-heading shadow-xl shadow-primary/20 transition-transform  motion-reduce:hover:scale-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                  Get in Touch
                  <ArrowUpRight
                    size={16}
                    aria-hidden="true"
                    className="hover:translate-x-1 hover:-translate-y-1"
                  />
                </button>
              </div>

              {/* Small-label facts */}
              <dl className="grid grid-cols-2 gap-x-8 gap-y-6 desktop:col-span-5 desktop:col-start-8">
                {facts.map(({ label, value }) => (
                  <div key={label}>
                    <dt className="text-[11px] uppercase tracking-[0.18em] text-gray-400">
                      {label}
                    </dt>
                    <dd className="mt-1 text-sm text-black">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          type="button"
          onClick={scrollDown}
          aria-label="Scroll down"
          className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <span className="text-[11px] uppercase tracking-[0.18em] text-gray-400">
            Scroll
          </span>
          <span
            aria-hidden="true"
            className="relative block h-10 w-px overflow-hidden bg-gray-200"
          >
            <motion.span
              className="absolute left-0 top-0 block h-4 w-px bg-primary"
              initial={{ y: reduceMotion ? 0 : -16 }}
              animate={reduceMotion ? undefined : { y: [-16, 40] }}
              transition={{
                duration: 1.8,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 0.4,
              }}
            />
          </span>
        </button>
      </div>
      <div class="animate-pattern-move flex justify-end items-end min-h-[20vh] desktop:min-h-[30vh] p-4 tablet:p-10 border-b border-gray-200 rounded-b-main bg-[repeating-linear-gradient(135deg,_#f3f4f6_0,_#334155_2px,_transparent_0,_transparent_50%)] bg-[size:20px_20px] gap-2">
        {" "}
      </div>
    </motion.div>
  );
};

export default Section;
