import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Trophy, Target, TrendingUp, Clock } from 'lucide-react';

interface ProgressData {
  totalModules: number;
  completedModules: number;
  totalQuizzes: number;
  completedQuizzes: number;
  averageScore: number;
  studyStreak: number;
  totalStudyTime: number; // in minutes
  weeklyGoal: number; // in minutes
  weeklyProgress: number; // in minutes
}

interface ProgressTrackerProps {
  data: ProgressData;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({ data }) => {
  const moduleProgress = (data.completedModules / data.totalModules) * 100;
  const quizProgress = (data.completedQuizzes / data.totalQuizzes) * 100;
  const weeklyGoalProgress = (data.weeklyProgress / data.weeklyGoal) * 100;

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 80) return 'text-blue-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return { text: 'Excellent', variant: 'default' as const };
    if (score >= 80) return { text: 'Good', variant: 'secondary' as const };
    if (score >= 70) return { text: 'Fair', variant: 'outline' as const };
    return { text: 'Needs Work', variant: 'destructive' as const };
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Module Progress */}
      <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-white flex items-center gap-2">
            <Trophy className="h-4 w-4 text-yellow-400" />
            Module Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white mb-2">
            {data.completedModules}/{data.totalModules}
          </div>
          <Progress value={moduleProgress} className="mb-2" />
          <p className="text-xs text-blue-200">
            {Math.round(moduleProgress)}% Complete
          </p>
        </CardContent>
      </Card>

      {/* Quiz Performance */}
      <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-white flex items-center gap-2">
            <Target className="h-4 w-4 text-blue-400" />
            Quiz Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold mb-2 ${getScoreColor(data.averageScore)}`}>
            {data.averageScore}%
          </div>
          <Badge {...getScoreBadge(data.averageScore)} className="mb-2">
            {getScoreBadge(data.averageScore).text}
          </Badge>
          <p className="text-xs text-blue-200">
            {data.completedQuizzes} quizzes completed
          </p>
        </CardContent>
      </Card>

      {/* Study Streak */}
      <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-white flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-400" />
            Study Streak
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-400 mb-2">
            {data.studyStreak}
          </div>
          <p className="text-xs text-blue-200">
            {data.studyStreak === 1 ? 'day' : 'days'} in a row
          </p>
          <p className="text-xs text-green-300 mt-1">
            Keep it up! 🔥
          </p>
        </CardContent>
      </Card>

      {/* Weekly Goal */}
      <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-white flex items-center gap-2">
            <Clock className="h-4 w-4 text-purple-400" />
            Weekly Goal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white mb-2">
            {formatTime(data.weeklyProgress)}
          </div>
          <Progress value={weeklyGoalProgress} className="mb-2" />
          <p className="text-xs text-blue-200">
            of {formatTime(data.weeklyGoal)} goal
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
