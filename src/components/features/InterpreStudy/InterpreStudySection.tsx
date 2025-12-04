import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  GraduationCap,
  Award,
  Video,
  FileText,
  CheckCircle,
  Sparkles,
  Users,
  Brain,
  MessageSquare,
  Mic
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Interactive Components
import { TerminologyTrainer } from './TerminologyTrainer';
import { LanguageAssessment } from './LanguageAssessment';
import { CoreDynamics } from './CoreDynamics';

export const InterpreStudySection = () => {
  const [activeTab, setActiveTab] = useState("terminology");

  return (
    <section className="py-32 px-6 relative bg-slate-50/50" id="interprestudy-section">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4">
          <Badge className="glass px-6 py-3 border-primary/20">
            <GraduationCap className="w-4 h-4 mr-2 inline" />
            InterpreStudy
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-foreground">From Novice to Certified.</span>
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Your Complete Training Journey.
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            NBCMI and CCHI-approved training courses, practice scenarios, and certification prep - all in
            one platform.
          </p>
        </div>

        {/* 60-Hour Course Highlight */}
        <Card className="glass border-primary/30 max-w-5xl mx-auto mb-20 overflow-hidden shadow-2xl shadow-primary/5">
          <div className="bg-gradient-primary p-1">
            <CardContent className="bg-background p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <Badge className="bg-primary text-primary-foreground">
                    <Award className="w-4 h-4 mr-2 inline" />
                    NBCMI & CCHI Approved
                  </Badge>
                  <h3 className="text-4xl font-bold text-foreground leading-tight">
                    60-Hour Medical Interpreter Training
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Official prerequisite course for NBCMI and CCHI certification exams. Comprehensive
                    curriculum covering medical terminology, ethics, interpretation skills, and cultural
                    competency.
                  </p>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-success" />
                      <span className="font-medium">Official completion certificate</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-success" />
                      <span className="font-medium">Self-paced online format</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-success" />
                      <span className="font-medium">Live Q&A sessions included</span>
                    </div>
                  </div>

                  <div className="flex items-baseline gap-3 pt-4">
                    <span className="text-4xl font-bold text-foreground">$499</span>
                    <span className="text-muted-foreground text-lg">or $183/mo</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-muted/30 rounded-2xl p-6 space-y-4 border border-border/50">
                    <h4 className="font-bold text-foreground flex items-center gap-2">
                      <FileText className="w-4 h-4 text-primary"/> Course Modules:
                    </h4>
                    <div className="space-y-3 text-sm">
                      {[
                        { name: "Medical Terminology", hours: "15 hours" },
                        { name: "Anatomy & Physiology", hours: "10 hours" },
                        { name: "Ethics & Standards", hours: "10 hours" },
                        { name: "Interpretation Skills", hours: "15 hours" },
                        { name: "Cultural Competency", hours: "5 hours" },
                        { name: "Practical Application", hours: "5 hours" },
                      ].map((module, i) => (
                        <div key={i} className="flex justify-between items-center p-2 rounded-lg hover:bg-white/50 transition-colors">
                          <span className="text-muted-foreground font-medium">{module.name}</span>
                          <span className="font-bold bg-white px-2 py-1 rounded shadow-sm text-xs">{module.hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button asChild size="lg" className="w-full bg-gradient-primary text-white text-lg h-14 shadow-lg hover:shadow-primary/25 transition-all">
                    <Link to="/courses/medical-interpreter-60hr">
                      <GraduationCap className="w-5 h-5 mr-2" />
                      Enroll Now
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>

        {/* INTERACTIVE TRAINING LAB */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold mb-4">Interactive Training Lab</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Try our advanced AI-powered training tools. Practice terminology, generate scenarios, and simulate real conversations.
            </p>
          </div>

          <Tabs defaultValue="terminology" value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-white p-2 rounded-full shadow-lg border border-slate-100 h-auto">
                <TabsTrigger value="terminology" className="px-6 py-3 rounded-full data-[state=active]:bg-primary data-[state=active]:text-white gap-2 transition-all">
                  <Brain className="w-4 h-4" /> Terminology Trainer
                </TabsTrigger>
                <TabsTrigger value="scenarios" className="px-6 py-3 rounded-full data-[state=active]:bg-primary data-[state=active]:text-white gap-2 transition-all">
                  <MessageSquare className="w-4 h-4" /> Scenario Gen
                </TabsTrigger>
                <TabsTrigger value="simulation" className="px-6 py-3 rounded-full data-[state=active]:bg-primary data-[state=active]:text-white gap-2 transition-all">
                  <Mic className="w-4 h-4" /> Conversation Sim
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl p-4 md:p-8 min-h-[500px]">
              <TabsContent value="terminology" className="mt-0">
                <TerminologyTrainer />
              </TabsContent>
              <TabsContent value="scenarios" className="mt-0">
                <CoreDynamics />
              </TabsContent>
              <TabsContent value="simulation" className="mt-0">
                <LanguageAssessment />
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Free vs Premium */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="glass border-border/30 hover:border-border/50 transition-colors">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-foreground">Free Tier</h3>
                <Badge variant="outline" className="text-lg px-3 py-1">$0/month</Badge>
              </div>

              <ul className="space-y-4 text-sm">
                {[
                  "10 practice scenarios",
                  "Basic learning modules",
                  "Self-assessment quizzes",
                  "Community study groups",
                  "Free resource downloads"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>

              <Button asChild variant="outline" className="w-full h-12 text-base mt-4">
                <Link to="/signup">
                  <Users className="w-4 h-4 mr-2" />
                  Start Learning Free
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="glass border-primary/30 relative overflow-hidden shadow-lg shadow-primary/5">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-xs font-bold rounded-bl-xl">
              POPULAR
            </div>
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-foreground">Premium</h3>
                <Badge className="bg-primary text-primary-foreground text-lg px-3 py-1">From $29/mo</Badge>
              </div>

              <div className="text-sm text-muted-foreground mb-4 font-medium">
                Everything in Free, plus:
              </div>

              <ul className="space-y-4 text-sm">
                {[
                  "500+ practice scenarios (all levels)",
                  "60-hour course ($499 value)",
                  "Full certification prep suite",
                  "AI-powered scenario generation",
                  "Live coaching sessions",
                  "Priority support"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>

              <Button asChild className="w-full bg-gradient-primary text-white h-12 text-base mt-4 shadow-lg hover:shadow-primary/25">
                <Link to="/pricing">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Upgrade to Premium
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};