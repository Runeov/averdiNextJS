# Tjenester Section Implementation Plan
**Date:** 2026-01-15  
**Task:** Update Services section with new service data structure

---

## 1. CURRENT STATE ANALYSIS

### Current [`Services.tsx`](../src/components/modules/home/Services.tsx) Structure
- Uses [`FeatureTabs`](../src/components/ui/FeatureTabs.tsx) component
- Currently has 3 services: Regnskap, Lønn & HR, Rådgivning
- Uses imported image assets from `@/assets/` (`.avif` format)
- Icon field expects a **string URL** (currently using `.src` from imported images)

### Current [`FeatureTabItem`](../src/components/ui/FeatureTabs.tsx:10-19) Interface
```typescript
export interface FeatureTabItem {
  id: string;
  title: string;
  shortDesc: string;
  icon: string; // URL to image/icon
  content: string | React.ReactNode;
  bullets: (string | React.ReactNode)[];
  link: string;
  linkText?: string;
}
```

**Missing:** `stats` field, `image` field

---

## 2. NEW REQUIREMENTS

### New Service Data Structure
The user wants to add a **4th service** (Årsoppgjør & Skatt) and update all services with:

1. **Icon as Lucide React Component** (not string URL)
   - `Calculator` for Regnskap
   - `Users` for Lønn & HR
   - `FileText` for Årsoppgjør & Skatt
   - `TrendingUp` for Rådgivning

2. **Image field** (separate from icon)
   - `/images/service-regnskap.jpg`
   - `/images/service-lonn.jpg`
   - `/images/service-skatt.jpg`
   - `/images/service-raadgiving.jpg`

3. **Stats field** (new)
   - `{ value: '35+', label: 'års erfaring' }`
   - `{ value: '100%', label: 'presisjon' }`
   - `{ value: '0', label: 'forsinkelser' }`
   - `{ value: '∞', label: 'muligheter' }`

4. **Updated content and bullets** for all services

---

## 3. REQUIRED CHANGES

### 3.1 Update [`FeatureTabItem`](../src/components/ui/FeatureTabs.tsx:10-19) Interface

**Current Problem:**
- `icon` field is typed as `string` (expects URL)
- No `image` field
- No `stats` field

**Solution:**
```typescript
export interface FeatureTabItem {
  id: string;
  title: string;
  shortDesc: string;
  icon: React.ComponentType<{ className?: string }> | string; // Support both Lucide icons and URLs
  image?: string; // Optional image URL for visual display
  content: string | React.ReactNode;
  bullets: (string | React.ReactNode)[];
  link: string;
  linkText?: string;
  stats?: { value: string; label: string }; // Optional stats display
}
```

### 3.2 Update [`FeatureTabs.tsx`](../src/components/ui/FeatureTabs.tsx) Component

**Changes needed:**

1. **Icon rendering logic** (lines 71-72, 154)
   - Check if `icon` is a component or string
   - Render Lucide icon component OR `<img>` tag accordingly

2. **Image display** (optional, if we want to show service images)
   - Add image display in desktop content panel
   - Could be background image or featured image

3. **Stats display** (if stats field exists)
   - Add stats badge/display in desktop content panel
   - Position: Could be in header area or as a callout

**Example icon rendering:**
```typescript
{typeof item.icon === 'string' ? (
  <img src={item.icon} alt="" className="w-8 h-8 object-contain" />
) : (
  <item.icon className="w-8 h-8 text-slate-600" />
)}
```

### 3.3 Update [`Services.tsx`](../src/components/modules/home/Services.tsx) Data

**Changes needed:**

1. **Import Lucide icons:**
```typescript
import { Calculator, Users, FileText, TrendingUp } from 'lucide-react';
```

2. **Remove image imports** (or keep for backward compatibility)
   - Currently imports `imgRegnskap`, `imgLonn`, `imgRaadgiving`
   - New structure uses `/images/` path strings

3. **Update `serviceItems` array:**
   - Add 4th service (Årsoppgjør & Skatt)
   - Change `icon` from `.src` string to Lucide component
   - Add `image` field with `/images/service-*.jpg` paths
   - Add `stats` field
   - Update `content` and `bullets` with new text

### 3.4 Image Asset Management

**Current state:**
- Service images exist in [`src/assets/`](../src/assets/) as `.avif` files:
  - `regnskap.avif`
  - `lonn.avif`
  - `raadgiving.avif`
- No `public/images/` directory exists yet

**Options:**

**Option A: Use existing assets (recommended)**
- Keep using imported `.avif` files from `src/assets/`
- Change image paths to: `imgRegnskap.src`, etc.
- No need to create new images

**Option B: Create new public images**
- Create `public/images/` directory
- Add new `.jpg` images as specified
- Use direct paths: `/images/service-regnskap.jpg`

