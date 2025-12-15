
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building, Briefcase, User } from 'lucide-react';

export const WageGapVisualizer: React.FC = () => {
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
