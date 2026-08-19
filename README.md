# L2H Solution — Enterprise Real Estate Advisory & Intelligence Platform

> **From Land to Legacy.**  
> *"Understand → Analyse → Shortlist → Deliver → Help the Client Make the Best Decision"*

---

## 🏛️ Platform Overview

**L2H Solution** is a modern, full-stack real-estate advisory and intelligence platform for Delhi NCR. The platform bridges the gap between buyers, institutional investors, developers, and advisors through verified data, independent due diligence perspectives, algorithmic matching, and side-by-side comparison matrices.

---

## 🚀 Key Systems & Architecture

### 1. Data Store & Normalized Architecture (`src/lib/data-store.ts`)
- **Entities Supported**: Properties, Projects, Developers, Locations, Leads, Site Visits, Articles, Market Reports, Advisors, Saved Properties, and Analytics Events.
- **Persistence**: High-performance in-memory cache synced with atomic JSON persistence (`data/db.json`), adaptable to PostgreSQL/MongoDB through repository interfaces.

### 2. Algorithmic Recommendation Engine (`src/lib/recommendation-engine.ts`)
- Configurable multi-factor ranking based on Budget Fit (30%), Location/Corridor (25%), Configuration/Bedrooms (20%), Purpose/Investment (15%), and Timeline (10%).
- Computes percentage match scores and generates human-readable rationale without arbitrary logic.

### 3. Grounded AI Concierge (`/api/concierge`)
- Intent parser connected directly to verified RERA catalog data.
- Answers natural language buyer queries with zero hallucinations.

### 4. Side-by-Side Property Comparison Matrix (`/compare`)
- Compares 2 to 4 properties with automated **L2H Comparative Verdicts** (*Best for End-Use, Best Value, Highest Investment Growth, Trophy Luxury Landmark*).

### 5. Private Shortlist & Saved Properties (`/saved`)
- Bookmarking context with local persistence and portfolio review consultation.

### 6. Interactive Financial Modeling (`InvestmentCalculator.tsx`)
- Holding-period ROI, compound annual capital appreciation, rental yield cash flow simulations, and EMI calculations.

### 7. Corridor Intelligence & Research Reports (`/locations`, `/market-reports`)
- In-depth corridor masterplans, YoY growth trajectories, infrastructure catalysts, and downloadable PDF research dossiers with lead capture attribution.

### 8. Full Admin CMS & CRM Suite (`/admin`)
- **Properties CMS**: Full inventory management with L2H Perspective & Verification status editing.
- **Lead Pipeline**: Kanban & Data Table CRM with stage tracking.
- **Site Visits**: Visit scheduling and advisor allocation.
- **Corridors CMS**: Location masterplans and price benchmarks.
- **Market Reports CMS**: Publications and download metrics.
- **Advisors Desk**: Performance tracking and lead assignment.
- **Analytics**: Conversion funnel and live event stream.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router + Turbopack)
- **Language**: TypeScript 5.7+
- **Styling**: Tailwind CSS & Modern Glassmorphic Luxury Palette
- **Icons**: Lucide React
- **SEO**: Dynamic XML Sitemap (`/sitemap.xml`), Robots (`/robots.txt`), JSON-LD Schema.org (RealEstateAgent, SingleFamilyResidence)

---

## 🏃 Local Development & Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment**:
   ```bash
   cp .env.example .env.local
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

4. **Production Build**:
   ```bash
   npm run build
   npm run start
   ```

---

## 🔒 Security & Data Integrity

- Fiduciary buyer privacy with zero contact information leakage.
- Strict separation between **Verified Property Fundamentals** (Official developer filings) and **L2H Advisory Perspectives**.
- Server-side validation and sanitization across all lead and site visit API routes.
