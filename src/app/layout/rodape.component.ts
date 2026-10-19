import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE, cadastroUrl, entrarUrl } from '../core/site';

@Component({
  selector: 'cs-rodape',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="rodape">
      <div class="container">
        <div class="colunas">
          <div class="marca">
            <img src="/marca/logo-horizontal.svg" alt="Comandaí" width="140" height="32" loading="lazy">
            <p class="suave">Pedidos pela mesa para lanchonetes e restaurantes. O cliente pede pelo celular e a cozinha recebe na hora.</p>
          </div>
          <nav aria-labelledby="rod-site">
            <h2 id="rod-site" class="rotulo">Site</h2>
            <a routerLink="/">Início</a>
            <a routerLink="/como-funciona">Como funciona</a>
            <a routerLink="/planos">Planos</a>
            <a routerLink="/duvidas">Dúvidas</a>
          </nav>
          <nav aria-labelledby="rod-acesso">
            <h2 id="rod-acesso" class="rotulo">Acesso</h2>
            <a [href]="cadastro">Criar conta grátis</a>
            <a [href]="entrar">Entrar</a>
            <a routerLink="/privacidade">Política de privacidade</a>
          </nav>
          <div>
            <h2 class="rotulo">Contato</h2>
            <a [href]="'mailto:' + site.email">{{ site.email }}</a>
            @if (site.whatsappLink) { <a [href]="site.whatsappLink" rel="noopener">WhatsApp: {{ site.whatsapp }}</a> }
            @else { <span>WhatsApp: {{ site.whatsapp }}</span> }
            @if (site.instagramLink) { <a [href]="site.instagramLink" rel="noopener">Instagram: {{ site.instagram }}</a> }
            @else { <span>Instagram: {{ site.instagram }}</span> }
          </div>
        </div>
        <div class="base">
          <span>© {{ ano }} Comandaí · {{ site.razaoSocial }} · CNPJ {{ site.cnpj }}</span>
          <span>Feito no Brasil</span>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .rodape { background: var(--fundo-alt); border-top: 1px solid var(--borda); font-size: 15px; padding: 48px 0 24px; }
    .colunas { display: flex; flex-wrap: wrap; gap: 32px 64px; }
    .marca { flex: 999 1 280px; display: flex; flex-direction: column; gap: 12px; }
    .marca img { height: 32px; width: auto; align-self: flex-start; }
    .marca p { max-width: 340px; }
    .colunas > nav, .colunas > div:not(.marca) { flex: 1 1 170px; display: flex; flex-direction: column; }
    h2 { margin-bottom: 8px; }
    .colunas a, .colunas span { display: flex; align-items: center; min-height: 34px; color: var(--texto); text-decoration: none; }
    .colunas a:hover { color: var(--marca-forte); text-decoration: underline; }
    .base { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-top: 32px; padding-top: 20px;
            border-top: 1px solid var(--borda); font-size: 13px; color: var(--texto-suave); }
  `],
})
export class RodapeComponent {
  readonly site = SITE;
  readonly cadastro = cadastroUrl;
  readonly entrar = entrarUrl;
  readonly ano = new Date().getFullYear();
}
