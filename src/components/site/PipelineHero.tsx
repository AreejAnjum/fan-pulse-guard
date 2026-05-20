import { Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Activity } from "lucide-react";
import { PitchGrid } from "./PitchGrid";

export function PipelineHero() {
  return (
    <section className="relative overflow-hidden border-b border-hairline">
      <PitchGrid />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-privacy/60 to-transparent"
      />
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--privacy) 14%, transparent), transparent)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface/60 backdrop-blur px-3 py-1.5 mb-8">
              <span className="h-1.5 w-1.5 rounded-full bg-privacy animate-pulse" />
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                GDPR-safe · PII never reaches the LLM
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-semibold leading-[1.02] tracking-tight text-balance">
              Fan intelligence{" "}
              <span className="text-muted-foreground">without exposing</span>{" "}
              <span className="relative">
                fan identity
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-privacy via-data to-transparent" />
              </span>
              .
            </h1>

            <p className="mt-7 text-lg text-muted-foreground max-w-xl leading-relaxed text-pretty">
              Detect, mask, and analyze football fan messages with a GDPR-safe AI pipeline.
              Raw PII stays protected. Only anonymized text reaches the LLM.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                to="/demo"
                className="group inline-flex h-12 items-center gap-2 rounded-md bg-privacy px-6 text-sm font-semibold text-privacy-foreground hover:brightness-110 transition"
              >
                View Live Demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/architecture"
                className="inline-flex h-12 items-center gap-2 rounded-md border border-hairline bg-surface/60 backdrop-blur px-6 text-sm font-semibold hover:border-foreground/30 transition"
              >
                See Architecture
              </Link>
            </div>

            <dl className="mt-12 grid grid-cols-3 gap-6 max-w-lg border-t border-hairline pt-6">
              {[
                ["0%", "PII leakage target"],
                ["EN · DE", "languages supported"],
                ["1 msg", "pipeline mode"],
              ].map(([v, k]) => (
                <div key={k}>
                  <dt className="font-display text-2xl font-semibold">{v}</dt>
                  <dd className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {k}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-5">
            <CommandCenter />
          </div>
        </div>
      </div>
    </section>
  );
}

function CommandCenter() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-privacy/10 via-transparent to-data/10 blur-2xl"
      />
      <div className="relative bg-surface border border-hairline rounded-xl shadow-2xl overflow-hidden">
        {/* terminal-ish header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-hairline bg-surface-elevated/60">
          <div className="flex items-center gap-2">
            <Activity className="h-3.5 w-3.5 text-privacy" aria-hidden />
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              fan-intel · pipeline.live
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-warn/60" />
            <span className="h-2 w-2 rounded-full bg-data/60" />
            <span className="h-2 w-2 rounded-full bg-privacy" />
          </div>
        </div>

        {/* stages */}
        <div className="divide-y divide-hairline">
          <Stage label="01 · raw input" tone="warn">
            <span>Hi, I'm </span>
            <Mark tone="warn">Lukas Weber</Mark>
            <span> from </span>
            <Mark tone="warn">Berlin</Mark>
            <span>. Email </span>
            <Mark tone="warn">lukas.weber@gmail.com</Mark>
            <span>. Refund </span>
            <Mark tone="warn">BK-92811</Mark>
            <span>.</span>
          </Stage>

          <Stage label="02 · detect" tone="data">
            <div className="flex flex-wrap gap-1.5">
              {["NAME", "CITY", "EMAIL", "BOOKING_ID"].map((t) => (
                <span key={t} className="font-mono text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-data/10 text-data border border-data/30">
                  {t}
                </span>
              ))}
              <span className="font-mono text-[10px] text-muted-foreground self-center ml-1">
                4 entities · 0.97 conf
              </span>
            </div>
          </Stage>

          <Stage label="03 · masked" tone="privacy">
            <span>Hi, I'm </span>
            <Token>[NAME_1]</Token>
            <span> from </span>
            <Token>[CITY_1]</Token>
            <span>. Email </span>
            <Token>[EMAIL_1]</Token>
            <span>. Refund </span>
            <Token>[BOOKING_ID_1]</Token>
            <span>.</span>
          </Stage>

          <Stage label="04 · llm insight" tone="privacy">
            <div className="grid grid-cols-3 gap-3">
              <Kv k="sentiment" v="Negative" />
              <Kv k="topic" v="Refund" />
              <Kv k="urgency" v="Medium" />
            </div>
          </Stage>
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-t border-hairline bg-surface-elevated/60">
          <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-privacy">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
            no raw PII forwarded
          </span>
          <span className="font-mono text-[10px] text-muted-foreground">142 ms</span>
        </div>
      </div>
    </div>
  );
}

function Stage({
  label,
  tone,
  children,
}: {
  label: string;
  tone: "warn" | "data" | "privacy";
  children: React.ReactNode;
}) {
  const dot =
    tone === "warn" ? "bg-warn" : tone === "data" ? "bg-data" : "bg-privacy";
  return (
    <div className="px-4 py-4">
      <div className="flex items-center gap-2 mb-2">
        <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
      </div>
      <div className="text-sm text-foreground/95 leading-relaxed">{children}</div>
    </div>
  );
}

function Mark({ children, tone }: { children: React.ReactNode; tone: "warn" }) {
  void tone;
  return (
    <span className="bg-warn/10 text-warn border-b border-dashed border-warn/60 px-0.5 rounded-sm">
      {children}
    </span>
  );
}

function Token({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-data bg-data/10 border border-data/30 rounded px-1 py-px text-[0.92em]">
      {children}
    </span>
  );
}

function Kv({ k, v }: { k: string; v: string }) {
  return (
    <div className="bg-surface-elevated/60 border border-hairline rounded-md p-2">
      <div className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">{k}</div>
      <div className="font-display text-sm font-semibold mt-0.5">{v}</div>
    </div>
  );
}
