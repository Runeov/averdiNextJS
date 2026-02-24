# Technical Accessibility Repair Report
**Site:** localhost:3001 (NFDI production build)
**Scan date:** 2026-02-24
**Scanner:** WCAG Checker (browser mode, networkidle, 43 pages)
**Total issues found:** 739 (18 critical, 357 serious, 302 moderate, 62 minor)
**Compliance:** 4/6 passed (Apenhetsloven contact point and CSRD annual report missing)

---

## How to use this report

Each section describes a specific problem, where it occurs, why it matters under WCAG 2.1,
and provides a ready-to-use code fix. Apply fixes in priority order (Critical first).

---

## Problem 1 - Form inputs without accessible labels (CRITICAL)
**WCAG criterion:** 1.3.1 Info and Relationships (Level A), 4.1.2 Name, Role, Value (Level A)
**Impact:** Screen reader users cannot identify what a field is for. Forms are completely unusable without a mouse.
**Count:** 22 inputs across multiple pages

### What is happening
Inputs use placeholder text only. Placeholders disappear on focus and are not read reliably by
all screen readers. Every input, textarea, and select must have a label element associated via
htmlFor/id, or an aria-label/aria-labelledby attribute.

### Fix - associate labels explicitly

**Before (broken):**
```jsx
<input
  type="email"
  placeholder="Din e-postadresse"
  className="border rounded px-3 py-2 w-full"
/>
```

**After (fixed):**
```jsx
<label htmlFor="email-field" className="block text-sm font-medium mb-1">
  E-postadresse
</label>
<input
  id="email-field"
  type="email"
  placeholder="Din e-postadresse"
  className="border rounded px-3 py-2 w-full"
  aria-required="true"
/>
```

**Textarea fix:**
```jsx
<label htmlFor="message-field" className="block text-sm font-medium mb-1">
  Melding
</label>
<textarea
  id="message-field"
  placeholder="Skriv din melding her..."
  className="border rounded px-3 py-2 w-full"
  rows={5}
/>
```

**Select fix:**
```jsx
<label htmlFor="topic-select" className="block text-sm font-medium mb-1">
  Tema
</label>
<select id="topic-select" className="border rounded px-3 py-2 w-full">
  <option value="">Velg tema</option>
  <option value="wcag">Tilgjengelighet</option>
  <option value="gdpr">Personvern</option>
</select>
```

**If you cannot show a visible label** (e.g. a search bar inside a nav), use aria-label:
```jsx
<input
  type="search"
  aria-label="Sok pa nettstedet"
  placeholder="Sok..."
/>
```

---

## Problem 2 - All SVG icons missing aria attributes (SERIOUS)
**WCAG criterion:** 1.1.1 Non-text Content (Level A)
**Impact:** Screen readers read raw SVG path data or announce 'image' with no description. 528 violations.
**Root cause:** All icons come from lucide-react. None have aria-hidden or aria-label.

### Rule
- **Decorative icons** (next to visible text, purely visual): add aria-hidden="true"
- **Meaningful icons** (standalone buttons, status indicators): add aria-label on the button or icon

### Fix - create a typed Icon wrapper

Create `components/ui/Icon.tsx`:
```tsx
import { LucideIcon } from "lucide-react";

interface IconProps {
  icon: LucideIcon;
  label?: string;
  className?: string;
  size?: number;
}

export function Icon({ icon: LucideIcon, label, className, size = 20 }: IconProps) {
  if (label) {
    return <LucideIcon size={size} className={className} aria-label={label} role="img" />;
  }
  return <LucideIcon size={size} className={className} aria-hidden="true" focusable="false" />;
}
```

**Usage - decorative (next to text):**
```tsx
// Before
<ChevronRight className="w-4 h-4" />
<span>Les mer</span>

// After
<Icon icon={ChevronRight} className="w-4 h-4" />
<span>Les mer</span>
```

**Usage - meaningful (standalone button):**
```tsx
// Before
<button onClick={toggleMenu}>
  <Menu className="w-6 h-6" />
</button>

// After
<button onClick={toggleMenu} aria-label="Apne navigasjonsmeny">
  <Icon icon={Menu} className="w-6 h-6" />
</button>
```

