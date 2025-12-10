import type { Metadata } from 'next';
import Link from 'next/link';
import { Landmark, Building2, Users, ArrowRight } from 'lucide-react';
import { AverdiBackground } from '@/components/modules/AverdiBackground';

export const metadata: Metadata = {
  title: 'Kunnskapsbank | Averdi',
  description: 'Din guide til næringsliv og frivillighet i Nord. Spesialist på Sametinget, Tiltakssonen og Idrettslag.',
};

export default function KunnskapsbankPage() {
  return (
    <main className="min-h-screen bg-slate-50 relative overflow-hidden">
      <AverdiBackground />
      
      {/* Hero */}
      <section className="relative z-10 pt-24 pb-16 px-4 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/5 text-slate-600 text-sm font-medium mb-6">
          <span className="w-2 h-2 rounded-full bg-[#E86C1F]"></span>
          Din vekstpartner i Nord
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
          Kunnskap som gir <span className="text-[#E86C1F]">vekst i nord</span>
        </h1>
        <p className="text-xl text-slate-600 mb-12 leading-relaxed">
          Vi deler vår ekspertise om tilskudd, skattefordeler og drift, slik at du kan lykkes i Finnmark og Nord-Troms.
        </p>
      </section>

      {/* De 3 Strategiske Pilarene */}
      <section className="container mx-auto px-4 pb-32 relative z-10">
        <div className="grid md:grid-cols-3 gap-6">
          
          {/* 1. SAMETINGET (Nisje) */}
          <Link href="/kunnskapsbank/sametinget" className="group bg-white rounded-3xl p-8 shadow-sm border border-slate-200 hover:border-[#E86C1F]/50 transition-all hover:shadow-2xl hover:shadow-[#E86C1F]/10 relative overflow-hidden">
            <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 text-[#E86C1F] group-hover:scale-110 transition-transform">
              <Landmark className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Sametinget & Duodji</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              I 2026 forvalter Sametinget over <strong>3 milliarder kroner</strong>. Vi hjelper deg å navigere søknadsjungelen for kultur, språk og næring.
            </p>
            <span className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#E86C1F] text-white font-bold text-sm group-hover:bg-[#d65f18] transition-colors">
              Se støtteordninger <ArrowRight className="w-4 h-4 ml-2" />
            </span>
          </Link>

          {/* 2. BEDRIFT (Geografi) */}
          <Link href="/kunnskapsbank/bedrifter" className="group bg-white rounded-3xl p-8 shadow-sm border border-slate-200 hover:border-blue-400/50 transition-all hover:shadow-2xl hover:shadow-blue-500/10 relative overflow-hidden">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 transition-transform">
              <Building2 className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Bedrift & Handel</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Maksimer fordelene ved å drive i <strong>Tiltakssonen</strong>. Alt om 0% arbeidsgiveravgift, finnmarksfradrag og smarte kasseløsninger.
            </p>
            <span className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-blue-600 text-white font-bold text-sm group-hover:bg-blue-700 transition-colors">
              Beregn besparelser <ArrowRight className="w-4 h-4 ml-2" />
            </span>
          </Link>

          {/* 3. ORGANISASJON (Volum) */}
          <Link href="/kunnskapsbank/organisasjoner" className="group bg-white rounded-3xl p-8 shadow-sm border border-slate-200 hover:border-green-500/50 transition-all hover:shadow-2xl hover:shadow-green-500/10 relative overflow-hidden">
            <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-6 text-green-600 group-hover:scale-110 transition-transform">
              <Users className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Lag & Forening</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Forenkle hverdagen for kassereren. Vi guider dere gjennom <strong>momskompensasjon</strong>, medlemsregistre og Vipps-regnskap.
            </p>
            <span className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-green-600 text-white font-bold text-sm group-hover:bg-green-700 transition-colors">
              Få kontroll på laget <ArrowRight className="w-4 h-4 ml-2" />
            </span>
          </Link>

        </div>
      </section>
    </main>
  );
}