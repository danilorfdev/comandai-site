/**
 * Conteúdo usado em mais de uma página (e nos dados estruturados do Google):
 * planos e perguntas frequentes. Mudou um preço? Muda só aqui.
 */
export interface Plano {
  id: string;
  nome: string;
  publico: string;
  /** Centavos. */
  mensal: number;
  /** Centavos por mês no plano anual (cobrado 12x esse valor de uma vez). */
  anual: number;
  destaque?: boolean;
  itens: { forte: string; resto: string }[];
}

export const PLANOS: Plano[] = [
  {
    id: 'essencial', nome: 'Essencial', publico: 'Lanchonete, açaí, bar pequeno', mensal: 8990, anual: 7490,
    itens: [
      { forte: 'Até 15 mesas', resto: 'com QR Code próprio' },
      { forte: '3 usuários', resto: 'na equipe' },
      { forte: 'Todas as funções', resto: 'do sistema' },
      { forte: 'Suporte', resto: 'por WhatsApp e e-mail' },
    ],
  },
  {
    id: 'profissional', nome: 'Profissional', publico: 'Restaurante e pizzaria de porte médio', mensal: 14990, anual: 12490, destaque: true,
    itens: [
      { forte: 'Até 50 mesas', resto: 'com QR Code próprio' },
      { forte: '10 usuários', resto: 'na equipe' },
      { forte: 'Todas as funções', resto: 'do sistema' },
      { forte: 'Suporte', resto: 'por WhatsApp e e-mail' },
    ],
  },
  {
    id: 'ilimitado', nome: 'Ilimitado', publico: 'Casas grandes e alto movimento', mensal: 24990, anual: 20790,
    itens: [
      { forte: 'Mesas sem limite', resto: '' },
      { forte: 'Usuários sem limite', resto: '' },
      { forte: 'Implantação assistida', resto: 'com a sua equipe' },
      { forte: 'Suporte prioritário', resto: 'no horário do salão' },
    ],
  },
];

export const menorPreco = Math.min(...PLANOS.map((p) => p.anual));
export const maiorPreco = Math.max(...PLANOS.map((p) => p.mensal));

