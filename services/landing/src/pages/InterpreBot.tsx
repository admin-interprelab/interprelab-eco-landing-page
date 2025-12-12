import interpreHubMockup from "@/assets/interpre-hub-mockup.png";
import { Layout } from "@/components/Layout";
import { Button } from "@/lib/ui/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/lib/ui/components/ui/card";
import { Brain, Target, BarChart, Users, ArrowRight, Play, CheckCircle, TrendingUp, Mic, Award, Clock, Languages } from "lucide-react";
import { Link } from "react-router-dom";
import { PainPointBadge } from "@/components/PainPointBadge";
import { GetStartedSteps } from "@/components/GetStartedSteps";
import { MissionCollaborationCTA } from "@/components/MissionCollaborationCTA";
import { FeatureGrid } from "@/components/FeatureGrid";

const InterpreBot = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-6 text-center">
          <PainPointBadge painPoint="Addressing Pain Point #4: Inaccessible Professional Development" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
            InterpreTest
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Professional development shouldn't cost $100s-$1000s or require guesswork. As working interpreters, we know the struggle. InterpreTest provides instant AI-powered assessment of your interpretation skills with detailed, personalized feedback—because you deserve to know exactly where you stand and how to improve.
          </p>
          <div className="glass p-6 rounded-lg max-w-2xl mx-auto mb-8">
            <p className="text-sm text-muted-foreground leading-relaxed">
              💡 <strong>Why We Built This:</strong> We've experienced the frustration of expensive courses with minimal support. We're working interpreters building tools that we wish existed—affordable, accessible, and actually helpful. This is our mission: to be a lifeline for interpreters like us.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="glass-button" asChild>
              <Link to="/interprestudy">
                <Play className="w-5 h-5 mr-2" />
                Start Assessment Now
              </Link>
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

      {/* Voice Simulator Preview Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Premium Voice Simulator
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Immerse yourself in realistic medical scenarios. Our AI-powered simulator creates dynamic conversations, grades your interpretations in real-time, and provides instant professional feedback.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mic className="w-5 h-5 text-primary" />
                  Voice Recognition
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Real-time speech recognition in English and Spanish. Practice interpreting with natural voice input.
                </p>
              </CardContent>
            </Card>

            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Instant Feedback
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  AI evaluates each interpretation immediately, scoring accuracy, terminology, and cultural competence.
                </p>
              </CardContent>
            </Card>

            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Live Scoring
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Track your performance with a dynamic score that updates as you progress through the scenario.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline" asChild>
              <Link to="/interprestudy">
                <Languages className="w-5 h-5 mr-2" />
                Try the Simulator
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeatureGrid
        title="What We Assess"
        subtitle="Comprehensive evaluation covering every aspect of professional medical interpretation."
        columns="4"
        features={[
          {
            icon: Brain,
            title: "Linguistic Accuracy",
            description: "Deep analysis of grammar, syntax, tense, and linguistic precision in both languages.",
          },
          {
            icon: Target,
            title: "Medical Terminology",
            description: "Evaluate correct usage of complex medical terms, including medications, procedures, and diagnoses.",
          },
          {
            icon: BarChart,
            title: "Cultural Competence",
            description: "Assess cultural adaptation, context preservation, and appropriate communication style.",
          },
          {
            icon: Users,
            title: "Professional Standards",
            description: "Measure adherence to NCIHC standards, ethics, and professional interpreter protocols.",
          },
        ]}
      />

      {/* Assessment Results Dashboard */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Detailed Performance Analytics
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              After each assessment, receive a comprehensive breakdown of your performance with actionable insights for improvement.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="glass border-border/50">
              <CardContent className="p-4">
                <img
                  src={interpreHubMockup}
                  alt="InterpreTest Assessment Results Dashboard"
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
