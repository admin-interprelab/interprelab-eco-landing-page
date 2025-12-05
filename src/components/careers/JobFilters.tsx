/**
 * Job Filters Component
 */

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { X, Filter } from 'lucide-react';
import type { JobFiltersProps } from './types';
import { getJobTypeDisplay, getJobLevelDisplay } from './utils';
import { JOB_TYPES, JOB_LEVELS } from './constants';

/**
 * Job Filters Component
 *
 * Filter controls for job listings
 */
export const JobFilters = ({
  className = '',
  departments,
  selectedDepartment,
  selectedType,
  selectedLevel,
  remoteOnly,
  onDepartmentChange,
  onTypeChange,
  onLevelChange,
  onRemoteToggle,
  onClearFilters,
}: JobFiltersProps) => {
  const hasActiveFilters = selectedDepartment !== 'all' ||
                          selectedType !== 'all' ||
                          selectedLevel !== 'all' ||
                          remoteOnly;

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </CardTitle>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Department Filter */}
        <div>
          <h4 className="font-medium mb-3">Department</h4>
          <div className="space-y-2">
            <Button
              variant={selectedDepartment === 'all' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onDepartmentChange('all')}
              className="w-full justify-start"
            >
              All Departments
            </Button>
            {departments.map((dept) => (
              <Button
                key={dept.id}
                variant={selectedDepartment === dept.name.toLowerCase() ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onDepartmentChange(dept.name.toLowerCase())}
                className="w-full justify-between"
              >
                <span>{dept.name}</span>
                <Badge variant="secondary" className="text-xs">
                  {dept.openPositions}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Job Type Filter */}
        <div>
          <h4 className="font-medium mb-3">Job Type</h4>
          <div className="space-y-2">
            <Button
              variant={selectedType === 'all' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onTypeChange('all')}
              className="w-full justify-start"
            >
              All Types
            </Button>
            {Object.entries(JOB_TYPES).map(([key, label]) => (
              <Button
                key={key}
                variant={selectedType === key ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onTypeChange(key)}
                className="w-full justify-start"
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        {/* Job Level Filter */}
        <div>
          <h4 className="font-medium mb-3">Experience Level</h4>
          <div className="space-y-2">
            <Button
              variant={selectedLevel === 'all' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onLevelChange('all')}
              className="w-full justify-start"
            >
              All Levels
            </Button>
            {Object.entries(JOB_LEVELS).map(([key, label]) => (
              <Button
                key={key}
                variant={selectedLevel === key ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onLevelChange(key)}
                className="w-full justify-start"
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        {/* Remote Filter */}
        <div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remote-only"
              checked={remoteOnly}
              onCheckedChange={onRemoteToggle}
            />
            <label
              htmlFor="remote-only"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remote positions only
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
