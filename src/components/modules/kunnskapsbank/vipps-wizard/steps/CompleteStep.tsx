'use client';

import React, { useState, useMemo } from 'react';
import { Check, Download, Lock } from 'lucide-react';
import { WizardConfig } from '../types';
import { TroubleshootingGuide } from '../guides';
import { EncryptAndDownload } from '@/components/secure-transfer';
import type { PayloadItem } from '@/lib/crypto/secure-transfer';

interface Props {
  config: WizardConfig;
  configData: Record<string, unknown>;
  generateImplementationGuide: () => void;
  sendToAverdi: () => void;
}

export function CompleteStep({
  config,
  configData,
  generateImplementationGuide,
  sendToAverdi
}: Props) {
  const [showSecureTransfer, setShowSecureTransfer] = useState(false);

  const items: PayloadItem[] = useMemo(() => [{
    type: 'text' as const,
    name: 'vipps-config.json',
    mimeType: 'application/json',
    data: new TextEncoder().encode(JSON.stringify(configData, null, 2)),
  }], [configData]);

  const metadata = useMemo(() => ({
    senderName: config.companyName,
    orgNumber: config.orgNumber,
    dataType: 'vipps-config' as const,
    description: `Vipps-integrasjon for ${config.accountingSystem}`,
  }), [config.companyName, config.orgNumber, config.accountingSystem]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-20 h-20 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center">
          <Check className="w-10 h-10 text-white" aria-hidden="true" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Oppsett fullført!</h2>
        <p className="text-lg text-gray-600">Konfigurasjonen din er klar</p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Oppsummering</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Organisasjon:</span>
            <span className="font-medium">{config.companyName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Regnskapssystem:</span>
            <span className="font-medium capitalize">{config.accountingSystem}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Integrasjonspartner:</span>
            <span className="font-medium capitalize">{config.integrationPartner}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {/* Primary: Secure transfer */}
        {!showSecureTransfer ? (
          <button
            onClick={() => setShowSecureTransfer(true)}
            className="w-full bg-gradient-to-r from-[#E86C1F] to-[#F4B223] hover:shadow-lg hover:shadow-[#E86C1F]/30 text-white px-6 py-4 rounded-full font-medium flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-0.5"
          >
            <Lock className="w-5 h-5" aria-hidden="true" />
            Send konfigurasjonen sikkert til Averdi
          </button>
        ) : (
          <div className="rounded-2xl border border-slate-200 p-6">
            <EncryptAndDownload items={items} metadata={metadata} />
            <button
              onClick={() => setShowSecureTransfer(false)}
              className="mt-4 text-sm text-slate-500 hover:text-slate-700 transition-colors"
            >
              Skjul
            </button>
          </div>
        )}

        {/* Secondary options */}
        <button
          onClick={generateImplementationGuide}
          className="w-full bg-white border border-slate-200 hover:border-[#E86C1F]/50 text-slate-700 hover:text-[#E86C1F] px-6 py-4 rounded-full font-medium flex items-center justify-center gap-2 transition-all duration-200"
        >
          <Download className="w-5 h-5" aria-hidden="true" />
          Last ned implementeringsguide (TXT)
        </button>

        <button
          onClick={sendToAverdi}
          className="w-full bg-white border border-slate-200 hover:border-[#E86C1F]/50 text-slate-700 hover:text-[#E86C1F] px-6 py-4 rounded-full font-medium flex items-center justify-center gap-2 transition-all duration-200"
        >
          <Check className="w-5 h-5" aria-hidden="true" />
          Send e-post til Averdi
        </button>
      </div>

      <TroubleshootingGuide />
    </div>
  );
}
