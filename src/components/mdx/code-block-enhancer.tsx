"use client";

import { useEffect } from "react";

function enhanceCodeBlocks() {
  const figures = document.querySelectorAll("[data-rehype-pretty-code-figure]");

  figures.forEach((figure) => {
    if (figure.querySelector("[data-copy-btn]")) return;

    const pre = figure.querySelector("pre");
    if (!pre) return;

    const code = pre.querySelector("code");
    const text = code?.textContent ?? pre.textContent ?? "";

    const wrapper = document.createElement("div");
    wrapper.className = "code-block-wrapper";
    figure.parentNode?.insertBefore(wrapper, figure);
    wrapper.appendChild(figure);

    const btn = document.createElement("button");
    btn.type = "button";
    btn.setAttribute("data-copy-btn", "true");
    btn.className = "code-copy-btn";
    btn.setAttribute("aria-label", "Copy code");
    btn.innerHTML = `<span class="copy-icon">${copyIconSvg}</span><span class="check-icon hidden">${checkIconSvg}</span>`;

    btn.addEventListener("click", async () => {
      await navigator.clipboard.writeText(text);
      btn.querySelector(".copy-icon")?.classList.add("hidden");
      btn.querySelector(".check-icon")?.classList.remove("hidden");
      btn.setAttribute("aria-label", "Copied");
      setTimeout(() => {
        btn.querySelector(".copy-icon")?.classList.remove("hidden");
        btn.querySelector(".check-icon")?.classList.add("hidden");
        btn.setAttribute("aria-label", "Copy code");
      }, 2000);
    });

    wrapper.appendChild(btn);
  });
}

const copyIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;
const checkIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`;

export function CodeBlockEnhancer() {
  useEffect(() => {
    enhanceCodeBlocks();
  }, []);

  return null;
}

/** Wraps MDX content and re-enhances after hydration */
export function LessonContent({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    enhanceCodeBlocks();
  });

  return <div className="prose-lesson mt-8 sm:mt-10">{children}</div>;
}
