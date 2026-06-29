import type { Difficulty } from "@/types/content";

export const difficultyLabels: Record<Difficulty, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export const difficultyColors: Record<Difficulty, string> = {
  beginner: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  intermediate: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  advanced: "bg-rose-500/10 text-rose-500 border-rose-500/20",
};

export function generateCourseJsonLd(course: {
  title: string;
  description: string;
  slug: string;
  instructor: { name: string };
  duration: number;
  lessonsCount: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description,
    url: `https://learn.navbc.com/courses/${course.slug}`,
    provider: {
      "@type": "Organization",
      name: "NAVBC Learn",
      url: "https://learn.navbc.com",
    },
    instructor: {
      "@type": "Person",
      name: course.instructor.name,
    },
    timeRequired: `PT${course.duration}M`,
    numberOfLessons: course.lessonsCount,
    educationalLevel: "Professional",
    inLanguage: "en",
  };
}

export function generateLessonJsonLd(lesson: {
  title: string;
  description: string;
  courseTitle: string;
  courseSlug: string;
  lessonSlug: string;
  duration: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: lesson.title,
    description: lesson.description,
    url: `https://learn.navbc.com/courses/${lesson.courseSlug}/lessons/${lesson.lessonSlug}`,
    isPartOf: {
      "@type": "Course",
      name: lesson.courseTitle,
      url: `https://learn.navbc.com/courses/${lesson.courseSlug}`,
    },
    timeRequired: `PT${lesson.duration}M`,
    learningResourceType: "Lesson",
    inLanguage: "en",
  };
}

export function generateWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "NAVBC Learn",
    url: "https://learn.navbc.com",
    description:
      "Premium learning platform for Microsoft Dynamics 365 Business Central developers",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://learn.navbc.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NAVBC",
    url: "https://navbc.com",
    logo: "https://learn.navbc.com/logo.png",
    sameAs: [
      "https://github.com/navbc",
      "https://twitter.com/navbc",
    ],
  };
}