/** "74,90" a partir de centavos. */
export const brl = (centavos: number) =>
  (centavos / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export interface Pergunta { pergunta: string; resposta: string }
export interface GrupoPerguntas { id: string; nome: string; perguntas: Pergunta[] }

export const DUVIDAS: GrupoPerguntas[] = [
  {
    id: 'comecar', nome: 'Começando', perguntas: [
      { pergunta: 'Quanto tempo leva para começar a usar?', resposta: 'O cadastro leva poucos minutos e já cria as mesas. Depois é montar o cardápio e imprimir os QR Codes. Dá para receber o primeiro pedido no mesmo dia.' },
      { pergunta: 'Preciso instalar alguma coisa?', resposta: 'Não. O Comandaí funciona no navegador. Na cozinha e no salão, você pode instalar como app no tablet ou no celular para abrir mais rápido.' },
      { pergunta: 'Funciona para qualquer tipo de restaurante?', resposta: 'Funciona para quem atende na mesa: lanchonete, pizzaria, bar, restaurante, açaí, espetinho. Ainda não temos delivery nem integração com o iFood.' },
    ],
  },
  {
    id: 'mesa', nome: 'Na mesa', perguntas: [
      { pergunta: 'O cliente precisa baixar app ou criar conta?', resposta: 'Não. Ele aponta a câmera para o QR Code e o cardápio abre no navegador. Pode informar o nome, se quiser.' },
      { pergunta: 'Várias pessoas da mesma mesa podem pedir?', resposta: 'Podem. Quem abriu a mesa vê um código de 4 números no celular. Os outros digitam esse código e todos pedem na mesma conta.' },
      { pergunta: 'E se alguém fotografar o QR Code e pedir de casa?', resposta: 'Não funciona. O primeiro pedido de uma mesa livre só vai para a cozinha depois que a equipe libera a mesa, e quem chega depois precisa do código.' },
      { pergunta: 'E o cliente que não quer usar o celular?', resposta: 'O garçom lança o pedido pelo celular dele, e o pedido segue o mesmo caminho até a cozinha.' },
    ],
  },
  {
    id: 'equipe', nome: 'Cozinha e equipe', perguntas: [
      { pergunta: 'Como a cozinha fica sabendo do pedido?', resposta: 'O pedido aparece na hora na tela da cozinha, com alarme sonoro. A tela também avisa quando um pedido está demorando.' },
      { pergunta: 'Dá para imprimir o pedido?', resposta: 'Dá. A via da cozinha e a conferência da conta saem em impressora térmica de 80 mm, pelo próprio navegador.' },
      { pergunta: 'Quantas pessoas da equipe podem usar?', resposta: 'Depende do plano: 3 no Essencial, 10 no Profissional e sem limite no Ilimitado. Cada pessoa tem o próprio login e perfil.' },
      { pergunta: 'E se um item acabar no meio do serviço?', resposta: 'Marque como esgotado com um toque e ele some do cardápio do cliente na hora. O mesmo vale para adicionais, como o bacon.' },
    ],
  },
  {
    id: 'planos', nome: 'Planos e pagamento', perguntas: [
      { pergunta: 'Quanto custa?', resposta: `A partir de R$ ${brl(menorPreco)} por mês no plano anual do Essencial. Todas as funções estão em todos os planos; a diferença é o número de mesas e de usuários.` },
      { pergunta: 'Preciso de cartão de crédito para testar?', resposta: 'Não. Você cria a conta, usa por 14 dias com tudo liberado e só escolhe o plano se quiser continuar.' },
      { pergunta: 'Posso trocar de plano depois?', resposta: 'Pode, a qualquer momento. Se o salão crescer, você muda para um plano com mais mesas e nada do que já está cadastrado se perde.' },
      { pergunta: 'Como funciona o pagamento?', resposta: 'No mensal, a cobrança é feita todo mês. No anual, você paga os 12 meses de uma vez, à vista ou no Pix, e economiza o equivalente a 2 meses.' },
      { pergunta: 'Tem fidelidade ou multa para cancelar?', resposta: 'No plano mensal, não: você cancela quando quiser e o acesso vale até o fim do mês pago. [CONFIRME A REGRA DO PLANO ANUAL]' },
      { pergunta: 'O que acontece se eu não pagar?', resposta: 'Quando a assinatura vence, a equipe deixa de entrar e o QR das mesas para de aceitar pedidos. Seus dados ficam guardados e tudo volta assim que o pagamento é feito.' },
      { pergunta: 'O sistema emite nota fiscal?', resposta: 'Ainda não. O Comandaí imprime a conferência da conta, que não é documento fiscal. Se você já tem um emissor, continua usando ele.' },
    ],
  },
  {
    id: 'dados', nome: 'Segurança e dados', perguntas: [
      { pergunta: 'Os dados do meu restaurante ficam seguros?', resposta: 'Ficam. Cada restaurante só enxerga os próprios dados, as senhas são guardadas criptografadas e todo o acesso é por conexão segura (HTTPS).' },
      { pergunta: 'Onde os dados ficam guardados?', resposta: 'Em servidores no Brasil, com cópia de segurança diária. Os detalhes estão na Política de privacidade.' },
      { pergunta: 'E se eu cancelar?', resposta: 'O acesso é bloqueado, mas nada é apagado na hora. Se voltar, tudo continua como estava. Você também pode pedir a exclusão dos dados.' },
    ],
  },
];

/** Perguntas da página de planos (as do grupo "Planos e pagamento", sem repetir o preço). */
export const DUVIDAS_PLANOS = DUVIDAS.find((g) => g.id === 'planos')!.perguntas.filter((p) => p.pergunta !== 'Quanto custa?');
