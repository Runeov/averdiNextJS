'use client';

import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';

// Types and Constants
import { WizardConfig } from './types';
import { modules, integrationPartners, initialConfig } from './constants';

// Step Components
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

  // File generation
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
      component: <AccountingSystemStep config={config} updateConfig={updateConfig} updateNested={updateNested} /> 
    },
    { 
      title: 'Select Modules', 
      component: <ModulesStep config={config} updateConfig={updateConfig} updateNested={updateNested} modules={modules} toggleModule={toggleModule} /> 
    },
    { 
      title: 'Organization Info', 
      component: <OrganizationInfoStep config={config} updateConfig={updateConfig} updateNested={updateNested} /> 
    },
    { 
      title: 'Integration Partner', 
      component: <IntegrationPartnerStep config={config} updateConfig={updateConfig} updateNested={updateNested} integrationPartners={integrationPartners} /> 
    },
    { 
      title: 'Vipps Credentials', 
      component: <VippsCredentialsStep config={config} updateConfig={updateConfig} updateNested={updateNested} /> 
    },
    { 
      title: 'Accounting API', 
      component: <AccountingApiStep config={config} updateConfig={updateConfig} updateNested={updateNested} /> 
    },
    { 
      title: 'Account Mapping', 
      component: <AccountMappingStep config={config} updateConfig={updateConfig} updateNested={updateNested} /> 
    },
    { 
      title: 'Complete', 
      component: (
        <CompleteStep 
          config={config} 
          updateConfig={updateConfig} 
          updateNested={updateNested}
          modules={modules}
          integrationPartners={integrationPartners}
          generateConfigFile={generateConfigFile}
          generateImplementationGuide={generateImplementationGuide}
          sendToAverdi={sendToAverdi}
        />
      )
    }
  ];

  return (
    <div className="p-8">
      <ProgressBar steps={steps} currentStep={step} />
      
      <div className="mb-6">
        {steps[step].component}
      </div>

      <Navigation 
        step={step}
        totalSteps={steps.length}
        canProceed={canProceed()}
        onPrev={() => setStep(step - 1)}
        onNext={() => setStep(step + 1)}
        onRestart={() => window.location.reload()}
      />
    </div>
  );
}

// Progress Bar Component
interface ProgressBarProps {
  steps: { title: string }[];
  currentStep: number;
}

function ProgressBar({ steps, currentStep }: ProgressBarProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        {steps.map((s, idx) => (
          <div key={idx} className="flex items-center flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm ${
              idx < currentStep ? 'bg-green-500 text-white' :
              idx === currentStep ? 'bg-orange-500 text-white' :
              'bg-gray-300 text-gray-600'
            }`}>
              {idx < currentStep ? <Check className="w-5 h-5" /> : idx + 1}
            </div>
            {idx < steps.length - 1 && (
              <div className={`flex-1 h-1 mx-2 ${idx < currentStep ? 'bg-green-500' : 'bg-gray-300'}`} />
            )}
          </div>
        ))}
      </div>
      <div className="text-sm text-gray-600 text-center">
        Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
      </div>
    </div>
  );
}

// Navigation Component
interface NavigationProps {
  step: number;
  totalSteps: number;
  canProceed: boolean;
  onPrev: () => void;
  onNext: () => void;
  onRestart: () => void;
}

function Navigation({ step, totalSteps, canProceed, onPrev, onNext, onRestart }: NavigationProps) {
  return (
    <div className="flex justify-between items-center pt-6 border-t border-gray-200">
      <button
        onClick={onPrev}
        disabled={step === 0}
        className="px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-5 h-5" />
        Back
      </button>

      {step < totalSteps - 1 ? (
        <button
          onClick={onNext}
          disabled={!canProceed}
          className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
          <ChevronRight className="w-5 h-5" />
        </button>
      ) : (
        <button
          onClick={onRestart}
          className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium"
        >
          Start New Setup
        </button>
      )}
    </div>
  );
}

// Implementation guide generator (moved to keep main component clean)
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
□ Step 2: Vipps Portal Setup
□ Step 3: Accounting System Setup
□ Step 4: Integration Partner Setup (${partner?.name})
□ Step 5: Testing Phase
□ Step 6: Go-Live Preparation
□ Step 7: Post-Implementation

CONTACT INFORMATION
-------------------
Vipps Support: https://vippsmobilepay.com/support
${config.accountingSystem === 'poweroffice' ? 'PowerOffice Support: https://www.poweroffice.no/support' : '24SevenOffice Support: https://24sevenoffice.com/support'}
${partner ? `${partner.name}: ${partner.url || '[Contact via accounting software]'}` : ''}
Averdi Accounting: support@averdi.no
Phone: +47 907 67 993

==============================================================================
END OF IMPLEMENTATION GUIDE

Generated by Vipps Integration Setup Wizard v2.0
For: ${config.companyName} (${config.orgNumber})
Date: ${new Date().toISOString()}
==============================================================================
`;
}
