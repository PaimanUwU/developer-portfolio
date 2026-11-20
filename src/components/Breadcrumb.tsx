import { motion } from "framer-motion";
import React from "react";

interface Props {
  path?: string;
}

export default function Breadcrumb({ path = "Home" }: Props) {
  // Split the path by "/" to style individual crumbs if you want
  const segments = path.split("/").map((seg) => seg.trim());

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-4 px-10 text-sm text-gray-500 flex items-center gap-2 border-b border-gray-200"
    >
      {segments.map((segment, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className="text-gray-300">/</span>}
          <span
            className={
              index === segments.length - 1 ? "text-black font-medium" : ""
            }
          >
            {segment}
          </span>
        </React.Fragment>
      ))}
    </motion.nav>
  );
}
