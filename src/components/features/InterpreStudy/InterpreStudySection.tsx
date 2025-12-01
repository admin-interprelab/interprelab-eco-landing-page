import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  GraduationCap,
  Award,
  Video,
  FileText,
  Users,
  Sparkles,
  CheckCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const InterpreStudySection = () => {
  return (
    <section className="py-32 px-6 relative" id="interprestudy-section">
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
            one platform
          </p>
        </div>

        {/* 60-Hour Course Highlight */}
        <Card className="glass border-primary/30 max-w-4xl mx-auto mb-12 overflow-hidden">
          <div className="bg-gradient-primary p-1">
            <CardContent className="bg-background p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <Badge className="bg-primary text-primary-foreground">
                    <Award className="w-4 h-4 mr-2 inline" />
                    NBCMI & CCHI Approved
                  </Badge>
                  <h3 className="text-3xl font-bold text-foreground">
                    60-Hour Medical Interpreter Training
                  </h3>
                  <p className="text-muted-foreground">
                    Official prerequisite course for NBCMI and CCHI certification exams. Comprehensive
                    curriculum covering medical terminology, ethics, interpretation skills, and cultural
                    competency.
                  </p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span>Official completion certificate</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span>Self-paced online format</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span>Live Q&A sessions included</span>
                    </div>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-foreground">$499</span>
                    <span className="text-muted-foreground">or $183/mo</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                    <h4 className="font-semibold text-foreground">Course Modules:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Medical Terminology</span>
                        <span className="font-medium">15 hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Anatomy & Physiology</span>
                        <span className="font-medium">10 hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Ethics & Standards</span>
                        <span className="font-medium">10 hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Interpretation Skills</span>
                        <span className="font-medium">15 hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Cultural Competency</span>
                        <span className="font-medium">5 hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Practical Application</span>
                        <span className="font-medium">5 hours</span>
                      </div>
                    </div>
                  </div>

                  <Button asChild size="lg" className="w-full bg-gradient-primary text-white">
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

        {/* Learning Resources */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {/* Practice Scenarios */}
          <Card className="glass border-border/30 hover-lift">
            <CardContent className="p-6 space-y-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Video className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-foreground">Practice Scenarios</h3>
              <p className="text-sm text-muted-foreground">
                500+ pre-recorded mock scenarios from basic to expert level
              </p>
              
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-blue-500 rounded-full mt-2" />
                  <span>Emergency room situations</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-blue-500 rounded-full mt-2" />
                  <span>Legal depositions & court</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-blue-500 rounded-full mt-2" />
                  <span>Business meetings</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-blue-500 rounded-full mt-2" />
                  <span>Mental health sessions</span>
                </li>
              </ul>

              <Badge variant="outline" className="text-xs">
                10 Free • 490+ Premium
              </Badge>
            </CardContent>
          </Card>

          {/* Certification Prep */}
          <Card className="glass border-border/30 hover-lift">
            <CardContent className="p-6 space-y-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-foreground">Certification Prep</h3>
              <p className="text-sm text-muted-foreground">
                Complete exam preparation for NBCMI and CCHI certifications
              </p>
              
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-purple-500 rounded-full mt-2" />
                  <span>Full practice exam suites</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-purple-500 rounded-full mt-2" />
                  <span>Personalized study plans</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-purple-500 rounded-full mt-2" />
                  <span>Exam anxiety management</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-purple-500 rounded-full mt-2" />
                  <span>Score tracking & analytics</span>
                </li>
              </ul>

              <Badge variant="outline" className="text-xs">
                Premium Feature
              </Badge>
            </CardContent>
          </Card>

          {/* Learning Materials */}
          <Card className="glass border-border/30 hover-lift">
            <CardContent className="p-6 space-y-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-foreground">Learning Materials</h3>
              <p className="text-sm text-muted-foreground">
                Comprehensive library of study resources and reference materials
              </p>
              
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-green-500 rounded-full mt-2" />
                  <span>Terminology glossaries (5,000+ terms)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-green-500 rounded-full mt-2" />
                  <span>Digital & physical textbooks</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-green-500 rounded-full mt-2" />
                  <span>Flashcard decks</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-green-500 rounded-full mt-2" />
                  <span>Industry articles & research</span>
                </li>
              </ul>

              <Badge variant="outline" className="text-xs">
                Mixed Free/Premium
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Free vs Premium */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="glass border-border/30">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-foreground">Free Tier</h3>
                <Badge variant="outline">$0/month</Badge>
              </div>

              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">10 practice scenarios</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Basic learning modules</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Self-assessment quizzes</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Community study groups</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Free resource downloads</span>
                </li>
              </ul>

              <Button asChild variant="outline" className="w-full">
                <Link to="/signup">
                  <Users className="w-4 h-4 mr-2" />
                  Start Learning Free
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="glass border-primary/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-xs font-bold">
              POPULAR
            </div>
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-foreground">Premium</h3>
                <Badge className="bg-primary text-primary-foreground">From $29/mo</Badge>
              </div>

              <div className="text-sm text-muted-foreground mb-4">
                Everything in Free, plus:
              </div>

              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">500+ practice scenarios (all levels)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">60-hour course ($499 value)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Full certification prep suite</span>
                </li>
                <li className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">AI-powered scenario generation</span>
                </li>
                <li className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Live coaching sessions</span>
                </li>
                <li className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Priority support</span>
                </li>
              </ul>

              <Button asChild className="w-full bg-gradient-primary text-white">
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
