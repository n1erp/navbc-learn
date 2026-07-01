# Architecture

## Content-Driven Design

All educational content lives in `/content` as Markdown/MDX files and JSON metadata. React components never contain lesson text. Adding content requires only new files in `/content`.

```
content/
├── courses/
│   └── {course-id}/
│       ├── course.json          # Course metadata
│       └── {module-id}/
│           ├── lesson-01.mdx    # Lesson content + frontmatter
│           └── lesson-01/
│               └── downloads/   # Auto-detected downloadable files
├── projects/
│   └── {project-id}/project.json
└── learning-paths/
    └── paths.json
```

## Content Loading (`src/lib/content.ts`)

- Reads filesystem at build time (SSG)
- Zod schemas validate all JSON/frontmatter (`src/types/content.ts`)
- `getLesson()` compiles navigation (prev/next) without recursion
- `buildSearchIndex()` prepares data for search — swap to Meilisearch later

## MDX Pipeline (`src/lib/mdx.ts`)

- `next-mdx-remote/rsc` for server-side MDX compilation
- `rehype-pretty-code` + Shiki for syntax highlighting
- Custom components: `Callout`, styled headings, tables, links
- Supports code blocks with `title` attribute for filename headers

## Search Architecture

Current: In-memory index built from content, scored keyword search via `/api/search`.

Future Meilisearch integration:
1. Add Meilisearch client in `src/lib/search.ts`
2. Index on build via script or webhook
3. Replace `searchContent()` implementation — API route unchanged

## SEO Strategy

- All course/lesson pages use `generateStaticParams()` for SSG
- Per-page `generateMetadata()` with canonical URLs
- JSON-LD: `Course`, `LearningResource`, `WebSite`, `Organization`
- Dynamic `sitemap.ts` includes all content URLs

## Component Hierarchy

```
layout.tsx
├── SiteHeader (search, nav, theme toggle)
├── [pages]
└── SiteFooter

Lesson page:
├── CourseSidebar (collapsible module/lesson tree)
├── Breadcrumb
├── LessonMeta (objectives, duration, difficulty)
├── VideoPlayer
├── MDX content
├── DownloadsPanel (auto from filesystem)
└── LessonNavigation (prev/next)
```

## Dark Mode

`next-themes` with class-based switching. CSS variables in `globals.css` for all design tokens. User preference persisted in localStorage.

## Future Extension Points

| Feature | Extension Point |
|---------|----------------|
| Auth | Add middleware + `src/lib/auth.ts` |
| Progress | Lesson page wrapper + API routes |
| Quizzes | MDX frontmatter `quizId` + quiz content folder |
| Certificates | PDF generation API + user completion tracking |
| Stripe | `/api/checkout` + subscription middleware |
| Admin | Separate `/admin` route group with CMS UI |

## Performance

- Static generation for 32+ pages at build time
- `optimizePackageImports` for lucide-react and framer-motion
- Image optimization via `next/image`
- Minimal client JS on content pages (sidebar, search, theme only)

## Open Source & Contributions

### Contribution flow

```
Contributor → Fork → Branch → Edit content/ or src/ → PR → Review → Merge → Deploy
```

### Key files for contributors

| File | Purpose |
|------|---------|
| `CONTRIBUTING.md` | Main contribution guide |
| `docs/content-guidelines.md` | Lesson writing standards |
| `.github/ISSUE_TEMPLATE/` | Bug, content, feature issue forms |
| `src/components/layout/contribute-bar.tsx` | On-page GitHub links (all pages) |
| `src/app/api/contribute-meta/route.ts` | Maps URLs to editable content files |
| `src/lib/github.ts` | GitHub URL helpers |

### Content vs platform changes

- **Content PRs** — Only touch `content/` and `public/images/`. No TypeScript required.
- **Platform PRs** — Touch `src/`. Require `npm run build` and `npm run lint`.

### GitHub integration

- Issues: bug reports, content improvements, feature requests
- Discussions: ideas, questions, show-and-tell
- Edit links: lesson/course pages link directly to the source file on GitHub

