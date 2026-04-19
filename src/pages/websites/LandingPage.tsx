import { useState, useEffect, useRef } from "react";
import { wasteItems, ticker, statsData, problemCards, whatWeFind, clientResults, services, whyItems, resultsMetrics } from "../../types/api";
import { useNavigate} from "react-router-dom";
import logoImg from '../../assets/image/Logo 1.png';
import video from "../../assets/image/Top 5.mp4"


export default function EverstoneSystemsLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate= useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
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

  const setRef = (id: string) => (el: HTMLElement | null) => {
    if (el) sectionRefs.current.set(id, el);
  };

  const isVisible = (id: string) => visibleSections.has(id);
   const navItems = [
    { name: "Services", path: "/service" },
    { name: "Testimonials", path: "/testimony" },
    
  ];
const sectionRef = useRef<HTMLDivElement | null>(null);
const [scrollProgress, setScrollProgress] = useState(0);

useEffect(() => {
  const handleScroll = () => {
    if (!sectionRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    let progress = (windowHeight - rect.top) / (windowHeight + rect.height);

    progress = Math.max(0, Math.min(progress, 1));

    setScrollProgress(progress);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", background: "#0d0d0b", color: "#e8e0d0", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Montserrat:wght@300;400;500;600&display=swap');

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
          --text-dim: #5a5548;
        }

        html { scroll-behavior: smooth; }

        body { background: var(--bg); }

        .sans { font-family: 'Montserrat', sans-serif; }

        .fade-up {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .fade-up.delay-1 { transition-delay: 0.1s; }
        .fade-up.delay-2 { transition-delay: 0.2s; }
        .fade-up.delay-3 { transition-delay: 0.3s; }
        .fade-up.delay-4 { transition-delay: 0.4s; }

        .btn-primary {
          display: inline-block;
          background: none;
          color: var(--gold);
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          padding: 14px 28px;
          cursor: pointer;
          border: none;
          transition: background 0.2s, color 0.2s;
          text-transform: uppercase;
        }
        .btn-primary:hover { 
        background: var(--gold); 
        color: #fff;
        
        }

        .btn-outline {
          display: inline-block;
          background: transparent;
          color: var(--text);
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.12em;
          padding: 14px 28px;
          cursor: pointer;
          border: 1px solid rgba(232,224,208,0.3);
          transition: border-color 0.2s, color 0.2s;
          text-transform: uppercase;
        }
        .btn-outline:hover { border-color: var(--gold); color: var(--gold); background: rgba(201,168,76,0.06); }

        .btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          color: var(--gold);
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.15em;
          padding: 0;
          cursor: pointer;
          border: none;
          text-transform: uppercase;
          transition: gap 0.2s;
        }
        .btn-ghost:hover { gap: 12px; }

        .section-label {
          display: flex;
          align-items: center;
          gap: 14px;
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.2em;
          color: var(--gold);
          text-transform: uppercase;
          margin-bottom: 28px;
        }
        .section-label::before {
          content: '';
          width: 32px;
          height: 1px;
          background: var(--gold);
          display: block;
          flex-shrink: 0;
        }

        .ticker-track {
          display: flex;
          gap: 0;
          animation: tickerScroll 22s linear infinite;
          white-space: nowrap;
        }
        @keyframes tickerScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .card-hover {
          transition: border-color 0.25s, background 0.25s;
        }
        .card-hover:hover {
          border-color: rgba(201,168,76,0.35) !important;
          background: #1c1c14 !important;
        }

        .waste-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 24px;
          border-bottom: 1px solid var(--border);
          transition: background 0.2s;
        }
        .waste-row:hover { background: rgba(201,168,76,0.04); }
        .waste-row:last-child { border-bottom: none; }

        .marquee-outer { overflow: hidden; }
        .problem-grid{
            display:grid;
            gridTemplateColumns: 1fr 1fr;
            gap:80;
        
        }
        .problem-card {
            display:grid;
            gridTemplateColumns: repeat(5, 1fr);
            gap : 1px
            }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .services-grid { grid-template-columns: 1fr !important; }
          .results-grid { grid-template-columns: 1fr !important; }
          .why-grid { grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) !important; }
          .footer-grid { grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) !important; }
          .hero-headline { font-size: clamp(42px, 8vw, 80px) !important; }
          .problem-grid { grid-template-columns : 1fr, gap: 40px;}
          ,problem-card {gridTemplateColumns: repeat(5, 1fr);}
        }
          @media (max-width: 600px){
          .stats-grid { grid-template-columns: 1fr !important; }
          .problem-card{gridTemplateColumns: 1fr;}
        }
      `}</style>
     
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
        <div style={{ display: "flex", alignItems: "center", gap: "16px", cursor :"pointer" }} onClick={()=> navigate("/")}>
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
      </nav>
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
            zIndex: 1000,
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
        
       <section style={{marginTop:"90px"}}>
  <div
    style={{
      position:"sticky",
      top: "10px",
      height: "80vh",
      display:"flex",
      alignItems: "center",
      justifyContent: "center",
      
      
    }}
  >
    <div
      className="hero-video"
      style={{
        width: "70%",
        height: "80vh",
        opacity: 1 - scrollProgress,
        transform: `scale(${1 - scrollProgress * 0.2})`,
        transition: "opacity 0.1s linear, transform 0.1s linear",
      }}
    >
      <video
        src={video}
        autoPlay
        muted
        loop
        playsInline
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>

    {/* Optional dark overlay */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        opacity: 1 - scrollProgress,
        transition: "opacity 0.2s",
      }}
    />
  </div>
</section>

      {/* ── HERO ── */}
      <section
        style={{
          minHeight: "100vh",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          padding: "120px 48px 80px",
          gap: "64px",
          maxWidth: "1440px",
          margin: "0 auto",
          // opacity: scrollProgress, // 👈 KEY
          // transform: `translateY(${60 * (1 - scrollProgress)}px)`, // 👈 smooth slide
          // transition: "all 0.3s ease",
        }}
        className="hero-grid"
       >
        {/* Left */}
        <div>
          <div className="section-label" style={{ marginBottom: "24px" , color:"var(--gold)" }}>
            For Manufacturers $5M–$50M ·  Operations
          </div>
          <h1
            className="hero-headline"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(52px, 5.5vw, 88px)",
              fontWeight: "300",
              lineHeight: "1.05",
              color: "#fff",
              letterSpacing: "-0.01em",
              marginBottom: "28px",
            }}
          >
            We Find the
            <br />
            Money Your
            <br />
            <em style={{ color: "var(--gold)", fontStyle: "italic", fontWeight: "300" }}>Factory</em>
            <br />
            Is Losing.
          </h1>

          <div style={{ width: "48px", height: "2px", background: "var(--gold)", marginBottom: "28px" }} />

          <p
            className="sans"
            style={{
              fontSize: "14px",
              lineHeight: "1.75",
              color: "var(--text-muted)",
              maxWidth: "420px",
              marginBottom: "40px",
            }}
          >
            Everstone Systems helps <strong style={{ color: "var(--text)", fontWeight: "600" }}>U.S. manufacturing companies</strong> with $5M–$50M in revenue identify hidden operational waste, recover lost profit, and build the systems to make sure it never returns.
          </p>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap"  }}>
            <a href="https://calendly.com/everstonesystems/discovery-call" target="_blank" rel="noopener noreferrer">
              <button className="btn-primary">Book a Strategy Call</button>
            </a>
            <button className="btn-outline" onClick={()=> navigate("/Service")}>Our Services</button>
          </div>

          {/* <div className="sans" style={{ marginTop: "40px", fontSize: "10px", letterSpacing: "0.15em", color: "var(--text-dim)", textTransform: "uppercase" }}>
            ↓ Scroll to explore
          </div> */}
        </div>

        {/* Right — Live Waste Panel */}
        <div
        >
          <div
            style={{
              padding: "16px 24px",
              // borderBottom: "1px solid var(--border)",
            }}
          >
            <span
              className="sans"
              style={{ fontSize: "9px", fontWeight: "500", letterSpacing: "0.2em", color: "var(--text-muted)", textTransform: "uppercase" }}
            >
              Live Waste Exposure — Example $14M Plant
            </span>
          </div>

          {wasteItems.map((item, i) => (
            <div key={i} className="waste-row"  style={{border: "1px solid var(--border)" , marginTop: "20px",}}>
              <div>
                <div className="sans" style={{ fontSize: "11px", fontWeight: "500", letterSpacing: "0.2em", color: "var(--gold)" , textTransform: "uppercase", marginBottom: "4px" }}>
                  {item.category}
                </div>
                <div style={{ fontSize: "16px", fontWeight: "400", color: "#fff"}}>{item.label}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", fontWeight: "400", color: "var(--gold)", letterSpacing: "-0.01em" }}>{item.amount}</span>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--gold)", opacity: 0.6, flexShrink: 0 }} />
              </div>
            </div>
          ))}

          <div
            style={{
              padding: "18px 24px",
              background: "rgba(201,168,76,0.06)",
              borderTop: "1px solid var(--border)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <span className="sans" style={{ fontSize: "9px", fontWeight: "600", letterSpacing: "0.2em", color: "var(--gold)", textTransform: "uppercase" }}>
              Total Recoverable Waste
            </span>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "26px", fontWeight: "400", color: "var(--gold)", letterSpacing: "-0.01em" }}>$411K / year</span>
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div
        style={{
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          padding: "14px 0",
          background: "var(--bg-card)",
          overflow: "hidden",
        }}
      >
        <div className="ticker-track">
          {[...ticker, ...ticker].map((item, i) => (
            <span
              key={i}
              className="sans"
              style={{
                fontSize: "10px",
                fontWeight: "500",
                letterSpacing: "0.18em",
                color: "var(--text-muted)",
                textTransform: "uppercase",
                padding: "0 32px",
                whiteSpace: "nowrap",
              }}
            >
              {item}
              <span style={{ color: "var(--gold)", marginLeft: "32px" }}>•</span>
            </span>
          ))}
        </div>
      </div>
      

      {/* ── STATS STRIP ── */}
      <section
            id="stats"
            ref={setRef("stats")}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              borderBottom: "1px solid var(--border)",
            }}
            className="stats-grid"
          >
        {statsData.map((item, i) => (
          <div
            key={i}
            className={`fade-up delay-${i + 1} ${isVisible("stats") ? "visible" : ""}`}
            style={{
              padding: "52px 40px",
              borderRight: i < 3 ? "1px solid var(--border)" : "none",
            }}
          >
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(36px, 3.5vw, 52px)",
                fontWeight: "300",
                color: "var(--gold)",
                letterSpacing: "-0.02em",
                marginBottom: "16px",
                lineHeight: 1,
              }}
            >
              {item.stat}
            </div>
            <p className="sans" style={{ fontSize: "12px", lineHeight: "1.65", color: "var(--text-muted)", marginBottom: "12px" }}>
              {item.description}
            </p>
            <div className="sans" style={{ fontSize: "9px", letterSpacing: "0.1em", color: "var(--text-dim)", fontStyle: "italic" }}>
              {item.source}
            </div>
          </div>
        ))}
      </section>

      {/* ── THE PROBLEM ── */}
      <section
        id="problem"
        ref={setRef("problem")}
        style={{ padding: "120px 48px", maxWidth: "1440px", margin: "0 auto" }}
       >
        <div style={{ display: "grid", gap: "80px", alignItems: "start", marginBottom: "80px",gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
          {/* Left */}
          <div className={`fade-up ${isVisible("problem") ? "visible" : ""}`}>
            <div className="section-label" >The Problem</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px, 4vw, 64px)", fontWeight: "300", lineHeight: "1.1", color: "#fff", marginBottom: "16px" }}>
              Your plant is
              <br />
              bleeding profit
              <br />
              <em style={{ color: "var(--gold)", fontStyle: "italic" }}>every shift.</em>
            </h2>
          </div>

          {/* Right */}
          <div className={`fade-up delay-2 ${isVisible("problem") ? "visible" : ""}`}>
            <p className="sans" style={{ fontSize: "14px", lineHeight: "1.8", color: "var(--text-muted)", marginBottom: "20px" }}>
              Most manufacturers between $5M and $50M are running their plant the same way they did three years ago. Margins thin. The team gets reactive. And the waste scrap, downtime, inefficiency gets absorbed into overhead and called "normal."
            </p>
            <p className="sans" style={{ fontSize: "14px", lineHeight: "1.8", color: "var(--text)", marginBottom: "28px" }}>
              It's not normal. <strong>It's a systems and visibility problem. And it's entirely fixable.</strong>
            </p>

            <div
              style={{
                borderLeft: "2px solid var(--gold)",
                paddingLeft: "24px",
                background: "rgba(201,168,76,0.04)",
                padding: "24px 24px 24px 24px",
              }}
            >
              <p className="sans" style={{ fontSize: "13px", lineHeight: "1.75", color: "var(--text-muted)" }}>
                The Department of Commerce estimates that inefficiency and rework account for up to{" "}
                <strong style={{ color: "var(--text)" }}>25% of total manufacturing cost</strong> in facilities without formal operating systems. That's not overhead. That's profit sitting on your floor.
              </p>
            </div>
          </div>
        </div>

        {/* Problem Cards */}
        <div  style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr)) ",gap: "1px", background: "var(--border)" }}>
          {problemCards.map((card, i) => (
            <div
              key={i}
              className={`card-hover fade-up delay-${Math.min(i + 1, 4)} ${isVisible("problem") ? "visible" : ""}`}
              style={{
                background: "var(--bg-card)",
                padding: "36px 28px",
                cursor: "default",
              }}
            >
              <div style={{ fontSize: "28px", marginBottom: "16px", opacity: 0.8 }}>{card.icon}</div>
              <div className="sans" style={{ fontSize: "9px", fontWeight: "600", letterSpacing: "0.2em", color: "red", textTransform: "uppercase", marginBottom: "10px", }}>
                {card.rate}
              </div>
              <div style={{ fontSize: "20px", fontWeight: "400", color: "#fff", marginBottom: "12px" }}>{card.title}</div>
              <p className="sans" style={{ fontSize: "12px", lineHeight: "1.65", color: "var(--text-muted)" }}>{card.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHO WE SERVE ── */}
      {/* <section
        id="who"
        ref={setRef("who")}
        style={{ background: "var(--bg-card)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
          >
        <div style={{ padding: "120px 48px", maxWidth: "1440px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}> */}
          {/* Left */}
          {/* <div className={`fade-up ${isVisible("who") ? "visible" : ""}`}>
            <div className="section-label">Who We Serve</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 4vw, 60px)", fontWeight: "300", lineHeight: "1.1", color: "#fff", marginBottom: "32px" }}>
              Built for the
              <br />
              mid-market
              <br />
              <em style={{ color: "var(--gold)", fontStyle: "italic" }}>manufacturer.</em>
            </h2>

            <div
              style={{
                border: "1px solid var(--border)",
                padding: "24px 28px",
                background: "rgba(201,168,76,0.03)",
                marginBottom: "32px",
                display: "flex",
                gap:"9px",
              }}
            >
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "32px", fontWeight: "300", color: "var(--gold)", marginBottom: "8px" }}>$5M – $50M</div>
              <div className="sans" style={{ fontSize: "11px", letterSpacing: "0.12em" , color: "var(--text-muted)" }}>
                Annual manufacturing revenue
                <br />
                Our exclusive focus
              </div>
            </div>

            <p className="sans" style={{ fontSize: "13px", lineHeight: "1.8", color: "var(--text-muted)", marginBottom: "16px" }}>
              You're too large to run on instinct. Too lean to hire a team of internal consultants. Everstone Systems fills that gap  as your dedicated operational performance partner.
            </p>
            <p className="sans" style={{ fontSize: "13px", lineHeight: "1.8", color: "var(--text-muted)" }}>
              Over <strong style={{ color: "var(--text)" }}>98% of U.S. manufacturers</strong> employ fewer than 500 people. This group generates the backbone of American industrial output  yet receives the least access to serious operational consulting. We exist to change that.
            </p>
          </div> */}

          {/* Right — Industries */}
          {/* <div className={`fade-up delay-2 ${isVisible("who") ? "visible" : ""}`}>
            <div className="sans" style={{ fontSize: "10px", fontWeight: "500", letterSpacing: "0.2em", color: "var(--gold)", textTransform: "uppercase", marginBottom: "24px", display: "flex", alignItems: "center", gap: "14px" }}>
              <span style={{ width: "32px", height: "1px", background: "var(--gold)", display: "inline-block" }} />
              Industries We Work In
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "var(--border)" }}>
              {[
                { icon: "⚙️", name: "Metal Fabrication", sub: "Sheet metal, structural, precision parts" },
                { icon: "🧪", name: "Plastics & Composites", sub: "Injection molding, extrusion, thermoforming" },
                { icon: "🔌", name: "Electronics Assembly", sub: "PCB, wiring harnesses, controls" },
                { icon: "🏭", name: "Industrial Equipment", sub: "Machines, enclosures, systems" },
                { icon: "📦", name: "Packaging & Converting", sub: "Flexible, rigid, printing" },
                { icon: "🔩", name: "Machined Components", sub: "CNC, turning, grinding" },
              ].map((ind, i) => (
                <div
                  key={i}
                  className="card-hover"
                  style={{ background: "var(--bg)", padding: "24px 22px", display: "flex", alignItems: "flex-start", gap: "14px" }}
                >
                  <span style={{ fontSize: "20px", marginTop: "2px", flexShrink: 0 }}>{ind.icon}</span>
                  <div>
                    <div style={{ fontSize: "15px", fontWeight: "400", color: "var(--text)", marginBottom: "4px" }}>{ind.name}</div>
                    <div className="sans" style={{ fontSize: "11px", color: "var(--text-muted)", lineHeight: "1.5" }}>{ind.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* ── WHAT WE FIND ── */}
      <section
        id="what"
        ref={setRef("what")}
        style={{ padding: "120px 48px", maxWidth: "1440px", margin: "0 auto" }}
      >
       {!isMobile && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "80px", alignItems: "start" }}>
          {/* Left */}
          <div className={`fade-up ${isVisible("what") ? "visible" : ""}`} style={{ position: "sticky", top: "100px" }}>
            <div className="section-label" >What We Find</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(56px, 6vw, 96px)", fontWeight: "300", color: "var(--gold)", lineHeight: 1, letterSpacing: "-0.02em", marginBottom: "20px" }}>
              $400K
            </div>
            <p className="sans" style={{ fontSize: "13px", lineHeight: "1.75", color: "var(--text-muted)", marginBottom: "32px" }}>
              Average recoverable waste we identify in a $10M–$20M plant during our initial audit. Real money. Already in your building.
            </p>
            <ul style={{ listStyle: "none", marginBottom: "36px" }}>
              {["Scrap costs you're absorbing into overhead", "Downtime you're not tracking — or fixing", "Labor hours spent on work that adds no value", "Decisions made on data that's 48 hours old", "Strategy that evaporates between the office and the floor"].map((item, i) => (
                <li key={i} className="sans" style={{ fontSize: "12px", lineHeight: "1.7", color: "var(--text-muted)", display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "8px" }}>
                  <span style={{ color: "var(--gold)", marginTop: "2px", flexShrink: 0 }}>—</span>
                  {item}
                </li>
              ))}
            </ul>
            <button className="btn-primary">Request a Factory Audit</button>
          </div>

          {/* Right */}
          <div>
            {whatWeFind.map((item, i) => (
              <div
                key={i}
                className={`fade-up delay-${Math.min(i + 1, 3)} ${isVisible("what") ? "visible" : ""}`}
                style={{
                  borderTop: "1px solid var(--border)",
                  padding: "44px 0",
                  display: "grid",
                  gridTemplateColumns: "52px 1fr",
                  gap: "28px",
                }}
              >
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "32px", fontWeight: "300", color: "var(--text-dim)", lineHeight: 1 }}>{item.number}</div>
                <div>
                  <h3 style={{ fontSize: "22px", fontWeight: "400", color: "#fff", marginBottom: "14px" }}>{item.title}</h3>
                  <p className="sans" style={{ fontSize: "13px", lineHeight: "1.75", color: "var(--text-muted)", marginBottom: "14px" }}>{item.description}</p>
                  <div className="sans" style={{ fontSize: "9px", fontWeight: "600", letterSpacing: "0.2em", color: "red", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ color: "var(--gold)", fontSize: "8px" }}>▼</span>
                    {item.rate}
                    {item.rateLabel && <span style={{ color: "var(--text-dim)", marginLeft: "6px" }}>· {item.rateLabel}</span>}
                  </div>
                </div>
              </div>
            ))}
            <div style={{ borderTop: "1px solid var(--border)" }} />
          </div>
        </div>
       )}
      </section>

      {/* ── OUR SERVICES ── */}
      <section
        id="services"
        ref={setRef("services")}
        style={{ background: "var(--bg-card)", borderTop: "1px solid var(--border)", padding: "120px 48px" }}
      >
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          <div className={`fade-up ${isVisible("services") ? "visible" : ""}`} style={{ marginBottom: "64px" }}>
            <div className="section-label" >Our Services</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px, 4.5vw, 72px)", fontWeight: "300", lineHeight: "1.1", color: "#fff" }}>
              Four services.
              <br />
              One <em style={{ color: "var(--gold)", fontStyle: "italic" }}>integrated</em> model.
            </h2>
            <p className="sans" style={{ fontSize: "14px", color: "var(--text-muted)", marginTop: "20px", maxWidth: "480px", lineHeight: "1.7" }}>
              Find the waste. Fix the operations. Install the system. Automate the visibility. In that exact order.
            </p>
          </div>

          <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "var(--border)" }}>
            {services.map((svc, i) => (
              <div
                key={i}
                className={`card-hover fade-up delay-${(i % 2) + 1} ${isVisible("services") ? "visible" : ""}`}
                style={{ background: "var(--bg)", padding: "48px 44px" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px" }}>
                  <span
                    className="sans"
                    style={{ fontSize: "9px", fontWeight: "600", letterSpacing: "0.18em", color: "var(--text-muted)", border: "1px solid var(--border)", padding: "4px 10px", textTransform: "uppercase" }}
                  >
                    {svc.tag}
                  </span>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "52px", fontWeight: "300", color: "var(--text-dim)", lineHeight: 1, letterSpacing: "-0.02em" }}>{svc.number}</span>
                </div>

                <h3 style={{ fontSize: "clamp(22px, 2.5vw, 32px)", fontWeight: "400", color: "#fff", lineHeight: "1.15", marginBottom: "20px" }}>
                  {svc.titleLine1}
                  <br />
                  {svc.titleItalic ? (
                    <em style={{ color: "var(--gold)", fontStyle: "italic", fontWeight: "300" }}>{svc.titleLine2}</em>
                  ) : (
                    <em style={{ color: "var(--gold)", fontStyle: "italic" }}>{svc.titleLine1 === "FORGE™" ? "" : ""}{svc.titleLine2}</em>
                  )}
                </h3>

                <p className="sans" style={{ fontSize: "13px", lineHeight: "1.75", color: "var(--text-muted)", marginBottom: "24px" }}>{svc.description}</p>

                <ul style={{ listStyle: "none", marginBottom: "32px" }}>
                  {svc.bullets.map((b, j) => (
                    <li key={j} className="sans" style={{ fontSize: "12px", lineHeight: "1.7", color: "var(--text-muted)", display: "flex", gap: "12px", marginBottom: "6px" }}>
                      <span style={{ color: "var(--gold)", flexShrink: 0 }}>—</span>
                      {b}
                    </li>
                  ))}
                </ul>

                <button className="btn-ghost" onClick = {() => navigate("/Service")}>
                  {svc.cta} →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROVEN RESULTS ── */}
      <section
        id="results"
        ref={setRef("results")}
        style={{ padding: "120px 48px", maxWidth: "1440px", margin: "0 auto" }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "80px", alignItems: "start", marginBottom: "72px", }}>
          <div className={`fade-up ${isVisible("results") ? "visible" : ""}`}>
            <div className="section-label">Proven Results</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 4vw, 64px)", fontWeight: "300", lineHeight: "1.1", color: "#fff" }}>
              Numbers that
              <br />
              move the <em style={{ color: "var(--gold)", fontStyle: "italic" }}>business.</em>
            </h2>
          </div>

          <div className={`fade-up delay-2 ${isVisible("results") ? "visible" : ""}`}>
            <p className="sans" style={{ fontSize: "13px", lineHeight: "1.8", color: "var(--text-muted)", marginBottom: "20px" }}>
              Most clients come to us thinking they have a people problem. Within 30 days of the audit, they understand it's a <strong style={{ color: "var(--text)" }}>systems and visibility problem</strong>  and that it's entirely fixable.
            </p>
            <p className="sans" style={{ fontSize: "13px", lineHeight: "1.8", color: "var(--text-muted)", marginBottom: "20px" }}>
              We work exclusively with manufacturers in the $5M–$50M range. Our playbooks are built for your scale, your constraints, and your competitive environment  not adapted down from Fortune 500 programs.
            </p>
            <p className="sans" style={{ fontSize: "13px", lineHeight: "1.8", color: "var(--text-muted)", marginBottom: "28px" }}>
              The U.S. Manufacturing Extension Partnership reports that companies implementing formal operational improvement programs achieve an average of{" "}
              <strong style={{ color: "var(--text)" }}>$3.60 in benefit for every $1 invested.</strong> Our clients consistently exceed that benchmark.
            </p>

            <div style={{ border: "1px solid rgba(201,168,76,0.25)", padding: "24px 28px", background: "rgba(201,168,76,0.04)" }}>
              <div className="sans" style={{ fontSize: "9px", fontWeight: "600", letterSpacing: "0.2em", color: "var(--gold)", textTransform: "uppercase", marginBottom: "12px" }}>Our Commitment</div>
              <p className="sans" style={{ fontSize: "13px", lineHeight: "1.75", color: "var(--text-muted)" }}>
                If the Factory Cash Recovery Audit™ doesn't identify recoverable value exceeding our fee you don't pay the balance. We've done this enough times to know what we'll find before we arrive.
              </p>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1px", background: "var(--border)", marginBottom: "72px" }}>
          {resultsMetrics.map((m, i) => (
            <div key={i} style={{ background: "var(--bg-card)", padding: "44px 40px" }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px, 4vw, 60px)", fontWeight: "300", color: "var(--gold)", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: "12px" }}>
                {m.stat}
              </div>
              <p className="sans" style={{ fontSize: "12px", lineHeight: "1.65", color: "var(--text-muted)" }}>{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CLIENT RESULTS ── */}
      <section
        id="clients"
        ref={setRef("clients")}
        style={{ background: "var(--bg-card)", borderTop: "1px solid var(--border)", padding: "120px 48px" }}
      >
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          <div className={`fade-up ${isVisible("clients") ? "visible" : ""}`} style={{ marginBottom: "64px" }}>
            <div className="section-label">Client Results</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 4vw, 64px)", fontWeight: "300", color: "#fff", lineHeight: "1.1" }}>
              Real factories.
              <br />
              <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Real results.</em>
            </h2>
          </div>

          <div className="results-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1px", background: "var(--border)" }}>
            {clientResults.map((result, i) => (
              <div
                key={i}
                className={`card-hover fade-up delay-${i + 1} ${isVisible("clients") ? "visible" : ""}`}
                style={{ background: "var(--bg)", padding: "40px 36px" }}
              >
                <div className="sans" style={{ fontSize: "9px", fontWeight: "600", letterSpacing: "0.2em", color: "var(--gold)", textTransform: "uppercase", marginBottom: "16px" }}>
                  {result.industry}
                </div>
                <h3 style={{ fontSize: "20px", fontWeight: "400", color: "#fff", marginBottom: "16px", lineHeight: "1.3" }}>{result.title}</h3>
                <p className="sans" style={{ fontSize: "12px", lineHeight: "1.75", color: "var(--text-muted)", marginBottom: "32px" }}>{result.description}</p>

                <div style={{ borderTop: "1px solid var(--border)", paddingTop: "24px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                  {result.metrics.map((m, j) => (
                    <div key={j}>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "26px", fontWeight: "300", color: "var(--gold)", letterSpacing: "-0.01em", lineHeight: 1 }}>{m.value}</div>
                      <div className="sans" style={{ fontSize: "9px", fontWeight: "500", letterSpacing: "0.15em", color: "var(--text-dim)", textTransform: "uppercase", marginTop: "4px" }}>{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY EVERSTONE ── */}
      <section
        id="why"
        ref={setRef("why")}
        style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", background: "var(--border)", gap: "1px" }} className="why-grid">
          {whyItems.map((item, i) => (
            <div
              key={i}
              className={`card-hover fade-up delay-${i + 1} ${isVisible("why") ? "visible" : ""}`}
              style={{ background: "var(--bg-card)", padding: "48px 36px" }}
            >
              <div style={{ fontSize: "32px", marginBottom: "20px", color:"var(--gold)" }}><i className={item.icon}></i></div>
              <h3 style={{ fontSize: "20px", fontWeight: "400", color: "#fff", marginBottom: "14px" }}>{item.title}</h3>
              <p className="sans" style={{ fontSize: "12px", lineHeight: "1.7", color: "var(--text-muted)" }}>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        id="cta"
        ref={setRef("cta")}
        style={{ padding: "160px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}
      >
        {/* BG text */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(100px, 18vw, 240px)",
            fontWeight: "700",
            color: "rgba(201,168,76,0.04)",
            letterSpacing: "0.08em",
            pointerEvents: "none",
            userSelect: "none",
            whiteSpace: "nowrap",
          }}
        >
          RECOVER
        </div>

        <div style={{ position: "relative" }}>
          <div
            className={`section-label ${isVisible("cta") ? "visible" : ""} fade-up`}
            style={{ justifyContent: "center" }}
          >
            No Obligation. No Fluff.
          </div>
          <h2
            className={`fade-up delay-1 ${isVisible("cta") ? "visible" : ""}`}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(44px, 5.5vw, 88px)",
              fontWeight: "300",
              color: "#fff",
              lineHeight: "1.1",
              marginBottom: "16px",
            }}
          >
            Start recovering
            <br />
            hidden cash in
            <br />
            <em style={{ color: "var(--gold)", fontStyle: "italic" }}>your factory.</em>
          </h2>
          <p
            className={`sans fade-up delay-2 ${isVisible("cta") ? "visible" : ""}`}
            style={{ fontSize: "14px", lineHeight: "1.7", color: "var(--text-muted)", maxWidth: "500px", margin: "0 auto 48px" }}
          >
            A 30-minute Strategy Call tells you exactly what we'd look for in your plant — and what it's likely costing you today.{" "}
            <strong style={{ color: "var(--text)" }}>No commitment required.</strong>
          </p>

          <div
            className={`fade-up delay-3 ${isVisible("cta") ? "visible" : ""}`}
            style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginBottom: "24px" }}
          >
            <a href="https://calendly.com/everstonesystems/discovery-call?" target="_blank" rel="noopener noreferrer">
              <button className="btn-primary" style={{ fontSize: "11px", padding: "16px 36px" }}>
                Book a Strategy Call
              </button>
            </a>
            <a href="https://calendly.com/everstonesystems/factory-audit" target="_blank" rel="noopener noreferrer">
              <button className="btn-outline" style={{ fontSize: "11px", padding: "16px 36px" }}>
                Request a Factory Audit
              </button>
            </a>
          </div>

          <div
            className={`sans fade-up delay-4 ${isVisible("cta") ? "visible" : ""}`}
            style={{ fontSize: "9px", fontWeight: "500", letterSpacing: "0.2em", color: "var(--text-dim)", textTransform: "uppercase" }}
          >
            Serving Manufacturers · $5M–$50M Annual Revenue
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid var(--border)", background: "var(--bg-card)" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "72px 48px 40px" }}>
          <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: "48px", marginBottom: "64px" }}>
            {/* Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                 <div style={{ width: 36, height: 36, background: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#0d0d0b", letterSpacing: "0.06em" , cursor: "pointer",overflow :"hidden" }} ><img src={logoImg} alt="Everstone Systems Logo"  style={{ width: "100%", height: "100%", objectFit : "contain"}}/></div>
                <div>
                 
                  <div className="sans" style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.14em", color: "#fff", textTransform: "uppercase" }}>Everstone Systems</div>
                  <div className="sans" style={{marginTop :"10px", fontSize: "11px", letterSpacing: "0.18em", color: "var(--gold)", textTransform: "uppercase" }}>Smart Manufacturing </div>
                </div>
              </div>
              <p className="sans" style={{ fontSize: "12px", lineHeight: "1.75", color: "var(--text-muted)" }}>
                Helping  manufacturing companies between $5M–$50M in revenue recover hidden cash, build scalable operations, and compete with discipline.
              </p>
            </div>

            {/* Services */}
            <div>
              <div className="sans" style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.2em", color: "var(--gold)", textTransform: "uppercase", marginBottom: "20px" }}>Services</div>
              {["Factory Cash Recovery Audit™", "Implementation Support", "FORGE™ Operating System", "AI Automation"].map((item, i) => (
                <div key={i} className="sans" style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "10px", cursor: "pointer", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                  onClick={() => navigate("/Service")}
                >
                  {item}
                </div>
              ))}
            </div>

            {/* Who We Serve */}
            <div>
              <div className="sans" style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.2em", color: "var(--gold)", textTransform: "uppercase", marginBottom: "20px" }}>Who We Serve</div>
              {["Metal Fabrication", "Plastics & Composites", "Electronics Assembly", "Industrial Equipment", "Packaging & Converting"].map((item, i) => (
                <div key={i} className="sans" style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "10px", cursor: "pointer", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                >
                  {item}
                </div>
              ))}
            </div>

            {/* Get Started */}
            <div>
              <div className="sans" style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.2em", color: "var(--gold)", textTransform: "uppercase", marginBottom: "20px" }}>Get Started</div>
              {["Book a Strategy Call", "Request a Factory Audit"].map((item, i) => (
                <div key={i} className="sans" style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "10px", cursor: "pointer", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                >
                  {item}
                </div>
              ))}
              <div className="sans" style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "24px" }}>info@everstonesystems.com</div>
              <a href="https://calendly.com/everstonesystems/discovery-call" target="_blank" rel="noopener noreferrer">
              <button className="btn-primary" style={{ fontSize: "10px", padding: "12px 22px" }}>Book a Call</button></a>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "15px" }}>
            <div className="sans" style={{ fontSize: "11px", color: "var(--text-dim)" }}>
              © 2026 Everstone Systems LLC. All rights reserved.
            </div>
            <div className="sans" style={{ fontSize: "11px", color: "var(--text-dim)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              EVERSTONE SYSTEMS ·Smart Manufacturing 
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}