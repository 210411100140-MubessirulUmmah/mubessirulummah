import { ProjectImage } from '../types';

/**
 * Auto-discovers screenshots for each project.
 *
 * HOW TO ADD PHOTOS:
 * Just drop image files into: src/assets/projects/<project-id>/
 * (jpg, jpeg, png, webp, or gif — any file name, any amount)
 *
 * No code changes needed — this file scans that folder at build time
 * (Vite's import.meta.glob) and the gallery grid picks it up automatically.
 */
const modules = import.meta.glob<{ default: string }>(
  '/src/assets/projects/*/*.{png,jpg,jpeg,PNG,JPG,JPEG,webp,WEBP,gif,GIF}',
  { eager: true }
);

// Build a map of projectId -> ProjectImage[]
const imagesByProject: Record<string, ProjectImage[]> = {};

for (const path in modules) {
  // path looks like: /src/assets/projects/<project-id>/<file-name>.jpg
  const match = path.match(/\/src\/assets\/projects\/([^/]+)\/([^/]+)$/);
  if (!match) continue;
  const [, projectId, fileName] = match;
  const mod = modules[path] as { default: string };

  if (!imagesByProject[projectId]) imagesByProject[projectId] = [];
  imagesByProject[projectId].push({ url: mod.default, fileName });
}

// Keep a stable, predictable order (alphabetical by file name)
for (const projectId in imagesByProject) {
  imagesByProject[projectId].sort((a, b) => a.fileName.localeCompare(b.fileName));
}

export function getProjectImages(projectId: string): ProjectImage[] {
  return imagesByProject[projectId] || [];
}
