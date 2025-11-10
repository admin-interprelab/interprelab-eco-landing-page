import {
  Bot,
  GraduationCap,
  BookOpen,
  BarChart3,
  Users,
  Headphones,
  FileText,
  Video,
  MessageSquare,
  TrendingUp
} from 'lucide-react';
import { MegaMenuSection } from '@/types/navigation';

export const megaMenuSections: MegaMenuSection[] = [
  {
    title: 'AI-Powered Assessment',
    description: 'Advanced tools for interpretation evaluation and feedback',
    tools: [
      {
        name: 'InterpreBot',
        description: 'AI-powered interpretation assessment with real-time feedback',
        icon: Bot,
        href: '/interprebot',
        preview: 'Try our demo →',
        status: 'available',
        category: 'assessment'
      },
      {
        name: 'InterpreCoach',
        description: 'Personalized coaching sessions with AI-driven insights',
        icon: GraduationCap,
        href: '/interprecoach',
        preview: 'Start coaching →',
        status: 'beta',
        category: 'training'
      }
    ],
    quickActions: [
      {
        label: 'View Assessment Reports',
        href: '/dashboard/assessments',
        icon: FileText
      },
      {
        label: 'Schedule Practice Session',
        href: '/dashboard/practice',
        icon: Video
      }
    ]
  },
  {
    title: 'Learning & Development',
    description: 'Comprehensive training resources and skill development',
    tools: [
      {
        name: 'InterpreStudy',
        description: 'Interactive study materials and practice exercises',
        icon: BookOpen,
        href: '/interprestudy',
        preview: 'Browse materials →',
        status: 'available',
        category: 'training'
      },
      {
        name: 'InterpreTrack',
        description: 'Progress tracking and performance analytics',
        icon: BarChart3,
        href: '/interpretrack',
        preview: 'View progress →',
        status: 'available',
        category: 'tracking'
      }
    ],
    quickActions: [
      {
        label: 'Latest Study Materials',
        href: '/resources/latest',
        icon: BookOpen
      },
      {
        label: 'Performance Dashboard',
        href: '/dashboard/performance',
        icon: TrendingUp
      }
    ]
  },
  {
    title: 'Live Support & Community',
    description: 'Real-time assistance and professional networking',
    tools: [
      {
        name: 'InterpreLink',
        description: 'Connect with professional interpreters for live support',
        icon: Users,
        href: '/interprelink',
        preview: 'Connect now →',
        status: 'beta',
        category: 'live-assistance'
      }
    ],
    quickActions: [
      {
        label: 'Join Community Forum',
        href: '/community',
        icon: MessageSquare
      },
      {
        label: 'Find Mentors',
        href: '/mentors',
        icon: Users
      },
      {
        label: 'Live Support Chat',
        href: '/support/chat',
        icon: Headphones
      }
    ]
  }
];
