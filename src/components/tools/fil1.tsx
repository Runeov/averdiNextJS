'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Calculator, CheckCircle2, TrendingUp, Users, Wallet, 
  AlertCircle, Building, MapPin, Zap, GraduationCap, Home
} from 'lucide-react';
import { McpDataSpan } from '@/components/ui/McpDataSpan';
import { satser2025 } from '@/data/agaData.ts';
import { getPropertyTaxRate } from '@/data/propertyTaxData.ts';
import { DESTINATION_MUNICIPALITIES, ORIGIN_CITIES, getAgaRate } from '@/data/calculatorData.ts';

// Konstanter for 2026-beregninger (Prop. 1 S)
const CONSTANTS = {
  studielanSone5: 60000,
  studielanDistrikt: 25000,
  finnmarkFradrag: 45000,
  skattSone1: 0.22,
  skattSone5: 0.185,
  trinnskattFordel: 0.02, // Estimat for trinn 3 diff
  marginalSkatt: 0.45,    // For bruttolønns-omregning
  elAvgift: 0.095,        // Kr/kWh (estimat)
  elMoms: 0.25            // Fritak i nord
};

export function InnsatssoneCalculator() {
  const [step, setStep] = useState(1);
  
  // -- STATE INPUTS --
  const [origin, setOrigin] = useState(ORIGIN_CITIES[0]);
  const [dest, setDest] = useState(DESTINATION_MUNICIPALITIES[0]);
  const [propertyValue, setPropertyValue] = useState(6000000);
  
  const [employees, setEmployees] = useState(5);
  const [avgSalary, setAvgSalary] = useState(650000);
  const [executives, setExecutives] = useState(1);
  const [execSalary, setExecSalary] = useState(1100000);
  
  const [includePersonal, setIncludePersonal] = useState(true);

  // -- BEREGNINGER --
  const results = useMemo(() => {
    // 1. AGA (Arbeidsgiveravgift)
    const originRate = getAgaRate(origin.zone);
    const destRate = getAgaRate(dest.zone);
    
    const totalPayroll = (employees * avgSalary) + (executives * execSalary);
    const agaCostOrigin = totalPayroll * originRate;
    const agaCostDest = totalPayroll * destRate;
    const agaSaving = agaCostOrigin - agaCostDest;

    // 2. Eiendomsskatt
    // Antar Origin har standard 3 promille (Oslo har 3 i bunnfradrag-modell, men vi forenkler for sammenligning)
    const pTaxRateOrigin = 3.0; 
    const pTaxRateDest = getPropertyTaxRate(dest.name);
    
    const pTaxCostOrigin = propertyValue * (pTaxRateOrigin / 1000);
    const pTaxCostDest = propertyValue * (pTaxRateDest / 1000);
    const pTaxDiff = pTaxCostOrigin - pTaxCostDest; // Positivt tall = Besparelse

    // 3. Personlige Fordeler (Ansattverdi)
    let personalValueTotal = 0;
    let grossEquivalentPerEmp = 0;

    if (includePersonal && dest.zone === "5") {
      // Studielån (Netto cash)
      const loanBenefit = CONSTANTS.studielanSone5;
      
      // Finnmarksfradrag (Netto skattelette: Fradrag * Skattesats)
      const deductionBenefit = CONSTANTS.finnmarkFradrag * CONSTANTS.skattSone5;
      
      // Lavere skattesats på alminnelig inntekt (22% -> 18.5%)
      // Gjelder nettoinntekt (lønn - minstefradrag). Estimerer skattbart beløp til lønn - 100k
      const taxableIncome = Math.max(0, avgSalary - 104450); // Minstefradrag 2024 sats
      const taxRateBenefit = taxableIncome * (CONSTANTS.skattSone1 - CONSTANTS.skattSone5);
      
      // Strøm (El-avgift + Moms fritak)
      // Estimat: 20.000 kWh forbruk for enebolig
      const elCostSouth = 20000 * (1 + CONSTANTS.elAvgift) * 1.25; // 1 kr spot + avgift + mva
      const elCostNorth = 20000 * 1.0; // 1 kr spot, ingen avgift, ingen mva (på kraft + nett)
      // Grov forenkling: Verdien av fritakene
      const elBenefit = 20000 * (CONSTANTS.elAvgift + (1 * 0.25)); 

      const netBenefitPerPerson = loanBenefit + deductionBenefit + taxRateBenefit + 5000; // +5000 konservativt strøm
      
      // Omregning til Bruttolønn (Hva må bedriften i Oslo betale for å matche?)
      grossEquivalentPerEmp = netBenefitPerPerson / (1 - CONSTANTS.marginalSkatt);
      
      // Total verdi for alle ansatte (Teoretisk rekrutteringskraft)
      personalValueTotal = grossEquivalentPerEmp * (employees + executives);
    }

    return {
      agaSaving,
      pTaxDiff,
      pTaxRateDest,
      personalValueTotal,
      grossEquivalentPerEmp,
      totalAnnualImpact: agaSaving + pTaxDiff + personalValueTotal,
      destIsZone5: dest.zone === "5"
    };
  }, [origin, dest, propertyValue, employees, avgSalary, executives, execSalary, includePersonal]);

  // -- STEG NAVIGASJON --
  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden max-w-5xl mx-auto my-16 font-sans">
      
      {/* Header */}
      <div className="bg-slate-900 p-6 text-white flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2.5 rounded-xl shadow-lg shadow-blue-900/50">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-xl tracking-tight">Innsatssone<span className="text-blue-400">Kalkulator</span></h3>
            <p className="text-xs text-slate-400 font-medium">Beregnet etter Statsbudsjettet 2026</p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className={`h-1.5 w-8 rounded-full transition-all duration-500 ${step >= i ? 'bg-blue-500' : 'bg-slate-700'}`} />
          ))}
          <span className="ml-2 text-xs font-mono text-slate-400">{step}/4</span>
        </div>
      </div>

      <div className="p-6 md:p-10 min-h-[500px] bg-slate-50/50">
        <AnimatePresence mode='wait'>
          
          {/* --- STEG 1: LOKASJON & EIENDOM --- */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Hvor flytter bedriften?</h2>
                <p className="text-slate-600">Start med å velge hvor dere er i dag, og hvor i Nord dere vurderer å etablere dere.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Fra (Referanse)</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                    <select 
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium appearance-none"
                      value={origin.name}
                      onChange={(e) => setOrigin(ORIGIN_CITIES.find(c => c.name === e.target.value) || origin)}
                    >
                      {ORIGIN_CITIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">Til (Innsatssone)</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-blue-500" />
                    <select 
                      className="w-full pl-10 pr-4 py-3 bg-blue-50 border border-blue-200 text-blue-900 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold appearance-none"
                      value={dest.name}
                      onChange={(e) => setDest(DESTINATION_MUNICIPALITIES.find(c => c.name === e.target.value) || dest)}
                    >
                      {DESTINATION_MUNICIPALITIES.map(c => <option key={c.name} value={c.name}>{c.name} ({c.zone === "5" ? "Sone 5" : "Sone 4"})</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-orange-100 p-2 rounded-lg text-orange-600"><Home className="w-5 h-5" /></div>
                  <h3 className="font-bold text-slate-900">Eiendom & Skatt</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Verdi på næringseiendom</label>
                    <input 
                      type="number" 
                      value={propertyValue}
                      onChange={(e) => setPropertyValue(Number(e.target.value))}
                      step="500000"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                    />
                    <p className="text-xs text-slate-400 mt-2">Markedsverdi for beregning av eiendomsskatt.</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 flex flex-col justify-center">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-orange-900">Est. Eiendomsskatt {dest.name}</span>
                      <span className="font-bold text-orange-700">{results.pTaxRateDest} ‰</span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-orange-600/80">
                      <span>vs. Oslo (ref)</span>
                      <span>3.0 ‰</span>
                    </div>
                    <div className="mt-3 pt-3 border-t border-orange-200 flex justify-between items-center">
                      <span className="font-bold text-orange-900">Effekt:</span>
                      <span className={`font-bold ${results.pTaxDiff >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                        {results.pTaxDiff > 0 ? '+' : ''}{Math.round(results.pTaxDiff).toLocaleString()} kr
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button onClick={nextStep} className="bg-blue-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2">
                  Neste: Lønnskostnader <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* --- STEG 2: LØNN & AGA --- */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Ansatte og Lønn</h2>
                <p className="text-slate-600">Her ligger den største gevinsten. I {dest.name} (Sone {dest.zone}) er arbeidsgiveravgiften <McpDataSpan id={`aga-sats-${dest.zone}`} value={satser2025.satser[dest.zone]?.ordinaer * 100} format="percentage" className="font-bold text-slate-900"/>.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                
                {/* Ordinære Ansatte */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Antall ansatte</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                      <input 
                        type="number" 
                        value={employees}
                        onChange={(e) => setEmployees(Number(e.target.value))}
                        className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Snitt årslønn</label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-slate-400 font-bold">kr</span>
                      <input 
                        type="number" 
                        value={avgSalary}
                        onChange={(e) => setAvgSalary(Number(e.target.value))}
                        step="10000"
                        className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold"
                      />
                    </div>
                  </div>
                </div>

                {/* Ledelse */}
                <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-yellow-600" />
                    <span className="text-sm font-bold text-yellow-900">Ledelse / Høytlønnede</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-yellow-800 mb-1">Antall ledere</label>
                      <input 
                        type="number" 
                        value={executives}
                        onChange={(e) => setExecutives(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-white border border-yellow-200 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-yellow-800 mb-1">Lønn (eks: 1.1M)</label>
                      <input 
                        type="number" 
                        value={execSalary}
                        onChange={(e) => setExecSalary(Number(e.target.value))}
                        step="50000"
                        className="w-full px-3 py-2 bg-white border border-yellow-200 rounded-lg text-sm"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-yellow-700 mt-2 italic">
                    Tips: Du sparer full AGA (14,1%) også på topplønninger. Ekstra arbeidsgiveravgift (5%) er fjernet fra 2025.
                  </p>
                </div>

              </div>

              <div className="flex gap-4 justify-between items-center bg-blue-600 text-white p-6 rounded-2xl shadow-lg">
                <div>
                  <p className="text-blue-100 text-sm font-medium mb-1">Din AGA-besparelse</p>
                  <p className="text-3xl font-extrabold">{Math.round(results.agaSaving).toLocaleString()} kr</p>
                </div>
                <button onClick={nextStep} className="bg-white text-blue-600 font-bold py-3 px-6 rounded-xl hover:bg-blue-50 transition-all flex items-center gap-2">
                  Neste <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              <button onClick={prevStep} className="text-sm text-slate-400 hover:text-slate-600">← Tilbake</button>
            </motion.div>
          )}

          {/* --- STEG 3: PERSONLIGE FORDELER --- */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Rekrutteringskraft</h2>
                <p className="text-slate-600">
                  I {dest.name} får dine ansatte massive fordeler fra staten. Dette er "usynlig lønn" du kan bruke i forhandlinger.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Users className="w-6 h-6 text-green-600" />
                    <span className="font-bold text-slate-900">Inkluder personlige fordeler i totalen?</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={includePersonal} onChange={(e) => setIncludePersonal(e.target.checked)} className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>

                {includePersonal && results.destIsZone5 ? (
                  <div className="p-6 grid gap-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-100">
                      <div className="flex items-center gap-3">
                        <GraduationCap className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-green-900">Studielån (Nedskriving)</span>
                      </div>
                      <span className="font-bold text-green-700">{CONSTANTS.studielanSone5.toLocaleString()} kr <span className="text-xs font-normal">/år</span></span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-100">
                      <div className="flex items-center gap-3">
                        <Wallet className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-blue-900">Finnmarksfradrag (Skatt)</span>
                      </div>
                      <span className="font-bold text-blue-700">{CONSTANTS.finnmarkFradrag.toLocaleString()} kr</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                      <div className="flex items-center gap-3">
                        <Zap className="w-5 h-5 text-yellow-600" />
                        <span className="font-medium text-yellow-900">Strøm (El-avgift + Mva fritak)</span>
                      </div>
                      <span className="font-bold text-yellow-700">~15-20.000 kr</span>
                    </div>
                    
                    <div className="mt-4 p-4 bg-slate-800 text-white rounded-xl text-center">
                      <p className="text-sm text-slate-400 mb-1">Bruttolønnsekvivalent per ansatt</p>
                      <p className="text-3xl font-extrabold">{Math.round(results.grossEquivalentPerEmp).toLocaleString()} kr</p>
                      <p className="text-xs text-slate-500 mt-2">Dette må en konkurrent i Oslo betale ekstra i lønn for å matche kjøpekraften.</p>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center text-slate-500">
                    {!results.destIsZone5 ? (
                      <p>Personlige fordeler (gjeldsslette/skatt) gjelder kun i Sone 5 (Tiltakssonen). {dest.name} er i Sone 4.</p>
                    ) : (
                      <p>Fordelene er skjult.</p>
                    )}
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <button onClick={nextStep} className="bg-blue-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2">
                  Se Totalen <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              <button onClick={prevStep} className="text-sm text-slate-400 hover:text-slate-600">← Tilbake</button>
            </motion.div>
          )}

          {/* --- STEG 4: TOTAL DASHBOARD --- */}
          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
              
              <div className="text-center bg-slate-900 text-white p-10 rounded-3xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-10">
                  <TrendingUp className="w-48 h-48 text-blue-500" />
                </div>
                
                <p className="text-blue-300 font-bold uppercase tracking-widest text-xs mb-2">Total Årlig Verdi</p>
                <h2 className="text-5xl md:text-7xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                  {Math.round(results.totalAnnualImpact).toLocaleString()} kr
                </h2>
                <p className="text-slate-400 max-w-lg mx-auto">
                  Dette er summen av bedriftens besparelser og den økte kjøpekraften dere kan tilby ansatte ved å etablere dere i {dest.name}.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Building className="w-5 h-5 text-blue-600" /> For Bedriften
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between text-sm">
                      <span className="text-slate-600">Spart AGA</span>
                      <span className="font-bold text-slate-900">{Math.round(results.agaSaving).toLocaleString()} kr</span>
                    </li>
                    <li className="flex justify-between text-sm">
                      <span className="text-slate-600">Eiendomsskatt diff</span>
                      <span className={`font-bold ${results.pTaxDiff > 0 ? 'text-green-600' : 'text-slate-900'}`}>
                        {Math.round(results.pTaxDiff).toLocaleString()} kr
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-green-600" /> For de Ansatte (Verdi)
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between text-sm">
                      <span className="text-slate-600">Per ansatt (bruttoekv.)</span>
                      <span className="font-bold text-green-600">{Math.round(results.grossEquivalentPerEmp).toLocaleString()} kr</span>
                    </li>
                    <li className="flex justify-between text-sm pt-2 border-t border-slate-100">
                      <span className="font-medium text-slate-900">Total rekrutteringskraft</span>
                      <span className="font-bold text-slate-900">{Math.round(results.personalValueTotal).toLocaleString()} kr</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* RÅDGIVNING & UPSELL */}
              <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl">
                <div className="flex gap-4 items-start">
                  <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-blue-900 mb-1">Kvalifiserer du til mer?</h4>
                    <p className="text-sm text-blue-800 mb-4 leading-relaxed">
                      Tallene over er kun skattefordeler. I {dest.name} kan du sannsynligvis også søke om <strong>investeringstilskudd</strong> fra Sametinget eller Innovasjon Norge.
                    </p>
                    <div className="flex gap-3">
                      <a href="/kunnskapsbank/sametinget" className="text-xs font-bold bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Sjekk støtteordninger
                      </a>
                      <a href="/kontakt" className="text-xs font-bold text-blue-700 px-4 py-2 hover:underline">
                        Snakk med en rådgiver
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center pt-4">
                <button onClick={() => setStep(1)} className="text-sm text-slate-400 hover:text-slate-600 transition-colors">
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