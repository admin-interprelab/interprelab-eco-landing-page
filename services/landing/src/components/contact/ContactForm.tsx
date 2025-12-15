import React, { useState } from 'react';
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Label, Textarea, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/lib/ui";
import { Send, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { contactSchema } from "@/lib/validations";
import { inquiryTypes } from "@/data/contact";

export const ContactForm = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    inquiryType: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validated = contactSchema.parse({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        organization: formData.organization,
        inquiryType: formData.inquiryType,
        message: formData.message,
      });

      const { error } = await supabase
        .from('contacts')
        .insert([{
          user_id: user?.id || null,
          name: validated.name,
          email: validated.email,
          phone: validated.phone || null,
          organization: validated.organization || null,
          inquiry_type: validated.inquiryType,
          message: validated.message,
        }]);

      if (error) throw error;

      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        organization: "",
        inquiryType: "",
        message: "",
      });
    } catch (err) {
      const error = err as { errors?: { message: string }[]; message?: string };
      if (error.errors) {
        toast({
          title: "Validation Error",
          description: error.errors[0]?.message || "Please check your input.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: error.message || "Failed to send message. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card className="glass border-border/50 animate-fade-in-up">
      <CardHeader>
        <CardTitle className="font-serif text-3xl flex items-center gap-2 text-foreground">
          <MessageSquare className="w-7 h-7 text-nobel-gold" />
          Send us a message
        </CardTitle>
        <p className="text-muted-foreground mt-2">
          Fill out the form below and we'll get back to you within 24 hours.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Your full name"
                className="glass border-border/50 focus:border-nobel-gold/50"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="your.email@example.com"
                className="glass border-border/50 focus:border-nobel-gold/50"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+1 (555) 123-4567"
                className="glass border-border/50 focus:border-nobel-gold/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="organization" className="text-foreground">Organization</Label>
              <Input
                id="organization"
                value={formData.organization}
                onChange={(e) => handleInputChange("organization", e.target.value)}
                placeholder="Your organization name"
                className="glass border-border/50 focus:border-nobel-gold/50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="inquiryType" className="text-foreground">Type of Inquiry *</Label>
            <Select value={formData.inquiryType} onValueChange={(value) => handleInputChange("inquiryType", value)}>
              <SelectTrigger className="glass border-border/50">
                <SelectValue placeholder="Select inquiry type" />
              </SelectTrigger>
              <SelectContent>
                {inquiryTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-foreground">Message *</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              placeholder="Tell us about your needs, questions, or how we can help..."
              rows={6}
              className="glass border-border/50 focus:border-nobel-gold/50"
              required
            />
          </div>

          <Button 
            type="submit" 
            size="lg" 
            className="w-full bg-nobel-gold hover:bg-nobel-gold/90 text-white font-medium"
            disabled={isSubmitting}
          >
            <Send className="w-5 h-5 mr-2" />
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
