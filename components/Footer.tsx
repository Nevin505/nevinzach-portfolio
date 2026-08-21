"use client";

import React from "react";
import { ChevronUpIcon } from "@/components/svg";

export interface FooterProps {
  copyrightText?: string;
  statusText?: string;
  version?: string;
  githubUrl?: string;
  showBackToTop?: boolean;
  className?: string;
}

export const Footer = ({
  copyrightText = "© 2024 DEV_OS SYSTEM",
  statusText = "Status: Online",
  version = "v1.0.4",
  githubUrl = "https://github.com/Nevin505",
  showBackToTop = true,
  className = "",
}: FooterProps) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className={`w-full border-t border-outline-variant/30 bg-surface-container/60 backdrop-blur-md px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-outline select-none mt-auto ${className}`}
    >
      {/* Left: System Copyright */}
      <div className="flex items-center gap-2 text-on-surface-variant font-medium">
        <span>{copyrightText}</span>
      </div>

      {/* Right: Status, Version, Links & Controls */}
      <div className="flex items-center flex-wrap gap-3 sm:gap-4">
        {/* Status indicator */}
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary" />
          </span>
          <span className="text-on-surface-variant">{statusText}</span>
        </div>

        <span className="text-outline-variant/60">|</span>

        {/* System version */}
        <span className="text-outline">{version}</span>

        <span className="text-outline-variant/60">|</span>

        {/* GitHub link */}
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-secondary hover:underline transition-colors"
        >
          GitHub
        </a>

        {/* Back to top button */}
        {showBackToTop && (
          <>
            <span className="text-outline-variant/60">|</span>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll to top"
              title="Back to Top"
              className="p-1 text-outline hover:text-on-surface hover:bg-surface-bright/50 rounded transition-all cursor-pointer"
            >
              <ChevronUpIcon className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </footer>
  );
};

export default Footer;
