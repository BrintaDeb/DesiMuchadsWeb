"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useSyncExternalStore,
} from "react";

interface ProposalState {
  budget: number;
  industry: string;
  selectedServices: string[];
  brandUrl: string;
  targetObjective: string;
  estimatedRoas: string;
}

export interface ServiceCartItem {
  id: string;
  categoryTitle: string;
  tierCode: string;
  tierName: string;
  priceInr: number;
  basePriceInr?: number;
  billingUnit: "/ mo" | "/ project";
  billingCycleLabel?: string;
  outputBadge?: string;
  quantity: number;
}

export interface CartWhatsAppMeta {
  clientName?: string;
  brandName?: string;
  clientPhone?: string;
  notes?: string;
}

interface ProposalContextType {
  proposal: ProposalState;
  updateBudget: (budget: number) => void;
  updateIndustry: (industry: string) => void;
  updateServices: (services: string[]) => void;
  updateBrandUrl: (url: string) => void;
  updateRoas: (roas: string) => void;
  generateWhatsAppPayload: () => string;

  // Service Cart State & Actions
  cartItems: ServiceCartItem[];
  cartCount: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (
    item: Omit<ServiceCartItem, "quantity">,
    options?: { openDrawer?: boolean; incrementIfExists?: boolean }
  ) => void;
  addManyToCart: (
    items: Omit<ServiceCartItem, "quantity">[],
    options?: { openDrawer?: boolean }
  ) => void;
  updateCartItemQty: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  buildCartWhatsAppUrl: (meta?: CartWhatsAppMeta) => string;
}

const CART_STORAGE_KEY = "dm_service_cart_v1";
const CART_EVENT_NAME = "dm_service_cart_update";
export const AGENCY_WHATSAPP_NUMBER = "919180252831";

const EMPTY_CART: ServiceCartItem[] = [];
let cachedRawCart: string | null = null;
let cachedParsedCart: ServiceCartItem[] = EMPTY_CART;

function readCartSnapshot(): ServiceCartItem[] {
  if (typeof window === "undefined") return EMPTY_CART;
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (raw === cachedRawCart) {
      return cachedParsedCart;
    }
    cachedRawCart = raw;
    if (!raw) {
      cachedParsedCart = EMPTY_CART;
      return cachedParsedCart;
    }
    const parsed = JSON.parse(raw);
    cachedParsedCart = Array.isArray(parsed)
      ? parsed.filter(
          (x): x is ServiceCartItem =>
            !!x && typeof x.id === "string" && typeof x.priceInr === "number"
        )
      : EMPTY_CART;
    return cachedParsedCart;
  } catch {
    return EMPTY_CART;
  }
}

function getServerCartSnapshot(): ServiceCartItem[] {
  return EMPTY_CART;
}

function writeCartStorage(
  updater: (prev: ServiceCartItem[]) => ServiceCartItem[]
) {
  if (typeof window === "undefined") return;
  const current = readCartSnapshot();
  const next = updater(current);
  const raw = JSON.stringify(next);
  cachedRawCart = raw;
  cachedParsedCart = next;
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, raw);
  } catch {
    // Ignore storage quota/security errors
  }
  window.dispatchEvent(new Event(CART_EVENT_NAME));
}

function subscribeCartStore(listener: () => void) {
  if (typeof window === "undefined") return () => {};
  const onStorage = (e: StorageEvent) => {
    if (!e.key || e.key === CART_STORAGE_KEY) {
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(CART_EVENT_NAME, listener);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(CART_EVENT_NAME, listener);
  };
}

const defaultProposal: ProposalState = {
  budget: 250000,
  industry: "D2C Fashion",
  selectedServices: ["Paid Media Buying", "Viral Reels Production"],
  brandUrl: "",
  targetObjective: "Direct E-Commerce Sales",
  estimatedRoas: "4.8x",
};

const AgencyProposalContext = createContext<ProposalContextType>({
  proposal: defaultProposal,
  updateBudget: () => {},
  updateIndustry: () => {},
  updateServices: () => {},
  updateBrandUrl: () => {},
  updateRoas: () => {},
  generateWhatsAppPayload: () => "",
  cartItems: EMPTY_CART,
  cartCount: 0,
  isCartOpen: false,
  openCart: () => {},
  closeCart: () => {},
  addToCart: () => {},
  addManyToCart: () => {},
  updateCartItemQty: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  buildCartWhatsAppUrl: () => `https://wa.me/${AGENCY_WHATSAPP_NUMBER}`,
});

export function formatCartInr(val: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val);
}

