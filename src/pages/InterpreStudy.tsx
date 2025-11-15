import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  LayoutGrid,
  Layers,
  Play,
  MessageSquare,
  Settings,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Layout } from "@/components/Layout";
import { PageHero } from "@/components/PageHero";
import { ModuleCard } from "@/components/study/ModuleCard";
import { FlashcardBuilder, InteractiveChat, MockScenarios, StudySettings, TerminologyLookup } from "@/components/study/optimized-features";
import { getEthicsModules, getPracticeScenarios, getTerminologyModules, studyTools } from "@/pages/study-data";
import { Module } from "@/types/study";

const InterpreStudy = () => {
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [activeView, setActiveView] = useState<string>('dashboard');

  const markComplete = (moduleId: string) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules([...completedModules, moduleId]);
    }
  };

  const allModules = useMemo(() => [
    ...getEthicsModules(completedModules),
    ...getTerminologyModules(completedModules),
    ...getPracticeScenarios(completedModules),
  ], [completedModules]);

  const totalProgress = useMemo(() => (completedModules.length / allModules.length) * 100, [completedModules, allModules.length]);

  return (
    <Layout>
      <main className="container mx-auto px-4 py-8">
        <PageHero
          badgeText="AI-Powered Learning"
          title="InterpreStudy: Your Personal Training Ground"
          subtitle="Master ethics, terminology, and practical skills with our comprehensive suite of AI-driven study tools. From interactive flashcards to realistic mock scenarios, elevate your expertise."
        />

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-background/50 backdrop-blur-md border border-border rounded-lg p-1">
            <div className="flex gap-1">
              {studyTools.map(tool => (
                <Button
                  key={tool.id}
                  onClick={() => setActiveView(tool.id)}
                  variant={activeView === tool.id ? 'default' : 'ghost'}
                  size="sm"
                  className={activeView === tool.id ? 'bg-white/20 text-white' : 'text-white hover:bg-white/10'}
                >
                  <tool.icon className="h-4 w-4 mr-2" />
                  {tool.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="mt-8">
          {activeView === 'dashboard' ? (
            <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white">Study Dashboard</CardTitle>
                <CardDescription className="text-blue-200">Your learning overview and progress.</CardDescription>
              </CardHeader>
              <CardContent className="text-center text-white">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="text-left">
                    <p className="text-sm text-muted-foreground">Modules Completed</p>
                    <p className="text-2xl font-bold">{completedModules.length} / {allModules.length}</p>
                  </div>
                  <div className="h-12 w-px bg-border" />
                  <div className="text-left">
                    <p className="text-sm text-muted-foreground">Overall Progress</p>
                    <p className="text-2xl font-bold">{totalProgress.toFixed(0)}%</p>
                  </div>
                </div>
                <Progress value={totalProgress} className="mb-4" />
              </CardContent>
            </Card>
          ) : activeView === 'modules' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allModules.map((module) => (
                <ModuleCard
                  key={module.id}
                  module={module}
                  onComplete={markComplete}
                />
              ))}
            </div>
          ) : (
            <div className="animate-fade-in">
              {activeView === 'flashcards' && <FlashcardBuilder />}
              {activeView === 'scenarios' && <MockScenarios />}
              {activeView === 'glossary' && <TerminologyLookup />}
              {activeView === 'coach' && <InteractiveChat />}
              {activeView === 'settings' && <StudySettings />}
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default InterpreStudy;
