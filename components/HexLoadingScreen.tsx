"use client";

import React, { useState, useEffect } from "react";
import developerData from "@/data/developer.json";

const STREAM_ITEMS = [
  { hex: "4E 65 76 69 6E", text: developerData.name },
  { hex: "46 75 6C 6C 53", text: "Full Stack Developer" },
  { hex: "4E 6F 64 65 4A", text: "Node.js · NestJS · PostgreSQL" },
  { hex: "52 65 64 69 73", text: "Redis · RabbitMQ · Docker" },
  { hex: "53 59 53 5F 4F", text: "DEV_OS Ready" },
];

export function HexLoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let isPageLoaded = false;
    let minTimePassed = false;

    // 1. Cycle through hex stream items while loading
    const streamInterval = setInterval(() => {
      setIndex((prev) => (prev + 1) % STREAM_ITEMS.length);
    }, 120);

    // 2. Dismiss handler once both page is loaded & minimum smooth animation passed
    const handleFinish = () => {
      clearInterval(streamInterval);
      setIsFadingOut(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    };

    const checkReady = () => {
      if (isPageLoaded && minTimePassed) {
        handleFinish();
      }
    };

    // 3. Minimum display time (400ms) to prevent jarring flash on super-fast connections
    const timer = setTimeout(() => {
      minTimePassed = true;
      checkReady();
    }, 400);

    // 4. Real browser page/network load listener
    const onWindowLoad = () => {
      isPageLoaded = true;
      checkReady();
    };

    if (document.readyState === "complete") {
      isPageLoaded = true;
      checkReady();
    } else {
      window.addEventListener("load", onWindowLoad);
    }

    // 5. Fallback maximum timeout (3.5s) to guarantee UI appears even if assets lag
    const maxFallback = setTimeout(() => {
      handleFinish();
    }, 3500);

    return () => {
      clearInterval(streamInterval);
      clearTimeout(timer);
      clearTimeout(maxFallback);
      window.removeEventListener("load", onWindowLoad);
    };
  }, []);

  if (!isLoading) return null;

  const current = STREAM_ITEMS[index];

  return (
    <div
      style={{ backgroundColor: "#0e141a" }}
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center text-[#dde3eb] font-mono select-none transition-opacity duration-300 ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center w-full max-w-md px-6 space-y-4">
        {/* Hex + Decoded Stream Row */}
        <div className="flex items-center justify-center gap-3 text-xs sm:text-sm whitespace-nowrap">
          <span className="text-[#4cd7f6] font-semibold tracking-wider animate-pulse">
            {current.hex}
          </span>
          <span className="text-[#424754]">→</span>
          <span className="text-[#dde3eb] font-medium">
            {current.text}
          </span>
        </div>

        {/* Minimal Animated Loading Bar */}
        <div className="w-full h-[2px] bg-[#1a2026] rounded-full overflow-hidden">
          <div className="h-full bg-[#4cd7f6] w-1/3 rounded-full animate-loading-bar" />
        </div>

        {/* Status Line */}
        <div className="flex justify-between w-full text-[11px] text-[#8c909f]">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#4cd7f6] animate-ping" />
            Loading DEV_OS...
          </span>
          <span>0x00..0xFF</span>
        </div>
      </div>
    </div>
  );
}

export default HexLoadingScreen;
