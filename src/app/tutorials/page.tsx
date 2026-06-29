import type { Metadata } from "next";
import Link from "next/link";
import { getAllLessons, getAllCourses } from "@/lib/content";
import { formatDuration } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Tutorials",
  description: "Latest Business Central and AL development tutorials.",
  alternates: { canonical: "https://learn.navbc.com/tutorials" },
};

export default function TutorialsPage() {
  const lessons = getAllLessons();
  const courses = getAllCourses();
  const courseMap = new Map(courses.map((c) => [c.id, c]));

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight">Tutorials</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Browse all lessons and tutorials across our courses.
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {lessons.map((lesson) => {
          const course = courseMap.get(lesson.courseId);
          if (!course) return null;

          return (
            <Card key={`${lesson.courseId}-${lesson.slug}`} className="hover:border-brand/40">
              <CardHeader className="pb-2">
                <p className="text-xs font-medium text-brand">{course.title}</p>
                <CardTitle className="text-base">
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
  );
}
