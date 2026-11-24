import React from 'react';
import type { RubySegment } from '../types/jlpt';

interface RubyTextProps {
  segments: RubySegment[];
  furiganaEnabled: boolean;
  className?: string;
}

export const RubyText: React.FC<RubyTextProps> = ({
  segments,
  furiganaEnabled,
  className = '',
}) => {
  return (
    <span className={`font-jp leading-relaxed ${className}`}>
      {segments.map((seg, idx) => {
        const highlightCls = seg.highlight
          ? 'text-[#1D4ED8] font-semibold underline decoration-[#2563EB] decoration-2 underline-offset-4'
          : '';

        if (seg.reading && furiganaEnabled) {
          return (
            <ruby key={idx} className={highlightCls}>
              {seg.text}
              <rp>(</rp>
              <rt>{seg.reading}</rt>
              <rp>)</rp>
            </ruby>
          );
        }

        return (
          <span key={idx} className={highlightCls}>
            {seg.text}
          </span>
        );
      })}
    </span>
  );
};
