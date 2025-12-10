import Hero from '@/components/modules/home/Hero';
// We will migrate these components in the next steps:
import TrustStrip from '@/components/modules/home/TrustStrip';
import Services from '@/components/modules/home/Services';
 import SalesPitch from '@/components/modules/home/SalesPitch';
 import KunnskapsbankTeaser from '@/components/modules/home/KunnskapsbankTeaser';
 import ContactPanel from '@/components/modules/home/ContactPanel';

export default function HomePage() {
  
  // JSON-LD Structured Data for Local Business / Professional Service
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
    'priceRange': '$$',
    'areaServed': ['Finnmark', 'Troms', 'Nord-Norge'],
    'founder': {
      '@type': 'Person',
      'name': 'Ingvald Laiti'
    },
    'knowsAbout': [
      'Regnskap',
      'Lønn',
      'Tiltakssonen',
      'Sametinget tilskudd',
      'Frivillige organisasjoner'
    ]
  };

  return (
    <main className="flex-1">
      {/* Inject Schema for AI/SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <Hero />
      <TrustStrip />
      <Services />
      <SalesPitch />
      <KunnskapsbankTeaser />
      <ContactPanel />

      {/* Placeholders for upcoming sections */}
      <div className="py-20 text-center text-slate-400 bg-white">
        TrustStrip Loading...
      </div>
      <div className="py-20 text-center text-slate-400">
        Services Loading...
      </div>
      <div className="py-20 text-center text-slate-400">
        SalesPitch Loading...
      </div>
      {/* CSS Loading Test - Remove this after verification */}
      <div className="fixed bottom-4 right-4 p-3 bg-averdi-orange text-white rounded shadow-lg">
        <p className="text-sm font-bold">CSS Working!</p>
        <p className="text-xs">Tailwind + Custom CSS Loaded</p>
      </div>
    </main>
  );
}