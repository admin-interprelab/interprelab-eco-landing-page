import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
    <Layout>
      {/* Hero Section with Q&A Bot */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-6 text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            AI-Powered Assessment
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
            InterpreBot
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Get instant AI-powered assessment of your interpretation skills with detailed feedback on accuracy, fluency, and medical terminology.
          </p>

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
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              What We Measure
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive analysis of linguistics, terminology, and communication effectiveness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="glass border-border/50 hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <Brain className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Cognitive Analysis</CardTitle>
                <CardDescription>
                  Assess cognitive load, processing speed, and mental agility during interpretation.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass border-border/50 hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <Target className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Accuracy Metrics</CardTitle>
                <CardDescription>
                  Measure precision in terminology, context preservation, and cultural adaptation.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass border-border/50 hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <BarChart className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Performance Tracking</CardTitle>
                <CardDescription>
                  Monitor progress with detailed analytics and improvement suggestions.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass border-border/50 hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <Users className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Peer Comparison</CardTitle>
                <CardDescription>
                  Compare your performance with industry standards and peer benchmarks.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Getting Started Timeline */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Get Started in 3 Steps
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your path to improved interpretation skills
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {/* Step 1 */}
              <div className="flex gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">1</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Play className="w-6 h-6 text-primary" />
                    <h3 className="text-2xl font-semibold">Take the Assessment</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Complete a 30-minute comprehensive assessment covering various interpretation scenarios in your target language pair.
                  </p>
                  <Button className="glass-button">
                    Start Assessment
                  </Button>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">2</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <BarChart className="w-6 h-6 text-primary" />
                    <h3 className="text-2xl font-semibold">Get Your Metrics</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Receive instant AI analysis with detailed scores on accuracy, fluency, medical terminology, and cultural competence.
                  </p>
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
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">3</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <TrendingUp className="w-6 h-6 text-primary" />
                    <h3 className="text-2xl font-semibold">Get Personalized Training</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Access a customized training path based on your assessment results, focusing on your areas for improvement.
                  </p>
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
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="glass-button">
              <Play className="w-5 h-5 mr-2" />
              Start Your Journey Now
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default InterpreBot;
