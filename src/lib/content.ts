import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {
  courseSchema,
  lessonFrontmatterSchema,
  projectSchema,
  learningPathSchema,
  type Course,
  type Lesson,
  type LessonNav,
  type DownloadFile,
  type Project,
  type LearningPath,
  type SearchDocument,
} from "@/types/content";

const CONTENT_DIR = path.join(process.cwd(), "content");
const COURSES_DIR = path.join(CONTENT_DIR, "courses");
const PROJECTS_DIR = path.join(CONTENT_DIR, "projects");
const LEARNING_PATHS_DIR = path.join(CONTENT_DIR, "learning-paths");

function getDownloadType(filename: string): DownloadFile["type"] {
  const ext = path.extname(filename).toLowerCase();
  if (ext === ".zip") return "zip";
  if (ext === ".pdf") return "pdf";
  if ([".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"].includes(ext))
    return "image";
  if ([".al", ".cs", ".js", ".ts", ".sql", ".ps1", ".json", ".xml"].includes(ext))
    return "code";
  return "other";
}

function getLessonDownloads(
  courseId: string,
  moduleId: string,
  lessonSlug: string,
): DownloadFile[] {
  const downloadsDir = path.join(
    COURSES_DIR,
    courseId,
    moduleId,
    lessonSlug,
    "downloads",
  );

  if (!fs.existsSync(downloadsDir)) return [];

  return fs
    .readdirSync(downloadsDir)
    .filter((f) => !f.startsWith("."))
    .map((filename) => ({
      name: filename,
      path: `/downloads/courses/${courseId}/${moduleId}/${lessonSlug}/downloads/${filename}`,
      type: getDownloadType(filename),
    }));
}

function getCourseIds(): string[] {
  if (!fs.existsSync(COURSES_DIR)) return [];
  return fs
    .readdirSync(COURSES_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

export function getAllCourses(): Course[] {
  return getCourseIds()
    .map((id) => getCourseById(id))
    .filter((c): c is Course => c !== null && c.published)
    .sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1));
}

export function getFeaturedCourses(): Course[] {
  return getAllCourses().filter((c) => c.featured);
}

export function getCourseById(courseId: string): Course | null {
  const coursePath = path.join(COURSES_DIR, courseId, "course.json");
  if (!fs.existsSync(coursePath)) return null;

  const raw = JSON.parse(fs.readFileSync(coursePath, "utf-8"));
  const parsed = courseSchema.safeParse({ ...raw, id: courseId });
  return parsed.success ? parsed.data : null;
}

export function getCourseBySlug(slug: string): Course | null {
  return getAllCourses().find((c) => c.slug === slug) ?? null;
}

export function getLessonSlugs(courseId: string): string[] {
  const course = getCourseById(courseId);
  if (!course) return [];

  const slugs: string[] = [];
  for (const mod of course.modules) {
    const moduleDir = path.join(COURSES_DIR, courseId, mod.id);
    if (!fs.existsSync(moduleDir)) continue;

    for (const lessonSlug of mod.lessons) {
      const mdxPath = path.join(moduleDir, `${lessonSlug}.mdx`);
      const mdPath = path.join(moduleDir, `${lessonSlug}.md`);
      if (fs.existsSync(mdxPath) || fs.existsSync(mdPath)) {
        slugs.push(`${mod.id}/${lessonSlug}`);
      }
    }
  }
  return slugs;
}

function getLessonFrontmatter(
  courseId: string,
  moduleId: string,
  lessonSlug: string,
): { title: string; published: boolean } | null {
  const mdxPath = path.join(COURSES_DIR, courseId, moduleId, `${lessonSlug}.mdx`);
  const mdPath = path.join(COURSES_DIR, courseId, moduleId, `${lessonSlug}.md`);
  const filePath = fs.existsSync(mdxPath) ? mdxPath : mdPath;

  if (!fs.existsSync(filePath)) return null;

  const { data } = matter(fs.readFileSync(filePath, "utf-8"));
  const parsed = lessonFrontmatterSchema.safeParse(data);
  if (!parsed.success) return null;

  return { title: parsed.data.title, published: parsed.data.published };
}

function buildLessonNavList(course: Course): LessonNav[] {
  const nav: LessonNav[] = [];
  for (const mod of course.modules) {
    for (const lessonSlug of mod.lessons) {
      const meta = getLessonFrontmatter(course.id, mod.id, lessonSlug);
      if (meta?.published !== false) {
        nav.push({
          title: meta?.title ?? lessonSlug,
          slug: lessonSlug,
          courseSlug: course.slug,
          moduleId: mod.id,
        });
      }
    }
  }
  return nav;
}

