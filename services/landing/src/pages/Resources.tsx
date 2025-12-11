/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Badge } from "@/lib/ui";
import { BookOpen, Video, FileText, Users, ExternalLink, Download, Calendar, Star, Scale, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Resources = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const resources = [
    {
      title: "The Interpreter Dilemma",
      description: "A special interactive report exploring misclassification and wage theft in the medical interpretation industry. Discover the systemic issues affecting interpreters and what can be done.",
      type: "Special Report",
      duration: "15 min read",
      level: "All Levels",
      icon: Scale,
      featured: true,
      href: "/dilemma",
      badge: "Featured",
      delay: "0s"
    },
    {
      title: "Interpretation Techniques Masterclass",
      description: "Advanced techniques for simultaneous and consecutive interpretation",
      type: "Video Course",
      duration: "4 hours",
      level: "Advanced",
      icon: Video,
      featured: false,
      delay: "0.1s"
    },
    {
      title: "Medical Terminology Guide",
      description: "Comprehensive guide to medical interpretation terminology",
      type: "PDF Guide",
      pages: "120 pages",
      level: "Intermediate",
      icon: FileText,
      featured: false,
      delay: "0.2s"
    },
    {
      title: "Legal Interpretation Handbook",
      description: "Essential guide for court and legal interpretation",
      type: "eBook",
      pages: "85 pages",
      level: "Intermediate",
      icon: BookOpen,
      featured: false,
      delay: "0.3s"
    },
    {
      title: "Community of Practice Webinars",
      description: "Monthly webinars with industry experts and peers",
      type: "Live Session",
      duration: "1 hour",
      level: "All Levels",
      icon: Users,
      featured: true,
      delay: "0.4s"
    }
  ];

  const externalResources = [
    {
      title: "National Board of Certification for Medical Interpreters",
      description: "Official certification body for medical interpreters",
      url: "https://www.certifiedmedicalinterpreters.org/",
      organization: "NBCMI",
      delay: "0s"
    },
    {
      title: "Certification Commission for Healthcare Interpreters",
      description: "Professional certification for healthcare interpreters",
      url: "https://www.cchipeaks.org/",
      organization: "CCHI",
      delay: "0.1s"
    },
    {
      title: "International Association of Conference Interpreters",
      description: "Global professional association for conference interpreters",
      url: "https://aiic.org/",
      organization: "AIIC",
      delay: "0.2s"
    },
    {
      title: "Registry of Interpreters for the Deaf",
      description: "Professional organization for ASL interpreters",
      url: "https://www.rid.org/",
      organization: "RID",
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
              InterpreLab <span className="font-normal text-muted-foreground">Resources</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-muted-foreground">
            <Link to="/" className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Home</Link>
            <Link to="/dilemma" className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Dilemma Report</Link>
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
          <Link to="/dilemma" onClick={() => setMenuOpen(false)} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Dilemma Report</Link>
          <Link to="/waitlist" onClick={() => setMenuOpen(false)} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Join Waitlist</Link>
        </div>
      )}

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-background">
        <div className="container mx-auto px-6 text-center">
          <div className="animate-fade-in-up">
            <Badge className="mb-6 bg-nobel-gold/10 text-nobel-gold border-nobel-gold/20 px-4 py-2">
              Professional Development
            </Badge>
            <h1 className="font-serif text-5xl md:text-7xl font-medium leading-tight mb-8 text-foreground">
              Resources & <span className="italic text-nobel-gold">Training</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Access comprehensive training materials, industry resources, and professional 
              development tools to advance your interpretation career.
            </p>
            <Button size="lg" className="bg-nobel-gold hover:bg-nobel-gold/90 text-white font-medium px-8">
              <BookOpen className="w-5 h-5 mr-2" />
              Explore Resources
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-block mb-3 text-xs font-bold tracking-widest text-muted-foreground uppercase">Curated Content</div>
            <h2 className="font-serif text-4xl md:text-5xl mb-6 text-foreground">
              Featured Training Materials
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Curated content designed by industry experts to enhance your 
              interpretation skills and professional knowledge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {resources.map((resource, index) => (
              <Card 
                key={index} 
                className={`glass border-border/50 hover:border-nobel-gold/50 transition-all duration-300 animate-fade-in-up ${
                  resource.featured ? 'ring-2 ring-nobel-gold/20' : ''
                }`}
                style={{ animationDelay: resource.delay }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-nobel-gold/10 rounded-lg border border-nobel-gold/20">
                        <resource.icon className="w-6 h-6 text-nobel-gold" />
                      </div>
                      <div>
                        <Badge variant={resource.featured ? "default" : "secondary"} className={resource.featured ? "bg-nobel-gold/10 text-nobel-gold border-nobel-gold/20" : ""}>
                          {resource.type}
                        </Badge>
                        {resource.featured && (
                          <Badge className="ml-2 bg-amber-500/10 text-amber-500 border-amber-500/20">
                            <Star className="w-3 h-3 mr-1" />
                            {resource.badge || 'Featured'}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <CardTitle className="font-serif text-xl mt-4 text-foreground">{resource.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {resource.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{resource.duration || resource.pages}</span>
                      <span>•</span>
                      <span>{resource.level}</span>
                    </div>
                    {resource.href ? (
                      <Link to={resource.href}>
                        <Button variant="outline" size="sm" className="border-nobel-gold/50 hover:bg-nobel-gold/10">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Report
                        </Button>
                      </Link>
                    ) : (
                      <Button variant="outline" size="sm" className="border-nobel-gold/50 hover:bg-nobel-gold/10">
                        <Download className="w-4 h-4 mr-2" />
                        Access
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* External Resources */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-block mb-3 text-xs font-bold tracking-widest text-muted-foreground uppercase">Professional Organizations</div>
            <h2 className="font-serif text-4xl md:text-5xl mb-6 text-foreground">
              Industry Organizations & Certifications
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Connect with professional organizations and pursue industry-recognized 
              certifications to advance your career.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {externalResources.map((resource, index) => (
              <Card 
                key={index} 
                className="glass border-border/50 hover:border-nobel-gold/50 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: resource.delay }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="border-nobel-gold/50 text-nobel-gold">{resource.organization}</Badge>
                    <ExternalLink className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <CardTitle className="font-serif text-lg text-foreground">{resource.title}</CardTitle>
                  <CardDescription className="leading-relaxed">
                    {resource.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="w-full justify-start p-0 hover:text-nobel-gold" asChild>
                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                      Visit Website
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-6">
          <div className="glass rounded-2xl p-12 text-center border border-border/50 max-w-4xl mx-auto animate-fade-in-up">
            <div className="w-16 h-16 bg-nobel-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-nobel-gold/20">
              <Calendar className="w-8 h-8 text-nobel-gold" />
            </div>
            <h2 className="font-serif text-4xl font-bold mb-4 text-foreground">Stay Updated</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Get the latest resources, industry insights, and training materials 
              delivered to your inbox monthly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg glass border border-border/50 focus:outline-none focus:ring-2 focus:ring-nobel-gold/20 focus:border-nobel-gold/50 text-foreground"
              />
              <Button size="lg" className="bg-nobel-gold hover:bg-nobel-gold/90 text-white">
                Subscribe
              </Button>
            </div>
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

export default Resources;