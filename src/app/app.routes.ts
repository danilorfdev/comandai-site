import { Routes } from '@angular/router';
import { DUVIDAS, PLANOS, maiorPreco, menorPreco } from './core/conteudo';
import { DadosSeo } from './core/seo.service';
import { SITE } from './core/site';

const preco = (centavos: number) => (centavos / 100).toFixed(2);

/** O Comandaí como software, com a faixa de preços (resultado "Software" no Google). */
const SOFTWARE = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Comandaí',
  description: 'Sistema de pedidos pela mesa com QR Code para lanchonetes e restaurantes: o cliente pede pelo celular e a cozinha recebe na hora.',
  url: `${SITE.url}/`,
  image: `${SITE.url}/og-image.png`,
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Sistema para restaurantes',
  operatingSystem: 'Web, Android, iOS',
  inLanguage: 'pt-BR',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'BRL',
    lowPrice: preco(menorPreco),
    highPrice: preco(maiorPreco),
    offerCount: PLANOS.length,
  },
};

/** Cada plano como uma oferta, com o preço mensal. */
const OFERTAS = {
  ...SOFTWARE,
  offers: PLANOS.map((p) => ({
    '@type': 'Offer',
    name: `Plano ${p.nome}`,
    description: p.itens.map((i) => `${i.forte} ${i.resto}`.trim()).join(', '),
    price: preco(p.mensal),
    priceCurrency: 'BRL',
    url: `${SITE.url}/planos`,
    availability: 'https://schema.org/InStock',
  })),
};

const FAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: DUVIDAS.flatMap((g) => g.perguntas).map((d) => ({
    '@type': 'Question',
    name: d.pergunta,
    acceptedAnswer: { '@type': 'Answer', text: d.resposta },
  })),
};

const seo = (s: DadosSeo) => ({ seo: s });

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./paginas/inicio.component').then((m) => m.InicioComponent),
    data: seo({
      titulo: 'Comandaí: sistema de pedidos pela mesa com QR Code',
      descricao: 'O cliente escaneia o QR Code da mesa, pede pelo celular e o pedido chega na hora na cozinha e no caixa. Teste grátis por 14 dias.',
      caminho: '/',
      dados: [SOFTWARE],
    }),
  },
  {
    path: 'planos',
    loadComponent: () => import('./paginas/planos.component').then((m) => m.PlanosComponent),
    data: seo({
      titulo: 'Planos e preços · Comandaí',
      nome: 'Planos',
      descricao: `Sistema de comanda pelo QR Code a partir de R$ ${preco(menorPreco).replace('.', ',')} por mês. Todas as funções em todos os planos. 14 dias grátis, sem cartão.`,
      caminho: '/planos',
      dados: [OFERTAS],
    }),
  },
  {
    path: 'como-funciona',
    loadComponent: () => import('./paginas/como-funciona.component').then((m) => m.ComoFuncionaComponent),
    data: seo({
      titulo: 'Como funciona o pedido pela mesa · Comandaí',
      nome: 'Como funciona',
      descricao: 'Do QR Code da mesa ao fechamento da conta: veja como o cliente pede pelo celular, a cozinha recebe na hora e o caixa fecha a mesa.',
      caminho: '/como-funciona',
    }),
  },
  {
    path: 'duvidas',
    loadComponent: () => import('./paginas/duvidas.component').then((m) => m.DuvidasComponent),
    data: seo({
      titulo: 'Dúvidas frequentes · Comandaí',
      nome: 'Dúvidas',
      descricao: 'Precisa de app? Como a cozinha recebe o pedido? Quanto custa? Respostas sobre o sistema de pedidos pela mesa do Comandaí.',
      caminho: '/duvidas',
      dados: [FAQ],
    }),
  },
  {
    path: 'privacidade',
    loadComponent: () => import('./paginas/privacidade.component').then((m) => m.PrivacidadeComponent),
    data: seo({
      titulo: 'Política de privacidade · Comandaí',
      nome: 'Política de privacidade',
      descricao: 'Como o Comandaí trata os dados de restaurantes, equipes e clientes atendidos na mesa, de acordo com a LGPD.',
      caminho: '/privacidade',
    }),
  },
  {
    path: '404',
    loadComponent: () => import('./paginas/nao-encontrada.component').then((m) => m.NaoEncontradaComponent),
    data: seo({ titulo: 'Página não encontrada · Comandaí', descricao: 'Esta página não existe.', caminho: '/404', indexar: false }),
  },
  {
    path: '**',
    loadComponent: () => import('./paginas/nao-encontrada.component').then((m) => m.NaoEncontradaComponent),
    data: seo({ titulo: 'Página não encontrada · Comandaí', descricao: 'Esta página não existe.', caminho: '/404', indexar: false }),
  },
];
