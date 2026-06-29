# NAVBC Learn

Premium learning platform for Microsoft Dynamics 365 Business Central and NAV developers.

**Live URL:** [learn.navbc.com](https://learn.navbc.com)

## Tech Stack

- **Next.js 15** (App Router) with TypeScript
- **Tailwind CSS 4** + shadcn/ui components
- **MDX/Markdown** content-driven lessons
- **Framer Motion** for subtle animations
- **Shiki** syntax highlighting (AL, SQL, PowerShell, C#, etc.)
- **next-themes** dark mode

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Adding Content

### New Course

1. Create folder: `content/courses/my-course/course.json`
2. Add modules as subfolders with lesson `.mdx` files
3. No React code changes needed — pages are auto-generated

### New Lesson

Create `content/courses/{courseId}/{moduleId}/lesson-slug.mdx`:

```mdx
---
title: My Lesson
description: Short description for SEO
duration: 20
difficulty: beginner
objectives:
  - First learning objective
  - Second learning objective
---

## Content here

<Callout type="tip">Pro tip content</Callout>

\`\`\`al title="Example.al"
table 50100 "My Table" { }
\`\`\`
```

### Downloads

Place files in `content/courses/{courseId}/{moduleId}/{lessonSlug}/downloads/` — download buttons appear automatically.

### Projects & Learning Paths

- Projects: `content/projects/{id}/project.json`
- Learning paths: `content/learning-paths/paths.json`

## Project Structure

```
content/           # All course content (MDX + JSON)
src/
  app/             # Next.js pages & API routes
  components/      # Reusable UI components
  lib/             # Content loaders, MDX, SEO utilities
  types/           # TypeScript content schemas
legacy/            # Original HTML site (reference only)
```

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed architectural decisions.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run format` | Format with Prettier |

## SEO

- Static generation for all course/lesson pages
- Open Graph + Twitter Cards
- JSON-LD structured data (Course, LearningResource, WebSite)
- Auto-generated `sitemap.xml` and `robots.txt`

## Future Features

Architecture supports adding without major refactoring:

- User accounts & progress tracking
- Meilisearch integration (search API ready)
- Quizzes, certificates, subscriptions
- Comments, ratings, AI assistant
- Admin dashboard

## License

Proprietary — NAVBC
