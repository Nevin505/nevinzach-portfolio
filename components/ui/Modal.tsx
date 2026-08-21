"use client";

import React, { useEffect } from "react";
import { CloseIcon } from "@/components/svg";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
  showCloseButton?: boolean;
  className?: string;
}

const maxWidthMap = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
};

export const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = "xl",
  showCloseButton = true,
  className = "",
}: ModalProps) => {
  // Close on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
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

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm transition-all duration-300 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className={`relative w-full ${maxWidthMap[maxWidth]} bg-[#0e141a]/95 border border-outline-variant/60 rounded-2xl shadow-2xl backdrop-blur-xl p-6 sm:p-8 text-on-surface transition-all duration-300 animate-in zoom-in-95 slide-in-from-bottom-8 select-none ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        {showCloseButton && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-5 right-5 p-2 text-outline hover:text-on-surface hover:bg-surface-bright/50 rounded-lg transition-all cursor-pointer"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        )}

        {/* Modal Header */}
        {(title || subtitle) && (
          <div className="mb-6 space-y-1">
            {title && (
              <h2
                id="modal-title"
                className="text-2xl sm:text-3xl font-bold tracking-tight text-on-surface"
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="font-mono text-xs sm:text-sm text-outline tracking-wider">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Modal Content */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
