import { callRecords } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Phone, Video } from 'lucide-react';

export default function RecentCalls() {
  const recentCalls = callRecords.slice(0, 5);
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

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
                    ? <Video className="h-4 w-4 text-muted-foreground" aria-label="VRI" />
                    : <Phone className="h-4 w-4 text-muted-foreground" aria-label="OPI" />}
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
