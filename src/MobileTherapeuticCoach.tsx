import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, MessageSquare, Mic, Send, Sparkles, HelpCircle, RefreshCw, Bot, User, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface ChatMessage {
  id: string;
  author: 'user' | 'bot';
  text: string;
  timestamp: string;
  imageUrl?: string | null; // null for loading state
}

const MobileTherapeuticCoach: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'voice'>('chat');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', author: 'bot', text: "Welcome. I'm here to listen. Feel free to share what's on your mind. This is a safe space, and nothing is stored.", timestamp: '10:30 AM' },
    { id: '2', author: 'user', text: "I just finished a really tough session in the ICU. The patient's family was so distressed, and I had to interpret the doctor delivering bad news. It was emotionally draining.", timestamp: '10:32 AM' },
    { id: '3', author: 'bot', text: "That sounds incredibly difficult. It takes a lot of strength to navigate such emotionally charged situations. It's completely understandable that you feel drained.", timestamp: '10:33 AM' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const reflectiveQuestions = [
    "What was the most challenging part of that session for you?",
    "How did you manage your own emotions during the interpretation?",
    "Is there anything you wish you could have said or done differently?",
    "What's one thing you can do for yourself right now to decompress?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const userMessage: ChatMessage = {
      id: String(Date.now()),
      author: 'user',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages: ChatMessage[] = [...messages, userMessage];
    setMessages(newMessages);
    setNewMessage('');
    setIsBotTyping(true);

    // Fetch bot response and conversation art in parallel
    const [botTextResponse] = await Promise.all([
      fetch('/api/therapeutic-coach', {
        method: 'POST',
        body: JSON.stringify({ messages: newMessages }),
      }).then(res => res.json()),
    ]);

    setIsBotTyping(false);

    const botMessageId = String(Date.now() + 1);
    const botResponse: ChatMessage = {
      id: botMessageId,
      author: 'bot',
      text: botTextResponse.response || "I'm here to listen. Please continue.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      imageUrl: null, // Placeholder for loading state
    };

    setMessages(prev => [...prev, botResponse]);

    // Now fetch the conversation art
    try {
      const artResponse = await fetch('/api/conversation-art', {
        method: 'POST',
        body: JSON.stringify({ prompt: userMessage.text }),
      }).then(res => res.json());

      if (artResponse.imageUrl) {
        setMessages(prev => prev.map(msg =>
          msg.id === botMessageId ? { ...msg, imageUrl: artResponse.imageUrl } : msg
        ));
      } else {
        // Handle cases where image generation fails but text doesn't
        setMessages(prev => prev.map(msg =>
          msg.id === botMessageId ? { ...msg, imageUrl: undefined } : msg
        ));
      }
    } catch (artError) {
      console.error("Failed to get conversation art:", artError);
      setMessages(prev => prev.map(msg =>
        msg.id === botMessageId ? { ...msg, imageUrl: undefined } : msg
      ));
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In a real app, this would integrate with Web Speech API
  };

  return (
    <div className="flex flex-col h-screen bg-background md:hidden">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b bg-card">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Avatar>
            <AvatarFallback className="bg-primary/20">
              <Sparkles className="w-5 h-5 text-primary" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-semibold text-base">AI Venting Coach</h1>
            <p className="text-xs text-muted-foreground">A safe space to reflect</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Chat Messages */}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex items-end gap-3 max-w-[85%]",
              msg.author === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
            )}
          >
            <Avatar className="w-8 h-8">
              <AvatarFallback className={cn(msg.author === 'user' ? "bg-primary" : "bg-muted")}>
                {msg.author === 'user' ? <User size={16} /> : <Bot size={16} />}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div
                className={cn(
                  "p-3 rounded-2xl",
                  msg.author === 'user'
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-card border rounded-bl-none"
                )}
              >
                {msg.imageUrl === null && (
                  <div className="flex items-center justify-center p-4 border-b">
                    <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                    <p className="ml-2 text-sm text-muted-foreground">Generating art...</p>
                  </div>
                )}
                {msg.imageUrl && (
                  <div className="mb-2 border-b pb-2">
                    <img
                      src={msg.imageUrl}
                      alt="A visual representation of the conversation's mood."
                      className="rounded-lg w-full object-cover"
                    />
                  </div>
                )}
                <p className="text-sm">{msg.text}</p>
              </div>
              <p className={cn(
                "text-xs text-muted-foreground mt-1",
                msg.author === 'user' ? "text-right" : "text-left"
              )}>
                {msg.timestamp}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />

        {isBotTyping && (
          <div className="flex items-end gap-3 max-w-[85%] mr-auto">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-muted"><Bot size={16} /></AvatarFallback>
            </Avatar>
            <div className="p-3 rounded-2xl bg-card border rounded-bl-none">
              <div className="flex gap-1 items-center">
                <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"></span>
              </div>
            </div>
          </div>
        )}

        {/* Reflective Questions */}
        <Card className="bg-card/50 border-dashed">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-primary" />
              Self-Reflection Prompts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {reflectiveQuestions.map((q, i) => (
              <p key={i} className="text-sm text-muted-foreground italic">"{q}"</p>
            ))}
            <Button variant="outline" size="sm" className="mt-2">
              <RefreshCw className="w-4 h-4 mr-2" />
              New Questions
            </Button>
          </CardContent>
        </Card>
      </main>

      {/* Input Footer */}
      <footer className="p-4 border-t bg-card">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="chat"><MessageSquare className="w-4 h-4 mr-2" />Chat</TabsTrigger>
            <TabsTrigger value="voice"><Mic className="w-4 h-4 mr-2" />Voice</TabsTrigger>
          </TabsList>
          <TabsContent value="chat">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Share what's on your mind..."
                className="flex-1"
                autoComplete="off"
              />
              <Button size="icon" type="submit" disabled={isBotTyping}>
                <Send className="w-5 h-5" />
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="voice" className="flex flex-col items-center justify-center h-24">
            <Button
              size="lg"
              variant={isRecording ? 'destructive' : 'default'}
              onClick={toggleRecording}
              className="rounded-full w-16 h-16"
            >
              <Mic className="w-6 h-6" />
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              {isRecording ? "Recording... tap to stop" : "Tap to speak"}
            </p>
          </TabsContent>
        </Tabs>
      </footer>
    </div>
  );
};

export default MobileTherapeuticCoach;
