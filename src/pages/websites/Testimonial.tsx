import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "../../assets/image/Logo 1.png";
import video from "../../assets/image/AI Manufacture.mp4"


// ─── Shared Styles (identical to services.tsx) ─────────────────────────────────

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

  /* Video play button pulse */
  @keyframes pulse-ring {
    0% { transform: scale(1); opacity: 0.6; }
    100% { transform: scale(1.5); opacity: 0; }
  }

  .play-btn-ring {
    position: absolute;
    inset: -12px;
    border-radius: 50%;
    border: 1px solid rgba(201,168,76,0.5);
    animation: pulse-ring 2s ease-out infinite;
  }

  .ticker-track {
    display: flex;
    animation: ticker 22s linear infinite;
    white-space: nowrap;
  }
  .video-bottom-bar {
  display: flex;
  flex-direction: column;
  gap: 8px;
} 
.nav-item:hover {
  color: var(--gold);
}
  @keyframes ticker {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  @media (max-width: 900px) {
    .story-grid { grid-template-columns: 1fr !important; }
    .quote-grid { grid-template-columns: 1fr !important; }
    .stats-row { grid-template-columns: 1fr 1fr !important; }
    .video-hero-grid { flex-direction: column !important; }
  }
  @media (min-width: 600px) {
  .video-bottom-bar {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
  }
  .stats-row {display:grid; grid-template-columns: repeat(auto-fit, minmax(200px,1fr)) !important; gap:0 }  
}  
`;

// ─── Types ─────────────────────────────────────────────────────────────────────

interface CaseStudy {
  id: number;
  tag: string;
  industry: string;
  revenue: string;
  headline: string;
  subheadline: string;
  situation: string;
  approach: string;
  outcome: string;
  quote: string;
  quoteName: string;
  quoteRole: string;
  metrics: { value: string; label: string }[];
  service: string;
  duration: string;
  quoteCompany: string;
}

interface PullQuote {
  quote: string;
  name: string;
  role: string;
  company: string;
}

// ─── Data ──────────────────────────────────────────────────────────────────────

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    tag: "METAL FABRICATION",
    industry: "Metal Fabrication",
    revenue: "$14M Annual Revenue",
    headline: "Waste Recovery in a Growing Fab Shop",
    subheadline: "$380K in annual recoverable waste found in four weeks.",
    situation:
      "A 14-year-old weld fabrication shop outside Columbus, Ohio had grown steadily to $14M in annual revenue but margins had been thinning for three years running. The owner assumed the culprit was material cost increases. Reporting was manual — supervisors filled out shift logs by hand, 18–24 hours after each shift ended. Scrap was tracked as a percentage of material cost and simply written off.",
    approach:
      "We began with a Factory Cash Recovery Audit™, spending five days on the floor mapping every weld station, tracking scrap generation in real time, and timing labor movements across the facility. We calculated the true loaded cost of each scrap event: materials, labor, machine time, re-inspection, and rescheduling. We also mapped unplanned downtime by machine and shift, revealing that two specific welding cells were responsible for 61% of all untracked stoppages.",
    outcome:
      "The audit uncovered $380K in annual recoverable waste — nearly 2.7% of revenue. The client engaged us for Implementation Support immediately following the report. Within 90 days, weld scrap was down 22% through targeted fixture improvements and operator standard work. Downtime at the two problem cells dropped 40% following root cause repairs. A FORGE™ KPI board was installed at the cell level, giving supervisors real-time visibility for the first time in the shop's history.",
    quote:
      "I thought we were losing money on material prices. Turns out we were losing it on the floor every shift and just calling it normal. The audit was the most valuable two weeks we've ever spent.",
    quoteName: "Dave M.",
    quoteRole: "Owner & General Manager",
    quoteCompany: "Metal Fabrication · Columbus, OH",
    metrics: [
      { value: "$380K", label: "Annual waste found" },
      { value: "22%", label: "Scrap reduction" },
      { value: "40%", label: "Downtime reduction" },
      { value: "11×", label: "ROI on the audit" },
    ],
    service: "Factory Cash Recovery Audit™ + Implementation Support",
    duration: "Audit: 4 weeks · Implementation: 90 days",
  },
  {
    id: 2,
    tag: "PLASTICS MANUFACTURING",
    industry: "Plastics & Composites",
    revenue: "$22M Annual Revenue",
    headline: "KPI Visibility & FORGE™ Deployment",
    subheadline: "OEE improved from 61% to 79% in six months.",
    situation:
      "A $22M injection molding plant in the southeast had no reliable production data. The plant manager made decisions based on shift supervisor intuition and end-of-week summary spreadsheets compiled by the office manager on Friday mornings. OEE was estimated at roughly 60%, but no one had ever calculated it precisely. Leadership couldn't tell which machines were underperforming, which shifts were problematic, or what was driving quality variation.",
    approach:
      "We started with a two-day rapid assessment, enough to confirm the core problem: this was a visibility and management system failure, not a people problem. We proposed and deployed FORGE™ alongside a lightweight AI data collection layer. Within three weeks, every press had cycle-time monitoring and automatic downtime categorization. The plant manager had a live OEE dashboard on his phone for the first time. We then installed the full FORGE™ management cadence — daily tier meetings at the cell, press, and leadership levels — and trained supervisors on structured problem-solving.",
    outcome:
      "Six months after engagement start, overall OEE was at 79% — an 18-point gain. The top five chronic downtime reasons had all been addressed with permanent countermeasures. The plant manager reported that leadership meetings had transformed: instead of discussing what might have happened, they were discussing what to do next. Annual value of the OEE improvement was independently estimated at $290K in recovered capacity and reduced scrap.",
    quote:
      "Before FORGE™, I managed the plant by feel. Now I know exactly what happened on every press, every shift, before I've had my first cup of coffee. It changed how I lead entirely.",
    quoteName: "Sarah K.",
    quoteRole: "Plant Manager",
    quoteCompany: "Injection Molding · Southeast U.S.",
    metrics: [
      { value: "18%", label: "OEE gain" },
      { value: "$290K", label: "Annual value recovered" },
      { value: "61→79%", label: "OEE improvement" },
      { value: "9×", label: "ROI on engagement" },
    ],
    service: "FORGE™ Operating System + AI Process Automation",
    duration: "3 weeks to live dashboard · 6 months to full deployment",
  },
  {
    id: 3,
    tag: "ELECTRONICS ASSEMBLY",
    industry: "Electronics Assembly",
    revenue: "$8M Annual Revenue",
    headline: "AI Automation of Shift Reporting",
    subheadline: "20 hours per week saved. Real-time visibility from day one.",
    situation:
      "A PCB assembly and wiring harness manufacturer with $8M in revenue was spending 3–4 hours per shift on manual reporting. Supervisors hand-logged production counts, defect tallies, downtime events, and material usage onto paper forms. Those forms were then transcribed into a shared spreadsheet by an office administrator. By the time leadership saw the data, it was 36–48 hours old. Decisions about labor allocation and overtime were made on guesswork.",
    approach:
      "We scoped and deployed an AI automation solution in 18 days. Tablet-based interfaces were installed at each production cell, feeding data directly into a live dashboard. AI-generated shift summaries were delivered automatically to the plant manager and owner each morning. Exception alerts fired in real time when a line went down or a defect threshold was breached. The system integrated directly with their existing ERP, eliminating double-entry entirely.",
    outcome:
      "From deployment day, supervisors were freed from manual reporting entirely a combined savings of 20+ hours per week across the shift team. The owner reported that the morning AI summary replaced three separate phone calls he used to make every morning. Within 30 days, two chronic downtime patterns were identified and corrected that had been invisible under the old reporting system. ROI was calculated at 14× within the first six months.",
    quote:
      "We went from flying blind to having a co-pilot. The morning AI summary tells me everything I need to walk the floor with confidence. I can't imagine running the plant without it now.",
    quoteName: "Robert T.",
    quoteRole: "Owner",
    quoteCompany: "Electronics Assembly · Midwest U.S.",
    metrics: [
      { value: "20hrs+", label: "Weekly hours saved" },
      { value: "100%", label: "Manual entry eliminated" },
      { value: "18 days", label: "Time to live deployment" },
      { value: "14×", label: "ROI in 6 months" },
    ],
    service: "AI Process Automation",
    duration: "18 days from scoping to live deployment",
  },
];

const pullQuotes: PullQuote[] = [
  {
    quote: "I thought we were losing money on material prices. Turns out we were losing it on the floor every shift and calling it normal.",
    name: "Dave M.",
    role: "Owner & General Manager",
    company: "Metal Fabrication · $14M Revenue",
  },
  {
    quote: "Before FORGE™, I managed by feel. Now I know exactly what happened on every press, every shift, before I've had my first cup of coffee.",
    name: "Sarah K.",
    role: "Plant Manager",
    company: "Injection Molding · $22M Revenue",
  },
  {
    quote: "We went from flying blind to having a co-pilot. I can't imagine running the plant without it now.",
    name: "Robert T.",
    role: "Owner",
    company: "Electronics Assembly · $8M Revenue",
  },
];

const aggregateStats = [
  { value: "$1.07M+", label: "Total documented waste recovered across featured cases" },
  { value: "11–14×", label: "Typical ROI range across all engagements" },
  { value: "60 days", label: "Average time to first measurable result" },
  { value: "100%", label: "Of audit clients who see recoverable value found" },
];

const ticker = ["$380K Recovered · Metal Fabrication", "OEE 61→79% · Plastics", "20hrs Saved/Week · Electronics", "$290K Annual Value · Injection Molding", "14× ROI · AI Automation"];

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
        <div style={{ display: "flex", alignItems: "center", gap: "16px" , cursor : "pointer"}} onClick={()=> navigate("/")}>
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
                <span key={item.name} style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.14em", color: item.name === "Services" ? "var(--text-muted)" : "var(--gold)", textTransform: "uppercase", cursor: "pointer", transition: "color 0.2s" }}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (item.name === "Services") navigate("/service");
                    if (item.name === "Testimonials") navigate("/testimony");
              }}
               
              onMouseEnter={(e) => { if (item.name !== "Services") (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
              onMouseLeave={(e) => { if (item.name !== "Services") (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
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
            paddingTop:"60px",
            // justifyContent: "center",
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
            <span className="nav-item"
              key={item.name}
              style={{
                fontSize: "16px",
                fontWeight: 600,
                letterSpacing: "0.14em",
                color: item.name === "Testimonials" ? "var(--gold)" : "#fff",
                cursor: "pointer",
                transition: "all 0.2s",
                animation: `slideUp 0.3s ease ${navItems.indexOf(item) * 0.1}s both`,
                padding: "12px",
                
                
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


// ─── Video Hero Component ───────────────────────────────────────────────────────

function VideoHero({ visible }: { visible: boolean }) {
  const [playing, setPlaying] = useState(false);
   const [isMobile] = useState(window.innerWidth < 768);

  return (
    <section style={{ padding: "120px 0 0", background: "var(--bg)"}}>
      {/* Text header */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 48px 64px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 0 }} className="video-hero-grid">
          <div className={`fade-up ${visible ? "visible" : ""}`} style={{ marginBottom: 16 }}>
            <div className="section-label">Client Results</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns:"repeat(auto-fit, minmax(200px,1fr))", gap: 80, width: "100%", alignItems: "end" }}>
            <h1 className={`fade-up d1 ${visible ? "visible" : ""}`}
              style={{ fontSize: "clamp(52px, 5.5vw, 88px)", fontWeight: 300, lineHeight: 1.05, color: "#fff", letterSpacing: "-0.01em" }}>
              Real factories.
              <br />
              <em style={{ color: "var(--gold)", fontStyle: "italic", fontWeight: 300 }}>Real results.</em>
            </h1>
            <div className={`fade-up d2 ${visible ? "visible" : ""}`}>
              <p className="sans" style={{ fontSize: 15, lineHeight: 1.8, color: "var(--text-muted)", marginBottom: 20 }}>
                Every story on this page belongs to a real World manufacturer between $5M and $50M in revenue. The numbers are documented. The people are real. The problems were the same ones keeping your leadership team up at night.
              </p>
              <p className="sans" style={{ fontSize: 15, lineHeight: 1.8, color: "var(--text-muted)" }}>
                We don't work with Fortune 500 companies. We work with the people who build industrial backbone  and we help them compete harder.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Video Block */}
      <div
        className={`fade-up d3 ${visible ? "visible" : ""}`}
        style={{
          position: "relative",
          maxWidth: 1400,
          margin: "0 auto 0",
          padding: "0 24px",
          display:"grid",
          gap:"18px",
          
        }}
         >
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16/9",
            background: "#0a0a08",
            overflow: "hidden",
            border: "1px solid var(--border)",
            cursor: "pointer",
            minHeight: "150px",

          }}
          onClick={() => setPlaying(true)}
        >
          {/* Placeholder background — replace with actual video/thumbnail */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(135deg, #0f0f0c 0%, #1a1a12 40%, #0f0f0c 100%)",
          }} />

          {/* Gold diagonal texture lines */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04 }} viewBox="0 0 1200 675" preserveAspectRatio="xMidYMid slice">
            {Array.from({ length: 30 }).map((_, i) => (
              <line key={i} x1={i * 80 - 200} y1="0" x2={i * 80 + 200} y2="675" stroke="#c9a84c" strokeWidth="1" />
            ))}
          </svg>

          {/* Overlay text */}
          {!playing && (
            <>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 24px" }}>
                {/* Play button */}
                <div style={{ position: "relative", marginBottom: 28 }}>
                  <div className="play-btn-ring" />
                  <div
                    style={{
                      width: 80, height: 80, borderRadius: "50%",
                      background: "var(--gold)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      position: "relative", zIndex: 1,
                      transition: "transform 0.2s, background 0.2s",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.08)"; (e.currentTarget as HTMLElement).style.background = "var(--gold-light)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; (e.currentTarget as HTMLElement).style.background = "var(--gold)"; }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="#0d0d0b">
                      <polygon points="5,3 19,12 5,21" />
                    </svg>
                  </div>
                </div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 300, color: "#fff", textAlign: "center", lineHeight: 1.2, marginBottom: 12 }}>
                  What Our Clients Say
                </div>
                <div className="sans" style={{ fontSize: 12, letterSpacing: "0.2em", color: "var(--text-muted)", textTransform: "uppercase", textAlign: "center" }}>
                  Watch · 4 min
                </div>
              </div>

              {/* Bottom bar */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                padding: "16px 18px",
                background: "linear-gradient(to top, rgba(13,13,11,0.95) 0%, transparent 100%)",
                display: "flex", flexDirection:"column", gap:"8px",
              }} className="video-bottom-bar">
                {!isMobile && (
                <div>
                  <div className="sans" style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.2em", color: "var(--gold)", textTransform: "uppercase", marginBottom: 4 }}>Featured In This Film</div>
                  <div className="sans" style={{ fontSize: 12, color: "var(--text-muted)" ,wordBreak:"break-word"}}>Dave M. · Sarah K. · Robert T. — Real clients, real results.</div>
                </div>
                )}
                <div className="sans" style={{ fontSize: 10, letterSpacing: "0.14em", color: "var(--text-dim)", textTransform: "uppercase" }}>Everstone Systems · 2025</div>
              </div>
            </>
          )}

          {/* When playing — embed actual YouTube/Vimeo here */}
          {playing && (
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "#000" }}>
              {/* Replace this src with your actual video URL */}
              <iframe
                style={{ width: "100%", height: "100%", border: "none" }}
                // src="https://www.youtube.com/embed/ObGhB9CCHP8"
                src={video}
                allow="autoplay; fullscreen"
                allowFullScreen
                title="Client Testimonial Video"
              />
            </div>
          )}
        </div>

        {/* Video caption bar */}
        <div style={{ borderLeft: "1px solid var(--border)", borderRight: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "18px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--bg-card)" }}>
          <div className="sans" style={{ fontSize: 11, color: "var(--text-muted)" }}>
            Three manufacturers. Three industries. One pattern: waste hiding in plain sight.
          </div>
          <button className="sans" onClick={() => setPlaying(!playing)} style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", color: "var(--gold)", textTransform: "uppercase", background: "none", border: "none", cursor: "pointer" }}>
            {playing ? "▐▐ Pause" : "▶ Play Film"}
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials Page ────────────────────────────────────────────────────────

function Footer() {
    const navigate = useNavigate();
  return (
    <footer style={{ borderTop: "1px solid var(--border)", background: "var(--bg-card)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "72px 48px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: 48, marginBottom: 56 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
               <div style={{ width: 36, height: 36, background: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#0d0d0b", letterSpacing: "0.06em" , cursor: "pointer",overflow :"hidden" }} ><img src={logoImg} alt="Everstone Systems Logo"  style={{ width: "100%", height: "100%", objectFit : "contain"}}/></div>
              <div>
                <div className="sans" style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.14em", color: "#fff", textTransform: "uppercase" }}>Everstone Systems</div>
                <div className="sans" style={{ fontSize: 9, letterSpacing: "0.18em", color: "var(--text-muted)", textTransform: "uppercase" }}>Smart Manufacturing</div>
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
                <div key={item} className="sans" style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 10, cursor: "pointer" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                  onClick={()=> navigate("/service")}
                >{item}</div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 24, display: "grid",gap:"15px", justifyContent: "space-between", alignItems: "center", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }} className="footer-bottom">
          <div className="sans" style={{ fontSize: 11, color: "var(--text-dim)" }}>© 2026 Everstone Systems LLC. All rights reserved.</div>
          <div className="sans" style={{ fontSize: 10, letterSpacing: "0.14em", color: "var(--text-dim)", textTransform: "uppercase" }}>Everstone Systems ·Smart Manufacturing </div>
        </div>
      </div>
    </footer>
  );
}

export default function TestimonialsPage() {
  const refs = useRef<Map<string, HTMLElement>>(new Map());
  const setRef = (id: string) => (el: HTMLElement | null) => { if (el) refs.current.set(id, el); };

  const heroV = useVisible("hero", refs);
  const statsV = useVisible("stats", refs);
  const quotesV = useVisible("quotes", refs);
  const ctaV = useVisible("cta", refs);

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", background: "var(--bg)", color: "var(--text)", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{globalStyles}</style>
      <Navbar />

      {/* ── VIDEO HERO ── */}
      <div id="hero" ref={setRef("hero")}>
        <VideoHero visible={heroV} />
      </div>

      {/* ── TICKER ── */}
      <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "13px 0", background: "var(--bg-card)", overflow: "hidden", marginTop: 0 }}>
        <div className="ticker-track">
          {[...ticker, ...ticker].map((item, i) => (
            <span key={i} className="sans" style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.18em", color: "var(--text-muted)", textTransform: "uppercase", padding: "0 36px", whiteSpace: "nowrap" }}>
              {item}<span style={{ color: "var(--gold)", marginLeft: 36 }}>•</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── AGGREGATE STATS ── */}
      <section id="stats" ref={setRef("stats")} style={{ borderBottom: "1px solid var(--border)" }} className="stats-row">
        {aggregateStats.map((stat, i) => (
          <div key={i} className={`fade-up d${i + 1} ${statsV ? "visible" : ""}`}
            style={{ padding: "52px 40px", borderRight: i < 3 ? "1px solid var(--border)" : "none" }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(34px, 3.5vw, 52px)", fontWeight: 300, color: "var(--gold)", lineHeight: 1, letterSpacing: "-0.02em", marginBottom: 14 }}>{stat.value}</div>
            <p className="sans" style={{ fontSize: 12, lineHeight: 1.65, color: "var(--text-muted)" }}>{stat.label}</p>
          </div>
        ))}
      </section>

      {/* ── CASE STUDIES ── */}
      {caseStudies.map((cs, i) => (
        <section
          key={cs.id}
          id={`case-${i}`}
          ref={setRef(`case-${i}`)}
          style={{
            padding: "120px 48px",
            borderBottom: "1px solid var(--border)",
            background: i % 2 === 1 ? "var(--bg-card)" : "var(--bg)",
          }}
        >
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            {/* Case Header */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, marginBottom: 64 }} className="story-grid">
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
                  <span className="sans" style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.2em", color: "var(--gold)", border: "1px solid var(--border)", padding: "4px 10px", textTransform: "uppercase" }}>{cs.tag}</span>
                  <span className="sans" style={{ fontSize: 9, color: "var(--text-dim)", letterSpacing: "0.14em" }}>{cs.revenue}</span>
                </div>
                <h2 style={{ fontSize: "clamp(32px, 3.5vw, 56px)", fontWeight: 300, lineHeight: 1.1, color: "#fff", marginBottom: 14 }}>{cs.headline}</h2>
                <p style={{ fontSize: "clamp(18px, 2vw, 26px)", fontWeight: 300, color: "var(--gold)", fontStyle: "italic", marginBottom: 32 }}>{cs.subheadline}</p>

                {/* Metrics */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 1, background: "var(--border)" }}>
                  {cs.metrics.map((m, j) => (
                    <div key={j} style={{ background: i % 2 === 1 ? "var(--bg)" : "var(--bg-card)", padding: "20px 22px" }}>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 30, fontWeight: 300, color: "var(--gold)", lineHeight: 1, marginBottom: 6 }}>{m.value}</div>
                      <div className="sans" style={{ fontSize: 10, lineHeight: 1.5, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Service & Duration tags */}
                <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span className="sans" style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.18em", color: "var(--text-dim)", textTransform: "uppercase", flexShrink: 0, paddingTop: 2 }}>Service</span>
                    <span className="sans" style={{ fontSize: 12, color: "var(--text-muted)" }}>{cs.service}</span>
                  </div>
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span className="sans" style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.18em", color: "var(--text-dim)", textTransform: "uppercase", flexShrink: 0, paddingTop: 2 }}>Timeline</span>
                    <span className="sans" style={{ fontSize: 12, color: "var(--text-muted)" }}>{cs.duration}</span>
                  </div>
                </div>
              </div>

              {/* Quote panel */}
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{
                  padding: "48px 44px",
                  background: "rgba(201,168,76,0.04)",
                  border: "1px solid var(--border)",
                  position: "relative",
                }}>
                  {/* Large quote mark */}
                  <div style={{ position: "absolute", top: 20, left: 36, fontFamily: "'Cormorant Garamond', serif", fontSize: 120, fontWeight: 300, color: "rgba(201,168,76,0.1)", lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>"</div>

                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(18px, 2vw, 26px)", fontWeight: 300, lineHeight: 1.55, color: "var(--text)", fontStyle: "italic", position: "relative", zIndex: 1, marginBottom: 32 }}>
                    "{cs.quote}"
                  </p>
                  <div style={{ borderTop: "1px solid var(--border)", paddingTop: 20 }}>
                    <div style={{ fontSize: 16, fontWeight: 400, color: "var(--gold)", marginBottom: 4 }}>{cs.quoteName}</div>
                    <div className="sans" style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 2 }}>{cs.quoteRole}</div>
                    <div className="sans" style={{ fontSize: 10, letterSpacing: "0.12em", color: "var(--text-dim)", textTransform: "uppercase" }}>{cs.quoteCompany}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Story — 3 columns: Situation / Approach / Outcome */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1, background: "var(--border)" }} className="story-grid">
              {[
                { label: "The Situation", content: cs.situation, number: "01" },
                { label: "Our Approach", content: cs.approach, number: "02" },
                { label: "The Outcome", content: cs.outcome, number: "03" },
              ].map((col, j) => (
                <div key={j} style={{ background: i % 2 === 1 ? "var(--bg)" : "var(--bg-card)", padding: "44px 36px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 20 }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 300, color: "var(--text-dim)", lineHeight: 1, flexShrink: 0 }}>{col.number}</span>
                    <span className="sans" style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", color: "var(--gold)", textTransform: "uppercase", paddingTop: 6 }}>{col.label}</span>
                  </div>
                  <p className="sans" style={{ fontSize: 13, lineHeight: 1.8, color: "var(--text-muted)" }}>{col.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ── PULL QUOTES STRIP ── */}
      <section id="quotes" ref={setRef("quotes")} style={{ padding: "100px 48px", background: "var(--bg-card)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div className={`fade-up ${quotesV ? "visible" : ""}`} style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="section-label" style={{ justifyContent: "center" }}>In Their Words</div>
            <h2 style={{ fontSize: "clamp(32px, 3.5vw, 56px)", fontWeight: 300, color: "#fff", lineHeight: 1.15 }}>
              The shift happens when they can{" "}
              <em style={{ color: "var(--gold)", fontStyle: "italic" }}>see the numbers.</em>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1, background: "var(--border)" }} className="quote-grid">
            {pullQuotes.map((pq, i) => (
              <div
                key={i}
                className={`card-hover fade-up d${i + 1} ${quotesV ? "visible" : ""}`}
                style={{ background: "var(--bg)", padding: "48px 40px", border: "1px solid transparent" }}
              >
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 80, fontWeight: 300, color: "rgba(201,168,76,0.12)", lineHeight: 1, marginBottom: -20, userSelect: "none" }}>"</div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(17px, 1.8vw, 23px)", fontWeight: 300, lineHeight: 1.55, color: "var(--text)", fontStyle: "italic", marginBottom: 32 }}>
                  "{pq.quote}"
                </p>
                <div style={{ borderTop: "1px solid var(--border)", paddingTop: 20 }}>
                  <div style={{ fontSize: 16, color: "var(--gold)", marginBottom: 4 }}>{pq.name}</div>
                  <div className="sans" style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 3 }}>{pq.role}</div>
                  <div className="sans" style={{ fontSize: 10, letterSpacing: "0.12em", color: "var(--text-dim)", textTransform: "uppercase" }}>{pq.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMITMENT BLOCK ── */}
      <section style={{ padding: "80px 48px", background: "var(--bg)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div className="section-label" style={{ justifyContent: "center" }}>Our Commitment</div>
          <h2 style={{ fontSize: "clamp(28px, 3vw, 48px)", fontWeight: 300, color: "#fff", lineHeight: 1.2, marginBottom: 24 }}>
            If we don't find the value,{" "}
            <em style={{ color: "var(--gold)", fontStyle: "italic" }}>you don't pay.</em>
          </h2>
          <p className="sans" style={{ fontSize: 15, lineHeight: 1.8, color: "var(--text-muted)", maxWidth: 620, margin: "0 auto 20px" }}>
            If the Factory Cash Recovery Audit™ doesn't identify recoverable value exceeding our fee  you don't pay the balance. We've done this enough times to know what we'll find before we arrive.
          </p>
          <p className="sans" style={{ fontSize: 13, lineHeight: 1.75, color: "var(--text-dim)", fontStyle: "italic" }}>
            Every result on this page was achieved with that guarantee in place.
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="cta" ref={setRef("cta")} style={{ padding: "140px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(80px, 14vw, 200px)", fontWeight: 700, color: "rgba(201,168,76,0.035)", letterSpacing: "0.1em", pointerEvents: "none", userSelect: "none", whiteSpace: "nowrap" }}>
          RESULTS
        </div>
        <div style={{ position: "relative" }}>
          <div className={`section-label ${ctaV ? "visible" : ""} fade-up`} style={{ justifyContent: "center" }}>Your Factory Is Next</div>
          <h2 className={`fade-up d1 ${ctaV ? "visible" : ""}`}
            style={{ fontSize: "clamp(40px, 5vw, 80px)", fontWeight: 300, color: "#fff", lineHeight: 1.1, marginBottom: 16 }}>
            Start recovering
            <br />
            hidden cash in{" "}
            <em style={{ color: "var(--gold)", fontStyle: "italic" }}>your factory.</em>
          </h2>
          <p className={`sans fade-up d2 ${ctaV ? "visible" : ""}`}
            style={{ fontSize: 14, lineHeight: 1.75, color: "var(--text-muted)", maxWidth: 480, margin: "0 auto 48px" }}>
            A 30-minute Strategy Call tells you exactly what we'd look for in your plant  and what it's likely costing you today.{" "}
            <strong style={{ color: "var(--text)" }}>No commitment required.</strong>
          </p>
          <div className={`fade-up d3 ${ctaV ? "visible" : ""}`} style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://calendly.com/everstonesystems/discovery-call" target="_blank" rel="noopener noreferrer">
            <button className="btn-primary" style={{ fontSize: "10px", padding: "11px 22px" }}>
                Book a Strategy Call
            </button>
            </a>
            <a href="https://calendly.com/everstonesystems/factory-audit" target="_blank" rel="noopener noreferrer">
              <button className="btn-outline" style={{ fontSize: "11px", padding: "16px 36px" }}>
                Request a Factory Audit
              </button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}