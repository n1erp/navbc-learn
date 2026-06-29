import { cn } from "@/lib/utils";
import { AlertTriangle, Info, Lightbulb, AlertCircle } from "lucide-react";

type CalloutType = "info" | "tip" | "warning" | "note";

const config: Record<
  CalloutType,
  { icon: typeof Info; className: string; label: string }
> = {
  info: {
    icon: Info,
    className: "border-blue-500/30 bg-blue-500/5 text-blue-600 dark:text-blue-400",
    label: "Info",
  },
  tip: {
    icon: Lightbulb,
    className: "border-emerald-500/30 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400",
    label: "Tip",
  },
  warning: {
    icon: AlertTriangle,
    className: "border-amber-500/30 bg-amber-500/5 text-amber-600 dark:text-amber-400",
    label: "Warning",
  },
  note: {
    icon: AlertCircle,
    className: "border-violet-500/30 bg-violet-500/5 text-violet-600 dark:text-violet-400",
    label: "Note",
  },
};

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

export function Callout({ type = "info", title, children }: CalloutProps) {
  const { icon: Icon, className, label } = config[type];

  return (
    <div
      className={cn(
        "my-6 flex gap-3 rounded-xl border p-4",
        className,
      )}
      role="note"
    >
      <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <p className="mb-1 font-semibold">{title ?? label}</p>
        <div className="text-sm leading-relaxed opacity-90 [&>p]:m-0">
          {children}
        </div>
      </div>
    </div>
  );
}
