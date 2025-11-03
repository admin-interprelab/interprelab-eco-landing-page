/**
 * Contact Component Types
 */

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  organization: string;
  inquiryType: string;
  message: string;
}

export interface ContactInfo {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  content: string | string[];
}

export interface ContactPageProps {
  className?: string;
  customContent?: {
    hero?: {
      title?: string;
      description?: string;
      badge?: string;
    };
    contactInfo?: ContactInfo[];
    formConfig?: {
      title?: string;
      description?: string;
      inquiryTypes?: Array<{ value: string; label: string }>;
    };
  };
  onFormSubmit?: (data: ContactFormData) => Promise<void>;
}

export interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => Promise<void>;
  inquiryTypes?: Array<{ value: string; label: string }>;
  title?: string;
  description?: string;
  className?: string;
}

export interface ContactInfoProps {
  contactInfo?: ContactInfo[];
  className?: string;
}

export interface ContactHeroProps {
  title?: string;
  description?: string;
  badge?: string;
  className?: string;
}
