/**
 * Refactored Testimonials Component
 * Now uses modular architecture for better maintainability
 */

import { Testimonials as ModularTestimonials } from './testimonials';

/**
 * Testimonials Component
 *
 * Wrapper component that maintains backward compatibility
 * while using the new modular architecture
 */
export const Testimonials = () => {
  return <ModularTestimonials />;
};
