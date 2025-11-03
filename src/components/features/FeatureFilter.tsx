/**
 * Feature Filter Component
 * Filtering and search controls for features
 */

import { Search, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import type { FeatureCategory } from './types';
import { getCategoryLabel, getCategoryIcon } from './utils';

interface FeatureFilterProps {
  /** Current search query */
  searchQuery: string;
  /** Selected category filter */
  selectedCategory: FeatureCategory | 'all';
  /** Selected priority filter */
  selectedPriority: 'high' | 'medium' | 'low' | 'all';
  /** Available categories */
  availableCategories: FeatureCategory[];
  /** Whether any filters are active */
  hasActiveFilters: boolean;
  /** Search query change handler */
  onSearchChange: (query: string) => void;
  /** Category filter change handler */
  onCategoryChange: (category: FeatureCategory | 'all') => void;
  /** Priority filter change handler */
  onPriorityChange: (priority: 'high' | 'medium' | 'low' | 'all') => void;
  /** Reset filters handler */
  onResetFilters: () => void;
}

/**
 * Feature Filter Component
 *
 * Provides filtering and search functionality with:
 * - Text search input
 * - Category filter buttons
 * - Priority filter buttons
 * - Active filter indicators
 * - Reset filters option
 */
export const FeatureFilter = ({
  searchQuery,
  selectedCategory,
  selectedPriority,
  availableCategories,
  hasActiveFilters,
  onSearchChange,
  onCategoryChange,
  onPriorityChange,
  onResetFilters,
}: FeatureFilterProps) => {
  return (
    <div className="space-y-6 mb-8">
      {/* Search Input */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search features..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-4"
          aria-label="Search features"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 w-6 h-6 p-0"
            onClick={() => onSearchChange('')}
            aria-label="Clear search"
          >
            <X className="w-3 h-3" />
          </Button>
        )}
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Filter className="w-4 h-4" />
            <span>Category:</span>
          </div>

          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onCategoryChange('all')}
            className="text-xs"
          >
            All
          </Button>

          {availableCategories.map((category) => {
            const CategoryIcon = getCategoryIcon(category);
            const isSelected = selectedCategory === category;

            return (
              <Button
                key={category}
                variant={isSelected ? 'default' : 'outline'}
                size="sm"
                onClick={() => onCategoryChange(category)}
                className="text-xs flex items-center gap-1"
              >
                <CategoryIcon className="w-3 h-3" />
                {getCategoryLabel(category)}
              </Button>
            );
          })}
        </div>

        {/* Priority Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="text-sm text-muted-foreground">Priority:</div>

          {(['all', 'high', 'medium', 'low'] as const).map((priority) => (
            <Button
              key={priority}
              variant={selectedPriority === priority ? 'default' : 'outline'}
              size="sm"
              onClick={() => onPriorityChange(priority)}
              className="text-xs capitalize"
            >
              {priority}
            </Button>
          ))}
        </div>
      </div>

      {/* Active Filters & Reset */}
      {hasActiveFilters && (
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Active filters:</span>

            {searchQuery && (
              <Badge variant="secondary" className="text-xs">
                Search: "{searchQuery}"
              </Badge>
            )}

            {selectedCategory !== 'all' && (
              <Badge variant="secondary" className="text-xs">
                Category: {getCategoryLabel(selectedCategory)}
              </Badge>
            )}

            {selectedPriority !== 'all' && (
              <Badge variant="secondary" className="text-xs">
                Priority: {selectedPriority}
              </Badge>
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={onResetFilters}
            className="text-xs"
          >
            <X className="w-3 h-3 mr-1" />
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
};
