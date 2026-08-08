import React, { useState } from 'react';
import { ProjectCard } from './ProjectCard';
import { PROJECTS_DATA } from '../data/portfolioData';
import { Project } from '../types';
import { Filter, ArrowUpRight } from 'lucide-react';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'AI & Deep Learning', 'Fullstack Web', 'AI Automation', 'Mobile AI'];

  const filteredProjects =
    selectedCategory === 'All'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === selectedCategory);

  return (
    <section id="project" className="py-16 border-b border-black/10 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-600 mb-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
              Portfolio Showcase
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-black dark:text-white tracking-tight">
              My Featured Projects
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mt-2 max-w-2xl">
              Explore production applications, medical AI detection systems, internal company platforms, and automated workflow solutions.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 items-center bg-black/5 dark:bg-white/5 p-1.5 rounded-xl border border-black/10 dark:border-white/10">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`filter-btn-${cat.replace(/\s+/g, '-').toLowerCase()}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-black text-white dark:bg-white dark:text-black shadow-md'
                    : 'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Vertical Watermark & Projects List (Matching Screenshot 1 & 2) */}
        <div className="relative">
          {/* Vertical Watermark text on large screens */}
          <div className="hidden xl:block absolute -left-16 top-24 origin-top-left -rotate-90 font-mono text-3xl font-black tracking-widest text-black/10 dark:text-white/10 select-none pointer-events-none">
            MY PROJECTS ↗
          </div>

          <div className="space-y-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelectProject={onSelectProject}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
