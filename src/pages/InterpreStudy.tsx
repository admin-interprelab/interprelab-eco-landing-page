import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
        <div
          className="text-center mb-16 animate-fade-in py-20 px-4 rounded-3xl bg-cover bg-center"
          style={{ backgroundImage: "url('/src/assets/studying-learning.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/70 rounded-3xl" />
          <div className="relative z-10">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              Addressing Pain Point #4: Accessible, Specialized Training
            </Badge>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-12 h-12 text-primary" />
            <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              InterpreStudy
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            Specialized training shouldn't be a luxury reserved for those who can afford $100s-$1000s. We've been there—struggling to find quality oncology, genetics, or legal terminology resources. InterpreStudy provides AI-powered learning, ethics training, and interactive scenarios tailored to your specialty, all in one accessible platform.
          </p>
          <div className="glass p-6 rounded-lg max-w-2xl mx-auto">
            <p className="text-sm text-muted-foreground leading-relaxed">
              🎯 <strong>Why This Matters:</strong> As working interpreters, we know the desperation of entering a specialized call unprepared. We built InterpreStudy to democratize access to the training that should have always been available—because every interpreter deserves to feel confident and prepared.
            </p>
          </div>
          </div>
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

        {/* Mission & Collaboration CTA */}
        <section className="py-20">
          <Card className="glass border-primary/20 max-w-4xl mx-auto">
            <CardContent className="p-8 md:p-12 text-center space-y-6">
              <h2 className="text-3xl font-bold">InterpreLab: Your Lifeline in the Field</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We're not building tools from an ivory tower. We're interpreters who've experienced the frustration of inaccessible training, the anxiety of specialized terminology, and the weight of serving vulnerable patients. Our mission is to use our skills to create solutions that actually help—but we need your partnership to reach every interpreter who needs these resources.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link to="/contact">
                  <Button size="lg" variant="hero">
                    Collaborate With Us
                  </Button>
                </Link>
                <Link to="/interprelink">
                  <Button size="lg" variant="glass">
                    Join Our Community
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-muted-foreground">
                Have connections to interpreter networks? Want to discuss bulk training programs? Let's talk—together we can make professional development accessible to all.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </Layout>
  );
}
