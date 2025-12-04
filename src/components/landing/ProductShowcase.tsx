import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Chrome,
  Clock,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

export const ProductShowcase = () => {
  const products = [
    {
      id: "interprebot",
      name: "InterpreBot",
      tagline: "Skills Assessment",
      description: "AI-powered evaluation of your interpretation skills with personalized improvement paths.",
      icon: Brain,
      gradient: "from-primary to-primary-glow",
      link: "/interprebot",
      cta: "Take Assessment"
    },
    {
      id: "interprecoach",
      name: "InterpreCoach",
      tagline: "Real-Time Assistant",
      description: "Browser extension providing instant terminology support during live sessions.",
      icon: Chrome,
      gradient: "from-success to-primary",
      link: "/interprecoach",
      cta: "Install Extension"
    },
    {
      id: "interpretrack",
      name: "InterpreTrack",
      tagline: "Session Tracking",
      description: "Automated logging and earnings tracking for freelance interpreters.",
      icon: Clock,
      gradient: "from-secondary to-accent",
      link: "/interpretrack",
      cta: "Start Tracking"
    }
  ];

  return (
    <section className="py-32 px-6 relative" id="solutions">
      <div className="container mx-auto relative z-10">
        {/* Header - Simplified */}
        <div className="text-center mb-20 space-y-4 animate-fade-in">
          <Badge className="glass px-6 py-3 border-primary/20">
            Complete Ecosystem
          </Badge>
          <h2 className="text-5xl md:text-6xl font-bold">
            <span className="text-foreground">Our Solutions.</span>
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">Built For You.</span>
          </h2>
        </div>

        {/* Product Cards - Clean Design */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <Card 
                key={product.id}
                id={`${product.id}-section`}
                className="glass border-border/30 hover-lift group transition-all duration-300 hover:border-primary/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8 space-y-6">
                  {/* Icon */}
                  <div className={`w-14 h-14 bg-gradient-to-br ${product.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-primary">{product.tagline}</p>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* CTA */}
                  <Link to={product.link}>
                    <Button className="w-full group/btn bg-gradient-to-r from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 border border-primary/20" variant="outline">
                      {product.cta}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <Link to="/waitlist">
            <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-white shadow-glow px-8">
              Start Your Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
