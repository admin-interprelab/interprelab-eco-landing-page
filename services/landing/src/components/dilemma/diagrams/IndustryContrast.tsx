
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { Car, Shield, Check, Headphones, ShieldAlert, X } from 'lucide-react';

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
