import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
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
import { Link } from 'react-router-dom';

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

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [visibleCount, setVisibleCount] = useState(10); // Start with more visible on the dedicated page

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

  const displayedFAQs = searchQuery 
    ? filteredFAQs 
    : filteredFAQs.slice(0, visibleCount);
  
  const hasMore = !searchQuery && visibleCount < filteredFAQs.length;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-16 space-y-6">
            <Badge variant="outline" className="mb-4 border-nobel-gold text-nobel-gold px-4 py-1 text-xs tracking-widest uppercase">
              Support Center
            </Badge>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              Frequently Asked <span className="italic text-nobel-gold">Questions</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
              Everything you need to know about InterpreLab features, pricing, and support.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-8 max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" aria-hidden="true" />
            <Input
              type="text"
              placeholder="Search detailed answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg glass border-border focus:border-nobel-gold/50 transition-colors rounded-full"
              aria-label="Search FAQ questions"
              autoFocus
            />
          </div>

          {/* Category Tabs */}
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-12">
            <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent justify-center" role="tablist">
              {categories.map((cat) => (
                <TabsTrigger 
                  key={cat.value} 
                  value={cat.value} 
                  className="px-6 py-2 rounded-full border border-border data-[state=active]:bg-nobel-gold data-[state=active]:text-white data-[state=active]:border-nobel-gold transition-all"
                >
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Questions List */}
          <div className="space-y-4">
            {displayedFAQs.length > 0 ? (
              <>
                <Accordion type="single" collapsible className="space-y-4">
                  {displayedFAQs.map((faq) => (
                    <Card key={faq.id} className="glass border-border hover:border-nobel-gold/30 transition-colors overflow-hidden">
                       <AccordionItem value={faq.id} className="border-0">
                         <AccordionTrigger className="px-6 py-4 hover:no-underline group hover:bg-muted/30">
                           <span className="text-lg font-medium text-left group-hover:text-nobel-gold transition-colors">
                             {faq.question}
                           </span>
                         </AccordionTrigger>
                         <AccordionContent className="px-6 pb-6 pt-0">
                           <div className="prose dark:prose-invert max-w-none text-muted-foreground leading-relaxed pt-2">
                             {faq.answer}
                           </div>
                           <div className="flex gap-2 mt-4 pt-4 border-t border-border/30">
                              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-nobel-gold">
                                <ThumbsUp className="w-4 h-4" /> Helpful
                              </Button>
                              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-red-400">
                                <ThumbsDown className="w-4 h-4" /> Not Helpful
                              </Button>
                           </div>
                         </AccordionContent>
                       </AccordionItem>
                    </Card>
                  ))}
                </Accordion>

                {hasMore && (
                  <div className="flex justify-center mt-12">
                    <Button 
                      onClick={() => setVisibleCount(c => c + 10)} 
                      variant="outline" 
                      size="lg"
                      className="gap-2 rounded-full px-8"
                    >
                      Load More Questions <ChevronDown className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </>
            ) : (
               <div className="text-center py-20 bg-muted/20 rounded-2xl border border-dashed border-border">
                  <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No results found</h3>
                  <p className="text-muted-foreground">
                    We couldn't find any questions matching "{searchQuery}".
                  </p>
                  <Button variant="link" onClick={() => setSearchQuery('')} className="mt-2 text-nobel-gold">
                    Clear search
                  </Button>
               </div>
            )}
          </div>

          {/* Contact Support */}
          <div className="mt-20">
             <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0 overflow-hidden relative">
                {/* Abstract decorative circles */}
                <div className="absolute top-0 right-0 p-32 bg-nobel-gold/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 p-24 bg-blue-500/10 rounded-full blur-3xl -ml-12 -mb-12 pointer-events-none"></div>
                
                <CardContent className="p-12 text-center relative z-10">
                  <MessageCircle className="w-12 h-12 mx-auto mb-6 text-nobel-gold" />
                  <h3 className="text-3xl font-serif font-bold mb-4">Still have questions?</h3>
                  <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
                    Can't find the answer you're looking for? Our friendly support team is here to help you.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/contact">
                      <Button variant="hero" size="lg" className="w-full sm:w-auto">
                        Contact Support
                      </Button>
                    </Link>
                    <a href="mailto:support@interprelab.com">
                      <Button variant="glass" size="lg" className="w-full sm:w-auto text-white border-white/20 hover:bg-white/10">
                        Email Us
                      </Button>
                    </a>
                  </div>
                </CardContent>
             </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
