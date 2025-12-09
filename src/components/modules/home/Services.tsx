import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calculator, Users, TrendingUp } from 'lucide-react';

// Import your service images
import imgRegnskap from '@/assets/regnskap.avif';
import imgLonn from '@/assets/lonn.avif';
import imgRaadgiving from '@/assets/raadgiving.avif';

export default function Services() {
  const services = [
    {
      title: 'Regnskap',
      description: 'Moderne skybasert regnskap som gir deg full oversikt i sanntid. Vi tar oss av bilagene, så du kan drive butikken.',
      image: imgRegnskap,
      icon: Calculator,
      link: '/tjenester/regnskap',
      color: 'blue'
    },
    {
      title: 'Lønn & HR',
      description: 'Korrekt lønn til rett tid. Vi håndterer alt fra A-melding og reiseregninger til sykepenger og arbeidsgiveravgift.',
      image: imgLonn,
      icon: Users,
      link: '/tjenester/lonn',
      color: 'green'
    },
    {
      title: 'Rådgivning',
      description: 'Strategisk sparringspartner for din bedrift. Vi hjelper med budsjett, likviditet og økonomisk styring.',
      image: imgRaadgiving,
      icon: TrendingUp,
      link: '/tjenester/raadgiving',
      color: 'orange'
    }
  ];

  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Tjenester som gir deg ro i sjela</h2>
          <p className="text-xl text-slate-600">
            Vi kombinerer personlig oppfølging med markedsledende teknologi for å gjøre din hverdag enklere.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link 
              key={service.title} 
              href={service.link}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-100"
            >
              {/* Image Header */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors" />
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-lg bg-slate-50 text-[#E86C1F]">
                    <service.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>
                </div>
                
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <span className="inline-flex items-center text-[#E86C1F] font-semibold group-hover:gap-2 transition-all">
                  Les mer
                  <ArrowRight className="w-4 h-4 ml-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}