import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Brain,
  Users,
  Clock,
  CheckCircle,
  Zap,
  Target,
  TrendingUp,
} from "lucide-react";
import { FlashcardComponent } from "@/components/study/FlashcardComponent";
import { QuizComponent } from "@/components/study/QuizComponent";
import { ProgressTracker } from "@/components/study/ProgressTracker";
import MedicalGlossary from "@/components/MedicalGlossary";

interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  completed: boolean;
}

const InterpreStudy = () => {
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [activeView, setActiveView] = useState<'modules' | 'flashcards' | 'quiz' | 'progress' | 'glossary'>('modules');
  const [selectedCategory, setSelectedCategory] = useState<string>('ethics');

  const ethicsModules: Module[] = [
    {
      id: "ethics-1",
      title: "Professional Ethics Fundamentals",
      description:
        "Core principles of interpreter ethics and professional conduct",
      duration: "45 min",
      difficulty: "Beginner",
      completed: completedModules.includes("ethics-1"),
    },
    {
      id: "ethics-2",
      title: "Confidentiality and Privacy",
      description: "Understanding HIPAA and confidentiality requirements",
      duration: "30 min",
      difficulty: "Intermediate",
      completed: completedModules.includes("ethics-2"),
    },
    {
      id: "ethics-3",
      title: "Cultural Competency",
      description: "Navigating cultural differences in interpretation",
      duration: "60 min",
      difficulty: "Advanced",
      completed: completedModules.includes("ethics-3"),
    },
  ];

  const terminologyModules: Module[] = [
    {
      id: "term-1",
      title: "Medical Terminology Basics",
      description: "Essential medical terms and anatomy",
      duration: "90 min",
      difficulty: "Beginner",
      completed: completedModules.includes("term-1"),
    },
    {
      id: "term-2",
      title: "Legal Terminology",
      description: "Court and legal system vocabulary",
      duration: "75 min",
      difficulty: "Intermediate",
      completed: completedModules.includes("term-2"),
    },
    {
      id: "term-3",
      title: "Specialized Medical Fields",
      description: "Advanced terminology for specialized medical areas",
      duration: "120 min",
      difficulty: "Advanced",
      completed: completedModules.includes("term-3"),
    },
  ];

  const practiceScenarios: Module[] = [
    {
      id: "practice-1",
      title: "Hospital Emergency Room",
      description: "Practice interpreting in high-stress medical situations",
      duration: "30 min",
      difficulty: "Intermediate",
      completed: completedModules.includes("practice-1"),
    },
    {
      id: "practice-2",
      title: "Court Proceedings",
      description: "Legal interpretation practice scenarios",
      duration: "45 min",
      difficulty: "Advanced",
      completed: completedModules.includes("practice-2"),
    },
    {
      id: "practice-3",
      title: "Business Meetings",
      description: "Corporate and business interpretation practice",
      duration: "40 min",
      difficulty: "Intermediate",
      completed: completedModules.includes("practice-3"),
    },
  ];

  // Flashcard data
  const flashcards: {
    [key: string]: {
      id: string;
      front: string;
      back: string;
      category: string;
      difficulty: 'easy' | 'medium' | 'hard';
    }[];
  } = {
    ethics: [
      {
        id: 'eth-1',
        front: 'What is the primary principle of interpreter confidentiality?',
        back: 'Interpreters must maintain strict confidentiality of all information encountered during interpretation, similar to attorney-client privilege.',
        category: 'Ethics',
        difficulty: 'easy' as const
      },
      {
        id: 'eth-2',
        front: 'When should an interpreter decline an assignment?',
        back: 'When they lack competence in the subject matter, have a conflict of interest, or cannot maintain impartiality.',
        category: 'Ethics',
        difficulty: 'medium' as const
      },
      {
        id: 'eth-3',
        front: 'What is the role of cultural mediation in interpretation?',
        back: 'Interpreters should facilitate communication while remaining neutral, only providing cultural context when essential for understanding.',
        category: 'Ethics',
        difficulty: 'hard' as const
      }
    ],
    terminology: [
      {
        id: 'term-1',
        front: 'What does "myocardial infarction" mean?',
        back: 'Heart attack - death of heart muscle due to insufficient blood supply.',
        category: 'Medical Terminology',
        difficulty: 'medium' as const
      },
      {
        id: 'term-2',
        front: 'Define "habeas corpus"',
        back: 'A legal principle requiring that a person under arrest be brought before a judge or court.',
        category: 'Legal Terminology',
        difficulty: 'hard' as const
      }
    ],
    practice: [
      {
        id: 'prac-1',
        front: 'How do you handle overlapping speech in simultaneous interpretation?',
        back: 'Prioritize the primary speaker, use lag time effectively, and signal when information is missed.',
        category: 'Practice',
        difficulty: 'hard' as const
      }
    ]
  };

  // Quiz data
  const quizzes: {
    [key: string]: {
      title: string;
      questions: {
        id: string;
        question: string;
        options: string[];
        correctAnswer: number;
        explanation: string;
        category: string;
      }[];
    };
  } = {
    ethics: {
      title: 'Professional Ethics Quiz',
      questions: [
        {
          id: 'q1',
          question: 'What should an interpreter do if they realize they made an error during interpretation?',
          options: [
            'Ignore it and continue',
            'Correct it immediately',
            'Wait until the end to mention it',
            'Ask the client what to do'
          ],
          correctAnswer: 1,
          explanation: 'Interpreters should correct errors immediately to ensure accurate communication.',
          category: 'Ethics'
        },
        {
          id: 'q2',
          question: 'Which of the following is NOT a core principle of interpreter ethics?',
          options: [
            'Accuracy',
            'Confidentiality',
            'Advocacy',
            'Impartiality'
          ],
          correctAnswer: 2,
          explanation: 'Interpreters should not advocate for any party; they must remain neutral and impartial.',
          category: 'Ethics'
        }
      ]
    },
    terminology: {
      title: 'Medical & Legal Terminology Quiz',
      questions: [
        {
          id: 'q3',
          question: 'What is the medical term for high blood pressure?',
          options: [
            'Hypotension',
            'Hypertension',
            'Tachycardia',
            'Bradycardia'
          ],
          correctAnswer: 1,
          explanation: 'Hypertension refers to high blood pressure, while hypotension refers to low blood pressure.',
          category: 'Medical Terminology'
        }
      ]
    },
    practice: {
      title: 'Interpretation Practice Quiz',
      questions: [
        {
          id: 'q4',
          question: 'In consecutive interpretation, what is the recommended note-taking approach?',
          options: [
            'Write everything verbatim',
            'Use symbols and abbreviations',
            'Only write key words',
            'Avoid taking notes'
          ],
          correctAnswer: 1,
          explanation: 'Effective consecutive interpretation relies on a system of symbols and abbreviations to capture meaning efficiently.',
          category: 'Practice'
        }
      ]
    }
  };

  // Progress data
  const progressData = {
    totalModules: ethicsModules.length + terminologyModules.length + practiceScenarios.length,
    completedModules: completedModules.length,
    totalQuizzes: Object.keys(quizzes).length,
    completedQuizzes: 2, // Mock data
    averageScore: 87,
    studyStreak: 5,
    totalStudyTime: 240, // minutes
    weeklyGoal: 300, // minutes
    weeklyProgress: 180 // minutes
  };

  const markComplete = (moduleId: string) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules([...completedModules, moduleId]);
    }
  };

  const calculateProgress = (modules: Module[]) => {
    const completed = modules.filter((m) =>
      completedModules.includes(m.id)
    ).length;
    return (completed / modules.length) * 100;
  };

  const ModuleCard = ({
    module,
    onComplete,
  }: {
    module: Module;
    onComplete: (id: string) => void;
  }) => (
    <Card className="h-full bg-white/10 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-white">{module.title}</CardTitle>
          {module.completed && (
            <CheckCircle className="h-5 w-5 text-green-400" />
          )}
        </div>
        <CardDescription className="text-blue-200">{module.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4">
          <Badge variant="outline" className="flex items-center gap-1 border-white/30 text-white">
            <Clock className="h-3 w-3" />
            {module.duration}
          </Badge>
          <Badge
            variant={
              module.difficulty === "Beginner"
                ? "default"
                : module.difficulty === "Intermediate"
                ? "secondary"
                : "destructive"
            }
            className="text-white"
          >
            {module.difficulty}
          </Badge>
        </div>
        <Button
          onClick={() => onComplete(module.id)}
          disabled={module.completed}
          className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm"
        >
          {module.completed ? "Completed" : "Start Module"}
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            InterpreStudy
          </h1>
          <p className="text-xl text-gray-600 dark:text-blue-200 max-w-3xl mx-auto">
            Comprehensive training platform for professional interpreters.
            Master ethics, terminology, and practical skills.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-1">
            <div className="flex gap-1">
              <Button
                onClick={() => setActiveView('modules')}
                variant={activeView === 'modules' ? 'default' : 'ghost'}
                size="sm"
                className={activeView === 'modules' ? 'bg-white/20 text-white' : 'text-white hover:bg-white/10'}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Modules
              </Button>
              <Button
                onClick={() => setActiveView('flashcards')}
                variant={activeView === 'flashcards' ? 'default' : 'ghost'}
                size="sm"
                className={activeView === 'flashcards' ? 'bg-white/20 text-white' : 'text-white hover:bg-white/10'}
              >
                <Zap className="h-4 w-4 mr-2" />
                Flashcards
              </Button>
              <Button
                onClick={() => setActiveView('quiz')}
                variant={activeView === 'quiz' ? 'default' : 'ghost'}
                size="sm"
                className={activeView === 'quiz' ? 'bg-white/20 text-white' : 'text-white hover:bg-white/10'}
              >
                <Target className="h-4 w-4 mr-2" />
                Quizzes
              </Button>
              <Button
                onClick={() => setActiveView('progress')}
                variant={activeView === 'progress' ? 'default' : 'ghost'}
                size="sm"
                className={activeView === 'progress' ? 'bg-white/20 text-white' : 'text-white hover:bg-white/10'}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Progress
              </Button>
              <Button
                onClick={() => setActiveView('glossary')}
                variant={activeView === 'glossary' ? 'default' : 'ghost'}
                size="sm"
                className={activeView === 'glossary' ? 'bg-white/20 text-white' : 'text-white hover:bg-white/10'}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Glossary
              </Button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        {activeView === 'progress' ? (
          <ProgressTracker data={progressData} />
        ) : activeView === 'glossary' ? (
          <MedicalGlossary />
        ) : activeView === 'flashcards' ? (
          <div className="space-y-6">
            {/* Category Selection */}
            <div className="flex justify-center mb-6">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-1">
                <div className="flex gap-1">
                  {Object.keys(flashcards).map((category) => (
                    <Button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      variant={selectedCategory === category ? 'default' : 'ghost'}
                      size="sm"
                      className={selectedCategory === category ? 'bg-white/20 text-white' : 'text-white hover:bg-white/10'}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            <FlashcardComponent
              flashcards={flashcards[selectedCategory as keyof typeof flashcards]}
              onComplete={(results) => console.log('Flashcard results:', results)}
            />
          </div>
        ) : activeView === 'quiz' ? (
          <div className="space-y-6">
            {/* Category Selection */}
            <div className="flex justify-center mb-6">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-1">
                <div className="flex gap-1">
                  {Object.keys(quizzes).map((category) => (
                    <Button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      variant={selectedCategory === category ? 'default' : 'ghost'}
                      size="sm"
                      className={selectedCategory === category ? 'bg-white/20 text-white' : 'text-white hover:bg-white/10'}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            <QuizComponent
              questions={quizzes[selectedCategory as keyof typeof quizzes].questions}
              title={quizzes[selectedCategory as keyof typeof quizzes].title}
              onComplete={(score) => console.log('Quiz score:', score)}
            />
          </div>
        ) : (
          <>
            {/* Progress Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
                <CardContent className="p-6 text-center">
                  <BookOpen className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2 text-white">Ethics Training</h3>
                  <Progress value={calculateProgress(ethicsModules)} className="mb-2" />
                  <p className="text-sm text-blue-200">
                    {Math.round(calculateProgress(ethicsModules))}% Complete
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
                <CardContent className="p-6 text-center">
                  <Brain className="h-12 w-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2 text-white">Terminology</h3>
                  <Progress value={calculateProgress(terminologyModules)} className="mb-2" />
                  <p className="text-sm text-blue-200">
                    {Math.round(calculateProgress(terminologyModules))}% Complete
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2 text-white">Practice</h3>
                  <Progress value={calculateProgress(practiceScenarios)} className="mb-2" />
                  <p className="text-sm text-blue-200">
                    {Math.round(calculateProgress(practiceScenarios))}% Complete
                  </p>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {/* Module Tabs - Only show when in modules view */}
        {activeView === 'modules' && (
          <Tabs defaultValue="ethics" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white/10 backdrop-blur-md border border-white/20">
              <TabsTrigger value="ethics" className="text-white data-[state=active]:bg-white/20">Ethics Training</TabsTrigger>
              <TabsTrigger value="terminology" className="text-white data-[state=active]:bg-white/20">Terminology</TabsTrigger>
              <TabsTrigger value="practice" className="text-white data-[state=active]:bg-white/20">Practice Scenarios</TabsTrigger>
            </TabsList>

            <TabsContent value="ethics" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ethicsModules.map((module) => (
                  <ModuleCard
                    key={module.id}
                    module={module}
                    onComplete={markComplete}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="terminology" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {terminologyModules.map((module) => (
                  <ModuleCard
                    key={module.id}
                    module={module}
                    onComplete={markComplete}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="practice" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {practiceScenarios.map((module) => (
                  <ModuleCard
                    key={module.id}
                    module={module}
                    onComplete={markComplete}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default InterpreStudy;
