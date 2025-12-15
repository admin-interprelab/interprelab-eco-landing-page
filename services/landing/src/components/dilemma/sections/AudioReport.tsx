
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { Headphones } from 'lucide-react';
import { AudioPlayer } from '../MediaPlayer';
import { dilemmaHighlights } from '@/data/dilemma';

export const AudioReport: React.FC = () => {
    return (
        <section id="dilemma" className="py-20 bg-[#1a1a1a] text-stone-100">
            <div className="container mx-auto px-6">
                 <div className="flex items-center gap-3 mb-8 justify-center md:justify-start">
                    <div className="p-2 bg-stone-800 rounded-full text-nobel-gold"><Headphones size={20} /></div>
                    <span className="text-xs font-bold tracking-widest uppercase text-stone-400">Audio Report</span>
                 </div>

                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-white leading-tight">The Interpreter's Dilemma</h2>
                        <p className="text-xl text-stone-400 mb-8 font-light leading-relaxed">
                            Pulling back the curtain on a crisis hiding in plain sight inside the multi-billion dollar remote interpreting industry.
                        </p>
                         <div className="space-y-6">
                             {dilemmaHighlights.map((highlight, index) => (
                               <div key={index} className="flex gap-4 items-start">
                                  <div className="mt-1 min-w-[24px] text-nobel-gold font-serif text-xl">{highlight.number}</div>
                                  <div>
                                      <h4 className="font-bold text-white mb-1">{highlight.title}</h4>
                                      <p className="text-sm text-stone-400">{highlight.description}</p>
                                  </div>
                               </div>
                             ))}
                         </div>
                    </div>

                    <div className="relative">
                        <AudioPlayer />
                    </div>
                 </div>
            </div>
        </section>
    );
};
