import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, AlertCircle, RefreshCw, BookOpen, MessageSquare, Chrome } from 'lucide-react';

interface Integration {
  name: string;
  status: 'connected' | 'disconnected' | 'syncing';
  lastSync?: string;
  icon: React.ReactNode;
  dataPoints?: number;
}

interface IntegrationStatusProps {
  integrations: Integration[];
}

export default function IntegrationStatus({ integrations }: IntegrationStatusProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return (
          <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Connected
          </Badge>
        );
      case 'syncing':
        return (
          <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">
            <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
            Syncing
          </Badge>
        );
      case 'disconnected':
        return (
          <Badge variant="secondary" className="bg-muted text-muted-foreground">
            <XCircle className="h-3 w-3 mr-1" />
            Disconnected
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Integration Status</CardTitle>
        <CardDescription>Connected apps and data sources</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {integrations.map((integration) => (
          <div
            key={integration.name}
            className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-muted/30 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-background border border-border flex items-center justify-center">
                {integration.icon}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold">{integration.name}</h4>
                  {getStatusBadge(integration.status)}
                </div>
                {integration.lastSync && (
                  <p className="text-xs text-muted-foreground">
                    Last sync: {new Date(integration.lastSync).toLocaleString()}
                  </p>
                )}
                {integration.dataPoints !== undefined && (
                  <p className="text-xs text-muted-foreground">
                    {integration.dataPoints} data points collected
                  </p>
                )}
              </div>
            </div>
            <Button size="sm" variant={integration.status === 'connected' ? 'outline' : 'default'}>
              {integration.status === 'connected' ? 'Configure' : 'Connect'}
            </Button>
          </div>
        ))}

        {integrations.length === 0 && (
          <div className="text-center py-8">
            <AlertCircle className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
            <p className="text-sm text-muted-foreground">No integrations configured</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
