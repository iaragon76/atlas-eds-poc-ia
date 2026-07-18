# AEM Cloud EDS Proof of Concept Plan

## Objective

Replicate the Atlas Copco "Reports and Presentations" page (`atlascopcogroup.com/en/investors/reports-and-presentations`) in AEM Cloud with Edge Delivery Services (EDS), proving that deeply-nested AEM on-prem layouts (7+ levels) can be achieved using EDS block composition — without deep DOM nesting.

---

## Source Page Analysis

**URL:** https://www.atlascopcogroup.com/en/investors/reports-and-presentations

### Identified Components (top → bottom)

| # | Component | Nesting concern |
|---|-----------|-----------------|
| 1 | **Global Header** — logo + mega-navigation | Standard EDS header block |
| 2 | **Breadcrumb** — Financials › Reports… | Simple list block |
| 3 | **Page Hero / Title** — H1 + intro paragraph | Default content |
| 4 | **Report Card (Featured)** — image + date + summary + multiple PDF download links | Medium — image beside text with nested link list |
| 5 | **Report Card (Annual Report)** — same pattern + CTA button ("Read highlights") | Same as above + CTA variant |
| 6 | **Report Card (Capital Markets Day)** — same pattern + CTA ("Webcast on demand") | Same |
| 7 | **Tabbed Document Overview** — year tabs → quarter accordion → doc category → download links + press release links + webcast links | **HIGH** — this is the 7+ nesting proof point (tabs > year > quarter > category > links) |
| 8 | **Related Content Cards** — 3-col image cards with title + description + link | Columns block variant |
| 9 | **Global Footer** — address, social icons, legal links, nav columns | Standard EDS footer block |

---

## Environment & Tooling

### Prerequisites to install

| Tool | Purpose | Install command |
|------|---------|----------------|
| **Git** | Version control | `winget install --id Git.Git -e` |
| **Node.js 20 LTS** | Local dev server, build tools | `winget install --id OpenJS.NodeJS.LTS -e` |
| **AEM CLI** | Local EDS development proxy | `npm install -g @adobe/aem-cli` |
| **VS Code extensions** | AEM Sidekick, ESLint, Prettier | Installed from marketplace |

### AEM Cloud Environment (provided)

- **Experience Manager:** https://experience.adobe.com/#/@aemsitestrial/experiencemanager/
- **Author:** https://author-p153710-e1614654.adobeaemcloud.com
- **Preview:** https://main--quickcheetah17818--aemsitestrial.aem.page
- **Live:** https://main--quickcheetah17818--aemsitestrial.aem.live

### GitHub Repository

