'use client';

import { FeatureTabs, type FeatureTabItem } from '@/components/ui/FeatureTabs';

// Import your service images
import imgRegnskap from '@/assets/regnskap.avif';
import imgLonn from '@/assets/lonn.avif';
import imgRaadgiving from '@/assets/raadgiving.avif';

export default function Services() {
  
  // Define the data for the tabs
  // Note: We access .src on the imported images to get the string URL for FeatureTabs
  const serviceItems: FeatureTabItem[] = [
    {
      id: 'regnskap',
      title: 'Regnskap',
      shortDesc: 'Full oversikt i sanntid',
      icon: imgRegnskap.src,
      content: 'Moderne skybasert regnskap som gir deg full oversikt i sanntid. Vi tar oss av bilagene og holder orden på fristene, så du kan bruke tiden på å drive butikken.',
      bullets: ['Løpende bokføring', 'Momsrapportering', 'Fakturering', 'Skybaserte løsninger'],
      link: '/tjenester/regnskap',
      linkText: 'Les mer om regnskap'
    },
    {
      id: 'lonn',
      title: 'Lønn & HR',
      shortDesc: 'Korrekt lønn til rett tid',
      icon: imgLonn.src,
      content: 'Vi håndterer alt det praktiske rundt lønn, fra A-melding og reiseregninger til sykepenger og arbeidsgiveravgift. Dine ansatte får riktig lønn til riktig tid.',
      bullets: ['A-melding & Rapportering', 'Reiseregninger', 'Sykepenger', 'Redusert arbeidsgiveravgift'],
      link: '/tjenester/lonn',
      linkText: 'Les mer om lønn'
    },
    {
      id: 'aarsoppgjor',
      title: 'Årsoppgjør & Skatt',
      shortDesc: 'Trygg avslutning av året',
      icon: imgRegnskap.src,
      content: 'Vi sørger for at årsoppgjøret blir korrekt og levert i tide. Med vår ekspertise på tiltakssonen sikrer vi at du får maksimalt ut av alle fradrag.',
      bullets: ['Årsregnskap', 'Skattemelding', 'Skatteoptimalisering', 'Finnmarksfradrag'],
      link: '/tjenester/aarsoppgjor',
      linkText: 'Les mer om årsoppgjør'
    },
    {
      id: 'raadgiving',
      title: 'Rådgivning',
      shortDesc: 'Strategisk sparringspartner',
      icon: imgRaadgiving.src,
      content: 'Bruk oss som din strategiske sparringspartner. Vi hjelper deg med budsjett, likviditetsstyring og verdivurdering, slik at du kan ta trygge valg for fremtiden.',
      bullets: ['Budsjett & Prognoser', 'Likviditetsstyring', 'Verdivurdering', 'Støtteordninger'],
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

        {/* The New Feature Tabs Component */}
        <FeatureTabs 
          items={serviceItems} 
          themeColor="#E86C1F" 
        />
      </div>
    </section>
  );
}