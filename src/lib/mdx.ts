import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import { createHighlighter } from "shiki";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { codeThemes } from "@/lib/code-theme";

const prettyCodeOptions = {
  theme: codeThemes,
  keepBackground: false,
  defaultLang: "al",
  grid: false,
  getHighlighter: (options: Parameters<typeof createHighlighter>[0]) =>
    createHighlighter({
      ...options,
      langs: [
        "csharp",
        "json",
        "powershell",
        "xml",
        "sql",
        "javascript",
        "typescript",
        "bash",
        "markdown",
      ],
      langAlias: {
        al: "csharp",
        ps1: "powershell",
      },
    }),
};

export async function compileLessonMDX(source: string) {
  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
          [rehypePrettyCode, prettyCodeOptions],
        ],
      },
    },
  });

  return content;
}
