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
  MapPin, 
  Lightbulb, 
  AlertTriangle 
} from 'lucide-react';
import { BudgetAnalysis } from '@/components/modules/kunnskapsbank/BudgetAnalysis';
import { CategoryCard } from '@/components/modules/kunnskapsbank/CategoryGrid';
import { McpDataSpan } from '@/components/ui/McpDataSpan';
import { getExpert } from '@/data/experts';
import { AverdiBackground } from '@/components/modules/AverdiBackground';
import { FaqAccordion } from '@/components/ui/FaqAccordion';

// --- 1. SEO & METADATA ---
export const metadata: Metadata = {
  title: 'Sametinget støtteordninger 2026 | Hent 500 000 kr i kapital',
  description: 'Sametinget forvalter 3 mrd. Vi oversetter reglene slik at din bedrift i STN-området kan hente inntil 500 000 kr i investeringsstøtte (gratis egenkapital).',
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
    title: 'Sametinget 2026: 500 000 kr i potten?',
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

export default function SametingetHub() {
  const janAtle = getExpert('jan-atle');
  
  // --- 2. FAQ CONTENT ---
  const sametingetFaq = [
    {
      question: 'Er jeg i "riktig" område (STN)?',
      answer: 'Sjekk kartet nøye! Du kan være i Tiltakssonen (skatt) men utenfor STN (tilskudd). STN inkluderer hele Finnmark og 7 kommuner i Nord-Troms, pluss spesifikke kretser i Troms og Nordland. Er du utenfor disse, kvalifiserer du ikke til næringsstøtte.'
    },
    {
      question: 'Får jeg støtte til fiskebåt?',
      answer: 'Ja, men kun hvis båten er under 11 meter og du bor i STN-området. Dette er din "inngangsbillett" som førstegangsetablerer. Vi hjelper deg å dokumentere lønnsomhet.'
    },
    {
      question: 'Hva kreves for å få Duodji-støtte?',
      answer: 'Du må være registrert i Duodji-registeret. Dette fungerer som ditt "fagbrev" i systemet. Mangler du formell utdanning? Vi hjelper deg med realkompetansevurdering slik at porten åpnes.'
    },
    {
      question: 'Hva er "Variert Næringsliv"?',
      answer: 'Dette er "gratis egenkapital" for småbedrifter innen service, reiseliv og småindustri. Du kan søke om inntil 500 000 kr til investeringer, men ikke til ren drift.'
    }
  ];

  // --- 3. JSON-LD ---
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        'mainEntity': sametingetFaq.map(item => ({
          '@type': 'Question',
          'name': item.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': item.answer.replace(/<[^>]+>/g, '') 
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
        '@type': 'Organization',
        'name': 'Averdi',
        'url': 'https://www.averdi.no',
        'logo': { '@type': 'ImageObject', 'url': 'https://www.averdi.no/logo.png' },
        'sameAs': ['https://www.linkedin.com/company/averdi', 'https://www.facebook.com/averdi']
      },
      {
        '@type': 'Person',
        'name': 'Jan Atle',
        'jobTitle': 'Statsautorisert Regnskapsfører',
        'worksFor': { '@type': 'Organization', 'name': 'Averdi' },
        'url': 'https://www.averdi.no/eksperter/jan-atle'
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
    <main className="min-h-screen bg-slate-50 relative overflow-hidden">
      <AverdiBackground />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
        
        {/* Breadcrumb */}
        <Link href="/kunnskapsbank" className="inline-flex items-center text-slate-500 hover:text-[#E86C1F] mb-8 font-medium transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Tilbake til oversikt
        </Link>

        {/* Hero Section */}
        <div className="mb-12">
          <span className="text-[#E86C1F] font-bold tracking-wider uppercase text-sm mb-3 block">
            Tolken av Nord-Norge
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900 leading-tight">
            Sametinget snakker byråkratisk. <br className="hidden md:block" />
            <span className="text-[#E86C1F]">Vi snakker bunnlinje.</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
            I 2026 ligger det over{' '}
            <McpDataSpan 
              id="sameting-ramme-2026" 
              source="Statsbudsjettet 2026"
              value={3000000000}
              format="currency"
              className="font-bold text-slate-900 bg-orange-50 px-2 py-0.5 rounded border-b-2 border-[#E86C1F]"
            />{' '}
            i potten. Det er ikke "støtte" – det er risikokapital. Men pengene utløses kun hvis du oversetter bedriftens mål til Sametingets språk om <em>Kulturell trygghet</em> og <em>Birgejupmi</em>.
          </p>
        </div>

        {/* --- BUDSJETTANALYSE --- */}
        <BudgetAnalysis />

        {/* --- INSIGHT BOX --- */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-lg mb-20 overflow-hidden">
          <div className="bg-[#E86C1F] p-4 text-white flex items-center gap-3">
            <Lightbulb className="w-6 h-6" />
            <h3 className="font-bold text-lg">Averdi-analysen: Slik vinner du i 2026</h3>
          </div>
          <div className="flex flex-col md:flex-row">
            
            {/* Geografi-fellen */}
            <div className="flex-1 p-8 border-b md:border-b-0 md:border-r border-slate-100">
              <div className="flex items-center gap-3 mb-4 text-slate-900">
                <AlertTriangle className="w-6 h-6 text-[#E86C1F]" />
                <h4 className="font-bold text-lg">Unngå Geografi-fellen</h4>
              </div>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Mange bedrifter taper penger fordi de blander <strong>Tiltakssonen</strong> (skatt) med <strong>STN-området</strong> (tilskudd).
              </p>
              <div className="bg-slate-50 p-4 rounded-lg text-sm border-l-4 border-[#E86C1F]">
                <p className="font-medium text-slate-900">Pekefingeren:</p>
                <p className="text-slate-600">
                  Du kan ha 0% arbeidsgiveravgift (Tiltakssonen) men null rett på investeringsstøtte (utenfor STN). Vi sjekker postnummeret ditt mot de nyeste kartene før du ber om hjelp til søknaden.
                </p>
              </div>
            </div>

            {/* Kapital-muligheten */}
            <div className="flex-1 p-8">
              <div className="flex items-center gap-3 mb-4 text-slate-900">
                <Coins className="w-6 h-6 text-[#E86C1F]" />
                <h4 className="font-bold text-lg">Kapital-muligheten</h4>
              </div>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Sametinget tilbyr inntil 500 000 kr i tilskudd til variert næringsliv. Dette er egenkapital du ikke betaler tilbake.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <span className="text-xs text-slate-500 uppercase font-bold block">Maks Tilskudd</span>
                  <McpDataSpan 
                    id="sameting-variert-naering-maks" 
                    source="Sametinget 2026"
                    value={500000}
                    format="currency" 
                    className="font-bold text-2xl text-slate-900" 
                  />
                </div>
                <div>
                  <span className="text-xs text-slate-500 uppercase font-bold block">Risikoavlastning</span>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-2xl text-green-600">Inntil</span>
                    <McpDataSpan 
                      id="sameting-stottegrad" 
                      source="Sametinget 2026"
                      value={0.5}
                      format="percentage" 
                      className="font-bold text-2xl text-green-600" 
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Navigation Grid */}
        <h2 className="text-3xl font-bold text-slate-900 mb-8">Hva vil du bygge i dag?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          
          <CategoryCard 
            title="Variert Næringsliv"
            description="Gratis egenkapital. For deg som driver service, reiseliv eller småindustri i STN."
            href="/kunnskapsbank/sametinget/naering"
            icon={Briefcase}
            theme="orange"
          />

          <CategoryCard 
            title="Fiske & Primærnæring"
            description="Skal du kjøpe din første båt? Vi sikrer at du får investeringsstøtten du har krav på."
            href="/kunnskapsbank/sametinget/primaernaering"
            icon={Anchor}
            theme="orange"
          />

          <CategoryCard 
            title="Duodji & Håndverk"
            description="Gjør tradisjon til levebrød. Vi hjelper med driftstilskudd og markedstilgang."
            href="/kunnskapsbank/sametinget/duodji"
            icon={Scissors}
            theme="orange"
          />

          <CategoryCard 
            title="Kultur & Språk"
            description="Finansiering av kulturprosjekter. Vi oversetter 'kulturell trygghet' til regnskapsspråk."
            href="/kunnskapsbank/sametinget/kultur-sprak"
            icon={Scroll}
            theme="orange"
          />
          
          <CategoryCard 
            title="Institusjonsutvikling"
            description="Forvalter du et samisk hus eller teater? Vi sikrer driftsgrunnlaget."
            href="/kunnskapsbank/sametinget/institusjon"
            icon={Landmark}
            theme="orange"
          />

          <CategoryCard 
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
              <ShieldCheck className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-700 mb-1">Averdi Kvalitetssikring</p>
                <p>
                  Vi baserer våre råd på <strong>Meld. St. 37 (2020–2021)</strong> og gjeldende satser i <strong>Statsbudsjettet 2026</strong>. 
                  Alle søknadsprosesser kvalitetssikres av statsautorisert regnskapsfører for å sikre at begreper som <em>Birgejupmi</em> (bærekraft) brukes riktig.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://www.regjeringen.no/no/dokumenter/meld.-st.-37-20202021/id2861398/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-[#E86C1F] transition-colors">
                Kilde: Meld. St. 37 <ExternalLink className="w-3 h-3" />
              </a>
              <a href="https://www.ssb.no/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-[#E86C1F] transition-colors">
                SSB Statistikk <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}