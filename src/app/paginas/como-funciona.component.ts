import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { cadastroUrl } from '../core/site';
import { IconeComponent } from '../ui/icone.component';

@Component({
  selector: 'cs-como-funciona',
  imports: [RouterLink, IconeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container pilha abertura-pagina">
      <p class="rotulo">Como funciona</p>
      <h1 class="titulo-pagina">Do cadastro ao primeiro pedido no mesmo dia</h1>
      <p class="abertura">Você monta o cardápio, cola os QR Codes nas mesas e pronto. Veja o caminho de um pedido, do celular do cliente até o fechamento da conta.</p>
    </section>

    <section class="container" style="padding-bottom: 80px" aria-label="Passo a passo">
      <ol class="passos">
        @for (p of passos; track p.titulo; let i = $index) {
          <li class="cartao-areia passo">
            <div class="passo-cabeca">
              <span class="numero">{{ i + 1 }}</span>
              <div class="pilha" style="gap: 6px">
                <span class="quem">{{ p.quem }}</span>
                <h2>{{ p.titulo }}</h2>
              </div>
            </div>
            <div class="passo-corpo pilha" style="gap: 10px">
              <p>{{ p.texto }}</p>
              <ul class="lista-check detalhes">
                @for (d of p.detalhes; track d) {
                  <li><cs-icone nome="check" [tamanho]="18" [traco]="2.5" /><span>{{ d }}</span></li>
                }
              </ul>
            </div>
          </li>
        }
      </ol>
    </section>

    <section class="container" style="padding-bottom: 80px">
      <div class="painel-escuro protecao">
        <div class="pilha">
          <p class="rotulo" style="color: var(--destaque)">Mesa protegida</p>
          <h2 class="titulo-secao">Só pede quem está sentado na mesa</h2>
          <p class="suave" style="font-size: 17px">Um QR Code impresso pode ser fotografado. Por isso, ter o link não basta para fazer pedido.</p>
        </div>
        <ol class="regras">
          @for (r of protecao; track r.titulo; let i = $index) {
            <li>
              <span class="regra-n">{{ i + 1 }}</span>
              <div class="pilha" style="gap: 2px">
                <strong>{{ r.titulo }}</strong>
                <span class="suave">{{ r.texto }}</span>
              </div>
            </li>
          }
        </ol>
      </div>
    </section>

    <section class="container" style="padding-bottom: 80px">
      <div class="cabeca-secao">
        <p class="rotulo">A equipe</p>
        <h2 class="titulo-secao">Cada pessoa vê só o que precisa</h2>
      </div>
      <div class="grade" style="--min: 210px">
        @for (f of perfis; track f.nome) {
          <div class="cartao pilha" style="gap: 8px">
            <h3 class="titulo-cartao">{{ f.nome }}</h3>
            <p class="suave" style="font-size: 15px; line-height: 22px">{{ f.texto }}</p>
          </div>
        }
      </div>
    </section>

    <section class="secao-alt">
      <div class="container secao">
        <h2 class="titulo-secao" style="margin-bottom: 32px">O que você precisa para começar</h2>
        <div class="grade">
          @for (q of requisitos; track q.titulo) {
            <div class="cartao requisito">
              <span class="icone-caixa"><cs-icone [nome]="q.icone" /></span>
              <div class="pilha" style="gap: 4px">
                <h3 class="titulo-cartao" style="font-size: 18px; line-height: 24px">{{ q.titulo }}</h3>
                <p class="suave" style="font-size: 15px; line-height: 22px">{{ q.texto }}</p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <section class="container secao chamada">
      <div class="pilha" style="gap: 8px">
        <h2 class="titulo-secao" style="font-size: 32px">Quer ver funcionando no seu salão?</h2>
        <p class="suave">Crie a conta e teste por 14 dias, com tudo liberado.</p>
      </div>
      <div class="acoes">
        <a class="btn btn-primario btn-g" [href]="cadastro">Criar conta grátis</a>
        <a class="btn btn-contorno btn-g" routerLink="/planos">Ver os planos</a>
      </div>
    </section>
  `,
  styles: [`
    .abertura-pagina { padding-top: 72px; padding-bottom: 48px; }
    .abertura-pagina h1 { max-width: 820px; }
    .passos { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 16px; }
    .passo { display: flex; flex-wrap: wrap; gap: 20px 32px; padding: 28px 32px; }
    .passo-cabeca { display: flex; align-items: flex-start; gap: 20px; flex: 1 1 340px; min-width: 0; }
    .passo-cabeca .numero { width: 52px; height: 52px; border-radius: 16px; font-size: 22px; }
    .quem { align-self: flex-start; padding: 2px 10px; border-radius: 999px; background: var(--fundo); border: 1px solid var(--borda);
            font-size: 12px; font-weight: 700; color: var(--texto-suave); }
    .passo h2 { font-size: 24px; line-height: 30px; font-weight: 600; }
    .passo-corpo { flex: 2 1 420px; min-width: 0; }
    .detalhes li { color: var(--texto-suave); font-size: 15px; }
    .protecao { display: flex; flex-wrap: wrap; gap: 32px 56px; }
    .protecao > .pilha { flex: 1 1 340px; min-width: 0; }
    .protecao .titulo-secao { font-size: clamp(28px, 3vw, 34px); }
    .regras { flex: 1 1 420px; min-width: 0; list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 16px; }
    .regras li { display: flex; gap: 14px; align-items: flex-start; }
    .regras strong { font-size: 17px; }
    .regra-n { display: inline-flex; flex-shrink: 0; width: 36px; height: 36px; align-items: center; justify-content: center; border-radius: 10px;
               background: #4a2414; color: #ff8a55; font-family: var(--display); font-weight: 700; }
    .requisito { display: flex; gap: 16px; align-items: flex-start; }
    .chamada { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 24px; }
    @media (max-width: 720px) { .passo { padding: 24px; } }
  `],
})
export class ComoFuncionaComponent {
  readonly cadastro = cadastroUrl;
  readonly passos = [
    { quem: 'Dono', titulo: 'Crie a conta e monte o cardápio',
      texto: 'Cadastre o restaurante em poucos minutos. O sistema já cria as mesas, e você adiciona os produtos com categoria, preço e descrição.',
      detalhes: ['Adicionais com preço: + bacon, + queijo, sem cebola', 'Bebidas de geladeira vão direto para o salão, sem passar pela cozinha'] },
    { quem: 'Dono', titulo: 'Imprima os QR Codes das mesas',
      texto: 'Cada mesa tem um QR Code próprio. É só imprimir e colar na mesa ou numa plaquinha.',
      detalhes: ['Precisa trocar um QR? Gere outro na hora e o antigo deixa de valer', 'Monte o mapa do salão arrastando as mesas para o lugar certo'] },
    { quem: 'Cliente', titulo: 'O cliente lê o QR e faz o pedido',
      texto: 'Ele aponta a câmera, vê o cardápio no celular, escolhe os itens com adicionais e observações e envia.',
      detalhes: ['Não precisa baixar app nem criar conta', 'Quem está na mesma mesa entra na mesma conta com um código de 4 números'] },
    { quem: 'Caixa ou garçom', titulo: 'O salão libera a mesa',
      texto: 'No primeiro pedido de uma mesa livre, o salão confirma que tem gente sentada. Só então o pedido vai para a cozinha.',
      detalhes: ['O painel toca até alguém liberar ou recusar', 'Se o cliente preferir, o garçom lança o pedido pelo celular dele'] },
    { quem: 'Cozinha', titulo: 'A cozinha recebe e prepara',
      texto: 'O pedido aparece na tela da cozinha com alarme. A equipe marca quando está preparando e quando fica pronto.',
      detalhes: ['Alerta quando um pedido está demorando', 'Via da cozinha para imprimir em impressora de 80 mm'] },
    { quem: 'Caixa', titulo: 'O caixa fecha a conta',
      texto: 'O cliente pede a conta pelo celular e o salão é avisado. O caixa confere, dá desconto se quiser e registra a forma de pagamento.',
      detalhes: ['Dinheiro, Pix, débito ou crédito, com cálculo de troco', 'Ao fechar, a mesa fica livre para o próximo cliente'] },
  ];
  readonly protecao = [
    { titulo: 'O salão libera a mesa', texto: 'O primeiro pedido de uma mesa livre só vai para a cozinha depois que alguém da equipe confirma.' },
    { titulo: 'Código para quem chega', texto: 'Os outros da mesa entram na conta com um código de 4 números que aparece no celular de quem abriu.' },
    { titulo: 'Conta fechada, acesso encerrado', texto: 'Quando o caixa fecha a conta, os celulares daquela mesa perdem o acesso.' },
  ];
  readonly perfis = [
    { nome: 'Dono', texto: 'Tudo do restaurante: cardápio, mesas, equipe, histórico e o painel de vendas.' },
    { nome: 'Gerente', texto: 'Cardápio, mesas, salão, cozinha e relatórios. Não mexe na equipe.' },
    { nome: 'Caixa', texto: 'Salão, contas das mesas e recebimento.' },
    { nome: 'Garçom', texto: 'Abre mesa, lança pedido e entrega. Não fecha conta nem dá desconto.' },
    { nome: 'Cozinha', texto: 'Só a fila de pedidos, com alarme e alerta de atraso.' },
  ];
  readonly requisitos = [
    { icone: 'wifi', titulo: 'Internet no salão', texto: 'O mesmo Wi-Fi ou 4G que você já usa. O cliente usa a internet do próprio celular.' },
    { icone: 'celular', titulo: 'Celular, tablet ou computador', texto: 'Funciona no navegador. Na cozinha e no salão dá para instalar como app no tablet.' },
    { icone: 'impressora', titulo: 'Impressora (opcional)', texto: 'Se a cozinha trabalha com papel, use uma impressora térmica de 80 mm.' },
  ];
}
