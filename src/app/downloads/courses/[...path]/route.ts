import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path: pathSegments } = await params;
  const filePath = path.join(
    process.cwd(),
    "content",
    "courses",
    ...pathSegments,
  );

  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    return new NextResponse("File not found", { status: 404 });
  }

  const file = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase();

  const contentTypes: Record<string, string> = {
    ".zip": "application/zip",
    ".pdf": "application/pdf",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".al": "text/plain",
    ".json": "application/json",
    ".txt": "text/plain",
  };

  return new NextResponse(file, {
    headers: {
      "Content-Type": contentTypes[ext] ?? "application/octet-stream",
      "Content-Disposition": `attachment; filename="${path.basename(filePath)}"`,
    },
  });
}
