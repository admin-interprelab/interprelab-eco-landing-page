import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/lib/ui/components/ui/accordion";
import { Badge } from "@/lib/ui/components/ui/badge";
import { Helmet } from 'react-helmet-async';
import React from 'react';

export const FAQ = () => {
  // Helper function to extract text from React elements for SEO schema
  const extractTextFromReactElement = (element: React.ReactNode): string => {
    if (typeof element === 'string') return element;
    if (typeof element === 'number') return element.toString();
    if (!React.isValidElement(element)) return '';
    
    const children = element.props?.children;
    if (!children) return '';
    
    if (Array.isArray(children)) {
      return children.map(extractTextFromReactElement).join(' ');
    }
    
    return extractTextFromReactElement(children);
  };

  const faqs = [
    {
      question: "What is InterpreLab?",
      answer: (
        <>
          <p className="mb-3">InterpreLab helps medical and legal interpreters excel in their careers with AI-powered tools.</p>
          <p className="mb-2 font-medium">We offer three integrated solutions:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>InterpreBot – Test and improve your skills</li>
            <li>InterpreCoach – Get real-time terminology help</li>
            <li>InterpreTrack – Track your hours and protect your earnings</li>
          </ul>
        </>
      ),
    },
    {
      question: "How does InterpreBot assess my interpretation skills?",
      answer: (
        <>
          <p className="mb-3">InterpreBot analyzes your sessions with AI and gives you detailed feedback on:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Accuracy and fluency</li>
            <li>Terminology usage</li>
            <li>Cultural competency</li>
            <li>Ethical compliance</li>
          </ul>
          <p className="mt-3">You receive personalized improvement recommendations after each assessment.</p>
        </>
      ),
    },
    {
      question: "Is my data secure and HIPAA compliant?",
      answer: (
        <>
          <p className="mb-3">Yes. Your data stays secure with bank-level encryption and industry-leading certifications:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>HIPAA compliant</li>
            <li>SOC 2 certified</li>
            <li>ISO 27001 certified</li>
          </ul>
          <p className="mt-3">We never share your personal information or interpretation sessions with anyone.</p>
        </>
      ),
    },
    {
      question: "Can I use InterpreCoach during live interpretation sessions?",
      answer: (
        <>
          <p>Yes! InterpreCoach runs as a browser extension during your live sessions.</p>
          <p className="mt-3">It provides instant access to medical and legal terminology databases without interrupting your workflow.</p>
        </>
      ),
    },
    {
      question: "What languages does InterpreLab support?",
      answer: (
        <>
          <p className="mb-3">We support over 50 languages including Spanish, Mandarin, Arabic, French, Russian, Portuguese, and many more.</p>
          <p>Need a specific language pair? Contact us – we're constantly expanding based on user demand.</p>
        </>
      ),
    },
    {
      question: "Do you offer training for healthcare organizations?",
      answer: (
        <>
          <p className="mb-3">Yes. We provide enterprise solutions for healthcare systems, hospitals, and interpretation agencies.</p>
          <p className="mb-2 font-medium">Our platform includes:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Admin dashboards</li>
            <li>Team analytics</li>
            <li>White-label options</li>
          </ul>
          <p className="mt-3">Contact our sales team for custom pricing.</p>
        </>
      ),
    },
    {
      question: "How much does InterpreLab cost?",
      answer: (
        <>
          <p className="mb-3">We offer flexible pricing plans:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li><strong>Individual interpreters:</strong> Start with a free trial, then choose monthly or annual plans</li>
            <li><strong>Enterprise teams:</strong> Custom pricing based on team size and features</li>
          </ul>
          <p className="mt-3">Visit our pricing page or contact sales for details.</p>
        </>
      ),
    },
    {
      question: "Can I track my interpretation sessions and earnings?",
      answer: (
        <>
          <p className="mb-3">Yes! InterpreTrack automatically:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Logs your interpretation sessions</li>
            <li>Tracks your hours</li>
            <li>Calculates your earnings</li>
            <li>Generates reports for invoicing and taxes</li>
          </ul>
          <p className="mt-3">Perfect for freelance interpreters managing multiple clients.</p>
        </>
      ),
    },
  ];

  // Generate FAQ schema markup for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": extractTextFromReactElement(faq.answer)
      }
    }))
  };

  return (
    <section className="py-20 px-6 bg-background border-t border-border/50">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <Badge className="glass px-6 py-3 mb-4 border-primary/20">
            FAQ
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Everything you need to know about InterpreLab
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="glass border-border/30 rounded-lg px-6 hover:border-primary/30 transition-colors"
            >
              <AccordionTrigger className="text-left hover:no-underline py-5">
                <span className="font-semibold text-foreground">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Still have questions?</p>
          <a
            href="/contact"
            className="text-primary hover:underline font-semibold"
          >
            Contact our support team →
          </a>
        </div>
      </div>
    </section>
  );
};
