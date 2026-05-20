import { Link } from "@tanstack/react-router";
import { Shield, Menu, X } from "lucide-react";
import { useState } from "react";

const NAV = [
  { to: "/problem", label: "Problem" },
  { to: "/solution", label: "Solution" },
  { to: "/architecture", label: "Architecture" },
  { to: "/demo", label: "Demo" },
  { to: "/metrics", label: "Metrics" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="relative flex h-8 w-8 items-center justify-center rounded-md bg-surface-elevated border border-hairline">
            <Shield className="h-4 w-4 text-privacy" aria-hidden />
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-privacy animate-pulse" />
          </span>
          <span className="font-display text-sm font-semibold tracking-tight">
            Privacy-First <span className="text-muted-foreground font-normal">Fan Intelligence</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/demo"
            className="inline-flex h-9 items-center rounded-md bg-privacy px-4 text-sm font-medium text-privacy-foreground hover:brightness-110 transition"
          >
            View Demo
          </Link>
        </div>

        <button
          className="md:hidden p-2 -mr-2 text-foreground"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-hairline bg-background">
          <nav className="flex flex-col px-6 py-4 gap-3" aria-label="Mobile">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="text-sm text-muted-foreground hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/demo"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex h-10 items-center justify-center rounded-md bg-privacy px-4 text-sm font-medium text-privacy-foreground"
            >
              View Demo
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
