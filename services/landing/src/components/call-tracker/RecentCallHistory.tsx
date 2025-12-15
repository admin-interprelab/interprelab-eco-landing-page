import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/lib/ui/components/ui/card';
import { Badge } from '@/lib/ui/components/ui/badge';
import { Video, Phone } from 'lucide-react';
import { format } from 'date-fns';

interface RecentCall {
  id: string;
  call_type: string | null;
  duration_seconds: number | null;
  rounded_duration_seconds: number | null;
  earnings: number | null;
  notes: string | null;
  start_time: string;
}

interface RecentCallHistoryProps {
  recentCalls: RecentCall[];
  userSettings: any;
  formatDurationMinutes: (seconds: number) => string;
  formatCurrency: (amount: number, currency?: string) => string;
}

export const RecentCallHistory: React.FC<RecentCallHistoryProps> = ({
  recentCalls,
  userSettings,
  formatDurationMinutes,
  formatCurrency
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Call History</CardTitle>
        <CardDescription>Your latest interpretation sessions with full transparency</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentCalls.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No calls logged yet. Start tracking your calls to see them here.
            </p>
          ) : (
            recentCalls.map((call) => (
              <div
                key={call.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/5 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {call.call_type === 'VRI' ? (
                      <Video className="h-4 w-4 text-blue-500" />
                    ) : (
                      <Phone className="h-4 w-4 text-purple-500" />
                    )}
                    <Badge variant={call.call_type === 'VRI' ? 'default' : 'secondary'}>
                      {call.call_type}
                    </Badge>
                    <span className="font-medium text-sm">
                      {format(new Date(call.start_time), 'MMM dd, yyyy • hh:mm a')}
                    </span>
                  </div>
                  {call.notes && (
                    <div className="text-sm text-muted-foreground mt-1">{call.notes}</div>
                  )}
                  {call.rounded_duration_seconds && call.duration_seconds !== call.rounded_duration_seconds && (
                    <div className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                      Actual: {formatDurationMinutes(call.duration_seconds || 0)} • 
                      LSP Reported: {formatDurationMinutes(call.rounded_duration_seconds || 0)}
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="font-semibold">{formatCurrency(call.earnings || 0, userSettings?.preferred_currency || 'USD')}</div>
                  <div className="text-sm text-muted-foreground">
                    {formatDurationMinutes(call.duration_seconds || 0)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
