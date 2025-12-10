import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface FeatureGridProps {
  title: string;
  subtitle: string;
  features: Feature[];
  columns?: "3" | "4";
  className?: string;
}

export const FeatureGrid = ({
  title,
  subtitle,
  features,
  columns = "3",
  className = "",
}: FeatureGridProps) => {
  const gridClass = columns === "4" 
    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
    : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8";

  return (
    <section className={`py-20 ${className}`}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className={gridClass}>
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={feature.title} 
                className="glass border-border/50 hover:border-primary/50 transition-all duration-300"
              >
                <CardHeader>
                  <Icon className="w-12 h-12 text-primary mb-4" />
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
