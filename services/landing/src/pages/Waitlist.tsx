/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Label, Badge } from "@interprelab/ui";
import { Mail, Star, Users, Bell, Menu, X, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { waitlistSchema } from "@/lib/validations";

const Waitlist = () => {
  const { toast } = useToast();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: ""
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validated = waitlistSchema.parse(formData);

      const { error } = await supabase
        .from('waitlist')
        .insert([{
          first_name: validated.firstName,
          last_name: validated.lastName,
          email: validated.email,
        }]);

      if (error) {
        if (error.message.includes('duplicate key')) {
          toast({
            title: "Already Registered",
            description: "This email is already on the waitlist!",
            variant: "destructive",
          });
          return;
        }
        throw error;
      }

      toast({
        title: "Success!",
        description: "You've been added to the waitlist. We'll notify you when we launch!",
      });

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
      });
    } catch (err) {
      const error = err as { errors?: { message: string }[]; message?: string };
      if (error.errors) {
        toast({
          title: "Validation Error",
          description: error.errors[0]?.message || "Please check your input.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: error.message || "Failed to join waitlist. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    "Early access to all InterpreLab products",
    "Exclusive launch pricing and discounts",
    "Priority support and onboarding",
    "Beta testing opportunities",
    "Direct feedback channel to our team"
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-nobel-gold selection:text-white">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-4 cursor-pointer">
            <div className="w-8 h-8 bg-nobel-gold rounded-full flex items-center justify-center text-white font-serif font-bold text-xl shadow-sm">I</div>
            <span className={`font-serif font-bold text-lg tracking-wide transition-opacity ${scrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
              InterpreLab <span className="font-normal text-muted-foreground">Waitlist</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-muted-foreground">
            <Link to="/" className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Home</Link>
            <Link to="/about" className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">About</Link>
            <Link to="/contact" className="px-5 py-2 bg-foreground text-background rounded-full hover:bg-foreground/90 transition-colors shadow-sm cursor-pointer">
              Contact
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
          <Link to="/about" onClick={() => setMenuOpen(false)} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">About</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Contact</Link>
        </div>
      )}

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-background">
        <div className="container mx-auto px-6 text-center">
          <div className="animate-fade-in-up">
            <Badge className="mb-6 bg-nobel-gold/10 text-nobel-gold border-nobel-gold/20 px-4 py-2">
              <Star className="w-4 h-4 mr-2" />
              Early Access
            </Badge>
            <h1 className="font-serif text-5xl md:text-7xl font-medium leading-tight mb-8 text-foreground">
              Join the <span className="italic text-nobel-gold">Waitlist</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Be among the first to experience the future of interpretation technology. 
              Get exclusive early access to InterpreLab's AI-powered platform.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
            {/* Form */}
            <Card className="glass border-border/50 text-left animate-fade-in-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-serif text-2xl text-foreground">
                  <Bell className="w-6 h-6 text-nobel-gold" />
                  Early Access Registration
                </CardTitle>
                <CardDescription className="text-base">
                  Join 5,000+ interpreters already on our waitlist
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-foreground">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                        placeholder="John"
                        className="glass border-border/50 focus:border-nobel-gold/50"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-foreground">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                        placeholder="Doe"
                        className="glass border-border/50 focus:border-nobel-gold/50"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="your.email@example.com"
                        className="pl-11 glass border-border/50 focus:border-nobel-gold/50"
                        required
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-nobel-gold hover:bg-nobel-gold/90 text-white font-medium"
                    disabled={isSubmitting}
                  >
                    <Users className="w-5 h-5 mr-2" />
                    {isSubmitting ? "Joining..." : "Join the Waitlist"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Benefits */}
            <div className="space-y-6 animate-fade-in-up stagger-1">
              <div className="glass rounded-xl p-8 border border-border/50">
                <h3 className="font-serif text-2xl mb-6 text-foreground">What You'll Get</h3>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-1 w-5 h-5 rounded-full bg-nobel-gold/10 flex items-center justify-center flex-shrink-0 border border-nobel-gold/20">
                        <Check className="w-3 h-3 text-nobel-gold" />
                      </div>
                      <span className="text-muted-foreground leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass rounded-xl p-8 border border-border/50 bg-nobel-gold/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-nobel-gold/10 rounded-full flex items-center justify-center border border-nobel-gold/20">
                    <Users className="w-6 h-6 text-nobel-gold" />
                  </div>
                  <div>
                    <div className="font-serif text-3xl font-bold text-nobel-gold">5,000+</div>
                    <div className="text-sm text-muted-foreground">Already Waiting</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Join thousands of interpreters who are ready to transform their practice with AI-powered tools.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-background py-16 mt-20">
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

export default Waitlist;