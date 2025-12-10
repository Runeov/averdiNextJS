import Link from 'next/link';
import { ArrowLeft, Scroll, Coins, Landmark, CalendarClock } from 'lucide-react';
import { ExpertInsight } from '@/components/modules/home/kunnskapsbank/ExpertInsight';
import { CategoryCard } from '@/components/modules/home/kunnskapsbank/CategoryGrid';
import { McpDataSpan } from '@/components/ui/McpDataSpan';
import { getExpert } from '@/data/experts';
import { AverdiBackground } from '@/components/modules/AverdiBackground';

export const metadata = {
  title: 'Sametinget Tilskudd & Støtteordninger | Averdi',
  description: 'Komplett guide til Sametingets 3 milliarder i støttemidler. Vi hjelper deg med søknad til næring, kultur og språk.',
};

export default function SametingetHub() {
  const janAtle = getExpert('jan-atle');

  return (
    <main className="min-h-screen bg-slate-50 relative overflow-hidden">
      <AverdiBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
        
        {/* Breadcrumb / Back Link */}
        <Link href="/kunnskapsbank" className="inline-flex items-center text-slate-500 hover:text-[#E86C1F] mb-8 font-medium transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Tilbake til oversikt
        </Link>

        {/* Hero Section */}
        <div className="mb-16">
          <span className="text-[#E86C1F] font-bold tracking-wider uppercase text-sm mb-3 block">
            Nisjekompetanse fra Karasjok
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900">
            Sametingets <span className="text-[#E86C1F]">Støtteordninger</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
            I 2026 forvalter Sametinget et totalbudsjett på ca.{' '}
            <McpDataSpan 
              id="sameting-totalbudsjett-2026" 
              value="3 mrd" 
              source="Statsbudsjettet 2026 - Samiske formål"
              className="font-bold text-slate-900 bg-orange-50 px-2 py-0.5 rounded border-b-2 border-[#E86C1F]"
            />{' '}
            kroner. Pengene finnes, men nåløyet kan være trangt hvis søknaden ikke treffer på språkkrav og måloppnåelse.
          </p>
        </div>

        {/* Expert Insight: Jan-Atle */}
        {janAtle && (
          <ExpertInsight 
            title="Advarsel: Ikke vent til desember!" 
            quote="Mange tror fristen er 31. desember, men de fleste næringsfondene er rammestyrte. Når potten er tom i september, hjelper det ikke hvor god søknaden din er."
            expert={janAtle}
          >
            <p>
              Vi ser ofte at bedrifter går glipp av støtte fordi de behandler Sametinget som "Skatteetaten" – noe som skjer automatisk. Det er feil. 
              Sametingets saksbehandlere ser etter <strong>samisk kulturløft</strong> like mye som økonomisk lønnsomhet.
            </p>
            <p className="mt-4">
              <strong>Vårt tips:</strong> Start prosessen i januar når pottene fylles opp. Vi hjelper deg å vinkle prosjektet slik at det treffer Sametingets strategiske mål for 2026.
            </p>
          </ExpertInsight>
        )}

        {/* Frist-oversikt (Strategisk element fra SEO-analyse) */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4 text-slate-900">
              <CalendarClock className="w-6 h-6 text-[#E86C1F]" />
              <h3 className="text-xl font-bold">Løpende frister (Næring)</h3>
            </div>
            <p className="text-slate-600 mb-4">
              Gjelder de fleste næringsstøtter, etablererstipend og investeringer.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start text-sm text-slate-700">
                <span className="w-2 h-2 mt-1.5 rounded-full bg-green-500 mr-3 flex-shrink-0"></span>
                Søknader behandles fortløpende
              </li>
              <li className="flex items-start text-sm text-slate-700">
                <span className="w-2 h-2 mt-1.5 rounded-full bg-yellow-500 mr-3 flex-shrink-0"></span>
                <strong>Førstemann til mølla</strong> (Rammestyrt)
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4 text-slate-900">
              <CalendarClock className="w-6 h-6 text-red-600" />
              <h3 className="text-xl font-bold">Absolutte frister (Kultur)</h3>
            </div>
            <p className="text-slate-600 mb-4">
              Gjelder prosjektstøtte til kultur, språkprosjekter og institusjoner.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start text-sm text-slate-700">
                <span className="w-2 h-2 mt-1.5 rounded-full bg-red-500 mr-3 flex-shrink-0"></span>
                <strong>01.03.2026</strong> – Institusjonsutvikling
              </li>
              <li className="flex items-start text-sm text-slate-700">
                <span className="w-2 h-2 mt-1.5 rounded-full bg-red-500 mr-3 flex-shrink-0"></span>
                <strong>01.10.2026</strong> – Prosjektstøtte (Hovedfrist)
              </li>
            </ul>
          </div>
        </div>

        {/* Navigation Grid */}
        <h2 className="text-3xl font-bold text-slate-900 mb-8">Utforsk støtteordningene</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <CategoryCard 
            title="Kultur & Språk"
            description="Støtte til arrangementer, bokutgivelser, musikk og språkopplæring."
            href="/kunnskapsbank/sametinget/kultur-sprak"
            icon={Scroll}
            theme="orange"
          />
          <CategoryCard 
            title="Næringsutvikling"
            description="Duodji, samisk reiseliv og tilleggsnæringer. Investeringsstøtte og etablering."
            href="/kunnskapsbank/sametinget/naering"
            icon={Coins}
            theme="orange"
          />
          <CategoryCard 
            title="Institusjonsutvikling"
            description="Driftstilskudd for samiske hus, teatre og språksentre."
            href="/kunnskapsbank/sametinget/institusjon"
            icon={Landmark}
            theme="orange"
          />
        </div>

      </div>
    </main>
  );
}