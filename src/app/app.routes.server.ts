import { RenderMode, ServerRoute } from '@angular/ssr';

/** Todas as páginas são geradas como HTML no build (site estático, sem servidor Node). */
export const serverRoutes: ServerRoute[] = [
  { path: '**', renderMode: RenderMode.Prerender },
];
