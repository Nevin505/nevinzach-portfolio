"use client";

import React from "react";
import experienceData from "@/data/experience.json";
import {
  FolderIcon,
  CalendarIcon,
  CheckCircleIcon,
  CodeIcon,
  MonitorIcon,
} from "@/components/svg";

export const Experience = () => {
  const { path, title, description, experiences } = experienceData;

  return (
    <section
      id="experience"
      className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-12 sm:py-20 scroll-mt-20 select-none"
    >
      {/* Section Header */}
      <div className="space-y-3 mb-10 sm:mb-12 pb-6 border-b border-outline-variant/30">
        {/* Breadcrumb Path */}
        <div className="flex items-center gap-2 font-mono text-xs text-secondary">
          <FolderIcon className="w-4 h-4" />
          <span>{path}</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-on-surface uppercase">
          {title}
        </h1>

        {/* Description */}
        <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed max-w-3xl">
          {description}
        </p>
      </div>

      {/* Timeline Section */}
      <div className="relative space-y-8 sm:space-y-12">
        {/* Continuous Vertical Timeline Track (hidden on screens < 360px) */}
        <div className="hidden min-[360px]:block absolute left-4 sm:left-5 top-5 bottom-5 w-[2px] -translate-x-1/2 bg-outline-variant/40" />

        {experiences.map((item) => (
          <div key={item.id} className="relative flex items-start group">
            {/* Timeline Node Icon (hidden on screens < 360px) */}
            <div className="hidden min-[360px]:flex absolute left-4 sm:left-5 top-4 -translate-x-1/2 items-center justify-center w-8 sm:w-10 h-8 sm:h-10 rounded-lg bg-[#0e141a] border border-outline-variant/60 group-hover:border-secondary/70 text-on-surface group-hover:text-secondary shadow-md transition-all z-10">
              {item.iconType === "code" ? (
                <CodeIcon className="w-4 sm:w-5 h-4 sm:h-5" />
              ) : (
                <MonitorIcon className="w-4 sm:w-5 h-4 sm:h-5" />
              )}
            </div>

            {/* Experience Card (full width without margin on screens < 360px) */}
            <div className="w-full ml-0 min-[360px]:ml-10 sm:ml-14 bg-surface-container/90 border border-outline-variant/40 hover:border-secondary/60 rounded-xl p-5 sm:p-8 backdrop-blur-md shadow-xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(76,215,246,0.12)]">
              {/* Header: Role & Period Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                <h2 className="text-xl sm:text-2xl font-bold text-on-surface group-hover:text-secondary transition-colors">
                  {item.role}
                </h2>

                {/* Period Badge */}
                <div className="inline-flex items-center gap-1.5 self-start sm:self-auto font-mono text-xs text-outline px-3 py-1 rounded-md bg-[#131920] border border-outline-variant/40">
                  <CalendarIcon className="w-3.5 h-3.5" />
                  <span>{item.period}</span>
                </div>
              </div>

              {/* Company */}
              <p className="font-mono text-sm font-medium text-secondary mb-4">
                {item.company}
              </p>

              {/* Skills Chips */}
              <div className="flex flex-wrap items-center gap-2 mb-6 font-mono text-xs">
                {item.skills.map((skill) => {
                  const isHighlighted = item.highlightSkills?.includes(skill);
                  return (
                    <span
                      key={skill}
                      className={`px-2.5 py-1 rounded-md transition-colors ${
                        isHighlighted
                          ? "bg-secondary/15 border border-secondary text-secondary font-semibold"
                          : "bg-[#131920]/90 border border-outline-variant/40 text-on-surface-variant hover:border-outline"
                      }`}
                    >
                      {skill}
                    </span>
                  );
                })}
              </div>

              {/* Responsibilities & Points */}
              <ul className="space-y-3 font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                {item.points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-secondary mt-0.5 shrink-0">
                      <CheckCircleIcon className="w-4 h-4 opacity-80" />
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
