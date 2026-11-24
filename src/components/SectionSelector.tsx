import React from 'react';
import {
  getSectionMeta,
  getSubCategoryMeta,
  JLPT_SECTIONS,
  JLPT_SUB_CATEGORIES,
} from '../data/categories';
import type { JLPTMajorSection, JLPTSubCategory } from '../types/jlpt';

interface SectionSelectorProps {
  sectionFilter: JLPTMajorSection;
  categoryFilter: 'all' | JLPTSubCategory;
  disabled?: boolean;
  onChange: (section: JLPTMajorSection, category: 'all' | JLPTSubCategory) => void;
  footerSlot?: React.ReactNode;
}

export const SectionSelector: React.FC<SectionSelectorProps> = ({
  sectionFilter,
  categoryFilter,
  disabled = false,
  onChange,
  footerSlot,
}) => {
  const activeSectionMeta = getSectionMeta(sectionFilter);
  const subCategories = JLPT_SUB_CATEGORIES.filter(
    (c) => c.section === sectionFilter
  );

  const selectedCount =
    categoryFilter === 'all'
      ? activeSectionMeta.totalQuestions
      : getSubCategoryMeta(categoryFilter).officialCount;

  const selectedLabel =
    categoryFilter === 'all'
      ? `Seluruh Bagian ${activeSectionMeta.order} (${activeSectionMeta.jpName})`
      : `${getSubCategoryMeta(categoryFilter).jpName} · ${getSubCategoryMeta(categoryFilter).labelId}`;

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display font-bold text-lg text-[#0F172A]">
            Bagian &amp; Jenis Soal Resmi JLPT N3
          </h2>
          <p className="text-xs text-[#475569] mt-0.5">
            Pilih salah satu dari 3 bagian ujian — jumlah soal dan timer otomatis mengikuti standar JLPT N3
          </p>
        </div>
        <span className="font-mono-num text-xs font-semibold text-[#2563EB]">
          {selectedCount} soal · {activeSectionMeta.officialMinutes} menit
        </span>
      </div>

      {/* 3 Official JLPT N3 Sections (No "Semua Bagian N3") */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {JLPT_SECTIONS.map((sec) => {
          const isSelected = sectionFilter === sec.id;
          return (
            <button
              key={sec.id}
              type="button"
              disabled={disabled}
              onClick={() => onChange(sec.id, 'all')}
              className={`p-4 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-[#0F172A] border-[#0F172A] text-white'
                  : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A] hover:border-[#2563EB]'
              } disabled:opacity-60`}
            >
              <div className="flex items-center justify-between gap-2 text-xs">
                <span
                  className={`font-semibold ${
                    isSelected ? 'text-[#93C5FD]' : 'text-[#2563EB]'
                  }`}
                >
                  Bagian {sec.order}
                </span>
                <span
                  className={`font-mono-num font-semibold ${
                    isSelected ? 'text-[#E2E8F0]' : 'text-[#475569]'
                  }`}
                >
                  {sec.totalQuestions} soal · {sec.officialMinutes}m
                </span>
              </div>
              <p className="font-jp font-bold text-sm mt-1.5">{sec.jpName}</p>
              <p
                className={`text-xs mt-0.5 ${
                  isSelected ? 'text-[#CBD5E1]' : 'text-[#475569]'
                }`}
              >
                {sec.labelId}
              </p>
            </button>
          );
        })}
      </div>

      {/* Selected Section Overview + Full-Section Choice */}
      <div className="space-y-3 pt-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <p className="text-xs font-semibold text-[#334155]">
            Jenis Soal pada Bagian {activeSectionMeta.order}:{' '}
            <span className="font-jp text-[#0F172A]">{activeSectionMeta.jpName}</span>
          </p>
          <button
            type="button"
            disabled={disabled}
            onClick={() => onChange(sectionFilter, 'all')}
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors whitespace-nowrap self-start sm:self-auto ${
              categoryFilter === 'all'
                ? 'bg-[#2563EB] border-[#2563EB] text-white'
                : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#334155] hover:border-[#2563EB]'
            } disabled:opacity-60`}
          >
            Semua Jenis di Bagian Ini ({activeSectionMeta.totalQuestions} soal)
          </button>
        </div>

        {/* Sub-Categories Grid for the Clicked Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {subCategories.map((cat) => {
            const isSelected = categoryFilter === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                disabled={disabled}
                onClick={() =>
                  onChange(sectionFilter, isSelected ? 'all' : cat.id)
                }
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-[#EFF6FF] border-[#2563EB] ring-1 ring-[#2563EB]'
                    : 'bg-[#F8FAFC] border-[#E2E8F0] hover:border-[#2563EB]/60'
                } disabled:opacity-70`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-jp text-sm font-bold text-[#0F172A]">
                    {cat.jpName}
                  </span>
                  <span className="font-mono-num text-xs font-semibold text-[#2563EB] shrink-0">
                    {cat.officialCount} soal
                  </span>
                </div>
                <p className="text-xs font-medium text-[#334155] mt-0.5">
                  {cat.labelId} · {cat.enName}
                </p>
                <p className="text-xs text-[#475569] mt-1 line-clamp-2">
                  {cat.descriptionId}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Info & CTA Slot (No manual question count selector) */}
      <div className="pt-3 border-t border-[#F1F5F9] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-xs text-[#475569]">
          <span>Terpilih: </span>
          <strong className="text-[#0F172A]">{selectedLabel}</strong>
          <span className="font-mono-num text-[#2563EB] ml-1.5">
            ({selectedCount} soal otomatis)
          </span>
        </div>
        {footerSlot}
      </div>
    </div>
  );
};
