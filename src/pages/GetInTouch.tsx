/**
 * Refactored Get In Touch Page
 * Now uses modular contact architecture for better maintainability
 */

import { Contact } from '@/components/contact';

/**
 * GetInTouch Page Component
 *
 * Simplified contact page using the modular contact architecture
 * with customized content for a more streamlined experience
 */
const GetInTouch = () => {
  const customContent = {
    hero: {
      title: "Get in Touch",
      description: "We'd love to hear from you. Send us a message and we'll get back to you as soon as possible.",
      badge: "Contact",
    },
    formConfig: {
      title: "Send us a message",
      description: "Fill out the form below and we'll respond within 24 hours.",
    },
  };

  return <Contact customContent={customContent} />;
};

export default GetInTouch;
