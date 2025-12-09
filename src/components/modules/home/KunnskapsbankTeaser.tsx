import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';

export default function KunnskapsbankTeaser() {
  return (
    <section id="kunnskapsbank" className="py-24 relative overflow-hidden bg-white">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-[600px] h-[600px] bg-orange-50 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
            <BookOpen className="h-4 w-4" />
            Kunnskapsbank
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900">
            Ressurser og Fagstoff
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Vi deler vår kompetanse for å hjelpe din bedrift å vokse.
          </p>
        </div>

        {/* Featured Guide: Sametinget */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#E86C1F]/10 relative group hover:border-[#E86C1F]/30 transition-all duration-300">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#E86C1F] to-[#F4B223]"></div>
            
            <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12 items-center">
              <div className="space-y-6">
                <div className="inline-block px-4 py-1.5 bg-[#E86C1F]/10 text-[#E86C1F] rounded-full text-sm font-semibold">
                  Utvalgt Guide
                </div>
                <h3 className="text-3xl font-bold text-gray-900">
                  Alt du må vite om tilskudd fra Sametinget
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Driver du bedrift i et samisk område? Vi har laget en komplett guide om støtteordninger, søknadsprosesser og krav til regnskap. Lær hvordan du unngår avslag og sikrer finansiering.
                </p>
                <Link 
                  href="/kunnskapsbank/organisasjoner/sametinget"
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-[#E86C1F] to-[#F4B223] rounded-full shadow-md hover:shadow-lg hover:shadow-[#E86C1F]/30 hover:-translate-y-0.5 transition-all duration-300 group-hover:scale-105"
                >
                  Les guiden
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
              
              <div className="relative h-64 md:h-full min-h-[300px] bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center">
                 <div className="text-center p-6">
                   <div className="text-6xl mb-4">🏛️</div>
                   <p className="text-slate-500 font-medium">Sametingets Tilskuddsordninger</p>
                 </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link 
            href="/kunnskapsbank"
            className="inline-flex items-center justify-center text-blue-700 text-lg font-medium hover:text-blue-900 transition-colors group"
          >
            Se hele kunnskapsbanken
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}