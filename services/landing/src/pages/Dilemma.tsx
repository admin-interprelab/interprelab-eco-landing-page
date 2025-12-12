/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { HeroScene, NetworkScene } from '@/components/dilemma/QuantumScene';
import { ClassificationDiagram, WageGapDiagram, WageComparisonChart, IndustryContrast, ExploitationInfographic } from '@/components/dilemma/Diagrams';
import { AudioPlayer } from '@/components/dilemma/MediaPlayer';
import { ArrowDown, Menu, X, Headphones, Scale } from 'lucide-react';

const SourceCard = ({ title, detail, delay }: { title: string, detail: string, delay: string }) => {
  return (
    <div className="flex flex-col group animate-fade-in-up items-center p-8 bg-card dark:bg-card/50 rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-xs hover:border-nobel-gold/50" style={{ animationDelay: delay }}>
      <h3 className="font-serif text-lg text-foreground text-center mb-3 leading-tight">{title}</h3>
      <div className="w-12 h-0.5 bg-nobel-gold mb-4 opacity-60"></div>
      <p className="text-xs text-muted-foreground font-medium text-center leading-relaxed">{detail}</p>
    </div>
  );
};

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

      {/* Hero Section */}
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
             <a href="#summary" onClick={scrollToSection('summary')} className="group flex flex-col items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                <span>READ REPORT</span>
                <span className="p-2 border border-border rounded-full group-hover:border-foreground transition-colors bg-card/50">
                    <ArrowDown size={16} />
                </span>
             </a>
          </div>
        </div>
      </header>

      <main>
        {/* Introduction / Executive Summary */}
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

        {/* Multimedia / Podcast Section */}
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
                             <div className="flex gap-4 items-start">
                                <div className="mt-1 min-w-[24px] text-nobel-gold font-serif text-xl">01</div>
                                <div>
                                    <h4 className="font-bold text-white mb-1">A Vital Profession</h4>
                                    <p className="text-sm text-stone-400">Certified experts acting as the voice in critical life-or-death moments.</p>
                                </div>
                             </div>
                             <div className="flex gap-4 items-start">
                                <div className="mt-1 min-w-[24px] text-nobel-gold font-serif text-xl">02</div>
                                <div>
                                    <h4 className="font-bold text-white mb-1">Digital Sweatshops</h4>
                                    <p className="text-sm text-stone-400">Skilled professionals earning $6/hr while generating $100+/hr in billing.</p>
                                </div>
                             </div>
                             <div className="flex gap-4 items-start">
                                <div className="mt-1 min-w-[24px] text-nobel-gold font-serif text-xl">03</div>
                                <div>
                                    <h4 className="font-bold text-white mb-1">Vicarious Trauma</h4>
                                    <p className="text-sm text-stone-400">Absorbing patient pain without support, leading to severe burnout.</p>
                                </div>
                             </div>
                        </div>
                    </div>

                    <div className="relative">
                        <AudioPlayer />
                    </div>
                 </div>
            </div>
        </section>

        {/* Visual Infographic Section (NEW) */}
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

        {/* Worker Classification */}
        <section id="classification" className="py-24 bg-background border-t border-border">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-card text-muted-foreground text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-border">
                            <Scale size={14}/> LEGAL FRAMEWORK
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-foreground">Employee vs. Contractor</h2>
                        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                           Whether under U.S. IRS guidelines or Mexico's Federal Labor Law, the key determinant of employment is <strong>control</strong>. When a company controls how you work, when you get paid, and your schedule, you are an employee.
                        </p>
                        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                            Yet, the industry standard relies on <strong>misclassification</strong>. Interpreters are treated as independent contractors to deny minimum wage, overtime pay, and protections. Mexico's Telework Act (NOM-037) explicitly grants remote workers the "right to disconnect" and equipment costs—rights that are systematically ignored in this cross-border loophole.
                        </p>
                        <div className="p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 rounded-r-lg">
                             <p className="text-stone-800 dark:text-red-100 font-medium italic">
                                "If the company controls what the worker does and how they do it, that points to employment."
                             </p>
                             <p className="text-xs text-red-800 dark:text-red-300 mt-2 font-bold uppercase">— IRS Guidelines</p>
                        </div>
                    </div>
                    <div>
                        <ClassificationDiagram />
                    </div>
                </div>
            </div>
        </section>

        {/* The Economics: Wage Gap */}
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
                        <WageGapDiagram />
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

        {/* Policy Comparison */}
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

        {/* Visual Summary */}
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

        {/* Sources */}
        <section id="sources" className="py-24 bg-card/20 border-t border-border">
           <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-muted-foreground uppercase">REFERENCES</div>
                    <h2 className="font-serif text-3xl md:text-5xl mb-4 text-foreground">Sources & Data</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">Based on official USMCA texts, IRS guidelines, and industry data.</p>
                </div>

                <div className="flex flex-col md:flex-row gap-8 justify-center items-center flex-wrap">
                    <SourceCard
                        title="USMCA Text"
                        detail="Chapter 15 (Services), Chapter 19 (Digital Trade), Chapter 23 (Labor)"
                        delay="0s"
                    />
                    <SourceCard
                        title="IRS Form SS-8"
                        detail="Determination of Worker Status for Purposes of Federal Employment Taxes"
                        delay="0.1s"
                    />
                    <SourceCard
                        title="NOM-037-STPS"
                        detail="Mexican Official Standard for Telework (2023)"
                        delay="0.2s"
                    />
                    <SourceCard
                        title="Bureau of Labor Statistics"
                        detail="Occupational Outlook: Interpreters and Translators (2023)"
                        delay="0.3s"
                    />
                    <SourceCard
                        title="ZipRecruiter Data"
                        detail="Remote Medical Interpreter Salary Surveys (2025)"
                        delay="0.4s"
                    />
                    <SourceCard
                        title="Industry Reports"
                        detail="CSA Research & Slator on Language Service Provider pricing"
                        delay="0.5s"
                    />
                </div>
           </div>
        </section>

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
