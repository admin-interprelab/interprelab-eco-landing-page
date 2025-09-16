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
  Shield
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
                    src="/src/assets/tech-background.jpg" 
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

                <Button className="w-full bg-gradient-primary border-0 text-white hover:opacity-90">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Start Training
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
                    src="/src/assets/extension-preview.jpg" 
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

                <Button className="w-full bg-gradient-success border-0 text-white hover:opacity-90">
                  <Download className="w-4 h-4 mr-2" />
                  Install Extension
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* InterpreBot AI Analyst */}
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm hover-lift group">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">InterpreBot</h3>
                    <p className="text-muted-foreground">Personal AI Analyst</p>
                  </div>
                </div>
                
                <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                  <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
                        <BarChart3 className="w-8 h-8 text-white" />
                      </div>
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 border-0 text-white">
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

                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 border-0 text-white hover:opacity-90">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Start Assessment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Business Model & Infrastructure Section */}
        <div className="mt-20 space-y-16">
          {/* Business Model */}
          <div className="text-center space-y-8">
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

          {/* Technical Infrastructure */}
          <div className="text-center space-y-8">
            <Badge className="bg-gradient-success border-0 text-white px-4 py-2">
              Powered by Google Cloud
            </Badge>
            <h3 className="text-3xl md:text-4xl font-bold text-white">
              Enterprise-Grade Infrastructure
            </h3>
            <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <Card className="bg-card/30 border-border/50 backdrop-blur-sm">
                <CardContent className="p-6 text-center space-y-3">
                  <Cloud className="w-8 h-8 mx-auto text-primary" />
                  <h4 className="font-bold text-foreground">Hosting</h4>
                  <p className="text-sm text-muted-foreground">Cloud Run, App Engine, Firebase</p>
                </CardContent>
              </Card>
              <Card className="bg-card/30 border-border/50 backdrop-blur-sm">
                <CardContent className="p-6 text-center space-y-3">
                  <Cpu className="w-8 h-8 mx-auto text-success" />
                  <h4 className="font-bold text-foreground">AI/ML</h4>
                  <p className="text-sm text-muted-foreground">Vertex AI, Natural Language API</p>
                </CardContent>
              </Card>
              <Card className="bg-card/30 border-border/50 backdrop-blur-sm">
                <CardContent className="p-6 text-center space-y-3">
                  <Database className="w-8 h-8 mx-auto text-accent" />
                  <h4 className="font-bold text-foreground">Storage</h4>
                  <p className="text-sm text-muted-foreground">Firestore, BigQuery, Cloud Storage</p>
                </CardContent>
              </Card>
              <Card className="bg-card/30 border-border/50 backdrop-blur-sm">
                <CardContent className="p-6 text-center space-y-3">
                  <Shield className="w-8 h-8 mx-auto text-warning" />
                  <h4 className="font-bold text-foreground">Security</h4>
                  <p className="text-sm text-muted-foreground">IAM, Cloud Identity, Cloud Armor</p>
                </CardContent>
              </Card>
            </div>
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