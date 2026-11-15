"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  PhoneCall,
  Mail,
  Globe,
  CheckCircle2,
  MessageCircle,
  Layers,
  ShieldCheck,
  Check,
  Copy,
  Sliders,
  Compass,
  Zap,
  Award,
} from "lucide-react";
import { sound } from "@/lib/sound";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";
import { BrandKundliModal } from "@/components/kundli/BrandKundliModal";

interface DateOption {
  date: Date;
  isoString: string;
  dayName: string;
  dayNumber: number;
  monthName: string;
  year: number;
  badge?: string;
  isWeekend: boolean;
}

const TIME_SLOTS = [
  {
    period: "Morning Deep Dive",
    icon: "🌅",
    slots: [
      { time: "11:00 AM IST", status: "Optimal" },
      { time: "11:45 AM IST", status: "Available" },
    ],
  },
  {
    period: "Afternoon Scaling Strategy",
    icon: "☀️",
    slots: [
      { time: "02:30 PM IST", status: "Filling Fast" },
      { time: "03:30 PM IST", status: "Available" },
    ],
  },
  {
    period: "Golden Hour Unit Economics",
    icon: "🌆",
    slots: [
      { time: "05:00 PM IST", status: "Recommended" },
      { time: "06:00 PM IST", status: "Available" },
    ],
  },
  {
    period: "Late War-Room Baithak",
    icon: "🌙",
    slots: [
      { time: "07:30 PM IST", status: "Executive Only" },
      { time: "08:30 PM IST", status: "Available" },
    ],
  },
];

// Helper to convert time string e.g. "02:30 PM IST" into minutes from midnight
const parseSlotMinutes = (slotStr: string): number => {
  const match = slotStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return 0;
  let h = parseInt(match[1], 10);
  const m = parseInt(match[2], 10);
  const isPM = match[3].toUpperCase() === "PM";
  if (isPM && h !== 12) h += 12;
  if (!isPM && h === 12) h = 0;
  return h * 60 + m;
};

const INDUSTRIES = [
  "D2C E-Commerce & Retail",
  "Fashion, Apparel & Luxury",
  "Ayurveda & Organic Wellness",
  "Fine Horology & Bespoke Jewelry",
  "Quick Commerce & Cloud Kitchens",
  "High-Ticket B2B & Lead Gen",
  "Next.js Tech & SaaS",
];

const SERVICES_CATALOG = [
  {
    id: "meta-ads",
    title: "Meta & Instagram ROAS Engine",
    desc: "CBO architecture, creative fatigue defense, 5.8x blended ROAS.",
    tier: "Scale",
  },
  {
    id: "google-sem",
    title: "High-Intent Google Ads & Search",
    desc: "Precision shopping, P-Max audit, exact negative keyword shields.",
    tier: "Intent",
  },
  {
    id: "q-commerce",
    title: "Quick Commerce Scaling (Zepto & Blinkit)",
    desc: "Dark store catalog indexing, in-app brand search dominance.",
    tier: "Instant",
  },
  {
    id: "video-reels",
    title: "Viral Video Ads & UGC Reels",
    desc: "Scripting, cinematic production, thumb-stopping 3-second hooks.",
    tier: "Creative",
  },
  {
    id: "nextjs-web",
    title: "Full-Stack Next.js 16 Web Engineering",
    desc: "Sub-second load times, 99 Mobile PageSpeed, zero checkout friction.",
    tier: "Code",
  },
  {
    id: "brand-identity",
    title: "Luxury Brand Identity & Packaging",
    desc: "Sacred geometry packaging, vector typography, luxury foil labels.",
    tier: "Craft",
  },
];

