/**
 * Navigation Menu Component
 */

import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import {
  NavigationMenu as ShadcnNavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import type { NavigationMenuProps } from './types';
import { isNavItemActive } from './utils';
import { useLocation } from 'react-router-dom';

/**
 * Navigation Menu Component
 *
 * Main navigation menu with dropdown support
 */
export const NavigationMenu = ({
  items,
  className = '',
  variant = 'desktop',
  onItemClick,
}: NavigationMenuProps) => {
  const location = useLocation();

  const handleItemClick = (item: any) => {
    if (onItemClick) {
      onItemClick(item);
    }
  };

  if (variant === 'mobile') {
    return (
      <div className={`space-y-6 ${className}`}>
        {items.map((item) => (
          item.submenu ? (
            <div key={item.label} className="space-y-2">
              <p className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                {item.icon && <item.icon className="w-4 h-4" />}
                {item.label}
                {item.badge && (
                  <Badge variant="secondary" className="text-xs">
                    {item.badge}
                  </Badge>
                )}
              </p>
              {item.submenu.map((subitem) => (
                <Link
                  key={subitem.href}
                  to={subitem.href}
                  className={`block text-base font-medium transition-colors pl-4 ${
                    isNavItemActive(subitem, location.pathname)
                      ? 'text-primary'
                      : 'text-foreground hover:text-primary'
                  }`}
                  onClick={() => handleItemClick(subitem)}
                >
                  <div className="flex items-center gap-2">
                    {subitem.icon && <subitem.icon className="w-4 h-4" />}
                    {subitem.label}
                    {subitem.badge && (
                      <Badge variant="outline" className="text-xs">
                        {subitem.badge}
                      </Badge>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <Link
              key={item.label}
              to={item.href!}
              className={`block text-lg font-medium transition-colors ${
                isNavItemActive(item, location.pathname)
                  ? 'text-primary'
                  : 'text-foreground hover:text-primary'
              }`}
              onClick={() => handleItemClick(item)}
            >
              <div className="flex items-center gap-2">
                {item.icon && <item.icon className="w-5 h-5" />}
                {item.label}
                {item.badge && (
                  <Badge variant="outline" className="text-xs">
                    {item.badge}
                  </Badge>
                )}
              </div>
            </Link>
          )
        ))}
      </div>
    );
  }

  // Desktop variant
  return (
    <div className={`hidden md:flex items-center gap-8 ${className}`}>
      {items.map((item) => (
        item.submenu ? (
          <ShadcnNavigationMenu key={item.label}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium text-foreground/80 hover:text-foreground bg-transparent">
                  <div className="flex items-center gap-2">
                    {item.icon && <item.icon className="w-4 h-4" />}
                    {item.label}
                    {item.badge && (
                      <Badge variant="secondary" className="text-xs ml-1">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-64 gap-2 p-2">
                    {item.submenu.map((subitem) => (
                      <li key={subitem.href}>
                        <Link to={subitem.href} onClick={() => handleItemClick(subitem)}>
                          <NavigationMenuLink className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${
                            isNavItemActive(subitem, location.pathname) ? 'bg-accent text-accent-foreground' : ''
                          }`}>
                            <div className="flex items-center gap-2 text-sm font-medium leading-none">
                              {subitem.icon && <subitem.icon className="w-4 h-4" />}
                              {subitem.label}
                              {subitem.badge && (
                                <Badge variant="outline" className="text-xs ml-auto">
                                  {subitem.badge}
                                </Badge>
                              )}
                            </div>
                            {subitem.description && (
                              <p className="line-clamp-2 text-xs leading-snug text-muted-foreground mt-1">
                                {subitem.description}
                              </p>
                            )}
                          </NavigationMenuLink>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </ShadcnNavigationMenu>
        ) : (
          <Link
            key={item.label}
            to={item.href!}
            className={`text-sm font-medium transition-colors flex items-center gap-2 ${
              isNavItemActive(item, location.pathname)
                ? 'text-primary'
                : 'text-foreground hover:text-primary'
            }`}
            onClick={() => handleItemClick(item)}
          >
            {item.icon && <item.icon className="w-4 h-4" />}
            {item.label}
            {item.badge && (
              <Badge variant="secondary" className="text-xs">
                {item.badge}
              </Badge>
            )}
          </Link>
        )
      ))}
    </div>
  );
};
