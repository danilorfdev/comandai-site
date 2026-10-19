import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { cadastroUrl, entrarUrl } from '../core/site';
import { IconeComponent } from '../ui/icone.component';

@Component({
  selector: 'cs-cabecalho',
  imports: [RouterLink, RouterLinkActive, IconeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="cabecalho">
      <div class="container barra">
        <a routerLink="/" class="logo" aria-label="Comandaí, página inicial">
          <img src="/marca/logo-horizontal.svg" alt="Comandaí" width="148" height="34">
        </a>
        <button type="button" class="menu-btn" (click)="aberto.set(!aberto())"
                [attr.aria-expanded]="aberto()" aria-controls="menu-principal" aria-label="Abrir menu">
          <cs-icone [nome]="aberto() ? 'fechar' : 'menu'" />
        </button>
        <div class="menu" id="menu-principal" [class.aberto]="aberto()">
          <nav aria-label="Principal">
            @for (l of links; track l.href) {
              <a [routerLink]="l.href" routerLinkActive="atual" ariaCurrentWhenActive="page"
                 [routerLinkActiveOptions]="{ exact: true }">{{ l.rotulo }}</a>
            }
          </nav>
          <div class="acoes-topo">
            <a class="btn btn-contorno" [href]="entrar">Entrar</a>
            <a class="btn btn-primario" [href]="cadastro">Testar grátis</a>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .cabecalho { border-bottom: 1px solid var(--borda); background: var(--fundo); position: relative; z-index: 20; }
    .barra { display: flex; align-items: center; gap: 28px; min-height: 76px; }
    .logo { display: flex; line-height: 0; }
    .logo img { height: 34px; width: auto; }
    .menu { display: flex; align-items: center; gap: 28px; flex: 1; }
    nav { display: flex; gap: 24px; flex: 1; }
    nav a { display: inline-flex; align-items: center; min-height: 44px; color: var(--texto-suave); font-weight: 600;
            text-decoration: none; border-bottom: 2px solid transparent; }
    nav a:hover { color: var(--texto); }
    nav a.atual { color: var(--texto); border-bottom-color: var(--marca); }
    .acoes-topo { display: flex; gap: 10px; }
    .acoes-topo .btn { min-height: 44px; padding: 0 18px; }
    .menu-btn { display: none; margin-left: auto; width: 44px; height: 44px; align-items: center; justify-content: center;
                border: 1px solid var(--borda); border-radius: 12px; background: var(--fundo-alt); color: var(--texto); cursor: pointer; }
    @media (max-width: 900px) {
      .barra { flex-wrap: wrap; gap: 0; }
      .menu-btn { display: inline-flex; }
      .menu { display: none; flex-basis: 100%; flex-direction: column; align-items: stretch; gap: 16px; padding: 8px 0 20px; }
      .menu.aberto { display: flex; }
      nav { flex-direction: column; gap: 0; }
      nav a { border-bottom: 1px solid var(--borda); }
      nav a.atual { border-bottom-color: var(--borda); color: var(--marca-forte); }
      .acoes-topo .btn { flex: 1; }
    }
  `],
})
export class CabecalhoComponent {
  readonly entrar = entrarUrl;
  readonly cadastro = cadastroUrl;
  readonly links = [
    { rotulo: 'Início', href: '/' },
    { rotulo: 'Como funciona', href: '/como-funciona' },
    { rotulo: 'Planos', href: '/planos' },
    { rotulo: 'Dúvidas', href: '/duvidas' },
  ];
  aberto = signal(false);

  constructor() {
    // fecha o menu do celular ao trocar de página
    inject(Router).events.pipe(filter((e) => e instanceof NavigationEnd), takeUntilDestroyed())
      .subscribe(() => this.aberto.set(false));
  }
}
