import { z } from "zod";

export const difficultySchema = z.enum([
  "beginner",
  "intermediate",
  "advanced",
]);

export const trackSchema = z.enum(["technical", "functional"]);

export const lessonFrontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  duration: z.number().default(10),
  difficulty: difficultySchema.default("beginner"),
  objectives: z.array(z.string()).default([]),
  video: z
    .object({
      url: z.string().url().optional(),
      provider: z.enum(["youtube", "vimeo", "custom"]).optional(),
    })
    .optional(),
  order: z.number().default(0),
  published: z.boolean().default(true),
  tags: z.array(z.string()).default([]),
});

export const moduleSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  order: z.number().default(0),
  lessons: z.array(z.string()),
});

export const courseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  shortDescription: z.string(),
  slug: z.string(),
  track: trackSchema,
  level: difficultySchema,
  duration: z.number(),
  lessonsCount: z.number(),
  modulesCount: z.number(),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  tags: z.array(z.string()).default([]),
  thumbnail: z.string().optional(),
  instructor: z.object({
    name: z.string(),
    role: z.string().optional(),
    avatar: z.string().optional(),
  }),
  learningOutcomes: z.array(z.string()).default([]),
  prerequisites: z.array(z.string()).default([]),
  modules: z.array(moduleSchema),
});

export const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  slug: z.string(),
  difficulty: difficultySchema,
  duration: z.number(),
  tags: z.array(z.string()).default([]),
  thumbnail: z.string().optional(),
  published: z.boolean().default(true),
});

export const learningPathSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  slug: z.string(),
  track: trackSchema.optional(),
  thumbnail: z.string().optional(),
  courses: z.array(z.string()),
  duration: z.number(),
  level: difficultySchema,
  published: z.boolean().default(true),
});

export const tutorialSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  slug: z.string(),
  courseId: z.string().optional(),
  lessonSlug: z.string().optional(),
  publishedAt: z.string(),
  tags: z.array(z.string()).default([]),
});

export type Difficulty = z.infer<typeof difficultySchema>;
export type Track = z.infer<typeof trackSchema>;
export type LessonFrontmatter = z.infer<typeof lessonFrontmatterSchema>;
export type Module = z.infer<typeof moduleSchema>;
export type Course = z.infer<typeof courseSchema>;
export type Project = z.infer<typeof projectSchema>;
export type LearningPath = z.infer<typeof learningPathSchema>;
export type Tutorial = z.infer<typeof tutorialSchema>;

export interface Lesson extends LessonFrontmatter {
  slug: string;
  courseId: string;
  moduleId: string;
  content: string;
  downloads: DownloadFile[];
  prevLesson: LessonNav | null;
  nextLesson: LessonNav | null;
}

export interface LessonNav {
  title: string;
  slug: string;
  courseSlug: string;
  moduleId: string;
}

export interface DownloadFile {
  name: string;
  path: string;
  size?: string;
  type: "zip" | "pdf" | "image" | "code" | "other";
}

export interface SearchDocument {
  id: string;
  type: "course" | "lesson" | "project";
  title: string;
  description: string;
  url: string;
  tags: string[];
  courseTitle?: string;
  moduleTitle?: string;
}
