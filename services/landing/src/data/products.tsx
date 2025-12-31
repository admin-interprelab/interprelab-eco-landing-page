import { Brain, Chrome, GraduationCap, Users, Shield } from "lucide-react";
import React from 'react';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  features: string[];
  icon: React.ElementType;
  link: string;
  cta: string;
}

export const products: Product[] = [
  {
    id: "interprebot",
    name: "InterpreBot",
    tagline: "Skills Assessment",
    features: [
      "Discover your weak spots instantly",
      "Get detailed grammar feedback in seconds",
      "Follow a custom plan designed for your goals"
    ],
    icon: Brain,
    link: "/interprebot",
    cta: "Take Assessment"
  },
  {
    id: "interprecoach",
    name: "InterpreCoach",
    tagline: "Real-Time Assistant",
    features: [
      "Never forget a medical term mid-session",
      "Sound more confident with voice coaching",
      "Auto-capture key points while you focus on interpreting"
    ],
    icon: Chrome,
    link: "/interprecoach",
    cta: "Install Extension"
  },
  {
    id: "interprestudy",
    name: "InterpreStudy",
    tagline: "Interactive Training",
    features: [
      "Practice real scenarios before they happen",
      "Master difficult conversations with confidence",
      "Protect your mental health from daily trauma"
    ],
    icon: GraduationCap,
    link: "/interprestudy",
    cta: "Start Learning"
  },
  {
    id: "interprelink",
    name: "InterpreLink",
    tagline: "Community Network",
    features: [
      "Connect with interpreters who understand you",
      "Find better-paying opportunities",
      "Practice together and grow faster"
    ],
    icon: Users,
    link: "/interprelink",
    cta: "Join Community"
  },
  {
    id: "interpretrack",
    name: "InterpreTrack",
    tagline: "Earnings Protection",
    features: [
      "Never lose track of billable minutes again",
      "See exactly what you've earned in real-time",
      "Generate professional invoices instantly"
    ],
    icon: Shield,
    link: "/interpretrack",
    cta: "Start Tracking"
  }
];
