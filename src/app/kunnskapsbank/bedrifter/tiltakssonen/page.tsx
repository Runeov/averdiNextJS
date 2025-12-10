import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, Check, AlertCircle } from 'lucide-react';
import { ExpertInsight } from '@/components/modules/kunnskapsbank/ExpertInsight';
import { McpDataSpan } from '@/components/ui/McpDataSpan';
import { getExpert } from '@/data/experts';
import { AverdiBackground } from '@/components/modules/AverdiBackground';

export const metadata: Metadata = {
  title: 'Innsatssonekalkulatoren 2026 | Spar millioner på AGA',
  description: 'Slik bruker du 0% arbeidsgiveravgift og økt Finnmarksfradrag til å utkonkurrere bedrifter sørpå. Se regnestykket her.',
};

export default function TiltakssonenPage() {
  const ingvald = getExpert('ingvald-laiti');

  return (
    <main className="min-h-screen bg-slate-50 relative overflow-hidden">
      <AverdiBackground />
      
      <article className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
        
        <Link href="/kunnskapsbank/bedrifter" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-8 font-medium transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Tilbake til Bedrift-hub
        </Link>

        {/* Hero */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
            Økonomisk Analyse 2026
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            Innsatssonekalkulatoren: <span className="text-blue-600">Din skjulte margin</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Tradisjonelt har virkemidlene i Nord-Troms og Finnmark blitt sett på som "kompensasjon for ulemper". 
            I 2026 endres dette bildet totalt. Med en foreslått økning i studielånsslette til{' '}
            <McpDataSpan id="studielan-sats-sone5-2026" value="60 000" format="currency" className="font-bold text-slate-900" /> 
            {' '}og 0% AGA, har du et massivt konkurransefortrinn.
          </p>
        </div>

        {/* Tabell: Oslo vs Alta (Fra PDF-en din) */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-12">
          <div className="bg-slate-900 p-6 text-white">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              Kostnadsscenario: Senioringeniør
            </h3>
            <p className="text-slate-400 text-sm">Hvor mye koster en ansatt med 900.000 i lønn?</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-3 gap-4 text-sm sm:text-base border-b border-slate-100 pb-4 mb-4 font-semibold text-slate-500">
              <div>Lokasjon</div>
              <div className="text-right">AGA-sats</div>
              <div className="text-right">Total kostnad</div>
            </div>
            
            {/* Rad 1: Oslo */}
            <div className="grid grid-cols-3 gap-4 items-center mb-4">
              <div className="font-medium text-slate-900">Oslo (Sone 1)</div>
              <div className="text-right text-red-500 font-bold">14,1%</div>
              <div className="text-right text-slate-600">1 026 900 kr</div>
            </div>

            {/* Rad 2: Alta */}
            <div className="grid grid-cols-3 gap-4 items-center mb-4 p-2 bg-green-50 rounded-lg -mx-2">
              <div className="font-medium text-slate-900">Alta (Sone 5)</div>
              <div className="text-right text-green-600 font-bold">0%</div>
              <div className="text-right text-slate-900 font-bold">900 000 kr</div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
              <span className="text-slate-500">Din besparelse per ansatt:</span>
              <span className="text-2xl font-bold text-green-600">126 900 kr</span>
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
            <p>
              Hvis du bruker besparelsen på 126 900 kr til å øke lønnen, kan du tilby denne ingeniøren over 1 million i lønn – uten at det koster deg en krone mer enn din konkurrent i Oslo. 
              Kombinert med gratis strømavgift og Finnmarksfradraget, blir tilbudet ditt uimotståelig.
            </p>
          </ExpertInsight>
        )}

        {/* Main Content: De 3 Pilarene */}
        <div className="prose prose-lg prose-slate max-w-none bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 my-12">
          <h2>Slik bruker du "Rekrutteringspakken 2026"</h2>
          <p>
            Det er ikke nok å si "vi har fin natur". Du må presentere et regnestykke som viser disponibel inntekt. 
            Her er de tre faktorene du må selge inn til kandidaten:
          </p>

          <ul className="not-prose space-y-4 my-8">
            <li className="flex items-start gap-3">
              <div className="p-1 bg-blue-100 rounded-full mt-1"><Check className="w-4 h-4 text-blue-600" /></div>
              <div>
                <strong className="text-slate-900 block">Studielånsslette på steroider</strong>
                <span className="text-slate-600 text-sm">
                  Økes til <McpDataSpan id="studielan-sats-sone5-2026" value="60 000" format="currency" /> per år. 
                  Siden dette er netto penger, tilsvarer det en lønnsøkning på ca. 100 000 kr før skatt.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="p-1 bg-blue-100 rounded-full mt-1"><Check className="w-4 h-4 text-blue-600" /></div>
              <div>
                <strong className="text-slate-900 block">Finnmarksfradraget</strong>
                <span className="text-slate-600 text-sm">
                  Økes til <McpDataSpan id="finnmarksfradrag-sats-2026" value="45 000" format="currency" />. 
                  Dette gir direkte redusert skatt på alminnelig inntekt.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="p-1 bg-blue-100 rounded-full mt-1"><Check className="w-4 h-4 text-blue-600" /></div>
              <div>
                <strong className="text-slate-900 block">Gratis barnehage & strøm</strong>
                <span className="text-slate-600 text-sm">
                  Ingen el-avgift, ingen moms på strøm, og gratis barnehage. For en barnefamilie er dette verdt over 50 000 kr netto.
                </span>
              </div>
            </li>
          </ul>

          <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-400 not-prose my-8">
            <h4 className="font-bold text-yellow-800 flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4" /> Viktig om "Bagatellstøtte" (De Minimis)
            </h4>
            <p className="text-sm text-yellow-800">
              For noen sektorer (spesielt transport og finans) er AGA-fritaket begrenset av EØS-regler. 
              Det er et tak på hvor mye støtte du kan motta over 3 år (ca 300 000 Euro). 
              Vi hjelper deg å beregne om du treffer taket, og hvordan du rapporterer dette korrekt.
            </p>
          </div>
        </div>

        {/* CTA: Exclusive Content */}
        <div className="mt-16 bg-slate-900 text-white rounded-2xl p-8 md:p-12 text-center relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Vil du ha hele regnestykket?</h2>
            <p className="text-slate-300 mb-8 max-w-xl mx-auto">
              Vi har utarbeidet en detaljert guide: <strong>"Innsatssonekalkulatoren for Bedrifter"</strong>. 
              Den viser nøyaktig hvordan du setter opp lønnspakker som vinner kampen om hodene.
            </p>
            <Link 
              href="/kontakt?subject=Innsatssonekalkulator"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#E86C1F] text-white font-bold rounded-full hover:bg-[#d65f18] transition-all hover:scale-105"
            >
              Få guiden tilsendt gratis
            </Link>
            <p className="text-xs text-slate-500 mt-4">
              (Vi sender den som PDF til din e-post. Ingen forpliktelser.)
            </p>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -right-20 -bottom-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-colors"></div>
        </div>

      </article>
    </main>
  );
}