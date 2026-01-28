import { ServicePageLayout } from '@/components/templates/ServicePageLayout';
import type { ServicePageConfig } from '@/types/service';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Regnskap | Averdi',
  description: 'Moderne skybasert regnskap med lokal ekspertise om tiltakssonen og Sametinget. Løpende bokføring, årsoppgjør og MVA-rapportering.',
};

export default function RegnskapPage() {
  const config: ServicePageConfig = {
    hero: {
      title: 'Regnskap som forstår Nord-Norge',
      subtitle: 'Vi kombinerer lokal ekspertise om tiltakssonen og Sametinget med moderne skybaserte systemer.',
      theme: 'orange',
    },
    products: [
      {
        id: 'regnskap',
        title: 'Løpende Regnskap',
        shortDesc: 'Digital bilagsflyt og effektiv bokføring',
        icon: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800',
        content:
          'Vi tar oss av hele regnskapsprosessen, fra daglig bokføring til månedsavslutning. Med moderne skybaserte systemer som Tripletex og PowerOffice Go får du alltid oppdatert regnskap tilgjengelig. Skybasert regnskap gir deg full systemtilgang og oppdatert økonomioversikt til enhver tid.',
        bullets: [
          'Bilagsføring',
          'MVA-rapportering',
          'Bankavstemming',
          'Kontantstrømanalyse',
          'Remittering og prosjektregnskap',
        ],
        link: '/kontakt',
        linkText: 'Få et tilbud på regnskap',
      },
      {
        id: 'arsoppgjor',
        title: 'Årsoppgjør & Skatt',
        shortDesc: 'Vi tar oss av årsoppgjøret og dialog med Altinn',
        icon: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
        content:
          'Årsoppgjøret er kritisk for å sikre at alt er riktig rapportert. Vi håndterer hele prosessen fra skattemelding til innsending av årsregnskap, slik at du kan være trygg på at alt er i orden. Perioderapportering og revisjonsforberedelse inngår i vårt komplette tilbud.',
        bullets: [
          'Skattemelding',
          'Årsregnskap',
          'Aksjonærregister',
          'Revisjonsforberedelse',
          'Perioderapportering',
        ],
        link: '/kontakt',
        linkText: 'Snakk med oss om årsoppgjør',
      },
    ],
    expert: {
      name: 'Ingvald Laiti',
      role: 'Statsaut. Regnskapsfører',
      quote:
        'Tall er ferskvare. Min jobb er å sikre at du forstår hva de betyr for din bedrift i dag, og i morgen.',
      image:
        'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80',
      email: 'ingvald.laiti@averdi.no',
      phone: '90767993',
    },
    faq: [
      {
        question: 'Hvorfor velge en regnskapsfører i Finnmark?',
        answer:
          'En lokal regnskapsfører kjenner særreglene i tiltakssonen, inkludert 0% arbeidsgiveravgift, finnmarksfradrag og spesielle avskrivningsregler.',
      },
      {
        question: 'Kan dere hjelpe med rapportering til Sametinget?',
        answer:
          'Ja, vi er spesialister på prosjektregnskap for Sametinget. Vi kjenner kravene til rapportering, revisjon og dokumentasjon.',
      },
      {
        question: 'Hvilke systemer bruker dere?',
        answer:
          'Vi bruker moderne, skybaserte systemer som PowerOffice Go og Tripletex.',
      },
    ],
    articleTag: 'regnskap',
  };

  return <ServicePageLayout config={config} />;
}
