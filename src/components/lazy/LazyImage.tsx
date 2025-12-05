import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useImageOptimization } from '@/hooks/useImageOptimization';
import { generateBlurPlaceholder } from '@/lib/imageOptimization';

interface LazyImageProps {
  src: string;
  alt: string;
  placeholder?: string;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  onLoad?: () => void;
  onError?: () => void;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  placeholder,
  className = '',
  threshold = 0.1,
  rootMargin = '50px',
  sizes = '100vw',
  priority = false,
  quality = 80,
  onLoad,
  onError,
}) => {
  const [isVisible, setIsVisible] = useState(priority);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    optimizedSrc,
    webpSrcSet,
    fallbackSrcSet,
    isWebPSupported
  } = useImageOptimization({
    src,
    quality,
    preload: priority
  });

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

  // Generate a blur placeholder if none provided
  const blurPlaceholder = placeholder || generateBlurPlaceholder();

  return (
    <div ref={containerRef} className={cn('relative overflow-hidden', className)}>
      {/* Blur placeholder */}
      {!isLoaded && !hasError && (
        <img
          src={blurPlaceholder}
          alt=""
          className={cn(
            'absolute inset-0 w-full h-full object-cover transition-opacity duration-300',
            isVisible ? 'opacity-100' : 'opacity-0'
          )}
        />
      )}

      {/* Main optimized image */}
      {isVisible && (
        <picture>
          {isWebPSupported && webpSrcSet && (
            <source
              srcSet={webpSrcSet}
              type="image/webp"
              sizes={sizes}
            />
          )}
          {fallbackSrcSet && (
            <source
              srcSet={fallbackSrcSet}
              sizes={sizes}
            />
          )}
          <img
            ref={imgRef}
            src={optimizedSrc}
            alt={alt}
            sizes={sizes}
            onLoad={handleLoad}
            onError={handleError}
            loading={priority ? 'eager' : 'lazy'}
            className={cn(
              'w-full h-full object-cover transition-opacity duration-300',
              isLoaded ? 'opacity-100' : 'opacity-0'
            )}
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
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
    </div>
  );
};

export default LazyImage;
