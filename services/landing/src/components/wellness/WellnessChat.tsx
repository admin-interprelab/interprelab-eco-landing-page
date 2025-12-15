import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/lib/ui/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/lib/ui/components/ui/card';
import { Textarea } from '@/lib/ui/components/ui/textarea';
import { Heart, Sparkles, Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const WellnessChat: React.FC = () => {
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

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
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
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
                // Ensure we don't duplicate the assistant message block if it was just added
                if (updated[updated.length - 1].role === 'assistant') {
                    updated[updated.length - 1] = { role: 'assistant', content: assistantMessage };
                } else {
                    // Should have been added before stream start, but safe fallback
                    updated.push({ role: 'assistant', content: assistantMessage });
                }
                return updated;
              });
            }
          } catch (e) {
            console.warn('Failed to parse stream chunk:', e);
            // Continue processing next chunk instead of breaking completely
            continue;
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      toast.error('Connection lost. Please try again.');
      // Remove the empty assistant message if it failed completely with no content
      setChatMessages(prev => {
          if (prev.length > 0 && prev[prev.length - 1].role === 'assistant' && prev[prev.length - 1].content === '') {
              return prev.slice(0, -1);
          }
          return prev;
      });
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

  return (
    <Card className="flex flex-col h-full">
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
            aria-label="Send message"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
