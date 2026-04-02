import type { ReactNode } from "react";

interface WasteItem {
  category: string;
  label: string;
  amount: string;
}

interface StatCard {
  stat: string;
  description: string;
  source: string;
}

interface ProblemCard {
  icon: string;
  rate: string;
  title: string;
  description: string;
}

export interface Service {
  tag: string;
  number: string;
  titleLine1: string;
  titleLine2: string;
  titleItalic?: boolean;
  description: string;
  bullets: string[];
  cta: string;
}

export interface ResultCard {
  industry: string;
  title: string;
  description: string;
  metrics: { value: string; label: string }[];
}

export interface WhyItem {
  icon: string;
  title: string;
  description: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const wasteItems: WasteItem[] = [
  { category: "SCRAP & REWORK", label: "Weld Station Defects", amount: "$94K/yr" },
  { category: "UNPLANNED DOWNTIME", label: "Untracked Stoppages", amount: "$147K/yr" },
  { category: "WORKFLOW WASTE", label: "Non-Value-Added Labor", amount: "$112K/yr" },
  { category: "REPORTING", label: "Manual Data Entry", amount: "$58K/yr" },
];

const statsData: StatCard[] = [
  { stat: "20–30%", description: "Of revenue lost to operational inefficiency in the typical U.S. manufacturing facility", source: "McKinsey Global Institute" },
  { stat: "$8,000", description: "Average cost of one hour of unplanned downtime — and most plants aren't tracking it", source: "NIST Manufacturing Extension Partnership, 2023" },
  { stat: "68%", description: "Of manufacturing SMBs cannot accurately measure their true cost of quality", source: "ASQ / IndustryWeek Survey, 2023" },
  { stat: "60%", description: "Of mid-market plants operate with no formal operating system — so improvements never hold", source: "McKinsey Global Institute" },
];

const problemCards: ProblemCard[] = [
  { icon: "🔧", rate: "AVG. 6–8% OF REVENUE", title: "Scrap & Rework", description: "Defects absorbed into overhead — never traced to root cause, never fixed." },
  { icon: "⏱", rate: "$8,000+ PER HOUR", title: "Unplanned Downtime", description: "Equipment stops that repeat every week because no one tracks why." },
  { icon: "🔀", rate: "30–40% LABOR WASTE", title: "Workflow Gaps", description: "Waiting, moving, searching — labor hours that add cost but zero value." },
  { icon: "📋", rate: "2–4 DAY DECISION LAG", title: "Manual Reporting", description: "Decisions made on yesterday's numbers, entered by hand into spreadsheets." },
  { icon: "📊", rate: "COMPOUNDS ANNUALLY", title: "No Operating System", description: "Strategy that never reaches the floor. Improvements that never hold." },
];

const whatWeFind: { number: string; title: string; description: string; rate: string; rateLabel: string }[] = [
  { number: "01", title: "Scrap Cost Hidden in Overhead", description: "Most plants account for scrap as a percentage of material cost and write it off. We calculate the true loaded cost: materials, labor, machine time, re-inspection, and rescheduling. The real number is almost always 2–3× what leadership assumes.", rate: "AVG. 4–8% OF GROSS REVENUE", rateLabel: "" },
  { number: "02", title: "Downtime Without Root Cause", description: "Unplanned downtime averages $8,000/hour in a mid-size facility. Without OEE tracking and root cause discipline, the same equipment fails the same way, shift after shift, year after year.", rate: "$8,000+ PER UNPLANNED HOUR", rateLabel: "NIST, 2023" },
  { number: "03", title: "Non-Value-Added Labor Time", description: "In facilities without structured workflow design, 30–40% of direct labor hours are spent on waiting, searching, walking, or reworking — not producing. We map it, price it, and eliminate it.", rate: "30–40% OF DIRECT LABOR HOURS", rateLabel: "MANUFACTURING INSTITUTE" },
  { number: "04", title: "Decision Lag from Manual Data", description: "When managers receive shift data 24–48 hours late, they manage the past instead of the present. We automate data collection so leadership has real-time visibility — every shift, every line.", rate: "48HR AVERAGE DATA LAG", rateLabel: "" },
];

const services: Service[] = [
  {
    tag: "FLAGSHIP",
    number: "01",
    titleLine1: "Factory Cash",
    titleLine2: "Recovery Audit™",
    titleItalic: true,
    description: "A structured on-site investigation that quantifies every source of waste — and delivers a prioritized, dollar-valued recovery roadmap in 4–6 weeks.",
    bullets: ["Full financial picture of operational waste", "Prioritized findings ranked by dollar impact", "Root cause analysis for top waste drivers", "90-day execution roadmap included"],
    cta: "REQUEST AN AUDIT",
  },
  {
    tag: "EXECUTION",
    number: "02",
    titleLine1: "Implementation",
    titleLine2: "Support",
    titleItalic: true,
    description: "We embed with your team and drive improvements from the floor up — scrap programs, workflow redesign, KPI systems, and management routines.",
    bullets: ["Scrap and rework reduction programs", "Workflow redesign and 5S implementation", "KPI boards and daily management routines", "Supervisor coaching and standard work"],
    cta: "LEARN MORE",
  },
  {
    tag: "PROPRIETARY SYSTEM",
    number: "03",
    titleLine1: "FORGE™",
    titleLine2: "Operating System",
    titleItalic: false,
    description: "Our manufacturing operating system installs the routines, KPI cascades, and accountability architecture that aligns strategy to the shop floor — permanently.",
    bullets: ["Strategy deployment from leadership to floor", "Daily, weekly, monthly management cadences", "Visual management infrastructure", "Problem-solving routines that build capability"],
    cta: "LEARN MORE",
  },
  {
    tag: "NEXT GENERATION",
    number: "04",
    titleLine1: "AI Process",
    titleLine2: "Automation",
    titleItalic: true,
    description: "Automated reporting, live dashboards, and AI-powered workflows built for the $5M–$50M plant — practical, affordable, deployed in weeks.",
    bullets: ["Automated daily production reports", "Live KPI dashboards on any device", "AI shift handoff and exception alerts", "Works with your existing ERP or spreadsheets"],
    cta: "LEARN MORE",
  },
];

export const resultsMetrics: { stat: string; label: string; description: string }[] = [
  { stat: "15–25%", label: "Average operational waste reduction per engagement", description: "" },
  { stat: "$400K+", label: "Average recoverable value found per audit — $10M–$20M plants", description: "" },
  { stat: "11×", label: "Typical ROI on a Factory Cash Recovery Audit™", description: "" },
  { stat: "60 days", label: "Average time to first measurable operational improvement", description: "" },
];

const clientResults: ResultCard[] = [
  {
    industry: "METAL FABRICATION · $14M REVENUE",
    title: "Waste Recovery in a Growing Fab Shop",
    description: "Recurring weld scrap, no downtime tracking, reports entered by hand 24 hours after each shift. The audit exposed $380K in annual recoverable waste in four weeks.",
    metrics: [
      { value: "$380K", label: "WASTE FOUND" },
      { value: "22%", label: "SCRAP REDUCTION" },
      { value: "11×", label: "ROI" },
    ],
  },
  {
    industry: "PLASTICS · $22M REVENUE",
    title: "KPI Visibility & FORGE™ Deployment",
    description: "No reliable data — decisions made on instinct. FORGE™ gave the plant manager live production visibility for the first time. OEE improved from 61% to 79% in six months.",
    metrics: [
      { value: "18%", label: "OEE GAIN" },
      { value: "$290K", label: "ANNUAL VALUE" },
      { value: "9×", label: "ROI" },
    ],
  },
  {
    industry: "ELECTRONICS ASSEMBLY · $8M REVENUE",
    title: "AI Automation of Shift Reporting",
    description: "Supervisors spent 3–4 hours per shift manually logging data. Full reporting automation delivered real-time visibility — zero manual entry, 20 hours saved per week.",
    metrics: [
      { value: "20hrs", label: "SAVED/WEEK" },
      { value: "100%", label: "AUTOMATED" },
      { value: "14×", label: "ROI" },
    ],
  },
];

const whyItems: WhyItem[] = [
  

  { icon: "fa-solid fa-people-pulling" , title: "Floor-Up Expertise", description: "Our consultants have worked inside manufacturing plants not just in boardrooms. We earn trust on the floor first." },
  { icon: "fa-solid fa-arrow-trend-up", title: "Built for Your Scale", description: "Frameworks, pricing, and timelines designed for $5M–$50M manufacturers not adapted down from Fortune 500 programs." },
  { icon: "fa-solid fa-arrow-up-right-dots", title: "Fast to Value", description: "Most clients see measurable improvement within 60 days. We prioritize high-impact, fast-win actions before long-cycle work." },
  { icon: "fa-solid fa-shield-alt", title: "Results-Backed", description: "If we don't find recoverable value that exceeds our fee, you don't pay the balance. That's how confident we are." },
];

const ticker = ["Cash Recovery Audit™", "FORGE™ Operating System", "AI Process Automation", "Scrap & Rework Reduction", "KPI Visibility Systems", "Management Routines"];

export { wasteItems, statsData, problemCards, whatWeFind, services, clientResults, whyItems, ticker };
