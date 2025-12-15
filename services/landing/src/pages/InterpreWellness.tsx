import { Layout } from '@/components/Layout';
import { Button } from '@/lib/ui/components/ui/button';
import { Badge } from '@/lib/ui/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/lib/ui/components/ui/card';
import { Users, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

import { WellnessHero } from '@/components/wellness/WellnessHero';
import { WellnessChallenges } from '@/components/wellness/WellnessChallenges';
import { WellnessChat } from '@/components/wellness/WellnessChat';
import { DebriefingTool } from '@/components/wellness/DebriefingTool';

export default function InterpreWellness() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-background to-accent/5">
        
        {/* Hero Section */}
        <WellnessHero />

        {/* Understanding the Challenges */}
        <WellnessChallenges />

        {/* AI Support Features */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            {/* AI Counselor Chat */}
            <WellnessChat />

            {/* Debriefing Questionnaire */}
            <DebriefingTool />
          </div>
        </section>

        {/* Mission & Collaboration */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
              <CardHeader>
                <Badge className="w-fit mb-2">Our Mission</Badge>
                <CardTitle className="text-2xl">We're Building This Together</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  At InterpreLab, we're not corporate observers—we're working interpreters who live these challenges every day. We know the isolation, the trauma, the burnout. That's why we're passionate about creating solutions that truly support our community.
                </p>
                <div className="pt-4 space-y-3">
                  <p className="font-semibold text-foreground">Want to Help Shape This Tool?</p>
                  <p className="text-sm text-muted-foreground">
                    If you want to collaborate, discuss partnerships, or help us reach more interpreters through your connections, we'd love to hear from you. Together, we can lighten the load.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button asChild>
                      <Link to="/contact">Get in Touch</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/interprelink">Join InterpreLink Community</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Support Resources */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-6">You're Not Alone</h3>
            <p className="text-muted-foreground mb-8">
              Connect with fellow interpreters and access resources through our community.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <Users className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>InterpreLink Community</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Connect with fellow interpreters who understand your experience. Share, support, and grow together.
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/interprelink">Join the Community</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <MessageCircle className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Professional Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Access articles, guides, and best practices for managing the emotional demands of interpreting.
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/resources">Browse Resources</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
