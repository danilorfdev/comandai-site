import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { brl, menorPreco } from '../core/conteudo';
import { cadastroUrl } from '../core/site';
import { IconeComponent } from '../ui/icone.component';

@Component({
  selector: 'cs-inicio',
  imports: [RouterLink, IconeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Abertura -->
    <section class="container hero">
      <div class="hero-texto pilha">
        <p class="rotulo">Sistema de pedidos pela mesa</p>
        <h1 class="hero-titulo">Pediu, chegou.</h1>
        <p class="abertura">O cliente escaneia o QR Code da mesa, pede pelo celular e o pedido chega na hora na cozinha e no caixa. Sem app, sem fila e sem papel perdido.</p>
        <div class="acoes">
          <a class="btn btn-primario btn-g" [href]="cadastro">Testar 14 dias grátis</a>
          <a class="btn btn-contorno btn-g" routerLink="/como-funciona">Ver como funciona</a>
        </div>
        <p class="suave pequeno">Sem cartão de crédito. Você monta o cardápio e imprime os QR Codes no mesmo dia.</p>
      </div>

      <!-- Ilustração: celular do cliente e via da cozinha -->
      <div class="ilustracao" aria-hidden="true">
        <div class="celular">
          <div class="tela">
            <div class="tela-topo">
              <span class="tela-mesa">Mesa 7</span>
              <span class="tela-loja">Lanchonete do Bairro</span>
            </div>
            <div class="tela-abas">
              <span class="aba ativa">Lanches</span><span class="aba">Bebidas</span><span class="aba">Porções</span>
            </div>
            <div class="tela-itens">
              @for (c of cardapio; track c.nome) {
                <div class="item">
                  <span><strong>{{ c.nome }}</strong><small>{{ c.preco }}</small></span>
                  <span class="mais">+</span>
                </div>
              }
            </div>
            <div class="sacola"><span>Enviar pedido</span><span>R$ 57,80</span></div>
          </div>
        </div>
        <div class="via">
          <div class="via-topo"><span>COZINHA</span><span class="selo selo-mostarda">Novo</span></div>
          <div class="via-mesa">MESA 7</div>
          <div class="via-traco"></div>
          <div>2x X-burguer</div>
          <div class="via-extra">+ bacon</div>
          <div class="via-extra obs">» sem cebola</div>
        </div>
      </div>
    </section>

    <!-- Três passos -->
    <section class="secao-alt">
      <div class="container secao">
        <div class="cabeca-linha">
          <div class="cabeca-secao">
            <p class="rotulo">Como funciona</p>
            <h2 class="titulo-secao">Da mesa para a cozinha em três passos</h2>
          </div>
          <a routerLink="/como-funciona" class="link-forte">Ver o passo a passo completo</a>
        </div>
        <ol class="grade passos">
          @for (p of passos; track p.titulo; let i = $index) {
            <li class="cartao-areia passo">
              <span class="numero">{{ i + 1 }}</span>
              <h3 class="titulo-cartao">{{ p.titulo }}</h3>
              <p class="suave">{{ p.texto }}</p>
            </li>
          }
        </ol>
      </div>
    </section>

    <!-- Benefícios -->
    <section class="container secao">
      <div class="cabeca-secao">
        <p class="rotulo">Para o dono</p>
        <h2 class="titulo-secao">Menos correria no salão, mais controle no caixa</h2>
      </div>
      <div class="grade" style="--min: 300px">
        @for (b of beneficios; track b.titulo) {
          <div class="cartao beneficio">
            <span class="icone-caixa"><cs-icone [nome]="b.icone" /></span>
            <div>
              <h3 class="titulo-cartao">{{ b.titulo }}</h3>
              <p class="suave">{{ b.texto }}</p>
            </div>
          </div>
        }
      </div>
    </section>

    <!-- Para quem -->
    <section class="container" style="padding-bottom: 80px">
      <div class="painel-escuro para-quem">
        <div class="pilha">
          <h2 class="titulo-secao">Feito para quem vive o corre do salão</h2>
          <p class="suave abertura">Lanchonete, pizzaria, bar, restaurante, açaí, espetinho. Se tem mesa e tem pedido, o Comandaí ajuda.</p>
        </div>
        <ul class="segmentos">
          @for (s of segmentos; track s) { <li>{{ s }}</li> }
        </ul>
      </div>
    </section>

    <!-- Preço -->
    <section class="container" style="padding-bottom: 80px">
      <div class="faixa-tomate faixa-preco">
        <div class="pilha" style="gap: 6px">
          <p class="rotulo">Planos</p>
          <p class="preco-chamada">A partir de R$ {{ preco }} por mês</p>
          <p class="suave">O Essencial já faz o ciclo completo da mesa, do QR Code à conta fechada.</p>
        </div>
        <a class="btn btn-primario btn-g" routerLink="/planos">Ver os planos</a>
      </div>
    </section>

    <!-- Dúvidas rápidas -->
    <section class="container grade rapidas" style="padding-bottom: 80px">
      @for (r of rapidas; track r.pergunta) {
        <div class="cartao-areia">
          <h3 class="titulo-cartao">{{ r.pergunta }}</h3>
          <p class="suave">{{ r.resposta }}</p>
        </div>
      }
      <a routerLink="/duvidas" class="ver-todas">Ver todas as dúvidas</a>
    </section>
  `,
  styles: [`
    .hero { display: flex; flex-wrap: wrap; align-items: center; gap: 56px; padding-top: 72px; padding-bottom: 80px; }
    .hero-texto { flex: 999 1 460px; min-width: 0; gap: 20px; }
    .hero-titulo { font-size: clamp(48px, 7vw, 76px); line-height: 1; font-weight: 700; letter-spacing: -2px; }
    .ilustracao { flex: 1 1 380px; min-width: 0; display: flex; justify-content: center; position: relative; padding: 16px 0 124px; }
    .celular { width: 280px; border-radius: 40px; background: var(--texto); padding: 12px; box-shadow: 0 24px 60px rgba(31, 26, 23, .22); }
    .tela { border-radius: 30px; background: var(--fundo); overflow: hidden; display: flex; flex-direction: column; }
    .tela-topo { display: flex; flex-direction: column; padding: 20px 18px 12px; background: var(--marca); color: var(--fundo); }
    .tela-mesa { font-size: 12px; opacity: .9; }
    .tela-loja { font-family: var(--display); font-weight: 700; font-size: 20px; }
    .tela-abas { display: flex; gap: 6px; padding: 12px 14px; font-size: 12px; font-weight: 700; }
    .aba { padding: 4px 10px; border-radius: 999px; border: 1px solid var(--borda); color: var(--texto-suave); }
    .aba.ativa { background: var(--texto); border-color: var(--texto); color: var(--fundo); }
    .tela-itens { display: flex; flex-direction: column; gap: 8px; padding: 0 14px 14px; }
    .item { display: flex; justify-content: space-between; align-items: center; padding: 12px; border-radius: 14px; background: var(--fundo-alt); }
    .item > span:first-child { display: flex; flex-direction: column; font-size: 14px; }
    .item small { font-size: 12px; color: var(--texto-suave); }
    .item .mais { display: inline-flex; width: 28px; height: 28px; align-items: center; justify-content: center; border-radius: 10px;
                  background: var(--marca); color: var(--fundo); font-weight: 700; }
    .sacola { margin: 0 14px 16px; padding: 14px; border-radius: 14px; background: var(--texto); color: var(--fundo);
              display: flex; justify-content: space-between; font-weight: 700; font-size: 14px; }
    .via { position: absolute; right: 0; bottom: 0; width: 220px; padding: 16px 18px; border-radius: 16px; background: var(--papel);
           border: 1px solid var(--borda); box-shadow: 0 14px 34px rgba(31, 26, 23, .16); font-family: 'Courier New', monospace; font-size: 13px; }
    .via-topo { display: flex; justify-content: space-between; align-items: center; font-family: var(--corpo); font-weight: 700;
                font-size: 12px; letter-spacing: 1px; margin-bottom: 8px; }
    .via-mesa { font-weight: 700; font-size: 18px; }
    .via-traco { border-top: 1px dashed var(--borda-forte); margin: 8px 0; }
    .via-extra { padding-left: 12px; }
    .obs { font-style: italic; }
    @media (max-width: 520px) { .via { width: 200px; } }

    .cabeca-linha { display: flex; justify-content: space-between; align-items: flex-end; gap: 16px; flex-wrap: wrap; margin-bottom: 40px; }
    .cabeca-linha .cabeca-secao { margin-bottom: 0; }
    .link-forte { font-weight: 700; }
    .passos { list-style: none; margin: 0; padding: 0; gap: 20px; }
    .passo { display: flex; flex-direction: column; gap: 10px; background: var(--fundo); }
    .passo h3 { font-size: 22px; line-height: 28px; margin-top: 6px; }
    .beneficio { display: flex; gap: 16px; align-items: flex-start; }
    .beneficio h3 { font-size: 18px; line-height: 24px; margin-bottom: 4px; }
    .beneficio p { font-size: 15px; line-height: 22px; }

    .para-quem { display: flex; flex-wrap: wrap; gap: 32px; align-items: center; }
    .para-quem .pilha { flex: 999 1 420px; min-width: 0; }
    .para-quem .titulo-secao { font-size: clamp(28px, 3vw, 34px); }
    .segmentos { flex: 1 1 320px; list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 10px; }
    .segmentos li { padding: 10px 18px; border-radius: 999px; border: 1px solid var(--texto-suave); font-weight: 700; }

    .faixa-preco { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 24px; }
    .preco-chamada { font-family: var(--display); font-size: clamp(26px, 3vw, 32px); line-height: 1.2; font-weight: 700; }

    .rapidas .cartao-areia { display: flex; flex-direction: column; gap: 8px; padding: 24px; border-radius: var(--raio); }
    .rapidas h3 { font-size: 18px; line-height: 24px; }
    .rapidas p { font-size: 15px; line-height: 22px; }
    .ver-todas { display: flex; align-items: center; justify-content: center; min-height: 120px; padding: 24px; border-radius: var(--raio);
                 border: 1.5px dashed var(--borda-forte); font-weight: 700; text-decoration: none; }
  `],
})
export class InicioComponent {
  readonly cadastro = cadastroUrl;
  readonly preco = brl(menorPreco);
  readonly cardapio = [
    { nome: 'X-burguer', preco: 'R$ 24,90' },
    { nome: 'X-bacon', preco: 'R$ 28,90' },
    { nome: 'Batata com cheddar', preco: 'R$ 22,00' },
  ];
  readonly passos = [
    { titulo: 'Cliente lê o QR Code', texto: 'Cada mesa tem o seu QR. O cardápio abre no celular, sem baixar nada.' },
    { titulo: 'Pede pelo celular', texto: 'Escolhe os itens, marca adicionais e observações e envia. Quem está junto entra na mesma conta.' },
    { titulo: 'Cozinha e caixa recebem', texto: 'O pedido toca na tela da cozinha na hora. O caixa vê a conta da mesa e fecha quando o cliente pedir.' },
  ];
  readonly beneficios = [
    { icone: 'check', titulo: 'Pedido certo na cozinha', texto: 'Sem anotação ilegível: adicionais e "sem cebola" chegam escritos como o cliente pediu.' },
    { icone: 'equipe', titulo: 'Garçom livre para atender', texto: 'Menos ida e volta até a mesa. Quem prefere pedir ao garçom continua sendo atendido.' },
    { icone: 'salao', titulo: 'Salão inteiro numa tela', texto: 'Mapa com as mesas livres, ocupadas e as que pediram a conta.' },
    { icone: 'fechar', titulo: 'Acabou? Some do cardápio', texto: 'Marque o item como esgotado com um toque e ninguém pede o que a cozinha não tem.' },
    { icone: 'grafico', titulo: 'Vendas na palma da mão', texto: 'Faturamento do dia, ticket médio, mais vendidos e horários de pico no painel do dono.' },
    { icone: 'cadeado', titulo: 'Mesa protegida', texto: 'Só quem está na mesa consegue pedir: o salão libera a mesa e os outros entram com um código.' },
  ];
  readonly segmentos = ['Lanchonete', 'Pizzaria', 'Restaurante', 'Bar', 'Açaí', 'Espetinho'];
  readonly rapidas = [
    { pergunta: 'Preciso baixar algum app?', resposta: 'Não. O cliente usa a câmera do celular e a equipe usa no navegador ou instala no tablet.' },
    { pergunta: 'E quem não quer usar o celular?', resposta: 'O garçom lança o pedido pelo celular dele e tudo segue o mesmo caminho até a cozinha.' },
  ];
}
