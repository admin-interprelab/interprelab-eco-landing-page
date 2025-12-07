import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, ThumbsUp, ThumbsDown, MessageCircle, ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'products' | 'pricing' | 'technical' | 'privacy' | 'support';
}

const faqData: FAQItem[] = [
  // General
  {
    id: 'q1',
    question: 'What is InterpreLab?',
    answer:
      'InterpreLab is an AI-powered ecosystem designed specifically for medical and legal interpreters. We provide comprehensive training, real-time assistance, wellness support, and business management tools to help interpreters excel professionally while maintaining their wellbeing.',
    category: 'general',
  },
  {
    id: 'q2',
    question: 'Is InterpreLab suitable for beginner interpreters?',
    answer:
      "Absolutely! InterpreBot starts with a comprehensive language assessment to identify your current skill level, then creates a personalized learning path. Whether you're just starting or have decades of experience, our platform adapts to your needs.",
    category: 'general',
  },
  {
    id: 'q3',
    question: 'Which languages does InterpreLab support?',
    answer:
      "We currently support Spanish, Mandarin, Cantonese, Arabic, Russian, and 20+ other major language pairs. We're continuously adding new languages based on user demand. Contact us if your language pair isn't listed yet.",
    category: 'general',
  },

  // Products
  {
    id: 'q4',
    question: 'How does InterpreCoach work during live calls?',
    answer:
      'InterpreCoach is a browser extension that provides real-time support without interrupting your flow. It offers live transcription for reference (prevents call-flow interruptions), instant terminology lookup, pronunciation guides, contextual suggestions, and post-session detailed feedback (non-intrusive, delivered after calls).',
    category: 'products',
  },
  {
    id: 'q5',
    question: 'What makes InterpreBot different from other language assessment tools?',
    answer:
      "InterpreBot is an animated AI character that conducts conversational assessments, creating a realistic and engaging testing environment. It uses advanced NLP to detect nuances like stutters, fillers, and false starts, providing incredibly detailed feedback across all language competencies (reading, writing, listening, speaking). It's designed to simulate real-world interpretation scenarios.",
    category: 'products',
  },
  {
    id: 'q6',
    question: 'Is InterpreWellness included in all plans?',
    answer:
      'Basic wellness resources (AI counselor for non-professional supportive chat, quick AI debriefing questionnaire) are included in the free tier. Premium plans unlock full access to InterpreLink community features, private support groups, and advanced burnout prevention programs.',
    category: 'products',
  },
  {
    id: 'q7',
    question: 'How does InterpreTrack protect my data?',
    answer:
      'All your call logs and earnings data are encrypted and stored securely. Only you have access to your records. We never share your data with employers or third parties without your explicit consent. Your business information is yours alone.',
    category: 'products',
  },
  {
    id: 'q15',
    question: 'How does InterpreLink compare to LinkedIn?',
    answer:
      'InterpreLink is specifically designed for interpreters - imagine if LinkedIn and Facebook had a baby. It includes professional networking and connections (Link-Up), job boards for interpretation opportunities, video reels studio (like TikTok/Instagram), Facebook-style wall for casual blogging and updates, public and private community groups, instant messaging, and mentorship matching. All tailored specifically for interpreter needs!',
    category: 'products',
  },

  // Pricing
  {
    id: 'q8',
    question: 'Is there a free version?',
    answer:
      'Yes! Our free tier includes: Basic InterpreBot assessment (1 per month), limited InterpreCoach features, access to InterpreLink community (read-only), basic InterpreTrack logging (up to 50 calls/month), and AI debriefing tools.',
    category: 'pricing',
  },
  {
    id: 'q9',
    question: "What's included in Premium plans?",
    answer:
      'Premium unlocks: Unlimited InterpreBot assessments with customized learning paths, full InterpreCoach capabilities with detailed post-session AI feedback, complete InterpreWellness suite (AI counselor + full InterpreLink access), advanced InterpreTrack with unlimited logging and smart insights, priority support (24/7 live chat), and job board access on InterpreLink.',
    category: 'pricing',
  },
  {
    id: 'q10',
    question: 'Can I switch between plans?',
    answer:
      'Yes! You can upgrade, downgrade, or cancel anytime. Pro-rated refunds are available if you downgrade mid-cycle.',
    category: 'pricing',
  },
  {
    id: 'q11',
    question: 'Do you offer payment plans?',
    answer:
      'Yes, we offer flexible payment options including monthly installments and extended payment schedules. We also have scholarship programs for interpreters experiencing financial hardship.',
    category: 'pricing',
  },

  // Technical
  {
    id: 'q12',
    question: 'What devices/browsers are supported?',
    answer:
      'InterpreCoach: Chrome, Firefox, Edge (browser extension). InterpreBot: Web-based, works on all modern browsers. InterpreLink: Web + mobile apps (iOS/Android) with video reels studio. InterpreTrack: Web + mobile apps (iOS/Android).',
    category: 'technical',
  },
  {
    id: 'q13',
    question: "Will InterpreCoach slow down my computer during calls?",
    answer:
      'No. InterpreCoach is optimized for minimal resource usage. It runs efficiently in the background without impacting call quality or system performance.',
    category: 'technical',
  },
  {
    id: 'q14',
    question: 'Can I use InterpreLab offline?',
    answer:
      'Some features (like InterpreTrack call logging) work offline and sync when you reconnect. However, InterpreCoach and InterpreBot require internet connectivity for AI-powered features.',
    category: 'technical',
  },

  // Privacy
  {
    id: 'q16',
    question: 'Is my data HIPAA compliant?',
    answer:
      'Yes. InterpreLab is designed with healthcare interpretation in mind. We maintain strict HIPAA compliance for all user data and session information.',
    category: 'privacy',
  },
  {
    id: 'q17',
    question: 'Can my employer access my InterpreLab data?',
    answer:
      'No. Your learning progress, assessments, wellness check-ins, and personal call logs are 100% private unless you explicitly choose to share specific reports with your employer.',
    category: 'privacy',
  },
  {
    id: 'q18',
    question: 'What about InterpreTrack logs - can employers see them?',
    answer:
      'Never. InterpreTrack logs are exclusively yours. You control if and when you share comparison reports with employers (typically only for resolving differences).',
    category: 'privacy',
  },

  // Support
  {
    id: 'q19',
    question: "How do I get help if I'm stuck?",
    answer:
      'Live Chat: Available 24/7 for Premium users, business hours for free tier. Email Support: support@interprelab.com (response within 24 hours). InterpreLink Community: Ask fellow interpreters anytime. Knowledge Base: Comprehensive guides and tutorials. Video Tutorials: Step-by-step walkthroughs for all features.',
    category: 'support',
  },
  {
    id: 'q20',
    question: 'Can I request new features?',
    answer:
      'Absolutely! We actively incorporate user feedback. Submit feature requests through the platform or InterpreLink community. We review all suggestions monthly and prioritize based on user votes and impact.',
    category: 'support',
  },
  {
    id: 'q22',
    question: "What if I'm experiencing emotional distress from a difficult call?",
    answer:
      'InterpreWellness is here for you: Immediate access to AI counselor for supportive (non-professional) listening, quick debrief via AI-powered debriefing questionnaire, peer support in private support circles, and resources for licensed counselors specializing in interpreter trauma.',
    category: 'support',
  },
  {
    id: 'q24',
    question: 'Is there a community for interpreters dealing with burnout?',
    answer:
      'Yes! InterpreLink has dedicated private support circles for burnout, compassion fatigue, and wellness. These are safe, moderated spaces where interpreters share experiences and coping strategies.',
    category: 'support',
  },
];

