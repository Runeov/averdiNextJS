import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../index.css'; // Utilizing your existing Tailwind setup
import { cn } from '@/lib/utils'; // Assuming you have your utils from previous uploads

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: {
    template: '%s | Averdi',
    default: 'Averdi - Statsautorisert regnskapsførerselskap i Nord-Norge',
  },
  description: 'Averdi er et statsautorisert regnskapsførerselskap med base i Karasjok. Vi hjelper organisasjoner, småbedrifter og handel i Tiltakssonen med regnskap, lønn og økonomisk rådgivning.',
  keywords: ['regnskapsfører', 'Finnmark', 'Karasjok', 'tiltakssonen', 'lønn', 'årsoppgjør', 'sametinget tilskudd'],
  openGraph: {
    type: 'website',
    locale: 'nb_NO',
    url: 'https://averdi.no',
    siteName: 'Averdi',
    images: [
      {
        url: '/logo_thumbail.avif', // Ensure this exists in public/
        width: 1200,
        height: 630,
        alt: 'Averdi - Trygg økonomistyring',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nb" className="scroll-smooth">
      <body className={cn(inter.variable, "font-sans antialiased bg-slate-50 text-slate-900 min-h-screen flex flex-col")}>
        {children}
      </body>
    </html>
  );
}