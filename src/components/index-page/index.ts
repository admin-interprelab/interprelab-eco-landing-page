/**
 * Index Page Components Export
 */

// Explicitly reference the TSX file to avoid case-insensitive re-export cycles on Windows
export { Index } from './Index.tsx';
export { MainContent } from './MainContent';

// Hooks
export { useIndexAnalytics } from './hooks';

// Types
export type {
  IndexPageProps,
  MainContentProps,
} from './types';

// Constants
export {
  INDEX_SECTIONS,
  DEFAULT_SECTION_CONFIG,
} from './constants';
