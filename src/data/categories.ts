import type { JLPTMajorSection, JLPTSubCategory } from '../types/jlpt';

export interface SectionInfo {
  id: JLPTMajorSection;
  order: number;
  jpName: string;
  labelId: string;
  descriptionId: string;
  officialMinutes: number;
  sectionTimerSec: number;
  totalQuestions: number;
}

export interface SubCategoryInfo {
  id: JLPTSubCategory;
  section: JLPTMajorSection;
  jpName: string;
  enName: string;
  labelId: string;
  descriptionId: string;
  officialCount: number;
}

export const JLPT_SECTIONS: SectionInfo[] = [
  {
    id: 'moji_goi',
    order: 1,
    jpName: '言語知識（文字・語彙）',
    labelId: 'Huruf & Kosakata',
    descriptionId: '5 jenis soal resmi: 漢字読み, 表記, 文脈規定, 言い換え類義, dan 用法.',
    officialMinutes: 30,
    sectionTimerSec: 30 * 60,
    totalQuestions: 35,
  },
  {
    id: 'bunpou_dokkai',
    order: 2,
    jpName: '言語知識（文法）& 読解',
    labelId: 'Tata Bahasa & Bacaan',
    descriptionId: '7 jenis soal resmi: 文の文法１, 文の文法２, 文章の文法, 短文, 中文, 長文, dan 情報検索.',
    officialMinutes: 70,
    sectionTimerSec: 70 * 60,
    totalQuestions: 39,
  },
  {
    id: 'choukai',
    order: 3,
    jpName: '聴解',
    labelId: 'Pemahaman Dengar',
    descriptionId: '5 jenis soal resmi: 課題理解, ポイント理解, 概要理解, 即時応答, dan 統合理解.',
    officialMinutes: 40,
    sectionTimerSec: 40 * 60,
    totalQuestions: 28,
  },
];

