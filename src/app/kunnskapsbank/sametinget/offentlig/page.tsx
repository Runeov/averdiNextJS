import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, GraduationCap, School, BookOpen, CalendarClock, Users, FileCheck } from 'lucide-react';
import { ExpertInsight } from '@/components/modules/kunnskapsbank/ExpertInsight';
import { McpDataSpan } from '@/components/ui/McpDataSpan';
import { getExpert } from '@/data/experts';
import { AverdiBackground } from '@/components/modules/AverdiBackground';
import { CtaBlock } from '@/components/modules/kunnskapsbank/CtaBlock';

export const metadata: Metadata = {
  title: 'Tilskudd til Barnehage, Skole og Utdanning | Sametinget',
  description: 'Guide for skoleeiere og barnehagestyrere. Slik finansierer dere samisk språkopplæring, studiepermisjon for lærere og utvikling av læremidler.',
};

export default function OffentligPage() {
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium mb-4">
            For Oppvekstsektoren
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            Finansiering av <span className="text-indigo-600">språkløftet</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Lærerkrisen er akutt, men finansieringsordningene er gode for dem som kjenner systemet. 
            Staten dekker vikarutgifter for lærere som tar videreutdanning i samisk, og barnehager har krav på betydelige midler til språkopplæring.
          </p>
        </div>

        {/* --- EYECATCHER: KRITISKE FRISTER SKOLEÅRET 26/27 --- */}
        <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-xl mb-16 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-white rounded-full text-indigo-600 shadow-sm mt-1">
              <CalendarClock className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-indigo-900 text-lg">Viktige datoer for 2026</h3>
              <p className="text-indigo-800 text-sm mb-4">
                Planleggingen for neste skoleår må starte nå. Fristene er absolutte.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Boks 1: Lærere */}
                <div className="bg-white p-3 rounded-lg border border-indigo-100 flex flex-col">
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Studiepermisjon (Lærere)</span>
                  <div className="flex items-center gap-2">
                    <McpDataSpan 
                      id="frist-studiepermisjon-2026" 
                      value="01.04.2026" 
                      source="Statsforvalteren"
                      className="font-bold text-xl text-slate-900" 
                    />
                  </div>
                  <span className="text-xs text-slate-500 mt-1">Gjelder skoleåret 26/27</span>
                </div>

                {/* Boks 2: Barnehage */}
                <div className="bg-white p-3 rounded-lg border border-indigo-100 flex flex-col">
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Barnehagetilskudd</span>
                  <div className="flex items-center gap-2">
                    <McpDataSpan 
                      id="frist-barnehage-2026" 
                      value="01.09.2026" 
                      source="Sametinget"
                      className="font-bold text-xl text-slate-900" 
                    />
                  </div>
                  <span className="text-xs text-slate-500 mt-1">Søkes etterskuddsvis/løpende</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nøkkelinformasjon Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-slate-900">
              <School className="text-indigo-600 w-5 h-5" /> Hvem søker?
            </h3>
            <ul className="space-y-3 text-slate-600 text-sm">
              <li>• Barnehageeiere (Kommunale/Private)</li>
              <li>• Skoleeiere (for studiepermisjon)</li>
              <li>• Forlag og forfattere (læremidler)</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-slate-900">
              <FileCheck className="text-[#E86C1F] w-5 h-5" /> Rapporteringskrav
            </h3>
            <ul className="space-y-3 text-slate-600 text-sm">
              <li>• Antall timer samisk opplæring</li>
              <li>• Regnskap bekreftet av revisor</li>
              <li>• Dokumentasjon på vikarutgifter</li>
            </ul>
          </div>
        </div>

        {/* Expert Insight */}
        {janAtle && (
          <ExpertInsight 
            title="Gullkantet ordning for kommunene" 
            quote="Mange kommuner glemmer at Staten faktisk dekker vikarutgifter for lærere som tar videreutdanning i samisk. Dette er 'gratis' kompetanseheving, men søknaden må sendes av skoleeier, ikke læreren selv."
            expert={janAtle}
          >
            <p>
              Husk at det er <strong>Statsforvalteren i Troms og Finnmark</strong> som forvalter denne ordningen nasjonalt (med unntak av Nordland/Trøndelag). 
              Søknaden skal ikke til Sametinget. Slike feiladresseringer fører ofte til at man mister fristen.
            </p>
          </ExpertInsight>
        )}

        {/* Main Content Sections */}
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 my-16">
          
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            Slik fungerer studiepermisjonen
          </h2>
          
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            For å rekruttere flere samisklærere, tilbyr staten en ordning hvor lærere kan studere samisk med lønn, mens skolen får dekket utgiftene til vikar.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            <div className="p-5 bg-indigo-50 rounded-xl border border-indigo-100">
              <div className="flex items-center gap-3 mb-3">
                <GraduationCap className="w-6 h-6 text-indigo-600" />
                <h3 className="font-bold text-slate-900 text-lg">For Læreren</h3>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                Du får beholde lønnen mens du studerer (inntil 100% permisjon). 
                Motytelsen er en bindingstid hvor du plikter å undervise i samisk.
              </p>
            </div>

            <div className="p-5 bg-blue-50 rounded-xl border border-blue-100">
              <div className="flex items-center gap-3 mb-3">
                <Users className="w-6 h-6 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-lg">For Skoleeier</h3>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                Dere får dekket vikarutgifter basert på en fastsatt sats (ofte adjunkt med 10 års ansiennitet). 
                Dette muliggjør kompetanseløft uten budsjettsprekk.
              </p>
            </div>
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
            Barnehager: Språkopplæring
          </h3>
          
          <p className="text-slate-600 mb-4">
            Barnehager kan søke om tilskudd til å organisere samiskopplæring. 
            Ordningen er delt i ulike modeller avhengig av hvor mange barn som har samisk som hjemmespråk.
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-600 mb-8 ml-2">
            <li><strong>Samiske barnehager:</strong> Høyeste sats, krever vedtektsfestet samisk formål.</li>
            <li><strong>Avdelinger med samisk tilbud:</strong> Støtte per avdeling.</li>
            <li><strong>Språkopplæring:</strong> Støtte per barn for norskspråklige barnehager med samiske barn.</li>
          </ul>

          <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-400">
            <h4 className="font-bold text-yellow-800 flex items-center gap-2 mb-2 text-lg">
              <BookOpen className="w-5 h-5" /> Mulighet: Læremidler
            </h4>
            <p className="text-sm text-yellow-800 leading-relaxed">
              Er du forfatter, illustratør eller utvikler? Sametinget bevilger titalls millioner årlig til utvikling av nye læremidler. 
              Det er et stort behov for digitale ressurser og materiell på lule- og sørsamisk.
            </p>
          </div>
        </div>

        {/* CTA Component */}
        <CtaBlock 
          title="Trenger kommunen bistand?"
          description="Vi kan bistå oppvekstetaten med søknadsprosesser, refusjonskrav og prosjektregnskap for eksterne midler."
          primaryButtonText="Kontakt oss"
          primaryButtonLink="/kontakt"
          secondaryButtonText="Se kulturstøtte"
          secondaryButtonLink="/kunnskapsbank/sametinget/kultur-sprak"
        />

      </article>
    </main>
  );
}