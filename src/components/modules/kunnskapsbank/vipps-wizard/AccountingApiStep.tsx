import React from 'react';
import { WizardConfig } from '../types';

interface Props {
  config: WizardConfig;
  updateConfig: (key: string, value: any) => void;
}

export function AccountingApiStep({ config, updateConfig }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {config.accountingSystem === 'poweroffice' ? 'PowerOffice Go' : '24SevenOffice'} API Access
        </h2>
        <p className="text-gray-600">Configure API authentication</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {config.accountingSystem === 'poweroffice' ? 'Application Key' : 'API Key'} *
          </label>
          <input
            type="text"
            value={config.accountingApiKey}
            onChange={(e) => updateConfig('accountingApiKey', e.target.value)}
            placeholder="From integration partner"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent font-mono text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {config.accountingSystem === 'poweroffice' ? 'Client Key' : 'API Secret'} * 🔒
          </label>
          <input
            type="password"
            value={config.accountingApiSecret}
            onChange={(e) => updateConfig('accountingApiSecret', e.target.value)}
            placeholder="Generated in PowerOffice Go"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent font-mono text-sm"
          />
        </div>
      </div>
    </div>
  );
}
