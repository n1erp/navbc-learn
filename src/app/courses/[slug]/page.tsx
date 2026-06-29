import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, BookOpen, CheckCircle, ArrowRight } from "lucide-react";
import {
  getCourseBySlug,
  getStaticCourseParams,
} from "@/lib/content";
import { generateCourseJsonLd } from "@/lib/seo";
import { formatDuration } from "@/lib/utils";
import { difficultyLabels, difficultyColors } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb } from "@/components/layout/breadcrumb";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getStaticCourseParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return { title: "Course Not Found" };

  return {
    title: course.title,
    description: course.description,
    openGraph: {
      title: course.title,
      description: course.shortDescription,
      type: "website",
      url: `https://learn.navbc.com/courses/${course.slug}`,
    },
    alternates: {
      canonical: `https://learn.navbc.com/courses/${course.slug}`,
    },
  };
}

export default async function CoursePage({ params }: PageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  const firstModule = course.modules[0];
  const firstLesson = firstModule?.lessons[0];
  const jsonLd = generateCourseJsonLd(course);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: "Courses", href: "/courses" },
            { label: course.title },
          ]}
        />

        <div className="mt-8 grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={cn(
                  "rounded-full border px-3 py-1 text-sm font-medium",
                  difficultyColors[course.level],
                )}
              >
                {difficultyLabels[course.level]}
              </span>
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                {course.lessonsCount} lessons
              </span>
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {formatDuration(course.duration)}
              </span>
            </div>

            <h1 className="mt-4 text-4xl font-bold tracking-tight">{course.title}</h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {course.description}
            </p>

            {course.learningOutcomes.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold">What you&apos;ll learn</h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {course.learningOutcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-12">
              <h2 className="text-xl font-semibold">Course Content</h2>
              <div className="mt-6 space-y-4">
                {course.modules.map((mod, modIndex) => (
                  <Card key={mod.id}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">
                        Module {modIndex + 1}: {mod.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{mod.description}</p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {mod.lessons.map((lessonSlug, i) => (
                          <li key={lessonSlug}>
                            <Link
                              href={`/courses/${course.slug}/lessons/${lessonSlug}`}
                              className="flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent"
                            >
                              <span className="capitalize">
                                {i + 1}. {lessonSlug.replace(/-/g, " ")}
                              </span>
                              <ArrowRight className="h-4 w-4 text-muted-foreground" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-lg font-bold text-brand">
                    {course.instructor.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold">{course.instructor.name}</p>
                    {course.instructor.role && (
                      <p className="text-sm text-muted-foreground">
                        {course.instructor.role}
                      </p>
                    )}
                  </div>
                </div>

                {course.prerequisites.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-sm font-semibold">Prerequisites</h3>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                      {course.prerequisites.map((p) => (
                        <li key={p}>• {p}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {firstLesson && (
                  <Button variant="brand" className="mt-6 w-full" size="lg" asChild>
                    <Link href={`/courses/${course.slug}/lessons/${firstLesson}`}>
                      Start Course
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
