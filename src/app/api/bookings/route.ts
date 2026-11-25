import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export interface BookingRequestPayload {
  clientName: string;
  clientEmail?: string;
  clientPhone?: string;
  brandWebsite?: string;
  instagramHandle?: string;
  industry?: string;
  budgetTier?: string;
  selectedDate: string; // ISO date string YYYY-MM-DD
  selectedSlot: string; // e.g. "02:30 PM IST"
  meetingChannel?: "meet" | "whatsapp" | "zoom" | "inperson";
  strategicGoals?: string[];
  message?: string;
}

// Generate RFC 5545 iCalendar (.ics) content
function generateIcsContent(data: {
  summary: string;
  description: string;
  location: string;
  meetUrl: string;
  dtStartStr: string;
  dtEndStr: string;
  organizerEmail: string;
  clientEmail?: string;
  clientName: string;
}): string {
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Desi Muchads Digital LLP//Strategy Session//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:dm-session-${Date.now()}@desimuchads.agency`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
    `DTSTART:${data.dtStartStr}`,
    `DTEND:${data.dtEndStr}`,
    `SUMMARY:${data.summary}`,
    `DESCRIPTION:${data.description.replace(/\n/g, "\\n")}`,
    `LOCATION:${data.location}`,
    "GEO:12.9002701;77.6454546",
    `ORGANIZER;CN=Rahul Datta (CEO):mailto:${data.organizerEmail}`,
    data.clientEmail
      ? `ATTENDEE;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED;CN=${data.clientName}:mailto:${data.clientEmail}`
      : "",
    "STATUS:CONFIRMED",
    "TRANSP:OPAQUE",
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    "DESCRIPTION:Reminder: Desi Muchads Strategy War-Room Session",
    "TRIGGER:-PT30M",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");
}

