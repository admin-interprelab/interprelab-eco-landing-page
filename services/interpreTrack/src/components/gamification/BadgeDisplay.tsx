import React from 'react';
import { Badge } from '@/lib/ui';

export function BadgeDisplay() {
  return (
    <div className="flex items-center gap-2">
      <Badge variant="outline">Rank: Novice</Badge>
    </div>
  );
}