**Recommendation:** Use **Option A** (existing assets) unless user provides new images.

---

## 4. IMPLEMENTATION STEPS

### Step 1: Update FeatureTabItem Interface
- [ ] Modify [`FeatureTabs.tsx`](../src/components/ui/FeatureTabs.tsx:10-19) interface
- [ ] Add `image?: string` field
- [ ] Add `stats?: { value: string; label: string }` field
- [ ] Change `icon` type to support both component and string

### Step 2: Update FeatureTabs Component Rendering
- [ ] Update icon rendering logic (lines 71-72, 154)
- [ ] Add conditional rendering for Lucide icons vs image URLs
- [ ] Add stats display in desktop content panel (if stats exists)
- [ ] Add image display in desktop content panel (if image exists)

### Step 3: Update Services.tsx Data
- [ ] Import Lucide icons: `Calculator`, `Users`, `FileText`, `TrendingUp`
- [ ] Update existing 3 services with new structure
- [ ] Add 4th service: Årsoppgjør & Skatt
- [ ] Update all `content` and `bullets` with new text
- [ ] Add `stats` field to all services
- [ ] Add `image` field (using existing `.avif` assets)

### Step 4: Create Missing Image Asset (if needed)
- [ ] Check if `service-skatt.jpg` equivalent exists
- [ ] If not, identify which existing asset to use or create placeholder

### Step 5: Testing & Verification
- [ ] Test desktop view (tabs switching)
- [ ] Test mobile view (accordion)
- [ ] Verify icon rendering (Lucide components)
- [ ] Verify stats display
- [ ] Verify all links work
- [ ] Check responsive behavior

---

## 5. DETAILED SERVICE DATA

### Service 1: Regnskap
```typescript
{
  id: 'regnskap',
  title: 'Regnskap',
  shortDesc: 'Full oversikt i sanntid',
  icon: Calculator,
  image: imgRegnskap.src, // or '/images/service-regnskap.jpg'
  content: 'Moderne skybasert regnskap som gir deg full oversikt i sanntid. Vi tar oss av bilagene og holder orden på fristene, så du kan bruke tiden på å drive butikken. Med vår erfaring fra nordnorsk næringsliv forstår vi de unike utfordringene og mulighetene i regionen.',
  bullets: [
    'Løpende bokføring og bilagshåndtering',
    'Momsrapportering og avgiftsoppgjør',
    'Fakturering og kundeoppfølging',
    'Skybaserte løsninger med PowerOffice Go'
  ],
  stats: { value: '35+', label: 'års erfaring' },
  link: '/tjenester/regnskap',
  linkText: 'Les mer om regnskap'
}
```

### Service 2: Lønn & HR
```typescript
{
  id: 'lonn',
  title: 'Lønn & HR',
  shortDesc: 'Korrekt lønn til rett tid',
  icon: Users,
  image: imgLonn.src, // or '/images/service-lonn.jpg'
  content: 'Vi håndterer alt det praktiske rundt lønn, fra A-melding og reiseregninger til sykepenger og arbeidsgiveravgift. Dine ansatte får riktig lønn til riktig tid – hver gang. Vi kjenner særreglene for tiltakssonen og sikrer at du får alle fordeler du har krav på.',
  bullets: [
    'A-melding og lønnsrapportering',
    'Reiseregninger og utlegg',
    'Sykepenger og refusjoner',
    'Redusert arbeidsgiveravgift i tiltakssonen'
  ],
  stats: { value: '100%', label: 'presisjon' },
  link: '/tjenester/lonn',
  linkText: 'Les mer om lønn'
}
```

### Service 3: Årsoppgjør & Skatt (NEW)
```typescript
{
  id: 'aarsoppgjor',
  title: 'Årsoppgjør & Skatt',
  shortDesc: 'Trygg avslutning av regnskapsåret',
  icon: FileText,
  image: imgRegnskap.src, // Reuse regnskap image or create new
  content: 'Årsoppgjøret er en kritisk prosess som krever presisjon og faglig kompetanse. Vi sørger for korrekt skatteberegning, optimalisering av fradrag og rettidig innlevering. Med vår ekspertise på tiltakssonen og samiske næringer sikrer vi at du betaler riktig skatt – ikke en krone mer.',
  bullets: [
    'Årsregnskap og noter',
    'Skattemelding for næringsdrivende',
    'Skatteoptimalisering og fradrag',
    'Særskilte ordninger for tiltakssonen'
  ],
  stats: { value: '0', label: 'forsinkelser' },
  link: '/tjenester/aarsoppgjor',
  linkText: 'Les mer om årsoppgjør'
}
```