export async function POST(req: Request) {
  try {
    const payload: BookingRequestPayload = await req.json();

    if (!payload.clientName) {
      return NextResponse.json(
        { error: "Client name is required to initialize session." },
        { status: 400 }
      );
    }

    const timestamp = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "medium",
    });

    const isStudioInPerson = payload.meetingChannel === "inperson";
    const hqAddress = "Hosapalaya, Bengaluru, Karnataka 560068";
    const hqGpsLink = "https://maps.app.goo.gl/qNmRs1e5AeqprpuL8?g_st=iw";

    // 1. Generate Instant Google Meet Room
    const meetId = `dsm-${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 6)}`;
    const googleMeetUrl = `https://meet.google.com/${meetId}`;

    const locationString = isStudioInPerson
      ? `Desi Muchads HQ, ${hqAddress} (GPS: ${hqGpsLink})`
      : `Google Meet (${googleMeetUrl})`;

    // Parse date and time to format for Google Calendar and ICS
    // Default slot duration: 45 minutes
    // Extract hour and minute from selectedSlot e.g. "02:30 PM IST"
    const slotMatch = payload.selectedSlot.match(/(\d+):(\d+)\s*(AM|PM)/i);
    let startHour = 14;
    let startMin = 0;
    if (slotMatch) {
      let h = parseInt(slotMatch[1], 10);
      const m = parseInt(slotMatch[2], 10);
      const isPM = slotMatch[3].toUpperCase() === "PM";
      if (isPM && h !== 12) h += 12;
      if (!isPM && h === 12) h = 0;
      startHour = h;
      startMin = m;
    }

    // Convert IST (UTC+5:30) to UTC for standard calendar formats
    const sessionUtcDate = new Date(`${payload.selectedDate}T${String(startHour).padStart(2, "0")}:${String(startMin).padStart(2, "0")}:00+05:30`);
    const sessionUtcEnd = new Date(sessionUtcDate.getTime() + 45 * 60 * 1000);

    const dtStartStr = sessionUtcDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const dtEndStr = sessionUtcEnd.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

    // 2. Generate Google Calendar 1-Click Link
    const gCalTitle = encodeURIComponent(`Desi Muchads Strategy War-Room: ${payload.clientName} × Rahul Datta & Omkar Dutta`);
    const gCalDetails = encodeURIComponent(
      `Executive Growth & Unit Economics Session with Desi Muchads Principals.\n\n` +
      `• Assigned Principals: Rahul Datta (CEO) & Omkar Dutta (CFO)\n` +
      `• Brand: ${payload.brandWebsite || payload.clientName}\n` +
      `• Channel: ${isStudioInPerson ? "Studio In-Person" : "Google Meet Video"}\n` +
      `• Meeting Link: ${googleMeetUrl}\n` +
      `• HQ Coordinates: 12.9002701° N, 77.6454546° E\n` +
      `• HQ Directions: ${hqGpsLink}\n\n` +
      `Agenda:\n1. 14-Point Blended ROAS & Ad Spend Diagnostics\n2. Fitts's Law Mobile Checkout Optimization\n3. 90-Day Scaling Road-Map`
    );
    const gCalLocation = encodeURIComponent(locationString);
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${gCalTitle}&dates=${dtStartStr}/${dtEndStr}&details=${gCalDetails}&location=${gCalLocation}`;

    // 3. Generate .ics file content
    const icsContent = generateIcsContent({
      summary: `Desi Muchads Strategy War-Room: ${payload.clientName}`,
      description: `Executive Growth & Unit Economics Session with Rahul Datta (CEO) & Omkar Dutta (CFO).\nMeeting URL: ${googleMeetUrl}\nHQ Directions: ${hqGpsLink}`,
      location: locationString,
      meetUrl: googleMeetUrl,
      dtStartStr,
      dtEndStr,
      organizerEmail: "thedesimuchads@gmail.com",
      clientEmail: payload.clientEmail,
      clientName: payload.clientName,
    });

    // 4. Automated WhatsApp Confirmation Payload
    const whatsappText =
      `*DESI MUCHADS STRATEGY SESSION CONFIRMED* 👑\n\n` +
      `Hello ${payload.clientName},\n` +
      `Your executive growth session with *Rahul Datta (CEO)* & *Omkar Dutta (CFO)* is booked.\n\n` +
      `📅 *Date:* ${payload.selectedDate}\n` +
      `⏰ *Time:* ${payload.selectedSlot}\n` +
      `📍 *Mode:* ${isStudioInPerson ? "In-Person at Bengaluru HQ" : "Google Meet Room"}\n` +
      (isStudioInPerson ? `🗺️ *HQ Directions:* ${hqGpsLink}\n🏢 *Address:* ${hqAddress}\n` : `🔗 *Video Room:* ${googleMeetUrl}\n`) +
      `\n📋 *Prep Checklist:* Have your last 90-day blended CAC and top 3 SKU gross margin figures ready.\n\n` +
      `Looking forward to building your category dominance!`;

    const whatsappDirectUrl = `https://wa.me/919180252831?text=${encodeURIComponent(whatsappText)}`;

    // 5. Build Automated Client Dossier for Rahul & Omkar (Notion/CRM format)
    const dossierId = `DM-DOSSIER-${Date.now().toString(36).toUpperCase()}`;
    const clientDossier = {
      dossierId,
      status: "SCHEDULED_CONFIRMED",
      createdAt: timestamp,
      client: {
        name: payload.clientName,
        email: payload.clientEmail || "N/A",
        phone: payload.clientPhone || "N/A",
        website: payload.brandWebsite || "N/A",
        instagram: payload.instagramHandle || "N/A",
      },
      engagement: {
        industry: payload.industry || "General D2C",
        budgetTier: payload.budgetTier || "Flexible",
        channel: payload.meetingChannel || "meet",
        scheduledDate: payload.selectedDate,
        scheduledSlot: payload.selectedSlot,
        googleMeetUrl,
        location: locationString,
      },
      strategicObjectives: payload.strategicGoals || ["Scale Blended ROAS (5.8x+)"],
      clientNotes: payload.message || "No initial notes provided.",
      assignedTeam: [
        { name: "Rahul Datta", role: "CEO & Growth Principal" },
        { name: "Omkar Dutta", role: "CFO & Unit Economics Principal" },
      ],
      preSessionChecklist: [
        { item: "Inspect Pixel & CBO Architecture", status: "PENDING" },
        { item: "Calculate True CM3 Contribution Margin", status: "PENDING" },
        { item: "Benchmark Against Category Leader", status: "READY" },
      ],
    };

    // Save dossier to persistent scratch folder for record-keeping
    try {
      const dossierDir = path.join(process.cwd(), "scratch", "dossiers");
      if (!fs.existsSync(dossierDir)) {
        fs.mkdirSync(dossierDir, { recursive: true });
      }
      fs.writeFileSync(
        path.join(dossierDir, `${dossierId}.json`),
        JSON.stringify(clientDossier, null, 2),
        "utf-8"
      );
    } catch (saveErr) {
      console.warn("[Dossier File Persistence Warning]:", saveErr);
    }

    // 6. Optional Telegram Dispatch for Instant Founder Mobile Notification
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;
    if (telegramBotToken && telegramChatId) {
      const tgMsg =
        `⚡ *NEW STRATEGY WAR-ROOM SESSION BOOKED* ⚡\n\n` +
        `• *Client:* ${payload.clientName}\n` +
        `• *Date & Slot:* ${payload.selectedDate} @ ${payload.selectedSlot}\n` +
        `• *Channel:* ${payload.meetingChannel?.toUpperCase() || "MEET"}\n` +
        `• *Phone/WhatsApp:* \`${payload.clientPhone || "N/A"}\`\n` +
        `• *Brand:* ${payload.brandWebsite || "N/A"}\n` +
        `• *Dossier ID:* \`${dossierId}\`\n` +
        `\n🔗 *Meeting Room:* ${googleMeetUrl}\n` +
        `📍 *HQ Pin:* ${hqGpsLink}`;

      fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: telegramChatId, text: tgMsg, parse_mode: "Markdown" }),
      }).catch((e) => console.warn("[Telegram Dispatch]:", e));
    }

    return NextResponse.json({
      success: true,
      dossierId,
      googleMeetUrl,
      googleCalendarUrl,
      whatsappDirectUrl,
      whatsappMessage: whatsappText,
      icsContent,
      locationString,
      dossier: clientDossier,
    });
  } catch (error) {
    console.error("[Booking Webhook Agent Error]:", error);
    return NextResponse.json(
      { error: "Failed to initialize automated onboarding workflow." },
      { status: 500 }
    );
  }
}
