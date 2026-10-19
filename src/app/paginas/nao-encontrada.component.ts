import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'cs-nao-encontrada',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container pilha caixa">
      <p class="rotulo">Erro 404</p>
      <h1 class="titulo-pagina">Esse pedido não chegou na cozinha</h1>
      <p class="abertura">A página que você procurou não existe ou mudou de endereço.</p>
      <div class="acoes">
        <a class="btn btn-primario btn-g" routerLink="/">Ir para o início</a>
        <a class="btn btn-contorno btn-g" routerLink="/duvidas">Ver as dúvidas</a>
      </div>
    </section>
  `,
  styles: ['.caixa { padding-top: 96px; padding-bottom: 120px; max-width: 760px; }'],
})
export class NaoEncontradaComponent {}
