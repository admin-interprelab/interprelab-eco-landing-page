import React, { useState, useRef } from 'react';
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
  X
} from 'lucide-react';
import { toast } from 'sonner';

/**
 * InterpreLab: Core Dynamics Training Module + Gemini AI Integration
 * * Content Sources:
 * 1. benefits_of_teaching_dcs.pdf (DCS Schema)
 * 2. dealing_with_stressful_situations... (Roles, Escalation)
 * 3. intervening_with_the_proper_phraseology... (Scripts)
 * 4. sdp_vicarious_trauma_paper.pdf (Vicarious Trauma)
 * * * New AI Features:
 * - "Script Doctor": Rewrites user input into Standard Phraseology (Academy)
 * - "Role Consultant": Analyzes user-submitted scenarios (Roles Module)
 */

// IMPORTANT: This key is for the Google Gemini API, not Supabase.
// Make sure to set VITE_GEMINI_API_KEY in your .env file.
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.warn(
    "Google Gemini API key missing: Please set VITE_GEMINI_API_KEY in your .env file. AI features will be disabled."
  );
}

const InterpreStudy = () => {
  const [currentView, setCurrentView] = useState('home');
  const [score, setScore] = useState(0);
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleModuleComplete = (moduleName, points) => {
    if (!completedModules.includes(moduleName)) {
      setCompletedModules(prevModules => [...prevModules, moduleName]);
      setScore(prevScore => prevScore + points);
    }
    setCurrentView('summary');
  };

  const renderView = () => {
    switch (currentView) {
      case 'home': return <HomeView onNavigate={(view) => setCurrentView(view)} completed={completedModules} />;
      case 'academy': return <AcademyView onExit={() => setCurrentView('home')} />;
      case 'dcs': return <DCSModule onComplete={(points) => handleModuleComplete('dcs', points)} onExit={() => setCurrentView('home')} />;
      case 'roles': return <RolesModule onComplete={(points) => handleModuleComplete('roles', points)} onExit={() => setCurrentView('home')} />;
      case 'trauma': return <TraumaModule onComplete={(points) => handleModuleComplete('trauma', points)} onExit={() => setCurrentView('home')} />;
      case 'immersive': return <ImmersiveSimulation onComplete={(points) => handleModuleComplete('immersive', points)} onExit={() => setCurrentView('home')} />;
      case 'summary': return <SummaryView score={score} totalModules={4} completed={completedModules.length} onHome={() => setCurrentView('home')} />;
      default: return <HomeView onNavigate={(view) => setCurrentView(view)} completed={completedModules} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-nobel-gold selection:text-white">
      {/* Header */}
      <header className="bg-card/50 border-b border-border/50 sticky top-0 z-10 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setCurrentView('home')}>
            <div className="bg-nobel-gold p-2 rounded-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-serif text-xl font-bold text-foreground tracking-tight">InterpreLab<span className="text-nobel-gold">.</span></h1>
              <p className="text-xs text-muted-foreground font-medium">Core Dynamics Training</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
                onClick={() => setCurrentView('academy')}
                className="hidden md:flex items-center px-4 py-2 bg-card hover:bg-nobel-gold/10 text-foreground rounded-lg text-sm font-semibold transition-colors border border-border/50"
            >
                <GraduationCap className="w-4 h-4 mr-2" />
                The Academy
            </button>
            <div className="hidden md:flex flex-col items-end">
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Current Score</span>
              <span className="font-serif text-lg font-bold text-nobel-gold">{score} XP</span>
            </div>
            <div className="h-10 w-10 bg-card rounded-full flex items-center justify-center border border-border/50">
              <User className="w-5 h-5 text-muted-foreground" />
            </div>
            <button className="md:hidden text-foreground p-2" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center gap-8 text-xl font-serif animate-fade-in text-foreground">
          <button onClick={() => { setCurrentView('home'); setMenuOpen(false); }} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Home</button>
          <button onClick={() => { setCurrentView('academy'); setMenuOpen(false); }} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Academy</button>
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Current Score</p>
            <p className="font-serif text-3xl font-bold text-nobel-gold">{score} XP</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {renderView()}
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-4 py-6 text-center text-slate-400 text-sm">
        <p>&copy; 2025 InterpreLab. Powered by Google Cloud & Gemini Models.</p>
      </footer>
    </div>
  );
};

/* --- API UTILS --- */

async function generateGeminiContent(prompt) {
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

// Note: Google Gemini API does not support text-to-speech.
// To enable audio playback, integrate Google Cloud Text-to-Speech API:
// https://cloud.google.com/text-to-speech/docs/reference/rest
// 
// For now, audio features are disabled. The simulation will work without audio.
//
// async function generateGeminiAudio(text, instruction) {
//   // Proper implementation requires Google Cloud TTS API key and endpoint
//   return null;
// }

/* --- NEW COMPONENT: SCRIPT DOCTOR (AI) --- */

const ScriptDoctor = () => {
    const [input, setInput] = useState('');
    const [refined, setRefined] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRefine = async () => {
        if(!input) return;
        setLoading(true);
        const prompt = `
            You are a rigorous Interpreter Trainer.
            Rewrite the following informal phrase into "Standard Phraseology" for a Medical Interpreter (as per industry standards).

            Rules:
            1. Always use Third Person ("The interpreter...").
            2. Be transparent and concise.
            3. Use terms like "requires repetition", "check for comprehension", "unfamiliar term".

            Input: "${input}"

            Return ONLY the corrected script.
        `;
        const result = await generateGeminiContent(prompt);
        setRefined(result);
        setLoading(false);
    };

    return (
        <div className="bg-teal-50 border border-teal-200 p-6 rounded-xl mt-6">
            <h4 className="font-bold text-teal-900 mb-3 flex items-center">
                <Sparkles className="w-5 h-5 mr-2" /> The Script Doctor
            </h4>
            <p className="text-sm text-teal-700 mb-4">
                Struggling to sound professional? Type what you <em>want</em> to say (e.g., "Hey wait, I didn't hear that"),
                and our AI will convert it to Standard Phraseology.
            </p>
            <div className="flex gap-4">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type rough draft here..."
                    className="flex-1 p-3 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button
                    onClick={handleRefine}
                    disabled={loading || !input}
                    className="bg-teal-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-teal-700 disabled:opacity-50"
                >
                    {loading ? <Loader className="animate-spin" /> : "Refine"}
                </button>
            </div>
            {refined && (
                <div className="mt-4 bg-white p-4 rounded-lg border-l-4 border-teal-500 shadow-sm">
                    <span className="text-xs font-bold text-slate-400 uppercase block mb-1">Standard Output</span>
                    <p className="text-lg font-serif text-slate-800">"{refined}"</p>
                </div>
            )}
        </div>
    );
};

/* --- ACADEMY VIEW --- */

const AcademyView = ({ onExit }) => {
  const [activeTab, setActiveTab] = useState('dcs'); // dcs, intervene, phraseology, trauma

  const tabs = [
    { id: 'dcs', label: 'The D-C Schema', icon: <Activity className="w-4 h-4" /> },
    { id: 'intervene', label: 'Intervention Protocols', icon: <ShieldAlert className="w-4 h-4" /> },
    { id: 'phraseology', label: 'Standard Phraseology', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'trauma', label: 'Vicarious Trauma', icon: <Heart className="w-4 h-4" /> },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden animate-fadeIn h-[80vh] flex flex-col">
       <div className="bg-slate-900 p-6 text-white flex justify-between items-center shrink-0">
        <div>
          <h3 className="text-xl font-bold flex items-center">
            <GraduationCap className="w-6 h-6 mr-2 text-teal-400" /> InterpreLab Academy
          </h3>
          <p className="text-slate-400 text-sm">Fundamental concepts for the modern interpreter.</p>
        </div>
        <button onClick={onExit} className="text-slate-400 hover:text-white"><XCircle className="w-6 h-6" /></button>
      </div>

      <div className="flex border-b border-slate-200 bg-slate-50 overflow-x-auto shrink-0">
        {tabs.map(tab => (
            <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-4 font-semibold text-sm whitespace-nowrap transition-colors border-b-2 ${activeTab === tab.id ? 'border-teal-600 text-teal-700 bg-white' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100'}`}
            >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
            </button>
        ))}
      </div>

      <div className="flex-grow overflow-y-auto p-8 bg-white">

        {activeTab === 'dcs' && (
            <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                    <h2 className="text-2xl font-bold text-blue-900 mb-2">Demand Control Schema (DC-S)</h2>
                    <p className="text-blue-800">
                        Adapted by Dean & Pollard, this schema replaces "it depends" with a structured analysis.
                        Interpreting work consists of <strong>Demands</strong> (challenges) and <strong>Controls</strong> (skills/decisions).
                    </p>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4 border-b pb-2">The 4 Demand Categories (EIPI)</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-5 rounded-lg border border-slate-200 hover:border-blue-400 transition-all">
                        <div className="flex items-center mb-3 text-blue-600 font-bold">
                            <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">E</span>
                            Environmental
                        </div>
                        <p className="text-sm text-slate-600">Specific to the setting. Terminology, odors, temperature, lighting, background noise.</p>
                    </div>
                    <div className="p-5 rounded-lg border border-slate-200 hover:border-purple-400 transition-all">
                        <div className="flex items-center mb-3 text-purple-600 font-bold">
                            <span className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">I</span>
                            Interpersonal
                        </div>
                        <p className="text-sm text-slate-600">Interaction between consumers. Power dynamics, cultural differences, conflict.</p>
                    </div>
                    <div className="p-5 rounded-lg border border-slate-200 hover:border-orange-400 transition-all">
                        <div className="flex items-center mb-3 text-orange-600 font-bold">
                            <span className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mr-3">P</span>
                            Paralinguistic
                        </div>
                        <p className="text-sm text-slate-600">The "raw material" of speech. Accents, mumbling, pace, volume.</p>
                    </div>
                    <div className="p-5 rounded-lg border border-slate-200 hover:border-red-400 transition-all">
                        <div className="flex items-center mb-3 text-red-600 font-bold">
                            <span className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">I</span>
                            Intrapersonal
                        </div>
                        <p className="text-sm text-slate-600">Inside the interpreter. Hunger, fatigue, bias, emotional reactions.</p>
                    </div>
                </div>
            </div>
        )}

        {activeTab === 'intervene' && (
             <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
                <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
                    <h2 className="text-2xl font-bold text-orange-900 mb-2">The Art of Intervention</h2>
                    <p className="text-orange-800">
                        Your primary role is a <strong>Conduit</strong>. However, to maintain accuracy, you may need to step into the role of <strong>Clarifier</strong>.
                    </p>
                </div>
                <div className="space-y-6 mt-8">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">The Principle of Transparency</h3>
                        <p className="text-slate-600 mb-4">When you intervene, you must keep all parties informed. Never have a "side conversation" without explaining it.</p>
                        <ol className="list-decimal list-inside space-y-2 bg-slate-50 p-4 rounded-lg text-slate-700 font-medium">
                            <li>State the problem or situation.</li>
                            <li>Suggest a possible solution.</li>
                            <li>Ask permission to apply the solution.</li>
                        </ol>
                    </div>
                </div>
             </div>
        )}

        {activeTab === 'phraseology' && (
            <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
                 <div className="bg-teal-50 p-6 rounded-xl border border-teal-100">
                    <h2 className="text-2xl font-bold text-teal-900 mb-2">Standard Phraseology</h2>
                    <p className="text-teal-800">
                        Professionalism is defined by how you handle difficulties. Memorize these scripts to intervene seamlessly.
                    </p>
                </div>

                <div className="grid gap-4 mt-6">
                    <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
                        <p className="text-xs font-bold text-slate-400 uppercase mb-1">When you need repetition</p>
                        <p className="font-semibold text-slate-800">"The interpreter requires repetition."</p>
                    </div>
                    {/* ... other examples ... */}
                </div>

                {/* AI FEATURE INJECTED HERE */}
                <ScriptDoctor />
            </div>
        )}

        {activeTab === 'trauma' && (
            <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
                 <div className="bg-rose-50 p-6 rounded-xl border border-rose-100">
                    <h2 className="text-2xl font-bold text-rose-900 mb-2">Vicarious Trauma</h2>
                    <p className="text-rose-800">
                        Interpreters are not machines. We are affected by the stories we convey.
                    </p>
                </div>
                <div className="prose prose-slate mt-6">
                    <p><strong>Definition:</strong> "The natural behaviors and emotions that arise from knowing about a traumatizing event experienced by a significant other." (Figley, 1995)</p>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

/* --- VIEWS --- */

const HomeView = ({ onNavigate, completed }) => {
  const modules = [
    {
      id: 'immersive',
      title: 'Immersive Simulation',
      desc: 'Live Roleplay: Listen to audio with realistic imperfections. Decide: Interpret or Intervene?',
      icon: <Mic className="w-6 h-6 text-purple-500" />,
      color: 'bg-purple-50 border-purple-200',
      btnColor: 'bg-purple-600 hover:bg-purple-700',
      source: 'Advanced Practice'
    },
    {
      id: 'dcs',
      title: 'The D-C Schema Detective',
      desc: 'Identify Environmental, Interpersonal, Paralinguistic, and Intrapersonal (EIPI) demands.',
      icon: <Activity className="w-6 h-6 text-blue-500" />,
      color: 'bg-blue-50 border-blue-200',
      btnColor: 'bg-blue-600 hover:bg-blue-700',
      source: 'Benefits of Teaching DCS'
    },
    {
      id: 'roles',
      title: 'Managing Escalation',
      desc: 'Master the hierarchy: Conduit → Clarifier → Facilitator. Know when to intervene.',
      icon: <ShieldAlert className="w-6 h-6 text-orange-500" />,
      color: 'bg-orange-50 border-orange-200',
      btnColor: 'bg-orange-600 hover:bg-orange-700',
      source: 'Dealing with Stressful Situations'
    },
    {
      id: 'trauma',
      title: 'Vicarious Trauma Awareness',
      desc: 'Analyze your own stress levels using AI reflection to detect compassion fatigue.',
      icon: <Thermometer className="w-6 h-6 text-rose-500" />,
      color: 'bg-rose-50 border-rose-200',
      btnColor: 'bg-rose-600 hover:bg-rose-700',
      source: 'Vicarious Trauma'
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center space-y-4 py-8">
        <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground">Welcome to your <span className="italic text-nobel-gold">AI-Guided</span> Training</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          InterpreBot has prepared four modules to optimize your human skills.
          Start with the <strong>Academy</strong> to learn the basics, then test your skills.
        </p>
        <button
            onClick={() => onNavigate('academy')}
            className="inline-flex items-center px-8 py-4 bg-nobel-gold hover:bg-nobel-gold/90 text-white rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
        >
            <GraduationCap className="w-6 h-6 mr-3" />
            Enter The Academy (Start Here)
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {modules.map((mod) => (
          <div key={mod.id} className={`relative p-6 rounded-2xl border-2 ${mod.color} transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col`}>
            {completed.includes(mod.id) && (
              <div className="absolute top-4 right-4 bg-green-500 text-white p-1 rounded-full">
                <CheckCircle className="w-5 h-5" />
              </div>
            )}
            <div className="flex items-start mb-4">
                <div className="h-14 w-14 rounded-xl bg-white shadow-sm flex items-center justify-center mr-4 shrink-0">
                {mod.icon}
                </div>
                <div>
                    <h3 className="font-serif text-xl font-bold text-foreground">{mod.title}</h3>
                    <div className="text-xs text-slate-400 font-medium uppercase tracking-wide mt-1">
                    Source: {mod.source}
                    </div>
                </div>
            </div>
            <p className="text-slate-600 text-sm mb-6 flex-grow">{mod.desc}</p>
            <button
              onClick={() => onNavigate(mod.id)}
              className={`w-full py-3 px-4 rounded-lg text-white font-semibold flex items-center justify-center space-x-2 transition-colors ${mod.btnColor}`}
            >
              <span>{completed.includes(mod.id) ? 'Retake Module' : 'Start Module'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

/* --- IMMERSIVE SIMULATION --- */

const ImmersiveSimulation = ({ onComplete, onExit }) => {
  const [phase, setPhase] = useState('setup');
  const [scenario, setScenario] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [userAction, setUserAction] = useState('interpret');
  const [userResponse, setUserResponse] = useState('');
  const [aiFeedback, setAiFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioRef = useRef(null);

  const generateScenario = async () => {
    setLoading(true);
    const scriptPrompt = `
      Create a single turn of a medical interpreting scenario.
      The scenario MUST have a specific challenge (DCS Demand).
      Examples:
      - Paralinguistic: Speaking too fast, mumbling, background noise.
      - Environmental: Medical jargon, privacy intrusion.

      Return JSON ONLY:
      {
        "speaker": "Doctor" or "Patient",
        "text": "The actual line of dialogue",
        "challenge_type": "Paralinguistic" or "Environmental" or "Interpersonal",
        "audio_instruction": "Instruction for TTS actor (e.g. 'Speak very fast', 'Sound angry', 'Whisper')",
        "context": "Brief context setting (e.g. ER Triage)"
      }
    `;

    const scriptJson = await generateGeminiContent(scriptPrompt);
    if (!scriptJson) { setLoading(false); return; }

    try {
      const cleanJson = scriptJson.replace(/```json|```/g, '').trim();
      const parsedScenario = JSON.parse(cleanJson);
      setScenario(parsedScenario);
      // Audio generation is disabled - Google Gemini API doesn't support TTS
      // To enable, integrate Google Cloud Text-to-Speech API
      // const audioBlobUrl = await generateGeminiAudio(parsedScenario.text, parsedScenario.audio_instruction);
      // setAudioUrl(audioBlobUrl);
      setAudioUrl(null);
      setPhase('playing');
    } catch (e) {
      console.error("Parse Error", e);
      toast.error("Simulation failed to initialize. Try again.");
    }
    setLoading(false);
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setAudioPlaying(true);
      audioRef.current.onended = () => setAudioPlaying(false);
    }
  };

  const submitResponse = async () => {
    setLoading(true);
    const evalPrompt = `
      Analyze this interpreting move.
      Scenario Context: ${scenario.context}
      Original Speaker (${scenario.speaker}): "${scenario.text}"
      Audio Challenge: ${scenario.audio_instruction}

      Interpreter Action: ${userAction} (Choice between 'Interpret' or 'Intervene')
      Interpreter Said: "${userResponse}"

      Task:
      1. Did they make the right strategic choice? (e.g. If audio was "mumbled", did they Clarify? If clear, did they Interpret?)
      2. Evaluate their accuracy/professionalism.
      3. Identify which DCS Demand they managed.

      Return JSON ONLY:
      {
        "status": "Success" or "Risk",
        "feedback": "2 sentences feedback.",
        "dcs_tag": "The Demand Category they handled"
      }
    `;

    const result = await generateGeminiContent(evalPrompt);
    try {
        const cleanJson = result.replace(/```json|```/g, '').trim();
        setAiFeedback(JSON.parse(cleanJson));
        setPhase('feedback');
    } catch(e) {
        toast.error("Evaluation failed.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden animate-fadeIn max-w-3xl mx-auto">
      <div className="bg-purple-700 p-6 text-white flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold flex items-center">
            <Mic className="w-5 h-5 mr-2" /> Immersive Sim
          </h3>
          <p className="text-purple-200 text-sm">Listen. Decide. Act.</p>
        </div>
        <button onClick={onExit} className="text-purple-200 hover:text-white"><XCircle className="w-6 h-6" /></button>
      </div>

      <div className="p-8 min-h-[400px] flex flex-col">
        {phase === 'setup' && (
          <div className="flex flex-col items-center justify-center flex-grow text-center space-y-6">
            <div className="bg-purple-100 p-6 rounded-full">
               <Zap className="w-12 h-12 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Ready for Live Practice?</h2>
            <p className="text-slate-600 max-w-md">
              InterpreBot will generate a unique scenario with realistic audio challenges.
              You must decide whether to <strong>Interpret</strong> (Conduit) or <strong>Intervene</strong> (Clarifier/Facilitator).
            </p>
            <button
              onClick={generateScenario}
              disabled={loading}
              className="bg-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-purple-700 transition-all flex items-center shadow-lg hover:shadow-xl"
            >
              {loading ? <Loader className="animate-spin w-6 h-6 mr-2" /> : <Sparkles className="w-6 h-6 mr-2" />}
              {loading ? "Generating Scenario..." : "Generate Call"}
            </button>
          </div>
        )}

        {phase === 'playing' && scenario && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between">
                <div>
                    <span className="text-xs font-bold text-slate-400 uppercase">Context</span>
                    <p className="font-semibold text-slate-700">{scenario.context}</p>
                </div>
                <div className="bg-white px-3 py-1 rounded border text-xs font-mono text-slate-500">
                    Speaker: {scenario.speaker}
                </div>
            </div>

            <div className="flex flex-col items-center space-y-4 py-6 border-b border-slate-100">
                <div className={`relative w-24 h-24 rounded-full flex items-center justify-center cursor-pointer transition-all ${audioPlaying ? 'bg-purple-100 scale-110' : 'bg-slate-100 hover:bg-purple-50'}`} onClick={playAudio}>
                    {audioPlaying ? (
                        <div className="absolute inset-0 rounded-full border-4 border-purple-400 border-t-transparent animate-spin"></div>
                    ) : null}
                    <Volume2 className={`w-10 h-10 ${audioPlaying ? 'text-purple-600' : 'text-slate-600'}`} />
                    <audio ref={audioRef} src={audioUrl} />
                </div>
                <p className="text-sm text-slate-500">Click to Listen (Pay attention to tone & clarity!)</p>
            </div>

            <div className="space-y-4">
                <div className="flex space-x-4">
                    <button
                        onClick={() => setUserAction('interpret')}
                        className={`flex-1 py-3 rounded-lg font-bold border-2 transition-all ${userAction === 'interpret' ? 'border-purple-600 bg-purple-50 text-purple-700' : 'border-slate-200 text-slate-500'}`}
                    >
                        Interpret (Conduit)
                    </button>
                    <button
                        onClick={() => setUserAction('intervene')}
                        className={`flex-1 py-3 rounded-lg font-bold border-2 transition-all ${userAction === 'intervene' ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-slate-200 text-slate-500'}`}
                    >
                        Intervene (Clarifier)
                    </button>
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                        {userAction === 'interpret' ? 'Your Interpretation:' : 'Your Intervention:'}
                    </label>
                    <textarea
                        value={userResponse}
                        onChange={(e) => setUserResponse(e.target.value)}
                        placeholder={userAction === 'interpret' ? "Type exactly what you would say..." : "Type how you would ask for clarification..."}
                        className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none h-32 resize-none text-lg"
                    />
                </div>

                <button
                    onClick={submitResponse}
                    disabled={!userResponse || loading}
                    className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {loading ? <Loader className="animate-spin w-5 h-5" /> : "Submit Action"}
                </button>
            </div>
          </div>
        )}

        {phase === 'feedback' && aiFeedback && (
            <div className="animate-fadeIn space-y-6">
                <div className={`p-6 rounded-xl border-l-8 ${aiFeedback.status === 'Success' ? 'bg-green-50 border-green-500' : 'bg-amber-50 border-amber-500'}`}>
                    <div className="flex items-center mb-4">
                        {aiFeedback.status === 'Success' ? <CheckCircle className="w-8 h-8 text-green-600 mr-3" /> : <ShieldAlert className="w-8 h-8 text-amber-600 mr-3" />}
                        <h3 className="text-2xl font-bold text-slate-800">{aiFeedback.status === 'Success' ? 'Great Decision' : 'Caution Needed'}</h3>
                    </div>
                    <p className="text-lg text-slate-700 leading-relaxed mb-4">{aiFeedback.feedback}</p>
                    <div className="inline-flex items-center bg-white px-3 py-1 rounded border border-slate-200 text-sm font-bold text-slate-500">
                        <Activity className="w-4 h-4 mr-2" />
                        DCS Tag: {aiFeedback.dcs_tag}
                    </div>
                </div>

                <div className="bg-slate-100 p-6 rounded-xl">
                    <h4 className="font-bold text-slate-700 mb-2 text-sm uppercase">Scenario Reveal</h4>
                    <p className="font-mono text-sm text-slate-600 mb-2"><strong>Audio Instruction:</strong> {scenario.audio_instruction}</p>
                    <p className="font-mono text-sm text-slate-600"><strong>Full Text:</strong> "{scenario.text}"</p>
                </div>

                <div className="flex gap-4">
                    <button onClick={() => setPhase('setup')} className="flex-1 py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700">
                        Next Scenario
                    </button>
                    <button onClick={() => onComplete(200)} className="flex-1 py-3 bg-slate-200 text-slate-700 rounded-lg font-bold hover:bg-slate-300">
                        Finish Session
                    </button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

/* --- DCS MODULE --- */

const DCSModule = ({ onComplete, onExit }) => {
  const [step, setStep] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scenarios, setScenarios] = useState([
    {
      text: "You are interpreting for a patient who is speaking very rapidly and mumbling due to a swollen jaw.",
      category: "Paralinguistic",
      reason: "Paralinguistic demands relate to the 'how' of speech: pace, volume, clarity, and accent.",
      options: ["Environmental", "Interpersonal", "Paralinguistic", "Intrapersonal"]
    }
  ]);

  const generateNewScenario = async () => {
    setLoading(true);
    const prompt = `
      Generate a realistic scenario for a language interpreter in a Medical or Legal setting.
      The scenario must clearly fit into ONE of these Demand-Control categories:
      1. Environmental (Terminology, fumes, lighting)
      2. Interpersonal (Power dynamics, cultural differences)
      3. Paralinguistic (Fast pace, accents, mumbling)
      4. Intrapersonal (Interpreter's hunger, bias)

      Return ONLY a JSON object:
      {
        "text": "The scenario description...",
        "category": "The Correct Category",
        "reason": "A one sentence explanation why."
      }
    `;

    const result = await generateGeminiContent(prompt);
    if (result) {
      try {
        const cleanJson = result.replace(/```json|```/g, '').trim();
        const newScenario = JSON.parse(cleanJson);
        newScenario.options = ["Environmental", "Interpersonal", "Paralinguistic", "Intrapersonal"];
        setScenarios([...scenarios, newScenario]);
        setStep(scenarios.length);
        setFeedback(null);
      } catch (e) {
        console.error("Failed to parse AI response", e);
        toast.error("AI generation failed. Please try again.");
      }
    }
    setLoading(false);
  };

  const handleGuess = (guess) => {
    if (guess === scenarios[step].category) {
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }
  };

  const nextStep = () => {
    if (step < scenarios.length - 1) {
      setStep(step + 1);
      setFeedback(null);
    } else {
      onComplete(100);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-fadeIn">
      <div className="bg-blue-600 p-6 text-white flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold flex items-center">
            <Activity className="w-5 h-5 mr-2" /> DCS Detective
          </h3>
          <p className="text-blue-100 text-sm">Categorize the Demand (EIPI)</p>
        </div>
        <button onClick={onExit} className="text-blue-100 hover:text-white"><XCircle className="w-6 h-6" /></button>
      </div>

      <div className="p-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wide">Scenario {step + 1}</div>
            <div className="text-xs text-slate-400">Total Scenarios Available: {scenarios.length}</div>
          </div>
          <p className="text-2xl font-medium text-slate-800 leading-relaxed min-h-[100px]">"{scenarios[step].text}"</p>
        </div>

        {!feedback ? (
          <div className="grid grid-cols-2 gap-4">
            {scenarios[step].options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleGuess(opt)}
                className="p-4 border-2 border-slate-100 rounded-xl hover:border-blue-500 hover:bg-blue-50 text-slate-600 font-semibold transition-all text-left"
              >
                {opt}
              </button>
            ))}
          </div>
        ) : (
          <div className={`rounded-xl p-6 ${feedback === 'correct' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'} animate-fadeIn`}>
            <div className="flex items-start mb-4">
              {feedback === 'correct' ? <CheckCircle className="w-6 h-6 text-green-600 mr-3 shrink-0" /> : <XCircle className="w-6 h-6 text-red-600 mr-3 shrink-0" />}
              <div>
                <h4 className={`font-bold ${feedback === 'correct' ? 'text-green-800' : 'text-red-800'}`}>
                  {feedback === 'correct' ? 'Excellent Analysis' : 'Not Quite'}
                </h4>
                <p className="text-slate-700 mt-1">{scenarios[step].reason}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={nextStep}
                className={`flex-1 py-3 rounded-lg font-bold text-white transition-colors ${feedback === 'correct' ? 'bg-green-600 hover:bg-green-700' : 'bg-slate-800 hover:bg-slate-900'}`}
              >
                {step < scenarios.length - 1 ? 'Next Scenario' : 'Finish Module'}
              </button>

              {feedback === 'correct' && step === scenarios.length - 1 && (
                <button
                  onClick={generateNewScenario}
                  disabled={loading}
                  className="flex-1 py-3 rounded-lg font-bold text-blue-700 bg-blue-100 hover:bg-blue-200 transition-colors flex items-center justify-center"
                >
                  {loading ? <Loader className="w-5 h-5 animate-spin" /> : <><Sparkles className="w-4 h-4 mr-2" /> Generate New One</>}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* --- SUMMARY VIEW --- */

const SummaryView = ({ score, totalModules, completed, onHome }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-6 animate-fadeIn">
      <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 mb-4">
        <Award className="w-12 h-12" />
      </div>
      <h2 className="text-3xl font-bold text-slate-900">Module Completed!</h2>
      <p className="text-slate-600 text-center max-w-md">
        Your skills are evolving. InterpreBot has updated your profile with the latest performance metrics.
      </p>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <span className="text-slate-500 font-medium">Total XP Earned</span>
          <span className="text-2xl font-bold text-teal-600">{score}</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-3 mb-2">
          <div
            className="bg-teal-500 h-3 rounded-full transition-all duration-1000"
            style={{ width: `${(completed / totalModules) * 100}%` }}
          ></div>
        </div>
        <p className="text-xs text-right text-slate-400">{completed} / {totalModules} Modules Complete</p>
      </div>

      <button
        onClick={onHome}
        className="bg-slate-900 text-white px-8 py-3 rounded-lg hover:bg-slate-800 transition-colors font-semibold flex items-center"
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        Return to Dashboard
      </button>
    </div>
  );
};

/* --- MODULE 2: ROLES & ESCALATION (AI ENHANCED) --- */

const RolesModule = ({ onComplete, onExit }) => {
  const [phase, setPhase] = useState('intro'); // intro, simulation, consultant
  const [consultText, setConsultText] = useState('');
  const [consultReply, setConsultReply] = useState(null);
  const [consultLoading, setConsultLoading] = useState(false);

  const handleConsult = async () => {
    if(!consultText) return;
    setConsultLoading(true);
    const prompt = `
        You are an expert Interpreter Supervisor.
        The user (an interpreter) has a complex situation: "${consultText}".

        Using the "Dealing with Stressful Situations" protocols (Conduit -> Clarifier -> Facilitator),
        advise them on the correct role and specific action.

        Keep it under 3 sentences.
    `;
    const result = await generateGeminiContent(prompt);
    setConsultReply(result);
    setConsultLoading(false);
  };

  if (phase === 'intro') {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-fadeIn">
         <div className="bg-orange-600 p-6 text-white flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold flex items-center">
              <ShieldAlert className="w-5 h-5 mr-2" /> Protocol: Escalation
            </h3>
            <p className="text-orange-100 text-sm">Managing Stressful Situations in IBT</p>
          </div>
          <button onClick={onExit} className="text-orange-100 hover:text-white"><XCircle className="w-6 h-6" /></button>
        </div>
        <div className="p-8">
          <div className="bg-orange-50 p-6 rounded-xl mb-6">
            <h4 className="font-bold text-orange-900 mb-2">The Golden Rule</h4>
            <p className="text-orange-800">
              "End the session ONLY after all efforts for effective and respectful communication fail."
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
              <button onClick={() => setPhase('simulation')} className="w-full bg-orange-600 text-white py-4 rounded-lg font-bold hover:bg-orange-700">
                Start Standard Sim
              </button>
              <button onClick={() => setPhase('consultant')} className="w-full bg-white border-2 border-orange-200 text-orange-700 py-4 rounded-lg font-bold hover:bg-orange-50 flex items-center justify-center">
                <Stethoscope className="w-5 h-5 mr-2" /> Consult an Expert (AI)
              </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'consultant') {
      return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-fadeIn p-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Role Consultant</h3>
            <p className="text-slate-600 mb-4">Describe a sticky situation you've faced. Gemini will analyze it against the Escalation Protocol.</p>

            <textarea
                value={consultText}
                onChange={(e) => setConsultText(e.target.value)}
                placeholder="e.g. The doctor kept asking me for my personal opinion on the patient's diet..."
                className="w-full p-4 border border-slate-300 rounded-lg mb-4 h-32"
            />

            <button
                onClick={handleConsult}
                disabled={consultLoading || !consultText}
                className="bg-orange-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-700 disabled:opacity-50 mb-6"
            >
                {consultLoading ? <Loader className="animate-spin" /> : "Get Advice"}
            </button>

            {consultReply && (
                <div className="bg-orange-50 p-6 rounded-xl border-l-4 border-orange-500">
                    <h4 className="font-bold text-orange-900 mb-2">Supervisor Recommendation:</h4>
                    <p className="text-slate-800">{consultReply}</p>
                </div>
            )}

            <button onClick={() => setPhase('intro')} className="mt-8 text-slate-400 hover:text-slate-600">Back to Menu</button>
        </div>
      );
  }

  // ... (Simulation Phase code - standard hardcoded logic for stability)
  return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-fadeIn">
        <div className="bg-slate-900 p-4 text-white flex justify-between items-center">
          <span className="font-mono text-green-400">● LIVE CALL</span>
          <span className="text-xs bg-slate-800 px-2 py-1 rounded">00:45</span>
        </div>
        <div className="p-8">
           <div className="mb-6 space-y-4">
             <div className="flex gap-4">
               <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold shrink-0">MD</div>
               <div className="bg-slate-50 p-4 rounded-r-xl rounded-bl-xl text-slate-700 text-sm">
                 "Please tell him he needs to take 5mg of this twice a day, but not on an empty stomach."
               </div>
             </div>
             <div className="flex gap-4 flex-row-reverse">
               <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold shrink-0">PT</div>
               <div className="bg-green-50 p-4 rounded-l-xl rounded-br-xl text-slate-700 text-sm border border-green-100">
                 (Background noise is very loud. You barely hear the patient say something about "stomach pain" but you aren't sure.)
               </div>
             </div>
           </div>

           <h4 className="font-bold text-slate-900 mb-4">What is your immediate response?</h4>

           <div className="space-y-3">
             <button onClick={() => toast.error("Incorrect. Don't guess!")} className="w-full text-left p-4 border rounded-xl hover:bg-slate-50 transition-colors">
               <span className="font-bold text-slate-800 block mb-1">Stay as Conduit</span>
               <span className="text-sm text-slate-500">Guess what the patient said based on context and interpret it.</span>
             </button>
             <button onClick={() => { toast.success("Correct!"); onComplete(100); }} className="w-full text-left p-4 border rounded-xl hover:bg-orange-50 border-orange-100 transition-colors relative overflow-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500 group-hover:bg-orange-600"></div>
               <span className="font-bold text-slate-800 block mb-1">Intervene as Clarifier</span>
               <span className="text-sm text-slate-500">"Interpreter requests clarification. The background noise made it difficult to hear the last segment."</span>
             </button>
             <button onClick={() => toast.error("Incorrect. Too drastic.")} className="w-full text-left p-4 border rounded-xl hover:bg-slate-50 transition-colors">
               <span className="font-bold text-slate-800 block mb-1">Abort Session</span>
               <span className="text-sm text-slate-500">Tell the doctor the environment is unsuitable and hang up.</span>
             </button>
           </div>
        </div>
      </div>
    );
};

/* --- MODULE 3: VICARIOUS TRAUMA --- */

const TraumaModule = ({ onComplete, onExit }) => {
  const [checkedItems, setCheckedItems] = useState({});
  const [reflectionText, setReflectionText] = useState("");
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  const symptoms = [
    { id: 's1', text: "Consistent headaches or sleepiness" },
    { id: 's2', text: "Dread prior to appointments" },
    { id: 's3', text: "Numbing out or detachment" },
    { id: 's4', text: "Intrusive thoughts/flashbacks" }
  ];

  const handleCheck = (id) => {
    setCheckedItems(prev => ({...prev, [id]: !prev[id]}));
  };

  const handleAIAnalysis = async () => {
    if (!reflectionText.trim()) return;
    setAnalyzing(true);

    const prompt = `
      You are an empathetic Supervisor for Interpreters.
      The user has shared this reflection about their stress: "${reflectionText}".

      Based on the concept of 'Vicarious Trauma' (Figley, 1995) and 'Mirror Neurons' causing emotional contagion:
      1. Identify if they are showing signs of Compassion Fatigue, Burnout, or Hyper-arousal.
      2. Validate their feelings (it's a normal response to trauma work).
      3. Suggest one specific self-care strategy (e.g., grounding, debriefing, limiting exposure).

      Keep the response short (under 60 words) and warm.
    `;

    const result = await generateGeminiContent(prompt);
    setAiAnalysis(result || "Unable to analyze at this time. Please remember to breathe and seek peer support.");
    setAnalyzing(false);
  };

  const isComplete = Object.values(checkedItems).filter(Boolean).length > 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-fadeIn">
      <div className="bg-rose-600 p-6 text-white flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold flex items-center">
            <Thermometer className="w-5 h-5 mr-2" /> Self-Care Check
          </h3>
          <p className="text-rose-100 text-sm">Identifying Vicarious Trauma & Compassion Fatigue</p>
        </div>
        <button onClick={onExit} className="text-rose-100 hover:text-white"><XCircle className="w-6 h-6" /></button>
      </div>

      <div className="p-8">
        <div className="prose prose-slate mb-8">
          <p className="text-lg text-slate-700">
            "Vicarious trauma is the natural behaviors and emotions that arise from knowing about a traumatizing event experienced by a significant other." (Figley, 1995)
          </p>
        </div>

        <div className="bg-rose-50 border border-rose-100 rounded-xl p-6 mb-8">
          <h4 className="font-bold text-rose-900 mb-4">Symptom Recognition Drill</h4>
          <p className="text-sm text-rose-800 mb-4">Select at least one symptom mentioned in the literature to confirm your understanding of warning signs:</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {symptoms.map(sym => (
              <div
                key={sym.id}
                onClick={() => handleCheck(sym.id)}
                className={`cursor-pointer p-4 rounded-lg border transition-all flex items-center ${checkedItems[sym.id] ? 'bg-white border-rose-500 ring-1 ring-rose-500' : 'bg-white/50 border-rose-200 hover:bg-white'}`}
              >
                <div className={`w-5 h-5 rounded border mr-3 flex items-center justify-center ${checkedItems[sym.id] ? 'bg-rose-500 border-rose-500' : 'border-slate-300'}`}>
                  {checkedItems[sym.id] && <CheckCircle className="w-3 h-3 text-white" />}
                </div>
                <span className={`text-sm font-medium ${checkedItems[sym.id] ? 'text-rose-900' : 'text-slate-600'}`}>{sym.text}</span>
              </div>
            ))}
          </div>

          <div className="bg-white p-4 rounded-xl border border-rose-200">
             <h4 className="font-bold text-slate-900 mb-2 flex items-center">
               <Sparkles className="w-4 h-4 text-rose-500 mr-2" />
               Reflect with AI
             </h4>
             <p className="text-xs text-slate-500 mb-3">
               Briefly describe a recent stressful session. Our AI Supervisor will screen for Vicarious Trauma indicators.
             </p>
             <textarea
               value={reflectionText}
               onChange={(e) => setReflectionText(e.target.value)}
               placeholder="e.g. I felt exhausted after interpreting for a crying mother..."
               className="w-full p-3 border border-slate-200 rounded-lg text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-rose-500"
               rows="2"
             />
             <button
               onClick={handleAIAnalysis}
               disabled={analyzing || !reflectionText}
               className="text-xs bg-rose-100 text-rose-700 font-bold py-2 px-4 rounded-lg flex items-center hover:bg-rose-200 disabled:opacity-50 transition-colors"
             >
               {analyzing ? <Loader className="w-3 h-3 animate-spin mr-2" /> : <Zap className="w-3 h-3 mr-2" />}
               Analyze Stress Factors
             </button>

             {aiAnalysis && (
               <div className="mt-4 p-3 bg-slate-50 rounded-lg border-l-4 border-rose-400 text-sm text-slate-700 italic">
                 "{aiAnalysis}"
               </div>
             )}
          </div>
        </div>

        <button
          onClick={() => isComplete ? onComplete(100) : toast.error("Please select at least one symptom to acknowledge understanding.")}
          className={`w-full py-3 rounded-lg font-bold text-white transition-colors ${isComplete ? 'bg-rose-600 hover:bg-rose-700' : 'bg-slate-300 cursor-not-allowed'}`}
        >
          Acknowledge & Complete
        </button>
      </div>
    </div>
  );
};

export default InterpreStudy;