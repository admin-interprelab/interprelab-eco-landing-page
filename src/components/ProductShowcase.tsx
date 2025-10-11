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
  Waves,
  Clock
} from "lucide-react";

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
            Three Powerful Tools, One Ecosystem
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Train smarter with InterpreBot, perform better with InterpreCoach, and manage your practice with InterpreTrack—all designed for medical interpreters.
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
                    <h3 className="text-xl font-bold text-foreground">InterpreBot</h3>
                    <p className="text-muted-foreground">AI Skills Assessment</p>
                  </div>
                </div>
                
                <div className="relative aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-purple-900/40 to-pink-900/40">
                  <div className="w-full h-full flex items-center justify-center">
                    <Brain className="w-16 h-16 text-purple-400 animate-pulse" />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 border-0 text-white mb-2">
                      AI Analysis
                    </Badge>
                    <p className="text-white text-sm">Instant performance insights</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Get AI-powered analysis of your interpretation skills with detailed feedback on accuracy, fluency, and medical terminology mastery.
                  </p>
                  <div className="space-y-2">
                    {[
                      "Linguistic accuracy scoring",
                      "Medical terminology assessment",
                      "Grammar & flow analysis",
                      "Real-time performance feedback"
                    ].map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 border-0 text-white hover:opacity-90">
                  <Brain className="w-4 h-4 mr-2" />
                  Start Assessment
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
                    <p className="text-muted-foreground">Real-Time Browser Assistant</p>
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
                      Live Assistance
                    </Badge>
                    <p className="text-white text-sm">In-session support</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Browser extension providing real-time terminology support, cultural context, and voice coaching during live interpretation sessions.
                  </p>
                  <div className="space-y-2">
                    {[
                      "Real-time terminology lookup",
                      "Cultural context suggestions",
                      "Voice & speech coaching",
                      "Grammar assistance"
                    ].map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-success rounded-full" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-gradient-success border-0 text-white hover:opacity-90">
                  <Download className="w-4 h-4 mr-2" />
                  Add to Chrome
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* InterpreTrack */}
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm hover-lift group relative overflow-hidden">
            <CardContent className="p-8 relative z-10">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">InterpreTrack</h3>
                    <p className="text-muted-foreground">Call Logging & Earnings</p>
                  </div>
                </div>
                
                <div className="relative aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-orange-900/40 to-red-900/40">
                  <div className="w-full h-full flex items-center justify-center">
                    <BarChart3 className="w-16 h-16 text-orange-400 animate-pulse" />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 border-0 text-white mb-2">
                      Session Active
                    </Badge>
                    <p className="text-white text-sm">Tracking time & earnings</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Browser-integrated time tracker that logs session duration and calculates earnings automatically based on your custom pay rate.
                  </p>
                  <div className="space-y-2">
                    {[
                      "Automatic session logging",
                      "Custom pay rate setup",
                      "Real-time earnings calculation",
                      "Currency conversion"
                    ].map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 border-0 text-white hover:opacity-90">
                  <Clock className="w-4 h-4 mr-2" />
                  View Dashboard
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
            <Button size="lg" className="bg-gradient-primary border-0 text-white hover:opacity-90">
              <ArrowRight className="w-5 h-5 mr-2" />
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <Calendar className="w-5 h-5 mr-2" />
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};