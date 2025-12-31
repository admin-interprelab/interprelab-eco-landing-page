import { Button } from "@/lib/ui/components/ui/button";
import { Badge } from "@/lib/ui/components/ui/badge";
import { ArrowRight, User, Shield, Zap, Play } from "lucide-react";
import { Link } from "react-router-dom";


export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" role="banner">
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700"

        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-tr from-nobel-gold/20 via-transparent to-nobel-gold/10 pointer-events-none mix-blend-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-5xl mx-auto space-y-10 animate-fade-in">

          {/* Badge */}
          <Badge className="glass px-6 py-3 text-sm font-medium border-primary/20">
            <Zap className="w-4 h-4 mr-2" />
            AI-Powered Interpretation Platform
          </Badge>

          {/* Main Headline - SEO Optimized */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight">
            <span className="bg-gradient-primary bg-clip-text text-transparent inline-block mb-2">
              Master Medical Interpretation
            </span>
            <span className="block text-white drop-shadow-md">
              with AI-Powered Training
            </span>
          </h1>

          {/* Subtitle - Benefit-Focused */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Build confidence, reduce stress, and protect your earnings with AI-powered tools designed by interpreters, for interpreters.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
            <Button 
              variant="hero" 
              size="xl" 
              className="group hover:shadow-glow transition-all duration-300 hover:scale-105" 
              asChild
            >
              <Link to="/waitlist" aria-label="Start your free trial">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
              </Link>
            </Button>

            <Button 
              variant="glass" 
              size="xl" 
              className="group hover:bg-white/10 transition-all duration-300 hover:scale-105" 
              asChild
            >
              <Link to="/signin" aria-label="Sign in to your account">
                <User className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                Sign In
              </Link>
            </Button>
          </div>

          {/* Trust Indicators - Active Voice */}
          <div className="pt-8 text-sm text-muted-foreground animate-slide-up">
            <p>Healthcare systems and legal firms in 50+ countries trust InterpreLab</p>
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
