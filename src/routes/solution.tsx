import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { SectionHeading } from "@/components/site/SectionHeading";
import { PipelineDiagram } from "@/components/site/PipelineDiagram";
import { PIIDiffPanel } from "@/components/site/PIIDiffPanel";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/solution")({
  head: () => ({
    meta: [
      { title: "The Solution · Privacy-First Fan Intelligence" },
      { name: "description", content: "A 5-step pipeline that detects PII locally, masks it, verifies the result, and only then sends anonymized text to the LLM." },
      { property: "og:title", content: "The Solution · Privacy-First Fan Intelligence" },
      { property: "og:description", content: "Privacy first. Intelligence second. Always in that order." },
    ],
  }),
  component: SolutionPage,
});

function SolutionPage() {
  return (
    <Layout>
      <section className="mx-auto max-w-4xl px-6 pt-24 pb-12">
        <SectionHeading
          eyebrow="02 · the solution"
          as="h1"
          title={<>Privacy first. Intelligence second. <span className="text-muted-foreground">Always in that order.</span></>}
          lede="Five deterministic stages. PII detection runs locally before any text reaches the LLM, and a second safety gate verifies the masked payload before the model ever sees it."
        />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <PipelineDiagram />
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 border-t border-hairline">
        <SectionHeading
          eyebrow="Before / after"
          title="Anonymization preserves meaning, not identity."
          lede="Placeholders like [NAME_1] and [BOOKING_ID_1] keep referential structure intact, so downstream analysis stays accurate without ever seeing a real value."
        />
        <div className="mt-12">
          <PIIDiffPanel />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="font-display text-2xl font-semibold mb-6">What runs locally vs. what reaches the LLM</h2>
        <div className="grid md:grid-cols-2 gap-px bg-hairline border border-hairline rounded-xl overflow-hidden">
          <div className="bg-surface p-7">
            <span className="font-mono text-[10px] uppercase tracking-wider text-privacy">runs locally</span>
            <ul className="mt-4 space-y-3 text-sm text-foreground/90">
              <li>• Presidio entity recognition (NAME, EMAIL, PHONE_NUMBER, LOCATION)</li>
              <li>• Regex patterns for booking, member, and order IDs</li>
              <li>• Stable placeholder mapping ([NAME_1], [NAME_2], …)</li>
              <li>• Second safety scan over the masked payload</li>
              <li>• Final PII scan over the LLM response</li>
            </ul>
          </div>
          <div className="bg-surface p-7">
            <span className="font-mono text-[10px] uppercase tracking-wider text-data">reaches the LLM</span>
            <ul className="mt-4 space-y-3 text-sm text-foreground/90">
              <li>• Masked text only — no raw values, ever</li>
              <li>• Task prompt for sentiment, topic, intent, urgency</li>
              <li>• Summary and recommended-action generation</li>
              <li>• Output then re-scanned before storage and display</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link to="/architecture" className="inline-flex h-12 items-center gap-2 rounded-md bg-privacy px-6 text-sm font-semibold text-privacy-foreground hover:brightness-110 transition">
            See the architecture <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/demo" className="inline-flex h-12 items-center rounded-md border border-hairline bg-surface px-6 text-sm font-semibold hover:border-foreground/30 transition">
            Walk through a demo
          </Link>
        </div>
      </section>
    </Layout>
  );
}
