import {
  LayoutDashboard,
  Users,
  FileText,
  BookOpen,
  Shield,
  Lock,
  Phone,
  Mail,
  ArrowRight,
  Send,
  Upload,
  Eye,
  KeyRound,
  UserPlus,
} from 'lucide-react';

export default function HjelpPage() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Brukerveiledning for admin-panelet</h1>
        <p className="text-sm text-slate-600 mt-1">
          Oversikt over alle funksjoner og hvordan de brukes.
        </p>
      </div>

      {/* Navigation overview */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">Oversikt over sidene</h2>
        <div className="grid gap-3">
          {[
            { icon: LayoutDashboard, title: 'Dashboard', desc: 'Startside med nøkkeltall: antall ansatte, publiserte artikler og utkast. Rask tilgang til de viktigste funksjonene.' },
            { icon: Users, title: 'Ansatte', desc: 'Opprett, rediger og slett ansatte. Brukes til "Om oss"-siden. Legg til navn, rolle, kontor, bilde og kontaktinfo.' },
            { icon: FileText, title: 'Artikler', desc: 'Skriv og publiser artikler til Kunnskapsbanken. Støtter rik tekst, metadata for SEO, og utkast/publisert-status.' },
            { icon: BookOpen, title: 'Kunnskapsbank', desc: 'Oversikt over kategorier og innhold i kunnskapsbanken. Rediger eksisterende sider og se status.' },
            { icon: Shield, title: 'Dekrypter', desc: 'Motta og dekrypter krypterte .averdi-filer fra klienter. Gjennomgå innhold og videresend til integrasjonspartnere.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4">
              <div className="w-10 h-10 rounded-full bg-[#E86C1F]/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-[#E86C1F]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">{title}</p>
                <p className="text-sm text-slate-600">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Decryption guide */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <Lock className="w-5 h-5 text-[#E86C1F]" />
          Slik dekrypterer du en .averdi-fil
        </h2>
        <p className="text-sm text-slate-600">
          Når en klient sender data via sikker overlevering, mottar du en e-post med en kryptert .averdi-fil.
          PIN-koden mottar du separat via telefon eller SMS fra klienten.
        </p>

        <ol className="space-y-4">
          {[
            { icon: Mail, step: 'Motta e-post', desc: 'Du får en e-post med .averdi-filen som vedlegg. E-posten inneholder avsendernavn, organisasjonsnummer og eventuell beskrivelse.' },
            { icon: Upload, step: 'Last opp filen', desc: 'Gå til Dekrypter i sidemenyen. Dra filen inn i opplastingsfeltet, eller klikk for å velge. Filinformasjon (avsender, dato, antall elementer) vises automatisk.' },
            { icon: Phone, step: 'Motta PIN-kode', desc: 'Ring klienten eller motta SMS med den 6-sifrede PIN-koden. Skriv inn koden i PIN-feltet.' },
            { icon: KeyRound, step: 'Dekrypter', desc: 'Klikk "Dekrypter". Filen låses opp i nettleseren. Innholdet vises direkte. Ingen data sendes til serveren under dekryptering.' },
            { icon: Eye, step: 'Gjennomgå innhold', desc: 'Se filene og tekstinnholdet som ble sendt. For Vipps-konfigurasjoner kan du klikke "Se detaljert konfigurasjon" for å åpne den strukturerte visningen.' },
            { icon: Send, step: 'Videresend til partner (valgfritt)', desc: 'Klikk "Videresend sikkert til integrasjonspartner". Skriv inn partnerens e-post. Dataene krypteres på nytt med en ny PIN-kode som du deler med partneren via telefon.' },
          ].map(({ icon: Icon, step, desc }, i) => (
            <li key={i} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span className="w-8 h-8 rounded-full bg-[#E86C1F] text-white text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                {i < 5 && <div className="w-px flex-1 bg-slate-200 mt-1" />}
              </div>
              <div className="pb-4">
                <p className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <Icon className="w-4 h-4 text-slate-400" />
                  {step}
                </p>
                <p className="text-sm text-slate-600 mt-0.5">{desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* User management */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <UserPlus className="w-5 h-5 text-[#E86C1F]" />
          Brukere og tilgang
        </h2>
        <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-3 text-sm text-slate-600">
          <p>
            Admin-panelet har to roller: <span className="font-semibold text-slate-900">admin</span> og{' '}
            <span className="font-semibold text-slate-900">editor</span>.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><span className="font-medium text-slate-800">Admin</span> kan opprette, redigere og slette brukere, ansatte og artikler. Full tilgang.</li>
            <li><span className="font-medium text-slate-800">Editor</span> kan redigere eksisterende innhold, men kan ikke opprette eller slette brukere.</li>
          </ul>
          <p>
            Nye brukere opprettes under <span className="font-medium text-slate-800">Dashboard &gt; Brukere &gt; Ny bruker</span>.
            Passord må være minst 8 tegn og lagres med bcrypt-hashing.
          </p>
          <p>
            Innlogging skjer via <span className="font-medium text-slate-800">/admin/login</span>.
            Sesjonen varer i 24 timer og lagres som en sikker HTTP-cookie.
          </p>
        </div>
      </section>

      {/* Article guide */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#E86C1F]" />
          Skrive og publisere artikler
        </h2>
        <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-3 text-sm text-slate-600">
          <ol className="list-decimal pl-5 space-y-2">
            <li>Gå til <span className="font-medium text-slate-800">Artikler &gt; Ny artikkel</span>.</li>
            <li>Fyll inn tittel, kategori, og skriv innholdet i teksteditoren.</li>
            <li>Legg til et utdrag (excerpt) for forhåndsvisning i artikkellister.</li>
            <li>Velg status: <span className="font-medium text-slate-800">Utkast</span> (ikke synlig) eller <span className="font-medium text-slate-800">Publisert</span> (synlig for alle).</li>
            <li>Klikk Lagre. Artikkelen dukker opp i kunnskapsbanken under valgt kategori.</li>
          </ol>
        </div>
      </section>

      {/* Employee guide */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <Users className="w-5 h-5 text-[#E86C1F]" />
          Administrere ansatte
        </h2>
        <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-3 text-sm text-slate-600">
          <p>
            Ansattlisten vises på "Om oss"-siden. Hver ansatt har:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Navn, rolle og kontor</li>
            <li>Profilbilde (last opp eller link)</li>
            <li>Kontaktinfo (e-post, telefon)</li>
            <li>Kort biografi</li>
            <li>Aktiv/inaktiv-status</li>
          </ul>
          <p>
            Inaktive ansatte vises ikke på nettsiden, men slettes ikke fra systemet.
          </p>
        </div>
      </section>

      {/* Tips */}
      <section className="rounded-2xl bg-slate-900 p-6 text-white space-y-3">
        <h2 className="text-lg font-semibold">Tips</h2>
        <ul className="text-sm text-slate-300 space-y-2">
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-[#E86C1F] mt-0.5 flex-shrink-0" />
            <span>Bruk "Tilbake til nettsiden"-linken nederst i sidemenyen for å se endringene dine live.</span>
          </li>
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-[#E86C1F] mt-0.5 flex-shrink-0" />
            <span>Dekryptering skjer i nettleseren. Innholdet forlater aldri maskinen din under dekryptering.</span>
          </li>
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-[#E86C1F] mt-0.5 flex-shrink-0" />
            <span>Når du videresender til en integrasjonspartner, krypteres dataene på nytt. Partneren får en ny PIN-kode som er uavhengig av den opprinnelige.</span>
          </li>
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-[#E86C1F] mt-0.5 flex-shrink-0" />
            <span>Hold artikler som utkast til du er fornøyd. Utkast er kun synlige i admin-panelet.</span>
          </li>
        </ul>
      </section>
    </div>
  );
}
