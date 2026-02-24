import { Metadata } from 'next';
import { TrendingUp, DollarSign, Target, Gift, MapPin, Zap, Users } from 'lucide-react';
import HeroImage from '@/assets/hero_raadgivning.avif';
import { ServiceHero } from '@/components/modules/services/ServiceHero';
import { ServiceOverview } from '@/components/modules/services/ServiceOverview';
import { ServiceFeatureGrid, type ServiceFeature } from '@/components/modules/services/ServiceFeatureGrid';
import { ServiceProcess, type ProcessStep } from '@/components/modules/services/ServiceProcess';
import { ServiceWhyAverdi, type WhyPoint } from '@/components/modules/services/ServiceWhyAverdi';
import { FaqAccordion, type FaqItem } from '@/components/ui/FaqAccordion';
import { ServiceCTA } from '@/components/modules/services/ServiceCTA';

export const metadata: Metadata = {
  title: 'Rådgivning | Averdi - Strategisk rådgivning i Nord-Norge',
  description: 'Strategisk sparringspartner for vekst. Budsjett, likviditetsstyring og støtteordninger. Ekspertise på Sametinget og tiltakssonen.',
  keywords: 'rådgivning, budsjett, likviditetsstyring, sametinget, støtteordninger, tiltakssonen, nordnorge',
};

