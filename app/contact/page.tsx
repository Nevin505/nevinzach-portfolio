"use client";

import React from "react";
import {
  CodeIcon,
  BriefcaseIcon,
  FileTextIcon,
  TerminalIcon,
} from "@/components/svg";
import { ContactForm } from "@/components/ContactForm";

export default function ContactPage() {
  const activeNodes = [
    {
      id: "github",
      title: "GitHub",
      subtitle: "github.com/nzjohn",
      href: "https://github.com/Nevin505",
      icon: <CodeIcon className="w-5 h-5 text-on-surface" />,
    },
    {
      id: "linkedin",
      title: "LinkedIn",
      subtitle: "in/nevinzjohn",
      href: "https://linkedin.com/in/nevinzjohn",
      icon: <BriefcaseIcon className="w-5 h-5 text-on-surface" />,
    },
    {
      id: "resume",
      title: "Resume.pdf",
      subtitle: "Download local copy",
      href: "/resume.pdf",
      icon: <FileTextIcon className="w-5 h-5 text-on-surface" />,
    },
  ];

  return (
    <main className="flex flex-col flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-10 sm:py-16 select-none">
      {/* Header Section */}
      <div className="space-y-4 mb-10 sm:mb-14">
        <div className="flex items-center gap-3">
          <span className="w-6 sm:w-8 h-1 bg-secondary rounded-full" />
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-on-surface uppercase">
            CONTACT
          </h1>
        </div>

        <div className="border-l-2 border-secondary/70 pl-4 py-0.5">
          <p className="font-mono text-xs sm:text-sm text-outline tracking-wide max-w-2xl leading-relaxed">
            Initiate secure communication protocol. Awaiting input for
            collaborative opportunities and technical inquiries.
          </p>
        </div>
      </div>

      {/* Main Grid: Form + Active Nodes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Terminal Contact Protocol Form */}
        <div className="lg:col-span-7 w-full bg-[#0e141a]/95 border border-outline-variant/50 rounded-xl p-5 sm:p-8 backdrop-blur-md shadow-2xl">
          {/* Terminal Window Header */}
          <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3 mb-6">
            <div className="flex items-center gap-2 text-secondary font-mono text-xs">
              <TerminalIcon className="w-4 h-4" />
              <span>~/contact_protocol.sh</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-outline-variant/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-outline-variant/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-outline-variant/60" />
            </div>
          </div>

          {/* Connected Contact Form */}
          <ContactForm />
        </div>

        {/* Right Column: Active Nodes & Telemetry */}
        <div className="lg:col-span-5 w-full space-y-6">
          {/* Active Nodes List */}
          <div>
            <h2 className="font-mono text-xs text-outline tracking-widest uppercase mb-3">
              ACTIVE NODES
            </h2>

            <div className="space-y-3">
              {activeNodes.map((node) => (
                <a
                  key={node.id}
                  href={node.href}
                  download={
                    node.id === "resume"
                      ? "Nevin_Zachariah_John_Resume.pdf"
                      : undefined
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-surface-container/90 border border-outline-variant/40 hover:border-secondary/60 rounded-xl p-4 transition-all duration-200 group hover:shadow-[0_0_20px_rgba(76,215,246,0.15)]"
                >
                  <div className="p-2.5 bg-[#131920] border border-outline-variant/50 rounded-lg group-hover:border-secondary/60 transition-colors">
                    {node.icon}
                  </div>
                  <div className="flex-1 min-w-0 font-mono">
                    <h3 className="text-sm font-semibold text-on-surface group-hover:text-secondary transition-colors">
                      {node.title}
                    </h3>
                    <p className="text-xs text-outline truncate">
                      {node.subtitle}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* System Telemetry Metadata */}
          <div className="pt-4 border-t border-outline-variant/30 font-mono text-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-outline">Status:</span>
              <span className="text-secondary font-medium">
                Accepting connections
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-outline">Response Time:</span>
              <span className="text-on-surface">~24h</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-outline">Location:</span>
              <span className="text-on-surface">Earth</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
