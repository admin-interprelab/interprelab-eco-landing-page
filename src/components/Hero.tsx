import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, Shield, Zap, Users } from "lucide-react";
import heroImage from "@/assets/hero-interprelab.jpg";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Advanced medical interpretation technology with AI interfaces"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background/90" />
        <div className="absolute inset-0 bg-gradient-glow opacity-30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
          
          {/* Badge */}
          <Badge variant="secondary" className="glass px-6 py-2 text-sm font-medium">
            <Zap className="w-4 h-4 mr-2" />
            Revolutionary AI-Powered Interpretation Platform
          </Badge>

           {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none">
            <span className="bg-gradient-primary bg-clip-text text-transparent animate-pulse-glow">
              InterpreLab
            </span>
            <br />
            <span className="text-foreground">
              Complete AI-Powered
            </span>
            <br />
            <span className="text-muted-foreground text-4xl md:text-5xl lg:text-6xl">
              Interpreter Ecosystem
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-slide-up">
            Three integrated solutions: <strong>InterpreLab Platform</strong> for comprehensive training, 
            <strong>InterpreCoach Extension</strong> for live session assistance, and <strong>InterpreBot Analyst</strong> 
            for personalized skill assessment and development.
          </p>

          {/* Key Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto animate-slide-up">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">🎓</span>
              </div>
              <span>Training Platform</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-8 h-8 bg-gradient-success rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">⚡</span>
              </div>
              <span>Live Assistant</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">🤖</span>
              </div>
              <span>AI Analyst</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">☁️</span>
              </div>
              <span>Google Cloud</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
            <Button variant="hero" size="xl" className="group" asChild>
              <Link to="/interprebot">
                Take the Assessment
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button variant="glass" size="xl" className="group" asChild>
              <Link to="/interprecoach">
                <Play className="w-5 h-5 mr-2" />
                Meet InterpreCoach
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="pt-8 text-sm text-muted-foreground animate-slide-up">
            <p>Trusted by healthcare systems and legal firms across 50+ countries</p>
            <div className="flex justify-center gap-8 mt-4 opacity-60">
              <span>🏥 Medical Centers</span>
              <span>⚖️ Legal Firms</span>
              <span>🌍 Global Organizations</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-float" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 right-20 w-16 h-16 bg-success/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
    </section>
  );
};