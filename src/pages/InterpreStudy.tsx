import React, { useState, useEffect, useRef } from 'react';
import { Book, Brain, Activity, RotateCcw, Check, X, Trophy, Heart, HeartPulse, ChevronRight, ChevronLeft, Search, Sparkles, MessageSquare, Loader2, Mic, MicOff, Languages, Play, Volume2, User, Eye, Ear, Smile, Accessibility, AlertCircle, ThumbsUp, ThumbsDown, FileText, ClipboardList, Clock, BarChart, Settings, HelpCircle, Upload } from 'lucide-react';
import Layout from "@/components/Layout";

// --- GEMINI API UTILITIES ---
// IMPORTANT: API keys should be handled securely, e.g., through environment variables, not hardcoded.
const apiKey = ""; // API Key injected at runtime

const callGemini = async (prompt: string): Promise<string> => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
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
        console.error("API call failed after multiple retries:", error);
        return "Connection error. Please try again later.";
      }
      await new Promise(resolve => setTimeout(resolve, delays[attempt - 1]));
    }
  }
  return "An unexpected error occurred.";
};

// --- DATA TYPES ---
interface VocabItem {
  id: number | string;
  root: string;
  es_meaning: string;
  en_meaning: string;
  example_es: string;
  example_en: string;
  icon: string;
}

// --- DATA ---
const INITIAL_VOCABULARY_DATA: VocabItem[] = [
  { id: 1, root: "Aden/o", es_meaning: "Glándula", en_meaning: "Gland", example_es: "Adenitis", example_en: "Adenitis", icon: "Activity" },
  { id: 2, root: "Artr/o", es_meaning: "Articulación", en_meaning: "Joint", example_es: "Artritis", example_en: "Arthritis", icon: "Accessibility" },
  { id: 3, root: "Cardi/o", es_meaning: "Corazón", en_meaning: "Heart", example_es: "Bradicardia", example_en: "Bradycardia", icon: "Heart" },
  { id: 4, root: "Cito", es_meaning: "Célula", en_meaning: "Cell", example_es: "Eritrocito", example_en: "Erythrocyte", icon: "Circle" },
  { id: 5, root: "Dermat/o", es_meaning: "Piel", en_meaning: "Skin", example_es: "Dermatitis", example_en: "Dermatitis", icon: "User" },
  { id: 6, root: "Gastr/o", es_meaning: "Estómago", en_meaning: "Stomach", example_es: "Gastralgia", example_en: "Gastralgia", icon: "Circle" },
  { id: 7, root: "Hemat/o", es_meaning: "Sangre", en_meaning: "Blood", example_es: "Hematoma", example_en: "Hematoma", icon: "Droplet" },
  { id: 8, root: "Hepat/o", es_meaning: "Hígado", en_meaning: "Liver", example_es: "Hepatitis", example_en: "Hepatitis", icon: "Activity" },
  { id: 9, root: "Miel/o", es_meaning: "Médula", en_meaning: "Marrow/Spinal Cord", example_es: "Mielitis", example_en: "Myelitis", icon: "Zap" },
  { id: 10, root: "Nefr/o", es_meaning: "Riñón", en_meaning: "Kidney", example_es: "Nefritis", example_en: "Nephritis", icon: "Activity" },
  { id: 11, root: "Neur/o", es_meaning: "Nervio", en_meaning: "Nerve", example_es: "Neuralgia", example_en: "Neuralgia", icon: "Brain" },
  { id: 12, root: "Oste/o", es_meaning: "Hueso", en_meaning: "Bone", example_es: "Osteoporosis", example_en: "Osteoporosis", icon: "Accessibility" },
  { id: 13, root: "Oto", es_meaning: "Oído", en_meaning: "Ear", example_es: "Otitis", example_en: "Otitis", icon: "Ear" },
  { id: 14, root: "Rino", es_meaning: "Nariz", en_meaning: "Nose", example_es: "Rinitis", example_en: "Rhinitis", icon: "Smile" },
  { id: 15, root: "Oftalm/o", es_meaning: "Ojo", en_meaning: "Eye", example_es: "Oftalmología", example_en: "Ophthalmology", icon: "Eye" }
];

const BODY_PARTS_GAME = [
  { id: 'head', label: 'Cefal/o (Head)', x: 50, y: 8 },
  { id: 'eye', label: 'Oftalm/o (Eye)', x: 60, y: 12 },
  { id: 'nose', label: 'Rino (Nose)', x: 50, y: 15 },
  { id: 'ear', label: 'Oto (Ear)', x: 35, y: 12 },
  { id: 'neck', label: 'Cervic/o (Neck)', x: 50, y: 20 },
  { id: 'heart', label: 'Cardi/o (Heart)', x: 55, y: 30 },
  { id: 'stomach', label: 'Gastr/o (Stomach)', x: 50, y: 40 },
  { id: 'liver', label: 'Hepat/o (Liver)', x: 40, y: 38 },
  { id: 'hand', label: 'Quiro (Hand)', x: 15, y: 50 },
  { id: 'knee', label: 'Gonu (Knee)', x: 40, y: 75 },
  { id: 'foot', label: 'Pod/o (Foot)', x: 35, y: 92 }
];

