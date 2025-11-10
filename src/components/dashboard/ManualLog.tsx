import { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Square, Timer } from 'lucide-react';
import { addCallRecord, getRoundedDuration } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import type { CallRecord } from '@/lib/types';


export default function ManualLog() {
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

        addCallRecord(newRecord);

        toast({
            title: "Call Logged",
            description: `Your ${callType} call on ${platform} has been logged with a duration of ${duration} minutes.`,
        });

        window.location.reload();
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
    <Card>
      <CardHeader>
        <CardTitle>Manual Call Log</CardTitle>
        <CardDescription>Manually start and stop a timer to log your calls.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center bg-muted/50 rounded-lg p-6">
            <Timer className="mr-4 h-10 w-10 text-primary" />
            <div className="text-4xl font-bold font-mono w-48 text-center">
                {formatTime(elapsedTime)}
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label>Platform</Label>
                 <Select onValueChange={(value) => setPlatform(value as CallRecord['platform'])} defaultValue={platform} disabled={isActive}>
                      <SelectTrigger>
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
                <Label>Call Type</Label>
                <RadioGroup defaultValue={callType} onValueChange={(value) => setCallType(value as CallRecord['callType'])} className="flex items-center space-x-2 pt-2" disabled={isActive}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="VRI" id="vri" />
                        <Label htmlFor="vri">VRI</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="OPI" id="opi" />
                        <Label htmlFor="opi">OPI</Label>
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
