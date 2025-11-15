import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';
import type { VideoHeroSection } from './hero/types';

interface VideoData {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  posterUrl?: string;
}

interface VideoSectionProps {
  sections: VideoHeroSection[];
}

const VideoSection: React.FC<VideoSectionProps> = ({ sections }) => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const videos: VideoData[] = sections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    videoUrl: section.videoSrc,
    posterUrl: section.posterSrc,
  }));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setCurrentVideo(index);
            // Auto-play video when it comes into view
            const video = videoRefs.current[index];
            if (video) {
              video.play().catch(() => {
                // Auto-play failed, user interaction required
                setIsPlaying(false);
              });
              setIsPlaying(true);
            }
          } else {
            // Pause video when it goes out of view
            const video = videoRefs.current[index];
            if (video) {
              video.pause();
              if (index === currentVideo) {
                setIsPlaying(false);
              }
            }
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '-10% 0px -10% 0px'
      }
    );

    videoRefs.current.forEach((video) => {
      if (video) {
        observer.observe(video);
      }
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) {
          observer.unobserve(video);
        }
      });
    };
  }, [currentVideo]);

  const togglePlayPause = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div
      ref={sectionRef}
      className="relative w-full"
      style={{ scrollSnapType: 'y mandatory' }}
    >
      {videos.map((video, index) => (
        <div
          key={video.id}
          className="relative w-full h-screen flex items-center justify-center"
          style={{ scrollSnapAlign: 'start' }}
        >
          {/* Video Background */}
          <video
            ref={(el) => (videoRefs.current[index] = el)}
            className="absolute inset-0 w-full h-full object-cover"
            poster={video.posterUrl}
            muted
            loop
            playsInline
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            <source src={video.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40" />

          {/* Content */}
          <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              {video.title}
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in-delay">
              {video.description}
            </p>

            {/* Play/Pause Button */}
            <button
              onClick={() => togglePlayPause(index)}
              className="group relative inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 backdrop-blur-sm rounded-full border-2 border-white border-opacity-30 hover:bg-opacity-30 transition-all duration-300 animate-fade-in-delay-2"
            >
              {currentVideo === index && isPlaying ? (
                <Pause className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
              ) : (
                <Play className="w-8 h-8 text-white ml-1 group-hover:scale-110 transition-transform" />
              )}
            </button>
          </div>

          {/* Video Progress Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {videos.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === currentVideo
                    ? 'bg-white scale-125'
                    : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                }`}
              />
            ))}
          </div>

          {/* Scroll Indicator (only on first video) */}
          {index === 0 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 border-2 border-white border-opacity-50 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white bg-opacity-50 rounded-full mt-2 animate-pulse" />
              </div>
            </div>
          )}
        </div>
      ))}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.3s both;
        }

        .animate-fade-in-delay-2 {
          animation: fade-in 1s ease-out 0.6s both;
        }

        /* Smooth scrolling for snap */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default VideoSection;
