import { Link } from "@tanstack/react-router";
import { Shield } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline mt-32">
      <div className="mx-auto max-w-7xl px-6 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-surface-elevated border border-hairline">
              <Shield className="h-4 w-4 text-privacy" aria-hidden />
            </span>
            <span className="font-display text-sm font-semibold">Privacy-First Fan Intelligence</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
            A GDPR-safe AI pipeline that turns football fan communication into actionable
            intelligence — without exposing personal data.
          </p>
          <p className="text-xs font-mono text-muted-foreground/70">
            Raumdeuter AI Hackathon Project · v1.0
          </p>
        </div>

        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
            Pipeline
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/problem" className="text-muted-foreground hover:text-foreground">Problem</Link></li>
            <li><Link to="/solution" className="text-muted-foreground hover:text-foreground">Solution</Link></li>
            <li><Link to="/architecture" className="text-muted-foreground hover:text-foreground">Architecture</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
            Evaluate
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/demo" className="text-muted-foreground hover:text-foreground">Live Demo</Link></li>
            <li><Link to="/metrics" className="text-muted-foreground hover:text-foreground">Metrics &amp; FAQ</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-hairline">
        <div className="mx-auto max-w-7xl px-6 py-5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-muted-foreground/70">
          <span>Built with Next.js, FastAPI, Presidio, PostgreSQL.</span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-privacy animate-pulse" />
            PII shield active
          </span>
        </div>
      </div>
    </footer>
  );
}
