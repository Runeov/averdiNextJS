'use client';

import { useCallback, useRef, useState } from 'react';
import { Upload, Lock, Loader2, ShieldCheck, Calendar, Building2, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { deriveKeyFromPin } from '@/lib/crypto/passphrase';
import {
  parseAverdiFile,
  decryptPayload,
  unpackPayload,
  type TransferMetadata,
  type PayloadItem,
} from '@/lib/crypto/secure-transfer';
import DecryptedDataView from './DecryptedDataView';

type Status = 'upload' | 'loaded' | 'decrypting' | 'decrypted' | 'error';

interface DecryptUploadProps {
  /** Called when decryption succeeds, with the metadata and decrypted items */
  onDecrypted?: (metadata: TransferMetadata, items: PayloadItem[]) => void;
}

export default function DecryptUpload({ onDecrypted }: DecryptUploadProps = {}) {
  const [status, setStatus] = useState<Status>('upload');
  const [metadata, setMetadata] = useState<TransferMetadata | null>(null);
  const [fileBuffer, setFileBuffer] = useState<ArrayBuffer | null>(null);
  const [pin, setPin] = useState('');
  const [items, setItems] = useState<PayloadItem[]>([]);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (file: File) => {
    try {
      const buffer = await file.arrayBuffer();
      const parsed = parseAverdiFile(buffer);
      setMetadata(parsed.metadata);
      setFileBuffer(buffer);
      setStatus('loaded');
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Kunne ikke lese filen');
      setStatus('error');
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDecrypt = useCallback(async () => {
    if (!fileBuffer || !pin.trim() || !metadata) return;
    setStatus('decrypting');
    setError('');

    try {
      const parsed = parseAverdiFile(fileBuffer);

      // Decode the per-file salt from metadata
      const saltBinary = atob(parsed.metadata.keySalt);
      const salt = new Uint8Array(saltBinary.length);
      for (let i = 0; i < saltBinary.length; i++) {
        salt[i] = saltBinary.charCodeAt(i);
      }

      const key = await deriveKeyFromPin(pin.trim(), salt);
      const decrypted = await decryptPayload(key, parsed.iv, parsed.ciphertext);
      const unpacked = unpackPayload(decrypted);

      setItems(unpacked);
      setStatus('decrypted');
      if (onDecrypted) {
        onDecrypted(metadata, unpacked);
      }
    } catch {
      setError('Feil PIN-kode eller korrupt fil. Sjekk at du har riktig 6-sifret kode.');
      setStatus('loaded');
    }
  }, [fileBuffer, pin, metadata, onDecrypted]);

  // Upload state
  if (status === 'upload' || status === 'error') {
    return (
      <div className="space-y-4">
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click();
          }}
          aria-label="Last opp .averdi-fil"
          className={cn(
            'flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed p-12 cursor-pointer transition-all duration-200',
            isDragging
              ? 'border-[#E86C1F] bg-[#E86C1F]/5'
              : 'border-slate-300 hover:border-[#E86C1F]/50 hover:bg-slate-50'
          )}
        >
          <div className={cn(
            'w-16 h-16 rounded-full flex items-center justify-center transition-colors',
            isDragging ? 'bg-[#E86C1F]/10 text-[#E86C1F]' : 'bg-slate-100 text-slate-400'
          )}>
            <Upload className="w-8 h-8" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-slate-700">
              Dra .averdi-fil hit eller klikk for å velge
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Last opp den krypterte filen du mottok
            </p>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept=".averdi"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
              e.target.value = '';
            }}
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 text-center">{error}</p>
        )}
      </div>
    );
  }

  // Loaded — show metadata + PIN input
  if (status === 'loaded' || status === 'decrypting') {
    return (
      <div className="space-y-6">
        {/* Metadata card */}
        {metadata && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3">
            <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#E86C1F]" />
              Filinformasjon
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-slate-600">
                <Building2 className="w-4 h-4 text-slate-400" />
                <span>{metadata.senderName}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <FileText className="w-4 h-4 text-slate-400" />
                <span>Org: {metadata.orgNumber}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>{new Date(metadata.timestamp).toLocaleString('nb-NO')}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Lock className="w-4 h-4 text-slate-400" />
                <span>{metadata.fileCount} element{metadata.fileCount !== 1 ? 'er' : ''}</span>
              </div>
            </div>
            {metadata.description && (
              <p className="text-sm text-slate-600 border-t border-slate-100 pt-3">
                {metadata.description}
              </p>
            )}
          </div>
        )}

        {/* PIN input */}
        <div className="space-y-3">
          <label htmlFor="pin" className="text-sm font-medium text-slate-700">
            6-sifret PIN-kode (mottatt via telefon eller SMS)
          </label>
          <input
            id="pin"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            value={pin}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, '');
              setPin(val);
            }}
            placeholder="000000"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-center text-2xl font-mono tracking-[0.5em] focus:outline-none focus:ring-[3px] focus:ring-[#E86C1F]/30 focus:border-[#E86C1F] transition-all"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleDecrypt();
            }}
          />

          <button
            onClick={handleDecrypt}
            disabled={status === 'decrypting' || pin.length < 6}
            className={cn(
              'w-full flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white transition-all duration-300',
              'bg-gradient-to-r from-[#E86C1F] to-[#F4B223] hover:shadow-lg hover:shadow-[#E86C1F]/30 hover:-translate-y-0.5',
              'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:translate-y-0'
            )}
          >
            {status === 'decrypting' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Dekrypterer...
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                Dekrypter
              </>
            )}
          </button>

          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}
        </div>

        {/* Reset */}
        <button
          onClick={() => {
            setStatus('upload');
            setMetadata(null);
            setFileBuffer(null);
            setPin('');
            setError('');
          }}
          className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
        >
          Last opp en annen fil
        </button>
      </div>
    );
  }

  // Decrypted — show data
  return (
    <div className="space-y-6">
      {metadata && (
        <div className="flex items-center gap-3 text-sm text-slate-600">
          <ShieldCheck className="w-5 h-5 text-green-600" />
          <span>
            Dekryptert: {metadata.senderName} ({metadata.orgNumber})
          </span>
        </div>
      )}

      <DecryptedDataView items={items} />

      <button
        onClick={() => {
          setStatus('upload');
          setMetadata(null);
          setFileBuffer(null);
          setPin('');
          setItems([]);
          setError('');
        }}
        className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
      >
        Dekrypter en annen fil
      </button>
    </div>
  );
}