// --- ASSETS ---
const InterpreLabLogo = ({ className }: { className: string }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="12" fill="url(#paint0_linear)" />
    <path d="M20 10V30M10 20H30" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M27 13L13 27" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
    <defs>
      <linearGradient id="paint0_linear" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4F46E5" />
        <stop offset="1" stopColor="#EC4899" />
      </linearGradient>
    </defs>
  </svg>
);

// --- HELPER COMPONENT FOR ICONS ---
const DynamicIcon = ({ name, className }: { name: string, className: string }) => {
  const icons: { [key: string]: React.ElementType } = {
    Activity, Heart, User, Brain, Eye, Ear, Smile, Accessibility, Zap: Sparkles, Book,
    Circle: () => <div className="w-8 h-8 rounded-full border-2 border-current" />, 
    Droplet: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>
  };
  const IconComponent = icons[name] || Activity;
  return <IconComponent className={className} />;
};


// --- ENHANCED SPEECH UTILS (NATURAL SOUNDING) ---
const speakText = (text: string, lang = 'en-US') => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();
      let preferredVoice = null;
  
      if (lang === 'en-US') {
          preferredVoice = voices.find(v => v.name.includes('Google US English')) || voices.find(v => v.name.includes('Samantha')) || voices.find(v => v.lang === 'en-US');
      } else if (lang === 'es-MX') {
          preferredVoice = voices.find(v => v.name.includes('Google español')) || voices.find(v => v.name.includes('Paulina')) || voices.find(v => v.lang === 'es-MX') || voices.find(v => v.lang.startsWith('es'));
      }
  
      if (preferredVoice) utterance.voice = preferredVoice;
      utterance.lang = lang;
      utterance.rate = 0.95;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

// --- COMPONENTS ---

