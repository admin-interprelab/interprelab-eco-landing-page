
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { NetworkScene } from '../QuantumScene';

export const VisualSummary: React.FC = () => {
    return (
        <section className="py-24 bg-card/50 border-t border-border">
             <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-5 relative">
                    <div className="aspect-square bg-[#1a1a1a] rounded-xl overflow-hidden relative border border-border shadow-2xl">
                        <NetworkScene />
                        <div className="absolute bottom-6 left-0 right-0 text-center px-4">
                             <div className="text-white font-serif text-xl mb-1">Global Connectivity</div>
                             <div className="text-xs text-stone-500 font-mono uppercase tracking-widest">Without Local Responsibility</div>
                        </div>
                    </div>
                </div>
                <div className="md:col-span-7 flex flex-col justify-center">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-muted-foreground uppercase">Strategic Implications</div>
                    <h2 className="font-serif text-4xl mb-6 text-foreground">Reclaiming Power</h2>
                    <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                        This is not a hopeless situation. Knowledge is power. There are official government-backed ways to challenge this system, including IRS Form SS-8 and Department of Labor reports.
                    </p>
                    <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                         The race to the bottom hurts everyone—US-based interpreters face depressed wages, and international interpreters face exploitation. Recognizing this "digital sweatshop" model is the first step toward demanding fair compensation for vital work.
                    </p>

                    <div className="p-6 bg-card border border-border rounded-lg border-l-4 border-l-nobel-gold shadow-sm">
                        <p className="font-serif italic text-xl text-foreground mb-4">
                            "Is a race to the bottom, fueled by digital exploitation, the future you're willing to accept? Or is it time to fight for the value of what you do?"
                        </p>
                        <span className="text-sm font-bold text-muted-foreground tracking-wider uppercase">— The Interpreter's Dilemma</span>
                    </div>
                </div>
             </div>
        </section>
    );
};
