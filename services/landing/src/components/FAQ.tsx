import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export const FAQ = () => {
  const faqs = [
    {
      question: "What is InterpreLab?",
      answer:
        "InterpreLab is an AI-powered platform designed specifically for medical and legal interpreters. We provide three integrated tools: InterpreBot for skills assessment, InterpreCoach for real-time terminology support, and InterpreTrack for performance tracking and earnings management.",
    },
    {
      question: "How does InterpreBot assess my interpretation skills?",
      answer:
        "InterpreBot uses advanced AI to analyze your interpretation sessions across multiple dimensions including accuracy, fluency, terminology usage, cultural competency, and ethical compliance. You receive detailed feedback with personalized improvement recommendations after each assessment.",
    },
    {
      question: "Is my data secure and HIPAA compliant?",
      answer:
        "Absolutely. We take security seriously. InterpreLab is fully HIPAA compliant, SOC 2 certified, and ISO 27001 certified. All data is encrypted both in transit and at rest. We never share your personal information or interpretation sessions with third parties.",
    },
    {
      question: "Can I use InterpreCoach during live interpretation sessions?",
      answer:
        "Yes! InterpreCoach is a browser extension that provides real-time terminology support during your live sessions. It runs discreetly in the background and offers instant access to medical and legal terminology databases without interrupting your workflow.",
    },
    {
      question: "What languages does InterpreLab support?",
      answer:
        "InterpreLab currently supports over 50 languages including Spanish, Mandarin, Arabic, French, Russian, Portuguese, and many more. We're constantly expanding our language offerings based on user demand. Contact us if you need support for a specific language pair.",
    },
    {
      question: "Do you offer training for healthcare organizations?",
      answer:
        "Yes, we offer enterprise solutions for healthcare systems, hospitals, and interpretation agencies. Our platform can be customized for institutional training programs with admin dashboards, team analytics, and white-label options. Contact our sales team for more information.",
    },
    {
      question: "How much does InterpreLab cost?",
      answer:
        "We offer flexible pricing plans to suit different needs. Individual interpreters can start with our free trial, then choose from monthly or annual subscriptions. Enterprise clients receive custom pricing based on team size and features. Visit our pricing page or contact sales for detailed information.",
    },
    {
      question: "Can I track my interpretation sessions and earnings?",
      answer:
        "Yes! InterpreTrack automatically logs your interpretation sessions, tracks your hours, calculates your earnings, and generates reports for invoicing and tax purposes. It's perfect for freelance interpreters who need to manage multiple clients and track their business performance.",
    },
  ];

  return (
    <section className="py-20 px-6 bg-background border-t border-border/50">
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
