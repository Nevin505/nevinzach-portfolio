"use client";

import React, { useState } from "react";
import Link from "next/link";

export interface NavItem {
  label: string;
  href: string;
}

export interface NavbarProps {
  systemTitle?: string;
  brandText?: string;
  navItems?: NavItem[];
  currentPath?: string;
  onTerminalClick?: () => void;
  onSettingsClick?: () => void;
  onPowerClick?: () => void;
  className?: string;
}

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { label: "projects", href: "#projects" },
  { label: "contact", href: "#contact" },
];

export function Navbar({
  systemTitle = "Nevin Zachariah John",
  brandText = "DEV_OS V2.4",
  navItems = DEFAULT_NAV_ITEMS,
  currentPath = "#contact",
  onTerminalClick,
  onSettingsClick,
  onPowerClick,
  className = "",
}: NavbarProps) {
  const [activeItem, setActiveItem] = useState(currentPath);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={`w-full select-none ${className}`}>
      {/* Top Window/OS Title Header */}
      {systemTitle && (
        <div className="flex items-center gap-2 px-4 py-1.5 text-xs text-outline font-mono">
          <svg
            className="w-3.5 h-3.5 opacity-80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect width="20" height="14" x="2" y="3" rx="2" />
            <line x1="8" x2="16" y1="21" y2="21" />
            <line x1="12" x2="12" y1="17" y2="21" />
          </svg>
          <span className="truncate tracking-tight">{systemTitle}</span>
        </div>
      )}

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
              const isActive = activeItem === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setActiveItem(item.href)}
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
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m7 10 3 2-3 2" />
              <line x1="12" x2="17" y1="14" y2="14" />
            </svg>
          </button>

          {/* Settings Icon */}
          <button
            type="button"
            onClick={onSettingsClick}
            aria-label="Open Settings"
            title="Settings"
            className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-bright/70 active:scale-95 rounded-lg transition-all cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>

          {/* Power Button */}
          <button
            type="button"
            onClick={onPowerClick}
            aria-label="Power / Session"
            title="Power / System"
            className="p-2 text-on-surface-variant hover:text-error hover:bg-surface-bright/70 active:scale-95 rounded-lg transition-all cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
              <line x1="12" x2="12" y1="2" y2="12" />
            </svg>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            className="sm:hidden p-2 text-on-surface-variant hover:text-on-surface rounded-lg transition-colors cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {mobileMenuOpen ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <path d="M4 12h16M4 6h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-surface-container border border-outline-variant/50 rounded-xl shadow-xl sm:hidden z-50">
            <ul className="flex flex-col gap-3 font-mono text-sm">
              {navItems.map((item) => {
                const isActive = activeItem === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => {
                        setActiveItem(item.href);
                        setMobileMenuOpen(false);
                      }}
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
