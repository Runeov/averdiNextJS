import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Music, BookOpen, CalendarClock, Mic2, AlertCircle, Languages, Check } from 'lucide-react';
import { ExpertInsight } from '@/components/modules/kunnskapsbank/ExpertInsight';
import { McpDataSpan } from '@/components/ui/McpDataSpan';
import { getExpert } from '@/data/experts';
import { AverdiBackground } from '@/components/modules/AverdiBackground';
import { CtaBlock } from '@/components/modules/kunnskapsbank/CtaBlock';
import { FaqAccordion } from '@/components/ui/FaqAccordion';

export const metadata: Metadata = {
  title: 'Kulturmidler og Språkstøtte | Sametinget 2026',
  description: 'Slik søker du støtte til musikk, litteratur, festivaler og språkkurs. Oversikt over fristene 1. mars og 1. oktober.',
};

export default function KulturSprakPage() {
  const janAtle = getExpert('jan-atle');

  const faqData = [
    { question: "Når er søknadsfristen for kulturmidler?", answer: "Hovedfristen for prosjektstøtte (musikk, litteratur, kunst) er 1. oktober for påfølgende år. Det finnes også noen ordninger med løpende frist." },
    { question: "Hva menes med språkplan i søknaden?", answer: "Alle som søker kulturmidler må beskrive hvordan samisk språk skal synes og høres i prosjektet. Dette gjelder alt fra plakater og markedsføring til selve gjennomføringen." },
    { question: "Kan jeg få støtte til å gi ut musikk?", answer: "Ja, det gis støtte til musikkutgivelser. Det stilles krav til at utgivelsen har samisk tekst eller sterk samisk kulturell tilknytning (f.eks. joik)." }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqData.map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer
      }
    }))
  };

  return (
    <main className="min-h-screen bg-slate-50 relative overflow-hidden">
      <AverdiBackground />

      <article className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* Breadcrumb */}
        <Link href="/kunnskapsbank/sametinget" className="inline-flex items-center text-slate-500 hover:text-[#E86C1F] mb-8 font-medium transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Tilbake til Sametinget-hub
        </Link>

        {/* Hero */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-[#E86C1F] text-sm font-medium mb-4">
            For Frivillighet, Kunstnere & Arrangører
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            Kulturmidler & <span className="text-[#E86C1F]">Språkløftet</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Dette er kjernen i Sametingets virkemidler. Enten du skal gi ut bok, arrangere festival eller holde samiskkurs, finnes det potter å søke på. Men vær obs: Her er fristene absolutte.
          </p>
        </div>

        {/* FRIST-ALARM: Kritisk informasjon først */}
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl mb-12 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-white rounded-full text-red-600 shadow-sm mt-1">
              <CalendarClock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-red-900 text-lg">Kritiske frister for 2026</h3>
              <p className="text-red-800 text-sm mb-4">
                For kulturtilskudd praktiserer Sametinget nulltoleranse på frister. Søknadsportalen stenger automatisk.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-lg border border-red-100">
                  <span className="block text-xs text-slate-500 uppercase tracking-wider">Vårfrist</span>
                  <McpDataSpan 
                    id="sameting-frist-kultur-var" 
                    value="01.03.2026" 
                    className="font-bold text-xl text-slate-900" 
                    source="Sametinget Fristkalender"
                  />
                  <span className="text-sm text-slate-600 block">Institusjoner & faste tiltak</span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-red-100">
                  <span className="block text-xs text-slate-500 uppercase tracking-wider">Høstfrist (Hoved)</span>
                  <McpDataSpan 
                    id="sameting-frist-kultur-host" 
                    value="01.10.2026" 
                    className="font-bold text-xl text-slate-900" 
                    source="Sametinget Fristkalender"
                  />
                  <span className="text-sm text-slate-600 block">Prosjektstøtte (Bøker, Musikk, etc.)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Expert Insight */}
        {janAtle && (
          <ExpertInsight 
            title="Søknaden må være komplett ved innsending" 
            quote="For kulturmidler holder det ikke å 'ettersende' vedlegg. Mangler du forlagsavtale eller budsjett ved midnatt på fristdagen, blir søknaden avvist uten realitetsbehandling."
            expert={janAtle}
          >
            <p>
              Det største sjokket for nye søkere er formalitetskravene. Sametinget sjekker først om du oppfyller de formelle kravene. 
              Kun hvis alt er på plass, vurderer de det kunstneriske innholdet. Vi hjelper deg å kvalitetssikre at alle vedlegg er med før du trykker send.
            </p>
          </ExpertInsight>
        )}

        {/* Kategori-Grid */}
        <div className="grid md:grid-cols-2 gap-6 my-16">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-[#E86C1F] transition-colors group">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4 text-[#E86C1F] group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-slate-900">Litteratur</h3>
            <p className="text-sm text-slate-600 mb-4">
              Støtte til utgivelse av skjønnlitteratur, faglitteratur og barnebøker på samisk. Krever forlagsavtale.
            </p>
            <ul className="text-sm text-slate-500 space-y-1">
              <li>• Maks støtte: <McpDataSpan id="sameting-litteratur-maks" value="240 000" format="currency" source="Sametinget" className="font-medium text-slate-900" /></li>
            </ul>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-[#E86C1F] transition-colors group">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 text-purple-600 group-hover:scale-110 transition-transform">
              <Music className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-slate-900">Musikkutgivelser</h3>
            <p className="text-sm text-slate-600 mb-4">
              Støtte til innspilling og utgivelse av samisk musikk og joik. Både tradisjonell og moderne.
            </p>
             <ul className="text-sm text-slate-500 space-y-1">
              <li>• Artiststipend kan også søkes</li>
            </ul>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-[#E86C1F] transition-colors group">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 text-blue-600 group-hover:scale-110 transition-transform">
              <Mic2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-slate-900">Språktiltak</h3>
            <p className="text-sm text-slate-600 mb-4">
              Kurs, språkleirer og arenaer der samisk språk høres og brukes. Høy prioritet.
            </p>
            <ul className="text-sm text-slate-500 space-y-1">
              <li>• Åpen søknadsfrist (ofte)</li>
            </ul>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-[#E86C1F] transition-colors group">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 text-green-600 group-hover:scale-110 transition-transform">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-slate-900">Institusjonsutvikling</h3>
            <p className="text-sm text-slate-600 mb-4">
              Drift av kulturhus, teatre og festivaler. 
            </p>
             <ul className="text-sm text-slate-500 space-y-1">
              <li>• <strong>OBS:</strong> Kun frist 1. mars</li>
            </ul>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 mb-16">
          
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            Krav til budsjett og finansiering
          </h2>
          
          <p className="text-lg text-slate-600 mb-6 leading-relaxed">
            Et vanlig avslagspunkt er budsjettet. Sametinget fullfinansierer sjelden prosjekter (unntatt noen språktiltak). 
            Du må vise til egenfinansiering eller annen støtte.
          </p>
          <p className="text-slate-600 mb-12 leading-relaxed">
            <strong>Underskuddsgaranti:</strong> For festivaler og arrangementer gis støtten ofte som en underskuddsgaranti. 
            Det betyr at du kun får utbetalt penger hvis regnskapet viser et faktisk underskudd oppad til innvilget beløp.
          </p>
          
          {/* NY DESIGN PÅ SPRÅKPLAN-SEKSJONEN */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Languages className="w-32 h-32 text-blue-600" />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm text-blue-600">
                  <Languages className="w-5 h-5" />
                </div>
                Språkplanen er nøkkelen
              </h3>
              
              <p className="text-slate-700 mb-6 max-w-xl">
                Uansett hva du søker om, vil saksbehandleren lete etter svaret på ett spørsmål: 
                <em>"Hvordan synliggjør dette prosjektet samisk språk?"</em>
              </p>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-blue-200 rounded-full p-0.5">
                    <Check className="w-3 h-3 text-blue-700" />
                  </div>
                  <span className="text-slate-700 text-sm font-medium">Skal plakaten være tospråklig? (Krav: Samisk først/øverst)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-blue-200 rounded-full p-0.5">
                    <Check className="w-3 h-3 text-blue-700" />
                  </div>
                  <span className="text-slate-700 text-sm font-medium">Skal arrangementet foregå på samisk?</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-blue-200 rounded-full p-0.5">
                    <Check className="w-3 h-3 text-blue-700" />
                  </div>
                  <span className="text-slate-700 text-sm font-medium">Hvordan sikrer du at samisk brukes i markedsføringen?</span>
                </li>
              </ul>

              <p className="text-blue-800 text-sm italic font-medium bg-blue-100/50 p-4 rounded-xl border border-blue-200/50 inline-block">
                En svak språkplan kan velte et ellers godt prosjekt. Vi hjelper deg å formulere dette konkret i søknaden.
              </p>
            </div>
          </div>
        </div>

       {/* CTA Component */}
        <CtaBlock
          title="Skal dere søke i år?"
          description="Vi kan ta rollen som prosjektøkonom i søknaden. Da vet Sametinget at budsjett, regnskap og rapportering blir håndtert profesjonelt."
          primaryButtonText="Kontakt oss om søknadshjelp"
          primaryButtonLink="/kontakt"
          secondaryButtonText="Se Institusjonsstøtte"
          secondaryButtonLink="/kunnskapsbank/sametinget/institusjon"
        />

       {/* FAQ Section */}
       <div className="mt-16 mb-12">
         <h2 className="text-2xl font-bold text-slate-900 mb-6">Ofte stilte spørsmål</h2>
         <FaqAccordion items={faqData} themeColor="#E86C1F" />
       </div>

      </article>
    </main>
  );
}