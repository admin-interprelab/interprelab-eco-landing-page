/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Label, Textarea, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/lib/ui";
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { contactSchema } from "@/lib/validations";

const Contact = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    inquiryType: "",
    message: ""
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
      const validated = contactSchema.parse({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        organization: formData.organization,
        inquiryType: formData.inquiryType,
        message: formData.message,
      });

      const { error } = await supabase
        .from('contacts')
        .insert([{
          user_id: user?.id || null,
          name: validated.name,
          email: validated.email,
          phone: validated.phone || null,
          organization: validated.organization || null,
          inquiry_type: validated.inquiryType,
          message: validated.message,
        }]);

      if (error) throw error;

      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        organization: "",
        inquiryType: "",
        message: "",
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
          description: error.message || "Failed to send message. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-nobel-gold selection:text-white">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-4 cursor-pointer">
            <div className="w-8 h-8 bg-nobel-gold rounded-full flex items-center justify-center text-white font-serif font-bold text-xl shadow-sm">I</div>
            <span className={`font-serif font-bold text-lg tracking-wide transition-opacity ${scrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
              InterpreLab <span className="font-normal text-muted-foreground">Contact</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-muted-foreground">
            <Link to="/" className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Home</Link>
            <Link to="/about" className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">About</Link>
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
          <Link to="/about" onClick={() => setMenuOpen(false)} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">About</Link>
          <Link to="/waitlist" onClick={() => setMenuOpen(false)} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Join Waitlist</Link>
        </div>
      )}

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-background">
        <div className="container mx-auto px-6 text-center">
          <div className="animate-fade-in-up">
            <div className="inline-block mb-4 px-3 py-1 border border-nobel-gold text-nobel-gold text-xs tracking-[0.2em] uppercase font-bold rounded-full backdrop-blur-sm bg-card/30">
              Contact Us
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-medium leading-tight mb-8 text-foreground">
              Get in <span className="italic text-nobel-gold">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Have questions about our services? Want to discuss a partnership? 
              We'd love to hear from you and explore how we can help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="glass border-border/50 animate-fade-in-up">
                <CardHeader>
                  <CardTitle className="font-serif text-3xl flex items-center gap-2 text-foreground">
                    <MessageSquare className="w-7 h-7 text-nobel-gold" />
                    Send us a message
                  </CardTitle>
                  <p className="text-muted-foreground mt-2">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-foreground">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Your full name"
                          className="glass border-border/50 focus:border-nobel-gold/50"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-foreground">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="your.email@example.com"
                          className="glass border-border/50 focus:border-nobel-gold/50"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="+1 (555) 123-4567"
                          className="glass border-border/50 focus:border-nobel-gold/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="organization" className="text-foreground">Organization</Label>
                        <Input
                          id="organization"
                          value={formData.organization}
                          onChange={(e) => handleInputChange("organization", e.target.value)}
                          placeholder="Your organization name"
                          className="glass border-border/50 focus:border-nobel-gold/50"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="inquiryType" className="text-foreground">Type of Inquiry *</Label>
                      <Select value={formData.inquiryType} onValueChange={(value) => handleInputChange("inquiryType", value)}>
                        <SelectTrigger className="glass border-border/50">
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Information</SelectItem>
                          <SelectItem value="demo">Request Demo</SelectItem>
                          <SelectItem value="partnership">Partnership Opportunities</SelectItem>
                          <SelectItem value="training">Training Programs</SelectItem>
                          <SelectItem value="technical">Technical Support</SelectItem>
                          <SelectItem value="pricing">Pricing & Plans</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-foreground">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Tell us about your needs, questions, or how we can help..."
                        rows={6}
                        className="glass border-border/50 focus:border-nobel-gold/50"
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full bg-nobel-gold hover:bg-nobel-gold/90 text-white font-medium"
                      disabled={isSubmitting}
                    >
                      <Send className="w-5 h-5 mr-2" />
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="glass border-border/50 animate-fade-in-up stagger-1">
                <CardHeader>
                  <CardTitle className="font-serif text-xl text-foreground">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-nobel-gold/10 rounded-full flex items-center justify-center flex-shrink-0 border border-nobel-gold/20">
                      <MapPin className="w-5 h-5 text-nobel-gold" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">Address</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        1234 Innovation Drive<br />
                        Houston, TX 77002<br />
                        United States
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-nobel-gold/10 rounded-full flex items-center justify-center flex-shrink-0 border border-nobel-gold/20">
                      <Phone className="w-5 h-5 text-nobel-gold" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">Phone</p>
                      <p className="text-sm text-muted-foreground">
                        +1 (713) 555-0123
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-nobel-gold/10 rounded-full flex items-center justify-center flex-shrink-0 border border-nobel-gold/20">
                      <Mail className="w-5 h-5 text-nobel-gold" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">Email</p>
                      <p className="text-sm text-muted-foreground">
                        admin.ceo@interprelab.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-nobel-gold/10 rounded-full flex items-center justify-center flex-shrink-0 border border-nobel-gold/20">
                      <Clock className="w-5 h-5 text-nobel-gold" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">Business Hours</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Monday - Friday: 9:00 AM - 6:00 PM CST<br />
                        Saturday: 10:00 AM - 2:00 PM CST<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border-border/50 bg-nobel-gold/5 animate-fade-in-up stagger-2">
                <CardHeader>
                  <CardTitle className="font-serif text-xl text-foreground">Quick Response</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    For urgent inquiries or immediate assistance, please call us directly 
                    during business hours. We typically respond to emails within 24 hours.
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-2 bg-nobel-gold/10 text-nobel-gold border border-nobel-gold/20 rounded-full text-sm font-medium">
                    Average response time: 4 hours
                  </div>
                </CardContent>
              </Card>
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

export default Contact;