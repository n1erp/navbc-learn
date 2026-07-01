"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronLeft, ChevronRight, PanelLeftClose, PanelLeft } from "lucide-react";
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

function SidebarContent({
  course,
  currentLessonSlug,
  onNavigate,
}: CourseSidebarProps & { onNavigate?: () => void }) {
  const currentModule = course.modules.find((m) =>
    m.lessons.includes(currentLessonSlug),
  );

  return (
    <Accordion
      type="multiple"
      defaultValue={currentModule ? [currentModule.id] : []}
      className="px-2 py-3"
    >
      {course.modules.map((mod, modIndex) => (
        <AccordionItem key={mod.id} value={mod.id} className="border-none">
          <AccordionTrigger className="rounded-lg px-3 py-2.5 hover:bg-accent hover:no-underline">
            <span className="text-left text-xs font-medium uppercase tracking-wide text-muted-foreground sm:text-sm">
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
                      onClick={onNavigate}
                      className={cn(
                        "flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors sm:text-base",
                        isActive
                          ? "bg-brand/10 font-medium text-brand"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground",
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <span
                        className={cn(
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded text-[10px] font-medium sm:h-7 sm:w-7 sm:text-xs",
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
  );
}

export function CourseSidebar({ course, currentLessonSlug }: CourseSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile lesson nav trigger */}
      <div className="sticky top-16 z-40 flex items-center justify-between border-b border-border bg-background/95 px-4 py-3 backdrop-blur-lg lg:hidden">
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => setMobileOpen(true)}
          aria-label="Open lesson menu"
        >
          <Menu className="h-4 w-4" />
          Lessons
        </Button>
        <Link
          href={`/courses/${course.slug}`}
          className="truncate text-sm font-medium text-muted-foreground hover:text-brand"
        >
          {course.title}
        </Link>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            aria-label="Close lesson menu"
          />
          <aside className="absolute bottom-0 left-0 right-0 max-h-[85vh] rounded-t-2xl border-t border-border bg-background shadow-2xl">
            <div className="flex items-center justify-between border-b border-border p-4">
              <span className="font-semibold">{course.title}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileOpen(false)}
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <ScrollArea className="max-h-[calc(85vh-4rem)]">
              <SidebarContent
                course={course}
                currentLessonSlug={currentLessonSlug}
                onNavigate={() => setMobileOpen(false)}
              />
            </ScrollArea>
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      {collapsed ? (
        <aside className="hidden w-12 shrink-0 border-r border-border lg:block">
          <div className="sticky top-16 flex h-[calc(100vh-4rem)] flex-col items-center py-4">
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
      ) : (
        <aside className="hidden w-72 shrink-0 border-r border-border lg:block xl:w-80">
          <div className="sticky top-16 flex h-[calc(100vh-4rem)] flex-col">
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
              <SidebarContent course={course} currentLessonSlug={currentLessonSlug} />
            </ScrollArea>
          </div>
        </aside>
      )}
    </>
  );
}

interface LessonNavigationProps {
  prevLesson: { title: string; slug: string; courseSlug: string } | null;
  nextLesson: { title: string; slug: string; courseSlug: string } | null;
}

export function LessonNavigation({ prevLesson, nextLesson }: LessonNavigationProps) {
  return (
    <nav
      className="mt-12 flex flex-col gap-3 border-t border-border pt-8 sm:flex-row sm:items-stretch sm:justify-between sm:gap-4"
      aria-label="Lesson navigation"
    >
      {prevLesson ? (
        <Link
          href={`/courses/${prevLesson.courseSlug}/lessons/${prevLesson.slug}`}
          className="group flex flex-1 flex-col rounded-xl border border-border p-4 transition-colors hover:border-brand/40 hover:bg-accent/50 sm:p-5"
        >
          <span className="flex items-center gap-1 text-xs text-muted-foreground sm:text-sm">
            <ChevronLeft className="h-4 w-4" />
            Previous
          </span>
          <span className="mt-1 text-sm font-medium group-hover:text-brand sm:text-base">
            {prevLesson.title}
          </span>
        </Link>
      ) : (
        <div className="hidden flex-1 sm:block" />
      )}

      {nextLesson ? (
        <Link
          href={`/courses/${nextLesson.courseSlug}/lessons/${nextLesson.slug}`}
          className="group flex flex-1 flex-col rounded-xl border border-border p-4 text-left transition-colors hover:border-brand/40 hover:bg-accent/50 sm:p-5 sm:text-right"
        >
          <span className="flex items-center gap-1 text-xs text-muted-foreground sm:justify-end sm:text-sm">
            Next
            <ChevronRight className="h-4 w-4" />
          </span>
          <span className="mt-1 text-sm font-medium group-hover:text-brand sm:text-base">
            {nextLesson.title}
          </span>
        </Link>
      ) : (
        <div className="hidden flex-1 sm:block" />
      )}
    </nav>
  );
}
