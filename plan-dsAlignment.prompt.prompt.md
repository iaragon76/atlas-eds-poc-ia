# Plan: Align EDS Blocks with Atlas Copco Core Components Structure

## Context

The Atlas Copco Design System source (`atlascopco-core-components` on Bitbucket) is an NX monorepo:

```
atlascopco-core-components/
├── libs/
│   ├── aem-core-lib/        ← Core AEM components (shared across all brands)
│   │   ├── src/lib/
│   │   │   ├── accordion/
│   │   │   ├── breadcrumb/
│   │   │   ├── button/
│   │   │   ├── download/
│   │   │   ├── tabs/
│   │   │   ├── teaser/
│   │   │   └── ...
│   └── atlascopcogroup-lib/ ← Brand-specific overrides (.ds-atlascopcogroup)
├── apps/                    ← Storybook instances per brand
└── tools/
```

Each component uses **BEM naming**: `.cmp-accordion`, `.cmp-tabs`, `.cmp-teaser`, `.cmp-breadcrumb`, `.cmp-button`, `.cmp-download`

---

## Goal

Restructure our EDS blocks to:
1. Mirror the AEM Core Component class naming (`cmp-*` BEM pattern)
2. Allow the DS brand CSS (`.ds-atlascopcogroup`) to be applied directly
3. Enable seamless authoring in Universal Editor with the same content model
4. Create a clear 1:1 mapping: AEM on-prem component → EDS block

---

## Mapping: AEM Core Components → EDS Blocks

| AEM Core Component | EDS Block | CSS Class | Status |
|-------------------|-----------|-----------|--------|
| `core/wcm/components/accordion` | `blocks/accordion/` | `.cmp-accordion` | Refactor |
| `core/wcm/components/tabs` | `blocks/tabs/` | `.cmp-tabs` | Refactor |
| `core/wcm/components/teaser` | `blocks/teaser/` | `.cmp-teaser` | New (replaces report-card) |
| `core/wcm/components/breadcrumb` | `blocks/breadcrumb/` | `.cmp-breadcrumb` | Refactor |
| `core/wcm/components/button` | Built into styles | `.cmp-button` | Refactor |
| `core/wcm/components/download` | `blocks/download/` | `.cmp-download` | New (replaces document-list) |
| `core/wcm/components/title` | Default content | `.cmp-title` | Add class |
| `core/wcm/components/text` | Default content | `.cmp-text` | Add class |
| `core/wcm/components/image` | Default content | `.cmp-image` | Exists |
| `core/wcm/components/list` | `blocks/list/` | `.cmp-list` | New |

---

## Phase 1: Refactor Class Naming (CSS only)

**No block logic changes** — just rename CSS classes to match `cmp-*` BEM pattern so the DS styles apply directly.

### 1.1 Accordion
```
Current:   .tabs-accordion-item, .tabs-accordion-heading, .tabs-accordion-body
Target:    .cmp-accordion__item, .cmp-accordion__button, .cmp-accordion__panel
```

### 1.2 Tabs
```
Current:   .tabs-list, .tabs-tab, .tabs-tab--active, .tabs-panel
Target:    .cmp-tabs__tablist, .cmp-tabs__tab, .cmp-tabs__tab--active, .cmp-tabs__tabpanel
```

### 1.3 Breadcrumb
```
Current:   .breadcrumb-list, .breadcrumb-item
Target:    .cmp-breadcrumb__list, .cmp-breadcrumb__item, .cmp-breadcrumb__item-link
```

### 1.4 Teaser (replaces report-card + columns cards)
```
Current:   .report-card-inner, .report-card-image, .report-card-content
Target:    .cmp-teaser, .cmp-teaser__image, .cmp-teaser__content, .cmp-teaser__title, .cmp-teaser__description, .cmp-teaser__action-link
```

### 1.5 Download (replaces document-list)
```
Current:   .tabs-doc-link, .tabs-doc-category
Target:    .cmp-download, .cmp-download__title, .cmp-download__title-link, .cmp-download__properties
```

