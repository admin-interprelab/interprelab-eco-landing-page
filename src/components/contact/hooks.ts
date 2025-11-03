/**
 * Contact Component Hooks
 */

import { useState, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { contactSchema } from '@/lib/validations';
import type { ContactFormData } from './types';
import {
  validateContactForm,
  sanitizeFormData,
  createInitialFormState,
  hasUnsavedChanges
} from './utils';
import { FORM_VALIDATION_MESSAGES } from './constants';

/**
 * Hook for managing contact form state and submission
 */
export const useContactForm = (onSubmit?: (data: ContactFormData) => Promise<void>) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>(createInitialFormState());
  const [initialData] = useState<ContactFormData>(createInitialFormState());

  const handleInputChange = useCallback((field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(createInitialFormState());
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Sanitize and validate data
      const sanitizedData = sanitizeFormData(formData);
      const validationErrors = validateContactForm(sanitizedData);

      if (validationErrors.length > 0) {
        toast({
          title: "Validation Error",
          description: validationErrors[0],
          variant: "destructive",
        });
        return;
      }

      // Use custom submit handler if provided
      if (onSubmit) {
        await onSubmit(sanitizedData);
      } else {
        // Default submission to Supabase
        const validated = contactSchema.parse(sanitizedData);

        const { error } = await supabase.from("contacts").insert([
          {
            user_id: user?.id || null,
            name: validated.name,
            email: validated.email,
            phone: validated.phone || null,
            organization: validated.organization || null,
            inquiry_type: validated.inquiryType,
            message: validated.message,
          },
        ]);

        if (error) throw error;
      }

      toast({
        title: "Message Sent!",
        description: FORM_VALIDATION_MESSAGES.SUBMISSION_SUCCESS,
      });

      resetForm();
    } catch (error: unknown) {
      console.error('Contact form submission error:', error);

      if (error && typeof error === "object" && "errors" in error) {
        const zodError = error as { errors: Array<{ message: string }> };
        toast({
          title: "Validation Error",
          description: zodError.errors[0]?.message || FORM_VALIDATION_MESSAGES.VALIDATION_ERROR,
          variant: "destructive",
        });
      } else if (error && typeof error === "object" && "message" in error) {
        const standardError = error as { message: string };
        toast({
          title: "Error",
          description: standardError.message || FORM_VALIDATION_MESSAGES.SUBMISSION_ERROR,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: FORM_VALIDATION_MESSAGES.SUBMISSION_ERROR,
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, onSubmit, user?.id, toast, resetForm]);

  const isDirty = hasUnsavedChanges(formData, initialData);

  return {
    formData,
    isSubmitting,
    isDirty,
    handleInputChange,
    handleSubmit,
    resetForm,
  };
};

/**
 * Hook for contact page analytics
 */
export const useContactAnalytics = () => {
  const trackPageView = useCallback((page: string) => {
    // Analytics tracking implementation
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: page,
        page_location: window.location.href,
      });
    }
  }, []);

  const trackFormSubmission = useCallback((inquiryType: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'form_submit', {
        event_category: 'Contact',
        event_label: inquiryType,
      });
    }
  }, []);

  const trackFormInteraction = useCallback((field: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'form_interaction', {
        event_category: 'Contact',
        event_label: field,
      });
    }
  }, []);

  return {
    trackPageView,
    trackFormSubmission,
    trackFormInteraction,
  };
};

/**
 * Hook for managing contact info display
 */
export const useContactInfo = () => {
  const [isBusinessHours, setIsBusinessHours] = useState(false);

  useEffect(() => {
    const checkBusinessHours = () => {
      const now = new Date();
      const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
      const hour = now.getHours();

      // Monday-Friday 9AM-6PM CST, Saturday 10AM-2PM CST
      const isWeekday = day >= 1 && day <= 5;
      const isSaturday = day === 6;
      const isWeekdayHours = hour >= 9 && hour < 18;
      const isSaturdayHours = hour >= 10 && hour < 14;

      setIsBusinessHours(
        (isWeekday && isWeekdayHours) || (isSaturday && isSaturdayHours)
      );
    };

    checkBusinessHours();
    const interval = setInterval(checkBusinessHours, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  return {
    isBusinessHours,
  };
};
