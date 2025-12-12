import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { MegaMenuSection, NavigationTool } from '@/types/navigation';
import { cn } from '@/lib/utils';

interface MegaMenuProps {
  sections: MegaMenuSection[];
  isOpen: boolean;
  onClose: () => void;
}

const StatusBadge = ({ status }: { status: NavigationTool['status'] }) => {
  const variants = {
    available: 'bg-green-100 text-green-800 border-green-200',
    beta: 'bg-blue-100 text-blue-800 border-blue-200',
    'coming-soon': 'bg-gray-100 text-gray-800 border-gray-200'
  };

  const labels = {
    available: 'Available',
    beta: 'Beta',
    'coming-soon': 'Coming Soon'
  };

  return (
    <Badge
      variant="outline"
      className={cn('text-xs', variants[status])}
    >
      {labels[status]}
    </Badge>
  );
};

const ToolCard = ({ tool }: { tool: NavigationTool }) => {
  const IconComponent = tool.icon;

  return (
    <Link
      to={tool.href}
      className="block group"
    >
      <Card className="h-full transition-all duration-200 hover:shadow-md hover:border-primary/20 group-hover:scale-[1.02]">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
              <IconComponent className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                  {tool.name}
                </h4>
                <StatusBadge status={tool.status} />
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {tool.description}
              </p>
              {tool.preview && (
                <div className="mt-2 text-xs text-primary font-medium">
                  {tool.preview}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export const MegaMenu: React.FC<MegaMenuProps> = ({ sections, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-lg z-40">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((section) => (
            <div key={section.title} className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg text-foreground mb-1">
                  {section.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {section.description}
                </p>
              </div>

              <div className="space-y-3">
                {section.tools.map((tool) => (
                  <ToolCard key={tool.name} tool={tool} />
                ))}
              </div>

              {section.quickActions && section.quickActions.length > 0 && (
                <div className="pt-4 border-t border-border/50">
                  <div className="space-y-2">
                    {section.quickActions.map((action) => {
                      const ActionIcon = action.icon;
                      return (
                        <Link
                          key={action.href}
                          to={action.href}
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                          onClick={onClose}
                        >
                          {ActionIcon && <ActionIcon className="w-4 h-4" />}
                          {action.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
