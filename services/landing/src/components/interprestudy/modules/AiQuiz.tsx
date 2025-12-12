import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function AiQuiz() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Quiz</CardTitle>
        <CardDescription>
          Test your medical terminology knowledge with AI-powered quizzes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center p-8 text-muted-foreground">
          <p>AI quiz feature coming soon</p>
        </div>
      </CardContent>
    </Card>
  );
}
