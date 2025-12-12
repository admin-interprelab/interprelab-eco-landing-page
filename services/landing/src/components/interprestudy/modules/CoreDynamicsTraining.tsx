import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function CoreDynamicsTraining() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Core Dynamics Training</CardTitle>
        <CardDescription>
          Master the fundamental skills of medical interpretation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center p-8 text-muted-foreground">
          <p>Core dynamics training coming soon</p>
        </div>
      </CardContent>
    </Card>
  );
}
