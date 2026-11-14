"use client";

import React, { useState } from "react";
import { SectionDivider } from "../common/SectionDivider";
import { FiligreeCorner } from "../common/Icons";
import { SpotlightCard } from "../common/SpotlightCard";
import {
  BarChart3,
  Kanban,
  Gauge,
  Receipt,
  ShieldCheck,
  CheckCircle2,
  Download,
  Flame,
  X,
  FileText,
  Printer,
  Sparkles,
  RefreshCw,
  Eye,
  Calendar,
  Clock,
  TrendingUp,
  CheckSquare,
  Square,
  Zap,
} from "lucide-react";
import { sound } from "@/lib/sound";
import confetti from "canvas-confetti";

interface LiveOrderItem {
  id: string;
  amount: string;
  roas: string;
  hub: string;
  time: string;
}

export function ClientPortalPreview() {
  const [activeTab, setActiveTab] = useState<"telemetry" | "kanban" | "speed" | "billing">("telemetry");
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "q3">("30d");
  const [metricMode, setMetricMode] = useState<"blended" | "first_order" | "contribution">("blended");
  const [scriptApproved, setScriptApproved] = useState<boolean>(false);
  const [activeModal, setActiveModal] = useState<"invoice" | "brief" | "scriptDetail" | "baithak" | null>(null);
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);
  const [isAuditingSpeed, setIsAuditingSpeed] = useState<boolean>(false);
  const [auditScore, setAuditScore] = useState<number>(99);
  const [selectedKeyword, setSelectedKeyword] = useState<string>("Banarasi Silk Saree Online");

  // Strategy checklist items in Tab 4
  const [strategyTasks, setStrategyTasks] = useState([
    { id: 1, text: "Scaling Meta ASC+ campaign budget from ₹15,000 to ₹25,000/day", done: true },
    { id: 2, text: "Deploy 4 vernacular Hinglish hook edits for festive bridal season", done: true },
    { id: 3, text: "Reduce Shopify checkout JS bundle, locking Mobile LCP under 0.7s", done: false },
    { id: 4, text: "Configure WhatsApp abandon cart recovery flow with 3-minute ping", done: false },
  ]);

  // Interactive Live Feeds
  const [liveOrders, setLiveOrders] = useState<LiveOrderItem[]>([
    {
      id: "DM-9428",
      amount: "₹3,499",
      roas: "6.2x",
      hub: "South Delhi Hub #04",
      time: "Just now",
    },
    {
      id: "DM-9427",
      amount: "₹5,200",
      roas: "7.8x",
      hub: "Mumbai Bandra West",
      time: "2m ago",
    },
    {
      id: "DM-9426",
      amount: "₹2,150",
      roas: "5.4x",
      hub: "Bengaluru Indiranagar",
      time: "5m ago",
    },
  ]);

  const tabs = [
    { id: "telemetry", label: "Live ROAS & Funnel Telemetry", icon: BarChart3 },
    { id: "kanban", label: "Reels Approval Pipeline", icon: Kanban },
    { id: "speed", label: "Web Speed & SEO Rank Tracker", icon: Gauge },
    { id: "billing", label: "GST Billing & Strategy Logs", icon: Receipt },
  ];

  // Dynamic telemetry data based on selected time range
  const telemetryData = {
    "7d": {
      spend: "₹1,15,000",
      rev: "₹6,90,000",
      roas: "6.0x Blended",
      cac: "₹320",
      cacDiff: "-34% vs Target",
      orders: "359 Orders",
      convRate: "4.1%",
      weeks: [
        { label: "Day 1-2", spend: 28, rev: 68, spendInr: "₹28,000", revInr: "₹1,68,000", roas: "6.0x" },
        { label: "Day 3-4", spend: 32, rev: 78, spendInr: "₹32,000", revInr: "₹1,95,000", roas: "6.1x" },
        { label: "Day 5-6", spend: 35, rev: 88, spendInr: "₹35,000", revInr: "₹2,10,000", roas: "6.0x" },
        { label: "Today", spend: 38, rev: 95, spendInr: "₹20,000", revInr: "₹1,17,000", roas: "5.85x" },
      ],
    },
    "30d": {
      spend: "₹4,50,000",
      rev: "₹23,40,000",
      roas: "5.2x Blended",
      cac: "₹380",
      cacDiff: "-28% vs Target",
      orders: "1,184 Orders",
      convRate: "3.8%",
      weeks: [
        { label: "Week 1", spend: 35, rev: 70, spendInr: "₹95,000", revInr: "₹4,94,000", roas: "5.2x" },
        { label: "Week 2", spend: 42, rev: 85, spendInr: "₹1,10,000", revInr: "₹5,72,000", roas: "5.2x" },
        { label: "Week 3", spend: 48, rev: 95, spendInr: "₹1,20,000", revInr: "₹6,36,000", roas: "5.3x" },
        { label: "Week 4", spend: 50, rev: 100, spendInr: "₹1,25,000", revInr: "₹6,38,000", roas: "5.1x" },
      ],
    },
    "q3": {
      spend: "₹14,20,000",
      rev: "₹80,94,000",
      roas: "5.7x Blended",
      cac: "₹345",
      cacDiff: "-32% vs Target",
      orders: "4,115 Orders",
      convRate: "3.9%",
      weeks: [
        { label: "Month 1", spend: 30, rev: 65, spendInr: "₹4,10,000", revInr: "₹23,37,000", roas: "5.7x" },
        { label: "Month 2", spend: 45, rev: 88, spendInr: "₹4,80,000", revInr: "₹27,36,000", roas: "5.7x" },
        { label: "Month 3", spend: 55, rev: 100, spendInr: "₹5,30,000", revInr: "₹30,21,000", roas: "5.7x" },
        { label: "Q4 Pace", spend: 60, rev: 110, spendInr: "₹6,00,000", revInr: "₹34,80,000", roas: "5.8x" },
      ],
    },
  };

  const currentMetrics = telemetryData[timeRange];

  const handleApproveScript = () => {
    sound.playChime();
    setScriptApproved(true);
    try {
      confetti({
        particleCount: 70,
        spread: 65,
        origin: { y: 0.6 },
        colors: ["#ffffff", "#e4e4e7", "#a1a1aa", "#71717a"],
      });
    } catch {}
  };

  const handleSimulateWebhook = () => {
    sound.playChime();
    const newId = `DM-${Math.floor(1000 + Math.random() * 9000)}`;
    const hubs = ["South Delhi Hub #04", "Gurugram Cyber City", "Hyderabad Jubilee Hills", "Pune Koregaon Park"];
    const amounts = ["₹4,890", "₹3,750", "₹6,200", "₹2,899"];
    const roasList = ["6.8x", "7.4x", "5.9x", "8.1x"];
    
    const randomOrder: LiveOrderItem = {
      id: newId,
      amount: amounts[Math.floor(Math.random() * amounts.length)],
      roas: roasList[Math.floor(Math.random() * roasList.length)],
      hub: hubs[Math.floor(Math.random() * hubs.length)],
      time: "Just now",
    };

    setLiveOrders((prev) => [randomOrder, ...prev.slice(0, 3)]);
  };

  const handleRunSpeedAudit = () => {
    sound.playPluck(180);
    setIsAuditingSpeed(true);
    setTimeout(() => {
      sound.playChime();
      setAuditScore(99);
      setIsAuditingSpeed(false);
    }, 900);
  };

  const toggleTask = (id: number) => {
    sound.playPluck(150);
    setStrategyTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const keywordRanks: Record<string, { pos: number; change: string; volume: string; url: string }> = {
    "Banarasi Silk Saree Online": { pos: 1, change: "+3 spots", volume: "44,000/mo", url: "/collections/banarasi" },
    "Pure Katan Silk Zari": { pos: 2, change: "+5 spots", volume: "18,200/mo", url: "/products/katan-zari" },
    "Bridal Saree Delhi NCR": { pos: 1, change: "+2 spots", volume: "22,500/mo", url: "/bridal-store" },
    "Artisanal Handloom Saree": { pos: 3, change: "+7 spots", volume: "12,800/mo", url: "/handloom" },
  };

  return (
    <section id="portal" className="relative py-28 sm:py-36 bg-[#09090b] text-white overflow-hidden border-t border-white/10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-white/[0.03] blur-[160px] pointer-events-none" />

      <SectionDivider label="INSIDE THE DARBAR" sublabel="CLIENT PORTAL PREVIEW" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-white/5 text-xs font-mono text-zinc-300 mb-4">
            <ShieldCheck className="w-4 h-4 text-white" />
            <span>RADICAL TRANSPARENCY • NO HIDDEN AGENCY MARGINS</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight text-white">
            Zero Ghosting.{" "}
            <span className="text-gradient-silver block mt-1">
              100% Hisab-Kitab.
            </span>
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base">
            Every client gets 24/7 access to our custom Darbar portal. Track ad metrics in real time, approve scripts in one click, and see exactly where every Rupee goes.
          </p>

          {/* 4 Tabs Selector with Silky Mobile Momentum Scroll */}
          <div className="mt-10 flex items-center justify-start sm:justify-center gap-2 p-1.5 rounded-2xl bg-[#121215] border border-white/15 max-w-2xl mx-auto scroll-momentum-x pb-2 sm:pb-1.5">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    sound.playPluck(150);
                    setActiveTab(tab.id as typeof activeTab);
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all interactive-scale-tap whitespace-nowrap shrink-0 min-h-[42px] ${
                    isActive
                      ? "bg-white text-black shadow-md"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* The Portal Mockup Window with iOS 3D Tilt Glassmorphism */}
        <SpotlightCard maxTilt={3} className="ios-glass-panel rounded-3xl p-5 sm:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.9)]">
          {/* Filigree corner brackets */}
          <div className="absolute top-3 left-3 opacity-30 pointer-events-none">
            <FiligreeCorner className="w-4 h-4 text-white" position="top-left" />
          </div>
          <div className="absolute top-3 right-3 opacity-30 pointer-events-none">
            <FiligreeCorner className="w-4 h-4 text-white" position="top-right" />
          </div>

          {/* Window Top Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-4 border-b border-white/10 font-mono text-xs text-zinc-400 gap-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-3 text-zinc-300">darbar.desimuchads.com/client-portal</span>
            </div>
            <div className="flex items-center gap-3">
              {/* Interactive Time Horizon Switcher */}
              <div className="flex items-center gap-1 bg-[#18181c] p-1 rounded-lg border border-white/10">
                {(["7d", "30d", "q3"] as const).map((range) => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => {
                      sound.playPluck(130);
                      setTimeRange(range);
                    }}
                    className={`px-3 py-1 rounded text-xs transition-all ${
                      timeRange === range
                        ? "bg-white text-black font-bold shadow-md"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {range === "7d" ? "7 Days" : range === "30d" ? "30 Days" : "Q3 Pace"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Live Telemetry Stream Ticker with Interactive Webhook Ping */}
          <div className="mb-6 p-2.5 sm:p-3 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between text-xs font-mono text-zinc-300">
            <div className="flex items-center gap-2 truncate">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-bold text-white uppercase tracking-wider shrink-0">
                LIVE STREAM
              </span>
              <span className="text-zinc-500">·</span>
              <span className="text-zinc-400 truncate text-[11px]">
                Order #{liveOrders[0].id} · {liveOrders[0].amount} via UPI · {liveOrders[0].roas} ROAS · {liveOrders[0].hub}
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0 ml-2">
              <button
                type="button"
                onClick={handleSimulateWebhook}
                className="px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white text-[10px] font-mono font-bold flex items-center gap-1 transition-all border border-white/15 active:scale-95"
                title="Simulate Incoming Webhook Order"
              >
                <Zap className="w-3 h-3 text-amber-300" />
                <span className="hidden sm:inline">Ping Order Event</span>
              </button>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full shrink-0">
                ⚡ 99.98% SLA
              </span>
            </div>
          </div>

          {/* TAB 1: Live ROAS & Funnel Telemetry */}
          {activeTab === "telemetry" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Metric Type Filters */}
              <div className="flex items-center justify-start sm:justify-end gap-1.5 overflow-x-auto pb-1 scroll-momentum-x text-[11px] font-mono">
                <span className="text-zinc-500 mr-1 shrink-0">Metric Mode:</span>
                <button
                  type="button"
                  onClick={() => {
                    sound.playPluck(140);
                    setMetricMode("blended");
                  }}
                  className={`px-3 py-1.5 rounded-lg border text-xs transition-colors whitespace-nowrap shrink-0 min-h-[38px] ${
                    metricMode === "blended"
                      ? "border-white bg-white/10 text-white font-bold"
                      : "border-white/10 text-zinc-400 hover:text-white"
                  }`}
                >
                  Blended Topline
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sound.playPluck(140);
                    setMetricMode("first_order");
                  }}
                  className={`px-3 py-1.5 rounded-lg border text-xs transition-colors whitespace-nowrap shrink-0 min-h-[38px] ${
                    metricMode === "first_order"
                      ? "border-white bg-white/10 text-white font-bold"
                      : "border-white/10 text-zinc-400 hover:text-white"
                  }`}
                >
                  First-Order CAC
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sound.playPluck(140);
                    setMetricMode("contribution");
                  }}
                  className={`px-3 py-1.5 rounded-lg border text-xs transition-colors whitespace-nowrap shrink-0 min-h-[38px] ${
                    metricMode === "contribution"
                      ? "border-white bg-white/10 text-white font-bold"
                      : "border-white/10 text-zinc-400 hover:text-white"
                  }`}
                >
                  Contribution Margin
                </button>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-[#18181c] border border-white/10">
                  <span className="text-[11px] font-mono text-zinc-400 block">Ad Spend ({timeRange.toUpperCase()})</span>
                  <div className="text-2xl font-display font-extrabold text-white mt-1">
                    {currentMetrics.spend}
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400">✦ 99.8% Paced Target</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#18181c] border border-white/10">
                  <span className="text-[11px] font-mono text-zinc-400 block">Net Attributed Revenue</span>
                  <div className="text-2xl font-display font-extrabold text-white mt-1">
                    {currentMetrics.rev}
                  </div>
                  <span className="text-[10px] font-mono text-zinc-300">✦ {currentMetrics.roas}</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#18181c] border border-white/10">
                  <span className="text-[11px] font-mono text-zinc-400 block">Customer Acq. Cost (CAC)</span>
                  <div className="text-2xl font-display font-extrabold text-white mt-1">
                    {currentMetrics.cac}
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400">✦ {currentMetrics.cacDiff}</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#18181c] border border-white/10">
                  <span className="text-[11px] font-mono text-zinc-400 block">Qualified Purchases</span>
                  <div className="text-2xl font-display font-extrabold text-white mt-1">
                    {currentMetrics.orders}
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400">✦ {currentMetrics.convRate} Conversion</span>
                </div>
              </div>

              {/* Dynamic Animated Chart Bars with Interactive Tooltips */}
              <div className="p-6 rounded-2xl bg-[#18181c] border border-white/10 relative">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="font-mono text-xs text-zinc-300 uppercase tracking-wider block font-bold">
                      Attributed Revenue vs. Ad Spend Trajectory
                    </span>
                    <span className="text-[11px] font-mono text-zinc-500">
                      Hover bars to inspect exact spend &amp; attributed returns
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                    Live Cloud Sync
                  </span>
                </div>

                <div className="h-48 flex items-end justify-between gap-4 pt-6 pb-2 border-b border-white/10 relative">
                  {currentMetrics.weeks.map((w, i) => (
                    <div
                      key={i}
                      onMouseEnter={() => {
                        sound.playPluck(130 + i * 15);
                        setHoveredBarIndex(i);
                      }}
                      onMouseLeave={() => setHoveredBarIndex(null)}
                      className="flex-1 flex flex-col items-center gap-2 relative cursor-pointer group"
                    >
                      {/* Interactive Hover Tooltip */}
                      {hoveredBarIndex === i && (
                        <div className="absolute -top-12 z-30 px-3 py-1.5 rounded-lg bg-black border border-white/30 text-center shadow-xl animate-in zoom-in-95 duration-150 pointer-events-none whitespace-nowrap">
                          <span className="text-[11px] font-mono font-bold text-white block">
                            Rev: {w.revInr} · Spend: {w.spendInr}
                          </span>
                          <span className="text-[9px] font-mono text-emerald-400">
                            Effective Return: {w.roas}
                          </span>
                        </div>
                      )}

                      <div className="w-full flex items-end justify-center gap-2 h-36">
                        <div
                          className="w-4 sm:w-8 bg-zinc-700 rounded-t-md transition-all duration-300 group-hover:bg-zinc-500"
                          style={{ height: `${w.spend}%` }}
                          title={`Spend: ${w.spend}%`}
                        />
                        <div
                          className="w-4 sm:w-8 bg-white rounded-t-md transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.2)] group-hover:bg-zinc-200 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                          style={{ height: `${w.rev}%` }}
                          title={`Revenue: ${w.rev}%`}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-zinc-400 group-hover:text-white transition-colors">
                        {w.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Modern Web Guidance: Semantic accessible data table alternative for screen readers */}
                <table className="sr-only-accessible-table">
                  <caption>Attributed Revenue vs. Ad Spend Trajectory Data</caption>
                  <thead>
                    <tr>
                      <th scope="col">Period</th>
                      <th scope="col">Ad Spend</th>
                      <th scope="col">Attributed Revenue</th>
                      <th scope="col">ROAS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentMetrics.weeks.map((w, idx) => (
                      <tr key={idx}>
                        <td>{w.label}</td>
                        <td>{w.spendInr}</td>
                        <td>{w.revInr}</td>
                        <td>{w.roas}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="flex items-center justify-center gap-6 mt-3 font-mono text-xs text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-zinc-700" />
                    <span>Ad Spend</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-white" />
                    <span>Attributed Revenue</span>
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Creative & Reels Approval Pipeline */}
          {activeTab === "kanban" && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Column 1: Ideation */}
                <div className="p-4 rounded-2xl bg-[#18181c] border border-white/10 space-y-3">
                  <span className="font-mono text-xs text-zinc-300 font-bold block">
                    1. IDEATION (3)
                  </span>
                  <div className="p-3 rounded-xl bg-[#121215] border border-white/10 text-xs space-y-1">
                    <span className="text-[10px] font-mono text-zinc-400">Reel Script</span>
                    <p className="font-bold text-white">&ldquo;5 Wedding Saree Mistakes NRI Brides Make&rdquo;</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#121215] border border-white/10 text-xs space-y-1">
                    <span className="text-[10px] font-mono text-zinc-400">Meta Static</span>
                    <p className="font-bold text-white">&ldquo;Before vs After Pure Katan Silk Texture&rdquo;</p>
                  </div>
                </div>

                {/* Column 2: Shooting */}
                <div className="p-4 rounded-2xl bg-[#18181c] border border-white/10 space-y-3">
                  <span className="font-mono text-xs text-zinc-300 font-bold block">
                    2. SHOOTING (2)
                  </span>
                  <div className="p-3 rounded-xl bg-[#121215] border border-white/10 text-xs space-y-1">
                    <span className="text-[10px] font-mono text-zinc-400">Studio Shoot</span>
                    <p className="font-bold text-white">&ldquo;Varanasi Loom Documentary B-Roll 4K&rdquo;</p>
                  </div>
                </div>

                {/* Column 3: Ready for Client Review (Interactive Approval) */}
                <div className="p-4 rounded-2xl bg-[#18181c] border border-white/30 space-y-3">
                  <span className="font-mono text-xs text-white font-bold block">
                    3. READY FOR REVIEW (1)
                  </span>
                  <div className="p-3.5 rounded-xl bg-[#121215] border border-white/20 text-xs space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-zinc-300">
                        {scriptApproved ? "Status: In Production" : "Needs Your Thumbs-Up"}
                      </span>
                      <Flame className="w-3.5 h-3.5 text-white" />
                    </div>
                    <p className="font-bold text-white">&ldquo;Dilli Street Roast Viral Hook Cut v3&rdquo;</p>
                    
                    <button
                      type="button"
                      onClick={() => {
                        sound.playPluck(160);
                        setActiveModal("scriptDetail");
                      }}
                      className="text-[11px] font-mono text-zinc-400 hover:text-white flex items-center gap-1 underline underline-offset-4"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Read 3-Second Hook &amp; Pitch</span>
                    </button>

                    {scriptApproved ? (
                      <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono flex items-center justify-between animate-in zoom-in-95 duration-200">
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          <span>Approved! Pushed to Studio</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            sound.playPluck(130);
                            setScriptApproved(false);
                          }}
                          className="text-[9px] text-zinc-400 hover:text-white underline ml-2"
                        >
                          Reset
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={handleApproveScript}
                        type="button"
                        className="btn-luxury-shine w-full py-2.5 rounded-lg bg-white text-black text-[11px] font-mono font-bold hover:bg-zinc-200 transition-all active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.2)] flex items-center justify-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-black" />
                        <span>Approve Script (One-Click)</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Column 4: Live & Scaling */}
                <div className="p-4 rounded-2xl bg-[#18181c] border border-white/10 space-y-3">
                  <span className="font-mono text-xs text-zinc-300 font-bold block">
                    4. LIVE & SCALING (4)
                  </span>
                  <div className="p-3 rounded-xl bg-[#121215] border border-white/10 text-xs space-y-1">
                    <span className="text-[10px] font-mono text-zinc-400">✦ 5.4x ROAS</span>
                    <p className="font-bold text-white">&ldquo;Bridal Kundli Quiz Funnel Hook&rdquo;</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#121215] border border-white/10 text-xs space-y-1">
                    <span className="text-[10px] font-mono text-zinc-400">✦ 4.9x ROAS</span>
                    <p className="font-bold text-white">&ldquo;Organic Chaiwala Street Drama&rdquo;</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Web Speed & SEO Rank Tracker */}
          {activeTab === "speed" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-[#18181c] border border-white/15 text-center relative">
                  <span className="font-mono text-xs text-zinc-400 block mb-2">Core Web Vitals Speed</span>
                  <div className="text-4xl font-display font-extrabold text-white">
                    {isAuditingSpeed ? (
                      <span className="animate-pulse text-zinc-400 text-2xl font-mono">Running audit...</span>
                    ) : (
                      `${auditScore}/100`
                    )}
                  </div>
                  <span className="text-xs font-mono text-zinc-400 mt-2 block">LCP 0.6s • INP 14ms • CLS 0.00</span>

                  <button
                    type="button"
                    onClick={handleRunSpeedAudit}
                    disabled={isAuditingSpeed}
                    className="mt-4 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs flex items-center justify-center gap-1.5 mx-auto transition-all"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isAuditingSpeed ? "animate-spin" : ""}`} />
                    <span>{isAuditingSpeed ? "Testing Mobile Speed..." : "Run Live Speed Audit"}</span>
                  </button>
                </div>

                <div className="p-6 rounded-2xl bg-[#18181c] border border-white/15 text-center">
                  <span className="font-mono text-xs text-zinc-400 block mb-2">Top 3 Google Rankings</span>
                  <div className="text-4xl font-display font-extrabold text-white">42 Keywords</div>
                  <span className="text-xs font-mono text-emerald-400 mt-2 block">+18 Climbed This Month</span>
                  <span className="text-[10px] font-mono text-zinc-500 mt-2 block">All Top 3 Spots Dominated</span>
                </div>

                <div className="p-6 rounded-2xl bg-[#18181c] border border-white/15 text-center">
                  <span className="font-mono text-xs text-zinc-400 block mb-2">AI GEO Engine Visibility</span>
                  <div className="text-4xl font-display font-extrabold text-white">88% Share</div>
                  <span className="text-xs font-mono text-zinc-400 mt-2 block">Recommended in Perplexity &amp; ChatGPT</span>
                  <span className="text-[10px] font-mono text-zinc-500 mt-2 block">Generative Engine Optimization (GEO)</span>
                </div>
              </div>

              {/* Interactive Keyword Position Explorer */}
              <div className="p-5 rounded-2xl bg-[#18181c] border border-white/10">
                <span className="font-mono text-xs text-zinc-300 uppercase tracking-wider block font-bold mb-3">
                  Live SERP Keyword Ranks (Click keyword to inspect)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {Object.entries(keywordRanks).map(([kw, data]) => {
                    const isSelected = selectedKeyword === kw;
                    return (
                      <button
                        key={kw}
                        type="button"
                        onClick={() => {
                          sound.playPluck(140);
                          setSelectedKeyword(kw);
                        }}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? "bg-white text-black border-white shadow-md font-bold"
                            : "bg-[#121215] border-white/10 text-zinc-300 hover:border-white/30"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-[10px] font-mono ${isSelected ? "text-zinc-700" : "text-emerald-400"}`}>
                            Rank #{data.pos} ({data.change})
                          </span>
                          <TrendingUp className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs block font-bold truncate">{kw}</span>
                        <span className={`text-[10px] font-mono block mt-1 ${isSelected ? "text-zinc-600" : "text-zinc-500"}`}>
                          Vol: {data.volume}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Transparent Billing & Reports */}
          {activeTab === "billing" && (
            <div className="space-y-4 animate-in fade-in duration-300 font-mono text-xs">
              <div className="p-4 rounded-2xl bg-[#18181c] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-white font-bold block text-sm">Tax Invoice: DM-2026-NOV-042 (GST Compliant)</span>
                  <span className="text-zinc-400 text-[11px]">Monthly Shahi Growth Retainer • ₹1,75,000 + 18% GST (SAC: 998311)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1 text-emerald-400 font-bold text-xs bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/30">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Paid
                  </span>
                  <button
                    onClick={() => {
                      sound.playPluck(170);
                      setActiveModal("invoice");
                    }}
                    type="button"
                    className="px-3 py-1.5 rounded-lg border border-white/20 text-zinc-300 hover:text-white hover:border-white/50 bg-white/5 flex items-center gap-1.5 transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Invoice</span>
                  </button>
                </div>
              </div>

              {/* Interactive Weekly Strategy War-Room Task Checklist */}
              <div className="p-5 rounded-2xl bg-[#18181c] border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-white font-bold block text-sm">Weekly Strategy War-Room Directives</span>
                    <span className="text-zinc-400 text-[11px]">Interactive Action Items for Current Sprint</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        sound.playPluck(170);
                        setActiveModal("brief");
                      }}
                      type="button"
                      className="px-3 py-1.5 rounded-lg border border-white/20 text-zinc-300 hover:text-white hover:border-white/50 bg-white/5 flex items-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Full PDF Dossier</span>
                    </button>
                    <button
                      onClick={() => {
                        sound.playPluck(180);
                        setActiveModal("baithak");
                      }}
                      type="button"
                      className="px-3 py-1.5 rounded-lg bg-white text-black font-bold flex items-center gap-1.5 hover:bg-zinc-200 transition-colors"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Baithak</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-white/10">
                  {strategyTasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                    >
                      {task.done ? (
                        <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <Square className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                      )}
                      <span className={`text-xs ${task.done ? "line-through text-zinc-500" : "text-zinc-200"}`}>
                        {task.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </SpotlightCard>
      </div>

      {/* Interactive Invoice / Strategy / Script Modals */}
      {activeModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl max-h-[92dvh] overflow-y-auto overscroll-contain bg-[#101013] border border-white/20 rounded-2xl p-5 sm:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.95)]">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-white" />
                <h3 className="font-display font-extrabold text-base uppercase text-white">
                  {activeModal === "invoice" && "GST Tax Invoice Preview"}
                  {activeModal === "brief" && "Strategy War-Room Brief"}
                  {activeModal === "scriptDetail" && "Script Breakdown & Creative Angle"}
                  {activeModal === "baithak" && "Schedule Emergency Growth Baithak"}
                </h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {activeModal === "invoice" && (
              <div className="py-6 space-y-4 font-mono text-xs text-zinc-300">
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <div>
                    <span className="text-white font-bold block">DESI MUCHADS DIGITAL LLP</span>
                    <span className="text-[11px] text-zinc-500">GSTIN: 07AAECD5582M1ZX</span>
                  </div>
                  <div className="text-right">
                    <span className="text-white font-bold block">Invoice #DM-2026-NOV-042</span>
                    <span className="text-[11px] text-zinc-500">Date: 01 Nov 2026</span>
                  </div>
                </div>

                <div className="space-y-2 py-2">
                  <div className="flex justify-between text-zinc-400">
                    <span>Performance Architecture Retainer (SAC 998311)</span>
                    <span className="text-white">₹1,75,000.00</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>IGST (18%)</span>
                    <span className="text-white">₹31,500.00</span>
                  </div>
                  <div className="flex justify-between text-white font-bold border-t border-white/10 pt-2 text-sm">
                    <span>Total Paid</span>
                    <span>₹2,06,500.00</span>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between text-[11px] text-zinc-500 border-t border-white/10">
                  <span>Digitally Signed &amp; Bank Verified</span>
                  <button
                    onClick={() => {
                      sound.playChime();
                      window.print();
                    }}
                    type="button"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-black font-bold hover:bg-zinc-200"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Receipt</span>
                  </button>
                </div>
              </div>
            )}

            {activeModal === "brief" && (
              <div className="py-6 space-y-4 text-xs font-sans text-zinc-300">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 font-mono text-[11px] text-zinc-400">
                  <span className="text-white font-bold block mb-1">Key Action Directives (Nov W1):</span>
                  1. Scaling Meta ASC+ campaign budget from ₹15,000 to ₹25,000/day after 5.4x ROAS stability.<br />
                  2. Deployed 4 new vernacular Hinglish hook edits for Diwali gift hamper collection.<br />
                  3. Reduced Shopify checkout JS payloads, bringing Mobile LCP to 0.7 seconds.
                </div>
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setActiveModal(null)}
                    type="button"
                    className="px-4 py-2 rounded-xl bg-white text-black font-bold font-mono text-xs"
                  >
                    Close Dossier
                  </button>
                </div>
              </div>
            )}

            {activeModal === "scriptDetail" && (
              <div className="py-6 space-y-4 font-mono text-xs text-zinc-300">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-zinc-400">
                    <span className="text-white font-bold">Script Title: &ldquo;Dilli Street Roast v3&rdquo;</span>
                    <span className="text-amber-400">Angle: Street Humor + Authentic Heritage</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-black/50 border border-white/10 text-[11px] space-y-1.5">
                    <span className="text-zinc-500 uppercase tracking-widest block font-bold">0-3s Hook:</span>
                    <p className="text-white italic">&ldquo;Agar aapki Dadi ne banarsi saree Chandni Chowk se nahi li, toh kya sach mein li?&rdquo;</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-black/50 border border-white/10 text-[11px] space-y-1.5">
                    <span className="text-zinc-500 uppercase tracking-widest block font-bold">3-15s Proof:</span>
                    <p className="text-zinc-300">Micro-zoom on zari weave, pure silk burn test comparison, direct loom artisan interview clip.</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-black/50 border border-white/10 text-[11px] space-y-1.5">
                    <span className="text-zinc-500 uppercase tracking-widest block font-bold">15-30s CTA:</span>
                    <p className="text-white">Direct checkout with COD + 7-Day Doorstep Trial guarantee.</p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-[11px] text-zinc-500">Projected CAC: ₹310 | Target ROAS: 6.2x</span>
                  <button
                    onClick={() => {
                      handleApproveScript();
                      setActiveModal(null);
                    }}
                    type="button"
                    className="px-4 py-2 rounded-xl bg-white text-black font-bold font-mono text-xs hover:bg-zinc-200"
                  >
                    Approve Script Now
                  </button>
                </div>
              </div>
            )}

            {activeModal === "baithak" && (
              <div className="py-6 space-y-4 font-mono text-xs text-zinc-300">
                <p className="text-zinc-400">
                  Select a priority slot for a 30-minute private strategy war-room with our Principal Performance Architect:
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    "Today · 4:30 PM IST",
                    "Today · 6:00 PM IST",
                    "Tomorrow · 11:30 AM IST",
                    "Tomorrow · 3:00 PM IST",
                  ].map((slot, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        sound.playChime();
                        window.open(
                          `https://wa.me/919999999999?text=${encodeURIComponent(
                            `Pranam Desi Muchads! I would like to lock in the Strategy Baithak slot: ${slot}`
                          )}`,
                          "_blank"
                        );
                        setActiveModal(null);
                      }}
                      className="p-3 rounded-xl bg-white/5 border border-white/15 hover:border-white/50 hover:bg-white/10 text-left transition-all"
                    >
                      <div className="flex items-center gap-1.5 text-white font-bold mb-1">
                        <Clock className="w-3.5 h-3.5 text-zinc-400" />
                        <span>{slot}</span>
                      </div>
                      <span className="text-[10px] text-emerald-400">✦ Instant Google Meet</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
