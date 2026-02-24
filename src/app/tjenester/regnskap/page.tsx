import { Metadata } from 'next';
import { FileText, Receipt, CreditCard, Cloud, MapPin, Zap, Users, Leaf, ChevronDown } from 'lucide-react';
import { ServiceHero } from '@/components/modules/services/ServiceHero';
import heroImage from '@/assets/Hero_Tjenester.avif';
import { ServiceOverview } from '@/components/modules/services/ServiceOverview';
import { ServiceFeatureGrid, type ServiceFeature } from '@/components/modules/services/ServiceFeatureGrid';
import { ServiceProcess, type ProcessStep } from '@/components/modules/services/ServiceProcess';
import { ServiceWhyAverdi, type WhyPoint } from '@/components/modules/services/ServiceWhyAverdi';
import { FaqAccordion, type FaqItem } from '@/components/ui/FaqAccordion';
import { ServiceCTA } from '@/components/modules/services/ServiceCTA';

export const metadata: Metadata = {
  title: 'Regnskap | Averdi - Regnskapstjenester i Nord-Norge',
  description: 'Moderne skybasert regnskap for nordnorske bedrifter. 35+ års erfaring. PowerOffice Go. Kontakt oss for tilbud.',
  keywords: 'regnskap, bokføring, nordnorge, finnmark, poweroffice, skybasert regnskap',
};

