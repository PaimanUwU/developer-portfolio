import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu as MenuIcon, X } from "lucide-react";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleToggle = () => setIsOpen((prev) => !prev);
    const handleClose = () => setIsOpen(false);

    window.addEventListener("toggle-mobile-menu", handleToggle);
    window.addEventListener("close-mobile-menu", handleClose);

    return () => {
      window.removeEventListener("toggle-mobile-menu", handleToggle);
      window.removeEventListener("close-mobile-menu", handleClose);
    };
  }, []);

  const toggleMenu = () => {
    window.dispatchEvent(new CustomEvent("toggle-mobile-menu"));
  };

  return (
    <div
      className="z-[110] bg-base-100 rounded-main border border-white w-full mt-2 aspect-square flex items-center justify-center text-accent cursor-pointer transition-all ease-in-out duration-300 hover:scale-110 active:scale-95"
      onClick={toggleMenu}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isOpen ? "close" : "open"}
          initial={{ opacity: 0, rotate: -90 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 90 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? <MenuIcon size={24} /> : <MenuIcon size={24} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Menu;
