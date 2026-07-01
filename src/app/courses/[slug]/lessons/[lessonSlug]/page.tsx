import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getCourseBySlug,
  getLesson,
  getStaticLessonParams,
} from "@/lib/content";
import { compileLessonMDX } from "@/lib/mdx";
import { generateLessonJsonLd } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { CourseSidebar, LessonNavigation } from "@/components/courses/course-sidebar";
import { LessonMeta } from "@/components/lessons/lesson-meta";
import { VideoPlayer } from "@/components/lessons/video-player";
import { DownloadsPanel } from "@/components/lessons/download-button";
import { LessonContent } from "@/components/mdx/code-block-enhancer";

interface PageProps {
  params: Promise<{ slug: string; lessonSlug: string }>;
}

export async function generateStaticParams() {
  return getStaticLessonParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, lessonSlug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return { title: "Lesson Not Found" };

  const lesson = getLesson(course.id, findModuleForLesson(course, lessonSlug), lessonSlug);
  if (!lesson) return { title: "Lesson Not Found" };

  return {
    title: `${lesson.title} — ${course.title}`,
    description: lesson.description,
    openGraph: {
      title: lesson.title,
      description: lesson.description,
      type: "article",
      url: `https://learn.navbc.com/courses/${slug}/lessons/${lessonSlug}`,
    },
    alternates: {
      canonical: `https://learn.navbc.com/courses/${slug}/lessons/${lessonSlug}`,
    },
  };
}

function findModuleForLesson(
  course: NonNullable<ReturnType<typeof getCourseBySlug>>,
  lessonSlug: string,
): string {
  const mod = course.modules.find((m) => m.lessons.includes(lessonSlug));
  return mod?.id ?? course.modules[0]?.id ?? "";
}

export default async function LessonPage({ params }: PageProps) {
  const { slug, lessonSlug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  const moduleId = findModuleForLesson(course, lessonSlug);
  const lesson = getLesson(course.id, moduleId, lessonSlug);
  if (!lesson) notFound();

  const courseModule = course.modules.find((m) => m.id === moduleId);
  const content = await compileLessonMDX(lesson.content);

  const jsonLd = generateLessonJsonLd({
    title: lesson.title,
    description: lesson.description,
    courseTitle: course.title,
    courseSlug: course.slug,
    lessonSlug: lesson.slug,
    duration: lesson.duration,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex min-h-[calc(100vh-4rem)] flex-col lg:flex-row">
        <CourseSidebar course={course} currentLessonSlug={lessonSlug} />

        <article className="min-w-0 flex-1">
          <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
            <Breadcrumb
              items={[
                { label: "Courses", href: "/courses" },
                { label: course.title, href: `/courses/${course.slug}` },
                { label: courseModule?.title ?? "Lesson", href: `/courses/${course.slug}` },
                { label: lesson.title },
              ]}
            />

            <header className="mt-4 sm:mt-6">
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-[2.5rem] lg:leading-tight">
                {lesson.title}
              </h1>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl">
                {lesson.description}
              </p>
            </header>

            <div className="mt-8">
              <LessonMeta
                duration={lesson.duration}
                difficulty={lesson.difficulty}
                objectives={lesson.objectives}
              />
            </div>

            {lesson.video?.url && (
              <VideoPlayer url={lesson.video.url} title={lesson.title} />
            )}

            <LessonContent>{content}</LessonContent>

            <DownloadsPanel downloads={lesson.downloads} />

            <LessonNavigation
              prevLesson={lesson.prevLesson}
              nextLesson={lesson.nextLesson}
            />
          </div>
        </article>
      </div>
    </>
  );
}
