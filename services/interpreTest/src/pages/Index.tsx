import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Brain, Target, BarChart, Users, ArrowRight, Play, MessageSquare, CheckCircle, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

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
    <div className="min-h-screen bg-background">
      {/* Hero Section with Q&A Bot */}
      <section className="py-20 bg-gradient-to-r from-background to-secondary/20">
        <div className="container mx-auto px-6 text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
            <p className="text-sm font-medium">Addressing Pain Point #4: Inaccessible Professional Development</p>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            InterpreBot
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Professional development shouldn't cost $100s-$1000s or require guesswork. As working interpreters, we know the struggle. InterpreBot provides instant AI-powered assessment of your interpretation skills with detailed, personalized feedback—because you deserve to know exactly where you stand and how to improve.
          </p>
          <Card className="border-border/50 max-w-2xl mx-auto mb-8">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground leading-relaxed">
                💡 <strong>Why We Built This:</strong> We've experienced the frustration of expensive courses with minimal support. We're working interpreters building tools that we wish existed—affordable, accessible, and actually helpful. This is our mission: to be a lifeline for interpreters like us.
              </p>
            </CardContent>
          </Card>

          {/* Q&A Interface */}
          <Card className="border-border/50 max-w-2xl mx-auto mb-8">
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
            <Button size="lg">
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
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What We Measure</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive analysis of linguistics, terminology, and communication effectiveness.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
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
            ].map((feature) => (
              <Card key={feature.title} className="border-border/50">
                <CardHeader>
                  <feature.icon className="w-12 h-12 mb-4 text-primary" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Getting Started Timeline */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Get Started in 3 Steps</h2>
            <p className="text-lg text-muted-foreground">
              Your path to improved interpretation skills
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                icon: Play,
                title: "Take the Assessment",
                description: "Complete a 30-minute comprehensive assessment covering various interpretation scenarios in your target language pair.",
              },
              {
                icon: BarChart,
                title: "Get Your Metrics",
                description: "Receive instant AI analysis with detailed scores on accuracy, fluency, medical terminology, and cultural competence.",
              },
              {
                icon: TrendingUp,
                title: "Get Personalized Training",
                description: "Access a customized training path based on your assessment results, focusing on your areas for improvement.",
              },
            ].map((step, index) => (
              <div key={step.title} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                </div>
                <Card className="flex-1">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <step.icon className="w-5 h-5" />
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg">
              <Play className="w-5 h-5 mr-2" />
              Start Your Journey Now
            </Button>
          </div>
        </div>
      </section>

      {/* Mission & Collaboration CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <Card className="border-border/50">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl mb-4">InterpreLab: A Lifeline for Interpreters</CardTitle>
              <CardDescription className="text-lg max-w-3xl mx-auto">
                We're not just a platform—we're working interpreters who've lived through every challenge you face. We're passionate about being conduits of information and helping people in vulnerable situations. These pain points affect us too, and we're using our skills to lighten the load. But we can't do it alone.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-6">
                Want to discuss partnerships or broaden our reach? We're connected to this field on a deeper level—let's work together.
              </p>
              <Button variant="outline">Get In Touch</Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default InterpreBot;
