import { useEffect, useRef, useState } from "react";

interface FullScreenVideoHeroProps {
  videoSrc: string;
  title: string;
  description: string;
  index: number;
}

export const FullScreenVideoHero = ({
  videoSrc,
  title,
  description,
  index,
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
      className="h-screen w-full relative snap-start snap-always overflow-hidden"
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
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Content */}
      <div className="relative z-20 h-full flex items-center justify-center px-6">
        <div
          className={`max-w-4xl text-center space-y-6 transition-all duration-1000 ${
            textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-sans max-w-3xl mx-auto">
            {description}
          </p>
        </div>
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
