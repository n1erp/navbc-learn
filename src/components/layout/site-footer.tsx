import Link from "next/link";
import { Code2, Github, Twitter } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  learn: [
    { title: "All Courses", href: "/courses" },
    { title: "Learning Paths", href: "/learning-paths" },
    { title: "Projects", href: "/projects" },
    { title: "Tutorials", href: "/tutorials" },
  ],
  resources: [
    { title: "AL Documentation", href: "https://learn.microsoft.com/dynamics365/business-central/dev-itpro/developer/devenv-programming-in-al" },
    { title: "BC Developer Docs", href: "https://learn.microsoft.com/dynamics365/business-central/dev-itpro/developer/" },
    { title: "Community", href: "/community" },
    { title: "Blog", href: "https://navbc.com/blog" },
  ],
  company: [
    { title: "About NAVBC", href: "https://navbc.com" },
    { title: "Contact", href: "https://navbc.com/contact" },
    { title: "Privacy", href: "/privacy" },
    { title: "Terms", href: "/terms" },
  ],
};

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-brand-foreground">
                <Code2 className="h-5 w-5" />
              </div>
              <span className="font-semibold tracking-tight">NAVBC Learn</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              The premium learning platform for Microsoft Dynamics 365 Business
              Central and NAV developers. Master AL development from fundamentals
              to advanced extensions.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={siteConfig.links.github}
                className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:border-brand hover:text-brand"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.links.twitter}
                className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:border-brand hover:text-brand"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold capitalize">{category}</h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} NAVBC. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built for Business Central developers worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}
