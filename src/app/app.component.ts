import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SeoService } from './core/seo.service';
import { CabecalhoComponent } from './layout/cabecalho.component';
import { RodapeComponent } from './layout/rodape.component';

@Component({
  selector: 'cs-raiz',
  imports: [RouterOutlet, RouterLink, CabecalhoComponent, RodapeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a class="pular" [routerLink]="[]" fragment="conteudo">Pular para o conteúdo</a>
    <cs-cabecalho />
    <main id="conteudo" tabindex="-1"><router-outlet /></main>
    <cs-rodape />
  `,
  styles: [':host { display: flex; flex-direction: column; min-height: 100vh; } main { flex: 1; outline: none; }'],
})
export class AppComponent {
  constructor() { inject(SeoService).iniciar(); }
}
