import { useState, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  Settings as SettingsIcon,
  Save,
  RotateCcw,
  User,
  Globe,
  Clock,
  Volume2,
  BookOpen,
  Zap
} from 'lucide-react';

// Constants for better maintainability
const DEFAULT_RESPONSE_TIME = 8;
const MIN_RESPONSE_TIME = 5;
const MAX_RESPONSE_TIME = 15;

// Types for better type safety
interface StudyPreferences {
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  specialty: 'medical' | 'legal' | 'business' | 'education' | 'social-services' | 'general';
  targetLanguage: 'spanish' | 'french' | 'mandarin' | 'arabic' | 'portuguese' | 'german';
  providerAccent: 'neutral' | 'regional' | 'native' | 'mixed';
  providerGender: 'any' | 'male' | 'female';
  responseTime: number;
  autoSave: boolean;
  audioFeedback: boolean;
  visualCues: boolean;
  adaptiveDifficulty: boolean;
  preferredVocabulary: string;
  studyGoals: string;
}

// Configuration data with enhanced metadata
const DIFFICULTY_LEVELS = [
  { value: 'beginner', label: 'Beginner', description: 'Basic vocabulary and simple concepts' },
  { value: 'intermediate', label: 'Intermediate', description: 'Standard professional terminology' },
  { value: 'advanced', label: 'Advanced', description: 'Complex technical terms and concepts' },
  { value: 'expert', label: 'Expert', description: 'Specialized and nuanced terminology' },
] as const;

const SPECIALTIES = [
  { value: 'medical', label: 'Medical', icon: '🏥', description: 'Healthcare and medical terminology' },
  { value: 'legal', label: 'Legal', icon: '⚖️', description: 'Legal and judicial terminology' },
  { value: 'business', label: 'Business', icon: '💼', description: 'Corporate and financial terms' },
  { value: 'education', label: 'Education', icon: '🎓', description: 'Academic and educational content' },
  { value: 'social-services', label: 'Social Services', icon: '🤝', description: 'Community and social work terms' },
  { value: 'general', label: 'General', icon: '🌐', description: 'Everyday and general vocabulary' },
] as const;

const TARGET_LANGUAGES = [
  { value: 'spanish', label: 'Spanish', flag: '🇪🇸', speakers: '500M+' },
  { value: 'french', label: 'French', flag: '🇫🇷', speakers: '280M+' },
  { value: 'mandarin', label: 'Mandarin', flag: '🇨🇳', speakers: '918M+' },
  { value: 'arabic', label: 'Arabic', flag: '🇸🇦', speakers: '422M+' },
  { value: 'portuguese', label: 'Portuguese', flag: '🇵🇹', speakers: '260M+' },
  { value: 'german', label: 'German', flag: '🇩🇪', speakers: '100M+' },
] as const;

const PROVIDER_ACCENTS = [
  { value: 'neutral', label: 'Neutral', description: 'Standard pronunciation' },
  { value: 'regional', label: 'Regional', description: 'Regional variations' },
  { value: 'native', label: 'Native', description: 'Native speaker accent' },
  { value: 'mixed', label: 'Mixed', description: 'Variety of accents' },
] as const;

const PROVIDER_GENDERS = [
  { value: 'any', label: 'Any', description: 'Mixed gender voices' },
  { value: 'male', label: 'Male', description: 'Male voices only' },
  { value: 'female', label: 'Female', description: 'Female voices only' },
] as const;

/**
 * Settings Section Component
 * Reusable section wrapper with consistent styling
 */
interface SettingsSectionProps {
  title: string;
  description?: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  children: React.ReactNode;
}

const SettingsSection = ({ title, description, icon: Icon, children }: SettingsSectionProps) => (
  <div className="space-y-4">
    <div className="flex items-center gap-2">
      <Icon className="w-5 h-5 text-primary" />
      <div>
        <h3 className="font-semibold">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
    <div className="pl-7 space-y-4">
      {children}
    </div>
  </div>
);

/**
 * Enhanced Select Component
 * Select with additional metadata display
 */
