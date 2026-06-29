"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  "data-language"?: string;
}

export function CodeBlock({ children, className, title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const getCodeText = (): string => {
    if (typeof children === "string") return children;
    if (Array.isArray(children)) {
      return children.map((c) => (typeof c === "string" ? c : "")).join("");
    }
    return "";
  };

  const handleCopy = async () => {
    const text = getCodeText();
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative my-6">
      {title && (
        <div className="flex items-center justify-between rounded-t-xl border border-b-0 border-border bg-muted/50 px-4 py-2">
          <span className="font-mono text-xs text-muted-foreground">{title}</span>
        </div>
      )}
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute right-2 top-2 z-10 h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100",
            title && "top-2",
          )}
          onClick={handleCopy}
          aria-label={copied ? "Copied" : "Copy code"}
        >
          {copied ? (
            <Check className="h-4 w-4 text-emerald-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
        <pre className={cn("overflow-x-auto", className)}>{children}</pre>
      </div>
    </div>
  );
}
