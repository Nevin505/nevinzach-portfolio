"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  TerminalIcon,
  SettingsIcon,
  PowerIcon,
  MenuIcon,
  CloseIcon,
} from "@/components/svg";

export interface NavItem {
  label: string;
  href: string;
}

export interface NavbarProps {
  systemTitle?: string;
  brandText?: string;
  navItems?: NavItem[];
  onTerminalClick?: () => void;
  onSettingsClick?: () => void;
  onPowerClick?: () => void;
  className?: string;
}

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { label: "projects", href: "/projects" },
  { label: "experience", href: "/experience" },
  { label: "contact", href: "/contact" },
];


export function Navbar({
  systemTitle = "Nevin Zachariah John",
  brandText = "DEV_OS V2.4",
  navItems = DEFAULT_NAV_ITEMS,
  onTerminalClick,
  onSettingsClick,
  onPowerClick,
  className = "",
}: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={`w-full select-none ${className}`}>
      {/* Main OS-style Navigation Bar */}
      <nav className="relative flex items-center justify-between px-4 sm:px-6 py-3 bg-surface-container/90 backdrop-blur-md border-y border-outline-variant/40 shadow-lg">
        {/* Left: Brand & Nav Links */}
        <div className="flex items-center gap-6 sm:gap-10">
          {/* Brand/OS Version */}
          <Link
            href="/"
            className="font-mono text-sm sm:text-base font-bold text-secondary tracking-widest hover:brightness-125 transition-all"
          >
            {brandText}
          </Link>

          {/* Desktop Nav Items */}
          <ul className="hidden sm:flex items-center gap-6 font-mono text-sm">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname?.startsWith(item.href));

              return (
                <li key={item.href}>
                  <Link
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
                  </Link>
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
            onClick={onTerminalClick}
            aria-label="Open Terminal"
            title="Terminal"
            className="p-2 text-on-surface-variant hover:text-secondary hover:bg-surface-bright/70 active:scale-95 rounded-lg transition-all cursor-pointer"
          >
            <TerminalIcon className="w-5 h-5" />
          </button>

          {/* Settings Icon */}
          <button
            type="button"
            onClick={onSettingsClick}
            aria-label="Open Settings"
            title="Settings"
            className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-bright/70 active:scale-95 rounded-lg transition-all cursor-pointer"
          >
            <SettingsIcon className="w-5 h-5" />
          </button>

          {/* Power Button */}
          <button
            type="button"
            onClick={onPowerClick}
            aria-label="Power / Session"
            title="Power / System"
            className="p-2 text-on-surface-variant hover:text-error hover:bg-surface-bright/70 active:scale-95 rounded-lg transition-all cursor-pointer"
          >
            <PowerIcon className="w-5 h-5" />
          </button>

          {/* Resume Button */}
          <a
            href="/resume.pdf"
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

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-surface-container border border-outline-variant/50 rounded-xl shadow-xl sm:hidden z-50">
            <ul className="flex flex-col gap-3 font-mono text-sm">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname?.startsWith(item.href));

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-3 py-2 rounded-lg transition-colors ${
                        isActive
                          ? "bg-surface-bright text-secondary font-semibold"
                          : "text-on-surface-variant hover:bg-surface-bright/50 hover:text-on-surface"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
