import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Building2, Calendar, FileCheck, Coins, TrendingUp } from 'lucide-react';
import { ExpertInsight } from '@/components/modules/kunnskapsbank/ExpertInsight';
import { McpDataSpan } from '@/components/ui/McpDataSpan';
import { getExpert } from '@/data/experts';
import { AverdiBackground } from '@/components/modules/AverdiBackground';
import { CtaBlock } from '@/components/modules/kunnskapsbank/CtaBlock';
import { FaqAccordion } from '@/components/ui/FaqAccordion';

export const metadata: Metadata = {
  title: 'Institusjonsutvikling & Festivalstøtte | Sametinget',
  description: 'Vi bistår samiske institusjoner, festivaler og kulturhus med driftstilskudd og rapportering. Se frister og krav for 2026.',
};

export default function InstitusjonPage() {
  const janAtle = getExpert('jan-atle');

  const faqData = [
    { question: "Hva er forskjellen på driftstilskudd og prosjektstøtte?", answer: "Driftstilskudd går til faste kostnader (lønn, husleie) for å holde institusjonen i gang året rundt. Prosjektstøtte er engangssummer til avgrensede tiltak (f.eks. en utstilling)." },
    { question: "Når må vi rapportere på driftstilskuddet?", answer: "Rapportering for foregående år skal normalt leveres innen 1. april. Dette inkluderer revidert regnskap og årsmelding." },
    { question: "Kan festivaler få fast driftsstøtte?", answer: "Ja, festivaler som har etablert seg som faste institusjoner kan søke om fast driftstilskudd over Sametingets budsjett, i stedet for å søke prosjektmidler hvert år." }
  ];

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

      <article className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* Breadcrumb */}
        <Link href="/kunnskapsbank/sametinget" className="inline-flex items-center text-slate-500 hover:text-[#E86C1F] mb-8 font-medium transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Tilbake til Sametinget-hub
        </Link>

        {/* Hero */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
            For Institusjoner & Festivaler
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            Bygg en bærekraftig <span className="text-purple-600">kulturinstitusjon</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Drift av samiske kulturhus, teatre og festivaler krever mer enn lidenskap. 
            Det krever stålkontroll på skillet mellom driftstilskudd og prosjektmidler.
          </p>
        </div>

        {/* --- EYECATCHER: DRIFTSMIDLER --- */}
        <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-xl mb-16 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-white rounded-full text-purple-600 shadow-sm mt-1">
              <Calendar className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-purple-900 text-lg">Viktigste frist for 2026</h3>
              <p className="text-purple-800 text-sm mb-4">
                For institusjoner er det én dato som gjelder. Glemmer dere denne, mister dere driftsstøtten for hele året.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Boks 1: Frist */}
                <div className="bg-white p-3 rounded-lg border border-purple-100 flex flex-col">
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Søknadsfrist</span>
                  <div className="flex items-center gap-2">
                    <McpDataSpan 
                      id="sameting-frist-institusjon-hero" 
                      value="01.03.2026" 
                      source="Sametinget"
                      className="font-bold text-2xl text-slate-900" 
                    />
                  </div>
                  <span className="text-xs text-slate-500 mt-1">Absolutt frist</span>
                </div>

                {/* Boks 2: Formål */}
                <div className="bg-white p-3 rounded-lg border border-purple-100 flex flex-col">
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Gjelder for</span>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    <span className="font-bold text-xl text-slate-900">Drift & Lønn</span>
                  </div>
                  <span className="text-xs text-slate-400 mt-1">Ikke enkeltprosjekter</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nøkkelinformasjon Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-slate-900">
              <Building2 className="text-purple-600 w-5 h-5" /> Hva dekkes?
            </h3>
            <ul className="space-y-3 text-slate-600 text-sm">
              <li>• Lønn til daglig leder og faste ansatte</li>
              <li>• Husleie, strøm og faste kostnader</li>
              <li>• Kompetanseheving for styret</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-slate-900">
              <FileCheck className="text-[#E86C1F] w-5 h-5" /> Krav til drift
            </h3>
            <ul className="space-y-3 text-slate-600 text-sm">
              <li>• Årsregnskap revidert av revisor</li>
              <li>• Beretning om måloppnåelse</li>
              <li>• Vedlagt budsjett for kommende år</li>
            </ul>
          </div>
        </div>

        {/* Expert Insight: Jan-Atle */}
        {janAtle && (
          <ExpertInsight 
            title="Fellen med blandet økonomi" 
            quote="Sametinget er nådeløse hvis du blander driftstilskudd med prosjektmidler. En festival kan ikke bruke driftsstøtten til å dekke underskudd på et enkeltarrangement uten at det er spesifisert."
            expert={janAtle}
          >
            <p>
              Mange institusjoner mister støtten fordi regnskapet ikke er 'rent' nok. 
              Vi setter opp avdelingsregnskap som tydelig skiller de ulike støtteordningene fra hverandre. 
              Dette gjør revisjonen enklere og sikrer at dere beholder plassen på statsbudsjettet.
            </p>
          </ExpertInsight>
        )}

        {/* Main Content Sections */}
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 my-16">
          
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            Slik fungerer støtten til institusjoner
          </h2>
          
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            I motsetning til prosjektstøtte (som søkes per tiltak), er institusjonsutvikling ment å sikre langsiktig drift. 
            Dette stiller strengere krav til organisasjon, styrearbeid og økonomistyring.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            <div className="p-5 bg-purple-50 rounded-xl border border-purple-100">
              <h3 className="font-bold text-slate-900 mb-2 text-lg">Kulturhus & Sentra</h3>
              <p className="text-sm text-slate-600 mb-3">
                Språksentre, teatre og museer som har en fast struktur og helårsdrift.
              </p>
            </div>
            <div className="p-5 bg-blue-50 rounded-xl border border-blue-100">
              <h3 className="font-bold text-slate-900 mb-2 text-lg">Festivaler</h3>
              <p className="text-sm text-slate-600 mb-3">
                Større festivaler med fast administrasjon kan søke om driftstilskudd i tillegg til underskuddsgaranti.
              </p>
            </div>
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
            Rapportering er nøkkelen
          </h3>
          <p className="text-slate-600 mb-4">
            For å beholde plassen på budsjettet, må dere bevise aktivitet. Regnskapet må settes opp slik at det er lett å hente ut nøkkeltall for rapportering til Sametinget.
          </p>

          <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-400">
            <h4 className="font-bold text-yellow-800 flex items-center gap-2 mb-2 text-lg">
              <Coins className="w-5 h-5" /> Tips: Periodisering
            </h4>
            <p className="text-sm text-yellow-800 leading-relaxed">
              Driftstilskudd gis for kalenderåret. Hvis dere har ubrukte midler ved årsslutt, kan disse bli trukket tilbake hvis de ikke er periodisert riktig eller søkt overført.
            </p>
          </div>
        </div>

        {/* CTA Component */}
         <CtaBlock
           title="Trenger styret avlastning?"
           description="Vi kan fungere som institusjonens økonomiavdeling. Da vet bevilgende myndigheter at pengene forvaltes trygt."
           primaryButtonText="Snakk med Jan-Atle"
           primaryButtonLink="/kontakt"
           secondaryButtonText="Se Næringsstøtte"
           secondaryButtonLink="/kunnskapsbank/sametinget/naering"
         />

        {/* FAQ Section */}
        <div className="mt-16 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Ofte stilte spørsmål</h2>
          <FaqAccordion items={faqData} themeColor="#8B5CF6" />
        </div>

       </article>
    </main>
  );
}