/**
 * Job Listings Component
 */

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, SlidersHorizontal } from 'lucide-react';
import { JobCard } from './JobCard';
import { JobFilters } from './JobFilters';
import type { JobListingsProps } from './types';
import { useJobListings } from './hooks';

/**
 * Job Listings Component
 *
 * Main job listings with search, filters, and job cards
 */
export const JobListings = ({
  className = '',
  jobs: initialJobs,
  departments = [],
  showFilters = true,
  showSearch = true,
  onJobClick,
  onApplyClick,
}: JobListingsProps) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const {
    jobs,
    searchTerm,
    selectedDepartment,
    selectedType,
    selectedLevel,
    remoteOnly,
    hasActiveFilters,
    setSearchTerm,
    setSelectedDepartment,
    setSelectedType,
    setSelectedLevel,
    setRemoteOnly,
    clearFilters,
  } = useJobListings(initialJobs);

  return (
    <section
      className={`py-20 ${className}`}
      data-section-id="job-listings"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Open Positions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join our team and help shape the future of interpretation technology
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <>
              {/* Desktop Filters */}
              <div className="hidden lg:block w-80 flex-shrink-0">
                <JobFilters
                  departments={departments}
                  selectedDepartment={selectedDepartment}
                  selectedType={selectedType}
                  selectedLevel={selectedLevel}
                  remoteOnly={remoteOnly}
                  onDepartmentChange={setSelectedDepartment}
                  onTypeChange={setSelectedType}
                  onLevelChange={setSelectedLevel}
                  onRemoteToggle={setRemoteOnly}
                  onClearFilters={clearFilters}
                />
              </div>

              {/* Mobile Filters Toggle */}
              <div className="lg:hidden">
                <Button
                  variant="outline"
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                  className="mb-4"
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                  {hasActiveFilters && (
                    <Badge variant="secondary" className="ml-2">
                      Active
                    </Badge>
                  )}
                </Button>

                {showMobileFilters && (
                  <div className="mb-6">
                    <JobFilters
                      departments={departments}
                      selectedDepartment={selectedDepartment}
                      selectedType={selectedType}
                      selectedLevel={selectedLevel}
                      remoteOnly={remoteOnly}
                      onDepartmentChange={setSelectedDepartment}
                      onTypeChange={setSelectedType}
                      onLevelChange={setSelectedLevel}
                      onRemoteToggle={setRemoteOnly}
                      onClearFilters={clearFilters}
                    />
                  </div>
                )}
              </div>
            </>
          )}

          {/* Job Listings */}
          <div className="flex-1">
            {/* Search Bar */}
            {showSearch && (
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search jobs by title, description, or requirements..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            )}

            {/* Results Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                {jobs.length} position{jobs.length !== 1 ? 's' : ''} found
                {hasActiveFilters && ' (filtered)'}
              </p>

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Clear filters
                </Button>
              )}
            </div>

            {/* Job Cards */}
            {jobs.length > 0 ? (
              <div className="space-y-6">
                {jobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onJobClick={onJobClick}
                    onApplyClick={onApplyClick}
                    variant={job.featured ? 'featured' : 'default'}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground mb-4">
                  No positions found matching your criteria
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Clear filters to see all positions
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
