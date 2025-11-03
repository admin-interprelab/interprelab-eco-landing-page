/**
 * Utility functions for InterpreBot Components
 */

import type { AssessmentSkill, CompetencyArea, ChatMessage, AssessmentResult } from './types';
import { PERFORMANCE_THRESHOLDS, SKILL_CATEGORIES } from './constants';

/**
 * Get performance level based on score
 */
export const getPerformanceLevel = (score: number): 'excellent' | 'good' | 'satisfactory' | 'needs-improvement' => {
  if (score >= PERFORMANCE_THRESHOLDS.excellent) return 'excellent';
  if (score >= PERFORMANCE_THRESHOLDS.good) return 'good';
  if (score >= PERFORMANCE_THRESHOLDS.satisfactory) return 'satisfactory';
  return 'needs-improvement';
};

/**
 * Get performance color based on score
 */
export const getPerformanceColor = (score: number): string => {
  const level = getPerformanceLevel(score);

  switch (level) {
    case 'excellent':
      return 'text-green-600';
    case 'good':
      return 'text-blue-600';
    case 'satisfactory':
      return 'text-yellow-600';
    case 'needs-improvement':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
};

/**
 * Get skill category configuration
 */
export const getSkillCategoryConfig = (category: keyof typeof SKILL_CATEGORIES) => {
  return SKILL_CATEGORIES[category] || SKILL_CATEGORIES.linguistic;
};

/**
 * Calculate overall assessment score
 */
export const calculateOverallScore = (skills: AssessmentSkill[]): number => {
  if (skills.length === 0) return 0;

  const totalScore = skills.reduce((sum, skill) => sum + skill.score, 0);
  return Math.round(totalScore / skills.length);
};

/**
 * Group skills by category
 */
export const groupSkillsByCategory = (skills: AssessmentSkill[]): Record<string, AssessmentSkill[]> => {
  return skills.reduce((groups, skill) => {
    const category = skill.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(skill);
    return groups;
  }, {} as Record<string, AssessmentSkill[]>);
};

/**
 * Get top performing skills
 */
export const getTopSkills = (skills: AssessmentSkill[], count: number = 3): AssessmentSkill[] => {
  return [...skills]
    .sort((a, b) => b.score - a.score)
    .slice(0, count);
};

/**
 * Get skills needing improvement
 */
export const getSkillsNeedingImprovement = (skills: AssessmentSkill[], threshold: number = 85): AssessmentSkill[] => {
  return skills
    .filter(skill => skill.score < threshold)
    .sort((a, b) => a.score - b.score);
};

/**
 * Generate assessment recommendations
 */
export const generateRecommendations = (skills: AssessmentSkill[]): string[] => {
  const recommendations: string[] = [];
  const weakSkills = getSkillsNeedingImprovement(skills);

  if (weakSkills.length > 0) {
    const weakestSkill = weakSkills[0];
    recommendations.push(`Focus on improving ${weakestSkill.skill.toLowerCase()} through targeted practice.`);

    if (weakestSkill.improvement) {
      recommendations.push(weakestSkill.improvement);
    }
  }

  const categoryGroups = groupSkillsByCategory(skills);
  const weakCategories = Object.entries(categoryGroups)
    .filter(([_, categorySkills]) => {
      const avgScore = calculateOverallScore(categorySkills);
      return avgScore < 85;
    })
    .map(([category]) => category);

  if (weakCategories.includes('medical')) {
    recommendations.push('Consider additional medical terminology training and certification courses.');
  }

  if (weakCategories.includes('cultural')) {
    recommendations.push('Enhance cultural competency through diverse case studies and cultural awareness training.');
  }

  return recommendations;
};

/**
 * Generate strengths list
 */
export const generateStrengths = (skills: AssessmentSkill[]): string[] => {
  const topSkills = getTopSkills(skills);
  return topSkills.map(skill => `Excellent ${skill.skill.toLowerCase()} with ${skill.score}% proficiency`);
};

/**
 * Generate improvement areas
 */
export const generateImprovements = (skills: AssessmentSkill[]): string[] => {
  const weakSkills = getSkillsNeedingImprovement(skills);
  return weakSkills.map(skill => `${skill.skill}: ${skill.improvement || 'Requires focused practice'}`);
};

/**
 * Generate next steps
 */
export const generateNextSteps = (skills: AssessmentSkill[]): string[] => {
  const steps: string[] = [];
  const overallScore = calculateOverallScore(skills);

  if (overallScore >= 90) {
    steps.push('Consider advanced certification programs');
    steps.push('Mentor junior interpreters');
    steps.push('Specialize in complex medical procedures');
  } else if (overallScore >= 80) {
    steps.push('Focus on weak areas identified in assessment');
    steps.push('Practice with real-world scenarios');
    steps.push('Seek feedback from experienced interpreters');
  } else {
    steps.push('Enroll in foundational interpretation courses');
    steps.push('Practice basic medical terminology daily');
    steps.push('Work with a mentor or coach');
  }

  return steps;
};

/**
 * Format timestamp for display
 */
export const formatTimestamp = (timestamp: Date): string => {
  return timestamp.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Generate unique message ID
 */
export const generateMessageId = (): string => {
  return `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Validate chat message
 */
export const isValidMessage = (message: string): boolean => {
  return message.trim().length > 0 && message.length <= 500;
};

/**
 * Get animation delay for skill bars
 */
export const getSkillAnimationDelay = (index: number, baseDelay: number = 200): string => {
  return `${index * baseDelay}ms`;
};

/**
 * Calculate assessment progress
 */
export const calculateAssessmentProgress = (currentStep: number, totalSteps: number): number => {
  return Math.round((currentStep / totalSteps) * 100);
};

/**
 * Get competency color class
 */
export const getCompetencyColorClass = (category: 'primary' | 'success' | 'warning' | 'secondary'): string => {
  const colorMap = {
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    secondary: 'bg-secondary/10 text-secondary',
  };

  return colorMap[category] || colorMap.primary;
};

/**
 * Generate assessment result
 */
export const generateAssessmentResult = (skills: AssessmentSkill[]): AssessmentResult => {
  return {
    id: `assessment-${Date.now()}`,
    overallScore: calculateOverallScore(skills),
    skills,
    recommendations: generateRecommendations(skills),
    strengths: generateStrengths(skills),
    improvements: generateImprovements(skills),
    nextSteps: generateNextSteps(skills),
    timestamp: new Date(),
  };
};

/**
 * Export assessment to JSON
 */
export const exportAssessmentToJSON = (result: AssessmentResult): string => {
  return JSON.stringify(result, null, 2);
};

/**
 * Get skill improvement priority
 */
export const getSkillPriority = (skill: AssessmentSkill): 'high' | 'medium' | 'low' => {
  if (skill.score < 70) return 'high';
  if (skill.score < 85) return 'medium';
  return 'low';
};

/**
 * Filter skills by priority
 */
export const filterSkillsByPriority = (
  skills: AssessmentSkill[],
  priority: 'high' | 'medium' | 'low'
): AssessmentSkill[] => {
  return skills.filter(skill => getSkillPriority(skill) === priority);
};

/**
 * Get suggestion based on user input
 */
export const getSuggestionForInput = (input: string): string | null => {
  const lowerInput = input.toLowerCase();

  if (lowerInput.includes('weak') || lowerInput.includes('improve')) {
    return 'I can help identify your areas for improvement and create a personalized learning plan.';
  }

  if (lowerInput.includes('score') || lowerInput.includes('result')) {
    return 'Your assessment results show detailed scores across all competency areas.';
  }

  if (lowerInput.includes('practice') || lowerInput.includes('training')) {
    return 'I recommend focusing on scenario-based practice for your specific improvement areas.';
  }

  return null;
};

/**
 * Truncate text for display
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};

/**
 * Get random encouragement message
 */
export const getEncouragementMessage = (): string => {
  const messages = [
    'Great progress! Keep up the excellent work.',
    'Your dedication to improvement is impressive.',
    'You\'re on the right track to mastering interpretation.',
    'Every practice session brings you closer to excellence.',
    'Your commitment to learning is commendable.',
  ];

  return messages[Math.floor(Math.random() * messages.length)];
};
