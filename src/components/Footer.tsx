import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  return (
    <footer id="main-footer" className="py-12 bg-stone-200 dark:bg-zinc-950 border-t border-black/10 dark:border-white/10 text-gray-800 dark:text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8 font-mono text-xs sm:text-sm">
        {/* Footer Navigation Links matching Screenshot 1 */}
        <div className="flex flex-wrap items-center gap-6 font-bold">
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="hover:text-amber-600 transition-colors flex items-center gap-1"
          >
            <span>→ Email</span>
          </a>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-600 transition-colors flex items-center gap-1"
          >
            <span>→ LinkedIn</span>
          </a>

          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-600 transition-colors flex items-center gap-1"
          >
            <span>→ GitHub</span>
          </a>

          <a
            href={PERSONAL_INFO.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-600 transition-colors flex items-center gap-1"
          >
            <span>→ WhatsApp</span>
          </a>
        </div>

        {/* Right Credits */}
        <div className="text-right text-xs text-gray-600 dark:text-gray-400">
          <div>Updated 2026</div>
          <div className="font-bold text-black dark:text-white mt-0.5">{PERSONAL_INFO.name}</div>
        </div>
      </div>
    </footer>
  );
};
