/**
 * Company Benefits Component
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { CompanyBenefitsProps } from './types';
import { COMPANY_BENEFITS } from './constants';
import { groupBenefitsByCategory, getBenefitCategoryDisplay } from './utils';

/**
 * Company Benefits Component
 *
 * Displays company benefits grouped by category
 */
export const CompanyBenefits = ({
  className = '',
  benefits = COMPANY_BENEFITS,
  title = 'Why Work With Us',
  description = 'We offer comprehensive benefits and a supportive work environment',
}: CompanyBenefitsProps) => {
  const benefitsByCategory = groupBenefitsByCategory(benefits);

  return (
    <section
      className={`py-20 bg-gradient-subtle ${className}`}
      data-section-id="company-benefits"
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

        <div className="space-y-12">
          {Object.entries(benefitsByCategory).map(([category, categoryBenefits]) => {
            const categoryTitle = getBenefitCategoryDisplay(category as CompanyBenefit['category']);

            return (
              <div key={category}>
                <h3 className="text-xl font-semibold mb-6 text-center">
                  {categoryTitle}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryBenefits.map((benefit) => {
                    const IconComponent = benefit.icon;

                    return (
                      <Card
                        key={benefit.id}
                        className="glass border-border/50 hover:border-primary/50 transition-all duration-300"
                      >
                        <CardHeader>
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                            <IconComponent className="w-6 h-6 text-primary" />
                          </div>
                          <CardTitle className="text-lg">
                            {benefit.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription>
                            {benefit.description}
                          </CardDescription>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
