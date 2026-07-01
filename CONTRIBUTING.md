# Contributing to NAVBC Learn

Thank you for helping build the best open learning platform for Microsoft Dynamics 365 Business Central developers!

## Quick Start

1. **Fork** the repository on GitHub
2. **Clone** your fork: `git clone https://github.com/YOUR_USERNAME/navbc-learn.git`
3. Create a **branch**: `git checkout -b content/fix-docker-lesson`
4. Make your changes
5. Run `npm run dev` to preview locally
6. Open a **Pull Request** against `main`

## Ways to Contribute

| Type | Where to start |
|------|----------------|
| Fix lesson content | Edit `.mdx` files in `content/` |
| Add new lessons | See [Adding a Lesson](#adding-a-lesson) |
| Report bugs | [Bug report issue](https://github.com/taher-el-mehdi/navbc-learn/issues/new?template=bug_report.yml) |
| Suggest content | [Content issue](https://github.com/taher-el-mehdi/navbc-learn/issues/new?template=content_improvement.yml) |
| Discuss ideas | [GitHub Discussions](https://github.com/taher-el-mehdi/navbc-learn/discussions) |
| Platform code | `src/` folder |

Use the **Contribute bar** at the bottom of every page on the website to report issues or edit the current page on GitHub.

## Development Setup

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # Run before opening a PR
npm run lint
```

## Adding a Lesson

1. Create `content/courses/{course-id}/{module-id}/lesson-slug.mdx`
2. Add frontmatter (title, description, duration, difficulty, objectives)
3. Register the slug in `course.json` under the module's `lessons` array
4. Update `lessonsCount` and `duration` in `course.json`

Example frontmatter:

```mdx
---
title: My New Lesson
description: Short description for SEO
duration: 25
difficulty: beginner
objectives:
  - First learning objective
tags:
  - AL
---

## Content here
```

See [docs/content-guidelines.md](./docs/content-guidelines.md) for full writing standards.

## Adding a Course

1. Create `content/courses/my-course-id/course.json`
2. Add module folders with `.mdx` lessons
3. Add banner SVG to `public/images/courses/`
4. Set `thumbnail` in `course.json`

## Pull Request Process

1. Fill in the [PR template](.github/pull_request_template.md)
2. Link issues: `Fixes #123`
3. Ensure `npm run build` passes
4. Wait for maintainer review

## Code of Conduct

Follow our [Code of Conduct](./CODE_OF_CONDUCT.md).

## License

Contributions are licensed under the [MIT License](./LICENSE).
