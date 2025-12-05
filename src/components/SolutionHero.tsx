import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Bot, BookOpen, BarChart3, MessageSquare, Heart, Users } from "lucide-react";
import { Link } from "react-router-dom";

export const SolutionHero = () => {
  const solutions = [
    {
      icon: <Bot className="w-6 h-6" />,
      title: "InterpreBot",
      description: "AI-powered assessment tool that provides instant feedback on your interpretation skills",
      link: "/interprebot",
      color: "text-primary",
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "InterpreCoach",
      description: "Personalized AI coaching to help you master medical terminology and improve techniques",
      link: "/interprecoach",
      color: "text-success",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "InterpreTrack",
      description: "Track your performance, analyze patterns, and measure your growth over time",
      link: "/interpretrack",
      color: "text-warning",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Interpre-Wellness",
      description: "AI-powered emotional support and debriefing for mental health and wellbeing",
      link: "/interpre-wellness",
      color: "text-pink-500",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "InterpreLink",
      description: "Professional networking community for interpreters to connect and collaborate",
      link: "/interprelink",
      color: "text-blue-500",
    },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-to-b from-background via-background/95 to-primary/5">
      <div className="container mx-auto">
        {/* Headline */}
        <div className="text-center mb-16 space-y-6 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Embrace the Change,
            </span>
            <br />
            <span className="text-foreground">Don't Get Replaced By It</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground/90 max-w-4xl mx-auto font-sans leading-relaxed">
            The InterpreLab Ecosystem: AI-powered solutions designed to eradicate the human margin of error in medical interpretation
          </p>
          <p className="text-lg md:text-xl text-muted-foreground/80 max-w-3xl mx-auto font-sans leading-relaxed">
            We're contributing to the UN SDG 2030 goals by transforming healthcare communication on a global scale—ensuring every voice is heard, every diagnosis is clear, and every patient receives equitable care.
          </p>
        </div>

        {/* Solution Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-6xl mx-auto">
          {solutions.map((solution, index) => (
            <Card
              key={solution.title}
              className="group hover:shadow-glow transition-all duration-300 hover:-translate-y-1 glass border-primary/20 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className={`mb-3 ${solution.color}`}>
                  {solution.icon}
                </div>
                <h3 className="text-lg font-display font-bold mb-2 text-foreground">
                  {solution.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 font-sans leading-relaxed">
                  {solution.description}
                </p>
                <Link to={solution.link}>
                  <Button
                    variant="ghost"
                    className="group/btn p-0 h-auto font-medium text-primary hover:text-primary-foreground"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-6 animate-fade-in" style={{ animationDelay: "400ms" }}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/about">
              <Button
                size="lg"
                className="bg-gradient-primary hover:opacity-90 text-white shadow-glow group px-8 py-4 font-display"
              >
                Find Out More
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="pt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="font-sans">HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="font-sans">SOC 2 Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="font-sans">ISO 27001</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
