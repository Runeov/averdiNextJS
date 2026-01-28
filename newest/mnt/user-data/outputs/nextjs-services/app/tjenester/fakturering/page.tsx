import { ServicePageLayout } from '@/components/templates/ServicePageLayout';
import type { ServicePageConfig } from '@/types/service';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fakturering | Averdi',
  description: 'Bedre likviditet, mindre bekymring. Effektive rutiner for fakturering og purring sikrer at du får betalt for jobben du gjør.',
};

export default function FaktureringPage() {
  const config: ServicePageConfig = {
    hero: {
      title: 'Bedre likviditet, mindre bekymring.',
      subtitle:
        'Vi hjelper deg å få pengene inn på konto. Effektive rutiner for fakturering og purring sikrer at du får betalt for jobben du gjør.',
      theme: 'orange',
    },
    products: [
      {
        id: 'fakturering',
        title: 'Fakturering & Oppfølging',
        shortDesc: 'Få betalt i tide',
        icon: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800',
        content:
          'Vi sørger for at fakturaene dine går ut automatisk og korrekt. Ved å bruke moderne løsninger som EHF og Vipps-faktura, gjør vi det enklere for kundene dine å betale, noe som reduserer tiden du må vente på pengene. Våre systemer automatiserer fakturautsendelse og purringer for bedre cash flow.',
        bullets: [
          'Utsendelse via EHF, eFaktura eller e-post',
          'Automatiske betalingspåminnelser',
          'Full oversikt over utestående fordringer',
          'Integrasjon mot bank',
          'Kundeoppfølging',
        ],
        link: '/kontakt',
        linkText: 'Få hjelp med fakturering',
      },
      {
        id: 'inkasso',
        title: 'Purring & Inkasso',
        shortDesc: 'Profesjonell innfordring',
        icon: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800',
        content:
          'Det er krevende å følge opp kunder som ikke betaler. Vi håndterer purreprosessen profesjonelt og effektivt, og sender saker videre til inkasso ved behov, slik at du slipper den ubehagelige jobben. Påminnelser og inkassooppfølging er en del av vårt komplette faktureringslösning.',
        bullets: [
          'Systematisk purreprosess',
          'Inkassovarsel iht. lovverk',
          'Sømløs overføring til inkassopartner',
          'Bevarer kunderelasjonen',
          'Påminnelser og inkassooppfølging',
        ],
        link: '/kontakt',
        linkText: 'Kontakt oss om innfordring',
      },
    ],
    expert: {
      name: 'Ingvald Laiti',
      role: 'Daglig Leder / Statsaut. Regnskapsfører',
      quote:
        'Det handler ikke bare om å sende en faktura. Det handler om å bygge rutiner som sikrer at bedriften din alltid har midlene den trenger for å vokse.',
      image:
        'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      email: 'ingvald.laiti@averdi.no',
      phone: '90767993',
    },
    faq: [
      {
        question: 'Kan dere sende fakturaer direkte fra mitt system?',
        answer:
          'Ja, vi jobber i skybaserte systemer som Tripletex og PowerOffice Go. Vi kan enten sende fakturaene for deg, eller sette opp systemet slik at du gjør det enkelt selv med et par tastetrykk.',
      },
      {
        question: 'Hva skjer hvis kunden ikke betaler?',
        answer:
          'Vi har automatiske rutiner for dette. Først sendes en vennlig påminnelse, deretter purring/inkassovarsel. Om betalingen fortsatt uteblir, overføres saken sømløst til vår inkassopartner uten at du trenger å løfte en finger.',
      },
      {
        question: 'Støtter dere EHF-faktura?',
        answer:
          'Selvsagt. EHF er standarden for fakturering til bedrifter og det offentlige. Vi sikrer at du er rigget for å sende og motta EHF, noe som sikrer raskere behandling og betaling.',
      },
    ],
    articleTag: 'fakturering',
  };

  return <ServicePageLayout config={config} />;
}
