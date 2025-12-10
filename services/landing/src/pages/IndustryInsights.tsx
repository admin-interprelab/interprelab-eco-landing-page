import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { DollarSign, UserX, Wifi, GraduationCap, Brain, AlertTriangle } from "lucide-react";

const painPoints = [
  {
    id: "compensation",
    title: "Compensation Disparity",
    icon: <DollarSign className="w-6 h-6" />,
    stat: "89% Pay Gap",
    description: "Major Language Service Providers charge clients up to $4.95 per minute while paying interpreters as low as $0.10 per minute.",
    details: [
      "Offshore interpreters receive minimal compensation despite handling critical healthcare interactions",
      "Location-based pay justification masks extreme profit margins",
      "No transparency in rate structures or pay scales",
      "Independent contractors bear all costs (equipment, internet, workspace) with no benefits"
    ],
    impact: "This exploitation undermines interpreter morale and quality, ultimately harming LEP patient outcomes.",
    solution: "InterpreLab advocates for fair compensation and helps interpreters track true earnings through our Call Tracker."
  },
  {
    id: "misclassification",
    title: "Workforce Misclassification",
    icon: <UserX className="w-6 h-6" />,
    stat: "$3.7M Settlement",
    description: "Voyce settled a class action lawsuit for $3.7 million over misclassifying interpreters as independent contractors.",
    details: [
      "Companies avoid payroll taxes, benefits, and overtime by misclassifying workers",
      "Interpreters lose protections under labor laws",
      "No sick leave, health insurance, or retirement benefits",
      "Legal gray area leaves interpreters vulnerable to exploitation"
    ],
    impact: "Misclassification creates financial insecurity and removes essential worker protections.",
    solution: "InterpreLab empowers interpreters with knowledge and resources to understand their rights."
  },
  {
    id: "technology",
    title: "Technology Failures",
    icon: <Wifi className="w-6 h-6" />,
    stat: "Daily Disruptions",
    description: "Platform crashes, audio issues, and connectivity problems plague interpreters daily, with no compensation for lost time.",
    details: [
      "Frequent system outages interrupt critical healthcare communications",
      "No pay for time spent troubleshooting technical issues",
      "Interpreters blamed for platform failures beyond their control",
      "Lack of reliable backup systems during emergencies"
    ],
    impact: "Technical failures waste interpreter time, delay patient care, and create stress without accountability.",
    solution: "InterpreCoach provides offline support and InterpreLink connects interpreters to share troubleshooting strategies."
  },
  {
    id: "development",
    title: "Inaccessible Professional Development",
    icon: <GraduationCap className="w-6 h-6" />,
    stat: "$100s-$1000s",
    description: "Certification courses and continuing education cost hundreds to thousands of dollars, creating barriers to professional growth.",
    details: [
      "High costs exclude many interpreters from advancement opportunities",
      "Limited access to specialized medical terminology training",
      "No employer-sponsored professional development",
      "Geographic barriers to in-person training programs"
    ],
    impact: "Cost barriers prevent interpreters from advancing their skills, perpetuating quality issues in the field.",
    solution: "InterpreStudy provides free, accessible learning resources and AI-powered training tools."
  },
  {
    id: "psychological",
    title: "Psychological Toll & Vicarious Trauma",
    icon: <Brain className="w-6 h-6" />,
    stat: "73% Burnout Rate",
    description: "Medical interpreters experience vicarious trauma from exposure to patient suffering, with minimal mental health support.",
    details: [
      "Constant exposure to medical emergencies, death, and suffering",
      "No debriefing or counseling support after traumatic calls",
      "Compassion fatigue leads to burnout and career exits",
      "Stigma around seeking mental health help in the industry"
    ],
    impact: "Unaddressed trauma leads to high turnover, reducing the pool of experienced interpreters and harming patient care quality.",
    solution: "InterpreWellness provides 24/7 AI-powered mental health support and vicarious trauma resources."
  }
];

const articles = [
  {
    title: "Understanding Vicarious Trauma in Healthcare Interpretation",
    description: "How indirect exposure to trauma affects medical interpreters and strategies for coping.",
    date: "2024-01-15",
    readTime: "8 min",
    category: "Mental Health"
  },
  {
    title: "The $71M Question: Why Medical Interpretation Quality Matters",
    description: "Examining the financial and human costs of poor interpretation in healthcare settings.",
    date: "2024-01-10",
    readTime: "12 min",
    category: "Industry Analysis"
  },
  {
    title: "Compassion Fatigue: The Hidden Cost of First-Person Interpretation",
    description: "Research-backed insights into emotional exhaustion among medical interpreters.",
    date: "2024-01-05",
    readTime: "10 min",
    category: "Mental Health"
  },
  {
    title: "Language Services Industry Report 2024",
    description: "Market analysis, trends, and workforce insights for medical interpretation.",
    date: "2024-01-01",
    readTime: "15 min",
    category: "Industry Research"
  },
  {
    title: "Legislative Updates: Section 1557 Compliance Guide",
    description: "Understanding federal requirements for language access in healthcare.",
    date: "2023-12-20",
    readTime: "6 min",
    category: "Legal & Compliance"
  }
];

export default function IndustryInsights() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="mb-4" variant="outline">Industry Research</Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            The Silent Crisis: Five Known but Unsolved Industry Pain Points
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Research-backed insights exposing systemic failures in language services and their impact on interpreters and LEP communities
          </p>
        </div>

        {/* Pain Points Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <AlertTriangle className="text-destructive" />
            Critical Industry Challenges
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {painPoints.map((point) => (
              <AccordionItem key={point.id} value={point.id} className="border rounded-lg px-6">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <div className="text-primary">{point.icon}</div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-xl font-semibold">{point.title}</h3>
                        <Badge variant="destructive">{point.stat}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{point.description}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-6 pb-4">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3">Key Issues:</h4>
                      <ul className="space-y-2">
                        {point.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-2 text-muted-foreground">
                            <span className="text-destructive mt-1">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Impact:</h4>
                      <p className="text-muted-foreground">{point.impact}</p>
                    </div>
                    <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                      <h4 className="font-semibold mb-2 text-primary">InterpreLab Solution:</h4>
                      <p className="text-muted-foreground">{point.solution}</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Articles Section */}
        <div>
          <h2 className="text-3xl font-bold mb-8">Research & Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{article.category}</Badge>
                    <span className="text-sm text-muted-foreground">{article.readTime}</span>
                  </div>
                  <CardTitle className="text-xl">{article.title}</CardTitle>
                  <CardDescription>{article.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{article.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
