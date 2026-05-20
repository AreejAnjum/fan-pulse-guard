import { Inbox, ScanSearch, EyeOff, ShieldCheck, Sparkles } from "lucide-react";

const STEPS = [
  { n: "01", icon: Inbox, title: "Input", desc: "Single fan message ingested via API or form." },
  { n: "02", icon: ScanSearch, title: "Detect", desc: "Presidio + regex find PII locally — names, emails, IDs." },
  { n: "03", icon: EyeOff, title: "Mask", desc: "Replace each entity with a stable placeholder token." },
  { n: "04", icon: ShieldCheck, title: "Verify", desc: "Second safety scan rejects anything still leaking." },
  { n: "05", icon: Sparkles, title: "Analyze", desc: "Only masked text reaches the LLM for insight." },
] as const;

export function PipelineDiagram() {
  return (
    <ol className="grid gap-4 md:grid-cols-5 md:gap-3 relative">
      {STEPS.map((s, i) => {
        const Icon = s.icon;
        const isLLM = i === 4;
        return (
          <li
            key={s.n}
            className="relative bg-surface border border-hairline rounded-lg p-5 group hover:border-privacy/40 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <span className={`flex h-9 w-9 items-center justify-center rounded-md border ${isLLM ? "bg-data/10 border-data/40 text-data" : "bg-privacy/10 border-privacy/40 text-privacy"}`}>
                <Icon className="h-4 w-4" aria-hidden />
              </span>
              <span className="font-mono text-[10px] tracking-wider text-muted-foreground">{s.n}</span>
            </div>
            <h3 className="font-display font-semibold text-base mb-1.5">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            {i < STEPS.length - 1 && (
              <span
                aria-hidden
                className="hidden md:block absolute top-1/2 -right-2 h-px w-4 bg-gradient-to-r from-privacy/60 to-transparent"
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
