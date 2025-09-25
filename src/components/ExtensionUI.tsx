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
  ArrowRight
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

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 w-[400px] z-50">
      <div className="extension-window">
        <Card className="bg-card/95 border-border/50">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-lg">🤖</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">InterpreBot</h3>
                    <p className="text-xs text-muted-foreground">AI Language Assessment</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-6 h-6"
                  onClick={() => setIsVisible(false)}
                >
                  <Square className="w-3 h-3" />
                </Button>
              </div>

              {!showAssessment ? (
                <>
                  <div className="text-center space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Welcome to InterpreLab! I'm your AI assessment assistant.
                    </p>
                    <p className="text-sm font-medium">
                      Would you like to take a language assessment to see where you stand across various skill sets?
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Button 
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                      onClick={() => setShowAssessment(true)}
                    >
                      Start Assessment
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => setIsVisible(false)}>
                      Maybe Later
                    </Button>
                  </div>
                </>
              ) : (
                <div className="space-y-3">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-sm font-medium">Assessment in Progress...</p>
                    <p className="text-xs text-muted-foreground">Analyzing your interpretation skills</p>
                  </div>
                  
                  <div className="space-y-2">
                    {['Voice Control', 'Grammar & Syntax', 'Vocabulary', 'Ethics'].map((skill, i) => (
                      <div key={skill} className="flex justify-between items-center text-xs">
                        <span>{skill}</span>
                        <Badge variant="outline">{85 + i * 3}%</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
    <div className="fixed bottom-6 right-6 w-[480px] max-h-[600px] z-50">
      <div className="extension-window">
        <Card className="h-full bg-card/95 border-border/50">
          <CardContent className="p-0 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border/50">
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