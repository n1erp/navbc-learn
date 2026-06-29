import Link from "next/link";
import { ArrowRight, Route } from "lucide-react";
import type { LearningPath } from "@/types/content";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDuration } from "@/lib/utils";
import { difficultyLabels, difficultyColors } from "@/lib/seo";
import { cn } from "@/lib/utils";

interface LearningPathsSectionProps {
  paths: LearningPath[];
}

export function LearningPathsSection({ paths }: LearningPathsSectionProps) {
  return (
    <section className="border-y border-border bg-card/30 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">Learning Paths</h2>
          <p className="mt-2 text-muted-foreground">
            Structured roadmaps to take you from beginner to expert
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {paths.map((path) => (
            <Card
              key={path.id}
              className="group transition-all hover:border-brand/40"
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
                    <Route className="h-5 w-5" />
                  </div>
                  <span
                    className={cn(
                      "rounded-full border px-2.5 py-0.5 text-xs font-medium",
                      difficultyColors[path.level],
                    )}
                  >
                    {difficultyLabels[path.level]}
                  </span>
                </div>
                <CardTitle className="mt-4 group-hover:text-brand">
                  <Link href={`/learning-paths/${path.slug}`}>{path.title}</Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{path.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {path.courses.length} courses · {formatDuration(path.duration)}
                  </span>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/learning-paths/${path.slug}`}>
                      Start path
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
