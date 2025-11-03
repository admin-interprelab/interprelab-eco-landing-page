/**
 * Call Notes Component
 */

import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import type { CallNotesProps } from './types';
import { DEFAULT_NOTES_PLACEHOLDER, VALIDATION_RULES } from './constants';
import { validateNotes } from './utils';

/**
 * Call Notes Component
 *
 * Text area for adding notes during or after a call
 */
export const CallNotes = ({
  className = '',
  notes,
  onNotesChange,
  placeholder = DEFAULT_NOTES_PLACEHOLDER,
  maxLength = VALIDATION_RULES.maxNotesLength,
  autoSave = true,
}: CallNotesProps) => {
  const isValid = validateNotes(notes, maxLength);
  const remainingChars = maxLength - notes.length;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNotes = e.target.value;
    if (validateNotes(newNotes, maxLength)) {
      onNotesChange(newNotes);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Call Notes (Optional)</label>
        <div className="flex items-center gap-2">
          {autoSave && notes.length > 0 && (
            <Badge variant="outline" className="text-xs">
              Auto-saving
            </Badge>
          )}
          <span className={`text-xs ${remainingChars < 50 ? 'text-warning' : 'text-muted-foreground'}`}>
            {remainingChars} characters remaining
          </span>
        </div>
      </div>

      <Textarea
        placeholder={placeholder}
        value={notes}
        onChange={handleChange}
        rows={4}
        className={`resize-none ${!isValid ? 'border-destructive' : ''}`}
        maxLength={maxLength}
      />

      {!isValid && (
        <p className="text-xs text-destructive">
          Notes cannot exceed {maxLength} characters
        </p>
      )}
    </div>
  );
};
