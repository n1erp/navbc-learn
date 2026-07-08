import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Code2, Briefcase } from "lucide-react";
import type { LearningPath, Track } from "@/types/content";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDuration } from "@/lib/utils";
import { difficultyLabels, difficultyColors } from "@/lib/seo";
import {
  trackColors,
  trackLabels,
  trackCardAccent,
  trackGradients,
} from "@/lib/track-styles";
import { cn } from "@/lib/utils";

interface LearningPathsSectionProps {
  paths: LearningPath[];
}

const trackIcons = {
  technical: Code2,
  functional: Briefcase,
} as const;

export function LearningPathsSection({ paths }: LearningPathsSectionProps) {
  return (
    <section className="border-y border-border bg-card/30 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">Learning Paths</h2>
          <p className="mt-2 text-muted-foreground">
            Two focused paths — choose Technical or Functional
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {paths.map((path) => {
            const track = (path.track ?? path.slug) as Track;
            const TrackIcon =
              track === "functional" ? trackIcons.functional : trackIcons.technical;

            return (
              <Card
                key={path.id}
                className={cn(
                  "group relative overflow-hidden border-border transition-all",
                  track === "functional"
                    ? trackCardAccent.functional
                    : trackCardAccent.technical,
                )}
              >
                <div className="relative aspect-[16/7] overflow-hidden">
                  {path.thumbnail ? (
                    <Image
                      src={path.thumbnail}
                      alt={path.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div
                      className={cn(
                        "h-full w-full bg-gradient-to-br",
                        track === "functional"
                          ? "from-emerald-950 to-slate-900"
                          : "from-sky-950 to-slate-900",
                      )}
                    />
                  )}
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-t",
                      track === "functional"
                        ? trackGradients.functional
                        : trackGradients.technical,
                    )}
                  />
                  <div className="absolute left-5 top-5 flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-lg backdrop-blur-sm",
                        track === "functional"
                          ? "bg-emerald-500/20 text-emerald-300"
                          : "bg-sky-500/20 text-sky-300",
                      )}
                    >
                      <TrackIcon className="h-5 w-5" />
                    </div>
                    {track === "technical" || track === "functional" ? (
                      <span
                        className={cn(
                          "rounded-full border px-2.5 py-0.5 text-xs font-medium backdrop-blur-sm",
                          trackColors[track],
                        )}
                      >
                        {trackLabels[track]}
                      </span>
                    ) : null}
                  </div>
                  <span
                    className={cn(
                      "absolute right-4 top-4 rounded-full border px-2.5 py-0.5 text-xs font-medium backdrop-blur-sm",
                      difficultyColors[path.level],
                    )}
                  >
                    {difficultyLabels[path.level]}
                  </span>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold group-hover:text-brand">
                    <Link href={`/learning-paths/${path.slug}`}>{path.title}</Link>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {path.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {formatDuration(path.duration)}
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
