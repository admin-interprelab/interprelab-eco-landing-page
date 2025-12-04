import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Book, 
  RotateCcw, 
  Check, 
  Trophy, 
  Heart, 
  Activity, 
  User, 
  Brain, 
  Eye, 
  Ear, 
  Smile, 
  Accessibility, 
  Sparkles,
  Layout,
  Loader2
} from 'lucide-react';
import { callGemini } from '@/lib/gemini';
import { toast } from 'sonner';

// --- DATA ---
const INITIAL_VOCABULARY_DATA = [
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

// --- HELPER COMPONENT FOR ICONS ---
const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
  const icons: Record<string, React.ElementType | (() => JSX.Element)> = {
    Activity: Activity, Heart: Heart, User: User, Brain: Brain, Eye: Eye, Ear: Ear, Smile: Smile, Accessibility: Accessibility, Zap: Sparkles, 
    Circle: () => <div className="w-8 h-8 rounded-full border-2 border-current" />, 
    Droplet: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>
  };
  const IconComponent = icons[name] || Activity;
  return <IconComponent className={className} />;
};

// --- SUB-COMPONENTS ---

const SmartFlashcards = () => {
  const [deck, setDeck] = useState(INITIAL_VOCABULARY_DATA);
  const [currentCard, setCurrentCard] = useState(INITIAL_VOCABULARY_DATA[0]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [finished, setFinished] = useState(false);
  const [masteryCount, setMasteryCount] = useState(0);
  const [loadingAI, setLoadingAI] = useState(false);

  const handleKnowIt = () => {
    setIsFlipped(false);
    setMasteryCount(prev => prev + 1);
    const newDeck = deck.filter(c => c.id !== currentCard.id);
    if (newDeck.length === 0) {
      setFinished(true);
    } else {
      setDeck(newDeck);
      setCurrentCard(newDeck[0]);
    }
  };

  const handleNeedPractice = () => {
    setIsFlipped(false);
    const newDeck = deck.filter(c => c.id !== currentCard.id);
    newDeck.push(currentCard); 
    setDeck(newDeck);
    setCurrentCard(newDeck[0]);
  };

  const generateNewCards = async () => {
    setLoadingAI(true);
    try {
      const prompt = `
        Generate 5 new medical terminology flashcards (Root, ES meaning, EN meaning, example ES, example EN).
        Return JSON array: [{ "root": "...", "es_meaning": "...", "en_meaning": "...", "example_es": "...", "example_en": "...", "icon": "Activity" }].
        Focus on uncommon terms.
      `;
      const res = await callGemini(prompt);
      const cleanJson = res.replace(/```json/g, '').replace(/```/g, '').trim();
      const newCards = (JSON.parse(cleanJson) as typeof INITIAL_VOCABULARY_DATA).map((c, i) => ({ ...c, id: Date.now() + i }));
      
      setDeck([...deck, ...newCards]);
      toast.success("5 new cards added!");
      if (finished) {
        setFinished(false);
        setCurrentCard(newCards[0]);
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to generate cards");
    } finally {
      setLoadingAI(false);
    }
  };

  if (finished) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center animate-fade-in">
        <div className="p-6 bg-green-100 rounded-full mb-6">
          <Trophy className="w-16 h-16 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Review Complete!</h2>
        <p className="text-slate-500 mb-8">You have mastered {masteryCount} terms in this session.</p>
        <div className="flex gap-4">
          <Button 
            onClick={() => { setDeck(INITIAL_VOCABULARY_DATA); setFinished(false); setCurrentCard(INITIAL_VOCABULARY_DATA[0]); setMasteryCount(0); }}
            size="lg"
          >
            Restart Session
          </Button>
          <Button onClick={generateNewCards} variant="outline" size="lg" disabled={loadingAI}>
            {loadingAI ? <Loader2 className="animate-spin mr-2"/> : <Sparkles className="mr-2"/>}
            Generate More
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full max-w-xl mx-auto py-8">
      <div className="w-full flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <span className="flex h-3 w-3 bg-green-500 rounded-full"></span>
          <span className="text-sm font-bold text-slate-600">Cards Remaining: {deck.length}</span>
        </div>
        <Button variant="ghost" size="sm" onClick={generateNewCards} disabled={loadingAI} className="text-indigo-600">
          {loadingAI ? <Loader2 className="w-4 h-4 animate-spin"/> : <Sparkles className="w-4 h-4 mr-2"/>}
          Add AI Cards
        </Button>
      </div>

      {/* Card */}
      <div 
        className="w-full h-96 perspective-1000 cursor-pointer group relative mb-8"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`relative w-full h-full transition-all duration-500 transform style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          
          {/* Front */}
          <Card className="absolute w-full h-full backface-hidden hover:shadow-2xl transition-shadow flex flex-col items-center justify-center p-8">
            <div className="p-6 bg-indigo-50 rounded-full mb-6">
              <DynamicIcon name={currentCard.icon} className="w-16 h-16 text-indigo-600" />
            </div>
            <span className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">Medical Root</span>
            <h3 className="text-5xl font-black text-slate-800 text-center">{currentCard.root}</h3>
            <p className="text-slate-400 text-sm mt-8 animate-pulse">Click to Reveal</p>
          </Card>

          {/* Back */}
          <Card className="absolute w-full h-full bg-slate-900 text-white rotate-y-180 backface-hidden flex flex-col items-center justify-center p-8">
            <div className="grid grid-cols-1 gap-6 text-center w-full">
              <div className="p-4 bg-white/10 rounded-xl">
                <p className="text-xs uppercase text-indigo-300 font-bold mb-1">Español</p>
                <p className="text-3xl font-bold">{currentCard.es_meaning}</p>
                <p className="text-sm text-slate-400 italic mt-1">{currentCard.example_es}</p>
              </div>
              <div className="p-4 bg-white/10 rounded-xl">
                <p className="text-xs uppercase text-green-300 font-bold mb-1">English</p>
                <p className="text-3xl font-bold">{currentCard.en_meaning}</p>
                <p className="text-sm text-slate-400 italic mt-1">{currentCard.example_en}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full">
        <Button 
          variant="outline"
          size="lg"
          onClick={(e) => { e.stopPropagation(); handleNeedPractice(); }}
          className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 h-auto py-4 flex flex-col gap-1"
        >
          <RotateCcw className="w-5 h-5" />
          Need Practice
        </Button>
        <Button 
          variant="outline"
          size="lg"
          onClick={(e) => { e.stopPropagation(); handleKnowIt(); }}
          className="border-green-200 text-green-600 hover:bg-green-50 hover:text-green-700 h-auto py-4 flex flex-col gap-1"
        >
          <Check className="w-5 h-5" />
          I Knew It
        </Button>
      </div>
      
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .style-preserve-3d { transform-style: preserve-3d; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .backface-hidden { backface-visibility: hidden; }
      `}</style>
    </div>
  );
};

