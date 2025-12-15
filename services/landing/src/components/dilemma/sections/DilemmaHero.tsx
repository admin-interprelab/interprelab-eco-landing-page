
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { ArrowDown } from 'lucide-react';
import { HeroScene } from '../QuantumScene';

interface DilemmaHeroProps {
    onReadClick: (e: React.MouseEvent) => void;
}

export const DilemmaHero: React.FC<DilemmaHeroProps> = ({ onReadClick }) => {
    return (
        <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroScene />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(var(--background),0.92)_0%,rgba(var(--background),0.6)_50%,rgba(var(--background),0.3)_100%)]" />
        {/* Fallback gradient if vars don't work in rgba like that without values. Assuming tailwind config handles vars correctly or we use opacity classes */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-background/30" />


        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="inline-block mb-4 px-3 py-1 border border-nobel-gold text-nobel-gold text-xs tracking-[0.2em] uppercase font-bold rounded-full backdrop-blur-sm bg-card/30">
            Special Report
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium leading-tight md:leading-[1.1] mb-8 text-foreground drop-shadow-sm">
            The Interpreter <br/><span className="italic font-normal text-muted-foreground text-4xl md:text-6xl block mt-4">Misclassification Crisis</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground font-light leading-relaxed mb-12">
            How USMCA liberalized remote services but left workers behind, creating a regulatory gap that exploits skilled labor and creates digital sweatshops.
          </p>

          <div className="flex justify-center">
             <a href="#summary" onClick={onReadClick} className="group flex flex-col items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                <span>READ REPORT</span>
                <span className="p-2 border border-border rounded-full group-hover:border-foreground transition-colors bg-card/50">
                    <ArrowDown size={16} />
                </span>
             </a>
          </div>
        </div>
      </header>
    );
};
