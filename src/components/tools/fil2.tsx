'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calculator, CheckCircle2, TrendingUp, Users, Wallet, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { McpDataSpan } from '@/components/ui/McpDataSpan';

// --- KONFIGURASJON & SATSER (MCP-Klar) ---
const RATES = {
  agaSone1: 0.141, // 14.1%
  agaSone5: 0.000, // 0%
  finnmarkFradrag: 45000, // [cite: 104]
  studielanSats: 60000,   // [cite: 82]
  skatteSatsSone1: 0.22,  // 22%
  skatteSatsSone5: 0.185, // 18.5% [cite: 337]
  marginalSkatt: 0.45     // Brukes for bruttolønnsekvivalent [cite: 93]
};

export function InnsatssoneCalculator() {
  const [step, setStep] = useState(1);
  
  // State for inputs
  const [employees, setEmployees] = useState(5);
  const [avgSalary, setAvgSalary] = useState(650000);
  const [isZone5, setIsZone5] = useState(true); // Default true for demo

  // --- BEREGNINGSLOGIKK ---
  const results = useMemo(() => {
    const totalSalary = employees * avgSalary;
    
    // 1. Bedriftens Besparelse (AGA) [cite: 410-412]
    const costOslo = totalSalary * RATES.agaSone1;
    const costNord = totalSalary * RATES.agaSone5;
    const agaSavings = costOslo - costNord;

    // 2. Ansattverdi (Rekrutteringskraft) [cite: 457-460]
    // Hvor mye måtte bedriften i Oslo betalt i bruttolønn for å matche nettofordelen?
    // Netto fordel per ansatt:
    const netStudentLoan = RATES.studielanSats; // Netto (avdrag er etter skatt penger)
    const netTaxDeduction = RATES.finnmarkFradrag * RATES.skatteSatsSone5; // Verdien av fradraget
    const netTaxRateDiff = (avgSalary - 100000) * (RATES.skatteSatsSone1 - RATES.skatteSatsSone5); // Grov forenkling av trinnskatt-fordel
    
    const totalNetBenefitPerEmp = netStudentLoan + netTaxDeduction + netTaxRateDiff;
    
    // Omregnet til Bruttolønn (Oslo-ekvivalent) [cite: 364]
    const grossEquivalentPerEmp = totalNetBenefitPerEmp / (1 - RATES.marginalSkatt);
    
    const totalRecruitmentPower = grossEquivalentPerEmp * employees;

    return {
      agaSavings,
      grossEquivalentPerEmp,
      totalRecruitmentPower,
      totalValue: agaSavings + totalRecruitmentPower
    };
  }, [employees, avgSalary]);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden max-w-4xl mx-auto my-16">
      
      {/* Header / Progress */}
      <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Innsatssonekalkulatoren</h3>
            <p className="text-xs text-slate-400">Basert på Statsbudsjettet 2026</p>
          </div>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-2 w-8 rounded-full transition-colors ${step >= i ? 'bg-blue-500' : 'bg-slate-700'}`} />
          ))}
        </div>
      </div>

      <div className="p-8 md:p-12 min-h-[400px]">
        <AnimatePresence mode='wait'>
          
          {/* --- STEG 1: INPUT --- */}
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">La oss se på tallene dine</h2>
                <p className="text-slate-600">For å beregne din konkurransekraft i nord, trenger vi et grovt estimat på bemanningen.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="block text-sm font-bold text-slate-700">Antall ansatte</label>
                  <div className="relative">
                    <Users className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                    <input 
                      type="number" 
                      value={employees}
                      onChange={(e) => setEmployees(Number(e.target.value))}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-lg font-bold text-slate-900"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-bold text-slate-700">Snitt årslønn (inkl. feriepenger)</label>
                  <div className="relative">
                    <Wallet className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                    <input 
                      type="number" 
                      value={avgSalary}
                      onChange={(e) => setAvgSalary(Number(e.target.value))}
                      step="10000"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-lg font-bold text-slate-900"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-3 items-start">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <p className="text-sm text-blue-800">
                  Vi sammenligner kostnaden mot en bedrift i Sone 1 (Oslo/Viken) med <McpDataSpan id="aga-sone1" value="14.1" format="percentage" /> arbeidsgiveravgift.
                </p>
              </div>

              <button onClick={nextStep} className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                Beregn gevinst <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {/* --- STEG 2: MELLOMSPILL (Kunnskap) --- */}
          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <h2 className="text-2xl font-bold text-slate-900 text-center">Mens vi regner... visste du dette?</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">Rekrutteringsvåpenet</h3>
                  <p className="text-sm text-slate-600">
                    I 2026 økes nedskrivingen av studielån til <McpDataSpan id="studielan-sats-2026" value="60 000" format="currency" className="font-bold" />. 
                    Dette tilsvarer en lønnsøkning på ca. 100 000 kr før skatt for dine ansatte[cite: 82].
                  </p>
                </div>
                
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">Ingen AGA</h3>
                  <p className="text-sm text-slate-600">
                    Bedrifter i tiltakssonen betaler <McpDataSpan id="aga-sone5" value="0" format="percentage" className="font-bold" /> arbeidsgiveravgift. 
                    Dette er en ren konkurransefordel som går rett på bunnlinjen.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <button onClick={prevStep} className="flex-1 py-4 text-slate-500 hover:text-slate-800 font-medium">Endre tall</button>
                <button onClick={nextStep} className="flex-1 bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all">
                  Se resultatet
                </button>
              </div>
            </motion.div>
          )}

          {/* --- STEG 3: RESULTAT --- */}
          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              <div className="text-center">
                <p className="text-slate-500 uppercase tracking-wider text-sm font-bold mb-2">Din konkurransefordel i Nord</p>
                <div className="text-5xl md:text-6xl font-extrabold text-blue-600 mb-2">
                  {results.totalValue.toLocaleString('no-NO')} kr
                </div>
                <p className="text-slate-400 text-sm">Total årlig verdi (Bedrift + Ansatte)</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Kort 1: Bedriftens cash */}
                <div className="bg-white border-2 border-blue-100 p-6 rounded-2xl relative overflow-hidden group hover:border-blue-300 transition-colors">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <TrendingUp className="w-24 h-24 text-blue-600" />
                  </div>
                  <h3 className="text-slate-500 font-medium text-sm mb-1">Spart Arbeidsgiveravgift (AGA)</h3>
                  <p className="text-3xl font-bold text-slate-900 mb-4">{results.agaSavings.toLocaleString('no-NO')} kr</p>
                  <p className="text-xs text-slate-500">
                    Dette er penger som blir igjen i bedriften. Du kan bruke dem til å øke lønningene med 14,1% uten at det koster deg mer enn en konkurrent i Oslo[cite: 412].
                  </p>
                </div>

                {/* Kort 2: Ansattes verdi */}
                <div className="bg-white border-2 border-green-100 p-6 rounded-2xl relative overflow-hidden group hover:border-green-300 transition-colors">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Users className="w-24 h-24 text-green-600" />
                  </div>
                  <h3 className="text-slate-500 font-medium text-sm mb-1">Rekrutteringskraft</h3>
                  <p className="text-3xl font-bold text-slate-900 mb-4">{Math.round(results.grossEquivalentPerEmp).toLocaleString('no-NO')} kr <span className="text-sm font-normal text-slate-400">/ansatt</span></p>
                  <p className="text-xs text-slate-500">
                    Dette er "Oslo-tillegget" dine ansatte får gratis av staten (gjeldsslette + skatt). Bruk dette tallet i stillingsannonsen! [cite: 304]
                  </p>
                </div>
              </div>

              {/* UPSELL / STRATEGISK RÅD */}
              <div className="bg-slate-900 text-white p-6 rounded-2xl mt-8">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                      <CheckCircle2 className="text-green-400" />
                      Du kvalifiserer sannsynligvis til mer
                    </h4>
                    <p className="text-slate-300 text-sm mb-4">
                      I tillegg til skattefordelene, kan bedrifter i Tiltakssonen søke om investeringsstøtte fra Sametinget.
                    </p>
                    <ul className="text-sm text-slate-400 space-y-1 mb-4">
                      <li>• Opptil <strong>500 000 kr</strong> i tilskudd til Variert Næringsliv</li>
                      <li>• "Gratis" penger (ikke lån)</li>
                    </ul>
                  </div>
                  <div>
                    <Link 
                      href="/kunnskapsbank/sametinget/naering"
                      className="inline-flex items-center justify-center px-6 py-3 bg-[#E86C1F] text-white font-bold rounded-full hover:bg-[#d65f18] transition-all whitespace-nowrap"
                    >
                      Sjekk Næringsstøtte
                    </Link>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button onClick={() => setStep(1)} className="text-sm text-slate-400 hover:text-blue-600 underline">
                  Start beregningen på nytt
                </button>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}