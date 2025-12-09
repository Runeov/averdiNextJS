'use client'; // Needed because we use onClick/interactive elements

import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
// Ensure you copy AverdiBackground to the new location or adjust path:
import { AverdiBackground } from '@/components/ui/AverdiBackground'; 
import karasjokImage from '@/assets/karasjok_Over.avif';

export default function Hero() {
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - navbarHeight;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-slate-50 pt-8 pb-20 lg:pt-20 lg:pb-32">
      {/* Background Component */}
      <AverdiBackground />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Text Content */}
          <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E86C1F]/10 text-[#E86C1F] text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E86C1F] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E86C1F]"></span>
              </span>
              Regnskap og økonomitjenester i Nord
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6">
              Velkommen til <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E86C1F] to-[#F4B223]">Averdi</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 mb-8 leading-relaxed">
              Din partner for trygg økonomistyring – med faglig tyngde og hjertet i Finnmark.
            </p>

            {/* Value Proposition Box - Good for AI context */}
            <div className="space-y-4 text-base text-slate-600 mb-10 leading-relaxed bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-[#E86C1F]/10 shadow-sm text-left">
              <p>
                Siden 1989 har vi vært en trygg havn for organisasjoner, småbedrifter og handel.
              </p>
              <p>
                Hos Averdi møter du en unik kombinasjon: <strong className="text-slate-900">statsautoriserte regnskapsførere</strong> med lang erfaring som kan lovverket til fingerspissene, sammen med våre yngre digitale hoder som sørger for at du utnytter dagens muligheter fullt ut.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => scrollToSection('contact')}
                className="inline-flex items-center justify-center rounded-full text-base font-medium transition-all focus-visible:outline-none bg-gradient-to-r from-[#E86C1F] to-[#F4B223] text-white hover:shadow-lg hover:shadow-[#E86C1F]/30 hover:-translate-y-0.5 h-12 px-8"
              >
                Kontakt oss
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="inline-flex items-center justify-center rounded-full text-base font-medium transition-all focus-visible:outline-none border border-[#E86C1F]/20 bg-white/50 backdrop-blur-sm hover:bg-white/80 hover:text-[#E86C1F] h-12 px-8"
              >
                Se våre tjenester
              </button>
            </div>

            <div className="mt-8 flex items-center justify-center lg:justify-start gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span>Etablert 1989</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span>Lokalt forankret (Karasjok)</span>
              </div>
            </div>
          </div>

          {/* Image Content - Next.js Optimized */}
          <div className="relative lg:h-full flex items-center justify-center">
            <div className="relative w-full aspect-square max-w-[500px] lg:max-w-none group">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-tr from-[#E86C1F]/20 to-[#F4B223]/20 rounded-full blur-2xl -z-10 transition-all duration-700 group-hover:blur-3xl"></div>
              
              <Image 
                src={karasjokImage} 
                alt="Karasjok oversiktsbilde - Averdi sitt hjemsted"
                className="w-full h-full object-cover rounded-3xl shadow-2xl border-4 border-white/50 transition-transform duration-700 group-hover:scale-[1.02]" 
                priority // Vital for LCP score
                placeholder="blur" // Adds nice blur effect while loading
              />
              
              {/* Floating Card: Lokasjon */}
              <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-xl border border-[#E86C1F]/10 hidden sm:block animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <div className="flex items-center gap-3">
                  <div className="bg-[#E86C1F]/10 p-2 rounded-lg text-[#E86C1F]">
                    <span className="text-2xl">📍</span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider">Lokasjon</p>
                    <p className="text-sm font-bold text-slate-900">Karasjok, Norge</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}