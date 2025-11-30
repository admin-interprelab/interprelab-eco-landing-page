import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Plus, Play, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const MockScenarios = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [scenarioTitle, setScenarioTitle] = useState('');
  const [scenarioDescription, setScenarioDescription] = useState('');

  return (
    <div className="space-y-6">
      <Card className="glass border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Play className="w-6 h-6 text-primary" />
              Mock Interpretation Scenarios
            </div>
            <Button onClick={() => setIsCreating(!isCreating)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Scenario
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isCreating && (
            <Card className="glass border-primary/20 animate-fade-in">
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Scenario Title</label>
                  <Input
                    value={scenarioTitle}
                    onChange={(e) => setScenarioTitle(e.target.value)}
                    placeholder="e.g., Medical Consultation - Diabetes"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Scenario Description</label>
                  <Textarea
                    value={scenarioDescription}
                    onChange={(e) => setScenarioDescription(e.target.value)}
                    placeholder="Describe the scenario context, participants, and key vocabulary..."
                    className="min-h-[120px]"
                  />
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1">Save Scenario</Button>
                  <Button variant="outline" onClick={() => setIsCreating(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Your Scenarios</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Sample Scenario Cards */}
              {[1, 2, 3].map((i) => (
                <Card key={i} className="glass border-border/50 hover:border-primary/50 transition-all duration-300 hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold mb-2">Sample Scenario {i}</h4>
                        <p className="text-sm text-muted-foreground">
                          Medical consultation scenario with AI-powered conversation
                        </p>
                      </div>
                      <Badge>Medical</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Clock className="w-4 h-4" />
                      <span>8 sec response time</span>
                    </div>
                    <Button className="w-full">
                      <Play className="w-4 h-4 mr-2" />
                      Start Practice
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="glass border-border/50 border-l-4 border-l-primary">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-2">How Mock Scenarios Work</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• AI generates live conversation based on your scenario</li>
            <li>• You have 8 seconds maximum to respond before AI improvises</li>
            <li>• AI speaks in either source (English) or target language</li>
            <li>• AI verifies if you heard and interpreted correctly</li>
            <li>• Customizable accents, gender, and difficulty levels</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
