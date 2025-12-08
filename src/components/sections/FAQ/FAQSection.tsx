import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, ThumbsUp, ThumbsDown, MessageCircle } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  // Top 3 Most Important Questions
  {
    id: 'q1',
    question: 'What is InterpreLab?',
    answer:
      'InterpreLab is an AI-powered ecosystem designed specifically for medical and legal interpreters. We provide comprehensive training, real-time assistance, wellness support, and business management tools to help interpreters excel professionally while maintaining their wellbeing.',
  },
  {
    id: 'q2',
    question: 'Is InterpreLab suitable for beginner interpreters?',
    answer:
      "Absolutely! InterpreBot starts with a comprehensive language assessment to identify your current skill level, then creates a personalized learning path. Whether you're just starting or have decades of experience, our platform adapts to your needs.",
  },
  {
    id: 'q8',
    question: 'Is there a free version?',
    answer:
      'Yes! Our free tier includes: Basic InterpreBot assessment (1 per month), limited InterpreCoach features, access to InterpreLink community (read-only), basic InterpreTrack logging (up to 50 calls/month), and AI debriefing tools.',
  },
];

export const FAQSection = () => {
  return (
    <section className="py-24 px-6 bg-card/50 border-t border-border" aria-label="Frequently asked questions">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
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
            Common questions about getting started with InterpreLab.
          </p>
        </div>

        {/* FAQ Accordion - Summary View */}
        <Card className="glass border-border hover:border-nobel-gold/30 transition-colors duration-300 mb-12 animate-fade-in-up stagger-5">
          <CardContent className="p-6">
            <Accordion type="single" collapsible className="space-y-4">
              {faqData.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="border-b border-border/50 last:border-0"
                >
                  <AccordionTrigger className="text-left hover:no-underline group">
                    <span className="font-semibold text-lg group-hover:text-nobel-gold transition-colors">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-2">
                      <p className="text-muted-foreground leading-relaxed text-base">{faq.answer}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* View All Button */}
        <div className="text-center animate-fade-in-up stagger-6">
           <Link to="/faq">
              <Button variant="outline" size="lg" className="group border-nobel-gold/50 hover:bg-nobel-gold/10 hover:text-nobel-gold">
                  View All Questions <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
           </Link>
        </div>

        {/* Still need help CTA */}
        <div className="mt-20 animate-fade-in-up stagger-6">
            <Card className="bg-gradient-primary text-white border-0">
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
      </div>
    </section>
  );
};
