import type { MetadataRoute } from "next";
import {
  getAllCourses,
  getStaticLessonParams,
  getAllProjects,
  getAllLearningPaths,
} from "@/lib/content";

const BASE_URL = "https://learn.navbc.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const courses = getAllCourses();
  const lessons = getStaticLessonParams();
  const projects = getAllProjects();
  const paths = getAllLearningPaths();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/courses`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/learning-paths`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/projects`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/tutorials`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/search`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/community`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/contribute`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  const coursePages: MetadataRoute.Sitemap = courses.map((c) => ({
    url: `${BASE_URL}/courses/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const lessonPages: MetadataRoute.Sitemap = lessons.map((l) => ({
    url: `${BASE_URL}/courses/${l.slug}/lessons/${l.lessonSlug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${BASE_URL}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const pathPages: MetadataRoute.Sitemap = paths.map((p) => ({
    url: `${BASE_URL}/learning-paths/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...coursePages, ...lessonPages, ...projectPages, ...pathPages];
}
