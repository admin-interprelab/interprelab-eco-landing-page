export interface PricingFeature {
  text: string;
}

export interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  cta: string;
  ctaLink: string;
  variant: 'default' | 'popular' | 'enterprise';
}

export const pricingTiers: PricingTier[] = [
  {
    id: 'free',
    name: 'Free Starter',
    description: 'Essential tools for beginners',
    price: '$0',
    period: '/ month',
    features: [
      "1 AI Assessment per month (Bot)",
      "Basic InterpreCoach (Limited)",
      "Community Access (Read-only)",
      "Basic Call Tracking (50 calls/mo)",
      "Standard Terminology Lookup"
    ],
    cta: 'Get Started',
    ctaLink: '/signin',
    variant: 'default'
  },
  {
    id: 'premium',
    name: 'InterpreLab Premium',
    description: 'All-access pass to AI mastery',
    price: '$29',
    period: '/ month',
    features: [
      "Unlimited AI Assessments",
      "InterpreCoach Pro Extension",
      "Advanced Analytics Dashboard",
      "Priority Job Board Access",
      "Weekly Live Group Practice",
      "Full InterpreLink Access",
      "Unlimited Call Tracking"
    ],
    cta: 'Start Free Trial',
    ctaLink: '/waitlist',
    variant: 'popular'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For LSCs & Healthcare Orgs',
    price: 'Custom',
    period: 'pricing',
    features: [
      "All Premium Features",
      "Admin & Manager Dashboard",
      "Bulk License Management",
      "Custom Vocabulary Sets",
      "API Access for Integrations",
      "Dedicated Success Manager",
      "SLA & Priority Support"
    ],
    cta: 'Contact Sales',
    ctaLink: '/contact',
    variant: 'enterprise'
  }
];

export interface CourseDetails {
  title: string;
  subtitle: string;
  description: string;
  price: string;
  paymentType: string;
  curriculum: string[];
  status: 'open' | 'closed' | 'coming-soon';
  availabilityText: string;
}

export const certificationCourse: CourseDetails = {
  title: '40-60hr Medical Course',
  subtitle: 'NBCMI & CCHI Approved Prerequisite',
  description: 'A complete, self-paced training program designed to meet all national certification prerequisites. Includes role-plays, ethics, and terminology.',
  price: '$499',
  paymentType: 'one-time payment',
  curriculum: [
    "Comprehensive Medical Terminology (Body Systems)",
    "Standards of Practice & Code of Ethics",
    "Interactive Role-Play & Video Scenarios",
    "Final Proctored Exam & Digital Certificate",
    "Lifetime Access to Course Material",
    "Bonus: 3 Months of InterpreLab Premium"
  ],
  status: 'coming-soon',
  availabilityText: 'Coming Late 2025'
};
