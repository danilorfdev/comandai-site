import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { COMPARACAO, DUVIDAS_PLANOS, PLANOS, brl } from '../core/conteudo';
import { SITE, cadastroUrl } from '../core/site';
import { IconeComponent } from '../ui/icone.component';

type Periodo = 'anual' | 'mensal';

/** Mostra a faixa "Fundadores". Desligue quando as vagas acabarem. */
const MOSTRAR_FUNDADORES = true;

@Component({
  selector: 'cs-planos',
  imports: [RouterLink, IconeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container abertura-planos">
      <p class="rotulo">Planos e preços</p>
      <h1 class="titulo-pagina">Um plano para cada tamanho de salão</h1>
      <p class="abertura">O Essencial já faz o ciclo completo da mesa, do QR Code à conta fechada. Os outros planos somam gestão, mais mesas e atendimento dedicado. Dá para trocar quando quiser.</p>
      <div class="seletor" role="group" aria-label="Forma de pagamento">
        <button type="button" [class.ativo]="periodo() === 'mensal'" [attr.aria-pressed]="periodo() === 'mensal'"
                (click)="periodo.set('mensal')">Mensal</button>
        <button type="button" [class.ativo]="periodo() === 'anual'" [attr.aria-pressed]="periodo() === 'anual'"
                (click)="periodo.set('anual')">Anual <span class="selo selo-mostarda">2 meses grátis</span></button>
      </div>
      <p class="suave pequeno">14 dias grátis com tudo do Profissional liberado, sem cartão de crédito.</p>
    </section>

    @if (fundadores) {
      <div class="container" style="padding-bottom: 32px">
        <div class="fundadores">
          <span class="selo selo-mostarda">FUNDADORES</span>
          <strong>Os 10 primeiros restaurantes pagam 30% a menos durante 12 meses.</strong>
          <span class="suave pequeno">Restam [VAGAS] vagas.</span>
        </div>
      </div>
    }

    <section class="container" style="padding-bottom: 72px" aria-label="Planos">
      <div class="grade planos" style="--min: 300px">
        @for (p of cartoes(); track p.id) {
          <article class="plano" [class.destaque]="p.destaque">
            <div class="plano-topo">
              <h2>{{ p.nome }}</h2>
              @if (p.destaque) { <span class="selo selo-mostarda">Recomendado</span> }
            </div>
            <p class="publico">{{ p.publico }}</p>
            <p class="preco">
              <span class="moeda">R$</span><span class="reais">{{ p.reais }}</span><span class="centavos">,{{ p.centavos }}</span>
              <span class="mes">/mês</span>
            </p>
            <p class="cobranca">{{ p.cobranca }}</p>
            <a class="btn" [class.btn-claro]="p.destaque" [class.btn-contorno]="!p.destaque" [href]="cadastro">Testar 14 dias grátis</a>
            @if (p.inclui) { <p class="inclui">{{ p.inclui }}</p> }
            <ul class="lista-check" [class.continua]="p.inclui">
              @for (i of p.itens; track i.forte) {
                <li><cs-icone nome="check" [tamanho]="20" [traco]="2.5" /><span><strong>{{ i.forte }}</strong> {{ i.resto }}</span></li>
              }
            </ul>
          </article>
        }
      </div>
      <p class="suave pequeno centro">Precisa de mais de uma loja? <a [href]="'mailto:' + email">Fale com a gente</a>.</p>
    </section>

    <section class="secao-alt" aria-labelledby="comparar">
      <div class="container secao">
        <div class="cabeca-secao">
          <p class="rotulo">Lado a lado</p>
          <h2 id="comparar" class="titulo-secao">Compare os planos</h2>
        </div>
        <div class="tabela-caixa">
          <table aria-labelledby="comparar">
            <thead>
              <tr>
                <th scope="col">O que vem no plano</th>
                <th scope="col">Essencial</th>
                <th scope="col" class="col-destaque">Profissional</th>
                <th scope="col">Ilimitado</th>
              </tr>
            </thead>
            @for (g of comparacao; track g.nome) {
              <tbody>
                <tr class="grupo"><th scope="colgroup" colspan="4">{{ g.nome }}</th></tr>
                @for (l of g.linhas; track l.nome) {
                  <tr>
                    <th scope="row">{{ l.nome }}</th>
                    @for (v of l.valores; track $index) {
                      <td [class.col-destaque]="$index === 1">
                        @switch (v) {
                          @case ('sim') { <span class="sim"><cs-icone nome="check" [tamanho]="20" [traco]="2.5" /><span class="sr">Incluso</span></span> }
                          @case ('nao') { <span class="nao" aria-hidden="true">—</span><span class="sr">Não incluso</span> }
                          @case ('breve') { <span class="breve">Em breve</span> }
                          @default { {{ v }} }
                        }
                      </td>
                    }
                  </tr>
                }
              </tbody>
            }
          </table>
        </div>
      </div>
    </section>

    <section class="container secao estreito" aria-labelledby="duvidas-planos">
      <h2 id="duvidas-planos" class="titulo-cartao" style="font-size: 28px; line-height: 34px; margin-bottom: 20px">Dúvidas sobre planos e pagamento</h2>
      <div class="pilha" style="gap: 12px">
        @for (d of duvidas; track d.pergunta) {
          <details class="pergunta">
            <summary>{{ d.pergunta }} <cs-icone nome="mais" [tamanho]="20" /></summary>
            <p>{{ d.resposta }}</p>
          </details>
        }
      </div>
      <p class="suave" style="margin-top: 20px">Tem outra pergunta? <a routerLink="/duvidas">Veja todas as dúvidas</a>.</p>
    </section>

    <section class="container" style="padding-bottom: 72px">
      <div class="painel-escuro final">
        <h2 class="titulo-secao">Pediu, chegou.</h2>
        <p class="suave">Cadastre o seu restaurante, imprima os QR Codes e receba o primeiro pedido hoje. São 14 dias grátis.</p>
        <div class="acoes">
          <a class="btn btn-claro btn-g" [href]="cadastro">Criar conta grátis</a>
          <a class="btn btn-contorno-claro btn-g" routerLink="/como-funciona">Ver como funciona</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .abertura-planos { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 16px; padding-top: 72px; padding-bottom: 40px; }
    .abertura-planos h1 { max-width: 780px; }
    .seletor { margin-top: 20px; display: inline-flex; flex-wrap: wrap; justify-content: center; gap: 4px; padding: 4px;
               background: var(--fundo-alt); border: 1px solid var(--borda); border-radius: 999px; }
    .seletor button { display: inline-flex; align-items: center; gap: 6px; min-height: 44px; padding: 0 20px; border: 0; border-radius: 999px;
                      background: transparent; color: var(--texto-suave); font: 700 15px var(--corpo); cursor: pointer; }
    .seletor button.ativo { background: var(--texto); color: var(--fundo); }
    .fundadores { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 12px 16px; padding: 16px 24px;
                  border-radius: var(--raio); background: var(--marca-suave); text-align: center; }
    .planos { gap: 24px; align-items: stretch; }
    .plano { display: flex; flex-direction: column; gap: 8px; padding: 32px 28px; border-radius: var(--raio-lg);
             background: var(--fundo); border: 1px solid var(--borda); }
    .plano.destaque { background: var(--texto); color: var(--fundo); border-color: var(--texto); box-shadow: 0 18px 40px rgba(31, 26, 23, .18); }
    .plano-topo { display: flex; justify-content: space-between; align-items: center; gap: 12px; min-height: 28px; }
    .plano h2 { font-size: 24px; line-height: 28px; font-weight: 700; }
    .publico, .mes, .cobranca { color: var(--texto-suave); font-size: 15px; }
    .destaque .publico, .destaque .mes, .destaque .cobranca { color: var(--texto-claro); }
    .preco { display: flex; align-items: baseline; gap: 4px; margin-top: 8px; font-family: var(--display); flex-wrap: wrap; }
    .moeda { font-size: 20px; font-weight: 600; margin-right: 2px; }
    .reais { font-size: 56px; line-height: 1; font-weight: 700; letter-spacing: -1.5px; font-variant-numeric: tabular-nums; }
    .centavos { font-size: 22px; font-weight: 600; }
    .mes { font-family: var(--corpo); margin-left: 4px; }
    .cobranca { font-size: 14px; min-height: 22px; margin-bottom: 12px; }
    .plano .lista-check { margin-top: 8px; padding-top: 20px; border-top: 1px solid var(--borda); }
    .destaque .lista-check { border-top-color: var(--borda-escura); }
    .lista-check cs-icone { margin-top: 2px; color: var(--sucesso); }
    .destaque .lista-check cs-icone { color: var(--destaque); }
    .inclui { margin-top: 8px; padding-top: 20px; border-top: 1px solid var(--borda); font-weight: 700; font-size: 15px; }
    .destaque .inclui { border-top-color: var(--borda-escura); }
    .plano .lista-check.continua { margin-top: 0; padding-top: 4px; border-top: 0; }
    .centro { text-align: center; margin-top: 20px; }
    .tabela-caixa { position: relative; overflow-x: auto; border: 1px solid var(--borda); border-radius: var(--raio); background: var(--fundo); }
    table { width: 100%; min-width: 680px; border-collapse: collapse; font-size: 15px; }
    th, td { text-align: left; padding: 14px 20px; border-top: 1px solid var(--borda); }
    thead th { border-top: 0; padding: 18px 20px; font-family: var(--display); font-weight: 600; }
    thead th:first-child { font-family: var(--corpo); color: var(--texto-suave); }
    tbody th { font-weight: 600; }
    tr.grupo th { background: var(--fundo-alt); padding: 10px 20px; font-family: var(--display); font-size: 13px; font-weight: 600;
                  letter-spacing: 1.2px; text-transform: uppercase; color: var(--marca-forte); }
    .sim { display: inline-flex; color: var(--sucesso); }
    .nao { color: var(--borda-forte); }
    .breve { display: inline-flex; padding: 2px 10px; border-radius: 999px; background: var(--fundo-alt); border: 1px solid var(--borda);
             font-size: 12px; font-weight: 700; color: var(--texto-suave); white-space: nowrap; }
    .col-destaque { background: #fdf0e6; }
    thead .col-destaque { color: var(--marca-forte); }
    .estreito { max-width: 868px; }
    .final { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 16px; }
    .final p { max-width: 560px; font-size: 18px; line-height: 28px; }
    .final .acoes { justify-content: center; margin-top: 8px; }
  `],
})
export class PlanosComponent {
  readonly cadastro = cadastroUrl;
  readonly email = SITE.email;
  readonly fundadores = MOSTRAR_FUNDADORES;
  readonly duvidas = DUVIDAS_PLANOS;
  periodo = signal<Periodo>('anual');

  cartoes = computed(() => {
    const anual = this.periodo() === 'anual';
    return PLANOS.map((p) => {
      const c = anual ? p.anual : p.mensal;
      return {
        ...p,
        reais: Math.floor(c / 100).toLocaleString('pt-BR'),
        centavos: String(c % 100).padStart(2, '0'),
        cobranca: anual ? `R$ ${brl(p.anual * 12)} por ano, à vista ou no Pix` : 'Cobrado todo mês, cancele quando quiser',
      };
    });
  });

  readonly comparacao = COMPARACAO;
}
