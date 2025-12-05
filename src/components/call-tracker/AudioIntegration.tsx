/**
 * Audio Integration Component
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import type { AudioIntegrationProps } from './types';
import { AUDIO_INTEGRATION_FEATURES } from './constants';

/**
 * Audio Integration Component
 *
 * Information about audio integration capabilities
 */
export const AudioIntegration = ({
  className = '',
  title = 'Audio Integration',
  description = 'The call tracker integrates with your browser\'s audio system and InterpreCoach',
  features = AUDIO_INTEGRATION_FEATURES,
}: AudioIntegrationProps) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground">
            This tracker uses your existing browser audio without creating a new audio instance.
            It seamlessly integrates with InterpreCoach and your interpreting platform to automatically
            detect and track call durations.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
