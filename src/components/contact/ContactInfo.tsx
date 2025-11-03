/**
 * Contact Info Component
 */

import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DEFAULT_CONTACT_INFO, RESPONSE_TIME_INFO } from './constants';
import { useContactInfo } from './hooks';
import type { ContactInfoProps } from './types';

/**
 * ContactInfo Component
 *
 * Contact information display with:
 * - Company contact details
 * - Business hours with live status
 * - Response time information
 * - Customizable contact info
 */
export const ContactInfo = React.memo<ContactInfoProps>(({
  contactInfo = DEFAULT_CONTACT_INFO,
  className = "",
}) => {
  const { isBusinessHours } = useContactInfo();

  return (
    <div className={`space-y-6 ${className}`}>
      <Card className="glass border-border/50">
        <CardHeader>
          <CardTitle className="text-xl">Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {contactInfo.map((info, index) => {
            const IconComponent = info.icon;
            const isBusinessHoursInfo = info.title === "Business Hours";

            return (
              <div key={index} className="flex items-start gap-3">
                <IconComponent className="w-5 h-5 text-primary mt-1" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{info.title}</p>
                    {isBusinessHoursInfo && (
                      <Badge
                        variant={isBusinessHours ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {isBusinessHours ? "Open Now" : "Closed"}
                      </Badge>
                    )}
                  </div>
                  {Array.isArray(info.content) ? (
                    <div className="text-sm text-muted-foreground">
                      {info.content.map((line, lineIndex) => (
                        <p key={lineIndex}>{line}</p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {info.content}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card className="glass border-border/50">
        <CardHeader>
          <CardTitle className="text-xl">Quick Response</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            {RESPONSE_TIME_INFO.DESCRIPTION}
          </p>
          <Badge className="bg-primary/10 text-primary border-primary/20">
            Average response time: {RESPONSE_TIME_INFO.AVERAGE_RESPONSE}
          </Badge>
        </CardContent>
      </Card>
    </div>
  );
});
