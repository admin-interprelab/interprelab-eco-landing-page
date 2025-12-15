
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';

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
