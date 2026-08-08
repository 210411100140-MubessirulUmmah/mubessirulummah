import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { PlaygroundSection } from './components/PlaygroundSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Project, ThemeStyle } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('project');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [theme, setTheme] = useState<ThemeStyle>('linen');

  const getThemeMeta = (currentTheme: ThemeStyle) => {
    switch (currentTheme) {
      case 'linen':
        return { textClass: 'text-[#1c1b18]', baseClass: 'bg-[#f3f1eb]' };
      case 'blue-glow':
        return { textClass: 'text-slate-100 dark', baseClass: 'bg-[#0b1120]' };
      case 'amber-orange':
        return { textClass: 'text-amber-50 dark', baseClass: 'bg-[#1c1410]' };
      case 'teal-mesh':
        return { textClass: 'text-teal-50 dark', baseClass: 'bg-[#071c1b]' };
      case 'dark-editorial':
        return { textClass: 'text-zinc-100 dark', baseClass: 'bg-[#09090b]' };
      default:
        return { textClass: 'text-[#1c1b18]', baseClass: 'bg-[#f3f1eb]' };
    }
  };

  const { textClass, baseClass } = getThemeMeta(theme);

  return (
    <div className={`relative min-h-screen font-sans selection:bg-amber-400 selection:text-black ${textClass}`}>
      {/* Fixed, continuously-moving color backdrop — sits behind everything, no click needed */}
      <AnimatedBackground theme={theme} baseClass={baseClass} />

      {/* Foreground content */}
      <div className="relative z-10">
        {/* Top Header */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          theme={theme}
          setTheme={setTheme}
        />

        {/* Main Content - Discrete Tab Views */}
        <main className="space-y-4">
          {activeTab === 'project' && (
            <div className="animate-fadeIn">
              <Hero
                onExploreProjects={() => {
                  const el = document.getElementById('project');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                onOpenPlayground={() => {
                  setActiveTab('playground');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
              <ProjectsSection onSelectProject={(project) => setSelectedProject(project)} />
            </div>
          )}

          {activeTab === 'playground' && (
            <div className="animate-fadeIn">
              <PlaygroundSection />
            </div>
          )}

          {activeTab === 'about' && (
            <div className="animate-fadeIn">
              <AboutSection />
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="animate-fadeIn">
              <ContactSection />
            </div>
          )}
        </main>

        {/* Footer */}
        <Footer />

        {/* Project Detail Modal */}
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onSelectProject={(proj) => setSelectedProject(proj)}
        />
      </div>
    </div>
  );
}
