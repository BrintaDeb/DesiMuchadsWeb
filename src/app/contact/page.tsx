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
  Compass,
  Video,
  Download,
  RefreshCw,
} from "lucide-react";
import { sound } from "@/lib/sound";
import { triggerSessionNotification } from "@/lib/pwa";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";
import { BengaluruStudioMap } from "@/components/footer/BengaluruStudioMap";
import { BrandKundliModal } from "@/components/kundli/BrandKundliModal";

interface DateOption {
  date: Date;
  isoString: string;
  dayName: string;
  dayNumber: number;
  monthName: string;
  year: number;
}

interface BookingResponseData {
  dossierId: string;
  googleMeetUrl: string;
  googleCalendarUrl: string;
  whatsappDirectUrl: string;
  whatsappMessage: string;
  icsContent: string;
  locationString: string;
  dossier: {
    client: { name: string; brand: string; website?: string };
    engagement: {
      scheduledDate: string;
      scheduledSlot: string;
      channel: string;
      googleMeetUrl: string;
      location: string;
    };
    assignedTeam: Array<{ name: string; role: string }>;
    preSessionChecklist: Array<{ item: string; status: string }>;
  };
}

const TIME_SLOTS = [
  "11:00 AM IST",
  "11:45 AM IST",
  "02:30 PM IST",
  "03:30 PM IST",
  "05:00 PM IST",
  "06:00 PM IST",
  "07:30 PM IST",
  "08:30 PM IST",
];

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

const BUDGET_TIERS = [
  "Under ₹50K",
  "₹50K – ₹1.5L",
  "₹1.5L – ₹5L",
  "₹5L+ / mo",
];

const MEETING_CHANNELS = [
  { id: "meet", name: "Google Meet", icon: Video },
  { id: "whatsapp", name: "WhatsApp Call", icon: MessageCircle },
  { id: "zoom", name: "Zoom Video", icon: Globe },
  { id: "inperson", name: "Studio Visit", icon: MapPin },
];

