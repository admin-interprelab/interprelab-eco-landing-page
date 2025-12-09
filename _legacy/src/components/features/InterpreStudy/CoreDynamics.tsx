import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MessageSquare, Loader2, Copy, Check } from 'lucide-react';
import { callGemini } from '@/lib/gemini';
import { toast } from 'sonner';

export const CoreDynamics = () => {
  const [topic, setTopic] = useState("");
  const [script, setScript] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setScript("");
    setCopied(false);

    const prompt = `
      Generate a bilingual medical dialogue script (Doctor EN / Patient ES) about: "${topic}".
      Include key terminology definitions at the top. 
      Format nicely with Markdown (bold roles, bullet points for terms).
    `;

    const result = await callGemini(prompt);
    setScript(result);
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(script);
    setCopied(true);
    toast.success("Script copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">Scenario Generator</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Instantly generate custom bilingual medical scripts for practice. 
          Focus on specific conditions, specialties, or difficult terminology.
        </p>
      </div>

      <Card className="border-primary/20 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary"/> 
            Quick Script Generator
          </CardTitle>
          <CardDescription>Enter a topic to generate a roleplay script.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Input 
              type="text" 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Pediatric asthma, Cardiology follow-up, Diabetes education..."
              className="flex-1 py-6 text-lg"
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            />
            <Button 
              onClick={handleGenerate}
              disabled={loading || !topic}
              size="lg"
              className="px-8 font-semibold"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : "Generate"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {script && (
        <Card className="border-slate-200 bg-slate-50/50">
          <CardContent className="p-8 relative">
            <Button
              variant="outline"
              size="icon"
              className="absolute top-4 right-4 bg-white shadow-sm"
              onClick={copyToClipboard}
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-slate-500" />}
            </Button>
            <div className="prose prose-slate max-w-none whitespace-pre-wrap">
              {/* Basic markdown rendering since we don't have a markdown component installed presumably, 
                  or we rely on whitespace-pre-wrap. Ideally use ReactMarkdown if available. 
                  For now, text is fine. */}
              {script.split('\n').map((line, i) => (
                <p key={i} className={line.startsWith('**') ? 'font-bold mt-4' : 'mb-2'}>
                  {line.replace(/\*\*/g, '')}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
