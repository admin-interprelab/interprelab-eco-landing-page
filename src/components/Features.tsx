import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { 
  Monitor,
  TrendingUp,
  BookOpen,
  Shield,
  Users,
  Database,
  Clock,
  Award
} from "lucide-react";

export const Features = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const features = [
    {
      icon: Monitor,
      title: "Continuous Quality Assurance",
      description: "Real-time monitoring combines AI precision with human expertise for comprehensive quality control."
    },
    {
      icon: TrendingUp,
      title: "Performance Analytics",
      description: "Track terminology fidelity, ethical decisions, and get session-based performance reports."
    },
    {
      icon: BookOpen,
      title: "Resource Management",
      description: "Upload, test, and refine language resources. Integrate glossaries and experiment with custom models."
    },
    {
      icon: Shield,
      title: "Data Security & Privacy",
      description: "Enterprise-grade security with HIPAA compliance and SOC 2 certification for sensitive environments."
    },
    {
      icon: Users,
      title: "Collaborative Platform",
      description: "Space for linguists, developers, and educators to share insights and best practices."
    },
    {
      icon: Database,
      title: "Conversation Analytics",
      description: "Comprehensive dashboards track logs, usage statistics, and model performance metrics."
    },
    {
      icon: Clock,
      title: "Real-time Feedback",
      description: "Instant feedback during sessions with adaptive scenarios and AI-driven simulations."
    },
    {
      icon: Award,
      title: "Certification Support",
      description: "Structured preparation for professional certification with graded assessments."
    }
  ];

  return (
    <section className="py-20 px-6 relative" ref={ref} aria-labelledby="features-heading">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/src/assets/tech-background.jpg')" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/95" />
      
      <div className="container mx-auto relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Badge className="bg-gradient-primary border-0 text-white px-4 py-2 mb-4">
            Platform Capabilities
          </Badge>
          <h2 id="features-heading" className="text-3xl md:text-5xl font-bold text-white mb-6">
            Comprehensive Features for Professional Interpreters
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From continuous monitoring to collaborative learning, InterpreLab provides 
            everything interpreters need to excel in high-stakes environments.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className={`bg-card/50 border-border/50 backdrop-blur-sm hover-lift group transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ 
                transitionDelay: isVisible ? `${index * 100}ms` : '0ms'
              }}
            >
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <feature.icon className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};