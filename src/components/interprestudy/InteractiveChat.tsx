import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Send, Mic, StopCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const InteractiveChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    const newMessages = [...messages, userMessage];
    setMessages([...newMessages, { role: 'assistant', content: '', timestamp: new Date() }]);
    setInput('');
    setIsLoading(true);

    try {
      const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/study-chat`;
      const resp = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: newMessages.map(m => ({ role: m.role, content: m.content })), specialty: 'ethics' }),
      });

      if (!resp.ok || !resp.body) throw new Error('Failed');

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
              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: 'assistant', content: assistantMessage, timestamp: new Date() };
                return updated;
              });
            }
          } catch { break; }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // TODO: Implement voice recording
  };

  return (
    <Card className="glass border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-primary" />
            AI Ethics & Standards Coach
          </div>
          <Badge variant="outline">Multimodal</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Chat Area */}
        <ScrollArea className="h-[500px] rounded-lg border border-border/50 p-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <MessageSquare className="w-16 h-16 text-muted-foreground" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Start Your Learning Session</h3>
                <p className="text-sm text-muted-foreground">
                  Ask about code of ethics, standards of practice, or request a quiz
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg p-4">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </ScrollArea>

        {/* Input Area */}
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about ethics, request a quiz, or query standards..."
            className="min-h-[80px]"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <div className="flex flex-col gap-2">
            <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
              <Send className="w-4 h-4" />
            </Button>
            <Button
              variant={isRecording ? 'destructive' : 'outline'}
              onClick={toggleRecording}
            >
              {isRecording ? <StopCircle className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setInput('Quiz me on code of ethics')}
          >
            Ethics Quiz
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setInput('What are the standards of practice?')}
          >
            Standards Query
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setInput('Test my knowledge')}
          >
            Knowledge Test
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
