import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function ScenarioGenerator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Scenario Generator</CardTitle>
        <CardDescription>
          Practice with AI-generated medical interpretation scenarios
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center p-8 text-muted-foreground">
          <p>Scenario generator coming soon</p>
        </div>
      </CardContent>
    </Card>
  );
}
