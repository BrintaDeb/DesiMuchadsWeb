"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
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
  ShieldCheck,
  Check,
  Copy,
  Sliders,
  Compass,
  Zap,
  Award,
  Target,
  Send,
  Video,
  ExternalLink,
  MessageSquare,
} from "lucide-react";
import { sound } from "@/lib/sound";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";
import { BrandKundliModal } from "@/components/kundli/BrandKundliModal";
import { SocialRedirectionDeck } from "@/components/common/SocialRedirectionDeck";

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
    period: "Late War-Room Session",
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
  "Beauty, Skincare & Personal Care",
  "Home Decor & Sustainable Living",
];

const BUDGET_TIERS = [
  { label: "₹1.5L", val: 150000, desc: "Challenger Stack" },
  { label: "₹5L", val: 500000, desc: "Scale Accelerator" },
  { label: "₹15L", val: 1500000, desc: "Dominance Engine" },
  { label: "₹35L+", val: 3500000, desc: "Enterprise Sovereign" },
];

const STRATEGIC_GOALS = [
  { id: "roas", label: "Scale Blended ROAS (5.8x+)", category: "Growth" },
  { id: "cac", label: "Slash CAC & CPM Fatigue", category: "Efficiency" },
  { id: "qcom", label: "Dominate Blinkit & Zepto", category: "Channel" },
  { id: "ugc", label: "Viral UGC & Cinematic Video Ads", category: "Creative" },
  { id: "web", label: "Sub-Second Next.js 16 Web Rebuild", category: "Tech" },
  { id: "margin", label: "Fix Contribution Margin (CM3)", category: "Finance" },
  { id: "brand", label: "Luxury Packaging & Sacred Branding", category: "Identity" },
  { id: "pmax", label: "High-Intent Google Ads & P-Max", category: "Search" },
];

const PREFERRED_PLATFORMS = [
  { id: "meta", name: "Meta Ads (Instagram & FB)", icon: "📱", badge: "Highest ROAS" },
  { id: "google", name: "Google Search & P-Max", icon: "🔍", badge: "High-Intent" },
  { id: "qcom", name: "Quick Commerce (Blinkit/Zepto)", icon: "⚡", badge: "10-Min Fast" },
  { id: "youtube", name: "YouTube & Connected TV", icon: "▶️", badge: "Mass Reach" },
  { id: "shopify", name: "Next.js 16 / Shopify Headless", icon: "💻", badge: "0.6s LCP" },
  { id: "amazon", name: "Amazon & Marketplaces", icon: "📦", badge: "Scale" },
];

const CURRENT_ROAS_OPTIONS = [
  "Under 2.0x (Bleeding cash, need urgent reset)",
  "2.0x – 3.5x (Breakeven / Moderate stability)",
  "3.5x – 5.0x (Healthy, ready for aggressive scaling)",
  "5.0x+ (Dominant, need multi-channel expansion)",
];

const LAUNCH_TIMELINES = [
  "Immediate (Within 48 Hours)",
  "Within 7–14 Days",
  "Next Month (Pre-Festive / Q4 Prep)",
  "Exploring & Feasibility Check",
];

