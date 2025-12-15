import {
  TrendingUp, Users, Bookmark, MessageCircle, BookOpen, HelpCircle, Video, Network, Briefcase, LucideIcon
} from "lucide-react";

export interface SidebarItem {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  badge?: string;
  badgeColor?: string;
}

export const sidebarSections = [
  {
    title: "FEED",
    items: [
      { icon: TrendingUp, label: "Trending", active: true },
      { icon: Users, label: "Following" },
      { icon: Bookmark, label: "Saved Posts" },
    ] as SidebarItem[]
  },
  {
    title: "TOPICS",
    items: [
      { icon: MessageCircle, label: "All Discussions" },
      { icon: Users, label: "Day-to-Day Stories" },
      { icon: BookOpen, label: "Best Practices" },
      { icon: BookOpen, label: "Terminology Tips" },
      { icon: HelpCircle, label: "Ask the Community" },
      { icon: Video, label: "Reels & Videos" }
    ] as SidebarItem[]
  },
  {
    title: "OPPORTUNITIES",
    items: [
      { icon: Network, label: "InterpreLinks", badge: "3", badgeColor: "bg-destructive" },
      { icon: Briefcase, label: "Jobs Board" }
    ] as SidebarItem[]
  }
];

export const reels = [
  {
    id: 1,
    author: "Alex Thompson",
    avatar: "AT",
    title: "Day in the life: Hospital Interpreter",
    views: "2.3K",
    thumbnail: "/placeholder-reel1.jpg"
  },
  {
    id: 2,
    author: "Nina Patel",
    avatar: "NP",
    title: "5 phrases every interpreter should know",
    views: "5.1K",
    thumbnail: "/placeholder-reel2.jpg"
  },
  {
    id: 3,
    author: "Carlos Ruiz",
    avatar: "CR",
    title: "Handling difficult terminology on the spot",
    views: "3.8K",
    thumbnail: "/placeholder-reel3.jpg"
  }
];

export const trendingTopics = ["#MedicalTerminology", "#InterpreterLife", "#BestPractices", "#ERStories"];

export const suggestedConnections = [
  { name: "Dr. Lisa Wong", role: "Hospital Coordinator", avatar: "LW" },
  { name: "Miguel Santos", role: "Legal Interpreter", avatar: "MS" },
  { name: "Emma Johnson", role: "Community Interpreter", avatar: "EJ" }
];
