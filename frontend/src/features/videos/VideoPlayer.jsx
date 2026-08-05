export const VideoPlayer = ({ src, poster, title }) => {
  if (!src) {
    return (
      <div className="w-full aspect-video bg-surface-container-lowest rounded-xl border border-outline-variant flex items-center justify-center text-on-surface-variant">
        Video unavailable
      </div>
    )
  }

  return (
    <div className="w-full aspect-video bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant">
      <video
        className="w-full h-full object-contain bg-black"
        src={src}
        poster={poster}
        controls
        playsInline
        title={title}
      />
    </div>
  )
}
