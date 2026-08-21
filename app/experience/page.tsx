import type { Metadata } from "next";
import { Experience } from "@/components/Experience";

export const metadata: Metadata = {
  title: "Experience — Nevin Portfolio",
  description: "Chronological sequence of professional operations and system architecture contributions.",
};

export default function ExperiencePage() {
  return (
    <main className="flex flex-col flex-1 w-full min-h-[calc(100vh-8rem)]">
      <Experience />
    </main>
  );
}
