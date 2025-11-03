/**
 * Team Section Component
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { TeamSectionProps } from './types';
import { TEAM_MEMBERS } from './constants';
import {
  getTeamGridClasses,
  getAnimationDelay,
  generateTeamMemberCardId,
  formatTeamMemberInitials,
  hasTeamMemberAvatar
} from './utils';
import { useTeamMemberInteractions } from './hooks';

/**
 * Team Section Component
 *
 * Displays leadership team members in a grid layout
 */
export const TeamSection = ({
  className = '',
  teamMembers = TEAM_MEMBERS,
  title = 'Meet Our Leadership Team',
  description = 'Experienced interpreters and technology experts working together to advance the interpretation profession.',
}: TeamSectionProps) => {
  const { handleMemberClick, handleMemberHover } = useTeamMemberInteractions();
  const gridClasses = getTeamGridClasses(teamMembers.length);

  return (
    <section
      className={`py-20 ${className}`}
      data-section-id="team"
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
          {teamMembers.map((member, index) => {
            const cardId = generateTeamMemberCardId(member);
            const animationDelay = getAnimationDelay(index);
            const initials = formatTeamMemberInitials(member);

            return (
              <Card
                key={member.id}
                id={cardId}
                className="glass border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer"
                style={{ animationDelay }}
                onClick={() => handleMemberClick(member)}
                onMouseEnter={() => handleMemberHover(member.id)}
                onMouseLeave={() => handleMemberHover(null)}
                data-member-id={member.id}
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                      {hasTeamMemberAvatar(member) ? (
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-full h-full rounded-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <span className="text-white font-bold text-lg">
                          {initials}
                        </span>
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{member.name}</CardTitle>
                      <Badge variant="outline">{member.role}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3">
                    {member.background}
                  </p>
                  <Badge className="bg-primary/10 text-primary border-primary/20">
                    {member.specialization}
                  </Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
