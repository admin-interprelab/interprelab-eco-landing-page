import { useState, useEffect } from "react";
import * as React from "react";
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

export const ExtensionUI = () => {
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
          className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-sm hover:scale-105 transition-transform glow animate-pulse-glow"
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
              <div className="flex items-center gap-2">
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
                <Badge variant="outline" className="text-xs">EN → ES Medical</Badge>
                <Badge className="bg-success text-success-foreground text-xs">WebSocket Active</Badge>
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
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{window.content}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {isRecording && (
                <div className="flex items-center gap-2 p-3 bg-success/10 rounded-lg border border-success/20 mt-4">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  <span className="text-sm text-success-foreground">Multi-agent system processing audio stream...</span>
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