const BodyMapper = () => {
  const [placedItems, setPlacedItems] = useState<Record<string, boolean>>({});
  const [selectedTerm, setSelectedTerm] = useState<typeof BODY_PARTS_GAME[0] | null>(null);
  const [completed, setCompleted] = useState(false);

  const handleTermClick = (term: typeof BODY_PARTS_GAME[0]) => {
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
      toast.success("Correct!");
    } else {
      setSelectedTerm(null);
      toast.error("Try again!");
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-8 h-[600px] py-4">
      {/* Sidebar Terms */}
      <Card className="w-full md:w-1/3 flex flex-col">
        <CardContent className="p-6 overflow-y-auto flex-1">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Layout className="w-5 h-5 text-primary" /> Vocabulary Bank
          </h3>
          <div className="space-y-2">
            {BODY_PARTS_GAME.map(item => (
              <button
                key={item.id}
                onClick={() => handleTermClick(item)}
                disabled={placedItems[item.id] || false}
                className={`w-full p-3 text-left rounded-xl font-medium transition-all border-2
                  ${placedItems[item.id] 
                    ? 'bg-green-50 border-green-200 text-green-700 line-through opacity-50' 
                    : selectedTerm?.id === item.id 
                      ? 'bg-indigo-50 border-primary text-primary shadow-md transform scale-105' 
                      : 'bg-slate-50 border-transparent text-slate-600 hover:bg-white hover:border-indigo-200'}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Stage */}
      <div className="flex-1 bg-slate-100 rounded-3xl border-2 border-dashed border-slate-300 relative flex items-center justify-center p-8 overflow-hidden">
        {completed && (
          <div className="absolute inset-0 z-50 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-3xl animate-fade-in">
            <Trophy className="w-24 h-24 text-yellow-500 mb-4" />
            <h2 className="text-4xl font-black text-slate-800">Anatomy Mastered!</h2>
            <Button onClick={() => {setPlacedItems({}); setCompleted(false);}} className="mt-6" size="lg">Reset Map</Button>
          </div>
        )}

        <div className="relative w-full max-w-[300px] h-full">
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
            <path d="M50,0 C45,0 40,5 40,10 C40,15 45,18 50,18 C55,18 60,15 60,10 C60,5 55,0 50,0 Z" fill="#94a3b8" />
            <path d="M42,19 C35,20 25,25 20,35 L15,60 L25,60 L28,40 L40,40 L40,60 L35,90 L45,90 L48,65 L52,65 L55,90 L65,90 L60,60 L60,40 L72,40 L75,60 L85,60 L80,35 C75,25 65,20 58,19 Z" fill="#cbd5e1" />
          </svg>

          {BODY_PARTS_GAME.map(part => (
            <div
              key={part.id}
              onClick={() => handleTargetClick(part.id)}
              className={`absolute w-6 h-6 -ml-3 -mt-3 rounded-full border-2 cursor-pointer transition-all duration-300 flex items-center justify-center z-10
                ${placedItems[part.id] 
                  ? 'bg-green-500 border-white scale-100' 
                  : selectedTerm 
                    ? 'bg-white border-primary animate-ping' 
                    : 'bg-slate-300 border-white hover:bg-primary/50'}`}
              style={{ left: `${part.x}%`, top: `${part.y}%` }}
            >
              {placedItems[part.id] && <Check className="w-3 h-3 text-white" />}
            </div>
          ))}

          {Object.keys(placedItems).map(key => {
            const part = BODY_PARTS_GAME.find(p => p.id === key);
            if (!part) return null;
            return (
              <div 
                key={key}
                className="absolute bg-white px-3 py-1 rounded-lg shadow-lg text-xs font-bold text-indigo-800 border border-indigo-100 whitespace-nowrap animate-fade-in z-20"
                style={{ 
                  left: `${part.x > 50 ? part.x + 5 : part.x - 5}%`, 
                  top: `${part.y}%`,
                  transform: `translate(${part.x > 50 ? '0' : '-100%'}, -50%)`
                }}
              >
                {part.label}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// --- MAIN WRAPPER ---
export const TerminologyTrainer = () => {
  return (
    <div className="w-full">
      <Tabs defaultValue="flashcards" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="bg-slate-100 p-1 rounded-xl">
            <TabsTrigger value="flashcards" className="px-6 gap-2">
              <Book className="w-4 h-4" /> Smart Deck
            </TabsTrigger>
            <TabsTrigger value="body" className="px-6 gap-2">
              <Accessibility className="w-4 h-4" /> Body Mapper
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="flashcards">
          <SmartFlashcards />
        </TabsContent>
        <TabsContent value="body">
          <BodyMapper />
        </TabsContent>
      </Tabs>
    </div>
  );
};
