/**
 * Smoothly scrolls to a section by ID with optional offset
 * @param sectionId - The ID of the element to scroll to
 * @param offset - Offset from top in pixels (default: 80 for nav bar)
 */
export const scrollToSection = (sectionId: string, offset: number = 80) => {
  const element = document.getElementById(sectionId);
  if (!element) {
    console.warn(`Element with ID "${sectionId}" not found`);
    return;
  }

  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  });

  // Add highlight pulse animation
  element.classList.add('highlight-pulse');
  setTimeout(() => {
    element.classList.remove('highlight-pulse');
  }, 2000);
};

/**
 * Tracks scroll depth for analytics
 */
export const trackScrollDepth = () => {
  const scrollPercentage = Math.round(
    (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
  );
  return scrollPercentage;
};

/**
 * Checks if element is in viewport
 */
export const isInViewport = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};
