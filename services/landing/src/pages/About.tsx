/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Button } from "@/lib/ui";
import { MapPin, Users, ArrowRight, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';

import { MissionVision } from "@/components/about/MissionVision";
import { CoreValues } from "@/components/about/CoreValues";
import { TeamGrid } from "@/components/about/TeamGrid";
import { CompanyStats } from "@/components/about/CompanyStats";

const About = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-nobel-gold selection:text-white">
      <Helmet>
        <title>About InterpreLab | AI-Powered Interpreter Training Platform</title>
        <meta 
          name="description" 
          content="Learn about InterpreLab, founded by interpreters to transform medical and legal interpretation with AI-powered training, real-time assistance, and professional development tools." 
        />
        <meta name="keywords" content="about interprelab, medical interpreter company, AI interpreter platform, interpreter training, healthcare interpretation services" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://interprelab.com/about" />
        <meta property="og:title" content="About InterpreLab - Built by Interpreters, for Interpreters" />
        <meta property="og:description" content="We create AI tools that help you work with confidence, reduce stress, and earn what you deserve." />
        <meta property="og:image" content="https://interprelab.com/og-image-about.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://interprelab.com/about" />
        <meta property="twitter:title" content="About InterpreLab - Built by Interpreters, for Interpreters" />
        <meta property="twitter:description" content="We create AI tools that help you work with confidence, reduce stress, and earn what you deserve." />
        <meta property="twitter:image" content="https://interprelab.com/og-image-about.jpg" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://interprelab.com/about" />
      </Helmet>
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-4 cursor-pointer">
            <div className="w-8 h-8 bg-nobel-gold rounded-full flex items-center justify-center text-white font-serif font-bold text-xl shadow-sm">I</div>
            <span className={`font-serif font-bold text-lg tracking-wide transition-opacity ${scrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
              InterpreLab <span className="font-normal text-muted-foreground">About</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-muted-foreground">
            <Link to="/" className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Home</Link>
            <Link to="/contact" className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Contact</Link>
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
          <Link to="/contact" onClick={() => setMenuOpen(false)} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Contact</Link>
          <Link to="/waitlist" onClick={() => setMenuOpen(false)} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Join Waitlist</Link>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none bg-background/30" />
        
        <div className="relative z-10 container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-block mb-4 px-3 py-1 border border-nobel-gold text-nobel-gold text-xs tracking-[0.2em] uppercase font-bold rounded-full backdrop-blur-sm bg-card/30">
                Our Story
              </div>
              <h1 className="font-serif text-5xl md:text-6xl font-medium leading-tight mb-6 text-foreground">
                About <span className="italic text-nobel-gold">InterpreLab</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Built by interpreters who understand your challenges. We create AI tools that help you work with confidence, reduce stress, and earn what you deserve.
              </p>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-nobel-gold" />
                  <span>Houston, Texas</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-nobel-gold" />
                  <span>50+ Team Members</span>
                </div>
              </div>
            </div>
            <div className="relative animate-fade-in-up stagger-1">
              <div className="glass rounded-2xl p-8 border border-border/50">
                <img
                  src="/src/assets/hero-interprelab.jpg"
                  alt="InterpreLab Team"
                  className="w-full rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Mission & Vision */}
        <MissionVision />

        {/* Values */}
        <CoreValues />

        {/* Team */}
        <TeamGrid />

        {/* Company Stats */}
        <CompanyStats />

        {/* CTA Section */}
        <section className="py-24 bg-card/50">
          <div className="container mx-auto px-6">
            <div className="glass rounded-2xl p-12 text-center border border-border/50 max-w-4xl mx-auto animate-fade-in-up">
              <h2 className="font-serif text-4xl font-bold mb-4 text-foreground">Join Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Whether you're an interpreter looking to enhance your skills or an organization 
                seeking interpretation services, we're here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" className="bg-nobel-gold hover:bg-nobel-gold/90 text-white font-medium px-8">
                    Get in Touch
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/waitlist">
                  <Button variant="outline" size="lg" className="border-nobel-gold/50 text-foreground hover:bg-nobel-gold/10 px-8">
                    Join the Waitlist
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

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

export default About;