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
    'description': 'Statsautorisert regnskapsførerselskap spesialisert på nordnorsk næringsliv, tiltakssonen og samiske organisasjoner.',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Postboks 44',
      'addressLocality': 'Karasjok',
      'postalCode': '9730',
      'addressCountry': 'NO'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': '69.4719',
      'longitude': '25.5114'
    },
    'url': 'https://averdi.no',
    'telephone': '+47 907 67 993',
    'areaServed': ['Finnmark', 'Troms', 'Nord-Norge']
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