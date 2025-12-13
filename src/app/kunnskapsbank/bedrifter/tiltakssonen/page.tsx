import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, Check, AlertCircle, Calculator, PieChart, BarChart3 } from 'lucide-react';
import { ExpertInsight } from '@/components/modules/kunnskapsbank/ExpertInsight';
import { McpDataSpan } from '@/components/ui/McpDataSpan';
import { getExpert } from '@/data/experts';
import { AverdiBackground } from '@/components/modules/AverdiBackground';

export const metadata: Metadata = {
  title: 'Innsatssonekalkulatoren 2026 | Spar millioner på AGA',
  description: 'Slik bruker du 0% arbeidsgiveravgift og økt Finnmarksfradrag til å utkonkurrere bedrifter sørpå. Se regnestykket her.',
};

// Lokal CtaBlock - Mørk/Vertikal (Stabil)
function LocalCtaBlock({ title, description, primaryButtonText, primaryButtonLink, secondaryButtonText, secondaryButtonLink }: any) {
    return (
        <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden my-12 shadow-2xl">
            <div className="relative z-10 flex flex-col items-center gap-8 max-w-3xl mx-auto">
                <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{title}</h3>
                    <p className="text-slate-300 text-lg mb-0 leading-relaxed">{description}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
                    {primaryButtonLink && (
                        <Link href={primaryButtonLink} className="inline-flex items-center justify-center px-8 py-3 bg-[#E86C1F] text-white font-bold rounded-full hover:bg-[#d65f18] transition-all shadow-lg">
                            {primaryButtonText || 'Les mer'}
                        </Link>
                    )}
                </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#E86C1F]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        </div>
    );
}

