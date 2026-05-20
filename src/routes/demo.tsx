import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/site/Layout";
import { SectionHeading } from "@/components/site/SectionHeading";
import { InsightsDashboard } from "@/components/site/InsightsDashboard";
import { PIIDiffPanel } from "@/components/site/PIIDiffPanel";
import { ArrowRight, Play, RotateCcw, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/demo")({
  head: () => ({
    meta: [
      { title: "Live Demo · Privacy-First Fan Intelligence" },
      { name: "description", content: "Walk through a real fan message — raw input, PII detection, masking, and AI insight — without any raw data ever leaving the safe path." },
      { property: "og:title", content: "Live Demo · Privacy-First Fan Intelligence" },
      { property: "og:description", content: "See the privacy pipeline process a real fan message end to end." },
    ],
  }),
  component: DemoPage,
});

const SAMPLE = `Hi, I'm Lukas Weber from Berlin. My email is lukas.weber@gmail.com. I waited 45 minutes at Gate C and want a refund for booking BK-92811.`;

const STAGES = [
  { k: "input", label: "Input received", desc: "Single fan message accepted via API." },
  { k: "detect", label: "Detect PII locally", desc: "Presidio + regex flag NAME, CITY, EMAIL, BOOKING_ID." },
  { k: "mask", label: "Mask sensitive data", desc: "Replace each entity with stable, numbered placeholders." },
  { k: "verify", label: "Second safety scan", desc: "Re-scan masked payload — fail closed if anything leaks." },
  { k: "analyze", label: "LLM on masked text only", desc: "Return sentiment, topic, intent, urgency, summary." },
];

function DemoPage() {
  const [step, setStep] = useState(0);
  const running = step > 0 && step < STAGES.length;

  return (
    <Layout>
      <section className="mx-auto max-w-4xl px-6 pt-24 pb-10">
        <SectionHeading
          eyebrow="04 · live demo"
          as="h1"
          title="See the pipeline process a real fan message."
          lede="Step through each stage. Raw text is highlighted, masked, verified, and only then handed to the LLM. The dashboard at the end is built from the masked payload alone."
        />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 grid lg:grid-cols-12 gap-10">
        {/* Stages rail */}
        <aside className="lg:col-span-4">
          <div className="bg-surface border border-hairline rounded-xl p-5 sticky top-24">
            <div className="flex items-center gap-2 mb-5">
              <ShieldCheck className="h-4 w-4 text-privacy" aria-hidden />
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                pipeline · sample message
              </span>
            </div>

            <ol className="space-y-2">
              {STAGES.map((s, i) => {
                const state = i < step ? "done" : i === step ? "active" : "idle";
                return (
                  <li key={s.k}>
                    <button
                      onClick={() => setStep(i + 1)}
                      className={`w-full text-left flex gap-3 items-start p-3 rounded-md border transition ${
                        state === "active"
                          ? "border-privacy/50 bg-privacy/5"
                          : state === "done"
                          ? "border-hairline bg-surface-elevated/40"
                          : "border-hairline hover:border-foreground/20"
                      }`}
                    >
                      <span
                        className={`mt-0.5 h-5 w-5 shrink-0 rounded-full flex items-center justify-center font-mono text-[10px] ${
                          state === "active"
                            ? "bg-privacy text-privacy-foreground"
                            : state === "done"
                            ? "bg-data/20 text-data border border-data/40"
                            : "bg-surface-elevated text-muted-foreground border border-hairline"
                        }`}
                      >
                        {i + 1}
                      </span>
                      <span>
                        <span className="block font-medium text-sm">{s.label}</span>
                        <span className="block text-xs text-muted-foreground mt-0.5">{s.desc}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            <div className="mt-5 flex gap-2">
              <button
                onClick={() => setStep((s) => Math.min(STAGES.length, s + 1))}
                disabled={step >= STAGES.length}
                className="flex-1 inline-flex h-10 items-center justify-center gap-2 rounded-md bg-privacy px-4 text-sm font-semibold text-privacy-foreground disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 transition"
              >
                <Play className="h-3.5 w-3.5" /> {step === 0 ? "Run pipeline" : running ? "Next stage" : "Complete"}
              </button>
              <button
                onClick={() => setStep(0)}
                className="inline-flex h-10 items-center justify-center rounded-md border border-hairline px-3 text-sm hover:border-foreground/30 transition"
                aria-label="Reset"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </aside>

        {/* Stage content */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-surface border border-hairline rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                01 · raw fan message
              </span>
              <span className="font-mono text-[10px] text-warn">contains PII</span>
            </div>
            <p className="font-mono text-sm leading-relaxed text-foreground/90">{SAMPLE}</p>
          </div>

          {step >= 2 && <PIIDiffPanel />}

          {step >= 4 && (
            <div className="bg-surface border border-hairline rounded-xl p-6 flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-privacy/10 border border-privacy/40">
                <ShieldCheck className="h-5 w-5 text-privacy" aria-hidden />
              </span>
              <div>
                <p className="font-display font-semibold">Second safety scan: cleared</p>
                <p className="text-sm text-muted-foreground">
                  Masked payload contains 0 raw entity values. Safe to forward to LLM.
                </p>
              </div>
            </div>
          )}

          {step >= 5 && <InsightsDashboard />}

          {step === 0 && (
            <div className="bg-surface/50 border border-dashed border-hairline rounded-xl p-10 text-center text-muted-foreground">
              Click <span className="text-foreground font-medium">Run pipeline</span> to step through detection, masking, verification, and analysis.
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="flex flex-wrap gap-3">
          <Link to="/architecture" className="inline-flex h-12 items-center gap-2 rounded-md bg-privacy px-6 text-sm font-semibold text-privacy-foreground hover:brightness-110 transition">
            Review architecture <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/metrics" className="inline-flex h-12 items-center rounded-md border border-hairline bg-surface px-6 text-sm font-semibold hover:border-foreground/30 transition">
            Metrics &amp; FAQ
          </Link>
        </div>
      </section>
    </Layout>
  );
}
