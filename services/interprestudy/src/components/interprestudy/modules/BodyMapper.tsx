import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@interprelab/ui';

export function BodyMapper() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Body Mapper</CardTitle>
        <CardDescription>
          Interactive anatomy learning tool
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center p-8 text-muted-foreground">
          <p>Body mapping feature coming soon</p>
        </div>
      </CardContent>
    </Card>
  );
}
