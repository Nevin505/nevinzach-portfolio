import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="flex flex-col flex-1 items-center justify-center min-h-[calc(100vh-10rem)] px-4 sm:px-8 py-12 select-none text-center">
      {/* Top Accent Line */}
      <div className="w-8 h-1 bg-secondary rounded-full mb-6" />

      {/* Main 404 Headline */}
      <div className="space-y-1 mb-8 sm:mb-10">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-on-surface uppercase">
          ERROR 404:
        </h1>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-error uppercase">
          RESOURCE_NOT_FOUND
        </h2>
      </div>

      {/* Terminal Window Card */}
      <div className="w-full max-w-xl bg-[#0e141a]/95 border border-outline-variant/50 rounded-xl overflow-hidden shadow-2xl backdrop-blur-md text-left font-mono text-xs sm:text-sm">
        {/* Terminal Titlebar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#131920]/90 border-b border-outline-variant/30">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-outline-variant/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-outline-variant/60" />
          </div>
          <span className="text-xs text-outline tracking-wider">
            system_admin@dev_os:~
          </span>
          <div className="w-8" />
        </div>

        {/* Terminal Content */}
        <div className="p-5 sm:p-6 space-y-4 bg-surface-container/60">
          {/* Prompt line */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-secondary font-medium">
              [system_admin@dev_os]:~$
            </span>
            <span className="text-on-surface">get /requested_page</span>
          </div>

          {/* Error description */}
          <div className="flex items-center gap-2 text-on-surface-variant flex-wrap">
            <span className="text-error font-semibold flex items-center gap-1">
              <span>ⓘ</span> Error: 0x800404 -
            </span>
            <span>Resource at</span>
            <span className="text-secondary">127.0.0.1</span>
            <span>not found.</span>
          </div>

          {/* Fallback line with blinking cursor */}
          <div className="flex items-center gap-2 text-outline pt-1">
            <span>Initiating fallback sequence...</span>
            <span className="inline-block w-2 h-4 bg-secondary animate-pulse" />
          </div>
        </div>
      </div>

      {/* Return Home Action */}
      <div className="mt-8">
        <Link href="/">
          <Button variant="primary" size="md" className="font-mono px-6">
            ./return_to_base
          </Button>
        </Link>
      </div>
    </main>
  );
}
