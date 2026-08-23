"use client";

import React, { useState, useEffect, useRef } from "react";
import developerData from "@/data/developer.json";
import projectsData from "@/data/projects.json";

export interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TerminalHistoryItem {
  command: string;
  output: React.ReactNode;
  timestamp?: string;
}

export const TerminalModal = ({ isOpen, onClose }: TerminalModalProps) => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalHistoryItem[]>([
    {
      command: "motd",
      output: (
        <div className="space-y-1 text-outline">
          <p className="text-secondary font-semibold">
            DEV_OS Terminal Protocol [v2.4.0]
          </p>
          <p className="text-xs">
            Type <span className="text-primary font-bold">help</span> to inspect available commands, or click the quick action chips.
          </p>
        </div>
      ),
    },
  ]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [commandList, setCommandList] = useState<string[]>([]);
  const [isMatrixActive, setIsMatrixActive] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Auto scroll to bottom
  useEffect(() => {
    if (isOpen) {
      terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const executeCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    setCommandList((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const cmdLower = trimmed.toLowerCase();
    const args = cmdLower.split(" ");
    const mainCmd = args[0];
    const subCmd = args.slice(1).join(" ");

    let output: React.ReactNode = null;

    switch (mainCmd) {
      case "help":
      case "?":
        output = (
          <div className="space-y-2 text-xs font-mono py-1">
            <p className="text-secondary font-semibold">AVAILABLE SYSTEM COMMANDS:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 pt-1 text-on-surface-variant">
              <div>
                <span className="text-primary font-bold">cd &lt;section&gt;</span>
                <p className="text-outline text-[11px]">Navigate: projects | experience | contact | home</p>
              </div>
              <div>
                <span className="text-primary font-bold">whoami / bio</span>
                <p className="text-outline text-[11px]">Display developer profile & summary</p>
              </div>
              <div>
                <span className="text-primary font-bold">skills / stack</span>
                <p className="text-outline text-[11px]">Display languages, frameworks & databases</p>
              </div>
              <div>
                <span className="text-primary font-bold">projects / ls</span>
                <p className="text-outline text-[11px]">List key architectural solutions</p>
              </div>
              <div>
                <span className="text-primary font-bold">contact / phone</span>
                <p className="text-outline text-[11px]">Display contact links & direct line</p>
              </div>
              <div>
                <span className="text-primary font-bold">resume</span>
                <p className="text-outline text-[11px]">Download local curriculum vitae</p>
              </div>
              <div>
                <span className="text-primary font-bold">matrix</span>
                <p className="text-outline text-[11px]">Toggle cyber matrix stream</p>
              </div>
              <div>
                <span className="text-primary font-bold">clear / exit</span>
                <p className="text-outline text-[11px]">Clear screen or exit terminal</p>
              </div>
            </div>
          </div>
        );
        break;

      case "cd":
      case "goto":
      case "open":
        if (!subCmd || subCmd === "home" || subCmd === "top" || subCmd === "about") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          output = <p className="text-tertiary">&gt; Navigated to Home / Overview.</p>;
          setTimeout(onClose, 600);
        } else if (subCmd === "projects" || subCmd === "experience" || subCmd === "contact") {
          const el = document.getElementById(subCmd);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
            output = <p className="text-tertiary">&gt; Navigating to #{subCmd}...</p>;
            setTimeout(onClose, 600);
          } else {
            output = <p className="text-error">&gt; Target section #{subCmd} not found.</p>;
          }
        } else {
          output = (
            <p className="text-error">
              &gt; Unknown target: {subCmd}. Try: <span className="text-primary">cd projects</span>, <span className="text-primary">cd experience</span>, <span className="text-primary">cd contact</span>
            </p>
          );
        }
        break;

      case "projects":
        {
          const el = document.getElementById("projects");
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
            output = (
              <div className="space-y-1">
                <p className="text-tertiary">&gt; Scrolling to Projects section...</p>
                <div className="text-xs text-outline pt-1">
                  {projectsData.projects.map((p) => (
                    <div key={p.id} className="flex gap-2">
                      <span className="text-primary">[{p.id}]</span>
                      <span className="text-on-surface">{p.title}</span>
                      <span className="text-outline-variant">({p.path})</span>
                    </div>
                  ))}
                </div>
              </div>
            );
            setTimeout(onClose, 800);
          }
        }
        break;

      case "ls":
        output = (
          <div className="text-xs space-y-1">
            <p className="text-outline">drwxr-xr-x  about/</p>
            <p className="text-outline">drwxr-xr-x  projects/</p>
            <p className="text-outline">drwxr-xr-x  experience/</p>
            <p className="text-outline">drwxr-xr-x  contact/</p>
            <p className="text-primary">-rw-r--r--  resume.pdf</p>
            <p className="text-secondary">-rwxr-xr-x  contact_protocol.sh</p>
          </div>
        );
        break;

      case "experience":
        {
          const el = document.getElementById("experience");
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
            output = <p className="text-tertiary">&gt; Navigating to Experience Timeline...</p>;
            setTimeout(onClose, 600);
          }
        }
        break;

      case "whoami":
      case "bio":
      case "about":
        output = (
          <div className="space-y-2 text-xs">
            <p className="text-secondary font-bold text-sm">{developerData.name}</p>
            <p className="text-on-surface-variant leading-relaxed">{developerData.bio}</p>
            <div className="text-outline pt-1 flex flex-wrap gap-x-4">
              <span>Focus: {developerData.developer.focus.join(", ")}</span>
            </div>
          </div>
        );
        break;

      case "skills":
      case "stack":
      case "tech":
        output = (
          <div className="space-y-2 text-xs">
            <div>
              <span className="text-secondary font-semibold">Languages: </span>
              <span className="text-on-surface">{developerData.developer.languages.join(", ")}</span>
            </div>
            <div>
              <span className="text-secondary font-semibold">Frameworks: </span>
              <span className="text-on-surface">{developerData.developer.frameworks.join(", ")}</span>
            </div>
            <div>
              <span className="text-secondary font-semibold">Databases: </span>
              <span className="text-on-surface">{developerData.developer.database.join(", ")}</span>
            </div>
            <div>
              <span className="text-secondary font-semibold">DevOps & Tools: </span>
              <span className="text-on-surface">{developerData.developer.devops.join(", ")}</span>
            </div>
          </div>
        );
        break;

      case "contact":
        {
          const el = document.getElementById("contact");
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
            output = (
              <div className="space-y-1 text-xs">
                <p className="text-tertiary">&gt; Opening Contact Protocol...</p>
                <p className="text-outline">Direct Line: +91 94950 39249</p>
                <p className="text-outline">Email: nevinjohn63@gmail.com</p>
              </div>
            );
            setTimeout(onClose, 800);
          }
        }
        break;

      case "phone":
      case "call":
        output = (
          <div className="text-xs space-y-1">
            <p className="text-secondary font-semibold">Direct Line / Phone Node:</p>
            <a href="tel:+919495039249" className="text-primary hover:underline">
              +91 94950 39249
            </a>
          </div>
        );
        break;

      case "email":
      case "mail":
        output = (
          <div className="text-xs space-y-1">
            <p className="text-secondary font-semibold">Direct Email:</p>
            <a href="mailto:nevinjohn63@gmail.com" className="text-primary hover:underline">
              nevinjohn63@gmail.com
            </a>
          </div>
        );
        break;

      case "resume":
      case "cv":
        window.open("/resume.pdf", "_blank");
        output = <p className="text-tertiary">&gt; Initiating download / view for Resume.pdf...</p>;
        break;

      case "github":
      case "repo":
        window.open("https://github.com/Nevin505", "_blank");
        output = <p className="text-tertiary">&gt; Opening GitHub repository in new tab...</p>;
        break;

      case "linkedin":
        window.open("https://www.linkedin.com/in/nevin-zachariah-john/", "_blank");
        output = <p className="text-tertiary">&gt; Opening LinkedIn profile in new tab...</p>;
        break;

      case "clear":
      case "cls":
        setHistory([]);
        setInput("");
        return;

      case "date":
      case "time":
        output = <p className="text-outline">&gt; System UTC: {new Date().toUTCString()}</p>;
        break;

      case "matrix":
        setIsMatrixActive((prev) => !prev);
        output = (
          <p className="text-tertiary font-mono">
            &gt; Matrix stream toggled {!isMatrixActive ? "ON [Active]" : "OFF"}.
          </p>
        );
        break;

      case "exit":
      case "quit":
        onClose();
        return;

      default:
        output = (
          <p className="text-error text-xs">
            zsh: command not found: {trimmed}. Type <span className="text-secondary font-semibold cursor-pointer" onClick={() => executeCommand("help")}>&apos;help&apos;</span> for registry.
          </p>
        );
    }

    setHistory((prev) => [
      ...prev,
      {
        command: trimmed,
        output,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandList.length === 0) return;
      const nextIndex =
        historyIndex === -1 ? commandList.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(commandList[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandList.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(nextIndex);
        setInput(commandList[nextIndex]);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-3xl h-[520px] max-h-[85vh] flex flex-col bg-[#0a0f14]/95 border border-outline-variant/60 rounded-xl shadow-2xl overflow-hidden font-mono text-sm backdrop-blur-xl">
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#131920] border-b border-outline-variant/40 select-none">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-[#ff5f56] hover:brightness-125 transition-all cursor-pointer"
              title="Close (ESC)"
            />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <button
              onClick={() => setIsMatrixActive((p) => !p)}
              className="w-3 h-3 rounded-full bg-[#27c93f] hover:brightness-125 transition-all cursor-pointer"
              title="Toggle Matrix Stream"
            />
            <span className="ml-2 text-xs text-outline font-semibold tracking-wider flex items-center gap-1.5">
              <span>DEV_OS</span>
              <span className="text-outline-variant">/</span>
              <span className="text-secondary">terminal.sh</span>
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-outline">
            <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-[#1a2026] border border-outline-variant/30 text-[10px]">
              ESC to close
            </span>
            <button
              onClick={onClose}
              className="text-outline hover:text-on-surface p-1 transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Quick Command Chips */}
        <div className="flex items-center gap-1.5 px-4 py-2 bg-[#0e141a] border-b border-outline-variant/20 overflow-x-auto text-[11px] select-none scrollbar-none">
          <span className="text-outline mr-1 text-[10px]">RUN:</span>
          {[
            "help",
            "cd projects",
            "cd experience",
            "cd contact",
            "skills",
            "whoami",
            "phone",
            "resume",
            "clear",
          ].map((cmd) => (
            <button
              key={cmd}
              onClick={() => executeCommand(cmd)}
              className="px-2 py-0.5 rounded bg-[#161d24] hover:bg-secondary/20 hover:text-secondary border border-outline-variant/30 text-on-surface-variant transition-all cursor-pointer whitespace-nowrap"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Terminal Output Body */}
        <div
          className={`flex-1 p-4 sm:p-5 overflow-y-auto space-y-3 font-mono text-xs sm:text-sm ${
            isMatrixActive ? "text-[#4ae176]" : "text-on-surface"
          }`}
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((item, i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex items-center gap-2 text-outline">
                <span className="text-secondary">guest@dev_os:~$</span>
                <span className="text-on-surface font-semibold">{item.command}</span>
                {item.timestamp && (
                  <span className="text-[10px] text-outline-variant ml-auto">
                    {item.timestamp}
                  </span>
                )}
              </div>
              <div className="pl-2 border-l-2 border-outline-variant/30">
                {item.output}
              </div>
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Interactive Prompt Line */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#0e141a] border-t border-outline-variant/40">
          <span className="text-secondary font-bold text-xs sm:text-sm whitespace-nowrap">
            guest@dev_os:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="type a command (e.g. 'help', 'cd projects', 'skills')..."
            className="flex-1 bg-transparent border-none outline-none text-on-surface placeholder:text-outline-variant/60 font-mono text-xs sm:text-sm"
            autoComplete="off"
            spellCheck="false"
          />
        </div>
      </div>
    </div>
  );
};

export default TerminalModal;
