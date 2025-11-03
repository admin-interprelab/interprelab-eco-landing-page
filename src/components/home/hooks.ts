/**
 * Home Page Component Hooks
 */

import { useCallback } from 'react';

/**
 * Hook for home page analytics
 */
export const useHomeAnalytics = () => {
  const trackPageView = useCallback(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: 'Home',
        page_location: window.location.href,
      });
    }
  }, []);

  const trackVideoInteraction = useCallback((videoSrc: string, action: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'video_interaction', {
        event_category: 'Home',
        event_label: videoSrc,
        custom_parameter: action,
      });
    }
  }, []);

  const trackSectionView = useCallback((section: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'section_view', {
        event_category: 'Home',
        event_label: section,
      });
    }
  }, []);

  return {
    trackPageView,
    trackVideoInteraction,
    trackSectionView,
  };
};
