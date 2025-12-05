import React, { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  PainPointAwareSearch,
  TherapeuticRecommendations,
  EmpowermentOnboarding
} from '@/components/discovery';
import {
  EmpathicSearchResult,
  PersonalizedContent,
  SuccessStory,
  InterpreterProfile
} from '@/types/empathetic-discovery';
import { EmotionalState, JourneyStage, PainPoint } from '@/types/navigation';
import { Search, Heart, Users, Target, Lightbulb } from 'lucide-react';

export default function ContentDiscoveryDemo() {
  const [activeTab, setActiveTab] = useState('search');
  const [selectedResult, setSelectedResult] = useState<EmpathicSearchResult | null>(null);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [interpreterProfile, setInterpreterProfile] = useState<InterpreterProfile | null>(null);

  // Mock emotional state and journey stage for demo
  const mockEmotionalState: EmotionalState = {
    stressLevel: 'moderate',
    primaryConcerns: [
      {
        type: 'financial',
        severity: 7,
        description: 'Struggling with low pay rates and financial instability',
        relatedSolutions: ['InterpreTrack', 'Premium Training']
      },
      {
        type: 'technological',
        severity: 6,
        description: 'Technology failures causing session stress',
        relatedSolutions: ['InterpreCoach', 'AI Training']
      }
    ],
    supportNeeds: ['emotional', 'technical', 'financial'],
    preferredCommunicationStyle: 'encouraging'
  };

  const mockJourneyStage: JourneyStage = {
    stage: 'hope-building',
    progress: 45,
    completedMilestones: ['Acknowledged struggles', 'Identified pain points'],
    nextRecommendedAction: 'Explore AI-powered solutions'
  };

  const mockInterpreterProfile: InterpreterProfile = {
    id: 'demo-user',
    strugglesIdentified: [
      {
        type: 'financial',
        severity: 7,
        description: 'Financial instability',
        relatedSolutions: []
      },
      {
        type: 'technological',
        severity: 6,
        description: 'Technology anxiety',
        relatedSolutions: []
      }
    ],
    experienceLevel: 'intermediate',
    specializations: ['medical', 'legal'],
    currentChallenges: ['Low pay rates', 'Technology failures', 'Session stress'],
    successStories: [],
    preferredLearningStyle: 'visual',
    supportPreferences: 'mixed'
  };

  const handleSearchResultSelect = (result: EmpathicSearchResult) => {
    setSelectedResult(result);
    console.log('Selected search result:', result);
  };

  const handleContentSelect = (content: PersonalizedContent) => {
    console.log('Selected content:', content);
    // In a real app, this would navigate to the content
  };

  const handleStorySelect = (story: SuccessStory) => {
    console.log('Selected story:', story);
    // In a real app, this would navigate to the full story
  };

  const handleOnboardingComplete = (profile: InterpreterProfile) => {
    setInterpreterProfile(profile);
    setOnboardingComplete(true);
    setActiveTab('recommendations');
    console.log('Onboarding completed with profile:', profile);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl font-bold text-foreground">
            Empathetic Content Discovery System
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience how our AI-powered system understands interpreter struggles and provides
            personalized support, solutions, and community connections.
          </p>
          <div className="flex justify-center space-x-2">
            <Badge variant="secondary" className="flex items-center space-x-1">
              <Heart className="w-3 h-3" />
              <span>Empathetic</span>
            </Badge>
            <Badge variant="secondary" className="flex items-center space-x-1">
              <Target className="w-3 h-3" />
              <span>Personalized</span>
            </Badge>
            <Badge variant="secondary" className="flex items-center space-x-1">
              <Users className="w-3 h-3" />
              <span>Community-Driven</span>
            </Badge>
          </div>
        </div>

        {/* Demo Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="search" className="flex items-center space-x-2">
              <Search className="w-4 h-4" />
              <span>Pain-Point Search</span>
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex items-center space-x-2">
              <Lightbulb className="w-4 h-4" />
              <span>Recommendations</span>
            </TabsTrigger>
            <TabsTrigger value="onboarding" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Onboarding</span>
            </TabsTrigger>
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span>System Overview</span>
            </TabsTrigger>
          </TabsList>

          {/* Pain-Point Aware Search */}
          <TabsContent value="search" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Search className="w-5 h-5 text-primary" />
                  <span>Pain-Point Aware Search</span>
                </CardTitle>
                <CardDescription>
                  Search that understands interpreter struggles and connects them to relevant solutions,
                  stories, and support resources with emotional tone matching.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <PainPointAwareSearch
                      emotionalState={mockEmotionalState}
                      journeyStage={mockJourneyStage}
                      onResultSelect={handleSearchResultSelect}
                    />
                  </div>
                  <div className="space-y-4">
                    <Card className="bg-blue-50 border-blue-200">
                      <CardHeader>
                        <CardTitle className="text-sm">Demo Context</CardTitle>
                      </CardHeader>
                      <CardContent className="text-xs space-y-2">
                        <div>
                          <strong>Stress Level:</strong> {mockEmotionalState.stressLevel}
                        </div>
                        <div>
                          <strong>Journey Stage:</strong> {mockJourneyStage.stage}
                        </div>
                        <div>
                          <strong>Primary Concerns:</strong>
                          <ul className="list-disc list-inside mt-1">
                            {mockEmotionalState.primaryConcerns.map((concern, index) => (
                              <li key={index}>{concern.type}</li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>

                    {selectedResult && (
                      <Card className="bg-green-50 border-green-200">
                        <CardHeader>
                          <CardTitle className="text-sm">Selected Result</CardTitle>
                        </CardHeader>
                        <CardContent className="text-xs space-y-2">
                          <div><strong>Title:</strong> {selectedResult.title}</div>
                          <div><strong>Type:</strong> {selectedResult.type}</div>
                          <div><strong>Emotional Tone:</strong> {selectedResult.emotionalTone}</div>
                          <div><strong>Urgency:</strong> {selectedResult.urgencyLevel}</div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Therapeutic Recommendations */}
          <TabsContent value="recommendations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="w-5 h-5 text-primary" />
                  <span>Therapeutic Content Recommendations</span>
                </CardTitle>
                <CardDescription>
                  Personalized content recommendations based on emotional journey stage, pain points,
                  and success story matching with hope-building progression.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TherapeuticRecommendations
                  interpreterProfile={interpreterProfile || mockInterpreterProfile}
                  emotionalState={mockEmotionalState}
                  journeyStage={mockJourneyStage}
                  onContentSelect={handleContentSelect}
                  onStorySelect={handleStorySelect}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Empowerment Onboarding */}
          <TabsContent value="onboarding" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span>Empowerment-Focused Onboarding</span>
                </CardTitle>
                <CardDescription>
                  Validation-first onboarding that acknowledges interpreter struggles, creates personalized
                  solution pathways, and facilitates peer connections.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!onboardingComplete ? (
                  <EmpowermentOnboarding
                    onComplete={handleOnboardingComplete}
                    onStepComplete={(stepId, data) => console.log('Step completed:', stepId, data)}
                  />
                ) : (
                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="pt-6 text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-green-800 mb-2">
                        Welcome to Your Empowerment Journey!
                      </h3>
                      <p className="text-green-700 mb-4">
                        Your personalized profile has been created. Check the Recommendations tab to see
                        your customized content and solution pathway.
                      </p>
                      <div className="text-sm text-green-600">
                        <strong>Profile Created:</strong> {interpreterProfile?.experienceLevel} interpreter
                        with {interpreterProfile?.strugglesIdentified.length} identified challenges
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Overview */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Search className="w-5 h-5 text-blue-600" />
                    <span>Pain-Point Search</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Intelligent search that filters by interpreter struggles and matches emotional tone.
                  </p>
                  <ul className="text-xs space-y-1">
                    <li>• Filters by burnout, financial stress, tech frustration</li>
                    <li>• Emotional tone matching (validating, hopeful, empowering)</li>
                    <li>• Crisis-aware prioritization</li>
                    <li>• Auto-personalization based on user state</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Lightbulb className="w-5 h-5 text-yellow-600" />
                    <span>Smart Recommendations</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Therapeutic content recommendations based on journey stage and pain points.
                  </p>
                  <ul className="text-xs space-y-1">
                    <li>• Journey stage-aware content filtering</li>
                    <li>• Success story matching by background</li>
                    <li>• Hope progression tracking</li>
                    <li>• Personalized learning paths</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-green-600" />
                    <span>Empathetic Onboarding</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Validation-first onboarding that creates personalized pathways.
                  </p>
                  <ul className="text-xs space-y-1">
                    <li>• Validation and struggle acknowledgment</li>
                    <li>• Pain point assessment and goal setting</li>
                    <li>• Personalized solution matching</li>
                    <li>• Community connection facilitation</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="md:col-span-2 lg:col-span-3">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-purple-600" />
                    <span>Key Features & Benefits</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Emotional Intelligence</h4>
                      <ul className="text-sm space-y-2">
                        <li className="flex items-start space-x-2">
                          <Heart className="w-4 h-4 text-pink-500 mt-0.5" />
                          <span>Validates interpreter struggles and experiences</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <Heart className="w-4 h-4 text-pink-500 mt-0.5" />
                          <span>Matches content to emotional readiness</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <Heart className="w-4 h-4 text-pink-500 mt-0.5" />
                          <span>Provides crisis support escalation</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Personalization</h4>
                      <ul className="text-sm space-y-2">
                        <li className="flex items-start space-x-2">
                          <Target className="w-4 h-4 text-green-500 mt-0.5" />
                          <span>Adapts to individual pain points and goals</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <Target className="w-4 h-4 text-green-500 mt-0.5" />
                          <span>Matches success stories by background</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <Target className="w-4 h-4 text-green-500 mt-0.5" />
                          <span>Creates customized learning pathways</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
