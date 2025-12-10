import { useState, useEffect } from "react";
import { Achievement, BADGES } from "@/types/badges";

export const useBadges = () => {
  const [badges, setBadges] = useState<Achievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock fetching user badges and calculating progress
    const fetchBadges = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Mock data: User has completed 1 module and is working on others
      const userProgress = {
        modulesCompleted: 2,
        streakDays: 3,
        assessmentsPassed: 1
      };

      const computedBadges = BADGES.map(badge => {
        let progress = 0;
        let earnedAt: Date | undefined = undefined;

        switch (badge.id) {
          case 'first_steps':
            progress = userProgress.modulesCompleted;
            if (progress >= 1) earnedAt = new Date('2024-01-15');
            break;
          case 'dedicated_learner':
            progress = userProgress.modulesCompleted;
            break;
          case 'week_warrior':
            progress = userProgress.streakDays;
            break;
          case 'assessment_ace':
            progress = userProgress.assessmentsPassed;
            break;
          default:
            progress = 0;
        }

        // Cap progress
        if (badge.maxProgress) {
          progress = Math.min(progress, badge.maxProgress);
        }

        return {
          ...badge,
          progress,
          earnedAt
        };
      });

      setBadges(computedBadges);
      setIsLoading(false);
    };

    fetchBadges();
  }, []);

  const earnedBadges = badges.filter(b => b.earnedAt);
  const inProgressBadges = badges.filter(b => !b.earnedAt);

  return {
    badges,
    earnedBadges,
    inProgressBadges,
    isLoading
  };
};
