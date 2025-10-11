import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Target, BarChart, Users, ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";

const InterpreBot = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-6 text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            AI-Powered Assessment
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
            InterpreBot
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            AI-powered skills assessment with instant feedback on accuracy, fluency, and medical terminology mastery.
          </p>
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
              Comprehensive analysis across linguistics, terminology, and communication effectiveness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="glass border-border/50 hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <Brain className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Cognitive Analysis</CardTitle>
                <CardDescription>
                  Assess cognitive load, processing speed, and mental agility during interpretation tasks.
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
                  Monitor progress over time with detailed analytics and improvement suggestions.
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

      {/* Assessment Process */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              How the Assessment Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive assessment process evaluates your skills across multiple scenarios 
              and provides actionable insights for improvement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Complete Assessment</h3>
              <p className="text-muted-foreground">
                Take our comprehensive 30-minute assessment covering various interpretation scenarios.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">AI Analysis</h3>
              <p className="text-muted-foreground">
                Our AI analyzes your performance across multiple dimensions and industry standards.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Get Results</h3>
              <p className="text-muted-foreground">
                Receive detailed feedback, personalized recommendations, and a development plan.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="glass-button">
              <Play className="w-5 h-5 mr-2" />
              Start Your Assessment Now
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default InterpreBot;