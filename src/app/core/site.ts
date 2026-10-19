/**
 * Dados do site num lugar só: endereços, contato e empresa.
 * Troque os campos entre colchetes antes de publicar.
 */
export const SITE = {
  /** Endereço público do site (sem barra no fim). Vai no canonical, no sitemap e no Open Graph. */
  url: 'https://sistemacomandai.com.br',
  /** Sistema dos restaurantes (comandai-web): botões Entrar e Criar conta. */
  appUrl: 'https://app.sistemacomandai.com.br',
  nome: 'Comandaí',
  slogan: 'Pediu, chegou.',
  email: 'contato@sistemacomandai.com.br',
  emailPrivacidade: 'privacidade@sistemacomandai.com.br',
  whatsapp: '[SEU WHATSAPP]',
  /** Link do WhatsApp (https://wa.me/55DDDNUMERO). Vazio = o botão leva ao e-mail. */
  whatsappLink: '',
  instagram: '[@SEU PERFIL]',
  instagramLink: '',
  razaoSocial: '[RAZÃO SOCIAL]',
  cnpj: '[00.000.000/0000-00]',
  endereco: '[ENDEREÇO COMPLETO]',
  /**
   * Código da verificação do Google Search Console pelo método "Tag HTML"
   * (só o valor de content="..."). Vazio = você verificou pelo DNS, que é o recomendado.
   */
  googleVerificacao: '',
} as const;

export const cadastroUrl = `${SITE.appUrl}/cadastro`;
export const entrarUrl = `${SITE.appUrl}/entrar`;
export const contatoUrl = SITE.whatsappLink || `mailto:${SITE.email}`;
