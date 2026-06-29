import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getLearningPathBySlug, getAllLearningPaths, getAllCourses } from "@/lib/content";
import { formatDuration } from "@/lib/utils";
import { difficultyLabels, difficultyColors } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { Breadcrumb } from "@/components/layout/breadcrumb";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllLearningPaths().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const path = getLearningPathBySlug(slug);
  if (!path) return { title: "Learning Path Not Found" };
  return {
    title: path.title,
    description: path.description,
    alternates: { canonical: `https://learn.navbc.com/learning-paths/${slug}` },
  };
}

export default async function LearningPathPage({ params }: PageProps) {
  const { slug } = await params;
  const path = getLearningPathBySlug(slug);
  if (!path) notFound();

  const courses = getAllCourses();
  const courseMap = new Map(courses.map((c) => [c.id, c]));

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Breadcrumb
        items={[
          { label: "Learning Paths", href: "/learning-paths" },
          { label: path.title },
        ]}
      />

      <div className="mt-8">
        <span
          className={cn(
            "rounded-full border px-3 py-1 text-sm font-medium",
            difficultyColors[path.level],
          )}
        >
          {difficultyLabels[path.level]}
        </span>
        <h1 className="mt-4 text-4xl font-bold tracking-tight">{path.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{path.description}</p>
        <p className="mt-2 text-sm text-muted-foreground">
          {path.courses.length} courses · {formatDuration(path.duration)}
        </p>
      </div>

      <ol className="mt-12 space-y-4">
        {path.courses.map((courseId, i) => {
          const course = courseMap.get(courseId);
          if (!course) return null;
          return (
            <li key={courseId}>
              <Link
                href={`/courses/${course.slug}`}
                className="flex items-center gap-4 rounded-xl border border-border p-6 transition-all hover:border-brand/40 hover:shadow-lg"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-lg font-bold text-brand-foreground">
                  {i + 1}
                </span>
                <div>
                  <p className="text-lg font-semibold">{course.title}</p>
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
  );
}
