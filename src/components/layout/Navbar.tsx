'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';
import logoAverdi from '@/assets/logo_averdi.avif';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Håndter scrolleffekt
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Håndter anker-scrolling
  const scrollToSection = (sectionId: string) => {
    if (pathname !== '/') {
      // Hvis vi ikke er på forsiden, naviger dit først med hash
      router.push(`/#${sectionId}`);
    } else {
      // Smooth scroll hvis vi allerede er på forsiden
      const element = document.getElementById(sectionId);
      if (element) {
        const navbarHeight = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - navbarHeight;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }
    setIsMenuOpen(false);
  };

  const navLinkClass = (isActive: boolean) =>
    `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
      isActive
        ? 'text-[#E86C1F] bg-[#E86C1F]/10'
        : 'text-slate-600 hover:text-[#E86C1F] hover:bg-slate-50'
    }`;

  return (
    <nav
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-md border-slate-200/50 shadow-sm'
          : 'bg-white/60 backdrop-blur-sm border-transparent'
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Image 
                src={logoAverdi} 
                alt="Averdi Logo" 
                height={50} // Eksplisitt høyde hjelper mot layout shift
                className="h-12 w-auto" // Tailwind håndterer visuell størrelse
                priority 
              />
            </Link>
          </div>

          {/* Desktop Navigasjon */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-2">
              <Link href="/" className={navLinkClass(pathname === '/')}>
                Hjem
              </Link>
              <button
                onClick={() => scrollToSection('services')}
                className={navLinkClass(false)}
              >
                Tjenester
              </button>
              <Link href="/om-oss" className={navLinkClass(pathname === '/om-oss')}>
                Om oss
              </Link>
              <Link href="/kunnskapsbank" className={navLinkClass(pathname.startsWith('/kunnskapsbank'))}>
                Kunnskapsbank
              </Link>
              <Link href="/aktuelt" className={navLinkClass(pathname.startsWith('/aktuelt'))}>
                Aktuelt
              </Link>
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollToSection('contact')}
              className="group relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white transition-all duration-300 bg-gradient-to-r from-[#E86C1F] to-[#F4B223] rounded-full hover:shadow-lg hover:shadow-[#E86C1F]/30 hover:-translate-y-0.5 focus:outline-none"
            >
              Kontakt oss
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Mobil menyknapp */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-full text-slate-600 hover:text-[#E86C1F] hover:bg-[#E86C1F]/10 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobil Navigasjon */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-xl animate-in slide-in-from-top-5 duration-200">
            <div className="px-4 pt-2 pb-6 space-y-2">
              <Link href="/" onClick={() => setIsMenuOpen(false)} className={`block px-4 py-3 rounded-xl w-full text-left text-base font-medium ${pathname === '/' ? 'text-[#E86C1F] bg-[#E86C1F]/10' : 'text-slate-600 hover:bg-slate-50'}`}>
                Hjem
              </Link>
              <button onClick={() => scrollToSection('services')} className="text-slate-600 hover:bg-slate-50 block px-4 py-3 rounded-xl w-full text-left text-base font-medium">
                Tjenester
              </button>
              <Link href="/om-oss" onClick={() => setIsMenuOpen(false)} className="text-slate-600 hover:bg-slate-50 block px-4 py-3 rounded-xl w-full text-left text-base font-medium">
                Om oss
              </Link>
              <Link href="/kunnskapsbank" onClick={() => setIsMenuOpen(false)} className="text-slate-600 hover:bg-slate-50 block px-4 py-3 rounded-xl w-full text-left text-base font-medium">
                Kunnskapsbank
              </Link>
              <div className="pt-4 mt-2 border-t border-slate-100">
                <button onClick={() => scrollToSection('contact')} className="w-full flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-[#E86C1F] to-[#F4B223] rounded-xl shadow-md active:scale-95 transition-all">
                  Kontakt oss
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}