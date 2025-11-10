import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Settings as SettingsIcon, Save } from 'lucide-react';

export const StudySettings = () => {
  const [settings, setSettings] = useState({
    difficulty: 'intermediate',
    specialty: 'medical',
    targetLanguage: 'spanish',
    providerAccent: 'neutral',
    providerGender: 'any',
    responseTime: '8',
    autoSave: true,
    audioFeedback: true,
  });

  const handleSave = () => {
    // TODO: Save settings
    console.log('Saving settings:', settings);
  };

  return (
    <Card className="glass border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SettingsIcon className="w-6 h-6 text-primary" />
          Study Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Difficulty Level */}
          <div className="space-y-2">
            <Label>Difficulty Level</Label>
            <Select
              value={settings.difficulty}
              onValueChange={(value) => setSettings({ ...settings, difficulty: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
                <SelectItem value="expert">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Specialty */}
          <div className="space-y-2">
            <Label>Specialty/Field</Label>
            <Select
              value={settings.specialty}
              onValueChange={(value) => setSettings({ ...settings, specialty: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="medical">Medical</SelectItem>
                <SelectItem value="legal">Legal</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="social-services">Social Services</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Target Language */}
          <div className="space-y-2">
            <Label>Target Language</Label>
            <Select
              value={settings.targetLanguage}
              onValueChange={(value) => setSettings({ ...settings, targetLanguage: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="spanish">Spanish</SelectItem>
                <SelectItem value="french">French</SelectItem>
                <SelectItem value="mandarin">Mandarin</SelectItem>
                <SelectItem value="arabic">Arabic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Provider Accent */}
          <div className="space-y-2">
            <Label>Provider Accent</Label>
            <Select
              value={settings.providerAccent}
              onValueChange={(value) => setSettings({ ...settings, providerAccent: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="neutral">Neutral</SelectItem>
                <SelectItem value="regional">Regional</SelectItem>
                <SelectItem value="native">Native</SelectItem>
                <SelectItem value="mixed">Mixed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Provider Gender */}
          <div className="space-y-2">
            <Label>Provider Gender</Label>
            <Select
              value={settings.providerGender}
              onValueChange={(value) => setSettings({ ...settings, providerGender: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Response Time */}
          <div className="space-y-2">
            <Label>Max Response Time (seconds)</Label>
            <Input
              type="number"
              value={settings.responseTime}
              onChange={(e) => setSettings({ ...settings, responseTime: e.target.value })}
              min="5"
              max="15"
            />
          </div>
        </div>

        {/* Preferred Vocabulary */}
        <div className="space-y-2">
          <Label>Preferred Vocabulary to Practice</Label>
          <Input
            placeholder="Enter terms separated by commas (e.g., diagnosis, treatment, prescription)"
          />
        </div>

        {/* Toggles */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Auto-save progress</Label>
              <p className="text-sm text-muted-foreground">
                Automatically save your study progress
              </p>
            </div>
            <Switch
              checked={settings.autoSave}
              onCheckedChange={(checked) => setSettings({ ...settings, autoSave: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Audio feedback</Label>
              <p className="text-sm text-muted-foreground">
                Get audio confirmation for correct answers
              </p>
            </div>
            <Switch
              checked={settings.audioFeedback}
              onCheckedChange={(checked) => setSettings({ ...settings, audioFeedback: checked })}
            />
          </div>
        </div>

        <Button onClick={handleSave} className="w-full">
          <Save className="w-4 h-4 mr-2" />
          Save Preferences
        </Button>
      </CardContent>
    </Card>
  );
};
