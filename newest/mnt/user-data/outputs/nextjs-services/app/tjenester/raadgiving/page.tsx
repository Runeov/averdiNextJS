import { ServicePageLayout } from '@/components/templates/ServicePageLayout';
import type { ServicePageConfig } from '@/types/service';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rådgivning | Averdi',
  description: 'Fra tall til strategisk handling. Vi hjelper deg å se mulighetene bak tallene, enten du skal starte opp, vokse, eller trenger en sparringspartner.',
};

export default function RaadgivingPage() {
  const config: ServicePageConfig = {
    hero: {
      title: 'Fra tall til strategisk handling.',
      subtitle:
        'Vi hjelper deg å se mulighetene bak tallene. Enten du skal starte opp, vokse, eller trenger en sparringspartner i vanskelige tider, står vi klare.',
      theme: 'orange',
    },
    products: [
      {
        id: 'strategi',
        title: 'Strategisk Rådgivning',
        shortDesc: 'Planlegg for vekst',
        icon: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800',
        content:
          'Vi hjelper deg å løfte blikket fra den daglige driften. Sammen legger vi en strategi for hvordan bedriften din skal vokse, øke lønnsomheten og nå sine mål. Vi er din sparringspartner i viktige beslutninger. Med vår erfaring gir vi deg strategisk rådgivning som hjelper bedriften din å vokse.',
        bullets: [
          'Forretningsutvikling',
          'Lønnsomhetsanalyser',
          'Strategisk planlegging',
          'Styrearbeid og ledelse',
          'Budsjett og prognoser',
          'Verdivurdering',
        ],
        link: '/kontakt',
        linkText: 'Book et strategimøte',
      },
      {
        id: 'grunder',
        title: 'Starte bedrift?',
        shortDesc: 'Gründerhjelpen',
        icon: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800',
        content:
          'Å starte egen bedrift er spennende, men det er mange fallgruver. Vi hjelper deg med valg av selskapsform, registrering i Brønnøysundregistrene, oppsett av rutiner og budsjetter for oppstartsfasen. Skatteoptimalisering og strukturering er viktige deler av vårt oppstartstilbud.',
        bullets: [
          'Valg av selskapsform (AS vs ENK)',
          'Stiftelsesdokumenter',
          'Forretningsplan',
          'Søknad om støtte (Sametinget/Innovasjon Norge)',
          'Skatteoptimalisering og strukturering',
        ],
        link: '/kontakt',
        linkText: 'Få hjelp til oppstart',
      },
    ],
    expert: {
      name: 'Ingvald Laiti',
      role: 'Daglig Leder / Statsaut. Regnskapsfører',
      quote:
        'Tall er ferskvare. Min jobb er å sikre at du forstår hva de betyr for din bedrift i dag, og i morgen.',
      image:
        'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80',
      email: 'ingvald.laiti@averdi.no',
      phone: '90767993',
    },
    faq: [
      {
        question: 'Hva koster en rådgivningstime?',
        answer:
          'Vi tilbyr både timebasert rådgivning og faste pakker. For gründere har vi ofte egne oppstartspakker til redusert pris. Kontakt oss for et uforpliktende tilbud tilpasset ditt behov.',
      },
      {
        question: 'Kan dere hjelpe med søknader til Sametinget?',
        answer:
          'Ja, vi har spesialkompetanse på tilskuddsordninger i Nord-Norge, inkludert Sametinget og Innovasjon Norge. Vi hjelper deg å skrive gode søknader og sette opp budsjetter som oppfyller kravene.',
      },
      {
        question: 'Bør jeg velge AS eller Enkeltpersonforetak?',
        answer:
          'Det avhenger av risiko, omsetning og ambisjoner. Et AS gir bedre sikkerhet for privatøkonomien og mulighet for ansettelser, mens et ENK er enklere å administrere i starten. Vi hjelper deg å velge riktig.',
      },
    ],
    articleTag: 'rådgivning',
  };

  return <ServicePageLayout config={config} />;
}
