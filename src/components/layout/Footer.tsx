'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowUp } from 'lucide-react';
import logoAverdi from '@/assets/logo_averdi.avif';

export function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  const scrollToSection = (sectionId: string) => {
    if (pathname !== '/') {
      router.push(`/#${sectionId}`);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const navbarHeight = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - navbarHeight;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-50 pt-16 pb-8 border-t border-slate-200">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div>
              <Image src={logoAverdi} alt="Averdi Logo" height={60} className="w-auto opacity-90" />
            </div>
            <p className="text-slate-500 leading-relaxed max-w-sm text-base">
              Statsautorisert regnskapsførerselskap som hjelper organisasjoner, småbedrifter og handel med
              regnskap, lønn og økonomisk rådgivning siden 1989.
            </p>
            <div className="flex flex-col gap-1 text-sm text-slate-400">
              <p>Org.nr: 980 383 571</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <p>Godkjent av Finanstilsynet</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-slate-900 mb-6 text-lg">Hurtiglenker</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li>
                <button onClick={() => scrollToSection('home')} className="hover:text-[#E86C1F] transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-[#E86C1F] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Hjem
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services')} className="hover:text-[#E86C1F] transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-[#E86C1F] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Tjenester
                </button>
              </li>
              <li>
                <Link href="/om-oss" className="hover:text-[#E86C1F] transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-[#E86C1F] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Om oss
                </Link>
              </li>
              <li>
                <Link href="/kunnskapsbank" className="hover:text-[#E86C1F] transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-[#E86C1F] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Kunnskapsbank
                </Link>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} className="hover:text-[#E86C1F] transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-[#E86C1F] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Kontakt
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-slate-900 mb-6 text-lg">Kontakt</h4>
            <div className="space-y-6 text-sm text-slate-500">
              <div className="space-y-2">
                <p className="font-semibold text-slate-900 text-base">Karasjok</p>
                <div className="flex flex-col gap-1">
                  <p>Hovedgata 15</p>
                  <p>9730 Karasjok</p>
                </div>
                <div className="pt-2">
                  <a href="tel:+4790767993" className="text-[#E86C1F] font-medium hover:text-[#E86C1F]/80 transition-colors inline-flex items-center gap-2">
                    <span>📞</span> +47 907 67 993
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="h-px w-full bg-slate-200 mb-8"></div>

        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-slate-400 text-center md:text-left">
            <span>© 2025 Averdi AS. Alle rettigheter forbeholdt.</span>
          </div>
          
          <div className="flex items-center gap-8 text-sm font-medium text-slate-500">
            <Link href="/personvern" className="hover:text-[#E86C1F] transition-colors">Personvern</Link>
            <Link href="/cookies" className="hover:text-[#E86C1F] transition-colors">Cookies</Link>
          </div>

          <button 
            onClick={scrollToTop}
            className="md:hidden p-3 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
            aria-label="Til toppen"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </div>
      </div>
    </footer>
  );
}