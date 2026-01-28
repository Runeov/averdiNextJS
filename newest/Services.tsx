'use client';

import { FeatureTabs, type FeatureTabItem } from '@/components/ui/FeatureTabs';

// Import your service images
import imgRegnskap from '@/assets/regnskap.avif';
import imgLonn from '@/assets/lonn.avif';
import imgRaadgiving from '@/assets/raadgiving.avif';
import imgFakturering from '@/assets/fakturering.avif';

export default function Services() {
  
  const serviceItems: FeatureTabItem[] = [
    {
      id: 'regnskap',
      title: 'Regnskap',
      shortDesc: 'Full oversikt i sanntid',
      icon: imgRegnskap.src, 
      content: 'Moderne skybasert regnskap som gir deg full oversikt i sanntid. Vi tar oss av bilagene og holder orden på fristene, så du kan bruke tiden på å drive butikken.',
      bullets: ['Løpende bokføring', 'Årsoppgjør & Skatt', 'Momsrapportering'],
      link: '/tjenester/regnskap',
      linkText: 'Les mer om regnskap'
    },
    {
      id: 'lonn',
      title: 'Lønn & HR',
      shortDesc: 'Korrekt lønn til rett tid',
      icon: imgLonn.src,
      content: 'Vi håndterer alt det praktiske rundt lønn, fra A-melding og reiseregninger til sykepenger og arbeidsgiveravgift. Dine ansatte får riktig lønn til riktig tid.',
      bullets: ['A-melding & Rapportering', 'Reiseregninger', 'Sykepenger'],
      link: '/tjenester/lonn',
      linkText: 'Les mer om lønn'
    },
    {
      id: 'fakturering',
      title: 'Fakturering',
      shortDesc: 'Få betalt i tide',
      icon: imgFakturering.src,
      content: 'Effektive rutiner for fakturering og purring sikrer at du får betalt for jobben du gjør. Med moderne løsninger som EHF og Vipps-faktura gjør vi det enklere for kundene dine å betale.',
      bullets: ['Automatisk fakturering', 'Purring & Inkasso', 'EHF & eFaktura'],
      link: '/tjenester/fakturering',
      linkText: 'Les mer om fakturering'
    },
    {
      id: 'raadgiving',
      title: 'Rådgivning',
      shortDesc: 'Strategisk sparringspartner',
      icon: imgRaadgiving.src,
      content: 'Bruk oss som din strategiske sparringspartner. Vi hjelper deg med budsjett, likviditetsstyring og verdivurdering, slik at du kan ta trygge valg for fremtiden.',
      bullets: ['Budsjett & Prognoser', 'Likviditetsstyring', 'Verdivurdering'],
      link: '/tjenester/raadgiving',
      linkText: 'Les mer om rådgivning'
    }
  ];

  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Tjenester som gir deg ro i sjela
          </h2>
          <p className="text-xl text-slate-600">
            Vi kombinerer personlig oppfølging med markedsledende teknologi for å gjøre din hverdag enklere.
          </p>
        </div>

        {/* The Feature Tabs Component */}
        <FeatureTabs 
          items={serviceItems} 
          themeColor="#E86C1F" 
        />
      </div>
    </section>
  );
}