// 1. PREMIUM CONVERSATION SIMULATOR
const ConversationMode = () => {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Intermediate");
  const [started, setStarted] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [userTranscript, setUserTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [soapNote, setSoapNote] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [metrics, setMetrics] = useState({ score: 100, turns: 0, strongAreas: ['Vocabulary'], weakAreas: [] as string[] });
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (started && !soapNote) {
      timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [started, soapNote]);

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.getVoices();
    }
    const anyWindow = window as any;
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = anyWindow.SpeechRecognition || anyWindow.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.onresult = (event: any) => {
        setUserTranscript(Array.from(event.results).map((result: any) => result[0].transcript).join(''));
      };
      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setUserTranscript("");
      const lastRole = history.length > 0 ? history[history.length - 1].role : 'Doctor';
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

    const prompt = `Start a medical roleplay about "${topic}". Level: ${difficulty}. ${difficulty === 'Pro' ? 'Use complex medical terminology.' : ''} You are the Doctor (English). Output ONLY the Doctor's first line (1-2 sentences).`;
    const firstLine = await callGemini(prompt) || "Let's begin.";
    setHistory([{ role: 'Doctor', text: firstLine }]);
    setLoading(false);
    speakText(firstLine, 'en-US');
  };

  const processInterpretation = async () => {
    if (!userTranscript) return;
    setLoading(true);
    
    const lastMessage = history[history.length - 1];
    const assessPrompt = `EXAMINER: Context: ${topic}. Original (${lastMessage.role === 'Doctor' ? 'EN' : 'ES'}): "${lastMessage.text}" Student Interpretation: "${userTranscript}". JSON ONLY: {"score": 0-100, "feedback": "brief critique", "strong_point": "strength", "weak_point": "weakness or 'None'"}`;
    
    let assessment = { score: 85, feedback: "Good flow", strong_point: "Flow", weak_point: "None" };
    try {
      const res = await callGemini(assessPrompt);
      if(res) assessment = JSON.parse(res.replace(/```json/g, '').replace(/```/g, '').trim());
    } catch(e) { console.error("JSON parse error", e); }

    setMetrics(prev => ({
      score: Math.floor((prev.score * prev.turns + assessment.score) / (prev.turns + 1)),
      turns: prev.turns + 1,
      strongAreas: assessment.score > 90 ? [...new Set([...prev.strongAreas, assessment.strong_point])] : prev.strongAreas,
      weakAreas: assessment.weak_point !== 'None' && !prev.weakAreas.includes(assessment.weak_point) ? [...prev.weakAreas, assessment.weak_point] : prev.weakAreas
    }));

    const nextRole = lastMessage.role === 'Doctor' ? 'Patient' : 'Doctor';
    const contextPrompt = `Roleplay: ${topic}. History:\n${history.map(h => `${h.role}: ${h.text}`).join('\n')}\nInterpreter said: "${userTranscript}".\nGenerate ${nextRole}'s response (${nextRole === 'Doctor' ? 'EN' : 'ES'}). Brief, 1-2 sentences. Text ONLY.`;
    
    const nextLine = await callGemini(contextPrompt) || "I see. And then?";
    setHistory(prev => [...prev, { role: 'Interpreter', text: userTranscript, feedback: assessment }, { role: nextRole, text: nextLine }]);
    setLoading(false);
    setUserTranscript("");
    speakText(nextLine, nextRole === 'Doctor' ? 'en-US' : 'es-MX');
  };

  const generateSoapNote = async () => {
    setLoading(true);
    const transcript = history.map(h => `${h.role}: ${h.text}`).join('\n');
    const prompt = `Generate a concise SOAP Note from this dialogue:\n${transcript}`;
    const result = await callGemini(prompt);
    setSoapNote(result || "Could not generate SOAP note.");
    setLoading(false);
  };
  
  if (!started) return (
    <div className="w-full max-w-4xl mx-auto p-8 bg-slate-900 rounded-3xl shadow-2xl text-white animate-fade-in border border-slate-800 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600 rounded-full blur-3xl opacity-10 -translate-y-1/2 translate-x-1/2"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        <div>
          <div className="inline-block p-4 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 mb-6 shadow-lg shadow-indigo-900/50"><Mic className="w-10 h-10 text-white" /></div>
          <h2 className="text-5xl font-black mb-4 leading-tight tracking-tight">Premium Voice<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">Simulator</span></h2>
          <p className="text-slate-400 text-lg mb-8 font-light leading-relaxed">Immerse yourself in a high-fidelity medical encounter. Listen to AI-generated patients, interpret in real-time, and receive instant, professional grading.</p>
          <div className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-indigo-400 font-bold mb-2">Scenario Topic</label>
              <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. Chest Pain Triage..." className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none text-lg placeholder:text-slate-600 mb-4" />
              <label className="block text-xs uppercase tracking-wider text-indigo-400 font-bold mb-2">Difficulty Level</label>
              <div className="grid grid-cols-4 gap-2">
                {['Easy', 'Intermediate', 'Hard', 'Pro'].map(level => (
                  <button key={level} onClick={() => setDifficulty(level)} className={`py-2 rounded-lg text-sm font-bold transition-all border ${difficulty === level ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'}`}>{level}</button>
                ))}
              </div>
            </div>
            <button onClick={startScenario} disabled={!topic || loading} className="w-full py-4 bg-white text-indigo-900 rounded-xl font-bold text-lg shadow-xl shadow-indigo-900/20 hover:bg-indigo-50 hover:scale-[1.02] transition-all flex justify-center items-center gap-3">
              {loading ? <Loader2 className="animate-spin" /> : <Play className="w-6 h-6 fill-current" />} Begin Simulation
            </button>
          </div>
        </div>
        <div className="hidden md:flex justify-center">
           <div className="relative w-72 h-72 bg-indigo-500/10 rounded-full flex items-center justify-center border border-indigo-500/20 backdrop-blur-sm">
              <div className="absolute inset-0 rounded-full border-2 border-indigo-500/10 border-dashed animate-spin-slow"></div>
              <Activity className="w-32 h-32 text-indigo-400 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
           </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-2 md:p-4 animate-fade-in grid grid-cols-1 lg:grid-cols-4 gap-4 h-[600px]">
      <div className="lg:col-span-1 bg-slate-900 rounded-3xl p-6 text-white flex flex-col gap-6 shadow-2xl border border-slate-800 overflow-y-auto">
        <div className="pb-4 border-b border-slate-800">
          <div className="flex justify-between items-center mb-2">
             <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Live Session</h3>
             <span className="flex items-center gap-1 text-xs font-mono text-slate-400 bg-slate-800 px-2 py-1 rounded"><Clock className="w-3 h-3" /> {formatTime(seconds)}</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`text-6xl font-black tracking-tighter ${metrics.score > 80 ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300' : 'text-yellow-400'}`}>{metrics.score}</span>
            <span className="text-lg text-slate-500 font-medium">/100</span>
          </div>
          <div className="mt-2 text-xs text-slate-500 font-bold uppercase tracking-wider">Level: {difficulty}</div>
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-2"><ThumbsUp className="w-4 h-4 text-green-500"/> Strengths</h4>
          <div className="flex flex-wrap gap-2">{metrics.strongAreas.map((area, i) => (<span key={i} className="px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-lg text-xs font-semibold text-green-300">{area}</span>))}</div>
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-2"><ThumbsDown className="w-4 h-4 text-red-500"/> Needs Work</h4>
          {metrics.weakAreas.length === 0 ? <span className="text-sm text-slate-600 italic pl-2">Clean record...</span> : <div className="flex flex-wrap gap-2">{metrics.weakAreas.map((area, i) => (<span key={i} className="px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-lg text-xs font-semibold text-red-300">{area}</span>))}</div>}
        </div>
        <div className="mt-auto pt-6 border-t border-slate-800">
           <button onClick={generateSoapNote} disabled={history.length < 3} className="w-full py-3 bg-indigo-600/20 border border-indigo-500/50 text-indigo-200 rounded-xl font-bold text-sm hover:bg-indigo-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"><ClipboardList className="w-4 h-4" /> Finish & Generate SOAP</button>
        </div>
      </div>
      <div className="lg:col-span-3 flex flex-col gap-4 h-full relative">
        {soapNote && (
          <div className="absolute inset-0 z-50 bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-8 animate-fade-in">
            <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl overflow-y-auto max-h-full">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2"><FileText className="w-6 h-6 text-indigo-600"/> SOAP Note</h3>
                <button onClick={() => {setSoapNote(null); setStarted(false);}} className="p-2 hover:bg-slate-100 rounded-full"><X className="w-5 h-5 text-slate-500"/></button>
              </div>
              <div className="prose prose-slate max-w-none whitespace-pre-wrap font-mono text-sm bg-slate-50 p-6 rounded-xl border border-slate-200">{soapNote}</div>
            </div>
          </div>
        )}
        <div className="flex-1 bg-white border border-slate-200 rounded-3xl p-6 overflow-y-auto shadow-sm space-y-6 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
          {history.map((msg, idx) => (
            <div key={idx} className={`flex flex-col ${msg.role === 'Interpreter' ? 'items-end' : 'items-start'} animate-fade-in`}>
              <div className={`relative max-w-[85%] p-5 rounded-3xl text-sm shadow-sm transition-all hover:shadow-md ${msg.role === 'Doctor' ? 'bg-white border border-blue-100 text-slate-800 rounded-tl-none' : msg.role === 'Patient' ? 'bg-white border border-green-100 text-slate-800 rounded-tl-none' : 'bg-indigo-600 text-white rounded-tr-none shadow-indigo-200'}`}>
                <div className="flex items-center justify-between gap-4 mb-2 border-b border-black/5 pb-2">
                  <span className="text-xs font-bold uppercase tracking-wide opacity-70 flex items-center gap-1">
                    {msg.role === 'Doctor' ? <User className="w-3 h-3"/> : msg.role === 'Patient' ? <Smile className="w-3 h-3"/> : <Languages className="w-3 h-3"/>} {msg.role}
                  </span>
                  {msg.role !== 'Interpreter' && (<button onClick={() => speakText(msg.text, msg.role === 'Doctor' ? 'en-US' : 'es-MX')} className="opacity-50 hover:opacity-100 p-1 hover:bg-black/5 rounded-full"><Volume2 className="w-4 h-4" /></button>)}
                </div>
                <p className="leading-relaxed text-base font-medium">{msg.text}</p>
              </div>
              {msg.feedback && (<div className="mt-2 mr-2 flex items-center gap-2 text-xs font-bold text-slate-500 bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm"><span className={`w-2 h-2 rounded-full ${msg.feedback.score > 80 ? 'bg-green-500' : 'bg-yellow-500'}`}></span> AI: <span className={msg.feedback.score > 80 ? "text-green-600" : "text-yellow-600"}>{msg.feedback.feedback}</span></div>)}
            </div>
          ))}
        </div>
        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xl flex items-center gap-4">
          <button onClick={toggleListening} disabled={loading} className={`h-14 w-14 rounded-2xl flex items-center justify-center transition-all shadow-lg ${isListening ? 'bg-red-500 text-white animate-pulse ring-4 ring-red-100' : 'bg-slate-900 text-white hover:bg-slate-800 hover:scale-105'}`}>{isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}</button>
          <div className="flex-1 relative">
            <input type="text" value={userTranscript} onChange={(e) => setUserTranscript(e.target.value)} placeholder={isListening ? "Listening..." : "Type interpretation..."} className="w-full h-14 px-6 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-700 font-medium" disabled={loading} onKeyDown={(e) => e.key === 'Enter' && processInterpretation()} />
            {loading && <div className="absolute right-4 top-4"><Loader2 className="w-6 h-6 text-indigo-500 animate-spin" /></div>}
          </div>
          <button onClick={processInterpretation} disabled={!userTranscript || loading} className="h-14 px-8 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-lg shadow-indigo-200">Send</button>
        </div>
      </div>
    </div>
  );
};


