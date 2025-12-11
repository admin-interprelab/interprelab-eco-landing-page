import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/lib/ui';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/lib/ui';
import { Badge } from '@/lib/ui';
import { Link } from 'react-router-dom';
import { Button } from '@/lib/ui';
import { Phone, Video } from 'lucide-react';
import { formatCurrency } from '../../utils';

import type { CallRecord } from '../../types';

interface RecentCallsProps {
  calls: CallRecord[];
}

export default function RecentCalls({ calls }: RecentCallsProps) {
  const recentCalls = calls.slice(0, 5);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Calls</CardTitle>
          <CardDescription>Your last 5 logged calls.</CardDescription>
        </div>
        <Link to="/call-log">
          <Button variant="outline" size="sm">View All</Button>
        </Link>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Start Time</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead className="text-right">Earnings</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentCalls.map((call) => (
              <TableRow key={call.id}>
                <TableCell>
                  {call.callType === 'VRI'
                    ? <Video className="h-4 w-4 text-muted-foreground" />
                    : <Phone className="h-4 w-4 text-muted-foreground" />}
                </TableCell>
                <TableCell>{call.startTime.toLocaleString()}</TableCell>
                <TableCell>{call.duration} min</TableCell>
                <TableCell>
                  <Badge variant="secondary">{call.platform}</Badge>
                </TableCell>
                <TableCell className="text-right text-accent font-medium">{formatCurrency(call.earnings)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}



