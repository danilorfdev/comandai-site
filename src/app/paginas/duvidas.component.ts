import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { DUVIDAS } from '../core/conteudo';
import { SITE, cadastroUrl } from '../core/site';
import { IconeComponent } from '../ui/icone.component';

@Component({
  selector: 'cs-duvidas',
  imports: [IconeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container estreito pilha abertura-pagina">
      <p class="rotulo">Dúvidas frequentes</p>
      <h1 class="titulo-pagina">Tudo o que perguntam antes de começar</h1>
      <p class="abertura">Não achou a sua dúvida? Mande uma mensagem para <a [href]="'mailto:' + email">{{ email }}</a>.</p>
      <div class="filtros" role="group" aria-label="Filtrar por assunto">
        @for (f of filtros; track f.id) {
          <button type="button" [class.ativo]="filtro() === f.id" [attr.aria-pressed]="filtro() === f.id"
                  (click)="filtro.set(f.id)">{{ f.nome }}</button>
        }
      </div>
    </section>

    <section class="container estreito grupos" aria-label="Perguntas">
      @for (g of grupos(); track g.id) {
        <div class="pilha" style="gap: 12px">
          <h2 class="titulo-grupo">{{ g.nome }}</h2>
          @for (d of g.perguntas; track d.pergunta) {
            <details class="pergunta">
              <summary>{{ d.pergunta }} <cs-icone nome="mais" [tamanho]="20" /></summary>
              <p>{{ d.resposta }}</p>
            </details>
          }
        </div>
      }
    </section>

    <section class="container estreito" style="padding-bottom: 72px">
      <div class="faixa-tomate chamada">
        <div class="pilha" style="gap: 6px">
          <h2 class="titulo-grupo">O jeito mais rápido de tirar a dúvida é testar</h2>
          <p class="suave">14 dias grátis, sem cartão de crédito.</p>
        </div>
        <a class="btn btn-primario btn-g" [href]="cadastro">Criar conta grátis</a>
      </div>
    </section>
  `,
  styles: [`
    .estreito { max-width: 928px; }
    .abertura-pagina { padding-top: 72px; padding-bottom: 32px; }
    .filtros { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
    .filtros button { min-height: 44px; padding: 0 18px; border-radius: 999px; border: 1.5px solid var(--borda); background: transparent;
                      color: var(--texto-suave); font: 700 15px var(--corpo); cursor: pointer; }
    .filtros button:hover { border-color: var(--borda-forte); }
    .filtros button.ativo { background: var(--texto); border-color: var(--texto); color: var(--fundo); }
    .grupos { display: flex; flex-direction: column; gap: 40px; padding-top: 16px; padding-bottom: 80px; }
    .titulo-grupo { font-size: 24px; line-height: 30px; font-weight: 600; }
    .chamada { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 20px; }
  `],
})
export class DuvidasComponent {
  readonly email = SITE.email;
  readonly cadastro = cadastroUrl;
  readonly filtros = [{ id: 'todas', nome: 'Todas' }, ...DUVIDAS.map((g) => ({ id: g.id, nome: g.nome }))];
  filtro = signal('todas');
  grupos = computed(() => DUVIDAS.filter((g) => this.filtro() === 'todas' || g.id === this.filtro()));
}
