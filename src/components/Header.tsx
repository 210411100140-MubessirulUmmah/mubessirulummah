import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Sun, Moon, Sparkles, Menu, X } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ThemeStyle } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  theme: ThemeStyle;
  setTheme: (theme: ThemeStyle) => void;
}

const NAV_ITEMS = [
  { id: 'project', label: 'Project' },
  { id: 'playground', label: 'Playground', badge: 'AI' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  theme,
  setTheme,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the mobile menu automatically if the viewport grows back to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const themeCycle: ThemeStyle[] = ['linen', 'blue-glow', 'amber-orange', 'teal-mesh', 'dark-editorial'];

  const cycleTheme = () => {
    const currentIndex = themeCycle.indexOf(theme);
    const nextTheme = themeCycle[(currentIndex + 1) % themeCycle.length];
    setTheme(nextTheme);
  };

  const goToTab = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-opacity-90 backdrop-blur-md border-b border-black/10 shadow-sm py-3'
          : 'py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2">
        {/* Logo / Initials */}
        <button
          id="header-logo-btn"
          onClick={() => goToTab('project')}
          className="group flex items-center gap-2 sm:gap-3 text-left focus:outline-none shrink-0"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-md bg-black text-white dark:bg-white dark:text-black font-black text-base sm:text-lg flex items-center justify-center tracking-tighter transition-transform group-hover:scale-105 shadow-sm">
            {PERSONAL_INFO.initials}
          </div>
          <div className="hidden sm:block">
            <span className="font-bold text-sm tracking-tight block leading-tight">
              {PERSONAL_INFO.name}
            </span>
            <span className="text-[11px] text-gray-500 font-mono block">
              AI Engineer & Fullstack
            </span>
          </div>
        </button>

        {/* Center Nav Links — hidden on small screens, shown from md up */}
        <nav id="header-nav" className="hidden md:flex items-center gap-1 lg:gap-2">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => goToTab(item.id)}
                className={`px-3 py-1.5 lg:px-4 lg:py-2 text-xs lg:text-sm font-semibold rounded-lg transition-all relative ${
                  isActive
                    ? 'text-black font-bold bg-black/10 dark:bg-white/15 underline underline-offset-8 decoration-2'
                    : 'text-gray-700 dark:text-gray-300 hover:text-black hover:bg-black/5'
                }`}
              >
                {item.label}
                {item.badge && (
                  <span className="ml-1.5 px-1.5 py-0.5 text-[9px] font-bold bg-amber-400 text-black rounded-full uppercase tracking-wider">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Side Social Links & Theme Switcher Pill */}
        <div className="flex items-center gap-1 sm:gap-2 lg:gap-3">
          <a
            id="social-github-link"
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="hidden sm:inline-flex p-2 rounded-full hover:bg-black/5 transition-colors text-gray-700 hover:text-black"
            title="GitHub"
          >
            <Github className="w-4 h-4 sm:w-5 sm:h-5" />
          </a>
          <a
            id="social-linkedin-link"
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="hidden sm:inline-flex p-2 rounded-full hover:bg-black/5 transition-colors text-gray-700 hover:text-black"
            title="LinkedIn"
          >
            <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
          </a>
          <a
            id="social-email-link"
            href={`mailto:${PERSONAL_INFO.email}`}
            aria-label="Email Me"
            className="p-2 rounded-full hover:bg-black/5 transition-colors text-gray-700 hover:text-black hidden lg:inline-flex"
            title="Email"
          >
            <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
          </a>

          {/* Theme Pill Toggle Button (Matches top right toggle switch in screenshot 1 & 11) */}
          <button
            id="theme-toggle-btn"
            onClick={cycleTheme}
            className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-medium text-xs shadow-md transition-all active:scale-95"
            title={`Current Theme: ${theme}. Click to change visual preset.`}
          >
            <div className="w-3.5 h-3.5 rounded-full bg-black flex items-center justify-center shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            </div>
            <span className="font-mono text-[11px] capitalize hidden md:inline">
              {theme.replace('-', ' ')}
            </span>
          </button>

          {/* Hamburger toggle — mobile & tablet only */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden p-2 rounded-lg hover:bg-black/5 transition-colors text-gray-800 dark:text-gray-100"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <div
        id="mobile-nav-menu"
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-4 flex flex-col gap-1 bg-black/[0.03] dark:bg-white/[0.05] rounded-xl mx-4 sm:mx-6 py-2 border border-black/5 dark:border-white/10">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-link-${item.id}`}
                onClick={() => goToTab(item.id)}
                className={`px-4 py-3 text-sm font-semibold rounded-lg transition-all flex items-center justify-between ${
                  isActive
                    ? 'text-black dark:text-white font-bold bg-black/10 dark:bg-white/15'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-black/5'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[9px] font-bold bg-amber-400 text-black rounded-full uppercase tracking-wider">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
          <div className="flex items-center gap-2 px-4 pt-3 mt-2 border-t border-black/10 dark:border-white/10">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2 rounded-full hover:bg-black/5 transition-colors text-gray-700 dark:text-gray-300"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2 rounded-full hover:bg-black/5 transition-colors text-gray-700 dark:text-gray-300"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              aria-label="Email Me"
              className="p-2 rounded-full hover:bg-black/5 transition-colors text-gray-700 dark:text-gray-300"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
