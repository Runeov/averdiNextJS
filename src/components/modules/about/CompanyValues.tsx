'use client';

import { Target, Users, Shield } from 'lucide-react';

export default function CompanyValues() {
  const values = [
    {
      icon: Target,
      title: 'Vi sier det som det er',
      description: 'Du får klare svar på hva du må gjøre, og når du må gjøre det.',
      color: '#E86C1F'
    },
    {
      icon: Shield,
      title: 'Vi jobber med tall, ikke antakelser',
      description: 'Når vi anbefaler noe, viser vi til regelverk, frister og faktiske tall.',
      color: '#E86C1F'
    },
    {
      icon: Users,
      title: 'Vi følger med',
      description: 'Endrer likviditeten seg, tar vi kontakt. Du slipper å oppdage det for sent.',
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
            Tre prinsipper som styrer alt vi gjør, fra første møte til siste rapport.
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
                  <Icon className="w-7 h-7" style={{ color: value.color }} aria-hidden="true" />
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


      </div>
    </section>
  );
}
