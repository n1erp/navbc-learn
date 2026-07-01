import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { Callout } from "@/components/mdx/callout";
import { cn } from "@/lib/utils";

export const mdxComponents: MDXComponents = {
  h1: ({ className, ...props }) => (
    <h1
      className={cn(
        "mt-10 scroll-m-20 text-2xl font-bold tracking-tight first:mt-0 sm:text-3xl md:text-4xl",
        className,
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }) => (
    <h2
      className={cn(
        "mt-10 scroll-m-20 border-b border-border pb-3 text-xl font-semibold tracking-tight first:mt-0 sm:text-2xl md:text-3xl",
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={cn(
        "mt-8 scroll-m-20 text-lg font-semibold tracking-tight sm:text-xl md:text-2xl",
        className,
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }) => (
    <h4
      className={cn("mt-6 scroll-m-20 text-base font-semibold tracking-tight sm:text-lg", className)}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p
      className={cn(
        "leading-[1.8] text-foreground/85 [&:not(:first-child)]:mt-5",
        className,
      )}
      {...props}
    />
  ),
  ul: ({ className, ...props }) => (
    <ul
      className={cn("my-5 ml-5 list-disc space-y-2.5 text-foreground/85 sm:ml-6", className)}
      {...props}
    />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={cn("my-5 ml-5 list-decimal space-y-2.5 text-foreground/85 sm:ml-6", className)}
      {...props}
    />
  ),
  li: ({ className, ...props }) => (
    <li className={cn("leading-[1.75] pl-1", className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        "mt-5 border-l-4 border-brand pl-5 text-base italic text-foreground/75 sm:text-lg",
        className,
      )}
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
        "relative rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.875em] font-medium text-foreground",
        className,
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }) => (
    <pre className={cn("my-0 overflow-x-auto rounded-xl", className)} {...props} />
  ),
  hr: () => <hr className="my-10 border-border" />,
  table: ({ className, ...props }) => (
    <div className="my-6 w-full overflow-x-auto rounded-xl border border-border">
      <table className={cn("w-full min-w-[480px] border-collapse text-sm sm:text-base", className)} {...props} />
    </div>
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn(
        "border-b border-border bg-muted px-4 py-3 text-left text-sm font-semibold sm:px-5 sm:text-base",
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn("border-b border-border px-4 py-3 text-sm sm:px-5 sm:text-base", className)}
      {...props}
    />
  ),
  img: ({ className, alt, ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={cn("my-8 w-full rounded-xl border border-border", className)}
      alt={alt ?? ""}
      loading="lazy"
      {...props}
    />
  ),
  Callout,
};
