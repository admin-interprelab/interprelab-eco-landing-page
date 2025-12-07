
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, X, DollarSign, Briefcase, User, Building, TrendingUp, AlertTriangle, Car, Headphones, Shield, ShieldAlert, Scale, FileText, Monitor, FileX, UserX, Wallet, CalendarX, Landmark, Gavel, FileWarning } from 'lucide-react';

// --- CLASSIFICATION CHECKLIST (Employee vs Contractor) ---
export const ClassificationDiagram: React.FC = () => {
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

// --- WAGE GAP VISUALIZER ---
export const WageGapDiagram: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setStep(s => (s + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-xl border border-stone-200 my-8 shadow-sm">
      <h3 className="font-serif text-xl mb-4 text-stone-900">The Arbitrage Flow</h3>
      <p className="text-sm text-stone-600 mb-8 text-center max-w-md">
        Tracing the flow of money from a U.S. Hospital to a Remote Mexican Interpreter.
      </p>

      <div className="relative w-full max-w-lg h-64 bg-[#F9F8F4] rounded-lg shadow-inner overflow-hidden mb-6 border border-stone-200 flex items-center justify-around p-4">
        
        {/* Client Stage */}
        <div className="flex flex-col items-center gap-2 z-10">
            <div className={`w-20 h-20 rounded-lg border-2 flex flex-col items-center justify-center transition-colors duration-500 ${step === 0 ? 'border-blue-800 bg-blue-50' : 'border-stone-200 bg-white'}`}>
                <Building size={28} className={step === 0 ? 'text-blue-800' : 'text-stone-300'} />
                <div className="font-bold text-[10px] mt-1 text-stone-600 tracking-wider">CLIENT</div>
            </div>
            <div className="text-xs font-bold text-blue-800">$4.00/min</div>
        </div>

        {/* Animated Money moving to LSP */}
        {step === 0 && (
            <motion.div 
                className="absolute left-20 top-1/2 -mt-4 text-green-600 font-bold text-xl z-20"
                initial={{ x: 0, opacity: 0 }}
                animate={{ x: 60, opacity: 1 }}
                transition={{ duration: 1.5 }}
            >
                $$$
            </motion.div>
        )}

        {/* LSP Stage */}
        <div className="flex flex-col items-center gap-2 z-10">
             <div className={`w-24 h-24 rounded-xl border-2 flex flex-col items-center justify-center gap-1 transition-colors duration-500 relative ${step === 1 || step === 2 ? 'border-stone-800 bg-stone-900 text-white' : 'border-stone-200 bg-white'}`}>
                <Briefcase size={24} className={step === 1 || step === 2 ? 'text-nobel-gold' : 'text-stone-300'} />
                <div className="text-[10px] font-bold tracking-widest uppercase">Platform</div>
                {(step === 1 || step === 2) && (
                    <div className="absolute -top-3 -right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md animate-bounce">
                        94% Retained
                    </div>
                )}
             </div>
        </div>

        {/* Animated Money moving to Worker (Shrunk) */}
        {step >= 2 && (
            <motion.div 
                className="absolute right-32 top-1/2 -mt-4 text-green-600 font-bold text-sm z-20"
                initial={{ x: -20, opacity: 0, scale: 1 }}
                animate={{ x: 40, opacity: 1, scale: 0.5 }}
                transition={{ duration: 1.5 }}
            >
                $
            </motion.div>
        )}

        {/* Worker Stage */}
        <div className="flex flex-col items-center gap-2 z-10">
            <div className={`w-20 h-20 rounded-lg border-2 flex flex-col items-center justify-center transition-colors duration-500 ${step === 3 ? 'border-nobel-gold bg-amber-50' : 'border-stone-200 bg-white'}`}>
                <User size={28} className={step === 3 ? 'text-nobel-gold' : 'text-stone-300'} />
                <div className="font-bold text-[10px] mt-1 text-stone-600 tracking-wider">WORKER</div>
            </div>
            <div className="text-xs font-bold text-stone-500">$0.20/min</div>
        </div>

        {/* Connection Line */}
        <div className="absolute top-1/2 left-10 right-10 h-0.5 bg-stone-200 -mt-8 z-0"></div>

      </div>

      <div className="w-full flex justify-between px-10 text-[10px] text-stone-400 font-mono uppercase tracking-widest">
          <span>US Hospital</span>
          <span>Intermediary</span>
          <span>MX Interpreter</span>
      </div>
    </div>
  );
};

// --- INDUSTRY CONTRAST CARD ---
export const IndustryContrast: React.FC = () => {
    return (
        <div className="grid grid-cols-2 gap-0 border border-stone-200 rounded-xl overflow-hidden shadow-sm">
            <div className="bg-[#F5F4F0] p-6 border-r border-stone-200">
                <div className="flex items-center gap-2 mb-4 text-stone-900">
                    <Car className="text-stone-600" size={20} />
                    <h4 className="font-serif font-bold text-lg">Automotive</h4>
                </div>
                <div className="space-y-4">
                    <div className="flex items-start gap-2">
                        <Shield size={16} className="text-green-600 mt-1 shrink-0" />
                        <div>
                            <div className="text-xs font-bold text-stone-500 uppercase tracking-wider">Protections</div>
                            <div className="text-sm font-medium text-stone-800">$16/hr Wage Floor</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-2">
                         <Check size={16} className="text-green-600 mt-1 shrink-0" />
                        <div>
                            <div className="text-xs font-bold text-stone-500 uppercase tracking-wider">Skills</div>
                            <div className="text-sm font-medium text-stone-800">Specialized Assembly</div>
                        </div>
                    </div>
                     <div className="flex items-start gap-2">
                         <Check size={16} className="text-green-600 mt-1 shrink-0" />
                        <div>
                            <div className="text-xs font-bold text-stone-500 uppercase tracking-wider">Outcome</div>
                            <div className="text-sm font-medium text-stone-800">Tariff-Free Access Only if wages met</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 relative">
                 <div className="absolute top-0 right-0 bg-red-100 text-red-800 text-[10px] font-bold px-2 py-1 uppercase tracking-widest rounded-bl-lg">
                    Unprotected
                 </div>
                <div className="flex items-center gap-2 mb-4 text-stone-900">
                    <Headphones className="text-stone-600" size={20} />
                    <h4 className="font-serif font-bold text-lg">Interpreter</h4>
                </div>
                 <div className="space-y-4">
                    <div className="flex items-start gap-2">
                        <ShieldAlert size={16} className="text-red-500 mt-1 shrink-0" />
                        <div>
                            <div className="text-xs font-bold text-stone-500 uppercase tracking-wider">Protections</div>
                            <div className="text-sm font-medium text-stone-800">None (Market Rate)</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-2">
                         <Check size={16} className="text-stone-400 mt-1 shrink-0" />
                        <div>
                            <div className="text-xs font-bold text-stone-500 uppercase tracking-wider">Skills</div>
                            <div className="text-sm font-medium text-stone-800">Medical Certification</div>
                        </div>
                    </div>
                     <div className="flex items-start gap-2">
                         <X size={16} className="text-red-500 mt-1 shrink-0" />
                        <div>
                            <div className="text-xs font-bold text-stone-500 uppercase tracking-wider">Outcome</div>
                            <div className="text-sm font-medium text-stone-800">Race to the bottom ($6/hr)</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// --- WAGE COMPARISON CHART ---
export const WageComparisonChart: React.FC = () => {
    
    // Data points
    const data = [
        { label: 'Auto Worker Floor (USMCA)', value: 16.00, color: 'bg-stone-500' },
        { label: 'US Medical Interpreter', value: 30.33, color: 'bg-stone-800' },
        { label: 'Remote MX Interpreter', value: 6.00, color: 'bg-red-500' }, // Lower end of spectrum
    ];

    const maxValue = 35;

    return (
        <div className="flex flex-col gap-8 items-center p-8 bg-white text-stone-800 rounded-xl my-8 border border-stone-200 shadow-lg">
            <div className="w-full text-left">
                <h3 className="font-serif text-xl mb-2 text-stone-900">Wage Disparity Analysis</h3>
                <p className="text-stone-500 text-sm leading-relaxed">
                    Comparison of hourly rates. Note how the remote interpreter falls significantly below the "High Wage" floor established for manufacturing.
                </p>
            </div>
            
            <div className="relative w-full h-64 bg-white rounded-xl p-6 flex items-end justify-around gap-4 border-b border-stone-100">
                {/* Background Grid Lines */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none opacity-10">
                   <div className="w-full h-[1px] bg-stone-400"></div>
                   <div className="w-full h-[1px] bg-stone-400"></div>
                   <div className="w-full h-[1px] bg-stone-400"></div>
                   <div className="w-full h-[1px] bg-stone-400"></div>
                </div>

                {data.map((item, idx) => (
                    <div key={idx} className="flex-1 flex flex-col justify-end items-center h-full z-10 group relative">
                        <div className="w-full flex items-end justify-center relative mb-2">
                             <div className="absolute -top-8 text-sm font-bold text-stone-700 bg-white px-2 py-1 rounded shadow-sm border border-stone-100">${item.value.toFixed(2)}</div>
                             <motion.div 
                                className={`w-16 rounded-t-md ${item.color}`}
                                initial={{ height: 0 }}
                                animate={{ height: `${(item.value / maxValue) * 100}%` }}
                                transition={{ type: "spring", stiffness: 60, delay: idx * 0.1 }}
                            />
                        </div>
                        {/* Label */}
                        <div className="h-10 flex items-start justify-center text-center">
                            <span className="text-[10px] font-bold text-stone-500 uppercase leading-tight max-w-[80px]">{item.label}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

// --- FULL INFOGRAPHIC COMPONENT ---
export const ExploitationInfographic: React.FC = () => {
    return (
        <div className="bg-sky-50/50 p-6 md:p-10 rounded-2xl border border-sky-100 shadow-xl max-w-6xl mx-auto font-sans text-slate-800">
            {/* HEADER */}
            <div className="text-center mb-12">
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 mb-3">USMCA's Unlevel Playing Field</h2>
                <div className="h-1 w-24 bg-red-500 mx-auto rounded-full mb-3"></div>
                <p className="text-xl text-slate-600 font-light">The Exploitation of Remote Interpreters</p>
            </div>

            {/* SECTION 1: SCALES OF INJUSTICE */}
            <div className="relative mb-16 bg-white p-8 rounded-xl shadow-sm border border-slate-100">
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-800 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg z-10">
                    The Imbalance
                 </div>
                 
                 <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                    {/* Left Scale: Heavy Profit */}
                    <div className="flex flex-col items-center text-center w-full md:w-1/3">
                        <div className="relative mb-4">
                             <div className="bg-green-100 p-6 rounded-full border-4 border-green-500 shadow-lg transform translate-y-8">
                                <DollarSign size={48} className="text-green-700" />
                             </div>
                        </div>
                        <h4 className="font-bold text-slate-900 text-lg">LSP Charges & Profits</h4>
                        <p className="text-2xl font-bold text-green-600 my-1">$1.50 - $4.00</p>
                        <p className="text-sm text-slate-500">per minute charged to client</p>
                        <p className="text-xs text-slate-400 font-mono mt-1">($90 - $240 / hour)</p>
                    </div>

                    {/* Center Fulcrum */}
                    <div className="flex flex-col items-center justify-center relative">
                        <div className="w-32 h-2 bg-slate-300 rounded-full transform rotate-12 mb-8"></div>
                        <div className="bg-slate-800 text-white p-3 rounded-lg shadow-lg z-10 flex flex-col items-center text-center w-40">
                             <FileWarning size={24} className="mb-1 text-yellow-400" />
                             <span className="text-xs font-bold uppercase">USMCA Regulatory Gap</span>
                        </div>
                        <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[40px] border-b-slate-800 mt-[-10px]"></div>
                    </div>

                    {/* Right Scale: Light Pay */}
                    <div className="flex flex-col items-center text-center w-full md:w-1/3">
                        <div className="relative mb-4">
                             <div className="bg-red-50 p-4 rounded-full border-2 border-red-300 shadow-sm transform -translate-y-8">
                                <DollarSign size={24} className="text-red-400" />
                             </div>
                        </div>
                        <h4 className="font-bold text-slate-900 text-lg">Interpreter Pay</h4>
                        <p className="text-2xl font-bold text-red-500 my-1">$0.10 - $0.20</p>
                        <p className="text-sm text-slate-500">per minute paid to worker</p>
                        <p className="text-xs text-slate-400 font-mono mt-1">($6 - $12 / hour)</p>
                    </div>
                 </div>
            </div>

            {/* SECTION 2: THE PROBLEM */}
            <div className="mb-16">
                <div className="bg-slate-200 h-px w-full mb-8 flex items-center justify-center">
                    <span className="bg-sky-50 px-4 text-xs font-bold text-slate-500 uppercase tracking-widest">The Problem: Misclassification & Regulatory Gap</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Item 1 */}
                    <div className="bg-white p-6 rounded-lg border border-slate-100 text-center hover:shadow-md transition-shadow">
                        <div className="mx-auto bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-amber-600">
                            <FileText size={24} />
                        </div>
                        <h4 className="font-bold text-slate-900 mb-2">Misclassification</h4>
                        <p className="text-sm text-slate-600">LSPs label workers as "contractors" to avoid minimum wage, benefits, and taxes.</p>
                    </div>
                    {/* Item 2 */}
                    <div className="bg-white p-6 rounded-lg border border-slate-100 text-center hover:shadow-md transition-shadow">
                        <div className="mx-auto bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-blue-600">
                            <Scale size={24} />
                        </div>
                        <h4 className="font-bold text-slate-900 mb-2">Law Defined by Control</h4>
                        <p className="text-sm text-slate-600">Both US & Mexican law define employees by <strong>control</strong>, which LSPs exercise strictly.</p>
                    </div>
                    {/* Item 3 */}
                    <div className="bg-white p-6 rounded-lg border border-slate-100 text-center hover:shadow-md transition-shadow">
                        <div className="mx-auto bg-teal-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-teal-600">
                            <Monitor size={24} />
                        </div>
                        <h4 className="font-bold text-slate-900 mb-2">Mexico's Telework Law</h4>
                        <p className="text-sm text-slate-600">Employers must cover costs if &gt;40% remote. Misclassification bypasses this.</p>
                    </div>
                    {/* Item 4 */}
                    <div className="bg-white p-6 rounded-lg border border-slate-100 text-center hover:shadow-md transition-shadow">
                        <div className="mx-auto bg-slate-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-slate-600">
                            <FileX size={24} />
                        </div>
                        <h4 className="font-bold text-slate-900 mb-2">USMCA Omission</h4>
                        <p className="text-sm text-slate-600">Facilitates remote services but sets <strong>no wage floors</strong> for service providers.</p>
                    </div>
                </div>
            </div>

            {/* SECTION 3: THE DOUBLE STANDARD */}
            <div className="mb-16 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="bg-slate-900 text-white p-4 text-center">
                    <h3 className="font-serif text-xl font-bold">The Double Standard: Automotive vs. Medical</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Automotive Side */}
                    <div className="p-8 border-b md:border-b-0 md:border-r border-slate-200 relative bg-green-50/30">
                        <div className="absolute top-4 right-4 text-green-600 bg-green-100 px-2 py-1 text-xs font-bold rounded uppercase">Protected</div>
                        <div className="flex items-center gap-3 mb-6">
                            <Car size={32} className="text-slate-700" />
                            <h4 className="font-bold text-xl text-slate-800">Automotive Workers</h4>
                        </div>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <div className="mt-1 bg-green-500 rounded-full p-1"><Check size={12} className="text-white"/></div>
                                <div>
                                    <span className="block font-bold text-sm text-slate-700">Wage Floor</span>
                                    <span className="text-sm text-slate-600">At least <strong>$16 USD/hr</strong> mandated for tariff-free trade.</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-1 bg-slate-300 rounded-full p-1"><Check size={12} className="text-slate-600"/></div>
                                <div>
                                    <span className="block font-bold text-sm text-slate-700">High Skill & Critical</span>
                                    <span className="text-sm text-slate-600">Errors have severe consequences (e.g., bad welds).</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    
                    {/* Medical Side */}
                    <div className="p-8 relative bg-red-50/30">
                        <div className="absolute top-4 right-4 text-red-600 bg-red-100 px-2 py-1 text-xs font-bold rounded uppercase">Unprotected</div>
                        <div className="flex items-center gap-3 mb-6">
                            <Headphones size={32} className="text-slate-700" />
                            <h4 className="font-bold text-xl text-slate-800">Medical Interpreters</h4>
                        </div>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <div className="mt-1 bg-red-500 rounded-full p-1"><X size={12} className="text-white"/></div>
                                <div>
                                    <span className="block font-bold text-sm text-slate-700">Typical Pay</span>
                                    <span className="text-sm text-slate-600"><strong>$6 - $12 USD/hr</strong> (Mexico-based). No USMCA floor.</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-1 bg-slate-300 rounded-full p-1"><Check size={12} className="text-slate-600"/></div>
                                <div>
                                    <span className="block font-bold text-sm text-slate-700">High Skill & Critical</span>
                                    <span className="text-sm text-slate-600">Errors have severe consequences (e.g., mistranslated diagnosis).</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="bg-slate-100 p-3 text-center text-sm font-medium text-slate-500 border-t border-slate-200">
                    Both are Highly Skilled & Safety-Critical, but only one is protected by USMCA.
                </div>
            </div>

            {/* SECTION 4 & 5: HUMAN COST & RECOURSE */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                 {/* Human Cost */}
                 <div className="lg:col-span-7">
                    <div className="bg-slate-200 h-px w-full mb-6 flex items-center justify-start">
                        <span className="bg-sky-50 pr-4 text-xs font-bold text-slate-500 uppercase tracking-widest">The Human Cost</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded border border-slate-100 shadow-sm text-center">
                            <UserX className="mx-auto text-red-500 mb-2" size={24} />
                            <h5 className="font-bold text-sm text-slate-800 mb-1">Sudden Termination</h5>
                            <p className="text-xs text-slate-500">Removed from platforms without notice.</p>
                        </div>
                        <div className="bg-white p-4 rounded border border-slate-100 shadow-sm text-center">
                            <Wallet className="mx-auto text-red-500 mb-2" size={24} />
                            <h5 className="font-bold text-sm text-slate-800 mb-1">No Pay</h5>
                            <p className="text-xs text-slate-500">Denied payment for work completed.</p>
                        </div>
                        <div className="bg-white p-4 rounded border border-slate-100 shadow-sm text-center">
                            <CalendarX className="mx-auto text-red-500 mb-2" size={24} />
                            <h5 className="font-bold text-sm text-slate-800 mb-1">Delayed Wages</h5>
                            <p className="text-xs text-slate-500">Wait months for earned income.</p>
                        </div>
                    </div>
                 </div>

                 {/* Recourse */}
                 <div className="lg:col-span-5">
                    <div className="bg-slate-200 h-px w-full mb-6 flex items-center justify-start">
                        <span className="bg-sky-50 pr-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Pathways to Recourse</span>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 bg-white p-3 rounded border border-slate-200 shadow-sm">
                            <div className="bg-blue-100 p-2 rounded text-blue-700"><FileText size={16} /></div>
                            <div>
                                <div className="font-bold text-sm text-slate-900">File Form SS-8 with IRS</div>
                                <div className="text-xs text-slate-500">Request official worker status determination.</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-white p-3 rounded border border-slate-200 shadow-sm">
                            <div className="bg-blue-100 p-2 rounded text-blue-700"><Landmark size={16} /></div>
                            <div>
                                <div className="font-bold text-sm text-slate-900">Complain to U.S. DOL</div>
                                <div className="text-xs text-slate-500">Report potential FLSA misclassification.</div>
                            </div>
                        </div>
                         <div className="flex items-center gap-3 bg-white p-3 rounded border border-slate-200 shadow-sm">
                            <div className="bg-blue-100 p-2 rounded text-blue-700"><Gavel size={16} /></div>
                            <div>
                                <div className="font-bold text-sm text-slate-900">USMCA Labor Mechanism</div>
                                <div className="text-xs text-slate-500">For denial of collective bargaining rights.</div>
                            </div>
                        </div>
                    </div>
                 </div>
            </div>
        </div>
    );
}
