import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Clock, 
  HeartPulse, 
  Coins, 
  FileWarning, 
  Quote, 
  ArrowRight,
  UserCheck,
  BookOpen
} from 'lucide-react';
import { AverdiBackground } from '@/components/modules/AverdiBackground';
import { McpDataSpan } from '@/components/ui/McpDataSpan';
import { getExpert } from '@/data/experts';
import { CtaBlock } from '@/components/modules/kunnskapsbank/CtaBlock';

export const metadata: Metadata = {
  title: 'Den usynlige skatten: Sosioøkonomiske forskjeller i Sápmi | Averdi Analyse',
  description: 'En dybdeanalyse av "friksjonskostnadene" i nord. Hvorfor pant-gapet, helsekøene og byråkratiet fungerer som en skjult skatt for det samiske samfunnet.',
};

export default function DeepDiveArticle() {
  const author = getExpert('elle-maret');

  // JSON-LD for Article (SEO)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': 'Sosioøkonomiske forskjeller uten at samfunnet er bevist på det',
    'author': {
      '@type': 'Person',
      'name': 'Elle Máret',
      'jobTitle': 'Strategisk Rådgiver'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Averdi'
    },
    'datePublished': '2025-12-11',
    'description': 'En analyse av hvordan strukturelle barrierer fungerer som en skjult skatt i Sápmi.'
  };

  return (
    <main className="min-h-screen bg-slate-50 relative overflow-hidden font-sans">
      <AverdiBackground />
      
      {/* Inject Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
        
        {/* Breadcrumb */}
        <Link href="/kunnskapsbank" className="inline-flex items-center text-slate-500 hover:text-[#E86C1F] mb-12 font-medium transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Tilbake til Kunnskapsbanken
        </Link>

        {/* --- HEADER --- */}
        <header className="mb-16 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-bold uppercase tracking-widest mb-6">
            <BookOpen className="w-4 h-4" />
            Averdi Innsikt
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
            Sosioøkonomiske forskjeller <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E86C1F] to-[#F4B223]">
              uten at samfunnet ser det
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl">
            Mens Norge diskuterer strømpriser, betaler befolkningen i nord en usynlig skatt i form av tapt tid, dårligere helse og død kapital. Her er regnskapet staten ikke fører.
          </p>
        </header>

        {/* --- AUTHOR INTRO --- */}
        {author && (
          <div className="bg-white border-l-4 border-[#E86C1F] p-8 rounded-r-xl shadow-lg mb-16 flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-shrink-0">
              {author.image ? (
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-slate-100 relative">
                   <Image src={author.image} alt={author.name} fill className="object-cover" />
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center text-2xl font-bold text-slate-400 border-2 border-slate-200">
                  {author.initials}
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-bold text-slate-900">{author.name}</h3>
                <span className="bg-[#E86C1F]/10 text-[#E86C1F] text-xs px-2 py-0.5 rounded-full font-bold">Ny i Averdi</span>
              </div>
              <p className="text-slate-600 text-sm mb-3 italic">
                "{author.bio}"
              </p>
              <p className="text-slate-500 text-sm leading-relaxed">
                Elle har sluttet seg til Averdi for å lede vår satsing på strategisk rådgivning. 
                Med bakgrunn fra skjæringspunktet mellom forvaltning og samisk næringsliv, 
                hjelper hun bedrifter å navigere i det vi kaller "Statens Tilståelse".
              </p>
            </div>
          </div>
        )}

        {/* --- ARTICLE BODY --- */}
        <div className="prose prose-lg prose-slate max-w-none">
          
          {/* Intro Section */}
          <div className="mb-16">
            <p className="lead text-2xl font-serif text-slate-800 italic border-l-4 border-slate-300 pl-6 py-2 my-8">
              "Vi leser ikke statsbudsjettet som et politisk løfte. Vi leser det som en revisor leser et årsregnskap der tallene fundamentalt sett ikke går opp."
            </p>
            <p>
              Norge befinner seg i en post-sannhetsfase. Sannhets- og forsoningskommisjonen har levert sin rapport, og sannheten er bordlagt. 
              Men for det samiske samfunnet var dette startskuddet for realitetsbehandlingen.
            </p>
            <p>
              Hos Averdi har vi analysert de økonomiske konsekvensene av rapporten. Vår konklusjon er at det eksisterer en 
              <strong> "Kulturell Friksjon"</strong> – en usynlig kostnad som belastes bedrifter og familier i nord hver dag. 
              Denne kostnaden er ikke synlig i SSBs modeller, men den merkes på bunnlinjen.
            </p>
          </div>

          {/* Section 1: Time */}
          <section className="mb-16">
            <h2 className="flex items-center gap-3 text-3xl font-bold text-slate-900 mb-6">
              <Clock className="w-8 h-8 text-[#E86C1F]" />
              1. De Tapte Timene (Tidstyveri)
            </h2>
            <p>
              Tid er penger, sies det. I Sápmi er tid også produksjon. Når en reindriftsutøver eller gründer må bruke 
              <strong> 20-40% av sin tid</strong> på byråkratiske prosesser, konsultasjoner og søknader som ikke er tilpasset deres virkelighet, 
              er dette et direkte tap av verdiskaping.
            </p>
            <div className="bg-slate-100 p-6 rounded-xl my-6">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Konsultasjonsutmattelsen</h3>
              <p className="text-sm text-slate-600">
                Utbyggere stiller med betalte advokater. Rettighetshavere stiller på dugnad etter arbeidsdagen. 
                Dette er en strukturell asymmetri som tapper lokalsamfunnet for ressurser.
              </p>
            </div>
          </section>

          {/* Section 2: Health */}
          <section className="mb-16">
            <h2 className="flex items-center gap-3 text-3xl font-bold text-slate-900 mb-6">
              <HeartPulse className="w-8 h-8 text-red-600" />
              2. "Doctor's Delay" (Helsetapet)
            </h2>
            <p>
              I Meld. St. 12 (Folkehelsemeldingen) innrømmer staten at <em>"manglende språkkompetanse truer pasientsikkerheten"</em>. 
              Dette er juridisk dynamitt.
            </p>
            <p>
              Når pasienter må bruke barnebarn som tolker, oppstår feilmedisinering og sene diagnoser. 
              Dette fører til at samiske pasienter ofte kommer senere til behandling enn befolkningen for øvrig. 
              Kostnaden tas ikke av helseforetaket, men av den enkelte gjennom tapt livskvalitet og uføretrygd.
            </p>
          </section>

          {/* Section 3: Capital */}
          <section className="mb-16">
            <h2 className="flex items-center gap-3 text-3xl font-bold text-slate-900 mb-6">
              <Coins className="w-8 h-8 text-yellow-600" />
              3. Pant-gapet (Den døde kapitalen)
            </h2>
            <p>
              Her finner vi den største barrieren for vekst. En familie i Karasjok kan ha høy inntekt, men lav "bank-verdi".
            </p>
            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="bg-white border-2 border-slate-200 p-6 rounded-xl">
                <h4 className="font-bold text-slate-500 uppercase text-xs mb-2">Virkelighet</h4>
                <div className="flex items-baseline gap-1">
                  <span className="font-bold text-xl text-slate-900">Byggekostnad:</span>
                  <McpDataSpan id="byggekostnad-finnmark" value="6,5 mill" className="font-bold text-xl text-slate-900"/>
                </div>
                <p className="text-sm text-slate-600 mt-2">Hva det faktisk koster å bygge et hus i Indre Finnmark.</p>
              </div>
              <div className="bg-white border-2 border-slate-200 p-6 rounded-xl">
                <h4 className="font-bold text-slate-500 uppercase text-xs mb-2">Bankens vurdering</h4>
                <div className="flex items-baseline gap-1">
                  <span className="font-bold text-xl text-red-600">Takst:</span>
                  <McpDataSpan id="takst-finnmark" value="2,5 mill" className="font-bold text-xl text-red-600"/>
                </div>
                <p className="text-sm text-slate-600 mt-2">Hva bankens algoritmer sier huset er verdt.</p>
              </div>
            </div>
            <p>
              Dette gapet på <McpDataSpan id="pant-gap-finnmark" value="4 millioner kroner" className="font-bold"/> må dekkes av egenkapital. 
              Det gjør at unge ikke får bygd, og at næringsdrivende ikke får lån med pant i egen bolig. Kapitalen er "død".
            </p>
          </section>

          {/* Section 4: Birgejupmi */}
          <section className="mb-16">
            <h2 className="flex items-center gap-3 text-3xl font-bold text-slate-900 mb-6">
              <FileWarning className="w-8 h-8 text-blue-600" />
              4. Birgejupmi-fellen
            </h2>
            <p>
              <em>Birgejupmi</em> – evnen til å klare seg selv – har vært en overlevelsesstrategi. 
              Men i en moderne velferdsstat har det blitt en subsidie til staten.
            </p>
            <p>
              Fordi vi ordner opp selv, trenger ikke staten å bygge systemer som fungerer. 
              Vi tolker for naboen, vi kjører bestemor, vi fikser veien. 
              Averdis råd er klart: <strong>Det er på tide å slutte med dugnad og begynne å sende faktura.</strong>
            </p>
          </section>

          <hr className="my-12 border-slate-200" />

          {/* --- CONCLUSION / AVERDI STRATEGY --- */}
          <div className="bg-slate-900 text-white p-10 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-6">Averdi-rådet: Fra offer til leverandør</h2>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                Staten har i sine stortingsmeldinger innrømmet at systemet feiler ("Statens Tilståelse"). 
                Når staten abdiserer fra ansvaret, oppstår det et marked.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <UserCheck className="w-6 h-6 text-[#E86C1F] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-white">Send faktura for kompetanse</h4>
                    <p className="text-sm text-slate-400">Ikke gi bort kulturkompetanse gratis. Kommunene har lovpålagte krav de ikke klarer å oppfylle. Selg løsningen.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Quote className="w-6 h-6 text-[#E86C1F] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-white">Profesjonaliser søknadene</h4>
                    <p className="text-sm text-slate-400">I "søknadsregimet" vinner den som skriver best "byråkrat-norsk". Vi hjelper deg å oversette din reelle verdiskaping til språket systemet forstår.</p>
                  </div>
                </div>
              </div>
              
              <Link href="/kontakt" className="inline-flex items-center justify-center px-8 py-4 bg-[#E86C1F] text-white font-bold rounded-full hover:bg-[#d65f18] transition-all">
                Snakk med Elle om strategi
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
            
            {/* Background Blob */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#E86C1F]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          </div>

          {/* Sources Footnote */}
          <div className="mt-12 text-xs text-slate-400 border-t border-slate-100 pt-6">
            <p className="font-bold mb-2">Kilder & Grunnlag:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Meld. St. 19 (2022–2023) - Sannhets- og forsoningskommisjonen</li>
              <li>Meld. St. 12 (2023–2024) - Folkehelsemeldingen</li>
              <li>Prop. 1 S (2025-2026) - Statsbudsjettet</li>
              <li>SAMINOR 2 / Senter for samisk helseforskning</li>
            </ul>
            <p className="mt-4">
              Denne analysen er utarbeidet av Averdi AS v/ <McpDataSpan id="author-name" value="Elle Máret" source="Averdi" />. 
              Tall og satser er basert på gjeldende forslag for <McpDataSpan id="budget-year" value="2026" source="Statsbudsjettet" />.
            </p>
          </div>

        </div>
      </article>

      {/* Cross-link to Services */}
      <section className="bg-white py-16 border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <CtaBlock 
            title="Trenger din bedrift en tolk?"
            description="Vi oversetter komplekse regelverk til lønnsomhet. Enten det gjelder Sametingets tilskudd eller skattefordeler i tiltakssonen."
            primaryButtonText="Se våre tjenester"
            primaryButtonLink="/tjenester"
            secondaryButtonText="Les om Bedriftsstøtte"
            secondaryButtonLink="/kunnskapsbank/bedrifter"
          />
        </div>
      </section>

    </main>
  );
}