export function AgencyProposalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [proposal, setProposal] = useState<ProposalState>(defaultProposal);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartItems = useSyncExternalStore(
    subscribeCartStore,
    readCartSnapshot,
    getServerCartSnapshot
  );

  const updateBudget = (budget: number) => setProposal((p) => ({ ...p, budget }));
  const updateIndustry = (industry: string) => setProposal((p) => ({ ...p, industry }));
  const updateServices = (selectedServices: string[]) =>
    setProposal((p) => ({ ...p, selectedServices }));
  const updateBrandUrl = (brandUrl: string) => setProposal((p) => ({ ...p, brandUrl }));
  const updateRoas = (estimatedRoas: string) => setProposal((p) => ({ ...p, estimatedRoas }));

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const addToCart = useCallback(
    (
      item: Omit<ServiceCartItem, "quantity">,
      options?: { openDrawer?: boolean; incrementIfExists?: boolean }
    ) => {
      const shouldOpen = options?.openDrawer ?? true;
      const shouldInc = options?.incrementIfExists ?? false;

      writeCartStorage((prev) => {
        const idx = prev.findIndex((existing) => existing.id === item.id);
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = {
            ...next[idx],
            ...item,
            quantity: shouldInc ? next[idx].quantity + 1 : next[idx].quantity,
          };
          return next;
        }
        return [...prev, { ...item, quantity: 1 }];
      });

      if (shouldOpen) {
        setIsCartOpen(true);
      }
    },
    []
  );

  const addManyToCart = useCallback(
    (
      items: Omit<ServiceCartItem, "quantity">[],
      options?: { openDrawer?: boolean }
    ) => {
      if (items.length === 0) return;
      writeCartStorage((prev) => {
        const next = [...prev];
        for (const item of items) {
          const idx = next.findIndex((existing) => existing.id === item.id);
          if (idx >= 0) {
            next[idx] = { ...next[idx], ...item };
          } else {
            next.push({ ...item, quantity: 1 });
          }
        }
        return next;
      });
      if (options?.openDrawer ?? true) {
        setIsCartOpen(true);
      }
    },
    []
  );

  const updateCartItemQty = useCallback((id: string, delta: number) => {
    writeCartStorage((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const removeFromCart = useCallback((id: string) => {
    writeCartStorage((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    writeCartStorage(() => EMPTY_CART);
  }, []);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const buildCartWhatsAppUrl = useCallback(
    (meta?: CartWhatsAppMeta) => {
      const monthlyTotal = cartItems
        .filter((item) => item.billingUnit === "/ mo")
        .reduce((sum, item) => sum + item.priceInr * item.quantity, 0);
      const oneTimeTotal = cartItems
        .filter((item) => item.billingUnit !== "/ mo")
        .reduce((sum, item) => sum + item.priceInr * item.quantity, 0);
      const grandTotal = monthlyTotal + oneTimeTotal;

      const lines = cartItems.map((item, idx) => {
        const lineTotal = item.priceInr * item.quantity;
        const cycleNote = item.billingCycleLabel ? ` [${item.billingCycleLabel}]` : "";
        const qtyNote = item.quantity > 1 ? ` × ${item.quantity}` : "";
        const scopeNote = item.outputBadge ? ` (${item.outputBadge})` : "";
        return `${idx + 1}. *${item.categoryTitle}* — ${item.tierName} (${item.tierCode})${scopeNote}${cycleNote}\n   Rate: ${formatCartInr(item.priceInr)} ${item.billingUnit}${qtyNote} = *${formatCartInr(lineTotal)}*`;
      });

      const header =
        `Hello Desi Muchads! 👋\n` +
        `I have selected the following service tier(s) from your cart and would like to proceed:\n\n`;

      const clientDetails =
        (meta?.clientName ? `• *Name:* ${meta.clientName}\n` : "") +
        (meta?.brandName ? `• *Business / Brand:* ${meta.brandName}\n` : "") +
        (meta?.clientPhone ? `• *Contact Number:* ${meta.clientPhone}\n` : "") +
        (meta?.clientName || meta?.brandName || meta?.clientPhone ? "\n" : "");

      const itemsBlock =
        lines.length > 0
          ? `*Selected Service Cart (${cartCount} item${cartCount === 1 ? "" : "s"}):*\n` +
          lines.join("\n\n") +
          `\n\n`
          : "";

      const totalsBlock =
        `*Estimated Breakdown:*\n` +
        (monthlyTotal > 0 ? `• Monthly Recurring: *${formatCartInr(monthlyTotal)} / mo*\n` : "") +
        (oneTimeTotal > 0 ? `• One-Time Project Fee: *${formatCartInr(oneTimeTotal)}*\n` : "") +
        `• *Combined Estimate:* *${formatCartInr(grandTotal)}*\n` +
        (meta?.notes ? `\n*Additional Notes:* ${meta.notes}\n` : "") +
        `\nPlease share onboarding details and next steps on WhatsApp!`;

      const fullMessage = header + clientDetails + itemsBlock + totalsBlock;
      return `https://wa.me/${AGENCY_WHATSAPP_NUMBER}?text=${encodeURIComponent(fullMessage)}`;
    },
    [cartItems, cartCount]
  );

  const generateWhatsAppPayload = () => {
    if (cartItems.length > 0) {
      return buildCartWhatsAppUrl();
    }

    const msg =
      `Hello Desi Muchads!\n\n` +
      `Here is my Customized Agency Proposal Request:\n` +
      `✦ Monthly Ad Budget: ${formatCartInr(proposal.budget)}\n` +
      `✦ Industry Sector: ${proposal.industry}\n` +
      `✦ Selected Stack: ${proposal.selectedServices.join(", ")}\n` +
      `✦ Target ROAS Multiplier: ${proposal.estimatedRoas}\n` +
      (proposal.brandUrl ? `✦ Brand URL: ${proposal.brandUrl}\n` : "") +
      `\nLet's schedule our 15-Minute Strategy Call!`;

    return `https://wa.me/${AGENCY_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <AgencyProposalContext.Provider
      value={{
        proposal,
        updateBudget,
        updateIndustry,
        updateServices,
        updateBrandUrl,
        updateRoas,
        generateWhatsAppPayload,
        cartItems,
        cartCount,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
        addManyToCart,
        updateCartItemQty,
        removeFromCart,
        clearCart,
        buildCartWhatsAppUrl,
      }}
    >
      {children}
    </AgencyProposalContext.Provider>
  );
}

export const useProposal = () => useContext(AgencyProposalContext);
