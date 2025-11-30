import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { TrendingDown, Users, DollarSign, Brain } from "lucide-react";

interface DataOverlay {
  stat: string;
  label: string;
  icon?: React.ReactNode;
}

interface FullScreenVideoHeroProps {
  videoSrc: string;
  title: string;
  description: string;
  index: number;
  dataOverlays?: DataOverlay[];
}

export const FullScreenVideoHero = ({
  videoSrc,
  title,
  description,
  index,
  dataOverlays,
}: FullScreenVideoHeroProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          video.play().catch((error) => {
            console.log("Video play failed:", error);
            video.muted = true;
            video.play().catch((e) => console.log("Retry failed:", e));
          });
          // Fade in text after 800ms
          setTimeout(() => setTextVisible(true), 800);
        } else {
          video.pause();
          setTextVisible(false);
        }
      });
    }, observerOptions);

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="h-screen w-full relative snap-start snap-always overflow-hidden transition-opacity duration-700 ease-in-out"
      aria-label={`Pain point ${index + 1}: ${title}`}
    >
      {/* Full-screen video background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        muted
        loop
        preload="auto"
        poster={index === 0 ? "/videos/lep-statistics-poster.jpg" : index === 1 ? "/videos/interpreter-stress-poster.jpg" : "/videos/terminology-gap-poster.jpg"}
        aria-hidden="true"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Dark overlay with gradient fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70 z-10 transition-opacity duration-1000" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-6">
        {/* Data Overlays - Top Corners */}
        {dataOverlays && textVisible && (
          <div className="absolute top-8 left-0 right-0 px-6 flex justify-between max-w-7xl mx-auto">
            {dataOverlays.slice(0, 2).map((overlay, idx) => (
              <div
                key={idx}
                className={`glass px-6 py-4 rounded-xl border border-white/20 backdrop-blur-md transition-all duration-1000 delay-${(idx + 1) * 200} ${
                  textVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                }`}
              >
                <div className="flex items-center gap-3">
                  {overlay.icon && <div className="text-white">{overlay.icon}</div>}
                  <div>
                    <div className="text-3xl font-bold text-white">{overlay.stat}</div>
                    <div className="text-sm text-white/80">{overlay.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Main Content */}
        <div
          className={`max-w-4xl text-center space-y-6 transition-all duration-1000 ${
            textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight drop-shadow-2xl">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-sans max-w-3xl mx-auto drop-shadow-lg">
            {description}
          </p>
        </div>

        {/* Additional Data Overlays - Bottom */}
        {dataOverlays && dataOverlays.length > 2 && textVisible && (
          <div className="absolute bottom-24 left-0 right-0 px-6">
            <div className="max-w-4xl mx-auto flex justify-center gap-4">
              {dataOverlays.slice(2).map((overlay, idx) => (
                <Badge
                  key={idx}
                  className={`glass px-6 py-3 text-base border-white/20 transition-all duration-1000 delay-${(idx + 3) * 200} ${
                    textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                >
                  {overlay.icon && <span className="mr-2">{overlay.icon}</span>}
                  <span className="font-bold">{overlay.stat}</span>
                  <span className="ml-2 opacity-80">{overlay.label}</span>
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Scroll indicator (only on first section) */}
      {index === 0 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      )}
    </section>
  );
};
