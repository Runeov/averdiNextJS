import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, Share2, MessageSquare, ThumbsUp, AlertTriangle, Coins, ShieldCheck, HeartPulse } from 'lucide-react';
import { AverdiBackground } from '@/components/modules/AverdiBackground';
import { McpDataSpan } from '@/components/ui/McpDataSpan';
import { getExpert } from '@/data/experts';

export const metadata: Metadata = {
  title: 'Den usynlige skatten i Nord | Averdi Innsikt',
  description: 'Vi snakker om strømpriser. Vi burde snakke om systemisk tidstyveri. En dybdeanalyse av de usynlige kostnadene i Sápmi.',
};

export default function ArtikkelFornesStyle() {
  const author = getExpert('elle-maret');
  const date = "12. desember 2025";

  return (
    <main className="min-h-screen bg-slate-50 relative font-sans">
      <AverdiBackground />
      
      {/* Navigation / Header */}
      <nav className="relative z-20 container mx-auto px-4 py-6 max-w-6xl flex justify-between items-center">
        <Link href="/kunnskapsbank/artikler" className="flex items-center text-slate-500 hover:text-slate-900 transition-colors font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Tilbake til oversikten
        </Link>
      </nav>

      <article className="relative z-10 container mx-auto px-4 pb-24 max-w-3xl">
        
        {/* HERO SECTION - THE HOOK */}
        <header className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-widest mb-6">
                <AlertTriangle className="w-3 h-3" />
                Dybdeanalyse
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
                Norge lyver om rikdommen sin.
            </h1>
            
            <div className="flex items-center gap-4 text-slate-500 text-sm mb-8 border-b border-slate-200 pb-8">
                <div className="flex items-center gap-2">
                    {author?.image ? (
                        <div className="w-8 h-8 rounded-full overflow-hidden relative">
                            <Image src={author.image} alt={author.name} fill className="object-cover" />
                        </div>
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                            EM
                        </div>
                    )}
                    <span className="font-semibold text-slate-900">{author?.name || 'Elle Máret'}</span>
                </div>
                <span>•</span>
                <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    5 min lesetid
                </div>
                <span>•</span>
                <span>{date}</span>
            </div>
        </header>

        {/* CONTENT BODY - FORNES STYLE (Short paragraphs, punchy, conversational) */}
        <div className="prose prose-lg prose-slate max-w-none text-slate-800">
            
            <p className="font-bold text-xl leading-relaxed">
                Vi må slutte å snakke om Gini-koeffisienter. Vi må slutte å snakke om synlig fattigdom.
            </p>

            <p>
                Det finnes en usynlig skatt i Norge.
            </p>

            <p>
                Den betales ikke med kroner over skatteseddelen. Den betales med noe mye mer verdifullt:
            </p>

            <p className="font-bold">
                Tid. Helse. Og død kapital.
            </p>

            <p>
                Dette er historien om hvorfor det er svindyrt å være "rik" i Sápmi. Og hvorfor statens Excel-ark lyver.
            </p>

            <div className="my-12 p-8 bg-white rounded-2xl shadow-sm border-l-4 border-orange-500 italic">
                "Det samiske samfunnet står overfor en styrt konkurs. Initiert av staten, effektuert av kommunene."
            </div>

            {/* SECTION 1: TIME THEFT */}
            <h2 className="text-3xl font-extrabold text-slate-900 mt-16 mb-6 flex items-center gap-3">
                1. Det store tidstyveriet <Clock className="w-6 h-6 text-orange-500" />
            </h2>

            <p>
                Se for deg dette scenariet:
            </p>

            <p>
                Statnett vil bygge en kraftlinje. De stiller med prosjektledere, jurister og kommunikasjonsrådgivere. Alle har millionlønn. Alle er på jobb.
            </p>

            <p>
                Hvem møter de på andre siden av bordet?
            </p>

            <p>
                En reindriftsutøver.
            </p>

            <p>
                Han kommer rett fra fjellet. Han har ikke sovet, fordi han har gjetet flokken for å unngå rovdyrtap. Han stiller på dugnad.
            </p>

            <p>
                Dette kaller vi "Konsultasjonsutmattelse". Det er en systemisk hersketeknikk.
            </p>

            <p>
                Ledere i pressede reinbeitedistrikter bruker nå opp mot <McpDataSpan id="tidsbruk-admin" source="Averdi Analyse" value="40%" /> av årsverket sitt på papirarbeid.
            </p>

            <p>
                Det er tid tatt fra flokken. Tid tatt fra verdiskaping. Tid tatt fra barna.
            </p>

            <p>
                Og hvis de ikke svarer? Da sier staten: "Den som tier, samtykker".
            </p>

            <p>
                Så de tvinges til å svare. På alt. Alltid.
            </p>

            {/* SECTION 2: THE BANK LIE */}
            <h2 className="text-3xl font-extrabold text-slate-900 mt-16 mb-6 flex items-center gap-3">
                2. Banken som sier du er null verdt <Coins className="w-6 h-6 text-orange-500" />
            </h2>

            <p>
                Her er et regnestykke som får blodet til å koke.
            </p>

            <p>
                La oss si du vil bygge hus i Karasjok. Du er ung, du har jobb, du vil satse.
            </p>

            <ul className="space-y-4 list-none pl-0 my-8">
                <li className="flex items-start gap-3">
                    <span className="text-2xl">🏗️</span>
                    <div>
                        <strong>Kostnad for å bygge nytt:</strong> <br />
                        <McpDataSpan id="byggekost-finnmark" source="Markedsanalyse" value="6,5 millioner kroner" />.
                    </div>
                </li>
                <li className="flex items-start gap-3">
                    <span className="text-2xl">🏦</span>
                    <div>
                        <strong>Bankens verdivurdering (pant):</strong> <br />
                        <McpDataSpan id="panteverdi-finnmark" source="Bankpraksis" value="2,5 millioner kroner" />.
                    </div>
                </li>
                <li className="flex items-start gap-3">
                    <span className="text-2xl">❌</span>
                    <div>
                        <strong>Gapet du må dekke selv (Egenkapital):</strong> <br />
                        <McpDataSpan id="pant-gap" source="Kalkyle" value="4,0 millioner kroner" />.
                    </div>
                </li>
            </ul>

            <p>
                Fire. Millioner. I. Egenkapital.
            </p>

            <p>
                Det spiller ingen rolle om du har hundrevis av rein i fjellet. Banken kaller det "død kapital". Du kan ikke pantsette dem for å bygge hus.
            </p>

            <p>
                Resultatet? Vi får folk som er "Income rich, asset poor".
            </p>

            <p>
                De har inntekt, men de eier ingenting i bankens øyne. De får ikke lån til å investere. De får ikke lån til å utvikle seg.
            </p>

            <p>
                De sitter fast.
            </p>

            {/* SECTION 3: HEALTH & BIRGEJUPMI */}
            <h2 className="text-3xl font-extrabold text-slate-900 mt-16 mb-6 flex items-center gap-3">
                3. Når "vondt i ryggen" egentlig er "vondt i livet" <HeartPulse className="w-6 h-6 text-orange-500" />
            </h2>

            <p>
                Legene kaller det "muskel- og skjelettplager".
            </p>

            <p>
                Vi kaller det somatisering av statlig svikt.
            </p>

            <p>
                Når du lever under konstant press om arealvern, gruvedrift og rettigheter, setter det seg i kroppen.
            </p>

            <p>
                Men når du kommer til legen, får du smertestillende. Fordi legen ikke forstår konteksten. Legen ser ikke traumene fra Fosen eller frykten for fremtiden.
            </p>

            <p>
                Dette skaper fenomenet "Doctor's Delay".
            </p>

            <p>
                Diagnosen kommer for sent. Behandlingen virker ikke. Folk havner på uføretrygd.
            </p>

            <p>
                Og vet du hva det verste er?
            </p>

            <p>
                Vi bruker våre egne barn som tolker. Bestemor forteller ikke om de intime plagene sine når barnebarnet på 14 år må oversette.
            </p>

            <p>
                Dette er ikke helsehjelp. Det er risikosport.
            </p>

            {/* SECTION 4: THE STATE'S CONFESSION */}
            <h2 className="text-3xl font-extrabold text-slate-900 mt-16 mb-6 flex items-center gap-3">
                Statens stille tilståelse <ShieldCheck className="w-6 h-6 text-orange-500" />
            </h2>

            <p>
                Staten vet dette. De har til og med innrømmet det.
            </p>

            <p>
                I Meld. St. 12 skriver regjeringen rett ut: <em>"Manglende språkkompetanse truer pasientsikkerheten".</em>
            </p>

            <p>
                Smak på den setningen.
            </p>

            <p>
                Når noe "truer pasientsikkerheten", er det per definisjon ulovlig. Det er et lovbrudd. Hver dag.
            </p>

            <p>
                Men hva gjør staten?
            </p>

            <p>
                De sier: "Dette må kommunene løse innenfor gjeldende rammer."
            </p>

            <p>
                Oversatt fra byråkrat-norsk: <strong>"Vi vet det er krise, men vi gidder ikke betale for det."</strong>
            </p>

            {/* CONCLUSION & CTA */}
            <div className="mt-16 bg-slate-900 text-white p-10 rounded-3xl">
                <h3 className="text-2xl font-bold mb-6 text-orange-500">
                    Så, hva gjør vi?
                </h3>
                
                <p className="text-lg leading-relaxed text-slate-200">
                    Vi må slutte å "berge oss".
                </p>

                <p className="text-lg leading-relaxed text-slate-200">
                    Begrepet <em>Birgejupmi</em> – å klare seg selv – har blitt en felle. Så lenge vi jobber gratis, tolker gratis og fikser opp i statens rot på dugnad, ser ikke systemet kostnaden.
                </p>

                <p className="text-lg leading-relaxed text-slate-200 font-bold">
                    Det er på tide å sende faktura.
                </p>

                <p className="text-lg leading-relaxed text-slate-200">
                    Vi i Averdi foreslår en ny strategi: Vi bygger de systemene staten mangler. Vi selger "Compliance as a Service". Vi selger samisk helsepersonell til markedspris.
                </p>

                <p className="text-lg leading-relaxed text-slate-200">
                    Ikke fordi vi er kyniske. Men fordi det er det eneste språket staten forstår.
                </p>

                <div className="mt-8 pt-8 border-t border-slate-700">
                    <p className="font-bold text-white text-xl mb-4">
                        Er du leder i en kommune i nord?
                    </p>
                    <Link href="/kontakt" className="inline-flex items-center justify-center w-full md:w-auto px-8 py-4 bg-[#E86C1F] hover:bg-[#d65a10] text-white font-bold rounded-full transition-all text-center">
                        La oss ta "sannhetspraten" <ArrowLeft className="w-5 h-5 ml-2 rotate-180" />
                    </Link>
                </div>
            </div>

        </div>

        {/* ENGAGEMENT BAR (Linkedin Style) */}
        <div className="mt-12 flex justify-between items-center border-t border-b border-slate-200 py-4">
            <div className="flex gap-6">
                <button className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-semibold transition-colors">
                    <ThumbsUp className="w-5 h-5" />
                    <span>Liker dette</span>
                </button>
                <button className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-semibold transition-colors">
                    <MessageSquare className="w-5 h-5" />
                    <span>Diskuter</span>
                </button>
            </div>
            <button className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-semibold transition-colors">
                <Share2 className="w-5 h-5" />
                <span>Del sannheten</span>
            </button>
        </div>

      </article>
    </main>
  );
}