import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { PlaygroundSection } from './components/PlaygroundSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Project, ThemeStyle } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('project');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [theme, setTheme] = useState<ThemeStyle>('linen');

  // Background Theme Preset Styles — each is a multi-stop gradient that
  // slowly drifts (see .animated-gradient-bg + gradientDrift keyframes in index.css)
  // instead of a static, manually-picked gradient.
  const getThemeMeta = (currentTheme: ThemeStyle) => {
    switch (currentTheme) {
      case 'linen':
        return {
          textClass: 'text-[#1c1b18]',
          gradient:
            'linear-gradient(120deg, #efece4, #e8e6e1, #ddd7c9, #ece7da, #efece4)',
        };
      case 'blue-glow':
        return {
          textClass: 'text-slate-100 dark',
          gradient:
            'linear-gradient(120deg, #0f172a, #1e293b, #0c4a6e, #1e3a5f, #0f172a)',
        };
      case 'amber-orange':
        return {
          textClass: 'text-amber-50 dark',
          gradient:
            'linear-gradient(120deg, #451a03, #78350f, #1c1917, #7c2d12, #451a03)',
        };
      case 'teal-mesh':
        return {
          textClass: 'text-teal-50 dark',
          gradient:
            'linear-gradient(120deg, #042f2e, #134e4a, #1e293b, #0f766e, #042f2e)',
        };
      case 'dark-editorial':
        return {
          textClass: 'text-zinc-100 dark',
          gradient:
            'linear-gradient(120deg, #09090b, #18181b, #27272a, #18181b, #09090b)',
        };
      default:
        return {
          textClass: 'text-[#1c1b18]',
          gradient:
            'linear-gradient(120deg, #efece4, #e8e6e1, #ddd7c9, #ece7da, #efece4)',
        };
    }
  };

  const { textClass, gradient } = getThemeMeta(theme);

  return (
    <div
      className={`min-h-screen font-sans selection:bg-amber-400 selection:text-black animated-gradient-bg ${textClass}`}
      style={{ backgroundImage: gradient }}
    >
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
  );
}
