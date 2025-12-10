import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, AlertTriangle, FileText, Anchor, Sprout, Ship, Coins } from 'lucide-react';
import { ExpertInsight } from '@/components/modules/kunnskapsbank/ExpertInsight';
import { McpDataSpan } from '@/components/ui/McpDataSpan';
import { getExpert } from '@/data/experts';
import { AverdiBackground } from '@/components/modules/AverdiBackground';
import { CtaBlock } from '@/components/modules/kunnskapsbank/CtaBlock';

export const metadata: Metadata = {
  title: 'Støtte til Fiske, Jordbruk & Reindrift | Sametinget',
  description: 'Guide for primærnæringer. Slik søker du støtte til fiskefartøy, mottaksanlegg, og tilleggsnæring i jordbruk og reindrift.',
};

export default function PrimaernaeringPage() {
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
            For Fiskere & Bønder
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            Støtte til <span className="text-[#E86C1F]">Fiske og Primærnæring</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Primærnæringene er ryggraden i samiske bygder. Sametinget tilbyr investeringsstøtte til fiskefartøy, 
            mottaksanlegg og videreforedling av mat, for å sikre lokal verdiskaping og bosetting i STN-området.
          </p>
        </div>

        {/* --- EYECATCHER: FINANSIERING PRIMÆR --- */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-16 shadow-sm">
          <div className="flex flex-col md:flex-row gap-8">
            
            {/* Del 1: Fiske */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3 text-blue-900">
                <Anchor className="w-6 h-6 text-blue-600" />
                <h3 className="font-bold text-lg">Marine Næringer</h3>
              </div>
              <div className="bg-white p-4 rounded-lg border border-blue-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 uppercase font-semibold">Maks Fartøy</span>
                  <div className="flex items-baseline gap-1">
                    <McpDataSpan 
                      id="sameting-fiske-maks-sats" 
                      value="300 000" 
                      format="currency" 
                      source="Sametinget Marine Næringer"
                      className="font-bold text-2xl text-slate-900" 
                    />
                    <span className="text-sm text-slate-500 font-medium">kr</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 uppercase font-semibold">Dekning</span>
                  <div className="font-bold text-lg text-green-600">Inntil 35%</div>
                </div>
              </div>
            </div>

            {/* Del 2: Jordbruk/Tillegg */}
            <div className="flex-1 md:border-l md:border-blue-200 md:pl-8">
              <div className="flex items-center gap-3 mb-3 text-blue-900">
                <Sprout className="w-6 h-6 text-green-600" />
                <h3 className="font-bold text-lg">Tilleggsnæring</h3>
              </div>
              <div className="bg-white p-4 rounded-lg border border-blue-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 uppercase font-semibold">Maks Støtte</span>
                  <div className="flex items-baseline gap-1">
                    <McpDataSpan 
                      id="sameting-jordbruk-maks-sats" 
                      value="500 000" 
                      format="currency" 
                      source="Sametinget Variert Næring"
                      className="font-bold text-2xl text-slate-900" 
                    />
                    <span className="text-sm text-slate-500 font-medium">kr</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 uppercase font-semibold">Dekning</span>
                  <div className="font-bold text-lg text-green-600">Inntil 35%</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Nøkkelinformasjon Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-slate-900">
              <CheckCircle2 className="text-green-500 w-5 h-5" /> Hvem kan søke?
            </h3>
            <ul className="space-y-3 text-slate-600 text-sm">
              <li>• Fiskere registrert på <strong>Blad B</strong> i fiskermanntallet</li>
              <li>• Aktive utøvere i jordbruk og reindrift</li>
              <li>• Mottaksanlegg i virkeområdet (STN)</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-slate-900">
              <AlertTriangle className="text-[#E86C1F] w-5 h-5" /> Kritiske krav
            </h3>
            <ul className="space-y-3 text-slate-600 text-sm">
              <li>• Fartøy må være <strong>under 11 meter</strong> (noen unntak)</li>
              <li>• Søknad MÅ sendes <em>før</em> du kjøper båt/utstyr</li>
              <li>• Du kan ikke ha mottatt støtte til fartøy siste 2 år</li>
            </ul>
          </div>
        </div>

        {/* Expert Insight */}
        {janAtle && (
          <ExpertInsight 
            title="Ikke kjøp båten på Finn.no før du har søkt!" 
            quote="Dette er den dyreste feilen du kan gjøre. Hvis du signerer kjøpekontrakt på sjarken før søknaden er registrert hos Sametinget, mister du automatisk retten til støtte. Ingen unntak."
            expert={janAtle}
          >
            <p>
              Vi hjelper fiskere med å sette opp finansieringsplanen. Husk at Sametinget krever at kjøpet ikke er gjennomført. 
              Vi kan bistå med en <strong>intensjonsavtale</strong> som vedlegg til søknaden, som sikrer båten uten at du bryter reglene.
            </p>
          </ExpertInsight>
        )}

        {/* Main Content Sections */}
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 my-16">
          
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            Prioriterte primærnæringer
          </h2>
          
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Sametinget ønsker å styrke rekrutteringen til kystfisket og sikre at jordbruk og reindrift forblir bærekraftige leveveier.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            <div className="p-5 bg-blue-50 rounded-xl border border-blue-100">
              <div className="flex items-center gap-3 mb-3">
                <Ship className="w-6 h-6 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-lg">Fiske & Fangst</h3>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                Investering i fartøy, redskaper og sikkerhetsutstyr. 
                Særlig fokus på førstegangsetablerere og kvinner i fiskeriene.
              </p>
              <ul className="text-xs text-slate-500 space-y-1">
                <li>• Støtte til fartøy &lt; 11 meter</li>
                <li>• Støtte til mottaksanlegg på land</li>
              </ul>
            </div>

            <div className="p-5 bg-green-50 rounded-xl border border-green-100">
              <div className="flex items-center gap-3 mb-3">
                <Sprout className="w-6 h-6 text-green-600" />
                <h3 className="font-bold text-slate-900 text-lg">Jordbruk & Reindrift</h3>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                Støtte til ombygging av driftsbygninger, videreforedling av kjøtt/melk, og utvikling av tilleggsnæringer (f.eks. turisme).
              </p>
              <ul className="text-xs text-slate-500 space-y-1">
                <li>• Krever godkjent driftsplan</li>
                <li>• Fokus på "Inn på tunet"</li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
            Spesielt om tilleggsnæringer
          </h3>
          
          <p className="text-slate-600 mb-4">
            Mange bønder og reineiere må ha flere ben å stå på. Sametinget gir inntil 
            {' '}<McpDataSpan id="sameting-jordbruk-maks-sats" value="500 000" format="currency" className="font-bold text-slate-900" />{' '}
            i støtte til å etablere kombinasjonsdrift.
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-600 mb-8 ml-2">
            <li>Utleie av hytter/gammer (Reiseliv)</li>
            <li>Lokalmatproduksjon og gårdsutsalg</li>
            <li>Duodji i kombinasjon med reindrift</li>
          </ul>

          <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-400">
            <h4 className="font-bold text-yellow-800 flex items-center gap-2 mb-2 text-lg">
              <FileText className="w-5 h-5" /> Regnskap for fiskere (Lott)
            </h4>
            <p className="text-sm text-yellow-800 leading-relaxed">
              Fiskeriregnskap er komplisert med egne regler for lott, produktavgift og garantikassen. 
              Mottar du støtte, må prosjektregnskapet være plettfritt. Vi har spesialisert kompetanse på lott-oppgjør og blad B-føring.
            </p>
          </div>
        </div>

        {/* CTA Component */}
        <CtaBlock 
          title="Skal du investere i båt eller fjøs?"
          description="Vi hjelper deg med søknaden til Sametinget og setter opp et regnskap som håndterer lott, mva og tilleggsnæring korrekt."
          primaryButtonText="Bestill rådgivningstime"
          primaryButtonLink="/kontakt"
          secondaryButtonText="Se annen næringsstøtte"
          secondaryButtonLink="/kunnskapsbank/sametinget/naering"
        />

      </article>
    </main>
  );
}