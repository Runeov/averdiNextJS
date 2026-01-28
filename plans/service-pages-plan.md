# Service Pages Implementation Plan
**Date:** 2026-01-15  
**Task:** Create individual service pages for all 4 services

---

## 1. OVERVIEW

We need to create 4 individual service pages:
1. **Regnskap** - `/tjenester/regnskap`
2. **Lønn & HR** - `/tjenester/lonn`
3. **Årsoppgjør & Skatt** - `/tjenester/aarsoppgjor`
4. **Rådgivning** - `/tjenester/raadgiving`

---

## 2. PAGE STRUCTURE TEMPLATE

Each service page should follow this structure:

### 2.1 Hero Section
- Service title
- Short description (2-3 sentences)
- Primary CTA button ("Kontakt oss")
- Background with service image (subtle)

### 2.2 Overview Section
- "Hva vi gjør" - Detailed description
- Key benefits (3-4 bullet points with icons)
- Stats badge (from service data)

### 2.3 Features/Services Grid
- 3-4 specific services within this category
- Each with icon, title, description
- Hover effects

### 2.4 Process Section
- "Slik jobber vi" - Step-by-step process
- 3-5 steps with numbers
- Visual timeline or cards

### 2.5 Why Averdi Section
- "Hvorfor velge Averdi?"
- 3 unique selling points
- Focus on Northern expertise, technology, personal service

### 2.6 Pricing/Packages Section (Optional)
- Transparent pricing information
- Different packages or service levels
- "Kontakt for tilbud" CTA

### 2.7 FAQ Section
- 4-6 common questions specific to this service
- Accordion component

### 2.8 CTA Section
- Final call to action
- Contact form or booking link
- Alternative: "Les mer" links to related services

---

## 3. REGNSKAP PAGE DETAILED PLAN

### 3.1 Hero Section
```
Title: Regnskap
Subtitle: Moderne skybasert regnskap som gir deg full oversikt i sanntid
Description: Vi tar oss av bilagene og holder orden på fristene, så du kan bruke tiden på å drive butikken. Med vår erfaring fra nordnorsk næringsliv forstår vi de unike utfordringene og mulighetene i regionen.
CTA: "Få et tilbud"
Stats Badge: "35+ års erfaring"
```

### 3.2 Overview Section
**Hva vi gjør:**
Vi tilbyr komplett regnskapstjeneste tilpasset nordnorske bedrifter. Fra løpende bokføring til årsoppgjør, vi håndterer alt det praktiske mens du fokuserer på det du er best på.

**Key Benefits:**
- ✅ **Skybasert tilgang** - Se tallene dine når som helst, hvor som helst
- ✅ **Automatisk bilagshåndtering** - Send bilag på e-post eller via app
- ✅ **Proaktiv rådgivning** - Vi varsler deg om frister og muligheter
- ✅ **Lokal forankring** - Vi forstår nordnorsk næringsliv

### 3.3 Features Grid
**Våre tjenester:**

1. **Løpende bokføring**
   - Icon: FileText
   - Daglig/ukentlig oppdatering
   - Automatisk kategorisering
   - Bilagsarkiv i skyen

2. **Momsrapportering**
   - Icon: Receipt
   - Korrekt beregning
   - Rettidig innlevering
   - Refusjonshåndtering

3. **Fakturering**
   - Icon: CreditCard
   - Profesjonelle fakturaer
   - Automatisk purring
   - Kundeoppfølging

4. **Skybaserte løsninger**
   - Icon: Cloud
   - PowerOffice Go
   - Sanntidsrapporter
   - Mobiltilgang

### 3.4 Process Section
**Slik jobber vi:**

**Steg 1: Oppstart**
- Kartlegging av behov
- Oppsett av systemer
- Opplæring i verktøy

**Steg 2: Løpende drift**
- Du sender bilag
- Vi bokfører og rapporterer
- Du får månedlige rapporter

**Steg 3: Årsavslutning**
- Årsoppgjør
- Skattemelding
- Planlegging for neste år

### 3.5 Why Averdi Section
**Hvorfor velge Averdi?**

1. **Nordnorsk ekspertise**
   - Vi kjenner tiltakssonen
   - Vi forstår lokale utfordringer
   - Vi snakker ditt språk

2. **Moderne teknologi**
   - Skybaserte løsninger
   - Automatisering
   - Sanntidsrapporter

3. **Personlig service**
   - Fast kontaktperson
   - Rask respons
   - Proaktiv rådgivning

### 3.6 FAQ Section
**Ofte stilte spørsmål:**

1. **Hva koster regnskapstjenester?**
   - Avhenger av omfang og kompleksitet. Vi tilbyr fastprisavtaler for forutsigbarhet.

2. **Hvor ofte må jeg sende bilag?**
   - Så ofte du vil! Vi anbefaler ukentlig eller månedlig for best oversikt.

3. **Kan jeg bytte fra min nåværende regnskapsfører?**
   - Ja, vi håndterer hele overgangen smidig og trygt.

4. **Hvilke systemer bruker dere?**
   - Vi bruker PowerOffice Go, som er markedsledende i Norge.

5. **Får jeg tilgang til tallene mine?**
   - Ja, du har full tilgang til sanntidsrapporter via nettleser eller app.

6. **Hva skjer hvis jeg glemmer en frist?**
   - Vi varsler deg i god tid og sørger for at alt leveres riktig.

### 3.7 CTA Section
  ```
Title: Klar for bedre regnskap?
Description: La oss ta en uforpliktende prat om hvordan vi kan hjelpe din bedrift.
Primary CTA: "Kontakt oss"
Secondary CTA: "Se våre andre tjenester"
```

