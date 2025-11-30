import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

export const SolutionTransition = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background">
        <div className="absolute inset-0 bg-gradient-glow opacity-30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto max-w-6xl">
        <div className="text-center space-y-12 animate-fade-in">
          {/* Main Headline */}
          <div className="space-y-6">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-foreground">The Problem is </span>
              <span className="bg-gradient-to-r from-destructive to-warning bg-clip-text text-transparent">
                Known
              </span>
              <br />
              <span className="text-foreground">Our Solution is </span>
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Revolutionary
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              These challenges have plagued the medical interpreting industry for years. 
              InterpreLab provides the AI-powered ecosystem to finally solve them.
            </p>
          </div>

          {/* Three Pillars */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="glass p-8 rounded-2xl space-y-4 hover-lift">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">AI Assessment</h3>
              <p className="text-muted-foreground leading-relaxed">
                Identify skill gaps with instant AI-powered evaluation and personalized feedback
              </p>
            </div>

            <div className="glass p-8 rounded-2xl space-y-4 hover-lift">
              <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-success" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Real-Time Coaching</h3>
              <p className="text-muted-foreground leading-relaxed">
                Get live support during calls with terminology lookup and AI guidance
              </p>
            </div>

            <div className="glass p-8 rounded-2xl space-y-4 hover-lift">
              <div className="w-12 h-12 rounded-xl bg-warning/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-warning" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Performance Analytics</h3>
              <p className="text-muted-foreground leading-relaxed">
                Track earnings, optimize efficiency, and measure growth with automated insights
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-12">
            <Link to="/interprebot">
              <Button size="xl" variant="hero" className="group shadow-glow">
                Start Your Free Assessment
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              No credit card required • Results in 15 minutes
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
