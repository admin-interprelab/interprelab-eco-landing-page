
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { WageGapVisualizer } from '../Diagrams';

export const EconomicAnalysis: React.FC = () => {
    return (
        <section id="economics" className="py-24 bg-card/30 overflow-hidden relative border-t border-border">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                     <div className="inline-block mb-3 text-xs font-bold tracking-widest text-muted-foreground uppercase">Follow The Money</div>
                     <h2 className="font-serif text-4xl md:text-5xl mb-6 text-foreground">The Value Gap</h2>
                     <p className="text-lg text-muted-foreground">
                        Language Service Providers (LSPs) bill U.S. healthcare clients premium rates reflecting the critical nature of medical interpretation. However, by outsourcing to Mexico and misclassifying workers, they retain a massive margin.
                     </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                     <div className="order-2 lg:order-1">
                        <WageGapVisualizer />
                     </div>
                     <div className="order-1 lg:order-2 space-y-6">
                        <div className="bg-card p-8 rounded-xl border border-border shadow-sm">
                            <h3 className="font-serif text-2xl text-foreground mb-2">90% Margin Retention</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                The middleman—the platform—can pocket over <strong>90% of the revenue</strong>. A hospital might pay $4.00/minute, but the interpreter in Mexico sees only $0.14/minute.
                            </p>
                        </div>
                        <div className="bg-card p-8 rounded-xl border border-border shadow-sm">
                            <h3 className="font-serif text-2xl text-foreground mb-2">The Cost of "Efficiency"</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                This isn't just about lower cost of living. It's about <strong>wage arbitrage</strong>. Companies utilize certified professionals who require thousands of dollars in training, yet pay them unskilled labor rates, creating a "race to the bottom" that devalues the entire profession.
                            </p>
                        </div>
                     </div>
                </div>
            </div>
        </section>
    );
};
