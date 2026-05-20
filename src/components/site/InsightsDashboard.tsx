import { TrendingDown, Tag, Target, Gauge, FileText, Wand2 } from "lucide-react";

export function InsightsDashboard() {
  return (
    <div className="bg-surface border border-hairline rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-hairline bg-surface-elevated/50">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-privacy animate-pulse" />
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            insight · message #2841 · masked input only
          </span>
        </div>
        <span className="font-mono text-[10px] text-muted-foreground/70">142 ms</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-hairline">
        <Tile icon={TrendingDown} label="Sentiment" value="Negative" hue="warn" sub="−0.62" />
        <Tile icon={Tag} label="Topic" value="Refund" sub="ticket-ops" />
        <Tile icon={Target} label="Intent" value="Request refund" sub="actionable" />
        <Tile icon={Gauge} label="Urgency" value="Medium" hue="warn" sub="SLA: 24h" />
        <Tile icon={FileText} label="Language" value="EN" sub="confidence 0.98" />
        <Tile icon={Wand2} label="Action" value="Route → Ticketing" hue="privacy" sub="auto-suggest" />
      </div>

      <div className="px-5 py-4 border-t border-hairline">
        <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">Summary</p>
        <p className="text-sm text-foreground/90 leading-relaxed">
          Fan reports a 45-minute wait at Gate C and requests a refund for one booking.
          Recommend: acknowledge delay, offer compensation per matchday-ops policy, escalate if repeated.
        </p>
      </div>
    </div>
  );
}

function Tile({
  icon: Icon,
  label,
  value,
  sub,
  hue = "data",
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  sub?: string;
  hue?: "data" | "privacy" | "warn";
}) {
  const color =
    hue === "privacy" ? "text-privacy" : hue === "warn" ? "text-warn" : "text-data";
  return (
    <div className="bg-surface p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
        <Icon className={`h-3.5 w-3.5 ${color}`} aria-hidden />
      </div>
      <div className="font-display text-lg font-semibold">{value}</div>
      {sub && <div className="mt-1 font-mono text-[11px] text-muted-foreground/80">{sub}</div>}
    </div>
  );
}
