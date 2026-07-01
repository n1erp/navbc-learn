import type { Metadata } from "next";
import Link from "next/link";
import {
  GitBranch,
  Bug,
  MessageCircle,
  BookOpen,
  Code2,
  FileText,
  Heart,
  ExternalLink,
} from "lucide-react";
import {
  getDiscussionsUrl,
  getEditFileUrl,
  getGitHubRepoUrl,
  getNewIssueUrl,
} from "@/lib/github";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Contribute",
  description:
    "Learn how to contribute lessons, fix content, report issues, and join the NAVBC Learn open source community on GitHub.",
  alternates: { canonical: "https://learn.navbc.com/contribute" },
};

const waysToContribute = [
  {
    icon: FileText,
    title: "Improve lesson content",
    description:
      "Fix typos, clarify explanations, add examples, or translate content. Most contributions are Markdown/MDX only — no React required.",
    href: getEditFileUrl("content/courses/al-development-fundamentals/course.json"),
    cta: "Browse content folder",
  },
  {
    icon: BookOpen,
    title: "Add a new lesson or course",
    description:
      "Create a new .mdx file and update course.json. The site auto-generates pages at build time.",
    href: "https://github.com/taher-el-mehdi/navbc-learn/blob/main/CONTRIBUTING.md#adding-a-lesson",
    cta: "Read the guide",
  },
  {
    icon: Code2,
    title: "Improve the platform",
    description:
      "Fix bugs, improve UI, enhance search, or add features. TypeScript, React, and Next.js experience helpful.",
    href: getNewIssueUrl({ template: "feature_request.yml" }),
    cta: "Request a feature",
  },
  {
    icon: Bug,
    title: "Report a bug",
    description:
      "Something broken? Wrong code sample? Layout issue on mobile? Open a GitHub issue with steps to reproduce.",
    href: getNewIssueUrl({ template: "bug_report.yml" }),
    cta: "Report a bug",
  },
  {
    icon: MessageCircle,
    title: "Start a discussion",
    description:
      "Propose new course topics, ask questions, or share ideas with the community before opening a PR.",
    href: getDiscussionsUrl("ideas"),
    cta: "Join discussion",
  },
  {
    icon: Heart,
    title: "Share your experience",
    description:
      "Add real-world BC scenarios, interview tips, or certification notes that help other learners.",
    href: getDiscussionsUrl("show-and-tell"),
    cta: "Share knowledge",
  },
];

const steps = [
  {
    step: 1,
    title: "Fork the repository",
    body: "Create your own copy of the project on GitHub so you can work independently.",
  },
  {
    step: 2,
    title: "Create a branch",
    body: "Use a descriptive branch name like content/add-flowfield-lesson or fix/typo-docker-setup.",
  },
  {
    step: 3,
    title: "Make your changes",
    body: "Edit MDX lessons, course.json files, or platform code. Run npm run dev locally to preview.",
  },
  {
    step: 4,
    title: "Open a Pull Request",
    body: "Describe what you changed and why. Maintainers will review and merge when ready.",
  },
];

export default function ContributePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-sm font-medium text-brand">
          <GitBranch className="h-4 w-4" />
          Open Source on GitHub
        </div>
        <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Contribute to NAVBC Learn
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Help build the best free learning platform for Business Central developers.
          Whether you fix a typo or author an entire course — every contribution matters.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button variant="brand" size="lg" asChild>
            <a href={getGitHubRepoUrl()} target="_blank" rel="noopener noreferrer">
              View on GitHub
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="https://github.com/taher-el-mehdi/navbc-learn/blob/main/CONTRIBUTING.md">
              Read CONTRIBUTING.md
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-14 grid gap-4 sm:grid-cols-2">
        {waysToContribute.map((item) => (
          <Card key={item.title} className="transition-colors hover:border-brand/30">
            <CardHeader className="pb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
                <item.icon className="h-5 w-5" />
              </div>
              <CardTitle className="mt-3 text-base sm:text-lg">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {item.description}
              </p>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline"
              >
                {item.cta}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold">How to contribute</h2>
        <ol className="mt-8 space-y-6">
          {steps.map((s) => (
            <li key={s.step} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-brand-foreground">
                {s.step}
              </span>
              <div>
                <h3 className="font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground sm:text-base">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <Card className="mt-16 border-brand/20 bg-brand/5">
        <CardContent className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold">Code of Conduct</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
            We are committed to a welcoming, inclusive community. All contributors are expected
            to follow our{" "}
            <a
              href="https://github.com/taher-el-mehdi/navbc-learn/blob/main/CODE_OF_CONDUCT.md"
              className="font-medium text-brand hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Code of Conduct
            </a>
            .
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Licensed under{" "}
            <a
              href="https://github.com/taher-el-mehdi/navbc-learn/blob/main/LICENSE"
              className="font-medium text-brand hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              MIT License
            </a>
            . Content contributions are shared under the same license unless noted otherwise.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
