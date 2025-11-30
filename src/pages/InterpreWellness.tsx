import { useState, useRef, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Heart, MessageCircle, Users, Sparkles, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const debriefingQuestions = [
  "How are you feeling emotionally after today's interpreting sessions?",
  "Did you encounter any particularly difficult or traumatic calls today?",
  "Are you experiencing any physical symptoms of stress (headaches, fatigue, tension)?",
  "How well were you able to maintain professional boundaries today?",
  "Did you feel adequately supported by your team or LSP today?",
  "What self-care practices have you engaged in recently?",
  "On a scale of 1-10, how would you rate your current stress level?",
  "Is there anything specific you'd like to talk about or process?"
];

export default function InterpreWellness() {
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDebriefing, setShowDebriefing] = useState(false);
  const [debriefingResponses, setDebriefingResponses] = useState<string[]>(Array(debriefingQuestions.length).fill(''));
  const [debriefingAnalysis, setDebriefingAnalysis] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const streamChat = async (userMessage: string) => {
    const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/wellness-chat`;
    const newMessages = [...chatMessages, { role: 'user' as const, content: userMessage }];
    
    setChatMessages([...newMessages, { role: 'assistant' as const, content: '' }]);
    setIsLoading(true);

    try {
      const resp = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (resp.status === 429) {
        toast.error("Rate limits exceeded, please try again in a moment.");
        setChatMessages(prev => prev.slice(0, -1));
        return;
      }
      if (resp.status === 402) {
        toast.error("Service temporarily unavailable. Please contact support.");
        setChatMessages(prev => prev.slice(0, -1));
        return;
      }

      if (!resp.ok || !resp.body) throw new Error('Failed to start stream');

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = '';
      let assistantMessage = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantMessage += content;
              setChatMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: 'assistant', content: assistantMessage };
                return updated;
              });
            }
          } catch {
            break;
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      toast.error('Failed to connect to wellness support. Please try again.');
      setChatMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim() || isLoading) return;
    
    const message = chatInput.trim();
    setChatInput('');
    await streamChat(message);
  };

  const handleDebriefingSubmit = async () => {
    const filledResponses = debriefingResponses.filter(r => r.trim());
    if (filledResponses.length === 0) {
      toast.error('Please answer at least one question');
      return;
    }

    setIsAnalyzing(true);
    
    try {
      const responsesText = debriefingQuestions
        .map((q, i) => debriefingResponses[i] ? `Q: ${q}\nA: ${debriefingResponses[i]}` : '')
        .filter(Boolean)
        .join('\n\n');

      const { data, error } = await supabase.functions.invoke('debriefing-questionnaire', {
        body: { responses: responsesText }
      });

      if (error) throw error;
      
      setDebriefingAnalysis(data.analysis);
      toast.success('Analysis complete!');
    } catch (error) {
      console.error('Debriefing error:', error);
      toast.error('Failed to analyze responses. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-background to-accent/5">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('/src/assets/wellness-support.jpg')" }}>
          <div className="absolute inset-0 bg-black/60" />
          <div className="max-w-4xl mx-auto relative z-10">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Addressing Pain Point #5: Psychological Toll & Lack of Support
            </Badge>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Interpre-Wellness
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              We understand the weight you carry. The emotional toll of absorbing trauma, speaking in first person, feeling isolated after difficult calls—we've been there. Interpre-Wellness is your compassionate companion, a safe space to process, reflect, and heal.
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

        {/* AI Support Features */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            {/* AI Counselor Chat */}
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-6 w-6 text-primary" />
                  AI Wellness Counselor
                </CardTitle>
                <CardDescription>
                  Talk with our empathetic AI trained to understand interpreter-specific challenges
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="flex-1 space-y-4 mb-4 max-h-[400px] overflow-y-auto">
                  {chatMessages.length === 0 && (
                    <div className="text-center py-8">
                      <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Share your feelings, vent about your day, or discuss any challenges you're facing.
                      </p>
                    </div>
                  )}
                  {chatMessages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-lg ${
                        msg.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}>
                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>
                <div className="flex gap-2">
                  <Textarea
                    placeholder="How are you feeling today? Share what's on your mind..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="min-h-[60px]"
                    disabled={isLoading}
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={isLoading || !chatInput.trim()}
                    size="icon"
                    className="h-[60px]"
                  >
                    {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Debriefing Questionnaire */}
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                  Debriefing Questionnaire
                </CardTitle>
                <CardDescription>
                  Structured reflection to process your experiences and identify areas needing support
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                {!showDebriefing ? (
                  <div className="text-center py-8 flex flex-col items-center justify-center flex-1">
                    <MessageCircle className="h-12 w-12 text-primary mb-4" />
                    <p className="text-muted-foreground mb-6">
                      Answer guided questions to help process difficult encounters and receive personalized insights.
                    </p>
                    <Button onClick={() => setShowDebriefing(true)} size="lg">
                      Start Debriefing
                    </Button>
                  </div>
                ) : debriefingAnalysis ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Your Personalized Insights</h3>
                    </div>
                    <div className="prose prose-sm max-w-none">
                      <p className="whitespace-pre-wrap text-sm">{debriefingAnalysis}</p>
                    </div>
                    <Button 
                      onClick={() => {
                        setShowDebriefing(false);
                        setDebriefingAnalysis('');
                        setDebriefingResponses(Array(debriefingQuestions.length).fill(''));
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      Start New Debriefing
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[400px] overflow-y-auto">
                    {debriefingQuestions.map((question, i) => (
                      <div key={i} className="space-y-2">
                        <label className="text-sm font-medium">{question}</label>
                        <Textarea
                          value={debriefingResponses[i]}
                          onChange={(e) => {
                            const newResponses = [...debriefingResponses];
                            newResponses[i] = e.target.value;
                            setDebriefingResponses(newResponses);
                          }}
                          placeholder="Your response..."
                          className="min-h-[60px]"
                        />
                      </div>
                    ))}
                    <Button 
                      onClick={handleDebriefingSubmit}
                      disabled={isAnalyzing}
                      className="w-full"
                    >
                      {isAnalyzing ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                      Get Personalized Insights
                    </Button>
                  </div>
                )}
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