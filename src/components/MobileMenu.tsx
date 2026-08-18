import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MobileMenuProps {
  currentPath: string;
}

const MobileMenu = ({ currentPath }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleToggle = () => setIsOpen((prev) => !prev);
    const handleClose = () => setIsOpen(false);

    window.addEventListener("toggle-mobile-menu", handleToggle);
    window.addEventListener("close-mobile-menu", handleClose);
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") handleClose();
    });

    return () => {
      window.removeEventListener("toggle-mobile-menu", handleToggle);
      window.removeEventListener("close-mobile-menu", handleClose);
    };
  }, []);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navLinks = [
    { name: "about", href: "/" },
    { name: "works", href: "/works" },
    { name: "blogs", href: "/blogs" },
  ];

  const socialLinks = [
    { name: "github", href: "https://github.com", icon: "/github.svg" },
    { name: "linkedin", href: "https://linkedin.com", icon: "/linkedin.svg" },
  ];

  const getActiveStyles = (path: string) => {
    const normalizedCurrent = currentPath.replace(/\/$/, "") || "/";
    const normalizedTarget = path.replace(/\/$/, "") || "/";

    return normalizedCurrent === normalizedTarget
      ? "text-white opacity-100"
      : "text-white/50 hover:text-white transition-colors";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "-100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-[100] bg-base-100 flex flex-col items-center justify-center p-8 desktop:hidden"
        >
          <div className="flex flex-col items-center gap-8 mb-12">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-4xl font-bold uppercase tracking-widest ${getActiveStyles(link.href)}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.name}
              </motion.a>
            ))}
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
