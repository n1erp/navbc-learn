import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { getCourseBySlug } from "@/lib/content";

const COURSES_DIR = path.join(process.cwd(), "content", "courses");

function getLessonContentPath(
  courseId: string,
  moduleId: string,
  lessonSlug: string,
): string | null {
  const mdx = path.join(COURSES_DIR, courseId, moduleId, `${lessonSlug}.mdx`);
  const md = path.join(COURSES_DIR, courseId, moduleId, `${lessonSlug}.md`);
  if (fs.existsSync(mdx)) return `content/courses/${courseId}/${moduleId}/${lessonSlug}.mdx`;
  if (fs.existsSync(md)) return `content/courses/${courseId}/${moduleId}/${lessonSlug}.md`;
  return null;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pagePath = searchParams.get("path") ?? "";

  // Lesson: /courses/{slug}/lessons/{lessonSlug}
  const lessonMatch = pagePath.match(/^\/courses\/([^/]+)\/lessons\/([^/]+)$/);
  if (lessonMatch) {
    const [, courseSlug, lessonSlug] = lessonMatch;
    const course = getCourseBySlug(courseSlug);
    if (!course) return NextResponse.json({});

    const mod = course.modules.find((m) => m.lessons.includes(lessonSlug));
    if (!mod) return NextResponse.json({});

    const contentPath = getLessonContentPath(course.id, mod.id, lessonSlug);
    return NextResponse.json({
      pageTitle: lessonSlug.replace(/-/g, " "),
      contentPath,
      courseTitle: course.title,
    });
  }

  // Course: /courses/{slug}
  const courseMatch = pagePath.match(/^\/courses\/([^/]+)$/);
  if (courseMatch) {
    const course = getCourseBySlug(courseMatch[1]);
    if (!course) return NextResponse.json({});
    return NextResponse.json({
      pageTitle: course.title,
      contentPath: `content/courses/${course.id}/course.json`,
      courseTitle: course.title,
    });
  }

  // Learning path: /learning-paths/{slug}
  const pathMatch = pagePath.match(/^\/learning-paths\/([^/]+)$/);
  if (pathMatch) {
    return NextResponse.json({
      pageTitle: pathMatch[1].replace(/-/g, " "),
      contentPath: "content/learning-paths/paths.json",
    });
  }

  // Project: /projects/{slug}
  const projectMatch = pagePath.match(/^\/projects\/([^/]+)$/);
  if (projectMatch) {
    return NextResponse.json({
      pageTitle: projectMatch[1].replace(/-/g, " "),
      contentPath: `content/projects/${projectMatch[1]}/project.json`,
    });
  }

  return NextResponse.json({});
}
