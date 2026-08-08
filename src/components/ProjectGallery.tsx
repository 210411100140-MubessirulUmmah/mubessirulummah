import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ImageOff, Images } from 'lucide-react';
import { ProjectImage } from '../types';

interface ProjectGalleryProps {
  images: ProjectImage[];
  projectTitle: string;
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({ images, projectTitle }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (images.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-black/15 dark:border-white/15 bg-white/60 dark:bg-zinc-800/40 p-8 text-center space-y-2">
        <ImageOff className="w-6 h-6 mx-auto text-gray-400" />
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Belum ada screenshot untuk project ini.
        </p>
      </div>
    );
  }

  const showPrev = () =>
    setLightboxIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  const showNext = () =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length));

  return (
    <>
      <div className="gallery-grid grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {images.map((img, idx) => (
          <button
            key={img.url}
            onClick={() => setLightboxIndex(idx)}
            className="group relative rounded-xl overflow-hidden border border-black/10 dark:border-white/10 shadow-sm hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <img
              src={img.url}
              alt={`${projectTitle} screenshot ${idx + 1}`}
              loading="lazy"
              className="w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-bold font-mono flex items-center gap-1">
                <Images className="w-3.5 h-3.5" /> Lihat
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox overlay */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            aria-label="Close"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              aria-label="Previous image"
              className="absolute left-2 sm:left-6 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}

          <img
            src={images[lightboxIndex].url}
            alt={`${projectTitle} screenshot ${lightboxIndex + 1}`}
            onClick={(e) => e.stopPropagation()}
            className="animate-lightboxIn max-w-full max-h-[85vh] rounded-lg shadow-2xl object-contain"
          />

          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              aria-label="Next image"
              className="absolute right-2 sm:right-6 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}

          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-xs font-mono">
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
};
