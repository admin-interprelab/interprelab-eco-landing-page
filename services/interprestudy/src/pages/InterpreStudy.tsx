import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/lib/ui/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/lib/ui/components/ui/tabs';
import { BookOpen, MessageSquare, Layers, Settings, Brain, Languages, Accessibility, GraduationCap, HelpCircle, PlayCircle } from 'lucide-react';
import { InteractiveChat } from '@/components/interprestudy/InteractiveChat';
import { TerminologyLookup } from '@/components/interprestudy/TerminologyLookup';
import { StudySettings } from '@/components/interprestudy/StudySettings';
import { MissionCollaborationCTA } from '@/components/MissionCollaborationCTA';
import { SmartFlashcards } from '@/components/interprestudy/modules/SmartFlashcards';
import { ConversationMode } from '@/components/interprestudy/modules/ConversationMode';
import { BodyMapper } from '@/components/interprestudy/modules/BodyMapper';
import { ScenarioGenerator } from '@/components/interprestudy/modules/ScenarioGenerator';
import { AiQuiz } from '@/components/interprestudy/modules/AiQuiz';
import { CoreDynamicsTraining } from '@/components/interprestudy/modules/CoreDynamicsTraining';
import { InteractiveModulePlayer } from '@/components/interprestudy/modules/InteractiveModulePlayer';

export default function InterpreStudy() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div
          className="text-center mb-16 animate-fade-in py-32 px-4 rounded-3xl bg-cover bg-center relative overflow-hidden"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=1200&h=600&fit=crop&q=80')",
            backgroundPosition: 'center'
          }}
        >
          {/* Dark gradient overlay with gold accent */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-nobel-dark/80 -z-10" />
          <div className="absolute inset-0 bg-gradient-radial from-nobel-gold/10 via-transparent to-transparent -z-10" />
          
          <div className="relative max-w-4xl mx-auto">
            {/* Centered Brain Icon with glow */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-nobel-gold/10 border-2 border-nobel-gold/30 flex items-center justify-center">
                <Brain className="w-12 h-12 text-nobel-gold drop-shadow-[0_0_20px_rgba(197,160,89,0.6)]" />
              </div>
            </div>
            
            {/* Title with serif font */}
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 bg-gradient-to-r from-foreground via-nobel-gold to-foreground bg-clip-text text-transparent">
              InterpreStudy
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-foreground/90 max-w-3xl mx-auto leading-relaxed">
              Specialized training shouldn't be a luxury. Access AI-powered learning, ethics training, and interactive scenarios tailored to your specialty.
            </p>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="modules" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 lg:grid-cols-10 h-auto mb-8 p-1">
            <TabsTrigger value="modules" className="flex items-center gap-2 py-2">
              <PlayCircle className="w-4 h-4" />
              <span className="hidden lg:inline">Modules</span>
            </TabsTrigger>
            <TabsTrigger value="training" className="flex items-center gap-2 py-2">
              <GraduationCap className="w-4 h-4" />
              <span className="hidden lg:inline">Training</span>
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-2 py-2">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden lg:inline">Sim</span>
            </TabsTrigger>
            <TabsTrigger value="flashcards" className="flex items-center gap-2 py-2">
              <Layers className="w-4 h-4" />
              <span className="hidden lg:inline">Cards</span>
            </TabsTrigger>
            <TabsTrigger value="quiz" className="flex items-center gap-2 py-2">
              <HelpCircle className="w-4 h-4" />
              <span className="hidden lg:inline">Quiz</span>
            </TabsTrigger>
            <TabsTrigger value="body" className="flex items-center gap-2 py-2">
              <Accessibility className="w-4 h-4" />
              <span className="hidden lg:inline">Body</span>
            </TabsTrigger>
            <TabsTrigger value="scenarios" className="flex items-center gap-2 py-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden lg:inline">Scripts</span>
            </TabsTrigger>
            <TabsTrigger value="terminology" className="flex items-center gap-2 py-2">
              <Languages className="w-4 h-4" />
              <span className="hidden lg:inline">Terms</span>
            </TabsTrigger>
            <TabsTrigger value="interactive_chat" className="flex items-center gap-2 py-2">
               <MessageSquare className="w-4 h-4" />
               <span className="hidden lg:inline">AI Chat</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2 py-2">
              <Settings className="w-4 h-4" />
              <span className="hidden lg:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="modules" className="animate-fade-in">
            <InteractiveModulePlayer />
          </TabsContent>

          <TabsContent value="training" className="animate-fade-in">
             <CoreDynamicsTraining />
          </TabsContent>

          <TabsContent value="chat" className="animate-fade-in">
            <ConversationMode />
          </TabsContent>

          <TabsContent value="flashcards" className="animate-fade-in">
            <SmartFlashcards />
          </TabsContent>

          <TabsContent value="quiz" className="animate-fade-in">
             <AiQuiz />
          </TabsContent>

          <TabsContent value="body" className="animate-fade-in">
             <BodyMapper />
          </TabsContent>

          <TabsContent value="scenarios" className="animate-fade-in">
            <ScenarioGenerator />
          </TabsContent>

          <TabsContent value="terminology" className="animate-fade-in">
            <TerminologyLookup />
          </TabsContent>

          <TabsContent value="interactive_chat" className="animate-fade-in">
            <InteractiveChat />
          </TabsContent>

          <TabsContent value="settings" className="animate-fade-in">
            <StudySettings />
          </TabsContent>
        </Tabs>

        {/* Quick Actions - Only show if not on Training tab ideally, but keeping for footer access */}
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

        {/* Removed MissionCollaborationCTA to avoid double footer - Layout already includes footer */}
      </div>
    </Layout>
  );
}
