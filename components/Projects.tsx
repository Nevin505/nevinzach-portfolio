"use client";

import React from "react";
import projectsData from "@/data/projects.json";
import { CodeIcon, ExternalLinkIcon } from "@/components/svg";

export const Projects = () => {
  const { sectionTitle, sectionDescription, projects } = projectsData;

  return (
    <section
      id="projects"
      className="w-full px-4 sm:px-8 lg:px-16 py-12 sm:py-20 select-none"
    >
      {/* Section Header */}
      <div className="mb-10 sm:mb-14 max-w-4xl space-y-3">
        <div className="relative inline-block">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-on-surface uppercase">
            {sectionTitle}
          </h2>
          <div className="h-1 w-12 bg-secondary rounded-full mt-2" />
        </div>
        <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed max-w-3xl">
          {sectionDescription}
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group relative flex flex-col justify-between bg-surface-container/90 border border-outline-variant/40 hover:border-secondary/60 rounded-xl p-5 sm:p-6 backdrop-blur-md shadow-xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(76,215,246,0.15)]"
          >
            {/* Top Window Bar */}
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3 mb-5">
              {/* Window Controls */}
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-outline-variant/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-outline-variant/60" />
              </div>

              {/* Path identifier */}
              <span className="font-mono text-xs text-outline tracking-wider truncate px-2">
                {project.path}
              </span>

              {/* Action Links */}
              <div className="flex items-center gap-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View source code"
                    className="p-1 text-outline hover:text-secondary transition-colors"
                  >
                    <CodeIcon className="w-4 h-4" />
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View live preview"
                    className="p-1 text-outline hover:text-secondary transition-colors"
                  >
                    <ExternalLinkIcon className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Project Content */}
            <div className="space-y-3 mb-6">
              <h3 className="text-lg sm:text-xl font-bold font-mono text-on-surface group-hover:text-secondary transition-colors flex items-center gap-1.5">
                <span className="text-secondary font-bold">&gt;</span>
                <span>{project.title}</span>
              </h3>
              <p className="text-on-surface-variant text-xs sm:text-sm leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Tech Stack Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-outline-variant/20 font-mono text-xs">
              {project.tags.map((tag) => {
                const isHighlighted = tag === project.highlightTag;
                return (
                  <span
                    key={tag}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      isHighlighted
                        ? "bg-secondary/15 border border-secondary text-secondary font-semibold"
                        : "bg-[#131920]/90 border border-outline-variant/40 text-on-surface-variant hover:border-outline"
                    }`}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
