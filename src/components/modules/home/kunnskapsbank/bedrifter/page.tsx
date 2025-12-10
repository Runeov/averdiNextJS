import { ExpertInsight } from '@/components/modules/kunnskapsbank/ExpertInsight';
import { getExpert } from '@/data/experts';
import { CategoryCard } from '@/components/modules/kunnskapsbank/CategoryGrid';
import { Calculator, ShoppingBag, Truck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function BedriftHub() {
  const ingvald = getExpert('ingvald-laiti');

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <Link href="/kunnskapsbank" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-8 font-medium transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Tilbake til oversikt
        </Link>

        <div className="mb-12">
          <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-3 block">Næringsliv i Nord</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">Bedrift i Tiltakssonen</h1>
          <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
            Det skal lønne seg å drive næring i nord. Vi sikrer at du utnytter alle fordelene, fra 0% arbeidsgiveravgift til nedskriving av lån.
          </p>
        </div>

        {ingvald && (
          <ExpertInsight 
            title="Pass på 'Sone-fellen' i lønnssystemet" 
            quote="Har du ansatte på hjemmekontor sørpå? Da gjelder IKKE nullsatsen. Feilrapportering her er en gjenganger ved bokettersyn."
            expert={ingvald}
          >
            <p>Arbeidsgiveravgiften følger den ansatte, ikke hovedkontoret. Vi hjelper deg å sette opp lønnssystemet (PowerOffice/Finago) riktig for å håndtere differensiert avgift.</p>
          </ExpertInsight>
        )}

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <CategoryCard 
            title="Tiltakssonen & Skatt"
            description="Alt om 0% AGA, nedskriving av studielån og Finnmarksfradrag."
            href="/kunnskapsbank/bedrifter/tiltakssonen"
            icon={Calculator}
            theme="blue"
          />
          <CategoryCard 
            title="Handel & Kasse"
            description="Kassasystemloven, varetelling og mva-regler for butikk."
            href="/kunnskapsbank/bedrifter/handel"
            icon={ShoppingBag}
            theme="blue"
          />
          <CategoryCard 
            title="Transport & Logistikk"
            description="Spesielle regler for transportstøtte og avgifter i nord."
            href="/kunnskapsbank/bedrifter/transport"
            icon={Truck}
            theme="blue"
          />
        </div>
      </div>
    </main>
  );
}