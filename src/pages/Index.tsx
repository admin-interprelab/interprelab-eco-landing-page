import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { FullScreenVideoHero } from "@/components/VideoSection";
import { SolutionTransition } from "@/components/SolutionTransition";
import { InteractiveInsights } from "@/components/InteractiveInsights";
import { ProductShowcase } from "@/components/ProductShowcase";
import { StatsSection } from "@/components/StatsSection";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { TrendingDown, Users, DollarSign, Brain, AlertTriangle, Wifi } from "lucide-react";

const Index = () => {
  const painPoints = [
    {
      videoSrc: "/videos/lep-statistics.mp4",
      title: "20 Million Voices at Risk",
      description:
        "Despite federal mandates under Section 1557, Limited English Proficiency patients face increased health risks due to chronic interpretation quality failures and systemic gaps in care.",
      dataOverlays: [
        { stat: "20M", label: "LEP Patients in U.S.", icon: <Users className="w-5 h-5" /> },
        { stat: "67%", label: "Annual Turnover Rate", icon: <TrendingDown className="w-5 h-5" /> },
        { stat: "$71M", label: "Largest Malpractice Settlement", icon: <AlertTriangle className="w-5 h-5" /> },
      ],
    },
    {
      videoSrc: "/videos/interpreter-stress.mp4",
      title: "The Compensation Crisis",
      description:
        "Language Service Providers charge clients $1.50-$4.95/min while paying interpreters as little as $0.10/min—an 89% pay gap enabled by global wage arbitrage and workforce misclassification.",
      dataOverlays: [
        { stat: "$4.95", label: "LSP Charge (per min)", icon: <DollarSign className="w-5 h-5" /> },
        { stat: "$0.10", label: "Interpreter Pay (offshore)", icon: <TrendingDown className="w-5 h-5" /> },
        { stat: "89%", label: "Pay Gap Margin", icon: <AlertTriangle className="w-5 h-5" /> },
      ],
    },
    {
      videoSrc: "/videos/terminology-gap.mp4",
      title: "Technology Failures Meet Human Toll",
      description:
        "Interpreters battle daily tech failures—unstable connections, audio lag, frozen video—while absorbing psychological trauma with no systemic support. 73% report burnout.",
      dataOverlays: [
        { stat: "73%", label: "Burnout Rate", icon: <Brain className="w-5 h-5" /> },
        { stat: "Daily", label: "Tech Disruptions", icon: <Wifi className="w-5 h-5" /> },
        { stat: "$100s-$1000s", label: "Training Costs", icon: <DollarSign className="w-5 h-5" /> },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ThemeToggle />
      
      <main>
        <Hero />
        
        {/* Pain Points Video Sections with Data Overlays */}
        <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
          {painPoints.map((painPoint, index) => (
            <FullScreenVideoHero
              key={index}
              videoSrc={painPoint.videoSrc}
              title={painPoint.title}
              description={painPoint.description}
              index={index}
              dataOverlays={painPoint.dataOverlays}
            />
          ))}
        </div>

        {/* Solution Transition - Bridges pain points to solutions */}
        <SolutionTransition />

        {/* Interactive Research Insights */}
        <InteractiveInsights />

        {/* Solutions & Social Proof */}
        <ProductShowcase />
        <StatsSection />
        <Testimonials />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
