/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowDown } from 'lucide-react';
import { DilemmaHero } from '@/components/dilemma/sections/DilemmaHero';
import { ExecutiveSummary } from '@/components/dilemma/sections/ExecutiveSummary';
import { AudioReport } from '@/components/dilemma/sections/AudioReport';
import { SystemicBreakdown } from '@/components/dilemma/sections/SystemicBreakdown';
import { WorkerClassification } from '@/components/dilemma/sections/WorkerClassification';
import { EconomicAnalysis } from '@/components/dilemma/sections/EconomicAnalysis';
import { PolicyGap } from '@/components/dilemma/sections/PolicyGap';
import { VisualSummary } from '@/components/dilemma/sections/VisualSummary';
import { SourcesFooter } from '@/components/dilemma/sections/SourcesFooter';

const Dilemma: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-nobel-gold selection:text-white">

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 bg-nobel-gold rounded-full flex items-center justify-center text-white font-serif font-bold text-xl shadow-sm pb-1">§</div>
            <span className={`font-serif font-bold text-lg tracking-wide transition-opacity ${scrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
              USMCA REPORT <span className="font-normal text-muted-foreground">2025</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-muted-foreground">
            <a href="#summary" onClick={scrollToSection('summary')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Summary</a>
            <a href="#dilemma" onClick={scrollToSection('dilemma')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">The Dilemma</a>
            <a href="#breakdown" onClick={scrollToSection('breakdown')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Systemic Breakdown</a>
            <a href="#classification" onClick={scrollToSection('classification')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Classification</a>
            <a href="#economics" onClick={scrollToSection('economics')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Economics</a>
            <a href="#policy" onClick={scrollToSection('policy')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Policy Gap</a>
            <a
              href="#sources"
              onClick={scrollToSection('sources')}
              className="px-5 py-2 bg-foreground text-background rounded-full hover:bg-foreground/90 transition-colors shadow-sm cursor-pointer"
            >
              Sources
            </a>
          </div>

          <button className="md:hidden text-foreground p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center gap-8 text-xl font-serif animate-fade-in text-foreground">
            <a href="#summary" onClick={scrollToSection('summary')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Executive Summary</a>
            <a href="#dilemma" onClick={scrollToSection('dilemma')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">The Dilemma</a>
            <a href="#breakdown" onClick={scrollToSection('breakdown')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Systemic Breakdown</a>
            <a href="#classification" onClick={scrollToSection('classification')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Worker Status</a>
            <a href="#economics" onClick={scrollToSection('economics')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">The Wage Gap</a>
            <a href="#policy" onClick={scrollToSection('policy')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Policy Analysis</a>
        </div>
      )}

      <DilemmaHero onReadClick={scrollToSection('summary')} />

      <main>
        <ExecutiveSummary />
        <AudioReport />
        <SystemicBreakdown />
        <WorkerClassification />
        <EconomicAnalysis />
        <PolicyGap />
        <VisualSummary />
        <SourcesFooter />
      </main>

      <footer className="bg-foreground text-background py-16">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
                <div className="font-serif font-bold text-2xl mb-2">USMCA Report</div>
                <p className="text-sm">Remote Services, and Interpreter Misclassification</p>
            </div>
            <div className="flex gap-6 text-sm">
                <a href="#" className="hover:text-nobel-gold transition-colors">Executive Summary</a>
                <a href="#" className="hover:text-nobel-gold transition-colors">Data Analysis</a>
                <a href="#" className="hover:text-nobel-gold transition-colors">Legal Framework</a>
            </div>
        </div>
        <div className="text-center mt-12 text-xs opacity-60">
            Generated by AI based on provided research documentation.
        </div>
      </footer>
    </div>
  );
};

export default Dilemma;
