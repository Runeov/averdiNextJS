'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import logoAverdi from '@/assets/logo_averdi.png';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileDropdowns, setMobileDropdowns] = useState({
    services: false,
    kunnskapsbank: false,
  });
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setMobileDropdowns({ services: false, kunnskapsbank: false });
  }, [pathname]);

  // Handle anchor scrolling
  const scrollToSection = (sectionId: string) => {
    if (pathname !== '/') {
      // If not on homepage, navigate there first with hash
      router.push(`/#${sectionId}`);
    } else {
      // Smooth scroll if already on homepage
      const element = document.getElementById(sectionId);
      if (element) {
        const navbarHeight = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - navbarHeight;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }
    setIsMenuOpen(false);
    setMobileDropdowns({ services: false, kunnskapsbank: false });
  };

  const navLinkClass = (isActive: boolean) =>
    `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
      isActive
        ? 'text-[#E86C1F] bg-[#E86C1F]/10'
        : 'text-slate-600 hover:text-[#E86C1F] hover:bg-slate-50'
    }`;

  const dropdownItemClass = (isActive: boolean) =>
    `block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
      isActive
        ? 'text-[#E86C1F] bg-[#E86C1F]/10 font-medium'
        : 'text-slate-600 hover:bg-slate-50 hover:text-[#E86C1F]'
    }`;

  const mobileMenuItemClass = (isActive: boolean) =>
    `block px-4 py-3 rounded-xl w-full text-left text-base font-medium ${
      isActive
        ? 'text-[#E86C1F] bg-[#E86C1F]/10'
        : 'text-slate-600 hover:bg-slate-50'
    }`;

  const servicesMenuActive = pathname.startsWith('/tjenester');
  const kunnskapsbankMenuActive =
    pathname === '/kunnskapsbank' ||
    pathname.startsWith('/kunnskapsbank/sametinget') ||
    pathname.startsWith('/kunnskapsbank/bedrifter') ||
    pathname.startsWith('/kunnskapsbank/organisasjoner');

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setMobileDropdowns({ services: false, kunnskapsbank: false });
  };

  const toggleMobileDropdown = (key: 'services' | 'kunnskapsbank') => {
    setMobileDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

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
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity" aria-label="Averdi - Gå til forsiden">
              <Image
                src={logoAverdi}
                alt="Averdi Logo"
                height={80} // Match h-20 (80px) - full navbar height
                className="h-20 w-auto" // Fill navbar completely without padding
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-2">
              <Link href="/" className={navLinkClass(pathname === '/')}>
                Hjem
              </Link>
              <div className="relative group">
                <button
                  type="button"
                  className={`${navLinkClass(servicesMenuActive)} inline-flex items-center gap-1`}
                  aria-haspopup="menu"
                >
                  Tjenester
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
                </button>
                <div className="absolute left-0 top-full pt-2 opacity-0 invisible -translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0">
                  <div className="w-56 rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-md p-2 shadow-xl">
                    <button onClick={() => scrollToSection('services')} className={dropdownItemClass(false)}>
                      Tjenester
                    </button>
                    <Link href="/tjenester/regnskap" className={dropdownItemClass(pathname.startsWith('/tjenester/regnskap'))}>
                      Regnskap
                    </Link>
                    <Link href="/tjenester/lonn" className={dropdownItemClass(pathname.startsWith('/tjenester/lonn'))}>
                      Lønn
                    </Link>
                    <Link href="/tjenester/raadgiving" className={dropdownItemClass(pathname.startsWith('/tjenester/raadgiving'))}>
                      Rådgivning
                    </Link>
                  </div>
                </div>
              </div>
              <Link href="/om-oss" className={navLinkClass(pathname === '/om-oss')}>
                Om oss
              </Link>
              <div className="relative group">
                <button
                  type="button"
                  className={`${navLinkClass(kunnskapsbankMenuActive)} inline-flex items-center gap-1`}
                  aria-haspopup="menu"
                >
                  Kunnskapsbanken
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
                </button>
                <div className="absolute left-0 top-full pt-2 opacity-0 invisible -translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0">
                  <div className="w-60 rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-md p-2 shadow-xl">
                    <Link href="/kunnskapsbank" className={dropdownItemClass(pathname === '/kunnskapsbank')}>
                      Kunnskapsbanken
                    </Link>
                    <Link href="/kunnskapsbank/sametinget" className={dropdownItemClass(pathname.startsWith('/kunnskapsbank/sametinget'))}>
                      Sametinget
                    </Link>
                    <Link href="/kunnskapsbank/bedrifter" className={dropdownItemClass(pathname.startsWith('/kunnskapsbank/bedrifter'))}>
                      Bedrift
                    </Link>
                    <Link href="/kunnskapsbank/organisasjoner" className={dropdownItemClass(pathname.startsWith('/kunnskapsbank/organisasjoner'))}>
                      Organisasjoner
                    </Link>
                  </div>
                </div>
              </div>
              <Link href="/kunnskapsbank/artikler" className={navLinkClass(pathname.startsWith('/kunnskapsbank/artikler'))}>
                Innsikt
              </Link>
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollToSection('contact')}
              className="group relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white transition-all duration-300 bg-gradient-to-r from-[#E86C1F] to-[#F4B223] rounded-full hover:shadow-lg hover:shadow-[#E86C1F]/30 hover:-translate-y-0.5 focus:outline-none"
              aria-label="Kontakt oss"
            >
              Kontakt oss
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => {
                setIsMenuOpen((prev) => {
                  const next = !prev;
                  if (!next) {
                    setMobileDropdowns({ services: false, kunnskapsbank: false });
                  }
                  return next;
                });
              }}
              className="inline-flex items-center justify-center p-2 rounded-full text-slate-600 hover:text-[#E86C1F] hover:bg-[#E86C1F]/10 transition-colors"
              aria-expanded={isMenuOpen}
              aria-label="Åpne meny"
            >
              {isMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-xl animate-in slide-in-from-top-5 duration-200">
            <div className="px-4 pt-2 pb-6 space-y-2">
              <Link href="/" onClick={closeMobileMenu} className={mobileMenuItemClass(pathname === '/')}>
                Hjem
              </Link>

              <button
                type="button"
                onClick={() => toggleMobileDropdown('services')}
                className={mobileMenuItemClass(servicesMenuActive)}
              >
                <span className="flex items-center justify-between">
                  Tjenester
                  <ChevronDown className={`h-5 w-5 transition-transform ${mobileDropdowns.services ? 'rotate-180' : ''}`} />
                </span>
              </button>
              {mobileDropdowns.services && (
                <div className="pl-4 space-y-1">
                  <button
                    onClick={() => scrollToSection('services')}
                    className={dropdownItemClass(false)}
                  >
                    Tjenester
                  </button>
                  <Link href="/tjenester/regnskap" onClick={closeMobileMenu} className={dropdownItemClass(pathname.startsWith('/tjenester/regnskap'))}>
                    Regnskap
                  </Link>
                  <Link href="/tjenester/lonn" onClick={closeMobileMenu} className={dropdownItemClass(pathname.startsWith('/tjenester/lonn'))}>
                    Lønn
                  </Link>
                  <Link href="/tjenester/raadgiving" onClick={closeMobileMenu} className={dropdownItemClass(pathname.startsWith('/tjenester/raadgiving'))}>
                    Rådgivning
                  </Link>
                </div>
              )}

              <Link href="/om-oss" onClick={closeMobileMenu} className={mobileMenuItemClass(pathname === '/om-oss')}>
                Om oss
              </Link>

              <button
                type="button"
                onClick={() => toggleMobileDropdown('kunnskapsbank')}
                className={mobileMenuItemClass(kunnskapsbankMenuActive)}
              >
                <span className="flex items-center justify-between">
                  Kunnskapsbanken
                  <ChevronDown className={`h-5 w-5 transition-transform ${mobileDropdowns.kunnskapsbank ? 'rotate-180' : ''}`} />
                </span>
              </button>
              {mobileDropdowns.kunnskapsbank && (
                <div className="pl-4 space-y-1">
                  <Link href="/kunnskapsbank" onClick={closeMobileMenu} className={dropdownItemClass(pathname === '/kunnskapsbank')}>
                    Kunnskapsbanken
                  </Link>
                  <Link href="/kunnskapsbank/sametinget" onClick={closeMobileMenu} className={dropdownItemClass(pathname.startsWith('/kunnskapsbank/sametinget'))}>
                    Sametinget
                  </Link>
                  <Link href="/kunnskapsbank/bedrifter" onClick={closeMobileMenu} className={dropdownItemClass(pathname.startsWith('/kunnskapsbank/bedrifter'))}>
                    Bedrift
                  </Link>
                  <Link href="/kunnskapsbank/organisasjoner" onClick={closeMobileMenu} className={dropdownItemClass(pathname.startsWith('/kunnskapsbank/organisasjoner'))}>
                    Organisasjoner
                  </Link>
                </div>
              )}

              <Link href="/kunnskapsbank/artikler" onClick={closeMobileMenu} className={mobileMenuItemClass(pathname.startsWith('/kunnskapsbank/artikler'))}>
                Innsikt
              </Link>
              <div className="pt-4 mt-2 border-t border-slate-100">
                <button onClick={() => scrollToSection('contact')} className="w-full flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-[#E86C1F] to-[#F4B223] rounded-xl shadow-md active:scale-95 transition-all" aria-label="Kontakt oss">
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
