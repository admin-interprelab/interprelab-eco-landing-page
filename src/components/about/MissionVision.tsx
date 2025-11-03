/**
 * Mission Vision Component
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { MissionVisionProps } from './types';
import { DEFAULT_MISSION, DEFAULT_VISION } from './constants';

/**
 * Mission Vision Component
 *
 * Displays company mission and vision statements
 */
export const MissionVision = ({
  className = '',
  mission = DEFAULT_MISSION,
  vision = DEFAULT_VISION,
}: MissionVisionProps) => {
  return (
    <section
      className={`py-20 ${className}`}
      data-section-id="mission-vision"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Card className="glass border-border/50 p-8">
            <CardHeader>
              <CardTitle className="text-2xl mb-4">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {mission}
              </p>
            </CardContent>
          </Card>

          <Card className="glass border-border/50 p-8">
            <CardHeader>
              <CardTitle className="text-2xl mb-4">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {vision}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
