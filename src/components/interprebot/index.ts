/**
 * InterpreBot Components Barrel Export
 */

// Components
export { InterpreBotHeader } from './InterpreBotHeader';
export { WelcomeScreen } from './WelcomeScreen';
export { CompetencyCard } from './CompetencyCard';
export { AssessmentScreen } from './AssessmentScreen';
export { SkillProgressBar } from './SkillProgressBar';
export { RecommendationCard } from './RecommendationCard';
export { ChatInterface } from './ChatInterface';
export { MinimizedBot } from './MinimizedBot';

// Types
export type {
  AssessmentSkill,
  CompetencyArea,
  ChatMessage,
  AssessmentResult,
  InterpreBotState,
  InterpreBotProps,
  InterpreBotHeaderProps,
  WelcomeScreenProps,
  AssessmentScreenProps,
  ChatInterfaceProps,
  MinimizedBotProps,
  SkillProgressBarProps,
  CompetencyCardProps,
  RecommendationCardProps,
} from './types';

// Constants
export {
  INTERPREBOT_DIMENSIONS,
  DEFAULT_POSITION,
  ASSESSMENT_SKILLS,
  COMPETENCY_AREAS,
  DEFAULT_INTERPREBOT_STATE,
  CHAT_SUGGESTIONS,
  ASSESSMENT_RECOMMENDATIONS,
  ANIMATION_CONFIG,
  COLOR_SCHEMES,
  ASSESSMENT_STEPS,
  SKILL_CATEGORIES,
  PERFORMANCE_THRESHOLDS,
  MESSAGE_TYPES,
} from './constants';

// Utils
export {
  getPerformanceLevel,
  getPerformanceColor,
  getSkillCategoryConfig,
  calculateOverallScore,
  groupSkillsByCategory,
  getTopSkills,
  getSkillsNeedingImprovement,
  generateRecommendations,
  generateStrengths,
  generateImprovements,
  generateNextSteps,
  formatTimestamp,
  generateMessageId,
  isValidMessage,
  getSkillAnimationDelay,
  calculateAssessmentProgress,
  getCompetencyColorClass,
  generateAssessmentResult,
  exportAssessmentToJSON,
  getSkillPriority,
  filterSkillsByPriority,
  getSuggestionForInput,
  truncateText,
  getEncouragementMessage,
} from './utils';

// Hooks
export {
  useInterpreBotState,
  useAssessmentProcess,
  useChatInterface,
  useDraggableBot,
  useSkillAnimations,
  useNotifications,
  useKeyboardShortcuts,
  useLocalStoragePersistence,
} from './hooks';
