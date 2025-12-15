
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

export const ExecutiveSummary: React.FC = () => {
    return (
        <section id="summary" className="py-24 bg-card/50">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4">
              <div className="inline-block mb-3 text-xs font-bold tracking-widest text-muted-foreground uppercase">Executive Summary</div>
              <h2 className="font-serif text-4xl mb-6 leading-tight text-foreground">Trade without Borders,<br/>Labor without Rights?</h2>
              <div className="w-16 h-1 bg-nobel-gold mb-6"></div>
              <p className="text-muted-foreground italic">
                "We are not just talking about being bilingual here. This is a demanding profession that requires an incredible amount of skill and responsibility."
              </p>
            </div>
            <div className="md:col-span-8 text-lg text-muted-foreground leading-relaxed space-y-6">
              <p>
                <span className="text-5xl float-left mr-3 mt-[-8px] font-serif text-nobel-gold">U</span>nder the USMCA (T-MEC), cross-border trade in services is liberalized, allowing U.S. companies to hire remote workers in Mexico without establishing a local office. The agreement enshrines duty-free digital products and forbids data localization mandates, creating a seamless digital market.
              </p>
              <p>
                However, this digital freedom has created a <strong>regulatory blind spot</strong>. U.S. employers (Language Service Providers) frequently classify remote interpreters as "independent contractors" to avoid benefits, despite exercising strict control over their work. While USMCA protects automotive workers with a $16/hr wage floor, no such protection exists for service professionals.
              </p>
              <p>
                The human cost is significant. Interpreters act as "emotional sponges" for patients in traumatic medical situations, yet they work in isolation, often facing termination without notice and wages as low as <strong>$0.10 per minute</strong>. This "digital sweatshop" model exploits the dedication of professionals who are essential to the healthcare system.
              </p>
            </div>
          </div>
        </section>
    );
};
