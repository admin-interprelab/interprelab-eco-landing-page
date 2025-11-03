/**
 * Department Grid Component
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { DepartmentGridProps } from './types';
import { DEPARTMENTS } from './constants';
import { generateDepartmentCardId, getAnimationDelay } from './utils';

/**
 * Department Grid Component
 *
 * Grid of department cards showing available positions
 */
export const DepartmentGrid = ({
  className = '',
  departments = DEPARTMENTS,
  onDepartmentClick,
}: DepartmentGridProps) => {
  return (
    <section
      className={`py-20 ${className}`}
      data-section-id="departments"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Our Departments
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore opportunities across different teams and find where you fit best
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map((department, index) => {
            const IconComponent = department.icon;
            const cardId = generateDepartmentCardId(department);
            const animationDelay = getAnimationDelay(index);

            const handleClick = () => {
              if (onDepartmentClick) {
                onDepartmentClick(department);
              }
            };

            return (
              <Card
                key={department.id}
                id={cardId}
                className="glass border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer hover:shadow-lg hover:-translate-y-1"
                style={{ animationDelay }}
                onClick={handleClick}
                data-department-id={department.id}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center ${department.color}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <Badge
                      variant={department.openPositions > 0 ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {department.openPositions} open
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">
                    {department.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {department.description}
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
