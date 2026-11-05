"use client";

import React, { createContext, useContext, useState } from "react";

interface ProposalState {
  budget: number;
  industry: string;
  selectedServices: string[];
  brandUrl: string;
  targetObjective: string;
  estimatedRoas: string;
}

interface ProposalContextType {
  proposal: ProposalState;
  updateBudget: (budget: number) => void;
  updateIndustry: (industry: string) => void;
  updateServices: (services: string[]) => void;
  updateBrandUrl: (url: string) => void;
  updateRoas: (roas: string) => void;
  generateWhatsAppPayload: () => string;
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
});

export function AgencyProposalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [proposal, setProposal] = useState<ProposalState>(defaultProposal);

  const updateBudget = (budget: number) => setProposal((p) => ({ ...p, budget }));
  const updateIndustry = (industry: string) => setProposal((p) => ({ ...p, industry }));
  const updateServices = (selectedServices: string[]) =>
    setProposal((p) => ({ ...p, selectedServices }));
  const updateBrandUrl = (brandUrl: string) => setProposal((p) => ({ ...p, brandUrl }));
  const updateRoas = (estimatedRoas: string) => setProposal((p) => ({ ...p, estimatedRoas }));

  const generateWhatsAppPayload = () => {
    const formatINR = (val: number) =>
      new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(val);

    const msg =
      `Pranam Desi Muchads! 🙏\n\n` +
      `Here is my Customized Agency Proposal Request:\n` +
      `✦ Monthly Ad Budget: ${formatINR(proposal.budget)}\n` +
      `✦ Industry Sector: ${proposal.industry}\n` +
      `✦ Selected Stack: ${proposal.selectedServices.join(", ")}\n` +
      `✦ Target ROAS Multiplier: ${proposal.estimatedRoas}\n` +
      (proposal.brandUrl ? `✦ Brand URL: ${proposal.brandUrl}\n` : "") +
      `\nLet's schedule our 15-Minute Chai & Strategy Call! 〰️`;

    return `https://wa.me/919999999999?text=${encodeURIComponent(msg)}`;
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
      }}
    >
      {children}
    </AgencyProposalContext.Provider>
  );
}

export const useProposal = () => useContext(AgencyProposalContext);
