import Link from "next/link";
import Image from "next/image";
import { Clock, BookOpen, ArrowRight } from "lucide-react";
import type { Course } from "@/types/content";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDuration } from "@/lib/utils";
import { difficultyLabels, difficultyColors } from "@/lib/seo";
import { cn } from "@/lib/utils";

interface CourseCardProps {
  course: Course;
  featured?: boolean;
}

export function CourseCard({ course, featured }: CourseCardProps) {
  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all hover:border-brand/40 hover:shadow-lg hover:shadow-brand/5",
        featured && "border-brand/20",
      )}
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-brand/20 via-muted to-muted">
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
            <BookOpen className="h-12 w-12 text-brand/40" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
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
