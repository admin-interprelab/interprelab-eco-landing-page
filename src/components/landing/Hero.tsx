import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, User, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-interprelab.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Simplified Background */}
      <div className="absolute inset-0 z-0 bg-background">
        <div className="absolute inset-0 bg-gradient-glow opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-5xl mx-auto space-y-10 animate-fade-in">
          
          {/* Badge */}
          <Badge className="glass px-6 py-3 text-sm font-medium border-primary/20">
            <Zap className="w-4 h-4 mr-2" />
            AI-Powered Interpretation Platform
          </Badge>

          {/* Main Headline - Simplified */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Master Medical
            </span>
            <br />
            <span className="text-foreground">
              Interpretation
            </span>
          </h1>

          {/* Subtitle - Concise */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Train smarter with AI-driven assessment, real-time coaching, and automated tracking.
          </p>

          {/* CTA Buttons - Prominent */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link to="/waitlist">
              <Button size="xl" className="bg-gradient-primary hover:opacity-90 text-white shadow-glow group px-8 py-6 text-lg">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <Link to="/signin">
              <Button variant="outline" size="xl" className="glass border-primary/30 group px-8 py-6 text-lg">
                <User className="w-5 h-5 mr-2" />
                Sign In
              </Button>
            </Link>
          </div>

          {/* Trust Stats - Clean */}
          <div className="pt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="space-y-1">
              <div className="text-3xl md:text-4xl font-bold text-foreground">50+</div>
              <div className="text-sm text-muted-foreground">Countries</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl md:text-4xl font-bold text-foreground">10k+</div>
              <div className="text-sm text-muted-foreground">Interpreters</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl md:text-4xl font-bold text-foreground">98%</div>
              <div className="text-sm text-muted-foreground">Satisfaction</div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4 pt-8 opacity-70">
            <Badge variant="outline" className="px-4 py-2">
              <Shield className="w-4 h-4 mr-2" />
              HIPAA Compliant
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              SOC 2 Certified
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              ISO 27001
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
};