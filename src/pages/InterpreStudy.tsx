import React, { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Brain, Users, Award, Clock, CheckCircle } from 'lucide-react';

const InterpreStudy = () => {
  const [completedModules, setCompletedModules] = useState<string[]>([]);

  const ethicsModules = [
    {
      id: 'ethics-1',
      title: 'Professional Ethics Fundamentals',
      description: 'Core principles of interpreter ethics and professional conduct',
      duration: '45 min',
      difficulty: 'Beginner',
      completed: completedModules.includes('ethics-1')
    },
    {
      id: 'ethics-2',
      title: 'Confidentiality and Privacy',
      description: 'Understanding HIPAA and confidentiality requirements',
      duration: '30 min',
      difficulty: 'Intermediate',
      completed: completedModules.includes('ethics-2')
    },
    {
      id: 'ethics-3',
      title: 'Cultural Competency',
      description: 'Navigating cultural differences in interpretation',
      duration: '60 min',
      difficulty: 'Advanced',
      completed: completedModules.includes('ethics-3')
    }
  ];

  const terminologyModules = [
    {
      id: 'term-1',
      title: 'Medical Terminology Basics',
      description: 'Essential medical terms and anatomy',
      duration: '90 min',
      difficulty: 'Beginner',
      completed: completedModules.includes('term-1')
    },
    {
      id: 'term-2',
      title: 'Legal Terminology',
      description: 'Court and legal system vocabulary',
      duration: '75 min',
      difficulty: 'Intermediate',
      completed: completedModules.includes('term-2')
    },
    {
      id: 'term-3',
      title: 'Specialized Medical Fields',
      description: 'Advanced terminology for specialized medical areas',
      duration: '120 min',
      difficulty: 'Advanced',
      completed: completedModules.includes('term-3')
    }
  ];

  const practiceScenarios = [
    {
      id: 'practice-1',
      title: 'Hospital Emergency Room',
      description: 'Practice interpreting in high-stress medical situations',
      duration: '30 min',
      difficulty: 'Intermediate',
      completed: completedModules.includes('practice-1')
    },
    {
      id: 'practice-2',
      title: 'Court Proceedings',
      description: 'Legal interpretation practice scenarios',
      duration: '45 min',
      difficulty: 'Advanced',
      completed: completedModules.includes('practice-2')
    },
    {
      id: 'practice-3',
      title: 'Business Meetings',
      description: 'Corporate and business interpretation practice',
      duration: '40 min',
      difficulty: 'Intermediate',
      completed: completedModules.includes('practice-3')
    }
  ];

  const markComplete = (moduleId: string) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules([...completedModules, moduleId]);
    }
  };

  const calculateProgress = (modules: any[]) => {
    const completed = modules.filter(m => completedModules.includes(m.id)).length;
    return (completed / modules.length) * 100;
  };

  const ModuleCard = ({ module, onComplete }: { module: any, onComplete: (id: string) => void }) => (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{module.title}</CardTitle>
          {module.completed && <CheckCircle className="h-5 w-5 text-green-500" />}
        </div>
        <CardDescription>{module.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4">
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {module.duration}
          </Badge>
          <Badge variant={module.difficulty === 'Beginner' ? 'default' :
                         module.difficulty === 'Intermediate' ? 'secondary' : 'destructive'}>
            {module.difficulty}
          </Badge>
        </div>
        <Button
          onClick={() => onComplete(module.id)}
          disabled={module.completed}
          className="w-full"
        >
          {module.completed ? 'Completed' : 'Start Module'}
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">InterpreStudy</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive training platform for professional interpreters. Master ethics, terminology, and practical skills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <BookOpen className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Ethics Training</h3>
              <Progress value={calculateProgress(ethicsModules)} className="mb-2" />
              <p className="text-sm text-gray-600">
                {Math.round(calculateProgress(ethicsModules))}% Complete
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Brain className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Terminology</h3>
              <Progress value={calculateProgress(terminologyModules)} className="mb-2" />
              <p className="text-sm text-gray-600">
                {Math.round(calculateProgress(terminologyModules))}% Complete
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Practice</h3>
              <Progress value={calculateProgress(practiceScenarios)} className="mb-2" />
              <p className="text-sm text-gray-600">
                {Math.round(calculateProgress(practiceScenarios))}% Complete
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="ethics" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="ethics">Ethics Training</TabsTrigger>
            <TabsTrigger value="terminology">Terminology</TabsTrigger>
            <TabsTrigger value="practice">Practice Scenarios</TabsTrigger>
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
      </main>

      <Footer />
    </div>
  );
};

export default InterpreStudy;
