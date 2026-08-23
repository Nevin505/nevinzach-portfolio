import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <main className="flex flex-col flex-1 w-full divide-y divide-outline-variant/20">
      <Hero />
      <Projects />
      <Experience />
      <Contact />
    </main>
  );
}
