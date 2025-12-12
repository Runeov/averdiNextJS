import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen, Clock, Zap, FileText } from 'lucide-react';
import { AverdiBackground } from '@/components/modules/AverdiBackground';
import { getExpert } from '@/data/experts';

export const metadata: Metadata = {
  title: 'Averdi Innsikt | Dybdeartikler og Analyser',
  description: 'Faglig fordypning om nordnorsk næringsliv, samfunn og økonomi. Les våre analyser av statsbudsjettet, virkemiddelapparatet og rammebetingelser.',
};

export default function ArtikkelOversikt() {
  const elle = getExpert('elle-maret');

  // --- ROUTING CONFIGURATION ---
  // Path 1: Short Version
  const pathShort = "/kunnskapsbank/artikler/sosiookonomiske-forskjeller";
  
  // Path 2: Long Version (Renamed folder)
  const pathLong = "/kunnskapsbank/artikler/sosiookonomiske-forskjeller_Long";

  return (
    <main className="min-h-screen bg-slate-50 relative overflow-hidden font-sans">
      <AverdiBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
        
        {/* Header */}
        <header className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-bold uppercase tracking-widest mb-4">
            <BookOpen className="w-4 h-4" />
            Kunnskapsbanken
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6">
            Averdi <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E86C1F] to-[#F4B223]">Innsikt</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Vi dykker ned i tallene som former landsdelen. Her finner du våre grundigste analyser, kommentarer og strategiske råd.
          </p>
        </header>

        {/* --- FEATURED ARTICLE (STORE SAKEN) --- */}
        <section className="mb-20">
          <div className="group block relative rounded-3xl overflow-hidden shadow-2xl bg-white hover:shadow-orange-500/10 transition-shadow">
            <div className="grid md:grid-cols-2">
              
              {/* Bilde / Grafikk - Linking to Long Version as default depth */}
              <Link href={pathLong} className="bg-slate-900 relative min-h-[300px] md:min-h-full overflow-hidden flex items-center justify-center p-10 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#E86C1F]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#E86C1F]/30 transition-colors duration-500"></div>
                <div className="relative z-10 text-center">
                  <span className="text-[#E86C1F] font-bold text-6xl md:text-8xl opacity-20 select-none">SÁPMI</span>
                </div>
              </Link>

              {/* Innhold */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-xs font-bold text-slate-400 mb-4 uppercase tracking-wider">
                  <span className="text-[#E86C1F]">Ny Analyse</span>
                  <span>•</span>
                  <span>Velg lesemodus</span>
                </div>
                
                {/* Title links to Long Version */}
                <Link href={pathLong}>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 group-hover:text-[#E86C1F] transition-colors leading-tight cursor-pointer">
                    Sosioøkonomiske forskjeller uten at samfunnet ser det
                    </h2>
                </Link>
                
                <p className="text-slate-600 text-lg mb-8 line-clamp-3">
                  Mens Norge diskuterer strømpriser, betaler befolkningen i nord en usynlig skatt i form av tapt tid, dårligere helse og død kapital. Vi har tatt "den økonomiske sannhetstesten" på statsbudsjettet.
                </p>

                {/* --- BUTTONS ROW --- */}
                <div className="flex flex-wrap gap-4 mb-8">
                    {/* BUTTON 1: Short Version */}
                    <Link 
                        href={pathShort} 
                        className="flex items-center gap-2 px-5 py-3 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-200 hover:border-slate-300 transition-all"
                    >
                        <Zap className="w-4 h-4 text-[#E86C1F]" />
                        Kortversjon (3 min)
                    </Link>

                    {/* BUTTON 2: Long Version */}
                    <Link 
                        href={pathLong} 
                        className="flex items-center gap-2 px-5 py-3 rounded-full bg-slate-900 text-white font-bold text-sm hover:bg-[#E86C1F] transition-all shadow-md"
                    >
                        <FileText className="w-4 h-4" />
                        Dybdeanalyse (15 min)
                    </Link>
                </div>

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-6">
                  <div className="flex items-center gap-3">
                    {elle?.image ? (
                        <div className="w-10 h-10 rounded-full overflow-hidden relative">
                            <Image src={elle.image} alt={elle.name} fill className="object-cover" />
                        </div>
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-sm">
                            {elle?.initials || 'AV'}
                        </div>
                    )}
                    <div>
                      <p className="text-sm font-bold text-slate-900">{elle?.name || 'Averdi Analyse'}</p>
                      <p className="text-xs text-slate-500">{elle?.role || 'Redaksjonen'}</p>
                    </div>
                  </div>
                  
                  {/* Arrow links to Long Version */}
                  <Link href={pathLong} className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 text-slate-400 group-hover:bg-[#E86C1F] group-hover:text-white transition-all">
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* --- FLERE ARTIKLER --- */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-slate-900">Flere saker</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Placeholder Kort 1 */}
            <Link href="/kunnskapsbank/bedrifter/rekruttering" className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all">
              <div className="text-xs font-bold text-blue-600 mb-3 uppercase">Bedrift</div>
              <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                Slik vinner du rekrutteringskampen i 2026
              </h4>
              <p className="text-slate-600 text-sm mb-6">
                Med 60.000 i gjeldsslette har du et våpen som matcher Oslo-lønn. Her er oppskriften.
              </p>
              <div className="flex items-center text-xs text-slate-400">
                <Clock className="w-3 h-3 mr-1" /> 5 min
              </div>
            </Link>

            {/* Placeholder Kort 2 */}
            <Link href="/kunnskapsbank/sametinget/naering" className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all">
              <div className="text-xs font-bold text-[#E86C1F] mb-3 uppercase">Sametinget</div>
              <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#E86C1F] transition-colors">
                Næringsstøtte: Førstemann til mølla
              </h4>
              <p className="text-slate-600 text-sm mb-6">
                Hvorfor du må sende søknaden i januar, og hvordan du unngår likviditetsfellen.
              </p>
              <div className="flex items-center text-xs text-slate-400">
                <Clock className="w-3 h-3 mr-1" /> 4 min
              </div>
            </Link>

            {/* Placeholder Kort 3 */}
            <Link href="/kunnskapsbank/bedrifter/transport" className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all">
              <div className="text-xs font-bold text-slate-500 mb-3 uppercase">Regelverk</div>
              <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-slate-600 transition-colors">
                Unngå straffeskatt på transport
              </h4>
              <p className="text-slate-600 text-sm mb-6">
                De Minimis-reglene for bagatellstøtte er kompliserte. Sjekk om din bedrift rammes.
              </p>
              <div className="flex items-center text-xs text-slate-400">
                <Clock className="w-3 h-3 mr-1" /> 6 min
              </div>
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}