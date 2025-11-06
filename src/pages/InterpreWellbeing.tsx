import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, Phone, Sparkles, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function InterpreWellbeing() {
  const [isListening, setIsListening] = useState(false);

  const wellbeingTopics = [
    {
      icon: Heart,
      title: "Compassion Fatigue",
      description: "The emotional and physical exhaustion from deep empathy for suffering patients."
    },
    {
      icon: MessageCircle,
      title: "Vicarious Trauma",
      description: "A cognitive shift from empathic engagement with trauma survivors, intensified by first-person narration."
    },
    {
      icon: Users,
      title: "Burnout Prevention",
      description: "Managing the exhaustion from high-stakes interactions and cognitive load of simultaneous interpretation."
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-background to-accent/5">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5" />
          <div className="max-w-4xl mx-auto relative z-10">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Addressing Pain Point #5: Psychological Toll & Lack of Support
            </Badge>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              InterpreWellbeing
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              We understand the weight you carry. The emotional toll of absorbing trauma, speaking in first person, feeling isolated after difficult calls—we've been there. InterpreWellbeing is your compassionate companion, a safe space to process, reflect, and heal.
            </p>
            <div className="glass p-6 rounded-lg mb-8">
              <p className="text-sm text-muted-foreground">
                💙 <strong>Built from lived experience:</strong> As working interpreters, we know the psychological demands of this work. You verbally embody patients' pain and fear. You deserve support that understands the unique nature of medical interpreting.
              </p>
            </div>
          </div>
        </section>

        {/* Understanding the Challenges */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">We Understand What You Face</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {wellbeingTopics.map((topic, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <topic.icon className="h-10 w-10 text-primary mb-3" />
                    <CardTitle>{topic.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{topic.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Voice Agent Feature - Coming Soon */}
        <section className="py-16 px-4 bg-accent/5">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <Sparkles className="h-3 w-3 mr-1 inline" />
              In Development - Coming Soon
            </Badge>
            <h2 className="text-3xl font-bold mb-6">Your AI Companion for Wellbeing</h2>
            <Card className="text-left">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-6 w-6 text-primary" />
                  Voice-Enabled Emotional Support
                </CardTitle>
                <CardDescription>
                  Talk to InterpreWellbeing AI - your compassionate, understanding companion
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-6 bg-primary/5 rounded-lg text-center">
                  <Heart className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Coming Soon: Real-Time Voice Conversations</h3>
                  <p className="text-muted-foreground mb-4">
                    InterpreWellbeing will be a voice agent you can talk to after difficult calls. Share your feelings, vent about high-stress encounters, and receive gentle, reflective questions to help process emotions.
                  </p>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p>✨ <strong>Compassionate AI</strong> - Trained to understand interpreter-specific challenges</p>
                    <p>🎤 <strong>Voice-First Experience</strong> - Talk naturally, just like with a trusted friend</p>
                    <p>💭 <strong>Reflective Guidance</strong> - Gentle questions to help you process and heal</p>
                    <p>🔒 <strong>Private & Secure</strong> - Your conversations are confidential</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">How It Will Work:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">1.</span>
                      <span>Click the microphone button to start a conversation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">2.</span>
                      <span>Speak freely about what you're feeling - stress, difficult calls, emotional weight</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">3.</span>
                      <span>Receive compassionate responses and reflective questions tailored to your needs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">4.</span>
                      <span>Access conversation summaries and self-care recommendations</span>
                    </li>
                  </ul>
                </div>

                <Button 
                  size="lg" 
                  className="w-full" 
                  disabled
                  variant="outline"
                >
                  <Heart className="mr-2 h-5 w-5" />
                  Voice Agent Coming Soon
                </Button>
              </CardContent>
            </Card>
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
                <p className="text-muted-foreground">
                  <strong>InterpreWellbeing is in its early stages.</strong> We're developing this tool with the same care we wish we had when we started interpreting. As we scale, expect more functionalities designed to support your mental health and professional wellbeing.
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
              While InterpreWellbeing AI is in development, connect with fellow interpreters and access resources through our community.
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
