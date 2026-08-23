"use client";

import React, { useState, useEffect } from "react";
import {
  TerminalIcon,
  MenuIcon,
  CloseIcon,
  FileTextIcon,
} from "@/components/svg";
import { TerminalModal } from "@/components/TerminalModal";

export interface NavItem {
  label: string;
  href: string;
}

export interface NavbarProps {
  systemTitle?: string;
  brandText?: string;
  navItems?: NavItem[];
  onTerminalClick?: () => void;
  className?: string;
}

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { label: "projects", href: "#projects" },
  { label: "experience", href: "#experience" },
  { label: "contact", href: "#contact" },
];

export function Navbar({
  brandText = "DEV_OS V2.4",
  navItems = DEFAULT_NAV_ITEMS,
  onTerminalClick,
  className = "",
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  // Global Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll<HTMLElement>("section[id]");
      const scrollPosition = window.scrollY + 180;
      let current = "";

      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          current = section.getAttribute("id") || "";
        }
      });

      // If at bottom of page, highlight contact
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 50
      ) {
        current = "contact";
      }

      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full select-none ${className}`}>
      {/* Main OS-style Navigation Bar */}
      <nav className="relative flex items-center justify-between px-4 sm:px-6 py-3 bg-[#0a0f14]/95 backdrop-blur-md border-b border-outline-variant/40 shadow-lg">
        {/* Left: Brand & Nav Links */}
        <div className="flex items-center gap-6 sm:gap-10">
          {/* Brand/OS Version */}
          <a
            href="#"
            className="font-mono text-sm sm:text-base font-bold text-secondary tracking-widest hover:brightness-125 transition-all"
          >
            {brandText}
          </a>

          {/* Desktop Nav Items */}
          <ul className="hidden sm:flex items-center gap-6 font-mono text-sm">
            {navItems.map((item) => {
              const targetId = item.href.replace("#", "");
              const isActive = activeSection === targetId;

              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`relative py-1 transition-colors ${
                      isActive
                        ? "text-on-surface font-semibold"
                        : "text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute left-0 bottom-0 w-full h-[2px] bg-on-surface rounded-full transition-all" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right: System Action Controls */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Terminal Icon */}
          <button
            type="button"
            onClick={onTerminalClick || (() => setIsTerminalOpen(true))}
            aria-label="Open Terminal (Cmd+K)"
            title="Terminal (Cmd+K)"
            className="p-2 text-on-surface-variant hover:text-secondary hover:bg-surface-bright/70 active:scale-95 rounded-lg transition-all cursor-pointer"
          >
            <TerminalIcon className="w-5 h-5" />
          </button>

          {/* Resume Button (Desktop) */}
          <a
            href="/resume.pdf"
            download="Nevin_Zachariah_John_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center justify-center px-3 py-1.5 text-xs font-mono font-medium text-on-primary bg-primary hover:brightness-110 active:scale-95 rounded-md transition-all ml-1 cursor-pointer"
          >
            Resume
          </a>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            className="sm:hidden p-2 text-on-surface-variant hover:text-on-surface rounded-lg transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? (
              <CloseIcon className="w-5 h-5" />
            ) : (
              <MenuIcon className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 p-4 bg-[#0e141a] border-b border-x border-outline-variant/60 rounded-b-2xl shadow-2xl sm:hidden z-50">
            <ul className="flex flex-col gap-2 font-mono text-sm">
              {/* Mobile Terminal Action */}
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsTerminalOpen(true);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-bright/50 hover:text-secondary font-mono text-sm transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <TerminalIcon className="w-4 h-4 text-secondary" />
                    <span>Open Terminal</span>
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#1a2026] text-outline">
                    ⌘K
                  </span>
                </button>
              </li>

              {navItems.map((item) => {
                const targetId = item.href.replace("#", "");
                const isActive = activeSection === targetId;

                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-3 py-2.5 rounded-lg transition-colors ${
                        isActive
                          ? "bg-surface-bright text-secondary font-semibold border-l-2 border-secondary"
                          : "text-on-surface-variant hover:bg-surface-bright/50 hover:text-on-surface"
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}

              {/* Mobile Resume Link */}
              <li className="pt-2 border-t border-outline-variant/30">
                <a
                  href="/resume.pdf"
                  download="Nevin_Zachariah_John_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-primary/20 text-secondary border border-secondary/40 font-semibold"
                >
                  <span>Download Resume</span>
                  <FileTextIcon className="w-4 h-4" />
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* Interactive Command Palette / Terminal Modal */}
      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />
    </header>
  );
}

export default Navbar;
