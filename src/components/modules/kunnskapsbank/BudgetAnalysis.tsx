import { FileText, TrendingUp, AlertTriangle, ArrowRight } from 'lucide-react';

export function BudgetAnalysis() {
  return (
    <section className="my-16 bg-slate-900 text-white rounded-2xl overflow-hidden shadow-xl border border-slate-700">
      <div className="flex flex-col md:flex-row">
        
        {/* Venstre: Tittel & Intro */}
        <div className="p-8 md:p-12 md:w-2/5 bg-slate-800 relative">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <FileText className="w-32 h-32 text-white" />
          </div>
          <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider rounded-full mb-4 border border-blue-500/30">
            Averdi Innsikt
          </span>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
            Statsbudsjettet 2026: Hva betyr det for deg?
          </h2>
          <p className="text-slate-300 leading-relaxed mb-6">
            Vi har analysert Kapittel 560 i Statsbudsjettet og Sametingets budsjettvedtak. 
            Her er de regnskapsmessige konsekvensene for din bedrift.
          </p>
          <div className="flex items-center gap-3 text-sm text-slate-400">
            <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center font-bold">AV</div>
            <span>Analysert av Averdi-teamet</span>
          </div>
        </div>

        {/* Høyre: Nøkkelpunkter */}
        <div className="p-8 md:p-12 md:w-3/5 bg-slate-900">
          <div className="space-y-8">
            
            {/* Punkt 1 */}
            <div className="flex gap-4">
              <div className="mt-1 bg-yellow-500/10 p-2 rounded-lg h-fit">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white mb-1">Hardere konkurranse om midlene</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Bevilgningen øker kun med 3,4% (prisjustering). Realveksten er null. 
                  Dette betyr at Sametinget må prioritere hardere. Søknader som ikke treffer "Sannhets- og forsonings"-kriteriene vil bli avvist.
                </p>
              </div>
            </div>

            {/* Punkt 2 */}
            <div className="flex gap-4">
              <div className="mt-1 bg-green-500/10 p-2 rounded-lg h-fit">
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white mb-1">Januar-vinduet er kritisk</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Søknadsportalen er stengt frem til 1. januar. Vår anbefaling: Bruk desember til å ferdigstille budsjett og prosjektbeskrivelse. 
                  Send søknaden første arbeidsdag i 2026 for å sikre behandling av "friske midler".
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}