- **Org/repo:** `aemsitestrial/quickcheetah17818` (Adobe's trial org — already connected)
- If the trial doesn't provide push access, create a **personal GitHub repo** (e.g., `your-username/eds-poc`) and reconnect via Sidekick/fstab.yaml
- Clone locally to `C:\Users\sscia\…\EDS\EDS\quickcheetah17818\`

---

## Phase 1 — Local Dev Setup (Day 1)

### Steps

1. **Verify tools:** `git --version && node --version && aem --version`
2. **Clone the EDS boilerplate:**
   ```bash
   cd "C:\Users\sscia\OneDrive - ONEVIRTUALOFFICE\Documents\30. NWD\Devs\EDS\EDS"
   git clone https://github.com/adobe/aem-boilerplate.git quickcheetah17818
   cd quickcheetah17818
   npm install
   ```
3. **Update `fstab.yaml`** — point to your AEM Cloud content source:
   ```yaml
   mountpoints:
     /: https://author-p153710-e1614654.adobeaemcloud.com/
   ```
4. **Start local proxy:**
   ```bash
   aem up
   ```
   → Opens http://localhost:3000 proxying your AEM Cloud content with local CSS/JS overrides.

### Validation

- [ ] `http://localhost:3000` loads the default EDS page
- [ ] Changes to `/styles/styles.css` reflect instantly (hot reload)

---

## Phase 2 — Design System Foundation (Day 1–2)

### Design Tokens (`/styles/styles.css`)

```css
:root {
  /* Atlas Copco brand tokens */
  --color-primary: #0058a2;        /* AC Blue */
  --color-primary-dark: #003d6b;
  --color-secondary: #e8f4fd;
  --color-text: #333333;
  --color-text-light: #666666;
  --color-background: #ffffff;
  --color-background-alt: #f5f5f5;
  --color-border: #e0e0e0;
  --color-link: #0058a2;
  --color-link-hover: #003d6b;

  /* Typography */
  --font-family-body: 'Atlas Copco Sans', Arial, sans-serif;
  --font-family-heading: 'Atlas Copco Sans', Arial, sans-serif;
  --font-size-base: 16px;
  --font-size-sm: 14px;
  --font-size-lg: 20px;
  --font-size-xl: 28px;
  --font-size-xxl: 36px;
  --line-height-base: 1.6;

  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 40px;
  --spacing-xxl: 64px;

  /* Layout */
  --max-width: 1200px;
  --grid-gap: 24px;
  --border-radius: 4px;
}
```

### Typography & Base Styles (`/styles/styles.css` continued)

- Body font, heading scale (h1–h4), link styles
- Container max-width constraint
- Responsive breakpoints: 600px (mobile), 900px (tablet), 1200px (desktop)

---

## Phase 3 — Block Development (Day 2–4)

### Block architecture (EDS flat composition replaces deep nesting)

```
/blocks/
├── header/           → Global nav (logo + mega menu)
├── breadcrumb/       → Breadcrumb trail
├── report-card/      → Featured report (image + meta + downloads)
├── tabs/             → Year-based tabs container
├── accordion/        → Quarter sections (inside tabs)
├── document-list/    → Download links grouped by category
├── columns/          → Related content cards
└── footer/           → Global footer
```

### Key blocks detail

#### 1. `report-card` block
- **Input (authored in AEM):** Section with image, heading, date, description, list of links
- **Rendering:** CSS Grid — image left (40%), content right (60%) on desktop; stacked on mobile
- **Variants:** `report-card (featured)`, `report-card (with-cta)`

#### 2. `tabs` block (THE NESTING PROOF)
- **Input:** A section per tab; first row = tab label, remaining rows = tab content
- **Rendering:** JavaScript-powered tab switching; content area contains `accordion` blocks
- **Key point:** In EDS, tabs + accordion + document-list are composed FLAT in the DOM but appear visually nested via CSS/JS — proving 7+ visual nesting without 7+ DOM levels

#### 3. `accordion` block
- **Input:** Heading + content pairs (Q1 2026, Q2 2025, etc.)
- **Rendering:** Collapsible panels; each panel contains a `document-list`

#### 4. `document-list` block
- **Input:** Categorized links (Downloadable documents / Press release / Webcast)
- **Rendering:** Grouped link lists with category headers and file-type icons (PDF, XLSX)

#### 5. `columns` block (Related content cards)
- **Input:** 3 sections with image + heading + description + link
- **Rendering:** 3-column grid on desktop, stacked on mobile

---

## Phase 4 — Demo Page Authoring (Day 4–5)

### Content structure in AEM Universal Editor

Create a page at: `/content/quickcheetah17818/en/investors/reports-and-presentations`

Author the content using the blocks above:
1. Section: breadcrumb
2. Default content: H1 + intro paragraph
3. Section: report-card (featured) — Q1 2026
4. Section: report-card (with-cta) — Annual Report 2025
5. Section: report-card (with-cta) — Capital Markets Day 2025
6. Section: tabs → containing accordion → containing document-list
7. Section: columns (3-col) — Related content cards

### Nesting proof layout (section 6 detail)

```
[Tabs block]
  Tab "2026"
    [Accordion block]
      Panel "Q1 2026"
        [Document-list block]
          Category "Downloadable documents"
            - PDF link: Quarterly Report
            - PDF link: Results presentation
            - XLSX link: Key figures
          Category "Press release"
            - Link: CEO Comment
          Category "Webcast"
            - Link: Quarterly results webcast
      Panel "Q4 2025" …
  Tab "2025"
    …
```

**Visual nesting levels:** Tabs → Year → Quarter → Category → Links = **5 visual levels**, matching the source — achieved with **only 2–3 DOM nesting levels** in EDS.

---

## Phase 5 — Deploy & Validate (Day 5)

### Steps

1. **Commit & push** all block code to GitHub `main` branch
2. **Publish** the page in AEM Author → triggers Edge Delivery pipeline
3. **Preview:** https://main--quickcheetah17818--aemsitestrial.aem.page/en/investors/reports-and-presentations
4. **Live:** https://main--quickcheetah17818--aemsitestrial.aem.live/en/investors/reports-and-presentations

### Acceptance criteria

- [ ] Page renders with visual fidelity ≥ 90% of the source page
- [ ] Tabbed section works (click year tabs → show quarters → expand to see downloads)
- [ ] No more than 3 DOM levels of nesting for any component
- [ ] Page loads in < 2s (LCP) — EDS performance baseline
- [ ] Mobile responsive (stacked layouts, hamburger nav)
- [ ] PDF links are functional

---

## Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| Trial site permissions limited | Use personal GitHub repo + fstab remount |
| Adobe fonts not available | Fall back to system fonts that match the brand |
| Tabbed content authoring complexity | Provide clear authoring guide / spreadsheet-based content |
| Images hosted on Scene7 (external) | Reference directly or re-upload to AEM Assets |

---

## Next Steps (after PoC success)

1. Present results to implementation partner — prove nesting concern is resolved
2. Document EDS block → AEM on-prem component mapping
3. Expand Design System to full component library
4. Plan content migration strategy (AEM on-prem → AEM Cloud)
5. Evaluate Universal Editor authoring experience for content editors

---

## Summary

This PoC proves that **EDS block composition** (tabs + accordion + document-list composed flat) can achieve the same visual complexity as 7+ level nested AEM on-prem components — with better performance, simpler DOM, and no structural limitations in AEM Cloud.
