import Link from "next/link";
import { MessageCircle, Github, BookOpen } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { Newsletter } from "@/components/marketing/newsletter";

export function CommunitySection() {
  return (
    <section className="border-y border-border bg-card/30 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight">Join the Community</h2>
          <p className="mt-2 text-muted-foreground">
            Connect with Business Central developers, share your projects, and get
            help when you&apos;re stuck
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <a
            href={siteConfig.links.discord}
            className="flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center transition-all hover:border-brand/40 hover:shadow-lg"
          >
            <MessageCircle className="h-10 w-10 text-brand" />
            <h3 className="mt-4 font-semibold">Discord</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Chat with developers in real-time
            </p>
          </a>
          <a
            href={siteConfig.links.github}
            className="flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center transition-all hover:border-brand/40 hover:shadow-lg"
          >
            <Github className="h-10 w-10 text-brand" />
            <h3 className="mt-4 font-semibold">GitHub</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Contribute to open-source BC projects
            </p>
          </a>
          <Link
            href="/community"
            className="flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center transition-all hover:border-brand/40 hover:shadow-lg"
          >
            <BookOpen className="h-10 w-10 text-brand" />
            <h3 className="mt-4 font-semibold">Resources</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Curated links and documentation
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-brand/20 bg-gradient-to-br from-brand/10 via-card to-card p-12 text-center">
          <div className="hero-glow absolute inset-0" />
          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to become a BC developer?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Pick the Technical or Functional path and start with the free
              Fundamentals course today.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button variant="brand" size="lg" asChild>
                <Link href="/learning-paths">
                  Choose Your Path
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/learning-paths">Browse Learning Paths</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function NewsletterSection() {
  return (
    <section className="border-t border-border py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-bold tracking-tight">Stay in the loop</h2>
          <p className="mt-2 text-muted-foreground">
            Get new tutorials, BC release updates, and developer tips in your inbox.
          </p>
          <div className="mt-8 flex justify-center">
            <Newsletter />
          </div>
        </div>
      </div>
    </section>
  );
}
