import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Brain, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export const QAFeedbackSection = () => {
  return (
    <section className="py-32 px-6 relative" id="qa-feedback-section">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4">
          <Badge className="glass px-6 py-3 border-primary/20">
            <TrendingUp className="w-4 h-4 mr-2 inline" />
            Intelligent QA Feedback
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-foreground">From 'Correct' to</span>
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Exceptional
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Feedback that actually helps you grow - detailed, actionable insights powered by AI
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {/* InterpreCoach Live Feedback */}
          <Card className="glass border-border/30 hover-lift">
            <CardContent className="p-8 space-y-6">
              <div className="w-16 h-16 bg-gradient-to-br from-success to-primary rounded-xl flex items-center justify-center">
                <Activity className="w-8 h-8 text-white" />
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-foreground">InterpreCoach Live Feedback</h3>
                <p className="text-muted-foreground">
                  Real-time assistance during calls, with detailed post-session analysis
                </p>

                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-success rounded-full mt-2" />
                    <span>Live transcriptions for reference (no call interruptions)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-success rounded-full mt-2" />
                    <span>Post-session grammar, tone, and pacing analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-success rounded-full mt-2" />
                    <span>Detects stutters, fillers, false starts, repetitions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-success rounded-full mt-2" />
                    <span>Learning path integration with training suggestions</span>
                  </li>
                </ul>
              </div>

              <Button asChild className="w-full bg-gradient-success text-white">
                <Link to="/interprecoach">
                  <Activity className="w-4 h-4 mr-2" />
                  Explore InterpreCoach
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* InterpreBot Assessment */}
          <Card className="glass border-border/30 hover-lift">
            <CardContent className="p-8 space-y-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Brain className="w-8 h-8 text-white" />
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-foreground">InterpreBot Assessment</h3>
                <p className="text-muted-foreground">
                  Comprehensive AI-driven language assessment with your animated training companion
                </p>

                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2" />
                    <span>Deep analysis: grammar, vocabulary, voice, WPM rating</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2" />
                    <span>High-impact visual score metrics and breakdowns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2" />
                    <span>Identifies weak areas with meticulous grammar analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2" />
                    <span>Generates customized learning paths guaranteed to enhance skills</span>
                  </li>
                </ul>
              </div>

              <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <Link to="/interprebot">
                  <Brain className="w-4 h-4 mr-2" />
                  Take Assessment
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Comparison Example */}
        <Card className="glass border-border/30 max-w-4xl mx-auto">
          <CardContent className="p-8">
            <h3 className="text-xl font-bold text-center mb-6">See The Difference</h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Old Feedback */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-destructive rounded-full" />
                  <span className="text-sm font-medium text-muted-foreground">OLD FEEDBACK</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="p-2 bg-muted/30 rounded">✓ Correct</div>
                  <div className="p-2 bg-muted/30 rounded">✓ Correct</div>
                  <div className="p-2 bg-muted/30 rounded">✓ Correct</div>
                  <div className="p-2 bg-muted/30 rounded">Comments: None</div>
                </div>
              </div>

              {/* New Feedback */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-success rounded-full" />
                  <span className="text-sm font-medium text-muted-foreground">NEW FEEDBACK</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-2 bg-success/10 border border-success/20 rounded">
                    <div className="font-bold">Grammar: 94%</div>
                    <div className="text-muted-foreground">• Excellent verb tenses</div>
                    <div className="text-muted-foreground">• Watch: plural agreements (3 instances)</div>
                  </div>
                  <div className="p-2 bg-success/10 border border-success/20 rounded">
                    <div className="font-bold">Voice Control: 88%</div>
                    <div className="text-muted-foreground">• Reduce fillers: "um" (5x), "uh" (3x)</div>
                  </div>
                  <div className="p-2 bg-success/10 border border-success/20 rounded">
                    <div className="font-bold">Learning Path:</div>
                    <div className="text-muted-foreground">• Advanced Medical Terminology</div>
                    <div className="text-muted-foreground">• Reducing Verbal Fillers</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