export default function RegnskapPage() {
  
  // Features data
  const features: ServiceFeature[] = [
    {
      title: 'Løpende bokføring',
      description: 'Daglig/ukentlig oppdatering med automatisk kategorisering og bilagsarkiv i skyen.',
      icon: <FileText className="w-6 h-6" />
    },
    {
      title: 'Momsrapportering',
      description: 'Korrekt beregning, rettidig innlevering og håndtering av refusjoner.',
      icon: <Receipt className="w-6 h-6" />
    },
    {
      title: 'Fakturering',
      description: 'Profesjonelle fakturaer med automatisk purring og kundeoppfølging.',
      icon: <CreditCard className="w-6 h-6" />
    },
    {
      title: 'Skybaserte løsninger',
      description: 'PowerOffice Go med sanntidsrapporter og mobiltilgang.',
      icon: <Cloud className="w-6 h-6" />
    }
  ];

  // Process steps
  const processSteps: ProcessStep[] = [
    {
      number: '1',
      title: 'Oppstart',
      description: 'Kartlegging av behov, oppsett av systemer og opplæring i verktøy.'
    },
    {
      number: '2',
      title: 'Løpende drift',
      description: 'Du sender bilag, vi bokfører og rapporterer. Du får månedlige rapporter.'
    },
    {
      number: '3',
      title: 'Årsavslutning',
      description: 'Årsoppgjør, skattemelding og planlegging for neste år.'
    }
  ];

  // Why Averdi points
  const whyPoints: WhyPoint[] = [
    {
      title: 'Nordnorsk ekspertise',
      description: 'Vi kjenner tiltakssonen, forstår lokale utfordringer og snakker ditt språk.',
      icon: <MapPin className="w-7 h-7" />
    },
    {
      title: 'Moderne teknologi',
      description: 'Skybaserte løsninger med automatisering og sanntidsrapporter.',
      icon: <Zap className="w-7 h-7" />
    },
    {
      title: 'Personlig service',
      description: 'Fast kontaktperson, rask respons og proaktiv rådgivning.',
      icon: <Users className="w-7 h-7" />
    }
  ];

  // FAQ items
  const faqItems: FaqItem[] = [
    {
      question: 'Hva koster regnskapstjenester?',
      answer: 'Prisen avhenger av omfang og kompleksitet. Vi tilbyr fastprisavtaler for forutsigbarhet. Kontakt oss for et skreddersydd tilbud basert på dine behov.'
    },
    {
      question: 'Hvor ofte må jeg sende bilag?',
      answer: 'Så ofte du vil! Vi anbefaler ukentlig eller månedlig for best oversikt. Med våre skybaserte løsninger kan du sende bilag på e-post eller via app når det passer deg.'
    },
    {
      question: 'Kan jeg bytte fra min nåværende regnskapsfører?',
      answer: 'Ja, vi håndterer hele overgangen smidig og trygt. Vi tar kontakt med din nåværende regnskapsfører og sørger for at alt overføres korrekt.'
    },
    {
      question: 'Hvilke systemer bruker dere?',
      answer: 'Vi bruker PowerOffice Go, som er markedsledende i Norge. Systemet er skybasert, brukervennlig og gir deg full oversikt over økonomien din.'
    },
    {
      question: 'Får jeg tilgang til tallene mine?',
      answer: 'Ja, du har full tilgang til sanntidsrapporter via nettleser eller app. Du kan når som helst se status på økonomi, faktura og bilag.'
    },
    {
      question: 'Hva skjer hvis jeg glemmer en frist?',
      answer: 'Vi varsler deg i god tid og sørger for at alt leveres riktig. Vi holder oversikt over alle frister for moms, skatt og årsoppgjør.'
    }
  ];

  return (
    <main className="flex-1">
      
      {/* Hero Section */}
      <ServiceHero
        title="Regnskap"
        subtitle="Sanntidsoversikt i PowerOffice Go – Norges mest fornøyde kunder"
        description="Vi tar oss av bilagene og holder orden på fristene, så du kan bruke tiden på å drive butikken. Med vår erfaring fra nordnorsk næringsliv forstår vi de unike utfordringene og mulighetene i regionen."
        stats={{ value: '35+', label: 'års erfaring' }}
        ctaText="Få et tilbud"
        ctaLink="#contact"
        heroImage={heroImage}
        heroImageAlt="Averdi regnskapstjenester i Nord-Norge"
      />

      {/* Overview Section */}
      <ServiceOverview
        title="Hva vi gjør"
        description="Vi tilbyr komplett regnskapstjeneste tilpasset nordnorske bedrifter. Fra løpende bokføring til årsoppgjør, vi håndterer alt det praktiske mens du fokuserer på det du er best på."
        benefits={[
          'Skybasert tilgang - Se tallene dine når som helst, hvor som helst',
          'Automatisk bilagshåndtering - Send bilag på e-post eller via app',
          'Proaktiv rådgivning - Vi varsler deg om frister og muligheter',
          'Lokal forankring - Vi forstår nordnorsk næringsliv'
        ]}
      />

      {/* Features Grid */}
      <ServiceFeatureGrid
        title="Våre tjenester"
        features={features}
      />

      {/* Expandable PowerOffice Go Section – takes almost no space when closed */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <details className="group">
            <summary className="cursor-pointer list-none flex items-center justify-between bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:border-emerald-200 transition-all">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Cloud className="w-9 h-9" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 bg-emerald-50 px-4 py-1.5 rounded-full text-sm font-medium text-emerald-700">
                    ⭐ Norges best ratede regnskapssystem
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 mt-3">PowerOffice Go – alt på ett sted</h2>
                  <p className="text-slate-600 mt-1 max-w-md">Klikk for å se alle funksjoner: sanntidsoversikt, mobilapp, automatisk moms, direkte bank og ny bærekraftsrapportering</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-emerald-600 group-open:rotate-180 transition-transform duration-300">
                <span className="font-medium text-sm whitespace-nowrap">Les mer</span>
                <ChevronDown className="w-6 h-6" />
              </div>
            </summary>

            {/* Expanded content – only visible when opened */}
            <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mb-6">
                  <Zap className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Sanntids dashboard</h3>
                <p className="text-slate-600">Tilpasset oversikt som oppdateres live. Se likviditet, lønnsomhet og cash-flow når som helst – på mobil eller desktop.</p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mb-6">
                  <Cloud className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Mobilapp med foto-bilag</h3>
                <p className="text-slate-600">Ta bilde av kvittering → automatisk bokføring. Godkjenn fakturaer og reiseregninger rett fra telefonen.</p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mb-6">
                  <Receipt className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Automatisk moms & årsoppgjør</h3>
                <p className="text-slate-600">Direkte innsending til Altinn. Vi holder oversikt over alle frister – du får varsler i god tid.</p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mb-6">
                  <CreditCard className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Direkte bankbetaling</h3>
                <p className="text-slate-600">Betal leverandører uten å logge inn i nettbank. Automatisk avstemming med alle norske banker.</p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mb-6">
                  <Leaf className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Bærekraftsrapportering 2026</h3>
                <p className="text-slate-600">Automatisk klimarapport hentet direkte fra regnskap, reiser og timer – klar for Miljøfyrtårn, banker og anbud.</p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mb-6">
                  <Users className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Fast Averdi-kontakt</h3>
                <p className="text-slate-600">En dedikert regnskapsfører som kjenner din bedrift og nordnorske forhold. Proaktiv rådgivning inkludert.</p>
              </div>
            </div>

            <div className="text-center mt-12 text-sm text-slate-500">
              PowerOffice Go • Sertifisert partner • 95 000+ fornøyde brukere
            </div>
          </details>
        </div>
      </section>

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
        title="Klar for bedre regnskap?"
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
            'serviceType': 'Regnskapstjenester',
            'provider': {
              '@type': 'Organization',
              'name': 'Averdi AS',
              'url': 'https://averdi.no'
            },
            'areaServed': 'Nord-Norge',
            'description': 'Komplett regnskapstjeneste for nordnorske bedrifter med skybaserte løsninger og personlig oppfølging.'
          })
        }}
      />
    </main>
  );
}