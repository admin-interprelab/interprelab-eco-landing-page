import interpreHubMockup from "@/assets/interpre-hub-mockup.png";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Brain, Target, BarChart, Users, ArrowRight, Play, MessageSquare, CheckCircle, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { PainPointBadge } from "@/components/PainPointBadge";
import { GetStartedSteps } from "@/components/GetStartedSteps";
import { MissionCollaborationCTA } from "@/components/MissionCollaborationCTA";
import { FeatureGrid } from "@/components/FeatureGrid";

const InterpreBot = () => {
  const [userQuestion, setUserQuestion] = useState("");
  const [showChat, setShowChat] = useState(false);

  const commonQuestions = [
    "How does the assessment work?",
    "What skills does InterpreBot measure?",
    "How long does the assessment take?",
    "How do I get personalized training?",
    "What languages are supported?",
  ];

  return (
    <Layout>
      {/* Hero Section with Q&A Bot */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-6 text-center">
          <PainPointBadge painPoint="Addressing Pain Point #4: Inaccessible Professional Development" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
            InterpreBot
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Professional development shouldn't cost $100s-$1000s or require guesswork. As working interpreters, we know the struggle. InterpreBot provides instant AI-powered assessment of your interpretation skills with detailed, personalized feedback—because you deserve to know exactly where you stand and how to improve.
          </p>
          <div className="glass p-6 rounded-lg max-w-2xl mx-auto mb-8">
            <p className="text-sm text-muted-foreground leading-relaxed">
              💡 <strong>Why We Built This:</strong> We've experienced the frustration of expensive courses with minimal support. We're working interpreters building tools that we wish existed—affordable, accessible, and actually helpful. This is our mission: to be a lifeline for interpreters like us.
            </p>
          </div>

          {/* Q&A Interface */}
          <Card className="glass border-border/50 max-w-2xl mx-auto mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-center">
                <MessageSquare className="w-5 h-5" />
                Ask InterpreBot
              </CardTitle>
              <CardDescription>
                Select a question or ask your own
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask me anything about InterpreBot..."
                  value={userQuestion}
                  onChange={(e) => setUserQuestion(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') setShowChat(true);
                  }}
                />
                <Button onClick={() => setShowChat(true)}>Ask</Button>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground text-left">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {commonQuestions.map((q) => (
                    <Button
                      key={q}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setUserQuestion(q);
                        setShowChat(true);
                      }}
                      className="text-xs"
                    >
                      {q}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="glass-button">
              <Play className="w-5 h-5 mr-2" />
              Take the Assessment
            </Button>
            <Link to="/interprecoach">
              <Button variant="outline" size="lg">
                Meet InterpreCoach
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeatureGrid
        title="What We Measure"
        subtitle="Comprehensive analysis of linguistics, terminology, and communication effectiveness."
        columns="4"
        features={[
          {
            icon: Brain,
            title: "Cognitive Analysis",
            description: "Assess cognitive load, processing speed, and mental agility during interpretation.",
          },
          {
            icon: Target,
            title: "Accuracy Metrics",
            description: "Measure precision in terminology, context preservation, and cultural adaptation.",
          },
          {
            icon: BarChart,
            title: "Performance Tracking",
            description: "Monitor progress with detailed analytics and improvement suggestions.",
          },
          {
            icon: Users,
            title: "Peer Comparison",
            description: "Compare your performance with industry standards and peer benchmarks.",
          },
        ]}
      />

      {/* Assessment Dashboard Preview */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Your Personalized Dashboard
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Visualize your progress and get actionable insights.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="glass border-border/50">
              <CardContent className="p-4">
                <img
                  src={interpreHubMockup}
                  alt="InterpreBot Assessment Dashboard"
                  className="w-full rounded-lg"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Getting Started Timeline */}
      <GetStartedSteps
        title="Get Started in 3 Steps"
        subtitle="Your path to improved interpretation skills"
        steps={[
          {
            icon: Play,
            title: "Take the Assessment",
            description: "Complete a 30-minute comprehensive assessment covering various interpretation scenarios in your target language pair.",
            buttonText: "Start Assessment",
            buttonAction: () => console.log("Start assessment"),
          },
          {
            icon: BarChart,
            title: "Get Your Metrics",
            description: "Receive instant AI analysis with detailed scores on accuracy, fluency, medical terminology, and cultural competence.",
            content: (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="glass p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Accuracy</p>
                  <p className="text-2xl font-bold text-primary">92%</p>
                </Card>
                <Card className="glass p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Fluency</p>
                  <p className="text-2xl font-bold text-primary">88%</p>
                </Card>
                <Card className="glass p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Terminology</p>
                  <p className="text-2xl font-bold text-primary">85%</p>
                </Card>
                <Card className="glass p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Cultural</p>
                  <p className="text-2xl font-bold text-primary">90%</p>
                </Card>
              </div>
            ),
          },
          {
            icon: TrendingUp,
            title: "Get Personalized Training",
            description: "Access a customized training path based on your assessment results, focusing on your areas for improvement.",
            content: (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-sm">Custom practice exercises</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-sm">Targeted terminology drills</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-sm">Progress tracking dashboard</span>
                </div>
              </div>
            ),
          },
        ]}
        finalCTAText="Start Your Journey Now"
        finalCTAIcon={Play}
        finalCTAAction={() => console.log("Start journey")}
      />

      {/* Mission & Collaboration CTA */}
      <MissionCollaborationCTA
        title="InterpreLab: A Lifeline for Interpreters"
        description="We're not just a platform—we're working interpreters who've lived through every challenge you face. We're passionate about being conduits of information and helping people in vulnerable situations. These pain points affect us too, and we're using our skills to lighten the load. But we can't do it alone."
        footerText="Want to discuss partnerships or broaden our reach? We're connected to this field on a deeper level—let's work together."
      />
    </Layout>
  );
};

export default InterpreBot;
