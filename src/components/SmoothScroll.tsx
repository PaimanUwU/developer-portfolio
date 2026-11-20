import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function SmoothScroll() {
  useEffect(() => {
    function createLenis() {
      // Reset native scroll BEFORE Lenis reads window.scrollY in its constructor
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: "vertical",
        gestureDirection: "vertical",
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      });

      let rafId: number;

      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);

      return () => {
        cancelAnimationFrame(rafId);
        lenis.destroy();
      };
    }

    // Start Lenis for the current page
    let cleanup = createLenis();

    // On Astro page transitions: destroy old Lenis before swap (so it
    // releases the scroll listener), then recreate after swap with a
    // fresh window.scrollY = 0 starting point.
    function onBeforeSwap() {
      cleanup();
    }

    function onAfterSwap() {
      cleanup = createLenis();
    }

    document.addEventListener("astro:before-swap", onBeforeSwap);
    document.addEventListener("astro:after-swap", onAfterSwap);

    return () => {
      cleanup();
      document.removeEventListener("astro:before-swap", onBeforeSwap);
      document.removeEventListener("astro:after-swap", onAfterSwap);
    };
  }, []);

  return null;
}
