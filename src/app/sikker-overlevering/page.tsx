'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Shield, Lock, ArrowRight } from 'lucide-react';
import { AverdiBackground } from '@/components/modules/AverdiBackground';
import { FileDropZone, EncryptAndDownload, SecureTransferExplainer } from '@/components/secure-transfer';
import type { PayloadItem } from '@/lib/crypto/secure-transfer';
import { MAX_TOTAL_SIZE } from '@/lib/crypto/constants';

const DATA_TYPES = [
  { value: 'document' as const, label: 'Dokument (PDF, regneark, bilder)' },
  { value: 'api-credentials' as const, label: 'API-nøkler eller passord' },
  { value: 'vipps-config' as const, label: 'Vipps-konfigurasjon' },
  { value: 'other' as const, label: 'Annet' },
];

export default function SikkerOverleveringPage() {
  const [senderName, setSenderName] = useState('');
  const [orgNumber, setOrgNumber] = useState('');
  const [dataType, setDataType] = useState<'vipps-config' | 'api-credentials' | 'document' | 'other'>('document');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [textContent, setTextContent] = useState('');
  const [showEncrypt, setShowEncrypt] = useState(false);
  const [items, setItems] = useState<PayloadItem[]>([]);

  const isValid =
    senderName.trim().length > 0 &&
    /^\d{9}$/.test(orgNumber) &&
    (files.length > 0 || textContent.trim().length > 0);

  const totalSize = files.reduce((sum, f) => sum + f.size, 0);
  const isOverLimit = totalSize > MAX_TOTAL_SIZE;

  const metadata = useMemo(
    () => ({
      senderName,
      orgNumber,
      dataType,
      description: description || undefined,
    }),
    [senderName, orgNumber, dataType, description]
  );

  const handlePrepare = async () => {
    const payloadItems: PayloadItem[] = [];

    // Add text content as a text item
    if (textContent.trim()) {
      payloadItems.push({
        type: 'text',
        name: 'melding.txt',
        mimeType: 'text/plain',
        data: new TextEncoder().encode(textContent),
      });
    }

    // Add files
    for (const file of files) {
      const buffer = await file.arrayBuffer();
      payloadItems.push({
        type: 'file',
        name: file.name,
        mimeType: file.type || 'application/octet-stream',
        data: new Uint8Array(buffer),
      });
    }

    setItems(payloadItems);
    setShowEncrypt(true);
  };

  return (
    <main className="relative min-h-screen bg-slate-50">
      <AverdiBackground />

      {/* Hero */}
      <section className="relative z-10 pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E86C1F]/10 text-[#E86C1F] text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            Ende-til-ende kryptert
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-4">
            Send dokumenter sikkert til{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E86C1F] to-[#F4B223]">
              Averdi
            </span>
          </h1>

          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Krypter sensitive filer og data i nettleseren din. Bare Averdi kan dekryptere innholdet
            med koden du deler via telefon eller SMS.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="relative z-10 pb-24">
        <div className="container mx-auto px-4 sm:px-6 max-w-2xl">
          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6 md:p-8 space-y-6">

            {!showEncrypt ? (
              <>
                {/* Sender info */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="senderName" className="block text-sm font-medium text-slate-700 mb-1.5">
                      Ditt navn / firma
                    </label>
                    <input
                      id="senderName"
                      type="text"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="Ola Nordmann AS"
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-[3px] focus:ring-[#E86C1F]/30 focus:border-[#E86C1F] transition-all"
                      aria-required="true"
                    />
                  </div>
                  <div>
                    <label htmlFor="orgNumber" className="block text-sm font-medium text-slate-700 mb-1.5">
                      Organisasjonsnummer
                    </label>
                    <input
                      id="orgNumber"
                      type="text"
                      value={orgNumber}
                      onChange={(e) => setOrgNumber(e.target.value.replace(/\D/g, '').slice(0, 9))}
                      placeholder="123456789"
                      maxLength={9}
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-mono focus:outline-none focus:ring-[3px] focus:ring-[#E86C1F]/30 focus:border-[#E86C1F] transition-all"
                      aria-required="true"
                    />
                  </div>
                </div>

                {/* Data type */}
                <div>
                  <label htmlFor="dataType" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Type data
                  </label>
                  <select
                    id="dataType"
                    value={dataType}
                    onChange={(e) => setDataType(e.target.value as typeof dataType)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-[3px] focus:ring-[#E86C1F]/30 focus:border-[#E86C1F] transition-all"
                  >
                    {DATA_TYPES.map((dt) => (
                      <option key={dt.value} value={dt.value}>
                        {dt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Beskrivelse (valgfritt)
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Kort beskrivelse av hva du sender..."
                    rows={2}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-[3px] focus:ring-[#E86C1F]/30 focus:border-[#E86C1F] transition-all"
                  />
                </div>

                {/* File upload */}
                <div>
                  <p className="text-sm font-medium text-slate-700 mb-1.5">Filer</p>
                  <FileDropZone files={files} onFilesChange={setFiles} />
                </div>

                {/* Text input */}
                <div>
                  <label htmlFor="textContent" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Eller lim inn tekst / konfigurasjonsdata
                  </label>
                  <textarea
                    id="textContent"
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    placeholder="Lim inn API-nøkler, konfigurasjon, eller annen sensitiv tekst..."
                    rows={4}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-mono resize-none focus:outline-none focus:ring-[3px] focus:ring-[#E86C1F]/30 focus:border-[#E86C1F] transition-all"
                  />
                </div>

                {/* Submit */}
                <button
                  onClick={handlePrepare}
                  disabled={!isValid || isOverLimit}
                  className="w-full flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-[#E86C1F] to-[#F4B223] hover:shadow-lg hover:shadow-[#E86C1F]/30 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:translate-y-0"
                >
                  <Lock className="w-4 h-4" />
                  Fortsett til kryptering
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <EncryptAndDownload items={items} metadata={metadata} />

                <button
                  onClick={() => setShowEncrypt(false)}
                  className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
                >
                  Tilbake til skjema
                </button>
              </>
            )}
          </div>

          {/* Explainer */}
          <div className="mt-8 space-y-4">
            <SecureTransferExplainer />
            <div className="text-center">
              <Link
                href="/sikker-overlevering/om-sikkerhet"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#E86C1F] hover:text-[#d65f18] transition-colors"
              >
                Les mer om sikkerhet og etterlevelse
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
