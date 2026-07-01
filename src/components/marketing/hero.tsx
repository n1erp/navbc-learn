"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
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
            Everything you need to master Business Central—from AL development and
            functional consulting to integrations, reporting, APIs, and real-world
            projects. Learn at your own pace with practical courses, source code,
            quizzes, and expert guidance.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="brand" size="lg" asChild>
              <Link href="/courses">
                Explore Courses
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/learning-paths">View Learning Paths</Link>
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div>
              <span className="block text-2xl font-bold text-foreground">30+</span>
              Lessons
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <span className="block text-2xl font-bold text-foreground">4</span>
              Courses
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
