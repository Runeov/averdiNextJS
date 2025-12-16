// Types for VippsSetupWizard

export interface WizardConfig {
  accountingSystem: string;
  modules: string[];
  companyName: string;
  orgNumber: string;
  organizationType: string;
  vippsClientId: string;
  vippsClientSecret: string;
  vippsMerchantSerialNumber: string;
  vippsSubscriptionKey: string;
  accountingApiKey: string;
  accountingApiSecret: string;
  integrationPartner: string;
  accounts: AccountsConfig;
  mvaSettings: MvaSettings;
  features: FeaturesConfig;
}

export interface AccountsConfig {
  vippsInterim: string;
  bankAccount: string;
  salesIncome: string;
  salesIncomeMVA: string;
  fees: string;
  roundingDiff: string;
}

export interface MvaSettings {
  enabled: boolean;
  threshold: number;
  defaultCode: string;
}

export interface FeaturesConfig {
  autoBooking: boolean;
  eFaktura: boolean;
  ocrEnabled: boolean;
  loginWithVipps: boolean;
}

export interface Module {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  apis: string[];
  vippsProduct?: string;
  required?: boolean;
}

export interface IntegrationPartner {
  id: string;
  name: string;
  description: string;
  features: string[];
  pricing: string;
  url: string;
}

export interface StepProps {
  config: WizardConfig;
  updateConfig: (key: string, value: any) => void;
  updateNested: (parent: string, key: string, value: any) => void;
}

export interface ModulesStepProps extends StepProps {
  modules: Module[];
  toggleModule: (moduleId: string) => void;
}

export interface IntegrationPartnerStepProps extends StepProps {
  integrationPartners: IntegrationPartner[];
}

export interface CompleteStepProps extends StepProps {
  modules: Module[];
  integrationPartners: IntegrationPartner[];
  generateConfigFile: () => void;
  generateImplementationGuide: () => void;
  sendToAverdi: () => void;
}
