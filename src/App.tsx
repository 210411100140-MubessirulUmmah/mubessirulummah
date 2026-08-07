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

  // Background Theme Preset Styles matching screenshots
  const getThemeClass = (currentTheme: ThemeStyle) => {
    switch (currentTheme) {
      case 'linen':
        return 'bg-[#e8e6e1] text-[#1c1b18]'; // Linen/paper texture background (Screenshot 1)
      case 'blue-glow':
        return 'bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-slate-100 dark';
      case 'amber-orange':
        return 'bg-gradient-to-b from-amber-900 via-stone-900 to-zinc-950 text-amber-50 dark';
      case 'teal-mesh':
        return 'bg-gradient-to-b from-teal-950 via-slate-900 to-zinc-900 text-teal-50 dark';
      case 'dark-editorial':
        return 'bg-zinc-950 text-zinc-100 dark';
      default:
        return 'bg-[#e8e6e1] text-[#1c1b18]';
    }
  };

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-500 selection:bg-amber-400 selection:text-black ${getThemeClass(
        theme
      )}`}
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
