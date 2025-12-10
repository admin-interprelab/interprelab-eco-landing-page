import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ChevronLeft, ChevronRight, Star, Layers, MessageCircle, X,
  Send, Sparkles, CheckCircle, Lock
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ModuleData {
  id: string;
  module_id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  order_index: number;
  is_active: boolean;
}

interface QuizData {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface SlideContent {
  id: string;
  type: 'intro' | 'content' | 'quiz' | 'complete';
  title: string;
  content?: string;
  bullets?: string[];
  imageUrl?: string;
}

// Module content definitions
const moduleContent: Record<string, SlideContent[]> = {
  'male-reproductive': [
    {
      id: 'male-intro',
      type: 'intro',
      title: 'Male Anatomy',
      content: 'The primary function of the male reproductive system is to produce sperm and deliver them to the female reproductive tract.',
      bullets: [
        'Testicles: Egg-shaped glands that produce sperm and testosterone.',
        'Epididymis: A coiled tube where sperm mature and are stored.',
        'Vas Deferens: The transport tube carrying sperm to the urethra.',
        'Prostate: A gland that produces fluid for semen.'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&h=400&fit=crop'
    },
    {
      id: 'male-quiz',
      type: 'quiz',
      title: 'Knowledge Check',
      content: 'Test your understanding of male reproductive anatomy and pathology.'
    },
    {
      id: 'male-complete',
      type: 'complete',
      title: 'Module Complete!',
      content: 'You have successfully mastered the basics of the Male Reproductive System.'
    }
  ],
  'female-reproductive': [
    {
      id: 'female-intro',
      type: 'intro',
      title: 'Female Anatomy',
      content: 'The female reproductive system is designed for producing eggs, facilitating fertilization, and supporting pregnancy.',
      bullets: [
        'Ovaries: Produce eggs and hormones (estrogen, progesterone).',
        'Fallopian Tubes: Transport eggs from ovaries to uterus.',
        'Uterus: The womb where fetal development occurs.',
        'Cervix: The lower portion of the uterus connecting to the vagina.'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop'
    },
    {
      id: 'female-quiz',
      type: 'quiz',
      title: 'Knowledge Check',
      content: 'Test your understanding of female reproductive anatomy.'
    },
    {
      id: 'female-complete',
      type: 'complete',
      title: 'Module Complete!',
      content: 'You have successfully mastered the basics of the Female Reproductive System.'
    }
  ],
  'obstetrics-neonatal': [
    {
      id: 'ob-intro',
      type: 'intro',
      title: 'Obstetrics & Labor',
      content: 'Understanding the stages of labor and neonatal care terminology is essential for medical interpretation.',
      bullets: [
        'Stage 1: Cervical dilation and effacement.',
        'Stage 2: Delivery of the baby.',
        'Stage 3: Delivery of the placenta.',
        'Neonatal: Refers to the first 28 days of life.'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600&h=400&fit=crop'
    },
    {
      id: 'ob-quiz',
      type: 'quiz',
      title: 'Knowledge Check',
      content: 'Test your understanding of obstetrics and neonatal terminology.'
    },
    {
      id: 'ob-complete',
      type: 'complete',
      title: 'Module Complete!',
      content: 'You have successfully completed the Obstetrics & Neonatal module.'
    }
  ]
};

const defaultQuizData: QuizData = {
  question: "A patient presents with a painful erection lasting more than 4 hours without sexual stimulation. What is the medical term for this condition?",
  options: ["Phimosis", "Priapism", "Cryptorchidism", "Varicocele"],
  correctIndex: 1,
  explanation: "Priapism is a persistent, painful erection often unrelated to sexual stimulation. It requires immediate medical attention."
};

export function InteractiveModulePlayer() {
  const [modules, setModules] = useState<ModuleData[]>([]);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [xp, setXp] = useState(0);
  const [quizData, setQuizData] = useState<QuizData>(defaultQuizData);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{role: 'user' | 'assistant'; content: string}[]>([
    { role: 'assistant', content: "Hello! I'm your AI tutor. Ask me anything about reproductive anatomy or medical terminology. ✨" }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [moduleProgress, setModuleProgress] = useState<Record<string, number>>({});
  
  const { user } = useAuth();

  // Load modules from database
  useEffect(() => {
    loadModules();
    if (user) {
      loadProgress();
    }
  }, [user]);

  const loadModules = async () => {
    const { data, error } = await supabase
      .from('study_modules')
      .select('*')
      .eq('category', 'reproductive-systems')
      .order('order_index');

    if (error) {
      console.error('Error loading modules:', error);
      // Use fallback data
      setModules([
        { id: '1', module_id: 'male-reproductive', title: 'Male Reproductive System', description: 'Anatomy, Spermatogenesis, and Pathology.', category: 'reproductive-systems', icon: 'mars', order_index: 1, is_active: true },
        { id: '2', module_id: 'female-reproductive', title: 'Female Reproductive System', description: 'Gestation, Hormonal Cycles, and Anatomy.', category: 'reproductive-systems', icon: 'venus', order_index: 2, is_active: true },
        { id: '3', module_id: 'obstetrics-neonatal', title: 'Obstetrics & Neonatal', description: 'Labor stages, Fertilization, and Care.', category: 'reproductive-systems', icon: 'baby-carriage', order_index: 3, is_active: true },
      ]);
    } else {
      setModules(data || []);
    }
  };

  const loadProgress = async () => {
    if (!user) return;
    
    const { data } = await supabase
      .from('study_progress')
      .select('module_id, progress_percent, xp_earned')
      .eq('user_id', user.id);

    if (data) {
      const progressMap: Record<string, number> = {};
      let totalXp = 0;
      data.forEach(p => {
        progressMap[p.module_id] = p.progress_percent;
        totalXp += p.xp_earned;
      });
      setModuleProgress(progressMap);
      setXp(totalXp);
    }
  };

  const saveProgress = async (moduleId: string, progressPercent: number, xpEarned: number) => {
    if (!user) return;

    const { error } = await supabase
      .from('study_progress')
      .upsert({
        user_id: user.id,
        module_id: moduleId,
        progress_percent: progressPercent,
        xp_earned: xpEarned,
        slides_completed: currentSlideIndex + 1,
        is_completed: progressPercent >= 100,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id,module_id'
      });

    if (error) {
      console.error('Error saving progress:', error);
    }
  };

  const currentSlides = selectedModule ? moduleContent[selectedModule] || [] : [];
  const currentSlide = currentSlides[currentSlideIndex];
  const progressPercent = currentSlides.length > 0 
    ? ((currentSlideIndex + 1) / currentSlides.length) * 100 
    : 0;

  const handleModuleSelect = (moduleId: string) => {
    if (moduleId !== 'male-reproductive' && moduleProgress['male-reproductive'] !== 100) {
      toast.info('Complete the Male Reproductive System module first to unlock this one.');
      return;
    }
    setSelectedModule(moduleId);
    setCurrentSlideIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setQuizData(defaultQuizData);
  };

  const handleNext = () => {
    if (currentSlideIndex < currentSlides.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else if (selectedModule) {
      // Module complete
      saveProgress(selectedModule, 100, xp);
      setModuleProgress(prev => ({ ...prev, [selectedModule]: 100 }));
    }
  };

  const handleBack = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setSelectedModule(null);
    }
  };

  const handleAnswerSelect = (index: number) => {
    if (showFeedback) return;
    
    setSelectedAnswer(index);
    setShowFeedback(true);
    
    if (index === quizData.correctIndex) {
      const earnedXp = 50;
      setXp(prev => prev + earnedXp);
      toast.success(`+${earnedXp} XP! Correct answer!`);
    }
  };

  const generateNewQuiz = async () => {
    if (!selectedModule) return;
    
    setIsGeneratingQuiz(true);
    setSelectedAnswer(null);
    setShowFeedback(false);

    try {
      const { data, error } = await supabase.functions.invoke('interactive-module-ai', {
        body: {
          action: 'generate-quiz',
          topic: selectedModule.replace('-', ' '),
          specialty: 'reproductive systems'
        }
      });

      if (error) throw error;
      
      if (data && data.question && data.options && typeof data.correctIndex === 'number') {
        setQuizData(data);
      } else {
        throw new Error('Invalid quiz data received');
      }
    } catch (error) {
      console.error('Error generating quiz:', error);
      toast.error('Failed to generate new quiz. Using default question.');
      setQuizData(defaultQuizData);
    } finally {
      setIsGeneratingQuiz(false);
    }
  };

  const sendChatMessage = async () => {
    if (!chatInput.trim() || isChatLoading) return;

    const userMessage = chatInput.trim();
    setChatInput('');
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsChatLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/interactive-module-ai`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          action: 'chat',
          specialty: 'reproductive systems',
          messages: [
            ...chatMessages.filter(m => m.role !== 'assistant' || chatMessages.indexOf(m) !== 0),
            { role: 'user', content: userMessage }
          ]
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error('Failed to get response');
      }

      // Handle streaming response
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = '';
      
      // Add placeholder for assistant message
      setChatMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ') && line !== 'data: [DONE]') {
            try {
              const parsed = JSON.parse(line.slice(6));
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                assistantMessage += content;
                setChatMessages(prev => {
                  const updated = [...prev];
                  updated[updated.length - 1] = { role: 'assistant', content: assistantMessage };
                  return updated;
                });
              }
            } catch {
              // Ignore parse errors for incomplete chunks
            }
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm having trouble connecting right now. Please try again." 
      }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Module Dashboard View
  if (!selectedModule) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Badge className="mb-2 bg-primary/10 text-primary border-primary/20">
              Interactive Learning Modules
            </Badge>
            <h2 className="text-3xl font-bold">Reproductive Systems</h2>
            <p className="text-muted-foreground mt-2">
              Select a module to begin your training on Reproductive Systems terminology.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-warning/10 rounded-full">
              <Star className="w-5 h-5 text-warning" />
              <span className="font-bold">{xp} XP</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modules.map((module, index) => {
            const isLocked = index > 0 && moduleProgress['male-reproductive'] !== 100;
            const progress = moduleProgress[module.module_id] || 0;
            
            return (
              <Card 
                key={module.id}
                className={cn(
                  "cursor-pointer transition-all duration-300 hover:shadow-lg",
                  isLocked ? "opacity-60 cursor-not-allowed" : "hover:border-primary hover:-translate-y-1"
                )}
                onClick={() => !isLocked && handleModuleSelect(module.module_id)}
              >
                <CardHeader>
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4",
                    isLocked ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary"
                  )}>
                    {isLocked ? <Lock className="w-6 h-6" /> : (
                      module.icon === 'mars' ? '♂' : 
                      module.icon === 'venus' ? '♀' : '👶'
                    )}
                  </div>
                  <CardTitle className="text-lg">{module.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{module.description}</p>
                  <Progress value={progress} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">{progress}% complete</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  // Module Slide View
  return (
    <div className="relative">
      {/* Progress Bar */}
      <Progress value={progressPercent} className="h-1 mb-4" />
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={handleBack}>
            <ChevronLeft className="w-4 h-4 mr-1" />
            {currentSlideIndex === 0 ? 'Modules' : 'Back'}
          </Button>
          <Badge variant="outline">
            <Layers className="w-3 h-3 mr-1" />
            {currentSlideIndex + 1}/{currentSlides.length}
          </Badge>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsChatOpen(true)}
            className="bg-secondary/10 border-secondary/30 hover:bg-secondary/20"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Ask Tutor ✨
          </Button>
          <div className="flex items-center gap-2 px-3 py-1 bg-warning/10 rounded-full">
            <Star className="w-4 h-4 text-warning" />
            <span className="font-bold text-sm">{xp} XP</span>
          </div>
        </div>
      </div>

      {/* Slide Content */}
      <Card className="min-h-[500px]">
        <CardContent className="p-8">
          {currentSlide?.type === 'intro' && (
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <Badge className="mb-4">MODULE {modules.findIndex(m => m.module_id === selectedModule) + 1}</Badge>
                <h2 className="text-3xl font-bold mb-4">{currentSlide.title}</h2>
                <p className="text-muted-foreground mb-6">{currentSlide.content}</p>
                
                <div className="bg-primary/5 p-6 rounded-xl border border-primary/20">
                  {currentSlide.bullets?.map((bullet, i) => (
                    <div key={i} className="flex items-start gap-3 mb-4 last:mb-0">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-sm">{bullet}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl overflow-hidden border">
                {currentSlide.imageUrl && (
                  <img 
                    src={currentSlide.imageUrl} 
                    alt={currentSlide.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
          )}

          {currentSlide?.type === 'quiz' && (
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Badge variant="outline">Knowledge Check</Badge>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={generateNewQuiz}
                    disabled={isGeneratingQuiz}
                    className="bg-secondary/20 hover:bg-secondary/30"
                  >
                    <Sparkles className="w-3 h-3 mr-1" />
                    {isGeneratingQuiz ? 'Generating...' : 'New Scenario ✨'}
                  </Button>
                </div>
                <h2 className="text-2xl font-bold mb-2">Diagnose the Patient</h2>
                <p className="text-muted-foreground">{quizData.question}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {quizData.options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={cn(
                      "h-auto p-4 text-left justify-start whitespace-normal",
                      showFeedback && index === quizData.correctIndex && "border-success bg-success/10 text-success",
                      showFeedback && selectedAnswer === index && index !== quizData.correctIndex && "border-destructive bg-destructive/10"
                    )}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showFeedback}
                  >
                    <span className="font-bold mr-2">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </Button>
                ))}
              </div>

              {showFeedback && (
                <div className={cn(
                  "mt-6 p-4 rounded-lg border-l-4",
                  selectedAnswer === quizData.correctIndex 
                    ? "bg-success/10 border-success" 
                    : "bg-destructive/10 border-destructive"
                )}>
                  <p className="font-semibold mb-1">
                    {selectedAnswer === quizData.correctIndex ? '✓ Correct!' : '✗ Incorrect'}
                  </p>
                  <p className="text-sm text-muted-foreground">{quizData.explanation}</p>
                </div>
              )}
            </div>
          )}

          {currentSlide?.type === 'complete' && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-bold mb-4">{currentSlide.title}</h2>
              <p className="text-muted-foreground mb-8">{currentSlide.content}</p>
              
              <div className="flex justify-center gap-12">
                <div className="text-center">
                  <div className="text-4xl font-bold">100%</div>
                  <div className="text-sm text-muted-foreground">Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">+{xp}</div>
                  <div className="text-sm text-muted-foreground">XP Earned</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Footer */}
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={handleBack}>
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back
        </Button>
        <Button onClick={handleNext} disabled={currentSlide?.type === 'quiz' && !showFeedback}>
          {currentSlideIndex === currentSlides.length - 1 ? 'Finish' : 'Next'}
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

      {/* Chat Widget */}
      {isChatOpen && (
        <div className="fixed bottom-20 right-6 w-96 h-[500px] bg-card border rounded-2xl shadow-2xl flex flex-col z-50 animate-fade-in">
          <div className="bg-gradient-to-r from-secondary to-primary text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <span className="font-semibold">AI Medical Tutor</span>
            </div>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={() => setIsChatOpen(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-muted/30">
            {chatMessages.map((msg, i) => (
              <div 
                key={i} 
                className={cn(
                  "max-w-[85%] p-3 rounded-xl text-sm",
                  msg.role === 'user' 
                    ? "ml-auto bg-primary text-primary-foreground rounded-br-sm" 
                    : "bg-card border rounded-bl-sm"
                )}
              >
                {msg.content}
              </div>
            ))}
            {isChatLoading && (
              <div className="bg-card border p-3 rounded-xl rounded-bl-sm max-w-[85%] text-sm">
                <span className="animate-pulse">Typing...</span>
              </div>
            )}
          </div>
          
          <div className="p-3 border-t flex gap-2">
            <input
              type="text"
              className="flex-1 px-4 py-2 rounded-full border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Ask a question..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendChatMessage()}
            />
            <Button size="icon" className="rounded-full" onClick={sendChatMessage} disabled={isChatLoading}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
