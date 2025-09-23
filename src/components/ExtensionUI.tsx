import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Mic, 
  Square, 
  Volume2, 
  VolumeX, 
  Minimize2, 
  Settings,
  Languages,
  Stethoscope,
  Globe,
  BarChart3,
  ArrowRight,
  Brain,
  Sparkles,
  Send,
  X
} from "lucide-react";

// Updated interface to include extended agent types
interface ContextWindow {
  id: string;
  title: string;
  content: string;
  type: 'translation' | 'medical' | 'cultural' | 'analysis';
  confidence: number;
  timestamp: Date;
}

export const InterpreBotUI = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showAssessment, setShowAssessment] = useState(false);
  const [message, setMessage] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);

  if (!isVisible && !isMinimized) return null;

  // Minimized state - just show the icon
  if (isMinimized) {
    return (
      <div className="fixed bottom-6 left-6 z-50">
        <button 
          onClick={() => setIsMinimized(false)}
          className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform glow animate-pulse-glow"
        >
          <div className="relative">
            <Brain className="w-6 h-6 text-white" />
            <Sparkles className="w-3 h-3 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 left-6 w-[420px] max-h-[600px] z-50">
      <div className="extension-window">
        <Card className="bg-card/95 border-border/50 backdrop-blur-lg">
          <CardContent className="p-0 flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse-glow">
                  <Brain className="w-5 h-5 text-white" />
                  <Sparkles className="w-3 h-3 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-semibold">InterpreBot 🧠✨</h3>
                  <p className="text-xs text-muted-foreground">Multimodal AI Training & Assessment Agent</p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-6 h-6"
                  onClick={() => setIsMinimized(true)}
                >
                  <Minimize2 className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-6 h-6"
                  onClick={() => setIsVisible(false)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              {!showAssessment ? (
                <>
                  <div className="text-center space-y-3">
                    <div className="relative mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Brain className="w-8 h-8 text-white animate-pulse" />
                      <Sparkles className="w-4 h-4 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      🧠✨ Welcome to InterpreLab! I'm your Advanced AI Training & Comprehensive Linguistic Assessment Agent.
                    </p>
                    <p className="text-sm font-medium">
                      Ready for realistic scenario simulation and deep performance analysis across 6 core competencies?
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 bg-primary/10 rounded">
                      <div className="font-medium">🎯 Linguistic Accuracy</div>
                      <div className="text-muted-foreground">Precision analysis</div>
                    </div>
                    <div className="p-2 bg-success/10 rounded">
                      <div className="font-medium">🏥 Medical Terminology</div>
                      <div className="text-muted-foreground">Complex vocabulary</div>
                    </div>
                    <div className="p-2 bg-warning/10 rounded">
                      <div className="font-medium">📝 Grammar Check</div>
                      <div className="text-muted-foreground">Tense & syntax</div>
                    </div>
                    <div className="p-2 bg-secondary/10 rounded">
                      <div className="font-medium">🌊 Flow & Context</div>
                      <div className="text-muted-foreground">Natural delivery</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button 
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 transition-transform"
                      onClick={() => setShowAssessment(true)}
                    >
                      🚀 Start Advanced Assessment
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => setIsMinimized(true)}>
                      Minimize to Dock
                    </Button>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="relative w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse">
                      <BarChart3 className="w-6 h-6 text-white" />
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-ping opacity-20"></div>
                    </div>
                    <p className="text-sm font-medium">🔬 Deep Analysis in Progress...</p>
                    <p className="text-xs text-muted-foreground">Evaluating core competencies & generating personalized insights</p>
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      { skill: 'Linguistic Accuracy', score: 92, icon: '🎯' },
                      { skill: 'Terminology Mastery', score: 88, icon: '🏥' },
                      { skill: 'Grammatical Correctness', score: 91, icon: '📝' },
                      { skill: 'Fluency & Flow', score: 94, icon: '🌊' },
                      { skill: 'Contextual Appropriateness', score: 89, icon: '🎭' },
                      { skill: 'Cultural Sensitivity', score: 93, icon: '🌍' }
                    ].map((skill, i) => (
                      <div key={skill.skill} className="space-y-1">
                        <div className="flex justify-between items-center text-xs">
                          <span className="flex items-center gap-1">
                            {skill.icon} {skill.skill}
                          </span>
                          <Badge variant="outline" className="text-xs">{skill.score}%</Badge>
                        </div>
                        <div className="w-full bg-muted/30 rounded-full h-1">
                          <div 
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-1 rounded-full transition-all duration-1000"
                            style={{ width: `${skill.score}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-primary/10 rounded border border-primary/20">
                    <div className="text-xs font-medium text-primary mb-1">🤖 AI Mentor Recommendation:</div>
                    <div className="text-xs text-muted-foreground">Focus on medical terminology precision and cultural context awareness for optimal performance.</div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="border-t border-border/50 p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask me about your assessment or training needs..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 px-3 py-2 text-sm bg-muted/30 border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      setMessage("");
                    }
                  }}
                />
                <Button size="sm" variant="default" className="bg-gradient-to-r from-purple-500 to-pink-500">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <div className="text-xs text-muted-foreground mt-2 text-center">
                💡 Try: "Analyze my weak areas" or "Create learning path"
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export const ExtensionUI = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [contextWindows, setContextWindows] = useState<ContextWindow[]>([]);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Mock context windows data representing multi-agent system processing
  const mockContextWindows: ContextWindow[] = [
    {
      id: '1',
      title: 'Speech-to-Text Agent',
      content: 'Processed audio: "The patient presents with chest pain and shortness of breath..." (PII removed)',
      type: 'translation',
      confidence: 98,
      timestamp: new Date()
    },
    {
      id: '2', 
      title: 'Medical Terminology Agent',
      content: 'Detected: chest pain (dolor torácico), shortness of breath (disnea), cardiovascular assessment needed',
      type: 'medical',
      confidence: 96,
      timestamp: new Date(Date.now() - 15000)
    },
    {
      id: '3',
      title: 'Cultural Context Agent', 
      content: 'Patient communication style: Direct. Cultural background: Latin American. Adaptation recommended.',
      type: 'cultural',
      confidence: 92,
      timestamp: new Date(Date.now() - 30000)
    },
    {
      id: '4',
      title: 'Ethics & QA Agent',
      content: 'Interpretation accuracy: 95%. Completeness: 98%. Reminder: Maintain first-person speech patterns.',
      type: 'analysis',
      confidence: 94,
      timestamp: new Date(Date.now() - 45000)
    },
    {
      id: '5',
      title: 'Live Assistance LLM',
      content: 'Suggested phrase: "El paciente presenta dolor en el pecho y dificultad para respirar"',
      type: 'translation',
      confidence: 97,
      timestamp: new Date(Date.now() - 60000)
    },
    {
      id: '6',
      title: 'Session Analytics',
      content: 'Session duration: 12:34. Words interpreted: 1,247. Medical terms: 23. Overall performance: Excellent',
      type: 'analysis',
      confidence: 91,
      timestamp: new Date(Date.now() - 75000)
    }
  ];

  useEffect(() => {
    // Initialize with mock data
    setContextWindows(mockContextWindows);

    // Simulate real-time updates when recording
    const interval = setInterval(() => {
      if (isRecording && Math.random() > 0.7) {
        const updates = [
          'New medical term detected: "hypertension" -> "hipertensión"',
          'Cultural note: Patient may minimize symptoms due to cultural background',
          'QA Alert: Consider slowing pace for complex medical terms',
          'Live suggestion: "El médico va a revisar su presión arterial"',
          'Analytics: Session quality improving, confidence up 3%'
        ];
        
        const randomUpdate = updates[Math.floor(Math.random() * updates.length)];
        const types: Array<'translation' | 'medical' | 'cultural' | 'analysis'> = ['translation', 'medical', 'cultural', 'analysis'];
        
        setContextWindows(prev => {
          const newWindow: ContextWindow = {
            id: Date.now().toString(),
            title: 'Real-time Update',
            content: randomUpdate,
            type: types[Math.floor(Math.random() * types.length)],
            confidence: 85 + Math.random() * 15,
            timestamp: new Date()
          };
          return [newWindow, ...prev.slice(0, 5)];
        });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isRecording]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'translation': return <Languages className="w-3 h-3" />;
      case 'medical': return <Stethoscope className="w-3 h-3" />;
      case 'cultural': return <Globe className="w-3 h-3" />;
      case 'analysis': return <BarChart3 className="w-3 h-3" />;
      default: return <Languages className="w-3 h-3" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'translation': return 'bg-primary/20';
      case 'medical': return 'bg-success/20';
      case 'cultural': return 'bg-warning/20';
      case 'analysis': return 'bg-secondary/20';
      default: return 'bg-muted/20';
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => setIsMinimized(false)}
          className="w-14 h-14 rounded-full glow animate-pulse-glow bg-card/95 backdrop-blur-sm"
        >
          <Languages className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  return (
    <div 
      className="fixed w-[480px] max-h-[600px] z-50 resize" 
      style={{ 
        left: `${position.x || window.innerWidth - 500}px`, 
        top: `${position.y || 100}px`,
        cursor: isDragging ? 'grabbing' : 'default'
      }}
    >
      <div className="extension-window">
        <Card className="h-full bg-card/95 border-border/50 backdrop-blur-lg">
          <CardContent className="p-0 h-full flex flex-col">
            {/* Header - Draggable */}
            <div 
              className="flex items-center justify-between p-4 border-b border-border/50 cursor-grab active:cursor-grabbing" 
              onMouseDown={handleMouseDown}
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
                <div>
                  <h3 className="font-semibold text-sm">InterpreCoach Multi-Agent System</h3>
                  <p className="text-xs text-muted-foreground">Real-time AI Processing Pipeline</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  6 Agents Active
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-6 h-6"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-6 h-6"
                  onClick={() => setIsMinimized(true)}
                >
                  <Minimize2 className="w-3 h-3" />
                </Button>
                <Button variant="ghost" size="icon" className="w-6 h-6">
                  <Settings className="w-3 h-3" />
                </Button>
              </div>
            </div>

            {/* Control Bar */}
            <div className="flex items-center justify-between p-4 border-b border-border/50">
              <div className="flex items-center gap-3">
                <Button
                  variant={isRecording ? "destructive" : "default"}
                  size="sm"
                  onClick={() => setIsRecording(!isRecording)}
                  className="flex items-center gap-2"
                >
                  {isRecording ? (
                    <>
                      <Square className="w-3 h-3" />
                      Stop Processing
                    </>
                  ) : (
                    <>
                      <Mic className="w-3 h-3" />
                      Start Processing
                    </>
                  )}
                </Button>
                
                <Badge variant="outline" className="text-xs">
                  EN → ES Medical
                </Badge>
                
                <Badge className="bg-success text-success-foreground text-xs">
                  WebSocket Active
                </Badge>
              </div>
            </div>

            {/* Content Area - Multi-Agent Context Windows */}
            <div className="flex-1 overflow-auto p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {contextWindows.map((window) => (
                  <Card key={window.id} className="bg-muted/30 border-border/50 hover:bg-muted/40 transition-colors">
                    <CardContent className="p-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className={`p-1.5 rounded ${getTypeColor(window.type)}`}>
                            {getTypeIcon(window.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-medium truncate">{window.title}</h4>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>{window.confidence}%</span>
                              <span>{window.timestamp.toLocaleTimeString()}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                          {window.content}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {isRecording && (
                <div className="flex items-center gap-2 p-3 bg-success/10 rounded-lg border border-success/20 mt-4">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  <span className="text-sm text-success-foreground">
                    Multi-agent system processing audio stream...
                  </span>
                </div>
              )}
              
              {/* Data Flow Visualization */}
              <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
                <div className="text-xs text-primary-foreground mb-2 font-medium">Data Flow Pipeline:</div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2 py-1 bg-primary/20 rounded">Audio</span>
                  <ArrowRight className="w-3 h-3" />
                  <span className="px-2 py-1 bg-success/20 rounded">STT</span>
                  <ArrowRight className="w-3 h-3" />
                  <span className="px-2 py-1 bg-warning/20 rounded">PII Remove</span>
                  <ArrowRight className="w-3 h-3" />
                  <span className="px-2 py-1 bg-accent/20 rounded">LLM</span>
                  <ArrowRight className="w-3 h-3" />
                  <span className="px-2 py-1 bg-secondary/20 rounded">UI</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};