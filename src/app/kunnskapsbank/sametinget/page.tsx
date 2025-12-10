import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Scroll, 
  Briefcase, 
  Landmark, 
  CalendarClock, 
  Anchor, 
  Scissors, 
  BookOpen, 
  ExternalLink, 
  Coins, 
  TrendingUp, 
  GraduationCap,
  ShieldCheck 
} from 'lucide-react';
import { BudgetAnalysis } from '@/components/modules/kunnskapsbank/BudgetAnalysis';
import { CategoryCard } from '@/components/modules/kunnskapsbank/CategoryGrid';
import { McpDataSpan } from '@/components/ui/McpDataSpan';
import { getExpert } from '@/data/experts';
import { AverdiBackground } from '@/components/modules/AverdiBackground';
import { FaqAccordion } from '@/components/ui/FaqAccordion';

export const metadata: Metadata = {
  title: 'Sametinget Tilskudd & Støtteordninger 2026 | Averdi',
  description: 'Komplett guide til Sametingets 3 milliarder. Vi har analysert statsbudsjettet for 2026 og hjelper deg å navigere søknadsjungelen.',
};

export default function SametingetHub() {
  const janAtle = getExpert('jan-atle');
  
  // FAQ Data med SEO-fokus på kommunenavn og STN-området
  const sametingetFaq = [
    {
      question: 'Hvilke kommuner er med i virkeområdet (STN)?',
      answer: 'STN-området (Sametingets tilskuddsordninger for næringsutvikling) omfatter hele Finnmark fylke, samt følgende kommuner i Troms: Kåfjord, Skjervøy, Nordreisa, Kvænangen, Lavangen, Gratangen og Skånland (Tjeldsund). I Nordland gjelder det Tysfjord (Narvik/Hamarøy) og Hattfjelldal. Bedrifter her har tilgang til utvidede støtteordninger.'
    },
    {
      question: 'Kan jeg søke støtte til kjøp av fiskebåt?',
      answer: 'Ja, Sametinget gir støtte til førstegangs-investering i fiskefartøy for fiskere bosatt i STN-området. Båten må være under 11 meter (i enkelte tilfeller andre grenser), og det stilles krav til at du er registrert på blad B i fiskermanntallet.'
    },
    {
      question: 'Hva menes med "Duodji-registeret"?',
      answer: 'For å få driftstilskudd til Duodji, må du eller bedriften være registrert i Duodji-registeret. Dette krever fagbrev eller dokumentert realkompetanse som duodji-utøver.'
    },
    {
      question: 'Hva slags støtte kan barnehager få?',
      answer: 'Barnehager kan søke om tilskudd til samisk språkopplæring, utvikling av pedagogisk materiell og prosjekter som styrker samisk språk og kultur blant barna. Fristen her følger ofte barnehageåret (september).'
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 relative overflow-hidden">
      <AverdiBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
        
        {/* Breadcrumb */}
        <Link href="/kunnskapsbank" className="inline-flex items-center text-slate-500 hover:text-[#E86C1F] mb-8 font-medium transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Tilbake til oversikt
        </Link>

        {/* Hero Section */}
        <div className="mb-12">
          <span className="text-[#E86C1F] font-bold tracking-wider uppercase text-sm mb-3 block">
            Nisjekompetanse fra Karasjok
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900">
            Sametingets <span className="text-[#E86C1F]">Støtteordninger</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
            I 2026 er den totale rammen for samiske formål på over{' '}
            <McpDataSpan 
              id="sameting-ramme-2026" 
              value="3 mrd" 
              source="Statsbudsjettet 2026"
              className="font-bold text-slate-900 bg-orange-50 px-2 py-0.5 rounded border-b-2 border-[#E86C1F]"
            />{' '}
            kroner. Pengene finnes, men nåløyet kan være trangt hvis søknaden ikke treffer på språkkrav og måloppnåelse.
          </p>
        </div>

        {/* --- BUDSJETTANALYSE (Selskapsautoritet) --- */}
        <BudgetAnalysis />

        {/* --- STATUS-OPPDATERING & FRISTER --- */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-20 shadow-sm">
          <div className="flex flex-col md:flex-row gap-8">
            
            {/* Del 1: Regnskapsmessig Kontroll (Oppdatert) */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3 text-blue-900">
                <ShieldCheck className="w-6 h-6 text-blue-600" />
                <h3 className="font-bold text-lg">Full kontroll på 2026-endringene</h3>
              </div>
              <p className="text-blue-800 text-sm mb-4 leading-relaxed">
                Vi har analysert konsekvensene av statsbudsjettet og Sametingets nye rammer. 
                Vi vet nøyaktig hvordan endringene påvirker prosjektregnskap, periodisering og rapporteringskrav for din virksomhet.
              </p>
              <div className="bg-white p-3 rounded-lg border border-blue-100 inline-block">
                <span className="text-xs text-slate-500 uppercase font-semibold block mb-1">Regnskapsmessig trygghet</span>
                <span className="font-bold text-slate-900">Vi rigger systemene dine for det nye regelverket.</span>
              </div>
            </div>

            {/* Del 2: Rammer for 2026 */}
            <div className="flex-1 md:border-l md:border-blue-200 md:pl-8">
              <div className="flex items-center gap-3 mb-3 text-blue-900">
                <Coins className="w-6 h-6 text-blue-600" />
                <h3 className="font-bold text-lg">Rammer for 2026</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-slate-500 uppercase font-semibold block">Maks Næring</span>
                  <span className="font-bold text-xl text-slate-900">500 000 kr</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 uppercase font-semibold block">Investeringer</span>
                  <span className="font-bold text-xl text-green-600">Inntil 35%</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-3 italic">
                * Satser basert på forslag i Statsbudsjettet 2026.
              </p>
            </div>

          </div>
        </div>

        {/* Navigation Grid - 6 KORT */}
        <h2 className="text-3xl font-bold text-slate-900 mb-8">Velg ditt område</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          
          <CategoryCard 
            title="Variert Næringsliv"
            description="Investeringsstøtte til service, reiseliv og småindustri i STN-området."
            href="/kunnskapsbank/sametinget/naering"
            icon={Briefcase}
            theme="orange"
          />

          <CategoryCard 
            title="Fiske & Primærnæring"
            description="Støtte til kjøp av fiskefartøy, mottaksanlegg og tilleggsnæring i jordbruk."
            href="/kunnskapsbank/sametinget/primaernaering"
            icon={Anchor}
            theme="orange"
          />

          <CategoryCard 
            title="Duodji & Håndverk"
            description="Driftstilskudd, investeringer i verksted og markedstiltak for duodji-utøvere."
            href="/kunnskapsbank/sametinget/duodji"
            icon={Scissors}
            theme="orange"
          />

          <CategoryCard 
            title="Kultur & Språk"
            description="Støtte til arrangementer, utgivelser, musikk og språkopplæring."
            href="/kunnskapsbank/sametinget/kultur-sprak"
            icon={Scroll}
            theme="orange"
          />
          
          <CategoryCard 
            title="Institusjonsutvikling"
            description="Driftstilskudd for samiske hus, teatre, festivaler og språksentre."
            href="/kunnskapsbank/sametinget/institusjon"
            icon={Landmark}
            theme="orange"
          />

          <CategoryCard 
            title="Offentlig Sektor"
            description="Tilskudd til samisk i barnehage og skole, læremidler og stipend."
            href="/kunnskapsbank/sametinget/offentlig"
            icon={GraduationCap}
            theme="orange"
          />

        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mb-20">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Spørsmål om virkeområdet (STN)</h2>
          <FaqAccordion items={sametingetFaq} themeColor="#E86C1F" />
        </div>

        {/* --- KILDER & AUTORITET --- */}
        <div className="border-t border-slate-200 pt-8 pb-4 mt-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-xs text-slate-500">
            <div className="flex items-start gap-3 max-w-2xl">
              <BookOpen className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-700 mb-1">Datagrunnlag og Rammeverk</p>
                <p>
                  Næringsinnholdet er basert på <strong>Meld. St. 37 (2020–2021)</strong>, som er gjeldende stortingsmelding for næringsgrunnlag i samiske samfunn. 
                  Satser og budsjettrammer er oppdatert iht. <strong>Statsbudsjettet 2026</strong>.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://www.regjeringen.no/no/dokumenter/meld.-st.-37-20202021/id2861398/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-[#E86C1F] transition-colors">
                Les Meld. St. 37 <ExternalLink className="w-3 h-3" />
              </a>
              <a href="https://www.ssb.no/jord-skog-jakt-og-fiskeri/fiske-og-fangst/statistikk/fiskeri" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-[#E86C1F] transition-colors">
                SSB Fiskeristatistikk <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}