export default function TiltakssonenPage() {
  const ingvald = getExpert('ingvald-laiti');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': 'Innsatssonekalkulatoren: Din skjulte margin',
    'description': 'Kalkyle som viser kostnadsforskjellen mellom Sone 1 (Oslo) og Sone 5 (Finnmark/Nord-Troms).',
    'author': {
      '@type': 'Person',
      'name': 'Ingvald Laiti',
      'jobTitle': 'Statsautorisert Regnskapsfører'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Averdi'
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 relative overflow-hidden font-sans">
      <AverdiBackground />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <article className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
        
        <Link href="/kunnskapsbank/bedrifter" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-8 font-medium transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Tilbake til Bedrift-hub
        </Link>

        {/* Hero */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-bold mb-4 uppercase tracking-wider">
            Økonomisk Analyse 2026
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900 leading-tight">
            Innsatssonekalkulatoren: <span className="text-blue-600">Din skjulte margin</span>
          </h1>
          <p className="text-xl text-slate-700 leading-relaxed">
            Tradisjonelt har virkemidlene i Nord-Troms og Finnmark blitt sett på som "kompensasjon". 
            I 2026 endrer vi tankesettet. Med studielånsslette på{' '}
            <McpDataSpan id="studielan-sats-sone5-2026" value="60 000" format="currency" className="font-bold text-slate-900 bg-blue-50 px-1 rounded" /> 
            {' '}og <McpDataSpan id="aga-sats-sone5" value="0" format="percentage" className="font-bold text-slate-900" /> AGA, har du et massivt <strong>Handlingsrom</strong>.
          </p>
        </div>

        {/* Kalkyle-seksjon med Diagram */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden mb-12">
          <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
            <div>
                <h3 className="text-xl font-bold flex items-center gap-2">
                <Calculator className="w-5 h-5 text-green-400" />
                Kostnadsscenario: Senioringeniør
                </h3>
                <p className="text-slate-400 text-sm mt-1">Hvor mye koster en ansatt med 900.000 i årslønn?</p>
            </div>
            <BarChart3 className="w-8 h-8 text-slate-600 hidden md:block" />
          </div>
          
          <div className="p-6 md:p-8">
            
            {/* Visualisering av data */}
            

            <div className="grid grid-cols-3 gap-4 text-sm sm:text-base border-b border-slate-100 pb-4 mb-4 font-bold text-slate-500 uppercase tracking-wider mt-8">
              <div>Lokasjon</div>
              <div className="text-right">AGA-sats</div>
              <div className="text-right">Total kostnad</div>
            </div>
            
            {/* Rad 1: Oslo */}
            <div className="grid grid-cols-3 gap-4 items-center mb-4 py-2">
              <div className="font-bold text-slate-900">Oslo (Sone 1)</div>
              <div className="text-right text-red-500 font-bold">14,1%</div>
              <div className="text-right text-slate-600 font-medium">1 026 900 kr</div>
            </div>

            {/* Rad 2: Alta */}
            <div className="grid grid-cols-3 gap-4 items-center mb-4 p-4 bg-green-50 rounded-xl border border-green-100 shadow-sm relative overflow-hidden">
               <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500"></div>
              <div className="font-bold text-slate-900">Alta (Sone 5)</div>
              <div className="text-right text-green-600 font-extrabold">0%</div>
              <div className="text-right text-slate-900 font-bold">900 000 kr</div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
              <span className="text-slate-600 font-medium">Din direkte besparelse per ansatt:</span>
              <div className="flex items-baseline gap-2">
                <McpDataSpan 
                    id="kalkyle-besparelse-ingeniør" 
                    value="126 900" 
                    format="currency" 
                    className="text-3xl font-extrabold text-green-600"
                />
                <span className="text-slate-500 font-medium">NOK</span>
              </div>
            </div>
          </div>
        </div>

        {/* Expert Insight: Ingvald om strategien */}
        {ingvald && (
          <ExpertInsight 
            title="Ikke la pengene forsvinne i driften" 
            quote="Den største feilen bedrifter gjør, er å la AGA-besparelsen forsvinne i det store sluket. Disse pengene bør øremerkes talentakvisisjon."
            expert={ingvald}
          >
            <p className="text-slate-700">
              Hvis du bruker besparelsen på <strong>126 900 kr</strong> til å øke lønnen, kan du tilby denne ingeniøren over 1 million i lønn – uten at det koster deg en krone mer enn din konkurrent i Oslo. 
              Dette er matematikk, ikke magi.
            </p>
          </ExpertInsight>
        )}

        {/* Main Content: De 3 Pilarene */}
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-slate-100 my-16">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
            Slik selger du "Nord-Norge Pakken"
          </h2>
          <p className="text-slate-700 mb-8 text-lg">
            Det er ikke nok å si "vi har fin natur". Du må presentere et regnestykke som viser disponibel inntekt. 
            Her er de tre faktorene du må selge inn til kandidaten:
          </p>

          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <div className="p-2 bg-blue-100 rounded-full mt-1 shrink-0"><Check className="w-5 h-5 text-blue-600" /></div>
              <div>
                <strong className="text-slate-900 block text-lg mb-1">Studielånsslette på steroider</strong>
                <span className="text-slate-600">
                  Økes til <McpDataSpan id="studielan-sats-sone5-2026" value="60 000" format="currency" className="font-bold"/> per år. 
                  Siden dette er netto penger (etter skatt), tilsvarer det en bruttolønnsøkning på ca. <strong>100 000 kr</strong> sørpå.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="p-2 bg-blue-100 rounded-full mt-1 shrink-0"><Check className="w-5 h-5 text-blue-600" /></div>
              <div>
                <strong className="text-slate-900 block text-lg mb-1">Finnmarksfradraget</strong>
                <span className="text-slate-600">
                  Økes til <McpDataSpan id="finnmarksfradrag-sats-2026" value="45 000" format="currency" className="font-bold"/> per person. 
                  Dette gir direkte redusert skatt på alminnelig inntekt.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="p-2 bg-blue-100 rounded-full mt-1 shrink-0"><Check className="w-5 h-5 text-blue-600" /></div>
              <div>
                <strong className="text-slate-900 block text-lg mb-1">Gratis barnehage & strøm</strong>
                <span className="text-slate-600">
                  Ingen el-avgift, ingen moms på strøm, og gratis barnehage. For en barnefamilie utgjør dette en <strong>kjøpekraft-boost</strong> på over 50 000 kr netto.
                </span>
              </div>
            </li>
          </ul>

          <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-400 mt-12">
            <h4 className="font-bold text-yellow-800 flex items-center gap-2 mb-2 text-lg">
              <AlertCircle className="w-5 h-5" /> Viktig om "Bagatellstøtte" (De Minimis)
            </h4>
            <p className="text-sm text-yellow-800 leading-relaxed">
              For noen sektorer (spesielt transport og finans) er AGA-fritaket begrenset av EØS-regler. 
              Det er et tak på hvor mye støtte du kan motta over 3 år (ca 300 000 Euro). 
              Vi hjelper deg å beregne om du treffer taket, og hvordan du rapporterer dette korrekt.
            </p>
          </div>
        </div>

        {/* CTA: Exclusive Content */}
        <LocalCtaBlock
            title="Vil du ha hele regnestykket?"
            description="Vi har utarbeidet en detaljert guide: 'Innsatssonekalkulatoren for Bedrifter'. Den viser nøyaktig hvordan du setter opp lønnspakker som vinner kampen om hodene."
            primaryButtonText="Få guiden tilsendt gratis"
            primaryButtonLink="/kontakt?subject=Innsatssonekalkulator"
        />

      </article>
    </main>
  );
}