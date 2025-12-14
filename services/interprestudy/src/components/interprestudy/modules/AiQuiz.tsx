import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter, Button, Badge } from '@interprelab/ui';
import { cn } from '@interprelab/utils';

export function AiQuiz() {
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState("Medical Terminology");
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const startQuiz = async () => {
    setLoading(true);
    setError(null);
    setQuiz(null);
    setScore(0);
    setCurrentQuestionIndex(0);
    
    try {
      const data = await studyApi.generateQuiz(topic, "intermediate", 5);
      setQuiz(data);
    } catch (err) {
      setError("Failed to generate quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (answer: string) => {
    if (isAnswered || !quiz) return;
    
    setSelectedAnswer(answer);
    setIsAnswered(true);

    const currentQuestion = quiz.questions[currentQuestionIndex];
    if (answer === currentQuestion.correct_answer) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (!quiz) return;
    
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      // End of quiz logic could go here
    }
  };

  const isQuizComplete = quiz && currentQuestionIndex === quiz.questions.length - 1 && isAnswered;

  if (loading) {
    return (
      <Card className="w-full max-w-2xl mx-auto min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <h3 className="text-xl font-semibold">Generating your custom quiz...</h3>
          <p className="text-muted-foreground mt-2">Consulting AI medical database</p>
        </div>
      </Card>
    );
  }

  if (!quiz) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-6 h-6 text-primary" />
            <Badge variant="outline">AI Generated</Badge>
          </div>
          <CardTitle className="text-2xl">Medical Knowledge Check</CardTitle>
          <CardDescription>Generate a custom quiz to test your interpreting skills and terminology.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Topic or Specialty</label>
            <input 
              type="text" 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full p-3 rounded-md border bg-background"
              placeholder="e.g. Cardiology, Ethics, Oncology..."
            />
          </div>
          
          {error && (
            <div className="p-3 bg-red-100 dark:bg-red-900/20 text-red-600 rounded-md flex items-center gap-2 text-sm">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={startQuiz} className="w-full h-12 text-lg">
            Start Quiz
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const currentQ = quiz.questions[currentQuestionIndex];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <Badge variant="secondary">Question {currentQuestionIndex + 1} / {quiz.questions.length}</Badge>
        <div className="font-bold text-primary">Score: {score}</div>
      </CardHeader>
      
      <CardContent className="pt-6">
        <h3 className="text-xl font-bold mb-6">{currentQ.question}</h3>
        
        <div className="grid gap-3">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedAnswer === option;
            const isCorrect = option === currentQ.correct_answer;
            
            let buttonStyle = "h-auto py-4 px-6 justify-start text-left bg-secondary/20 hover:bg-secondary/40 whitespace-normal";
            
            if (isAnswered) {
              if (isCorrect) buttonStyle = "h-auto py-4 px-6 justify-start text-left bg-green-100 hover:bg-green-100 dark:bg-green-900/30 border-green-500 text-green-700 dark:text-green-300 pointer-events-none";
              else if (isSelected) buttonStyle = "h-auto py-4 px-6 justify-start text-left bg-red-100 dark:bg-red-900/30 border-red-500 text-red-700 dark:text-red-300 pointer-events-none";
              else buttonStyle = "h-auto py-4 px-6 justify-start text-left opacity-50 pointer-events-none";
            } else if (isSelected) {
               buttonStyle = "h-auto py-4 px-6 justify-start text-left bg-primary/20 border-primary";
            }

            return (
              <Button
                key={idx}
                variant="outline"
                className={buttonStyle}
                onClick={() => handleAnswer(option)}
              >
                <div className="flex w-full items-center justify-between">
                  <span>{option}</span>
                  {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-600" />}
                </div>
              </Button>
            );
          })}
        </div>

        {isAnswered && (
          <div className="mt-6 p-4 bg-muted/50 rounded-lg animate-fade-in">
            <p className="font-semibold mb-1">Explanation:</p>
            <p className="text-muted-foreground text-sm">{currentQ.explanation}</p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between pt-6 border-t">
        <Button variant="ghost" onClick={() => setQuiz(null)} size="sm">
          Quit Quiz
        </Button>
        
        {isAnswered && (
          <Button onClick={isQuizComplete ? () => setQuiz(null) : nextQuestion} className="gap-2">
            {isQuizComplete ? (
              <>
                <RefreshCw className="w-4 h-4" /> Start New Quiz
              </>
            ) : (
              "Next Question"
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
