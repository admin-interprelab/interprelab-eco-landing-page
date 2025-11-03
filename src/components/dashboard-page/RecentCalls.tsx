/**
 * Recent Calls Component
 */

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { formatCurrency, formatDuration } from './utils';
import { DATE_FORMATS, EMPTY_STATES } from './constants';
import type { RecentCallsProps } from './types';

/**
 * RecentCalls Component
 *
 * Recent calls display with:
 * - Call details and timestamps
 * - Earnings and duration
 * - Click handling
 * - Empty state
 */
export const RecentCalls = React.memo<RecentCallsProps>(({
  calls,
  currency,
  title = "Recent Calls",
  description = "Your latest interpretation sessions",
  onCallClick,
  className = "",
}) => {
  const handleCallClick = (call: any) => {
    if (onCallClick) {
      onCallClick(call);
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {calls.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground font-medium">
                {EMPTY_STATES.NO_CALLS.title}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {EMPTY_STATES.NO_CALLS.description}
              </p>
            </div>
          ) : (
            calls.map((call) => (
              <div
                key={call.id}
                className={`flex items-center justify-between p-4 border rounded-lg transition-colors ${
                  onCallClick
                    ? 'hover:bg-muted/50 cursor-pointer'
                    : ''
                }`}
                onClick={() => handleCallClick(call)}
              >
                <div className="flex-1">
                  <div className="font-medium">
                    {format(new Date(call.start_time), DATE_FORMATS.CALL_DISPLAY)}
                  </div>
                  {call.client_name && (
                    <div className="text-sm text-muted-foreground mt-1">
                      Client: {call.client_name}
                    </div>
                  )}
                  {call.call_type && (
                    <div className="text-sm text-muted-foreground">
                      Type: {call.call_type}
                    </div>
                  )}
                  {call.notes && (
                    <div className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {call.notes}
                    </div>
                  )}
                </div>
                <div className="text-right ml-4">
                  <div className="font-semibold">
                    {formatCurrency(parseFloat(call.earnings), currency)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatDuration(call.duration_seconds)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
});