export default function RaadgivingPage() {
  
  // Features data
  const features: ServiceFeature[] = [
    {
      title: 'Budsjett og prognoser',
      description: 'Vi hjelper deg med å lage realistiske budsjetter og prognoser for fremtiden.',
      icon: <TrendingUp className="w-6 h-6" aria-hidden="true" />
    },
    {
      title: 'Likviditetsstyring og kontantstrøm',
      description: 'Sikre at bedriften har nok penger til å betale regningene når de forfaller.',
      icon: <DollarSign className="w-6 h-6" aria-hidden="true" />
    },
    {
      title: 'Verdivurdering og selskapsstrategi',
      description: 'Strategisk rådgivning for vekst, salg eller generasjonsskifte.',
      icon: <Target className="w-6 h-6" aria-hidden="true" />
    },
    {
      title: 'Støtteordninger og tilskudd',
      description: 'Ekspertise på Sametinget, Innovasjon Norge og andre støtteordninger.',
      icon: <Gift className="w-6 h-6" aria-hidden="true" />
    }
  ];

  // Process steps
  const processSteps: ProcessStep[] = [
    {
      number: '1',
      title: 'Kartlegging',
      description: 'Vi starter med å forstå din bedrift, dine mål og utfordringer.'
    },
    {
      number: '2',
      title: 'Analyse',
      description: 'Vi analyserer tallene og identifiserer muligheter og risikoer.'
    },
    {
      number: '3',
      title: 'Handlingsplan',
      description: 'Vi lager en konkret plan med tiltak og oppfølging.'
    }
  ];

  // Why Averdi points
  const whyPoints: WhyPoint[] = [
    {
      title: 'Lokal forankring i Finnmark',
      description: 'Vi forstår de unike utfordringene og mulighetene i nordnorsk næringsliv.',
      icon: <MapPin className="w-7 h-7" aria-hidden="true" />
    },
    {
      title: 'Kjenner støtteordninger',
      description: 'Vi har dyp kunnskap om Sametinget, Innovasjon Norge og tiltakssonen.',
      icon: <Zap className="w-7 h-7" aria-hidden="true" />
    },
    {
      title: 'Langsiktig perspektiv',
      description: 'Vi er ikke bare rådgivere, vi er din strategiske partner over tid.',
      icon: <Users className="w-7 h-7" aria-hidden="true" />
    }
  ];

  // FAQ items
  const faqItems: FaqItem[] = [
    {
      question: 'Hva er forskjellen på rådgivning og regnskap?',
      answer: 'Regnskap handler om å registrere det som har skjedd. Rådgivning handler om å planlegge fremtiden og ta strategiske beslutninger. Vi tilbyr begge deler.'
    },
    {
      question: 'Kan dere hjelpe med Sametinget-søknader?',
      answer: 'Ja, vi har omfattende erfaring med søknader til Sametinget. Vi hjelper med å finne riktig ordning, skrive søknaden og følge opp underveis.'
    },
    {
      question: 'Hva koster rådgivning?',
      answer: 'Det avhenger av omfanget. Vi tilbyr både timebasert fakturering og fastprisavtaler for løpende rådgivning. Kontakt oss for et skreddersydd tilbud.'
    },
    {
      question: 'Hvor ofte bør vi ha rådgivningsmøter?',
      answer: 'Det varierer. Noen bedrifter trenger månedlige møter, andre kvartalsvis. Vi tilpasser oss dine behov og bedriftens situasjon.'
    },
    {
      question: 'Kan dere hjelpe med å søke om lån?',
      answer: 'Vi kan hjelpe med å forberede søknaden, lage budsjetter og prognoser, og gi råd om hvilke banker eller støtteordninger som passer best.'
    },
    {
      question: 'Hva er tiltakssonen?',
      answer: 'Tiltakssonen er Finnmark og deler av Nord-Troms, hvor bedrifter får særskilte skattefordeler som 0% arbeidsgiveravgift og Finnmarksfradrag.'
    }
  ];

  return (
    <main className="flex-1">
      
      {/* Hero Section */}
      <ServiceHero
        title="Rådgivning"
        subtitle="Strategisk sparringspartner for vekst"
        description="Bruk oss som din strategiske sparringspartner. Vi hjelper deg med budsjett, likviditetsstyring og verdivurdering, slik at du kan ta trygge valg for fremtiden. Med vår lokale forankring og kunnskap om støtteordninger, åpner vi dører du ikke visste eksisterte."
        stats={{ value: '∞', label: 'muligheter' }}
        ctaText="Få et tilbud"
        ctaLink="#contact"
        heroImage={HeroImage}
        heroImageAlt="Rådgivning – Averdi"
      />

      {/* Overview Section */}
      <ServiceOverview
        title="Hva vi gjør"
        description="Vi tilbyr strategisk rådgivning tilpasset nordnorske bedrifter. Fra budsjett og likviditetsstyring til støtteordninger og vekststrategier, vi er din partner for langsiktig suksess."
        benefits={[
          'Budsjett og prognoser - Realistiske planer for fremtiden',
          'Likviditetsstyring - Sikre at pengene strekker til',
          'Støtteordninger - Sametinget, Innovasjon Norge og mer',
          'Strategisk planlegging - Vekst, salg eller generasjonsskifte'
        ]}
      />

      {/* Features Grid */}
      <ServiceFeatureGrid
        title="Våre tjenester"
        features={features}
      />

      {/* Process Section */}
      <ServiceProcess
        title="Slik jobber vi"
        steps={processSteps}
      />

      {/* Why Averdi Section */}
      <ServiceWhyAverdi
        points={whyPoints}
      />

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Ofte stilte spørsmål
            </h2>
          </div>
          <FaqAccordion items={faqItems} />
        </div>
      </section>

      {/* CTA Section */}
      <ServiceCTA
        title="Klar for strategisk vekst?"
        description="La oss ta en uforpliktende prat om hvordan vi kan hjelpe din bedrift."
        primaryCTA={{
          text: 'Kontakt oss',
          link: '/#contact'
        }}
        secondaryCTA={{
          text: 'Se våre andre tjenester',
          link: '/#services'
        }}
      />

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            'serviceType': 'Strategisk rådgivning',
            'provider': {
              '@type': 'Organization',
              'name': 'Averdi AS',
              'url': 'https://averdi.no'
            },
            'areaServed': 'Nord-Norge',
            'description': 'Strategisk rådgivning for nordnorske bedrifter med ekspertise på støtteordninger, tiltakssonen og langsiktig vekst.'
          })
        }}
      />
    </main>
  );
}
