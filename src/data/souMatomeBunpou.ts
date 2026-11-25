import type { SouMatomeWeek } from '../types/jlpt';
import { SOU_MATOME_W1_2 } from './souMatomeBunpouW1_2';
import { SOU_MATOME_W3_4 } from './souMatomeBunpouW3_4';
import { SOU_MATOME_W5_6 } from './souMatomeBunpouW5_6';

export const SOU_MATOME_BUNPOU_WEEKS: SouMatomeWeek[] = [
  ...SOU_MATOME_W1_2,
  ...SOU_MATOME_W3_4,
  ...SOU_MATOME_W5_6,
];

export const SOU_MATOME_TOTAL_LESSON_DAYS = SOU_MATOME_BUNPOU_WEEKS.reduce(
  (acc, w) => acc + w.days.length,
  0
);

export const SOU_MATOME_TOTAL_JISSEN = SOU_MATOME_BUNPOU_WEEKS.length;
