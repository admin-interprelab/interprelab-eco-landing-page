import { Navigation } from "../components/Navigation";
import { FullScreenVideoHero } from "../components/VideoSection";
import { SolutionHero } from "../components/SolutionHero";
import { StatsSection } from "../components/StatsSection";
import { Testimonials } from "../components/Testimonials";
import { Footer } from "../components/Footer";

export default function Home() {
  const painPoints = [
    {
      videoSrc: "/videos/lep-statistics.mp4",
      title: "20 Million Voices Unheard",
      description:
        "Despite legal requirements under Title VI and Section 1557 of the ACA, Limited English Proficiency (LEP) patients face increased health risks due to interpretation quality issues.",
    },
    {
      videoSrc: "/videos/interpreter-stress.mp4",
      title: "Real-Time Precision Under Pressure",
      description:
        "Medical interpreters face immense pressure to deliver accurate translations in high-stakes situations where every word can impact patient outcomes and safety.",
    },
    {
      videoSrc: "/videos/terminology-gap.mp4",
      title: "Mastering Medicine Alone",
      description:
        "Complex medical terminology and evolving healthcare practices create ongoing challenges for interpreters who must stay current without adequate support systems.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Full-screen video sections with snap scrolling */}
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

      {/* Main content */}
      <main>
        <SolutionHero />
        <StatsSection />
        <Testimonials />
      </main>

      <Footer />
    </div>
  );
}
