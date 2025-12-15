import { BookOpen, Video, FileText, Users, Scale } from "lucide-react";

export const featuredResources = [
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

export const externalResources = [
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
