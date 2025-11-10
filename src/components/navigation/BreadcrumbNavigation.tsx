import React from 'react';
import { Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Home } from 'lucide-react';
import { BreadcrumbItem as BreadcrumbItemType } from '@/types/navigation';
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs';
import { cn } from '@/lib/utils';

interface BreadcrumbNavigationProps {
  customBreadcrumbs?: BreadcrumbItemType[];
  className?: string;
}

export const BreadcrumbNavigation: React.FC<BreadcrumbNavigationProps> = ({
  customBreadcrumbs,
  className
}) => {
  const { breadcrumbs, shouldShowBreadcrumbs } = useBreadcrumbs(customBreadcrumbs);

  if (!shouldShowBreadcrumbs) {
    return null;
  }

  return (
    <div className={cn("container mx-auto px-6 py-3 border-b border-border/30", className)}>
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((item, index) => (
            <React.Fragment key={item.href || item.label}>
              <BreadcrumbItem>
                {item.isActive ? (
                  <BreadcrumbPage className="flex items-center gap-2">
                    {item.label === 'Home' && <Home className="w-4 h-4" />}
                    {item.label}
                  </BreadcrumbPage>
                ) : item.href ? (
                  <BreadcrumbLink asChild>
                    <Link
                      to={item.href}
                      className="flex items-center gap-2 hover:text-primary transition-colors"
                    >
                      {item.label === 'Home' && <Home className="w-4 h-4" />}
                      {item.label}
                    </Link>
                  </BreadcrumbLink>
                ) : (
                  <span className="text-muted-foreground">
                    {item.label}
                  </span>
                )}
              </BreadcrumbItem>
              {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