---

## 4. LØNN & HR PAGE OUTLINE

### Hero
- Title: Lønn & HR
- Subtitle: Korrekt lønn til rett tid – hver gang
- Stats: "100% presisjon"

### Key Services
1. A-melding og lønnsrapportering
2. Reiseregninger og utlegg
3. Sykepenger og refusjoner
4. Redusert arbeidsgiveravgift i tiltakssonen

### Why Averdi
- Kjenner særreglene for tiltakssonen
- Automatisert lønnskjøring
- Personlig oppfølging

### FAQ
- Hva koster lønnstjenester?
- Hvor raskt kan dere starte?
- Håndterer dere sykepenger?
- Hva med feriepenger?

---

## 5. ÅRSOPPGJØR & SKATT PAGE OUTLINE

### Hero
- Title: Årsoppgjør & Skatt
- Subtitle: Trygg avslutning av regnskapsåret
- Stats: "0 forsinkelser"

### Key Services
1. Årsregnskap og noter
2. Skattemelding for næringsdrivende
3. Skatteoptimalisering og fradrag
4. Særskilte ordninger for tiltakssonen

### Why Averdi
- Ekspertise på tiltakssonen
- Maksimerer fradrag
- Rettidig innlevering

### FAQ
- Når må årsoppgjøret leveres?
- Hva er forskjellen på årsregnskap og skattemelding?
- Kan dere hjelpe med skatteplanlegging?
- Hva med revisjonsplikt?

---

## 6. RÅDGIVNING PAGE OUTLINE

### Hero
- Title: Rådgivning
- Subtitle: Strategisk sparringspartner for vekst
- Stats: "∞ muligheter"

### Key Services
1. Budsjett og prognoser
2. Likviditetsstyring og kontantstrøm
3. Verdivurdering og selskapsstrategi
4. Støtteordninger og tilskudd

### Why Averdi
- Lokal forankring i Finnmark
- Kjenner støtteordninger
- Langsiktig perspektiv

### FAQ
- Hva er forskjellen på rådgivning og regnskap?
- Kan dere hjelpe med Sametinget-søknader?
- Hva koster rådgivning?
- Hvor ofte bør vi ha rådgivningsmøter?

---

## 7. TECHNICAL IMPLEMENTATION

### File Structure
```
src/app/tjenester/
├── regnskap/
│   └── page.tsx
├── lonn/
│   └── page.tsx
├── aarsoppgjor/
│   └── page.tsx
└── raadgiving/
    └── page.tsx
```

### Shared Components to Create
1. **ServiceHero** - Reusable hero section
2. **ServiceFeatureGrid** - Grid of service features
3. **ServiceProcess** - Step-by-step process display
4. **ServiceFAQ** - FAQ accordion specific to service
5. **ServiceCTA** - Final CTA section

### Component Props Pattern
```typescript
interface ServicePageProps {
  title: string;
  subtitle: string;
  description: string;
  stats: { value: string; label: string };
  features: ServiceFeature[];
  process: ProcessStep[];
  whyAverdi: WhyPoint[];
  faq: FAQItem[];
  relatedServices: string[];
}
```

---

## 8. CONTENT TONE & VOICE

Following Averdi voice rules:

### TANGEN Energy (Openings)
- Start with direct questions
- Use active verbs
- Show enthusiasm

### REGNSKAP NORGE Authority (Body)
- Precise terminology
- Structured information
- Professional tone

### UTILITY Practicality (CTAs)
- Clear action steps
- Relatable examples
- Human-centric language

---

## 9. SEO CONSIDERATIONS

### Meta Tags for Each Page
```typescript
export const metadata = {
  title: 'Regnskap | Averdi - Regnskapstjenester i Nord-Norge',
  description: 'Moderne skybasert regnskap for nordnorske bedrifter. 35+ års erfaring. PowerOffice Go. Kontakt oss for tilbud.',
  keywords: 'regnskap, bokføring, nordnorge, finnmark, poweroffice',
}
```

### JSON-LD Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Regnskapstjenester",
  "provider": {
    "@type": "Organization",
    "name": "Averdi AS"
  },
  "areaServed": "Nord-Norge",
  "description": "Komplett regnskapstjeneste for nordnorske bedrifter"
}
```

---

## 10. IMPLEMENTATION ORDER

1. **Phase 1: Core Updates** (Code mode)
   - Update FeatureTabs interface
   - Update FeatureTabs component
   - Update Services.tsx with 4 services

2. **Phase 2: Regnskap Page** (Code mode)
   - Create shared components
   - Build regnskap page
   - Test and refine

3. **Phase 3: Remaining Pages** (Code mode)
   - Lønn page
   - Årsoppgjør page
   - Rådgivning page

4. **Phase 4: Polish** (Code mode)
   - Cross-linking between pages
   - Final testing
   - SEO optimization

---

## 11. QUESTIONS FOR USER

Before starting implementation:

1. **Content depth:** Should pages be long-form (like kunnskapsbank articles) or concise?
2. **Pricing:** Should we include pricing information or just "Kontakt for tilbud"?
3. **Images:** Do you have specific images for each service, or should we use existing assets?
4. **Contact form:** Should each page have an embedded contact form or just link to contact page?

---

**READY TO PROCEED TO CODE MODE**

Once approved, we'll:
1. Update Services section (FeatureTabs + Services.tsx)
2. Create Regnskap page with all sections
3. Create remaining 3 service pages
4. Test and polish

---

**END OF PLAN**
