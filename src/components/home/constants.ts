/**
 * Home Page Component Constants
 */

import type { PainPoint } from './types';

export const DEFAULT_PAIN_POINTS: PainPoint[] = [
  {
    videoSrc: "/videos/lep-statistics.mp4",
    title: "20 Million Voices Unheard",
    description:
      "Despite legal requirements under Title VI and Section 1557 of the ACA, Limited English Proficiency (LEP) patients face increased health risks due to interpretation quality issues.",
  },
  {
    videoSrc: "/videos/interpreter-stress.mp4",
    title: "Real-Time Precision Under Pressure",
    description:
      "Medical interpreters face immense pressure to deliver accurate translations in high-stakes situations where every word can impact patient outcomes and safety.",
  },
  {
    videoSrc: "/videos/terminology-gap.mp4",
    title: "Mastering Medicine Alone",
    description:
      "Complex medical terminology and evolving healthcare practices create ongoing challenges for interpreters who must stay current without adequate support systems.",
  },
];

export const HOME_SECTIONS = {
  VIDEO_HERO: 'video_hero',
  SOLUTION_HERO: 'solution_hero',
  STATS: 'stats',
  TESTIMONIALS: 'testimonials',
} as const;

export const SCROLL_CONFIG = {
  SNAP_TYPE: 'y mandatory',
  SECTION_HEIGHT: '100vh',
};
