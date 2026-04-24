import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export function Navigation() {
  const location = useLocation();
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.add('light-mode');
    }
  }, [isDark]);

  const links = [
    { name: "Journey", path: "/" },
    { name: "Chapters", path: "/chapters" },
    { name: "The Oracle", path: "/oracle" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full p-6 md:p-8 z-50 flex justify-between items-center bg-shanti-bg/80 backdrop-blur-md border-b border-shanti-gold/10">
      <Link to="/" className="text-xs tracking-[0.4em] uppercase font-light opacity-80 hover:opacity-100 transition-opacity">
        प्रशान्ति
      </Link>
      
      <div className="flex gap-4 md:gap-8 flex-1 justify-end items-center mr-4 md:mr-8 font-serif">
        {links.map(link => (
          <Link
            key={link.name}
            to={link.path}
            className={`text-sm tracking-wider uppercase transition-colors relative pb-1 ${
              location.pathname === link.path ? "text-shanti-gold" : "text-shanti-ink/60 hover:text-shanti-ink"
            }`}
          >
            {link.name}
            {location.pathname === link.path && (
              <motion.div
                layoutId="nav-underline"
                className="absolute left-0 right-0 bottom-0 h-[1px] bg-shanti-gold"
                initial={false}
              />
            )}
          </Link>
        ))}
      </div>

      <button
        onClick={() => setIsDark(!isDark)}
        className="p-2 rounded-full hover:bg-shanti-ink/5 transition-colors group"
        aria-label="Toggle theme"
      >
        {isDark ? (
          <Sun className="w-4 h-4 opacity-80 group-hover:opacity-100 group-hover:text-shanti-gold transition-colors" />
        ) : (
          <Moon className="w-4 h-4 opacity-80 group-hover:opacity-100 group-hover:text-shanti-gold transition-colors" />
        )}
      </button>
    </nav>
  );
}
