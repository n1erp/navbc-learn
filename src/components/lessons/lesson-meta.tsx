import { Clock, Target } from "lucide-react";
import { formatDuration } from "@/lib/utils";
import { difficultyLabels, difficultyColors } from "@/lib/seo";
import { cn } from "@/lib/utils";
import type { Difficulty } from "@/types/content";

interface LessonMetaProps {
  duration: number;
  difficulty: Difficulty;
  objectives: string[];
}

export function LessonMeta({ duration, difficulty, objectives }: LessonMetaProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          {formatDuration(duration)}
        </span>
        <span
          className={cn(
            "rounded-full border px-2.5 py-0.5 text-xs font-medium",
            difficultyColors[difficulty],
          )}
        >
          {difficultyLabels[difficulty]}
        </span>
      </div>

      {objectives.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-5">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold">
            <Target className="h-4 w-4 text-brand" />
            Learning Objectives
          </h2>
          <ul className="space-y-2">
            {objectives.map((obj, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                {obj}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
