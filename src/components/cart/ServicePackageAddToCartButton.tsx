"use client";

import React from "react";
import { ShoppingBag, Check, ArrowRight } from "lucide-react";
import { useProposal } from "@/context/AgencyProposalContext";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";

interface ServicePackageAddToCartButtonProps {
  packageId: string;
  categoryTitle: string;
  tierCode: string;
  tierName: string;
  priceDisplay: string;
  period: string;
}

function parseInrFromDisplay(priceStr: string): number {
  const digits = priceStr.replace(/[^0-9]/g, "");
  return digits ? Number(digits) : 0;
}

export function ServicePackageAddToCartButton({
  packageId,
  categoryTitle,
  tierCode,
  tierName,
  priceDisplay,
  period,
}: ServicePackageAddToCartButtonProps) {
  const { cartItems, addToCart, openCart } = useProposal();
  const inCart = cartItems.some((item) => item.id === packageId);
  const priceInr = parseInrFromDisplay(priceDisplay);
  const billingUnit: "/ mo" | "/ project" = period.toLowerCase().includes("month")
    ? "/ mo"
    : "/ project";

  return (
    <button
      type="button"
      onClick={() => {
        sound.playChime();
        haptics.selection();
        if (inCart) {
          openCart();
          return;
        }
        addToCart(
          {
            id: packageId,
            categoryTitle,
            tierCode,
            tierName,
            priceInr,
            basePriceInr: priceInr,
            billingUnit,
            billingCycleLabel: billingUnit === "/ mo" ? "Monthly" : "One-Time Sprint",
          },
          { openDrawer: true }
        );
      }}
      className={`w-full py-3.5 px-4 rounded-xl font-display text-xs font-black tracking-widest uppercase transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[44px] ${
        inCart
          ? "bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-400/50 text-emerald-300"
          : "bg-white hover:bg-zinc-200 text-black"
      }`}
    >
      {inCart ? (
        <>
          <Check className="w-4 h-4 shrink-0" />
          <span>IN CART · OPEN CART</span>
        </>
      ) : (
        <>
          <ShoppingBag className="w-4 h-4 shrink-0" />
          <span>ADD TIER TO CART</span>
          <ArrowRight className="w-3.5 h-3.5 shrink-0" />
        </>
      )}
    </button>
  );
}

export function ServiceCartHeaderTrigger() {
  const { cartCount, openCart } = useProposal();
  return (
    <button
      type="button"
      onClick={() => {
        sound.playPluck(160);
        haptics.selection();
        openCart();
      }}
      aria-label={`Open service cart (${cartCount} items)`}
      className="relative px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
    >
      <ShoppingBag className="w-3.5 h-3.5 text-white" />
      <span>Cart</span>
      {cartCount > 0 && (
        <span className="px-1.5 py-0.5 rounded-full bg-white text-black text-[10px] font-black leading-none">
          {cartCount}
        </span>
      )}
    </button>
  );
}
