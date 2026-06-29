import { NextResponse } from "next/server";
import { searchContent } from "@/lib/content";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const limit = parseInt(searchParams.get("limit") ?? "20", 10);

  const results = searchContent(q, limit);

  return NextResponse.json({ results, query: q });
}
