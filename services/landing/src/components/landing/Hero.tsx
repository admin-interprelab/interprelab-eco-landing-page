import { Button } from "@/lib/ui";
import { Badge } from "@/lib/ui";
import { ArrowRight, User, Shield, Zap, Globe, Users, Star } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      aria-label="Hero section"
    >
      {/* Background with gradient overlay and animated orbs - matching Dilemma page */}
      <div className="absolute inset-0 z-0 bg-background">
        {/* Dark gradient base */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/95" />

        {/* Animated orbs with Nobel gold tint */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-nobel-gold/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

        {/* Subtle noise texture overlay */}
        <div className="absolute inset-0 bg-background/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-5xl mx-auto space-y-8">

          {/* Badge - Nobel gold styling with glass effect */}
          <div className="animate-fade-in-up stagger-1">
            <Badge className="inline-flex items-center px-5 py-2.5 border-2 border-nobel-gold/40 text-nobel-gold text-xs tracking-[0.2em] uppercase font-bold rounded-full backdrop-blur-md bg-nobel-gold/5 hover:bg-nobel-gold/10 transition-all duration-300">
              <Zap className="w-3.5 h-3.5 mr-2" />
              AI-Powered Platform
            </Badge>
          </div>

          {/* Main Headline - Large serif font matching Dilemma page */}
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] text-foreground animate-fade-in-up stagger-2">
            Master Medical{" "}
            <span className="block mt-2 md:mt-4 bg-gradient-to-r from-foreground via-nobel-gold to-foreground bg-clip-text text-transparent">
              Interpretation
            </span>
          </h1>

          {/* Subtitle - Matching Dilemma spacing and style */}
          <p className="max-w-3xl mx-auto text-xl md:text-2xl text-muted-foreground leading-relaxed animate-fade-in-up stagger-3">
            Train smarter with AI-driven assessment, real-time coaching, and automated tracking designed for professional medical interpreters.
          </p>

          {/* CTA Buttons - Glass effects with Nobel gold accents and glow */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6 animate-fade-in-up stagger-4">
            <Link to="/waitlist" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-nobel-gold via-nobel-gold to-nobel-gold/90 hover:from-nobel-gold/90 hover:via-nobel-gold hover:to-nobel-gold text-nobel-dark font-semibold shadow-[0_0_30px_rgba(197,160,89,0.3)] hover:shadow-[0_0_40px_rgba(197,160,89,0.5)] group px-8 py-6 text-lg transition-all duration-300 transform hover:scale-105"
                aria-label="Start your free trial on the InterpreLab platform"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Button>
            </Link>

            <Link to="/signin" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto glass border-2 border-border hover:border-nobel-gold/50 hover:bg-nobel-gold/5 group px-8 py-6 text-lg transition-all duration-300 transform hover:scale-105"
                aria-label="Sign in to your InterpreLab account"
              >
                <User className="w-5 h-5 mr-2" aria-hidden="true" />
                Sign In
              </Button>
            </Link>
          </div>

          {/* Trust Stats - Glass cards with stagger animations and icons */}
          <div className="pt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto animate-fade-in-up stagger-5" role="region" aria-label="Platform statistics">
            <div className="glass rounded-xl p-6 hover:border-nobel-gold/40 hover:bg-nobel-gold/5 transition-all duration-300 group">
              <Globe className="w-8 h-8 text-nobel-gold mx-auto mb-3 group-hover:scale-110 transition-transform" aria-hidden="true" />
              <div className="text-4xl md:text-5xl font-bold text-foreground mb-2" aria-label="50 plus countries">50+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Countries</div>
            </div>
            <div className="glass rounded-xl p-6 hover:border-nobel-gold/40 hover:bg-nobel-gold/5 transition-all duration-300 group">
              <Users className="w-8 h-8 text-nobel-gold mx-auto mb-3 group-hover:scale-110 transition-transform" aria-hidden="true" />
              <div className="text-4xl md:text-5xl font-bold text-foreground mb-2" aria-label="10,000 plus interpreters">10k+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Interpreters</div>
            </div>
            <div className="glass rounded-xl p-6 hover:border-nobel-gold/40 hover:bg-nobel-gold/5 transition-all duration-300 group">
              <Star className="w-8 h-8 text-nobel-gold mx-auto mb-3 group-hover:scale-110 transition-transform" aria-hidden="true" />
              <div className="text-4xl md:text-5xl font-bold text-foreground mb-2" aria-label="98 percent satisfaction rate">98%</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Satisfaction</div>
            </div>
          </div>

          {/* Trust Badges - Nobel gold border on hover with glass effect */}
          <div className="flex flex-wrap justify-center gap-4 pt-10 animate-fade-in-up stagger-6" role="list" aria-label="Security and compliance certifications">
            <Badge variant="outline" className="px-5 py-2.5 border-2 border-border/50 hover:border-nobel-gold/60 hover:bg-nobel-gold/5 backdrop-blur-sm transition-all duration-300 text-sm" role="listitem">
              <Shield className="w-4 h-4 mr-2 text-nobel-gold" aria-hidden="true" />
              HIPAA Compliant
            </Badge>
            <Badge variant="outline" className="px-5 py-2.5 border-2 border-border/50 hover:border-nobel-gold/60 hover:bg-nobel-gold/5 backdrop-blur-sm transition-all duration-300 text-sm" role="listitem">
              <Shield className="w-4 h-4 mr-2 text-nobel-gold" aria-hidden="true" />
              SOC 2 Certified
            </Badge>
            <Badge variant="outline" className="px-5 py-2.5 border-2 border-border/50 hover:border-nobel-gold/60 hover:bg-nobel-gold/5 backdrop-blur-sm transition-all duration-300 text-sm" role="listitem">
              <Shield className="w-4 h-4 mr-2 text-nobel-gold" aria-hidden="true" />
              ISO 27001
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
};

