"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  courseCount?: number;
  lessonCount?: number;
}

export function Hero({ courseCount = 2, lessonCount = 30 }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="hero-glow absolute inset-0" />
      <div className="grid-pattern absolute inset-0 opacity-50" />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Learn{" "}
            <span className="text-gradient">
              Microsoft Dynamics 365 Business Central
            </span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Two clear learning paths — Technical for AL developers, Functional for
            consultants. Practical lessons, source code, and real-world guidance.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="brand" size="lg" asChild>
              <Link href="/learning-paths">
                Choose Your Path
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/courses">Browse Courses</Link>
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div>
              <span className="block text-2xl font-bold text-foreground">{lessonCount}+</span>
              Lessons
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <span className="block text-2xl font-bold text-foreground">{courseCount}</span>
              Paths
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <span className="block text-2xl font-bold text-foreground">Free</span>
              To Start
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
