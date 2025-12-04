import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Play,
  Users,
  BookOpen,
  Scale,
  Network,
  Briefcase,
  ArrowRight
} from "lucide-react";

export const Resources = () => {
  const resources = [
    {
      icon: Play,
      title: "Training Videos & Mock Scenarios",
      description: "Comprehensive library with realistic medical interpreting encounters and AI-powered feedback",
      items: ["Medical Terminology Mastery", "Patient Communication", "Emergency Procedures", "Cultural Context Training"],
      color: "bg-gradient-primary"
    },
    {
      icon: Users,
      title: "Certification-Ready Courses",
      description: "40-60 hour NBCMI & CCHI approved courses for certification preparation",
      items: ["NBCMI Preparation", "CCHI Prerequisites", "Written Exam Readiness", "Professional Standards"],
      color: "bg-gradient-success"
    },
    {
      icon: BookOpen,
      title: "AI-Driven Analysis Features",
      description: "Advanced linguistic analysis with personalized insights and performance tracking",
      items: ["Deep Performance Dashboard", "Weakness Identification", "Learning Path Generation", "Progress Analytics"],
      color: "bg-gradient-to-r from-purple-500 to-pink-500"
    },
    {
      icon: Scale,
      title: "Legal References & Ethics",
      description: "Comprehensive legal framework and ethical guidelines for professional interpreters",
      items: ["HIPAA Compliance", "Court Procedures", "Professional Ethics", "Legal Documentation"],
      color: "bg-gradient-to-r from-orange-500 to-red-500"
    }
  ];

  return (
    <section className="py-20 px-6 relative">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/src/assets/tech-background.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/95" />
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <Badge className="bg-gradient-primary border-0 text-white px-4 py-2 mb-4">
            Comprehensive Resources & Community
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Professional Development Ecosystem
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From certification-ready training courses to AI-driven linguistic analysis features and a dedicated 
            interpreter community platform - everything you need for professional excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {resources.map((resource, index) => (
            <Card 
              key={resource.title}
              className="bg-card/50 border-border/50 backdrop-blur-sm hover-lift group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 space-y-4">
                <div className={`w-12 h-12 ${resource.color} rounded-lg flex items-center justify-center`}>
                  <resource.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  {resource.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {resource.description}
                </p>
                <div className="space-y-2">
                  {resource.items.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-xs text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  Explore
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* InterpreterHub Section */}
        <div className="bg-card/30 border border-border/50 backdrop-blur-sm rounded-lg p-8 text-center">
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Network className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">InterpreterHub</h3>
            </div>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              InterpreLinks: A dedicated social web application for interpreters, like a specialized LinkedIn for our community. 
              Share experiences, get peer feedback, and discover professional opportunities.
            </p>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card className="bg-card/30 border-border/50">
                <CardContent className="p-6 text-center space-y-3">
                  <Users className="w-8 h-8 mx-auto text-primary" />
                  <h4 className="font-bold text-foreground">Community Wall</h4>
                  <p className="text-sm text-muted-foreground">
                    Share field experiences, ask questions, and learn from fellow interpreters worldwide
                  </p>
                  <Button variant="outline" size="sm">
                    Join Discussion
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-card/30 border-border/50">
                <CardContent className="p-6 text-center space-y-3">
                  <Briefcase className="w-8 h-8 mx-auto text-success" />
                  <h4 className="font-bold text-foreground">Job Opportunities</h4>
                  <p className="text-sm text-muted-foreground">
                    Stay updated on the latest interpreter positions and contract opportunities
                  </p>
                  <Button variant="outline" size="sm">
                    View Jobs
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Button size="lg" className="bg-gradient-primary border-0 text-white hover:opacity-90">
              <ArrowRight className="w-5 h-5 mr-2" />
              Access InterpreterHub
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};