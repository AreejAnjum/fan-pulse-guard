import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/site/Layout";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ArrowRight, Plus, Minus } from "lucide-react";

export const Route = createFileRoute("/metrics")({
  head: () => ({
    meta: [
      { title: "Metrics & FAQ · Privacy-First Fan Intelligence" },
      { name: "description", content: "Demo metrics, supported languages, storage policy, and answers to the questions hackathon judges and innovation managers actually ask." },
      { property: "og:title", content: "Metrics & FAQ · Privacy-First Fan Intelligence" },
      { property: "og:description", content: "What this pipeline ships, what it doesn't, and how it scales." },
    ],
  }),
  component: MetricsPage,
});

const METRICS = [
  { v: "0%", k: "PII leakage target", d: "No raw entity values forwarded to the LLM." },
  { v: "EN · DE · Mixed", k: "Supported languages", d: "English, German, and code-switched messages." },
  { v: "1 message", k: "Pipeline mode", d: "MVP processes one message at a time end-to-end." },
  { v: "Masked only", k: "Storage policy", d: "PostgreSQL stores masked text + analysis. No raw values." },
  { v: "5 fields", k: "Structured output", d: "Sentiment, topic, intent, urgency, recommended action." },
  { v: "2 gates", k: "Safety scans", d: "Pre-LLM masked-payload scan + post-LLM output scan." },
];

const FAQ = [
  {
    q: "Why not send raw messages directly to the LLM?",
    a: "Raw fan messages contain names, emails, phones, addresses, and IDs. Forwarding them to a third-party model creates GDPR exposure, breaks data-processing agreements, and erodes fan trust. Local detection + masking keeps the model's analytical value while removing the legal and reputational risk.",
  },
  {
    q: "What PII types are detected?",
    a: "Names, email addresses, phone numbers, locations and cities, plus custom regex patterns for booking IDs, member IDs, order IDs, and social handles. The detection layer is extensible — clubs can add domain-specific entities without re-architecting the pipeline.",
  },
  {
    q: "Does the system support German?",
    a: "Yes. Detection runs on multilingual models with German-aware tokenization and German ID/address patterns. English, German, and code-switched messages are first-class.",
  },
  {
    q: "What is stored in the database?",
    a: "Only masked messages, PII metadata (entity types and counts — never the raw values), analysis results, and audit log entries. Raw PII is never persisted by default.",
  },
  {
    q: "Can this scale to batch processing later?",
    a: "Yes. The MVP is intentionally one-message-at-a-time for demo clarity and correctness. The same single-message pipeline composes into batch and streaming modes without changing the privacy guarantees.",
  },
  {
    q: "Is this production-ready?",
    a: "This is a hackathon MVP focused on showing the privacy pipeline working end-to-end. Production hardening — SSO, role-based access, retention policies, regional deployment, and contract-grade SLAs — is the natural next step.",
  },
];

function MetricsPage() {
  return (
    <Layout>
      <section className="mx-auto max-w-4xl px-6 pt-24 pb-12">
        <SectionHeading
          eyebrow="05 · metrics & faq"
          as="h1"
          title={<>What ships in the MVP — <span className="text-muted-foreground">and what doesn't.</span></>}
          lede="Honest numbers, an honest scope, and the questions clubs and judges actually ask."
        />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-hairline border border-hairline rounded-xl overflow-hidden">
          {METRICS.map((m) => (
            <div key={m.k} className="bg-surface p-7">
              <div className="font-mono text-[10px] uppercase tracking-wider text-privacy mb-3">{m.k}</div>
              <div className="font-display text-3xl font-semibold leading-tight">{m.v}</div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{m.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-24">
        <h2 className="font-display text-2xl font-semibold mb-8">Frequently asked</h2>
        <div className="border-t border-hairline">
          {FAQ.map((item, i) => <FaqItem key={i} {...item} />)}
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link to="/demo" className="inline-flex h-12 items-center gap-2 rounded-md bg-privacy px-6 text-sm font-semibold text-privacy-foreground hover:brightness-110 transition">
            Try the demo <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/architecture" className="inline-flex h-12 items-center rounded-md border border-hairline bg-surface px-6 text-sm font-semibold hover:border-foreground/30 transition">
            Architecture
          </Link>
        </div>
      </section>
    </Layout>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-hairline">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-6 py-5 text-left group"
        aria-expanded={open}
      >
        <span className="font-display text-base sm:text-lg font-medium group-hover:text-privacy transition-colors">
          {q}
        </span>
        <span className="shrink-0 flex h-8 w-8 items-center justify-center rounded-md border border-hairline">
          {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </span>
      </button>
      {open && (
        <p className="pb-6 pr-12 text-muted-foreground leading-relaxed text-pretty">{a}</p>
      )}
    </div>
  );
}