interface EnhancedSelectProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  options: readonly { value: string; label: string; description?: string; icon?: string; flag?: string; speakers?: string }[];
  placeholder?: string;
}

const EnhancedSelect = ({ label, value, onValueChange, options, placeholder }: EnhancedSelectProps) => (
  <div className="space-y-2">
    <Label>{label}</Label>
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            <div className="flex items-center gap-2">
              {option.icon && <span>{option.icon}</span>}
              {option.flag && <span>{option.flag}</span>}
              <span>{option.label}</span>
              {option.speakers && (
                <Badge variant="outline" className="text-xs">
                  {option.speakers}
                </Badge>
              )}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    {value && options.find(opt => opt.value === value)?.description && (
      <p className="text-xs text-muted-foreground">
        {options.find(opt => opt.value === value)?.description}
      </p>
    )}
  </div>
);

/**
 * Response Time Slider Component
 * Custom slider for response time with visual feedback
 */
interface ResponseTimeSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const ResponseTimeSlider = ({ value, onChange }: ResponseTimeSliderProps) => (
  <div className="space-y-3">
    <div className="flex items-center justify-between">
      <Label>Max Response Time</Label>
      <Badge variant="outline" className="text-xs">
        {value} seconds
      </Badge>
    </div>
    <div className="space-y-2">
      <Input
        type="range"
        min={MIN_RESPONSE_TIME}
        max={MAX_RESPONSE_TIME}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Fast ({MIN_RESPONSE_TIME}s)</span>
        <span>Moderate ({DEFAULT_RESPONSE_TIME}s)</span>
        <span>Relaxed ({MAX_RESPONSE_TIME}s)</span>
      </div>
    </div>
    <p className="text-xs text-muted-foreground">
      {value <= 6 && "Quick response - challenging but builds speed"}
      {value > 6 && value <= 10 && "Balanced pace - good for learning"}
      {value > 10 && "Relaxed pace - focus on accuracy"}
    </p>
  </div>
);

/**
 * Toggle Setting Component
 * Reusable toggle with description
 */
