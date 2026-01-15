'use client';

import { Building2, Heart, TrendingUp } from 'lucide-react';

export default function CompanyStory() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Vår historie
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Fra lokalt regnskapskontor til den ledende tolken av Nord-Norges unike forretningsmuligheter.
            </p>
          </div>

          {/* Timeline */}
          <div className="space-y-12">
            
            {/* 1989 - Founding */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#E86C1F]/10 flex items-center justify-center">
                <Building2 className="w-8 h-8 text-[#E86C1F]" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-[#E86C1F] mb-2">1989</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Etablert i Karasjok</h3>
                <p className="text-slate-600 leading-relaxed">
                  Averdi ble grunnlagt med en klar visjon: å tilby profesjonelle regnskapstjenester til det voksende næringslivet i Finnmark. Fra dag én har vi vært forankret i lokalsamfunnet, med dyp forståelse for de unike utfordringene og mulighetene i nord.
                </p>
              </div>
            </div>

            {/* 2000s - Specialization */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#E86C1F]/10 flex items-center justify-center">
                <Heart className="w-8 h-8 text-[#E86C1F]" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-[#E86C1F] mb-2">2000-tallet</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Spesialisering på samiske organisasjoner</h3>
                <p className="text-slate-600 leading-relaxed">
                  Vi utviklet spisskompetanse på regnskap for samiske organisasjoner, institusjoner og primærnæringer. Gjennom tett samarbeid med Sametinget og lokale aktører ble vi eksperter på tilskuddsforvaltning, prosjektregnskap og kulturell forretningsforståelse.
                </p>
              </div>
            </div>

            {/* Today - The Interpreter */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#E86C1F]/10 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-[#E86C1F]" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-[#E86C1F] mb-2">I dag</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Tolken av Nord-Norge</h3>
                <p className="text-slate-600 leading-relaxed">
                  Vi har utviklet oss fra tradisjonelt regnskapskontor til strategisk rådgiver. Vi dekoder komplekse regelverk – fra Tiltakssonens skattefordeler til Sametingets tilskuddsordninger – og oversetter dem til konkrete forretningsmuligheter. Når våre klienter vokser, vokser Nord-Norge.
                </p>
              </div>
            </div>

          </div>

          {/* Quote */}
          <div className="mt-16 bg-slate-50 rounded-2xl p-8 border-l-4 border-[#E86C1F]">
            <blockquote className="text-lg text-slate-700 italic mb-4">
              "Det offentlige setter rammene. Vi finner mulighetene."
            </blockquote>
            <div className="text-sm text-slate-500">— Averdi sitt mantra</div>
          </div>

        </div>
      </div>
    </section>
  );
}
