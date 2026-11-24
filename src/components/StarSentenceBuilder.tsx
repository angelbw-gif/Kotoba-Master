import React from 'react';
import { RotateCcw, Star } from 'lucide-react';
import type { StarQuestionData } from '../types/jlpt';
import { RubyText } from './RubyText';

interface StarSentenceBuilderProps {
  starData: StarQuestionData;
  placedIds: (string | null)[];
  furiganaEnabled: boolean;
  onPlaceFragment: (fragmentId: string) => void;
  onRemoveSlot: (slotIndex: number) => void;
  onClearAll: () => void;
}

export const StarSentenceBuilder: React.FC<StarSentenceBuilderProps> = ({
  starData,
  placedIds,
  furiganaEnabled,
  onPlaceFragment,
  onRemoveSlot,
  onClearAll,
}) => {
  const usedIds = new Set(placedIds.filter((id): id is string => id !== null));
  const allFilled = placedIds.every((id) => id !== null);

  const getFragment = (id: string | null) =>
    id ? starData.fragments.find((f) => f.id === id) ?? null : null;

  return (
    <div className="space-y-5">
      {/* Sentence Preview with 4 Interactive Slots */}
      <div className="p-5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-3 text-lg sm:text-xl font-jp text-[#0F172A]">
          <RubyText segments={starData.prefix} furiganaEnabled={furiganaEnabled} />

          <div className="inline-flex flex-wrap items-center gap-2 my-1">
            {placedIds.map((fragId, slotIdx) => {
              const fragment = getFragment(fragId);
              const isStarSlot = slotIdx === starData.starSlotIndex;

              let slotStyle =
                'border-dashed border-[#CBD5E1] bg-white text-[#64748B] hover:border-[#2563EB]';

              if (fragment) {
                slotStyle = isStarSlot
                  ? 'border-solid border-[#2563EB] bg-[#EFF6FF] text-[#0F172A]'
                  : 'border-solid border-[#0F172A]/30 bg-white text-[#0F172A] hover:border-[#2563EB]';
              } else if (isStarSlot) {
                slotStyle =
                  'border-dashed border-[#2563EB] bg-[#EFF6FF]/70 text-[#2563EB]';
              }

              return (
                <button
                  key={slotIdx}
                  type="button"
                  disabled={!fragment}
                  onClick={() => onRemoveSlot(slotIdx)}
                  title={
                    fragment ? 'Klik untuk mengembalikan potongan ini' : undefined
                  }
                  className={`relative min-w-[78px] min-h-[46px] px-3.5 py-2 rounded-lg border-2 text-base sm:text-lg font-medium transition-transform active:scale-[0.98] flex items-center justify-center gap-1.5 ${slotStyle}`}
                >
                  {isStarSlot && (
                    <Star
                      className="w-3.5 h-3.5 text-[#2563EB] fill-[#2563EB] shrink-0"
                      aria-label="Posisi bintang"
                    />
                  )}
                  {fragment ? (
                    <RubyText
                      segments={fragment.segments}
                      furiganaEnabled={furiganaEnabled}
                    />
                  ) : (
                    <span className="font-mono-num text-xs">
                      {isStarSlot ? '★' : slotIdx + 1}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <RubyText segments={starData.suffix} furiganaEnabled={furiganaEnabled} />
        </div>
      </div>

      {/* Fragment Bank */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#475569]">
          <span>
            Klik potongan kalimat di bawah untuk mengisi slot secara berurutan (posisi{' '}
            <span className="font-semibold text-[#2563EB]">★</span> adalah slot ke-
            {starData.starSlotIndex + 1}).
          </span>
          {usedIds.size > 0 && (
            <button
              type="button"
              onClick={onClearAll}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#475569] hover:text-[#2563EB] transition-colors whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              Reset Urutan
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {starData.fragments.map((frag) => {
            const isUsed = usedIds.has(frag.id);
            return (
              <button
                key={frag.id}
                type="button"
                disabled={isUsed}
                onClick={() => onPlaceFragment(frag.id)}
                className={`min-h-[48px] px-4 py-2.5 rounded-lg border text-base font-jp transition-all flex items-center justify-center ${
                  isUsed
                    ? 'bg-[#F1F5F9] border-[#E2E8F0] text-[#94A3B8] cursor-not-allowed'
                    : 'bg-white border-[#E2E8F0] text-[#0F172A] hover:border-[#2563EB] hover:bg-[#EFF6FF]/60 active:scale-[0.98]'
                }`}
              >
                <RubyText
                  segments={frag.segments}
                  furiganaEnabled={furiganaEnabled}
                />
              </button>
            );
          })}
        </div>

        {allFilled && (
          <p className="text-xs font-medium text-[#2563EB]">
            Susunan kalimat tersimpan. Klik salah satu slot di atas jika ingin mengubah urutan sebelum kumpul jawaban.
          </p>
        )}
      </div>
    </div>
  );
};
