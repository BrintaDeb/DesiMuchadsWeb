# DESI MUCHADS ✦ High-ROAS Performance & Neo-Desi Creative Agency

> **Unapologetic Desi Roots. Ruthless Global ROI.**  
> Much Ads, razor-sharp branding, viral reels, sub-second web platforms, and e-commerce scaling for ambitious brands across India and global markets.

[![Next.js](https://img.shields.io/badge/Next.js-16.4.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel Ready](https://img.shields.io/badge/Vercel-Production_Ready-black?style=for-the-badge&logo=vercel)](https://vercel.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

---

## 🌟 Architecture & Capabilities

Desi Muchads is a production-grade full-stack digital agency web platform built with **Next.js 16 (App Router)**, **React 19**, **Turbopack**, and **Tailwind CSS v4**.

```
DesiMuchadsWeb/
├── src/
│   ├── app/
│   │   ├── layout.tsx                # Root layout with JSON-LD schema & font optimization
│   │   ├── page.tsx                  # High-conversion agency homepage
│   │   ├── not-found.tsx             # Custom branded 404 handler
│   │   ├── error.tsx                 # Resilient runtime error boundary
│   │   ├── sitemap.ts                # Dynamic XML sitemap for 41 indexed pages
│   │   ├── robots.ts                 # Search crawler governance
│   │   ├── manifest.ts               # Web App Manifest (PWA)
│   │   ├── services/[slug]/page.tsx  # 8 Dedicated Service Capability Pages
│   │   ├── work/[slug]/page.tsx      # 16 Strategic Case Study Dossiers
│   │   └── demos/[slug]/page.tsx     # 16 Original Live Interactive Demo Products
│   ├── components/
│   │   ├── navigation/               # Navbar, Mega Menus, Audio Visualizer, Theme
│   │   ├── hero/                     # Royal Indian typography & interactive conversion cards
│   │   ├── services/                 # 8 Core capabilities with specular spotlight highlights
│   │   ├── casestudies/              # 16 Projects with category filters & lightbox
│   │   ├── demos/                    # Interactive client storefronts with carts & calculators
│   │   ├── scanner/                  # Brand Kundli interactive audit scanner
│   │   └── common/                   # SpotlightCard, Icons, IndianArt, Khadi overlays
│   ├── data/
│   │   ├── servicesData.ts           # 8 Service capabilities with 5-stage frameworks
│   │   ├── projectsData.ts           # 16 Strategic case studies (Mushkil, Jugaad, Nateeja)
│   │   └── demoProductsData.ts       # 16 Product catalogs with real INR pricing & specs
│   └── lib/
│       └── sound.ts                  # Procedural zero-latency Web Audio API sonic engine
```

---

## 🚀 8 Core Capabilities & 16 Case Studies

| # | Service Capability | Slug | Flagship Case Studies | Live Interactive Demo Products |
|---|--------------------|------|------------------------|--------------------------------|
| **1** | **SEO & SEM Services** | `/services/seo-sem` | VedaRoots Ayurveda, UrbanDrift EV Mobility | `/demos/vedaroots-ayurveda`, `/demos/urbandrift-ev` |
| **2** | **Performance Marketing** | `/services/performance-marketing` | You & Me Weddings, SnackNation Makhanas | `/demos/you-and-me-photography`, `/demos/snacknation-makhanas` |
| **3** | **Lead Generation** | `/services/lead-generation` | BharatBio Health, Sobha Heritage Villas | `/demos/bharat-bio-health`, `/demos/sobha-heritage-villas` |
| **4** | **Social Media Marketing** | `/services/social-media` | Chai Chaska Co., StreeThreads Handloom | `/demos/chaichaska-ctc`, `/demos/streethreads-handloom` |
| **5** | **E-Commerce Solutions** | `/services/ecommerce-services` | Lionel P. Boulangerie, PetFirst Wellness | `/demos/lionelp-restaurant`, `/demos/pet-first-wellness` |
| **6** | **Quick Commerce Growth** | `/services/quick-commerce` | Mithai Magic Sweets, PureGlow Kombucha | `/demos/mithaimagic-sweets`, `/demos/pureglow-kombucha` |
| **7** | **Web Development** | `/services/web-development` | Darbar Fine Watches, KisaanDirect AgriTech | `/demos/darbar-fine-watches`, `/demos/kisaandirect-agri` |
| **8** | **Packaging & Label Design** | `/services/packaging-label` | Royal Rajwada Spices, Kamakesh Scalp Oil | `/demos/royal-rajwada-spices`, `/demos/kamakesh-hair-elixir` |

---

## 🛠️ Features & Engineering Innovations

- **16 Original Interactive Demo Storefronts**: Real product catalogs, INR (`₹`) prices, interactive add-to-bag drawers, free shipping thresholds, and simulated checkout flows.
- **Bespoke Live Product Calculators**:
  - *UrbanDrift EV*: Commercial Fleet TCO & Fuel Savings Calculator with real-time sliders.
  - *PetFirst Wellness*: Canine Breed & Weight Calorie Planner.
  - *Darbar Horology*: Bespoke Watch Dial, Finish & Strap Customizer.
  - *Mithai Magic*: Live 10-minute dark store dispatch countdown ticker.
- **Specular Spotlight Glows**: Dual-layer ambient radial sheen + dynamic traveling specular glints tracking cursor movement across all service and case study panels.
- **Neo-Desi Sonic UI Engine**: Lightweight procedural Web Audio API synthesis providing zero-latency tactile audio feedback without external audio file requests.
- **Enterprise SEO & Meta Standards**: Dynamic XML sitemap for all 41 routes, structured JSON-LD Organization schema, complete Open Graph & Twitter Cards, and security headers.

---

## 💻 Getting Started Locally

### 1. Prerequisites
- Node.js 18.18+ or Node.js 20+
- npm, yarn, or pnpm

### 2. Installation
```bash
git clone https://github.com/BrintaDeb/DesiMuchadsWeb.git
cd DesiMuchadsWeb
npm install
```

### 3. Local Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build & Static Generation
```bash
npm run build
npm run start
```
This compiles all 47 routes statically in ~2.6 seconds.

---

## 🚢 Deployment on Vercel

### Option 1: Automatic Deployment via Git
1. Push this repository to GitHub under `BrintaDeb/DesiMuchadsWeb`.
2. Import the project in your [Vercel Dashboard](https://vercel.com/new).
3. Vercel automatically detects the Next.js framework and configures the build settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `next build`
   - **Output Directory**: `.next`
4. Click **Deploy**.

### Option 2: Direct CLI Deployment
```bash
# Preview Deployment
vercel

# Production Deployment
vercel --prod
```

---

## 📜 Legal & Compliance

- **Unit of**: Desi Muchads Digital LLP
- **GSTIN**: 07AAECD5582M1ZX
- **CIN**: U74999DL2024PTC412891
- **Copyright**: © 2025 DESI MUCHADS DIGITAL LLP. All digital rights reserved.
