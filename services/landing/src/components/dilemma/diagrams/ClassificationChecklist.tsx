
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { Check, AlertTriangle } from 'lucide-react';

export const ClassificationChecklist: React.FC = () => {
  // Factors that indicate employment
  const factors = [
    { id: 'schedule', label: 'Fixed Work Schedule', type: 'employee' },
    { id: 'tools', label: 'Company Provides Platform/Tools', type: 'employee' },
    { id: 'training', label: 'Mandatory Training', type: 'employee' },
    { id: 'rates', label: 'Company Sets Pay Rate', type: 'employee' },
    { id: 'exclusivity', label: 'Restrictions on Other Work', type: 'employee' },
    { id: 'risk', label: 'Worker Bears Financial Risk', type: 'contractor' },
  ];

  const [selectedFactors, setSelectedFactors] = useState<string[]>(['schedule', 'rates']);

  const toggleFactor = (id: string) => {
    setSelectedFactors(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const employeeScore = factors.filter(f => selectedFactors.includes(f.id) && f.type === 'employee').length;
  
  const status = employeeScore > 2 ? 'LIKELY EMPLOYEE' : 'LIKELY CONTRACTOR';
  const color = employeeScore > 2 ? 'text-red-600' : 'text-green-600';
  const riskLevel = employeeScore > 2 ? 'HIGH MISCLASSIFICATION RISK' : 'LOW RISK';

  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-sm border border-stone-200 my-8">
      <h3 className="font-serif text-xl mb-2 text-stone-800">Interactive: Worker Status Test</h3>
      <p className="text-sm text-stone-500 mb-6 text-center max-w-md">
        Select the conditions that apply to the remote worker. See how IRS and Mexican Labor Law would likely classify them.
      </p>
      
      <div className="w-full max-w-md space-y-3 mb-8">
        {factors.map(factor => (
            <button
                key={factor.id}
                onClick={() => toggleFactor(factor.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${selectedFactors.includes(factor.id) ? 'bg-stone-50 border-stone-800' : 'bg-white border-stone-200 hover:border-stone-400'}`}
            >
                <span className="text-sm font-medium text-stone-700">{factor.label}</span>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedFactors.includes(factor.id) ? 'bg-stone-800 border-stone-800' : 'border-stone-300'}`}>
                    {selectedFactors.includes(factor.id) && <Check size={12} className="text-white" />}
                </div>
            </button>
        ))}
      </div>

      <div className="w-full bg-[#F5F4F0] p-6 rounded-lg border border-stone-200 text-center">
          <div className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">Determination</div>
          <div className={`text-2xl font-serif font-bold mb-1 ${color}`}>{status}</div>
          <div className="text-xs font-medium text-stone-500 flex items-center justify-center gap-1">
             {status === 'LIKELY EMPLOYEE' && <AlertTriangle size={12} />}
             {riskLevel}
          </div>
          <div className="mt-4 text-xs text-stone-400 leading-relaxed italic">
            {status === 'LIKELY EMPLOYEE' 
                ? "Under Article 20 of Ley Federal del Trabajo & IRS guidelines, control over schedule and means typically establishes an employment relationship, entitling the worker to benefits."
                : "True independent contractors maintain autonomy over how, when, and for whom they work."}
          </div>
      </div>
    </div>
  );
};
