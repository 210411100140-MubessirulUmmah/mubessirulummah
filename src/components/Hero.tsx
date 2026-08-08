import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Sparkles, Download, MapPin, Clock, Award, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onExploreProjects: () => void;
  onOpenPlayground: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreProjects, onOpenPlayground }) => {
  const [timeString, setTimeString] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format to WIB / Indonesia Time (Asia/Jakarta)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: PERSONAL_INFO.timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setTimeString(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero-section" className="pt-8 pb-16 border-b border-black/10 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Location & Live Time Badge (Matching Screenshot 1) */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-black/10 dark:border-white/10 font-mono text-xs sm:text-sm text-gray-800 dark:text-gray-200">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-600 dark:text-amber-400 animate-pulse" />
            <span>Based in {PERSONAL_INFO.location}</span>
          </div>
          <div className="flex items-center gap-2 bg-black/5 dark:bg-white/10 px-3 py-1 rounded-full">
            <Clock className="w-3.5 h-3.5 text-gray-600 dark:text-gray-300" />
            <span>
              WIB Local Time <span className="mx-1 font-semibold text-black dark:text-white">→</span>{' '}
              <span className="font-bold tracking-widest text-black dark:text-white">{timeString || '10:01:18 PM'}</span>
            </span>
          </div>
        </div>

        {/* Hero Content */}
        <div className="pt-10 sm:pt-16 pb-6 max-w-4xl">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-black dark:text-white tracking-tight leading-[1.08] mb-8 font-sans">
            Hi, this is {PERSONAL_INFO.shortName}.
          </h1>

          {/* Subtitle Statements matching Screenshot 1 */}
          <div className="space-y-4 font-sans text-base sm:text-xl font-medium text-gray-800 dark:text-gray-200 mb-10 leading-relaxed">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
              <span className="font-mono text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 w-28">
                Currently
              </span>
              <span className="font-bold text-black dark:text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping" />
                {PERSONAL_INFO.status}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
              <span className="font-mono text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 w-28">
                Passionate
              </span>
              <span className="text-gray-900 dark:text-gray-100">
                Building <strong className="text-black dark:text-white">Computer Vision, Deep Learning</strong> & AI Automation Workflows
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
              <span className="font-mono text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 w-28">
                Delivering
              </span>
              <span className="text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-600 dark:text-amber-400 inline" />
                3 Peer-Reviewed Papers & Production AI Platforms 😊
              </span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              id="hero-explore-projects-btn"
              onClick={onExploreProjects}
              className="px-6 py-3.5 rounded-lg bg-black text-white dark:bg-white dark:text-black font-bold text-sm hover:bg-gray-800 dark:hover:bg-gray-200 transition-all flex items-center gap-2 shadow-lg group active:scale-95"
            >
              <span>Explore Selected Projects</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <button
              id="hero-ai-playground-btn"
              onClick={onOpenPlayground}
              className="px-6 py-3.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-bold text-sm transition-all flex items-center gap-2 shadow-md active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-black fill-black" />
              <span>Ask AI CV Assistant</span>
            </button>

            <a
              id="hero-download-cv-btn"
              href={`mailto:${PERSONAL_INFO.email}?subject=Request CV - Mubessirul Ummah`}
              className="px-5 py-3.5 rounded-lg border-2 border-black/20 dark:border-white/30 hover:border-black dark:hover:border-white text-black dark:text-white font-bold text-sm transition-all flex items-center gap-2 hover:bg-black/5 dark:hover:bg-white/10"
            >
              <FileText className="w-4 h-4" />
              <span>Get Full CV</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
