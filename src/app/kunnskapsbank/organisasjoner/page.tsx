import Link from 'next/link';
import { ArrowLeft, Trophy, Receipt, HeartHandshake } from 'lucide-react';
import { ExpertInsight } from '@/components/modules/kunnskapsbank/ExpertInsight';
import { getExpert } from '@/data/experts';
// ✅ KORRIGERT IMPORT (Fjernet 'home' fra stien):
import { CategoryCard } from '@/components/modules/kunnskapsbank/CategoryGrid'; 
import { AverdiBackground } from '@/components/modules/AverdiBackground';

export const metadata = {
  title: 'Lag & Forening | Regnskapshjelp for Frivilligheten',
  description: 'Vi forenkler hverdagen for kasserere i idrettslag og foreninger. Få hjelp med momskompensasjon, medlemsregister og årsregnskap.',
};

export default function OrganisasjonHub() {
  const alida = getExpert('alida');

  return (
    <main className="min-h-screen bg-slate-50 relative overflow-hidden">
      <AverdiBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
        
        <Link href="/kunnskapsbank" className="inline-flex items-center text-slate-500 hover:text-green-600 mb-8 font-medium transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Tilbake til oversikt
        </Link>

        <div className="mb-12">
          <span className="text-green-600 font-bold tracking-wider uppercase text-sm mb-3 block">Frivillighet & Idrett</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">Lag & Forening</h1>
          <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
            Vi tar oss av regnskapet slik at dere kan bruke tiden på aktivitet. Spesialisert på idrettslag, velforeninger og samiske organisasjoner.
          </p>
        </div>

        {alida && (
          <ExpertInsight 
            title="Ikke gå glipp av momskompensasjonen" 
            quote="Dette er 'gratis penger' mange glemmer. For 2024 fikk våre kunder refundert betydelige summer rett i klubbkassa."
            expert={alida}
          >
            <p>Vi sørger for at regnskapet er satt opp riktig fra start, slik at søknaden om momskompensasjon blir en enkel rutine, ikke en hodepine.</p>
          </ExpertInsight>
        )}

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <CategoryCard 
            title="Idrettslag & Vipps"
            description="Kasserer-guiden: Slik integrerer du Vipps med regnskapet og får kontroll på kiosken."
            href="/kunnskapsbank/organisasjoner/idrettslag"
            icon={Trophy}
            theme="green"
          />
          <CategoryCard 
            title="Momskompensasjon"
            description="Slik får dere pengene tilbake. Frister og krav til dokumentasjon."
            href="/kunnskapsbank/organisasjoner/moms"
            icon={Receipt}
            theme="green"
          />
          <CategoryCard 
            title="Samiske Foreninger"
            description="Spesielle støtteordninger for språksentre og kulturhus."
            href="/kunnskapsbank/organisasjoner/samisk"
            icon={HeartHandshake}
            theme="green"
          />
        </div>
      </div>
    </main>
  );
}