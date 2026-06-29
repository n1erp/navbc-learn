"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, PanelLeftClose, PanelLeft } from "lucide-react";
import { useState } from "react";
import type { Course } from "@/types/content";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CourseSidebarProps {
  course: Course;
  currentLessonSlug: string;
}

export function CourseSidebar({ course, currentLessonSlug }: CourseSidebarProps) {
  const currentModule = course.modules.find((m) =>
    m.lessons.includes(currentLessonSlug),
  );
  const [collapsed, setCollapsed] = useState(false);

  if (collapsed) {
    return (
      <aside className="hidden w-12 shrink-0 border-r border-border lg:block">
        <div className="sticky top-0 flex h-screen flex-col items-center py-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(false)}
            aria-label="Expand sidebar"
          >
            <PanelLeft className="h-4 w-4" />
          </Button>
        </div>
      </aside>
    );
  }

  return (
    <aside className="hidden w-72 shrink-0 border-r border-border lg:block xl:w-80">
      <div className="sticky top-0 flex h-screen flex-col">
        <div className="flex items-center justify-between border-b border-border p-4">
          <Link
            href={`/courses/${course.slug}`}
            className="truncate text-sm font-semibold hover:text-brand"
          >
            {course.title}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0"
            onClick={() => setCollapsed(true)}
            aria-label="Collapse sidebar"
          >
            <PanelLeftClose className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="flex-1">
          <Accordion
            type="multiple"
            defaultValue={currentModule ? [currentModule.id] : []}
            className="px-2 py-3"
          >
            {course.modules.map((mod, modIndex) => (
              <AccordionItem key={mod.id} value={mod.id} className="border-none">
                <AccordionTrigger className="rounded-lg px-3 py-2 hover:bg-accent hover:no-underline">
                  <span className="text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Module {modIndex + 1}: {mod.title}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-2">
                  <ul className="space-y-0.5">
                    {mod.lessons.map((lessonSlug, lessonIndex) => {
                      const isActive = lessonSlug === currentLessonSlug;
                      const href = `/courses/${course.slug}/lessons/${lessonSlug}`;

                      return (
                        <li key={lessonSlug}>
                          <Link
                            href={href}
                            className={cn(
                              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                              isActive
                                ? "bg-brand/10 font-medium text-brand"
                                : "text-muted-foreground hover:bg-accent hover:text-foreground",
                            )}
                            aria-current={isActive ? "page" : undefined}
                          >
                            <span
                              className={cn(
                                "flex h-5 w-5 shrink-0 items-center justify-center rounded text-[10px] font-medium",
                                isActive
                                  ? "bg-brand text-brand-foreground"
                                  : "bg-muted text-muted-foreground",
                              )}
                            >
                              {lessonIndex + 1}
                            </span>
                            <span className="truncate capitalize">
                              {lessonSlug.replace(/-/g, " ")}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollArea>
      </div>
    </aside>
  );
}

interface LessonNavigationProps {
  prevLesson: { title: string; slug: string; courseSlug: string } | null;
  nextLesson: { title: string; slug: string; courseSlug: string } | null;
}

export function LessonNavigation({ prevLesson, nextLesson }: LessonNavigationProps) {
  return (
    <nav
      className="mt-12 flex items-stretch justify-between gap-4 border-t border-border pt-8"
      aria-label="Lesson navigation"
    >
      {prevLesson ? (
        <Link
          href={`/courses/${prevLesson.courseSlug}/lessons/${prevLesson.slug}`}
          className="group flex flex-1 flex-col rounded-xl border border-border p-4 transition-colors hover:border-brand/40 hover:bg-accent/50"
        >
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <ChevronLeft className="h-3 w-3" />
            Previous
          </span>
          <span className="mt-1 font-medium group-hover:text-brand">
            {prevLesson.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {nextLesson ? (
        <Link
          href={`/courses/${nextLesson.courseSlug}/lessons/${nextLesson.slug}`}
          className="group flex flex-1 flex-col items-end rounded-xl border border-border p-4 text-right transition-colors hover:border-brand/40 hover:bg-accent/50"
        >
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            Next
            <ChevronRight className="h-3 w-3" />
          </span>
          <span className="mt-1 font-medium group-hover:text-brand">
            {nextLesson.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  );
}
