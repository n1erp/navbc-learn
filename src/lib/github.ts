import { siteConfig } from "@/lib/site-config";

const { repo, branch } = siteConfig.github;

export function getGitHubRepoUrl(): string {
  return `https://github.com/${repo}`;
}

export function getEditFileUrl(filePath: string): string {
  const cleanPath = filePath.replace(/^\//, "");
  return `https://github.com/${repo}/edit/${branch}/${cleanPath}`;
}

export function getNewIssueUrl(params?: {
  title?: string;
  body?: string;
  labels?: string[];
  template?: string;
}): string {
  const url = new URL(`https://github.com/${repo}/issues/new`);
  if (params?.template) url.searchParams.set("template", params.template);
  if (params?.title) url.searchParams.set("title", params.title);
  if (params?.body) url.searchParams.set("body", params.body);
  if (params?.labels?.length) url.searchParams.set("labels", params.labels.join(","));
  return url.toString();
}

export function getDiscussionsUrl(category?: string): string {
  const base = `https://github.com/${repo}/discussions`;
  if (!category) return base;
  return `${base}/new?category=${encodeURIComponent(category)}`;
}

export function getLessonIssueBody(opts: {
  pageUrl: string;
  courseTitle: string;
  lessonTitle: string;
  contentPath?: string;
}): string {
  return [
    "## Page",
    opts.pageUrl,
    "",
    "## Course",
    opts.courseTitle,
    "",
    "## Lesson",
    opts.lessonTitle,
    "",
    opts.contentPath ? `## Content file\n\`${opts.contentPath}\`` : "",
    "",
    "## What would you like to improve?",
    "<!-- Describe the typo, unclear explanation, missing topic, or suggested improvement -->",
    "",
    "## Additional context",
    "<!-- Screenshots, links, or references welcome -->",
  ]
    .filter(Boolean)
    .join("\n");
}
