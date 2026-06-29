import { Download, FileArchive, FileCode, FileImage, FileText } from "lucide-react";
import type { DownloadFile } from "@/types/content";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const typeIcons = {
  zip: FileArchive,
  pdf: FileText,
  image: FileImage,
  code: FileCode,
  other: FileText,
};

interface DownloadButtonProps {
  file: DownloadFile;
}

export function DownloadButton({ file }: DownloadButtonProps) {
  const Icon = typeIcons[file.type];

  return (
    <Button variant="outline" size="sm" className="justify-start gap-2" asChild>
      <a href={file.path} download aria-label={`Download ${file.name}`}>
        <Icon className="h-4 w-4" />
        <span className="truncate">{file.name}</span>
        {file.size && (
          <span className="ml-auto text-xs text-muted-foreground">{file.size}</span>
        )}
      </a>
    </Button>
  );
}

interface DownloadsPanelProps {
  downloads: DownloadFile[];
}

export function DownloadsPanel({ downloads }: DownloadsPanelProps) {
  if (downloads.length === 0) return null;

  return (
    <Card className="my-8 border-brand/20 bg-brand/5">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Download className="h-4 w-4" />
          Downloads
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {downloads.map((file) => (
          <DownloadButton key={file.path} file={file} />
        ))}
      </CardContent>
    </Card>
  );
}
