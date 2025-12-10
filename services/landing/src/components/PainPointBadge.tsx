import { Badge } from "@/components/ui/badge";

interface PainPointBadgeProps {
  painPoint: string;
  className?: string;
}

export const PainPointBadge = ({ 
  painPoint, 
  className = "mb-6 bg-primary/10 text-primary border-primary/20" 
}: PainPointBadgeProps) => {
  return (
    <Badge className={className}>
      {painPoint}
    </Badge>
  );
};
