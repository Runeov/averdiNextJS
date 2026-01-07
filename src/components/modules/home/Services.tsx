'use client';

import { FeatureTabs, type FeatureTabItem } from '@/components/ui/FeatureTabs';

// Import your service images
import imgRegnskap from '@/assets/regnskap.avif';
import imgLonn from '@/assets/lonn.avif';
import imgRaadgiving from '@/assets/raadgiving.avif';
import imgFaktura from '@/assets/faktura.avif';

export default function Services() {
  
  // Define the data for the tabs - Now with 4 services
  // Note: We access .src on the imported images to get the string URL for FeatureTabs
  const serviceItems: FeatureTabItem[] = [
    {
      id: 'regnskap',
      title: 'Regnskap',
      shortDesc: 'Full oversikt i sanntid',
      icon: imgRegnskap.src, 
      content: 'Moderne skybasert regnskap som gir deg full oversikt i sanntid. Vi tar oss av bilagene og holder orden på fristene, så du kan bruke tiden på å drive butikken. Med vår erfaring fra nordnorsk næringsliv forstår vi de unike utfordringene og mulighetene i regionen.',
      bullets: [
        'Løpende bokføring og bilagshåndtering',
        'Momsrapportering og avgiftsoppgjør',
        'Fakturering og kundeoppfølging',
        'Skybaserte løsninger med PowerOffice Go'
      ],
      link: '/tjenester/regnskap',
      linkText: 'Les mer om regnskap'
    },
    {
      id: 'lonn',
      title: 'Lønn & HR',
      shortDesc: 'Korrekt lønn til rett tid',
      icon: imgLonn.src,
      content: 'Vi håndterer alt det praktiske rundt lønn, fra A-melding og reiseregninger til sykepenger og arbeidsgiveravgift. Dine ansatte får riktig lønn til riktig tid – hver gang. Vi kjenner særreglene for tiltakssonen og sikrer at du får alle fordeler du har krav på.',
      bullets: [
        'A-melding og lønnsrapportering',
        'Reiseregninger og utlegg',
        'Sykepenger og refusjoner',
        'Redusert arbeidsgiveravgift i tiltakssonen'
      ],
      link: '/tjenester/lonn',
      linkText: 'Les mer om lønn'
    },
    {
      id: 'aarsoppgjor',
      title: 'Årsoppgjør & Skatt',
      shortDesc: 'Trygg avslutning av regnskapsåret',
      icon: imgFaktura.src,
      content: 'Årsoppgjøret er en kritisk prosess som krever presisjon og faglig kompetanse. Vi sørger for korrekt skatteberegning, optimalisering av fradrag og rettidig innlevering. Med vår ekspertise på tiltakssonen og samiske næringer sikrer vi at du betaler riktig skatt – ikke en krone mer.',
      bullets: [
        'Årsregnskap og noter',
        'Skattemelding for næringsdrivende',
        'Skatteoptimalisering og fradrag',
        'Særskilte ordninger for tiltakssonen'
      ],
      link: '/tjenester/aarsoppgjor',
      linkText: 'Les mer om årsoppgjør'
    },
    {
      id: 'raadgiving',
      title: 'Rådgivning',
      shortDesc: 'Strategisk sparringspartner',
      icon: imgRaadgiving.src,
      content: 'Bruk oss som din strategiske sparringspartner. Vi hjelper deg med budsjett, likviditetsstyring og verdivurdering, slik at du kan ta trygge valg for fremtiden. Vår lokale forankring i Finnmark gir oss unik innsikt i regionens muligheter og utfordringer.',
      bullets: [
        'Budsjett og prognoser',
        'Likviditetsstyring og kontantstrøm',
        'Verdivurdering og selskapsstrategi',
        'Støtteordninger og tilskudd'
      ],
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
