import { ArrowRight, Heart, TrendingUp, Shield, Clock, AlertTriangle, DollarSign, FileX } from 'lucide-react';
import React from 'react';

export interface DataOverlay {
  stat: string;
  label: string;
  icon: React.ReactNode;
}

export interface PainPointStory {
  id: string;
  videoSrc: string;
  title: string;
  scenario: string;
  emotionalHook: string;
  dataOverlays: DataOverlay[];
  ctaText: string;
  ctaIcon: React.ElementType;
  targetFeature: string;
  emotionalTone: 'urgent' | 'somber' | 'frustrated' | 'determined';
}

export const painPointStories: PainPointStory[] = [
  {
    id: 'terminology-crisis',
    videoSrc: '/videos/emergency-call-crisis.mp4',
    title: 'The Terminology Crisis',
    scenario:
      "Dr. Martinez needs consent for an emergency thoracentesis. The patient is deteriorating rapidly. But what's the exact term in Spanish? Toracocentesis? Punción pleural? Getting this wrong could mean the difference between informed consent and a lawsuit...",
    emotionalHook: 'In critical moments, interpreters have seconds to make decisions that impact lives.',
    dataOverlays: [
      { stat: '⏰ 3 sec', label: 'Decision window', icon: <Clock className="w-5 h-5" /> },
      {
        stat: '73%',
        label: 'Report terminology stress',
        icon: <AlertTriangle className="w-5 h-5" />,
      },
      {
        stat: '$71M',
        label: 'Largest malpractice settlement',
        icon: <DollarSign className="w-5 h-5" />,
      },
    ],
    ctaText: 'Find Out How InterpreCoach Helps',
    ctaIcon: ArrowRight,
    targetFeature: 'interprecoach-section',
    emotionalTone: 'urgent' as const,
  },
  {
    id: 'emotional-toll',
    videoSrc: '/videos/family-passing-news.mp4',
    title: 'The Emotional Toll',
    scenario:
      "'I'm deeply sorry to inform you... your father passed away peacefully at 3:47 AM.' The interpreter feels the family's grief wash over them like a wave. Word by word, they deliver news that shatters a world. Then, 5 minutes later, another call. Another family. Another trauma. But who's there for the interpreter?",
    emotionalHook: 'Interpreters absorb emotional trauma daily. 73% report burnout. Who supports them?',
    dataOverlays: [
      {
        stat: '73%',
        label: 'Burnout rate among interpreters',
        icon: <TrendingUp className="w-5 h-5" />,
      },
      { stat: 'Daily', label: 'Traumatic calls frequency', icon: <Clock className="w-5 h-5" /> },
      {
        stat: '$0',
        label: 'Typical mental health support',
        icon: <DollarSign className="w-5 h-5" />,
      },
    ],
    ctaText: 'Discover InterpreWellness Support',
    ctaIcon: Heart,
    targetFeature: 'wellness-section',
    emotionalTone: 'somber' as const,
  },
  {
    id: 'feedback-gap',
    videoSrc: '/videos/frustrated-feedback-review.mp4',
    title: 'The Feedback Gap',
    scenario:
      "David just completed 50 calls this month. His QA feedback? 'Correct, correct, correct. Additional comments: none.' He wants to improve, to be excellent, but how? Everyone says he's 'fine'... but is fine good enough when lives depend on his words?",
    emotionalHook: "Generic feedback doesn't build excellence. Interpreters deserve better.",
    dataOverlays: [
      { stat: '1 call', label: 'QA reviewed per 4-6 months', icon: <FileX className="w-5 h-5" /> },
      {
        stat: 'Generic',
        label: 'Feedback quality',
        icon: <AlertTriangle className="w-5 h-5" />,
      },
      {
        stat: '$1000s',
        label: 'Cost of quality training',
        icon: <DollarSign className="w-5 h-5" />,
      },
    ],
    ctaText: 'See How We Provide Real Insights',
    ctaIcon: TrendingUp,
    targetFeature: 'qa-feedback-section',
    emotionalTone: 'frustrated' as const,
  },
  {
    id: 'payment-accuracy',
    videoSrc: '/videos/earnings-accuracy-discovery.mp4',
    title: 'Payment Accuracy',
    scenario:
      "Sarah compares her logs: '47 minutes.' Company statement: '45 minutes.' Two minutes, rounded down. Multiply by 20 calls/day × 5 days/week × 52 weeks... Over $2,800 stolen. Just like that. And without her own records, she has no proof.",
    emotionalHook: '2-3 minutes per day = $3,000+ lost per year. Your time deserves accurate tracking.',
    dataOverlays: [
      {
        stat: '2-3 min',
        label: 'Average daily rounding loss',
        icon: <Clock className="w-5 h-5" />,
      },
      {
        stat: '$3,000+',
        label: 'Potential lost earnings (est.)',
        icon: <DollarSign className="w-5 h-5" />,
      },
      {
        stat: 'Zero logs',
        label: 'Most interpreters keep no records',
        icon: <FileX className="w-5 h-5" />,
      },
    ],
    ctaText: 'Take Control with InterpreTrack',
    ctaIcon: Shield,
    targetFeature: 'interpretrack-section',
    emotionalTone: 'determined' as const,
  },
];
