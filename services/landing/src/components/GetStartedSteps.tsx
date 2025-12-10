import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
  content?: ReactNode;
  buttonText?: string;
  buttonAction?: () => void;
  showIcon?: boolean; // If true, shows icon instead of step number in the circle
}

interface GetStartedStepsProps {
  title?: string;
  subtitle?: string;
  steps: Step[];
  finalCTAText?: string;
  finalCTAIcon?: LucideIcon;
  finalCTAAction?: () => void;
  className?: string;
}

export const GetStartedSteps = ({
  title = "Get Started in 3 Steps",
  subtitle = "Your path to improved skills",
  steps,
  finalCTAText,
  finalCTAIcon: FinalCTAIcon,
  finalCTAAction,
  className = "",
}: GetStartedStepsProps) => {
  return (
    <section className={`py-20 bg-gradient-subtle ${className}`}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const stepNumber = index + 1;
              
              return (
                <div key={step.title} className="flex gap-8 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      {step.showIcon ? (
                        <StepIcon className="w-8 h-8 text-primary" />
                      ) : (
                        <span className="text-2xl font-bold text-primary">{stepNumber}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <StepIcon className="w-6 h-6 text-primary" />
                      <h3 className="text-2xl font-semibold">{step.title}</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      {step.description}
                    </p>
                    {step.content && (
                      <div className="mb-4">
                        {step.content}
                      </div>
                    )}
                    {step.buttonText && step.buttonAction && (
                      <Button onClick={step.buttonAction} className="glass-button">
                        {step.buttonText}
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {finalCTAText && finalCTAAction && (
          <div className="text-center mt-12">
            <Button size="lg" className="glass-button" onClick={finalCTAAction}>
              {FinalCTAIcon && <FinalCTAIcon className="w-5 h-5 mr-2" />}
              {finalCTAText}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
