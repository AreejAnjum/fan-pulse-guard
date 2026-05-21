import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { SectionHeading } from "@/components/site/SectionHeading";
import {
  Monitor, Server, ScanSearch, EyeOff, ShieldCheck, Sparkles, Database, LayoutDashboard, ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/architecture")({
  head: () => ({
    meta: [
      { title: "Architecture · Privacy-First Fan Intelligence" },
      { name: "description", content: "Frontend, FastAPI backend, Presidio + regex detection, masking, safety gate, LLM, and PostgreSQL — wired as a privacy-safe one-message pipeline." },
      { property: "og:title", content: "Architecture · Privacy-First Fan Intelligence" },
      { property: "og:description", content: "How the privacy-safe pipeline is wired end to end." },
    ],
  }),
  component: ArchPage,
});

const STACK = [
  { icon: Monitor, t: "Next.js frontend", d: "Single-message form, live pipeline view, results dashboard." },
  { icon: Server, t: "FastAPI backend", d: "Stateless request orchestration. Raw text never leaves the request scope." },
  { icon: ScanSearch, t: "Presidio + regex detection", d: "Entity recognition for NAME, EMAIL, PHONE, LOCATION + custom IDs." },
  { icon: EyeOff, t: "Masking layer", d: "Stable, numbered placeholders preserve referential structure." },
  { icon: ShieldCheck, t: "Second safety gate", d: "Re-scans the masked payload before any external call. Fails closed." },
  { icon: Sparkles, t: "LLM analysis (masked-only)", d: "Sentiment, topic, intent, urgency, summary, recommended action." },
  { icon: Database, t: "PostgreSQL safe storage", d: "Stores masked text, PII metadata (counts/types), analysis, audit log." },
  { icon: LayoutDashboard, t: "Operations dashboard", d: "Read-only views over safe results. No raw PII surface, ever." },
];

function ArchPage() {
  return (
    <Layout>
      <section className="mx-auto max-w-4xl px-6 pt-24 pb-12">
        <SectionHeading
          eyebrow="03 · architecture"
          as="h1"
          title={<>Built as a privacy-safe <span className="text-muted-foreground">one-message pipeline.</span></>}
          lede="Each stage has a single responsibility. Raw text lives only in the request lifecycle. PostgreSQL holds masked messages, PII metadata, analysis output, and audit trail — never raw entity values."
        />
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-12">
        <ol className="relative">
          {STACK.map(({ icon: Icon, t, d }, i) => (
            <li key={t} className="relative pl-16 pb-8 last:pb-0">
              {i < STACK.length - 1 && (
                <span aria-hidden className="absolute left-[22px] top-12 bottom-0 w-px bg-gradient-to-b from-privacy/40 via-data/30 to-transparent" />
              )}
              <span className="absolute left-0 top-0 flex h-11 w-11 items-center justify-center rounded-md bg-surface border border-hairline">
                <Icon className="h-4.5 w-4.5 text-privacy h-4 w-4" aria-hidden />
              </span>
              <div className="absolute left-12 top-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="bg-surface border border-hairline rounded-lg p-5 ml-2">
                <h2 className="font-display font-semibold text-base">{t}</h2>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="rounded-xl border border-hairline bg-surface p-8">
          <h3 className="font-mono text-[11px] uppercase tracking-wider text-privacy mb-4">data retention policy</h3>
          <p className="text-foreground/90 leading-relaxed">
            Raw messages are processed in-memory and are <strong className="text-foreground">not stored</strong> by default.
            PostgreSQL stores only masked messages, PII metadata (entity types and counts), analysis results,
            and audit information. Raw entity values — names, emails, phone numbers, IDs — are never persisted.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link to="/demo" className="inline-flex h-12 items-center gap-2 rounded-md bg-privacy px-6 text-sm font-semibold text-privacy-foreground hover:brightness-110 transition">
            Walk through a demo <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/metrics" className="inline-flex h-12 items-center rounded-md border border-hairline bg-surface px-6 text-sm font-semibold hover:border-foreground/30 transition">
            Metrics &amp; FAQ
          </Link>
        </div>
      </section>
    </Layout>
  );
}
