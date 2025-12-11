import { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/lib/ui';
import { Button } from '@/lib/ui';
import { Play, Square, Timer } from 'lucide-react';
import { getRoundedDuration } from '../../utils';
import { useToast } from '@/lib/ui';
import { Label } from '@/lib/ui';
import { RadioGroup, RadioGroupItem } from '@/lib/ui';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/lib/ui';
import type { CallRecord } from '../../types';

interface ManualLogProps {
  onCallAdded: (call: Omit<CallRecord, 'id' | 'earnings'>) => Promise<CallRecord>;
}


export default function ManualLog({ onCallAdded }: ManualLogProps) {
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [platform, setPlatform] = useState<'Platform A' | 'Platform B' | 'Platform C'>('Platform A');
  const [callType, setCallType] = useState<'VRI' | 'OPI'>('VRI');

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();


  useEffect(() => {
    if (isActive && startTime) {
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTime.getTime());
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, startTime]);

  const handleStart = () => {
    setStartTime(new Date());
    setIsActive(true);
  };

  const handleStop = () => {
    setIsActive(false);
    if (startTime) {
        const endTime = new Date();
        const duration = getRoundedDuration(startTime, endTime);

        const newRecord: Omit<CallRecord, 'id' | 'earnings'> = {
            startTime,
            endTime,
            duration,
            platform,
            callType,
        };

        onCallAdded(newRecord).then(() => {
            toast({
                title: "Call Logged",
                description: `Your ${callType} call on ${platform} has been logged with a duration of ${duration} minutes.`,
            });
        });
    }
    setElapsedTime(0);
    setStartTime(null);
  };

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Manual Call Log</CardTitle>
        <CardDescription>Start and stop timer to log your calls</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-center bg-gradient-to-br from-nobel-gold/5 to-nobel-gold/10 rounded-xl p-8 border border-nobel-gold/20">
            <Timer className="mr-4 h-8 w-8 text-nobel-gold" />
            <div className="text-5xl font-bold font-mono tracking-wider text-foreground">
                {formatTime(elapsedTime)}
            </div>
        </div>
        <div className="space-y-4">
            <div className="space-y-2">
                <Label className="text-sm font-medium">Platform</Label>
                 <Select value={platform} onValueChange={(value) => setPlatform(value as CallRecord['platform'])} disabled={isActive}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Platform A">Platform A</SelectItem>
                        <SelectItem value="Platform B">Platform B</SelectItem>
                        <SelectItem value="Platform C">Platform C</SelectItem>
                      </SelectContent>
                    </Select>
            </div>
            <div className="space-y-2">
                <Label className="text-sm font-medium">Call Type</Label>
                <RadioGroup value={callType} onValueChange={(value) => setCallType(value as CallRecord['callType'])} className="flex gap-4 pt-1" disabled={isActive}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="VRI" id="vri" />
                        <Label htmlFor="vri" className="font-normal cursor-pointer">VRI (Video)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="OPI" id="opi" />
                        <Label htmlFor="opi" className="font-normal cursor-pointer">OPI (Phone)</Label>
                    </div>
                </RadioGroup>
            </div>
        </div>
      </CardContent>
      <CardFooter>
        {!isActive ? (
          <Button onClick={handleStart} className="w-full" size="lg">
            <Play className="mr-2 h-5 w-5" />
            Start Call
          </Button>
        ) : (
          <Button onClick={handleStop} className="w-full" variant="destructive" size="lg">
            <Square className="mr-2 h-5 w-5" />
            Stop & Log Call
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}