interface ToggleSettingProps {
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const ToggleSetting = ({ label, description, checked, onCheckedChange, icon: Icon }: ToggleSettingProps) => (
  <div className="flex items-center justify-between">
    <div className="space-y-0.5 flex-1">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-muted-foreground" />}
        <Label className="font-medium">{label}</Label>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
    <Switch checked={checked} onCheckedChange={onCheckedChange} />
  </div>
);

/**
 * Custom hook for managing study settings
 * Handles state management and validation
 */
const useStudySettings = () => {
  const [settings, setSettings] = useState<StudyPreferences>({
    difficulty: 'intermediate',
    specialty: 'medical',
    targetLanguage: 'spanish',
    providerAccent: 'neutral',
    providerGender: 'any',
    responseTime: DEFAULT_RESPONSE_TIME,
    autoSave: true,
    audioFeedback: true,
    visualCues: true,
    adaptiveDifficulty: false,
    preferredVocabulary: '',
    studyGoals: '',
  });

  const [hasChanges, setHasChanges] = useState(false);
  const { toast } = useToast();

  const updateSetting = useCallback(<K extends keyof StudyPreferences>(
    key: K,
    value: StudyPreferences[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  }, []);

  const resetToDefaults = useCallback(() => {
    setSettings({
      difficulty: 'intermediate',
      specialty: 'medical',
      targetLanguage: 'spanish',
      providerAccent: 'neutral',
      providerGender: 'any',
      responseTime: DEFAULT_RESPONSE_TIME,
      autoSave: true,
      audioFeedback: true,
      visualCues: true,
      adaptiveDifficulty: false,
      preferredVocabulary: '',
      studyGoals: '',
    });
    setHasChanges(true);
  }, []);

  const saveSettings = useCallback(async () => {
    try {
      // TODO: Implement actual save logic (localStorage, API, etc.)
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call

      toast({
        title: "Settings Saved",
        description: "Your study preferences have been updated successfully.",
      });

      setHasChanges(false);
    } catch (error) {
      toast({
        title: "Error Saving Settings",
        description: "There was an error saving your preferences. Please try again.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const settingsValidation = useMemo(() => ({
    isValid: settings.responseTime >= MIN_RESPONSE_TIME && settings.responseTime <= MAX_RESPONSE_TIME,
    errors: settings.responseTime < MIN_RESPONSE_TIME || settings.responseTime > MAX_RESPONSE_TIME
      ? [`Response time must be between ${MIN_RESPONSE_TIME} and ${MAX_RESPONSE_TIME} seconds`]
      : [],
  }), [settings.responseTime]);

  return {
    settings,
    hasChanges,
    updateSetting,
    resetToDefaults,
    saveSettings,
    settingsValidation,
  };
};

/**
 * Study Settings Component
 *
 * A comprehensive study preferences configuration system that provides:
 * - Difficulty level and specialty selection
 * - Target language and provider preferences
 * - Response time and feedback settings
 * - Custom vocabulary and study goals
 * - Visual and audio preference controls
 *
 * Features:
 * - Enhanced select components with metadata
 * - Visual response time slider with feedback
 * - Toggle settings with detailed descriptions
 * - Settings validation and error handling
 * - Auto-save and manual save options
 * - Reset to defaults functionality
 * - Responsive design with organized sections
 *
 * Settings Categories:
 * - Learning Preferences: Difficulty, specialty, target language
 * - Provider Settings: Accent, gender, response time
 * - Study Experience: Audio, visual cues, adaptive difficulty
 * - Personal Content: Custom vocabulary, study goals
 */
export const StudySettings = () => {
  const {
    settings,
    hasChanges,
    updateSetting,
    resetToDefaults,
    saveSettings,
    settingsValidation,
  } = useStudySettings();

  return (
    <div className="space-y-6">
      <Card className="glass border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SettingsIcon className="w-6 h-6 text-primary" />
              <div>
                <CardTitle>Study Preferences</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Customize your learning experience for optimal results
                </p>
              </div>
            </div>
            {hasChanges && (
              <Badge variant="secondary" className="text-xs">
                Unsaved Changes
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Learning Preferences Section */}
          <SettingsSection
            title="Learning Preferences"
            description="Configure your difficulty level and study focus"
            icon={BookOpen}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <EnhancedSelect
                label="Difficulty Level"
                value={settings.difficulty}
                onValueChange={(value) => updateSetting('difficulty', value as StudyPreferences['difficulty'])}
                options={DIFFICULTY_LEVELS}
              />

              <EnhancedSelect
                label="Specialty/Field"
                value={settings.specialty}
                onValueChange={(value) => updateSetting('specialty', value as StudyPreferences['specialty'])}
                options={SPECIALTIES}
              />
            </div>

            <EnhancedSelect
              label="Target Language"
              value={settings.targetLanguage}
              onValueChange={(value) => updateSetting('targetLanguage', value as StudyPreferences['targetLanguage'])}
              options={TARGET_LANGUAGES}
            />
          </SettingsSection>

          {/* Provider Settings Section */}
          <SettingsSection
            title="Provider Settings"
            description="Customize voice and interaction preferences"
            icon={User}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <EnhancedSelect
                label="Provider Accent"
                value={settings.providerAccent}
                onValueChange={(value) => updateSetting('providerAccent', value as StudyPreferences['providerAccent'])}
                options={PROVIDER_ACCENTS}
              />

              <EnhancedSelect
                label="Provider Gender"
                value={settings.providerGender}
                onValueChange={(value) => updateSetting('providerGender', value as StudyPreferences['providerGender'])}
                options={PROVIDER_GENDERS}
              />
            </div>

            <ResponseTimeSlider
              value={settings.responseTime}
              onChange={(value) => updateSetting('responseTime', value)}
            />
          </SettingsSection>

          {/* Study Experience Section */}
          <SettingsSection
            title="Study Experience"
            description="Enhance your learning with audio and visual aids"
            icon={Zap}
          >
            <div className="space-y-4">
              <ToggleSetting
                label="Auto-save progress"
                description="Automatically save your study progress and performance"
                checked={settings.autoSave}
                onCheckedChange={(checked) => updateSetting('autoSave', checked)}
                icon={Save}
              />

              <ToggleSetting
                label="Audio feedback"
                description="Get audio confirmation and pronunciation for terms"
                checked={settings.audioFeedback}
                onCheckedChange={(checked) => updateSetting('audioFeedback', checked)}
                icon={Volume2}
              />

              <ToggleSetting
                label="Visual cues"
                description="Show visual indicators for difficulty and progress"
                checked={settings.visualCues}
                onCheckedChange={(checked) => updateSetting('visualCues', checked)}
              />

              <ToggleSetting
                label="Adaptive difficulty"
                description="Automatically adjust difficulty based on your performance"
                checked={settings.adaptiveDifficulty}
                onCheckedChange={(checked) => updateSetting('adaptiveDifficulty', checked)}
              />
            </div>
          </SettingsSection>

          {/* Personal Content Section */}
          <SettingsSection
            title="Personal Content"
            description="Add your own vocabulary and set study goals"
            icon={Globe}
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Preferred Vocabulary to Practice</Label>
                <Textarea
                  placeholder="Enter terms separated by commas (e.g., diagnosis, treatment, prescription, anesthesia, surgery)"
                  value={settings.preferredVocabulary}
                  onChange={(e) => updateSetting('preferredVocabulary', e.target.value)}
                  className="min-h-[80px]"
                />
                <p className="text-xs text-muted-foreground">
                  Add specific terms you want to focus on during your study sessions
                </p>
              </div>

              <div className="space-y-2">
                <Label>Study Goals</Label>
                <Textarea
                  placeholder="Describe your learning objectives (e.g., prepare for medical interpretation certification, improve legal terminology)"
                  value={settings.studyGoals}
                  onChange={(e) => updateSetting('studyGoals', e.target.value)}
                  className="min-h-[80px]"
                />
                <p className="text-xs text-muted-foreground">
                  Set clear goals to help tailor your study experience
                </p>
              </div>
            </div>
          </SettingsSection>

          {/* Validation Errors */}
          {!settingsValidation.isValid && (
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-destructive" />
                <span className="text-sm font-medium text-destructive">Settings Validation</span>
              </div>
              <ul className="text-sm text-destructive space-y-1">
                {settingsValidation.errors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            <Button
              onClick={saveSettings}
              className="flex-1"
              disabled={!hasChanges || !settingsValidation.isValid}
            >
              <Save className="w-4 h-4 mr-2" />
              Save Preferences
            </Button>

            <Button
              variant="outline"
              onClick={resetToDefaults}
              className="flex-1"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset to Defaults
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Settings Summary */}
      <Card className="glass border-border/50 border-l-4 border-l-primary">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <SettingsIcon className="w-5 h-5 text-primary" />
            Current Configuration Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium">Difficulty:</span>{' '}
              <Badge variant="outline" className="text-xs ml-1">
                {DIFFICULTY_LEVELS.find(d => d.value === settings.difficulty)?.label}
              </Badge>
            </div>
            <div>
              <span className="font-medium">Specialty:</span>{' '}
              <Badge variant="outline" className="text-xs ml-1">
                {SPECIALTIES.find(s => s.value === settings.specialty)?.label}
              </Badge>
            </div>
            <div>
              <span className="font-medium">Language:</span>{' '}
              <Badge variant="outline" className="text-xs ml-1">
                {TARGET_LANGUAGES.find(l => l.value === settings.targetLanguage)?.label}
              </Badge>
            </div>
            <div>
              <span className="font-medium">Response Time:</span>{' '}
              <Badge variant="outline" className="text-xs ml-1">
                {settings.responseTime}s
              </Badge>
            </div>
            <div>
              <span className="font-medium">Audio:</span>{' '}
              <Badge variant={settings.audioFeedback ? "default" : "secondary"} className="text-xs ml-1">
                {settings.audioFeedback ? 'Enabled' : 'Disabled'}
              </Badge>
            </div>
            <div>
              <span className="font-medium">Auto-save:</span>{' '}
              <Badge variant={settings.autoSave ? "default" : "secondary"} className="text-xs ml-1">
                {settings.autoSave ? 'Enabled' : 'Disabled'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
