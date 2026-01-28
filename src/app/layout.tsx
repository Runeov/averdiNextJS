import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hotjar } from '@/components/analytics/Hotjar';
import '../index.css'; 
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// Hotjar Site ID - Replace with your actual Site ID from https://insights.hotjar.com/site/list
const HOTJAR_SITE_ID = process.env.NEXT_PUBLIC_HOTJAR_ID || '';

export const metadata: Metadata = {
  title: {
    template: '%s | Averdi',
    default: 'Averdi - Statsautorisert regnskapsførerselskap i Nord-Norge',
  },
  description: 'Averdi er et statsautorisert regnskapsførerselskap med base i Karasjok...',
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
        
        {/* ✅ Navbar her = Vises på ALLE sider */}
        <Navbar />
        
        {/* Selve sideinnholdet */}
        {children}
        
        {/* ✅ Footer her = Vises på ALLE sider */}
        <Footer />
      </body>
    </html>
  );
}