import React, { useState, useRef, useEffect, Suspense } from 'react';

interface LazyComponentProps {
  children: React.ReactNode;
  fallback?: React.ComponentType;
  threshold?: number;
  rootMargin?: string;
  className?: string;
}

const DefaultFallback = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

export const LazyComponent: React.FC<LazyComponentProps> = ({
  children,
  fallback: Fallback = DefaultFallback,
  threshold = 0.1,
  rootMargin = '50px',
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true);
          setHasLoaded(true);
          // Disconnect observer after first load to prevent re-triggering
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, hasLoaded]);

  return (
    <div ref={elementRef} className={className}>
      {isVisible ? (
        <Suspense fallback={<Fallback />}>
          {children}
        </Suspense>
      ) : (
        <Fallback />
      )}
    </div>
  );
};

export default LazyComponent;
