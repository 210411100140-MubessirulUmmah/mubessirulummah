import React from 'react';
import { ArrowUpRight, ExternalLink, Sparkles, Layers, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onSelectProject: (project: Project) => void;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelectProject, index }) => {
  const getThemeBg = (theme: Project['imageTheme']) => {
    switch (theme) {
      case 'dark':
        return 'from-slate-900 to-black text-white';
      case 'blue':
        return 'from-sky-900 to-indigo-950 text-white';
      case 'pink':
        return 'from-rose-900 to-pink-950 text-white';
      case 'green':
        return 'from-emerald-900 to-teal-950 text-white';
      case 'amber':
        return 'from-amber-800 to-orange-950 text-white';
      default:
        return 'from-gray-800 to-gray-900 text-white';
    }
  };

  return (
    <div
      id={`project-card-${project.id}`}
      className="group bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md rounded-2xl border border-black/10 dark:border-white/10 p-6 sm:p-8 hover:shadow-xl transition-all duration-300 flex flex-col lg:flex-row gap-8 items-center justify-between"
    >
      {/* Left Text Info */}
      <div className="lg:w-1/2 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-black/5 dark:bg-white/10 text-gray-800 dark:text-gray-200">
            {project.category}
          </span>
          {project.badge && (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-black flex items-center gap-1">
              <Sparkles className="w-3 h-3 fill-black" />
              {project.badge}
            </span>
          )}
        </div>

        <div>
          <h3 className="text-2xl sm:text-3xl font-black text-black dark:text-white tracking-tight group-hover:text-amber-600 transition-colors">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm font-mono text-gray-500 mt-1">
            {project.clientOrOrg} • {project.timeline}
          </p>
        </div>

        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          {project.description}
        </p>

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.tools.slice(0, 5).map((tool, i) => (
            <span
              key={i}
              className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-black/5 dark:bg-white/10 text-gray-800 dark:text-gray-200"
            >
              {tool}
            </span>
          ))}
          {project.tools.length > 5 && (
            <span className="px-2 py-1 rounded-md text-[11px] font-mono text-gray-500">
              +{project.tools.length - 5} more
            </span>
          )}
        </div>

        {/* Action button */}
        <div className="pt-4">
          <button
            id={`view-project-btn-${project.id}`}
            onClick={() => onSelectProject(project)}
            className="inline-flex items-center gap-2 font-bold text-sm text-black dark:text-white hover:text-amber-600 border-b-2 border-black dark:border-white hover:border-amber-600 pb-1 transition-all group-hover:translate-x-1"
          >
            <span>View Project Details</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Right Mockup Representation (Matches Screenshot 1, 2 laptop & phone frame visual) */}
      <div className="lg:w-1/2 w-full">
        <div
          onClick={() => onSelectProject(project)}
          className={`cursor-pointer relative rounded-xl bg-gradient-to-br ${getThemeBg(
            project.imageTheme
          )} p-6 sm:p-8 overflow-hidden shadow-2xl border border-white/10 transform transition-transform group-hover:scale-[1.02] duration-300 min-h-[220px] sm:min-h-[260px] flex flex-col justify-between`}
        >
          {/* Subtle background graphic lines */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Simulated Browser Bar */}
          <div className="relative z-10 flex items-center justify-between border-b border-white/20 pb-3 mb-4">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            <span className="font-mono text-[10px] text-white/60 truncate max-w-[180px]">
              https://app.{project.id}.id
            </span>
            <div className="text-[10px] font-mono text-amber-300 bg-black/40 px-2 py-0.5 rounded">
              LIVE PREVIEW
            </div>
          </div>

          {/* Inner UI Preview Mockup */}
          <div className="relative z-10 space-y-3 my-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/15">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-300 uppercase font-mono tracking-wider">
                  {project.category}
                </span>
                <span className="text-[10px] text-white/70 font-mono">
                  {project.platform}
                </span>
              </div>
              <h4 className="text-lg font-bold text-white line-clamp-1">
                {project.title}
              </h4>
              <p className="text-xs text-white/80 line-clamp-2 mt-1">
                {project.overview}
              </p>
            </div>

            {/* Feature Checklist Chips */}
            <div className="grid grid-cols-2 gap-2">
              {project.keyFeatures.slice(0, 2).map((feat, idx) => (
                <div
                  key={idx}
                  className="bg-black/30 backdrop-blur-sm rounded-md p-2 text-[11px] text-white/90 border border-white/10 flex items-start gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span className="line-clamp-1 font-medium">{feat.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Hover Indicator */}
          <div className="relative z-10 pt-4 flex items-center justify-between text-xs font-mono text-white/70">
            <span>Click to expand full case study</span>
            <span className="text-amber-400 font-bold flex items-center gap-1 group-hover:underline">
              Inspect →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