### Most common Lucide icons on this site

| Icon | Location | Recommended treatment |
|------|----------|----------------------|
| ChevronRight | Navigation links | aria-hidden (decorative) |
| CircleHelp | FAQ items | aria-hidden (label is on heading) |
| ExternalLink | Outbound links | aria-hidden OR warn in link text |
| Menu / X | Mobile nav toggle | aria-hidden, put aria-label on button |
| CheckCircle / XCircle | Status indicators | aria-label on icon |
| Search | Search button | aria-hidden, put aria-label on button |

---

## Problem 3 - Skip navigation link missing on all pages (MODERATE)
**WCAG criterion:** 2.4.1 Bypass Blocks (Level A)
**Impact:** Keyboard-only users must Tab through the entire navigation on every page before reaching content.
**Count:** All 43 pages

### Fix - add skip link to app/layout.tsx

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no">
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4
            focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black
            focus:border-2 focus:border-black focus:rounded focus:shadow-lg"
        >
          Hopp til hovedinnhold
        </a>
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
```

tabIndex={-1} on main allows the browser to programmatically focus it when the skip link is activated.

---

## Problem 4 - Heading hierarchy violations (MODERATE)
**WCAG criterion:** 1.3.1 Info and Relationships (Level A)
**Impact:** Skipped heading levels break screen reader document navigation.
**Count:** 62 violations

Pages use h4 or h5 without a parent h3 in the same section.

**Before (broken - h4 without h3):**
```tsx
<section>
  <h2>Tjenester</h2>
  <div>
    <h4>WCAG-analyse</h4>
    <p>...</p>
  </div>
</section>
```

**After (fixed):**
```tsx
<section>
  <h2>Tjenester</h2>
  <div>
    <h3>WCAG-analyse</h3>
    <p>...</p>
  </div>
</section>
```

Search codebase for `<h4` and `<h5`. For each one, verify the nearest ancestor heading is
exactly one level above. If your Card component hardcodes h4, make the level a prop:

```tsx
interface CardProps { title: string; headingLevel?: 2 | 3 | 4; }

export function Card({ title, headingLevel = 3 }: CardProps) {
  const Heading = `h${headingLevel}` as keyof JSX.IntrinsicElements;
  return <div className="card"><Heading>{title}</Heading></div>;
}
```

---

## Problem 5 - Link issues (SERIOUS / MODERATE)
**WCAG criterion:** 2.4.4 Link Purpose in Context (Level A), 4.1.2 Name, Role, Value (Level A)
**Count:** 83 violations

### 5a - Empty links (no text, no aria-label)
```tsx
// Before
<a href="/rapport"><ArrowRight /></a>

// After
<a href="/rapport" aria-label="Last ned rapport (PDF)">
  <ArrowRight aria-hidden="true" />
</a>
```

### 5b - Redundant aria-label (duplicates visible text)
```tsx
// Before
<a href="/om-oss" aria-label="Om oss">Om oss</a>

// After - aria-label only when it ADDS information
<a href="/om-oss">Om oss</a>
```

### 5c - External links without warning
```tsx
// Before
<a href="https://www.uutilsynet.no" target="_blank">Uutilsynet</a>

// After
<a href="https://www.uutilsynet.no" target="_blank" rel="noopener noreferrer">
  Uutilsynet
  <span className="sr-only"> (apner i ny fane)</span>
  <ExternalLink aria-hidden="true" className="inline w-3 h-3 ml-1" />
</a>
```

### 5d - Overly long link text
```tsx
// Before - 100+ character anchor text
<a href="/wcag-guide">
  Les var komplette guide til WCAG 2.1 og hva du trenger a vite for a oppna universell utforming
</a>

// After - concise anchor, context in surrounding paragraph
<p>
  Les var komplette guide til WCAG 2.1 og hva du trenger a vite.{" "}
  <a href="/wcag-guide">Les guide om WCAG 2.1</a>
