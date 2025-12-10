import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface MissionCollaborationCTAProps {
  title: string;
  description: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  footerText?: string;
  className?: string;
}

export const MissionCollaborationCTA = ({
  title,
  description,
  primaryButtonText = "Collaborate With Us",
  primaryButtonLink = "/contact",
  secondaryButtonText = "Join InterpreLink Community",
  secondaryButtonLink = "/interprelink",
  footerText,
  className = "",
}: MissionCollaborationCTAProps) => {
  return (
    <section className={`py-20 ${className}`}>
      <div className="container mx-auto px-6">
        <Card className="glass border-primary/20 max-w-4xl mx-auto">
          <CardContent className="p-8 md:p-12 text-center space-y-6">
            <h2 className="text-3xl font-bold">{title}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" variant="hero" asChild>
                <Link to={primaryButtonLink}>
                  {primaryButtonText}
                </Link>
              </Button>
              <Button size="lg" variant="glass" asChild>
                <Link to={secondaryButtonLink}>
                  {secondaryButtonText}
                </Link>
              </Button>
            </div>
            {footerText && (
              <p className="text-sm text-muted-foreground">
                {footerText}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
