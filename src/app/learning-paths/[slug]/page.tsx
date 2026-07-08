import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Code2, Briefcase } from "lucide-react";
import { getLearningPathBySlug, getAllLearningPaths, getAllCourses } from "@/lib/content";
import { formatDuration } from "@/lib/utils";
import { difficultyLabels, difficultyColors } from "@/lib/seo";
import {
  trackColors,
  trackLabels,
  trackGradients,
} from "@/lib/track-styles";
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
  const track = path.track ?? path.slug;
  const TrackIcon = track === "functional" ? Briefcase : Code2;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Breadcrumb
        items={[
          { label: "Learning Paths", href: "/learning-paths" },
          { label: path.title },
        ]}
      />

      <div className="relative mt-8 overflow-hidden rounded-2xl border border-border">
        <div className="relative aspect-[21/9] min-h-[180px] sm:min-h-[220px]">
          {path.thumbnail ? (
            <Image
              src={path.thumbnail}
              alt={path.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 896px) 100vw, 896px"
            />
          ) : (
            <div
              className={cn(
                "h-full w-full",
                track === "functional"
                  ? "bg-gradient-to-br from-emerald-950 to-slate-900"
                  : "bg-gradient-to-br from-sky-950 to-slate-900",
              )}
            />
          )}
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-t",
              track === "functional" ? trackGradients.functional : trackGradients.technical,
            )}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        </div>
        <div className="relative -mt-16 px-6 pb-6 sm:-mt-20 sm:px-8 sm:pb-8">
          <div className="flex flex-wrap items-center gap-2">
            {(track === "technical" || track === "functional") && (
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium",
                  trackColors[track],
                )}
              >
                <TrackIcon className="h-4 w-4" />
                {trackLabels[track]}
              </span>
            )}
            <span
              className={cn(
                "rounded-full border px-3 py-1 text-sm font-medium",
                difficultyColors[path.level],
              )}
            >
              {difficultyLabels[path.level]}
            </span>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{path.title}</h1>
          <p className="mt-3 text-lg text-muted-foreground">{path.description}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {formatDuration(path.duration)} total
          </p>
        </div>
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
