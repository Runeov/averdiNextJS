import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Building2, Calendar, FileCheck } from 'lucide-react';
import { ExpertInsight } from '@/components/modules/kunnskapsbank/ExpertInsight';
import { McpDataSpan } from '@/components/ui/McpDataSpan';
import { getExpert } from '@/data/experts';
import { AverdiBackground } from '@/components/modules/AverdiBackground';
import { CtaBlock } from '@/components/modules/kunnskapsbank/CtaBlock';
import { ClientCase } from '@/components/modules/kunnskapsbank/ClientCase'; // Ny import

export const metadata: Metadata = {
  title: 'Institusjonsutvikling & Festivalstøtte | Sametinget',
  description: 'Vi bistår samiske institusjoner, festivaler og kulturhus med driftstilskudd og rapportering. Se hvordan vi hjelper Påskefestivalen i Karasjok.',
};

export default function InstitusjonPage() {
  const janAtle = getExpert('jan-atle');

  return (
    <main className="min-h-screen bg-slate-50 relative overflow-hidden">
      <AverdiBackground />
      
      <article className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
        
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
            Fristen for institusjonsutvikling er <McpDataSpan id="sameting-frist-institusjon" value="01.03.2026" className="font-bold text-slate-900 bg-purple-50 px-1 rounded" source="Sametinget" />.
          </p>
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

        {/* Main Content (Med eksplisitt styling på overskrifter) */}
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 my-16">
          
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            Slik fungerer støtten til institusjoner
          </h2>
          
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            I motsetning til prosjektstøtte (som søkes per tiltak), er institusjonsutvikling ment å sikre langsiktig drift. 
            Dette stiller strengere krav til organisasjon, styrearbeid og økonomistyring.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-purple-600" />
                Hva kan støttes?
              </h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2"></span>
                  Lønn til daglig leder og faste ansatte
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2"></span>
                  Lokaleier og faste driftsutgifter
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2"></span>
                  Kompetanseheving for styret og ansatte
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-green-600" />
                Krav til rapportering
              </h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2"></span>
                  Årsregnskap revidert av statsautorisert revisor
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2"></span>
                  Beretning om måloppnåelse (språk/kultur)
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2"></span>
                  Budsjett for kommende år vedlagt søknad
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-slate-900">
            <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4" /> Viktig om fristen
            </h4>
            <p className="text-sm text-slate-600">
              Søknadsfristen <McpDataSpan id="sameting-frist-institusjon" value="1. mars" className="font-semibold" /> gjelder for driftstilskudd for påfølgende år. 
              Glemmer dere denne, står dere uten driftsmidler et helt kalenderår. Det finnes ingen "angrefrist" her.
            </p>
          </div>
        </div>

        {/* --- KUNDECASE: PÅSKEFESTIVALEN (Flyttet ned) --- */}
        <ClientCase 
          quote="Når tusenvis av mennesker samles i Karasjok i påsken, koker det. Da er det avgjørende for oss å ha Averdi i ryggen. De sørger for at økonomien, bilagene og rapporteringen til Sametinget går på skinner."
          author="Kenneth Eliassen"
          role="Daglig leder"
          company="Påskefestivalen i Karasjok"
        />

        {/* CTA */}
        <CtaBlock 
          title="Trenger styret avlastning?"
          description="Vi kan fungere som institusjonens økonomiavdeling. Da vet bevilgende myndigheter at pengene forvaltes trygt."
          primaryButtonText="Snakk med Jan-Atle"
          primaryButtonLink="/kontakt"
          secondaryButtonText="Se prosjektstøtte (Kultur)"
          secondaryButtonLink="/kunnskapsbank/sametinget/kultur-sprak"
        />

      </article>
    </main>
  );
}