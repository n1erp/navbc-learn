"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { BookOpen, FileText, FolderKanban } from "lucide-react";
import type { SearchDocument } from "@/types/content";
import { SearchBar } from "@/components/search/search-bar";

const typeIcons = {
  course: BookOpen,
  lesson: FileText,
  project: FolderKanban,
};

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const [results, setResults] = useState<SearchDocument[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    fetch(`/api/search?q=${encodeURIComponent(query)}`)
      .then((r) => r.json())
      .then((d) => setResults(d.results ?? []))
      .finally(() => setLoading(false));
  }, [query]);

  if (!query.trim()) {
    return (
      <p className="mt-12 text-center text-muted-foreground">
        Enter a search term above to find courses, lessons, and projects.
      </p>
    );
  }

  if (loading) {
    return <p className="mt-12 text-center text-muted-foreground">Searching...</p>;
  }

  if (results.length === 0) {
    return (
      <p className="mt-12 text-center text-muted-foreground">
        No results found for &ldquo;{query}&rdquo;
      </p>
    );
  }

  return (
    <ul className="mt-8 space-y-3">
      {results.map((result) => {
        const Icon = typeIcons[result.type];
        return (
          <li key={result.id}>
            <Link
              href={result.url}
              className="flex items-start gap-4 rounded-xl border border-border p-4 transition-colors hover:border-brand/40 hover:bg-accent/50"
            >
              <Icon className="mt-1 h-5 w-5 shrink-0 text-brand" />
              <div>
                <p className="font-medium">{result.title}</p>
                <p className="text-sm text-muted-foreground">{result.description}</p>
                {result.courseTitle && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {result.courseTitle}
                  </p>
                )}
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight">Search</h1>
      <p className="mt-2 text-muted-foreground">
        Find courses, lessons, and projects across NAVBC Learn.
      </p>

      <div className="mt-8">
        <SearchBar />
      </div>

      <Suspense fallback={<p className="mt-12 text-center">Loading...</p>}>
        <SearchResults />
      </Suspense>
    </div>
  );
}
