
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { ExploitationInfographic } from '../Diagrams';

export const SystemicBreakdown: React.FC = () => {
    return (
        <section id="breakdown" className="py-24 bg-card border-b border-border">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center mb-16">
                     <div className="inline-block mb-3 text-xs font-bold tracking-widest text-muted-foreground uppercase">Systemic Breakdown</div>
                     <h2 className="font-serif text-4xl md:text-5xl mb-6 text-foreground">Visualizing the Crisis</h2>
                     <p className="text-lg text-muted-foreground leading-relaxed">
                        The current USMCA framework unintentionally fosters a system where high-value work is compensated at sweatshop rates. This infographic illustrates the flow of exploitation, the legal gaps, and the stark contrast between industries.
                     </p>
                </div>
                <ExploitationInfographic />
            </div>
        </section>
    );
};
