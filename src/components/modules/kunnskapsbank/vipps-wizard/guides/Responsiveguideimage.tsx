'use client';

import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { X, ZoomIn } from 'lucide-react';

interface Props {
  /** Desktop version of the image */
  desktopSrc: StaticImageData;
  /** Mobile version of the image (optional - will use desktop if not provided or fails to load) */
  mobileSrc?: StaticImageData;
  /** Alt text for accessibility */
  alt: string;
  /** Optional: Show "tap to enlarge" hint on mobile */
  showZoomHint?: boolean;
  /** Optional: Caption below the image */
  caption?: string;
}

export function ResponsiveGuideImage({ 
  desktopSrc, 
  mobileSrc, 
  alt, 
  showZoomHint = true,
  caption 
}: Props) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [mobileImageFailed, setMobileImageFailed] = useState(false);

  // Use mobile image if provided and hasn't failed, otherwise fall back to desktop
  const mobileImage = (mobileSrc && !mobileImageFailed) ? mobileSrc : desktopSrc;
  const hasDedicatedMobileImage = mobileSrc && !mobileImageFailed;

  return (
    <>
      {/* Image Container */}
      <div className="rounded-lg border border-slate-200 bg-slate-50">
        
        {/* Mobile Image (tap to zoom) */}
        <button
          onClick={() => setIsZoomed(true)}
          className="block md:hidden w-full text-left group relative"
          aria-label={`${alt} - Trykk for å forstørre`}
        >
          <Image
            src={mobileImage}
            alt={alt}
            className="w-full h-auto rounded-md"
            sizes="100vw"
            placeholder="blur"
            onError={() => {
              if (mobileSrc) {
                setMobileImageFailed(true);
              }
            }}
          />
          
          {/* Only show zoom hint if using dedicated mobile image */}
          {showZoomHint && hasDedicatedMobileImage && (
            <div className="absolute bottom-2 right-2 flex items-center gap-1.5 bg-black/70 text-white text-xs px-2 py-1 rounded-full opacity-80 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="w-3 h-3" />
              <span>Trykk for å forstørre</span>
            </div>
          )}
        </button>

        {/* Desktop Image (no zoom needed) */}
        <div className="hidden md:block">
          <Image
            src={desktopSrc}
            alt={alt}
            className="w-full h-auto rounded-md"
            sizes="(max-width: 768px) 100vw, 700px"
            placeholder="blur"
          />
        </div>

        {/* Optional caption */}
        {caption && (
          <p className="text-xs text-slate-500 mt-2 text-center">{caption}</p>
        )}
      </div>

      {/* Fullscreen Zoom Modal - Enlarged for detail viewing */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex flex-col cursor-pointer"
          onClick={() => setIsZoomed(false)}
        >
          {/* Close button */}
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsZoomed(false)}
              className="text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Lukk"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Scrollable zoomed image area */}
          <div className="flex-1 overflow-auto p-4">
            <Image
              src={mobileImage}
              alt={alt}
              className="rounded-lg"
              sizes="200vw"
              placeholder="blur"
              style={{ 
                width: `${Math.round(mobileImage.width * 0.7)}px`,
                maxWidth: 'none',
                maxHeight: '100vh',
                height: 'auto'
              }}
            />
          </div>

          {/* Hint text */}
          <div className="text-center pb-4 text-white/60 text-sm">
            Dra for å se detaljer • Trykk hvor som helst for å lukke
          </div>
        </div>
      )}
    </>
  );
}