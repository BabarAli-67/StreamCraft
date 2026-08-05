export const Avatar = ({
  src,
  alt = 'User',
  size = 'md',
  className = '',
}) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40',
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`${sizes[size]} rounded-full object-cover border border-outline-variant shrink-0 ${className}`}
      onError={(e) => {
        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(alt)}&background=2a2a2b&color=d0bcff`
      }}
    />
  )
}
