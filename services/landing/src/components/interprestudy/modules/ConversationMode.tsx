import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Play, Volume2, Loader2, ThumbsUp, ThumbsDown, User, Smile, Languages, ClipboardList, Clock, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

// --- GEMINI API UTILITIES ---
const apiKey = ""; // API Key injected at runtime

const callGemini = async (prompt: string) => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
  const payload = {
    contents: [{ parts: [{ text: prompt }] }]
  };

  let attempt = 0;
  const maxRetries = 3;
  const delays = [1000, 2000, 4000];

  while (attempt < maxRetries) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
         if (response.status === 429) {
            throw new Error("Rate limit exceeded");
         }
         throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "No content generated.";

    } catch (error) {
      attempt++;
      if (attempt >= maxRetries) {
        return "Connection error. Please try again later.";
      }
      await new Promise(resolve => setTimeout(resolve, delays[attempt - 1]));
    }
  }
};

// --- ENHANCED SPEECH UTILS (NATURAL SOUNDING) ---
const speakText = (text: string, lang = 'en-US') => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel(); // Stop any current speech
    const utterance = new SpeechSynthesisUtterance(text);

    // Try to select a better voice if available (Chrome/Edge)
    const voices = window.speechSynthesis.getVoices();
    let preferredVoice = null;

    if (lang === 'en-US') {
        preferredVoice = voices.find(v => v.name.includes('Google US English')) ||
                         voices.find(v => v.name.includes('Samantha')) ||
                         voices.find(v => v.lang === 'en-US');
    } else if (lang === 'es-MX') {
        preferredVoice = voices.find(v => v.name.includes('Google español')) ||
                         voices.find(v => v.name.includes('Monica')) ||
                         voices.find(v => v.lang === 'es-MX') ||
                         voices.find(v => v.lang.startsWith('es'));
    }

    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.lang = lang;
    utterance.rate = 0.95; // Natural conversational pace
    utterance.pitch = 1;

    window.speechSynthesis.speak(utterance);
  }
};

