'use client';

import { useState, useRef } from 'react';
import { Download, Lock, Mail, Loader2, Check, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { generatePin, generateSalt, deriveKeyFromPin } from '@/lib/crypto/passphrase';
import {
  encryptPayload,
  packPayload,
  buildAverdiFile,
  type TransferMetadata,
  type PayloadItem,
} from '@/lib/crypto/secure-transfer';
import PassphraseDisplay from './PassphraseDisplay';

interface EncryptAndDownloadProps {
  items: PayloadItem[];
  metadata: Omit<TransferMetadata, 'timestamp' | 'fileCount' | 'keySalt'>;
  /** Override recipient email (e.g. integration partner). Defaults to Averdi support. */
  recipient?: string;
  /** Label for the send button. Defaults to "Send filen til Averdi". */
  sendLabel?: string;
  /** Label shown after sent. Defaults to "Sendt til Averdi". */
  sentLabel?: string;
}

type Status = 'idle' | 'encrypting' | 'ready' | 'error';
type SendStatus = 'idle' | 'sending' | 'sent' | 'error';

export default function EncryptAndDownload({
  items,
  metadata,
  recipient,
  sendLabel = 'Send filen til Averdi',
  sentLabel = 'Sendt til Averdi',
}: EncryptAndDownloadProps) {
  const [status, setStatus] = useState<Status>('idle');
  const [pin, setPin] = useState('');
  const [blobUrl, setBlobUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');
  const [sendStatus, setSendStatus] = useState<SendStatus>('idle');
  const [sendError, setSendError] = useState('');
  const blobRef = useRef<Blob | null>(null);

  const handleEncrypt = async () => {
    setStatus('encrypting');
    setError('');

    try {
      // 1. Generate PIN and per-file salt, then derive key
      const newPin = generatePin();
      const salt = generateSalt();
      const key = await deriveKeyFromPin(newPin, salt);

      // 2. Pack all items into a single binary
      const packed = packPayload(items);

      // 3. Encrypt
      const { iv, ciphertext } = await encryptPayload(key, packed);

      // 4. Build .averdi file (salt stored in metadata as base64)
      const keySalt = btoa(String.fromCharCode(...salt));

      const fullMetadata: TransferMetadata = {
        ...metadata,
        timestamp: new Date().toISOString(),
        fileCount: items.length,
        keySalt,
      };

      const blob = buildAverdiFile(fullMetadata, iv, ciphertext);

      // 5. Create download URL
      const url = URL.createObjectURL(blob);
      const name = `averdi-${metadata.orgNumber}-${Date.now()}.averdi`;

      setPin(newPin);
      setBlobUrl(url);
      setFileName(name);
      blobRef.current = blob;
      setStatus('ready');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Kryptering feilet');
      setStatus('error');
    }
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = fileName;
    a.click();
  };

  const handleSendEmail = async () => {
    if (!blobRef.current) return;
    setSendStatus('sending');
    setSendError('');

    try {
      const formData = new FormData();
      formData.append('file', blobRef.current, fileName);
      formData.append('senderName', metadata.senderName);
      formData.append('orgNumber', metadata.orgNumber);
      if (metadata.description) {
        formData.append('description', metadata.description);
      }
      if (recipient) {
        formData.append('recipient', recipient);
      }

      const res = await fetch('/api/secure-transfer/send', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Sending feilet');
      }

      setSendStatus('sent');
    } catch (err) {
      setSendError(err instanceof Error ? err.message : 'Kunne ikke sende');
      setSendStatus('error');
    }
  };

  if (status === 'idle' || status === 'encrypting') {
    return (
      <div className="space-y-4">
        <button
          onClick={handleEncrypt}
          disabled={status === 'encrypting' || items.length === 0}
          className={cn(
            'w-full flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white transition-all duration-300',
            'bg-gradient-to-r from-[#E86C1F] to-[#F4B223] hover:shadow-lg hover:shadow-[#E86C1F]/30 hover:-translate-y-0.5',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:translate-y-0'
          )}
        >
          {status === 'encrypting' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Krypterer...
            </>
          ) : (
            <>
              <Lock className="w-4 h-4" />
              Krypter og send til Averdi
            </>
          )}
        </button>

        {error && (
          <p className="text-sm text-red-600 text-center">{error}</p>
        )}
      </div>
    );
  }

  // Status === 'ready'
  return (
    <div className="space-y-6">
      {/* Step 1: Send or download the file */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
          <span className="w-6 h-6 rounded-full bg-[#E86C1F] text-white text-xs flex items-center justify-center font-bold">
            1
          </span>
          Send den krypterte filen til Averdi
        </div>

        {/* Primary: Send directly */}
        <button
          onClick={handleSendEmail}
          disabled={sendStatus === 'sending' || sendStatus === 'sent'}
          className={cn(
            'w-full flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white transition-all duration-300',
            sendStatus === 'sent'
              ? 'bg-green-500'
              : 'bg-gradient-to-r from-[#E86C1F] to-[#F4B223] hover:shadow-lg hover:shadow-[#E86C1F]/30',
            'disabled:hover:shadow-none'
          )}
        >
          {sendStatus === 'sending' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sender...
            </>
          ) : sendStatus === 'sent' ? (
            <>
              <Check className="w-4 h-4" />
              {sentLabel}
            </>
          ) : (
            <>
              <Mail className="w-4 h-4" />
              {sendLabel}
            </>
          )}
        </button>

        {sendStatus === 'error' && (
          <div className="flex items-center gap-2 text-sm text-red-600">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{sendError}</span>
          </div>
        )}

        {/* Fallback: Download manually */}
        <button
          onClick={handleDownload}
          className="w-full flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:border-[#E86C1F]/50 hover:text-[#E86C1F] transition-all duration-200"
        >
          <Download className="w-4 h-4" />
          Eller last ned filen manuelt
        </button>
      </div>

      {/* Step 2: Share the PIN */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
          <span className="w-6 h-6 rounded-full bg-[#E86C1F] text-white text-xs flex items-center justify-center font-bold">
            2
          </span>
          Del PIN-koden med mottaker via telefon eller SMS
        </div>

        <PassphraseDisplay pin={pin} />
      </div>
    </div>
  );
}