export function getLesson(
  courseId: string,
  moduleId: string,
  lessonSlug: string,
): Lesson | null {
  const course = getCourseById(courseId);
  if (!course) return null;

  const mdxPath = path.join(COURSES_DIR, courseId, moduleId, `${lessonSlug}.mdx`);
  const mdPath = path.join(COURSES_DIR, courseId, moduleId, `${lessonSlug}.md`);
  const filePath = fs.existsSync(mdxPath) ? mdxPath : mdPath;

  if (!fs.existsSync(filePath)) return null;

  const { data, content } = matter(fs.readFileSync(filePath, "utf-8"));
  const parsed = lessonFrontmatterSchema.safeParse(data);
  if (!parsed.success) return null;

  const navList = buildLessonNavList(course);
  const currentIndex = navList.findIndex(
    (l) => l.moduleId === moduleId && l.slug === lessonSlug,
  );

  return {
    ...parsed.data,
    slug: lessonSlug,
    courseId,
    moduleId,
    content,
    downloads: getLessonDownloads(courseId, moduleId, lessonSlug),
    prevLesson: currentIndex > 0 ? navList[currentIndex - 1] : null,
    nextLesson:
      currentIndex < navList.length - 1 ? navList[currentIndex + 1] : null,
  };
}

export function getAllLessons(): Lesson[] {
  const lessons: Lesson[] = [];
  for (const courseId of getCourseIds()) {
    const course = getCourseById(courseId);
    if (!course?.published) continue;

    for (const mod of course.modules) {
      for (const lessonSlug of mod.lessons) {
        const lesson = getLesson(courseId, mod.id, lessonSlug);
        if (lesson?.published) lessons.push(lesson);
      }
    }
  }
  return lessons;
}

export function getAllProjects(): Project[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];

  return fs
    .readdirSync(PROJECTS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => {
      const projectPath = path.join(PROJECTS_DIR, d.name, "project.json");
      if (!fs.existsSync(projectPath)) return null;
      const raw = JSON.parse(fs.readFileSync(projectPath, "utf-8"));
      const parsed = projectSchema.safeParse({ ...raw, id: d.name });
      return parsed.success && parsed.data.published ? parsed.data : null;
    })
    .filter((p): p is Project => p !== null);
}

export function getProjectBySlug(slug: string): Project | null {
  return getAllProjects().find((p) => p.slug === slug) ?? null;
}

export function getAllLearningPaths(): LearningPath[] {
  const pathsFile = path.join(LEARNING_PATHS_DIR, "paths.json");
  if (!fs.existsSync(pathsFile)) return [];

  const raw = JSON.parse(fs.readFileSync(pathsFile, "utf-8"));
  if (!Array.isArray(raw)) return [];

  return raw
    .map((item) => learningPathSchema.safeParse(item))
    .filter((r) => r.success && r.data.published)
    .map((r) => (r as { success: true; data: LearningPath }).data);
}

export function getLearningPathBySlug(slug: string): LearningPath | null {
  return getAllLearningPaths().find((p) => p.slug === slug) ?? null;
}

export function buildSearchIndex(): SearchDocument[] {
  const docs: SearchDocument[] = [];

  for (const course of getAllCourses()) {
    docs.push({
      id: `course-${course.id}`,
      type: "course",
      title: course.title,
      description: course.shortDescription,
      url: `/courses/${course.slug}`,
      tags: course.tags,
    });

    for (const mod of course.modules) {
      for (const lessonSlug of mod.lessons) {
        const lesson = getLesson(course.id, mod.id, lessonSlug);
        if (!lesson?.published) continue;

        docs.push({
          id: `lesson-${course.id}-${mod.id}-${lessonSlug}`,
          type: "lesson",
          title: lesson.title,
          description: lesson.description,
          url: `/courses/${course.slug}/lessons/${lessonSlug}`,
          tags: lesson.tags,
          courseTitle: course.title,
          moduleTitle: mod.title,
        });
      }
    }
  }

  for (const project of getAllProjects()) {
    docs.push({
      id: `project-${project.id}`,
      type: "project",
      title: project.title,
      description: project.description,
      url: `/projects/${project.slug}`,
      tags: project.tags,
    });
  }

  return docs;
}

export function searchContent(query: string, limit = 20): SearchDocument[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const index = buildSearchIndex();
  const terms = q.split(/\s+/);

  const scored = index
    .map((doc) => {
      const haystack = [
        doc.title,
        doc.description,
        doc.courseTitle ?? "",
        doc.moduleTitle ?? "",
        ...doc.tags,
      ]
        .join(" ")
        .toLowerCase();

      let score = 0;
      for (const term of terms) {
        if (doc.title.toLowerCase().includes(term)) score += 10;
        if (haystack.includes(term)) score += 3;
      }
      return { doc, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored.map((r) => r.doc);
}

export function getStaticCourseParams() {
  return getAllCourses().map((c) => ({ slug: c.slug }));
}

export function getStaticLessonParams() {
  const params: { slug: string; lessonSlug: string }[] = [];
  for (const course of getAllCourses()) {
    for (const mod of course.modules) {
      for (const lessonSlug of mod.lessons) {
        const lesson = getLesson(course.id, mod.id, lessonSlug);
        if (lesson?.published) {
          params.push({ slug: course.slug, lessonSlug });
        }
      }
    }
  }
  return params;
}
