import type { Metadata } from "next";
import { getAllCourses } from "@/lib/content";
import { CourseCard } from "@/components/courses/course-card";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "Two Business Central learning paths — Technical (AL development) and Functional (consultant). Each path includes a complete Fundamentals course.",
  alternates: {
    canonical: "https://learn.navbc.com/courses",
  },
};

export default function CoursesPage() {
  const courses = getAllCourses();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Courses</h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          Choose the Technical or Functional Fundamentals course — each path is a
          complete, structured learning experience.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 max-w-4xl">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {courses.length === 0 && (
        <p className="mt-12 text-center text-muted-foreground">
          No courses available yet. Check back soon!
        </p>
      )}
    </div>
  );
}
