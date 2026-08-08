import React from 'react';
import { ThemeStyle } from '../types';

interface AnimatedBackgroundProps {
  theme: ThemeStyle;
  baseClass: string;
}

// Three glow colors per theme — each blob drifts on its own path/speed via
// the blobFloat1/2/3 keyframes in index.css, so the mix of colors you see
// keeps changing on its own, no click needed.
const THEME_BLOB_COLORS: Record<ThemeStyle, [string, string, string]> = {
  linen: ['#f4c98b', '#f2a6a6', '#a8d4c8'],
  'blue-glow': ['#3b82f6', '#a855f7', '#06b6d4'],
  'amber-orange': ['#f59e0b', '#ef4444', '#eab308'],
  'teal-mesh': ['#2dd4bf', '#0ea5e9', '#22d3ee'],
  'dark-editorial': ['#818cf8', '#f472b6', '#38bdf8'],
};

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ theme, baseClass }) => {
  const [c1, c2, c3] = THEME_BLOB_COLORS[theme] || THEME_BLOB_COLORS.linen;

  return (
    <div
      className={`fixed inset-0 -z-10 overflow-hidden transition-colors duration-700 ${baseClass}`}
      aria-hidden="true"
    >
      <div className="bg-blob bg-blob-1" style={{ background: c1 }} />
      <div className="bg-blob bg-blob-2" style={{ background: c2 }} />
      <div className="bg-blob bg-blob-3" style={{ background: c3 }} />
    </div>
  );
};