export const FAQSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isExpanded, setIsExpanded] = useState(false);
  const initialDisplayCount = 6;

  const categories = [
    { value: 'all', label: 'All Questions' },
    { value: 'general', label: 'General' },
    { value: 'products', label: 'Products' },
    { value: 'pricing', label: 'Pricing' },
    { value: 'technical', label: 'Technical' },
    { value: 'privacy', label: 'Privacy' },
    { value: 'support', label: 'Support' },
  ];

  const filteredFAQs = faqData.filter((faq) => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch =
      searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Show all FAQs if searching or filtering, otherwise respect expand/collapse
  const displayedFAQs = (searchQuery || activeCategory !== 'all' || isExpanded)
    ? filteredFAQs
    : filteredFAQs.slice(0, initialDisplayCount);

  const hasMoreFAQs = filteredFAQs.length > initialDisplayCount && !searchQuery && activeCategory === 'all';

  return (
    <section className="py-24 px-6 bg-card/50 border-t border-border" aria-label="Frequently asked questions">
      <div className="container mx-auto max-w-5xl">
        {/* Header - Dilemma style */}
        <div className="text-center mb-12 space-y-6">
          <div className="inline-block mb-3 text-xs font-bold tracking-widest text-muted-foreground uppercase animate-fade-in-up stagger-1">
            FAQ
          </div>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight text-foreground animate-fade-in-up stagger-2">
            Frequently Asked
            <br />
            <span className="text-muted-foreground italic font-normal text-3xl md:text-4xl block mt-4">
              Questions
            </span>
          </h2>
          <div className="w-16 h-1 bg-nobel-gold mx-auto animate-fade-in-up stagger-3"></div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed animate-fade-in-up stagger-4">
            Find answers to common questions about InterpreLab features, pricing, and support
          </p>
        </div>

        {/* Search Bar - Nobel gold focus */}
        <div className="relative mb-8 animate-fade-in-up stagger-5">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" aria-hidden="true" />
          <Input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-14 text-lg glass border-border focus:border-nobel-gold/50 transition-colors"
            aria-label="Search FAQ questions"
          />
        </div>

        {/* Category Tabs - Nobel gold active state */}
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-8 animate-fade-in-up stagger-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 gap-2 glass" role="tablist" aria-label="Filter FAQs by category">
            {categories.map((cat) => (
              <TabsTrigger 
                key={cat.value} 
                value={cat.value} 
                className="text-sm data-[state=active]:bg-nobel-gold/20 data-[state=active]:text-nobel-gold"
                role="tab"
                aria-label={`Show ${cat.label} questions`}
              >
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* FAQ Accordion - Glass card with Nobel gold accents */}
        <Card className="glass border-border hover:border-nobel-gold/30 transition-colors duration-300">
          <CardContent className="p-6">
            {filteredFAQs.length > 0 ? (
              <>
                <Accordion type="single" collapsible className="space-y-4">
                  {displayedFAQs.map((faq) => (
                    <AccordionItem
                      key={faq.id}
                      value={faq.id}
                      className="border-b border-border/50 last:border-0"
                    >
                      <AccordionTrigger className="text-left hover:no-underline group">
                        <span className="font-semibold group-hover:text-nobel-gold transition-colors">
                          {faq.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 pt-2">
                          <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>

                          {/* Feedback Buttons - Nobel gold hover */}
                          <div className="flex items-center gap-4 pt-4 border-t border-border/30">
                            <span className="text-sm text-muted-foreground">
                              Was this helpful?
                            </span>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-2 glass hover:border-nobel-gold/50 hover:text-nobel-gold transition-colors"
                                onClick={() => console.log('Helpful:', faq.id)}
                              >
                                <ThumbsUp className="w-4 h-4" />
                                Yes
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-2 glass hover:border-nobel-gold/50 hover:text-nobel-gold transition-colors"
                                onClick={() => console.log('Not helpful:', faq.id)}
                              >
                                <ThumbsDown className="w-4 h-4" />
                                No
                              </Button>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                
                {/* See More / Show Less Button */}
                {hasMoreFAQs && (
                  <div className="flex justify-center mt-6 pt-6 border-t border-border/30">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="gap-2 glass hover:border-nobel-gold/50 hover:text-nobel-gold transition-all duration-300 group"
                    >
                      {isExpanded ? (
                        <>
                          Show Less
                          <ChevronDown className="w-5 h-5 rotate-180 transition-transform group-hover:translate-y-[-2px]" />
                        </>
                      ) : (
                        <>
                          See More ({filteredFAQs.length - initialDisplayCount} more questions)
                          <ChevronDown className="w-5 h-5 transition-transform group-hover:translate-y-[2px]" />
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No questions found matching "{searchQuery}"
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Still need help CTA */}
        <Card className="mt-8 bg-gradient-primary text-white border-0">
          <CardContent className="p-8 text-center">
            <MessageCircle className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Still need help?</h3>
            <p className="mb-6 opacity-90">
              Our support team is ready to assist you with any questions
            </p>
            <Link to="/contact">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-primary hover:bg-white/90"
              >
                Contact Support
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
