import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { FullScreenVideoHero } from "@/components/VideoSection";
import { ProductShowcase } from "@/components/ProductShowcase";
import { StatsSection } from "@/components/StatsSection";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";

const Index = () => {
  const painPoints = [
    {
      videoSrc: "/videos/lep-statistics.mp4",
      title: "The Challenge Every Interpreter Faces",
      description:
        "Medical interpreters are expected to deliver flawless accuracy in high-stakes situations, yet traditional training methods leave critical gaps in skill development and performance tracking.",
    },
    {
      videoSrc: "/videos/interpreter-stress.mp4",
      title: "Lost Income, Missed Opportunities",
      description:
        "Without proper call tracking and analytics, interpreters lose thousands annually due to unbilled time, inefficient scheduling, and lack of performance insights to optimize their earnings.",
    },
    {
      videoSrc: "/videos/terminology-gap.mp4",
      title: "Isolated Growth Without Support",
      description:
        "Interpreters struggle to master evolving medical terminology and improve their skills without personalized feedback, AI-powered practice tools, or a comprehensive development platform.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        
        {/* Pain Points Video Sections */}
        <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
          {painPoints.map((painPoint, index) => (
            <FullScreenVideoHero
              key={index}
              videoSrc={painPoint.videoSrc}
              title={painPoint.title}
              description={painPoint.description}
              index={index}
            />
          ))}
        </div>

        <ProductShowcase />
        <StatsSection />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
