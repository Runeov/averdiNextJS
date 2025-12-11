import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Users, 
  TrendingUp, 
  Wallet, 
  FileCheck, 
  BookOpen, 
  ExternalLink,
  Target
} from 'lucide-react';
import { InnsatssoneCalculator } from '@/components/tools/InnsatssoneCalculator';
import { ExpertInsight } from '@/components/modules/kunnskapsbank/ExpertInsight';
import { CtaBlock } from '@/components/modules/kunnskapsbank/CtaBlock';
import { McpDataSpan } from '@/components/ui/McpDataSpan';
import { getExpert } from '@/data/experts';
import { AverdiBackground } from '@/components/modules/AverdiBackground';
import { FaqAccordion } from '@/components/ui/FaqAccordion';

export const metadata: Metadata = {
  title: 'Rekruttering i Nord 2026 | Slik bruker du fordelene',
  description: 'Statsbudsjettet 2026 gir deg et kraftig rekrutteringsvåpen. Se hvordan 60.000 i gjeldsslette kan tilsvare 100.000 i lønnsøkning.',
};

export default function RekrutteringPage() {
  const alida = getExpert('alida'); // Alida er HR/Lønn ekspert

  // FAQ Data for Rekruttering
  const faqData = [
    {
      question: 'Hvem får slettet 60 000 kr i studielån?',
      answer: 'Forslaget for 2026 gjelder alle personer som bor og arbeider i Tiltakssonen (Finnmark og Nord-Troms) i minst 12 måneder. Det er ingen krav til yrke, men gjelden må være knyttet til fullført utdanning.'
    },
    {
      question: 'Hva er forskjellen på "Tiltakssonen" og "Distriktskommuner"?',
      answer: 'I Tiltakssonen slettes inntil 60 000 kr per år. I andre distriktskommuner (sone 5 og 6 utenfor nord) er satsen 25 000 kr. Tiltakssonen har altså mer enn dobbel effekt.'
    },
    {
      question: 'Må bedriften betale for gjeldslettingen?',
      answer: 'Nei, dette er en statlig ordning via Lånekassen. Bedriften betaler ingenting, men kan bruke verdien av ordningen i sin markedsføring mot jobbsøkere.'
    },
    {
      question: 'Gjelder 0% arbeidsgiveravgift for alle ansatte?',
      answer: 'Ja, så lenge den ansatte utfører hoveddelen av arbeidet i Tiltakssonen. For ansatte med mye hjemmekontor sørpå eller pendlere, gjelder egne regler.'
    }
  ];

  // JSON-LD Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqData.map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer
      }
    }))
  };

  return (
    <main className="min-h-screen bg-slate-50 relative overflow-hidden">
      <AverdiBackground />
      
      {/* Inject Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <article className="relative z-10 container mx-auto px-4 py-12 max-w-5xl">
        
        {/* Breadcrumb */}
        <Link href="/kunnskapsbank/bedrifter" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-8 font-medium transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Tilbake til Bedrift-hub
        </Link>

        {/* Hero */}
        <div className="mb-12 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
            Strategisk HR & Lønn
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900">
            Slik vinner du kampen om <span className="text-blue-600">hodene i 2026</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
            I 2026 endres spillereglene. Med en dobling av gjeldsslette til <McpDataSpan id="studielan-sats-hero" value="60 000" format="currency" className="font-bold text-slate-900"/> har bedrifter i nord fått et rekrutteringsvåpen som matcher Oslo-lønn – hvis du vet hvordan du bruker det.
          </p>
        </div>

        {/* --- KALKULATOR VERKTØY --- */}
        <div className="my-16">
          <InnsatssoneCalculator />
        </div>

        {/* Expert Insight: Alida (HR) */}
        {alida && (
          <ExpertInsight 
            title="Ikke selg bruttolønn – selg disponibel inntekt" 
            quote="Når jeg hjelper bedrifter med lønnspakker, ser vi ofte at en lønn på 650 000 kr i Alta gir samme kjøpekraft som 850 000 kr i Oslo. Men kandidaten vet ikke dette før du viser dem regnestykket."
            expert={alida}
          >
            <p>
              Mange søkere ser seg blinde på bruttolønn. Din jobb i intervjuet er å vise "Total Compensation"-pakken. 
              Med gratis barnehage, el-avgiftsfritak og gjeldsslette, sitter familien igjen med mye mer penger til ferie og sparing, selv med lavere nominell lønn.
            </p>
          </ExpertInsight>
        )}

        {/* Main Content */}
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 my-16">
          
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            Den nye "Nord-Norge pakken" for 2026
          </h2>
          
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            [cite_start]Regjeringens forslag til Statsbudsjett 2026 inneholder historiske økninger i de personrettede virkemidlene [cite: 475-476]. 
            Dette er ikke "distriktsstøtte", men en direkte investering i din bedrifts evne til å tiltrekke kompetanse.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            
            {/* Studielån */}
            <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white rounded-lg shadow-sm text-green-600">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Gjeldsslette</h3>
              </div>
              <p className="text-slate-700 mb-4 text-sm">
                [cite_start]Satsen økes til <strong>60 000 kr</strong> per år[cite: 552]. For en ansatt med studielån er dette penger rett i lomma (netto).
              </p>
              <div className="bg-white p-3 rounded border border-green-200 text-xs text-slate-600">
                <strong>Verdi før skatt:</strong> Tilsvarer en lønnsøkning på ca. 
                [cite_start]<span className="text-green-700 font-bold ml-1">109 000 kr</span>[cite: 565].
              </div>
            </div>

            {/* Skatt */}
            <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white rounded-lg shadow-sm text-purple-600">
                  <Wallet className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Lavere Skatt</h3>
              </div>
              <p className="text-slate-700 mb-4 text-sm">
                [cite_start]Finnmarksfradraget økes til <strong>45 000 kr</strong>[cite: 574]. I tillegg er skattesatsen på alminnelig inntekt 18,5% (mot 22% sørpå).
              </p>
              <div className="bg-white p-3 rounded border border-purple-200 text-xs text-slate-600">
                <strong>Effekt:</strong> Gir ca 20 000 kr mer utbetalt per år for et par.
              </div>
            </div>

          </div>

          <h3 className="text-xl font-bold text-slate-900 mb-4">Slik bruker du dette i stillingsannonsen</h3>
          <ul className="space-y-4 text-slate-600 mb-8">
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
              <span>
                <strong>Ikke skriv:</strong> "Vi følger tariff."<br/>
                <strong>Skriv heller:</strong> "Hos oss får du en kjøpekraft som tilsvarer 800.000 i Oslo."
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
              <span>
                [cite_start]<strong>Synliggjør boligmarkedet:</strong> "Selg leiligheten i Oslo, kjøp enebolig her, og bli gjeldfri på 5 år med statlig nedskriving." [cite: 608-614].
              </span>
            </li>
          </ul>

        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Vanlige spørsmål fra kandidater</h2>
          <FaqAccordion items={faqData} themeColor="#2563EB" />
        </div>

        {/* CTA */}
        <CtaBlock 
          title="Trenger du hjelp med lønnskjøring?"
          description="Vi kan sette opp lønnssystemet ditt slik at det automatisk håndterer de ulike sonene og rapporterer riktig til myndighetene."
          primaryButtonText="Snakk med Alida"
          primaryButtonLink="/kontakt"
          secondaryButtonText="Tilbake til Bedriftsoversikt"
          secondaryButtonLink="/kunnskapsbank/bedrifter"
        />

        {/* Kilder */}
        <div className="border-t border-slate-200 pt-8 pb-4 mt-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-xs text-slate-500">
            <div className="flex items-start gap-3 max-w-2xl">
              <BookOpen className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-700 mb-1">Kilder</p>
                <p>
                  Basert på forslag til <strong>Statsbudsjettet 2026</strong> og satser fra Lånekassen for Tiltakssonen.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://lanekassen.no/nb-NO/gjeld-og-betaling/finnmark-eller-nord-troms/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                Lånekassen (Nedskriving) <ExternalLink className="w-3 h-3" />
              </a>
              <a href="https://www.skatteetaten.no/satser/finnmarksfradraget/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                Skatteetaten <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

      </article>
    </main>
  );
}