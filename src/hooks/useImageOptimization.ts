import { useState, useEffect } from 'react';
import {
  checkWebPSupport,
  getOptimizedImageUrl,
  generateSrcSet,
  preloadImage
} from '@/lib/imageOptimization';

interface UseImageOptimizationOptions {
  src: string;
  breakpoints?: number[];
  quality?: number;
  preload?: boolean;
}

interface UseImageOptimizationReturn {
  optimizedSrc: string;
  webpSrcSet: string;
  fallbackSrcSet: string;
  isWebPSupported: boolean;
  isLoading: boolean;
}

export const useImageOptimization = ({
  src,
  breakpoints = [320, 640, 768, 1024, 1280, 1536],
  quality = 80,
  preload = false
}: UseImageOptimizationOptions): UseImageOptimizationReturn => {
  const [isWebPSupported, setIsWebPSupported] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeOptimization = async () => {
      try {
        const webpSupported = await checkWebPSupport();
        setIsWebPSupported(webpSupported);

        if (preload) {
          const optimizedSrc = getOptimizedImageUrl(src, undefined, quality);
          preloadImage(optimizedSrc, 'high');
        }
      } catch (error) {
        console.warn('Failed to initialize image optimization:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeOptimization();
  }, [src, quality, preload]);

  const optimizedSrc = getOptimizedImageUrl(src, undefined, quality);
  const webpSrcSet = generateSrcSet(src, breakpoints, 'webp');
  const fallbackSrcSet = generateSrcSet(src, breakpoints, 'original');

  return {
    optimizedSrc,
    webpSrcSet,
    fallbackSrcSet,
    isWebPSupported,
    isLoading
  };
};
