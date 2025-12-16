'use client';

import React, { useState } from 'react';
import { BookOpen, ChevronUp, ChevronDown, Info, ExternalLink, Key } from 'lucide-react';

interface Props {
  system: string;
  integrationPartner: string;
}

export function AccountingCredentialsGuide({ system, integrationPartner }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const isPowerOffice = system === 'poweroffice';

  // Partner-specific configuration
  const getPartnerConfig = () => {
    switch(integrationPartner) {
      case 'iizy':
        return {
          name: 'iizy fakturaintegrasjon',
          url: 'https://www.poweroffice.no/utvidelser/vipps_iizy',
          description: 'Legg til applikasjon "iizy fakturaintegrasjon" fra PowerOffice utvidelser'
        };
      case 'emonkey':
        return {
          name: 'Vipps - Levert av eMonkey',
          url: 'https://www.emonkey.no/integrasjoner/vipps',
          description: 'Integrasjon levert av eMonkey for Vipps-oppgjør'
        };
      case 'srh':
        return {
          name: 'SNN RH - Vipps',
          url: 'https://www.poweroffice.no/utvidelser/vipps-snnrh',
          description: 'SpareBank 1 regnskapshuset sin Vipps-integrasjon'
        };
      default:
        return {
          name: 'Din integrasjonspartner',
          url: '',
          description: 'Kontakt din integrasjonspartner for Application Key'
        };
    }
  };

  const partnerConfig = getPartnerConfig();

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
                  <li><strong>Application Key</strong> - Fra {partnerConfig.name}</li>
                  <li><strong>Client Key</strong> - Genereres automatisk i PowerOffice Go</li>
                </ul>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2">Logg inn på PowerOffice Go</h3>
                    <div className="bg-gray-50 p-4 rounded-lg text-sm">
                      <a href="https://go.poweroffice.net" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                        go.poweroffice.net
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <p className="text-xs text-gray-600 mt-1">Krever administrator-rettigheter</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2">Gå til Extensions</h3>
                    <div className="bg-gray-50 p-4 rounded-lg text-sm">
                      <div className="bg-white border-2 border-purple-300 p-3 rounded font-mono text-xs space-y-1">
                        <div>Menu (☰)</div>
                        <div>→ Settings (Innstillinger)</div>
                        <div>→ Extensions (Utvidelser)</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2">Legg til applikasjonen «{partnerConfig.name}»</h3>
                    <div className="bg-gray-50 p-4 rounded-lg text-sm space-y-3">
                      <p className="text-gray-700">{partnerConfig.description}</p>

                      {/* Partner-specific instructions */}
                      <div className="bg-white border-2 border-purple-200 p-4 rounded-lg space-y-3">
                        <div className="flex items-start gap-2">
                          <div className="w-6 h-6 bg-purple-500 text-white rounded flex items-center justify-center text-xs font-bold flex-shrink-0">
                            {integrationPartner === 'iizy' ? 'i' : integrationPartner === 'emonkey' ? 'e' : 'S'}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-purple-900 mb-1">{partnerConfig.name}</h4>
                            {partnerConfig.url && (
                              <a 
                                href={partnerConfig.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline text-xs flex items-center gap-1"
                              >
                                {partnerConfig.url.replace('https://', '')}
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 p-3 rounded">
                          <p className="text-blue-900 font-semibold text-xs mb-2">Hvordan få Application Key:</p>
                          
                          {integrationPartner === 'iizy' && (
                            <ol className="list-decimal list-inside text-xs text-blue-800 space-y-1 ml-2">
                              <li>Gå til PowerOffice utvidelser (lenke over)</li>
                              <li>Klikk "Bestill" for iizy fakturaintegrasjon</li>
                              <li>Fyll ut skjema med bedriftsinformasjon</li>
                              <li>iizy sender deg Application Key per e-post</li>
                              <li>Vanligvis mottas innen 1-2 virkedager</li>
                            </ol>
                          )}

                          {integrationPartner === 'emonkey' && (
                            <ol className="list-decimal list-inside text-xs text-blue-800 space-y-1 ml-2">
                              <li>Gå til eMonkey sin side (lenke over)</li>
                              <li>Kontakt eMonkey via kontaktskjema eller telefon</li>
                              <li>Be om Vipps-integrasjon for PowerOffice Go</li>
                              <li>eMonkey gir deg Application Key</li>
                              <li>De hjelper deg også med oppsett</li>
                            </ol>
                          )}

                          {integrationPartner === 'srh' && (
                            <ol className="list-decimal list-inside text-xs text-blue-800 space-y-1 ml-2">
                              <li>Kontakt din bankrådgiver i SpareBank 1</li>
                              <li>Be om "Vipps oppgjørsintegrasjon til PowerOffice Go"</li>
                              <li>Banken registrerer deg i SNN RH systemet</li>
                              <li>Du mottar Application Key fra SNN RH</li>
                              <li>Banken kan også bistå med oppsett</li>
                            </ol>
                          )}

                          {integrationPartner === 'direct' && (
                            <div className="text-xs text-blue-800">
                              <p className="mb-2">For egen integrasjon må du:</p>
                              <ol className="list-decimal list-inside space-y-1 ml-2">
                                <li>Registrere din applikasjon hos PowerOffice</li>
                                <li>Se dokumentasjon på developer.poweroffice.net</li>
                                <li>Du får Application Key ved registrering</li>
                              </ol>
                            </div>
                          )}
                        </div>

                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3">
                          <p className="text-yellow-800 text-xs">
                            <strong>⏰ Tidsbruk:</strong> Bestilling og mottak av Application Key tar vanligvis 1-3 virkedager. 
                            Planlegg oppsettet i god tid før du trenger integrasjonen i drift.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">4</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2">Godkjenn integrasjonen</h3>
                    <div className="bg-gray-50 p-4 rounded-lg text-sm space-y-2">
                      <p className="text-gray-700">
                        I Extensions-listen, finn <strong>"{partnerConfig.name}"</strong> og klikk <strong>"Authorize"</strong>
                      </p>
                      <div className="bg-green-50 border border-green-200 p-3 rounded space-y-2">
                        <p className="text-green-800 text-xs font-semibold">✅ Client Key genereres automatisk!</p>
                        <p className="text-green-700 text-xs">
                          Du vil IKKE se Client Key i PowerOffice av sikkerhetshensyn. 
                          Den sendes automatisk til {partnerConfig.name}.
                        </p>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 p-2 rounded">
                        <p className="text-blue-800 text-xs">
                          <strong>Status:</strong> Etter godkjenning skal integrasjonen vise status <strong>"Active"</strong> eller <strong>"Connected"</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">5</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2">Få Client Key fra {partnerConfig.name}</h3>
                    <div className="bg-gray-50 p-4 rounded-lg text-sm space-y-2">
                      <p className="text-gray-700 mb-2">
                        Client Key vises ikke i PowerOffice. Du må hente den fra integrasjonspartnerens system:
                      </p>
                      
                      <div className="space-y-2">
                        {integrationPartner === 'iizy' && (
                          <div className="bg-white border p-3 rounded">
                            <p className="font-semibold text-gray-900 text-xs mb-2">Via iizy dashboard:</p>
                            <ol className="list-decimal list-inside text-xs text-gray-700 space-y-1 ml-2">
                              <li>Logg inn på iizy.no</li>
                              <li>Gå til "Mine Integrasjoner" eller "PowerOffice"</li>
                              <li>Client Key vises under "API Nøkler" (kan være maskert med ••••)</li>
                              <li>Klikk "Vis" eller "Copy" for å kopiere nøkkelen</li>
                            </ol>
                          </div>
                        )}

                        {integrationPartner === 'emonkey' && (
                          <div className="bg-white border p-3 rounded">
                            <p className="font-semibold text-gray-900 text-xs mb-2">Via eMonkey:</p>
                            <ol className="list-decimal list-inside text-xs text-gray-700 space-y-1 ml-2">
                              <li>Logg inn på eMonkey sin kundeportal</li>
                              <li>Gå til "PowerOffice Integrasjoner"</li>
                              <li>Client Key finnes under "API Tilgang"</li>
                              <li>Alternativt: Kontakt eMonkey support direkte</li>
                            </ol>
                          </div>
                        )}

                        {integrationPartner === 'srh' && (
                          <div className="bg-white border p-3 rounded">
                            <p className="font-semibold text-gray-900 text-xs mb-2">Via SNN RH eller banken:</p>
                            <ol className="list-decimal list-inside text-xs text-gray-700 space-y-1 ml-2">
                              <li>Kontakt din bankrådgiver i SpareBank 1</li>
                              <li>Be om Client Key for PowerOffice-integrasjonen</li>
                              <li>Banken henter nøkkelen fra SNN RH systemet</li>
                              <li>Du mottar Client Key på sikker måte</li>
                            </ol>
                          </div>
                        )}

                        <div className="bg-blue-50 p-3 rounded">
                          <p className="text-blue-800 text-xs">
                            <strong>💡 For Averdi-kunder:</strong> Send oss beskjed når du har godkjent integrasjonen i PowerOffice Go. 
                            Vi kontakter {partnerConfig.name} og henter Client Key for deg.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verification Section */}
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <h4 className="font-bold text-green-900 mb-2 flex items-center gap-2">
                  <Key className="w-5 h-5" />
                  Sjekk at alt er korrekt
                </h4>
                <div className="space-y-2 text-sm text-green-800">
                  <p className="font-semibold">I PowerOffice Go → Settings → Extensions:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1 text-xs">
                    <li>Integrasjonen "{partnerConfig.name}" skal vise status <strong className="text-green-900">"Active"</strong></li>
                    <li>Hvis status er "Needs Authorization" → Gå tilbake til steg 4</li>
                    <li>Hvis integrasjonen ikke vises → Kontakt {partnerConfig.name}</li>
                  </ul>
                </div>
              </div>
            </>
          ) : (
            /* 24SevenOffice Guide */
            <>
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Om 24SevenOffice API</h4>
                <p className="text-sm text-blue-800">
                  24SevenOffice bruker API Keys (brukernavn og passord) som du genererer selv i systemet.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2">Logg inn på 24SevenOffice</h3>
                    <div className="bg-gray-50 p-4 rounded-lg text-sm">
                      <a href="https://24sevenoffice.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                        24sevenoffice.com
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <p className="text-xs text-gray-600 mt-1">Krever administrator-rettigheter</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2">Gå til API-integrasjoner</h3>
                    <div className="bg-gray-50 p-4 rounded-lg text-sm">
                      <div className="bg-white border-2 border-purple-300 p-3 rounded font-mono text-xs space-y-1">
                        <div>Innstillinger (Settings/Verktøy)</div>
                        <div>→ Integrasjoner eller API</div>
                        <div>→ API-tilgang eller Generer API-nøkler</div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2 italic">
                        Menystrukturen kan variere avhengig av din 24SevenOffice-versjon
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2">Generer API-nøkler</h3>
                    <div className="bg-gray-50 p-4 rounded-lg text-sm space-y-2">
                      <p className="text-gray-700">Klikk "Generer ny nøkkel" eller "Create API Key"</p>
                      <div className="bg-white border p-3 rounded space-y-2">
                        <p className="text-gray-700 text-xs">Gi nøkkelen et beskrivende navn:</p>
                        <div className="bg-gray-100 p-2 rounded font-mono text-xs">
                          "Vipps Integration" eller "Vipps - {partnerConfig.name}"
                        </div>
                      </div>
                      <div className="bg-red-50 border-l-4 border-red-500 p-3">
                        <p className="text-red-900 font-semibold text-xs mb-1">🔒 Viktig!</p>
                        <p className="text-red-800 text-xs">
                          <strong>API Secret vises kun én gang!</strong> Kopier og lagre den i en passordmanager umiddelbart. 
                          Hvis du mister den, må du generere en helt ny nøkkel.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">4</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2">Kopier nøklene</h3>
                    <div className="bg-gray-50 p-4 rounded-lg text-sm space-y-3">
                      <div>
                        <p className="text-gray-600 text-xs mb-1 font-semibold">API Key / Username:</p>
                        <div className="bg-white border p-2 rounded font-mono text-xs text-gray-600">
                          a1b2c3d4-e5f6-7890-abcd-ef1234567890
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-600 text-xs mb-1 font-semibold">API Secret / Password:</p>
                        <div className="bg-white border p-2 rounded font-mono text-xs text-gray-600">
                          X7mK9pL2nQ4rT8vB6cW1sD5eF3gH0jN
                        </div>
                      </div>
                      <div className="bg-yellow-50 border border-yellow-300 p-3 rounded">
                        <p className="text-yellow-800 text-xs">
                          <strong>💡 Tips:</strong> Bruk "Copy"-knappen ved siden av hver nøkkel. 
                          Sjekk at det ikke er ekstra mellomrom før eller etter når du limer inn.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Help Section */}
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <h4 className="font-bold text-green-900 mb-3">Trenger du hjelp?</h4>
            <div className="grid gap-2 text-sm">
              <a 
                href={isPowerOffice ? 'https://developer.poweroffice.net' : 'https://24sevenoffice.com/support'} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-green-700 hover:underline flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                {isPowerOffice ? 'PowerOffice API dokumentasjon' : '24SevenOffice support'}
              </a>
              {partnerConfig.url && (
                <a 
                  href={partnerConfig.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-green-700 hover:underline flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  {partnerConfig.name} support
                </a>
              )}
              <a 
                href="mailto:support@averdi.no" 
                className="text-green-700 hover:underline flex items-center gap-2"
              >
                <Key className="w-4 h-4" />
                Averdi support: support@averdi.no
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}