// 2. SMART FLASHCARDS
const FileUploader = ({ onFileUpload }: { onFileUpload: (file: File) => void }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length) {
            onFileUpload(event.target.files[0]);
        }
    };
    const handleClick = () => inputRef.current?.click();

    return (
        <div className="w-full p-6 bg-slate-100/80 border-2 border-dashed border-slate-300 rounded-2xl text-center mb-8 shadow-inner">
            <h3 className="text-lg font-bold text-slate-700 mb-2 flex items-center justify-center gap-2"><Upload className="w-5 h-5 text-indigo-600"/> Create Your Own Deck</h3>
            <p className="text-sm text-slate-500 mb-4">Upload a CSV file. Columns: `root,es_meaning,en_meaning,example_es,example_en,icon`.</p>
            <input type="file" ref={inputRef} onChange={handleFileChange} style={{ display: 'none' }} accept=".csv" />
            <button onClick={handleClick} className="px-6 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-all shadow-sm">
                Upload CSV File
            </button>
        </div>
    );
};

const SmartFlashcards = () => {
  const [deck, setDeck] = useState<VocabItem[]>(INITIAL_VOCABULARY_DATA);
  const [currentCard, setCurrentCard] = useState<VocabItem>(INITIAL_VOCABULARY_DATA[0]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [finished, setFinished] = useState(false);
  const [masteryCount, setMasteryCount] = useState(0);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        const text = e.target?.result as string;
        if (!text) return;
        const rows = text.split(/\r?\n/).slice(1).filter(row => row.trim() !== '');
        const newDeck: VocabItem[] = rows.map((row, index) => {
            const columns = row.split(',').map(c => c.trim());
            return {
                id: `custom-${Date.now()}-${index}`,
                root: columns[0] || "",
                es_meaning: columns[1] || "",
                en_meaning: columns[2] || "",
                example_es: columns[3] || "",
                example_en: columns[4] || "",
                icon: columns[5] || "Book",
            };
        }).filter(item => item.root && item.en_meaning);

        if (newDeck.length > 0) {
            setDeck(newDeck);
            setCurrentCard(newDeck[0]);
            setFinished(false);
            setMasteryCount(0);
            setAiInsight(null);
            setIsFlipped(false);
        } else {
            alert("Could not parse CSV file. Ensure it has content and follows the format.");
        }
    };
    reader.readAsText(file);
  };

  const advanceCard = (knowIt: boolean) => {
    setIsFlipped(false);
    setAiInsight(null);
    if(knowIt) setMasteryCount(prev => prev + 1);

    const newDeck = deck.filter(c => c.id !== currentCard.id);
    if (!knowIt) newDeck.push(currentCard);

    if (newDeck.length === 0) {
      setFinished(true);
    } else {
      setDeck(newDeck);
      setCurrentCard(newDeck[Math.floor(Math.random() * newDeck.length)]); // Pick random card
    }
  };

  const fetchAIInsight = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setLoadingAi(true);
    const prompt = `For medical root "${currentCard.root}" (${currentCard.en_meaning}): 1. Give 1-sentence etymology. 2. Create a memorable mnemonic. Keep it concise.`;
    const result = await callGemini(prompt);
    setAiInsight(result || "Could not generate insight.");
    setLoadingAi(false);
  };

  const resetDeck = (useInitial = true) => {
    const newDeck = useInitial ? INITIAL_VOCABULARY_DATA : deck;
    setDeck(newDeck);
    setCurrentCard(newDeck[0]);
    setFinished(false);
    setMasteryCount(0);
    setAiInsight(null);
    setIsFlipped(false);
  }

  if (deck.length === 0 || finished) {
    return (
      <div className="flex flex-col items-center justify-center text-center animate-fade-in p-8 h-full">
        <div className="p-6 bg-green-100 rounded-full mb-6"><Trophy className="w-16 h-16 text-green-600" /></div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Review Complete!</h2>
        <p className="text-slate-500 mb-8">You have mastered {masteryCount} terms. Well done!</p>
        <div className="flex gap-4">
            <button onClick={() => resetDeck(true)} className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg hover:bg-indigo-700 transition-all">
                Restart Original Deck
            </button>
            <FileUploader onFileUpload={handleFileUpload} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto p-4">
        <FileUploader onFileUpload={handleFileUpload} />
      <div className="w-full flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <span className="flex h-3 w-3 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]"></span>
          <span className="text-sm font-bold text-slate-600">Cards Remaining: {deck.length}</span>
        </div>
        <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">Spaced Repetition</span>
      </div>

      <div className="w-full h-96 perspective-1000 cursor-pointer group relative mb-8" onClick={() => setIsFlipped(!isFlipped)}>
        <div className={`relative w-full h-full transition-all duration-500 style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          <div className="absolute w-full h-full bg-white rounded-[2rem] shadow-xl border border-slate-100 flex flex-col items-center justify-center p-8 backface-hidden hover:shadow-2xl transition-shadow overflow-hidden">
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#4F46E5_1px,transparent_1px)] [background-size:20px_20px]"></div>
            <div className="absolute top-6 left-6 opacity-20"><InterpreLabLogo className="w-8 h-8" /></div>
            <div className="p-6 bg-indigo-50 rounded-3xl mb-6 shadow-inner z-10"><DynamicIcon name={currentCard.icon} className="w-16 h-16 text-indigo-600" /></div>
            <span className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2 z-10">Medical Root</span>
            <h3 className="text-5xl font-black text-slate-800 z-10">{currentCard.root}</h3>
            <p className="text-indigo-400 text-sm mt-8 font-medium flex items-center gap-2 z-10">Tap to Reveal <ChevronRight className="w-4 h-4" /></p>
          </div>

          <div className="absolute w-full h-full bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-[2rem] shadow-xl border border-slate-800 flex flex-col items-center justify-center p-8 rotate-y-180 backface-hidden text-white">
            <div className="absolute top-6 right-6 opacity-20"><InterpreLabLogo className="w-8 h-8" /></div>
            {aiInsight ? (
              <div className="relative z-10 w-full h-full flex flex-col text-left animate-fade-in p-4">
                <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2"><span className="text-yellow-300 font-bold flex items-center gap-2 text-sm"><Sparkles className="w-4 h-4"/> AI Insights</span><button onClick={(e) => {e.stopPropagation(); setAiInsight(null);}}><X className="w-4 h-4 text-slate-400 hover:text-white"/></button></div>
                <div className="prose prose-invert prose-sm text-slate-300 leading-relaxed whitespace-pre-wrap overflow-y-auto">{aiInsight}</div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 text-center w-full z-10">
                <div className="p-5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <p className="text-xs uppercase text-indigo-300 font-bold mb-2 tracking-wider">Español</p>
                  <p className="text-3xl font-bold text-white">{currentCard.es_meaning}</p>
                  <p className="text-sm text-slate-400 italic mt-2">Ej: {currentCard.example_es}</p>
                </div>
                <div className="p-5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm relative">
                  <p className="text-xs uppercase text-emerald-300 font-bold mb-2 tracking-wider">English</p>
                  <p className="text-3xl font-bold text-white">{currentCard.en_meaning}</p>
                  <p className="text-sm text-slate-400 italic mt-2">Ex: {currentCard.example_en}</p>
                  <button onClick={fetchAIInsight} className="absolute -bottom-12 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-xs font-bold text-yellow-300 flex items-center gap-2 transition-all border border-white/10">
                    {loadingAi ? <Loader2 className="w-3 h-3 animate-spin"/> : <Sparkles className="w-3 h-3"/>} Magic Mnemonic
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full">
        <button onClick={() => advanceCard(false)} className="py-4 rounded-2xl border-2 border-red-100 bg-white text-red-600 font-bold hover:bg-red-50 hover:border-red-200 transition-all flex flex-col items-center justify-center gap-1 shadow-sm"><RotateCcw className="w-5 h-5" /> Need Practice</button>
        <button onClick={() => advanceCard(true)} className="py-4 rounded-2xl border-2 border-green-100 bg-white text-green-600 font-bold hover:bg-green-50 hover:border-green-200 transition-all flex flex-col items-center justify-center gap-1 shadow-sm"><Check className="w-5 h-5" /> I Knew It</button>
      </div>
    </div>
  );
};


// 3. BODY MAPPER (New Tab)
const BodyMapper = () => {
  const [placedItems, setPlacedItems] = useState<{ [key: string]: boolean }>({});
  const [selectedTerm, setSelectedTerm] = useState<{id: string, label: string} | null>(null);
  const [completed, setCompleted] = useState(false);

  const handleTermClick = (term: {id: string, label: string}) => {
    if (!placedItems[term.id]) {
      setSelectedTerm(term);
    }
  };

  const handleTargetClick = (targetId: string) => {
    if (selectedTerm && targetId === selectedTerm.id) {
      setPlacedItems(prev => {
        const newState = { ...prev, [targetId]: true };
        if (Object.keys(newState).length === BODY_PARTS_GAME.length) setCompleted(true);
        return newState;
      });
      setSelectedTerm(null);
    } else if (selectedTerm) {
      setSelectedTerm(null);
    }
  };
  
  const resetMap = () => {
    setPlacedItems({});
    setCompleted(false);
    setSelectedTerm(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 flex flex-col md:flex-row gap-8 h-[600px]">
      <div className="w-full md:w-1/3 bg-white p-6 rounded-3xl border border-slate-200 shadow-lg overflow-y-auto">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Layout className="w-5 h-5 text-indigo-600" /> Vocabulary Bank</h3>
        <div className="space-y-2">
          {BODY_PARTS_GAME.map(item => (
            <button key={item.id} onClick={() => handleTermClick(item)} disabled={placedItems[item.id]} className={`w-full p-3 text-left rounded-xl font-medium transition-all border-2 ${placedItems[item.id] ? 'bg-green-50 border-green-200 text-green-700 line-through op-50' : selectedTerm?.id === item.id ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-md scale-105' : 'bg-slate-50 border-transparent text-slate-600 hover:bg-white hover:border-indigo-200'}`}>{item.label}</button>
          ))}
        </div>
      </div>

      <div className="flex-1 bg-slate-100 rounded-3xl border-2 border-dashed border-slate-300 relative flex items-center justify-center p-8 shadow-inner">
        {completed && (
          <div className="absolute inset-0 z-50 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-3xl animate-fade-in">
            <Trophy className="w-24 h-24 text-yellow-500 mb-4" />
            <h2 className="text-4xl font-black text-slate-800">Anatomy Mastered!</h2>
            <button onClick={resetMap} className="mt-6 px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700">Reset Map</button>
          </div>
        )}

        <div className="relative w-full max-w-[250px] h-full">
          <svg viewBox="0 0 100 180" className="w-full h-full drop-shadow-xl">
             <path d="M50,5 C40,5 35,10 35,20 C35,30 40,35 50,35 C60,35 65,30 65,20 C65,10 60,5 50,5 Z M40,40 C20,45 10,60 10,80 L10,140 L20,175 L35,175 L45,110 L55,110 L65,175 L80,175 L90,140 L90,80 C90,60 80,45 60,40 Z" fill="#cbd5e1" />
          </svg>

          {BODY_PARTS_GAME.map(part => (
            <div key={part.id} onClick={() => handleTargetClick(part.id)} className={`absolute w-6 h-6 -ml-3 -mt-3 rounded-full border-2 cursor-pointer transition-all duration-300 flex items-center justify-center z-10 shadow-md ${placedItems[part.id] ? 'bg-green-500 border-white scale-100' : selectedTerm ? 'bg-white border-indigo-500 animate-pulse' : 'bg-slate-300 border-white hover:bg-indigo-400'}`} style={{ left: `${part.x}%`, top: `${part.y}%` }}>
              {placedItems[part.id] && <Check className="w-3 h-3 text-white" />}
            </div>
          ))}

          {Object.keys(placedItems).map(key => {
            const part = BODY_PARTS_GAME.find(p => p.id === key);
            if(!part) return null;
            return <div key={key} className="absolute bg-white px-3 py-1 rounded-lg shadow-lg text-xs font-bold text-indigo-800 border border-indigo-100 whitespace-nowrap animate-fade-in" style={{ left: `${part.x > 50 ? part.x + 4 : part.x - 4}%`, top: `${part.y}%`, transform: `translate(${part.x > 50 ? '0' : '-100%'}, -50%)` }}>{part.label}</div>;
          })}
        </div>
      </div>
    </div>
  );
};


