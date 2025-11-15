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
  const [chatMode, setChatMode] = useState<'ethics' | 'quiz' | 'general'>('general');

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);

    import { runChat } from '../../services/gemini';

// ... (imports)

// ... (Message interface)

export const InteractiveChat = () => {
  // ... (state declarations)

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await runChat(input);
      const assistantMessage: Message = {
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error fetching from Gemini API:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // ... (rest of the component)

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

        {/* Chat Mode Selector */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm font-medium">Mode:</span>
          <div className="flex gap-1">
            {[
              { value: 'general', label: 'General', icon: '💬' },
              { value: 'ethics', label: 'Ethics', icon: '⚖️' },
              { value: 'quiz', label: 'Quiz', icon: '🧠' },
            ].map((mode) => (
              <Button
                key={mode.value}
                variant={chatMode === mode.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setChatMode(mode.value as typeof chatMode)}
                className="text-xs"
              >
                {mode.icon} {mode.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setChatMode('ethics');
              setInput('Quiz me on code of ethics');
            }}
          >
            Ethics Quiz
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setChatMode('general');
              setInput('What are the standards of practice?');
            }}
          >
            Standards Query
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setChatMode('quiz');
              setInput('Test my knowledge');
            }}
          >
            Knowledge Test
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
