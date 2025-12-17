'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { BookOpen, ChevronUp, ChevronDown, ExternalLink, Key, Shield, AlertCircle, Info, Eye } from 'lucide-react';

import { integrationPartners } from '../constants';

import EmonkeyVipps1 from '../images/bilde1.png';
import EmonkeyVipps2 from '../images/bilde2.png';
import EmonkeyVipps3 from '../images/bilde3.png';

interface Props {
  integrationPartner?: string;
}

export function VippsCredentialsGuide({ integrationPartner }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const isEmonkey = integrationPartner === 'emonkey';
  const integrationPartnerName =
    integrationPartners.find((p) => p.id === integrationPartner)?.name || integrationPartner || 'Regnskapspartner';

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-blue-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          <BookOpen className="w-5 h-5 text-blue-600" />
          <span className="font-semibold text-blue-900">
            {isEmonkey
              ? '📖 eMonkey: Gi regnskapspartner tilgang i Vipps-portalen (Steg-for-steg)'
              : '📖 Hvordan finne API-nøklene dine (Steg-for-steg guide)'}
          </span>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5 text-blue-600" /> : <ChevronDown className="w-5 h-5 text-blue-600" />}
      </button>

      {isOpen && (
        <div className="px-6 py-6 bg-white border-t border-blue-200 space-y-6">

          {isEmonkey ? (
            <>
              <div className="mb-2 text-center">
                <h3 className="text-2xl font-bold mb-2 text-slate-900">Koble Vipps mot regnskap (eMonkey)</h3>
                <p className="text-sm text-slate-600 max-w-2xl mx-auto">
                  Følg stegene under for å gi <strong>eMonkey</strong> tilgang i Vipps-portalen og finn ditt{' '}
                  <strong>MSN (Merchant Serial Number)</strong>.
                </p>
              </div>

              {/* Step 1 */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-cyan-600" />
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <span className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 text-slate-900 font-bold text-xl">1</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold mb-2">Logg inn som administrator</h4>
                    <p className="text-slate-600">
                      Gå til{' '}
                      <a
                        href="https://portal.vippsmobilepay.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-700 underline hover:text-cyan-900"
                      >
                        portal.vippsmobilepay.com
                      </a>{' '}
                      og logg inn med BankID. Du må ha administratorrettigheter for å utføre endringer.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-slate-200" />
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <span className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 text-slate-900 font-bold text-xl">2</span>
                  </div>
                  <div className="flex-1 w-full">
                    <h4 className="text-xl font-bold mb-2">Naviger til Regnskapspartnere</h4>
                    <p className="text-slate-600 mb-4">
                      I menyen til venstre, klikk på <strong>Rapporter</strong> og velg fanen{' '}
                      <strong>Regnskapspartnere</strong>.
                    </p>
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                      <Image
                        src={EmonkeyVipps1}
                        alt="Vipps portal: Rapporter → Regnskapspartnere"
                        className="h-auto w-full rounded-md"
                        sizes="(max-width: 768px) 100vw, 700px"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-slate-200" />
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <span className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 text-slate-900 font-bold text-xl">3</span>
                  </div>
                  <div className="flex-1 w-full">
                    <h4 className="text-xl font-bold mb-2">Legg til partner (eMonkey)</h4>
                    <p className="text-slate-600 mb-3">
                      Klikk på <strong>Rediger partnertilganger</strong> (eller bruk søkefeltet). Søk opp{' '}
                      <span className="font-semibold text-slate-900">eMonkey</span> i listen.
                    </p>
                    <p className="text-sm bg-blue-50 text-blue-800 p-3 rounded-md mb-4 border-l-4 border-blue-400">
                      <strong>Obs:</strong> Husk å velge hvilke salgssteder (Vipps-numre) integrasjonen skal gjelde for.
                    </p>
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                      {/* Crop bottom 50% for bilde2 */}
                      <div
                        className="relative w-full overflow-hidden rounded-md"
                        style={{ aspectRatio: `${EmonkeyVipps2.width} / ${Math.round(EmonkeyVipps2.height / 2)}` }}
                      >
                        <Image
                          src={EmonkeyVipps2}
                          alt="Vipps portal: Søk etter eMonkey og legg til regnskapspartner"
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 768px) 100vw, 700px"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-slate-200" />
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <span className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 text-slate-900 font-bold text-xl">4</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold mb-2">Klikk «Lagre»</h4>
                    <p className="text-slate-600">
                      Når du har valgt regnskapspartner og salgssteder, klikk <strong>Lagre</strong> for å bekrefte
                      endringene.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 5 */}
              <div className="bg-slate-900 p-6 rounded-2xl shadow-lg relative overflow-hidden text-white">
                <div className="absolute top-0 left-0 w-1 h-full bg-cyan-400" />
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <span className="flex items-center justify-center w-12 h-12 rounded-full bg-cyan-600 text-white font-bold text-xl">5</span>
                  </div>
                  <div className="flex-1 w-full">
                    <h4 className="text-xl font-bold mb-2 text-white">Identifiser MSN-nummer</h4>
                    <p className="text-slate-300 mb-4">
                      For å fullføre integrasjonen trenger vi ditt <strong>MSN (Merchant Serial Number)</strong>. Etter at
                      partner er lagt til, finner du MSN i oversikten for salgssteder.
                    </p>
                    <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                      <Image
                        src={EmonkeyVipps3}
                        alt="Vipps portal: Oversikt med MSN-nummer"
                        className="h-auto w-full rounded-md"
                        sizes="(max-width: 768px) 100vw, 700px"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-2 border-t border-slate-200 pt-6 text-center">
                <h4 className="text-lg font-semibold text-slate-900 mb-2">Neste steg</h4>
                <p className="text-slate-600">
                  Lim inn ditt <strong>MSN-nummer</strong> i feltet under og bekreft at valgt regnskapspartner er{' '}
                  <strong>{integrationPartnerName}</strong>.
                </p>
              </div>
            </>
          ) : (
            <>

          {/* Step 1 */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                1
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-2">Logg inn på Vipps Portal</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                  <p className="text-gray-700">
                    <strong>URL:</strong>{' '}
                    <a
                      href="https://portal.vippsmobilepay.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline inline-flex items-center gap-1"
                    >
                      portal.vippsmobilepay.com
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </p>
                  <p className="text-gray-700">
                    <strong>Autentisering:</strong> Bruk BankID (privatperson eller bedrift)
                  </p>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mt-2">
                    <p className="text-yellow-800 text-xs">
                      <strong>⚠️ Viktig:</strong> Ikke bruk den gamle portalen (portal.vipps.no).
                      Den nye portalen er portal.vippsmobilepay<strong>.com</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                2
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-2">Velg din organisasjon</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                  <p className="text-gray-700">
                    Etter innlogging vil du se en liste over organisasjoner du har tilgang til.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 ml-2">
                    <li>Velg organisasjonen med riktig organisasjonsnummer</li>
                    <li>Hvis du har flere "sales units" (salgssteder), velg hovedenheten</li>
                  </ul>
                  <div className="bg-blue-50 border border-blue-200 p-3 rounded mt-2">
                    <p className="text-blue-800 text-xs">
                      <Key className="w-4 h-4 inline mr-1" />
                      <strong>Tips:</strong> Organisasjonsnummeret ditt vises øverst på siden.
                      Verifiser at det stemmer med det du skrev i forrige steg.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                3
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-2">Gå til Developer-seksjonen</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-3 text-sm">
                  <p className="text-gray-700">
                    I venstre meny, finn og klikk på:
                  </p>
                  <div className="bg-white border-2 border-blue-300 p-3 rounded-lg">
                    <p className="font-mono text-gray-900 font-semibold">
                      Developer → API keys
                    </p>
                  </div>
                  <p className="text-gray-700">
                    Alternativ vei: <span className="font-mono bg-gray-100 px-2 py-1 rounded">Settings → API credentials</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 - Client ID */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                4a
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Key className="w-5 h-5 text-green-600" />
                  Finn Client ID
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                  <p className="text-gray-700">
                    På "API keys"-siden finner du <strong>Client ID</strong> under seksjonen "Production keys".
                  </p>
                  <div className="space-y-2">
                    <p className="text-gray-700"><strong>Ser ut som:</strong></p>
                    <div className="bg-white border border-gray-300 p-3 rounded font-mono text-xs text-gray-600">
                      8a3b5c7d-1234-5678-90ab-cdef12345678
                    </div>
                  </div>
                  <div className="flex items-start gap-2 bg-blue-50 p-2 rounded">
                    <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-blue-800 text-xs">
                      Dette er en UUID (universally unique identifier) i formatet xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
                    </p>
                  </div>
                  <button
                    className="text-blue-600 hover:underline text-xs flex items-center gap-1"
                    onClick={() => navigator.clipboard.writeText('Client ID kopieres med "Copy" knappen i portalen')}
                  >
                    <Eye className="w-3 h-3" />
                    Klikk "Copy" knappen ved siden av nøkkelen for å kopiere
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Step 5 - Client Secret */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                4b
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-red-600" />
                  Finn Client Secret
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                  <p className="text-gray-700">
                    <strong>Client Secret</strong> er IKKE synlig i portalen av sikkerhetshensyn.
                  </p>

                  <div className="bg-red-50 border-l-4 border-red-500 p-3 space-y-2">
                    <p className="text-red-900 font-semibold">🔒 Viktig sikkerhetsinformasjon:</p>
                    <ul className="list-disc list-inside space-y-1 text-red-800 text-xs ml-2">
                      <li>Client Secret vises KUN når nøkkelen genereres første gang</li>
                      <li>Hvis du har mistet den, må du regenerere en ny nøkkel</li>
                      <li>Den gamle nøkkelen slutter da å virke</li>
                    </ul>
                  </div>

                  <div className="space-y-2 mt-3">
                    <p className="text-gray-700 font-semibold">Hvis du trenger ny Client Secret:</p>
                    <ol className="list-decimal list-inside space-y-1 text-gray-700 ml-2 text-xs">
                      <li>Klikk på "Regenerate" knappen ved siden av nøkkelen</li>
                      <li>Bekreft at du vil generere ny nøkkel</li>
                      <li>Den nye Client Secret vises på skjermen - <strong>KOPIER DEN NÅ</strong></li>
                      <li>Du får aldri se denne nøkkelen igjen</li>
                    </ol>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-300 p-3 rounded mt-2">
                    <p className="text-yellow-800 text-xs">
                      <strong>Best practice:</strong> Lagre Client Secret i en passordmanager (1Password, LastPass, Bitwarden)
                      med en gang du får den.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 6 - MSN */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                4c
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Key className="w-5 h-5 text-purple-600" />
                  Finn Merchant Serial Number (MSN)
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                  <p className="text-gray-700">
                    MSN finner du på samme side som API-nøklene, vanligvis øverst eller i en egen boks merket "Sales Unit".
                  </p>
                  <div className="space-y-2">
                    <p className="text-gray-700"><strong>Ser ut som:</strong></p>
                    <div className="bg-white border border-gray-300 p-3 rounded font-mono text-xs text-gray-600">
                      123456
                    </div>
                    <p className="text-gray-500 text-xs">Et 5-6 sifret tall</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 p-3 rounded">
                    <p className="text-blue-800 text-xs">
                      <strong>Hvis du har flere salgssteder:</strong> Du vil ha et MSN per salgssted.
                      Velg det som matcher hovedenheten din. Du kan legge til flere senere.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 7 - Subscription Key (Optional) */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gray-400 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                5
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-2">
                  Subscription Key (Valgfritt) - For Report API
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                  <p className="text-gray-700">
                    Hvis du skal bruke Report API (for å hente oppgjørsrapporter), trenger du også en <strong>Subscription Key</strong>.
                  </p>

                  <div className="bg-blue-50 p-3 rounded space-y-2">
                    <p className="text-blue-900 font-semibold text-xs">Hvor finner jeg denne?</p>
                    <ol className="list-decimal list-inside space-y-1 text-blue-800 text-xs ml-2">
                      <li>Gå til "Developer" → "API Products"</li>
                      <li>Finn "Report API" i listen</li>
                      <li>Klikk "Subscribe" hvis du ikke har abonnert</li>
                      <li>Subscription Key vises under "Your subscriptions"</li>
                    </ol>
                  </div>

                  <div className="bg-gray-100 border border-gray-300 p-3 rounded">
                    <p className="text-gray-700 text-xs">
                      <strong>Header navn:</strong> <code className="bg-white px-2 py-1 rounded">Ocp-Apim-Subscription-Key</code>
                    </p>
                  </div>

                  <p className="text-gray-600 text-xs italic">
                    Mange integrasjonspartnere (som iizy) håndterer dette for deg, så det er ofte ikke nødvendig.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Common Issues */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <h4 className="font-bold text-yellow-900 mb-2 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Vanlige feil
            </h4>
            <ul className="space-y-2 text-sm text-yellow-800">
              <li className="flex items-start gap-2">
                <span className="font-bold">❌</span>
                <div>
                  <strong>Feil portal:</strong> Sørg for at du bruker portal.vippsmobilepay<strong>.com</strong> og ikke den gamle portal.vipps.no
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">❌</span>
                <div>
                  <strong>Mangler tilgang:</strong> Hvis du ikke ser "Developer" i menyen, mangler du utvikler-tilgang.
                  Kontakt personen som administrerer Vipps-kontoen i organisasjonen din.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">❌</span>
                <div>
                  <strong>Kopierer feil nøkkel:</strong> Pass på at du kopierer "Production" nøklene, IKKE "Test" nøklene.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">❌</span>
                <div>
                  <strong>Mellomrom i nøkkelen:</strong> Når du limer inn, sjekk at det ikke er ekstra mellomrom før eller etter nøkkelen.
                </div>
              </li>
            </ul>
          </div>

          {/* Help section */}
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <h4 className="font-bold text-green-900 mb-2">Trenger du hjelp?</h4>
            <p className="text-sm text-green-800 mb-3">
              Hvis du står fast eller ikke finner nøklene dine:
            </p>
            <div className="space-y-2 text-sm">
              <a
                href="https://developer.vippsmobilepay.com/docs/knowledge-base/portal/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-green-700 hover:underline"
              >
                <ExternalLink className="w-4 h-4" />
                Offisiell Vipps dokumentasjon om portalen
              </a>
              <a
                href="mailto:support@averdi.no"
                className="flex items-center gap-2 text-green-700 hover:underline"
              >
                <Key className="w-4 h-4" />
                Kontakt Averdi support: support@averdi.no
              </a>
            </div>
          </div>

            </>
          )}

        </div>
      )}
    </div>
  );
}

