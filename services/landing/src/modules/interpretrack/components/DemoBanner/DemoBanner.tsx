import { Alert, AlertDescription } from '@interprelab/ui';
import { Button } from '@interprelab/ui';
import { Sparkles, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DemoBanner = () => {
  return (
    <Alert className="border-primary/50 bg-gradient-to-r from-primary/10 via-success/10 to-primary/10 animate-fade-in">
      <Sparkles className="h-5 w-5 text-primary" />
      <AlertDescription className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground mb-1">
            You're viewing demo data with realistic interpreter call logs
          </p>
          <p className="text-xs text-muted-foreground">
            Sign up to track your actual earnings, ensure payment accuracy, and manage your business!
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild size="sm" variant="outline">
            <Link to="/signup">
              Create Free Account
            </Link>
          </Button>
          <Button asChild size="sm" className="bg-gradient-to-r from-primary to-success text-white">
            <Link to="/pricing">
              <TrendingUp className="w-4 h-4 mr-2" />
              View Pricing
            </Link>
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default DemoBanner;



