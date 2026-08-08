export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'AI & Deep Learning' | 'Fullstack Web' | 'AI Automation' | 'Mobile AI';
  role: string;
  timeline: string;
  clientOrOrg: string;
  platform: string;
  description: string;
  overview: string;
  backgroundProblem: string;
  solutionOverview: string;
  keyFeatures: { title: string; desc: string }[];
  tools: string[];
  githubUrl?: string;
  demoUrl?: string;
  publicationLink?: string;
  badge?: string;
  featured: boolean;
  imageTheme: 'pink' | 'blue' | 'dark' | 'green' | 'amber';
  mockupType: 'macbook-mobile' | 'mobile-only' | 'dashboard' | 'code-preview';
}

/** A screenshot picked up automatically from src/assets/projects/<project-id>/ */
export interface ProjectImage {
  url: string;
  fileName: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: 'Work' | 'Research' | 'Internship' | 'Academic';
  highlights: string[];
  techStack?: string[];
  imageBg?: string;
}

export interface Publication {
  id: string;
  title: string;
  venue: string;
  year: string;
  type: 'Journal' | 'International Conference' | 'National Seminar';
  doiOrStatus: string;
  authors: string;
  description: string;
  link?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
  credentialId?: string;
  badgeColor?: string;
}

export interface TechCategory {
  category: string;
  skills: { name: string; level?: string; iconName?: string }[];
}

export type ThemeStyle = 'linen' | 'blue-glow' | 'amber-orange' | 'teal-mesh' | 'dark-editorial';
