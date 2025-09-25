import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Chrome, 
  Download, 
  Server, 
  Calendar, 
  ArrowRight,
  Cloud,
  Cpu,
  BarChart3,
  GraduationCap,
  Bot,
  BookOpen,
  TrendingUp,
  Database,
  Shield,
  Brain,
  Sparkles,
  Zap,
  Eye,
  Waves
} from "lucide-react";
import { Link } from "react-router-dom";

export const ProductShowcase = () => {
  return (
    <section id="products" className="py-20 px-6 relative">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/src/assets/tech-background.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/95" />
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <Badge className="bg-gradient-primary border-0 text-white px-4 py-2 mb-4">
            Complete AI Ecosystem
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Three Integrated Solutions, One Ecosystem
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From personalized training and real-time assistance to comprehensive analytics, 
            InterpreLab delivers the complete AI-powered interpretation ecosystem for medical and legal professionals.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* InterpreLab Platform - Training & Certification Hub */}
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm hover-lift group">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-primary rounded-lg">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">InterpreLab Platform</h3>
                    <p className="text-muted-foreground">Training & Certification Hub</p>
                  </div>
                </div>
                
                <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                  <img 
                    src="src/assets/tech-background.jpg" 
                    alt="InterpreLab Platform Dashboard"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <Badge className="bg-primary border-0 text-white mb-2">
                      Training Active
                    </Badge>
                    <p className="text-white text-sm">Comprehensive skill development</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Core Features:</h4>
                  <div className="space-y-2">
                    {[
                      "Continuous Monitoring & Feedback",
                      "Performance Analytics",
                      "Personalized Learning Paths",
                      "Ethics-Grounded Training",
                      "Certification Preparation"
                    ].map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Compliance:</h4>
                  <div className="flex gap-2">
                    <Badge variant="outline">HIPAA</Badge>
                    <Badge variant="outline">SOC 2</Badge>
                  </div>
                </div>

                <Button asChild className="w-full bg-gradient-primary border-0 text-white hover:opacity-90">
                  <Link to="/interprebot">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Take the Assessment
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* InterpreCoach Browser Extension */}
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm hover-lift group">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-success rounded-lg">
                    <Chrome className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">InterpreCoach</h3>
                    <p className="text-muted-foreground">Live Session Assistant</p>
                  </div>
                </div>
                
                <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                  <img 
                    src="src/assets/extension-preview.jpg" 
                    alt="InterpreCoach Extension Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <Badge className="bg-success border-0 text-white mb-2">
                      Live Recording
                    </Badge>
                    <p className="text-white text-sm">Real-time interpretation assistance</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Live Features:</h4>
                  <div className="space-y-2">
                    {[
                      "Browser Integration",
                      "Real-time Speech-to-Text",
                      "Multi-Agent Processing",
                      "Context Windows",
                      "QA & Ethics Feedback"
                    ].map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-success rounded-full" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Specializations:</h4>
                  <div className="flex gap-2">
                    <Badge variant="outline">Medical</Badge>
                    <Badge variant="outline">Legal</Badge>
                  </div>
                </div>

                <Button asChild className="w-full bg-gradient-success border-0 text-white hover:opacity-90">
                  <Link to="/interprecoach">
                    <Download className="w-4 h-4 mr-2" />
                    Meet InterpreCoach
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* InterpreBot AI Analyst */}
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm hover-lift group relative overflow-hidden">
            <CardContent className="p-8 relative z-10">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="relative p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    {/* Customized Emotive Icon */}
                    <div className="relative">
                      <Brain className="w-6 h-6 text-white animate-pulse" />
                      <Sparkles className="w-3 h-3 text-yellow-300 absolute -top-1 -right-1 animate-pulse" style={{ animationDelay: '0.5s' }} />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur-lg opacity-30 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">InterpreBot</h3>
                    <p className="text-muted-foreground">Personal AI Analyst</p>
                  </div>
                </div>
                
                {/* Enhanced 3D Scene */}
                <div className="relative aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-purple-900/40 to-pink-900/40">
                  {/* 3D Computer Scene */}
                  <div className="w-full h-full relative perspective-1000">
                    {/* Main 3D Computer */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative transform-gpu hover:scale-105 transition-transform duration-500">
                        {/* Computer Base */}
                        <div 
                          className="w-32 h-20 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg shadow-xl"
                          style={{ transform: 'rotateX(15deg) rotateY(-10deg)' }}
                        >
                          {/* Screen */}
                          <div className="absolute top-1 left-2 right-2 bottom-6 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded border border-cyan-400/30 overflow-hidden">
                            {/* Scrolling Code Effect */}
                            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-cyan-400/10 to-transparent animate-pulse" />
                            <div className="text-cyan-300 text-xs font-mono p-1 opacity-70">
                              <div className="animate-pulse">AI Analysis...</div>
                              <div className="animate-pulse" style={{ animationDelay: '0.2s' }}>Voice: 92%</div>
                              <div className="animate-pulse" style={{ animationDelay: '0.4s' }}>Grammar: 88%</div>
                            </div>
                          </div>
                          {/* Keyboard */}
                          <div className="absolute bottom-1 left-2 right-2 h-2 bg-slate-700 rounded-sm" />
                        </div>
                      </div>
                    </div>

                    {/* Floating Neural Network Elements */}
                    <div className="absolute top-4 left-4 w-3 h-3 bg-cyan-400 rounded-full animate-float opacity-70" />
                    <div className="absolute top-6 right-6 w-2 h-2 bg-purple-400 rounded-full animate-float opacity-70" style={{ animationDelay: '1s' }} />
                    <div className="absolute bottom-6 left-8 w-4 h-4 bg-pink-400 rounded-full animate-float opacity-70" style={{ animationDelay: '2s' }} />
                    <div className="absolute bottom-4 right-4 w-2 h-2 bg-yellow-400 rounded-full animate-float opacity-70" style={{ animationDelay: '1.5s' }} />

                    {/* Data Flow Lines */}
                    <div className="absolute inset-0 pointer-events-none">
                      <svg className="w-full h-full">
                        <defs>
                          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#06b6d4', stopOpacity: 0.6 }} />
                            <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.2 }} />
                          </linearGradient>
                        </defs>
                        <path 
                          d="M20,40 Q80,20 140,60 Q180,80 220,40" 
                          stroke="url(#flowGradient)" 
                          strokeWidth="2" 
                          fill="none"
                          className="animate-pulse"
                        />
                        <path 
                          d="M40,80 Q100,100 160,80 Q200,60 240,80" 
                          stroke="url(#flowGradient)" 
                          strokeWidth="1" 
                          fill="none"
                          className="animate-pulse"
                          style={{ animationDelay: '0.5s' }}
                        />
                      </svg>
                    </div>

                    {/* Voice Wave Animation */}
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div 
                          key={i}
                          className="w-1 bg-gradient-to-t from-cyan-400 to-purple-400 rounded-full animate-pulse"
                          style={{ 
                            height: `${8 + Math.sin(i) * 4}px`,
                            animationDelay: `${i * 0.1}s`,
                            animationDuration: '1s'
                          }}
                        />
                      ))}
                    </div>

                    {/* Holographic Interface Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-cyan-400/5 to-purple-400/5" />
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 border-0 text-white text-xs">
                        <Eye className="w-3 h-3 mr-1" />
                        AI Analysis Active
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Analysis Capabilities:</h4>
                  <div className="space-y-2">
                    {[
                      "Voice Control & Clarity",
                      "Grammar & Syntax Analysis",
                      "Vocabulary Assessment",
                      "Ethical Decision-Making",
                      "Personalized Learning Paths"
                    ].map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Detection:</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">Hesitations</Badge>
                    <Badge variant="outline" className="text-xs">Tone Issues</Badge>
                    <Badge variant="outline" className="text-xs">Pacing</Badge>
                  </div>
                </div>

                <Button asChild className="w-full bg-gradient-to-r from-purple-500 to-pink-500 border-0 text-white hover:opacity-90">
                  <Link to="/interprebot">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Find out more
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Business Model Section */}
        <div className="mt-20 text-center space-y-8">
          <Badge className="bg-gradient-primary border-0 text-white px-4 py-2">
            Flexible Pricing
          </Badge>
          <h3 className="text-3xl md:text-4xl font-bold text-white">
            Freemium to Enterprise Solutions
          </h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="bg-card/30 border-border/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <h4 className="text-xl font-bold text-foreground mb-2">Free Tier</h4>
                <p className="text-muted-foreground mb-4">Basic features with limited usage</p>
                <Badge variant="outline">Perfect for Students</Badge>
              </CardContent>
            </Card>
            <Card className="bg-card/30 border-border/50 backdrop-blur-sm border-primary/50">
              <CardContent className="p-6 text-center">
                <h4 className="text-xl font-bold text-foreground mb-2">Professional</h4>
                <p className="text-muted-foreground mb-4">Advanced features for working interpreters</p>
                <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
              </CardContent>
            </Card>
            <Card className="bg-card/30 border-border/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <h4 className="text-xl font-bold text-foreground mb-2">Enterprise</h4>
                <p className="text-muted-foreground mb-4">Custom solutions for organizations</p>
                <Badge variant="outline">White Glove Support</Badge>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Integration Call to Action */}
        <div className="text-center mt-16 space-y-6 animate-slide-up">
          <h3 className="text-2xl md:text-3xl font-bold text-white">
            Ready to Transform Your Interpretation Practice?
          </h3>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Join thousands of interpreters who trust InterpreLab's AI-powered ecosystem for training, live assistance, and continuous improvement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-primary border-0 text-white hover:opacity-90">
              <Link to="/interprecoach">
                <ArrowRight className="w-5 h-5 mr-2" />
                Join the waitlist
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <Link to="/contact">Find out more</Link>
              </Button>
          </div>
        </div>
      </div>
    </section>
  );
};