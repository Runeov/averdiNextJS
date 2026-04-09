'use client';

import { useState } from 'react';
import { Copy, Check, Download, AlertTriangle, FileText, Image, File } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PayloadItem } from '@/lib/crypto/secure-transfer';

interface DecryptedDataViewProps {
  items: PayloadItem[];
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function TextItem({ item }: { item: PayloadItem }) {
  const [copied, setCopied] = useState(false);
  const text = new TextDecoder().decode(item.data);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Try to parse as JSON for pretty-printing
  let display: string;
  try {
    display = JSON.stringify(JSON.parse(text), null, 2);
  } catch {
    display = text;
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-medium text-slate-700">{item.name}</span>
        </div>
        <button
          onClick={handleCopy}
          className={cn(
            'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all',
            copied
              ? 'bg-green-100 text-green-700'
              : 'bg-white border border-slate-200 text-slate-600 hover:text-[#E86C1F] hover:border-[#E86C1F]/50'
          )}
        >
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          {copied ? 'Kopiert' : 'Kopier'}
        </button>
      </div>
      <pre className="p-4 text-sm text-slate-800 font-mono overflow-x-auto max-h-96 whitespace-pre-wrap">
        {display}
      </pre>
    </div>
  );
}

function FileItem({ item }: { item: PayloadItem }) {
  const handleDownload = () => {
    const blob = new Blob([new Uint8Array(item.data)], { type: item.mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = item.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const isImage = item.mimeType.startsWith('image/');

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
          {isImage ? <Image className="w-5 h-5" /> : <File className="w-5 h-5" />}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-700 truncate">{item.name}</p>
          <p className="text-xs text-slate-500">
            {item.mimeType} — {formatSize(item.data.byteLength)}
          </p>
        </div>
        <button
          onClick={handleDownload}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-[#E86C1F] to-[#F4B223] text-white hover:shadow-lg hover:shadow-[#E86C1F]/30 transition-all duration-200"
        >
          <Download className="w-4 h-4" />
          Last ned
        </button>
      </div>
    </div>
  );
}

export default function DecryptedDataView({ items }: DecryptedDataViewProps) {
  return (
    <div className="space-y-4">
      {/* Warning */}
      <div className="flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3">
        <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-amber-800">
          Denne informasjonen vises kun i nettleseren din. Lukk fanen for å fjerne den fra minnet.
          Ingenting lagres på serveren.
        </p>
      </div>

      {/* Items */}
      {items.map((item, i) => (
        <div key={`${item.name}-${i}`}>
          {item.type === 'text' ? <TextItem item={item} /> : <FileItem item={item} />}
        </div>
      ))}
    </div>
  );
}
