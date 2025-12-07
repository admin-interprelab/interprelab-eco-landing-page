import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Chrome,
  Clock,
  ArrowRight,
  GraduationCap,
  Users
} from "lucide-react";
import { Link } from "react-router-dom";

export const ProductShowcase = () => {
  const products = [
    {
      id: "interprebot",
      name: "InterpreBot",
      tagline: "Skills Assessment",
      features: [
        "AI-powered linguistic analysis",
        "Grammar & syntax feedback",
        "Personalized learning paths"
      ],
      icon: Brain,
      link: "/interprebot",
      cta: "Take Assessment"
    },
    {
      id: "interprecoach",
      name: "InterpreCoach",
      tagline: "Real-Time Assistant",
      features: [
        "Live terminology support",
        "Voice & pitch regulation",
        "Automatic note-taking"
      ],
      icon: Chrome,
      link: "/interprecoach",
      cta: "Install Extension"
    },
    {
      id: "interprestudy",
      name: "InterpreStudy",
      tagline: "Interactive Training",
      features: [
        "Role-play simulations",
        "DCS Schema training",
        "Vicarious Trauma management"
      ],
      icon: GraduationCap,
      link: "/interprestudy",
      cta: "Start Learning"
    },
    {
      id: "interprelink",
      name: "InterpreLink",
      tagline: "Community Network",
      features: [
        "Professional forums",
        "Job board access",
        "Mock practice groups"
      ],
      icon: Users,
      link: "/interpre-hub",
      cta: "Join Community"
    }
  ];

  return (
    <section className="py-32 px-6 relative bg-card/50" id="solutions">
      <div className="container mx-auto relative z-10">
        {/* Header - Dilemma style with Nobel gold accent */}
        <div className="text-center mb-20 space-y-6">
          <div className="inline-block mb-3 text-xs font-bold tracking-widest text-muted-foreground uppercase animate-fade-in-up stagger-1">
            Complete Ecosystem
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight text-foreground animate-fade-in-up stagger-2">
            Our Solutions.
            <br />
            <span className="text-muted-foreground italic font-normal text-3xl md:text-4xl block mt-4">
              Built For You.
            </span>
          </h2>
          <div className="w-16 h-1 bg-nobel-gold mx-auto animate-fade-in-up stagger-3"></div>
        </div>

        {/* Product Cards - Glass effects with Nobel gold hover */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {products.map((product, index) => {
            const Icon = product.icon;
            const staggerClass = ['stagger-1', 'stagger-2', 'stagger-3', 'stagger-4'][index] || 'stagger-1';
            return (
              <Card 
                key={product.id}
                id={`${product.id}-section`}
                className={`glass border-border hover:border-nobel-gold/50 group transition-all duration-300 hover:shadow-md animate-fade-in-up ${staggerClass}`}
              >
                <CardContent className="p-8 space-y-6">
                  {/* Icon - Nobel gold accent */}
                  <div className="w-14 h-14 bg-nobel-gold/10 border border-nobel-gold/20 rounded-xl flex items-center justify-center group-hover:bg-nobel-gold/20 transition-colors duration-300">
                    <Icon className="w-7 h-7 text-nobel-gold" />
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-xl font-serif font-semibold text-foreground mb-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-nobel-gold font-medium">{product.tagline}</p>
                    </div>
                    <ul className="space-y-2">
                      {product.features.map((feature, i) => (
                        <li key={i} className="flex items-start text-sm text-muted-foreground">
                          <span className="mr-2 text-nobel-gold">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <Link to={product.link}>
                    <Button className="w-full group/btn glass hover:bg-nobel-gold/10 hover:border-nobel-gold/30 transition-all duration-300" variant="outline">
                      {product.cta}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA - Nobel gold gradient */}
        <div className="text-center mt-20 animate-fade-in-up stagger-5">
          <Link to="/waitlist">
            <Button size="lg" className="bg-gradient-to-r from-nobel-gold to-nobel-gold/80 hover:from-nobel-gold/90 hover:to-nobel-gold/70 text-background font-semibold shadow-lg px-8 transition-all duration-300">
              Start Your Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
