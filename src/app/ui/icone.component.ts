import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/** Ícones em traço (24×24), desenhados no próprio código: nenhum pacote extra. */
const ICONES: Record<string, string> = {
  check: 'M20 6 9 17l-5-5',
  mais: 'M12 5v14M5 12h14',
  qr: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h3v3h-3zM20 14v.01M14 20h.01M17 20h4v-3',
  cozinha: 'M6 13.9A4 4 0 0 1 7 6a5 5 0 0 1 10 0 4 4 0 0 1 1 7.9V20H6zM6 17h12',
  celular: 'M7 2h10a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zM11 18h2',
  salao: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
  mover: 'M7 7h10M13 3l4 4-4 4M17 17H7M11 13l-4 4 4 4',
  fechar: 'M18 6 6 18M6 6l12 12',
  grafico: 'M3 3v18h18M7 15v2M12 10v7M17 6v11',
  equipe: 'M16 21v-2a4 4 0 0 0-8 0v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  cadeado: 'M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4',
  wifi: 'M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M2 9a15 15 0 0 1 20 0M12 20h.01',
  impressora: 'M6 9V3h12v6M3 9h18v8H3zM6 14h12v7H6z',
  menu: 'M4 6h16M4 12h16M4 18h16',
};

@Component({
  selector: 'cs-icone',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<svg [attr.width]="tamanho()" [attr.height]="tamanho()" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    [attr.stroke-width]="traco()" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
    <path [attr.d]="caminho()" /></svg>`,
  styles: [':host { display: inline-flex; flex-shrink: 0; line-height: 0; }'],
})
export class IconeComponent {
  nome = input.required<string>();
  tamanho = input(22);
  traco = input(2);
  caminho = computed(() => ICONES[this.nome()] ?? '');
}
