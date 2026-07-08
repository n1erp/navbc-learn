import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProjectBySlug, getAllProjects } from "@/lib/content";
import { formatDuration } from "@/lib/utils";
import { difficultyLabels, difficultyColors } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `https://learn.navbc.com/projects/${slug}` },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Breadcrumb
        items={[
          { label: "Projects", href: "/projects" },
          { label: project.title },
        ]}
      />

      <div className="mt-8">
        <span
          className={cn(
            "rounded-full border px-3 py-1 text-sm font-medium",
            difficultyColors[project.difficulty],
          )}
        >
          {difficultyLabels[project.difficulty]}
        </span>
        <h1 className="mt-4 text-4xl font-bold tracking-tight">{project.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{project.description}</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Estimated time: {formatDuration(project.duration)}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-12 rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center">
        <h2 className="text-xl font-semibold">Coming Soon</h2>
        <p className="mt-2 text-muted-foreground">
          This project is being prepared. Start with our fundamentals course to
          build the skills you&apos;ll need.
        </p>
        <Button variant="brand" className="mt-6" asChild>
          <Link href="/learning-paths">
            Start Learning
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
