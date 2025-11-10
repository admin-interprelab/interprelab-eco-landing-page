import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { Menu, ChevronDown, User, LogOut, Heart, Phone, MessageCircle, Shield } from 'lucide-react';
import { MegaMenuSection, SupportResource } from '@/types/navigation';
import { cn } from '@/lib/utils';

interface MobileNavigationProps {
  sections: MegaMenuSection[];
  user?: any;
  onSignOut: () => void;
  t: (key: string) => string;
  stressAware?: boolean;
  crisisSupportEnabled?: boolean;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  sections,
  user,
  onSignOut,
  t,
  stressAware = true,
  crisisSupportEnabled = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSections, setOpenSections] = useState<string[]>([]);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const toggleSection = (sectionTitle: string) => {
    setOpenSections(prev =>
      prev.includes(sectionTitle)
        ? prev.filter(title => title !== sectionTitle)
        : [...prev, sectionTitle]
    );
  };

  const handleLinkClick = () => {
    setIsOpen(false);
    setOpenSections([]);
  };

  // Handle touch events for swipe gestures
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;

    // Close menu on left swipe (swipe to close)
    if (isLeftSwipe && isOpen) {
      setIsOpen(false);
      setOpenSections([]);
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sheetRef.current && !sheetRef.current.contains(event.target as Node)) {
        if (isOpen) {
          setIsOpen(false);
          setOpenSections([]);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const StatusBadge = ({ status }: { status: 'available' | 'beta' | 'coming-soon' }) => {
    const variants = {
      available: 'bg-green-100 text-green-800',
      beta: 'bg-blue-100 text-blue-800',
      'coming-soon': 'bg-gray-100 text-gray-800'
    };

    const labels = {
      available: 'Available',
      beta: 'Beta',
      'coming-soon': 'Coming Soon'
    };

    return (
      <Badge variant="outline" className={cn('text-xs ml-2', variants[status])}>
        {labels[status]}
      </Badge>
    );
  };

  // Crisis support resources for immediate access
  const crisisSupportResources: SupportResource[] = [
    {
      type: 'crisis-support',
      title: 'Crisis Help',
      description: 'Immediate support for overwhelming stress',
      immediateAccess: true,
      href: '/crisis-support',
      icon: Phone
    },
    {
      type: 'peer-community',
      title: 'Peer Support',
      description: 'Connect with other interpreters now',
      immediateAccess: true,
      href: '/peer-support',
      icon: MessageCircle
    },
    {
      type: 'self-care',
      title: 'Quick Relief',
      description: 'Immediate stress-relief resources',
      immediateAccess: true,
      href: '/self-care',
      icon: Heart
    }
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="min-h-[44px] min-w-[44px]" // Touch-optimized size
        >
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        ref={sheetRef}
        side="right"
        className={cn(
          "glass w-full sm:w-80 overflow-y-auto",
          stressAware && "bg-gradient-to-b from-background via-background/98 to-primary/5"
        )}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="space-y-6 mt-8">
          {/* Crisis Support Section - Always at top when enabled */}
          {crisisSupportEnabled && (
            <div className="p-4 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-4 h-4 text-red-600" />
                <h3 className="text-sm font-semibold text-red-800">
                  Need Help Right Now?
                </h3>
              </div>
              <p className="text-xs text-red-600 mb-3">
                You're not alone. Immediate support is available.
              </p>
              <div className="space-y-2">
                {crisisSupportResources.map((resource) => {
                  const IconComponent = resource.icon;
                  return (
                    <Link
                      key={resource.href}
                      to={resource.href}
                      className="flex items-center gap-3 p-3 bg-white/80 rounded-lg hover:bg-white transition-colors min-h-[48px]"
                      onClick={handleLinkClick}
                    >
                      <div className="p-2 bg-red-100 rounded-lg flex-shrink-0">
                        {IconComponent && <IconComponent className="w-4 h-4 text-red-600" />}
                      </div>
                      <div className="flex-1">
                        <span className="font-medium text-sm text-red-800">{resource.title}</span>
                        <p className="text-xs text-red-600">{resource.description}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
          {/* Solutions Menu */}
          {sections.map((section) => (
            <Collapsible
              key={section.title}
              open={openSections.includes(section.title)}
              onOpenChange={() => toggleSection(section.title)}
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-between text-left font-semibold transition-all duration-200",
                    stressAware ? "min-h-[48px] hover:bg-accent/30" : "min-h-[44px] hover:bg-accent/50"
                  )}
                >
                  <span className="flex items-center gap-2">
                    {section.title}
                    <Badge variant="outline" className="text-xs">
                      {section.tools.length}
                    </Badge>
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform duration-200",
                      openSections.includes(section.title) && "rotate-180"
                    )}
                  />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2 pl-4 mt-2 animate-in slide-in-from-top-2 duration-200">
                <p className="text-sm text-muted-foreground mb-3">
                  {section.description}
                </p>
                {section.tools.map((tool) => {
                  const IconComponent = tool.icon;
                  return (
                    <Link
                      key={tool.href}
                      to={tool.href}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-lg transition-colors",
                        stressAware ? "min-h-[48px] hover:bg-accent/30" : "min-h-[44px] hover:bg-accent/50"
                      )}
                      onClick={handleLinkClick}
                    >
                      <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                        <IconComponent className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{tool.name}</span>
                          <StatusBadge status={tool.status} />
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {tool.description}
                        </p>
                      </div>
                    </Link>
                  );
                })}

                {section.quickActions && section.quickActions.length > 0 && (
                  <div className="pt-3 mt-3 border-t border-border/50">
                    {section.quickActions.map((action) => {
                      const ActionIcon = action.icon;
                      return (
                        <Link
                          key={action.href}
                          to={action.href}
                          className={cn(
                            "flex items-center gap-2 p-2 text-sm text-muted-foreground hover:text-primary transition-colors",
                            stressAware ? "min-h-[48px]" : "min-h-[44px]"
                          )}
                          onClick={handleLinkClick}
                        >
                          {ActionIcon && <ActionIcon className="w-4 h-4" />}
                          {action.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </CollapsibleContent>
            </Collapsible>
          ))}

          {/* Static Navigation Items */}
          <div className="space-y-2">
            <Link
              to="/resources"
              className={cn(
                "flex items-center text-lg font-medium text-foreground hover:text-primary transition-colors p-3",
                stressAware ? "min-h-[48px]" : "min-h-[44px]"
              )}
              onClick={handleLinkClick}
            >
              {t('resources')}
            </Link>
            <Link
              to="/about"
              className={cn(
                "flex items-center text-lg font-medium text-foreground hover:text-primary transition-colors p-3",
                stressAware ? "min-h-[48px]" : "min-h-[44px]"
              )}
              onClick={handleLinkClick}
            >
              {t('about')}
            </Link>
            <Link
              to="/contact"
              className={cn(
                "flex items-center text-lg font-medium text-foreground hover:text-primary transition-colors p-3",
                stressAware ? "min-h-[48px]" : "min-h-[44px]"
              )}
              onClick={handleLinkClick}
            >
              {t('contact')}
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="pt-6 space-y-3">
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button
                    variant="ghost"
                    className={cn("w-full", stressAware ? "min-h-[48px]" : "min-h-[44px]")}
                    onClick={handleLinkClick}
                  >
                    Dashboard
                  </Button>
                </Link>
                <Link to="/settings">
                  <Button
                    variant="ghost"
                    className={cn("w-full", stressAware ? "min-h-[48px]" : "min-h-[44px]")}
                    onClick={handleLinkClick}
                  >
                    Settings
                  </Button>
                </Link>
                <Button
                  onClick={() => {
                    onSignOut();
                    handleLinkClick();
                  }}
                  variant="glass"
                  className={cn("w-full", stressAware ? "min-h-[48px]" : "min-h-[44px]")}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  {t('signOut')}
                </Button>
              </>
            ) : (
              <>
                <Link to="/waitlist">
                  <Button
                    variant="glass"
                    className={cn("w-full flex items-center gap-2", stressAware ? "min-h-[48px]" : "min-h-[44px]")}
                    onClick={handleLinkClick}
                  >
                    Join Waitlist
                  </Button>
                </Link>
                <Link to="/signin">
                  <Button
                    variant="hero"
                    className={cn("w-full", stressAware ? "min-h-[48px]" : "min-h-[44px]")}
                    onClick={handleLinkClick}
                  >
                    <User className="w-4 h-4 mr-2" />
                    {t('signIn')}
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
