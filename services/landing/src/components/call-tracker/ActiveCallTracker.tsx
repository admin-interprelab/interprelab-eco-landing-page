import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/lib/ui/components/ui/card';
import { Button } from '@/lib/ui/components/ui/button';
import { Badge } from '@/lib/ui/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/lib/ui/components/ui/select';
import { Textarea } from '@/lib/ui/components/ui/textarea';
import { Clock, Phone, Video, PhoneOff } from 'lucide-react';

interface ActiveCallTrackerProps {
  isTracking: boolean;
  elapsedSeconds: number;
  callType: 'VRI' | 'OPI';
  setCallType: (type: 'VRI' | 'OPI') => void;
  notes: string;
  setNotes: (notes: string) => void;
  startCall: () => void;
  handleEndCall: () => void;
  formatDuration: (seconds: number) => string;
  formatCurrency: (amount: number, currency?: string) => string;
  currentEarnings: number;
  userSettings: any; // Using any for now to avoid deep type dependency chains, or we can export the type
}

export const ActiveCallTracker: React.FC<ActiveCallTrackerProps> = ({
  isTracking,
  elapsedSeconds,
  callType,
  setCallType,
  notes,
  setNotes,
  startCall,
  handleEndCall,
  formatDuration,
  formatCurrency,
  currentEarnings,
  userSettings
}) => {
  return (
    <Card className="mb-8 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-6 w-6" />
          {isTracking ? 'Active Session' : 'Start New Session'}
        </CardTitle>
        <CardDescription>
          Track your interpretation calls with precision and transparency
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="text-6xl font-mono font-bold mb-4 text-primary">
            {formatDuration(elapsedSeconds)}
          </div>
          {isTracking && (
            <div className="text-2xl text-muted-foreground mb-4">
              Earnings: {formatCurrency(currentEarnings, userSettings?.preferred_currency)}
            </div>
          )}
        </div>

        {!isTracking && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Call Type</label>
            <Select value={callType} onValueChange={(value: 'VRI' | 'OPI') => setCallType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="VRI">
                  <div className="flex items-center gap-2">
                    <Video className="h-4 w-4" />
                    VRI (Video Remote Interpreting)
                  </div>
                </SelectItem>
                <SelectItem value="OPI">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    OPI (Over-the-Phone Interpreting)
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {isTracking && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Call Notes (Optional)</label>
            <Textarea
              placeholder="Add notes about this call..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />
          </div>
        )}

        <div className="flex gap-4 justify-center">
          {!isTracking ? (
            <Button
              onClick={startCall}
              size="lg"
              className="w-full max-w-xs"
            >
              <Phone className="mr-2 h-5 w-5" />
              Start Call
            </Button>
          ) : (
            <Button
              onClick={handleEndCall}
              variant="destructive"
              size="lg"
              className="w-full max-w-xs"
            >
              <PhoneOff className="mr-2 h-5 w-5" />
              End Call
            </Button>
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
