/**
 * Contact Components Export
 */

export { Contact } from './Contact';
export { ContactHero } from './ContactHero';
export { ContactForm } from './ContactForm';
export { ContactInfo } from './ContactInfo';

// Hooks
export {
  useContactForm,
  useContactAnalytics,
  useContactInfo
} from './hooks';

// Types
export type {
  ContactFormData,
  ContactInfo as ContactInfoType,
  ContactPageProps,
  ContactFormProps,
  ContactInfoProps,
  ContactHeroProps,
} from './types';

// Constants
export {
  DEFAULT_INQUIRY_TYPES,
  DEFAULT_CONTACT_INFO,
  FORM_VALIDATION_MESSAGES,
  RESPONSE_TIME_INFO,
} from './constants';

// Utils
export {
  validateContactForm,
  isValidEmail,
  isValidPhone,
  formatPhoneNumber,
  sanitizeFormData,
  createInitialFormState,
  hasUnsavedChanges,
} from './utils';
