import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "../../assets/image/Logo 1.png";

// ─── Shared Styles ─────────────────────────────────────────────────────────────

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --gold: #c9a84c;
    --gold-light: #e8c87a;
    --gold-dim: #8a6e35;
    --bg: #0d0d0b;
    --bg-card: #141410;
    --bg-card2: #1a1a14;
    --border: rgba(201,168,76,0.15);
    --text: #e8e0d0;
    --text-muted: #8a8070;
    --text-dim: #4a4540;
  }

  html { scroll-behavior: smooth; }

  .sans { font-family: 'Montserrat', sans-serif; }

  .fade-up {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .fade-up.visible { opacity: 1; transform: translateY(0); }
  .fade-up.d1 { transition-delay: 0.1s; }
  .fade-up.d2 { transition-delay: 0.2s; }
  .fade-up.d3 { transition-delay: 0.3s; }
  .fade-up.d4 { transition-delay: 0.4s; }

  .btn-primary {
    display: inline-block;
    background: var(--gold);
    color: #0d0d0b;
    font-family: 'Montserrat', sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.14em;
    padding: 14px 28px;
    cursor: pointer;
    border: none;
    text-transform: uppercase;
    transition: background 0.2s;
  }
  .btn-primary:hover { background: var(--gold-light); }

  .btn-outline {
    display: inline-block;
    background: transparent;
    color: var(--text);
    font-family: 'Montserrat', sans-serif;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.14em;
    padding: 14px 28px;
    cursor: pointer;
    border: 1px solid rgba(232,224,208,0.25);
    text-transform: uppercase;
    transition: border-color 0.2s, color 0.2s;
  }
  .btn-outline:hover { border-color: var(--gold); color: var(--gold); }

  .btn-ghost {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: transparent;
    color: var(--gold);
    font-family: 'Montserrat', sans-serif;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.16em;
    cursor: pointer;
    border: none;
    text-transform: uppercase;
    transition: gap 0.2s;
  }
  .btn-ghost:hover { gap: 14px; }

  .section-label {
    display: flex;
    align-items: center;
    gap: 14px;
    font-family: 'Montserrat', sans-serif;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.22em;
    color: var(--text-muted);
    text-transform: uppercase;
    margin-bottom: 28px;
  }
  .section-label::before {
    content: '';
    width: 32px;
    height: 1px;
    background: var(--gold);
    flex-shrink: 0;
  }

  .card-hover { transition: border-color 0.25s, background 0.25s; }
  .card-hover:hover { border-color: rgba(201,168,76,0.3) !important; background: #1c1c14 !important; }

  .ticker-track {
    display: flex;
    animation: ticker 24s linear infinite;
    white-space: nowrap;
  }
  @keyframes ticker {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  @media (max-width: 900px) {
    .services-hero-grid { grid-template-columns: 1fr !important; }
    .service-detail-grid { grid-template-columns: 1fr !important; }
    .process-grid { grid-template-columns: 1fr !important; }
    .compare-grid { grid-template-columns: 1fr !important; }
  }
  @media (max-width: 600px) {
    .services-hero-grid { grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) !important; }
  }  
`;

// ─── Types ─────────────────────────────────────────────────────────────────────

interface ServiceDetail {
  tag: string;
  number: string;
  name: string;
  italic: string;
  tagline: string;
  description: string;
  whatItIncludes: string[];
  whatYouGet: string[];
  timeline: string;
  idealFor: string;
  metrics: { value: string; label: string }[];
  cta: string;
  ctaSecondary?: string;
  commitment?: string;
}

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  duration: string;
}

// ─── Data ──────────────────────────────────────────────────────────────────────

const services: ServiceDetail[] = [
  {
    tag: "FLAGSHIP",
    number: "01",
    name: "Factory Cash Recovery",
    italic: "Audit™",
    tagline: "Find every dollar your plant is losing — with precision.",
    description:
      "A structured, on-site investigation that quantifies every significant source of operational waste in your facility and delivers a prioritized, dollar-valued recovery roadmap. Most clients are stunned by what we find not because the problems are new, but because no one has ever put a real dollar figure on them.",
    whatItIncludes: [
      "Full financial picture of scrap, rework, and quality cost",
      "Unplanned downtime analysis with true hourly cost",
      "Labor efficiency mapping across all production areas",
      "Reporting and decision lag assessment",
      "Management system effectiveness review",
      "Root cause analysis for top 3–5 waste drivers",
      "Prioritized findings ranked by annual dollar impact",
      "90-day execution roadmap with sequenced actions",
    ],
    whatYouGet: [
      "A written recovery report with every finding quantified in dollars",
      "A prioritized action plan your team can execute immediately",
      "Clarity on which problems to fix first  and why",
      "A baseline to measure all future improvement against",
    ],
    timeline: "4–6 weeks from kickoff to final report",
    idealFor: "Manufacturers $5M–$50M who suspect they're losing money but can't see where",
    metrics: [
      { value: "$400K+", label: "Average waste found per audit" },
      { value: "4–6 wks", label: "From kickoff to final report" },
      { value: "11×", label: "Typical ROI on the audit itself" },
    ],
    cta: "Request a Factory Audit",
    commitment: "If the audit doesn't identify recoverable value exceeding our fee, you don't pay the balance.",
  },
  {
    tag: "EXECUTION",
    number: "02",
    name: "Implementation",
    italic: "Support",
    tagline: "Drive change from the floor up  not just from the whiteboard.",
    description:
      "Most improvement initiatives fail because they stay on paper. We embed with your team and drive changes from the production floor upward — scrap reduction programs, workflow redesign, KPI systems, and management routines that stick. We don't hand you a plan and leave. We stay until the numbers move.",
    whatItIncludes: [
      "Scrap and rework reduction programs with root cause ownership",
      "Workflow redesign and 5S implementation",
      "KPI boards and daily visual management systems",
      "Daily management routines installed at every level",
      "Supervisor coaching and standard work documentation",
      "Problem-solving routines that build internal capability",
      "Weekly progress reviews with leadership team",
      "Handoff documentation so gains are permanent",
    ],
    whatYouGet: [
      "Measurable operational improvement within 60 days",
      "A team that can identify and solve problems without consultants",
      "Documented standard work for every key process",
      "A management system that sustains results long-term",
    ],
    timeline: "3–6 months depending on scope",
    idealFor: "Operations that have identified their waste but struggle to eliminate it permanently",
    metrics: [
      { value: "60 days", label: "Avg. time to first measurable result" },
      { value: "15–25%", label: "Average waste reduction per engagement" },
      { value: "Permanent", label: "Results through built-in routines" },
    ],
    cta: "Learn More",
  },
  {
    tag: "PROPRIETARY SYSTEM",
    number: "03",
    name: "FORGE™",
    italic: "Operating System",
    tagline: "Strategy that reaches the floor. Every shift.",
    description:
      "Most manufacturing strategies evaporate between the leadership meeting and the shop floor. FORGE™ is our proprietary manufacturing operating system — a complete architecture of routines, KPI cascades, and accountability structures that permanently aligns what leadership wants with what actually happens in production.",
    whatItIncludes: [
      "Custom KPI cascade from CEO to operator level",
      "Daily, weekly, and monthly management cadences installed",
      "Visual management boards for every production area",
      "Shift start and shift-end standard routines",
      "Escalation protocols for real-time problem response",
      "Leader standard work for supervisors and managers",
      "Strategy deployment to the front line",
      "Quarterly review and recalibration structure",
    ],
    whatYouGet: [
      "A complete operating system that runs with or without consultants",
      "Leadership visibility into production performance every single day",
      "A team aligned around the same metrics and priorities",
      "A platform that makes every future improvement easier to hold",
    ],
    timeline: "8–12 weeks for full installation",
    idealFor: "Manufacturers ready to build lasting operational discipline — not just fix one problem",
    metrics: [
      { value: "8–12 wks", label: "Full system installation" },
      { value: "100%", label: "Floor-to-leadership alignment" },
      { value: "Permanent", label: "Sustained improvement architecture" },
    ],
    cta: "Learn More",
  },
  {
    tag: "NEXT GENERATION",
    number: "04",
    name: "AI Process",
    italic: "Automation",
    tagline: "Real-time visibility. Zero manual entry. Built for your scale.",
    description:
      "Most mid-market manufacturers are managing their operations on 24–48 hour old data entered by hand. We deploy automated reporting, live dashboards, and AI-powered workflows built specifically for the $5M–$50M plant — practical tools that integrate with your existing ERP or spreadsheets, deployed in weeks, not months.",
    whatItIncludes: [
      "Automated daily production reports delivered every shift",
      "Live KPI dashboards accessible on any device",
      "AI-powered shift handoff summaries and exception alerts",
      "Scrap and downtime tracking with automatic categorization",
      "OEE calculation and trending without manual input",
      "Custom alerting for out-of-spec conditions",
      "Integration with existing ERP, MES, or spreadsheet systems",
      "Operator-facing tablet or screen interfaces",
    ],
    whatYouGet: [
      "Live production visibility from anywhere, any time",
      "20+ hours per week saved from manual data entry",
      "Decisions made on real-time data not yesterday's numbers",
      "A data foundation for every future improvement initiative",
    ],
    timeline: "2–4 weeks from scoping to live deployment",
    idealFor: "Plants spending hours per shift on manual reporting and still flying blind",
    metrics: [
      { value: "20hrs+", label: "Weekly hours saved on reporting" },
      { value: "2–4 wks", label: "From scoping to live deployment" },
      { value: "Real-time", label: "Production visibility, every shift" },
    ],
    cta: "Learn More",
  },
];

const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Strategy Call",
    description:
      "A free 30-minute conversation to understand your operation, your biggest pain points, and whether we're the right fit. No pitch. No obligation. Just clarity.",
    duration: "30 min",
  },
  {
    number: "02",
    title: "On-Site Assessment",
    description:
      "We spend time on your floor  watching, measuring, and asking the right questions. We never form conclusions from spreadsheets alone.",
    duration: "1–2 days",
  },
  {
    number: "03",
    title: "Proposal & Scope",
    description:
      "A clear proposal scoped to your specific situation. You'll know exactly what we'll do, how long it will take, and what it will cost — before you commit to anything.",
    duration: "Within 1 week",
  },
  {
    number: "04",
    title: "Engagement Begins",
    description:
      "We get to work. Weekly check-ins, clear milestones, and a relentless focus on moving the numbers that matter most to your business.",
    duration: "Ongoing",
  },
];

const ticker = ["Cash Recovery Audit™", "FORGE™ Operating System", "AI Process Automation", "Implementation Support", "KPI Visibility", "Scrap Reduction"];

// ─── Hook ──────────────────────────────────────────────────────────────────────

function useVisible(id: string, refs: React.MutableRefObject<Map<string, HTMLElement>>) {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const el = refs.current.get(id);
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [id, refs]);
  
  return visible;
}

// ─── Shared: Navbar ────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navItems = [
    { name: "Services", path: "/service" },
    { name: "Testimonials", path: "/testimony" },
    
  ];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
     if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
  };
  handleResize();
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);
 useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0,0);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
   <nav
              className="sans"
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: isMobile ? "0 16px" : "0 48px",
                height: "72px",
                background: scrolled ? "rgba(13,13,11,0.96)" : "transparent",
                backdropFilter: scrolled ? "blur(12px)" : "none",
                borderBottom: scrolled ? "1px solid var(--border)" : "none",
                transition: "all 0.3s ease",
              }} >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px"  , cursor :"pointer"}} onClick={()=> navigate("/")}>
           <div style={{ width: 36, height: 36, background: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#0d0d0b", letterSpacing: "0.06em" , cursor: "pointer",overflow :"hidden" }} ><img src={logoImg} alt="Everstone Systems Logo"  style={{ width: "100%", height: "100%", objectFit : "contain"}}/></div>
          <div>
           
            <div style={{ fontSize: "13px", fontWeight: "600", letterSpacing: "0.14em", color: "#fff", textTransform: "uppercase" }}>Everstone Systems</div>
            <div style={{ marginTop : "10px",fontSize: "10px", fontWeight: "500", letterSpacing: "0.2em", color: "var(--gold)", textTransform: "uppercase" }}> Smart Manufacturing </div>
          </div>
        </div>
      {/* CTA */}
        {!isMobile && (
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          
            <nav style={{ display: "flex", gap: "28px" }}>
              {navItems.map((item) => (
                <span key={item.name} style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.14em", color: item.name === "Services" ? "var(--gold)" : "var(--text-muted)", textTransform: "uppercase", cursor: "pointer", transition: "color 0.2s" }}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (item.name === "Services") navigate("/service");
                    if (item.name === "Testimonials") navigate("/testimony");
              }}
               
              onMouseEnter={(e) => { if (item.name !== "Services") (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
              onMouseLeave={(e) => { if (item.name !== "Services") (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
            >{item.name}</span>
          ))}
          </nav>
          
          <a href="https://calendly.com/everstonesystems/discovery-call" target="_blank" rel="noopener noreferrer">
          <button className="btn-primary" style={{ fontSize: "10px", padding: "11px 22px" }}>
            Book a Strategy Call
          </button>
          </a>
        </div>
        )}

        {isMobile && (
        <div  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            fontSize: "22px",
            cursor: "pointer",
            color: "#fff",
            zIndex: 1001,
            transition: "transform 0.3s ease"
          }}
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </div>
      )}
       {/* Mobile Menu Overlay */}
      {isMobile && mobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(13,13,11,0.98)",
            backdropFilter: "blur(20px)",
            zIndex: 999,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "22px",
            animation: "fadeIn 0.3s ease"
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <style>
            {`
              @keyframes fadeIn {
                from {
                  opacity: 0;
                }
                to {
                  opacity: 1;
                }
              }
              @keyframes slideUp {
                from {
                  opacity: 0;
                  transform: translateY(20px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            `}
          </style>
          
          { navItems.map((item) => (
            <span
              key={item.name}
              style={{
                fontSize: "16px",
                fontWeight: 600,
                letterSpacing: "0.14em",
                color: item.name === "Services" ? "var(--gold)" : "#fff",
                cursor: "pointer",
                transition: "all 0.2s",
                animation: `slideUp 0.3s ease ${navItems.indexOf(item) * 0.1}s both`,
                padding: "12px"
              }}
              onClick={(e) => {
                e.stopPropagation();
                setMobileMenuOpen(false);
                navigate(item.path);
              }}
              onMouseEnter={(e) => {
                if (item.name !== "Services") {
                  (e.currentTarget as HTMLElement).style.color = "var(--gold)";
                  (e.currentTarget as HTMLElement).style.transform = "scale(1.1)";
                }
              }}
              onMouseLeave={(e) => {
                if (item.name !== "Services") {
                  (e.currentTarget as HTMLElement).style.color = "#fff";
                  (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                }
              }}
            >
              {item.name}
            </span>
          ))}
          
          <a
            href="https://calendly.com/everstonesystems/discovery-call"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              animation: `slideUp 0.3s ease ${["Services", "Testimonials"].length * 0.1}s both`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="btn-primary"
              style={{
                fontSize: "14px",
                padding: "14px 28px",
                cursor: "pointer",
                border: "none",
                borderRadius: "4px",
                background: "var(--gold)",
                color: "#0d0d0b",
                fontWeight: 600,
                letterSpacing: "0.1em",
                marginTop: "16px"
              }}
            >
              Book a Strategy Call
            </button>
          </a>
        </div>
      )}
    </nav>
  );
}

// ─── Shared: Footer ────────────────────────────────────────────────────────────

function Footer() {
  const navigate = useNavigate();
  return (
    <footer style={{ borderTop: "1px solid var(--border)", background: "var(--bg-card)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "72px 48px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 48, marginBottom: 56 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              {/* <div style={{ width: 34, height: 34, background: "var(--gold)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#0d0d0b" }}>ES</div> */}
               <div style={{ width: 36, height: 36, background: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#0d0d0b", letterSpacing: "0.06em" , cursor: "pointer",overflow :"hidden" }} ><img src={logoImg} alt="Everstone Systems Logo"  style={{ width: "100%", height: "100%", objectFit : "contain"}}/></div>
              <div>
                <div className="sans" style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.14em", color: "#fff", textTransform: "uppercase" }}>Everstone Systems</div>
                <div className="sans" style={{ fontSize: 9, letterSpacing: "0.18em", color: "var(--text-muted)", textTransform: "uppercase" }}>Manufacturing Performance</div>
              </div>
            </div>
            <p className="sans" style={{ fontSize: 12, lineHeight: "1.75", color: "var(--text-muted)" }}>Helping U.S. manufacturing companies between $5M–$50M recover hidden cash, build scalable operations, and compete with discipline.</p>
          </div>
          {[
            { label: "Services", items: ["Factory Cash Recovery Audit™", "Implementation Support", "FORGE™ Operating System", "AI Automation"] },
            { label: "Who We Serve", items: ["Metal Fabrication", "Plastics & Composites", "Electronics Assembly", "Industrial Equipment", "Packaging & Converting"] },
            { label: "Get Started", items: ["Book a Strategy Call", "Request a Factory Audit", "info@everstonesystems.com"] },
          ].map((col) => (
            <div key={col.label}>
              <div className="sans" style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", color: "var(--gold)", textTransform: "uppercase", marginBottom: 20 }}>{col.label}</div>
              {col.items.map((item) => (
                <div 
                  key={item} 
                  className="sans" 
                  style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 10, cursor: "pointer" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                  onClick={()=> navigate("/service")}
                >{item}</div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 24, display: "grid",gap:"15px",gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", justifyContent: "space-between", alignItems: "center" }}>
          <div className="sans" style={{ fontSize: 11, color: "var(--text-dim)" }}>© 2026 Everstone Systems LLC. All rights reserved.</div>
          <div className="sans" style={{ fontSize: 10, letterSpacing: "0.14em", color: "var(--text-dim)", textTransform: "uppercase" }}>Everstone Systems ·Smart Manufacturing</div>
        </div>
      </div>
    </footer>
  );
}

// ─── Services Page ─────────────────────────────────────────────────────────────

export default function ServicesPage() {
  const refs = useRef<Map<string, HTMLElement>>(new Map());
  const setRef = (id: string) => (el: HTMLElement | null) => { if (el) refs.current.set(id, el); };

  const heroV = useVisible("hero", refs);
  const overviewV = useVisible("overview", refs);
  const processV = useVisible("process", refs);
  const compareV = useVisible("compare", refs);
  const ctaV = useVisible("cta", refs);

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", background: "var(--bg)", color: "var(--text)", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{globalStyles}</style>
      <Navbar />

      {/* ── HERO ── */}
      <section
        id="hero"
        ref={setRef("hero")}
        style={{ minHeight: "70vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "140px 48px 80px", maxWidth: 1400, margin: "0 auto" }}
       >
        <div className={`fade-up ${heroV ? "visible" : ""}`} style={{ marginBottom: 16 }}>
          <div className="section-label">Our Services</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "end" }} className="services-hero-grid">
          <div>
            <h1 className={`fade-up d1 ${heroV ? "visible" : ""}`}
              style={{ fontSize: "clamp(52px, 5.5vw, 88px)", fontWeight: 300, lineHeight: 1.05, color: "#fff", letterSpacing: "-0.01em" }}>
              Four services.
              <br />
              One{" "}
              <em style={{ color: "var(--gold)", fontStyle: "italic", fontWeight: 300 }}>integrated</em>
              <br />
              model.
            </h1>
          </div>
          <div className={`fade-up d2 ${heroV ? "visible" : ""}`}>
            <p className="sans" style={{ fontSize: 16, lineHeight: 1.8, color: "var(--text-muted)", marginBottom: 32 }}>
              Find the waste. Fix the operations. Install the system. Automate the visibility.{" "}
              <strong style={{ color: "var(--text)" }}>In that exact order.</strong>
            </p>
            <p className="sans" style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text-muted)", marginBottom: 36 }}>
              Each service stands on its own  but they're designed to build on each other. Most clients begin with an audit. What they discover determines what comes next.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a  href="https://calendly.com/everstonesystems/discovery-call" target="_blank" rel="noopener noreferrer">
                <button className="btn-primary">Request a Factory Audit</button>
              </a>
              <a href="https://calendly.com/everstonesystems/discovery-call" target="_blank" rel="noopener noreferrer">
              <button className="btn-outline" >
                Book a Strategy Call
              </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "13px 0", background: "var(--bg-card)", overflow: "hidden" }}>
        <div className="ticker-track">
          {[...ticker, ...ticker].map((item, i) => (
            <span key={i} className="sans" style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.18em", color: "var(--text-muted)", textTransform: "uppercase", padding: "0 32px", whiteSpace: "nowrap" }}>
              {item}<span style={{ color: "var(--gold)", marginLeft: 32 }}>•</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── SERVICE OVERVIEW STRIP ── */}
      <section id="overview" ref={setRef("overview")} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", borderBottom: "1px solid var(--border)" }}>
        {services.map((svc, i) => (
          <a
            key={i}
            href={`#service-${i}`}
            className={`fade-up d${i + 1} ${overviewV ? "visible" : ""}`}
            style={{
              padding: "36px 32px", borderRight: i < 3 ? "1px solid var(--border)" : "none",
              background: "var(--bg-card)", cursor: "pointer", textDecoration: "none",
              display: "block", transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#1c1c14")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--bg-card)")}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <span className="sans" style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.2em", color: "var(--gold)", textTransform: "uppercase", border: "1px solid var(--border)", padding: "3px 8px" }}>{svc.tag}</span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 40, fontWeight: 300, color: "var(--text-dim)", lineHeight: 1 }}>{svc.number}</span>
            </div>
            <div style={{ fontSize: 20, fontWeight: 400, color: "#fff", lineHeight: 1.2, marginBottom: 10 }}>
              {svc.name}<br />
              <em style={{ color: "var(--gold)", fontStyle: "italic", fontWeight: 300 }}>{svc.italic}</em>
            </div>
            <p className="sans" style={{ fontSize: 12, lineHeight: 1.65, color: "var(--text-muted)" }}>{svc.tagline}</p>
          </a>
        ))}
      </section>

      {/* ── INDIVIDUAL SERVICE SECTIONS ── */}
      {services.map((svc, i) => (
        <section
          key={i}
          id={`service-${i}`}
          ref={setRef(`svc-${i}`)}
          style={{
            padding: "120px 48px",
            borderBottom: "1px solid var(--border)",
            background: i % 2 === 1 ? "var(--bg-card)" : "var(--bg)",
            maxWidth: "100%",
          }}
        >
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            {/* Header */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start", marginBottom: 72 }} className="service-detail-grid">
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
                  <span className="sans" style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.2em", color: "var(--gold)", textTransform: "uppercase", border: "1px solid var(--border)", padding: "4px 10px" }}>{svc.tag}</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 44, fontWeight: 300, color: "var(--text-dim)", lineHeight: 1 }}>{svc.number}</span>
                </div>
                <h2 style={{ fontSize: "clamp(36px, 4vw, 64px)", fontWeight: 300, lineHeight: 1.1, color: "#fff", marginBottom: 20 }}>
                  {svc.name}
                  <br />
                  <em style={{ color: "var(--gold)", fontStyle: "italic", fontWeight: 300 }}>{svc.italic}</em>
                </h2>
                <p className="sans" style={{ fontSize: 15, lineHeight: 1.8, color: "var(--text-muted)", marginBottom: 36 }}>{svc.description}</p>

                {/* Metrics */}
                <div style={{ display: "grid", gridTemplateColumns: " repeat(auto-fit, minmax(200px, 1fr))", gap: 1, background: "var(--border)" }}>
                  {svc.metrics.map((m, j) => (
                    <div key={j} style={{ background: i % 2 === 1 ? "var(--bg)" : "var(--bg-card)", padding: "22px 20px" }}>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 300, color: "var(--gold)", lineHeight: 1, marginBottom: 6 }}>{m.value}</div>
                      <div className="sans" style={{ fontSize: 10, lineHeight: 1.5, color: "var(--text-muted)" }}>{m.label}</div>
                    </div>
                  ))}
                </div>

                {svc.commitment && (
                  <div style={{ marginTop: 28, padding: "20px 24px", borderLeft: "2px solid var(--gold)", background: "rgba(201,168,76,0.04)" }}>
                    <div className="sans" style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.2em", color: "var(--gold)", textTransform: "uppercase", marginBottom: 8 }}>Our Commitment</div>
                    <p className="sans" style={{ fontSize: 12, lineHeight: 1.7, color: "var(--text-muted)", fontStyle: "italic" }}>{svc.commitment}</p>
                  </div>
                )}
              </div>

              {/* Right: Details */}
              <div>
                <div style={{ marginBottom: 36 }}>
                  <div className="sans" style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.2em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ width: 24, height: 1, background: "var(--gold)", display: "inline-block" }} />
                    What It Includes
                  </div>
                  {svc.whatItIncludes.map((item, j) => (
                    <div key={j} style={{ display: "flex", gap: 14, alignItems: "flex-start", paddingBottom: 12, borderBottom: "1px solid rgba(201,168,76,0.06)", marginBottom: 12 }}>
                      <span style={{ color: "var(--gold)", marginTop: 3, flexShrink: 0, fontSize: 12 }}>—</span>
                      <span className="sans" style={{ fontSize: 13, lineHeight: 1.65, color: "var(--text-muted)" }}>{item}</span>
                    </div>
                  ))}
                </div>

                <div style={{ marginBottom: 28 }}>
                  <div className="sans" style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.2em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ width: 24, height: 1, background: "var(--gold)", display: "inline-block" }} />
                    What You Get
                  </div>
                  {svc.whatYouGet.map((item, j) => (
                    <div key={j} style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 10 }}>
                      <span style={{ color: "var(--gold-light)", flexShrink: 0, marginTop: 3, fontSize: 12 }}>✓</span>
                      <span className="sans" style={{ fontSize: 13, lineHeight: 1.65, color: "var(--text)" }}>{item}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 28 }}>
                  <div style={{ padding: "16px 18px", border: "1px solid var(--border)", background: "rgba(201,168,76,0.03)" }}>
                    <div className="sans" style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.18em", color: "var(--text-dim)", textTransform: "uppercase", marginBottom: 6 }}>Timeline</div>
                    <div style={{ fontSize: 15, fontWeight: 400, color: "var(--text)" }}>{svc.timeline}</div>
                  </div>
                  <div style={{ padding: "16px 18px", border: "1px solid var(--border)", background: "rgba(201,168,76,0.03)" }}>
                    <div className="sans" style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.18em", color: "var(--text-dim)", textTransform: "uppercase", marginBottom: 6 }}>Ideal For</div>
                    <div className="sans" style={{ fontSize: 12, lineHeight: 1.55, color: "var(--text-muted)" }}>{svc.idealFor}</div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 12 }}>
                  <button className="btn-primary">{svc.cta}</button>
                  {svc.ctaSecondary && <button className="btn-outline">{svc.ctaSecondary}</button>}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ── HOW IT WORKS ── */}
      <section id="process" ref={setRef("process")} style={{ padding: "120px 48px", background: "var(--bg)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div className={`fade-up ${processV ? "visible" : ""}`} style={{ textAlign: "center", marginBottom: 72 }}>
            <div className="section-label" style={{ justifyContent: "center" }}>How It Works</div>
            <h2 style={{ fontSize: "clamp(36px, 4vw, 60px)", fontWeight: 300, lineHeight: 1.1, color: "#fff" }}>
              Getting started is{" "}
              <em style={{ color: "var(--gold)", fontStyle: "italic" }}>simple.</em>
            </h2>
            <p className="sans" style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 16, maxWidth: 500, margin: "16px auto 0", lineHeight: 1.75 }}>
              We've made the process as friction-free as possible. Here's what to expect from first contact to first results.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 1, background: "var(--border)" }} className="process-grid">
            {processSteps.map((step, i) => (
              <div
                key={i}
                className={`fade-up d${i + 1} ${processV ? "visible" : ""}`}
                style={{ background: "var(--bg-card)", padding: "48px 36px", position: "relative" }}
              >
                {i < processSteps.length - 1 && (
                  <div style={{ position: "absolute", top: 52, right: -1, width: 1, height: 1, zIndex: 2 }} />
                )}
                <div style={{ fontSize: 56, fontWeight: 300, color: "var(--text-dim)", lineHeight: 1, marginBottom: 20, letterSpacing: "-0.02em" }}>{step.number}</div>
                <div className="sans" style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.2em", color: "var(--gold)", textTransform: "uppercase", marginBottom: 12 }}>{step.duration}</div>
                <h3 style={{ fontSize: 22, fontWeight: 400, color: "#fff", marginBottom: 14 }}>{step.title}</h3>
                <p className="sans" style={{ fontSize: 13, lineHeight: 1.75, color: "var(--text-muted)" }}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTEGRATED MODEL CALLOUT ── */}
      <section id="compare" ref={setRef("compare")} style={{ padding: "120px 48px", background: "var(--bg-card)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="compare-grid">
            <div className={`fade-up ${compareV ? "visible" : ""}`}>
              <div className="section-label">Why One Integrated Model</div>
              <h2 style={{ fontSize: "clamp(36px, 4vw, 60px)", fontWeight: 300, lineHeight: 1.1, color: "#fff", marginBottom: 28 }}>
                The order{" "}
                <em style={{ color: "var(--gold)", fontStyle: "italic" }}>matters.</em>
              </h2>
              <p className="sans" style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text-muted)", marginBottom: 20 }}>
                Most consultants sell you a system before they know what's broken. Most tech companies sell you software before they understand your process. We work in the right sequence: find the waste first, fix the operations second, install the system third, then automate.
              </p>
              <p className="sans" style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text-muted)" }}>
                Doing this in reverse is why most manufacturing improvement initiatives fail. Automating a broken process just makes you fail faster. Installing a management system in an operation you don't understand produces metrics no one trusts.
              </p>
            </div>

            <div className={`fade-up d2 ${compareV ? "visible" : ""}`}>
              {[
                { step: "01", action: "Find the Waste", detail: "Factory Cash Recovery Audit™ — see every dollar before you spend one." },
                { step: "02", action: "Fix the Operations", detail: "Implementation Support — remove what's broken before you build on it." },
                { step: "03", action: "Install the System", detail: "FORGE™ Operating System — lock in results permanently." },
                { step: "04", action: "Automate the Visibility", detail: "AI Process Automation — run at speed with real-time data." },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 24, alignItems: "flex-start", padding: "24px 0", borderBottom: "1px solid var(--border)" }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 300, color: "var(--gold)", lineHeight: 1, flexShrink: 0, width: 52 }}>{item.step}</div>
                  <div>
                    <div style={{ fontSize: 20, fontWeight: 400, color: "#fff", marginBottom: 6 }}>{item.action}</div>
                    <p className="sans" style={{ fontSize: 12, lineHeight: 1.65, color: "var(--text-muted)" }}>{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="cta" ref={setRef("cta")} style={{ padding: "140px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(80px, 14vw, 200px)", fontWeight: 700, color: "rgba(201,168,76,0.035)", letterSpacing: "0.1em", pointerEvents: "none", userSelect: "none", whiteSpace: "nowrap" }}>
          SERVICES
        </div>
        <div style={{ position: "relative" }}>
          <div className={`section-label ${ctaV ? "visible" : ""} fade-up`} style={{ justifyContent: "center" }}>No Obligation. No Fluff.</div>
          <h2 className={`fade-up d1 ${ctaV ? "visible" : ""}`} style={{ fontSize: "clamp(40px, 5vw, 80px)", fontWeight: 300, color: "#fff", lineHeight: 1.1, marginBottom: 16 }}>
            Start with a{" "}
            <em style={{ color: "var(--gold)", fontStyle: "italic" }}>conversation.</em>
          </h2>
          <p className={`sans fade-up d2 ${ctaV ? "visible" : ""}`} style={{ fontSize: 14, lineHeight: 1.75, color: "var(--text-muted)", maxWidth: 480, margin: "0 auto 48px" }}>
            A 30-minute Strategy Call tells you exactly what we'd look for in your plant — and what it's likely costing you today. No commitment required.
          </p>
          <div className={`fade-up d3 ${ctaV ? "visible" : ""}`} style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-primary" style={{ padding: "16px 36px" }}>Book a Strategy Call</button>
            <button className="btn-outline" style={{ padding: "16px 36px" }}>Request a Factory Audit</button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}