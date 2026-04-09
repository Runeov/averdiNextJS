'use client';

import { useState } from 'react';
import { Copy, Check, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PassphraseDisplayProps {
  pin: string;
}

export default function PassphraseDisplay({ pin }: PassphraseDisplayProps) {
  const [copied, setCopied] = useState(false);
  const digits = pin.split('');

  const handleCopy = async () => {
    await navigator.clipboard.writeText(pin);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border-2 border-[#E86C1F]/30 bg-[#E86C1F]/5 p-6 space-y-4">
      {/* Instructions */}
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-[#E86C1F] mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm font-semibold text-slate-900">
            Del PIN-koden via telefon eller SMS
          </p>
          <p className="text-xs text-slate-600 mt-1">
            IKKE send PIN-koden på e-post sammen med filen. Fil og kode skal
            sendes i to separate kanaler.
          </p>
        </div>
      </div>

      {/* PIN digit grid */}
      <div className="flex items-center justify-center gap-2 sm:gap-3">
        {digits.map((digit, i) => (
          <div
            key={i}
            className="w-12 h-14 sm:w-14 sm:h-16 bg-white rounded-xl border border-slate-200 flex items-center justify-center"
          >
            <span className="text-2xl sm:text-3xl font-mono font-bold text-slate-900">
              {digit}
            </span>
          </div>
        ))}
      </div>

      {/* Copy button */}
      <button
        onClick={handleCopy}
        className={cn(
          'w-full flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-200',
          copied
            ? 'bg-green-100 text-green-700'
            : 'bg-white border border-slate-200 text-slate-700 hover:border-[#E86C1F]/50 hover:text-[#E86C1F]'
        )}
      >
        {copied ? (
          <>
            <Check className="w-4 h-4" />
            Kopiert
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" />
            Kopier PIN-kode
          </>
        )}
      </button>
    </div>
  );
}
