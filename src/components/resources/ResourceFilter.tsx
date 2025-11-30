/**
 * Resource Filter Component
 * Search and filtering controls for professional resources
 */

import { Search, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import type { ResourceFilterProps } from './types';
import { getResourceTypeConfig } from './utils';

/**
 * Resource Filter Component
 *
 * Provides filtering functionality with:
 * - Text search input
 * - Resource type filter buttons
 * - Active filter indicators
 * - Reset filters option
 */
export const ResourceFilter = ({
  categories,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
}: ResourceFilterProps) => {
  const hasActiveFilters = searchQuery.trim() !== '' || selectedCategory !== 'all';

  return (
    <div className="space-y-4 mb-6">
      {/* Search Input */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search professional resources..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-4"
          aria-label="Search professional resources"
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

      {/* Category Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2">
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
          All Resources
        </Button>

        {categories.map((category) => {
          const isSelected = selectedCategory === category.id;

          return (
            <Button
              key={category.id}
              variant={isSelected ? 'default' : 'outline'}
              size="sm"
              onClick={() => onCategoryChange(category.id)}
              className="text-xs flex items-center gap-1"
            >
              <category.icon className="w-3 h-3" />
              {category.title}
            </Button>
          );
        })}
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
                Category: {categories.find(c => c.id === selectedCategory)?.title || selectedCategory}
              </Badge>
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              onSearchChange('');
              onCategoryChange('all');
            }}
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
