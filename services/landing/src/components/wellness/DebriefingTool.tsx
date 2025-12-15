import React, { useState } from 'react';
import { Button } from '@/lib/ui/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/lib/ui/components/ui/card';
import { Textarea } from '@/lib/ui/components/ui/textarea';
import { CheckCircle2, MessageCircle, Sparkles, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

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

export const DebriefingTool: React.FC = () => {
  const [showDebriefing, setShowDebriefing] = useState(false);
  const [debriefingResponses, setDebriefingResponses] = useState<string[]>(Array(debriefingQuestions.length).fill(''));
  const [debriefingAnalysis, setDebriefingAnalysis] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

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

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message || 'Failed to process debriefing');
      }
      
      if (!data || !data.analysis) {
        throw new Error('Received empty analysis from AI');
      }

      setDebriefingAnalysis(data.analysis);
      toast.success('Analysis complete!');
      setDebriefingResponses(Array(debriefingQuestions.length).fill('')); // Optional: clear inputs? Maybe keep them.
      // I'll keep inputs for now so user can see what they wrote if they want, but the UI switches to "Personalized Insights" view anyway.
    } catch (error: any) {
      console.error('Debriefing error:', error);
      toast.error(error.message || 'Failed to analyze responses. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Card className="flex flex-col h-full">
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
  );
};