const MEETING_CHANNELS = [
  { id: "meet", name: "Google Meet", note: "Instant HD Video Room", icon: Video, popular: true },
  { id: "whatsapp", name: "WhatsApp Video Call", note: "Direct Founder Phone", icon: MessageCircle },
  { id: "zoom", name: "Zoom Enterprise", note: "Screen Share & Telemetry", icon: Globe },
  { id: "inperson", name: "Studio In-Person", note: "Splendid Royale, Bengaluru", icon: MapPin },
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

// Pre-seeded Interactive Concierge Messages
interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const CONCIERGE_PROMPTS = [
  {
    q: "What blended ROAS do you benchmark?",
    a: "We maintain a strict 5.8x to 7.4x blended ROAS benchmark across verified client portfolios, governed by daily CM3 contribution margin tracking.",
  },
  {
    q: "How fast can you audit our ad account?",
    a: "Our Principal Architects deliver a comprehensive 14-point telemetry and revenue leak audit within 24 to 48 hours of session confirmation.",
  },
  {
    q: "Can we meet in-person at your studio?",
    a: "Yes! Our headquarters is at Splendid Royale, 3rd Main Rd, Hosapalaya, Muneshwara Nagar, Bengaluru, Karnataka 560068. In-person strategy sessions are hosted Monday to Saturday.",
  },
  {
    q: "What are your monthly retainer packages?",
    a: "Our structured retainers start from ₹35,000/mo (Seed Stack) up to ₹3,00,000/mo (Enterprise Sovereign), with zero hidden markups.",
  },
];

export default function ContactPage() {
  const [isKundliOpen, setIsKundliOpen] = useState(false);
  const WHATSAPP_NUMBER = "9180252831";
  const WHATSAPP_DISPLAY = "+91 9180252831";
  const OFFICIAL_EMAIL = "thedesimuchads@gmail.com";

  // Mode Switcher: Smart Booking vs Live Chat Concierge
  const [activeInteractiveMode, setActiveInteractiveMode] = useState<"booking" | "chat">("booking");

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
  const [selectedMeetingChannel, setSelectedMeetingChannel] = useState<string>("meet");

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

      const initialDay = isTodayClosed && days[1] ? days[1] : days[0];
      setSelectedDate(initialDay);

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

  const isSlotExpired = (slotStr: string): boolean => {
    if (!isSelectedDateToday || !currentIstTime) return false;
    const slotMins = parseSlotMinutes(slotStr);
    return slotMins <= currentIstTime.minutes;
  };

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

  const effectiveTimeSlot = useMemo(() => {
    if (!isSelectedDateToday || !currentIstTime) return selectedTimeSlot;
    const isCurrentExpired = parseSlotMinutes(selectedTimeSlot) <= currentIstTime.minutes;
    if (isCurrentExpired && availableSlotsForToday.length > 0) {
      return availableSlotsForToday[0];
    }
    return selectedTimeSlot;
  }, [isSelectedDateToday, currentIstTime, selectedTimeSlot, availableSlotsForToday]);

  // Lead Qualification States
  const [monthlyBudget, setMonthlyBudget] = useState<number>(350000);
  const [selectedIndustry, setSelectedIndustry] = useState<string>("D2C E-Commerce & Retail");
  const [selectedGoals, setSelectedGoals] = useState<string[]>(["roas", "ugc", "qcom"]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["meta", "google", "qcom"]);
  const [currentRoas, setCurrentRoas] = useState<string>(CURRENT_ROAS_OPTIONS[1]);
  const [launchTimeline, setLaunchTimeline] = useState<string>(LAUNCH_TIMELINES[0]);
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "meta-ads",
    "google-sem",
    "video-reels",
  ]);

  // Lead Contact Information
  const [clientName, setClientName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [brandUrl, setBrandUrl] = useState("");
  const [contactWhatsapp, setContactWhatsapp] = useState("");
  const [customNotes, setCustomNotes] = useState("");

  const [copiedNotification, setCopiedNotification] = useState(false);

  // Live Concierge State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      sender: "bot",
      text: "Hello! I am the Desi Muchads Executive AI Concierge. How can our performance marketing war-room scale your brand today?",
      timestamp: "Just now",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const msgCountRef = useRef(1);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSendChatMessage = (textToSend?: string) => {
    const text = (textToSend || chatInput).trim();
    if (!text) return;

    sound.playPluck(160);
    const userMsg: ChatMessage = {
      id: `user-${msgCountRef.current++}`,
      sender: "user",
      text,
      timestamp: "Just now",
    };

    setChatMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setChatInput("");

    // Simulated Intelligent Concierge Response
    setTimeout(() => {
      sound.playChime();
      let reply = "Understood. Our Managing Principals review account audits daily. Would you like to lock this into a direct 15-Minute Strategy Session with our founder?";
      
      const lower = text.toLowerCase();
      if (lower.includes("roas") || lower.includes("return")) {
        reply = "We engineer 5.8x to 7.4x blended ROAS by combining high-hook cultural reels with ASC+ CBO media engines. What is your current monthly ad spend?";
      } else if (lower.includes("budget") || lower.includes("price") || lower.includes("package")) {
        reply = "Our retainers range from ₹75,000/mo (Foundation Sprint) to ₹1,50,000/mo (Dominance Engine) with 0% hidden markups. You can also assemble a custom modular retainer!";
      } else if (lower.includes("blinkit") || lower.includes("zepto") || lower.includes("quick")) {
        reply = "Our Quick Commerce squad indexes dark-store inventory and dominates in-app banner search on Zepto and Blinkit within 72 hours.";
      } else if (lower.includes("audit") || lower.includes("kundli") || lower.includes("free")) {
        reply = "We can run an automated Brand Growth Audit on your website immediately! Simply share your store URL.";
      }

      const botMsg: ChatMessage = {
        id: `bot-${msgCountRef.current++}`,
        sender: "bot",
        text: reply,
        timestamp: "Just now",
        action: {
          label: "Dispatch Brief to Founder (+91 9180252831)",
          onClick: handleSendToWhatsApp,
        },
      };

      setChatMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  // Toggle Selection Helpers
  const handleToggleService = (serviceId: string) => {
    sound.playPluck(150);
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((s) => s !== serviceId) : [...prev, serviceId]
    );
  };

  const handleToggleGoal = (goalId: string) => {
    sound.playPluck(150);
    setSelectedGoals((prev) =>
      prev.includes(goalId) ? prev.filter((g) => g !== goalId) : [...prev, goalId]
    );
  };

  const handleTogglePlatform = (platformId: string) => {
    sound.playPluck(150);
    setSelectedPlatforms((prev) =>
      prev.includes(platformId) ? prev.filter((p) => p !== platformId) : [...prev, platformId]
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

  // Lead Qualification Score Calculation (0 - 100)
  const leadQualificationIndex = useMemo(() => {
    let score = 50;
    if (monthlyBudget >= 1500000) score += 25;
    else if (monthlyBudget >= 500000) score += 20;
    else score += 10;

    if (selectedGoals.length >= 3) score += 10;
    if (selectedPlatforms.length >= 2) score += 10;
    if (brandUrl.trim().length > 3) score += 5;
    return Math.min(score, 99);
  }, [monthlyBudget, selectedGoals, selectedPlatforms, brandUrl]);

  // Compile Comprehensive WhatsApp Message Payload
  const generateWhatsAppMessage = () => {
    const selectedServiceTitles = SERVICES_CATALOG.filter((s) =>
      selectedServices.includes(s.id)
    ).map((s) => `• ${s.title}`);

    const goalTitles = STRATEGIC_GOALS.filter((g) => selectedGoals.includes(g.id)).map(
      (g) => `• ${g.label}`
    );

    const platformTitles = PREFERRED_PLATFORMS.filter((p) =>
      selectedPlatforms.includes(p.id)
    ).map((p) => `• ${p.name}`);

    const formattedDate = `${selectedDate.dayName}, ${selectedDate.dayNumber} ${selectedDate.monthName} ${selectedDate.year}`;
    const channelName =
      MEETING_CHANNELS.find((c) => c.id === selectedMeetingChannel)?.name || "Google Meet";

    const text =
      `Hello Desi Muchads! 👋\n\n` +
      `Here is my Strategic Lead Qualification & Strategy Session Booking:\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `👤 Contact Name: ${clientName.trim() || "Founder / Growth Lead"}\n` +
      `🏢 Brand / Store Name: ${brandName.trim() || "Confidential Brand"}\n` +
      `🌐 Website URL: ${brandUrl.trim() || "Not specified yet"}\n` +
      `💼 Industry: ${selectedIndustry}\n` +
      `📱 WhatsApp: ${contactWhatsapp.trim() || "Direct Dispatch"}\n` +
      `✉️ Direct Agency Inbox: ${OFFICIAL_EMAIL}\n\n` +
      `📊 LEAD QUALIFICATION METRICS:\n` +
      `💰 Monthly Ad Fuel: ${formatINR(monthlyBudget)}\n` +
      `📈 Baseline ROAS: ${currentRoas}\n` +
      `⏱️ Target Timeline: ${launchTimeline}\n` +
      `⭐ Qualification Match Index: ${leadQualificationIndex}% (VIP Priority)\n\n` +
      `🎯 PRIMARY STRATEGIC GOALS (${selectedGoals.length}):\n` +
      `${goalTitles.join("\n") || "• Rapid ROAS Scaling"}\n\n` +
      `🚀 PREFERRED PLATFORMS (${selectedPlatforms.length}):\n` +
      `${platformTitles.join("\n") || "• Meta & Google Ads"}\n\n` +
      `🛠️ REQUESTED DELIVERABLES (${selectedServices.length}):\n` +
      `${selectedServiceTitles.join("\n")}\n\n` +
      `🗓️ STRATEGIC SESSION RESERVATION:\n` +
      `📅 Date: ${formattedDate}\n` +
      `⏰ Slot: ${effectiveTimeSlot}\n` +
      `🎥 Channel: ${channelName}\n` +
      (customNotes.trim() ? `\n📝 Specific Notes: ${customNotes.trim()}\n` : "") +
      `━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `Unit of Desi Muchads Digital LLP • Ruthless Global ROI.`;

    return text;
  };

  const handleSendToWhatsApp = () => {
    if (isSelectedDateToday && allSlotsExpiredToday) {
      sound.playPluck(120);
      alert(
        "All strategy session slots for today have concluded. Please select tomorrow or an upcoming date to confirm your appointment!"
      );
      return;
    }
    if (isSelectedDateToday && isSlotExpired(effectiveTimeSlot)) {
      sound.playPluck(120);
      alert("The selected time slot has already passed for today. Please pick an open upcoming slot.");
      return;
    }
    sound.playChime();

    // CRM & Instant Telegram Alert Dispatch
    fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "contact_qualification_whatsapp",
        name: clientName.trim() || "Founder / Growth Lead",
        brandName: brandName.trim(),
        brandWebsite: brandUrl.trim(),
        phone: contactWhatsapp.trim(),
        budget: formatINR(monthlyBudget),
        service: selectedServices.join(", "),
        message: `Goals: ${selectedGoals.join(", ")} | Platforms: ${selectedPlatforms.join(", ")} | Slot: ${effectiveTimeSlot} (${selectedMeetingChannel}) | Notes: ${customNotes.trim()}`,
      }),
    }).catch(() => {});

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

    // CRM & Instant Telegram Alert Dispatch
    fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "contact_calendar_booking",
        name: clientName.trim() || "Founder / Growth Lead",
        brandName: brandName.trim(),
        brandWebsite: brandUrl.trim(),
        phone: contactWhatsapp.trim(),
        budget: formatINR(monthlyBudget),
        service: selectedServices.join(", "),
        message: `Added to Calendar for slot: ${effectiveTimeSlot} (${selectedMeetingChannel}) | Goals: ${selectedGoals.join(", ")}`,
      }),
    }).catch(() => {});

    const formattedDate = `${selectedDate.dayName}, ${selectedDate.dayNumber} ${selectedDate.monthName} ${selectedDate.year}`;
    const channelName =
      MEETING_CHANNELS.find((c) => c.id === selectedMeetingChannel)?.name || "Google Meet";
    const title = encodeURIComponent(
      `Desi Muchads Strategy Session · ${brandName || "Brand Scaling"}`
    );
    const details = encodeURIComponent(
      `Confidential Strategy Session with Desi Muchads Digital Leadership.\n` +
      `Appointment Slot: ${formattedDate} at ${effectiveTimeSlot} (${channelName}).\n` +
      `Direct Founder Desk: +91 9180252831\n` +
      `Goals: ${STRATEGIC_GOALS.filter((g) => selectedGoals.includes(g.id))
        .map((g) => g.label)
        .join(", ")}\n` +
      `Platforms: ${PREFERRED_PLATFORMS.filter((p) => selectedPlatforms.includes(p.id))
        .map((p) => p.name)
        .join(", ")}`
    );
    const location = encodeURIComponent(
      channelName.includes("In-Person")
        ? "Desi Muchads Headquarters, Splendid Royale, Bengaluru"
        : "Google Meet / Video Room"
    );
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
    window.open(googleCalendarUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-transparent text-white selection:bg-white selection:text-black relative overflow-x-hidden">
      <Navbar onOpenKundli={() => setIsKundliOpen(true)} />

      <main className="min-h-screen bg-transparent text-white pt-28 sm:pt-32 pb-24 font-display relative overflow-hidden select-none">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header Breadcrumb & Tag */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-8 border-b border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-widest">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-white font-bold">Contact Us &amp; Live Qualification</span>
            </div>

            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 text-xs font-mono text-zinc-300">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>LIVE IST // {liveIstTime || "06:00:00 PM"}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          </div>

          {/* Hero Section */}
          <div className="mb-12 text-left max-w-4xl space-y-4">
            <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight uppercase leading-[0.96] text-white">
              Schedule Your Session. <br />
              <span className="text-zinc-400">Qualify Your Brand Growth.</span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 font-sans font-normal leading-relaxed max-w-3xl">
              Qualify your performance goals, preferred advertising channels, and budget parameters below.
              Dispatch your customized quotation directly to our official agency WhatsApp desk at{" "}
              <strong className="text-white font-bold">{WHATSAPP_DISPLAY}</strong>, or chat live with our
              strategy concierge. Zero junior gatekeepers, 100% executive access.
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

          {/* Mode Switcher: Smart Calendar Booking vs Live VIP Chat Concierge */}
          <div id="session" className="mb-8 flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2 p-1 rounded-xl bg-white/[0.04] border border-white/10">
              <button
                type="button"
                onClick={() => {
                  sound.playPluck(140);
                  setActiveInteractiveMode("booking");
                }}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                  activeInteractiveMode === "booking"
                    ? "bg-white text-black shadow-md"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <CalendarIcon className="w-3.5 h-3.5" />
                <span>Smart Calendar Booking</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playPluck(160);
                  setActiveInteractiveMode("chat");
                }}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                  activeInteractiveMode === "chat"
                    ? "bg-white text-black shadow-md"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Live Strategy Concierge</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </button>
            </div>

            <div className="hidden md:flex items-center gap-2 text-xs font-mono text-zinc-400">
              <span className="text-emerald-400 font-bold">● Live Agent Available</span>
              <span>· Avg response: &lt; 2 mins</span>
            </div>
          </div>

          {/* Main 2-Column Responsive Cockpit */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT COLUMN: Booking/Live Chat & Lead Qualification System (7 Cols) */}
            <div className="lg:col-span-7 space-y-8 text-left">
              {activeInteractiveMode === "booking" ? (
                <>
                  {/* Step 1: 30-Day Live Dynamic Date Carousel */}
                  <div className="p-6 sm:p-7 rounded-2xl bg-white/[0.03] border border-white/15 backdrop-blur-md shadow-2xl relative">
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                          <CalendarIcon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h2 className="font-display font-black text-sm uppercase tracking-wider text-white">
                            1. Select Session Date
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

                    {/* Horizontal Scrollable 30-Day Strip with Silky Mobile Momentum */}
                    <div className="flex gap-2.5 scroll-momentum-x pb-3 pt-1">
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

                    {/* Step 3: Meeting Channel Selector */}
                    <div className="mt-7 pt-6 border-t border-white/10 space-y-3">
                      <h3 className="font-display font-black text-xs uppercase tracking-wider text-white">
                        3. Select Meeting Channel
                      </h3>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {MEETING_CHANNELS.map((ch) => {
                          const isSelected = selectedMeetingChannel === ch.id;
                          const IconComp = ch.icon;
                          return (
                            <button
                              key={ch.id}
                              type="button"
                              onClick={() => {
                                sound.playPluck(140);
                                setSelectedMeetingChannel(ch.id);
                              }}
                              className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                                isSelected
                                  ? "bg-white text-black border-white shadow-lg"
                                  : "bg-white/[0.03] border-white/10 text-zinc-300 hover:border-white/30 hover:bg-white/[0.06]"
                              }`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <IconComp className={`w-4 h-4 ${isSelected ? "text-black" : "text-white"}`} />
                                {ch.popular && (
                                  <span
                                    className={`text-[8px] font-mono uppercase px-1.5 py-0.5 rounded font-black ${
                                      isSelected
                                        ? "bg-black text-white"
                                        : "bg-white/10 text-zinc-300 border border-white/15"
                                    }`}
                                  >
                                    POPULAR
                                  </span>
                                )}
                              </div>
                              <div>
                                <span className={`text-xs font-display font-bold block leading-tight ${isSelected ? "text-black" : "text-white"}`}>
                                  {ch.name}
                                </span>
                                <span className={`text-[10px] font-sans block mt-0.5 ${isSelected ? "text-zinc-600" : "text-zinc-400"}`}>
                                  {ch.note}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                /* LIVE VIP STRATEGY CHAT CONCIERGE */
                <div className="p-6 sm:p-7 rounded-2xl bg-[#0c0c10] border border-white/20 shadow-2xl space-y-4 flex flex-col h-[540px]">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="relative w-9 h-9 rounded-full overflow-hidden border border-white/30 bg-black">
                        <img src="/brand-logo.jpg" alt="Concierge" className="w-full h-full object-cover" />
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-black" />
                      </div>
                      <div>
                        <h3 className="font-display font-black text-xs uppercase text-white">
                          Desi Muchads Growth Concierge
                        </h3>
                        <p className="text-[10px] font-mono text-emerald-400">
                          Direct Line to Founder Desk &bull; Active Now
                        </p>
                      </div>
                    </div>

                    <a
                      href={`https://wa.me/91${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                        "Hello Desi Muchads! I would like to chat directly on WhatsApp about scaling my brand."
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold flex items-center gap-1.5 transition-all"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp Live ↗</span>
                    </a>
                  </div>

                  {/* Chat Messages Stream */}
                  <div ref={chatScrollRef} className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-white/20 text-xs">
                    {chatMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                      >
                        <div
                          className={`max-w-[85%] p-3.5 rounded-2xl ${
                            msg.sender === "user"
                              ? "bg-white text-black font-medium rounded-tr-sm"
                              : "bg-white/10 text-zinc-200 border border-white/10 rounded-tl-sm font-sans"
                          }`}
                        >
                          <p className="leading-relaxed">{msg.text}</p>
                          {msg.action && (
                            <button
                              type="button"
                              onClick={msg.action.onClick}
                              className="mt-3 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-display font-bold text-[11px] uppercase flex items-center gap-1.5 shadow transition-all"
                            >
                              <MessageCircle className="w-3 h-3" />
                              <span>{msg.action.label}</span>
                            </button>
                          )}
                        </div>
                        <span className="text-[9px] font-mono text-zinc-500 mt-1 px-1">{msg.timestamp}</span>
                      </div>
                    ))}
                  </div>

                  {/* Quick Strategy Question Chips */}
                  <div className="pt-2 border-t border-white/10 flex items-center gap-1.5 overflow-x-auto scroll-momentum-x pb-1">
                    {CONCIERGE_PROMPTS.map((p, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSendChatMessage(p.q)}
                        className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-zinc-300 hover:text-white text-[10px] font-mono whitespace-nowrap shrink-0 transition-all"
                      >
                        {p.q}
                      </button>
                    ))}
                  </div>

                  {/* Live Chat Input */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendChatMessage();
                    }}
                    className="flex items-center gap-2 pt-2"
                  >
                    <input
                      id="conciergeChatInput"
                      name="conciergeChatInput"
                      type="text"
                      aria-label="Ask our growth concierge a question"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask about ROAS, media spend, audit timeline..."
                      className="flex-1 px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-all font-sans"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Send</span>
                    </button>
                  </form>
                </div>
              )}

              {/* LEAD QUALIFICATION SECTION: Goals, Platforms & Requirements */}
              <div className="p-6 sm:p-7 rounded-2xl bg-white/[0.03] border border-white/15 backdrop-blur-md shadow-2xl relative space-y-7">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                      <Target className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <h2 className="font-display font-black text-sm uppercase tracking-wider text-white">
                        4. Lead Qualification &amp; Growth Goals
                      </h2>
                      <p className="text-[11px] font-sans text-zinc-400">
                        Help our principals tailor your custom performance architecture
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold text-emerald-400 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                    Match: {leadQualificationIndex}%
                  </span>
                </div>

                {/* Sub-step A: Strategic Goals */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono uppercase tracking-wider text-white font-bold flex items-center gap-1.5">
                      <span>Core Growth Objectives *</span>
                      <span className="text-zinc-500 font-normal">({selectedGoals.length} selected)</span>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {STRATEGIC_GOALS.map((goal) => {
                      const isSelected = selectedGoals.includes(goal.id);
                      return (
                        <button
                          key={goal.id}
                          type="button"
                          onClick={() => handleToggleGoal(goal.id)}
                          className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                            isSelected
                              ? "bg-white/10 border-white text-white shadow-sm"
                              : "bg-white/[0.02] border-white/10 text-zinc-400 hover:border-white/20 hover:text-white"
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border transition-all ${
                              isSelected ? "bg-white text-black border-white" : "border-white/30"
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <div className="min-w-0 flex-1">
                            <span className="text-xs font-display font-bold block leading-tight text-white truncate">
                              {goal.label}
                            </span>
                            <span className="text-[10px] font-mono text-zinc-400 block mt-0.5">
                              {goal.category}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Sub-step B: Preferred Platforms */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <label className="text-xs font-mono uppercase tracking-wider text-white font-bold flex items-center gap-1.5">
                    <span>Preferred Advertising Platforms *</span>
                    <span className="text-zinc-500 font-normal">({selectedPlatforms.length} selected)</span>
                  </label>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {PREFERRED_PLATFORMS.map((plat) => {
                      const isSelected = selectedPlatforms.includes(plat.id);
                      return (
                        <button
                          key={plat.id}
                          type="button"
                          onClick={() => handleTogglePlatform(plat.id)}
                          className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                            isSelected
                              ? "bg-white text-black border-white font-bold shadow-md"
                              : "bg-white/[0.03] border-white/10 text-zinc-300 hover:border-white/25 hover:bg-white/[0.07]"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-base">{plat.icon}</span>
                            <span
                              className={`text-[8px] font-mono uppercase px-1.5 py-0.5 rounded ${
                                isSelected
                                  ? "bg-black text-white"
                                  : "bg-white/10 text-zinc-400 border border-white/10"
                              }`}
                            >
                              {plat.badge}
                            </span>
                          </div>
                          <span className={`text-[11px] font-display font-bold leading-tight ${isSelected ? "text-black" : "text-white"}`}>
                            {plat.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Sub-step C: Deliverables Stack */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono uppercase tracking-wider text-white font-bold flex items-center gap-1.5">
                      <span>Specific Deliverables Needed</span>
                      <span className="text-zinc-500 font-normal">({selectedServices.length} selected)</span>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {SERVICES_CATALOG.map((item) => {
                      const isChecked = selectedServices.includes(item.id);
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleToggleService(item.id)}
                          className={`p-3 rounded-xl border text-left transition-all flex items-start gap-2.5 ${
                            isChecked
                              ? "bg-white/10 border-white text-white shadow-sm"
                              : "bg-white/[0.02] border-white/10 text-zinc-400 hover:border-white/20 hover:text-white"
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded flex items-center justify-center shrink-0 mt-0.5 border transition-all ${
                              isChecked ? "bg-white text-black border-white" : "border-white/30"
                            }`}
                          >
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
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
            </div>

            {/* RIGHT COLUMN: Interactive Lead Dossier, Budget Slider & WhatsApp Direct Dispatch (5 Cols) */}
            <div className="lg:col-span-5 space-y-6 text-left sticky top-28">
              <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/20 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-white" />
                    <span className="font-display font-extrabold text-xs uppercase tracking-wider text-white">
                      Lead Dossier &amp; Quotation
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Direct VIP Dispatch
                  </span>
                </div>

                {/* Form Input Deck */}
                <div className="space-y-4 pt-4">
                  {/* Contact Name & Brand Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="clientNameInput" className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1 font-bold">
                        Your Name *
                      </label>
                      <input
                        id="clientNameInput"
                        name="clientName"
                        type="text"
                        placeholder="e.g. Vikram Sharma"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-all font-sans"
                      />
                    </div>

                    <div>
                      <label htmlFor="brandNameInput" className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1 font-bold">
                        Brand / Store Name *
                      </label>
                      <input
                        id="brandNameInput"
                        name="brandName"
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
                      <label htmlFor="brandUrlInput" className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1 font-bold">
                        Store / Website URL
                      </label>
                      <input
                        id="brandUrlInput"
                        name="brandUrl"
                        type="text"
                        placeholder="e.g. yourbrand.in"
                        value={brandUrl}
                        onChange={(e) => setBrandUrl(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-all font-sans"
                      />
                    </div>

                    <div>
                      <label htmlFor="contactWhatsappInput" className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1 font-bold">
                        Your WhatsApp No.
                      </label>
                      <input
                        id="contactWhatsappInput"
                        name="contactWhatsapp"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={contactWhatsapp}
                        onChange={(e) => setContactWhatsapp(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-all font-mono"
                      />
                    </div>
                  </div>

                  {/* Industry Sector & Current ROAS Baseline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="selectedIndustrySelect" className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1 font-bold">
                        Industry Sector
                      </label>
                      <select
                        id="selectedIndustrySelect"
                        name="selectedIndustry"
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

                    <div>
                      <label htmlFor="currentRoasSelect" className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1 font-bold">
                        Current Blended ROAS
                      </label>
                      <select
                        id="currentRoasSelect"
                        name="currentRoas"
                        value={currentRoas}
                        onChange={(e) => {
                          sound.playPluck(140);
                          setCurrentRoas(e.target.value);
                        }}
                        className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-white transition-all font-sans cursor-pointer truncate"
                      >
                        {CURRENT_ROAS_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="bg-zinc-900 text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Monthly Ad Budget Slider */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="monthlyBudgetSlider" className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold">
                        Planned Monthly Ad Fuel
                      </label>
                      <span className="text-sm font-metric font-black text-white bg-white/10 px-2.5 py-0.5 rounded-md border border-white/20">
                        {formatINR(monthlyBudget)}
                      </span>
                    </div>

                    <input
                      id="monthlyBudgetSlider"
                      name="monthlyBudget"
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
                      {BUDGET_TIERS.map((btn) => (
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

                  {/* Target Launch Timeline */}
                  <div>
                    <label htmlFor="launchTimelineSelect" className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1 font-bold">
                      Target Deployment Timeline
                    </label>
                    <select
                      id="launchTimelineSelect"
                      name="launchTimeline"
                      value={launchTimeline}
                      onChange={(e) => {
                        sound.playPluck(140);
                        setLaunchTimeline(e.target.value);
                      }}
                      className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-white transition-all font-sans cursor-pointer"
                    >
                      {LAUNCH_TIMELINES.map((time) => (
                        <option key={time} value={time} className="bg-zinc-900 text-white">
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Custom Notes */}
                  <div>
                    <label htmlFor="customNotesTextarea" className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1 font-bold">
                      Strategic Goals or Specific Pain Points (Optional)
                    </label>
                    <textarea
                      id="customNotesTextarea"
                      name="customNotes"
                      rows={2}
                      placeholder="e.g. Current Meta ROAS is stuck at 2.1x; need scaling for Q4 festive season..."
                      value={customNotes}
                      onChange={(e) => setCustomNotes(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-all font-sans resize-none"
                    />
                  </div>
                </div>

                {/* Lead Qualification Summary Card */}
                <div className="mt-5 p-4 rounded-xl bg-black/60 border border-white/15 space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between text-zinc-300">
                    <span>Lead Readiness Index:</span>
                    <span className="text-emerald-400 font-bold">{leadQualificationIndex}/100 &bull; VIP Priority</span>
                  </div>
                  <div className="flex items-center justify-between text-zinc-300">
                    <span>Target ROAS Multiplier:</span>
                    <span className="text-emerald-400 font-bold">5.8x - 7.4x</span>
                  </div>
                  <div className="flex items-center justify-between text-zinc-300">
                    <span>Selected Appointment:</span>
                    <span className="text-white font-bold truncate max-w-[200px]">
                      {selectedDate.dayName}, {selectedDate.dayNumber} {selectedDate.monthName} · {effectiveTimeSlot}
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
                    data-cursor="chai"
                    type="button"
                    onClick={handleSendToWhatsApp}
                    className="w-full py-4 px-5 rounded-full bg-white hover:bg-zinc-200 text-black font-display font-black text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(255,255,255,0.3)] transition-all flex items-center justify-center gap-2 active:scale-95 group cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-black group-hover:scale-110 transition-transform" />
                    <span>DISPATCH QUALIFIED LEAD TO WHATSAPP &gt;</span>
                  </button>

                  {/* Secondary Utility Actions */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={handleCopyClipboard}
                      className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-mono text-[11px] border border-white/15 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
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
                      data-cursor="chai"
                      type="button"
                      onClick={handleAddToCalendar}
                      className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-mono text-[11px] border border-white/15 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
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
                  <p>Splendid Royale, 3rd Main Rd, Hosapalaya, Muneshwara Nagar, Bengaluru, Karnataka 560068</p>
                  <p className="text-emerald-400 font-bold">
                    CIN: U74999KA2024PTC412891 &bull; 100% Verified
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
                    href="https://maps.app.goo.gl/k4LoVj2pqinVFZsA8?g_st=iw"
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
                <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-[#0c0c0e] h-80 sm:h-96 group">
                  <iframe
                    title="Desi Muchads Official Headquarters Map - Splendid Royale Bengaluru"
                    src="https://maps.google.com/maps?q=Splendid+Royale%2C+3rd+Main+Rd%2C+Hosapalaya%2C+Muneshwara+Nagar%2C+Bengaluru%2C+Karnataka+560068&t=&z=16&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0 filter contrast-[1.05] opacity-95 group-hover:opacity-100 transition-opacity map-embed-frame"
                    loading="lazy"
                    allowFullScreen
                    style={{ width: "100%", height: "100%", minHeight: "320px", display: "block" }}
                  />
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/95 backdrop-blur-md border border-white/20 flex items-center justify-between text-xs font-mono shadow-2xl">
                    <div className="flex items-center gap-2 truncate pr-2">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="text-white truncate font-bold">
                        Splendid Royale Hub &bull; Bengaluru
                      </span>
                    </div>
                    <a
                      href="https://maps.app.goo.gl/k4LoVj2pqinVFZsA8?g_st=iw"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 shrink-0 font-bold flex items-center gap-1"
                    >
                      <span>Get Directions</span>
                      <span>↗</span>
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
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/15 backdrop-blur-md space-y-4 flex flex-col justify-between group hover:border-white/30 transition-all">
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/20 bg-[#09090c] shadow-md">
                    <img
                      src="/team/rahul-datt.jpg"
                      alt="Rahul Datt CEO"
                      className="w-full h-full object-cover object-top grayscale contrast-[1.18] brightness-[0.95] group-hover:grayscale-0 transition-all duration-500"
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
                      "Hello Rahul! I would like to schedule an Executive CEO Strategy Session for my brand."
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
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/15 backdrop-blur-md space-y-4 flex flex-col justify-between group hover:border-white/30 transition-all">
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/20 bg-[#09090c] shadow-md">
                    <img
                      src="/team/brinta-deb.jpg"
                      alt="Brinta Deb CTO"
                      className="w-full h-full object-cover object-top grayscale contrast-[1.18] brightness-[0.95] group-hover:grayscale-0 transition-all duration-500"
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
                      "Hello Brinta! I would like to consult on high-performance web engineering and conversion tech."
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-white hover:underline flex items-center gap-1.5 font-bold"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp Brinta ↗</span>
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
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/15 backdrop-blur-md space-y-4 flex flex-col justify-between group hover:border-white/30 transition-all">
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/20 bg-[#09090c] shadow-md">
                    <img
                      src="/team/omkar-dutta.png"
                      alt="Omkar Dutta CFO"
                      className="w-full h-full object-cover object-top grayscale contrast-[1.18] brightness-[0.95] group-hover:grayscale-0 transition-all duration-500"
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
                      "Hello Omkar! I would like to review unit economics and financial media allocation."
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-white hover:underline flex items-center gap-1.5 font-bold"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp Omkar ↗</span>
                  </a>
                  <a
                    href="http://www.linkedin.com/in/reodomkar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1"
                    title="Omkar Dutta LinkedIn Profile"
                  >
                    <Globe className="w-3 h-3 text-zinc-400" />
                    <span>LinkedIn ↗</span>
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

          {/* OFFICIAL AGENCY SOCIAL MEDIA PAGES & STYLISH INTERACTIVE REDIRECTION CREST */}
          <div className="mt-20 pt-16 border-t border-white/10 text-center select-none">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest font-bold block mb-2">
              ECOSYSTEM REDIRECTION &bull; OFFICIAL AGENCY CHANNELS
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase text-white tracking-tight mb-4">
              Connect Across the Mandi
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 font-sans max-w-xl mx-auto leading-relaxed mb-12">
              Follow Desi Muchads for real-time campaign breakdowns, viral creative swipe files, and behind-the-scenes e-commerce scaling strategies.
            </p>

            {/* 3-Column Luxury Social Media Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16 text-left">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/the_desi_muchads/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playChime()}
                className="group p-6 rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/15 hover:border-pink-500/50 hover:shadow-[0_0_35px_rgba(236,72,153,0.2)] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block font-bold">
                    Official Instagram
                  </span>
                  <h3 className="font-display font-black text-xl text-white mt-1 group-hover:text-pink-400 transition-colors">
                    @the_desi_muchads
                  </h3>
                  <p className="text-xs text-zinc-300 font-sans mt-2 leading-relaxed">
                    Visual swagger, high-converting video reels, and aesthetic performance ads engineered for D2C brands.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-pink-400 font-bold mt-4">
                  <span>Follow on Instagram</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/desi-muchads"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playChime()}
                className="group p-6 rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/15 hover:border-blue-500/50 hover:shadow-[0_0_35px_rgba(59,130,246,0.2)] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#0A66C2] flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24Z"/>
                    </svg>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block font-bold">
                    Official LinkedIn
                  </span>
                  <h3 className="font-display font-black text-xl text-white mt-1 group-hover:text-blue-400 transition-colors">
                    Desi Muchads Digital
                  </h3>
                  <p className="text-xs text-zinc-300 font-sans mt-2 leading-relaxed">
                    Algorithmic e-commerce breakdowns, unit economics auditing, and corporate executive insights.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-blue-400 font-bold mt-4">
                  <span>Connect on LinkedIn</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/profile.php?id=61596454145422"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playChime()}
                className="group p-6 rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/15 hover:border-indigo-500/50 hover:shadow-[0_0_35px_rgba(99,102,241,0.2)] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#1877F2] flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block font-bold">
                    Official Facebook
                  </span>
                  <h3 className="font-display font-black text-xl text-white mt-1 group-hover:text-indigo-400 transition-colors">
                    Desi Muchads Official
                  </h3>
                  <p className="text-xs text-zinc-300 font-sans mt-2 leading-relaxed">
                    Performance creative vault, community case studies, and D2C growth discussions.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-indigo-400 font-bold mt-4">
                  <span>Join on Facebook</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </a>
            </div>

            {/* PARTICULAR INTERACTIVE SOCIAL MEDIA REDIRECTION COINS (MATCHING REFERENCE) */}
            <div className="relative inline-flex flex-col items-center justify-center">
              <SocialRedirectionDeck showTitle={false} />

              <div className="mt-8 space-y-1">
                <span className="text-xs font-display font-black text-white uppercase tracking-widest block">
                  DESI MUCHADS DIGITAL LLP
                </span>
                <span className="text-[11px] font-mono text-zinc-400 block">
                  Click Any Badge to Connect Across Platforms &bull; CIN: U74999DL2024PTC412891
                </span>
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
