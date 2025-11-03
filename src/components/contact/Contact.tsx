/**
 * Contact Main Component
 */

import React from 'react';
import { Layout } from '@/components/Layout';
import { ContactHero } from './ContactHero';
import { ContactForm } from './ContactForm';
import { ContactInfo } from './ContactInfo';
import { useContactAnalytics } from './hooks';
import { DEFAULT_INQUIRY_TYPES, DEFAULT_CONTACT_INFO } from './constants';
import type { ContactPageProps } from './types';

/**
 * Contact Component
 *
 * Main contact page with:
 * - Hero section
 * - Contact form with validation
 * - Contact information display
 * - Analytics tracking
 * - Responsive layout
 */
export const Contact = React.memo<ContactPageProps>(({
  className = '',
  customContent,
  onFormSubmit,
}) => {
  const { trackPageView } = useContactAnalytics();

  // Track page view on mount
  React.useEffect(() => {
    trackPageView('contact_main');
  }, [trackPageView]);

  return (
    <Layout className={className}>
      {/* Hero Section */}
      <ContactHero
        title={customContent?.hero?.title}
        description={customContent?.hero?.description}
        badge={customContent?.hero?.badge}
      />

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ContactForm
                onSubmit={onFormSubmit}
                inquiryTypes={customContent?.formConfig?.inquiryTypes || DEFAULT_INQUIRY_TYPES}
                title={customContent?.formConfig?.title}
                description={customContent?.formConfig?.description}
              />
            </div>

            {/* Contact Information */}
            <ContactInfo
              contactInfo={customContent?.contactInfo || DEFAULT_CONTACT_INFO}
            />
          </div>
        </div>
      </section>
    </Layout>
  );
});
