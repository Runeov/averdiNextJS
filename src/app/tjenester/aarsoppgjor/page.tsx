import { Metadata } from 'next';
import { FileText, Calculator, TrendingUp, Award, MapPin, Zap, Users } from 'lucide-react';
import HeroImage from '@/assets/Hero_Aarsoppgjor.avif';
import { ServiceHero } from '@/components/modules/services/ServiceHero';
import { ServiceOverview } from '@/components/modules/services/ServiceOverview';
import { ServiceFeatureGrid, type ServiceFeature } from '@/components/modules/services/ServiceFeatureGrid';
import { ServiceProcess, type ProcessStep } from '@/components/modules/services/ServiceProcess';
import { ServiceWhyAverdi, type WhyPoint } from '@/components/modules/services/ServiceWhyAverdi';
import { FaqAccordion, type FaqItem } from '@/components/ui/FaqAccordion';
import { ServiceCTA } from '@/components/modules/services/ServiceCTA';

export const metadata: Metadata = {
  title: 'Årsoppgjør & Skatt | Averdi - Skattetjenester i Nord-Norge',
  description: 'Trygg avslutning av regnskapsåret med ekspertise på tiltakssonen. Skatteoptimalisering og maksimering av fradrag. Kontakt oss for tilbud.',
  keywords: 'årsoppgjør, skattemelding, skatteoptimalisering, finnmarksfradrag, tiltakssonen, nordnorge',
};

export default function AarsoppgjorPage() {
  
  // Features data
  const features: ServiceFeature[] = [
    {
      title: 'Årsregnskap og noter',
      description: 'Komplett årsregnskap i henhold til regnskapsloven med alle nødvendige noter.',
      icon: <FileText className="w-6 h-6" aria-hidden="true" />
    },
    {
      title: 'Skattemelding for næringsdrivende',
      description: 'Korrekt utfylling og innlevering av skattemelding for bedrifter og enkeltpersonforetak.',
      icon: <Calculator className="w-6 h-6" aria-hidden="true" />
    },
    {
      title: 'Skatteoptimalisering og fradrag',
      description: 'Vi sikrer at du får alle fradrag du har krav på, inkludert Finnmarksfradraget.',
      icon: <TrendingUp className="w-6 h-6" aria-hidden="true" />
    },
    {
      title: 'Særskilte ordninger for tiltakssonen',
      description: 'Ekspertise på de unike skattefordelene i Finnmark og Nord-Troms.',
      icon: <Award className="w-6 h-6" aria-hidden="true" />
    }
  ];

  // Process steps
  const processSteps: ProcessStep[] = [
    {
      number: '1',
      title: 'Forberedelse',
      description: 'Vi gjennomgår regnskapet og sikrer at alt er korrekt før årsavslutning.'
    },
    {
      number: '2',
      title: 'Årsoppgjør',
      description: 'Vi utarbeider årsregnskap med noter og kontrollerer alle tall.'
    },
    {
      number: '3',
      title: 'Skattemelding',
      description: 'Vi fyller ut og leverer skattemelding, og maksimerer alle fradrag.'
    }
  ];

  // Why Averdi points
  const whyPoints: WhyPoint[] = [
    {
      title: 'Ekspertise på tiltakssonen',
      description: 'Vi kjenner alle særordninger og sikrer at du får maksimalt ut av fordelene.',
      icon: <MapPin className="w-7 h-7" aria-hidden="true" />
    },
    {
      title: 'Maksimerer fradrag',
      description: 'Vi finner alle fradrag du har krav på, inkludert Finnmarksfradraget.',
      icon: <Zap className="w-7 h-7" aria-hidden="true" />
    },
    {
      title: 'Rettidig innlevering',
      description: 'Vi holder alle frister og sikrer at alt leveres korrekt første gang.',
      icon: <Users className="w-7 h-7" aria-hidden="true" />
    }
  ];

  // FAQ items
  const faqItems: FaqItem[] = [
    {
      question: 'Når må årsoppgjøret leveres?',
      answer: 'Årsregnskapet må leveres til Regnskapsregisteret innen 7 måneder etter regnskapsårets slutt. For kalenderår betyr det 31. juli. Skattemeldingen har frist 31. mai.'
    },
    {
      question: 'Hva er forskjellen på årsregnskap og skattemelding?',
      answer: 'Årsregnskapet viser bedriftens økonomiske stilling og resultat etter regnskapsloven. Skattemeldingen beregner skattepliktig inntekt etter skatteloven. Vi håndterer begge deler.'
    },
    {
      question: 'Kan dere hjelpe med skatteplanlegging?',
      answer: 'Ja, vi tilbyr proaktiv skatteplanlegging gjennom året. Vi hjelper deg med å ta beslutninger som optimaliserer skatten din lovlig.'
    },
    {
      question: 'Hva med revisjonsplikt?',
      answer: 'De fleste små bedrifter er fritatt for revisjonsplikt. Vi kan vurdere om din bedrift må ha revisor, og hjelpe med å finne en hvis nødvendig.'
    },
    {
      question: 'Hva er Finnmarksfradraget?',
      answer: 'Finnmarksfradraget er et særfradrag for personer bosatt i Finnmark og Nord-Troms. For 2026 er forslaget 45 000 kr, som gir betydelig skattelette.'
    },
    {
      question: 'Kan dere hjelpe med å rette feil i tidligere årsoppgjør?',
      answer: 'Ja, vi kan hjelpe med å korrigere feil i tidligere innleverte årsregnskap og skattemeldinger.'
    }
  ];

  return (
    <main className="flex-1">
      
      {/* Hero Section */}
      <ServiceHero
        title="Årsoppgjør & Skatt"
        subtitle="Trygg avslutning av regnskapsåret"
        description="Vi sørger for at årsoppgjøret blir korrekt og levert i tide. Med vår ekspertise på tiltakssonen og skatteoptimalisering, sikrer vi at du får maksimalt ut av alle fradrag og fordeler."
        stats={{ value: '0', label: 'forsinkelser' }}
        ctaText="Få et tilbud"
        ctaLink="#contact"
        heroImage={HeroImage}
        heroImageAlt="Årsoppgjør & Skatt – Averdi"
      />

      {/* Overview Section */}
      <ServiceOverview
        title="Hva vi gjør"
        description="Vi tilbyr komplett årsoppgjør og skattetjenester tilpasset nordnorske bedrifter. Fra årsregnskap til skattemelding, vi håndterer alt det praktiske og sikrer at du får alle fradrag du har krav på."
        benefits={[
          'Komplett årsregnskap - I henhold til regnskapsloven med alle noter',
          'Skattemelding - Korrekt utfylling og rettidig innlevering',
          'Skatteoptimalisering - Maksimerer alle fradrag lovlig',
          'Tiltakssone-fordeler - Finnmarksfradrag og andre særordninger'
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
        title="Klar for trygt årsoppgjør?"
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
            'serviceType': 'Årsoppgjør og Skattetjenester',
            'provider': {
              '@type': 'Organization',
              'name': 'Averdi AS',
              'url': 'https://averdi.no'
            },
            'areaServed': 'Nord-Norge',
            'description': 'Komplett årsoppgjør og skattetjenester for nordnorske bedrifter med ekspertise på tiltakssonen og skatteoptimalisering.'
          })
        }}
      />
    </main>
  );
}
