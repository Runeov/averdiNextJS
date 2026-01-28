'use client';

import { ArrowRight } from 'lucide-react';
import { AverdiBackground } from '@/components/modules/AverdiBackground';

interface ServiceHeroProps {
  title: string;
  subtitle: string;
  description: string;
  stats?: { value: string; label: string };
  ctaText?: string;
  ctaLink?: string;
}

export function ServiceHero({
  title,
  subtitle,
  description,
  stats,
  ctaText = "Kontakt oss",
  ctaLink = "#contact"
}: ServiceHeroProps) {
  return (
    <section className="relative py-24 overflow-hidden bg-white">
      <AverdiBackground />
      
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          
          {/* Stats Badge */}
          {stats && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E86C1F]/10 text-[#E86C1F] text-sm font-medium mb-6">
              {stats.value} {stats.label}
            </div>
          )}
          
          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6">
            {title}
          </h1>
          
          {/* Subtitle */}
          <p className="text-2xl md:text-3xl font-semibold text-slate-700 mb-6">
            {subtitle}
          </p>
          
          {/* Description */}
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            {description}
          </p>
          
          {/* CTA Button */}
          <a
            href={ctaLink}
            className="group inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white transition-all duration-300 bg-gradient-to-r from-[#E86C1F] to-[#F4B223] rounded-full hover:shadow-lg hover:shadow-[#E86C1F]/30 hover:-translate-y-0.5 focus:outline-none"
          >
            {ctaText}
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
