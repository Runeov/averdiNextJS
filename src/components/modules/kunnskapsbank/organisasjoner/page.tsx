import { ExpertInsight } from '@/components/modules/kunnskapsbank/ExpertInsight';
import { getExpert } from '@/data/experts';
import { CategoryCard } from '@/components/home/modules/kunnskapsbank/CategoryGrid';
import { Trophy, Receipt, HeartHandshake, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function OrganisasjonHub() {
  const alida = getExpert('alida');

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
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
            title="Idrettslag"
            description="Kasserer-guiden: Medlemskontingent, Vipps og dugnad."
            href="/kunnskapsbank/organisasjoner/idrettslag"
            icon={Trophy}
            theme="green"
          />
          <CategoryCard 
            title="Momskompensasjon"
            description="Slik får dere pengene tilbake. Frister og krav."
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