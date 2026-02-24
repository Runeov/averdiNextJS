import { Metadata } from 'next';
import { getSortedEmployees } from '@/lib/admin/employees';
import AboutHero from '@/components/modules/about/AboutHero';
import CompanyStory from '@/components/modules/about/CompanyStory';
import TeamSectionModern from '@/components/modules/about/TeamSectionModern';
import CompanyValues from '@/components/modules/about/CompanyValues';
import ContactPanel from '@/components/modules/home/ContactPanel';

export const metadata: Metadata = {
  title: 'Om oss | Averdi AS - Tolken av Nord-Norge',
  description: 'Møt teamet bak Averdi. Statsautoriserte regnskapsførere med over 30 års erfaring i Finnmark. Vi er din partner for trygg økonomistyring.',
  openGraph: {
    title: 'Om oss | Averdi AS',
    description: 'Møt teamet bak Averdi. Statsautoriserte regnskapsførere med over 30 års erfaring i Finnmark.',
    type: 'website',
  },
};

export default async function OmOssPage() {
  const employees = await getSortedEmployees();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    'name': 'Om Averdi AS',
    'description': 'Statsautorisert regnskapsførerselskap etablert i 1989, spesialisert på nordnorsk næringsliv og samiske organisasjoner.',
    'url': 'https://averdi.no/om-oss',
    'mainEntity': {
      '@type': 'AccountingService',
      'name': 'Averdi AS',
      'foundingDate': '1989',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Juhána Rásttoš geaidnu 2',
        'addressLocality': 'Karasjok',
        'postalCode': '9730',
        'addressCountry': 'NO'
      },
      'telephone': '+47 907 67 993',
      'areaServed': ['Finnmark', 'Troms', 'Nord-Norge']
    }
  };

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <AboutHero />
      <CompanyStory />
      <CompanyValues />
      <TeamSectionModern employees={employees} />
      <ContactPanel />
    </main>
  );
}
