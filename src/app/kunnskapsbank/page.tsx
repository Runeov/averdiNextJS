import type { Metadata } from 'next';
import Link from 'next/link';
import { Landmark, Building2, Users, ArrowRight, HelpCircle } from 'lucide-react';
import { AverdiBackground } from '@/components/modules/AverdiBackground';
import { FaqAccordion } from '@/components/ui/FaqAccordion'; // Ny import
export const metadata: Metadata = {
  title: 'Kunnskapsbank | Averdi',
  description: 'Din guide til næringsliv og frivillighet i Nord. Spesialist på Sametinget, Tiltakssonen og Idrettslag.',
};

export default function KunnskapsbankPage() {
  
  // Data for både JSON-LD (skjult) og FAQ-visning (synlig)
  const faqData = [
    {
      question: 'Hvilke støtteordninger har Sametinget for næringsliv?',
      answer: 'Sametinget gir støtte til variert næringsliv, duodji, samisk reiseliv og tilleggsnæringer. Bedrifter kan søke om inntil 500 000 kroner i investeringstilskudd.'
    },
    {
      question: 'Hva er arbeidsgiveravgiften i Tiltakssonen?',
      answer: 'I Tiltakssonen (Sone 5), som dekker Finnmark og Nord-Troms, er arbeidsgiveravgiften 0%. Dette gjelder generelt, men med enkelte unntak for transport og finans (bagatellstøtte).'
    },
    {
      question: 'Hvordan søker idrettslag om momskompensasjon?',
      answer: 'Idrettslag kan søke om vare- og tjenestemoms via samordnet søknad. Fristen er normalt 1. september, og ordningen forvaltes av Lotteri- og stiftelsestilsynet. Vi bistår med korrekt innrapportering.'
    }
  ];

  // Generer Schema basert på dataene over
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqData.map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer
      }
    }))
  };

  return (
    <main className="min-h-screen bg-slate-50 relative overflow-hidden">
      <AverdiBackground />
      
      {/* 1. SKJULT: Inject Schema for Google/AI */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hero */}
      <section className="relative z-10 pt-24 pb-16 px-4 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/5 text-slate-600 text-sm font-medium mb-6">
          <span className="w-2 h-2 rounded-full bg-[#E86C1F]"></span>
          Din vekstpartner i Nord
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
          Kunnskap som gir <span className="text-[#E86C1F]">vekst i nord</span>
        </h1>
        <p className="text-xl text-slate-600 mb-12 leading-relaxed">
          Vi deler vår ekspertise om tilskudd, skattefordeler og drift, slik at du kan lykkes i Finnmark og Nord-Troms.
        </p>
      </section>

      {/* De 3 Strategiske Pilarene */}
      <section className="container mx-auto px-4 pb-20 relative z-10">
        <div className="grid md:grid-cols-3 gap-6">
          
          {/* 1. SAMETINGET */}
          <Link href="/kunnskapsbank/sametinget" className="group bg-white rounded-3xl p-8 shadow-sm border border-slate-200 hover:border-[#E86C1F]/50 transition-all hover:shadow-2xl hover:shadow-[#E86C1F]/10 relative overflow-hidden flex flex-col h-full">
            <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 text-[#E86C1F] group-hover:scale-110 transition-transform">
              <Landmark className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Sametinget & Duodji</h2>
            <p className="text-slate-600 mb-8 leading-relaxed flex-1">
              I 2026 forvalter Sametinget over <strong>3 milliarder kroner</strong>. Vi hjelper deg å navigere søknadsjungelen for kultur, språk og næring.
            </p>
            <span className="inline-flex items-center text-[#E86C1F] font-bold text-sm group-hover:gap-2 transition-all mt-auto">
              Se støtteordninger <ArrowRight className="w-4 h-4 ml-1" />
            </span>
          </Link>

          {/* 2. BEDRIFT */}
          <Link href="/kunnskapsbank/bedrifter" className="group bg-white rounded-3xl p-8 shadow-sm border border-slate-200 hover:border-blue-400/50 transition-all hover:shadow-2xl hover:shadow-blue-500/10 relative overflow-hidden flex flex-col h-full">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 transition-transform">
              <Building2 className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Bedrift & Handel</h2>
            <p className="text-slate-600 mb-8 leading-relaxed flex-1">
              Maksimer fordelene ved å drive i <strong>Tiltakssonen</strong>. Alt om 0% arbeidsgiveravgift, finnmarksfradrag og smarte kasseløsninger.
            </p>
            <span className="inline-flex items-center text-blue-600 font-bold text-sm group-hover:gap-2 transition-all mt-auto">
              Beregn besparelser <ArrowRight className="w-4 h-4 ml-1" />
            </span>
          </Link>

          {/* 3. ORGANISASJON */}
          <Link href="/kunnskapsbank/organisasjoner" className="group bg-white rounded-3xl p-8 shadow-sm border border-slate-200 hover:border-green-500/50 transition-all hover:shadow-2xl hover:shadow-green-500/10 relative overflow-hidden flex flex-col h-full">
            <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-6 text-green-600 group-hover:scale-110 transition-transform">
              <Users className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Lag & Forening</h2>
            <p className="text-slate-600 mb-8 leading-relaxed flex-1">
              Forenkle hverdagen for kassereren. Vi guider dere gjennom <strong>momskompensasjon</strong>, medlemsregistre og Vipps-regnskap.
            </p>
            <span className="inline-flex items-center text-green-600 font-bold text-sm group-hover:gap-2 transition-all mt-auto">
              Få kontroll på laget <ArrowRight className="w-4 h-4 ml-1" />
            </span>
          </Link>

        </div>
      </section>

    {/* 2. SYNLIG: FAQ Section (Matcher JSON-LD) */}
      <section className="bg-white border-t border-slate-200 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-3 bg-[#E86C1F]/10 rounded-full mb-4 text-[#E86C1F]">
              <HelpCircle className="w-8 h-8" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Ofte stilte spørsmål</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Her finner du raske svar på det våre kunder oftest lurer på om støtteordninger og skatteregler i nord.
            </p>
          </div>

          <FaqAccordion items={faqData} themeColor="#E86C1F" />
          
        </div>
      </section>

    </main>
  );
}