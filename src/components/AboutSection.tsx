import React, { useState } from 'react';
import {
  PERSONAL_INFO,
  EXPERIENCES_DATA,
  PUBLICATIONS_DATA,
  CERTIFICATIONS_DATA,
  TECH_SKILLS,
  SOFT_SKILLS,
} from '../data/portfolioData';
import {
  GraduationCap,
  Briefcase,
  BookOpen,
  Award,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Code2,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [expandedExp, setExpandedExp] = useState<string | null>(EXPERIENCES_DATA[0].id);

  return (
    <section id="about" className="py-16 border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Banner matching Screenshot 4 (Teal/Cyan Gradient Top) */}
        <div className="rounded-3xl bg-gradient-to-br from-teal-800 via-cyan-900 to-slate-900 text-white p-8 sm:p-14 mb-16 shadow-2xl relative overflow-hidden border border-white/10">
          <div className="relative z-10 max-w-3xl space-y-6">
            <span className="px-3 py-1 bg-amber-400 text-black font-mono text-xs font-bold uppercase tracking-widest rounded-full inline-block">
              Biography & Experience
            </span>

            <h2 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
              Hello, I am {PERSONAL_INFO.name}
            </h2>

            <p className="text-lg sm:text-xl text-teal-100 font-medium leading-relaxed">
              An AI Engineer & Fullstack Web Developer pursuing a passion for creating engaging, innovative web experiences and scalable intelligent AI systems.
            </p>

            <div className="pt-2 text-sm sm:text-base text-gray-200 leading-relaxed space-y-3">
              <p>
                Lulusan S1 Teknik Informatika Universitas Trunojoyo Madura (IPK 3.85 / 4.00). Saat ini bekerja sebagai AI Automation & Fullstack Developer di PT Valord Masculine Group dan peneliti riset AI medis di Universitas Trunojoyo Madura.
              </p>
              <p>
                Petualangan saya di dunia teknologi berfokus pada penghubung antara hasil riset akademik (Computer Vision, Deep Learning, Transformers) dan aplikasi produksi siap pakai di industri nyata.
              </p>
            </div>
          </div>
        </div>

        {/* Section 1: Work and Research Experience Timeline (Matching Screenshot 4) */}
        <div className="mb-20 space-y-8">
          <div className="flex items-center gap-3 border-b border-black/10 dark:border-white/10 pb-4">
            <Briefcase className="w-6 h-6 text-amber-600" />
            <h3 className="text-2xl sm:text-3xl font-black text-black dark:text-white">
              Work and Research Experience
            </h3>
          </div>

          <div className="space-y-4">
            {EXPERIENCES_DATA.map((exp) => {
              const isExpanded = expandedExp === exp.id;
              return (
                <div
                  key={exp.id}
                  className="bg-white dark:bg-zinc-900 rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setExpandedExp(isExpanded ? null : exp.id)}
                    className="w-full p-6 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-black/5 dark:bg-white/10 uppercase text-gray-600 dark:text-gray-300">
                          {exp.type}
                        </span>
                        <h4 className="text-xl font-bold text-black dark:text-white">
                          {exp.role}
                        </h4>
                      </div>
                      <p className="text-sm font-semibold text-amber-600 mt-1">
                        {exp.company} • {exp.location}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs text-gray-500 font-bold whitespace-nowrap">
                        {exp.period}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-6 pb-6 pt-2 border-t border-black/5 dark:border-white/5 space-y-4">
                      <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        {exp.highlights.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-amber-500 font-bold mt-0.5">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      {exp.techStack && (
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {exp.techStack.map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 rounded bg-black/5 dark:bg-white/10 font-mono text-[11px] font-semibold text-gray-800 dark:text-gray-200"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Publications */}
        <div className="mb-20 space-y-8">
          <div className="flex items-center gap-3 border-b border-black/10 dark:border-white/10 pb-4">
            <BookOpen className="w-6 h-6 text-amber-600" />
            <h3 className="text-2xl sm:text-3xl font-black text-black dark:text-white">
              Peer-Reviewed Publications
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PUBLICATIONS_DATA.map((pub) => (
              <div
                key={pub.id}
                className="bg-white dark:bg-zinc-900 rounded-2xl border border-black/10 dark:border-white/10 p-6 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-amber-400 text-black">
                      {pub.type}
                    </span>
                    <span className="font-mono text-xs font-bold text-gray-500">
                      {pub.year}
                    </span>
                  </div>
                  <h4 className="font-bold text-base leading-snug text-black dark:text-white">
                    {pub.title}
                  </h4>
                  <p className="text-xs font-semibold text-amber-600">{pub.venue}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed pt-2">
                    {pub.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-gray-500">{pub.authors}</span>
                  <a
                    href={pub.link || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black dark:text-white font-bold hover:underline flex items-center gap-1"
                  >
                    <span>Cite / View</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Tech Stack Grid (Matching Screenshot 4 bottom) */}
        <div className="mb-20 space-y-8">
          <div className="flex items-center gap-3 border-b border-black/10 dark:border-white/10 pb-4">
            <Code2 className="w-6 h-6 text-amber-600" />
            <h3 className="text-2xl sm:text-3xl font-black text-black dark:text-white">
              Technical Stack & Tools
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TECH_SKILLS.map((cat, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-zinc-900 rounded-2xl border border-black/10 dark:border-white/10 p-6 space-y-4"
              >
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-amber-600 border-b border-black/5 pb-2">
                  {cat.category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-zinc-800 text-xs font-bold text-gray-800 dark:text-gray-200 border border-black/5 flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3 h-3 text-amber-500" />
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Certifications & Soft Skills */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Certifications */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-black/10 dark:border-white/10 pb-4">
              <Award className="w-6 h-6 text-amber-600" />
              <h3 className="text-xl font-bold">Certifications & Intellectual Property</h3>
            </div>

            <div className="space-y-3">
              {CERTIFICATIONS_DATA.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-black/10 dark:border-white/10 flex items-center justify-between gap-4"
                >
                  <div>
                    <h5 className="font-bold text-sm text-black dark:text-white">
                      {cert.name}
                    </h5>
                    <p className="text-xs text-gray-500 font-mono mt-0.5">{cert.issuer}</p>
                  </div>
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-black/5 text-gray-700 shrink-0">
                    {cert.year}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Soft Skills & Leadership */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-black/10 dark:border-white/10 pb-4">
              <Sparkles className="w-6 h-6 text-amber-600" />
              <h3 className="text-xl font-bold">Soft Skills & Leadership</h3>
            </div>

            <div className="grid gap-3">
              {SOFT_SKILLS.map((skill, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-black/10 dark:border-white/10 space-y-1"
                >
                  <h5 className="font-bold text-sm text-amber-600">{skill.title}</h5>
                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                    {skill.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
