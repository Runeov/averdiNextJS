'use client';

import { Shield, Lock } from 'lucide-react';
import { AverdiBackground } from '@/components/modules/AverdiBackground';
import { DecryptUpload, SecureTransferExplainer } from '@/components/secure-transfer';

export default function PublicDekrypterPage() {
  return (
    <main className="relative min-h-screen bg-slate-50">
      <AverdiBackground />

      {/* Hero */}
      <section className="relative z-10 pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E86C1F]/10 text-[#E86C1F] text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            AES-256 kryptert
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-4">
            Dekrypter en{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E86C1F] to-[#F4B223]">
              .averdi
            </span>
            {' '}fil
          </h1>

          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Last opp den krypterte filen du mottok, og skriv inn dekrypteringskoden
            du fikk via telefon eller SMS.
          </p>
        </div>
      </section>

      {/* Decrypter */}
      <section className="relative z-10 pb-24">
        <div className="container mx-auto px-4 sm:px-6 max-w-2xl">
          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6 md:p-8">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-6">
              <Lock className="w-4 h-4 text-[#E86C1F]" />
              Alt skjer i nettleseren din. Ingenting sendes til serveren.
            </div>

            <DecryptUpload />
          </div>

          {/* Explainer */}
          <div className="mt-8">
            <SecureTransferExplainer />
          </div>
        </div>
      </section>
    </main>
  );
}
