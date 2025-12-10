import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, AlertTriangle, FileText, Scissors, Hammer, ShoppingBag } from 'lucide-react';
import { ExpertInsight } from '@/components/modules/kunnskapsbank/ExpertInsight';
import { McpDataSpan } from '@/components/ui/McpDataSpan';
import { getExpert } from '@/data/experts';
import { AverdiBackground } from '@/components/modules/AverdiBackground'; // Oppdatert import-sti
import { CtaBlock } from '@/components/modules/kunnskapsbank/CtaBlock';

export const metadata: Metadata = {
  title: 'Støtte til Duodji & Håndverk | Sametinget',
  description: 'Guide for duodjiutøvere. Lær om driftstilskudd, verkstedstøtte og den unike fritaksordningen for merverdiavgift (duodji-momsen).',
};

export default function DuodjiPage() {
  const janAtle = getExpert('jan-atle');

  return (
    <main className="min-h-screen bg-slate-50 relative overflow-hidden">
      <AverdiBackground />
      
      <article className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
        
        {/* Breadcrumb */}
        <Link href="/kunnskapsbank/sametinget" className="inline-flex items-center text-slate-500 hover:text-[#E86C1F] mb-8 font-medium transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Tilbake til Sametinget-hub
        </Link>

        {/* Hero */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-[#E86C1F] text-sm font-medium mb-4">
            For Tradisjonshåndverkere
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            Slik lever du av <span className="text-[#E86C1F]">Duodji</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Duodji er mer enn håndverk; det er kulturformidling. Derfor finnes det helt egne ordninger for deg, 
            inkludert driftstilskudd og gunstige skatteregler som skiller seg fra vanlig næringsliv.
          </p>
        </div>

        {/* --- EYECATCHER: ØKONOMISKE FORDELER --- */}
        <div className="bg-orange-50 border-l-4 border-[#E86C1F] p-6 rounded-r-xl mb-16 shadow-sm">
          <div className="flex flex-col md:flex-row gap-8">
            
            {/* Del 1: Driftstilskudd */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3 text-orange-900">
                <Scissors className="w-6 h-6 text-[#E86C1F]" />
                <h3 className="font-bold text-lg">Driftstilskudd</h3>
              </div>
              <div className="bg-white p-4 rounded-lg border border-orange-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 uppercase font-semibold">Grunnbeløp</span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-bold text-2xl text-slate-900">Variabelt</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 uppercase font-semibold">Formål</span>
                  <div className="font-bold text-lg text-green-600">Dekke drift</div>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                * Krever registrering i Duodjiregisteret og omsetningskrav (ofte 50 000 kr).
              </p>
            </div>

            {/* Del 2: Investeringer */}
            <div className="flex-1 md:border-l md:border-orange-200 md:pl-8">
              <div className="flex items-center gap-3 mb-3 text-orange-900">
                <Hammer className="w-6 h-6 text-[#E86C1F]" />
                <h3 className="font-bold text-lg">Verksted & Utstyr</h3>
              </div>
              <div className="bg-white p-4 rounded-lg border border-orange-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 uppercase font-semibold">Maks Støtte</span>
                  <div className="flex items-baseline gap-1">
                    <McpDataSpan 
                      id="sameting-duodji-maks-sats" 
                      value="500 000" 
                      format="currency" 
                      source="Sametinget Duodji"
                      className="font-bold text-2xl text-slate-900" 
                    />
                    <span className="text-sm text-slate-500 font-medium">kr</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 uppercase font-semibold">Dekning</span>
                  <div className="font-bold text-lg text-green-600">Inntil 35%</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Nøkkelinformasjon Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-slate-900">
              <CheckCircle2 className="text-green-500 w-5 h-5" /> Hvem kan søke?
            </h3>
            <ul className="space-y-3 text-slate-600 text-sm">
              <li>• Enkeltpersonforetak (ENK) eller AS</li>
              <li>• Du må ha <strong>fagbrev</strong> eller dokumentert kompetanse</li>
              <li>• Hovedinntekten bør komme fra egenproduksjon</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-slate-900">
              <AlertTriangle className="text-[#E86C1F] w-5 h-5" /> Duodjiregisteret
            </h3>
            <ul className="space-y-3 text-slate-600 text-sm">
              <li>• Inngangsbilletten til de fleste ordningene</li>
              <li>• Krever søknad for å bli tatt opp</li>
              <li>• Gir rett til mva-fritak og driftstilskudd</li>
            </ul>
          </div>
        </div>

        {/* Expert Insight - Fokus på MOMS */}
        {janAtle && (
          <ExpertInsight 
            title="Duodji-momsen: Din beste venn" 
            quote="Mange vet ikke at salg av egenprodusert duodji er fritatt for merverdiavgift (0%), samtidig som du har full fradragsrett for inngående moms på utstyr. Dette er en enorm likviditetsfordel."
            expert={janAtle}
          >
            <p>
              Normalt må man betale 25% moms til staten på alt man selger. Som registrert duodji-utøver slipper du dette på varene du lager selv. 
              Men husk: Hvis du også selger innkjøpte varer (f.eks. kaffe eller suvenirer), må regnskapet splitte disse to momssatsene pinlig nøyaktig.
            </p>
          </ExpertInsight>
        )}

        {/* Main Content Sections */}
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 my-16">
          
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            Fra hobby til næring
          </h2>
          
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Sametingets mål er å profesjonalisere bransjen. Det betyr at du må drive bedriften som en seriøs næring, ikke bare en binæring.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            <div className="p-5 bg-orange-50 rounded-xl border border-orange-100">
              <div className="flex items-center gap-3 mb-3">
                <ShoppingBag className="w-6 h-6 text-[#E86C1F]" />
                <h3 className="font-bold text-slate-900 text-lg">Markedstiltak</h3>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                Støtte til markedsføring, deltakelse på messer, emballasjedesign og nettbutikk. 
                Viktig for å nå kunder utenfor Sápmi.
              </p>
            </div>

            <div className="p-5 bg-blue-50 rounded-xl border border-blue-100">
              <div className="flex items-center gap-3 mb-3">
                <Hammer className="w-6 h-6 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-lg">Verksted</h3>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                Investering i maskiner (symaskin, laserkutter etc.) og ombygging av lokaler. 
                Ofte en forutsetning for effektiv produksjon.
              </p>
            </div>
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
            Kompetansekravet
          </h3>
          
          <p className="text-slate-600 mb-4">
            I motsetning til "Variert næringsliv", stilles det faglige krav for duodji-støtte. Du må dokumentere at du faktisk kan håndverket.
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-600 mb-8 ml-2">
            <li>Fagbrev i duodji</li>
            <li>Eller: Dokumentert utdanning fra høyskole/universitet</li>
            <li>Eller: "Realkompetanse" vurdert av opptakskomité (bilder av produkter, utstillinger)</li>
          </ul>

          <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-400">
            <h4 className="font-bold text-yellow-800 flex items-center gap-2 mb-2 text-lg">
              <FileText className="w-5 h-5" /> Regnskapstips
            </h4>
            <p className="text-sm text-yellow-800 leading-relaxed">
              Varelageret ditt (ferdige produkter og råvarer som skinn/horn) har en verdi. 
              Ved årsskiftet <strong>må</strong> dette telles. Mange glemmer at varelageret påvirker skatten direkte. 
              Vi hjelper deg å sette opp gode rutiner for varetelling.
            </p>
          </div>
        </div>

        {/* CTA Component */}
        <CtaBlock 
          title="Vil du leve av hendene dine?"
          description="Vi hjelper deg med søknad om opptak i Duodjiregisteret og setter opp et regnskapssystem som håndterer momsfritaket automatisk."
          primaryButtonText="Få hjelp med regnskapet"
          primaryButtonLink="/kontakt"
          secondaryButtonText="Se annen næringsstøtte"
          secondaryButtonLink="/kunnskapsbank/sametinget/naering"
        />

      </article>
    </main>
  );
}