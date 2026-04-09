import { Metadata } from 'next';
import Link from 'next/link';
import {
  Shield,
  Lock,
  Phone,
  Mail,
  Server,
  FileKey,
  Scale,
  CheckCircle2,
  ArrowLeft,
  ExternalLink,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sikkerhet og etterlevelse — Sikker overlevering | Averdi',
  description:
    'Slik fungerer Averdi sin sikre overlevering av sensitive data. End-to-end-kryptering, tokanalsmodell og etterlevelse av norsk regelverk.',
};

export default function OmSikkerhetPage() {
  return (
    <main className="flex-1 bg-slate-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-700 text-white py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/sikker-overlevering"
            className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Tilbake til sikker overlevering
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-[#E86C1F]" />
            <h1 className="text-3xl sm:text-4xl font-bold">Slik beskytter vi dataene dine</h1>
          </div>
          <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
            Averdi bruker kryptografi i verdensklasse og en tokanalsmodell for sikker overlevering av
            sensitive forretningsdata. Her forklarer vi nøyaktig hvordan det fungerer og hvilket regelverk vi følger.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-16 space-y-16">
        {/* How it works */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Hvordan det fungerer</h2>

          <div className="space-y-6">
            {[
              {
                icon: Lock,
                title: '1. Kryptering i nettleseren',
                desc: 'Når du laster opp filer eller limer inn data, krypteres alt lokalt i nettleseren din. Dataene forlater aldri maskinen din i lesbar form. Vi bruker AES-256-GCM, samme krypteringsstandard som brukes av banker og forsvarssektoren.',
              },
              {
                icon: FileKey,
                title: '2. En unik krypteringsnøkkel per fil',
                desc: 'Hver fil får en unik 6-sifret PIN-kode og et tilfeldig generert kryptografisk salt. Krypteringsnøkkelen utledes fra PIN + salt via PBKDF2 med 600 000 iterasjoner. Selv om noen kjenner PIN-koden, trenger de også selve filen for å gjøre noe.',
              },
              {
                icon: Mail,
                title: '3. Filen sendes via e-post',
                desc: 'Den krypterte .averdi-filen sendes som vedlegg til Averdi. Filen er fullstendig uleselig uten PIN-koden. Selv om e-posten fanges opp av en uvedkommende, er innholdet beskyttet.',
              },
              {
                icon: Phone,
                title: '4. PIN-koden deles via telefon eller SMS',
                desc: 'Du deler den 6-sifrede PIN-koden med mottakeren via telefon eller SMS. Fil og kode sendes aldri i samme kanal. En angriper må kapre begge kanaler samtidig for å lese dataene.',
              },
              {
                icon: Server,
                title: '5. Serveren ser aldri innholdet',
                desc: 'Averdi sin server håndterer kun den krypterte filen. Vi har ingen mulighet til å lese innholdet. Dekryptering skjer utelukkende i mottakerens nettleser. Dette kalles zero-knowledge-arkitektur.',
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6">
                <div className="w-10 h-10 rounded-full bg-[#E86C1F]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon className="w-5 h-5 text-[#E86C1F]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Two-channel model */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Tokanalsmodellen</h2>
          <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl bg-blue-50 border border-blue-200 p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <p className="text-sm font-semibold text-blue-900">Kanal 1: E-post</p>
                </div>
                <p className="text-sm text-blue-800">
                  Den krypterte .averdi-filen sendes som vedlegg. Filen er uleselig uten PIN-koden.
                </p>
              </div>
              <div className="rounded-xl bg-green-50 border border-green-200 p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-green-600" />
                  <p className="text-sm font-semibold text-green-900">Kanal 2: Telefon / SMS</p>
                </div>
                <p className="text-sm text-green-800">
                  6-sifret PIN-kode deles muntlig eller via SMS. Tar 5 sekunder.
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Poenget med to kanaler er at en angriper må kompromittere begge for å lese dataene.
              Selv om e-postkontoen hackes, er filen verdiløs uten PIN-koden fra telefonen.
              Selv om noen avlytter telefonsamtalen, har de ikke filen.
            </p>
          </div>
        </section>

        {/* Technical specs */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Tekniske detaljer</h2>
          <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-slate-100">
                {[
                  ['Krypteringsalgoritme', 'AES-256-GCM (256-bit nøkkel, 128-bit autentiseringstag)'],
                  ['Nøkkelutledning', 'PBKDF2 med SHA-256, 600 000 iterasjoner'],
                  ['Salt', '16 byte tilfeldig per fil (lagret i metadata)'],
                  ['IV (initialiseringsvektor)', '12 byte tilfeldig per fil (96 bit, anbefalt for GCM)'],
                  ['PIN-format', '6 siffer (kryptografisk tilfeldig)'],
                  ['Filformat', '.averdi (binært, med "AVRD01" magiske bytes)'],
                  ['Kryptering skjer i', 'Nettleseren (Web Crypto API, ingen avhengigheter)'],
                  ['Serveren har tilgang til', 'Kun kryptert fil og metadata (avsender, org.nr., tidspunkt)'],
                  ['Maks filstørrelse', '25 MB per overlevering'],
                ].map(([label, value]) => (
                  <tr key={label}>
                    <td className="px-6 py-3 font-medium text-slate-900 whitespace-nowrap">{label}</td>
                    <td className="px-6 py-3 text-slate-600">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Regulatory compliance */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Scale className="w-6 h-6 text-[#E86C1F]" />
            Etterlevelse av norsk regelverk
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Sikker overlevering er bygget for å oppfylle kravene i norsk regelverk for behandling av
            sensitive forretningsdata. Her er de viktigste lovene og hvordan vi etterlever dem.
          </p>

          <div className="space-y-6">
            {/* GDPR */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3">
              <h3 className="text-base font-bold text-slate-900">
                Personopplysningsloven / GDPR artikkel 32
              </h3>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Krav om sikkerhet ved behandling av personopplysninger
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                GDPR artikkel 32 krever "passende tekniske og organisatoriske tiltak" for å sikre et sikkerhetsnivå
                som er egnet i forhold til risikoen. Artikkelen nevner spesifikt kryptering og pseudonymisering
                som egnede tiltak.
              </p>
              <div className="space-y-2">
                {[
                  'End-to-end-kryptering med AES-256-GCM: Data er kryptert fra avsenders nettleser til mottakers nettleser.',
                  'Zero-knowledge-arkitektur: Serveren behandler aldri ukrypterte data, som minimerer risikoen ved datainnbrudd.',
                  'Per-fil krypteringsnøkkel: Hver overlevering har unik nøkkel. Kompromittering av én fil påvirker ikke andre.',
                  'Tokanalsmodell: Kryptert fil og PIN deles i separate kanaler, som gir forsvar i dybden.',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-slate-600">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Finanstilsynet IKT */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3">
              <h3 className="text-base font-bold text-slate-900">
                Finanstilsynets IKT-forskrift
              </h3>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Krav til IKT-sikkerhet for foretak under tilsyn
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                IKT-forskriften stiller krav om at sensitiv informasjon skal beskyttes ved overføring.
                Statsautoriserte regnskapsførere er underlagt Finanstilsynets krav til forsvarlig IKT-sikkerhet.
              </p>
              <div className="space-y-2">
                {[
                  'Sterk kryptering ved overføring: AES-256-GCM oppfyller kravet om kryptering av sensitiv informasjon under transport.',
                  'Tilgangskontroll: Kun den som har både filen og PIN-koden kan lese innholdet. Ingen ansatte på serveren har tilgang.',
                  'Sporbarhet: Metadata (avsender, tidspunkt, org.nr.) lagres ukryptert for revisjonsspor, mens innholdet forblir kryptert.',
                  'Ingen sentralisert nøkkellagring: PIN-koden lagres ikke på serveren. Det finnes ingen "hovednøkkel" som kan kompromitteres.',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-slate-600">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bokføringsloven */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3">
              <h3 className="text-base font-bold text-slate-900">
                Bokføringsloven og god regnskapsføringsskikk
              </h3>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Krav til sikker oppbevaring og overlevering av regnskapsmateriale
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Bokføringsloven krever at regnskapsmateriale oppbevares og overleveres på en sikker måte.
                God regnskapsføringsskikk (GRFS) stiller krav om konfidensialitet ved overføring av klientdata.
              </p>
              <div className="space-y-2">
                {[
                  'Konfidensialitet: Innholdet er utilgjengelig for alle andre enn avsender og mottaker.',
                  'Integritet: AES-GCM inkluderer autentiseringstag som oppdager enhver endring av data under transport.',
                  'Tilgjengelighet: Mottaker kan dekryptere filen når som helst med riktig PIN, uten avhengighet av tredjeparter.',
                  'Dataminimering: Serveren lagrer kun det som er nødvendig for levering (kryptert fil + metadata). Ingen ukrypterte kopier.',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-slate-600">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hvitvaskingsloven */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3">
              <h3 className="text-base font-bold text-slate-900">
                Hvitvaskingsloven
              </h3>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Krav til identitetskontroll og sporbarhet
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Hvitvaskingsloven krever at regnskapsførere identifiserer klienter og dokumenterer transaksjoner.
                Sikker overlevering støtter dette med sporbar metadata.
              </p>
              <div className="space-y-2">
                {[
                  'Avsenderidentifikasjon: Organisasjonsnummer og navn registreres ved overlevering.',
                  'Tidsstempel: Eksakt tidspunkt for overlevering lagres i filens metadata.',
                  'Revisjonsspor: Metadata er tilgjengelig uten dekryptering, slik at mottakstidspunkt kan dokumenteres.',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-slate-600">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why not just email? */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Hvorfor ikke bare sende på e-post?</h2>
          <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-4">
            <p className="text-sm text-slate-600 leading-relaxed">
              Vanlig e-post er som et postkort: alle som håndterer det underveis kan lese innholdet.
              E-postservere lagrer kopier, og innholdet kan leses av e-postleverandøren.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl bg-red-50 border border-red-200 p-4 space-y-2">
                <p className="text-sm font-semibold text-red-900">Vanlig e-post</p>
                <ul className="text-sm text-red-800 space-y-1">
                  <li>Innholdet er lesbart for e-postleverandøren</li>
                  <li>Kopier lagres på servere du ikke kontrollerer</li>
                  <li>Ingen garanti for at innholdet er uendret</li>
                  <li>Avlytting gir full tilgang</li>
                </ul>
              </div>
              <div className="rounded-xl bg-green-50 border border-green-200 p-4 space-y-2">
                <p className="text-sm font-semibold text-green-900">Sikker overlevering</p>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>Innholdet er kryptert. Serveren ser kun støy.</li>
                  <li>PIN deles separat via telefon</li>
                  <li>Autentiseringstag oppdager endringer</li>
                  <li>Avlytting av én kanal gir ingenting</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="rounded-2xl bg-slate-900 p-8 text-white space-y-4">
          <h2 className="text-xl font-bold">Oppsummert</h2>
          <ul className="text-sm text-slate-300 space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span>AES-256-GCM med per-fil nøkkel og salt. Kryptering skjer i nettleseren.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span>Serveren ser aldri innholdet. Zero-knowledge-arkitektur.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span>Tokanalsmodell: kryptert fil via e-post, PIN via telefon. Begge trengs.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span>Oppfyller GDPR art. 32, Finanstilsynets IKT-forskrift, bokføringsloven og hvitvaskingsloven.</span>
            </li>
          </ul>

          <div className="pt-4">
            <Link
              href="/sikker-overlevering"
              className="inline-flex items-center justify-center px-8 py-3 bg-[#E86C1F] text-white font-medium rounded-full hover:bg-[#d65f18] transition-all"
            >
              Gå til sikker overlevering
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
