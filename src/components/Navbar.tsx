import Menu from "./Menu.tsx";
import { motion } from "framer-motion";
import React, { useEffect, useState } from 'react';

interface NavProps {
  currentPath: string;
}

export default function Navbar({ currentPath: initialPath }: NavProps) {
  // Use state so the component re-renders when the URL changes
  const [currentPath, setCurrentPath] = useState(initialPath);

  useEffect(() => {
    const syncPath = () => {
      // Update state with the new browser path after Astro swaps the page
      setCurrentPath(window.location.pathname);
    };

    document.addEventListener("astro:after-swap", syncPath);
    return () => document.removeEventListener("astro:after-swap", syncPath);
  }, []);

  // Helper to determine bolding
  const getActiveStyles = (path: string) => {
    // Normalizing paths (removing trailing slashes) ensures a match
    const normalizedCurrent = currentPath.replace(/\/$/, "") || "/";
    const normalizedTarget = path.replace(/\/$/, "") || "/";

    return normalizedCurrent === normalizedTarget
      ? "opacity-100 bg-gray-900 text-white "
      : "font-normal opacity-70 hover:bg-gray-200";
  };

  return (
    <motion.div
      className="sticky z-50 top-0 left-0 h-fit tablet:h-screen w-16 desktop:w-23 p-2 desktop:p-6 flex flex-col justify-between"
      style={{ translateZ: 0 }}
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
    >
      <div className="flex desktop:hidden">
        <Menu />
      </div>

      {/* Navigation Links with Gaps */}
      <div className="hidden desktop:flex flex-col items-center gap-16 py-10">
        <a
          href="/"
          className={`-rotate-90 px-6 py-3 inline-flex gap-4 items-center text-gray-900 rounded-md font-bold transition-all group ${getActiveStyles("/")}`}
        >
          about
        </a>

        <a
          href="/works"
          className={`-rotate-90 px-6 py-3 inline-flex gap-4 items-center text-gray-900 rounded-md font-bold transition-all group ${getActiveStyles("/works", "/works/*")}`}
        >
          works
        </a>

        <a
          href="/blogs"
          className={`-rotate-90 px-6 py-3 inline-flex gap-4 items-center text-gray-900 rounded-md font-bold transition-all grou ${getActiveStyles("/blogs", "/blogs/*")}`}
        >
          blogs
        </a>

      </div>

      {/* Social Icons */}
      <div className="hidden desktop:flex w-full flex-col justify-end gap-4">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-base-100 rounded-main w-full aspect-square flex items-center justify-center text-accent cursor-pointer transition-all ease-in-out duration-300 hover:scale-125"
        >
          <img src="/github.svg" alt="github icon" className="w-4 tablet:w-5" />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-base-100 rounded-main w-full aspect-square flex items-center justify-center text-accent cursor-pointer transition-all ease-in-out duration-300 hover:scale-125"
        >
          <img src="/linkedin.svg" alt="linkedin icon" className="w-3 tablet:w-4" />
        </a>
      </div>
    </motion.div>
  );
}
