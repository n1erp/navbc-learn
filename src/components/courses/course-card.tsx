import Link from "next/link";
import Image from "next/image";
import { Clock, BookOpen, ArrowRight, Code2, Briefcase } from "lucide-react";
import type { Course } from "@/types/content";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDuration } from "@/lib/utils";
import { difficultyLabels, difficultyColors } from "@/lib/seo";
import { trackColors, trackLabels } from "@/lib/track-styles";
import { cn } from "@/lib/utils";

interface CourseCardProps {
  course: Course;
  featured?: boolean;
}

const trackIcons = {
  technical: Code2,
  functional: Briefcase,
} as const;

export function CourseCard({ course, featured }: CourseCardProps) {
  const TrackIcon = trackIcons[course.track];
  const trackBorder =
    course.track === "functional"
      ? "hover:border-emerald-500/40 hover:shadow-emerald-500/5"
      : "hover:border-sky-500/40 hover:shadow-sky-500/5";

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all hover:shadow-lg",
        trackBorder,
        featured && (course.track === "functional" ? "border-emerald-500/20" : "border-sky-500/20"),
      )}
    >
      <div
        className={cn(
          "relative aspect-[16/9] overflow-hidden",
          course.track === "functional"
            ? "bg-gradient-to-br from-emerald-950/40 via-muted to-muted"
            : "bg-gradient-to-br from-sky-950/40 via-muted to-muted",
        )}
      >
        {course.thumbnail ? (
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <TrackIcon className="h-12 w-12 opacity-40" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
        <span
          className={cn(
            "absolute left-3 top-3 flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium backdrop-blur-sm",
            trackColors[course.track],
          )}
        >
          <TrackIcon className="h-3 w-3" />
          {trackLabels[course.track]}
        </span>
        <span
          className={cn(
            "absolute right-3 top-3 rounded-full border px-2.5 py-0.5 text-xs font-medium",
            difficultyColors[course.level],
          )}
        >
          {difficultyLabels[course.level]}
        </span>
      </div>

      <CardHeader className="pb-3 pt-4 sm:pt-5">
        <h3 className="line-clamp-2 text-base font-semibold leading-snug sm:text-lg group-hover:text-brand">
          <Link href={`/courses/${course.slug}`}>{course.title}</Link>
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {course.shortDescription}
        </p>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" />
            {course.lessonsCount} lessons
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {formatDuration(course.duration)}
          </span>
        </div>
      </CardContent>

      <CardFooter>
        <Button variant="ghost" size="sm" className="group/btn w-full justify-between" asChild>
          <Link href={`/courses/${course.slug}`}>
            View Course
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
