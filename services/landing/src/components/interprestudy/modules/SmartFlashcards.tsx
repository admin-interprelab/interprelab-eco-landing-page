import React, { useState } from 'react';
import { Book, Check, RotateCcw, ChevronRight, X, Trophy, Sparkles, Loader2, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

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

export const SmartFlashcards = () => {
  const [deck, setDeck] = useState(INITIAL_VOCABULARY_DATA);
  const [currentCard, setCurrentCard] = useState(INITIAL_VOCABULARY_DATA[0]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [finished, setFinished] = useState(false);
  const [masteryCount, setMasteryCount] = useState(0);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  const handleKnowIt = () => {
    setIsFlipped(false);
    setAiInsight(null);
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
    setAiInsight(null);
    const newDeck = deck.filter(c => c.id !== currentCard.id);
    newDeck.push(currentCard);
    setDeck(newDeck);
    setCurrentCard(newDeck[0]);
  };

  const fetchAIInsight = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setLoadingAi(true);
    const prompt = `
      For the medical root "${currentCard.root}" (meaning: ${currentCard.en_meaning}):
      1. Provide a 1-sentence etymology (origin).
      2. Create a short, funny or memorable mnemonic to help remember it.
      Keep it concise.
    `;
    const result = await callGemini(prompt);
    setAiInsight(result);
    setLoadingAi(false);
  };

  if (finished) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center animate-fade-in">
        <div className="p-6 bg-green-100 rounded-full mb-6">
          <Trophy className="w-16 h-16 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Review Complete!</h2>
        <p className="text-slate-500 mb-8">You have mastered {masteryCount} terms in this session.</p>
        <Button
          onClick={() => { setDeck(INITIAL_VOCABULARY_DATA); setFinished(false); setCurrentCard(INITIAL_VOCABULARY_DATA[0]); setMasteryCount(0); }}
          className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg hover:bg-indigo-700 transition-all"
        >
          Start New Session
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full max-w-xl mx-auto p-4">
      <div className="w-full flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <span className="flex h-3 w-3 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]"></span>
          <span className="text-sm font-bold text-slate-600">Cards Remaining: {deck.length}</span>
        </div>
        <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">Spaced Repetition Active</span>
      </div>

      {/* Card */}
      <div
        className="w-full h-96 perspective-1000 cursor-pointer group relative mb-8"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={cn("relative w-full h-full transition-all duration-500 transform style-preserve-3d", isFlipped ? 'rotate-y-180' : '')}>

          {/* Front */}
          <Card className="absolute w-full h-full bg-white rounded-[2rem] shadow-xl border border-slate-100 flex flex-col items-center justify-center p-8 backface-hidden hover:shadow-2xl transition-shadow overflow-hidden">
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#4F46E5_1px,transparent_1px)] [background-size:20px_20px]"></div>

            <div className="p-6 bg-indigo-50 rounded-3xl mb-6 shadow-inner relative z-10">
               <Book className="w-16 h-16 text-indigo-600" />
            </div>
            <span className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2 relative z-10">Medical Root</span>
            <h3 className="text-5xl font-black text-slate-800 relative z-10">{currentCard.root}</h3>
            <p className="text-indigo-400 text-sm mt-8 font-medium flex items-center gap-2 relative z-10">
               Tap to Reveal <ChevronRight className="w-4 h-4" />
            </p>
          </Card>

          {/* Back */}
          <Card className="absolute w-full h-full bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-[2rem] shadow-xl border border-slate-800 flex flex-col items-center justify-center p-8 rotate-y-180 backface-hidden text-white">

            {aiInsight ? (
              <div className="relative z-10 w-full h-full flex flex-col text-left animate-fade-in">
                <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                   <span className="text-yellow-300 font-bold flex items-center gap-2 text-sm"><Sparkles className="w-4 h-4"/> AI Insights</span>
                   <button onClick={(e) => {e.stopPropagation(); setAiInsight(null);}}><X className="w-4 h-4 text-slate-400 hover:text-white"/></button>
                </div>
                <div className="prose prose-invert prose-sm text-slate-300 leading-relaxed whitespace-pre-wrap overflow-y-auto">
                  {aiInsight}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 text-center w-full relative z-10">
                <div className="p-5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <p className="text-xs uppercase text-indigo-300 font-bold mb-2 tracking-wider">Español</p>
                  <p className="text-3xl font-bold text-white">{currentCard.es_meaning}</p>
                  <p className="text-sm text-slate-400 italic mt-2">Ej: {currentCard.example_es}</p>
                </div>
                <div className="p-5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm relative">
                  <p className="text-xs uppercase text-emerald-300 font-bold mb-2 tracking-wider">English</p>
                  <p className="text-3xl font-bold text-white">{currentCard.en_meaning}</p>
                  <p className="text-sm text-slate-400 italic mt-2">Ex: {currentCard.example_en}</p>

                  <button
                    onClick={fetchAIInsight}
                    className="absolute -bottom-12 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-xs font-bold text-yellow-300 flex items-center gap-2 transition-all border border-white/10"
                  >
                    {loadingAi ? <Loader2 className="w-3 h-3 animate-spin"/> : <Sparkles className="w-3 h-3"/>}
                    Magic Mnemonic
                  </button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Spaced Repetition Actions */}
      <div className="grid grid-cols-2 gap-4 w-full">
        <Button
          onClick={(e) => { e.stopPropagation(); handleNeedPractice(); }}
          variant="outline"
          className="py-6 rounded-2xl border-2 border-red-100 bg-white text-red-600 font-bold hover:bg-red-50 hover:border-red-200 transition-all flex flex-col items-center justify-center gap-1 shadow-sm h-auto"
        >
          <RotateCcw className="w-5 h-5" />
          Need Practice
        </Button>
        <Button
          onClick={(e) => { e.stopPropagation(); handleKnowIt(); }}
          variant="outline"
          className="py-6 rounded-2xl border-2 border-green-100 bg-white text-green-600 font-bold hover:bg-green-50 hover:border-green-200 transition-all flex flex-col items-center justify-center gap-1 shadow-sm h-auto"
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
