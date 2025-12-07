import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, User, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-interprelab.jpg";

export const Hero = () => {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      aria-label="Hero section"
    >
      {/* Background with gradient overlay - matching Dilemma page */}
      <div className="absolute inset-0 z-0 bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--background),0.92)_0%,rgba(var(--background),0.6)_50%,rgba(var(--background),0.3)_100%)]" />
        <div className="absolute inset-0 bg-background/30" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-5xl mx-auto space-y-10">
          
          {/* Badge - Nobel gold styling */}
          <div className="animate-fade-in-up stagger-1">
            <Badge className="inline-block px-4 py-2 border border-nobel-gold text-nobel-gold text-xs tracking-[0.2em] uppercase font-bold rounded-full backdrop-blur-sm bg-card/30">
              <Zap className="w-3 h-3 mr-2 inline" />
              AI-Powered Platform
            </Badge>
          </div>

          {/* Main Headline - Serif font matching Dilemma */}
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium leading-tight md:leading-[1.1] text-foreground drop-shadow-sm animate-fade-in-up stagger-2">
            Master Medical <br />
            <span className="italic font-normal text-muted-foreground text-4xl md:text-6xl block mt-4">
              Interpretation
            </span>
          </h1>

          {/* Subtitle - Matching Dilemma spacing and style */}
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground font-light leading-relaxed animate-fade-in-up stagger-3">
            Train smarter with AI-driven assessment, real-time coaching, and automated tracking designed for professional medical interpreters.
          </p>

          {/* CTA Buttons - Glass effects with Nobel gold accents */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 animate-fade-in-up stagger-4">
            <Link to="/waitlist">
              <Button 
                size="xl" 
                className="bg-gradient-to-r from-nobel-gold to-nobel-gold/80 hover:from-nobel-gold/90 hover:to-nobel-gold/70 text-background font-semibold shadow-lg group px-8 py-6 text-lg transition-all duration-300"
                aria-label="Start your free trial on the InterpreLab platform"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Button>
            </Link>
            
            <Link to="/signin">
              <Button 
                variant="outline" 
                size="xl" 
                className="glass border-border hover:border-nobel-gold/30 group px-8 py-6 text-lg transition-all duration-300"
                aria-label="Sign in to your InterpreLab account"
              >
                <User className="w-5 h-5 mr-2" aria-hidden="true" />
                Sign In
              </Button>
            </Link>
          </div>

          {/* Trust Stats - Glass cards with stagger animations */}
          <div className="pt-12 grid grid-cols-3 gap-6 max-w-2xl mx-auto animate-fade-in-up stagger-5" role="region" aria-label="Platform statistics">
            <div className="glass rounded-lg p-6 hover:border-nobel-gold/30 transition-all duration-300">
              <div className="text-3xl md:text-4xl font-bold text-foreground" aria-label="50 plus countries">50+</div>
              <div className="text-sm text-muted-foreground mt-2">Countries</div>
            </div>
            <div className="glass rounded-lg p-6 hover:border-nobel-gold/30 transition-all duration-300">
              <div className="text-3xl md:text-4xl font-bold text-foreground" aria-label="10,000 plus interpreters">10k+</div>
              <div className="text-sm text-muted-foreground mt-2">Interpreters</div>
            </div>
            <div className="glass rounded-lg p-6 hover:border-nobel-gold/30 transition-all duration-300">
              <div className="text-3xl md:text-4xl font-bold text-foreground" aria-label="98 percent satisfaction rate">98%</div>
              <div className="text-sm text-muted-foreground mt-2">Satisfaction</div>
            </div>
          </div>

          {/* Trust Badges - Nobel gold border on hover */}
          <div className="flex flex-wrap justify-center gap-4 pt-8 animate-fade-in-up stagger-6" role="list" aria-label="Security and compliance certifications">
            <Badge variant="outline" className="px-4 py-2 border-border hover:border-nobel-gold/50 transition-colors duration-300" role="listitem">
              <Shield className="w-4 h-4 mr-2" aria-hidden="true" />
              HIPAA Compliant
            </Badge>
            <Badge variant="outline" className="px-4 py-2 border-border hover:border-nobel-gold/50 transition-colors duration-300" role="listitem">
              SOC 2 Certified
            </Badge>
            <Badge variant="outline" className="px-4 py-2 border-border hover:border-nobel-gold/50 transition-colors duration-300" role="listitem">
              ISO 27001
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
};