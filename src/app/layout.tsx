import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Hotjar } from '@/components/analytics/Hotjar';
import '../index.css'; 
import { cn } from '@/lib/utils';
import { RootLayoutContent } from '@/components/layout/RootLayoutContent';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// Hotjar Site ID - Replace with your actual Site ID from https://insights.hotjar.com/site/list
const HOTJAR_SITE_ID = process.env.NEXT_PUBLIC_HOTJAR_ID || '';

export const metadata: Metadata = {
  title: {
    template: '%s | Averdi',
    default: 'Averdi - Statsautorisert regnskapsførerselskap i Nord-Norge',
  },
  description: 'Averdi er et statsautorisert regnskapsførerselskap med base i Karasjok...',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
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
        {/* Analytics */}
        <Hotjar hjid={HOTJAR_SITE_ID} />
        
        {/* Content with conditional Navbar/Footer */}
        <RootLayoutContent>{children}</RootLayoutContent>
      </body>
    </html>
  );
}