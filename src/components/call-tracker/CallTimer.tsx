/**
 * Call Timer Component
 */

import { Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { CallTimerProps } from './types';
import { formatDuration, formatCurrency } from './utils';

/**
 * Call Timer Component
 *
 * Displays the current call timer and earnings
 */
export const CallTimer = ({
  className = '',
  elapsedSeconds,
  isTracking,
  currentEarnings,
  userSettings,
}: CallTimerProps) => {
  const displayTime = formatDuration(elapsedSeconds);
  const formattedEarnings = userSettings
    ? formatCurrency(currentEarnings, userSettings.preferred_currency)
    : formatCurrency(currentEarnings);

  return (
    <Card className={`${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-6 w-6" />
          Current Session
        </CardTitle>
        <CardDescription>
          Track your interpretation calls and earnings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className={`text-6xl font-mono font-bold mb-4 ${isTracking ? 'animate-pulse' : ''}`}>
            {displayTime}
          </div>
          {isTracking && (
            <div className="text-2xl text-muted-foreground">
              Earnings: {formattedEarnings}
            </div>
          )}
        </div>

        {userSettings && (
          <div className="text-center text-sm text-muted-foreground pt-4 border-t">
            Current Rate: {formatCurrency(userSettings.pay_rate, userSettings.preferred_currency)} {userSettings.pay_rate_type === 'per_hour' ? 'per hour' : 'per minute'}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
