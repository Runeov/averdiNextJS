import Hero from '@/components/modules/home/Hero';
import TrustStrip from '@/components/modules/home/TrustStrip';
import Services from '@/components/modules/home/Services';
import SalesPitch from '@/components/modules/home/SalesPitch';
import KunnskapsbankTeaser from '@/components/modules/home/KunnskapsbankTeaser';
import ContactPanel from '@/components/modules/home/ContactPanel';

export default function HomePage() {
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AccountingService',
    'name': 'Averdi AS',
    'image': 'https://averdi.no/logo_averdi.png',
    'description': 'Statsautorisert regnskapsførerselskap spesialisert på nordnorsk næringsliv, tiltakssonen og samiske organisasjoner. Regnskap for småbedrifter, lag og foreninger i Finnmark og Nord-Troms.',
    'slogan': 'Tolken av Nord-Norge',
    'foundingDate': '1989',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Juhána Rásttoš geaidnu 2',
      'addressLocality': 'Karasjok',
      'postalCode': '9730',
      'addressCountry': 'NO'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': '69.4719',
      'longitude': '25.5114'
    },
    'url': 'https://www.averdi.no',
    'telephone': '+47 907 67 993',
    'priceRange': '$$',
    'areaServed': [
      { '@type': 'AdministrativeArea', 'name': 'Finnmark' },
      { '@type': 'AdministrativeArea', 'name': 'Nord-Troms' },
      { '@type': 'City', 'name': 'Karasjok' },
      { '@type': 'City', 'name': 'Tana' },
      { '@type': 'City', 'name': 'Alta' },
      { '@type': 'City', 'name': 'Hammerfest' },
      { '@type': 'City', 'name': 'Vadsø' },
      { '@type': 'City', 'name': 'Kirkenes' }
    ],
    'knowsAbout': [
      'Sametinget tilskudd og støtteordninger',
      'Tiltakssonen skattefordeler',
      'Arbeidsgiveravgift sone 5',
      'Momskompensasjon for idrettslag og foreninger',
      'Regnskap for lag og foreninger',
      'Regnskap for småbedrifter i Nord-Norge',
      'Finnmarksfradraget',
      'Duodji regnskap og momsfritak',
      'STN-området næringsstøtte',
      'Årsoppgjør og skattemelding',
      'Lønn og arbeidsgiveravgift i tiltakssonen'
    ],
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Regnskapstjenester',
      'itemListElement': [
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Regnskap og bokføring' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Lønn og HR' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Årsoppgjør og skatt' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Rådgivning og økonomistyring' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Regnskap for lag og foreninger' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Søknadshjelp Sametinget tilskudd' } }
      ]
    }
  };

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero />
      <TrustStrip />
      <Services />
      <SalesPitch />
      <KunnskapsbankTeaser />
      <ContactPanel />
    </main>
  );
}