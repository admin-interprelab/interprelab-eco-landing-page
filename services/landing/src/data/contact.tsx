import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const contactInfo = [
  {
    icon: MapPin,
    title: "Address",
    lines: [
      "1234 Innovation Drive",
      "Houston, TX 77002",
      "United States"
    ]
  },
  {
    icon: Phone,
    title: "Phone",
    lines: ["+1 (713) 555-0123"]
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["admin.ceo@interprelab.com"]
  },
  {
    icon: Clock,
    title: "Business Hours",
    lines: [
      "Monday - Friday: 9:00 AM - 6:00 PM CST",
      "Saturday: 10:00 AM - 2:00 PM CST",
      "Sunday: Closed"
    ]
  }
];

export const quickResponseInfo = {
  text: "For urgent inquiries or immediate assistance, please call us directly during business hours. We typically respond to emails within 24 hours.",
  averageTime: "4 hours"
};

export const inquiryTypes = [
  { value: "general", label: "General Information" },
  { value: "demo", label: "Request Demo" },
  { value: "partnership", label: "Partnership Opportunities" },
  { value: "training", label: "Training Programs" },
  { value: "technical", label: "Technical Support" },
  { value: "pricing", label: "Pricing & Plans" }
];
