"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CodeIcon, MailIcon } from "@/components/svg";
import { ContactModal } from "@/components/ContactModal";
import heroData from "@/data/developer.json";

export const Hero = () => {
  const { greeting, name, bio, developer } = heroData;
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <section className="flex flex-col-reverse lg:flex-row items-center justify-between w-full min-h-[calc(100vh-8rem)] gap-12 px-4 sm:px-8 lg:px-16 py-8 sm:py-12 select-none">
      {/* Left Column: Introduction & CTAs */}
      <div className="flex-1 flex flex-col justify-center space-y-6 max-w-2xl">
        {/* Terminal greeting */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm sm:text-base text-secondary font-medium tracking-wide">
            &gt; {greeting}
          </span>
          <span className="inline-block w-2 h-4 bg-secondary animate-pulse" />
        </div>

        {/* Name Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-on-surface leading-[1.1]">
          {name}
        </h1>

        {/* Bio Description */}
        <p className="text-on-surface-variant text-base sm:text-lg leading-relaxed max-w-xl">
          {bio}
        </p>

        {/* Call to Actions */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Link href="/projects">
            <Button
              variant="primary"
              size="lg"
              leftIcon={<CodeIcon className="w-4 h-4" />}
            >
              View Projects
            </Button>
          </Link>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => setIsContactOpen(true)}
            leftIcon={<MailIcon className="w-4 h-4" />}
          >
            Contact Me
          </Button>
        </div>
      </div>

      {/* Right Column: Code Card IDE */}
      <div className="flex-1 w-full max-w-xl flex justify-center lg:justify-end">
        <div className="relative w-full rounded-2xl bg-surface-container/90 border border-outline-variant/40 shadow-2xl backdrop-blur-md p-6 sm:p-8 font-mono text-sm leading-relaxed overflow-hidden">
          {/* Top-right Status Dot */}
          <div className="absolute top-4 right-4 flex items-center gap-1.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary" />
            </span>
          </div>

          {/* Syntax Highlighted Code Object */}
          <div className="space-y-1 text-xs sm:text-sm">
            <div>
              <span className="text-[#ff7b72] font-semibold">const </span>
              <span className="text-secondary font-semibold">developer </span>
              <span className="text-on-surface">= </span>
              <span className="text-on-surface">{"{"}</span>
            </div>

            {/* focus array */}
            <div className="pl-4 sm:pl-6">
              <span className="text-[#d2a8ff]">focus</span>
              <span className="text-on-surface">: [</span>
              <div className="pl-4 sm:pl-6 text-[#a5d6ff]">
                {developer.focus.map((item, index) => (
                  <div key={item}>
                    &apos;{item}&apos;
                    {index < developer.focus.length - 1 ? "," : ""}
                  </div>
                ))}
              </div>
              <span className="text-on-surface">],</span>
            </div>

            {/* stack array */}
            <div className="pl-4 sm:pl-6 pt-1">
              <span className="text-[#d2a8ff]">stack</span>
              <span className="text-on-surface">: [</span>
              <div className="pl-4 sm:pl-6 text-[#a5d6ff]">
                {developer.stack.map((tech, index) => (
                  <div key={tech}>
                    &apos;{tech}&apos;
                    {index < developer.stack.length - 1 ? "," : ""}
                  </div>
                ))}
              </div>
              <span className="text-on-surface">],</span>
            </div>

            {/* principle string */}
            <div className="pl-4 sm:pl-6 pt-1">
              <span className="text-[#d2a8ff]">principle</span>
              <span className="text-on-surface">: </span>
              <span className="text-[#a5d6ff]">&apos;{developer.principle[0]}</span>
              <div className="pl-6 sm:pl-8 text-[#a5d6ff]">
                {developer.principle.slice(1, -1).map((line) => (
                  <div key={line}>{line}</div>
                ))}
                <div>{developer.principle[developer.principle.length - 1]}&apos;</div>
              </div>
            </div>

            <div>
              <span className="text-on-surface">{"}"}</span>
            </div>
          </div>

          {/* Bottom-left Decorative Dot */}
          <div className="absolute bottom-3 left-3 h-1.5 w-1.5 rounded-full bg-outline-variant/40" />
        </div>
      </div>

      {/* Slide-Up Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </section>
  );
};

export default Hero;