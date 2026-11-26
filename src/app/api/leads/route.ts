import { NextResponse } from "next/server";

export interface LeadSubmissionPayload {
  source: string;
  name: string;
  phone?: string;
  email?: string;
  brandWebsite?: string;
  instagramHandle?: string;
  budget?: string;
  service?: string;
  timeline?: string;
  message?: string;
  estimatedRoas?: string;
}

export async function POST(req: Request) {
  try {
    const payload: LeadSubmissionPayload = await req.json();

    if (!payload.name) {
      return NextResponse.json(
        { error: "Name or business identifier is required" },
        { status: 400 }
      );
    }

    const timestamp = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "medium",
    });

    // 1. Pillar 3.1: Telegram Bot Lead Alert Dispatch
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;

    let telegramDispatched = false;

    if (telegramBotToken && telegramChatId) {
      const telegramMessage =
        `👑 *NEW HIGH-TICKET LEAD DISPATCH* 👑\n\n` +
        `• *Source:* ${payload.source.toUpperCase()}\n` +
        `• *Client Name:* ${payload.name}\n` +
        `• *WhatsApp / Phone:* \`${payload.phone || "Not provided"}\`\n` +
        `• *Email:* \`${payload.email || "Not provided"}\`\n` +
        `• *Brand Website:* ${payload.brandWebsite || "Not provided"}\n` +
        `• *Instagram Handle:* ${payload.instagramHandle || "Not provided"}\n` +
        `• *Monthly Budget:* ${payload.budget || "Custom / Flexible"}\n` +
        `• *Discipline:* ${payload.service || "Dominance Engine Retainer"}\n` +
        (payload.estimatedRoas ? `• *Target ROAS:* ${payload.estimatedRoas}\n` : "") +
        (payload.message ? `• *Objective Notes:* ${payload.message}\n` : "") +
        `\n⏰ *Captured at:* ${timestamp}\n` +
        `⚡ *Platform:* Desi Muchads Lead Engine`;

      try {
        const tgRes = await fetch(
          `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: telegramChatId,
              text: telegramMessage,
              parse_mode: "Markdown",
            }),
          }
        );
        telegramDispatched = tgRes.ok;
      } catch (err) {
        console.warn("[Telegram Dispatch Warning]:", err);
      }
    }

    // 2. Pillar 3.2: Google Sheets / Notion Webhook Auto-Sync
    const sheetsWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    let sheetsDispatched = false;

    if (sheetsWebhookUrl) {
      try {
        const sheetRes = await fetch(sheetsWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            timestamp,
            ...payload,
          }),
        });
        sheetsDispatched = sheetRes.ok;
      } catch (err) {
        console.warn("[Google Sheets CRM Sync Warning]:", err);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Lead recorded with Desi Muchads Studio",
      data: {
        timestamp,
        telegramDispatched,
        sheetsDispatched,
        simulated: !telegramBotToken && !sheetsWebhookUrl,
      },
    });
  } catch (err) {
    console.error("[Lead Capture Error]:", err);
    return NextResponse.json(
      { error: "Failed to process lead dispatch" },
      { status: 500 }
    );
  }
}
