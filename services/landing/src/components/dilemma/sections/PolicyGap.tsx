
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { IndustryContrast, WageComparisonChart } from '../Diagrams';

export const PolicyGap: React.FC = () => {
    return (
        <section id="policy" className="py-24 bg-background">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h2 className="font-serif text-4xl md:text-5xl mb-6 text-foreground">Unequal Protections</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                        Why does USMCA explicitly protect manufacturing wages while leaving service professionals exposed? The contrast is stark.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
                    <div className="lg:col-span-5">
                         <IndustryContrast />
                    </div>
                    <div className="lg:col-span-7 flex flex-col justify-center">
                         <WageComparisonChart />
                         <div className="mt-8 p-6 bg-card rounded-lg border border-border text-muted-foreground leading-relaxed">
                            <h4 className="font-bold text-foreground mb-2 uppercase text-xs tracking-widest">Regulatory Gap</h4>
                            <p>
                                The automotive wage rule ($16/hr) was explicitly crafted to boost North American labor costs and prevent wage suppression. By contrast, the remote service sector operates in a "wild west" where labor safeguards are omitted, allowing companies to tap into Mexico's skilled labor without triggering penalties. This inconsistency drives the "Interpreter's Dilemma."
                            </p>
                         </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
