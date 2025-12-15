import React from 'react';
import { sidebarSections } from "@/data/interpreLink";
import { Badge } from "@/lib/ui/components/ui/badge";

export const LinkSidebar = () => {
  return (
    <div className="w-72 bg-card border-r min-h-screen p-6 sticky top-0 hidden lg:block">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          InterpreLink
        </h1>
        <p className="text-sm text-muted-foreground">Connect. Share. Grow.</p>
      </div>

      <div className="space-y-8">
        {sidebarSections.map((section, index) => (
          <div key={index}>
            <h3 className="text-xs font-semibold text-muted-foreground mb-4 tracking-wider">
              {section.title}
            </h3>
            <div className="space-y-1">
              {section.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                    item.active
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-accent"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm font-medium flex-1">{item.label}</span>
                  {item.badge && (
                    <Badge variant="destructive" className="text-xs px-2 py-0.5">
                      {item.badge}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
