/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Plus, MessageCircle, Heart, Share, MoreHorizontal, Users, BookOpen, HelpCircle, Briefcase, Network, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function InterpreHub() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const discussions = [
    {
      id: 1,
      author: "Ana Silva",
      role: "Hospital Interpreter - CMI",
      avatar: "AS",
      avatarColor: "bg-nobel-gold",
      timeAgo: "2 hours ago",
      title: "Handling complex terminology on the fly?",
      content: "Just had a challenging session involving rare genetic disorders during a telehealth consult. The terminology was intense! How do you all prepare for or handle unexpected, highly specialized terms during a live interpretation? Any favorite quick-reference tools or techniques, especially when remote? My online glossary helps, but speed is crucial.",
      likes: 3,
      replies: 0,
      category: "Best Practices"
    },
    {
      id: 2,
      author: "Ben Carter",
      role: "ER Interpreter",
      avatar: "BC",
      avatarColor: "bg-success",
      timeAgo: "1 hour ago",
      title: "",
      content: "Great question, Ana! Happens all the time in the ER. For those moments, I sometimes use a 'placeholder' technique if the context allows. I'll interpret the concept generally (\"a condition affecting the blood\") and make a note to clarify or look up the precise term (like 'thrombocytopenia') immediately after for documentation or follow-up. Building specialty-specific glossaries beforehand is a lifesaver too.",
      likes: 5,
      replies: 0,
      isReply: true,
      category: "Best Practices"
    },
    {
      id: 3,
      author: "Chloe Garcia",
      role: "Oncology Interpreter",
      avatar: "CG",
      avatarColor: "bg-warning",
      timeAgo: "45 minutes ago",
      title: "",
      content: "Adding to Ben's point - requesting clarification is often the *best* practice in medical settings",
      likes: 0,
      replies: 0,
      isReply: true,
      category: "Best Practices"
    }
  ];

  const sidebarSections = [
    {
      title: "TOPICS",
      items: [
        { icon: MessageCircle, label: "All Discussions", active: true },
        { icon: Users, label: "Day-to-Day Spot" },
        { icon: BookOpen, label: "Best Practices" },
        { icon: BookOpen, label: "Terminology & Glossaries" },
        { icon: HelpCircle, label: "Ask the Community" },
        { icon: Users, label: "Professional Development" }
      ]
    },
    {
      title: "OPPORTUNITIES",
      items: [
        { icon: Network, label: "Networking Requests", badge: "3", badgeColor: "bg-destructive" },
        { icon: Briefcase, label: "Jobs Board" }
      ]
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
              InterpreLab <span className="font-normal text-muted-foreground">Hub</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-muted-foreground">
            <Link to="/" className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Home</Link>
            <Link to="/resources" className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Resources</Link>
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
          <Link to="/resources" onClick={() => setMenuOpen(false)} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Resources</Link>
          <Link to="/waitlist" onClick={() => setMenuOpen(false)} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Join Waitlist</Link>
        </div>
      )}

      <div className="flex pt-20">
        {/* Sidebar */}
        <div className="hidden lg:block w-72 bg-card/50 min-h-screen p-6 border-r border-border/50">
          <div className="mb-8">
            <h1 className="font-serif text-2xl font-bold mb-2 text-foreground">InterpreLab Hub</h1>
          </div>

          <div className="space-y-8">
            {sidebarSections.map((section, index) => (
              <div key={index}>
                <h3 className="text-sm font-semibold text-muted-foreground mb-4 tracking-wider">
                  {section.title}
                </h3>
                <div className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                        item.active
                          ? "bg-nobel-gold/10 text-nobel-gold border border-nobel-gold/20"
                          : "text-muted-foreground hover:bg-card hover:text-foreground"
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="text-sm font-medium flex-1">{item.label}</span>
                      {item.badge && (
                        <Badge variant="destructive" className="text-xs px-2 py-0.5">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8 animate-fade-in-up">
              <h1 className="font-serif text-4xl md:text-5xl font-medium mb-4 text-foreground">
                Medical Interpreters' <span className="italic text-nobel-gold">Hub</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                Connect, share challenges, and discuss best practices in medical interpreting.
              </p>

              {/* Search and New Discussion */}
              <div className="flex gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search discussions..."
                    className="pl-10 glass border-border/50 focus:border-nobel-gold/50"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="default" className="flex items-center gap-2 bg-nobel-gold hover:bg-nobel-gold/90 text-white">
                  <Plus className="w-4 h-4" />
                  New Discussion
                </Button>
              </div>
            </div>

            {/* Discussions */}
            <div className="space-y-6">
              {discussions.map((discussion, index) => (
                <Card 
                  key={discussion.id} 
                  className={`glass border-border/50 hover:border-nobel-gold/50 transition-all duration-300 animate-fade-in-up ${discussion.isReply ? "ml-12" : ""}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className={discussion.avatarColor}>
                          {discussion.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">{discussion.author}</h3>
                          <span className="text-sm text-muted-foreground">
                            ({discussion.role})
                          </span>
                          <span className="text-sm text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">
                            {discussion.timeAgo}
                          </span>
                        </div>
                        {discussion.title && (
                          <h2 className="font-serif text-lg font-semibold mb-3 text-foreground">{discussion.title}</h2>
                        )}
                      </div>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground mb-4 leading-relaxed">
                      {discussion.content}
                    </p>
                    <div className="flex items-center gap-6">
                      <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:text-nobel-gold">
                        Reply
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:text-nobel-gold">
                        <Heart className="w-4 h-4" />
                        Like ({discussion.likes})
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:text-nobel-gold">
                        <Share className="w-4 h-4" />
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

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
}