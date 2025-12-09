/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Chrome, Zap, Shield, Globe, Download, Star, ArrowRight, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const InterpreCoach = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    { icon: Zap, title: "Real-time Assistance", description: "Get instant terminology suggestions, context clues, and cultural references while you interpret.", delay: "0s" },
    { icon: Globe, title: "Multi-language Support", description: "Support for 50+ language pairs with specialized terminology databases for medical, legal, and technical fields.", delay: "0.1s" },
    { icon: Shield, title: "Privacy Secured", description: "HIPAA-compliant with end-to-end encryption. Your sessions remain completely confidential and secure.", delay: "0.2s" },
    { icon: Star, title: "Performance Analytics", description: "Track your improvement with detailed session analytics and personalized feedback reports.", delay: "0.3s" },
    { icon: Download, title: "Offline Capability", description: "Access core features even without internet connection for uninterrupted interpretation sessions.", delay: "0.4s" },
    { icon: Chrome, title: "Easy Integration", description: "Works with popular video conferencing platforms and interpretation management systems.", delay: "0.5s" }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-nobel-gold selection:text-white">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-4 cursor-pointer">
            <div className="w-8 h-8 bg-nobel-gold rounded-full flex items-center justify-center text-white font-serif font-bold text-xl shadow-sm">I</div>
            <span className={`font-serif font-bold text-lg tracking-wide transition-opacity ${scrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
              InterpreLab <span className="font-normal text-muted-foreground">InterpreCoach</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-muted-foreground">
            <Link to="/" className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Home</Link>
            <Link to="/interprebot" className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">InterpreBot</Link>
            <Link to="/waitlist" className="px-5 py-2 bg-foreground text-background rounded-full hover:bg-foreground/90 transition-colors shadow-sm cursor-pointer">
              Join Waitlist
            </Link>
          </div>

          <button className="md:hidden text-foreground p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center gap-8 text-xl font-serif animate-fade-in text-foreground">
          <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Home</Link>
          <Link to="/interprebot" onClick={() => setMenuOpen(false)} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">InterpreBot</Link>
          <Link to="/waitlist" onClick={() => setMenuOpen(false)} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Join Waitlist</Link>
        </div>
      )}

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <Badge className="mb-6 bg-nobel-gold/10 text-nobel-gold border-nobel-gold/20 px-4 py-2">
                Chrome Extension
              </Badge>
              <h1 className="font-serif text-5xl md:text-7xl font-medium leading-tight mb-8 text-foreground">
                Interpre<span className="italic text-nobel-gold">Coach</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Chrome extension providing real-time terminology support and coaching during live interpretation sessions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-nobel-gold hover:bg-nobel-gold/90 text-white font-medium px-8">
                  <Chrome className="w-5 h-5 mr-2" />
                  Add to Chrome
                </Button>
                <Link to="/interprebot">
                  <Button variant="outline" size="lg" className="border-nobel-gold/50 hover:bg-nobel-gold/10 px-8">
                    Take the Assessment
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative animate-fade-in-up stagger-1">
              <div className="glass rounded-2xl p-8 border border-border/50">
                <img
                  src="/src/assets/extension-preview.jpg"
                  alt="InterpreCoach Extension Preview"
                  className="w-full rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-block mb-3 text-xs font-bold tracking-widest text-muted-foreground uppercase">Key Features</div>
            <h2 className="font-serif text-4xl md:text-5xl mb-6 text-foreground">
              Real-time Assistance
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Seamless browser integration for real-time assistance during video calls.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="glass border-border hover:border-nobel-gold/50 transition-all duration-300 animate-fade-in-up bg-card/40 backdrop-blur-md"
                style={{ animationDelay: feature.delay }}
              >
                <CardHeader>
                  <div className="w-16 h-16 bg-nobel-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-nobel-gold/20">
                    <feature.icon className="w-8 h-8 text-nobel-gold" />
                  </div>
                  <CardTitle className="font-serif text-xl text-center text-foreground">{feature.title}</CardTitle>
                  <CardDescription className="text-center leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Getting Started Timeline */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-block mb-3 text-xs font-bold tracking-widest text-muted-foreground uppercase">Getting Started</div>
            <h2 className="font-serif text-4xl md:text-5xl mb-6 text-foreground">
              Get Started in 3 Steps
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Your path to real-time interpretation assistance
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {/* Step 1 */}
              <div className="flex gap-8 items-start animate-fade-in-up">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-nobel-gold/10 rounded-full flex items-center justify-center border-2 border-nobel-gold/20">
                    <Chrome className="w-8 h-8 text-nobel-gold" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Download className="w-6 h-6 text-nobel-gold" />
                    <h3 className="font-serif text-2xl text-foreground">Install Extension</h3>
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Add InterpreCoach to Chrome from the Web Store. One-click installation, no complex setup required.
                  </p>
                  <Button className="bg-nobel-gold hover:bg-nobel-gold/90 text-white">
                    <Chrome className="w-4 h-4 mr-2" />
                    Add to Chrome
                  </Button>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-8 items-start animate-fade-in-up stagger-1">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-nobel-gold/10 rounded-full flex items-center justify-center border-2 border-nobel-gold/20">
                    <span className="text-2xl font-bold font-serif text-nobel-gold">2</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Star className="w-6 h-6 text-nobel-gold" />
                    <h3 className="font-serif text-2xl text-foreground">Configure Your Profile</h3>
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Set your language pairs, specialty areas, and preferences for personalized coaching suggestions.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-card border border-border rounded-lg shadow-sm">
                      <p className="text-sm font-semibold mb-1 text-foreground">Language Pairs</p>
                      <p className="text-xs text-muted-foreground">EN ↔ ES, EN ↔ FR</p>
                    </div>
                    <div className="p-4 bg-card border border-border rounded-lg shadow-sm">
                      <p className="text-sm font-semibold mb-1 text-foreground">Specialty</p>
                      <p className="text-xs text-muted-foreground">Medical, Legal</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-8 items-start animate-fade-in-up stagger-2">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-nobel-gold/10 rounded-full flex items-center justify-center border-2 border-nobel-gold/20">
                    <Zap className="w-8 h-8 text-nobel-gold" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Globe className="w-6 h-6 text-nobel-gold" />
                    <h3 className="font-serif text-2xl text-foreground">Start Your Session</h3>
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Join a video call and activate InterpreCoach. Get instant terminology support and cultural context suggestions.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-nobel-gold rounded-full" />
                      <span className="text-sm text-muted-foreground">Click the extension icon</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-nobel-gold rounded-full" />
                      <span className="text-sm text-muted-foreground">Activate coaching mode</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-nobel-gold rounded-full" />
                      <span className="text-sm text-muted-foreground">Get real-time assistance</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12 animate-fade-in-up stagger-3">
            <Button size="lg" className="bg-nobel-gold hover:bg-nobel-gold/90 text-white font-medium px-8">
              <Chrome className="w-5 h-5 mr-2" />
              Get InterpreCoach
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-background py-16">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <div className="font-serif font-bold text-2xl mb-2">InterpreLab</div>
            <p className="text-sm">Advanced Interpretation Technology</p>
          </div>
          <div className="flex gap-6 text-sm">
            <Link to="/" className="hover:text-nobel-gold transition-colors">Home</Link>
            <Link to="/about" className="hover:text-nobel-gold transition-colors">About</Link>
            <Link to="/contact" className="hover:text-nobel-gold transition-colors">Contact</Link>
          </div>
        </div>
        <div className="text-center mt-12 text-xs opacity-60">
          © 2025 InterpreLab. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default InterpreCoach;