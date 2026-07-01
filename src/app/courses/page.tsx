import type { Metadata } from "next";
import { getAllCourses } from "@/lib/content";
import { CourseCard } from "@/components/courses/course-card";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "Browse all Business Central and AL development courses. From fundamentals to advanced extension development.",
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
          Comprehensive courses to master Microsoft Dynamics 365 Business Central
          development with AL.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-2 xl:grid-cols-3">
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
