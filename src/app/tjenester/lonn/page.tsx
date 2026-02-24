import { Metadata } from 'next';
import { FileCheck, Receipt, Heart, TrendingDown, MapPin, Zap, Users } from 'lucide-react';
import HeroImage from '@/assets/Hero_Aarsoppgjor.avif';
import { ServiceHero } from '@/components/modules/services/ServiceHero';
import { ServiceOverview } from '@/components/modules/services/ServiceOverview';
import { ServiceFeatureGrid, type ServiceFeature } from '@/components/modules/services/ServiceFeatureGrid';
import { ServiceProcess, type ProcessStep } from '@/components/modules/services/ServiceProcess';
import { ServiceWhyAverdi, type WhyPoint } from '@/components/modules/services/ServiceWhyAverdi';
import { FaqAccordion, type FaqItem } from '@/components/ui/FaqAccordion';
import { ServiceCTA } from '@/components/modules/services/ServiceCTA';

export const metadata: Metadata = {
  title: 'Lønn & HR | Averdi - Lønnstjenester i Nord-Norge',
  description: 'Korrekt lønn til rett tid – hver gang. Ekspertise på tiltakssonen og redusert arbeidsgiveravgift. Kontakt oss for tilbud.',
  keywords: 'lønn, lønnskjøring, a-melding, arbeidsgiveravgift, tiltakssonen, nordnorge, finnmark',
};

export default function LonnPage() {
  
  // Features data
  const features: ServiceFeature[] = [
    {
      title: 'A-melding og lønnsrapportering',
      description: 'Korrekt rapportering til Skatteetaten og NAV. Vi sørger for at alt er riktig første gang.',
      icon: <FileCheck className="w-6 h-6" aria-hidden="true" />
    },
    {
      title: 'Reiseregninger og utlegg',
      description: 'Håndtering av reiseregninger, diett og utlegg i henhold til gjeldende satser.',
      icon: <Receipt className="w-6 h-6" aria-hidden="true" />
    },
    {
      title: 'Sykepenger og refusjoner',
      description: 'Beregning og søknad om refusjon fra NAV for sykepenger og foreldrepenger.',
      icon: <Heart className="w-6 h-6" aria-hidden="true" />
    },
    {
      title: 'Redusert arbeidsgiveravgift',
      description: 'Ekspertise på tiltakssonen med 0% arbeidsgiveravgift i Finnmark og Nord-Troms.',
      icon: <TrendingDown className="w-6 h-6" aria-hidden="true" />
    }
  ];

  // Process steps
  const processSteps: ProcessStep[] = [
    {
      number: '1',
      title: 'Oppsett',
      description: 'Vi setter opp lønnssystemet og registrerer alle ansatte med korrekte data.'
    },
    {
      number: '2',
      title: 'Månedlig kjøring',
      description: 'Du sender oss timedata og fravær. Vi kjører lønn og sender lønnslipper.'
    },
    {
      number: '3',
      title: 'Rapportering',
      description: 'Vi sender A-melding til myndighetene og håndterer alle refusjoner.'
    }
  ];

  // Why Averdi points
  const whyPoints: WhyPoint[] = [
    {
      title: 'Kjenner særreglene',
      description: 'Vi har dyp kunnskap om tiltakssonen og hvordan du maksimerer fordelene.',
      icon: <MapPin className="w-7 h-7" aria-hidden="true" />
    },
    {
      title: 'Automatisert lønnskjøring',
      description: 'Moderne systemer som sikrer presisjon og effektivitet hver måned.',
      icon: <Zap className="w-7 h-7" aria-hidden="true" />
    },
    {
      title: 'Personlig oppfølging',
      description: 'Fast kontaktperson som kjenner din bedrift og dine ansatte.',
      icon: <Users className="w-7 h-7" aria-hidden="true" />
    }
  ];

  // FAQ items
  const faqItems: FaqItem[] = [
    {
      question: 'Hva koster lønnstjenester?',
      answer: 'Prisen avhenger av antall ansatte og kompleksitet. Vi tilbyr fastpris per ansatt per måned for forutsigbarhet. Kontakt oss for et skreddersydd tilbud.'
    },
    {
      question: 'Hvor raskt kan dere starte?',
      answer: 'Vi kan normalt starte fra neste lønnskjøring. Vi trenger noen dager til oppsett og dataoverføring fra eventuell tidligere leverandør.'
    },
    {
      question: 'Håndterer dere sykepenger?',
      answer: 'Ja, vi beregner sykepenger korrekt og søker refusjon fra NAV på vegne av bedriften. Vi følger opp alle refusjonskrav.'
    },
    {
      question: 'Hva med feriepenger?',
      answer: 'Vi beregner og avsetter feriepenger løpende, og utbetaler dem i henhold til ferieloven. Du får full oversikt over avsetninger.'
    },
    {
      question: 'Kan dere hjelpe med ansettelseskontrakter?',
      answer: 'Vi kan gi råd om lønnsvilkår og standardkontrakter, men anbefaler juridisk bistand for komplekse avtaler.'
    },
    {
      question: 'Hva er fordelen med 0% arbeidsgiveravgift?',
      answer: 'I tiltakssonen (Finnmark og deler av Troms) er arbeidsgiveravgiften 0% mot 14,1% i Oslo. Dette gir betydelig besparelse på lønnskostnader.'
    }
  ];

  return (
    <main className="flex-1">
      
      {/* Hero Section */}
      <ServiceHero
        title="Lønn & HR"
        subtitle="Korrekt lønn til rett tid – hver gang"
        description="Vi håndterer alt det praktiske rundt lønn, fra A-melding og reiseregninger til sykepenger og arbeidsgiveravgift. Dine ansatte får riktig lønn til riktig tid, og du får ro i sjela."
        stats={{ value: '100%', label: 'presisjon' }}
        ctaText="Få et tilbud"
        ctaLink="#contact"
        heroImage={HeroImage}
        heroImageAlt="Lønn & HR – Averdi"
      />

      {/* Overview Section */}
      <ServiceOverview
        title="Hva vi gjør"
        description="Vi tilbyr komplett lønnstjeneste tilpasset nordnorske bedrifter. Med vår ekspertise på tiltakssonen og redusert arbeidsgiveravgift, sikrer vi at du får maksimalt ut av de fordelene som finnes i regionen."
        benefits={[
          'Automatisert lønnskjøring - Presisjon og effektivitet hver måned',
          'A-melding og rapportering - Alt håndteres korrekt til myndighetene',
          'Refusjonshåndtering - Vi søker om sykepenger og foreldrepenger',
          'Tiltakssone-ekspertise - Maksimer fordelene med 0% arbeidsgiveravgift'
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
        title="Klar for enklere lønnskjøring?"
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
            'serviceType': 'Lønnstjenester',
            'provider': {
              '@type': 'Organization',
              'name': 'Averdi AS',
              'url': 'https://averdi.no'
            },
            'areaServed': 'Nord-Norge',
            'description': 'Komplett lønnstjeneste for nordnorske bedrifter med ekspertise på tiltakssonen og redusert arbeidsgiveravgift.'
          })
        }}
      />
    </main>
  );
}
