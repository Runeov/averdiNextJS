'use client';

import { Shield, Lock, Phone, Mail } from 'lucide-react';

export default function SecureTransferExplainer() {
  return (
    <div className="rounded-2xl bg-slate-50 border border-slate-200 p-6 space-y-4">
      <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
        <Shield className="w-4 h-4 text-[#E86C1F]" />
        Hvordan fungerer sikker overlevering?
      </h3>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="flex flex-col gap-2">
          <div className="w-8 h-8 rounded-full bg-[#E86C1F]/10 flex items-center justify-center">
            <Lock className="w-4 h-4 text-[#E86C1F]" />
          </div>
          <p className="text-sm font-medium text-slate-700">Kryptert i nettleseren</p>
          <p className="text-xs text-slate-500">
            Filene dine krypteres lokalt i nettleseren din med AES-256. Ingenting sendes
            ukryptert. Averdi sin server ser aldri innholdet.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="w-8 h-8 rounded-full bg-[#E86C1F]/10 flex items-center justify-center">
            <Mail className="w-4 h-4 text-[#E86C1F]" />
          </div>
          <p className="text-sm font-medium text-slate-700">Filen sendes via e-post</p>
          <p className="text-xs text-slate-500">
            Den krypterte .averdi-filen er uleselig uten dekrypteringskoden.
            Selv om noen fanger opp e-posten, kan de ikke lese innholdet.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="w-8 h-8 rounded-full bg-[#E86C1F]/10 flex items-center justify-center">
            <Phone className="w-4 h-4 text-[#E86C1F]" />
          </div>
          <p className="text-sm font-medium text-slate-700">Koden deles separat</p>
          <p className="text-xs text-slate-500">
            Dekrypteringskoden deles via telefon eller SMS. To separate kanaler
            betyr at begge må kapres for å lese dataene.
          </p>
        </div>
      </div>
    </div>
  );
}
