/**
 * Company Values Component
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { CompanyValuesProps } from './types';
import { COMPANY_VALUES } from './constants';
import { getValuesGridClasses, getAnimationDelay, generateValueCardId } from './utils';
import { useCompanyValuesInteractions } from './hooks';

/**
 * Company Values Component
 *
 * Displays company core values in a grid layout
 */
export const CompanyValues = ({
  className = '',
  values = COMPANY_VALUES,
  title = 'Our Core Values',
  description = 'These principles guide every decision we make and every product we build.',
}: CompanyValuesProps) => {
  const { handleValueClick, handleValueHover } = useCompanyValuesInteractions();
  const gridClasses = getValuesGridClasses(values.length);

  return (
    <section
      className={`py-20 bg-gradient-subtle ${className}`}
      data-section-id="company-values"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className={`grid ${gridClasses} gap-8`}>
          {values.map((value, index) => {
            const IconComponent = value.icon;
            const cardId = generateValueCardId(value);
            const animationDelay = getAnimationDelay(index);

            return (
              <Card
                key={value.id}
                id={cardId}
                className="glass border-border/50 hover:border-primary/50 transition-all duration-300 text-center cursor-pointer"
                style={{ animationDelay }}
                onClick={() => handleValueClick(value)}
                onMouseEnter={() => handleValueHover(value.id)}
                onMouseLeave={() => handleValueHover(null)}
                data-value-id={value.id}
              >
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
