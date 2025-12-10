import { cn } from "@/lib/utils";
import { Achievement } from "@/types/badges";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface BadgeProps {
  badge: Achievement;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showTooltip?: boolean;
}

export const BadgeItem = ({ badge, size = 'md', className, showTooltip = true }: BadgeProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-xl',
    lg: 'w-16 h-16 text-3xl'
  };

  const tierStyles = {
    bronze: 'bg-orange-100 border-orange-300 text-orange-700 shadow-orange-500/20',
    silver: 'bg-slate-100 border-slate-300 text-slate-700 shadow-slate-500/20',
    gold: 'bg-yellow-100 border-yellow-300 text-yellow-700 shadow-yellow-500/20',
    platinum: 'bg-indigo-100 border-indigo-300 text-indigo-700 shadow-indigo-500/20'
  };

  const BadgeContent = (
    <div 
      className={cn(
        "relative rounded-full flex items-center justify-center border-2 transition-transform hover:scale-110 cursor-help shadow-lg",
        sizeClasses[size],
        tierStyles[badge.tier],
        !badge.earnedAt && "opacity-50 grayscale",
        className
      )}
    >
      <span>{badge.icon}</span>
      {badge.progress !== undefined && badge.maxProgress && badge.progress < badge.maxProgress && (
        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 36 36">
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray={`${(badge.progress / badge.maxProgress) * 100}, 100`}
            className="opacity-50"
          />
        </svg>
      )}
    </div>
  );

  if (!showTooltip) return BadgeContent;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {BadgeContent}
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-[200px] text-center">
          <p className="font-bold">{badge.title}</p>
          <p className="text-xs text-muted-foreground">{badge.description}</p>
          {!badge.earnedAt && (
            <p className="text-xs mt-1 font-medium text-muted-foreground/80">
              Progress: {badge.progress}/{badge.maxProgress}
            </p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
