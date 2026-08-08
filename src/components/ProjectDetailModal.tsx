import React, { useState } from 'react';
import { X, ExternalLink, Github, CheckCircle2, ArrowLeft, ArrowRight, Layers, Sparkles, Terminal, Images } from 'lucide-react';
import { Project } from '../types';
import { PROJECTS_DATA } from '../data/portfolioData';
import { getProjectImages } from '../utils/projectImages';
import { ProjectGallery } from './ProjectGallery';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onSelectProject,
}) => {
  if (!project) return null;

  const currentIndex = PROJECTS_DATA.findIndex((p) => p.id === project.id);
  const prevProject =
    PROJECTS_DATA[(currentIndex - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length];
  const nextProject = PROJECTS_DATA[(currentIndex + 1) % PROJECTS_DATA.length];

  const [activeTab, setActiveTab] = useState<'overview' | 'interactive'>('overview');

  return (
    <div
      id="project-detail-modal-overlay"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="project-detail-modal-content"
        className="bg-stone-100 dark:bg-zinc-900 text-black dark:text-white w-full max-w-5xl rounded-3xl shadow-2xl border border-black/10 dark:border-white/10 overflow-hidden my-6 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 bg-stone-100/90 dark:bg-zinc-900/90 backdrop-blur-md px-6 py-4 border-b border-black/10 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider px-2.5 py-1 bg-black text-white dark:bg-white dark:text-black rounded-md">
              {project.category}
            </span>
            <h2 className="text-lg sm:text-xl font-bold truncate max-w-md">
              {project.title}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* View Interactive Demo Tab Toggle */}
            {/* <button
              onClick={() => setActiveTab(activeTab === 'overview' ? 'interactive' : 'overview')}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-400 hover:bg-amber-300 text-black flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 fill-black" />
              <span>{activeTab === 'overview' ? 'Try Interactive Preview' : 'Back to Case Study'}</span>
            </button> */}

            <button
              id="close-modal-btn"
              onClick={onClose}
              className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-12 flex-1">
          {activeTab === 'overview' ? (
            <>
              {/* Top Meta Details Grid (Matching Screenshot 18 Ecocycle style) */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-8 border-b border-black/10 dark:border-white/10 font-sans">
                <div>
                  <span className="text-xs font-mono uppercase text-gray-500 block mb-1">
                    Platform →
                  </span>
                  <span className="font-bold text-sm sm:text-base">{project.platform}</span>
                </div>
                <div>
                  <span className="text-xs font-mono uppercase text-gray-500 block mb-1">
                    Client / Org →
                  </span>
                  <span className="font-bold text-sm sm:text-base">{project.clientOrOrg}</span>
                </div>
                <div>
                  <span className="text-xs font-mono uppercase text-gray-500 block mb-1">
                    Timeline →
                  </span>
                  <span className="font-bold text-sm sm:text-base">{project.timeline}</span>
                </div>
                <div>
                  <span className="text-xs font-mono uppercase text-gray-500 block mb-1">
                    Role →
                  </span>
                  <span className="font-bold text-sm sm:text-base">{project.role}</span>
                </div>
              </div>

              {/* Highlight Banner Quote */}
              <div className="bg-black text-white dark:bg-white dark:text-black p-6 sm:p-8 rounded-2xl shadow-lg">
                <p className="text-lg sm:text-2xl font-bold leading-relaxed font-sans">
                  "{project.overview}"
                </p>
              </div>

              {/* Section 01: Background & Problem */}
              <div className="grid md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-3 flex items-center gap-3">
                  <span className="text-2xl font-black font-mono text-amber-600">01</span>
                  <h3 className="text-lg font-bold">Background & Problem</h3>
                </div>
                <div className="md:col-span-9 bg-white dark:bg-zinc-800/60 p-6 rounded-xl border border-black/10 dark:border-white/10 text-gray-800 dark:text-gray-200 text-base leading-relaxed">
                  {project.backgroundProblem}
                </div>
              </div>

              {/* Section 02: Solution Overview */}
              <div className="grid md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-3 flex items-center gap-3">
                  <span className="text-2xl font-black font-mono text-amber-600">02</span>
                  <h3 className="text-lg font-bold">Solution Overview</h3>
                </div>
                <div className="md:col-span-9 bg-white dark:bg-zinc-800/60 p-6 rounded-xl border border-black/10 dark:border-white/10 text-gray-800 dark:text-gray-200 text-base leading-relaxed">
                  {project.solutionOverview}
                </div>
              </div>

              {/* Section 03: Key Features */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-black/10 dark:border-white/10 pb-3">
                  <span className="text-2xl font-black font-mono text-amber-600">03</span>
                  <h3 className="text-lg font-bold">Key Architectural Features</h3>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {project.keyFeatures.map((feature, i) => (
                    <div
                      key={i}
                      className="bg-white dark:bg-zinc-800/80 p-5 rounded-xl border border-black/10 dark:border-white/10 space-y-2 shadow-sm"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0" />
                        <h4 className="font-bold text-base">{feature.title}</h4>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 04: Screenshot Gallery */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-black/10 dark:border-white/10 pb-3">
                  <span className="text-2xl font-black font-mono text-amber-600">04</span>
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <Images className="w-5 h-5 text-amber-600" />
                    Screenshot Gallery
                  </h3>
                </div>
                <ProjectGallery images={getProjectImages(project.id)} projectTitle={project.title} />
              </div>

              {/* Tech Stack Banner */}
              <div className="bg-stone-200 dark:bg-zinc-800/90 p-6 rounded-2xl space-y-3">
                <h4 className="font-mono text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400 font-bold">
                  Technology Stack & Tools
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-900 font-mono text-xs font-bold border border-black/10 dark:border-white/10 shadow-sm"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-4 pt-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-black text-white dark:bg-white dark:text-black font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity"
                  >
                    <Github className="w-4 h-4" />
                    <span>View Source Code on GitHub</span>
                  </a>
                )}
              </div>
            </>
          ) : (
            /* Interactive Simulated App Preview */
            <div className="space-y-6">
              <div className="bg-black text-white p-4 rounded-xl flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span>SIMULATED RUNTIME PREVIEW — {project.title}</span>
                </div>
                <span className="text-emerald-400">STATUS: ACTIVE</span>
              </div>

              {/* Simulated Interactive Container */}
              <div className="bg-zinc-900 rounded-2xl p-6 text-white space-y-6 border border-zinc-700 min-h-[350px] flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
                    <span className="font-bold text-amber-400 font-mono">
                      [Interactive Module: {project.id}]
                    </span>
                    <span className="text-xs text-zinc-400">{project.platform}</span>
                  </div>

                  <p className="text-sm text-zinc-300">
                    You are exploring the live simulation for <strong>{project.title}</strong>. Test features or inspect technical outputs below:
                  </p>

                  <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-3">
                    <div className="text-xs font-mono text-zinc-400">System Highlights:</div>
                    <ul className="space-y-2 text-xs text-zinc-200">
                      {project.keyFeatures.map((f, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="text-amber-400">✓</span>
                          <strong>{f.title}:</strong> {f.desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800 flex justify-between items-center text-xs font-mono">
                  <span className="text-zinc-500">Built by {project.role}</span>
                  <button
                    onClick={() => setActiveTab('overview')}
                    className="text-amber-400 underline hover:text-amber-300"
                  >
                    Return to Case Study
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Navigation between Projects */}
        <div className="bg-stone-200 dark:bg-zinc-800 px-6 py-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between font-sans text-xs sm:text-sm font-bold">
          <button
            id="prev-project-btn"
            onClick={() => onSelectProject(prevProject)}
            className="flex items-center gap-2 hover:text-amber-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Prev: {prevProject.title.split('—')[0]}</span>
            <span className="sm:hidden">Prev</span>
          </button>

          <span className="font-mono text-xs text-gray-500">
            {currentIndex + 1} / {PROJECTS_DATA.length}
          </span>

          <button
            id="next-project-btn"
            onClick={() => onSelectProject(nextProject)}
            className="flex items-center gap-2 hover:text-amber-600 transition-colors"
          >
            <span className="hidden sm:inline">Next: {nextProject.title.split('—')[0]}</span>
            <span className="sm:hidden">Next</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
