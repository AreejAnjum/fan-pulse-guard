import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  EyeOff,
  Languages,
  Database,
  Ticket,
  Calendar,
  Accessibility,
  Users,
  ShoppingBag,
  Activity,
  ArrowRight,
  ShieldCheck,
  Lock,
  FileSearch,
  ServerCog,
} from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { PipelineHero } from "@/components/site/PipelineHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { PipelineDiagram } from "@/components/site/PipelineDiagram";
import { PIIDiffPanel } from "@/components/site/PIIDiffPanel";
import { InsightsDashboard } from "@/components/site/InsightsDashboard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Privacy-First Fan Intelligence Pipeline" },
      {
        name: "description",
        content:
          "GDPR-safe AI pipeline for football clubs. Detect, mask, and analyze fan messages without exposing personal data.",
      },
      { property: "og:title", content: "Privacy-First Fan Intelligence Pipeline" },
      {
        property: "og:description",
        content:
          "Turn fan communication into actionable intelligence without exposing personal data.",
      },
    ],
  }),
  component: HomePage,
});

const PROBLEMS = [
  { icon: AlertTriangle, title: "PII risk", desc: "Raw messages contain names, emails, phones, IDs. Sending them to an LLM leaks personal data." },
  { icon: Activity, title: "Manual review doesn't scale", desc: "Clubs receive thousands of messages weekly across email, app, social, and forms." },
  { icon: Languages, title: "Multilingual complexity", desc: "English, German, and code-switched messages confuse off-the-shelf detectors." },
  { icon: FileSearch, title: "Insight buried in text", desc: "Without structure, sentiment, urgency, and recommended actions stay invisible." },
];

const TRUST = [
  { icon: ShieldCheck, t: "Raw PII never reaches the LLM" },
  { icon: Lock, t: "Raw messages not stored by default" },
  { icon: EyeOff, t: "PII entity values are not stored" },
  { icon: ServerCog, t: "Second safety scan before LLM call" },
  { icon: FileSearch, t: "Final PII scan on AI output" },
  { icon: Database, t: "PostgreSQL holds only safe results" },
];

const USE_CASES = [
  { icon: Ticket, t: "Ticket refund complaints" },
  { icon: Calendar, t: "Matchday operations feedback" },
  { icon: Accessibility, t: "Accessibility issues" },
  { icon: Users, t: "Membership support" },
  { icon: ShoppingBag, t: "Merchandise & order problems" },
  { icon: Activity, t: "Fan sentiment tracking" },
];

function HomePage() {
  return (
    <Layout>
      <PipelineHero />

      {/* Problem teaser */}
      <Section id="problem">
        <SectionHeading
          eyebrow="The problem"
          title={<>Fan messages are full of insight — <span className="text-muted-foreground">and sensitive data.</span></>}
          lede="Football clubs receive an enormous volume of fan communication. Useful signal is mixed with personally identifiable information that must never leak into a third-party model."
        />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROBLEMS.map((p) => (
            <div key={p.title} className="bg-surface border border-hairline rounded-lg p-6 hover:border-warn/40 transition-colors">
              <p.icon className="h-5 w-5 text-warn mb-4" aria-hidden />
              <h3 className="font-display font-semibold text-base mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Solution / pipeline */}
      <Section id="solution">
        <SectionHeading
          eyebrow="The pipeline"
          title={<>Privacy first. Intelligence second. <span className="text-muted-foreground">Always in that order.</span></>}
          lede="Five deterministic stages. PII detection runs locally before any text reaches the LLM, and a second safety gate verifies the masked payload."
        />
        <div className="mt-14">
          <PipelineDiagram />
        </div>
      </Section>

      {/* Before / After */}
      <Section>
        <SectionHeading
          eyebrow="Before / after"
          title="Anonymization preserves meaning, not identity."
          lede="The masked payload retains enough context for accurate sentiment, topic, intent, and urgency detection — without exposing a single private value."
        />
        <div className="mt-12">
          <PIIDiffPanel />
        </div>
      </Section>

      {/* Insights dashboard */}
      <Section>
        <SectionHeading
          eyebrow="What you get back"
          title="Structured insight from anonymized text."
          lede="The LLM analyzes only the masked message and returns a compact, structured payload your team can route, prioritize, and act on."
        />
        <div className="mt-12 max-w-4xl">
          <InsightsDashboard />
        </div>
      </Section>

      {/* Trust */}
      <Section>
        <SectionHeading
          eyebrow="Trust & security"
          title="Designed to reduce sensitive-data exposure at every step."
        />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-hairline border border-hairline rounded-xl overflow-hidden">
          {TRUST.map(({ icon: Icon, t }) => (
            <div key={t} className="bg-surface p-6 flex items-start gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-privacy/10 border border-privacy/30">
                <Icon className="h-4 w-4 text-privacy" aria-hidden />
              </span>
              <p className="text-sm text-foreground/90 leading-relaxed pt-1.5">{t}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Use cases */}
      <Section>
        <SectionHeading
          eyebrow="Where it fits"
          title="Built around how clubs actually work."
          lede="Six concrete fan communication surfaces a club already operates — now with structured insight and zero PII exposure."
        />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {USE_CASES.map(({ icon: Icon, t }) => (
            <div key={t} className="bg-surface border border-hairline rounded-lg p-5 flex items-center gap-4 hover:border-data/40 transition-colors">
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-data/10 border border-data/30">
                <Icon className="h-4.5 w-4.5 text-data h-4 w-4" aria-hidden />
              </span>
              <span className="font-medium text-sm">{t}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="relative overflow-hidden rounded-2xl border border-hairline bg-surface p-10 sm:p-14">
          <div
            aria-hidden
            className="absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(circle at 20% 0%, color-mix(in oklab, var(--privacy) 18%, transparent), transparent 50%), radial-gradient(circle at 80% 100%, color-mix(in oklab, var(--data) 14%, transparent), transparent 50%)",
            }}
          />
          <div className="relative max-w-2xl">
            <h2 className="font-display text-3xl sm:text-4xl font-semibold leading-tight">
              See the privacy pipeline in action.
            </h2>
            <p className="mt-4 text-muted-foreground text-pretty">
              Walk through a real fan message — from raw input to anonymized insight — in under a minute.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/demo"
                className="inline-flex h-12 items-center gap-2 rounded-md bg-privacy px-6 text-sm font-semibold text-privacy-foreground hover:brightness-110 transition"
              >
                Try the Demo <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/architecture"
                className="inline-flex h-12 items-center rounded-md border border-hairline bg-background/40 px-6 text-sm font-semibold hover:border-foreground/30 transition"
              >
                Review Technical Architecture
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
}

function Section({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <section id={id} className="mx-auto max-w-7xl px-6 py-24 sm:py-28">
      {children}
    </section>
  );
}
