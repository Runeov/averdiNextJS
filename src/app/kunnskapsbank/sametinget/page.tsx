import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  Briefcase,
  Anchor,
  Scissors,
  Scroll,
  Landmark,
  BookOpen,
  ExternalLink,
  Coins,
  ShieldCheck,
  Lightbulb,
  AlertTriangle,
  Languages,
  Sparkles
} from 'lucide-react';
import { BudgetAnalysis } from '@/components/modules/kunnskapsbank/BudgetAnalysis';
import { McpDataSpan } from '@/components/ui/McpDataSpan';
import { getExpert } from '@/data/experts';
import { AverdiBackground } from '@/components/modules/AverdiBackground';
import { FaqAccordion } from '@/components/ui/FaqAccordion';

// --- 1. SEO & METADATA ---
export const metadata: Metadata = {
  title: 'Sametinget støtteordninger 2026 | Hent 800 000 kr i kapital',
  description: 'Sametinget forvalter nesten 800 mill. Vi oversetter reglene slik at din bedrift i STN-området kan hente inntil 800 000 kr i investeringsstøtte (gratis egenkapital).',
  metadataBase: new URL('https://www.averdi.no'),
  alternates: {
    canonical: '/kunnskapsbank/sametinget',
  },
  authors: [{ name: 'Jan Atle - Averdi', url: 'https://www.averdi.no/eksperter/jan-atle' }],
  openGraph: {
    title: 'Sametinget 2026: Slik knekker du koden',
    description: 'Geografi-fellen koster bedrifter millioner. Vi viser forskjellen på STN og Tiltakssonen, og hvordan du bruker "Birgejupmi" for å vinne søknaden.',
    url: 'https://www.averdi.no/kunnskapsbank/sametinget',
    siteName: 'Averdi - Tolken av Nord-Norge',
    images: [{ url: '/og-images/sametinget-guide-2026.jpg', width: 1200, height: 630, alt: 'Averdi guide til Sametinget 2026' }],
    locale: 'nb_NO',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sametinget 2026: 800 000 kr i potten?',
    description: 'Guide: Slik søker du støtte til næring i Nord-Norge uten å gå deg vill i skjemaene.',
    images: ['/og-images/sametinget-guide-2026.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
  }
};

// Lokal CategoryCard for stabilitet
function LocalCategoryCard({ title, description, href, icon: Icon, theme }: any) {
    return (
        <Link href={href} className="group flex flex-col p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md hover:border-[#E86C1F] transition-all h-full">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-4 text-[#E86C1F] group-hover:bg-[#E86C1F] group-hover:text-white transition-colors">
                <Icon className="w-6 h-6" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#E86C1F] transition-colors">{title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed flex-grow">{description}</p>
        </Link>
    );
}

export default function SametingetHub() {
  const janAtle = getExpert('jan-atle');
  
  // --- 2. FAQ CONTENT (Med JSX) ---
  const sametingetFaq = [
    {
      question: 'Er jeg i "riktig" område (STN)?',
      answer: <>Sjekk kartet nøye! Du kan være i Tiltakssonen (skatt) men utenfor STN (tilskudd). STN inkluderer hele <strong>Finnmark</strong> og <strong>7 kommuner i Nord-Troms</strong>, pluss spesifikke kretser i Troms og Nordland. Er du utenfor disse, kvalifiserer du ikke til næringsstøtte.</>
    },
    {
      question: 'Får jeg støtte til fiskebåt?',
      answer: <>Ja, men kun hvis båten er under <strong>11 meter</strong> og du bor i STN-området. Dette er din "inngangsbillett" som førstegangsetablerer. Vi hjelper deg å dokumentere lønnsomhet.</>
    },
    {
      question: 'Hva kreves for å få Duodji-støtte?',
      answer: <>For driftstilskudd må du være registrert og godkjent i <strong>Sámi Duodji-merke</strong> ordningen – dette er nytt krav fra 2025. For momsfritak holder det med <strong>Duodji-registeret</strong>. Mangler du formell utdanning? Vi hjelper deg med realkompetansevurdering slik at porten åpnes.</>
    },
    {
      question: 'Hva er "Variert Næringsliv"?',
      answer: <>Dette er "gratis egenkapital" for småbedrifter innen service, reiseliv og småindustri. Du kan søke om inntil <strong>800 000 kr</strong> til investeringer (40-70% av godkjente kostnader avhengig av type), men ikke til ren drift.</>
    }
  ];

  // --- 3. JSON-LD (String only) ---
  const faqJsonData = sametingetFaq.map(item => ({
      question: item.question,
      answer: typeof item.answer === 'string' ? item.answer : "Se nettsiden for detaljert svar." // Fallback for complex JSX in JSON-LD if needed, but here we can just strip tags manually if we had the text version
  }));
  
  // Manuell tekst-versjon for JSON-LD for å være 100% sikker
  const jsonLdData = [
    { q: 'Er jeg i "riktig" område (STN)?', a: 'Sjekk kartet nøye! Du kan være i Tiltakssonen (skatt) men utenfor STN (tilskudd). STN inkluderer hele Finnmark og 7 kommuner i Nord-Troms.' },
    { q: 'Får jeg støtte til fiskebåt?', a: 'Ja, men kun hvis båten er under 11 meter og du bor i STN-området.' },
    { q: 'Hva kreves for å få Duodji-støtte?', a: 'For driftstilskudd må du være registrert og godkjent i Sámi Duodji-merke ordningen (nytt krav fra 2025). For momsfritak holder det med Duodji-registeret.' },
    { q: 'Hva er "Variert Næringsliv"?', a: 'Dette er "gratis egenkapital" for småbedrifter innen service, reiseliv og småindustri. Inntil 800 000 kr (40-70% av godkjente kostnader avhengig av type).' }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        'mainEntity': jsonLdData.map(item => ({
          '@type': 'Question',
          'name': item.q,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': item.a
          }
        }))
      },
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Kunnskapsbank', 'item': 'https://www.averdi.no/kunnskapsbank' },
          { '@type': 'ListItem', 'position': 2, 'name': 'Sametinget Støtte', 'item': 'https://www.averdi.no/kunnskapsbank/sametinget' }
        ]
      },
      {
        '@type': 'Service',
        'name': 'Søknadshjelp Sametinget',
        'serviceType': 'Rådgivning for Sametingets næringsstøtte',
        'provider': { '@type': 'Organization', 'name': 'Averdi' },
        'description': 'Vi oversetter byråkratiske krav til kommersiell fordel. Hjelp med søknad, budsjett og "kulturell trygghet"-beskrivelser.',
        'areaServed': 'Nord-Troms og Finnmark'
      }
    ]
  };

  return (
    <main className="min-h-screen bg-slate-50 relative overflow-hidden font-sans">
      <AverdiBackground />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
        
        {/* Breadcrumb */}
        <Link href="/kunnskapsbank" className="inline-flex items-center text-slate-500 hover:text-[#E86C1F] mb-8 font-medium transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" /> Tilbake til oversikt
        </Link>

        {/* Hero Section - KORRIGERT IHT. PROTOKOLL */}
        <div className="mb-12">
          <span className="text-[#E86C1F] font-bold tracking-wider uppercase text-sm mb-3 block">
            Tolken av Nord-Norge
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-slate-900 leading-tight">
            Sametinget setter rammene. <br className="hidden md:block" />
            <span className="text-[#E86C1F]">Vi finner mulighetene.</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
            I 2026 ligger det over{' '}
            <McpDataSpan 
              id="sameting-ramme-2026" 
              source="Sametingets budsjett 2026"
              value={788000000}
              format="currency"
              className="font-bold text-slate-900 bg-orange-50 px-2 py-0.5 rounded border-b-2 border-[#E86C1F]"
            />{' '}
            i potten. Det er ikke bare støtte – det er en <strong>Investeringsmotor</strong>. 
            Pengene utløses når du bruker regelverket til å bygge <em>Kulturell trygghet</em> og <em>Birgejupmi</em>.
          </p>
        </div>

        {/* --- BUDSJETTANALYSE --- */}
        <BudgetAnalysis />

        {/* --- INSIGHT BOX --- */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-lg mb-20 overflow-hidden">
          <div className="bg-[#E86C1F] p-4 text-white flex items-center gap-3">
            <Lightbulb className="w-6 h-6" aria-hidden="true" />
            <h3 className="font-bold text-lg">Averdi-analysen: Slik vinner du i 2026</h3>
          </div>
          <div className="flex flex-col md:flex-row">
            
            {/* Geografi-fellen */}
            <div className="flex-1 p-8 border-b md:border-b-0 md:border-r border-slate-100">
              <div className="flex items-center gap-3 mb-4 text-slate-900">
                <AlertTriangle className="w-6 h-6 text-[#E86C1F]" aria-hidden="true" />
                <h3 className="font-bold text-lg">Unngå Geografi-fellen</h3>
              </div>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Mange bedrifter taper penger fordi de blander <strong>Tiltakssonen</strong> (skatt) med <strong>STN-området</strong> (tilskudd).
              </p>
              <div className="bg-slate-50 p-4 rounded-lg text-sm border-l-4 border-[#E86C1F]">
                <p className="font-bold text-slate-900 mb-1">Pekefingeren:</p>
                <p className="text-slate-600">
                  Du kan ha 0% arbeidsgiveravgift (Tiltakssonen) men null rett på investeringsstøtte (utenfor STN). Vi sjekker postnummeret ditt mot de nyeste kartene før du ber om hjelp til søknaden.
                </p>
              </div>
            </div>

            {/* Kapital-muligheten */}
            <div className="flex-1 p-8">
              <div className="flex items-center gap-3 mb-4 text-slate-900">
                <Coins className="w-6 h-6 text-[#E86C1F]" aria-hidden="true" />
                <h3 className="font-bold text-lg">Kapital-muligheten</h3>
              </div>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Sametinget tilbyr inntil 800 000 kr i tilskudd til variert næringsliv. Dette er egenkapital du ikke betaler tilbake.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <span className="text-xs text-slate-500 uppercase font-bold block">Maks Tilskudd</span>
                  <McpDataSpan 
                    id="sameting-variert-naering-maks" 
                    source="Sametinget 2026"
                    value={800000}
                    format="currency" 
                    className="font-bold text-2xl text-slate-900" 
                  />
                </div>
                <div>
                  <span className="text-xs text-slate-500 uppercase font-bold block">Risikoavlastning</span>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-2xl text-green-600">40-70%</span>
                  </div>
                  <span className="text-xs text-slate-400">Avhengig av næringstype</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* --- NYTT I 2026: SPRÅKSENTER ETABLERING --- */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-20 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white rounded-xl text-blue-600 shadow-sm">
              <Languages className="w-6 h-6" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-blue-500" aria-hidden="true" />
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Nytt i 2026</span>
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Etablering av nye språksentre</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-3">
                Sametinget har satt av <strong className="text-blue-700">3,7 millioner kroner</strong> til etablering av nye samiske språksentre i 2026.
                Dette er en unik mulighet for kommuner og organisasjoner som ønsker å styrke samisk språk lokalt.
              </p>
              <Link
                href="/kunnskapsbank/sametinget/kultur-sprak"
                className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
              >
                Les mer om språkstøtte →
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Grid */}
        <h2 className="text-3xl font-bold text-slate-900 mb-8">Hva vil du bygge i dag?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          
          <LocalCategoryCard 
            title="Variert Næringsliv"
            description="Gratis egenkapital. For deg som driver service, reiseliv eller småindustri i STN."
            href="/kunnskapsbank/sametinget/naering"
            icon={Briefcase}
            theme="orange"
          />

          <LocalCategoryCard 
            title="Fiske & Primærnæring"
            description="Skal du kjøpe din første båt? Vi sikrer at du får investeringsstøtten du har krav på."
            href="/kunnskapsbank/sametinget/primaernaering"
            icon={Anchor}
            theme="orange"
          />

          <LocalCategoryCard 
            title="Duodji & Håndverk"
            description="Gjør tradisjon til levebrød. Vi hjelper med driftstilskudd og markedstilgang."
            href="/kunnskapsbank/sametinget/duodji"
            icon={Scissors}
            theme="orange"
          />

          <LocalCategoryCard 
            title="Kultur & Språk"
            description="Finansiering av kulturprosjekter. Vi oversetter 'kulturell trygghet' til regnskapsspråk."
            href="/kunnskapsbank/sametinget/kultur-sprak"
            icon={Scroll}
            theme="orange"
          />
          
          <LocalCategoryCard 
            title="Institusjonsutvikling"
            description="Forvalter du et samisk hus eller teater? Vi sikrer driftsgrunnlaget."
            href="/kunnskapsbank/sametinget/institusjon"
            icon={Landmark}
            theme="orange"
          />

          <LocalCategoryCard 
            title="Offentlig Sektor"
            description="Barnehage og skole: Slik henter dere midler til samisk språkopplæring."
            href="/kunnskapsbank/sametinget/offentlig"
            icon={BookOpen}
            theme="orange"
          />

        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mb-20">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Spørsmål vi ofte løser</h2>
          <FaqAccordion items={sametingetFaq} themeColor="#E86C1F" />
        </div>

        {/* --- KILDER & AUTORITET --- */}
        <div className="border-t border-slate-200 pt-8 pb-4 mt-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-xs text-slate-500">
            <div className="flex items-start gap-3 max-w-2xl">
              <ShieldCheck className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="font-semibold text-slate-700 mb-1">Averdi Kvalitetssikring</p>
                <p>
                  Vi baserer våre råd på <strong>Sametingets budsjett 2026</strong> (vedtatt desember 2025) og <strong>Meld. St. 37 (2020–2021)</strong>. 
                  Alle søknadsprosesser kvalitetssikres av statsautorisert regnskapsfører for å sikre at begreper som <em>Birgejupmi</em> (bærekraft) brukes riktig.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://sametinget.no/stipend-og-tilskudd/oversikt-over-tilskuddsordninger/naring/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-[#E86C1F] transition-colors">
                Sametinget Næring <span className="sr-only"> (åpnes i ny fane)</span><ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
              <a href="https://www.regjeringen.no/no/dokumenter/meld.-st.-37-20202021/id2861398/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-[#E86C1F] transition-colors">
                Meld. St. 37 <span className="sr-only"> (åpnes i ny fane)</span><ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}