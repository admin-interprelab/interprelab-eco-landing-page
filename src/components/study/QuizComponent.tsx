import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

interface QuizComponentProps {
  questions: QuizQuestion[];
  title: string;
  onComplete: (score: number) => void;
}

export const QuizComponent: React.FC<QuizComponentProps> = ({
  questions,
  title,
  onComplete
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(value);
  };

  const handleSubmitAnswer = () => {
    const answerIndex = parseInt(selectedAnswer);
    setAnswers(prev => ({ ...prev, [currentQuestion]: answerIndex }));
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      const score = Object.entries(answers).reduce((acc, [questionIndex, answerIndex]) => {
        const isCorrect = questions[parseInt(questionIndex)].correctAnswer === answerIndex;
        return acc + (isCorrect ? 1 : 0);
      }, 0);

      setQuizComplete(true);
      onComplete(score);
    } else {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer('');
      setShowExplanation(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer('');
    setAnswers({});
    setShowExplanation(false);
    setQuizComplete(false);
  };

  const calculateScore = () => {
    return Object.entries(answers).reduce((acc, [questionIndex, answerIndex]) => {
      const isCorrect = questions[parseInt(questionIndex)].correctAnswer === answerIndex;
      return acc + (isCorrect ? 1 : 0);
    }, 0);
  };

  if (quizComplete) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-white">Quiz Complete!</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-4xl font-bold text-green-400 mb-2">
            {score}/{questions.length}
          </div>
          <div className="text-2xl text-white mb-4">{percentage}%</div>

          <div className="mb-6">
            {percentage >= 80 ? (
              <div className="text-green-400">
                <CheckCircle className="h-12 w-12 mx-auto mb-2" />
                <p>Excellent work! You've mastered this topic.</p>
              </div>
            ) : percentage >= 60 ? (
              <div className="text-yellow-400">
                <p>Good job! Consider reviewing the missed questions.</p>
              </div>
            ) : (
              <div className="text-red-400">
                <XCircle className="h-12 w-12 mx-auto mb-2" />
                <p>Keep studying! Review the material and try again.</p>
              </div>
            )}
          </div>

          <Button
            onClick={resetQuiz}
            className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Retake Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white">{title}</CardTitle>
          <span className="text-blue-200 text-sm">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        <Progress value={progress} className="mt-2" />
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            {question.question}
          </h3>

          <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect}>
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={index.toString()}
                  id={`option-${index}`}
                  disabled={showExplanation}
                />
                <Label
                  htmlFor={`option-${index}`}
                  className={`text-white cursor-pointer ${
                    showExplanation && index === question.correctAnswer
                      ? 'text-green-400 font-semibold'
                      : showExplanation && index === parseInt(selectedAnswer) && index !== question.correctAnswer
                      ? 'text-red-400'
                      : ''
                  }`}
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {showExplanation && (
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Explanation:</h4>
            <p className="text-blue-200">{question.explanation}</p>
          </div>
        )}

        <div className="flex justify-end">
          {!showExplanation ? (
            <Button
              onClick={handleSubmitAnswer}
              disabled={!selectedAnswer}
              className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 border border-blue-500/30"
            >
              Submit Answer
            </Button>
          ) : (
            <Button
              onClick={handleNextQuestion}
              className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
            >
              {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
