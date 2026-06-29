interface VideoPlayerProps {
  url?: string;
  title?: string;
}

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  );
  return match ? match[1] : null;
}

export function VideoPlayer({ url, title }: VideoPlayerProps) {
  if (!url) return null;

  const youtubeId = getYouTubeId(url);

  if (youtubeId) {
    return (
      <div className="my-8 overflow-hidden rounded-xl border border-border bg-black">
        <div className="relative aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title={title ?? "Lesson video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
            loading="lazy"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="my-8 overflow-hidden rounded-xl border border-border">
      <video
        src={url}
        controls
        className="aspect-video w-full"
        preload="metadata"
        aria-label={title ?? "Lesson video"}
      >
        <track kind="captions" />
      </video>
    </div>
  );
}
