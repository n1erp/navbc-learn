import Link from "next/link";
import { ArrowRight, FolderKanban } from "lucide-react";
import type { Project } from "@/types/content";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDuration } from "@/lib/utils";
import { difficultyLabels, difficultyColors } from "@/lib/seo";
import { cn } from "@/lib/utils";

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section className="border-y border-border bg-card/30 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Hands-On Projects</h2>
            <p className="mt-2 text-muted-foreground">
              Apply your skills with real Business Central extension projects
            </p>
          </div>
          <Button variant="ghost" asChild className="hidden sm:inline-flex">
            <Link href="/projects">
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((project) => (
            <Card key={project.id} className="group hover:border-brand/40">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <FolderKanban className="h-8 w-8 text-brand/60" />
                  <span
                    className={cn(
                      "rounded-full border px-2.5 py-0.5 text-xs font-medium",
                      difficultyColors[project.difficulty],
                    )}
                  >
                    {difficultyLabels[project.difficulty]}
                  </span>
                </div>
                <CardTitle className="mt-4 group-hover:text-brand">
                  <Link href={`/projects/${project.slug}`}>{project.title}</Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {project.description}
                </p>
                <p className="mt-3 text-xs text-muted-foreground">
                  {formatDuration(project.duration)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
