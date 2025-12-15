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
      "AI-powered linguistic analysis",
      "Grammar & syntax feedback",
      "Personalized learning paths"
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
      "Live terminology support",
      "Voice & pitch regulation",
      "Automatic note-taking"
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
      "Role-play simulations",
      "DCS Schema training",
      "Vicarious Trauma management"
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
      "Professional forums",
      "Job board access",
      "Mock practice groups"
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
      "Automated call logging",
      "Earnings calculator",
      "PDF/Excel export"
    ],
    icon: Shield,
    link: "/interpretrack",
    cta: "Start Tracking"
  }
];