---

## Phase 2: Import DS Brand CSS Layer

Create a dedicated file that contains the brand overrides extracted from production:

```
styles/
├── styles.css          ← Global tokens + base reset
├── lazy-styles.css     ← Below-fold styles
└── ds-brand.css        ← NEW: .ds-atlascopcogroup brand overrides (extracted from production CSS)
```

The `ds-brand.css` file will contain the exact `.ds-atlascopcogroup` rules we extracted, targeting the `cmp-*` classes. This simulates having the DS npm package installed.

---

## Phase 3: Block Structure for Universal Editor

Each block needs a `component-models.json` entry that defines:
- What fields are available in the Universal Editor
- How content maps to the block HTML structure

### Updated component-models.json

```json
[
  {
    "id": "accordion",
    "fields": [
      { "component": "text", "name": "heading", "label": "Panel Heading" },
      { "component": "richtext", "name": "content", "label": "Panel Content" }
    ]
  },
  {
    "id": "tabs",
    "fields": [
      { "component": "text", "name": "label", "label": "Tab Label" },
      { "component": "richtext", "name": "content", "label": "Tab Content" }
    ]
  },
  {
    "id": "teaser",
    "fields": [
      { "component": "reference", "name": "image", "label": "Image" },
      { "component": "text", "name": "pretitle", "label": "Pretitle" },
      { "component": "text", "name": "title", "label": "Title" },
      { "component": "richtext", "name": "description", "label": "Description" },
      { "component": "text", "name": "actionText", "label": "CTA Text" },
      { "component": "text", "name": "actionLink", "label": "CTA Link" }
    ]
  },
  {
    "id": "download",
    "fields": [
      { "component": "text", "name": "title", "label": "Document Title" },
      { "component": "text", "name": "url", "label": "Download URL" },
      { "component": "text", "name": "format", "label": "File Format" },
      { "component": "text", "name": "size", "label": "File Size" }
    ]
  },
  {
    "id": "breadcrumb",
    "fields": [
      { "component": "richtext", "name": "links", "label": "Breadcrumb Links" }
    ]
  }
]
```

---

## Phase 4: Universal Editor Authoring Flow

When a content editor opens the page in Universal Editor:

1. **Add Section** → creates a `<div>` (section)
2. **Add Block** → picks from available blocks (accordion, tabs, teaser, etc.)
3. **Edit Block Content** → fills in fields defined in component-models.json
4. **Preview** → EDS renders the block with DS styling applied

### Authoring the "Reports and Presentations" page:

| Step | Action in Universal Editor | Resulting Block |
|------|---------------------------|-----------------|
| 1 | Add Breadcrumb block | `breadcrumb` with navigation links |
| 2 | Add Title (H1) + Text | Default content section |
| 3 | Add 3 Teaser blocks in Columns | Three report cards side by side |
| 4 | Add Title (H2) "Overview of documents" | Default content |
| 5 | Add Tabs block with 7 tabs (2020-2026) | Each tab contains accordion + download blocks |
| 6 | Add 3 Teaser blocks in Columns (highlight section) | "You might be interested in" cards |

---

## Phase 5: Final DS Integration Path

Once the PoC is validated, the full integration would be:

1. **Publish DS as npm package** → `@ac-brandsframework/atlascopcogroup-lib`
2. **Import into EDS project** → `npm install @ac-brandsframework/atlascopcogroup-lib`
3. **Import compiled CSS** → `@import '@ac-brandsframework/atlascopcogroup-lib/dist/styles.css'`
4. **Remove extracted ds-brand.css** → replaced by the real package
5. **Components render identically** because class names match `cmp-*` BEM pattern

---

## Summary

This approach means:
- **Blocks output the same HTML structure** as AEM Core Components
- **DS brand CSS applies directly** without modification
- **Universal Editor** uses the same content model as AEM on-prem
- **Migration path is clear**: AEM on-prem → EDS blocks with same DS
- **No 7+ nesting issue**: EDS blocks compose flat, DS styles render the visual nesting
