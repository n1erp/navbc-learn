import type { Metadata } from "next";
import { getAllProjects } from "@/lib/content";
import { ProjectsSection } from "@/components/marketing/projects-section";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Hands-on Business Central extension projects to apply your AL development skills.",
  alternates: { canonical: "https://learn.navbc.com/projects" },
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight">Projects</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Build real Business Central extensions with guided, hands-on projects.
          </p>
        </div>
      </div>
      <ProjectsSection projects={projects} />
    </div>
  );
}
