"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  Trash2,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Copy,
  Check,
  Eye,
  ChevronDown,
} from "lucide-react";
import {
  useProposal,
  formatCartInr,
  AGENCY_WHATSAPP_NUMBER,
} from "@/context/AgencyProposalContext";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";

export function ServiceCartDrawer() {
  const {
    cartItems,
    cartCount,
    isCartOpen,
    closeCart,
    updateCartItemQty,
    removeFromCart,
    clearCart,
    buildCartWhatsAppUrl,
  } = useProposal();

  const [clientName, setClientName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [notes, setNotes] = useState("");
  const [dispatched, setDispatched] = useState(false);
  const [showWaPreview, setShowWaPreview] = useState(true);
  const [copiedMsg, setCopiedMsg] = useState(false);

  const handleClose = React.useCallback(() => {
    setDispatched(false);
    closeCart();
  }, [closeCart]);

  // Close drawer on Escape and lock body scroll while open
  useEffect(() => {
    if (!isCartOpen) {
      return;
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.dispatchEvent(
      new CustomEvent("dm_mobile_drawer_change", { detail: { open: true } })
    );

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.dispatchEvent(
        new CustomEvent("dm_mobile_drawer_change", { detail: { open: false } })
      );
      window.removeEventListener("keydown", handleKey);
    };
  }, [isCartOpen, handleClose]);

  if (!isCartOpen) return null;

  const monthlyTotal = cartItems
    .filter((item) => item.billingUnit === "/ mo")
    .reduce((sum, item) => sum + item.priceInr * item.quantity, 0);

  const oneTimeTotal = cartItems
    .filter((item) => item.billingUnit !== "/ mo")
    .reduce((sum, item) => sum + item.priceInr * item.quantity, 0);

  const grandTotal = monthlyTotal + oneTimeTotal;

  const whatsappUrl = buildCartWhatsAppUrl({
    clientName: clientName.trim() || undefined,
    brandName: brandName.trim() || undefined,
    notes: notes.trim() || undefined,
  });

  const decodedMessage = (() => {
    try {
      const idx = whatsappUrl.indexOf("text=");
      return idx >= 0 ? decodeURIComponent(whatsappUrl.slice(idx + 5)) : "";
    } catch {
      return "";
    }
  })();

  const handleCopyMessage = async () => {
    if (!decodedMessage) return;
    haptics.selection();
    sound.playPluck(180);
    try {
      await navigator.clipboard.writeText(decodedMessage);
      setCopiedMsg(true);
      setTimeout(() => setCopiedMsg(false), 2500);
    } catch {
      // Ignore clipboard failures
    }
  };

  const handleDispatchLead = () => {
    sound.playChime();
    haptics.success();
    setDispatched(true);

    const summaryList = cartItems
      .map(
        (item) =>
          `${item.categoryTitle} - ${item.tierName} (${formatCartInr(item.priceInr)} x ${item.quantity})`
      )
      .join(" | ");

    try {
      fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        keepalive: true,
        body: JSON.stringify({
          source: "service_cart_whatsapp",
          name: clientName.trim() || brandName.trim() || "Service Cart Client",
          brandWebsite: brandName.trim() || undefined,
          budget: formatCartInr(grandTotal),
          service: summaryList,
          message: notes.trim()
            ? `Cart Items (${cartCount}): ${summaryList}. Notes: ${notes.trim()}`
            : `Cart Items (${cartCount}): ${summaryList}`,
        }),
      }).catch(() => {});
    } catch {
      // Ignore submission errors
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-cart-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          sound.playPluck(130);
          handleClose();
        }
      }}
      className="fixed inset-0 z-[170] bg-black/80 backdrop-blur-md flex justify-end animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md sm:max-w-lg h-[100dvh] bg-[#0b0b0d] border-l border-white/15 text-white flex flex-col shadow-[0_0_80px_rgba(0,0,0,0.95)]"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-white/10 bg-[#0e0e11] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2
                id="service-cart-title"
                className="font-display font-black text-base sm:text-lg uppercase tracking-tight text-white flex items-center gap-2"
              >
                <span>Your Service Cart</span>
                <span className="px-2 py-0.5 rounded-full bg-white text-black font-mono text-[10px] font-black">
                  {cartCount}
                </span>
              </h2>
              <p className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
                WhatsApp Dispatch: +91 91802 52831
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playPluck(130);
              handleClose();
            }}
            aria-label="Close service cart"
            className="w-10 h-10 rounded-xl border border-white/15 bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-5 space-y-5">
          {cartItems.length === 0 ? (
            <div className="py-16 px-4 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-zinc-500" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-display font-bold text-lg text-white uppercase">
                  Your Service Cart Is Empty
                </h3>
                <p className="text-xs text-zinc-400 font-sans max-w-xs mx-auto leading-relaxed">
                  Select any tier from Graphics Designing, SEO Management, Social Media, Website Development or Branding to prepare your WhatsApp quote.
                </p>
              </div>
              <Link
                href="/pricing"
                onClick={handleClose}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-zinc-200 text-black font-mono text-xs font-black uppercase tracking-wider transition-all"
              >
                <span>Browse Service Pricing</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <>
              {/* Item List */}
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl p-4 bg-[#121216] border border-white/12 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5 mb-1">
                          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                            {item.categoryTitle}
                          </span>
                          <span className="text-zinc-600">•</span>
                          <span className="font-mono text-[10px] text-zinc-400">
                            {item.tierCode}
                          </span>
                          {item.billingCycleLabel && (
                            <span className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/10 font-mono text-[9px] text-zinc-300">
                              {item.billingCycleLabel}
                            </span>
                          )}
                        </div>
                        <h3 className="font-display font-black text-base text-white uppercase tracking-tight">
                          {item.tierName}
                        </h3>
                        {item.outputBadge && (
                          <span className="inline-block mt-1 font-mono text-[10px] text-zinc-400">
                            Scope: {item.outputBadge}
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          haptics.light();
                          sound.playPluck(120);
                          removeFromCart(item.id);
                        }}
                        aria-label={`Remove ${item.tierName}`}
                        className="p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors shrink-0 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                      {/* Quantity Stepper */}
                      <div className="inline-flex items-center rounded-xl bg-[#0a0a0c] border border-white/15 p-0.5">
                        <button
                          type="button"
                          onClick={() => {
                            haptics.selection();
                            sound.playPluck(130);
                            updateCartItemQty(item.id, -1);
                          }}
                          aria-label={`Decrease ${item.tierName} quantity`}
                          className="w-8 h-8 rounded-lg hover:bg-white/10 text-zinc-300 flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 font-mono text-xs font-bold text-white min-w-[28px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            haptics.selection();
                            sound.playPluck(165);
                            updateCartItemQty(item.id, 1);
                          }}
                          aria-label={`Increase ${item.tierName} quantity`}
                          className="w-8 h-8 rounded-lg hover:bg-white/10 text-zinc-300 flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Price Display */}
                      <div className="text-right">
                        <div className="font-metric font-black text-lg text-white leading-none">
                          {formatCartInr(item.priceInr * item.quantity)}
                        </div>
                        <span className="font-mono text-[10px] text-zinc-400">
                          {formatCartInr(item.priceInr)} {item.billingUnit}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Optional Client Details */}
              <div className="rounded-2xl p-4 bg-[#101014] border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                    <span>Optional Details (Included in WhatsApp)</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Your Name"
                    aria-label="Your Name"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#09090b] border border-white/15 focus:border-white/50 text-xs font-sans text-white placeholder:text-zinc-500 outline-none"
                  />
                  <input
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="Brand / Company Name"
                    aria-label="Brand or Company Name"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#09090b] border border-white/15 focus:border-white/50 text-xs font-sans text-white placeholder:text-zinc-500 outline-none"
                  />
                </div>

                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  placeholder="Optional requirements or project notes..."
                  aria-label="Additional requirement notes"
                  className="w-full px-3 py-2 rounded-xl bg-[#09090b] border border-white/15 focus:border-white/50 text-xs font-sans text-white placeholder:text-zinc-500 outline-none resize-none"
                />
              </div>

              {/* Live WhatsApp Message Preview Panel */}
              <div className="rounded-2xl bg-[#0e0e12] border border-white/12 overflow-hidden">
                <div className="px-4 py-2.5 border-b border-white/10 flex items-center justify-between gap-2 bg-white/[0.02]">
                  <button
                    type="button"
                    onClick={() => {
                      sound.playPluck(140);
                      setShowWaPreview((prev) => !prev);
                    }}
                    className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-200 hover:text-white cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Live WhatsApp Message Preview</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform ${
                        showWaPreview ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyMessage}
                    className="px-2.5 py-1 rounded-lg bg-white/[0.06] hover:bg-white/15 border border-white/15 text-[10px] font-mono font-bold text-zinc-200 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    {copiedMsg ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-300">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {showWaPreview && (
                  <pre className="p-3.5 text-[11px] leading-relaxed font-mono text-zinc-300 whitespace-pre-wrap break-words max-h-48 overflow-y-auto bg-[#070709]">
                    {decodedMessage}
                  </pre>
                )}
              </div>
            </>
          )}
        </div>

        {/* Sticky Checkout Footer */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-white/10 bg-[#0e0e11] space-y-3 shrink-0 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <div className="space-y-1.5 font-mono text-xs">
              {monthlyTotal > 0 && (
                <div className="flex items-center justify-between text-zinc-300">
                  <span>Monthly Recurring Subtotal</span>
                  <span className="font-bold text-white">
                    {formatCartInr(monthlyTotal)} / mo
                  </span>
                </div>
              )}
              {oneTimeTotal > 0 && (
                <div className="flex items-center justify-between text-zinc-300">
                  <span>One-Time Project Subtotal</span>
                  <span className="font-bold text-white">
                    {formatCartInr(oneTimeTotal)}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between pt-2 border-t border-white/10 text-sm">
                <span className="font-bold uppercase tracking-wider text-zinc-400">
                  Total Estimate
                </span>
                <span className="font-metric font-black text-xl text-white">
                  {formatCartInr(grandTotal)}
                </span>
              </div>
            </div>

            {dispatched && (
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>
                  WhatsApp brief opened for +{AGENCY_WHATSAPP_NUMBER} with your {cartCount} selected service(s).
                </span>
              </div>
            )}

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleDispatchLead}
              className="w-full py-3.5 px-5 rounded-xl bg-white hover:bg-zinc-200 text-black font-display font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(255,255,255,0.22)] active:scale-95 min-h-[48px]"
            >
              <MessageCircle className="w-4 h-4 text-black shrink-0" />
              <span>Send Selected Services on WhatsApp</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </a>

            <div className="flex items-center justify-between gap-3 pt-1">
              <button
                type="button"
                onClick={handleClose}
                className="text-[11px] font-mono text-zinc-400 hover:text-white underline underline-offset-4 cursor-pointer"
              >
                + Add More Services
              </button>
              <button
                type="button"
                onClick={() => {
                  haptics.light();
                  sound.playPluck(115);
                  clearCart();
                }}
                className="text-[11px] font-mono text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
