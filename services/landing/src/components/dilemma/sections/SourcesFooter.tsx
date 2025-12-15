
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { sources } from '@/data/dilemma';

const SourceCard = ({ title, detail, delay }: { title: string, detail: string, delay: string }) => {
  return (
    <div className="flex flex-col group animate-fade-in-up items-center p-8 bg-card dark:bg-card/50 rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-xs hover:border-nobel-gold/50" style={{ animationDelay: delay }}>
      <h3 className="font-serif text-lg text-foreground text-center mb-3 leading-tight">{title}</h3>
      <div className="w-12 h-0.5 bg-nobel-gold mb-4 opacity-60"></div>
      <p className="text-xs text-muted-foreground font-medium text-center leading-relaxed">{detail}</p>
    </div>
  );
};

export const SourcesFooter: React.FC = () => {
    return (
        <section id="sources" className="py-24 bg-card/20 border-t border-border">
           <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-muted-foreground uppercase">REFERENCES</div>
                    <h2 className="font-serif text-3xl md:text-5xl mb-4 text-foreground">Sources & Data</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">Based on official USMCA texts, IRS guidelines, and industry data.</p>
                </div>

                <div className="flex flex-col md:flex-row gap-8 justify-center items-center flex-wrap">
                    {sources.map((source, index) => (
                        <SourceCard
                            key={index}
                            title={source.title}
                            detail={source.detail}
                            delay={source.delay}
                        />
                    ))}
                </div>
           </div>
        </section>
    );
};
