import Link from 'next/link';
import { ArrowLeft, Calculator, TrendingUp, Briefcase, AlertTriangle } from 'lucide-react';
import { ExpertInsight } from '@/components/modules/kunnskapsbank/ExpertInsight';
import { CategoryCard } from '@/components/modules/kunnskapsbank/CategoryGrid';
import { McpDataSpan } from '@/components/ui/McpDataSpan';
import { getExpert } from '@/data/experts';
import { AverdiBackground } from '@/components/modules/AverdiBackground';

export const metadata = {
  title: 'Bedrift i Tiltakssonen | Skattefordeler & Regnskap',
  description: 'Utnytt 0% arbeidsgiveravgift og Finnmarksfradraget strategisk. Vi er din partner for vekst i Nord-Troms og Finnmark.',
};

export default function BedriftHub() {
  const ingvald = getExpert('ingvald-laiti');

  return (
    <main className="min-h-screen bg-slate-50 relative overflow-hidden">
      <AverdiBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
        
        <Link href="/kunnskapsbank" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-8 font-medium transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Tilbake til oversikt
        </Link>

        {/* Hero */}
        <div className="mb-16">
          <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-3 block">
            Strategisk Økonomistyring
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900">
            Ditt konkurransefortrinn <span className="text-blue-600">i Nord</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
            I 2026 styrkes de personrettede virkemidlene i Nord-Troms og Finnmark kraftig. 
            Med <McpDataSpan id="aga-sats-sone5-2026" value="0" format="percentage" source="Statsbudsjettet 2026" className="font-bold text-slate-900"/> arbeidsgiveravgift 
            og økt nedskriving av studielån, har du muligheten til å være lønnsledende uten å øke totalkostnadene.
          </p>
        </div>

        {/* Expert Insight: Ingvald (MÅ HA: Hjemmekontor-fellen) */}
        {ingvald && (
          <ExpertInsight 
            title="Advarsel: Hjemmekontor-fellen kan koste dyrt" 
            quote="Har du ansatte på hjemmekontor sørpå? Da gjelder IKKE nullsatsen. Skatteetaten kontrollerer dette nøye via IP-adresser og reiseregninger. Feilrapportering her utløser 14,1% avgift pluss straffeskatt."
            expert={ingvald}
          >
            <p>
              Vi ser en økende trend hvor bedrifter i nord ansetter folk fra hele landet for å dekke kompetansegapet. 
              Det er en god strategi, men du må vite at arbeidsgiveravgiften følger <strong>den ansattes arbeidssted</strong>, ikke bedriftens postadresse.
            </p>
            <p className="mt-4">
              I vårt lønnssystem setter vi opp automatiske sonesjekker basert på den ansattes bostedskommune for å sikre at du ikke går på en smell ved bokettersyn.
            </p>
          </ExpertInsight>
        )}

        {/* Navigation Grid */}
        <h2 className="text-3xl font-bold text-slate-900 mb-8">Verktøy for vekst</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <CategoryCard 
            title="Innsatssonekalkulatoren"
            description="Se hvordan du kan tilby Oslo-lønn til lavere kostnad ved å utnytte avgiftsfritaket strategisk."
            href="/kunnskapsbank/bedrifter/tiltakssonen"
            icon={Calculator}
            theme="blue"
          />
          <CategoryCard 
            title="Rekruttering 2026"
            description="Slik bruker du 60.000 kr i gjeldsslette som et våpen i kampen om talentene."
            href="/kunnskapsbank/bedrifter/rekruttering" // Vi kan bygge denne senere
            icon={Briefcase}
            theme="blue"
          />
          <CategoryCard 
            title="Transport & Logistikk"
            description="Særlige regler for transportstøtte og 'bagatellstøtte' (De Minimis) i sonen."
            href="/kunnskapsbank/bedrifter/transport" // Vi kan bygge denne senere
            icon={TrendingUp}
            theme="blue"
          />
        </div>

      </div>
    </main>
  );
}