import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, User, Shield, Zap, Play } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from '../assets/hero-interprelab.jpg';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-black/60" /> {/* Overlay */}
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
    </section>
  );
};
