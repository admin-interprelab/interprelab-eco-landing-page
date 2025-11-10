import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Brain, MessageSquare, Award } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface LearningMetrics {
  studyHours: number;
  termsLearned: number;
  quizzesCompleted: number;
  scenariosPracticed: number;
  botConversations: number;
  streak: number;
}

interface LearningProgressProps {
  metrics: LearningMetrics;
}

export default function LearningProgress({ metrics }: LearningProgressProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          Learning & Development
        </CardTitle>
        <CardDescription>Your progress from InterpreStudy & InterpreBot</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Study Hours */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold">Study Time</h4>
                <p className="text-xs text-muted-foreground">InterpreStudy sessions</p>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-2xl">{metrics.studyHours}h</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </div>
          </div>
        </div>

        {/* Terms & Vocabulary */}
        <div className="space-y-3 p-4 rounded-lg bg-muted/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Medical Terminology</span>
            <span className="text-sm font-bold">{metrics.termsLearned}/500</span>
          </div>
          <Progress value={(metrics.termsLearned / 500) * 100} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {500 - metrics.termsLearned} terms until expert level
          </p>
        </div>

        {/* Practice Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border border-border/50 bg-background">
            <div className="flex items-center gap-2 mb-2">
              <Award className="h-4 w-4 text-emerald-500" />
              <span className="text-xs font-medium text-muted-foreground">Quizzes</span>
            </div>
            <div className="text-2xl font-bold">{metrics.quizzesCompleted}</div>
            <p className="text-xs text-muted-foreground mt-1">Completed</p>
          </div>

          <div className="p-4 rounded-lg border border-border/50 bg-background">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="h-4 w-4 text-purple-500" />
              <span className="text-xs font-medium text-muted-foreground">Scenarios</span>
            </div>
            <div className="text-2xl font-bold">{metrics.scenariosPracticed}</div>
            <p className="text-xs text-muted-foreground mt-1">Practiced</p>
          </div>
        </div>

        {/* InterpreBot Usage */}
        <div className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Brain className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <h4 className="font-semibold">InterpreBot</h4>
                <p className="text-xs text-muted-foreground">AI Practice Partner</p>
              </div>
            </div>
            <Badge className="bg-primary/20 text-primary border-primary/30">
              Active
            </Badge>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Conversations</span>
              <span className="font-semibold">{metrics.botConversations}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Current Streak</span>
              <span className="font-semibold">{metrics.streak} days 🔥</span>
            </div>
          </div>
        </div>

        {/* Achievement */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
          <Award className="h-5 w-5 text-amber-500 flex-shrink-0" />
          <div className="text-sm">
            <span className="font-semibold">Great progress!</span> You're in the top 15% of learners this month.
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
