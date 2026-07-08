import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Course } from "@/types/content";
import { CourseCard } from "@/components/courses/course-card";
import { Button } from "@/components/ui/button";

interface FeaturedCoursesProps {
  courses: Course[];
}

export function FeaturedCourses({ courses }: FeaturedCoursesProps) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Courses</h2>
            <p className="mt-2 text-muted-foreground">
              One Fundamentals course per path — Technical or Functional
            </p>
          </div>
          <Button variant="ghost" asChild className="hidden sm:inline-flex">
            <Link href="/courses">
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} featured />
          ))}
        </div>
      </div>
    </section>
  );
}