export default function ContactPage() {
  const [isKundliOpen, setIsKundliOpen] = useState(false);
  const WHATSAPP_NUMBER = "9180252831";
  const WHATSAPP_DISPLAY = "+91 9180252831";
  const OFFICIAL_EMAIL = "thedesimuchads@gmail.com";

  // Live IST Time
  const [liveIstTime, setLiveIstTime] = useState("");
  const [currentIstTime, setCurrentIstTime] = useState<{
    dateStr: string;
    minutes: number;
  } | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setLiveIstTime(new Intl.DateTimeFormat("en-IN", options).format(now));

      const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      }).formatToParts(now);

      const year = parts.find((p) => p.type === "year")?.value || "";
      const month = parts.find((p) => p.type === "month")?.value || "";
      const day = parts.find((p) => p.type === "day")?.value || "";
      const hour = parseInt(parts.find((p) => p.type === "hour")?.value || "0", 10);
      const minute = parseInt(parts.find((p) => p.type === "minute")?.value || "0", 10);

      const dateStr = `${year}-${month}-${day}`;
      const minutes = hour * 60 + minute;

      setCurrentIstTime({ dateStr, minutes });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Deterministic default calendar days for SSR stability
  const [calendarDays, setCalendarDays] = useState<DateOption[]>(() => {
    const days: DateOption[] = [];
    const baseEpoch = 1731715200000;
    for (let i = 0; i < 30; i++) {
      const d = new Date(baseEpoch + i * 86400000);
      days.push({
        date: d,
        isoString: `2026-11-${String(i + 16).padStart(2, "0")}`,
        dayName: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i % 7],
        dayNumber: (i % 28) + 1,
        monthName: "Nov",
        year: 2026,
        badge: i === 0 ? "TODAY" : i === 1 ? "FASTEST" : i === 2 ? "RECOMMENDED" : undefined,
        isWeekend: (i % 7) >= 5,
      });
    }
    return days;
  });

  const [selectedDate, setSelectedDate] = useState<DateOption>(() => calendarDays[1]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("02:30 PM IST");

  // Hydrate calendar with live current dates on client mount asynchronously
  useEffect(() => {
    const timer = setTimeout(() => {
      const today = new Date();
      const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      }).formatToParts(today);

      const hour = parseInt(parts.find((p) => p.type === "hour")?.value || "0", 10);
      const minute = parseInt(parts.find((p) => p.type === "minute")?.value || "0", 10);
      const currentMins = hour * 60 + minute;
      const isTodayClosed = currentMins >= 1230; // 08:30 PM IST is 1230 mins

      const days: DateOption[] = [];
      for (let i = 0; i < 30; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        const dayName = d.toLocaleDateString("en-IN", { weekday: "short" });
        const dayNumber = d.getDate();
        const monthName = d.toLocaleDateString("en-IN", { month: "short" });
        const y = d.getFullYear();
        const isWeekend = d.getDay() === 0 || d.getDay() === 6;

        let badge: string | undefined = undefined;
        if (i === 0) {
          badge = isTodayClosed ? "CLOSED" : "TODAY";
        } else if (i === 1) {
          badge = isTodayClosed ? "EARLIEST" : "FASTEST";
        } else if (i === 2) {
          badge = "RECOMMENDED";
        } else if (d.getDay() === 5) {
          badge = "WAR-ROOM";
        }

        const isoString = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
          d.getDate()
        ).padStart(2, "0")}`;

        days.push({
          date: d,
          isoString,
          dayName,
          dayNumber,
          monthName,
          year: y,
          badge,
          isWeekend,
        });
      }

      setCalendarDays(days);

      // If today is completely closed, pick tomorrow (days[1]), else pick today (days[0])
      const initialDay = isTodayClosed && days[1] ? days[1] : days[0];
      setSelectedDate(initialDay);

      // Initial slot selection
      if (!isTodayClosed) {
        let openSlot = "11:00 AM IST";
        for (const grp of TIME_SLOTS) {
          for (const s of grp.slots) {
            if (parseSlotMinutes(s.time) > currentMins) {
              openSlot = s.time;
              break;
            }
          }
          if (openSlot !== "11:00 AM IST") break;
        }
        setSelectedTimeSlot(openSlot);
      } else {
        setSelectedTimeSlot("11:00 AM IST");
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Check if currently selected date is today in IST
  const isSelectedDateToday = useMemo(() => {
    if (!currentIstTime) return false;
    return selectedDate.isoString === currentIstTime.dateStr;
  }, [selectedDate.isoString, currentIstTime]);

  // Check if a specific slot has already passed for today
  const isSlotExpired = (slotStr: string): boolean => {
    if (!isSelectedDateToday || !currentIstTime) return false;
    const slotMins = parseSlotMinutes(slotStr);
    return slotMins <= currentIstTime.minutes;
  };

  // Available slots for today
  const availableSlotsForToday = useMemo(() => {
    if (!currentIstTime) return [];
    const valid: string[] = [];
    for (const grp of TIME_SLOTS) {
      for (const s of grp.slots) {
        if (parseSlotMinutes(s.time) > currentIstTime.minutes) {
          valid.push(s.time);
        }
      }
    }
    return valid;
  }, [currentIstTime]);

  const allSlotsExpiredToday = useMemo(() => {
    if (!currentIstTime) return false;
    return availableSlotsForToday.length === 0;
  }, [availableSlotsForToday, currentIstTime]);

  // Derive effective active time slot so past slots on today are never selected
  const effectiveTimeSlot = useMemo(() => {
    if (!isSelectedDateToday || !currentIstTime) return selectedTimeSlot;
    const isCurrentExpired = parseSlotMinutes(selectedTimeSlot) <= currentIstTime.minutes;
    if (isCurrentExpired && availableSlotsForToday.length > 0) {
      return availableSlotsForToday[0];
    }
    return selectedTimeSlot;
  }, [isSelectedDateToday, currentIstTime, selectedTimeSlot, availableSlotsForToday]);

  // Interactive Quotation States
  const [monthlyBudget, setMonthlyBudget] = useState<number>(350000); // 3.5 Lakhs default
  const [selectedIndustry, setSelectedIndustry] = useState<string>("D2C E-Commerce & Retail");
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "meta-ads",
    "google-sem",
    "video-reels",
  ]);

  // Lead Information
  const [clientName, setClientName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [brandUrl, setBrandUrl] = useState("");
  const [contactWhatsapp, setContactWhatsapp] = useState("");
  const [customNotes, setCustomNotes] = useState("");

  const [copiedNotification, setCopiedNotification] = useState(false);

  // Toggle Services
  const handleToggleService = (serviceId: string) => {
    sound.playPluck(150);
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((s) => s !== serviceId) : [...prev, serviceId]
    );
  };

  // Format INR Currency
  const formatINR = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr / mo`;
    }
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(1)} Lakhs / mo`;
    }
    return `₹${val.toLocaleString("en-IN")} / mo`;
  };

  // Compile Comprehensive WhatsApp Message Payload
  const generateWhatsAppMessage = () => {
    const selectedServiceTitles = SERVICES_CATALOG.filter((s) =>
      selectedServices.includes(s.id)
    ).map((s) => `• ${s.title}`);

    const formattedDate = `${selectedDate.dayName}, ${selectedDate.dayNumber} ${selectedDate.monthName} ${selectedDate.year}`;

    const text =
      `Pranam Desi Muchads! 🙏\n\n` +
      `Here is my Strategic Quotation & Baithak Booking:\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `👤 Contact Name: ${clientName.trim() || "Founder / Growth Lead"}\n` +
      `🏢 Brand Name: ${brandName.trim() || "Confidential Brand"}\n` +
      `🌐 Website/Store: ${brandUrl.trim() || "Not specified yet"}\n` +
      `💼 Industry: ${selectedIndustry}\n` +
      `📱 Contact Phone: ${contactWhatsapp.trim() || "Via WhatsApp"}\n` +
      `✉️ Direct Inquiries: ${OFFICIAL_EMAIL}\n\n` +
      `📊 PROPOSED MONTHLY AD FUEL:\n` +
      `💰 Budget: ${formatINR(monthlyBudget)}\n\n` +
      `🎯 SELECTED DELIVERABLES (${selectedServices.length}):\n` +
      `${selectedServiceTitles.join("\n")}\n\n` +
      `🗓️ STRATEGIC BAITHAK APPOINTMENT:\n` +
      `📅 Date: ${formattedDate}\n` +
      `⏰ Slot: ${effectiveTimeSlot}\n` +
      (customNotes.trim() ? `\n📝 Specific Notes: ${customNotes.trim()}\n` : "") +
      `━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `Unit of Desi Muchads Digital LLP • Ruthless Global ROI.`;

    return text;
  };

  const handleSendToWhatsApp = () => {
    if (isSelectedDateToday && allSlotsExpiredToday) {
      sound.playPluck(120);
      alert(
        "All Baithak slots for today have concluded. Please select tomorrow or an upcoming date to confirm your appointment!"
      );
      return;
    }
    if (isSelectedDateToday && isSlotExpired(effectiveTimeSlot)) {
      sound.playPluck(120);
      alert("The selected time slot has already passed for today. Please pick an open upcoming slot.");
      return;
    }
    sound.playChime();
    const message = generateWhatsAppMessage();
    const url = `https://wa.me/91${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handleCopyClipboard = () => {
    sound.playPluck(180);
    const message = generateWhatsAppMessage();
    navigator.clipboard.writeText(message);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);
  };

  const handleAddToCalendar = () => {
    sound.playChime();
    const formattedDate = `${selectedDate.dayName}, ${selectedDate.dayNumber} ${selectedDate.monthName} ${selectedDate.year}`;
    const title = encodeURIComponent(
      `Desi Muchads Strategy Baithak · ${brandName || "Brand Scaling"}`
    );
    const details = encodeURIComponent(
      `Confidential Strategy Baithak with Desi Muchads Digital Leadership.\n` +
        `Appointment Slot: ${formattedDate} at ${effectiveTimeSlot}.\n` +
        `Direct Founder Desk: +91 9180252831\n` +
        `Deliverables: ${SERVICES_CATALOG.filter((s) => selectedServices.includes(s.id))
          .map((s) => s.title)
          .join(", ")}`
    );
    const location = encodeURIComponent("Google Meet / Desi Muchads Executive Boardroom");
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
    window.open(googleCalendarUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#070709] text-white selection:bg-white selection:text-black">
      <Navbar onOpenKundli={() => setIsKundliOpen(true)} />

      <main className="min-h-screen bg-[#070709] text-white pt-28 sm:pt-32 pb-24 font-display relative overflow-hidden select-none">
        {/* Background Decorative Gradients & Watermark */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.035] grayscale mix-blend-screen overflow-hidden">
          <img
            src="/art/indian-art-bg-royal.jpg"
            alt="Desi Heritage Watermark"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070709] via-transparent to-[#070709]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header Breadcrumb & Tag */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-8 border-b border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-widest">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-white font-bold">Contact Us &amp; Live Appointment</span>
            </div>

            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 text-xs font-mono text-zinc-300">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>LIVE IST // {liveIstTime || "06:00:00 PM"}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          </div>

          {/* Hero Section */}
          <div className="mb-14 text-left max-w-4xl space-y-4">
            <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight uppercase leading-[0.96] text-white">
              Schedule Your Baithak. <br />
              <span className="text-zinc-400">Lock In Your Quotation.</span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 font-sans font-normal leading-relaxed max-w-3xl">
              Choose your preferred date and time slot below, configure your custom performance
              marketing requirements, and dispatch your complete proposal directly to our official
              agency WhatsApp number at{" "}
              <strong className="text-white font-bold">{WHATSAPP_DISPLAY}</strong>. Zero junior
              gatekeepers, 100% executive access.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                15-Min Executive SLA
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10">
                <Award className="w-3.5 h-3.5 text-white" />
                100% NDA Protection
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10">
                <Zap className="w-3.5 h-3.5 text-amber-300" />
                Direct Founder Dispatch
              </span>
            </div>
          </div>

          {/* Main 2-Column Responsive Cockpit */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT COLUMN: Live Calendar & Time Slot Booking (7 Cols) */}
            <div className="lg:col-span-7 space-y-8 text-left">
              {/* Step 1: 30-Day Live Dynamic Date Carousel */}
              <div className="p-6 sm:p-7 rounded-2xl bg-white/[0.03] border border-white/15 backdrop-blur-md shadow-2xl relative">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                      <CalendarIcon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h2 className="font-display font-black text-sm uppercase tracking-wider text-white">
                        1. Select Baithak Date
                      </h2>
                      <p className="text-[11px] font-sans text-zinc-400">
                        Real-time availability for the next 30 days
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold text-white px-2.5 py-1 rounded-full bg-white/10 border border-white/20">
                    {selectedDate.dayName}, {selectedDate.dayNumber} {selectedDate.monthName}
                  </span>
                </div>

                {/* Horizontal Scrollable 30-Day Strip */}
                <div className="flex gap-2.5 overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-white/20">
                  {calendarDays.map((item) => {
                    const isSelected = item.isoString === selectedDate.isoString;
                    return (
                      <button
                        key={item.isoString}
                        type="button"
                        onClick={() => {
                          sound.playPluck(150);
                          setSelectedDate(item);
                        }}
                        className={`relative min-w-[76px] py-3 px-2 rounded-xl flex flex-col items-center justify-center transition-all border shrink-0 text-center ${
                          isSelected
                            ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-105 font-bold"
                            : "bg-white/[0.04] text-zinc-300 border-white/10 hover:border-white/30 hover:bg-white/[0.08]"
                        }`}
                      >
                        {item.badge && (
                          <span
                            className={`absolute -top-2 text-[8px] font-mono font-black uppercase px-1.5 py-0.5 rounded-full tracking-wider ${
                              isSelected
                                ? "bg-black text-white border border-black"
                                : item.badge === "CLOSED"
                                ? "bg-red-500/20 text-red-300 border border-red-500/30"
                                : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}

                        <span
                          className={`text-[10px] uppercase font-mono tracking-wider ${
                            isSelected ? "text-zinc-600 font-bold" : "text-zinc-400"
                          }`}
                        >
                          {item.dayName}
                        </span>
                        <span
                          className={`text-xl font-display font-black leading-tight my-0.5 ${
                            isSelected ? "text-black" : "text-white"
                          }`}
                        >
                          {item.dayNumber}
                        </span>
                        <span
                          className={`text-[9px] uppercase font-mono ${
                            isSelected ? "text-zinc-700 font-bold" : "text-zinc-400"
                          }`}
                        >
                          {item.monthName}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Step 2: Time Window Selector with Real-Time Current Time Filter */}
                <div className="mt-7 pt-6 border-t border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-white" />
                      <h3 className="font-display font-black text-xs uppercase tracking-wider text-white">
                        2. Choose Strategic Time Slot
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono text-zinc-400">
                      Indian Standard Time (IST)
                    </span>
                  </div>

                  {/* Warning banner if all slots for today have concluded */}
                  {isSelectedDateToday && allSlotsExpiredToday && (
                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in duration-200">
                      <div className="flex items-center gap-2.5">
                        <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                        <div>
                          <p className="text-xs font-display font-bold text-amber-300">
                            All appointment slots for today have concluded.
                          </p>
                          <p className="text-[11px] font-sans text-zinc-400">
                            Current time is past our 08:30 PM IST final war-room slot. Please pick tomorrow or an upcoming date.
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          sound.playPluck(150);
                          if (calendarDays[1]) {
                            setSelectedDate(calendarDays[1]);
                            setSelectedTimeSlot("11:00 AM IST");
                          }
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-display text-xs font-bold uppercase tracking-wider transition-all shrink-0 shadow-md active:scale-95"
                      >
                        Book Tomorrow &gt;
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {TIME_SLOTS.map((grp) => (
                      <div
                        key={grp.period}
                        className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-2.5"
                      >
                        <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                          <span className="flex items-center gap-1.5 font-bold text-white">
                            <span>{grp.icon}</span>
                            <span>{grp.period}</span>
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          {grp.slots.map((s) => {
                            const isExpired = isSlotExpired(s.time);
                            const isSelected = effectiveTimeSlot === s.time && !isExpired;

                            if (isExpired) {
                              return (
                                <button
                                  key={s.time}
                                  type="button"
                                  disabled={true}
                                  className="py-2 px-2.5 rounded-lg text-xs font-mono border text-center flex flex-col items-center justify-center opacity-30 cursor-not-allowed bg-white/[0.02] border-white/5 text-zinc-500 select-none"
                                  title={`This time slot (${s.time}) has already passed for today.`}
                                >
                                  <span className="line-through">{s.time}</span>
                                  <span className="text-[8px] uppercase tracking-wider mt-0.5 text-zinc-500">
                                    Passed
                                  </span>
                                </button>
                              );
                            }

                            return (
                              <button
                                key={s.time}
                                type="button"
                                onClick={() => {
                                  sound.playPluck(170);
                                  setSelectedTimeSlot(s.time);
                                }}
                                className={`py-2 px-2.5 rounded-lg text-xs font-mono transition-all border text-center flex flex-col items-center justify-center ${
                                  isSelected
                                    ? "bg-white text-black border-white font-bold shadow-md"
                                    : "bg-white/5 text-zinc-300 border-white/10 hover:border-white/25 hover:text-white"
                                }`}
                              >
                                <span>{s.time}</span>
                                <span
                                  className={`text-[8px] uppercase tracking-wider mt-0.5 ${
                                    isSelected ? "text-zinc-700 font-semibold" : "text-emerald-400"
                                  }`}
                                >
                                  {s.status}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 3: Quotation Builder Services Stack */}
              <div className="p-6 sm:p-7 rounded-2xl bg-white/[0.03] border border-white/15 backdrop-blur-md shadow-2xl relative space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                      <Layers className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h2 className="font-display font-black text-sm uppercase tracking-wider text-white">
                        3. Select Required Growth Capabilities
                      </h2>
                      <p className="text-[11px] font-sans text-zinc-400">
                        Multi-select disciplines for your customized agency quotation
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold text-white px-2.5 py-1 rounded-full bg-white/10 border border-white/20">
                    {selectedServices.length} Selected
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SERVICES_CATALOG.map((item) => {
                    const isChecked = selectedServices.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleToggleService(item.id)}
                        className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
                          isChecked
                            ? "bg-white/10 border-white text-white shadow-sm"
                            : "bg-white/[0.02] border-white/10 text-zinc-400 hover:border-white/20 hover:text-white"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border transition-all ${
                            isChecked
                              ? "bg-white text-black border-white"
                              : "bg-transparent border-white/30"
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-display font-extrabold text-white leading-tight truncate">
                              {item.title}
                            </p>
                            <span className="text-[9px] font-mono text-zinc-400 uppercase bg-white/5 px-1.5 py-0.5 rounded border border-white/10 ml-2">
                              {item.tier}
                            </span>
                          </div>
                          <p className="text-[11px] font-sans text-zinc-400 leading-snug mt-1 line-clamp-2">
                            {item.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Quotation Customizer, Budget Slider & WhatsApp Direct Dispatch (5 Cols) */}
            <div className="lg:col-span-5 space-y-6 text-left sticky top-28">
              <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/20 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-white" />
                    <span className="font-display font-extrabold text-xs uppercase tracking-wider text-white">
                      Quotation &amp; Brand Dossier
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Direct Dispatch
                  </span>
                </div>

                {/* Form Input Deck */}
                <div className="space-y-4 pt-4">
                  {/* Contact Name & Brand Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1 font-bold">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Vikram Sharma"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-all font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1 font-bold">
                        Brand / Store Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. VedaRoots / Darbar"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-all font-sans"
                      />
                    </div>
                  </div>

                  {/* Website URL & WhatsApp Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1 font-bold">
                        Store / Website URL
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. yourbrand.in"
                        value={brandUrl}
                        onChange={(e) => setBrandUrl(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-all font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1 font-bold">
                        Your WhatsApp No.
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={contactWhatsapp}
                        onChange={(e) => setContactWhatsapp(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-all font-mono"
                      />
                    </div>
                  </div>

                  {/* Industry Sector Dropdown */}
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1 font-bold">
                      Industry Sector
                    </label>
                    <select
                      value={selectedIndustry}
                      onChange={(e) => {
                        sound.playPluck(140);
                        setSelectedIndustry(e.target.value);
                      }}
                      className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-white transition-all font-sans cursor-pointer"
                    >
                      {INDUSTRIES.map((ind) => (
                        <option key={ind} value={ind} className="bg-zinc-900 text-white">
                          {ind}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Monthly Ad Budget Slider */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold">
                        Planned Monthly Ad Fuel
                      </label>
                      <span className="text-sm font-metric font-black text-white bg-white/10 px-2.5 py-0.5 rounded-md border border-white/20">
                        {formatINR(monthlyBudget)}
                      </span>
                    </div>

                    <input
                      type="range"
                      min={50000}
                      max={5000000}
                      step={50000}
                      value={monthlyBudget}
                      onChange={(e) => {
                        setMonthlyBudget(Number(e.target.value));
                      }}
                      className="w-full accent-white h-2 bg-white/10 rounded-lg cursor-pointer"
                    />

                    {/* Budget Shortcut Buttons */}
                    <div className="grid grid-cols-4 gap-1.5 mt-2.5">
                      {[
                        { label: "₹1.5L", val: 150000 },
                        { label: "₹5L", val: 500000 },
                        { label: "₹15L", val: 1500000 },
                        { label: "₹35L+", val: 3500000 },
                      ].map((btn) => (
                        <button
                          key={btn.label}
                          type="button"
                          onClick={() => {
                            sound.playPluck(160);
                            setMonthlyBudget(btn.val);
                          }}
                          className={`py-1 rounded text-[10px] font-mono transition-all border text-center ${
                            monthlyBudget === btn.val
                              ? "bg-white text-black border-white font-bold"
                              : "bg-white/5 text-zinc-400 border-white/10 hover:text-white"
                          }`}
                        >
                          {btn.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Notes */}
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1 font-bold">
                      Strategic Goals or Pain Points (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Current Meta ROAS is stuck at 2.1x; need scaling for Q4 festive season..."
                      value={customNotes}
                      onChange={(e) => setCustomNotes(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-all font-sans resize-none"
                    />
                  </div>
                </div>

                {/* Quotation Summary Card */}
                <div className="mt-5 p-4 rounded-xl bg-black/60 border border-white/15 space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between text-zinc-300">
                    <span>Target ROAS Multiplier:</span>
                    <span className="text-emerald-400 font-bold">5.8x - 7.4x</span>
                  </div>
                  <div className="flex items-center justify-between text-zinc-300">
                    <span>Reserved Slot:</span>
                    <span className="text-white font-bold">
                      {selectedDate.dayName}, {selectedDate.dayNumber} {selectedDate.monthName} ·{" "}
                      {effectiveTimeSlot}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-zinc-300">
                    <span>Routing Destination:</span>
                    <span className="text-white font-bold">WhatsApp {WHATSAPP_DISPLAY}</span>
                  </div>
                  <div className="flex items-center justify-between text-zinc-300">
                    <span>Official Email:</span>
                    <span className="text-white font-bold">{OFFICIAL_EMAIL}</span>
                  </div>
                </div>

                {/* PRIMARY ACTION: DIRECT WHATSAPP SEND */}
                <div className="mt-5 space-y-2.5">
                  <button
                    type="button"
                    onClick={handleSendToWhatsApp}
                    className="w-full py-4 px-5 rounded-full bg-white hover:bg-zinc-200 text-black font-display font-black text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(255,255,255,0.3)] transition-all flex items-center justify-center gap-2 active:scale-95 group"
                  >
                    <MessageCircle className="w-4 h-4 text-black group-hover:scale-110 transition-transform" />
                    <span>DISPATCH TO WHATSAPP ({WHATSAPP_DISPLAY}) &gt;</span>
                  </button>

                  {/* Secondary Utility Actions */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={handleCopyClipboard}
                      className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-mono text-[11px] border border-white/15 transition-all flex items-center justify-center gap-1.5"
                    >
                      {copiedNotification ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-zinc-400" />
                          <span>Copy Quotation</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleAddToCalendar}
                      className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-mono text-[11px] border border-white/15 transition-all flex items-center justify-center gap-1.5"
                    >
                      <CalendarIcon className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Add to Google Cal</span>
                    </button>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 text-center">
                  <span className="text-[10px] font-mono text-zinc-400 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    Direct Founder Dispatch &bull; No Spam &bull; Immediate Receipt
                  </span>
                </div>
              </div>

              {/* Quick Contact Micro-Cards */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:+${WHATSAPP_NUMBER}`}
                  className="p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-left transition-all block group"
                >
                  <PhoneCall className="w-4 h-4 text-white mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-mono text-zinc-400 block uppercase">
                    Direct Phone Hotline
                  </span>
                  <span className="text-xs font-mono font-bold text-white block mt-0.5">
                    {WHATSAPP_DISPLAY}
                  </span>
                </a>

                <a
                  href={`mailto:${OFFICIAL_EMAIL}`}
                  className="p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-left transition-all block group"
                >
                  <Mail className="w-4 h-4 text-white mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-mono text-zinc-400 block uppercase">
                    Official Inquiries
                  </span>
                  <span className="text-xs font-mono font-bold text-white block mt-0.5 truncate">
                    {OFFICIAL_EMAIL}
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Studio Location & Interactive Google Maps Section */}
          <div className="mt-20 pt-16 border-t border-white/10 text-left">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5 space-y-4">
                <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
                  Our Studio &amp; Headquarters
                </h2>

                <p className="text-sm text-zinc-300 leading-relaxed font-sans font-normal">
                  Visit our physical studio for in-person media buying reviews, packaging texture
                  checks, and quarterly e-commerce war rooms. Walk-ins by prior appointment only.
                </p>

                <div className="space-y-2 text-xs font-mono text-zinc-400 pt-2">
                  <p className="text-white font-bold">DESI MUCHADS DIGITAL LLP</p>
                  <p>Connaught Place, Barakhamba Road, New Delhi, 110001, India</p>
                  <p className="text-emerald-400 font-bold">
                    CIN: U74999DL2024PTC412891 &bull; 100% Verified
                  </p>
                  <p className="text-zinc-300">
                    Email:{" "}
                    <a href={`mailto:${OFFICIAL_EMAIL}`} className="text-white hover:underline">
                      {OFFICIAL_EMAIL}
                    </a>
                  </p>
                  <p className="text-zinc-300">
                    Studio Hours: Monday &ndash; Saturday, 10:00 AM &ndash; 08:30 PM IST
                  </p>
                </div>

                <div className="pt-2">
                  <a
                    href="https://maps.app.goo.gl/WyD9PkPPEeMx6gGp7?g_st=aw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono font-bold uppercase tracking-wider text-white transition-all shadow-sm"
                  >
                    <Compass className="w-4 h-4 text-white" />
                    <span>Open in Google Maps App ↗</span>
                  </a>
                </div>
              </div>

              {/* Embedded Interactive Map Card */}
              <div className="lg:col-span-7">
                <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black h-80 sm:h-96 group">
                  <iframe
                    title="Desi Muchads Official Headquarters Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14008.114838048259!2d77.2167!3d28.6315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b83d108d%3A0x280bb4b7efbb0d08!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    className="w-full h-full border-0 filter invert contrast-125 opacity-85 group-hover:opacity-100 transition-opacity"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/90 backdrop-blur-md border border-white/15 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2 truncate pr-2">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="text-white truncate">
                        Connaught Place Hub &bull; New Delhi
                      </span>
                    </div>
                    <a
                      href="https://maps.app.goo.gl/WyD9PkPPEeMx6gGp7?g_st=aw"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline shrink-0 font-bold"
                    >
                      Get Directions ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Executive Leaders Direct Contact Escalation */}
          <div className="mt-20 pt-16 border-t border-white/10 text-left">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest font-bold block mb-1">
                  Executive Leadership Desk
                </span>
                <h2 className="font-display font-black text-2xl sm:text-3xl uppercase text-white">
                  Direct Principal Escalation
                </h2>
              </div>
              <span className="text-xs font-mono text-zinc-400 hidden sm:inline">
                3 Managing Principals &bull; 0 Junior Gatekeeping
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Rahul Datt (CEO) */}
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/15 backdrop-blur-md space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/20 bg-gradient-to-b from-[#1c1c24] to-[#0d0d12] shadow-md">
                    <img
                      src="/team/rahul-datt.jpg"
                      alt="Rahul Datt CEO"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-lg text-white">Rahul Datt</h3>
                    <p className="text-xs font-mono text-zinc-400 uppercase font-bold">
                      Chief Executive Officer (CEO)
                    </p>
                  </div>
                  <p className="text-xs font-sans text-zinc-300 leading-relaxed">
                    Agency Vision, Client Scaling Strategy &amp; Executive Leadership. Oversees all major
                    client growth war-rooms and creative trajectory.
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-3">
                  <a
                    href={`https://wa.me/91${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                      "Pranam Rahul Sir! I would like to schedule an Executive CEO Baithak for my brand."
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-white hover:underline flex items-center gap-1.5 font-bold"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp Rahul Sir ↗</span>
                  </a>
                  <a
                    href="mailto:rahuldesimuchads@gmail.com"
                    className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1"
                    title="Direct Mail"
                  >
                    <Mail className="w-3 h-3 text-zinc-400" />
                    <span>Email</span>
                  </a>
                </div>
              </div>

              {/* Brinta Deb (CTO) */}
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/15 backdrop-blur-md space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/20 bg-gradient-to-b from-[#1c1c24] to-[#0d0d12] shadow-md">
                    <img
                      src="/team/brinta-deb.jpg"
                      alt="Brinta Deb CTO"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-lg text-white">Brinta Deb</h3>
                    <p className="text-xs font-mono text-zinc-400 uppercase font-bold">
                      Chief Technology Officer (CTO)
                    </p>
                  </div>
                  <p className="text-xs font-sans text-zinc-300 leading-relaxed">
                    Fullstack Engineering, Conversion Architecture &amp; Telemetry Systems. Architects
                    sub-second Next.js engines and automated reporting pipes.
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-3">
                  <a
                    href={`https://wa.me/91${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                      "Pranam Brinta Sir! I would like to consult on high-performance web engineering and conversion tech."
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-white hover:underline flex items-center gap-1.5 font-bold"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp Brinta Sir ↗</span>
                  </a>
                  <a
                    href="https://brinta-deb-portfolio.onrender.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-emerald-400 hover:underline flex items-center gap-1 font-bold"
                    title="View Portfolio"
                  >
                    <Globe className="w-3 h-3 text-emerald-400" />
                    <span>Portfolio ↗</span>
                  </a>
                  <a
                    href="mailto:brintadesimuchads@gmail.com"
                    className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1"
                    title="Direct Mail"
                  >
                    <Mail className="w-3 h-3 text-zinc-400" />
                    <span>Email</span>
                  </a>
                </div>
              </div>

              {/* Omkar Dutta (CFO) */}
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/15 backdrop-blur-md space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/20 bg-gradient-to-b from-[#1c1c24] to-[#0d0d12] shadow-md">
                    <img
                      src="/team/omkar-dutta.png"
                      alt="Omkar Dutta CFO"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-lg text-white">Omkar Dutta</h3>
                    <p className="text-xs font-mono text-zinc-400 uppercase font-bold">
                      Chief Financial Officer (CFO)
                    </p>
                  </div>
                  <p className="text-xs font-sans text-zinc-300 leading-relaxed">
                    Capital Allocation, Unit Economics &amp; Financial Governance. Optimizes blended CAC,
                    contribution margins (CM3), and ad spend efficiency.
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-3">
                  <a
                    href={`https://wa.me/91${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                      "Pranam Omkar Sir! I would like to review unit economics and financial media allocation."
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-white hover:underline flex items-center gap-1.5 font-bold"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp Omkar Sir ↗</span>
                  </a>
                  <a
                    href={`mailto:${OFFICIAL_EMAIL}?subject=${encodeURIComponent("Inquiry for Omkar Dutta (CFO)")}`}
                    className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1"
                    title="Direct Mail"
                  >
                    <Mail className="w-3 h-3 text-zinc-400" />
                    <span>Email</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer onOpenKundli={() => setIsKundliOpen(true)} />

      <BrandKundliModal
        isOpen={isKundliOpen}
        onClose={() => setIsKundliOpen(false)}
      />
    </div>
  );
}
