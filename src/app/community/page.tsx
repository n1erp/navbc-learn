import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { MessageCircle, Github, BookOpen, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Community",
  description: "Join the NAVBC developer community.",
};

const resources = [
  {
    title: "Microsoft BC Developer Docs",
    url: "https://learn.microsoft.com/dynamics365/business-central/dev-itpro/developer/",
    description: "Official Microsoft documentation for BC development",
  },
  {
    title: "AL Language Reference",
    url: "https://learn.microsoft.com/dynamics365/business-central/dev-itpro/developer/methods-auto/library",
    description: "Complete AL method and property reference",
  },
  {
    title: "BcContainerHelper",
    url: "https://github.com/microsoft/navcontainerhelper",
    description: "PowerShell module for BC Docker containers",
  },
  {
    title: "WALDO's Blog",
    url: "https://waldo.blog/",
    description: "Essential BC development tips and tools",
  },
];

export default function CommunityPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight">Community</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Connect with Business Central developers and access curated resources.
      </p>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        <a
          href={siteConfig.links.discord}
          className="flex items-center gap-4 rounded-xl border border-border p-6 hover:border-brand/40"
        >
          <MessageCircle className="h-8 w-8 text-brand" />
          <div>
            <p className="font-semibold">Discord</p>
            <p className="text-sm text-muted-foreground">Join our developer chat</p>
          </div>
        </a>
        <a
          href={siteConfig.links.github}
          className="flex items-center gap-4 rounded-xl border border-border p-6 hover:border-brand/40"
        >
          <Github className="h-8 w-8 text-brand" />
          <div>
            <p className="font-semibold">GitHub</p>
            <p className="text-sm text-muted-foreground">Open source projects</p>
          </div>
        </a>
      </div>

      <h2 className="mt-16 text-2xl font-bold">Resources</h2>
      <ul className="mt-6 space-y-3">
        {resources.map((r) => (
          <li key={r.url}>
            <a
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-lg border border-border p-4 hover:border-brand/40"
            >
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{r.title}</p>
                  <p className="text-sm text-muted-foreground">{r.description}</p>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
