import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllLessons, getAllCourses } from "@/lib/content";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDuration } from "@/lib/utils";

export function LatestTutorials() {
  const lessons = getAllLessons().slice(0, 6);
  const courses = getAllCourses();
  const courseMap = new Map(courses.map((c) => [c.id, c]));

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Latest Tutorials</h2>
            <p className="mt-2 text-muted-foreground">
              Fresh content to keep your skills sharp
            </p>
          </div>
          <Button variant="ghost" asChild className="hidden sm:inline-flex">
            <Link href="/tutorials">
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {lessons.map((lesson) => {
            const course = courseMap.get(lesson.courseId);
            if (!course) return null;

            return (
              <Card key={`${lesson.courseId}-${lesson.slug}`} className="group hover:border-brand/40">
                <CardHeader className="pb-2">
                  <p className="text-xs font-medium text-brand">{course.title}</p>
                  <CardTitle className="text-base group-hover:text-brand">
                    <Link href={`/courses/${course.slug}/lessons/${lesson.slug}`}>
                      {lesson.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {lesson.description}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {formatDuration(lesson.duration)}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
