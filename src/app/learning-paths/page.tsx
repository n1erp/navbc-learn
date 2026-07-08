import type { Metadata } from "next";
import Link from "next/link";
import { getAllLearningPaths, getAllCourses } from "@/lib/content";
import { LearningPathsSection } from "@/components/marketing/learning-paths-section";

export const metadata: Metadata = {
  title: "Learning Paths",
  description:
    "Two focused learning paths for Business Central — Technical (AL development) and Functional (consultant).",
  alternates: { canonical: "https://learn.navbc.com/learning-paths" },
};

export default function LearningPathsPage() {
  const paths = getAllLearningPaths();
  const courses = getAllCourses();
  const courseMap = new Map(courses.map((c) => [c.id, c]));

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight">Learning Paths</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Choose Technical for AL development or Functional for consultant skills.
          Each path includes one complete Fundamentals course.
        </p>
      </div>

      <div className="mt-12">
        <LearningPathsSection paths={paths} />
      </div>

      <div className="mt-16 space-y-8">
        {paths.map((path) => (
          <div key={path.id} id={path.slug} className="rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-bold">{path.title}</h2>
            <p className="mt-2 text-muted-foreground">{path.description}</p>
            <ol className="mt-6 space-y-3">
              {path.courses.map((courseId, i) => {
                const course = courseMap.get(courseId);
                if (!course) return null;
                return (
                  <li key={courseId}>
                    <Link
                      href={`/courses/${course.slug}`}
                      className="flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:border-brand/40 hover:bg-accent/50"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand/10 text-sm font-bold text-brand">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-medium">{course.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {course.shortDescription}
                        </p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}
