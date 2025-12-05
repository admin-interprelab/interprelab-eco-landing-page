/**
 * Index Page Component Hooks
 */

import { useCallback } from 'react';

/**
 * Hook for index page analytics
 */
export const useIndexAnalytics = () => {
  const trackPageView = useCallback(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: 'Index',
        page_location: window.location.href,
      });
    }
  }, []);

  const trackSectionView = useCallback((section: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'section_view', {
        event_category: 'Index',
        event_label: section,
      });
    }
  }, []);

  const trackInteraction = useCallback((action: string, element: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'interaction', {
        event_category: 'Index',
        event_label: element,
        custom_parameter: action,
      });
    }
  }, []);

  return {
    trackPageView,
    trackSectionView,
    trackInteraction,
  };
};