export default function ContactPage() {
  const [isKundliOpen, setIsKundliOpen] = useState(false);
  const WHATSAPP_NUMBER = "9180252831";
  const WHATSAPP_DISPLAY = "+91 91802 52831";
  const OFFICIAL_EMAIL = "thedesimuchads@gmail.com";

  const [bookingModalData, setBookingModalData] = useState<BookingResponseData | null>(null);
  const [isBookingSubmitting, setIsBookingSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);

  const [liveIstTime, setLiveIstTime] = useState("");
  const [currentIstTime, setCurrentIstTime] = useState<{
    dateStr: string;
    minutes: number;
  } | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLiveIstTime(
        new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(now)
      );

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

      setCurrentIstTime({
        dateStr: `${year}-${month}-${day}`,
        minutes: hour * 60 + minute,
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 15000);
    return () => clearInterval(interval);
  }, []);

  const [calendarDays, setCalendarDays] = useState<DateOption[]>(() => {
    const days: DateOption[] = [];
    const baseEpoch = 1731715200000;
    for (let i = 0; i < 14; i++) {
      const d = new Date(baseEpoch + i * 86400000);
      days.push({
        date: d,
        isoString: `2026-11-${String(i + 16).padStart(2, "0")}`,
        dayName: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i % 7],
        dayNumber: (i % 28) + 1,
        monthName: "Nov",
        year: 2026,
      });
    }
    return days;
  });

  const [selectedDate, setSelectedDate] = useState<DateOption>(() => calendarDays[0]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("02:30 PM IST");
  const [selectedMeetingChannel, setSelectedMeetingChannel] = useState<string>("meet");

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
      const isTodayClosed = currentMins >= 1230;

      const days: DateOption[] = [];
      for (let i = 0; i < 14; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        days.push({
          date: d,
          isoString: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
            d.getDate()
          ).padStart(2, "0")}`,
          dayName: d.toLocaleDateString("en-IN", { weekday: "short" }),
          dayNumber: d.getDate(),
          monthName: d.toLocaleDateString("en-IN", { month: "short" }),
          year: d.getFullYear(),
        });
      }

      setCalendarDays(days);
      setSelectedDate(isTodayClosed && days[1] ? days[1] : days[0]);

      if (!isTodayClosed) {
        const openSlot = TIME_SLOTS.find((slot) => parseSlotMinutes(slot) > currentMins);
        setSelectedTimeSlot(openSlot || TIME_SLOTS[0]);
      } else {
        setSelectedTimeSlot(TIME_SLOTS[0]);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const isSelectedDateToday = useMemo(() => {
    if (!currentIstTime) return false;
    return selectedDate.isoString === currentIstTime.dateStr;
  }, [selectedDate.isoString, currentIstTime]);

  const isSlotExpired = (slotStr: string): boolean => {
    if (!isSelectedDateToday || !currentIstTime) return false;
    return parseSlotMinutes(slotStr) <= currentIstTime.minutes;
  };

  const availableSlotsForToday = useMemo(() => {
    if (!currentIstTime) return [];
    return TIME_SLOTS.filter((slot) => parseSlotMinutes(slot) > currentIstTime.minutes);
  }, [currentIstTime]);

  const allSlotsExpiredToday = useMemo(() => {
    if (!currentIstTime) return false;
    return availableSlotsForToday.length === 0;
  }, [availableSlotsForToday, currentIstTime]);

  const effectiveTimeSlot = useMemo(() => {
    if (!isSelectedDateToday || !currentIstTime) return selectedTimeSlot;
    if (parseSlotMinutes(selectedTimeSlot) <= currentIstTime.minutes && availableSlotsForToday.length > 0) {
      return availableSlotsForToday[0];
    }
    return selectedTimeSlot;
  }, [isSelectedDateToday, currentIstTime, selectedTimeSlot, availableSlotsForToday]);

  const [selectedBudget, setSelectedBudget] = useState<string>(BUDGET_TIERS[1]);
  const [clientName, setClientName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [brandUrl, setBrandUrl] = useState("");
  const [contactWhatsapp, setContactWhatsapp] = useState("");
  const [customNotes, setCustomNotes] = useState("");

  const generateWhatsAppMessage = () => {
    const formattedDate = `${selectedDate.dayName}, ${selectedDate.dayNumber} ${selectedDate.monthName} ${selectedDate.year}`;
    const channelName =
      MEETING_CHANNELS.find((c) => c.id === selectedMeetingChannel)?.name || "Google Meet";

    return (
      `Hello Desi Muchads!\n\n` +
      `Strategy Call Request:\n` +
      `Name: ${clientName.trim() || "Founder / Growth Lead"}\n` +
      `Brand: ${brandName.trim() || "Confidential Brand"}\n` +
      `Website: ${brandUrl.trim() || "Not specified"}\n` +
      `Phone: ${contactWhatsapp.trim() || "Direct Dispatch"}\n` +
      `Budget: ${selectedBudget}\n` +
      `Date & Time: ${formattedDate} at ${effectiveTimeSlot}\n` +
      `Format: ${channelName}` +
      (customNotes.trim() ? `\nNotes: ${customNotes.trim()}` : "")
    );
  };

  const handleSendToWhatsApp = async () => {
    setBookingError(null);
    if (isSelectedDateToday && allSlotsExpiredToday) {
      sound.playPluck(120);
      setBookingError("All slots for today have concluded. Tap 'Pick Tomorrow' above to select an open date.");
      return;
    }
    if (isSelectedDateToday && isSlotExpired(effectiveTimeSlot)) {
      sound.playPluck(120);
      setBookingError("That time slot has already passed for today. Please choose an upcoming time slot.");
      return;
    }
    sound.playChime();
    setIsBookingSubmitting(true);

    const bookingPayload = {
      clientName: clientName.trim() || "Founder / Growth Lead",
      clientPhone: contactWhatsapp.trim() || undefined,
      brandWebsite: brandUrl.trim() || undefined,
      industry: "D2C & Brand Growth",
      budgetTier: selectedBudget,
      selectedDate: selectedDate.isoString.split("T")[0],
      selectedSlot: effectiveTimeSlot,
      meetingChannel: selectedMeetingChannel,
      message: customNotes.trim() || undefined,
    };

    fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "contact_qualification_whatsapp",
        name: clientName.trim() || "Founder / Growth Lead",
        brandName: brandName.trim(),
        brandWebsite: brandUrl.trim(),
        phone: contactWhatsapp.trim(),
        budget: selectedBudget,
        service: "Strategy Session Booking",
        message: `Slot: ${effectiveTimeSlot} (${selectedMeetingChannel}) | Notes: ${customNotes.trim()}`,
      }),
    }).catch(() => {});

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload),
      });
      const data: BookingResponseData = await res.json();
      if (data && data.dossierId) {
        setBookingModalData(data);
        triggerSessionNotification({
          title: `Strategy Session Confirmed · ${data.dossierId}`,
          body: `Confirmed for ${effectiveTimeSlot} with Desi Muchads.`,
          url: "/contact",
        });
        sound.playChime();
        if (data.whatsappDirectUrl) {
          try {
            window.open(data.whatsappDirectUrl, "_blank", "noopener,noreferrer");
          } catch {
            // Popup blocker on iOS/Android still reveals confirmation modal WhatsApp button directly
          }
        }
        return;
      }
    } catch (e) {
      console.warn("[Booking Webhook Fallback]:", e);
    } finally {
      setIsBookingSubmitting(false);
    }

    const message = generateWhatsAppMessage();
    window.open(`https://wa.me/91${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleAddToCalendar = async () => {
    sound.playChime();
    if (bookingModalData?.googleCalendarUrl) {
      window.open(bookingModalData.googleCalendarUrl, "_blank");
      return;
    }

    const formattedDate = `${selectedDate.dayName}, ${selectedDate.dayNumber} ${selectedDate.monthName} ${selectedDate.year}`;
    const channelName =
      MEETING_CHANNELS.find((c) => c.id === selectedMeetingChannel)?.name || "Google Meet";
    const title = encodeURIComponent(
      `Desi Muchads Strategy Call · ${brandName.trim() || "Brand Growth"}`
    );
    const details = encodeURIComponent(
      `Strategy Call with Desi Muchads.\nSlot: ${formattedDate} at ${effectiveTimeSlot} (${channelName}).\nPhone: ${WHATSAPP_DISPLAY}\nBudget: ${selectedBudget}`
    );
    const location = encodeURIComponent(
      channelName.includes("Studio")
        ? "Desi Muchads Studio, Hosapalaya, Bengaluru"
        : "Google Meet / Video Call"
    );
    window.open(
      `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-transparent text-white selection:bg-white selection:text-black relative overflow-x-hidden">
      <Navbar onOpenKundli={() => setIsKundliOpen(true)} />

      <main className="min-h-screen bg-transparent text-white pt-28 sm:pt-32 pb-20 font-display relative overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
          {/* Header & Intro */}
          <section>
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-widest">
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <span>/</span>
                <span className="text-white font-bold">Contact</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/5 text-xs font-mono text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                <span>IST // {liveIstTime || "12:00 PM"}</span>
              </div>
            </div>

            <div className="max-w-3xl text-left space-y-3">
              <h1 className="font-display font-black text-4xl sm:text-6xl tracking-tight uppercase leading-[0.98] text-white">
                Let&apos;s Talk Growth.
              </h1>
              <p className="text-sm sm:text-base text-zinc-300 font-sans font-normal leading-relaxed max-w-2xl">
                Pick a time slot below or reach out directly on{" "}
                <strong className="text-white font-semibold">{WHATSAPP_DISPLAY}</strong> or{" "}
                <a href={`mailto:${OFFICIAL_EMAIL}`} className="text-white underline hover:text-zinc-200">
                  {OFFICIAL_EMAIL}
                </a>
                .
              </p>
            </div>
          </section>

          {/* Section 1: Booking & Direct Inquiry */}
          <section id="session" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
            {/* Left Column: Date, Time & Channel */}
            <div className="lg:col-span-6 p-6 rounded-2xl bg-white/[0.03] border border-white/15 backdrop-blur-md space-y-6">
              {/* Date Selector */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="font-display font-bold text-sm uppercase tracking-wider text-white">
                    Select Date
                  </h2>
                  <span className="text-xs font-mono text-zinc-400">
                    {selectedDate.dayName}, {selectedDate.dayNumber} {selectedDate.monthName}
                  </span>
                </div>

                <div className="flex gap-2 scroll-momentum-x pb-2">
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
                        className={`min-w-[68px] py-2.5 px-2 rounded-xl flex flex-col items-center justify-center transition-all border shrink-0 cursor-pointer ${
                          isSelected
                            ? "bg-white text-black border-white font-bold shadow-md"
                            : "bg-white/[0.04] text-zinc-300 border-white/10 hover:border-white/30 hover:bg-white/[0.08]"
                        }`}
                      >
                        <span
                          className={`text-[10px] uppercase font-mono ${
                            isSelected ? "text-zinc-600" : "text-zinc-400"
                          }`}
                        >
                          {item.dayName}
                        </span>
                        <span
                          className={`text-lg font-display font-black leading-tight ${
                            isSelected ? "text-black" : "text-white"
                          }`}
                        >
                          {item.dayNumber}
                        </span>
                        <span
                          className={`text-[9px] uppercase font-mono ${
                            isSelected ? "text-zinc-700" : "text-zinc-400"
                          }`}
                        >
                          {item.monthName}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slot Selector */}
              <div className="pt-5 border-t border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-sm uppercase tracking-wider text-white">
                    Select Time (IST)
                  </h3>
                  <span className="text-[11px] font-mono text-zinc-400">{effectiveTimeSlot}</span>
                </div>

                {isSelectedDateToday && allSlotsExpiredToday && (
                  <div className="p-3 rounded-xl bg-white/5 border border-white/15 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs text-zinc-300 font-sans">
                      <Clock className="w-4 h-4 text-zinc-400 shrink-0" />
                      <span>Today&apos;s slots have concluded.</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        sound.playPluck(150);
                        if (calendarDays[1]) {
                          setSelectedDate(calendarDays[1]);
                          setSelectedTimeSlot(TIME_SLOTS[0]);
                        }
                      }}
                      className="px-3 py-1.5 rounded-lg bg-white text-black font-display text-[11px] font-bold uppercase cursor-pointer"
                    >
                      Pick Tomorrow
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {TIME_SLOTS.map((slot) => {
                    const isExpired = isSlotExpired(slot);
                    const isSelected = effectiveTimeSlot === slot && !isExpired;
                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={isExpired}
                        onClick={() => {
                          sound.playPluck(170);
                          setSelectedTimeSlot(slot);
                        }}
                        className={`py-2 px-2 rounded-lg text-[11px] font-mono transition-all border text-center cursor-pointer ${
                          isExpired
                            ? "opacity-30 cursor-not-allowed bg-white/[0.02] border-white/5 text-zinc-500 line-through"
                            : isSelected
                            ? "bg-white text-black border-white font-bold shadow-md"
                            : "bg-white/[0.04] text-zinc-300 border-white/10 hover:border-white/30 hover:text-white"
                        }`}
                      >
                        {slot.replace(" IST", "")}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Meeting Channel */}
              <div className="pt-5 border-t border-white/10 space-y-3">
                <h3 className="font-display font-bold text-sm uppercase tracking-wider text-white">
                  Meeting Format
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
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
                        className={`p-3 rounded-xl border text-left flex flex-col gap-2 transition-all cursor-pointer ${
                          isSelected
                            ? "bg-white text-black border-white shadow-md"
                            : "bg-white/[0.03] border-white/10 text-zinc-300 hover:border-white/30"
                        }`}
                      >
                        <IconComp className={`w-4 h-4 ${isSelected ? "text-black" : "text-white"}`} />
                        <span
                          className={`text-xs font-display font-bold leading-tight ${
                            isSelected ? "text-black" : "text-white"
                          }`}
                        >
                          {ch.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Direct Contact Shortcuts */}
              <div className="pt-5 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`tel:+91${WHATSAPP_NUMBER}`}
                  className="p-3.5 rounded-xl bg-black/40 hover:bg-white/[0.06] border border-white/10 flex items-center gap-3 transition-all"
                >
                  <PhoneCall className="w-4 h-4 text-white shrink-0" />
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase block">
                      Phone / WhatsApp
                    </span>
                    <span className="text-xs font-mono font-bold text-white">{WHATSAPP_DISPLAY}</span>
                  </div>
                </a>

                <a
                  href={`mailto:${OFFICIAL_EMAIL}`}
                  className="p-3.5 rounded-xl bg-black/40 hover:bg-white/[0.06] border border-white/10 flex items-center gap-3 transition-all"
                >
                  <Mail className="w-4 h-4 text-white shrink-0" />
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase block">
                      Email
                    </span>
                    <span className="text-xs font-mono font-bold text-white truncate block">
                      {OFFICIAL_EMAIL}
                    </span>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Column: Simple Lead Form */}
            <div className="lg:col-span-6 p-6 rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/20 backdrop-blur-xl shadow-2xl space-y-5">
              <div className="pb-3 border-b border-white/10 flex items-center justify-between">
                <h2 className="font-display font-bold text-sm uppercase tracking-wider text-white">
                  Your Details
                </h2>
                <span className="text-[11px] font-mono text-zinc-400">
                  {selectedDate.dayNumber} {selectedDate.monthName} · {effectiveTimeSlot}
                </span>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="clientNameInput"
                      className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5 font-bold"
                    >
                      Your Name *
                    </label>
                    <input
                      id="clientNameInput"
                      name="clientName"
                      type="text"
                      placeholder="e.g. Vikram Sharma"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-all font-sans"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="brandNameInput"
                      className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5 font-bold"
                    >
                      Brand / Company
                    </label>
                    <input
                      id="brandNameInput"
                      name="brandName"
                      type="text"
                      placeholder="e.g. VedaRoots"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-all font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="contactWhatsappInput"
                      className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5 font-bold"
                    >
                      Phone / WhatsApp
                    </label>
                    <input
                      id="contactWhatsappInput"
                      name="contactWhatsapp"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={contactWhatsapp}
                      onChange={(e) => setContactWhatsapp(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-all font-mono"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="brandUrlInput"
                      className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5 font-bold"
                    >
                      Website URL (Optional)
                    </label>
                    <input
                      id="brandUrlInput"
                      name="brandUrl"
                      type="text"
                      placeholder="e.g. yourbrand.in"
                      value={brandUrl}
                      onChange={(e) => setBrandUrl(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-all font-sans"
                    />
                  </div>
                </div>

                <div>
                  <span className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5 font-bold">
                    Estimated Monthly Budget
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {BUDGET_TIERS.map((tier) => (
                      <button
                        key={tier}
                        type="button"
                        onClick={() => {
                          sound.playPluck(155);
                          setSelectedBudget(tier);
                        }}
                        className={`py-2 px-2 rounded-xl text-[11px] font-mono border transition-all text-center cursor-pointer ${
                          selectedBudget === tier
                            ? "bg-white text-black border-white font-bold"
                            : "bg-black/40 text-zinc-300 border-white/15 hover:border-white/30"
                        }`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="customNotesTextarea"
                    className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5 font-bold"
                  >
                    How can we help? (Optional)
                  </label>
                  <textarea
                    id="customNotesTextarea"
                    name="customNotes"
                    rows={3}
                    placeholder="Share your goals, timeline, or services you need..."
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-all font-sans resize-none"
                  />
                </div>
              </div>

              <div className="space-y-2.5 pt-2">
                {bookingError && (
                  <div
                    role="alert"
                    className="p-3 rounded-xl bg-red-500/10 border border-red-500/35 text-xs font-mono text-red-300"
                  >
                    {bookingError}
                  </div>
                )}

                <button
                  data-cursor="chai"
                  type="button"
                  disabled={isBookingSubmitting}
                  onClick={handleSendToWhatsApp}
                  className="w-full py-3.5 px-5 min-h-[48px] rounded-full bg-white hover:bg-zinc-200 text-black font-display font-black text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(255,255,255,0.25)] transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isBookingSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-black" />
                      <span>Confirming Session...</span>
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-4 h-4 text-black" />
                      <span>Book Call via WhatsApp &gt;</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleAddToCalendar}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-200 font-mono text-xs border border-white/15 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CalendarIcon className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Add to Google Calendar</span>
                </button>
              </div>
            </div>
          </section>

          {/* Section 2: Studio Location */}
          <section className="pt-12 border-t border-white/10 text-left">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <h2 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
                  Studio &amp; Headquarters
                </h2>

                <p className="text-sm text-zinc-300 leading-relaxed font-sans font-normal">
                  Visit our Bengaluru studio for in-person strategy reviews by prior appointment.
                </p>

                <div className="space-y-1.5 text-xs font-mono text-zinc-400">
                  <p className="text-white font-bold">DESI MUCHADS DIGITAL LLP</p>
                  <p>Hosapalaya, Bengaluru, Karnataka 560068</p>
                  <p className="text-zinc-300">Mon &ndash; Sat, 10:00 AM &ndash; 08:30 PM IST</p>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="https://maps.app.goo.gl/qNmRs1e5AeqprpuL8?g_st=iw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono font-bold uppercase tracking-wider text-white transition-all"
                  >
                    <Compass className="w-4 h-4 text-white" />
                    <span>Open in Maps ↗</span>
                  </a>
                  <a
                    href="https://www.instagram.com/the_desi_muchads/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-all"
                  >
                    Instagram ↗
                  </a>
                  <a
                    href="https://www.linkedin.com/company/desi-muchads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-all"
                  >
                    LinkedIn ↗
                  </a>
                </div>
              </div>

              <div className="lg:col-span-7">
                <BengaluruStudioMap heightClass="h-72 sm:h-80 rounded-2xl border-white/20" />
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer onOpenKundli={() => setIsKundliOpen(true)} />

      <BrandKundliModal isOpen={isKundliOpen} onClose={() => setIsKundliOpen(false)} />

      {bookingModalData && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              sound.playPluck(120);
              setBookingModalData(null);
            }
          }}
          className="fixed inset-0 z-[160] bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 cursor-pointer overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl bg-[#0c0c10] border border-white/20 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl text-left cursor-default my-auto"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-white">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>{bookingModalData.dossierId} · Confirmed</span>
              </div>
              <button
                type="button"
                onClick={() => setBookingModalData(null)}
                className="p-1.5 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white text-xs font-mono cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="font-display font-black text-2xl uppercase text-white tracking-tight">
                Strategy Call Reserved
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 font-sans">
                {bookingModalData.dossier.engagement.scheduledDate} at{" "}
                {bookingModalData.dossier.engagement.scheduledSlot}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <a
                href={bookingModalData.googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playChime()}
                className="py-3 px-4 rounded-xl bg-white text-black font-display font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all"
              >
                <CalendarIcon className="w-4 h-4 text-black" />
                <span>Add to Google Calendar</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  sound.playChime();
                  const blob = new Blob([bookingModalData.icsContent], {
                    type: "text/calendar;charset=utf-8",
                  });
                  const url = URL.createObjectURL(blob);
                  const link = document.createElement("a");
                  link.href = url;
                  link.setAttribute(
                    "download",
                    `desi-muchads-session-${bookingModalData.dossierId}.ics`
                  );
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  URL.revokeObjectURL(url);
                }}
                className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-mono text-xs uppercase tracking-wider border border-white/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download .ICS</span>
              </button>
            </div>

            <a
              href={bookingModalData.whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playChime()}
              className="w-full py-3.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-display font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Open WhatsApp Desk ({WHATSAPP_DISPLAY})</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
