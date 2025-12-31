import { useEffect, useRef, useState, useCallback, ComponentType } from 'react';
import { Button, Badge } from '@/lib/ui';
import { cn } from '@/utils/shared';

interface DataOverlay {
  stat: string;
  label: string;
  icon: React.ReactNode;
}

export interface StoryDrivenVideoHeroProps {
  id: string;
  videoSrc: string;
  title: string;
  scenario: string;
  emotionalHook: string;
  dataOverlays?: DataOverlay[];
  ctaText: string;
  ctaIcon: ComponentType<{ className?: string }>;
  targetFeature: string;
  emotionalTone: 'urgent' | 'somber' | 'frustrated' | 'determined';
  index: number;
}

export const StoryDrivenVideoHero = ({
  id,
  videoSrc, // Destructure videoSrc here
  title,
  scenario,
  emotionalHook,
  dataOverlays,
  ctaText,
  ctaIcon: CtaIcon,
  targetFeature,
  emotionalTone,
  index,
}: StoryDrivenVideoHeroProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null); // Ref for video element
  const [textVisible, setTextVisible] = useState(false);
  const [scenarioVisible, setScenarioVisible] = useState(false);
  const [hookVisible, setHookVisible] = useState(false); 

  // Effect to set video playback rate
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7; // Slower than normal speed
    }
  }, []);

  const getEmotionalStyles = () => {
    const styles = {
      urgent: 'from-red-500/20 to-orange-500/20 border-red-500/30',
      somber: 'from-gray-500/20 to-blue-500/20 border-gray-500/30',
      frustrated: 'from-yellow-500/20 to-red-500/20 border-yellow-500/30',
      determined: 'from-green-500/20 to-blue-500/20 border-green-500/30',
    };
    return styles[emotionalTone];
  };

  const getBackgroundGradient = () => {
    const gradients = {
      urgent: 'from-red-900/40 via-orange-900/30 to-black',
      somber: 'from-gray-900/40 via-blue-900/30 to-black',
      frustrated: 'from-yellow-900/40 via-red-900/30 to-black',
      determined: 'from-green-900/40 via-blue-900/30 to-black',
    };
    return gradients[emotionalTone];
  };

  const getCtaGlowClass = () => {
    const glows = {
      urgent: 'pulse-glow-urgent',
      somber: 'warm-glow',
      frustrated: 'success-glow',
      determined: 'financial-glow',
    };
    return glows[emotionalTone];
  };

  const scrollToSection = useCallback(() => {
    const element = document.getElementById(targetFeature);
    if (!element) return;

    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - 80;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });

    // Highlight animation
    element.classList.add('highlight-pulse');
    setTimeout(() => {
      element.classList.remove('highlight-pulse');
    }, 2000);
  }, [targetFeature]);



  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3, // Lower threshold to trigger sooner
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Play video when section is in view
          if (videoRef.current) {
            videoRef.current.play();
          }
          // Staggered text animations
          setTimeout(() => setTextVisible(true), 300);
          setTimeout(() => setScenarioVisible(true), 800);
          setTimeout(() => setHookVisible(true), 1500);
        } else {
          // Pause video when section is out of view
          if (videoRef.current) {
            videoRef.current.pause();
          }
          setTextVisible(false);
          setScenarioVisible(false);
          setHookVisible(false);
        }
      });
    }, observerOptions);

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []); // Run once on mount

  return (
    <section
      ref={sectionRef}
      id={id}
      className="h-screen w-full relative snap-start snap-always overflow-hidden flex items-center justify-center"
      aria-label={`Pain point ${index + 1}: ${title}`}
    >
      {/* Video background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
        src={videoSrc}
        loop
        muted
        autoPlay
        playsInline
        preload="auto"
      />

      {/* Dark overlay with gradient for readability - kept for consistent styling */}
      <div
        className={cn(
          'absolute inset-0 w-full h-full transition-opacity duration-1000 z-[1]',
          getBackgroundGradient()
        )}
        aria-hidden="true"
        style={{ opacity: 1 }} 
      />

      {/* Another dark overlay for deeper contrast, if needed (adjust z-index as necessary) */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-[2]"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-[3] w-full max-w-7xl mx-auto flex flex-col items-center justify-center px-6 h-full">
        {/* Data Overlays - Top */}
        {dataOverlays && textVisible && (
          <div className="absolute top-8 left-0 right-0 px-6 flex flex-wrap justify-center gap-4 max-w-7xl mx-auto">
            {dataOverlays.map((overlay, idx) => (
              <div
                key={idx}
                className={cn(
                  'glass px-4 py-3 rounded-xl border backdrop-blur-md transition-all duration-1000',
                  textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4',
                  getEmotionalStyles()
                )}
                style={{ transitionDelay: `${idx * 200}ms` }}
              >
                <div className="flex items-center gap-3">
                  {overlay.icon && <div className="text-white">{overlay.icon}</div>}
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-white">
                      {overlay.stat}
                    </div>
                    <div className="text-xs md:text-white/80">{overlay.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Main Content */}
        <div className="max-w-4xl text-center space-y-8">
          {/* Title */}
          <div
            className={cn(
              'transition-all duration-1000',
              textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            <Badge className="glass px-6 py-3 text-sm font-medium border-primary/20 mb-4">
              Pain Point {index + 1} of 4
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight drop-shadow-2xl">
              {title}
            </h1>
          </div>

          {/* Scenario (Story Text) */}
          <div
            className={cn(
              'transition-all duration-1000 delay-300',
              scenarioVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            <p className="text-lg md:text-xl text-white/90 leading-relaxed font-sans max-w-3xl mx-auto drop-shadow-lg italic">
              {scenario}
            </p>
          </div>

          {/* Emotional Hook */}
          <div
            className={cn(
              'transition-all duration-1000 delay-500',
              hookVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            <p className="text-xl md:text-2xl text-white font-bold leading-relaxed max-w-3xl mx-auto drop-shadow-2xl">
              {emotionalHook}
            </p>
          </div>

          {/* CTA Button */}
          <div
            className={cn(
              'transition-all duration-1000 delay-700',
              hookVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            <Button
              onClick={scrollToSection}
              variant="hero"
              size="xl"
              className={cn(
                'group mt-8 transition-all duration-300 hover:scale-105',
                getCtaGlowClass()
              )}
            >
              {ctaText}
              <CtaIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </div>

        {/* Scroll indicator (only on first section) */}
        {index === 0 && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-[3] animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-3 bg-white/50 rounded-full" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
