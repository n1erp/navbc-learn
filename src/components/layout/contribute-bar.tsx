"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Bug, MessageCircle, GitPullRequest, Pencil, Heart } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import {
  getDiscussionsUrl,
  getEditFileUrl,
  getGitHubRepoUrl,
  getNewIssueUrl,
  getLessonIssueBody,
} from "@/lib/github";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ContributeMeta {
  pageTitle?: string;
  contentPath?: string;
  courseTitle?: string;
}

export function ContributeBar({ className }: { className?: string }) {
  const pathname = usePathname();
  const [meta, setMeta] = useState<ContributeMeta>({});

  useEffect(() => {
    if (!pathname || pathname === "/contribute") return;

    fetch(`/api/contribute-meta?path=${encodeURIComponent(pathname)}`)
      .then((r) => r.json())
      .then((data: ContributeMeta) => setMeta(data))
      .catch(() => setMeta({}));
  }, [pathname]);

  if (pathname === "/contribute") return null;

  const pageUrl = `${siteConfig.url}${pathname}`;
  const issueBody =
    meta.courseTitle && meta.pageTitle
      ? getLessonIssueBody({
          pageUrl,
          courseTitle: meta.courseTitle,
          lessonTitle: meta.pageTitle,
          contentPath: meta.contentPath,
        })
      : meta.pageTitle
        ? `## Page\n${pageUrl}\n\n## Feedback\n<!-- Describe your suggestion or issue -->`
        : undefined;

  const issueUrl = getNewIssueUrl({
    template: "content_improvement.yml",
    title: meta.pageTitle ? `Content: ${meta.pageTitle}` : "Website feedback",
    body: issueBody,
  });

  const editUrl = meta.contentPath ? getEditFileUrl(meta.contentPath) : undefined;

  return (
    <section
      aria-label="Contribute to NAVBC Learn"
      className={cn("border-t border-border bg-muted/30", className)}
    >
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-brand">
              <Heart className="h-4 w-4" aria-hidden="true" />
              <span className="text-sm font-semibold uppercase tracking-wide">
                Open Source
              </span>
            </div>
            <h2 className="mt-2 text-lg font-semibold sm:text-xl">
              Help improve this platform
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
              NAVBC Learn is open source. Report issues, suggest improvements, or join
              discussions on{" "}
              <a
                href={getGitHubRepoUrl()}
                className="font-medium text-brand hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              .
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap lg:justify-end">
            {editUrl && (
              <Button variant="outline" size="sm" className="gap-2" asChild>
                <a href={editUrl} target="_blank" rel="noopener noreferrer">
                  <Pencil className="h-4 w-4" />
                  Edit this page
                </a>
              </Button>
            )}
            <Button variant="outline" size="sm" className="gap-2" asChild>
              <a href={issueUrl} target="_blank" rel="noopener noreferrer">
                <Bug className="h-4 w-4" />
                Report issue
              </a>
            </Button>
            <Button variant="outline" size="sm" className="gap-2" asChild>
              <a href={getDiscussionsUrl("ideas")} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" />
                Discussion
              </a>
            </Button>
            <Button variant="brand" size="sm" className="gap-2" asChild>
              <Link href="/contribute">
                <GitPullRequest className="h-4 w-4" />
                How to contribute
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
