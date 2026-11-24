import { getSectionMeta, getSubCategoryMeta } from './categories';
import type {
  JLPTMajorSection,
  JLPTQuestion,
  JLPTSubCategory,
  QuizOption,
} from '../types/jlpt';
import { BUNPOU_DOKKAI_QUESTIONS } from './questionsBunpouDokkai';
import { BUNPOU_DOKKAI_EXTRA_QUESTIONS } from './questionsBunpouDokkaiExtra';
import { BUNPOU_DOKKAI_EXTRA_2_QUESTIONS } from './questionsBunpouDokkaiExtra2';
import { CHOUKAI_QUESTIONS } from './questionsChoukai';
import { CHOUKAI_EXTRA_QUESTIONS } from './questionsChoukaiExtra';
import { CHOUKAI_EXTRA_2_QUESTIONS } from './questionsChoukaiExtra2';
import { MOJI_GOI_QUESTIONS } from './questionsMojiGoi';
import { MOJI_GOI_EXTRA_QUESTIONS } from './questionsMojiGoiExtra';
import { MOJI_GOI_EXTRA_2_QUESTIONS } from './questionsMojiGoiExtra2';

export const JLPT_QUESTIONS: JLPTQuestion[] = [
  ...MOJI_GOI_QUESTIONS,
  ...MOJI_GOI_EXTRA_QUESTIONS,
  ...MOJI_GOI_EXTRA_2_QUESTIONS,
  ...BUNPOU_DOKKAI_QUESTIONS,
  ...BUNPOU_DOKKAI_EXTRA_QUESTIONS,
  ...BUNPOU_DOKKAI_EXTRA_2_QUESTIONS,
  ...CHOUKAI_QUESTIONS,
  ...CHOUKAI_EXTRA_QUESTIONS,
  ...CHOUKAI_EXTRA_2_QUESTIONS,
];

const SUB_CATEGORY_ORDER: Record<JLPTSubCategory, number> = {
  // Section 1: 35 soal
  kanji_reading: 1,
  orthography: 2,
  context: 3,
  paraphrase: 4,
  usage: 5,
  // Section 2: 39 soal
  grammar_1: 6,
  grammar_2_star: 7,
  text_grammar: 8,
  reading_short: 9,
  reading_mid: 10,
  reading_long: 11,
  info_search: 12,
  // Section 3: 28 soal
  listening_task: 13,
  listening_point: 14,
  listening_gist: 15,
  listening_quick: 16,
  listening_integrated: 17,
};

function shuffleArray<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const ORDERED_OPTION_REGEX =
  /^(A[：店]|B[：店]|C[：店]|D[：店]|①|②|③|④|[1-4]番|\d[\d,]*円|\d+日)/;

function shouldPreserveOptionOrder(q: JLPTQuestion): boolean {
  if (!q.options || q.options.length !== 4) return true;
  if (q.category === 'info_search') return true;
  return q.options.every((opt) => ORDERED_OPTION_REGEX.test(opt.plainText.trim()));
}

/**
 * Randomizes option order across positions 1..4 so correct answers are evenly
 * distributed (~25% each) instead of clustering at option 1, and scrambles
 * ★問題 fragments so they never appear pre-sorted.
 * Original option `id` ('a'|'b'|'c'|'d') stays intact so client & server
 * grading by `correctOptionId` remains exact.
 */
export function randomizeQuestionOptions(questions: JLPTQuestion[]): JLPTQuestion[] {
  const shuffleableIndices: number[] = [];
  questions.forEach((q, idx) => {
    if (!shouldPreserveOptionOrder(q)) {
      shuffleableIndices.push(idx);
    }
  });

  // Build balanced target slot list [0,1,2,3, 0,1,2,3, ...] and shuffle it
  const slotPool: number[] = [];
  for (let i = 0; i < shuffleableIndices.length; i++) {
    slotPool.push(i % 4);
  }
  const shuffledSlots = shuffleArray(slotPool);
  const targetSlotByQuestionIdx = new Map<number, number>();
  shuffleableIndices.forEach((qIdx, i) => {
    targetSlotByQuestionIdx.set(qIdx, shuffledSlots[i]);
  });

  return questions.map((q, idx) => {
    // Scramble ★問題 fragments so they are never in solved 1-2-3-4 order
    if (q.category === 'grammar_2_star' && q.starData) {
      let scrambled = shuffleArray(q.starData.fragments);
      const isAlreadySolved = scrambled.every(
        (f, fIdx) => f.id === q.starData?.correctOrderIds[fIdx]
      );
      if (isAlreadySolved && scrambled.length === 4) {
        scrambled = [scrambled[1], scrambled[3], scrambled[0], scrambled[2]];
      }
      return {
        ...q,
        starData: {
          ...q.starData,
          fragments: scrambled,
        },
      };
    }

    const targetSlot = targetSlotByQuestionIdx.get(idx);
    if (targetSlot === undefined || !q.options || !q.correctOptionId) {
      return q;
    }

    const correctOpt = q.options.find((o) => o.id === q.correctOptionId);
    if (!correctOpt) return q;

    const distractors = shuffleArray(
      q.options.filter((o) => o.id !== q.correctOptionId)
    );
    const reordered: QuizOption[] = [];
    let dIdx = 0;
    for (let slot = 0; slot < 4; slot++) {
      if (slot === targetSlot) {
        reordered.push(correctOpt);
      } else if (dIdx < distractors.length) {
        reordered.push(distractors[dIdx++]);
      }
    }

    return {
      ...q,
      options: reordered,
    };
  });
}

