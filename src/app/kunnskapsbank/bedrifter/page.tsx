import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  ArrowLeft, 
  TrendingUp, 
  Briefcase, 
  Truck, 
  Calculator, 
  ShieldCheck, 
  Coins, 
  BookOpen, 
  ExternalLink,
  Users,
  Building2,
  FileText,
  Cpu,
  Search,
  Database,
  Eye,
  AlertTriangle
} from 'lucide-react';
import { McpDataSpan } from '@/components/ui/McpDataSpan';
import { AverdiBackground } from '@/components/modules/AverdiBackground';
import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { cleanText } from '@/utils/text';
import { getExpert } from '@/data/experts';
import { ExpertInsight } from '@/components/modules/kunnskapsbank/ExpertInsight';

export const metadata: Metadata = {
  title: 'Fremtidens Bedriftsøkonomi: Null Feil, Full Innsikt',
  description: 'Vi kombinerer AI-drevet regnskap med statsautorisert kontroll. Slik fjerner vi feil og gir deg "Financial Intelligence".',
};

// Lokal CategoryCard for stabilitet
function LocalCategoryCard({ title, description, href, icon: Icon, theme }: any) {
    const themeColor = theme === 'blue' ? 'text-blue-600 bg-blue-50 group-hover:bg-blue-600' : 'text-[#E86C1F] bg-orange-50 group-hover:bg-[#E86C1F]';
    const hoverText = theme === 'blue' ? 'group-hover:text-blue-600' : 'group-hover:text-[#E86C1F]';

    return (
        <Link href={href} className={`group flex flex-col p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all h-full hover:border-${theme === 'blue' ? 'blue-600' : '[#E86C1F]'}`}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${themeColor} group-hover:text-white transition-colors`}>
                <Icon className="w-6 h-6" />
            </div>
            <h3 className={`text-xl font-bold text-slate-900 mb-2 ${hoverText} transition-colors`}>{title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed flex-grow">{description}</p>
        </Link>
    );
}

export default function BedriftHub() {
  const isak = getExpert('isak');

  // FAQ Data med SEO-fokus på skatt og soner (JSX for visning)
  const bedriftFaq = [
    {
      question: 'Hvorfor er datakvalitet så viktig?',
      answer: <>Små feil som en feilplassert desimal eller dobbel registrering kan gi store utslag. Med <strong className="text-blue-600">AI-validering</strong> fanger vi disse feilene <em>før</em> de havner i regnskapet.</>
    },
    {
      question: 'Hva er RAG (Retrieval-Augmented Generation)?',
      answer: <>RAG er teknologien vi bruker for å la AI søke direkte i oppdaterte lovverk og dine egne data. Det betyr at du får svar basert på <strong className="text-blue-600">fakta</strong>, ikke gjetning.</>
    },
    {
      question: 'Kan AI erstatte regnskapsføreren?',
      answer: <>Nei, men det erstatter den kjedelige delen av jobben. Vi bruker "Hybrid Intelligence" – AI tar seg av datainnsamling og kontroll, mens vi (menneskene) tar oss av strategien og de vanskelige vurderingene.</>
    },
    {
      question: 'Hvordan hjelper dette med likviditeten?',
      answer: <>Ved å automatisere fakturering og purring (AR), reduserer vi tiden det tar å få betalt. Bedre data gir også mer presise likviditetsprognoser.</>
    }
  ];

  // JSON-LD Schema for Google (Using cleanText)
  const jsonLdData = bedriftFaq.map(item => ({
    q: item.question,
    a: cleanText(typeof item.answer === 'string' ? item.answer : "Se nettsiden for detaljert svar.")
  }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': jsonLdData.map(item => ({
      '@type': 'Question',
      'name': item.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.a
      }
    }))
  };

  return (
    <main className="min-h-screen bg-slate-50 relative overflow-hidden font-sans">
      <AverdiBackground />
      
      {/* Inject Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
        
        {/* Breadcrumb */}
        <Link href="/kunnskapsbank" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-8 font-medium transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Tilbake til oversikt
        </Link>

        {/* Hero Section */}
        <div className="mb-12">
          <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-3 block">
            Hybrid Intelligence
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-slate-900 leading-tight">
            Fra regnskap til <br className="hidden md:block" />
            <span className="text-blue-600">Vekstmotor</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
            Vi teller ikke bare bønner, vi planter dem med presisjon. Ved å kombinere
            <strong className="text-slate-900"> Statsautorisert kontroll</strong> med
            <strong className="text-blue-600"> AI-drevet automatisering</strong>,
            eliminerer vi feil og gir deg sanntidsinnsikt i din bedrifts fremtid.
          </p>
        </div>

        {/* --- PROBLEM: THE 8 SILENT KILLERS --- */}
        <section className="my-16 bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200">
          <div className="p-8 md:p-12 border-b border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-8 h-8 text-red-500" />
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                De 8 feilene som dreper lønnsomheten
              </h2>
            </div>
            <p className="text-slate-600 max-w-2xl text-lg">
              Selv de beste gjør feil. Her er fellene vi bruker teknologi for å eliminere automatisk.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x border-slate-100">
            <div className="p-6 hover:bg-slate-50 transition-colors">
                <FileText className="w-6 h-6 text-slate-400 mb-3" />
                <h3 className="font-bold text-slate-900 mb-2">Manuelle Tastefeil</h3>
                <p className="text-sm text-slate-500">En null for mye eller lite? AI validerer tallene før de bokføres.</p>
            </div>
            <div className="p-6 hover:bg-slate-50 transition-colors">
                <Briefcase className="w-6 h-6 text-slate-400 mb-3" />
                <h3 className="font-bold text-slate-900 mb-2">Feilklassifisering</h3>
                <p className="text-sm text-slate-500">Drift eller investering? Vi sikrer at kostnader havner på rett konto.</p>
            </div>
            <div className="p-6 hover:bg-slate-50 transition-colors">
                <Search className="w-6 h-6 text-slate-400 mb-3" />
                <h3 className="font-bold text-slate-900 mb-2">Glemte Avstemminger</h3>
                <p className="text-sm text-slate-500">Vi matcher bank mot regnskap i sanntid. Ingen spøkelser i systemet.</p>
            </div>
            <div className="p-6 hover:bg-slate-50 transition-colors">
                <Coins className="w-6 h-6 text-slate-400 mb-3" />
                <h3 className="font-bold text-slate-900 mb-2">Treig Fakturering</h3>
                <p className="text-sm text-slate-500">Automatisert oppfølging (AR) sikrer at pengene kommer inn.</p>
            </div>
            {/* Row 2 */}
            <div className="p-6 hover:bg-slate-50 transition-colors border-t border-slate-100">
                <TrendingUp className="w-6 h-6 text-slate-400 mb-3" />
                <h3 className="font-bold text-slate-900 mb-2">Avskrivningsrot</h3>
                <p className="text-sm text-slate-500">Vi automatiserer anleggsregisteret slik at verdiene stemmer.</p>
            </div>
            <div className="p-6 hover:bg-slate-50 transition-colors border-t border-slate-100">
                <Truck className="w-6 h-6 text-slate-400 mb-3" />
                <h3 className="font-bold text-slate-900 mb-2">Lager-kaos</h3>
                <p className="text-sm text-slate-500">Overlager binder kapital. Vi gir deg kontroll på vareflyten.</p>
            </div>
            <div className="p-6 hover:bg-slate-50 transition-colors border-t border-slate-100">
                <Database className="w-6 h-6 text-slate-400 mb-3" />
                <h3 className="font-bold text-slate-900 mb-2">Datatap</h3>
                <p className="text-sm text-slate-500">Skybaserte backups. Alltid. Vi sikrer dine digitale verdier.</p>
            </div>
            <div className="p-6 hover:bg-slate-50 transition-colors border-t border-slate-100">
                <ShieldCheck className="w-6 h-6 text-slate-400 mb-3" />
                <h3 className="font-bold text-slate-900 mb-2">DIY-Skatt</h3>
                <p className="text-sm text-slate-500">Ikke gjør skatt selv. Vår ekspertise + AI sikrer korrekt rapportering.</p>
            </div>
          </div>
        </section>

        {/* --- SOLUTION: AI & RAG --- */}
        <section className="bg-slate-900 text-white rounded-2xl p-8 md:p-12 mb-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
                <Cpu className="w-48 h-48 text-blue-400" />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row gap-12">
                <div className="md:w-1/2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider rounded-full mb-6 border border-blue-500/30">
                        Teknologi
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Vi bruker AI til å gi deg <span className="text-blue-400">Financial Intelligence</span>
                    </h2>
                    <p className="text-slate-300 leading-relaxed mb-6">
                        Regnskap har tradisjonelt handlet om "hva skjedde i fjor?". Med våre moderne verktøy snur vi fokuset: "Hva skjer i morgen?".
                    </p>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                            <Eye className="w-5 h-5 text-blue-400 mt-1" />
                            <div>
                                <strong className="block text-white">Regulatory Copilot (RAG)</strong>
                                <span className="text-slate-400 text-sm">Vi bruker AI til å søke i oppdaterte lovverk umiddelbart. Du får svar på komplekse spørsmål om mva og regelverk på sekunder, ikke dager.</span>
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <FileText className="w-5 h-5 text-blue-400 mt-1" />
                            <div>
                                <strong className="block text-white">Automatisert Rapportering</strong>
                                <span className="text-slate-400 text-sm">Vi bruker ikke dager på å klippe og lime i Excel. Rapportene dine genereres automatisk, slik at vi kan bruke tiden på å analysere tallene sammen med deg.</span>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="md:w-1/2 bg-slate-800/50 rounded-xl p-6 border border-slate-700 backdrop-blur-sm">
                    {isak && (
                        <ExpertInsight
                            title="Isaks Perspektiv: Tillit til maskinen"
                            quote="Jeg stoler på at roboten kan telle, men jeg stoler på at jeg selv kan tenke. Vår jobb er å sette opp systemene slik at feil blir umulig, slik at vi kan bruke tiden på å bygge verdi for deg."
                            expert={isak}
                            className="bg-transparent border-0 p-0 shadow-none"
                        />
                    )}
                    <div className="mt-6 pt-6 border-t border-slate-700">
                        <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
                            <span>Feilrate (Manuelt)</span>
                            <span className="text-red-400">Høy</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2 mb-4">
                            <div className="bg-red-500 h-2 rounded-full w-3/4"></div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
                            <span>Feilrate (Averdi Hybrid)</span>
                            <span className="text-green-400">Tilnærmet Null</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full w-[2%]"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* --- NAVIGATION GRID --- */}
        <h2 className="text-3xl font-bold text-slate-900 mb-8">Utforsk våre verktøy</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          
          <LocalCategoryCard 
            title="Innsatssonekalkulatoren"
            description="Se hvor mye du sparer på 0% AGA. En perfekt demonstrasjon av hvordan data gir beslutningsstøtte."
            href="/kunnskapsbank/bedrifter/tiltakssonen" 
            icon={Calculator}
            theme="blue"
          />

          <LocalCategoryCard 
            title="Rekruttering & Lønn"
            description="Automatiserte lønnssystemer som håndterer Finnmarksfradraget og reiseutgifter korrekt."
            href="/kunnskapsbank/bedrifter/rekruttering" 
            icon={Users}
            theme="blue"
          />

          <LocalCategoryCard 
            title="Skatt & Regler"
            description="RAG-teknologi gir oss svarene på komplekse spørsmål om transportstøtte og bagatellmessig støtte."
            href="/kunnskapsbank/bedrifter/transport" 
            icon={Truck}
            theme="blue"
          />

        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mb-20">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Spørsmål om Digital Økonomi</h2>
          <FaqAccordion items={bedriftFaq} themeColor="#2563EB" />
        </div>

      </div>
    </main>
  );
}