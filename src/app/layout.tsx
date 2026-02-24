import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../index.css';
import { cn } from '@/lib/utils';
import { RootLayoutContent } from '@/components/layout/RootLayoutContent';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: {
    template: '%s | Averdi',
    default: 'Averdi - Statsautorisert regnskapsførerselskap i Nord-Norge',
  },
  description: 'Averdi er et statsautorisert regnskapsførerselskap med base i Karasjok...',
  icons: {
    icon: '/logo_thumbail.avif',
    shortcut: '/logo_thumbail.avif',
    apple: '/logo_thumbail.avif',
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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:border-2 focus:border-black focus:rounded focus:shadow-lg"
        >
          Hopp til hovedinnhold
        </a>
        {/* Content with conditional Navbar/Footer */}
        <RootLayoutContent>{children}</RootLayoutContent>
      </body>
    </html>
  );
}