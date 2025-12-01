import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Users, MessageCircle, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export const WellnessSection = () => {
  return (
    <section className="py-32 px-6 bg-gradient-to-b from-background to-muted/20" id="wellness-section">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4">
          <Badge className="glass px-6 py-3 border-primary/20">
            <Heart className="w-4 h-4 mr-2 inline" />
            InterpreWellness
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-foreground">Because Your Wellbeing</span>
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Matters As Much As Your Skills
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive mental health support and community designed specifically for the unique
            challenges interpreters face daily
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* AI Counselor */}
          <Card className="glass border-border/30 hover-lift">
            <CardContent className="p-8 space-y-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-foreground">AI Counselor</h3>
                <p className="text-muted-foreground">
                  Talk with our AI-counselor trained to listen and provide supportive (non-professional)
                  support 24/7
                </p>

                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                    <span>AI-powered debriefing questionnaire for quick express debrief</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                    <span>Trauma-informed care resources and techniques</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                    <span>Burnout prevention with wellness challenges and tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                    <span>Stress pattern recognition and recommended break schedules</span>
                  </li>
                </ul>
              </div>

              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <Heart className="w-4 h-4 mr-2" />
                Access Wellness Resources
              </Button>
            </CardContent>
          </Card>

          {/* InterpreLink Community */}
          <Card className="glass border-border/30 hover-lift">
            <CardContent className="p-8 space-y-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-foreground">InterpreLink Community</h3>
                <p className="text-muted-foreground">
                  "If LinkedIn and Facebook had a baby" - Professional network designed exclusively for
                  interpreters
                </p>

                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-success rounded-full mt-2" />
                    <span>Professional wall with Facebook-style feed and posts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-success rounded-full mt-2" />
                    <span>Video reels studio (TikTok/Instagram-style content)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-success rounded-full mt-2" />
                    <span>Job boards and career opportunities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-success rounded-full mt-2" />
                    <span>Public/private groups, instant messaging, mentorship matching</span>
                  </li>
                </ul>
              </div>

              <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
                <Users className="w-4 h-4 mr-2" />
                Join Our Community
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Additional Resources */}
        <div className="mt-12 text-center">
          <Card className="glass border-border/30 max-w-2xl mx-auto">
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <BookOpen className="w-6 h-6 text-muted-foreground" />
                <p className="text-muted-foreground">
                  New to wellness support?{' '}
                  <Link to="/resources" className="text-primary hover:underline font-medium">
                    Explore our wellness resources library
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
