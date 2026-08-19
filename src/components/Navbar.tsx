import Menu from "./Menu.tsx";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

interface NavProps {
  currentPath: string;
  home?: boolean;
}

// Fixed typo: "lable" -> "label"
const NAV_LINKS = [
  { label: "about", href: "/" },
  { label: "works", href: "/works" },
  { label: "services", href: "/services" },
  { label: "blogs", href: "/blogs" },
];

export default function Navbar({ currentPath: initialPath, home }: NavProps) {
  const [currentPath, setCurrentPath] = useState(initialPath);
  const [showNavbar, setShowNavbar] = useState(!home);

  useEffect(() => {
    if (!home) {
      setShowNavbar(true);
      return;
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight / 2;
      setShowNavbar(scrollY >= vh);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [home]);

  useEffect(() => {
    const syncPath = () => {
      setCurrentPath(window.location.pathname);
    };

    document.addEventListener("astro:after-swap", syncPath);
    return () => document.removeEventListener("astro:after-swap", syncPath);
  }, []);

  const getActiveStyles = (path: string) => {
    const normalizedCurrent = currentPath.replace(/\/$/, "") || "/";
    const normalizedTarget = path.replace(/\/$/, "") || "/";

    return normalizedCurrent === normalizedTarget
      ? "opacity-100 bg-gray-900 text-white"
      : "font-normal opacity-70 hover:bg-gray-200";
  };

  return (
    <motion.div
      className="sticky z-50 top-0 left-0 h-fit tablet:h-screen w-16 desktop:w-23 p-2 desktop:p-6 flex flex-col justify-between"
      style={{
        translateZ: 0,
        pointerEvents: home && !showNavbar ? "none" : "auto",
      }}
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: showNavbar ? 1 : 0, x: showNavbar ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="flex desktop:hidden">
        <Menu />
      </div>

      {/* Navigation Links */}
      <div className="hidden desktop:flex flex-col items-center gap-16 py-10">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`-rotate-90 px-6 py-3 inline-flex gap-4 items-center text-gray-900 rounded-md font-bold transition-all group ${getActiveStyles(
              link.href,
            )}`}
          >
            {link.label}
          </a>
        ))}
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
          <img
            src="/linkedin.svg"
            alt="linkedin icon"
            className="w-3 tablet:w-4"
          />
        </a>
      </div>
    </motion.div>
  );
}
