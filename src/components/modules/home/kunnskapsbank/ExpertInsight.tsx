import { Newspaper, Quote } from 'lucide-react';
import type { Expert } from '@/data/experts';

interface ExpertInsightProps {
  title: string;
  quote: string;
  expert: Expert;
  children: React.ReactNode;
}

export function ExpertInsight({ title, quote, expert, children }: ExpertInsightProps) {
  // Hjelpefunksjon for å lage initialer (f.eks. "Ingvald Laiti" -> "IL")
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <section className="my-16 bg-white border-l-4 border-[#E86C1F] shadow-lg rounded-r-xl overflow-hidden">
      <div className="p-8 sm:p-10">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-[#E86C1F]/10 rounded-lg">
            <Newspaper className="h-6 w-6 text-[#E86C1F]" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Aktuelt fra fageksperten</h2>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              {title}
            </h3>
            
            <div className="text-slate-600 leading-relaxed space-y-4">
              {/* Hovedtekst */}
              {children}

              {/* Sitatboks */}
              <div className="font-medium text-slate-800 bg-slate-50 p-6 rounded-lg border border-slate-200 relative mt-6">
                <Quote className="absolute top-3 right-3 h-5 w-5 text-slate-300" />
                <p className="italic relative z-10">
                  "{quote}"
                </p>
              </div>
            </div>

            {/* Forfatterinfo - Tilpasset din experts.ts */}
            <div className="mt-8 flex items-center gap-3 pt-6 border-t border-slate-100">
              <div className="h-12 w-12 rounded-full bg-[#E86C1F]/10 flex items-center justify-center font-bold text-[#E86C1F] text-sm border-2 border-white shadow-sm overflow-hidden">
                {/* Viser bilde hvis det finnes, ellers initialer */}
                {expert.image ? (
                  <img src={expert.image} alt={expert.name} className="w-full h-full object-cover" />
                ) : (
                  <span>{getInitials(expert.name)}</span>
                )}
              </div>
              <div className="text-sm">
                <p className="font-bold text-slate-900">{expert.name}</p>
                <p className="text-slate-500">{expert.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}