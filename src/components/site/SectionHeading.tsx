import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  as: As = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
}) {
  const a = align === "center" ? "text-center mx-auto" : "";
  return (
    <div className={`max-w-3xl ${a}`}>
      {eyebrow && (
        <div className="mb-4 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-privacy">
          <span className="h-1 w-1 rounded-full bg-privacy" />
          {eyebrow}
        </div>
      )}
      <As className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold leading-[1.05] text-balance">
        {title}
      </As>
      {lede && (
        <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed text-pretty">
          {lede}
        </p>
      )}
    </div>
  );
}
