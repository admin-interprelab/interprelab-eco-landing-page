/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Brain, Target, BarChart, Users, ArrowRight, Play, MessageSquare, CheckCircle, TrendingUp, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const InterpreBot = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userQuestion, setUserQuestion] = useState("");
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const commonQuestions = [
    "How does the assessment work?",
    "What skills does InterpreBot measure?",
    "How long does the assessment take?",
    "How do I get personalized training?",
    "What languages are supported?",
  ];

  const features = [
    {
      icon: Brain,
      title: "Cognitive Analysis",
      description: "Assess cognitive load, processing speed, and mental agility during interpretation.",
      delay: "0s"
    },
    {
      icon: Target,
      title: "Accuracy Metrics",
      description: "Measure precision in terminology, context preservation, and cultural adaptation.",
      delay: "0.1s"
    },
    {
      icon: BarChart,
      title: "Performance Tracking",
      description: "Monitor progress with detailed analytics and improvement suggestions.",
      delay: "0.2s"
    },
    {
      icon: Users,
      title: "Peer Comparison",
      description: "Compare your performance with industry standards and peer benchmarks.",
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
              InterpreLab <span className="font-normal text-muted-foreground">InterpreBot</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-muted-foreground">
            <Link to="/" className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Home</Link>
            <Link to="/interprecoach" className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">InterpreCoach</Link>
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
          <Link to="/interprecoach" onClick={() => setMenuOpen(false)} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">InterpreCoach</Link>
          <Link to="/waitlist" onClick={() => setMenuOpen(false)} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Join Waitlist</Link>
        </div>
      )}

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-background">
        <div className="container mx-auto px-6 text-center">
          <div className="animate-fade-in-up">
            <Badge className="mb-6 bg-nobel-gold/10 text-nobel-gold border-nobel-gold/20 px-4 py-2">
              AI-Powered Assessment
            </Badge>
            <h1 className="font-serif text-5xl md:text-7xl font-medium leading-tight mb-8 text-foreground">
              Interpre<span className="italic text-nobel-gold">Bot</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Get instant AI-powered assessment of your interpretation skills with detailed feedback on accuracy, fluency, and medical terminology.
            </p>
          </div>

          {/* Q&A Interface */}
          <Card className="glass border-border/50 max-w-2xl mx-auto mb-12 animate-fade-in-up stagger-1">
            <CardHeader>
              <CardTitle className="font-serif text-2xl flex items-center gap-2 justify-center text-foreground">
                <MessageSquare className="w-6 h-6 text-nobel-gold" />
                Ask InterpreBot
              </CardTitle>
              <CardDescription className="text-base">
                Select a question or ask your own
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask me anything about InterpreBot..."
                  value={userQuestion}
                  onChange={(e) => setUserQuestion(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') setShowChat(true);
                  }}
                  className="glass border-border/50 focus:border-nobel-gold/50"
                />
                <Button onClick={() => setShowChat(true)} className="bg-nobel-gold hover:bg-nobel-gold/90 text-white">Ask</Button>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground text-left">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {commonQuestions.map((q) => (
                    <Button
                      key={q}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setUserQuestion(q);
                        setShowChat(true);
                      }}
                      className="text-xs border-nobel-gold/30 hover:bg-nobel-gold/10"
                    >
                      {q}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up stagger-2">
            <Button size="lg" className="bg-nobel-gold hover:bg-nobel-gold/90 text-white font-medium px-8">
              <Play className="w-5 h-5 mr-2" />
              Take the Assessment
            </Button>
            <Link to="/interprecoach">
              <Button variant="outline" size="lg" className="border-nobel-gold/50 hover:bg-nobel-gold/10 px-8">
                Meet InterpreCoach
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-block mb-3 text-xs font-bold tracking-widest text-muted-foreground uppercase">Assessment Metrics</div>
            <h2 className="font-serif text-4xl md:text-5xl mb-6 text-foreground">
              What We Measure
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Comprehensive analysis of linguistics, terminology, and communication effectiveness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="glass border-border/50 hover:border-nobel-gold/50 transition-all duration-300 animate-fade-in-up"
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
              Your path to improved interpretation skills
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {/* Step 1 */}
              <div className="flex gap-8 items-start animate-fade-in-up">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-nobel-gold/10 rounded-full flex items-center justify-center border-2 border-nobel-gold/20">
                    <span className="text-2xl font-bold font-serif text-nobel-gold">1</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Play className="w-6 h-6 text-nobel-gold" />
                    <h3 className="font-serif text-2xl text-foreground">Take the Assessment</h3>
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Complete a 30-minute comprehensive assessment covering various interpretation scenarios in your target language pair.
                  </p>
                  <Button className="bg-nobel-gold hover:bg-nobel-gold/90 text-white">
                    Start Assessment
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
                    <BarChart className="w-6 h-6 text-nobel-gold" />
                    <h3 className="font-serif text-2xl text-foreground">Get Your Metrics</h3>
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Receive instant AI analysis with detailed scores on accuracy, fluency, medical terminology, and cultural competence.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="glass p-4 text-center border-nobel-gold/20">
                      <p className="text-sm text-muted-foreground mb-1">Accuracy</p>
                      <p className="text-2xl font-bold font-serif text-nobel-gold">92%</p>
                    </Card>
                    <Card className="glass p-4 text-center border-nobel-gold/20">
                      <p className="text-sm text-muted-foreground mb-1">Fluency</p>
                      <p className="text-2xl font-bold font-serif text-nobel-gold">88%</p>
                    </Card>
                    <Card className="glass p-4 text-center border-nobel-gold/20">
                      <p className="text-sm text-muted-foreground mb-1">Terminology</p>
                      <p className="text-2xl font-bold font-serif text-nobel-gold">85%</p>
                    </Card>
                    <Card className="glass p-4 text-center border-nobel-gold/20">
                      <p className="text-sm text-muted-foreground mb-1">Cultural</p>
                      <p className="text-2xl font-bold font-serif text-nobel-gold">90%</p>
                    </Card>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-8 items-start animate-fade-in-up stagger-2">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-nobel-gold/10 rounded-full flex items-center justify-center border-2 border-nobel-gold/20">
                    <span className="text-2xl font-bold font-serif text-nobel-gold">3</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <TrendingUp className="w-6 h-6 text-nobel-gold" />
                    <h3 className="font-serif text-2xl text-foreground">Get Personalized Training</h3>
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Access a customized training path based on your assessment results, focusing on your areas for improvement.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-nobel-gold" />
                      <span className="text-sm text-muted-foreground">Custom practice exercises</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-nobel-gold" />
                      <span className="text-sm text-muted-foreground">Targeted terminology drills</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-nobel-gold" />
                      <span className="text-sm text-muted-foreground">Progress tracking dashboard</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12 animate-fade-in-up stagger-3">
            <Button size="lg" className="bg-nobel-gold hover:bg-nobel-gold/90 text-white font-medium px-8">
              <Play className="w-5 h-5 mr-2" />
              Start Your Journey Now
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

export default InterpreBot;