### Service 4: Rådgivning
```typescript
{
  id: 'raadgiving',
  title: 'Rådgivning',
  shortDesc: 'Strategisk sparringspartner',
  icon: TrendingUp,
  image: imgRaadgiving.src, // or '/images/service-raadgiving.jpg'
  content: 'Bruk oss som din strategiske sparringspartner. Vi hjelper deg med budsjett, likviditetsstyring og verdivurdering, slik at du kan ta trygge valg for fremtiden. Vår lokale forankring i Finnmark gir oss unik innsikt i regionens muligheter og utfordringer.',
  bullets: [
    'Budsjett og prognoser',
    'Likviditetsstyring og kontantstrøm',
    'Verdivurdering og selskapsstrategi',
    'Støtteordninger og tilskudd'
  ],
  stats: { value: '∞', label: 'muligheter' },
  link: '/tjenester/raadgiving',
  linkText: 'Les mer om rådgivning'
}
```

---

## 6. VISUAL DESIGN CONSIDERATIONS

### Stats Display Options

**Option A: Badge in header**
```tsx
<div className="flex items-center gap-4 mb-6">
  <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center p-3">
    {/* Icon */}
  </div>
  <div className="flex-1">
    <h3 className="text-3xl font-bold text-slate-900">{title}</h3>
    <div className="h-1 w-12 mt-2 rounded-full" style={{ backgroundColor: themeColor }}></div>
  </div>
  {stats && (
    <div className="text-right">
      <div className="text-3xl font-bold" style={{ color: themeColor }}>{stats.value}</div>
      <div className="text-sm text-slate-500">{stats.label}</div>
    </div>
  )}
</div>
```

**Option B: Callout box**
```tsx
{stats && (
  <div className="bg-white rounded-xl p-4 border-2 mb-6" style={{ borderColor: `${themeColor}33` }}>
    <div className="text-center">
      <div className="text-4xl font-bold mb-1" style={{ color: themeColor }}>{stats.value}</div>
      <div className="text-sm text-slate-600">{stats.label}</div>
    </div>
  </div>
)}
```

**Recommendation:** Use **Option A** (badge in header) for cleaner integration.

### Image Display Options

**Option A: Background image**
```tsx
<div 
  className="absolute inset-0 opacity-5 bg-cover bg-center"
  style={{ backgroundImage: `url(${item.image})` }}
/>
```

**Option B: Featured image**
```tsx
{item.image && (
  <div className="mb-6 rounded-xl overflow-hidden">
    <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
  </div>
)}
```

**Recommendation:** Use **Option A** (subtle background) or skip image display entirely to keep focus on content.

---

## 7. POTENTIAL ISSUES & SOLUTIONS

### Issue 1: Missing Image Assets
**Problem:** User specifies `/images/service-skatt.jpg` but we only have `.avif` files in `src/assets/`

**Solution:**
- Reuse existing `regnskap.avif` for Årsoppgjør & Skatt
- Or create placeholder
- Or ask user to provide new image

### Issue 2: Icon Type Conflict
**Problem:** Current `FeatureTabs` expects `icon: string`, but we want to pass Lucide components

**Solution:**
- Update interface to accept both: `icon: React.ComponentType<{ className?: string }> | string`
- Add conditional rendering logic

### Issue 3: Stats Field Not Displayed
**Problem:** Adding `stats` field but no UI to show it

**Solution:**
- Add stats display in desktop content panel header
- Use badge/callout design (see Visual Design section)

---

## 8. TESTING CHECKLIST

After implementation:

- [ ] Desktop view: All 4 tabs render correctly
- [ ] Desktop view: Icons display as Lucide components
- [ ] Desktop view: Stats display in header
- [ ] Desktop view: Content and bullets match new data
- [ ] Mobile view: Accordion expands/collapses
- [ ] Mobile view: Icons display correctly
- [ ] Mobile view: Stats display (if shown on mobile)
- [ ] All links navigate correctly
- [ ] Hover states work on tabs
- [ ] Animation transitions smooth
- [ ] No console errors
- [ ] Responsive breakpoints work

---

## 9. QUESTIONS FOR USER

Before proceeding to implementation:

1. **Image assets:** Should we use existing `.avif` files from `src/assets/` or do you have new `.jpg` files to provide?

2. **Stats display:** Where should stats appear? (Header badge, callout box, or other?)

3. **Image display:** Should service images be displayed in the content panel, or just used as icons?

4. **Service order:** Should the order be Regnskap → Lønn → Årsoppgjør → Rådgivning?

---

## 10. NEXT STEPS

Once plan is approved:

1. Switch to **Code mode**
2. Implement changes in order:
   - Update `FeatureTabs.tsx` interface
   - Update `FeatureTabs.tsx` rendering logic
   - Update `Services.tsx` data
3. Test all functionality
4. Present completed work

---

**END OF PLAN**
