import Image from "next/image";
import type { Course } from "@/types/content";
import { difficultyLabels, difficultyColors } from "@/lib/seo";
import { trackColors, trackLabels } from "@/lib/track-styles";
import { cn } from "@/lib/utils";
import { formatDuration } from "@/lib/utils";
import { BookOpen, Clock, Code2, Briefcase } from "lucide-react";

interface CourseBannerProps {
  course: Course;
  className?: string;
}

const trackIcons = {
  technical: Code2,
  functional: Briefcase,
} as const;

export function CourseBanner({ course, className }: CourseBannerProps) {
  const TrackIcon = trackIcons[course.track];

  return (
    <div
      className={cn(
        "relative aspect-[21/9] w-full overflow-hidden rounded-2xl border border-border sm:aspect-[2.4/1]",
        className,
      )}
    >
      {course.thumbnail ? (
        <Image
          src={course.thumbnail}
          alt={`${course.title} banner`}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
        />
      ) : (
        <div
          className={cn(
            "h-full w-full bg-gradient-to-br",
            course.track === "functional"
              ? "from-emerald-950/50 to-muted"
              : "from-sky-950/50 to-muted",
          )}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold sm:text-sm",
              trackColors[course.track],
            )}
          >
            <TrackIcon className="h-3.5 w-3.5" />
            {trackLabels[course.track]}
          </span>
          <span
            className={cn(
              "inline-block rounded-full border px-3 py-1 text-xs font-semibold sm:text-sm",
              difficultyColors[course.level],
            )}
          >
            {difficultyLabels[course.level]}
          </span>
        </div>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
          {course.title}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground/80 sm:text-base md:text-lg">
          {course.shortDescription}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-foreground/70 sm:text-sm">
          <span className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" />
            {course.lessonsCount} lessons
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {formatDuration(course.duration)}
          </span>
        </div>
      </div>
    </div>
  );
}
