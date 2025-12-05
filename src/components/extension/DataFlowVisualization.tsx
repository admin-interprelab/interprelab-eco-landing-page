/**
 * Data Flow Visualization Component
 * Shows the AI processing pipeline
 */

import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface DataFlowStep {
  id: string;
  label: string;
  color: string;
  isActive?: boolean;
}

interface DataFlowVisualizationProps {
  /** Whether the pipeline is active */
  isActive: boolean;
  /** Custom steps (optional) */
  customSteps?: DataFlowStep[];
  /** Show processing indicators */
  showProcessing?: boolean;
}

const DEFAULT_STEPS: DataFlowStep[] = [
  { id: 'audio', label: 'Audio', color: 'bg-blue-500/20 text-blue-700 dark:text-blue-300' },
  { id: 'stt', label: 'STT', color: 'bg-green-500/20 text-green-700 dark:text-green-300' },
  { id: 'pii', label: 'PII Remove', color: 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300' },
  { id: 'llm', label: 'LLM', color: 'bg-purple-500/20 text-purple-700 dark:text-purple-300' },
  { id: 'ui', label: 'UI', color: 'bg-pink-500/20 text-pink-700 dark:text-pink-300' },
];

export const DataFlowVisualization = ({
  isActive,
  customSteps,
  showProcessing = true,
}: DataFlowVisualizationProps) => {
  const steps = customSteps || DEFAULT_STEPS;

  return (
    <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
      <div className="text-xs text-primary-foreground mb-2 font-medium flex items-center gap-2">
        <span>Data Flow Pipeline:</span>
        {isActive && showProcessing && (
          <Badge variant="secondary" className="text-xs animate-pulse">
            Processing
          </Badge>
        )}
      </div>

      <div className="flex items-center gap-2 text-xs overflow-x-auto pb-1">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center gap-2 flex-shrink-0">
            <div
              className={`px-2 py-1 rounded transition-all duration-300 ${
                step.color
              } ${isActive ? 'animate-pulse' : ''}`}
            >
              {step.label}
            </div>

            {index < steps.length - 1 && (
              <ArrowRight
                className={`w-3 h-3 text-muted-foreground transition-colors duration-300 ${
                  isActive ? 'text-primary animate-pulse' : ''
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Processing Indicator */}
      {isActive && showProcessing && (
        <div className="mt-2 flex items-center gap-2">
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 bg-primary rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            Processing audio stream through AI pipeline...
          </span>
        </div>
      )}
    </div>
  );
};
