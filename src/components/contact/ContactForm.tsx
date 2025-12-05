/**
 * Contact Form Component
 */

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Send, MessageSquare } from 'lucide-react';
import { useContactForm, useContactAnalytics } from './hooks';
import { DEFAULT_INQUIRY_TYPES } from './constants';
import type { ContactFormProps } from './types';

/**
 * ContactForm Component
 *
 * Contact form with:
 * - Form validation and submission
 * - Customizable inquiry types
 * - Analytics tracking
 * - Loading states
 * - Error handling
 */
export const ContactForm = React.memo<ContactFormProps>(({
  onSubmit,
  inquiryTypes = DEFAULT_INQUIRY_TYPES,
  title = "Send us a message",
  description = "Fill out the form below and we'll get back to you within 24 hours.",
  className = "",
}) => {
  const {
    formData,
    isSubmitting,
    handleInputChange,
    handleSubmit,
  } = useContactForm(onSubmit);

  const { trackFormInteraction } = useContactAnalytics();

  const handleFieldFocus = (field: string) => {
    trackFormInteraction(field);
  };

  return (
    <Card className={`glass border-border/50 ${className}`}>
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-primary" />
          {title}
        </CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                onFocus={() => handleFieldFocus("name")}
                placeholder="Your full name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                onFocus={() => handleFieldFocus("email")}
                placeholder="your.email@example.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                onFocus={() => handleFieldFocus("phone")}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="organization">Organization</Label>
              <Input
                id="organization"
                value={formData.organization}
                onChange={(e) => handleInputChange("organization", e.target.value)}
                onFocus={() => handleFieldFocus("organization")}
                placeholder="Your organization name"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="inquiryType">Type of Inquiry *</Label>
            <Select
              value={formData.inquiryType}
              onValueChange={(value) => handleInputChange("inquiryType", value)}
            >
              <SelectTrigger onFocus={() => handleFieldFocus("inquiryType")}>
                <SelectValue placeholder="Select inquiry type" />
              </SelectTrigger>
              <SelectContent>
                {inquiryTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              onFocus={() => handleFieldFocus("message")}
              placeholder="Tell us about your needs, questions, or how we can help..."
              rows={6}
              required
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full glass-button"
            disabled={isSubmitting}
          >
            <Send className="w-5 h-5 mr-2" />
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
});
