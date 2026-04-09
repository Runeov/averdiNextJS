'use client';

import { useState, useMemo, useCallback } from 'react';
import { ExternalLink, Send, Mail, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DecryptUpload, EncryptAndDownload } from '@/components/secure-transfer';
import type { TransferMetadata, PayloadItem } from '@/lib/crypto/secure-transfer';

export default function DekrypterPage() {
  const [decryptedMeta, setDecryptedMeta] = useState<TransferMetadata | null>(null);
  const [decryptedItems, setDecryptedItems] = useState<PayloadItem[]>([]);
  const [partnerEmail, setPartnerEmail] = useState('');
  const [showPartnerSend, setShowPartnerSend] = useState(false);

  const handleDecrypted = useCallback((meta: TransferMetadata, items: PayloadItem[]) => {
    setDecryptedMeta(meta);
    setDecryptedItems(items);
  }, []);

  // Try to extract vipps config JSON from decrypted items
  const vippsConfigJson = useMemo(() => {
    for (const item of decryptedItems) {
      if (item.type === 'text' && (item.name.includes('vipps') || item.mimeType === 'application/json')) {
        try {
          const text = new TextDecoder().decode(item.data);
          const parsed = JSON.parse(text);
          if (parsed.vipps || parsed.accounting) return text;
        } catch { /* not valid JSON */ }
      }
    }
    return null;
  }, [decryptedItems]);

  // Extract partner info from config JSON for pre-filling
  const partnerInfo = useMemo(() => {
    if (!vippsConfigJson) return null;
    try {
      const config = JSON.parse(vippsConfigJson);
      return {
        name: config.accounting?.integrationPartner || '',
        system: config.accounting?.system || '',
      };
    } catch { return null; }
  }, [vippsConfigJson]);

  const forwardMetadata = useMemo(() => {
    if (!decryptedMeta) return null;
    return {
      senderName: decryptedMeta.senderName,
      orgNumber: decryptedMeta.orgNumber,
      dataType: decryptedMeta.dataType || ('vipps-config' as const),
      description: decryptedMeta.description || `Vipps-konfigurasjon videresendt fra Averdi`,
    };
  }, [decryptedMeta]);

  const openExampleJson = () => {
    if (!vippsConfigJson) return;
    localStorage.setItem('vippsWizardConfigJson', vippsConfigJson);
    localStorage.setItem('vippsWizardConfigJsonUpdatedAt', new Date().toISOString());
    window.open('/kunnskapsbank/bedrifter/vipps-integrasjon/example-json', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Dekrypter .averdi-fil</h1>
        <p className="text-sm text-slate-600 mt-1">
          Last opp en kryptert fil fra en klient og skriv inn dekrypteringskoden du mottok via telefon eller SMS.
        </p>
      </div>

      <DecryptUpload onDecrypted={handleDecrypted} />

      {/* Post-decryption admin actions */}
      {decryptedItems.length > 0 && (
        <div className="mt-8 space-y-4">
          <hr className="border-slate-200" />

          <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#E86C1F]" />
            Admin-handlinger
          </h2>

          {/* Review config in ExampleOfJson viewer */}
          {vippsConfigJson && (
            <button
              onClick={openExampleJson}
              className="w-full flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-[#E86C1F] to-[#F4B223] hover:shadow-lg hover:shadow-[#E86C1F]/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              <ExternalLink className="w-4 h-4" />
              Se detaljert konfigurasjon
            </button>
          )}

          {/* Send to integration partner */}
          {!showPartnerSend ? (
            <button
              onClick={() => setShowPartnerSend(true)}
              className="w-full flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:border-[#E86C1F]/50 hover:text-[#E86C1F] transition-all duration-200"
            >
              <Send className="w-4 h-4" />
              Videresend sikkert til integrasjonspartner
            </button>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
              <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#E86C1F]" />
                Send til integrasjonspartner
              </h3>

              {partnerInfo?.name && (
                <p className="text-xs text-slate-500">
                  Klienten bruker <span className="font-medium text-slate-700">{partnerInfo.name}</span> som integrasjonspartner.
                </p>
              )}

              <div>
                <label htmlFor="partnerEmail" className="block text-sm font-medium text-slate-700 mb-1.5">
                  E-post til integrasjonspartner
                </label>
                <input
                  id="partnerEmail"
                  type="email"
                  value={partnerEmail}
                  onChange={(e) => setPartnerEmail(e.target.value)}
                  placeholder="support@partner.no"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-[3px] focus:ring-[#E86C1F]/30 focus:border-[#E86C1F] transition-all"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Filen krypteres på nytt. Partneren dekrypterer på averdi.no/dekrypter med koden du deler via telefon.
                </p>
              </div>

              {forwardMetadata && (
                <EncryptAndDownload
                  items={decryptedItems}
                  metadata={forwardMetadata}
                  recipient={partnerEmail || undefined}
                  sendLabel={`Send til ${partnerInfo?.name || 'partner'}`}
                  sentLabel={`Sendt til ${partnerInfo?.name || 'partner'}`}
                />
              )}

              <button
                onClick={() => setShowPartnerSend(false)}
                className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
              >
                Avbryt
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
