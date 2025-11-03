/**
 * Job Card Component
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, DollarSign, Users } from 'lucide-react';
import type { JobCardProps } from './types';
import {
  formatSalaryRange,
  getJobTypeDisplay,
  getJobLevelDisplay,
  formatPostedDate,
  generateJobCardId,
  isRecentlyPosted
} from './utils';

/**
 * Job Card Component
 *
 * Individual job listing card with details and apply button
 */
export const JobCard = ({
  job,
  onJobClick,
  onApplyClick,
  className = '',
  variant = 'default',
}: JobCardProps) => {
  const cardId = generateJobCardId(job);
  const salaryRange = formatSalaryRange(job.salary);
  const jobType = getJobTypeDisplay(job.type);
  const jobLevel = getJobLevelDisplay(job.level);
  const postedDate = formatPostedDate(job.postedDate);
  const isRecent = isRecentlyPosted(job.postedDate);

  const handleCardClick = () => {
    if (onJobClick) {
      onJobClick(job);
    }
  };

  const handleApplyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onApplyClick) {
      onApplyClick(job);
    }
  };

  const cardClasses = `
    ${variant === 'featured' ? 'ring-2 ring-primary/20 shadow-lg' : ''}
    ${variant === 'compact' ? 'p-4' : ''}
    hover:shadow-lg transition-all duration-300 cursor-pointer
    ${className}
  `;

  return (
    <Card
      id={cardId}
      className={cardClasses}
      onClick={handleCardClick}
      data-job-id={job.id}
    >
      <CardHeader className={variant === 'compact' ? 'pb-3' : ''}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2 hover:text-primary transition-colors">
              {job.title}
            </CardTitle>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{job.location}</span>
                {job.remote && (
                  <Badge variant="outline" className="ml-2 text-xs">
                    Remote
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{job.department}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            {job.featured && (
              <Badge className="bg-primary text-primary-foreground">
                Featured
              </Badge>
            )}
            {isRecent && (
              <Badge variant="outline" className="text-success border-success">
                New
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className={variant === 'compact' ? 'pt-0' : ''}>
        {variant !== 'compact' && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {job.description}
          </p>
        )}

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">{jobType}</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              {jobLevel}
            </Badge>
          </div>

          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <DollarSign className="w-4 h-4" />
            <span>{salaryRange}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Posted {postedDate}
          </span>

          <Button
            size="sm"
            onClick={handleApplyClick}
            className="ml-auto"
          >
            Apply Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
