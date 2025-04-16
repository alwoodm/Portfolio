"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Courses", href: "#courses" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      // Active section highlight
      const sections = NAV_LINKS.map(link => document.getElementById(link.href.slice(1)));
      const scrollPos = window.scrollY + 80;
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && sections[i]!.offsetTop <= scrollPos) {
          setActive(NAV_LINKS[i].href.slice(1));
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.getElementById(href.slice(1));
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-background/90 shadow-lg" : "bg-transparent"}`}
      style={{ backgroundColor: scrolled ? "#0f172aE6" : "transparent", boxShadow: scrolled ? "0 2px 8px 0 #0002" : "none" }}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="#home" className="text-2xl font-bold select-none" style={{ color: "#60a5fa" }}>
          &lt;alwood/&gt;
        </Link>
        <ul className="hidden md:flex gap-6">
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={e => handleNavClick(e, link.href)}
                className={`transition-colors px-2 py-1 rounded ${active === link.href.slice(1) ? "text-primary" : "text-white hover:text-primary"}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Open menu"
          onClick={() => setMenuOpen(v => !v)}
        >
          <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? "opacity-0" : ""}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}></span>
        </button>
      </nav>
      {/* Mobile menu */}
      {menuOpen && (
        <ul className="md:hidden flex flex-col gap-4 px-6 pb-6 bg-background/95">
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={e => handleNavClick(e, link.href)}
                className={`block w-full py-2 text-lg rounded ${active === link.href.slice(1) ? "text-primary" : "text-white hover:text-primary"}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
