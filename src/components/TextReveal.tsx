import React from "react";
import { motion } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  highlightWord?: string;
  highlightClass?: string;
}

export default function TextReveal({
  text,
  className = "",
  highlightWord = "beautiful",
  highlightClass = "text-blue-500",
}: TextRevealProps) {
  const words = text.split(" ");

  // Parent container animation controls the staggered delay for each word
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  // Individual word animation
  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.2, 0.65, 0.3, 0.9] },
    },
  };

  return (
    <motion.h1
      className={`flex flex-wrap ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {words.map((word, index) => {
        // Clean word to accurately match "beautiful." with "beautiful"
        const cleanWord = word.replace(/[^a-zA-Z]/g, "").toLowerCase();
        const isHighlighted = cleanWord === highlightWord.toLowerCase();

        return (
          <motion.span
            key={index}
            variants={wordVariants}
            className={`inline-block mr-[0.25em] ${
              isHighlighted ? highlightClass : ""
            }`}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.h1>
  );
}
