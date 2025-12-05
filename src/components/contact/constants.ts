/**
 * Contact Component Constants
 */

import { MapPin, Phone, Mail, Clock } from "lucide-react";
import type { ContactInfo } from './types';

export const DEFAULT_INQUIRY_TYPES = [
  { value: "general", label: "General Information" },
  { value: "demo", label: "Request Demo" },
  { value: "partnership", label: "Partnership Opportunities" },
  { value: "training", label: "Training Programs" },
  { value: "technical", label: "Technical Support" },
  { value: "pricing", label: "Pricing & Plans" },
];

export const DEFAULT_CONTACT_INFO: ContactInfo[] = [
  {
    icon: MapPin,
    title: "Address",
    content: [
      "1234 Innovation Drive",
      "Houston, TX 77002",
      "United States"
    ]
  },
  {
    icon: Phone,
    title: "Phone",
    content: "+1 (713) 555-0123"
  },
  {
    icon: Mail,
    title: "Email",
    content: "admin.ceo@interprelab.com"
  },
  {
    icon: Clock,
    title: "Business Hours",
    content: [
      "Monday - Friday: 9:00 AM - 6:00 PM CST",
      "Saturday: 10:00 AM - 2:00 PM CST",
      "Sunday: Closed"
    ]
  }
];

export const FORM_VALIDATION_MESSAGES = {
  REQUIRED_FIELD: "This field is required",
  INVALID_EMAIL: "Please enter a valid email address",
  INVALID_PHONE: "Please enter a valid phone number",
  MESSAGE_TOO_SHORT: "Message must be at least 10 characters",
  SUBMISSION_SUCCESS: "Thank you for contacting us. We'll get back to you soon.",
  SUBMISSION_ERROR: "Failed to send message. Please try again.",
  VALIDATION_ERROR: "Please check your input.",
};

export const RESPONSE_TIME_INFO = {
  AVERAGE_RESPONSE: "4 hours",
  DESCRIPTION: "For urgent inquiries or immediate assistance, please call us directly during business hours. We typically respond to emails within 24 hours.",
};
