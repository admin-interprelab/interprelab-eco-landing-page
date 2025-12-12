import { Navigation } from "../components/Navigation";
import { FullScreenVideoHero } from "../components/VideoSection";
import { SolutionHero } from "../components/SolutionHero";
import { StatsSection } from "../components/StatsSection";
import { Testimonials } from "../components/Testimonials";
import { Footer } from "../components/Footer";
import { ScrollProgress } from "../components/ScrollProgress";

export default function Home() {
  const painPoints = [
    {
      videoSrc: "/videos/lep-statistics.mp4",
      title: "Overworked & Underpaid",
      description:
        "As of the present day, research suggests remote interpreters are overworked and underpaid, so how does this reflect on the services provided?",
    },
    {
      videoSrc: "/videos/interpreter-stress.mp4",
      title: "The Unqualified Gap",
      description:
        "The shortage of qualified interpreters has led to hiring untrained bilinguals, in some cases, limited English proficient. Independent contractor relationships mean QA teams provide minimal feedback - often analyzing just one call every 4-6 months.",
    },
    {
      videoSrc: "/videos/terminology-gap.mp4",
      title: "Lives at Stake",
      description:
        "As a result, Limited English Proficiency patients are twice as likely to die when hospitalized compared to English-speaking patients. These disparities often go unreported as LEP communities face marginalization and discrimination in healthcare.",
    },
    {
      videoSrc: "/videos/lep-statistics.mp4",
      title: "The Solution: InterpreLab",
      description:
        "Embrace the change, don't get replaced by it. InterpreLab empowers interpreters with AI-driven tools for continuous learning, wellness support, and performance tracking - transforming challenges into opportunities for professional excellence.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <Navigation />

      {/* Full-screen video sections with snap scrolling */}
      <div className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-snap-container" role="region" aria-label="Pain points and solutions showcase">
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

      {/* Main content */}
      <main role="main">
        <SolutionHero />
        <StatsSection />
        <Testimonials />
      </main>

      <Footer />
    </div>
  );
}
