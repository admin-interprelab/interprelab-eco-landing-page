import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
  threshold?: number;
  rootMargin?: string;
}

interface ImageSource {
  srcSet: string;
  type: string;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  className = '',
  sizes = '100vw',
  priority = false,
  placeholder,
  onLoad,
  onError,
  threshold = 0.1,
  rootMargin = '50px',
}) => {
  const [isVisible, setIsVisible] = useState(priority);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate WebP and fallback sources
  const generateSources = (baseSrc: string): ImageSource[] => {
    const sources: ImageSource[] = [];

    // Extract file extension and base path
    const lastDotIndex = baseSrc.lastIndexOf('.');
    const basePath = lastDotIndex > -1 ? baseSrc.substring(0, lastDotIndex) : baseSrc;
    const extension = lastDotIndex > -1 ? baseSrc.substring(lastDotIndex) : '';

    // Generate responsive breakpoints
    const breakpoints = [320, 640, 768, 1024, 1280, 1536];

    // WebP sources
    const webpSrcSet = breakpoints
      .map(width => `${basePath}-${width}w.webp ${width}w`)
      .join(', ');

    if (webpSrcSet) {
      sources.push({
        srcSet: webpSrcSet,
        type: 'image/webp'
      });
    }

    // Fallback sources (original format)
    const fallbackSrcSet = breakpoints
      .map(width => `${basePath}-${width}w${extension} ${width}w`)
      .join(', ');

    if (fallbackSrcSet) {
      sources.push({
        srcSet: fallbackSrcSet,
        type: extension === '.jpg' || extension === '.jpeg' ? 'image/jpeg' :
              extension === '.png' ? 'image/png' :
              'image/*'
      });
    }

    return sources;
  };

  useEffect(() => {
    if (priority) return; // Skip intersection observer for priority images

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [priority, threshold, rootMargin]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Generate blur placeholder if none provided
  const blurPlaceholder = placeholder || `data:image/svg+xml;base64,${btoa(
    `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f3f4f6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#e5e7eb;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)"/>
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#9ca3af" font-family="Arial, sans-serif" font-size="14">Loading...</text>
    </svg>`
  )}`;

  const sources = generateSources(src);

  return (
    <div ref={containerRef} className={cn('relative overflow-hidden', className)}>
      {/* Blur placeholder */}
      {!isLoaded && !hasError && (
        <img
          src={blurPlaceholder}
          alt=""
          className={cn(
            'absolute inset-0 w-full h-full object-cover transition-opacity duration-500',
            'filter blur-sm scale-110',
            isVisible ? 'opacity-100' : 'opacity-0'
          )}
        />
      )}

      {/* Main responsive image */}
      {isVisible && (
        <picture>
          {sources.map((source, index) => (
            <source
              key={index}
              srcSet={source.srcSet}
              type={source.type}
              sizes={sizes}
            />
          ))}
          <img
            src={src}
            alt={alt}
            sizes={sizes}
            onLoad={handleLoad}
            onError={handleError}
            className={cn(
              'w-full h-full object-cover transition-opacity duration-500',
              isLoaded ? 'opacity-100' : 'opacity-0'
            )}
            loading={priority ? 'eager' : 'lazy'}
          />
        </picture>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500">
          <div className="text-center">
            <div className="text-2xl mb-2">📷</div>
            <div className="text-sm">Failed to load image</div>
          </div>
        </div>
      )}

      {/* Loading indicator */}
      {isVisible && !isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50/80">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
    </div>
  );
};

export default ResponsiveImage;
