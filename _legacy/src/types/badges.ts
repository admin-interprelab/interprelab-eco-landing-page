export type BadgeTier = 'bronze' | 'silver' | 'gold' | 'platinum';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string; // Emoji or icon name
  tier: BadgeTier;
  earnedAt?: Date;
  progress?: number;
  maxProgress?: number;
}

export const BADGES: Achievement[] = [
  {
    id: 'first_steps',
    title: 'First Steps',
    description: 'Complete your first training module',
    icon: '🌱',
    tier: 'bronze',
    maxProgress: 1
  },
  {
    id: 'dedicated_learner',
    title: 'Dedicated Learner',
    description: 'Complete 5 training modules',
    icon: '📚',
    tier: 'silver',
    maxProgress: 5
  },
  {
    id: 'master_interpreter',
    title: 'Master Interpreter',
    description: 'Complete all core modules with >90% score',
    icon: '🏆',
    tier: 'gold',
    maxProgress: 10
  },
  {
    id: 'week_warrior',
    title: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: '🔥',
    tier: 'silver',
    maxProgress: 7
  },
  {
    id: 'assessment_ace',
    title: 'Assessment Ace',
    description: 'Pass 3 assessments with flying colors',
    icon: '🎯',
    tier: 'platinum',
    maxProgress: 3
  }
];
