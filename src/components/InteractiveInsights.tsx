import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  Brain, 
  Wifi, 
  GraduationCap, 
  Heart,
  ChevronDown,
  ChevronUp,
  TrendingDown,
  AlertTriangle
} from "lucide-react";

export const InteractiveInsights = () => {
  const [expandedPainPoint, setExpandedPainPoint] = useState<number | null>(null);

  const painPoints = [
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Compensation Disparity",
      stat: "89% pay gap",
      description: "LSPs charge $1.50-$4.95/min while paying interpreters $0.10-$0.32/min",
      details: "The dominant business model relies on massive margins between client charges and interpreter pay. Global wage arbitrage pays offshore interpreters as little as $0.10/min, devaluing this highly skilled profession and causing 67% annual turnover.",
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Workforce Misclassification",
      stat: "$3.7M settlement",
      description: "Independent contractor status denies benefits while LSPs maintain control",
      details: "The Oliveira v. LanguageLine $3.725M settlement exposed systematic misclassification affecting 8,000+ interpreters. This practice denies health insurance, paid time off, and EAPs despite LSPs exerting employer-level control.",
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    {
      icon: <Wifi className="w-6 h-6" />,
      title: "Technology Failures",
      stat: "Daily disruptions",
      description: "Poor connectivity, audio lag, and platform failures compromise patient safety",
      details: "While AI co-pilots are being developed, interpreters struggle with unstable internet, audio lag, frozen video, and dropped calls. This directly conflicts with 2024 Section 1557 requirements for high-quality, real-time transmission.",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Inaccessible Development",
      stat: "$100s-$1000s",
      description: "High costs and lack of support block professional growth",
      details: "Training courses cost hundreds to thousands of dollars with minimal employer support. Scarcity of specialized training (oncology, genetics) leaves even motivated interpreters struggling, with no guarantee of quality for patients.",
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Psychological Toll",
      stat: "73% burnout rate",
      description: "Compassion fatigue, vicarious trauma, and isolation with no systemic support",
      details: "Interpreters absorb emotional weight of sensitive encounters in isolation. First-person interpretation ('I' statements) intensifies vicarious trauma. Despite effective debriefing models, systematic psychological support is virtually non-existent.",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
  ];

  const togglePainPoint = (index: number) => {
    setExpandedPainPoint(expandedPainPoint === index ? null : index);
  };

  return (
    <section className="min-h-screen py-20 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16 space-y-6">
          <Badge className="glass px-6 py-3 text-sm font-medium border-primary/20">
            <Brain className="w-4 h-4 mr-2" />
            Research-Backed Insights
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="text-foreground">Five </span>
            <span className="text-destructive">Known</span>
            <span className="text-foreground"> but </span>
            <span className="text-destructive">Unsolved</span>
            <br />
            <span className="text-foreground">Industry Pain Points</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Despite emerging technologies and regulations, these systemic issues persist. 
            Click each to explore the data behind the crisis.
          </p>
        </div>

        {/* Pain Points Grid */}
        <div className="space-y-4">
          {painPoints.map((point, index) => (
            <Card
              key={index}
              className={`group cursor-pointer transition-all duration-300 hover:shadow-glow glass border-l-4 ${
                expandedPainPoint === index ? 'border-primary' : 'border-border'
              }`}
              onClick={() => togglePainPoint(index)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`${point.bgColor} p-3 rounded-xl ${point.color} shrink-0`}>
                      {point.icon}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-xl font-bold text-foreground">
                          {point.title}
                        </h3>
                        <Badge variant="secondary" className="text-xs">
                          {point.stat}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {point.description}
                      </p>
                      
                      {/* Expanded Details */}
                      {expandedPainPoint === index && (
                        <div className="mt-4 pt-4 border-t border-border">
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {point.details}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={point.color}>
                    {expandedPainPoint === index ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center space-y-6">
          <div className="glass p-8 rounded-2xl max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              InterpreLab Addresses Every Single Pain Point
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Our integrated ecosystem of AI-powered tools provides comprehensive solutions 
              to these industry-wide challenges—from fair compensation tracking to psychological support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <a href="#solutions">Explore Our Solutions</a>
              </Button>
              <Button variant="glass" size="lg" asChild>
                <a href="/resources">View Full Research</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
