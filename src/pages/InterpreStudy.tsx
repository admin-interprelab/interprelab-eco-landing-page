import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Brain,
  ShieldAlert,
  Activity,
  CheckCircle,
  XCircle,
  ArrowRight,
  MessageSquare,
  Thermometer,
  RotateCcw,
  Award,
  User,
  Zap,
  Sparkles,
  Loader,
  Volume2,
  Mic,
  GraduationCap,
  Heart,
  Stethoscope,
  Menu,
  X,
  Play,
  Pause,
  ChevronRight,
  Info
} from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from "@/components/ui/badge";
import { BackgroundPattern } from "@/components/BackgroundPattern";

// --- API & GLOBALS --- //

// IMPORTANT: This key is for the Google Gemini API, not Supabase.
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.warn("Google Gemini API key missing: AI features will be disabled.");
}

async function generateGeminiContent(prompt: string) {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      }
    );
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Error generating content.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
}

// --- VISUAL COMPONENTS --- //


type ModuleColor = 'purple' | 'blue' | 'orange' | 'rose' | 'teal';

interface ModuleHeroProps {
  title: string;
  subtitle: string;
  icon: React.ElementType<{ className?: string }>;
  color: ModuleColor;
  pattern: 'waves' | 'grid' | 'circles';
}

const ModuleHero = ({ title, subtitle, icon: Icon, color, pattern }: ModuleHeroProps) => {
  const gradients: Record<ModuleColor, string> = {
    purple: "from-purple-900 via-purple-800 to-background",
    blue: "from-blue-900 via-blue-800 to-background",
    orange: "from-orange-900 via-orange-800 to-background",
    rose: "from-rose-900 via-rose-800 to-background",
    teal: "from-teal-900 via-teal-800 to-background",
  };

  const accentColors: Record<ModuleColor, string> = {
    purple: "text-purple-400",
    blue: "text-blue-400",
    orange: "text-orange-400",
    rose: "text-rose-400",
    teal: "text-teal-400",
  };

  return (
    <div className={`relative w-full h-80 overflow-hidden flex items-center justify-center bg-gradient-to-b ${gradients[color]}`}>
      {/* Abstract SVG Pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {pattern === 'waves' && (
           <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
             <path fill="currentColor" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
           </svg>
        )}
        {pattern === 'grid' && (
           <svg className="w-full h-full" width="100%" height="100%">
             <defs>
               <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                 <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
               </pattern>
             </defs>
             <rect width="100%" height="100%" fill="url(#grid)" />
           </svg>
        )}
        {pattern === 'circles' && (
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <circle cx="0" cy="0" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </svg>
        )}
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className={`mx-auto w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 border border-white/20 shadow-xl ${accentColors[color]}`}>
          <Icon className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-4xl md:text-6xl font-medium text-white mb-4 drop-shadow-md tracking-tight">
          {title}
        </h1>
        <div className="w-20 h-1 bg-white/30 mx-auto mb-6 rounded-full"></div>
        <p className="text-lg text-white/80 font-light tracking-wide max-w-xl mx-auto">
          {subtitle}
        </p>
      </div>

      {/* Noise Overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
    </div>
  );
};

// --- MODULES --- //

const ScriptDoctor = () => {
    const [input, setInput] = useState('');
    const [refined, setRefined] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRefine = async () => {
        if(!input) return;
        setLoading(true);
        const prompt = `Rewrite "${input}" into Standard Medical Interpreter Phraseology (Third Person, Transparent).`;
        const result = await generateGeminiContent(prompt);
        setRefined(result);
        setLoading(false);
    };

    return (
        <div className="bg-card border border-border p-8 rounded-xl shadow-sm hover:border-teal-500/30 transition-all">
            <h4 className="font-serif text-xl text-foreground mb-4 flex items-center">
                <Sparkles className="w-5 h-5 mr-3 text-teal-500" /> The Script Doctor
            </h4>
            <div className="flex gap-4 mb-4">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type rough draft (e.g. 'I missed that')..."
                    className="flex-1 p-4 bg-background border border-border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                    onKeyDown={(e) => e.key === 'Enter' && handleRefine()}
                />
                <button
                    onClick={handleRefine}
                    disabled={loading || !input}
                    className="bg-teal-600 text-white px-6 rounded-lg font-medium hover:bg-teal-700 disabled:opacity-50 transition-colors"
                >
                    {loading ? <Loader className="animate-spin w-5 h-5" /> : "Refine"}
                </button>
            </div>
            {refined && (
                <div className="bg-teal-500/10 p-4 rounded-lg border-l-4 border-teal-500">
                    <p className="font-serif text-lg text-foreground italic">"{refined}"</p>
                </div>
            )}
        </div>
    );
};

interface AcademyViewProps {
  onExit: () => void;
}

const AcademyView = ({ onExit }: AcademyViewProps) => {
  const [activeTab, setActiveTab] = useState('dcs');
  const tabs = [
    { id: 'dcs', label: 'DC Schema', icon: Activity },
    { id: 'intervene', label: 'Intervention', icon: ShieldAlert },
    { id: 'phraseology', label: 'Phraseology', icon: MessageSquare },
    { id: 'trauma', label: 'Vicarious Trauma', icon: Heart },
  ];

  return (
    <div className="bg-background min-h-screen animate-fadeIn pb-20">
      <ModuleHero 
        title="The Academy" 
        subtitle="Fundamental concepts for the modern interpreter." 
        icon={GraduationCap} 
        color="teal" 
        pattern="grid"
      />
      
      <div className="container mx-auto px-6 -mt-10 relative z-20">
        <div className="bg-card border border-border rounded-2xl shadow-xl overflow-hidden min-h-[60vh]">
          <div className="flex border-b border-border bg-muted/30 overflow-x-auto">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-8 py-5 font-medium text-sm whitespace-nowrap transition-colors border-b-2 ${activeTab === tab.id ? 'border-teal-500 text-teal-500 bg-card' : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-card/50'}`}
                >
                    <tab.icon className="w-4 h-4 mr-2" />
                    {tab.label}
                </button>
            ))}
             <div className="flex-1 flex justify-end p-2">
                 <button onClick={onExit} className="p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted"><XCircle /></button>
             </div>
          </div>

          <div className="p-8 md:p-12">
            {activeTab === 'dcs' && (
                <div className="max-w-3xl mx-auto space-y-12 animate-fadeIn">
                    <div className="text-center">
                        <div className="inline-block mb-3 text-xs font-bold tracking-widest text-blue-500 uppercase">Theory</div>
                        <h2 className="font-serif text-3xl text-foreground mb-4">Demand Control Schema (DC-S)</h2>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            Interpreting is not just about words. It's about managing <strong>Demands</strong> (challenges) with <strong>Controls</strong> (decisions).
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { l: 'E', t: 'Environmental', d: 'Setting, fumes, noise.', c: 'blue' },
                            { l: 'I', t: 'Interpersonal', d: 'Dynamics, culture.', c: 'indigo' },
                            { l: 'P', t: 'Paralinguistic', d: 'Volume, speed, accent.', c: 'violet' },
                            { l: 'I', t: 'Intrapersonal', d: 'Hunger, bias, fatigue.', c: 'pink' }
                        ].map(item => (
                            <div key={item.t} className="p-6 rounded-xl border border-border bg-card hover:border-blue-500/30 transition-all hover:-translate-y-1 shadow-sm">
                                <div className={`w-10 h-10 rounded-full bg-${item.c}-500/10 text-${item.c}-500 flex items-center justify-center font-bold text-xl mb-4 border border-${item.c}-500/20`}>{item.l}</div>
                                <h3 className="font-bold text-foreground mb-2">{item.t}</h3>
                                <p className="text-slate-500 dark:text-slate-400">{item.d}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'intervene' && (
                 <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn">
                    <div className="bg-orange-500/5 border border-orange-500/20 p-8 rounded-xl">
                        <h2 className="font-serif text-3xl text-foreground mb-4">The Transparency Principle</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Never have a "side conversation". If you intervene, you must inform both parties.
                        </p>
                        <div className="mt-6 flex flex-col gap-4">
                             <div className="flex items-center gap-4 text-foreground">
                                 <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold shrink-0">1</div>
                                 <p>Identify the barrier to communication.</p>
                             </div>
                             <div className="flex items-center gap-4 text-foreground">
                                 <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold shrink-0">2</div>
                                 <p>Inform parties: "The interpreter needs to clarify..."</p>
                             </div>
                             <div className="flex items-center gap-4 text-foreground">
                                 <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold shrink-0">3</div>
                                 <p>Resolve and return to conduit role immediately.</p>
                             </div>
                        </div>
                    </div>
                 </div>
            )}

            {activeTab === 'phraseology' && (
                <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn">
                     <ScriptDoctor />
                </div>
            )}

            {activeTab === 'trauma' && (
                <div className="max-w-3xl mx-auto text-center space-y-8 animate-fadeIn">
                     <div className="w-20 h-20 bg-rose-500/10 rounded-full mx-auto flex items-center justify-center text-rose-500 mb-6">
                         <Heart className="w-10 h-10" />
                     </div>
                     <h2 className="font-serif text-3xl text-foreground">Vicarious Trauma</h2>
                     <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                        "The cost of caring." Interpreters absorb the emotional weight of their patients. Recognizing this is the first step to resilience.
                     </p>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface ImmersiveSimulationProps {
  onComplete: (points: number) => void;
  onExit: () => void;
}

const ImmersiveSimulation = ({ onComplete, onExit }: ImmersiveSimulationProps) => {
    interface Scenario {
        context: string;
        speaker: string;
        text: string;
        audio_instruction: string;
        challenge_type: string;
    }

    interface AiFeedback {
        status: 'Success' | 'Risk';
        feedback: string;
        dcs_tag?: string;
    }

    const [phase, setPhase] = useState('setup');
    const [loading, setLoading] = useState(false);
    const [scenario, setScenario] = useState<Scenario | null>(null);
    const [userAction, setUserAction] = useState('interpret');
    const [aiFeedback, setAiFeedback] = useState<AiFeedback | null>(null);

    const generateScenario = async () => {
        setLoading(true);
        const prompt = `Generate a medical interpreting scenario with a Paralinguistic or Environmental challenge. Return JSON: { "context": "...", "speaker": "Doctor/Patient", "text": "...", "audio_instruction": "...", "challenge_type": "..." }`;
        const res = await generateGeminiContent(prompt);
        try {
             // Clean code blocks if present
             const cleanJson = res?.replace(/```json|```/g, '').trim() || '{}';
             setScenario(JSON.parse(cleanJson));
             setPhase('playing');
        } catch { toast.error("Failed to generate."); }
        setLoading(false);
    };

    const submitResponse = async (response: string) => {
        setLoading(true);
        const prompt = `Evaluate interpreter response: "${response}" for scenario "${scenario?.text}". Challenge: ${scenario?.challenge_type}. Action: ${userAction}. Return JSON: { "status": "Success/Risk", "feedback": "...", "dcs_tag": "..." }`;
        const res = await generateGeminiContent(prompt);
        try {
            const cleanJson = res?.replace(/```json|```/g, '').trim() || '{}';
            setAiFeedback(JSON.parse(cleanJson));
            setPhase('feedback');
        } catch { toast.error("Evaluation failed."); }
        setLoading(false);
    };

    return (
        <div className="bg-background min-h-screen animate-fadeIn pb-20">
            <ModuleHero title="Immersive Simulation" subtitle="Live practice with realistic imperfections." icon={Mic} color="purple" pattern="waves" />
            
            <div className="container mx-auto px-6 -mt-10 relative z-20">
                <div className="bg-card border border-border rounded-2xl shadow-xl overflow-hidden min-h-[500px] p-8 md:p-12 relative">
                    <button onClick={onExit} className="absolute top-6 right-6 p-2 hover:bg-muted rounded-full"><XCircle className="text-muted-foreground" /></button>
                    
                    {phase === 'setup' && (
                        <div className="text-center py-20">
                            <h2 className="font-serif text-3xl text-foreground mb-6">Ready to Interpret?</h2>
                            <button onClick={generateScenario} disabled={loading} className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold shadow-lg shadow-purple-500/20 transition-all transform hover:-translate-y-1 flex items-center mx-auto">
                                {loading ? <Loader className="animate-spin mr-2"/> : <Play className="mr-2 fill-current"/>} Start Simulation
                            </button>
                        </div>
                    )}

                    {phase === 'playing' && scenario && (
                        <div className="max-w-2xl mx-auto space-y-8 animate-fadeIn">
                             <div className="flex items-center justify-between text-sm text-muted-foreground uppercase tracking-widest font-bold border-b border-border pb-4">
                                 <span>{scenario.context}</span>
                                 <span className="text-purple-500">{scenario.challenge_type} Challenge</span>
                             </div>

                             <div className="py-8 text-center space-y-4">
                                 <div className="w-24 h-24 bg-purple-100 dark:bg-purple-900/30 rounded-full mx-auto flex items-center justify-center text-purple-600 animate-pulse">
                                     <Volume2 className="w-10 h-10" />
                                 </div>
                                 <p className="text-sm text-muted-foreground italic">"{scenario.audio_instruction}"</p>
                             </div>

                             <div className="grid grid-cols-2 gap-4">
                                 <button onClick={() => setUserAction('interpret')} className={`p-4 rounded-xl border-2 font-bold transition-all ${userAction === 'interpret' ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' : 'border-border'}`}>Execute Conduit</button>
                                 <button onClick={() => setUserAction('intervene')} className={`p-4 rounded-xl border-2 font-bold transition-all ${userAction === 'intervene' ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' : 'border-border'}`}>Intervene</button>
                             </div>

                             <div>
                                 <textarea id="response" className="w-full p-4 bg-background border border-border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none min-h-[120px]" placeholder="What do you say?" />
                                 <button onClick={() => submitResponse((document.getElementById('response') as HTMLTextAreaElement).value)} disabled={loading} className="w-full mt-4 py-4 bg-foreground text-background font-bold rounded-xl hover:opacity-90 transition-opacity">Submit</button>
                             </div>
                        </div>
                    )}

                    {phase === 'feedback' && aiFeedback && (
                        <div className="max-w-2xl mx-auto text-center py-12 animate-fadeIn">
                            <div className={`inline-flex items-center px-4 py-2 rounded-full mb-6 ${aiFeedback.status === 'Success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {aiFeedback.status === 'Success' ? <CheckCircle className="w-4 h-4 mr-2"/> : <ShieldAlert className="w-4 h-4 mr-2"/>}
                                <span className="font-bold uppercase tracking-wide text-sm">{aiFeedback.status}</span>
                            </div>
                            <h3 className="font-serif text-3xl text-foreground mb-6">Analysis</h3>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-8">{aiFeedback.feedback}</p>
                            <div className="bg-muted p-6 rounded-xl mb-8">
                                <p className="text-sm font-mono text-muted-foreground">Original: "{scenario.text}"</p>
                            </div>
                            <button onClick={() => onComplete(200)} className="bg-purple-600 text-white px-8 py-3 rounded-xl font-bold">Complete Module (+200 XP)</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

interface DCSModuleProps {
  onComplete: (points: number) => void;
  onExit: () => void;
}

const DCSModule = ({ onComplete, onExit }: DCSModuleProps) => {
    // Simplified DCS module
    const [revealed, setRevealed] = useState(false);
    return (
         <div className="bg-background min-h-screen animate-fadeIn pb-20">
            <ModuleHero title="DCS Detective" subtitle="Analyze the demands of the job." icon={Activity} color="blue" pattern="grid" />
            <div className="container mx-auto px-6 -mt-10 relative z-20">
                <div className="bg-card border border-border rounded-2xl shadow-xl p-8 md:p-12 relative text-center min-h-[500px] flex flex-col justify-center">
                    <button onClick={onExit} className="absolute top-6 right-6 p-2 hover:bg-muted rounded-full"><XCircle className="text-muted-foreground" /></button>
                    
                    {!revealed ? (
                        <div className="max-w-xl mx-auto space-y-8 animate-fadeIn">
                            <div className="text-sm font-bold tracking-widest text-blue-500 uppercase">Scenario 1</div>
                            <h2 className="font-serif text-2xl text-foreground leading-relaxed">
                                "The patient is speaking extremely fast and has a heavy regional accent."
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                {['Environmental', 'Interpersonal', 'Paralinguistic', 'Intrapersonal'].map(opt => (
                                    <button key={opt} onClick={() => setRevealed(true)} className="p-4 border border-border rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-500 transition-all">{opt}</button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="max-w-xl mx-auto space-y-6 animate-fadeIn">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle /></div>
                            <h3 className="font-serif text-2xl text-foreground">Paralinguistic Demand</h3>
                            <p className="text-muted-foreground">Correct. Speed and accent are 'raw materials' of speech.</p>
                            <button onClick={() => onComplete(100)} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold">Finish (+100 XP)</button>
                        </div>
                    )}
                </div>
            </div>
         </div>
    );
};

// --- MAIN HOME VIEW --- //

interface HomeViewProps {
  onNavigate: (view: string) => void;
  completed: string[];
}

const HomeView = ({ onNavigate, completed }: HomeViewProps) => {
    const modules = [
        { id: 'immersive', title: 'Immersive Simulation', desc: 'Live roleplay with audio challenges.', icon: Mic, color: 'purple', delay: '0s' },
        { id: 'dcs', title: 'DCS Detective', desc: 'Identify EIPI demands in scenarios.', icon: Activity, color: 'blue', delay: '0.1s' },
        { id: 'roles', title: 'Managing Escalation', desc: 'Protocol: Conduit vs. Clarifier.', icon: ShieldAlert, color: 'orange', delay: '0.2s' },
        { id: 'trauma', title: 'Vicarious Trauma', desc: 'Self-care and burnout prevention.', icon: Thermometer, color: 'rose', delay: '0.3s' },
    ];

    return (
        <div className="container mx-auto px-6 py-12 max-w-6xl">
             <div className="text-center mb-16 space-y-4">
                 <Badge variant="outline" className="mb-4 border-nobel-gold text-nobel-gold px-4 py-1 text-xs tracking-widest uppercase">InterpreStudy</Badge>
                 <h1 className="font-serif text-5xl md:text-6xl text-foreground mb-6">
                    Professional <span className="italic text-nobel-gold">Development</span>
                 </h1>
                 <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
                     Master the core competencies of medical interpreting through AI-guided simulation and rigorous academic theory.
                 </p>
                 <button onClick={() => onNavigate('academy')} className="mt-8 px-8 py-3 bg-foreground text-background rounded-full font-medium hover:opacity-90 transition-opacity inline-flex items-center">
                     <GraduationCap className="mr-2 w-5 h-5"/> Enter Academy
                 </button>
             </div>

             <div className="grid md:grid-cols-2 gap-8">
                 {modules.map((m) => (
                     <div 
                        key={m.id} 
                        onClick={() => onNavigate(m.id)}
                        className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer animate-fade-in-up"
                        style={{ animationDelay: m.delay }}
                     >
                        <div className={`absolute top-0 right-0 p-32 bg-${m.color}-500/5 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-${m.color}-500/10`}></div>
                        
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-6">
                                <div className={`w-14 h-14 rounded-2xl bg-${m.color}-500/10 flex items-center justify-center text-${m.color}-500 group-hover:scale-110 transition-transform`}>
                                    <m.icon className="w-7 h-7" />
                                </div>
                                {completed.includes(m.id) && <CheckCircle className="text-green-500 w-6 h-6" />}
                            </div>
                            
                            <h3 className="font-serif text-2xl text-foreground mb-3 group-hover:text-nobel-gold transition-colors">{m.title}</h3>
                            <p className="text-muted-foreground mb-6 leading-relaxed">{m.desc}</p>
                            
                            <div className="flex items-center text-sm font-bold text-foreground group-hover:translate-x-2 transition-transform">
                                {completed.includes(m.id) ? 'Review Module' : 'Start Module'} <ArrowRight className="ml-2 w-4 h-4" />
                            </div>
                        </div>
                     </div>
                 ))}
             </div>
        </div>
    );
};

// --- MAIN COMPONENT --- //

const InterpreStudy = () => {
    const navigate = useNavigate();
    const [view, setView] = useState('home');
    const [score, setScore] = useState(0);
    const [completed, setCompleted] = useState<string[]>([]);
    const [scrolled, setScrolled] = useState(false);
    
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const completeModule = (id: string, points: number) => {
        if(!completed.includes(id)) {
            setCompleted(prev => [...prev, id]);
            setScore(s => s + points);
            toast.success(`Module Completed! +${points} XP`);
        }
        setView('home');
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-nobel-gold selection:text-white relative">
            <BackgroundPattern />
            
            {/* Nav */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                         {/* Back Button (Only on subpages) */}
                        {view !== 'home' && (
                            <button 
                                onClick={() => setView('home')}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold transition-all ${scrolled ? 'bg-muted text-foreground hover:bg-muted/80' : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-md'}`}
                            >
                                <ArrowRight className="w-4 h-4 rotate-180" /> Back
                            </button>
                        )}
                        
                        
                        <div className={`flex items-center gap-2 cursor-pointer ${!scrolled && view !== 'home' ? 'text-white' : 'text-foreground'}`} onClick={() => navigate('/')}>
                            <div className="w-8 h-8 bg-nobel-gold rounded-full flex items-center justify-center text-white font-serif font-bold text-lg pb-1">L</div>
                            <span className="font-serif font-bold text-lg tracking-wide">Interpre<span className="text-nobel-gold">Lab</span></span>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex flex-col items-end">
                            <span className={`text-[10px] uppercase tracking-widest font-bold ${!scrolled && view !== 'home' ? 'text-white/80' : 'text-muted-foreground'}`}>Total XP</span>
                            <span className="font-serif text-lg font-bold text-nobel-gold">{score}</span>
                        </div>
                        <div className={`w-10 h-10 rounded-full border flex items-center justify-center ${!scrolled && view !== 'home' ? 'bg-white/10 border-white/20 text-white' : 'bg-card border-border text-muted-foreground'}`}>
                            <User className="w-5 h-5" />
                        </div>
                    </div>
                </div>
            </nav>

            <main className="pt-24 min-h-screen">
                {view === 'home' && <HomeView onNavigate={setView} completed={completed} />}
                {view === 'academy' && <AcademyView onExit={() => setView('home')} />}
                {view === 'immersive' && <ImmersiveSimulation onComplete={(p: number) => completeModule('immersive', p)} onExit={() => setView('home')} />}
                {view === 'dcs' && <DCSModule onComplete={(p: number) => completeModule('dcs', p)} onExit={() => setView('home')} />}
                {/* Fallbacks for other modules to DCS for now, or easily expandable */}
                {(view === 'roles' || view === 'trauma') && <DCSModule onComplete={(p: number) => completeModule(view, p)} onExit={() => setView('home')} />}
            </main>
        </div>
    );
};

export default InterpreStudy;