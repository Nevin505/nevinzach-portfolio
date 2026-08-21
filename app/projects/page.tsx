import type { Metadata } from "next";
import { Projects } from "@/components/Projects";

export const metadata: Metadata = {
  title: "Projects — Nevin Portfolio",
  description: "Architectural solutions and full-stack projects by Nevin Zachariah John.",
};

export default function ProjectsPage() {
  return (
    <main className="flex flex-col flex-1 w-full min-h-[calc(100vh-8rem)]">
      <Projects />
    </main>
  );
}