</p>
```

---

## Problem 6 - Data table missing structure on /personvern (MODERATE)
**WCAG criterion:** 1.3.1 Info and Relationships (Level A)

```tsx
// Before - no scope, no caption
<table>
  <tr><th>Formal</th><th>Behandlingsgrunnlag</th><th>Lagringstid</th></tr>
  ...
</table>

// After
<table>
  <caption className="sr-only">Oversikt over behandling av personopplysninger</caption>
  <thead>
    <tr>
      <th scope="col">Formal</th>
      <th scope="col">Behandlingsgrunnlag</th>
      <th scope="col">Lagringstid</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Kontaktskjema</td><td>Samtykke</td><td>12 maneder</td></tr>
  </tbody>
</table>
```

---

## Problem 7 - Duplicate id attribute on /kunnskapsbank/bedrifter/tiltakssonen (MODERATE)
**WCAG criterion:** 4.1.1 Parsing (Level A)

If the id is generated in a loop:
```tsx
// Before
{items.map((item) => (
  <div id="accordion-item" key={item.slug}>...</div>
))}

// After - unique per item
{items.map((item) => (
  <div id={`accordion-item-${item.slug}`} key={item.slug}>...</div>
))}
```

---

## Problem 8 - Compliance gaps (LEGAL RISK)
**Current score:** 4/6 compliance checks passed

### 8a - Apenhetsloven sec 6: contact point for due diligence inquiries
No dedicated contact point for written inquiries about the due diligence process is published.

**Fix - add to /apenhetsloven or /kontakt:**
```tsx
<section aria-labelledby="apenhetsloven-kontakt">
  <h2 id="apenhetsloven-kontakt">Kontakt oss om apenhetsloven</h2>
  <p>
    I henhold til apenhetsloven paragraf 6 kan du sende skriftlig foresporsel
    om var aktsomhetsvurdering til:
  </p>
  <address>
    <a href="mailto:apenhetsloven@nfdi.no">apenhetsloven@nfdi.no</a>
  </address>
  <p>Vi besvarer henvendelser innen 3 uker.</p>
</section>
```

### 8b - CSRD: reference to annual sustainability report
No reference to an annual sustainability report or planned CSRD reporting is published.

**Fix - add to /baerekraft:**
```tsx
<section aria-labelledby="baerekraft-rapportering">
  <h2 id="baerekraft-rapportering">Baerekraftsrapportering</h2>
  <p>
    NFDI rapporterer pa baerekraft i samsvar med EUs direktiv om
    baerekraftsrapportering (CSRD). Var arsrapport for 2025 publiseres innen 30. april 2026.
  </p>
</section>
```

---

## Summary - Priority order

| # | Problem | WCAG | Severity | Count |
|---|---------|------|----------|-------|
| 1 | Form inputs without labels | 1.3.1 / 4.1.2 | Critical | 22 |
| 2 | SVG icons without aria attributes | 1.1.1 | Serious | 528 |
| 3 | Missing skip navigation link | 2.4.1 | Moderate | 43 pages |
| 4 | Heading hierarchy violations | 1.3.1 | Moderate | 62 |
| 5a | Empty links | 4.1.2 | Serious | ~15 |
| 5b | Redundant aria-label on links | 4.1.2 | Minor | ~20 |
| 5c | External links without warning | 2.4.4 | Moderate | ~30 |
| 5d | Overly long link text | 2.4.4 | Minor | ~18 |
| 6 | Table missing scope/caption | 1.3.1 | Moderate | 1 table |
| 7 | Duplicate id attribute | 4.1.1 | Moderate | 1 page |
| 8a | Apenhetsloven contact point | Legal | High | 1 page |
| 8b | CSRD sustainability report ref | Legal | Medium | 1 page |

Fix problems 1, 2, and 3 first. They have the largest impact on screen reader users and keyboard
navigation. Problems 1 and 3 are single-file fixes. Problem 2 requires a component-level refactor
but the Icon wrapper above can be adopted incrementally.

---

*Report generated by WCAG Checker v2*