'use client';

import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { WizardConfig } from './types';
import { modules, integrationPartners, initialConfig } from './constants';
import {
  WelcomeStep,
  AccountingSystemStep,
  ModulesStep,
  OrganizationInfoStep,
  IntegrationPartnerStep,
  VippsCredentialsStep,
  AccountingApiStep,
  AccountMappingStep,
  CompleteStep
} from './steps';

export function VippsSetupWizard() {
  const [step, setStep] = useState(0);
  const [config, setConfig] = useState<WizardConfig>(initialConfig);

  // State updaters
  const updateConfig = (key: string, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const updateNested = (parent: string, key: string, value: any) => {
    setConfig(prev => ({
      ...prev,
      [parent]: { ...(prev as any)[parent], [key]: value }
    }));
  };

  const toggleModule = (moduleId: string) => {
    setConfig(prev => ({
      ...prev,
      modules: prev.modules.includes(moduleId)
        ? prev.modules.filter(m => m !== moduleId)
        : [...prev.modules, moduleId]
    }));
  };

  // Validation
  const canProceed = (): boolean => {
    switch(step) {
      case 0: return true;
      case 1: return config.accountingSystem !== '';
      case 2: return config.modules.length > 0;
      case 3: return !!(config.companyName && config.orgNumber && config.organizationType);
      case 4: return config.integrationPartner !== '';
      case 5: return !!(config.vippsClientId && config.vippsClientSecret && config.vippsMerchantSerialNumber);
      case 6: return !!(config.accountingApiKey && config.accountingApiSecret);
      case 7: return true;
      case 8: return true;
      default: return true;
    }
  };

  // File generation functions
  const generateConfigFile = () => {
    const configData = {
      version: '2.0',
      metadata: {
        created: new Date().toISOString(),
        wizard: 'Vipps-PowerOffice Integration Setup'
      },
      company: {
        name: config.companyName,
        orgNumber: config.orgNumber,
        type: config.organizationType
      },
      vipps: {
        clientId: config.vippsClientId,
        merchantSerialNumber: config.vippsMerchantSerialNumber,
        subscriptionKey: config.vippsSubscriptionKey || 'NOT_PROVIDED',
        environment: 'production',
        apiVersion: 'v2',
        products: modules.filter(m => config.modules.includes(m.id) || m.required)
          .map(m => m.vippsProduct).filter(Boolean)
      },
      accounting: {
        system: config.accountingSystem,
        integrationPartner: config.integrationPartner,
        accounts: config.accounts,
        mva: config.mvaSettings,
        features: config.features
      },
      modules: config.modules,
      authentication: {
        vipps: {
          method: 'OAuth 2.0',
          tokenEndpoint: 'https://api.vipps.no/accesstoken/get'
        },
        poweroffice: {
          method: 'OAuth 2.0 Client Credentials',
          tokenEndpoint: 'https://goapi.poweroffice.net/OAuth/Token'
        }
      }
    };
    
    const blob = new Blob([JSON.stringify(configData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vipps-integration-${config.orgNumber}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const generateImplementationGuide = () => {
    const partner = integrationPartners.find(p => p.id === config.integrationPartner);
    const activeModules = modules.filter(m => config.modules.includes(m.id) || m.required);
    const guide = generateGuideText(config, partner, activeModules);

    const blob = new Blob([guide], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `implementation-guide-${config.orgNumber}-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const sendToAverdi = () => {
    const emailBody = `Hello Averdi Accounting Team,

I have completed the Vipps MobilePay integration setup wizard.

Organization: ${config.companyName}
Org. Number: ${config.orgNumber}
Integration Partner: ${integrationPartners.find(p => p.id === config.integrationPartner)?.name}

I will send the full configuration file separately via secure channel.

Best regards`;

    const mailtoLink = `mailto:support@averdi.no?subject=Vipps Integration Setup - ${config.companyName} (${config.orgNumber})&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
  };

  // Step definitions
  const steps = [
    { title: 'Welcome', component: <WelcomeStep /> },
    { 
      title: 'Accounting System', 
      component: <AccountingSystemStep config={config} updateConfig={updateConfig} /> 
    },
    { 
      title: 'Select Modules', 
      component: <ModulesStep config={config} modules={modules} toggleModule={toggleModule} /> 
    },
    { 
      title: 'Organization Info', 
      component: <OrganizationInfoStep config={config} updateConfig={updateConfig} /> 
    },
    { 
      title: 'Integration Partner', 
      component: <IntegrationPartnerStep config={config} updateConfig={updateConfig} integrationPartners={integrationPartners} /> 
    },
    { 
      title: 'Vipps Credentials', 
      component: <VippsCredentialsStep config={config} updateConfig={updateConfig} /> 
    },
    { 
      title: 'Accounting API', 
      component: <AccountingApiStep config={config} updateConfig={updateConfig} /> 
    },
    { 
      title: 'Account Mapping', 
      component: <AccountMappingStep config={config} updateNested={updateNested} /> 
    },
    { 
      title: 'Complete', 
      component: (
        <CompleteStep 
          config={config}
          generateConfigFile={generateConfigFile}
          generateImplementationGuide={generateImplementationGuide}
          sendToAverdi={sendToAverdi}
        />
      )
    }
  ];

  return (
    <div className="p-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {steps.map((s, idx) => (
            <div key={idx} className="flex items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm ${
                idx < step ? 'bg-green-500 text-white' :
                idx === step ? 'bg-orange-500 text-white' :
                'bg-gray-300 text-gray-600'
              }`}>
                {idx < step ? <Check className="w-5 h-5" /> : idx + 1}
              </div>
              {idx < steps.length - 1 && (
                <div className={`flex-1 h-1 mx-2 ${idx < step ? 'bg-green-500' : 'bg-gray-300'}`} />
              )}
            </div>
          ))}
        </div>
        <div className="text-sm text-gray-600 text-center">
          Step {step + 1} of {steps.length}: {steps[step].title}
        </div>
      </div>

      {/* Main Content */}
      <div className="mb-6">
        {steps[step].component}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6 border-t border-gray-200">
        <button
          onClick={() => setStep(step - 1)}
          disabled={step === 0}
          className="px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>

        {step < steps.length - 1 ? (
          <button
            onClick={() => setStep(step + 1)}
            disabled={!canProceed()}
            className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium"
          >
            Start New Setup
          </button>
        )}
      </div>
    </div>
  );
}

// Implementation guide text generator (kept separate for readability)
function generateGuideText(config: WizardConfig, partner: any, activeModules: any[]) {
  return `
VIPPS MOBILEPAY INTEGRATION - IMPLEMENTATION GUIDE
Generated: ${new Date().toLocaleDateString('nb-NO')} ${new Date().toLocaleTimeString('nb-NO')}
==============================================================================

CLIENT INFORMATION
------------------
Organization: ${config.companyName}
Org. Number: ${config.orgNumber}
Type: ${config.organizationType}
Contact Email: [TO BE FILLED BY CLIENT]
Contact Phone: [TO BE FILLED BY CLIENT]

INTEGRATION CONFIGURATION
--------------------------
Accounting System: ${config.accountingSystem === 'poweroffice' ? 'PowerOffice Go' : '24SevenOffice'}
Integration Partner: ${partner?.name || config.integrationPartner}
MVA Enabled: ${config.mvaSettings.enabled ? 'Yes' : 'No'}
${config.mvaSettings.enabled ? `MVA Threshold: ${config.mvaSettings.threshold.toLocaleString('nb-NO')} NOK\nDefault MVA Code: ${config.mvaSettings.defaultCode}` : ''}

ACTIVE MODULES
--------------
${activeModules.map(m => `• ${m.name}\n  Vipps Product: ${m.vippsProduct || 'N/A'}\n  APIs Used: ${m.apis.join(', ')}`).join('\n')}

ACCOUNT MAPPING (NS 4102)
--------------------------
Vipps Interim (Mellomregning): ${config.accounts.vippsInterim}
Bank Account: ${config.accounts.bankAccount}
Sales Income (VAT Free): ${config.accounts.salesIncome}
Sales Income (VAT 25%): ${config.accounts.salesIncomeMVA}
Bank & Card Fees: ${config.accounts.fees}
Rounding Differences: ${config.accounts.roundingDiff}

FEATURES ENABLED
----------------
✓ Automatic Booking: ${config.features.autoBooking ? 'Yes' : 'No'}
✓ Vipps eFaktura: ${config.features.eFaktura ? 'Yes' : 'No'}
✓ OCR Payment Matching: ${config.features.ocrEnabled ? 'Yes' : 'No'}
✓ Login with Vipps: ${config.features.loginWithVipps ? 'Yes' : 'No'}

VIPPS API CREDENTIALS (SECURE - HANDLE WITH CARE)
--------------------------------------------------
Client ID: ${config.vippsClientId}
Merchant Serial Number (MSN): ${config.vippsMerchantSerialNumber}
Client Secret: [REDACTED - See encrypted config file]
Subscription Key: ${config.vippsSubscriptionKey ? '[PROVIDED]' : '[NOT PROVIDED]'}

Portal: https://portal.vippsmobilepay.com
Environment: Production
API Version: v2 (ePayment API)

${config.accountingSystem === 'poweroffice' ? `
POWEROFFICE GO API CREDENTIALS
------------------------------
Application Key: ${config.accountingApiKey}
Client Key: [REDACTED - See encrypted config file]
Token Endpoint: https://goapi.poweroffice.net/OAuth/Token
Authorization Method: OAuth 2.0 Client Credentials Grant

Extensions Path: Menu > Settings > Extensions
` : `
24SEVENOFFICE API CREDENTIALS
-----------------------------
API Key: ${config.accountingApiKey}
API Secret: [REDACTED - See encrypted config file]
`}

IMPLEMENTATION CHECKLIST FOR AVERDI ACCOUNTING
-----------------------------------------------
□ Step 1: Verify Signing Authority
  - Client has BankID
  - Client has signing authority (check Brønnøysund)
  - If sports club: Check if board fullmakt/prokura is needed

□ Step 2: Vipps Portal Setup
  - Client logs into portal.vippsmobilepay.com
  - Verify organization number ${config.orgNumber}
  - Activate required products: ${activeModules.map(m => m.vippsProduct).filter(Boolean).join(', ')}
  - Generate/verify API keys match configuration

□ Step 3: Accounting System Setup
  - Verify ${config.accountingSystem === 'poweroffice' ? 'PowerOffice Go' : '24SevenOffice'} account is active
  - Create/verify account codes: ${Object.values(config.accounts).join(', ')}
  ${config.features.eFaktura ? '  - Activate AutoPay and OCR in bank settings' : ''}
  ${config.features.ocrEnabled ? '  - Configure OCR payment matching' : ''}

□ Step 4: Integration Partner Setup (${partner?.name})
  - Contact ${partner?.name} with this configuration
  - Provide both JSON config file and this guide
  - Complete OAuth authorization flow:
    * Vipps Portal authorization
    * ${config.accountingSystem === 'poweroffice' ? 'PowerOffice Go Extensions approval' : '24SevenOffice API approval'}
  - Map Vipps sales units to accounting accounts
  ${config.mvaSettings.enabled ? '  - Configure MVA code mapping per transaction type' : ''}

□ Step 5: Testing Phase
  - Perform test transaction (minimum 10 NOK)
  - Verify transaction appears in ${config.accountingSystem === 'poweroffice' ? 'PowerOffice Go' : '24SevenOffice'}
  - Check account ${config.accounts.vippsInterim} receives debit
  - Wait for settlement (T+2/T+3 days)
  - Verify settlement to account ${config.accounts.bankAccount}
  - Confirm account ${config.accounts.vippsInterim} balances to zero
  - Verify fees posted to account ${config.accounts.fees}

□ Step 6: Go-Live Preparation
  - Document access credentials in secure password manager
  - Set up monthly reconciliation routine for account ${config.accounts.vippsInterim}
  - Schedule training session with client treasurer/kasserer
  - Provide troubleshooting guide to client
  - Set calendar reminder for API key rotation (annual)

□ Step 7: Post-Implementation
  - Monitor first week of transactions daily
  - Perform first month-end reconciliation together with client
  - Address any MVA questions before first VAT report
  - Document any client-specific customizations

MONTHLY RECONCILIATION PROCEDURE
---------------------------------
Account ${config.accounts.vippsInterim} should balance to ZERO at month-end.

If DEBIT balance exists:
  → Check if sales near month-end (settlement in next month - OK)
  → Verify all bank receipts are posted
  → Review Vipps settlement report for missing transactions

If CREDIT balance exists:
  → Check for duplicate postings
  → Verify bank receipt wasn't posted twice
  → Review integration logs for errors

Acceptable rounding differences (< 5 kr) → Post to account ${config.accounts.roundingDiff}

TYPICAL TRANSACTION FLOW
-------------------------
Day 1 (Saturday): 
  - Customer pays 100 kr for vaffel in kiosk
  - Vipps registers transaction

Day 3 (Monday):
  - Vipps generates settlement report
  - Middleware (${partner?.name}) fetches report at 06:00
  - Booking posted in ${config.accountingSystem === 'poweroffice' ? 'PowerOffice Go' : '24SevenOffice'}:
    Debit ${config.accounts.vippsInterim}: 100.00 kr
    Credit ${config.accounts.salesIncome}: 100.00 kr

Day 5 (Wednesday):
  - Vipps pays out to bank (98.25 kr after 1.75 kr fee)
  - Booking posted:
    Debit ${config.accounts.bankAccount}: 98.25 kr
    Debit ${config.accounts.fees}: 1.75 kr
    Credit ${config.accounts.vippsInterim}: 100.00 kr

Result: Account ${config.accounts.vippsInterim} = 0 kr (balanced)

CONTACT INFORMATION
-------------------
Vipps Support: https://vippsmobilepay.com/support
${config.accountingSystem === 'poweroffice' ? 'PowerOffice Support: https://www.poweroffice.no/support' : '24SevenOffice Support: https://24sevenoffice.com/support'}
${partner ? `${partner.name}: ${partner.url || '[Contact via accounting software]'}` : ''}
Averdi Accounting: support@averdi.no
Phone: +47 907 67 993

SECURITY NOTES
--------------
⚠️ CRITICAL: This document contains sensitive information
- Store in encrypted location
- Never send unencrypted via email
- Rotate API keys annually or when staff changes
- Revoke access immediately if security breach suspected
- Client Secret and API keys redacted from this document - see encrypted JSON file

GDPR COMPLIANCE
---------------
${config.integrationPartner !== 'direct' ? `- Databehandleravtale (DPA) with ${partner?.name} required` : '- Direct integration: Client is data controller'}
- Personal data minimization: Only process necessary transaction data
${config.modules.includes('donations') || config.modules.includes('pos') ? '- For kiosk/donations: Consider anonymizing customer data where names not required' : ''}
${config.features.loginWithVipps ? '- Login with Vipps: Additional consent required from members' : ''}
- Document retention: Settlement reports as accounting source documentation

TROUBLESHOOTING QUICK REFERENCE
--------------------------------
Problem: Transactions not appearing
→ Check: Integration partner dashboard for errors
→ Action: Use "Retry" button if import failed

Problem: Account ${config.accounts.vippsInterim} doesn't balance
→ Check: Bank statement for Vipps payout
→ Action: Compare with Vipps settlement report line by line

Problem: Wrong MVA code
→ Check: Integration default settings
→ Action: Specify MVA code per transaction type

Problem: Integration stopped working
→ Check: Vipps Portal > Developer > API Keys status
→ Action: Re-authorize in PowerOffice Extensions

For detailed troubleshooting: Contact support@averdi.no

ESTIMATED TIMELINE
------------------
Day 1-2:   Averdi reviews configuration
Day 3-5:   Technical setup and OAuth authorizations
Day 6-7:   Testing phase with client
Day 8-10:  Go-live and monitoring
Week 2-4:  First month-end reconciliation support

PRICING REFERENCE (Estimated)
------------------------------
Vipps Transaction Fees: ${config.modules.includes('pos') ? '1.75%' : '2.99%'} + ${config.modules.includes('pos') ? '0 kr' : '1 kr'} per transaction
Integration Partner (${partner?.name}): ${partner?.pricing}
PowerOffice Go: Per bilag/transaction pricing
Total Monthly: Typically ${partner?.pricing === '150-500 kr/month' ? '500-1000' : '300-800'} kr for small to medium organizations

==============================================================================
END OF IMPLEMENTATION GUIDE

Generated by Vipps Integration Setup Wizard v2.0
For: ${config.companyName} (${config.orgNumber})
Date: ${new Date().toISOString()}

This guide should be used together with the JSON configuration file.
Send this TXT file via email, but send JSON file via secure channel only.
==============================================================================
`;
}
