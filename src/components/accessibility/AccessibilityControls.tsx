import React, { useState } from 'react';
import { Settings, Eye, Volume2, Palette, Type, Focus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { useTherapeuticAria } from './TherapeuticAriaProvider';

export const AccessibilityControls: React.FC = () => {
  const { preferences, updatePreference, resetPreferences, isHighStressMode, setHighStressMode } = useAccessibility();
  const { announce } = useTherapeuticAria();
  const [isOpen, setIsOpen] = useState(false);

  const handlePreferenceChange = <K extends keyof typeof preferences>(
    key: K,
    value: typeof preferences[K],
    announcement?: string
  ) => {
    updatePreference(key, value);
    if (announcement) {
      announce(announcement, 'low');
    }
  };

  const handleStressModeToggle = () => {
    const newMode = !isHighStressMode;
    setHighStressMode(newMode);
    announce(
      newMode
        ? 'High stress mode activated. Interface simplified for better focus.'
        : 'High stress mode deactivated. Full interface restored.',
      'medium'
    );
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-9 w-9 px-0 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm"
          aria-label="Accessibility settings and calming options"
        >
          <Settings className="h-4 w-4" />
          <span className="sr-only">Accessibility Controls</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-80 bg-white/10 backdrop-blur-md border border-white/20"
      >
        <DropdownMenuLabel className="text-white font-medium">
          Accessibility & Comfort Settings
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/20" />

        {/* High Stress Mode Toggle */}
        <DropdownMenuCheckboxItem
          checked={isHighStressMode}
          onCheckedChange={handleStressModeToggle}
          className="text-white hover:bg-white/20"
        >
          <Focus className="mr-2 h-4 w-4" />
          High Stress Mode (Simplified Interface)
        </DropdownMenuCheckboxItem>

        <DropdownMenuSeparator className="bg-white/20" />

        {/* Visual Comfort Options */}
        <DropdownMenuLabel className="text-white/80 text-xs">
          Visual Comfort
        </DropdownMenuLabel>

        <DropdownMenuCheckboxItem
          checked={preferences.calmingMode}
          onCheckedChange={(checked) =>
            handlePreferenceChange('calmingMode', checked,
              checked ? 'Calming mode enabled. Reduced visual noise.' : 'Calming mode disabled.'
            )
          }
          className="text-white hover:bg-white/20"
        >
          <Eye className="mr-2 h-4 w-4" />
          Calming Mode (Reduced Visual Noise)
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          checked={preferences.reducedMotion}
          onCheckedChange={(checked) =>
            handlePreferenceChange('reducedMotion', checked,
              checked ? 'Reduced motion enabled. Animations minimized.' : 'Reduced motion disabled.'
            )
          }
          className="text-white hover:bg-white/20"
        >
          <Eye className="mr-2 h-4 w-4" />
          Reduce Motion & Animations
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          checked={preferences.highContrast}
          onCheckedChange={(checked) =>
            handlePreferenceChange('highContrast', checked,
              checked ? 'High contrast enabled. Better visibility.' : 'High contrast disabled.'
            )
          }
          className="text-white hover:bg-white/20"
        >
          <Eye className="mr-2 h-4 w-4" />
          High Contrast Mode
        </DropdownMenuCheckboxItem>

        <DropdownMenuSeparator className="bg-white/20" />

        {/* Color Theme Selection */}
        <DropdownMenuLabel className="text-white/80 text-xs">
          Color Theme
        </DropdownMenuLabel>

        <DropdownMenuRadioGroup
          value={preferences.colorTheme}
          onValueChange={(value) =>
            handlePreferenceChange('colorTheme', value as 'standard' | 'calming' | 'high-contrast' | 'warm', `${value} theme selected.`)
          }
        >
          <DropdownMenuRadioItem value="standard" className="text-white hover:bg-white/20">
            <Palette className="mr-2 h-4 w-4" />
            Standard Theme
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="calming" className="text-white hover:bg-white/20">
            <Palette className="mr-2 h-4 w-4" />
            Calming Theme (Soft Blues & Greens)
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="warm" className="text-white hover:bg-white/20">
            <Palette className="mr-2 h-4 w-4" />
            Warm Theme (Oranges & Yellows)
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="high-contrast" className="text-white hover:bg-white/20">
            <Palette className="mr-2 h-4 w-4" />
            High Contrast Theme
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator className="bg-white/20" />

        {/* Font Size Selection */}
        <DropdownMenuLabel className="text-white/80 text-xs">
          Text Size
        </DropdownMenuLabel>

        <DropdownMenuRadioGroup
          value={preferences.fontSize}
          onValueChange={(value) =>
            handlePreferenceChange('fontSize', value as 'small' | 'medium' | 'large' | 'extra-large', `Font size changed to ${value}.`)
          }
        >
          <DropdownMenuRadioItem value="small" className="text-white hover:bg-white/20">
            <Type className="mr-2 h-4 w-4" />
            Small Text
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="medium" className="text-white hover:bg-white/20">
            <Type className="mr-2 h-4 w-4" />
            Medium Text (Default)
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="large" className="text-white hover:bg-white/20">
            <Type className="mr-2 h-4 w-4" />
            Large Text
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="extra-large" className="text-white hover:bg-white/20">
            <Type className="mr-2 h-4 w-4" />
            Extra Large Text
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator className="bg-white/20" />

        {/* Audio Sensitivity */}
        <DropdownMenuLabel className="text-white/80 text-xs">
          Audio Sensitivity
        </DropdownMenuLabel>

        <DropdownMenuRadioGroup
          value={preferences.audioSensitivity}
          onValueChange={(value) =>
            handlePreferenceChange('audioSensitivity', value as 'normal' | 'reduced' | 'none', `Audio sensitivity set to ${value}.`)
          }
        >
          <DropdownMenuRadioItem value="normal" className="text-white hover:bg-white/20">
            <Volume2 className="mr-2 h-4 w-4" />
            Normal Audio
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="reduced" className="text-white hover:bg-white/20">
            <Volume2 className="mr-2 h-4 w-4" />
            Reduced Audio
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="none" className="text-white hover:bg-white/20">
            <Volume2 className="mr-2 h-4 w-4" />
            No Audio
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator className="bg-white/20" />

        {/* Reset Button */}
        <DropdownMenuItem
          onClick={() => {
            resetPreferences();
            announce('Accessibility preferences reset to defaults.', 'medium');
          }}
          className="text-white hover:bg-white/20"
        >
          Reset to Defaults
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
