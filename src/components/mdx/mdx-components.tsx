import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { Callout } from "@/components/mdx/callout";
import { cn } from "@/lib/utils";

export const mdxComponents: MDXComponents = {
  h1: ({ className, ...props }) => (
    <h1
      className={cn("mt-8 scroll-m-20 text-3xl font-bold tracking-tight first:mt-0", className)}
      {...props}
    />
  ),
  h2: ({ className, ...props }) => (
    <h2
      className={cn(
        "mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight first:mt-0",
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={cn("mt-8 scroll-m-20 text-xl font-semibold tracking-tight", className)}
      {...props}
    />
  ),
  h4: ({ className, ...props }) => (
    <h4
      className={cn("mt-6 scroll-m-20 text-lg font-semibold tracking-tight", className)}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p
      className={cn("leading-7 text-muted-foreground [&:not(:first-child)]:mt-4", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }) => (
    <ul className={cn("my-4 ml-6 list-disc space-y-2 text-muted-foreground", className)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol className={cn("my-4 ml-6 list-decimal space-y-2 text-muted-foreground", className)} {...props} />
  ),
  li: ({ className, ...props }) => (
    <li className={cn("leading-7", className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn("mt-4 border-l-4 border-brand pl-4 italic text-muted-foreground", className)}
      {...props}
    />
  ),
  a: ({ className, href, ...props }) => {
    const isExternal = href?.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={href}
          className={cn("font-medium text-brand underline-offset-4 hover:underline", className)}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        />
      );
    }
    return (
      <Link
        href={href ?? "#"}
        className={cn("font-medium text-brand underline-offset-4 hover:underline", className)}
        {...props}
      />
    );
  },
  code: ({ className, ...props }) => (
    <code
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm text-foreground",
        className,
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }) => (
    <pre
      className={cn("my-6 overflow-x-auto rounded-xl", className)}
      {...props}
    />
  ),
  hr: () => <hr className="my-8 border-border" />,
  table: ({ className, ...props }) => (
    <div className="my-6 w-full overflow-x-auto">
      <table className={cn("w-full border-collapse text-sm", className)} {...props} />
    </div>
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn("border border-border bg-muted px-4 py-2 text-left font-semibold", className)}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td className={cn("border border-border px-4 py-2", className)} {...props} />
  ),
  img: ({ className, alt, ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={cn("my-6 rounded-xl border border-border", className)}
      alt={alt ?? ""}
      loading="lazy"
      {...props}
    />
  ),
  Callout,
};
