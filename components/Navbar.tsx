"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  TerminalIcon,
  SettingsIcon,
  PowerIcon,
  MenuIcon,
  CloseIcon,
} from "@/components/svg";
import { ContactModal } from "@/components/ContactModal";

export interface NavItem {
  label: string;
  href: string;
  isContact?: boolean;
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
  { label: "projects", href: "/projects" },
  { label: "contact", href: "#contact", isContact: true },
];

export function Navbar({
  systemTitle = "Nevin Zachariah John",
  brandText = "DEV_OS V2.4",
  navItems = DEFAULT_NAV_ITEMS,
  currentPath = "/",
  onTerminalClick,
  onSettingsClick,
  onPowerClick,
  className = "",
}: NavbarProps) {
  const [activeItem, setActiveItem] = useState(currentPath);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
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
                const isActive = activeItem === item.href;

                if (item.isContact) {
                  return (
                    <li key={item.label}>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveItem(item.href);
                          setIsContactOpen(true);
                        }}
                        className={`relative py-1 transition-colors cursor-pointer ${
                          isActive
                            ? "text-on-surface font-semibold"
                            : "text-on-surface-variant hover:text-on-surface"
                        }`}
                      >
                        {item.label}
                        {isActive && (
                          <span className="absolute left-0 bottom-0 w-full h-[2px] bg-on-surface rounded-full transition-all" />
                        )}
                      </button>
                    </li>
                  );
                }

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
                  const isActive = activeItem === item.href;
                  if (item.isContact) {
                    return (
                      <li key={item.label}>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveItem(item.href);
                            setMobileMenuOpen(false);
                            setIsContactOpen(true);
                          }}
                          className={`w-full text-left block px-3 py-2 rounded-lg transition-colors ${
                            isActive
                              ? "bg-surface-bright text-secondary font-semibold"
                              : "text-on-surface-variant hover:bg-surface-bright/50 hover:text-on-surface"
                          }`}
                        >
                          {item.label}
                        </button>
                      </li>
                    );
                  }
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

      {/* Global Contact Slide-up Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </>
  );
}

export default Navbar;
