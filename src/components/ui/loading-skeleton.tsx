import { cn } from "@/lib/utils";

export function LoadingSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse rounded-lg bg-muted", className)} />
  );
}

export function CourseCardSkeleton() {
  return (
    <div className="rounded-xl border border-border p-0">
      <LoadingSkeleton className="aspect-[16/9] rounded-t-xl rounded-b-none" />
      <div className="space-y-3 p-6">
        <LoadingSkeleton className="h-5 w-3/4" />
        <LoadingSkeleton className="h-4 w-full" />
        <LoadingSkeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}

export function LessonSkeleton() {
  return (
    <div className="space-y-4">
      <LoadingSkeleton className="h-8 w-2/3" />
      <LoadingSkeleton className="h-4 w-full" />
      <LoadingSkeleton className="h-4 w-full" />
      <LoadingSkeleton className="h-64 w-full" />
    </div>
  );
}
