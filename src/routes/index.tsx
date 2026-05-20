import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Shield, CheckCircle, ArrowRight, Star, Zap, Lock, TrendingUp,
  Globe, AlertTriangle, Eye, Smartphone, Menu, X, Play, Sparkles,
  ChevronDown, ShieldCheck, FileWarning, Gauge,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

type ScanResult = {
  url: string;
  score: number;
  critical: number;
  warnings: number;
  passed: number;
  estimatedRisk: string;
  findings: { label: string; severity: "critical" | "warning" | "pass" }[];
};

function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [billing, setBilling] = useState<"monthly" | "onetime">("monthly");

  // Demo scanner
  const [url, setUrl] = useState("");
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const runScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || scanning) return;
    setScanning(true);
    setResult(null);
    await new Promise((r) => setTimeout(r, 1700));
    setResult({
      url,
      score: 68,
      critical: 3,
      warnings: 7,
      passed: 18,
      estimatedRisk: "$1.8M – $4.2M",
      findings: [
        { label: "Missing GDPR consent banner", severity: "critical" },
        { label: "No 'Do Not Sell' link (CCPA)", severity: "critical" },
        { label: "Weak Content-Security-Policy header", severity: "critical" },
        { label: "12 images missing alt text (ADA)", severity: "warning" },
        { label: "Tracking cookies set before consent", severity: "warning" },
        { label: "TLS 1.3 enabled", severity: "pass" },
        { label: "Privacy Policy present", severity: "pass" },
      ],
    });
    setScanning(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* NAV */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-soft"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2.5 font-bold text-lg">
            <span className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-elegant">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </span>
            <span>ComplianceGuard</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <button onClick={() => scrollTo("features")} className="hover:text-foreground transition">Features</button>
            <button onClick={() => scrollTo("how")} className="hover:text-foreground transition">How it works</button>
            <button onClick={() => scrollTo("pricing")} className="hover:text-foreground transition">Pricing</button>
            <button onClick={() => scrollTo("faq")} className="hover:text-foreground transition">FAQ</button>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => scrollTo("scan")} className="px-5 py-2.5 rounded-full bg-gradient-primary text-primary-foreground text-sm font-semibold shadow-elegant hover:shadow-glow transition-all">
              Start free scan
            </button>
          </div>
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-background border-t border-border px-6 py-4 flex flex-col gap-3">
            {[["features","Features"],["how","How it works"],["pricing","Pricing"],["faq","FAQ"]].map(([id,label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-left py-2 text-foreground">{label}</button>
            ))}
            <button onClick={() => scrollTo("scan")} className="mt-2 px-5 py-3 rounded-full bg-gradient-primary text-primary-foreground font-semibold">
              Start free scan
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="top" className="relative pt-32 pb-24 bg-gradient-hero">
        <div className="absolute inset-0 bg-gradient-glow pointer-events-none" />
        <div className="absolute top-20 -left-20 w-72 h-72 rounded-full bg-primary/20 blur-3xl animate-blob" />
        <div className="absolute top-40 right-0 w-80 h-80 rounded-full bg-primary-glow/30 blur-3xl animate-blob delay-400" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center animate-float-up">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-semibold border border-border shadow-soft">
              <Sparkles className="w-3.5 h-3.5" />
              Trusted by 10,000+ businesses
            </span>
            <h1 className="mt-6 text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
              Know your website's <span className="text-gradient-primary">compliance risk</span> in 3 seconds.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Scan any URL for GDPR, CCPA, ADA, and security violations. Get actionable insights and protect your business from millions in legal exposure.
            </p>
          </div>

          {/* Inline scanner */}
          <form
            id="scan"
            onSubmit={runScan}
            className="mt-10 max-w-2xl mx-auto bg-card border border-border rounded-2xl p-2 shadow-elegant flex flex-col sm:flex-row gap-2 animate-float-up delay-200"
          >
            <div className="flex-1 flex items-center gap-2 px-4">
              <Globe className="w-5 h-5 text-muted-foreground" />
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                type="url"
                required
                placeholder="https://yourwebsite.com"
                className="flex-1 py-3 bg-transparent outline-none text-base placeholder:text-muted-foreground"
              />
            </div>
            <button
              type="submit"
              disabled={scanning}
              className="px-6 py-3 rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-elegant hover:shadow-glow transition-all disabled:opacity-70 inline-flex items-center justify-center gap-2"
            >
              {scanning ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground animate-spin" />
                  Scanning…
                </>
              ) : (
                <>
                  Scan now <Zap className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
          <p className="mt-3 text-center text-xs text-muted-foreground">No credit card • Results in seconds • 20+ checks</p>

          {result && <ResultsCard result={result} />}

          {/* Trust strip */}
          <div className="mt-16 grid grid-cols-3 max-w-3xl mx-auto gap-8 text-center">
            {[
              ["3 sec", "Instant results"],
              ["20+", "Compliance checks"],
              ["$500M+", "Fines prevented"],
            ].map(([k, v]) => (
              <div key={k}>
                <div className="text-3xl md:text-4xl font-bold text-gradient-primary">{k}</div>
                <div className="mt-1 text-xs md:text-sm text-muted-foreground uppercase tracking-wider">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">Features</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold">Enterprise-grade compliance scanning</h2>
            <p className="mt-4 text-muted-foreground text-lg">
              One scan. Every major regulatory framework. Plain-English findings with remediation steps your dev team can ship today.
            </p>
          </div>

          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "GDPR Compliance", desc: "Detect missing consent banners, privacy policies and Article 6 violations. Fines up to €20M." },
              { icon: Lock, title: "Security & SSL", desc: "TLS configuration, security headers, HSTS, CSP — flag issues before attackers find them." },
              { icon: Smartphone, title: "ADA Accessibility", desc: "WCAG 2.1 AA scan. Catch contrast failures, missing alt text, and keyboard traps." },
              { icon: AlertTriangle, title: "CCPA Compliance", desc: "California consumer rights, 'Do Not Sell' link verification, and disclosure checks." },
              { icon: Eye, title: "Cookies & Tracking", desc: "Find undisclosed tracking pixels and pre-consent cookies under the ePrivacy Directive." },
              { icon: TrendingUp, title: "Legal Documentation", desc: "Verify ToS, contact info, refund policies and required disclaimers across every locale." },
            ].map((f) => (
              <div key={f.title} className="group p-7 rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-elegant transition-all">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-5 group-hover:bg-gradient-primary group-hover:[&_svg]:text-primary-foreground transition-all">
                  <f.icon className="w-6 h-6 text-primary transition-colors" />
                </div>
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-24 bg-secondary/40 border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">How it works</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold">From URL to remediation in minutes</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Globe, step: "01", title: "Paste your URL", desc: "Drop in any public website. No installation, no DNS changes, no agents." },
              { icon: Gauge, step: "02", title: "We run 20+ checks", desc: "Our crawler audits compliance, security and accessibility across the entire framework matrix." },
              { icon: FileWarning, step: "03", title: "Fix with confidence", desc: "Get a prioritized report with code snippets and legal references. Re-scan when you're done." },
            ].map((s) => (
              <div key={s.step} className="relative p-8 rounded-2xl bg-card border border-border shadow-soft">
                <div className="text-xs font-mono text-primary mb-3">{s.step}</div>
                <s.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">Loved by teams</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold">A second pair of eyes for compliance</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Sarah Chen", title: "CTO", company: "TechFlow", text: "We caught three critical GDPR violations our legal team had missed for months. Worth its weight in fines." },
              { name: "Michael Roberts", title: "Engineering Lead", company: "Digital Solutions", text: "The remediation steps are gold. Our team fixed every issue in two days. No more launch-day anxiety." },
              { name: "Emma Williams", title: "Compliance Officer", company: "Northstar Financial", text: "Finally a tool that actually understands compliance. The legal references are spot-on." },
            ].map((t) => (
              <div key={t.name} className="p-7 rounded-2xl bg-card border border-border hover:shadow-elegant transition-all flex flex-col">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-foreground/90 leading-relaxed flex-1">"{t.text}"</p>
                <div className="mt-6 flex items-center gap-3 pt-5 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.title} · {t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 bg-secondary/40 border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">Pricing</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold">Simple plans, serious protection</h2>
            <p className="mt-4 text-muted-foreground text-lg">Start free. Upgrade when you scale.</p>

            <div className="mt-8 inline-flex items-center p-1 rounded-full bg-card border border-border">
              {(["monthly","onetime"] as const).map((b) => (
                <button
                  key={b}
                  onClick={() => setBilling(b)}
                  className={`px-5 py-2 text-sm font-semibold rounded-full transition-all ${
                    billing === b ? "bg-gradient-primary text-primary-foreground shadow-elegant" : "text-muted-foreground"
                  }`}
                >
                  {b === "monthly" ? "Monthly" : "One-time"}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { plan: "Starter", monthly: 0, onetime: 0, desc: "For solo founders shipping their first site.", cta: "Start free",
                features: ["1 site", "Weekly scans", "GDPR + ADA basics", "Email report"] },
              { plan: "Professional", monthly: 49, onetime: 399, desc: "For growing teams with real legal exposure.", cta: "Start free trial", highlighted: true,
                features: ["10 sites", "Daily scans", "All 20+ frameworks", "Slack + email alerts", "Code-level remediation", "Priority support"] },
              { plan: "Enterprise", monthly: 199, onetime: 1499, desc: "For regulated industries and global brands.", cta: "Talk to sales",
                features: ["Unlimited sites", "Hourly scans", "Custom frameworks", "SSO + audit logs", "Dedicated CSM", "Legal-team handoff"] },
            ].map((p) => {
              const price = billing === "monthly" ? p.monthly : p.onetime;
              const period = billing === "monthly" ? "/mo" : " one-time";
              const h = p.highlighted;
              return (
                <div key={p.plan} className={`relative rounded-3xl p-8 transition-all ${
                  h ? "bg-gradient-primary text-primary-foreground shadow-elegant scale-[1.02]" : "bg-card border border-border hover:border-primary/40"
                }`}>
                  {h && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-warning text-foreground text-[10px] font-bold tracking-wider">
                      MOST POPULAR
                    </div>
                  )}
                  <h3 className="text-2xl font-bold">{p.plan}</h3>
                  <p className={`mt-1 text-sm ${h ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{p.desc}</p>
                  <div className="mt-6 flex items-baseline">
                    <span className="text-5xl font-black tracking-tight">${price}</span>
                    <span className={`ml-2 text-sm ${h ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{price === 0 ? "free forever" : period}</span>
                  </div>
                  <button className={`mt-6 w-full py-3 rounded-xl font-semibold inline-flex items-center justify-center gap-2 transition-all ${
                    h ? "bg-card text-primary hover:shadow-glow" : "bg-gradient-primary text-primary-foreground hover:shadow-elegant"
                  }`}>
                    {p.cta} <ArrowRight className="w-4 h-4" />
                  </button>
                  <ul className="mt-8 space-y-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${h ? "text-primary-foreground" : "text-primary"}`} />
                        <span className={h ? "text-primary-foreground/95" : "text-foreground/90"}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">FAQ</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold">Questions, answered</h2>
          </div>
          <div className="space-y-3">
            {[
              { q: "How often should I scan my website?", a: "We recommend weekly scans to catch new issues. Professional and Enterprise plans run automatically — any code change can trigger a fresh scan." },
              { q: "Is my data secure?", a: "Yes. We use 256-bit encryption end-to-end, GDPR-compliant data handling, and never store the URLs you submit beyond report retention." },
              { q: "Can I get a refund?", a: "14-day money-back guarantee, no questions asked. Cancel anytime from your dashboard." },
              { q: "Do you provide legal advice?", a: "No — our tool identifies potential issues with citations. Always work with qualified counsel for a definitive compliance assessment." },
              { q: "What if I need help fixing violations?", a: "Professional and Enterprise plans include support via email and Slack. We also offer remediation consulting for complex stacks." },
            ].map((item) => (
              <details key={item.q} className="group rounded-xl bg-card border border-border p-5 open:shadow-soft transition-all">
                <summary className="flex items-center justify-between cursor-pointer font-semibold list-none">
                  {item.q}
                  <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-muted-foreground leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-primary p-12 md:p-16 text-center shadow-elegant">
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-primary-glow/40 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-primary-foreground/10 blur-3xl" />
            <div className="relative">
              <ShieldCheck className="w-12 h-12 text-primary-foreground mx-auto mb-4" />
              <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground">Ready to protect your business?</h2>
              <p className="mt-4 text-primary-foreground/90 max-w-xl mx-auto text-lg">
                Start your free compliance scan today. No credit card. First 3 violations on us.
              </p>
              <button onClick={() => scrollTo("scan")} className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-card text-primary font-bold text-lg shadow-elegant hover:shadow-glow transition-all">
                Start your free scan <Zap className="w-5 h-5" />
              </button>
              <p className="mt-4 text-primary-foreground/80 text-sm">No credit card • 3 seconds • Instant results</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-12 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 font-bold">
            <span className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary-foreground" />
            </span>
            ComplianceGuard
          </div>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} ComplianceGuard. All rights reserved.</p>
          <div className="flex gap-5 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Security</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ResultsCard({ result }: { result: ScanResult }) {
  const scoreColor =
    result.score >= 85 ? "text-success" : result.score >= 60 ? "text-warning" : "text-destructive";
  return (
    <div className="mt-6 max-w-3xl mx-auto bg-card border border-border rounded-2xl shadow-elegant p-6 md:p-8 animate-float-up">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Scan result</div>
          <div className="font-mono text-sm mt-1 truncate max-w-md">{result.url}</div>
        </div>
        <div className="flex items-center gap-6">
          <div>
            <div className={`text-4xl font-black ${scoreColor}`}>{result.score}</div>
            <div className="text-xs text-muted-foreground">/100 score</div>
          </div>
          <div>
            <div className="text-sm font-semibold">Est. exposure</div>
            <div className="text-lg font-bold text-destructive">{result.estimatedRisk}</div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 py-6 border-b border-border text-center">
        <div><div className="text-2xl font-bold text-destructive">{result.critical}</div><div className="text-xs text-muted-foreground">Critical</div></div>
        <div><div className="text-2xl font-bold text-warning">{result.warnings}</div><div className="text-xs text-muted-foreground">Warnings</div></div>
        <div><div className="text-2xl font-bold text-success">{result.passed}</div><div className="text-xs text-muted-foreground">Passed</div></div>
      </div>
      <ul className="mt-6 space-y-2.5">
        {result.findings.map((f) => (
          <li key={f.label} className="flex items-center gap-3 text-sm">
            {f.severity === "critical" && <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0" />}
            {f.severity === "warning" && <Eye className="w-4 h-4 text-warning flex-shrink-0" />}
            {f.severity === "pass" && <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />}
            <span className="text-foreground/90">{f.label}</span>
          </li>
        ))}
      </ul>
      <button className="mt-6 w-full py-3 rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-elegant hover:shadow-glow transition-all inline-flex items-center justify-center gap-2">
        Unlock full report <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
