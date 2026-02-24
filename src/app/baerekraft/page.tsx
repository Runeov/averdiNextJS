import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Bærekraft og ansvar | Averdi AS',
  description: 'Averdi AS sin bærekraftsrapportering – miljø, sosiale forhold og selskapsstyring (ESG). Oppdatert 2025.',
};

export default function BaerekraftPage() {
  return (
    <main className="flex-1 bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-900 to-green-700 text-white py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-semibold text-green-300 uppercase tracking-widest mb-3">Ansvarlig næringsliv</p>
          <h1 className="text-4xl font-bold mb-4">Bærekraft og ansvar</h1>
          <p className="text-xl text-green-100 leading-relaxed">
            Averdi AS sine ambisjoner, tiltak og resultater innen miljø, sosiale forhold og selskapsstyring.
          </p>
          <p className="mt-6 text-sm text-green-300">Regnskapsår 2024 / Rapportert juni 2025</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-16 space-y-16">

        {/* Intro */}
        <section>
          <p className="text-slate-600 leading-relaxed">
            Som statsautorisert regnskapsførerselskap i Nord-Norge har Averdi AS et ansvar som strekker seg
            utover ren tallbehandling. Vi ønsker å drive virksomheten vår på en måte som er bærekraftig på
            lang sikt – for våre ansatte, våre kunder, lokalsamfunnet og miljøet. Denne rapporten gir en
            oversikt over status og ambisjoner for 2024–2025.
          </p>
          <p className="mt-4 text-sm text-slate-400 italic">
            Averdi AS rapporterer bærekraft som en integrert del av selskapets årsberetning. Rapporten er
            utarbeidet i tråd med prinsippene i EU-direktivet CSRD (2022/2464) og GRI-rammeverket, tilpasset
            virksomhetens størrelse og risikoprofil.
          </p>
        </section>

        {/* E – Miljø */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-lg">E</span>
            <h2 className="text-2xl font-bold text-slate-900">Miljø og klima</h2>
          </div>
          <div className="space-y-4">
            {[
              {
                title: 'Karbonfotavtrykk',
                text: 'Som en ren tjenestebedrift er vårt direkte utslipp begrenset til kontorets energiforbruk og ansattreiser. Karasjok har tilgang til fornybar kraft gjennom det norske strømnettet. Vi benytter videokonferanse aktivt for å redusere reisebehovet.',
              },
              {
                title: 'Papir og ressurser',
                text: 'Vi arbeider mot et papirnøytralt kontor. Digitalt bilagsarkiv og skybasert regnskapssystem (PowerOffice Go) reduserer behovet for fysisk arkiv. Skriverbruk monitoreres og minimeres.',
              },
              {
                title: 'Innkjøp',
                text: 'Brukte og reparerte kontormaskiner prioriteres fremfor nytt der det er praktisk. Vi velger leverandører med dokumenterte miljøprogram.',
              },
              {
                title: 'Mål 2025–2026',
                text: 'Kartlegge totalt karbonfotavtrykk inkludert leverandørkjede, og sette kvantitative reduksjonsmål.',
              },
            ].map(({ title, text }) => (
              <div key={title} className="flex gap-4 p-4 bg-green-50 rounded-xl">
                <span className="text-green-500 font-bold shrink-0 mt-0.5">›</span>
                <div>
                  <p className="font-semibold text-slate-900 mb-1">{title}</p>
                  <p className="text-slate-600 text-sm leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* S – Sosiale forhold */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg">S</span>
            <h2 className="text-2xl font-bold text-slate-900">Sosiale forhold</h2>
          </div>
          <div className="space-y-4">
            {[
              {
                title: 'Ansattes rettigheter og arbeidsforhold',
                text: 'Alle ansatte har skriftlige arbeidsavtaler, lønn i henhold til eller over tariff, og gode pensjons- og forsikringsordninger. Vi gjennomfører årlige medarbeidersamtaler og kompetansekartlegging.',
              },
              {
                title: 'Mangfold og inkludering',
                text: 'Averdi AS opererer i et flerkulturelt miljø i Sápmi. Vi verdsetter språklig og kulturell kompetanse, inkludert samisk. Lik lønn for likt arbeid er et aktivt prinsipp.',
              },
              {
                title: 'Faglig utvikling',
                text: 'Statsautoriserte regnskapsførere er pålagt 77,5 timers etterutdanning per treårsperiode. Vi støtter og finansierer faglig oppdatering for alle ansatte.',
              },
              {
                title: 'Lokalsamfunn',
                text: 'Vi bidrar til næringslivet i Finnmark ved å gi tilgjengelig regnskaps- og rådgivningskompetanse til lokale bedrifter og organisasjoner, inkludert Sametinget og samiske institusjoner.',
              },
            ].map(({ title, text }) => (
              <div key={title} className="flex gap-4 p-4 bg-blue-50 rounded-xl">
                <span className="text-blue-500 font-bold shrink-0 mt-0.5">›</span>
                <div>
                  <p className="font-semibold text-slate-900 mb-1">{title}</p>
                  <p className="text-slate-600 text-sm leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* G – Selskapsstyring */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-lg">G</span>
            <h2 className="text-2xl font-bold text-slate-900">Selskapsstyring</h2>
          </div>
          <div className="space-y-4">
            {[
              {
                title: 'Etikk og antikorrupsjon',
                text: 'Averdi AS har nulltoleranse for korrupsjon, bestikkelser og interessekonflikter. Etiske retningslinjer er vedtatt av styret og gjennomgås jevnlig.',
              },
              {
                title: 'Personvern og datasikkerhet',
                text: 'Vi behandler sensitiv regnskapsinformasjon for mange kunder og tar datasikkerhet og GDPR-etterlevelse svært alvorlig. Databehandleravtaler er inngått med alle relevante leverandører.',
              },
              {
                title: 'Finanstilsynet',
                text: 'Som statsautorisert regnskapsførerselskap er Averdi AS underlagt tilsyn av Finanstilsynet og er godkjent etter regnskapsførerlovens krav.',
              },
              {
                title: 'Åpenhetsloven',
                text: 'Vi utfører aktsomhetsvurderinger og offentliggjør redegjørelse i tråd med Åpenhetsloven. Se vår dedikerte side for detaljer.',
              },
            ].map(({ title, text }) => (
              <div key={title} className="flex gap-4 p-4 bg-purple-50 rounded-xl">
                <span className="text-purple-500 font-bold shrink-0 mt-0.5">›</span>
                <div>
                  <p className="font-semibold text-slate-900 mb-1">{title}</p>
                  <p className="text-slate-600 text-sm leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CSRD-rapportering */}
        <section aria-labelledby="baerekraft-rapportering" className="bg-green-50 border border-green-100 rounded-2xl p-8">
          <h2 id="baerekraft-rapportering" className="text-2xl font-bold text-slate-900 mb-3">Bærekraftsrapportering (CSRD)</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Averdi AS rapporterer på bærekraft i samsvar med EUs direktiv om bærekraftsrapportering
            (CSRD, 2022/2464) og GRI-rammeverket, tilpasset virksomhetens størrelse og risikoprofil.
            Rapporten inngår som en integrert del av selskapets årsberetning.
          </p>
          <ul className="space-y-2 text-slate-600 text-sm">
            <li className="flex gap-2"><span className="text-green-600 font-bold shrink-0">›</span> Årsrapport for regnskapsåret 2024 er publisert juni 2025.</li>
            <li className="flex gap-2"><span className="text-green-600 font-bold shrink-0">›</span> Årsrapport for regnskapsåret 2025 publiseres innen 30. april 2026.</li>
            <li className="flex gap-2"><span className="text-green-600 font-bold shrink-0">›</span> Rapporten er tilgjengelig på forespørsel via <a href="mailto:post@averdi.no?subject=Bærekraftsrapport" className="text-[#E86C1F] hover:underline">post@averdi.no</a>.</li>
          </ul>
        </section>

        {/* Kontakt og spørsmål */}
        <section className="bg-slate-50 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-3">Spørsmål om bærekraft?</h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-4">
            Har du spørsmål om Averdis bærekraftsarbeid, eller ønsker du mer informasjon om våre ESG-data og
            rapportering? Ta kontakt:
          </p>
          <a
            href="mailto:post@averdi.no?subject=Bærekraft og CSRD"
            className="inline-flex items-center gap-2 text-[#E86C1F] font-semibold hover:underline"
          >
            <span>✉</span> post@averdi.no
          </a>
        </section>

        {/* Footer nav */}
        <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-100 text-sm">
          <Link href="/apenhetsloven" className="text-[#E86C1F] hover:underline">
            → Åpenhetsloven – redegjørelse
          </Link>
          <Link href="/tilgjengelighet" className="text-[#E86C1F] hover:underline">
            → Tilgjengelighetserklæring
          </Link>
          <Link href="/" className="text-slate-500 hover:underline ml-auto">
            ← Tilbake til forsiden
          </Link>
        </div>
      </div>
    </main>
  );
}