export const JLPT_SUB_CATEGORIES: SubCategoryInfo[] = [
  // Section 1: 言語知識（文字・語彙） -> 35 soal
  {
    id: 'kanji_reading',
    section: 'moji_goi',
    jpName: '漢字読み',
    enName: 'Kanji Reading',
    labelId: 'Bacaan Kanji',
    descriptionId: 'Pilih cara baca hiragana yang tepat untuk kata kanji yang disorot.',
    officialCount: 8,
  },
  {
    id: 'orthography',
    section: 'moji_goi',
    jpName: '表記',
    enName: 'Orthography',
    labelId: 'Penulisan Kanji',
    descriptionId: 'Pilih penulisan kanji yang tepat untuk kata hiragana dalam kalimat.',
    officialCount: 6,
  },
  {
    id: 'context',
    section: 'moji_goi',
    jpName: '文脈規定',
    enName: 'Context',
    labelId: 'Makna Konteks',
    descriptionId: 'Pilih kosakata paling sesuai untuk mengisi bagian rumpang kalimat.',
    officialCount: 11,
  },
  {
    id: 'paraphrase',
    section: 'moji_goi',
    jpName: '言い換え類義',
    enName: 'Paraphrases',
    labelId: 'Sinonim & Parafrasa',
    descriptionId: 'Pilih ungkapan dengan arti paling dekat dengan kata yang disorot.',
    officialCount: 5,
  },
  {
    id: 'usage',
    section: 'moji_goi',
    jpName: '用法',
    enName: 'Usage',
    labelId: 'Pemakaian Kata',
    descriptionId: 'Tentukan kalimat yang memakai kata target secara alami dan tepat.',
    officialCount: 5,
  },

  // Section 2: 言語知識（文法）& 読解 -> 39 soal
  {
    id: 'grammar_1',
    section: 'bunpou_dokkai',
    jpName: '文の文法１ (文法形式の判断)',
    enName: 'Sentential Grammar 1',
    labelId: 'Tata Bahasa Kalimat 1',
    descriptionId: 'Pilih partikel atau pola tata bahasa N3 yang tepat.',
    officialCount: 13,
  },
  {
    id: 'grammar_2_star',
    section: 'bunpou_dokkai',
    jpName: '文の文法２ (文の組み立て)',
    enName: 'Sentential Grammar 2 (★)',
    labelId: 'Susun Kalimat ★問題',
    descriptionId: 'Susun 4 potongan kalimat secara berurutan pada posisi ★.',
    officialCount: 5,
  },
  {
    id: 'text_grammar',
    section: 'bunpou_dokkai',
    jpName: '文章の文法',
    enName: 'Text Grammar',
    labelId: 'Tata Bahasa Wacana',
    descriptionId: 'Lengkapi 5 bagian rumpang dalam satu wacana terpadu.',
    officialCount: 5,
  },
  {
    id: 'reading_short',
    section: 'bunpou_dokkai',
    jpName: '内容理解 (短文)',
    enName: 'Short Passages',
    labelId: 'Bacaan Pendek (1 teks · 1 soal)',
    descriptionId: '4 teks pendek terpisah, masing-masing 1 pertanyaan pemahaman.',
    officialCount: 4,
  },
  {
    id: 'reading_mid',
    section: 'bunpou_dokkai',
    jpName: '内容理解 (中文)',
    enName: 'Mid-length Passages',
    labelId: 'Bacaan Menengah (2 teks · 3 soal/teks)',
    descriptionId: '2 teks menengah, masing-masing memiliki 3 pertanyaan isi.',
    officialCount: 6,
  },
  {
    id: 'reading_long',
    section: 'bunpou_dokkai',
    jpName: '内容理解 (長文)',
    enName: 'Long Passage',
    labelId: 'Bacaan Panjang (1 teks · 4 soal)',
    descriptionId: '1 teks panjang komprehensif dengan 4 pertanyaan mendalam.',
    officialCount: 4,
  },
  {
    id: 'info_search',
    section: 'bunpou_dokkai',
    jpName: '情報検索',
    enName: 'Information Retrieval',
    labelId: 'Pencarian Informasi (Pamflet & Tabel)',
    descriptionId: '1 pamflet, brosur, atau tabel jadwal/harga dengan 2 pertanyaan.',
    officialCount: 2,
  },

  // Section 3: 聴解 -> 28 soal
  {
    id: 'listening_task',
    section: 'choukai',
    jpName: '課題理解',
    enName: 'Task-based Comprehension',
    labelId: 'Pemahaman Tugas',
    descriptionId: 'Dengarkan percakapan dan tentukan tindakan selanjutnya yang harus dilakukan.',
    officialCount: 6,
  },
  {
    id: 'listening_point',
    section: 'choukai',
    jpName: 'ポイント理解',
    enName: 'Key Point Comprehension',
    labelId: 'Pemahaman Poin Kunci',
    descriptionId: 'Tangkap alasan, syarat, atau informasi spesifik dari audio percakapan.',
    officialCount: 6,
  },
  {
    id: 'listening_gist',
    section: 'choukai',
    jpName: '概要理解',
    enName: 'General Comprehension',
    labelId: 'Pemahaman Inti Gagasan',
    descriptionId: 'Simpulkan topik utama atau maksud pembicara secara keseluruhan.',
    officialCount: 3,
  },
  {
    id: 'listening_quick',
    section: 'choukai',
    jpName: '即時応答',
    enName: 'Quick Response',
    labelId: 'Respons Cepat Audio',
    descriptionId: 'Dengarkan kalimat pendek lalu pilih balasan yang paling alami.',
    officialCount: 4,
  },
  {
    id: 'listening_integrated',
    section: 'choukai',
    jpName: '統合理解',
    enName: 'Integrated Comprehension',
    labelId: 'Pemahaman Terpadu',
    descriptionId: 'Bandingkan beberapa opsi dalam diskusi panjang lalu tentukan pilihan akhir.',
    officialCount: 9,
  },
];

export function getSubCategoryMeta(id: JLPTSubCategory): SubCategoryInfo {
  return JLPT_SUB_CATEGORIES.find((c) => c.id === id) ?? JLPT_SUB_CATEGORIES[0];
}

export function getSectionMeta(id: JLPTMajorSection): SectionInfo {
  return JLPT_SECTIONS.find((s) => s.id === id) ?? JLPT_SECTIONS[0];
}
