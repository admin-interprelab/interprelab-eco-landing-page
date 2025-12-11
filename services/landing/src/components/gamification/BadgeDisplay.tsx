import { useBadges } from "../../hooks/useBadges";
import { BadgeItem } from "./Badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/lib/ui";
import { Button } from "@/lib/ui";
import { Trophy, Loader2 } from "lucide-react";
import { ScrollArea } from "@/lib/ui";

export const BadgeDisplay = () => {
  const { badges, earnedBadges, isLoading } = useBadges();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Trophy className="w-5 h-5 text-yellow-500" />
          {earnedBadges.length > 0 && (
            <span className="absolute -top-1 -right-1 block w-4 h-4 rounded-full bg-red-500 text-white text-[10px] items-center justify-center flex">
              {earnedBadges.length}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-t-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-500" />
              Achievements
            </h4>
            <span className="text-xs text-slate-400">
              {earnedBadges.length} / {badges.length} Unlocked
            </span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-1.5">
            <div 
              className="bg-yellow-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${(earnedBadges.length / badges.length) * 100}%` }}
            />
          </div>
        </div>

        <ScrollArea className="h-[300px] p-4">
          {isLoading ? (
            <div className="flex justify-center p-4">
              <Loader2 className="animate-spin w-6 h-6 text-muted-foreground" />
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-4">
              {badges.map((badge) => (
                <div key={badge.id} className="flex justify-center">
                  <BadgeItem badge={badge} size="md" />
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};