/**
 * Selects official JLPT N3 question counts for the given section or sub-category
 * with fresh randomized sampling on every session.
 * - Prioritizes questions NOT in `excludeIds` so "Kuis Lagi" / rematch avoids repeats.
 * - Keeps passage-grouped questions (文章の文法, 内容理解 中文/長文, 情報検索)
 *   contiguous in their proper 1..N sequence.
 * - Balances & randomizes option positions (1..4) on every run.
 */
export function buildOfficialSectionQuestions(
  sectionFilter: JLPTMajorSection,
  categoryFilter: 'all' | JLPTSubCategory,
  excludeIds?: Set<string>
): JLPTQuestion[] {
  const pool = JLPT_QUESTIONS.filter((q) => {
    if (categoryFilter !== 'all') {
      return q.category === categoryFilter;
    }
    return q.section === sectionFilter;
  });

  if (pool.length === 0) {
    return buildOfficialSectionQuestions('moji_goi', 'all', excludeIds);
  }

  const buckets = new Map<JLPTSubCategory, JLPTQuestion[]>();
  for (const q of pool) {
    const list = buckets.get(q.category) ?? [];
    list.push(q);
    buckets.set(q.category, list);
  }

  const orderedCategories = Array.from(buckets.keys()).sort(
    (a, b) => SUB_CATEGORY_ORDER[a] - SUB_CATEGORY_ORDER[b]
  );

  const result: JLPTQuestion[] = [];

  for (const cat of orderedCategories) {
    const items = buckets.get(cat) ?? [];
    const targetCount = getSubCategoryMeta(cat).officialCount;

    // Group contiguous passage blocks together; standalone questions become 1-item units
    const units: JLPTQuestion[][] = [];
    const groupMap = new Map<string, JLPTQuestion[]>();

    for (const q of items) {
      if (q.passageGroupId) {
        let grp = groupMap.get(q.passageGroupId);
        if (!grp) {
          grp = [];
          groupMap.set(q.passageGroupId, grp);
          units.push(grp);
        }
        grp.push(q);
      } else {
        units.push([q]);
      }
    }

    const unseenUnits: JLPTQuestion[][] = [];
    const seenUnits: JLPTQuestion[][] = [];

    for (const unit of units) {
      const hasSeen = Boolean(excludeIds && unit.some((q) => excludeIds.has(q.id)));
      if (hasSeen) {
        seenUnits.push(unit);
      } else {
        unseenUnits.push(unit);
      }
    }

    const candidates = [...shuffleArray(unseenUnits), ...shuffleArray(seenUnits)];
    const picked: JLPTQuestion[] = [];

    for (const unit of candidates) {
      if (picked.length >= targetCount) break;
      if (picked.length + unit.length <= targetCount || picked.length === 0) {
        picked.push(...unit);
      }
    }

    result.push(...picked.slice(0, targetCount));
  }

  return randomizeQuestionOptions(result);
}

export function getDailyVariationStats(
  sectionFilter: JLPTMajorSection,
  categoryFilter: 'all' | JLPTSubCategory,
  completedTodayIds: string[]
): { poolTotal: number; unseenCount: number; examCount: number } {
  const completedSet = new Set(completedTodayIds);
  const pool = JLPT_QUESTIONS.filter((q) =>
    categoryFilter !== 'all' ? q.category === categoryFilter : q.section === sectionFilter
  );
  const unseenCount = pool.filter((q) => !completedSet.has(q.id)).length;
  const examCount =
    categoryFilter !== 'all'
      ? getSubCategoryMeta(categoryFilter).officialCount
      : getSectionMeta(sectionFilter).totalQuestions;

  return {
    poolTotal: pool.length,
    unseenCount,
    examCount,
  };
}
