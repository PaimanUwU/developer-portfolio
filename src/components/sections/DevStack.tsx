import React from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { aboutData } from "../../data/aboutData.ts";

const techIcons: Record<string, string> = {
  Laravel: "https://cdn.simpleicons.org/laravel/FF2D20",
  TypeScript: "https://cdn.simpleicons.org/typescript/3178C6",
  React: "https://cdn.simpleicons.org/react/61DAFB",
  Astro: "https://cdn.simpleicons.org/astro/FF5D01",
  Golang: "https://cdn.simpleicons.org/go/00ADD8",
  TailwindCSS: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
  Neovim: "https://cdn.simpleicons.org/neovim/57A143",
  MacOS: "https://cdn.simpleicons.org/apple/000000",
  "Arch Linux": "https://cdn.simpleicons.org/archlinux/1793D1",
  Docker: "https://cdn.simpleicons.org/docker/2496ED",
  PHP: "https://cdn.simpleicons.org/php/777BB4",
  "Framer Motion": "https://cdn.simpleicons.org/framer/0055FF",
  Zsh: "https://cdn.simpleicons.org/zsh/F15A24",
  Tmux: "https://cdn.simpleicons.org/tmux/1BB91F",
  Git: "https://cdn.simpleicons.org/git/F05032",
  "Node.js": "https://cdn.simpleicons.org/nodedotjs/5FA04E",
};

// Deduplicate the tech stack
const uniqueStack = Array.from(new Set(aboutData.techStack));

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

const DevStack = () => {
  return (
    <motion.div
      className="w-full mx-auto flex flex-col z-10 pt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
    >
      {/* Header */}
      <div className="flex flex-col px-6 tablet:pl-24 pr-6 tablet:pr-8 desktop:pr-12 pt-8 pb-6">
        <span className="text-xs font-mono font-semibold uppercase tracking-widest text-blue-500 mb-3 block">
          // Dev Stack
        </span>
        <h2 className="text-5xl tablet:text-7xl font-black tracking-tighter text-gray-900 leading-none">
          The tool I use
          <br />
        </h2>
      </div>

      {/* Stack grid */}
      <div className="px-6 tablet:pl-24 pr-6 tablet:pr-8 desktop:pr-12 py-8">
        <motion.div
          className="grid grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 gap-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {uniqueStack.map((tech) => (
            <motion.div
              key={tech}
              variants={itemVariants}
              className="group flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-100 bg-gray-50 hover:bg-white hover:border-blue-200 hover:shadow-md hover:shadow-blue-400/10 transition-all duration-200 cursor-default"
            >
              {techIcons[tech] ? (
                <img
                  src={techIcons[tech]}
                  alt={tech}
                  className="w-5 h-5 object-contain flex-shrink-0 group-hover:scale-110 transition-transform duration-200"
                />
              ) : (
                <span className="w-5 h-5 rounded-sm bg-gray-200 flex-shrink-0" />
              )}
              <span className="text-xs font-mono text-gray-700 group-hover:text-blue-600 transition-colors duration-200 truncate">
                {tech}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Footer note */}
      <div className="px-6 tablet:pl-24 pr-6 tablet:pr-8 desktop:pr-12 pb-6 pt-4 flex items-center justify-between">
        {/* <span className="text-xs font-mono text-gray-400"> */}
        {/*   // always learning, always building */}
        {/* </span> */}
        {/* <span className="text-xs font-mono text-gray-400 hidden tablet:block"> */}
        {/*   Dev Stack <span className="text-blue-500 font-bold">v1</span> */}
        {/* </span> */}
      </div>
    </motion.div>
  );
};

export default DevStack;
