import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, MessageSquare, Layers, Settings, Brain, Languages } from 'lucide-react';
import { Link } from 'react-router-dom';
import { InteractiveChat } from '@/components/interprestudy/InteractiveChat';
import { TerminologyLookup } from '@/components/interprestudy/TerminologyLookup';
import { FlashcardBuilder } from '@/components/interprestudy/FlashcardBuilder';
import { MockScenarios } from '@/components/interprestudy/MockScenarios';
import { StudySettings } from '@/components/interprestudy/StudySettings';

export default function InterpreStudy() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-12 h-12 text-primary" />
            <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              InterpreStudy
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Master your craft with AI-powered learning. Study ethics, practice terminology,
            and train with interactive scenarios designed for professional interpreters.
          </p>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="chat" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              AI Chat
            </TabsTrigger>
            <TabsTrigger value="terminology" className="flex items-center gap-2">
              <Languages className="w-4 h-4" />
              Terminology
            </TabsTrigger>
            <TabsTrigger value="flashcards" className="flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Flashcards
            </TabsTrigger>
            <TabsTrigger value="scenarios" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Scenarios
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="animate-fade-in">
            <InteractiveChat />
          </TabsContent>

          <TabsContent value="terminology" className="animate-fade-in">
            <TerminologyLookup />
          </TabsContent>

          <TabsContent value="flashcards" className="animate-fade-in">
            <FlashcardBuilder />
          </TabsContent>

          <TabsContent value="scenarios" className="animate-fade-in">
            <MockScenarios />
          </TabsContent>

          <TabsContent value="settings" className="animate-fade-in">
            <StudySettings />
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass border-border/50 hover:border-primary/50 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Code of Ethics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Query and quiz yourself on professional standards and ethical guidelines
              </p>
            </CardContent>
          </Card>

          <Card className="glass border-border/50 hover:border-primary/50 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                Live Practice
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Real-time conversation with AI in 8-second response windows
              </p>
            </CardContent>
          </Card>

          <Card className="glass border-border/50 hover:border-primary/50 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Languages className="w-5 h-5 text-primary" />
                Custom Glossary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Build your personal terminology library with translations and images
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
