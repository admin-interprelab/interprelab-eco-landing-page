import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Mic, MicOff, Play, Volume2, ThumbsUp, ThumbsDown, Activity } from 'lucide-react';
import { callGemini } from '@/lib/gemini';
import { useToast } from '@/hooks/use-toast';

const speakText = (text: string, lang: string = 'en-US') => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }
};

interface Message {
  role: 'Doctor' | 'Patient' | 'Interpreter';
  text: string;
  feedback?: {
    score: number;
    feedback: string;
    strong_point: string;
    weak_point: string;
  };
}

export const LanguageAssessment = () => {
  const [topic, setTopic] = useState("");
  const [started, setStarted] = useState(false);
  const [history, setHistory] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [userTranscript, setUserTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  
  const { toast } = useToast();
  
  const [metrics, setMetrics] = useState({ 
    score: 100, 
    turns: 0, 
    strongAreas: ['Vocabulary'] as string[], 
    weakAreas: [] as string[] 
  });

  const recognitionRef = useRef<ISpeechRecognition | null>(null);

  useEffect(() => {
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join('');
        setUserTranscript(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setUserTranscript("");
      // If last role was Doctor (English), we interpret to Patient (Spanish), so we speak Spanish? 
      // No, usually we interpret FROM source TO target.
      // But SpeechRecognition needs to know what language to LISTEN for.
      // If Doctor spoke English, we interpret into Spanish. So we speak Spanish. 'es-MX'.
      // If Patient spoke Spanish, we interpret into English. So we speak English. 'en-US'.
      const lastRole = history.length > 0 ? history[history.length-1].role : 'Doctor';
      if (recognitionRef.current) {
        recognitionRef.current.lang = lastRole === 'Doctor' ? 'es-MX' : 'en-US';
        recognitionRef.current.start();
        setIsListening(true);
      }
    }
  };

  const startScenario = async () => {
    if (!topic) return;
    setStarted(true);
    setLoading(true);
    
    const prompt = `
      Start a medical roleplay about "${topic}".
      You are the Doctor (English). 
      Output ONLY the Doctor's first line (1-2 sentences max). No quotes.
    `;
    
    const firstLine = await callGemini(prompt);

    if (firstLine.startsWith("Error") || firstLine.startsWith("Connection error") || firstLine.startsWith("Unexpected error")) {
      toast({
        title: "AI Error",
        description: firstLine,
        variant: "destructive",
      });
      setLoading(false);
      setStarted(false); // Reset if failed
      return;
    }

    const newMsg: Message = { role: 'Doctor', text: firstLine };
    setHistory([newMsg]);
    setLoading(false);
    speakText(firstLine, 'en-US');
  };

  const processInterpretation = async () => {
    if (!userTranscript) return;
    setLoading(true);
    
    const lastMessage = history[history.length - 1];
    
    const assessPrompt = `
      ACT AS A MEDICAL INTERPRETER EXAMINER.
      Original (${lastMessage.role === 'Doctor' ? 'English' : 'Spanish'}): "${lastMessage.text}"
      Student Interpretation: "${userTranscript}"
      
      Provide JSON output ONLY:
      {
        "score": (0-100 integer),
        "feedback": "Brief critique (max 10 words)",
        "strong_point": "One specific strength (e.g. Terminology, Flow, Grammar)",
        "weak_point": "One specific weakness (or 'None' if good)"
      }
    `;
    
    let assessment = { score: 85, feedback: "Good flow", strong_point: "Flow", weak_point: "None" };
    
    const res = await callGemini(assessPrompt);
    
    if (res.startsWith("Error") || res.startsWith("Connection error") || res.startsWith("Unexpected error")) {
       toast({
         title: "AI Assessment Error",
         description: "Could not assess interpretation. Using fallback metrics.",
         variant: "destructive",
       });
       // We continue with fallback assessment to not break the flow, but warn user.
    } else {
      try {
        const cleanJson = res.replace(/```json/g, '').replace(/```/g, '').trim();
        assessment = JSON.parse(cleanJson);
      } catch(e) { 
        console.error("JSON parse error", e); 
        toast({
          title: "AI Parse Error",
          description: "Received invalid data from AI. Using fallback.",
          variant: "destructive",
        });
      }
    }

    setMetrics(prev => {
      const newWeakness = assessment.weak_point !== 'None' && !prev.weakAreas.includes(assessment.weak_point) 
        ? [...prev.weakAreas, assessment.weak_point] 
        : prev.weakAreas;
      
      return {
        score: Math.floor((prev.score * prev.turns + assessment.score) / (prev.turns + 1)),
        turns: prev.turns + 1,
        strongAreas: assessment.score > 90 ? [...new Set([...prev.strongAreas, assessment.strong_point])] : prev.strongAreas,
        weakAreas: newWeakness
      };
    });

    const interpMsg: Message = { 
      role: 'Interpreter', 
      text: userTranscript, 
      feedback: assessment 
    };
    
    const nextRole = lastMessage.role === 'Doctor' ? 'Patient' : 'Doctor';
    const contextPrompt = `
      Context: ${topic}.
      History: ${history.map(h => `${h.role}: ${h.text}`).join(' | ')}
      Interpreter successfully conveyed the message.
      
      Generate the ${nextRole}'s response in ${nextRole === 'Doctor' ? 'English' : 'Spanish'}.
      Keep it brief (1 sentence). Natural conversational tone. Output ONLY text.
    `;
    
    const nextLine = await callGemini(contextPrompt);

    if (nextLine.startsWith("Error") || nextLine.startsWith("Connection error") || nextLine.startsWith("Unexpected error")) {
      toast({
        title: "AI Error",
        description: "Could not generate next response.",
        variant: "destructive",
      });
      setLoading(false);
      // We add the interpretation but not the next response if it fails
      setHistory(prev => [...prev, interpMsg]);
      setUserTranscript("");
      return;
    }

    const nextMsg: Message = { role: nextRole, text: nextLine };
    
    setHistory(prev => [...prev, interpMsg, nextMsg]);
    setLoading(false);
    setUserTranscript("");
    
    speakText(nextLine, nextRole === 'Doctor' ? 'en-US' : 'es-MX');
  };

  if (!started) {
    return (
      <Card className="w-full max-w-4xl mx-auto border-primary/20 shadow-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <CardContent className="p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block p-4 rounded-full bg-primary/20 mb-6 shadow-lg shadow-primary/10">
                <Mic className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-4xl font-bold mb-4 leading-tight">Conversation Simulator</h2>
              <p className="text-slate-300 text-lg mb-8">Experience a realistic medical encounter. Listen to the provider, record your interpretation, and get instant AI grading.</p>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="scenario-topic" className="block text-xs uppercase tracking-wider text-primary font-bold mb-2">Select Scenario Topic</label>
                  <Input 
                    id="scenario-topic"
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g. Post-op discharge..."
                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 text-lg py-6"
                  />
                </div>
                <Button 
                  onClick={startScenario}
                  disabled={!topic || loading}
                  className="w-full py-6 text-lg font-bold bg-primary hover:bg-primary/90"
                >
                  {loading ? <Loader2 className="animate-spin mr-2" /> : <Play className="mr-2 fill-current" />}
                  Begin Simulation
                </Button>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
               <div className="relative w-64 h-64 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20 animate-pulse">
                  <Activity className="w-32 h-32 text-primary opacity-50" />
               </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
      
      {/* LEFT: QA DASHBOARD */}
      <Card className="lg:col-span-1 bg-slate-900 border-slate-800 text-white flex flex-col h-full">
        <CardHeader className="pb-4 border-b border-slate-800">
          <CardTitle className="text-sm font-bold text-slate-400 uppercase tracking-wider">Performance QA</CardTitle>
          <div className="flex items-end gap-2 mt-2">
            <span className={`text-5xl font-black ${metrics.score > 80 ? 'text-green-400' : 'text-yellow-400'}`}>{metrics.score}</span>
            <span className="text-sm text-slate-500 mb-2">/100</span>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto pt-4 space-y-6">
          <div>
            <h4 className="text-xs font-bold text-green-400 uppercase mb-2 flex items-center gap-1"><ThumbsUp className="w-3 h-3"/> Strong Areas</h4>
            <div className="flex flex-wrap gap-2">
              {metrics.strongAreas.map((area, i) => (
                <Badge key={i} variant="outline" className="border-green-800 text-green-200 bg-green-900/20">{area}</Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-red-400 uppercase mb-2 flex items-center gap-1"><ThumbsDown className="w-3 h-3"/> Areas of Opportunity</h4>
            {metrics.weakAreas.length === 0 ? <span className="text-xs text-slate-600 italic">None yet</span> : (
              <div className="flex flex-wrap gap-2">
                {metrics.weakAreas.map((area, i) => (
                  <Badge key={i} variant="outline" className="border-red-800 text-red-200 bg-red-900/20">{area}</Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* CENTER: CONVERSATION STREAM */}
      <div className="lg:col-span-3 flex flex-col gap-4 h-full">
        <Card className="flex-1 border-slate-200 bg-slate-50 shadow-inner overflow-hidden flex flex-col">
          <CardContent className="flex-1 overflow-y-auto p-6 space-y-6">
            {history.map((msg, idx) => (
              <div key={idx} className={`flex flex-col ${msg.role === 'Interpreter' ? 'items-end' : 'items-start'}`}>
                <div className={`relative max-w-[85%] p-4 rounded-2xl text-sm shadow-sm
                  ${msg.role === 'Doctor' ? 'bg-white border-l-4 border-blue-500 text-slate-800 rounded-tl-none' : 
                    msg.role === 'Patient' ? 'bg-white border-l-4 border-green-500 text-slate-800 rounded-tl-none' : 
                    'bg-primary text-primary-foreground rounded-tr-none'}`}>
                  
                  <div className="flex items-center justify-between gap-4 mb-2 border-b border-black/5 pb-1">
                    <span className="text-xs font-bold uppercase tracking-wide opacity-70">{msg.role}</span>
                    {msg.role !== 'Interpreter' && (
                      <button 
                        onClick={() => speakText(msg.text, msg.role === 'Doctor' ? 'en-US' : 'es-MX')} 
                        className="opacity-50 hover:opacity-100 transition-opacity"
                        aria-label="Play audio"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <p className="leading-relaxed text-base">{msg.text}</p>
                </div>
                
                {msg.feedback && (
                  <div className="mt-2 mr-1 flex items-center gap-2 text-xs font-medium text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
                    <span className={`w-2 h-2 rounded-full ${msg.feedback.score > 80 ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                    QA: {msg.feedback.feedback} ({msg.feedback.score}pts)
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* INPUT AREA */}
        <Card className="p-4 flex items-center gap-4 shadow-lg border-slate-200">
          <Button 
            onClick={toggleListening}
            disabled={loading}
            variant={isListening ? "destructive" : "default"}
            size="icon"
            className={`h-14 w-14 rounded-full shadow-md transition-all ${isListening ? 'animate-pulse' : ''}`}
            aria-label={isListening ? "Stop listening" : "Start listening"}
          >
            {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </Button>
          
          <div className="flex-1 relative">
            <Input 
              type="text"
              value={userTranscript}
              onChange={(e) => setUserTranscript(e.target.value)}
              placeholder={isListening ? "Listening..." : "Type interpretation here..."}
              className="w-full h-14 px-6 text-lg rounded-xl"
              disabled={loading}
              onKeyDown={(e) => e.key === 'Enter' && processInterpretation()}
            />
            {loading && <div className="absolute right-4 top-4"><Loader2 className="w-6 h-6 text-primary animate-spin" /></div>}
          </div>
          
          <Button 
            onClick={processInterpretation}
            disabled={!userTranscript || loading}
            className="h-14 px-8 font-bold rounded-xl"
          >
            Send
          </Button>
        </Card>
      </div>
    </div>
  );
};