export const ConversationMode = () => {
  // Configuration
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Intermediate");

  // Session State
  const [started, setStarted] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [currentTurn, setCurrentTurn] = useState('init'); // 'doctor', 'patient', 'interpreter'
  const [loading, setLoading] = useState(false);
  const [userTranscript, setUserTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [soapNote, setSoapNote] = useState<string | null>(null);

  // Timer
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef<any>(null);

  // Metrics
  const [metrics, setMetrics] = useState({
    score: 100,
    turns: 0,
    strongAreas: ['Vocabulary'],
    weakAreas: [] as string[]
  });

  const recognitionRef = useRef<any>(null);

  // Timer Logic
  useEffect(() => {
    if (started && !soapNote) {
      timerRef.current = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [started, soapNote]);

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Speech Rec Setup
  useEffect(() => {
    // Load voices eagerly
    if ('speechSynthesis' in window) {
        window.speechSynthesis.getVoices();
    }

    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setUserTranscript(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setUserTranscript("");
      // Determine target language based on who spoke last
      const lastRole = history.length > 0 ? history[history.length-1].role : 'Doctor';
      // If Doctor spoke (EN), I interpret to ES. If Patient spoke (ES), I interpret to EN.
      recognitionRef.current.lang = lastRole === 'Doctor' ? 'es-MX' : 'en-US';
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const startScenario = async () => {
    if (!topic) return;
    setStarted(true);
    setLoading(true);
    setSoapNote(null);
    setSeconds(0);
    setHistory([]);
    setMetrics({ score: 100, turns: 0, strongAreas: ['Vocabulary'], weakAreas: [] });

    const prompt = `
      Start a medical roleplay about "${topic}".
      Level: ${difficulty}.
      ${difficulty === 'Pro' ? 'Use complex medical terminology and fast pacing.' : ''}
      ${difficulty === 'Easy' ? 'Use simple language and short sentences.' : ''}

      You are the Doctor (English).
      Output ONLY the Doctor's first line (1-2 sentences max). No quotes.
    `;

    const firstLine = await callGemini(prompt);
    const newMsg = { role: 'Doctor', text: firstLine };
    setHistory([newMsg]);
    setLoading(false);
    setCurrentTurn('doctor');
    speakText(firstLine, 'en-US');
  };

  const processInterpretation = async () => {
    if (!userTranscript) return;
    setLoading(true);

    const lastMessage = history[history.length - 1];

    // 1. Assess Interpretation
    const assessPrompt = `
      ACT AS A MEDICAL INTERPRETER EXAMINER.
      Context: ${topic}.
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
    try {
      const res = await callGemini(assessPrompt);
      const cleanJson = res.replace(/```json/g, '').replace(/```/g, '').trim();
      assessment = JSON.parse(cleanJson);
    } catch(e) { console.error("JSON parse error", e); }

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

    const interpMsg = {
      role: 'Interpreter',
      text: userTranscript,
      feedback: assessment
    };

    // 2. Generate Next Turn
    // Logic: If Doctor spoke last, now Patient speaks. If Patient spoke last, Doctor speaks.
    const nextRole = lastMessage.role === 'Doctor' ? 'Patient' : 'Doctor';

    const contextPrompt = `
      Roleplay Context: ${topic}. Difficulty: ${difficulty}.
      Conversation History:
      ${history.map(h => `${h.role}: ${h.text}`).join('\n')}
      Interpreter just said: "${userTranscript}" (Meaning the message was conveyed).

      Generate the ${nextRole}'s response in ${nextRole === 'Doctor' ? 'English' : 'Spanish'}.
      Keep it brief (1-2 sentences). Natural conversational tone. Output ONLY text.
    `;

    const nextLine = await callGemini(contextPrompt);
    const nextMsg = { role: nextRole, text: nextLine };

    // Update history with BOTH the interpretation and the NEXT line
    setHistory(prev => [...prev, interpMsg, nextMsg]);
    setLoading(false);
    setUserTranscript("");
    setCurrentTurn(nextRole.toLowerCase()); // 'doctor' or 'patient'

    speakText(nextLine, nextRole === 'Doctor' ? 'en-US' : 'es-MX');
  };

  const generateSoapNote = async () => {
    setLoading(true);
    const transcript = history.map(h => `${h.role}: ${h.text}`).join('\n');
    const prompt = `
      Based on the following medical dialogue, generate a concise SOAP Note (Subjective, Objective, Assessment, Plan).
      Use professional medical terminology.
      Dialogue:
      ${transcript}
    `;
    const result = await callGemini(prompt);
    setSoapNote(result);
    setLoading(false);
    clearInterval(timerRef.current);
  };

  if (!started) {
    return (
      <div className="w-full max-w-4xl mx-auto p-8 bg-slate-900 rounded-3xl shadow-2xl text-white animate-fade-in border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600 rounded-full blur-3xl opacity-10 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div className="inline-block p-4 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 mb-6 shadow-lg shadow-indigo-900/50">
              <Mic className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-5xl font-black mb-4 leading-tight tracking-tight">Premium Voice<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">Simulator</span></h2>
            <p className="text-slate-400 text-lg mb-8 font-light leading-relaxed">Immerse yourself in a high-fidelity medical encounter. Listen to AI-generated patients, interpret in real-time, and receive instant, professional grading.</p>

            <div className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-indigo-400 font-bold mb-2">Scenario Topic</label>
                <Input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Chest Pain Triage..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none text-lg placeholder:text-slate-600 mb-4 h-14"
                />

                <label className="block text-xs uppercase tracking-wider text-indigo-400 font-bold mb-2">Difficulty Level</label>
                <div className="grid grid-cols-4 gap-2">
                  {['Easy', 'Intermediate', 'Hard', 'Pro'].map(level => (
                    <button
                      key={level}
                      onClick={() => setDifficulty(level)}
                      className={`py-2 rounded-lg text-sm font-bold transition-all border ${difficulty === level ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'}`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={startScenario}
                disabled={!topic || loading}
                className="w-full py-4 bg-white text-indigo-900 rounded-xl font-bold text-lg shadow-xl shadow-indigo-900/20 hover:bg-indigo-50 hover:scale-[1.02] transition-all flex justify-center items-center gap-3"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Play className="w-6 h-6 fill-current" />}
                Begin Simulation
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-2 md:p-4 animate-fade-in grid grid-cols-1 lg:grid-cols-4 gap-4 h-[600px]">

      {/* LEFT: QA DASHBOARD */}
      <div className="lg:col-span-1 bg-slate-900 rounded-3xl p-6 text-white flex flex-col gap-6 shadow-2xl border border-slate-800 overflow-y-auto">
        <div className="pb-4 border-b border-slate-800">
          <div className="flex justify-between items-center mb-2">
             <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Live Session</h3>
             <span className="flex items-center gap-1 text-xs font-mono text-slate-400 bg-slate-800 px-2 py-1 rounded">
               <Clock className="w-3 h-3" /> {formatTime(seconds)}
             </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`text-6xl font-black tracking-tighter ${metrics.score > 80 ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300' : 'text-yellow-400'}`}>{metrics.score}</span>
            <span className="text-lg text-slate-500 font-medium">/100</span>
          </div>
          <div className="mt-2 text-xs text-slate-500 font-bold uppercase tracking-wider">
            Level: {difficulty}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-2"><ThumbsUp className="w-4 h-4 text-green-500"/> Strengths</h4>
          <div className="flex flex-wrap gap-2">
            {metrics.strongAreas.map((area, i) => (
              <span key={i} className="px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-lg text-xs font-semibold text-green-300">{area}</span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-2"><ThumbsDown className="w-4 h-4 text-red-500"/> Needs Work</h4>
          {metrics.weakAreas.length === 0 ? <span className="text-sm text-slate-600 italic pl-2">Clean record so far...</span> : (
            <div className="flex flex-wrap gap-2">
              {metrics.weakAreas.map((area, i) => (
                <span key={i} className="px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-lg text-xs font-semibold text-red-300">{area}</span>
              ))}
            </div>
          )}
        </div>

        <div className="mt-auto pt-6 border-t border-slate-800">
           <button
             onClick={generateSoapNote}
             disabled={history.length < 3}
             className="w-full py-3 bg-indigo-600/20 border border-indigo-500/50 text-indigo-200 rounded-xl font-bold text-sm hover:bg-indigo-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
           >
             <ClipboardList className="w-4 h-4" />
             Finish & Generate SOAP
           </button>
        </div>
      </div>

      {/* CENTER: CONVERSATION STREAM */}
      <div className="lg:col-span-3 flex flex-col gap-4 h-full relative">
        {soapNote && (
          <div className="absolute inset-0 z-50 bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-8 animate-fade-in">
            <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl overflow-y-auto max-h-full">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2"><FileText className="w-6 h-6 text-indigo-600"/> SOAP Note</h3>
                <button onClick={() => {setSoapNote(null); setStarted(false);}} className="p-2 hover:bg-slate-100 rounded-full"><X className="w-5 h-5 text-slate-500"/></button>
              </div>
              <div className="prose prose-slate max-w-none whitespace-pre-wrap font-mono text-sm bg-slate-50 p-6 rounded-xl border border-slate-200">
                {soapNote}
              </div>
            </div>
          </div>
        )}

        <div className="flex-1 bg-white border border-slate-200 rounded-3xl p-6 overflow-y-auto shadow-sm space-y-6 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
          {history.map((msg, idx) => (
            <div key={idx} className={`flex flex-col ${msg.role === 'Interpreter' ? 'items-end' : 'items-start'} animate-fade-in`}>
              <div className={`relative max-w-[85%] p-5 rounded-3xl text-sm shadow-sm transition-all hover:shadow-md
                ${msg.role === 'Doctor' ? 'bg-white border border-blue-100 text-slate-800 rounded-tl-none' :
                  msg.role === 'Patient' ? 'bg-white border border-green-100 text-slate-800 rounded-tl-none' :
                  'bg-indigo-600 text-white rounded-tr-none shadow-indigo-200'}`}>

                <div className="flex items-center justify-between gap-4 mb-2 border-b border-black/5 pb-2">
                  <span className="text-xs font-bold uppercase tracking-wide opacity-70 flex items-center gap-1">
                    {msg.role === 'Doctor' && <User className="w-3 h-3"/>}
                    {msg.role === 'Patient' && <Smile className="w-3 h-3"/>}
                    {msg.role === 'Interpreter' && <Languages className="w-3 h-3"/>}
                    {msg.role}
                  </span>
                  {msg.role !== 'Interpreter' && (
                    <button onClick={() => speakText(msg.text, msg.role === 'Doctor' ? 'en-US' : 'es-MX')} className="opacity-50 hover:opacity-100 transition-opacity p-1 hover:bg-black/5 rounded-full">
                      <Volume2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <p className="leading-relaxed text-base font-medium">{msg.text}</p>
              </div>

              {/* QA Bubble for Interpreter */}
              {msg.feedback && (
                <div className="mt-2 mr-2 flex items-center gap-2 text-xs font-bold text-slate-500 bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm">
                  <span className={`w-2 h-2 rounded-full ${msg.feedback.score > 80 ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                  AI Feedback: <span className={msg.feedback.score > 80 ? "text-green-600" : "text-yellow-600"}>{msg.feedback.feedback}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* INPUT AREA */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xl flex items-center gap-4">
          <button
            onClick={toggleListening}
            disabled={loading}
            className={`h-14 w-14 rounded-2xl flex items-center justify-center transition-all shadow-lg
              ${isListening ? 'bg-red-500 text-white animate-pulse ring-4 ring-red-100' : 'bg-slate-900 text-white hover:bg-slate-800 hover:scale-105'}`}
          >
            {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>

          <div className="flex-1 relative">
            <input
              type="text"
              value={userTranscript}
              onChange={(e) => setUserTranscript(e.target.value)}
              placeholder={isListening ? "Listening... (Speak now)" : "Type interpretation here..."}
              className="w-full h-14 px-6 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-700 font-medium"
              disabled={loading}
              onKeyDown={(e) => e.key === 'Enter' && processInterpretation()}
            />
            {loading && <div className="absolute right-4 top-4"><Loader2 className="w-6 h-6 text-indigo-500 animate-spin" /></div>}
          </div>

          <button
            onClick={processInterpretation}
            disabled={!userTranscript || loading}
            className="h-14 px-8 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-lg shadow-indigo-200"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
