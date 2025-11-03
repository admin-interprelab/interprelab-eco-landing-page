/**
 * Mobile Menu Component
 */

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { NavigationMenu } from './NavigationMenu';
import { NavigationAuth } from './NavigationAuth';
import type { MobileMenuProps, NavItem, NavSubItem } from './types';

/**
 * Mobile Menu Component
 *
 * Slide-out mobile navigation menu
 */
export const MobileMenu = ({
  isOpen,
  onOpenChange,
  items,
  className = '',
  onItemClick,
}: MobileMenuProps) => {
  const handleItemClick = (item: NavItem | NavSubItem) => {
    onOpenChange(false); // Close menu when item is clicked
    if (onItemClick) {
      onItemClick(item);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild className="md:hidden">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className={`glass w-80 ${className}`}
        aria-label="Navigation menu"
      >
        <div className="mt-8">
          {/* Navigation Items */}
          <NavigationMenu
            items={items}
            variant="mobile"
            onItemClick={handleItemClick}
          />

          {/* Auth Section */}
          <NavigationAuth variant="mobile" />
        </div>
      </SheetContent>
    </Sheet>
  );
};
