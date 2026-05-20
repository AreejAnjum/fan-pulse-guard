export function PitchGrid({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={`absolute inset-0 h-full w-full opacity-[0.07] ${className}`}
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="pg" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="1200" height="600" fill="url(#pg)" className="text-foreground" />
      {/* center line */}
      <line x1="600" y1="0" x2="600" y2="600" stroke="currentColor" strokeWidth="0.8" className="text-foreground" />
      {/* center circle */}
      <circle cx="600" cy="300" r="80" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-foreground" />
      <circle cx="600" cy="300" r="2" fill="currentColor" className="text-foreground" />
      {/* penalty arcs */}
      <rect x="0" y="180" width="120" height="240" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-foreground" />
      <rect x="1080" y="180" width="120" height="240" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-foreground" />
    </svg>
  );
}
