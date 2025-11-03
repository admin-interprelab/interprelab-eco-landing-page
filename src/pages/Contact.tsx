/**
 * Refactored Contact Page
 * Now uses modular architecture for better maintainability
 */

import { Contact as ModularContact } from '@/components/contact';

/**
 * Contact Page Component
 *
 * Wrapper component that maintains backward compatibility
 * while using the new modular architecture
 */
const Contact = () => {
  return <ModularContact />;
};

export default Contact;
