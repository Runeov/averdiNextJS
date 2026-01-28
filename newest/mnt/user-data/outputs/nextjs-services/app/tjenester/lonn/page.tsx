import { ServicePageLayout } from '@/components/templates/ServicePageLayout';
import type { ServicePageConfig } from '@/types/service';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lønn & HR | Averdi',
  description: 'Korrekt lønn, hver eneste gang. Vi tar ansvaret for A-melding, reiseregninger og kompliserte regelverk i Nord-Norge.',
};

export default function LonnPage() {
  const config: ServicePageConfig = {
    hero: {
      title: 'Korrekt lønn, hver eneste gang.',
      subtitle:
        'Vi tar ansvaret for at dine ansatte får riktig lønn til rett tid. Slipp bekymringer for A-melding, reiseregninger og kompliserte regelverk i nord.',
      theme: 'orange',
    },
    products: [
      {
        id: 'lonnskjoring',
        title: 'Lønnskjøring & A-melding',
        shortDesc: 'Korrekt og til rett tid',
        icon: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800',
        content:
          'Vi tar oss av hele lønnsprosessen, fra beregning av lønn og skattetrekk til utsendelse av lønnsslipper og innrapportering av A-melding. Vi sørger for at alle frister overholdes. Vårt lønnssystem håndterer alt fra lønnskjøring til rapportering til myndighetene.',
        bullets: [
          'Månedlig lønnskjøring',
          'Automatisk A-melding til Altinn',
          'Digitale lønnsslipper til ansatte',
          'Håndtering av feriepenger',
          'Feriepengeberegning',
        ],
        link: '/kontakt',
        linkText: 'Få et tilbud på lønnskjøring',
      },
      {
        id: 'reiseregning',
        title: 'Reiseregninger & Utlegg',
        shortDesc: 'Enkel digital håndtering',
        icon: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800',
        content:
          'Gjør det enkelt for dine ansatte å registrere reiser og utlegg. Vi bruker moderne systemer (som Tripletex/PowerOffice Go appen) som lar ansatte ta bilde av kvitteringer og sende inn direkte fra mobilen. A-melding og skatterapportering inngår i vårt komplette lønnstilbud.',
        bullets: [
          'App-basert registrering',
          'Korrekt behandling av dietter og satser',
          'Raskere tilbakebetaling til ansatte',
          'Full oversikt og kontroll',
          'A-melding og skatterapportering',
        ],
        link: '/kontakt',
        linkText: 'Snakk med oss om digitale løsninger',
      },
    ],
    expert: {
      name: 'Ingvald Laiti',
      role: 'Daglig Leder / Statsaut. Regnskapsfører',
      quote:
        'Tallene forteller historien om din bedrifts helse. Min jobb er å hjelpe deg å skrive neste kapittel, med fokus på vekst og trygghet.',
      image:
        'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80',
      email: 'ingvald.laiti@averdi.no',
      phone: '90767993',
    },
    faq: [
      {
        question: 'Hvilke lønnssystemer støtter dere?',
        answer:
          'Vi jobber primært i Tripletex, PowerOffice Go og Duett. Disse systemene er skybaserte og gir både deg som leder og dine ansatte en enkel og effektiv hverdag.',
      },
      {
        question: 'Kan dere håndtere lønn for bedrifter i tiltakssonen?',
        answer:
          'Absolutt. Vi har inngående kunnskap om særreglene for arbeidsgiveravgift og skattetrekk som gjelder i Finnmark og Nord-Troms.',
      },
      {
        question: 'Hva koster det å outsource lønn?',
        answer:
          'Prisen avhenger av antall ansatte og kompleksiteten i lønnskjøringen (f.eks. mye overtid/tillegg). Kontakt oss for en uforpliktende prat og et tilbud.',
      },
    ],
    articleTag: 'lønn',
  };

  return <ServicePageLayout config={config} />;
}
