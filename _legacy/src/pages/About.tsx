/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Target, Award, Heart, Globe, ArrowRight, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const values = [
    {
      icon: Target,
      title: "Precision",
      description: "We believe every word matters in interpretation, and our technology reflects this commitment to accuracy.",
      delay: "0s"
    },
    {
      icon: Heart,
      title: "Empathy",
      description: "Understanding the human element in communication drives everything we build and every decision we make.",
      delay: "0.1s"
    },
    {
      icon: Globe,
      title: "Accessibility",
      description: "Breaking down language barriers to make essential services accessible to everyone, everywhere.",
      delay: "0.2s"
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Continuous improvement and innovation in interpretation technology and professional development.",
      delay: "0.3s"
    }
  ];

  const teamMembers = [
    {
      name: "Dr. Maria Rodriguez",
      role: "Founder & CEO",
      background: "Former court interpreter with 15+ years experience, PhD in Applied Linguistics",
      specialization: "AI in Language Processing",
      delay: "0s"
    },
    {
      name: "David Chen",
      role: "CTO",
      background: "Former Google engineer, expert in machine learning and natural language processing",
      specialization: "AI Architecture",
      delay: "0.1s"
    },
    {
      name: "Sarah Ahmed",
      role: "Head of Clinical Affairs",
      background: "Certified medical interpreter, healthcare administration background",
      specialization: "Healthcare Interpretation",
      delay: "0.2s"
    },
    {
      name: "Carlos Mendoza",
      role: "Director of Training",
      background: "Conference interpreter, former training director at major interpretation agency",
      specialization: "Professional Development",
      delay: "0.3s"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-nobel-gold selection:text-white">
      
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
                Founded by interpreters, for interpreters. We're on a mission to revolutionize 
                the interpretation industry through innovative AI technology and comprehensive 
                professional development.
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
        <section className="py-24 bg-card/50">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <Card className="glass border-border/50 p-8 hover:border-nobel-gold/50 transition-all duration-300 animate-fade-in-up">
                <CardHeader>
                  <CardTitle className="font-serif text-3xl mb-4 text-foreground">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    To empower interpreters worldwide with cutting-edge AI technology that enhances 
                    their skills, improves accuracy, and ensures equitable access to essential 
                    services across language barriers.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass border-border/50 p-8 hover:border-nobel-gold/50 transition-all duration-300 animate-fade-in-up stagger-1">
                <CardHeader>
                  <CardTitle className="font-serif text-3xl mb-4 text-foreground">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    A world where language is never a barrier to accessing healthcare, justice, 
                    education, or any essential service, powered by the perfect collaboration 
                    between human expertise and artificial intelligence.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 animate-fade-in-up">
              <div className="inline-block mb-3 text-xs font-bold tracking-widest text-muted-foreground uppercase">Core Values</div>
              <h2 className="font-serif text-4xl md:text-5xl mb-6 text-foreground">
                What Drives Us
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                These principles guide every decision we make and every product we build.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card 
                  key={index} 
                  className="glass border-border/50 hover:border-nobel-gold/50 transition-all duration-300 text-center animate-fade-in-up"
                  style={{ animationDelay: value.delay }}
                >
                  <CardHeader>
                    <div className="w-16 h-16 bg-nobel-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-nobel-gold/20">
                      <value.icon className="w-8 h-8 text-nobel-gold" />
                    </div>
                    <CardTitle className="font-serif text-xl text-foreground">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-24 bg-card/50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 animate-fade-in-up">
              <div className="inline-block mb-3 text-xs font-bold tracking-widest text-muted-foreground uppercase">Leadership</div>
              <h2 className="font-serif text-4xl md:text-5xl mb-6 text-foreground">
                Meet Our Team
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Experienced interpreters and technology experts working together to 
                advance the interpretation profession.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {teamMembers.map((member, index) => (
                <Card 
                  key={index} 
                  className="glass border-border/50 hover:border-nobel-gold/50 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: member.delay }}
                >
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center border-2 border-nobel-gold/20">
                        <span className="text-white font-bold text-lg font-serif">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <CardTitle className="font-serif text-xl text-foreground">{member.name}</CardTitle>
                        <Badge className="mt-1 bg-nobel-gold/10 text-nobel-gold border-nobel-gold/20">{member.role}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-3 leading-relaxed">{member.background}</p>
                    <Badge className="bg-primary/10 text-primary border-primary/20">
                      {member.specialization}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Company Stats */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="animate-fade-in-up">
                <div className="text-5xl font-bold text-nobel-gold mb-2 font-serif">10,000+</div>
                <div className="text-muted-foreground">Interpreters Trained</div>
              </div>
              <div className="animate-fade-in-up stagger-1">
                <div className="text-5xl font-bold text-nobel-gold mb-2 font-serif">50+</div>
                <div className="text-muted-foreground">Language Pairs</div>
              </div>
              <div className="animate-fade-in-up stagger-2">
                <div className="text-5xl font-bold text-nobel-gold mb-2 font-serif">95%</div>
                <div className="text-muted-foreground">Accuracy Improvement</div>
              </div>
              <div className="animate-fade-in-up stagger-3">
                <div className="text-5xl font-bold text-nobel-gold mb-2 font-serif">24/7</div>
                <div className="text-muted-foreground">Support Available</div>
              </div>
            </div>
          </div>
        </section>

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