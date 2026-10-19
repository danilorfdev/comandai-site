import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { routes } from './app.routes';

registerLocaleData(localePt);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    // trocou de página: volta ao topo; link com #âncora: rola até a seção
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })),
    // o HTML pré-renderizado é reaproveitado no navegador, sem piscar.
    // Sem withEventReplay: ele injeta script inline, e a CSP do site não permite.
    provideClientHydration(),
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ],
};
