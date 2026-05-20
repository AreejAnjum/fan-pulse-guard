import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { SectionHeading } from "@/components/site/SectionHeading";
import { AlertTriangle, Languages, Activity, FileSearch, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/problem")({
  head: () => ({
    meta: [
      { title: "The Problem · Privacy-First Fan Intelligence" },
      { name: "description", content: "Why raw fan messages can't be sent to an LLM: PII risk, scale, multilingual complexity, and lost insight." },
      { property: "og:title", content: "The Problem · Privacy-First Fan Intelligence" },
      { property: "og:description", content: "Raw fan messages are full of PII. Here's why that matters for football clubs." },
    ],
  }),
  component: ProblemPage,
});

const POINTS = [
  { icon: AlertTriangle, title: "PII risk on every channel", desc: "Support tickets, emails, app reviews, forms, forums and DMs all contain names, emails, phone numbers, addresses, member and booking IDs. Forwarding raw text to an LLM creates GDPR exposure the moment a request leaves your perimeter." },
  { icon: Activity, title: "Manual review does not scale", desc: "Even mid-sized clubs see thousands of fan touchpoints per matchday. Triage and tagging by hand misses urgent signals — accessibility issues, refund disputes, safety concerns — until they escalate publicly." },
  { icon: Languages, title: "Multilingual is the default", desc: "English, German, and code-switched messages are routine. Off-the-shelf PII detectors trained on English alone miss German names, addresses, and ID formats. Detection has to handle the mix natively." },
  { icon: FileSearch, title: "Insight is buried in unstructured text", desc: "Clubs already have the data — they don't have it structured. Sentiment, topic, intent, urgency, and recommended action need to be extracted reliably before fan feedback can drive operations." },
];

function ProblemPage() {
  return (
    <Layout>
      <section className="mx-auto max-w-4xl px-6 pt-24 pb-12">
        <SectionHeading
          eyebrow="01 · the problem"
          as="h1"
          title={<>Fan messages are full of insight — <span className="text-muted-foreground">and sensitive data.</span></>}
          lede="Clubs need scalable fan understanding. Sending raw messages to a third-party LLM is the fastest way to get there — and the fastest way to leak personal data."
        />
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="grid gap-px bg-hairline border border-hairline rounded-xl overflow-hidden">
          {POINTS.map(({ icon: Icon, title, desc }, i) => (
            <article key={title} className="bg-surface p-8 sm:p-10 flex gap-6">
              <div className="shrink-0">
                <span className="flex h-11 w-11 items-center justify-center rounded-md bg-warn/10 border border-warn/30">
                  <Icon className="h-5 w-5 text-warn" aria-hidden />
                </span>
                <span className="mt-3 block font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div>
                <h2 className="font-display text-xl font-semibold mb-2">{title}</h2>
                <p className="text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap gap-3">
          <Link to="/solution" className="inline-flex h-12 items-center gap-2 rounded-md bg-privacy px-6 text-sm font-semibold text-privacy-foreground hover:brightness-110 transition">
            See the solution <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/architecture" className="inline-flex h-12 items-center rounded-md border border-hairline bg-surface px-6 text-sm font-semibold hover:border-foreground/30 transition">
            Architecture
          </Link>
        </div>
      </section>
    </Layout>
  );
}
