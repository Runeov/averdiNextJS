'use client';

import { useCallback, useRef, useState } from 'react';
import { Upload, X, FileText, Image, FileSpreadsheet, File } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MAX_TOTAL_SIZE } from '@/lib/crypto/constants';

interface FileDropZoneProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileIcon(mimeType: string) {
  if (mimeType.startsWith('image/')) return <Image className="w-4 h-4" />;
  if (mimeType.includes('spreadsheet') || mimeType.includes('excel'))
    return <FileSpreadsheet className="w-4 h-4" />;
  if (mimeType.includes('pdf') || mimeType.includes('text'))
    return <FileText className="w-4 h-4" />;
  return <File className="w-4 h-4" />;
}

export default function FileDropZone({ files, onFilesChange }: FileDropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const totalSize = files.reduce((sum, f) => sum + f.size, 0);
  const isOverLimit = totalSize > MAX_TOTAL_SIZE;

  const addFiles = useCallback(
    (newFiles: FileList | File[]) => {
      const arr = Array.from(newFiles);
      onFilesChange([...files, ...arr]);
    },
    [files, onFilesChange]
  );

  const removeFile = useCallback(
    (index: number) => {
      onFilesChange(files.filter((_, i) => i !== index));
    },
    [files, onFilesChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files.length > 0) {
        addFiles(e.dataTransfer.files);
      }
    },
    [addFiles]
  );

  return (
    <div className="space-y-3">
      {/* Drop zone */}
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
        aria-label="Last opp filer"
        className={cn(
          'relative flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-8 cursor-pointer transition-all duration-200',
          isDragging
            ? 'border-[#E86C1F] bg-[#E86C1F]/5'
            : 'border-slate-300 hover:border-[#E86C1F]/50 hover:bg-slate-50'
        )}
      >
        <div className={cn(
          'w-12 h-12 rounded-full flex items-center justify-center transition-colors',
          isDragging ? 'bg-[#E86C1F]/10 text-[#E86C1F]' : 'bg-slate-100 text-slate-400'
        )}>
          <Upload className="w-6 h-6" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-slate-700">
            Dra filer hit eller klikk for å velge
          </p>
          <p className="text-xs text-slate-500 mt-1">
            PDF, Excel, bilder, JSON, eller andre filtyper. Maks {formatSize(MAX_TOTAL_SIZE)} totalt.
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files) addFiles(e.target.files);
            e.target.value = '';
          }}
        />
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, i) => (
            <div
              key={`${file.name}-${i}`}
              className="flex items-center gap-3 rounded-xl bg-white border border-slate-200 px-4 py-3"
            >
              <div className="text-slate-400">
                {getFileIcon(file.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-700 truncate">
                  {file.name}
                </p>
                <p className="text-xs text-slate-500">{formatSize(file.size)}</p>
              </div>
              <button
                onClick={() => removeFile(i)}
                className="p-1 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                aria-label={`Fjern ${file.name}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}

          {/* Total size */}
          <div className={cn(
            'text-xs px-2',
            isOverLimit ? 'text-red-600 font-medium' : 'text-slate-500'
          )}>
            Totalt: {formatSize(totalSize)}
            {isOverLimit && ` — overstiger grensen på ${formatSize(MAX_TOTAL_SIZE)}`}
          </div>
        </div>
      )}
    </div>
  );
}
