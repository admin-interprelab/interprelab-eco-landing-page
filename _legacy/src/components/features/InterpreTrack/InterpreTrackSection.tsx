import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Clock,
  DollarSign,
  AlertTriangle,
  BarChart3,
  FileText,
  Globe,
  Shield,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const InterpreTrackSection = () => {
  return (
    <section className="py-32 px-6 bg-gradient-to-b from-muted/20 to-background" id="interpretrack-section">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4">
          <Badge className="glass px-6 py-3 border-primary/20">
            <Shield className="w-4 h-4 mr-2 inline" />
            InterpreTrack
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-foreground">Your Time Is Valuable.</span>
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Track Every Second.
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Smart business management hub for interpreters - protect your earnings, track your time, and
            grow your business
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {/* Personal Call Logging */}
          <Card className="glass border-border/30 hover-lift">
            <CardContent className="p-6 space-y-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-foreground">Personal Call Logging</h3>
              
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-green-500 rounded-full mt-2" />
                  <span>Automatic time tracking (start/end times)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-green-500 rounded-full mt-2" />
                  <span>Duration precision down to the second</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-green-500 rounded-full mt-2" />
                  <span>Client management & organization</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-green-500 rounded-full mt-2" />
                  <span>Automated payment verification</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-green-500 rounded-full mt-2" />
                  <span>Export professional reports for disputes</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Earnings Intelligence */}
          <Card className="glass border-border/30 hover-lift">
            <CardContent className="p-6 space-y-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-foreground">Earnings Intelligence</h3>
              
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-blue-500 rounded-full mt-2" />
                  <span>Multi-client rate management</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-blue-500 rounded-full mt-2" />
                  <span>Per-minute or per-hour configuration</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-blue-500 rounded-full mt-2" />
                  <span>Multi-currency with daily exchange rates</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-blue-500 rounded-full mt-2" />
                  <span>Smart earnings projections</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-blue-500 rounded-full mt-2" />
                  <span>Year-end tax preparation summaries</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Business Analytics */}
          <Card className="glass border-border/30 hover-lift">
            <CardContent className="p-6 space-y-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-foreground">Smart Analytics</h3>
              
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-purple-500 rounded-full mt-2" />
                  <span>Call volume statistics & trends</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-purple-500 rounded-full mt-2" />
                  <span>Peak hours analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-purple-500 rounded-full mt-2" />
                  <span>Client profitability tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-purple-500 rounded-full mt-2" />
                  <span>Rounding loss monitoring</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-purple-500 rounded-full mt-2" />
                  <span>Work-life balance alerts</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Key Features Highlight */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {/* Payment Accuracy */}
          <Card className="glass border-destructive/20 hover-lift">
            <CardContent className="p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-destructive/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Payment Verification</h3>
                  <p className="text-muted-foreground text-sm">
                    Automatic alerts for payment discrepancies. Compare your logs with provider statements and export reports to resolve differences.
                  </p>
                </div>
              </div>
              
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Your Log:</span>
                  <span className="font-bold text-foreground">47 minutes</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Provider Statement:</span>
                  <span className="font-bold text-destructive">45 minutes</span>
                </div>
                <div className="border-t border-destructive/20 pt-2 mt-2">
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-destructive">Difference:</span>
                    <span className="text-destructive">-2 min ($3.50)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Multi-Currency Support */}
          <Card className="glass border-primary/20 hover-lift">
            <CardContent className="p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Global Currency Support</h3>
                  <p className="text-muted-foreground text-sm">
                    Work with clients worldwide? Track earnings in multiple currencies with automatic daily
                    exchange rate updates.
                  </p>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                  <span className="text-muted-foreground">USD</span>
                  <span className="font-mono text-foreground">$1,250.00</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                  <span className="text-muted-foreground">EUR</span>
                  <span className="font-mono text-foreground">€1,175.50</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                  <span className="text-muted-foreground">GBP</span>
                  <span className="font-mono text-foreground">£1,010.25</span>
                </div>
                <div className="text-xs text-muted-foreground text-right mt-2">
                  Updated: Today at 12:00 PM
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Card className="glass border-border/30 max-w-3xl mx-auto">
            <CardContent className="p-8">
              <FileText className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-bold mb-4">Stop Losing Money to Rounding Errors</h3>
              <p className="text-muted-foreground mb-6">
                2-3 minutes per day = $3,000+ lost per year. Take control of your earnings with InterpreTrack.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                  <Link to="/interpretrack">
                    <Shield className="w-5 h-5 mr-2" />
                    Start Tracking Calls
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/pricing">View Pricing</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