// 4. SCENARIO GENERATOR
const ScenarioGenerator = () => {
    const [topic, setTopic] = useState("");
    const [script, setScript] = useState("");
    const [loading, setLoading] = useState(false);
  
    const handleGenerate = async () => {
      if (!topic.trim()) return;
      setLoading(true);
      setScript("");
      const prompt = `Generate a bilingual medical dialogue script (Doctor EN / Patient ES) about: "${topic}". Include key terminology. Format with clear labels for roles.`;
      const result = await callGemini(prompt);
      setScript(result || "Could not generate script.");
      setLoading(false);
    };
  
    return (
      <div className="w-full max-w-3xl mx-auto p-4 animate-fade-in">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
          <h3 className="font-bold text-slate-700 mb-2 flex items-center gap-2"><MessageSquare className="w-5 h-5 text-blue-500"/> Quick Script Generator</h3>
          <div className="flex gap-2">
            <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. Pediatric asthma check-up" className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            <button onClick={handleGenerate} disabled={loading || !topic} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2">{loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Generate"}</button>
          </div>
        </div>
        {script && (<div className="bg-slate-50 border border-slate-200 rounded-xl p-6 shadow-inner prose prose-slate max-w-none whitespace-pre-wrap">{script}</div>)}
      </div>
    );
};
  

// 5. AI QUIZ
const AiQuiz = () => {
    const [topic, setTopic] = useState("");
    const [questionData, setQuestionData] = useState<{question: string, options: string[], correctIndex: number, explanation: string} | null>(null);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [streak, setStreak] = useState(0);
  
    const generateQuestion = async () => {
      if (!topic.trim()) return;
      setLoading(true);
      setQuestionData(null);
      setSelectedOption(null);
      const prompt = `Generate a challenging multiple-choice question for a medical interpreter about "${topic}". Focus on terminology, ethics, or culture. Output ONLY raw JSON: {"question": "...", "options": ["A", "B", "C", "D"], "correctIndex": 0-3, "explanation": "..."}`;
      try {
        const result = await callGemini(prompt);
        if(result) {
            const cleanJson = result.replace(/```json/g, '').replace(/```/g, '').trim();
            setQuestionData(JSON.parse(cleanJson));
        }
      } catch (e) { console.error("Quiz gen error", e); }
      setLoading(false);
    };
  
    const handleOptionClick = (index: number) => {
      if (selectedOption !== null) return;
      setSelectedOption(index);
      if (questionData && index === questionData.correctIndex) {
        setStreak(s => s + 1);
      } else {
        setStreak(0);
      }
    };
  
    return (
      <div className="w-full max-w-3xl mx-auto p-4 animate-fade-in">
        <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-200 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-black text-slate-800 flex items-center gap-2"><HelpCircle className="w-8 h-8 text-purple-600"/> AI Medi-Quiz</h3>
            <div className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2"><Trophy className="w-4 h-4" /> Streak: {streak}</div>
          </div>
          <div className="flex gap-3 mb-8">
            <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Topic (e.g. Cardiology, Ethics)..." className="flex-1 px-5 py-4 border border-slate-200 bg-slate-50 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none text-lg" onKeyDown={(e) => e.key === 'Enter' && generateQuestion()} />
            <button onClick={generateQuestion} disabled={loading || !topic} className="px-8 py-4 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 disabled:opacity-50 flex items-center gap-2 transition-all shadow-lg shadow-purple-200">{loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Quiz Me"}</button>
          </div>
          {questionData && (
            <div className="animate-fade-in">
              <div className="mb-6">
                <h4 className="text-xl font-bold text-slate-800 mb-6 leading-relaxed">{questionData.question}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {questionData.options.map((option, idx) => (
                    <button key={idx} onClick={() => handleOptionClick(idx)} disabled={selectedOption !== null} className={`p-4 rounded-xl border-2 text-left transition-all font-medium relative overflow-hidden ${selectedOption === null ? 'border-slate-200 hover:border-purple-300 hover:bg-purple-50 text-slate-700' : idx === questionData.correctIndex ? 'border-green-500 bg-green-50 text-green-800' : selectedOption === idx ? 'border-red-500 bg-red-50 text-red-800' : 'border-slate-100 text-slate-400 opacity-50'}`}>
                      <span className="mr-2 font-bold">{String.fromCharCode(65 + idx)}.</span> {option}
                      {selectedOption !== null && idx === questionData.correctIndex && <Check className="absolute right-4 top-1/2 -translate-y-1/2 text-green-600 w-5 h-5" />}
                      {selectedOption === idx && idx !== questionData.correctIndex && <X className="absolute right-4 top-1/2 -translate-y-1/2 text-red-600 w-5 h-5" />}
                    </button>
                  ))}
                </div>
              </div>
              {selectedOption !== null && (
                <div className="bg-purple-50/70 border border-purple-100 rounded-2xl p-6 animate-fade-in">
                  <h5 className="font-bold text-purple-800 mb-2 flex items-center gap-2"><Sparkles className="w-4 h-4" /> AI Explanation</h5>
                  <p className="text-purple-900 leading-relaxed">{questionData.explanation}</p>
                  <button onClick={generateQuestion} className="mt-4 px-6 py-2 bg-purple-200 text-purple-800 rounded-lg font-bold hover:bg-purple-300 transition-all text-sm">Next Question</button>
                </div>
              )}
            </div>
          )}
          {!questionData && !loading && (<div className="text-center py-12 text-slate-400"><Brain className="w-16 h-16 mx-auto mb-4 opacity-20" /><p>Enter a topic to generate an AI quiz.</p></div>)}
        </div>
      </div>
    );
};


// --- MAIN APP --- 
const InterpreStudyComponent = () => {
  const [activeTab, setActiveTab] = useState('flashcards');

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-200 selection:text-indigo-900">
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <InterpreLabLogo className="w-10 h-10 drop-shadow-md" />
            <div>
              <h1 className="text-xl font-black text-slate-800 leading-none tracking-tight">InterpreStudy</h1>
              <p className="text-xs text-slate-400 font-semibold tracking-wide">AI Training Suite</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-full border border-slate-800 shadow-lg">
            <span className="relative flex h-2.5 w-2.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span></span>
            <span className="text-xs font-bold text-white uppercase tracking-wide">InterpreBot Active</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-3 overflow-x-auto pb-4 mb-6 no-scrollbar">
          {[ 
            { id: 'flashcards', icon: Book, label: 'Smart Deck' },
            { id: 'conversation', icon: Mic, label: 'Premium Sim' },
            { id: 'quiz', icon: HelpCircle, label: 'AI Quiz' },
            { id: 'body', icon: Accessibility, label: 'Body Mapper' },
            { id: 'scenario', icon: MessageSquare, label: 'Script Gen' },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-5 py-3 rounded-2xl flex items-center gap-3 text-sm font-bold whitespace-nowrap transition-all border-2 ${activeTab === tab.id ? 'bg-white border-indigo-600 text-indigo-700 shadow-xl scale-105 z-10' : 'bg-white border-transparent text-slate-500 hover:bg-white hover:border-slate-200 hover:shadow-md'}`}>
              <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-indigo-600' : 'text-slate-400'}`} /> {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white/50 rounded-[2.5rem] border border-white/50 min-h-[600px] shadow-[0_0_40px_-15px_rgba(0,0,0,0.1)] overflow-hidden relative backdrop-blur-sm">
          {activeTab === 'flashcards' && <SmartFlashcards />}
          {activeTab === 'conversation' && <ConversationMode />}
          {activeTav === 'quiz' && <AiQuiz />}
          {activeTab === 'body' && <BodyMapper />}
          {activeTab === 'scenario' && <ScenarioGenerator />}
        </div>
      </div>
      
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .style-preserve-3d { transform-style: preserve-3d; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .backface-hidden { backface-visibility: hidden; }
        .animate-spin-slow { animation: spin 8s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};


const InterpreStudy = () => {
    return (
        <Layout>
            <InterpreStudyComponent />
        </Layout>
    )
}

export default InterpreStudy;
