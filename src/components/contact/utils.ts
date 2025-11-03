/**
 * Contact Component Utilities
 */

import type { ContactFormData } from './types';

/**
 * Validates contact form data
 */
export const validateContactForm = (data: ContactFormData): string[] => {
  const errors: string[] = [];

  if (!data.name.trim()) {
    errors.push("Name is required");
  }

  if (!data.email.trim()) {
    errors.push("Email is required");
  } else if (!isValidEmail(data.email)) {
    errors.push("Please enter a valid email address");
  }

  if (!data.inquiryType) {
    errors.push("Please select an inquiry type");
  }

  if (!data.message.trim()) {
    errors.push("Message is required");
  } else if (data.message.trim().length < 10) {
    errors.push("Message must be at least 10 characters");
  }

  if (data.phone && !isValidPhone(data.phone)) {
    errors.push("Please enter a valid phone number");
  }

  return errors;
};

/**
 * Validates email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates phone number format
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  return phoneRegex.test(cleanPhone);
};

/**
 * Formats phone number for display
 */
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');

  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  } else if (cleaned.length === 11 && cleaned[0] === '1') {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }

  return phone;
};

/**
 * Sanitizes form data
 */
export const sanitizeFormData = (data: ContactFormData): ContactFormData => {
  return {
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    phone: data.phone.trim(),
    organization: data.organization.trim(),
    inquiryType: data.inquiryType,
    message: data.message.trim(),
  };
};

/**
 * Creates initial form state
 */
export const createInitialFormState = (): ContactFormData => ({
  name: "",
  email: "",
  phone: "",
  organization: "",
  inquiryType: "",
  message: "",
});

/**
 * Checks if form has unsaved changes
 */
export const hasUnsavedChanges = (
  current: ContactFormData,
  initial: ContactFormData
): boolean => {
  return Object.keys(current).some(
    key => current[key as keyof ContactFormData] !== initial[key as keyof ContactFormData]
  );
};
