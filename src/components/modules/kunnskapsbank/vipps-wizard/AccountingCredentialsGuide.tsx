'use client';

import React, { useState } from 'react';
import { BookOpen, ChevronUp, ChevronDown, Info, ExternalLink, Key } from 'lucide-react';

interface Props {
  system: string;
}

export function AccountingCredentialsGuide({ system }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const isPowerOffice = system === 'poweroffice';

  return (
    <div className="bg-purple-50 border border-purple-200 rounded-lg overflow-hidden mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-purple-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          <BookOpen className="w-5 h-5 text-purple-600" />
          <span className="font-semibold text-purple-900">
            📖 Hvordan få API-tilgang i {isPowerOffice ? 'PowerOffice Go' : '24SevenOffice'}
          </span>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5 text-purple-600" /> : <ChevronDown className="w-5 h-5 text-purple-600" />}
      </button>

      {isOpen && (
        <div className="px-6 py-6 bg-white border-t border-purple-200 space-y-6">
          {isPowerOffice ? (
            /* PowerOffice Go Guide */
            <>
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  Om PowerOffice Go OAuth 2.0
                </h4>
                <p className="text-sm text-blue-800 mb-2">
                  PowerOffice Go bruker OAuth 2.0. Du trenger to nøkler:
                </p>
                <ul className="list-disc list-inside text-sm text-blue-800 space-y-1 ml-2">
                  <li><strong>Application Key</strong> - Fra integrasjonspartner</li>
                  <li><strong>Client Key</strong> - Genereres automatisk i PowerOffice Go</li>
                </ul>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2">Få Application Key</h3>
                    <div className="bg-gray-50 p-4 rounded-lg text-sm space-y-2">
                      <p className="text-gray-700">Application Key får du fra integrasjonspartner:</p>
                      <ul className="space-y-2 ml-2">
                        <li className="bg-white border p-2 rounded">
                          <strong>iizy:</strong> <a href="https://www.poweroffice.no/utvidelser/vipps_iizy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs">Bestill her</a>
                        </li>
                        <li className="bg-white border p-2 rounded">
                          <strong>SRH:</strong> <span className="text-xs">Kontakt SpareBank 1</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2">Logg inn på PowerOffice Go</h3>
                    <div className="bg-gray-50 p-4 rounded-lg text-sm">
                      <a href="https://go.poweroffice.net" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">go.poweroffice.net</a>
                      <p className="text-xs text-gray-600 mt-1">Krever administrator-rettigheter</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2">Gå til Extensions</h3>
                    <div className="bg-gray-50 p-4 rounded-lg text-sm">
                      <div className="bg-white border-2 border-purple-300 p-2 rounded font-mono text-xs">
                        Menu → Settings → Extensions
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">4</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2">Godkjenn integrasjonen</h3>
                    <div className="bg-gray-50 p-4 rounded-lg text-sm space-y-2">
                      <p className="text-gray-700">Finn integrasjonen og klikk "Authorize"</p>
                      <div className="bg-green-50 border border-green-200 p-3 rounded">
                        <p className="text-green-800 text-xs"><strong>Client Key genereres automatisk!</strong></p>
                        <p className="text-green-700 text-xs mt-1">Du vil IKKE se den i PowerOffice (sikkerhet)</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">5</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2">Få Client Key fra partner</h3>
                    <div className="bg-gray-50 p-4 rounded-lg text-sm">
                      <p className="text-gray-700 mb-2">Logg inn på integrasjonspartnerens dashboard for å hente Client Key</p>
                      <div className="bg-blue-50 p-2 rounded text-xs text-blue-800">
                        <strong>Averdi-kunder:</strong> Send beskjed når godkjent, vi henter nøkkelen for deg
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* 24SevenOffice Guide */
            <>
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Om 24SevenOffice API</h4>
                <p className="text-sm text-blue-800">24SevenOffice bruker API Keys (brukernavn og passord) som du genererer selv.</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2">Logg inn på 24SevenOffice</h3>
                    <div className="bg-gray-50 p-4 rounded-lg text-sm">
                      <a href="https://24sevenoffice.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">24sevenoffice.com</a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2">Gå til API-integrasjoner</h3>
                    <div className="bg-gray-50 p-4 rounded-lg text-sm">
                      <div className="bg-white border-2 border-purple-300 p-2 rounded font-mono text-xs">
                        Innstillinger → Integrasjoner → API-tilgang
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2">Generer API-nøkler</h3>
                    <div className="bg-gray-50 p-4 rounded-lg text-sm space-y-2">
                      <p className="text-gray-700">Klikk "Generer ny nøkkel"</p>
                      <div className="bg-red-50 border-l-4 border-red-500 p-2">
                        <p className="text-red-800 text-xs"><strong>API Secret vises kun én gang!</strong> Kopier og lagre den nå.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">4</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2">Kopier nøklene</h3>
                    <div className="bg-gray-50 p-4 rounded-lg text-sm space-y-2">
                      <div>
                        <p className="text-gray-600 text-xs mb-1">API Key:</p>
                        <div className="bg-white border p-2 rounded font-mono text-xs">a1b2c3d4-e5f6...</div>
                      </div>
                      <div>
                        <p className="text-gray-600 text-xs mb-1">API Secret:</p>
                        <div className="bg-white border p-2 rounded font-mono text-xs">X7mK9pL2nQ4r...</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <h4 className="font-bold text-green-900 mb-2">Trenger hjelp?</h4>
            <div className="space-y-1 text-sm">
              <a href={isPowerOffice ? "https://developer.poweroffice.net" : "https://24sevenoffice.com/support"} target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline flex items-center gap-1">
                <ExternalLink className="w-3 h-3" />
                {isPowerOffice ? 'PowerOffice docs' : '24SevenOffice support'}
              </a>
              <a href="mailto:support@averdi.no" className="text-green-700 hover:underline flex items-center gap-1">
                <Key className="w-3 h-3" />
                support@averdi.no
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
