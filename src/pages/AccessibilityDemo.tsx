import React from 'react';
import { Navigation } from '@/components/Navigation';
import { SemanticSection, TherapeuticButton, useTherapeuticAria } from '@/components/accessibility';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AccessibilityDemo: React.FC = () => {
  const { announceValidation, announceEncouragement, announceCrisisSupport } = useTherapeuticAria();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main id="main-content" className="container mx-auto px-6 py-8 space-y-8" tabIndex={-1}>
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Accessibility Features Demo</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            This page demonstrates the stress-aware accessibility features implemented for interpreters.
            Try using keyboard navigation (Tab key) and the accessibility controls in the top navigation.
          </p>
        </div>

        {/* Crisis Support Section */}
        <SemanticSection
          sectionType="crisis-support"
          title="Crisis Support Resources"
          description="Immediate help and support resources for interpreters in distress"
          priority="high"
        >
          <Card className="border-destructive/20 bg-destructive/5">
            <CardHeader>
              <CardTitle className="text-destructive">Need Immediate Support?</CardTitle>
              <CardDescription>
                Crisis support resources are available 24/7. Use keyboard shortcuts for quick access.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <TherapeuticButton
                therapeuticContext="crisis-support"
                onClick={() => announceCrisisSupport()}
                className="bg-destructive hover:bg-destructive/90"
                ariaDescription="Access immediate crisis support resources and emergency contacts"
              >
                Get Crisis Support (Ctrl+Shift+H)
              </TherapeuticButton>
              <p className="text-sm text-muted-foreground">
                Keyboard shortcut: Ctrl+Shift+H for immediate access
              </p>
            </CardContent>
          </Card>
        </SemanticSection>

        {/* Validation Section */}
        <SemanticSection
          sectionType="validation"
          title="Understanding Your Challenges"
          description="Validation and acknowledgment of interpreter struggles and experiences"
        >
          <Card>
            <CardHeader>
              <CardTitle>Your Struggles Are Valid</CardTitle>
              <CardDescription>
                The challenges you face as an interpreter are real and acknowledged.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Financial pressures, technological failures, and emotional toll are common experiences
                in the interpretation industry. You are not alone in facing these challenges.
              </p>
              <TherapeuticButton
                therapeuticContext="validation"
                onClick={() => announceValidation('financial-stress')}
                validationMessage="Your financial concerns are completely valid and shared by many interpreters."
              >
                Acknowledge Financial Stress
              </TherapeuticButton>
              <TherapeuticButton
                therapeuticContext="validation"
                onClick={() => announceValidation('burnout')}
                validationMessage="Burnout is a natural response to the demanding nature of interpretation work."
              >
                Acknowledge Burnout
              </TherapeuticButton>
            </CardContent>
          </Card>
        </SemanticSection>

        {/* Hope Building Section */}
        <SemanticSection
          sectionType="hope-building"
          title="Building Hope and Possibilities"
          description="Inspiring content and success stories to build hope for professional growth"
        >
          <Card>
            <CardHeader>
              <CardTitle>There Is Hope</CardTitle>
              <CardDescription>
                Many interpreters have successfully transformed their careers and wellbeing.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                AI-powered tools and supportive communities can significantly reduce stress and
                improve your professional experience. Success stories from fellow interpreters
                show that positive change is possible.
              </p>
              <TherapeuticButton
                therapeuticContext="hope-building"
                onClick={() => announceEncouragement('success-story-engagement')}
                encouragementMessage="Reading success stories shows your commitment to positive change."
              >
                Read Success Stories
              </TherapeuticButton>
            </CardContent>
          </Card>
        </SemanticSection>

        {/* Solution Exploration Section */}
        <SemanticSection
          sectionType="solution-exploration"
          title="AI-Powered Solutions"
          description="Explore tools and technologies designed to help interpreters succeed"
        >
          <Card>
            <CardHeader>
              <CardTitle>Discover AI Solutions</CardTitle>
              <CardDescription>
                Advanced tools designed specifically to address interpreter challenges.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">InterpreCoach</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Real-time AI support to reduce cognitive load during sessions.
                  </p>
                  <TherapeuticButton
                    therapeuticContext="solution-exploration"
                    onClick={() => announceEncouragement('tool-exploration')}
                    size="sm"
                  >
                    Explore InterpreCoach
                  </TherapeuticButton>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">InterpreStudy</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    AI-powered training that addresses the $1000+ cost barrier.
                  </p>
                  <TherapeuticButton
                    therapeuticContext="solution-exploration"
                    onClick={() => announceEncouragement('tool-exploration')}
                    size="sm"
                  >
                    Explore InterpreStudy
                  </TherapeuticButton>
                </div>
              </div>
            </CardContent>
          </Card>
        </SemanticSection>

        {/* Empowerment Section */}
        <SemanticSection
          sectionType="empowerment"
          title="Take Action for Your Future"
          description="Empowering steps and actions for professional development and growth"
        >
          <Card>
            <CardHeader>
              <CardTitle>Empower Your Career</CardTitle>
              <CardDescription>
                Take concrete steps toward professional growth and wellbeing.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                You have the power to transform your professional experience. Investment in
                AI-powered tools and community support can lead to meaningful career advancement.
              </p>
              <div className="flex gap-4">
                <TherapeuticButton
                  therapeuticContext="empowerment"
                  onClick={() => announceEncouragement('community-engagement')}
                  encouragementMessage="Joining the community is a powerful step toward professional growth."
                >
                  Join Community
                </TherapeuticButton>
                <TherapeuticButton
                  therapeuticContext="empowerment"
                  onClick={() => announceEncouragement('learning-progress')}
                  encouragementMessage="Investing in premium tools shows your commitment to excellence."
                >
                  Explore Premium Plans
                </TherapeuticButton>
              </div>
            </CardContent>
          </Card>
        </SemanticSection>

        {/* Accessibility Instructions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Accessibility Features</CardTitle>
            <CardDescription>
              How to use the stress-aware accessibility features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Keyboard Shortcuts</h4>
                <ul className="text-sm space-y-1">
                  <li><kbd className="px-2 py-1 bg-muted rounded">Ctrl+Shift+H</kbd> - Crisis Support</li>
                  <li><kbd className="px-2 py-1 bg-muted rounded">Ctrl+Shift+P</kbd> - Peer Support</li>
                  <li><kbd className="px-2 py-1 bg-muted rounded">Ctrl+Shift+C</kbd> - Calming Content</li>
                  <li><kbd className="px-2 py-1 bg-muted rounded">Tab</kbd> - Navigate with enhanced focus indicators</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Visual Options</h4>
                <ul className="text-sm space-y-1">
                  <li>• Calming color themes (soft blues, warm tones)</li>
                  <li>• Reduced motion for stress sensitivity</li>
                  <li>• High contrast with emotional warmth</li>
                  <li>• Adjustable font sizes</li>
                  <li>• High stress mode (simplified interface)</li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Access these options through the accessibility controls (gear icon) in the top navigation.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AccessibilityDemo;
