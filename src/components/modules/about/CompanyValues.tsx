'use client';

import { Target, Users, Lightbulb, Shield } from 'lucide-react';

export default function CompanyValues() {
  const values = [
    {
      icon: Target,
      title: 'Direkte',
      description: 'Vi snakker klart og tydelig. Hvis en regel er utfordrende, sier vi det. Hvis en mulighet er gyllen, sier vi det også. Ingen ullent språk.',
      color: '#E86C1F'
    },
    {
      icon: Shield,
      title: 'Kompetent',
      description: 'Vi gjetter aldri. Vi bruker data, siterer lover og kjenner detaljer andre overser. Eksakte grenser, spesifikke tak, korrekte paragrafer.',
      color: '#E86C1F'
    },
    {
      icon: Users,
      title: 'Engasjert',
      description: 'Vi bryr oss om regionens vekst. Din suksess er Nord-Norges suksess. Vi står skulder ved skulder med deg i vær og vind.',
      color: '#E86C1F'
    },
    {
      icon: Lightbulb,
      title: 'Sofistikert',
      description: 'Lokalt forankret, men ikke provinsielt. Vi bringer Oslo-nivå ekspertise til Kautokeino. Verdensklasse kompetanse anvendt lokalt.',
      color: '#E86C1F'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Våre verdier
          </h2>
          <p className="text-lg text-slate-600">
            Fire prinsipper som styrer alt vi gjør – fra første møte til siste rapport.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 border border-slate-200 hover:shadow-lg transition-all duration-300 group"
              >
                {/* Icon */}
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${value.color}15` }}
                >
                  <Icon className="w-7 h-7" style={{ color: value.color }} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {value.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Statement */}
        <div className="mt-16 max-w-3xl mx-auto text-center">
          <div className="bg-white rounded-2xl p-8 border-2 border-[#E86C1F]/20 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Den pragmatiske nordnorske vokteren
            </h3>
            <p className="text-lg text-slate-600 leading-relaxed">
              Vi ser ikke ned på klienter fra et elfenbenstårn i Oslo. Vi står skulder ved skulder med deg i vær og vind i Finnmark. Vi er dypt forankret i det nordlige samfunnet – din suksess er vår suksess.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
