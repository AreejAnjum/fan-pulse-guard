import { Shield, ShieldCheck } from "lucide-react";

type Token = { text: string; tag?: string };

const RAW: Token[] = [
  { text: "Hi, I'm " },
  { text: "Lukas Weber", tag: "NAME" },
  { text: " from " },
  { text: "Berlin", tag: "CITY" },
  { text: ". My email is " },
  { text: "lukas.weber@gmail.com", tag: "EMAIL" },
  { text: ". I waited 45 minutes at Gate C and want a refund for booking " },
  { text: "BK-92811", tag: "BOOKING_ID" },
  { text: "." },
];

const MASKED: Token[] = [
  { text: "Hi, I'm " },
  { text: "[NAME_1]", tag: "NAME" },
  { text: " from " },
  { text: "[CITY_1]", tag: "CITY" },
  { text: ". My email is " },
  { text: "[EMAIL_1]", tag: "EMAIL" },
  { text: ". I waited 45 minutes at Gate C and want a refund for booking " },
  { text: "[BOOKING_ID_1]", tag: "BOOKING_ID" },
  { text: "." },
];

function RawSpan({ t }: { t: Token }) {
  if (!t.tag) return <span>{t.text}</span>;
  return (
    <span className="relative inline-flex items-baseline">
      <span className="bg-warn/10 text-warn px-1 rounded-sm border-b border-dashed border-warn/60 font-medium">
        {t.text}
      </span>
      <span className="ml-1 align-super text-[9px] font-mono tracking-wider text-warn/80">
        {t.tag}
      </span>
    </span>
  );
}

function MaskedSpan({ t }: { t: Token }) {
  if (!t.tag) return <span>{t.text}</span>;
  return (
    <span className="font-mono text-data bg-data/10 border border-data/30 rounded-sm px-1.5 py-0.5 text-[0.92em]">
      {t.text}
    </span>
  );
}

export function PIIDiffPanel() {
  return (
    <div className="grid md:grid-cols-2 gap-px bg-hairline rounded-xl overflow-hidden border border-hairline">
      <div className="bg-surface p-6 sm:p-8">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-warn" aria-hidden />
            <span className="font-mono text-xs uppercase tracking-wider text-warn">
              Raw input · contains PII
            </span>
          </div>
          <span className="font-mono text-[10px] text-muted-foreground">01 / RECEIVED</span>
        </div>
        <p className="text-base leading-relaxed text-foreground/95">
          {RAW.map((t, i) => <RawSpan key={i} t={t} />)}
        </p>
        <div className="mt-6 pt-5 border-t border-hairline flex flex-wrap gap-2">
          {["NAME", "CITY", "EMAIL", "BOOKING_ID"].map((tag) => (
            <span key={tag} className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-warn/10 text-warn border border-warn/30">
              {tag} detected
            </span>
          ))}
        </div>
      </div>

      <div className="bg-surface p-6 sm:p-8 relative">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-privacy" aria-hidden />
            <span className="font-mono text-xs uppercase tracking-wider text-privacy">
              Anonymized · safe for LLM
            </span>
          </div>
          <span className="font-mono text-[10px] text-muted-foreground">02 / MASKED</span>
        </div>
        <p className="text-base leading-relaxed text-foreground/95">
          {MASKED.map((t, i) => <MaskedSpan key={i} t={t} />)}
        </p>
        <div className="mt-6 pt-5 border-t border-hairline flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            4 entities masked · 0 raw values forwarded
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-privacy">
            <span className="h-1.5 w-1.5 rounded-full bg-privacy animate-pulse" />
            cleared
          </span>
        </div>
      </div>
    </div>
  );
}
