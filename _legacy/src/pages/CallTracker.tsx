import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useCallTracker } from '@/hooks/useCallTracker';
import { Phone, PhoneOff, Clock } from 'lucide-react';

const CallTracker = () => {
  const [notes, setNotes] = useState('');
  const {
    isTracking,
    elapsedSeconds,
    startCall,
    endCall,
    formatDuration,
    formatCurrency,
    calculateEarnings,
    userSettings,
  } = useCallTracker();

  const handleEndCall = async () => {
    await endCall(notes);
    setNotes('');
  };

  const currentEarnings = calculateEarnings(elapsedSeconds);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">Call Tracker</h1>

        <Card className="mb-8">
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
              <div className="text-6xl font-mono font-bold mb-4">
                {formatDuration(elapsedSeconds)}
              </div>
              {isTracking && (
                <div className="text-2xl text-muted-foreground">
                  Earnings: {formatCurrency(currentEarnings, userSettings?.preferred_currency)}
                </div>
              )}
            </div>

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

        <Card>
          <CardHeader>
            <CardTitle>Audio Integration</CardTitle>
            <CardDescription>
              The call tracker integrates with your browser's audio system and InterpreCoach
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This tracker uses your existing browser audio without creating a new audio instance.
              It seamlessly integrates with InterpreCoach and your interpreting platform to automatically
              detect and track call durations.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CallTracker;
