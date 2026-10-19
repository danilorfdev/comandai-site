# Comandaí — site institucional

Site de vendas do Comandaí: **Início, Como funciona, Planos, Dúvidas e Política de privacidade**. Feito em Angular 19 com **pré-renderização**: no build, cada página vira um HTML pronto, com título, descrição e conteúdo. O Google e as prévias do WhatsApp leem tudo sem precisar executar JavaScript. O resultado é uma pasta de arquivos estáticos, servida por nginx, sem servidor Node.

## Rodar

```bash
npm install
npm start          # desenvolvimento: http://localhost:4300
npm run build      # gera o site em dist/comandai-site/browser
npm run seo        # confere título, descrição e canonical de cada página gerada
npm run preview    # serve o build para conferir como vai ficar no ar
```

## Onde mudar cada coisa

| O quê | Arquivo |
|---|---|
| Domínio, e-mail, WhatsApp, Instagram, razão social, CNPJ, verificação do Google | `src/app/core/site.ts` |
| Preços, planos e perguntas frequentes | `src/app/core/conteudo.ts` |
| Título e descrição de cada página no Google | `src/app/app.routes.ts` |
| Faixa "Fundadores" (ligar/desligar) | `MOSTRAR_FUNDADORES` em `src/app/paginas/planos.component.ts` |
| Data da política de privacidade | `ATUALIZADA_EM` em `src/app/paginas/privacidade.component.ts` |
| Páginas do sitemap e datas de atualização | `public/sitemap.xml` |
| Imagem de prévia (WhatsApp, Instagram, Google) | `public/og-image.png` (1200×630) |

### Antes de publicar, preencha

- Em `site.ts`: WhatsApp, Instagram, razão social, CNPJ e endereço.
- Na política de privacidade: data, nome do provedor de hospedagem e do meio de pagamento, prazos de guarda e nome do encarregado de dados. **Peça para um advogado revisar o texto.**
- Em `conteudo.ts`: a regra de cancelamento do plano anual.
- Em `planos.component.ts`: o número de vagas de fundador.

## O que já vem de SEO

- **Título e descrição** próprios em cada página, no tamanho que o Google mostra.
- **Canonical** em cada página, e redirecionamento de `/planos/` para `/planos`, para não haver endereço duplicado.
- **Open Graph e Twitter Card** com a imagem de prévia, para links compartilhados no WhatsApp, Instagram, Facebook e LinkedIn.
- **Dados estruturados** (schema.org):
  - em todas as páginas: Organização e Site;
  - Início: Software com a faixa de preço;
  - Planos: Software com os três planos e seus preços;
  - Dúvidas: Perguntas frequentes;
  - páginas internas: trilha de navegação (Início › Planos).
- **`sitemap.xml`** e **`robots.txt`** apontando para ele.
- **Página 404** de verdade (código 404 e `noindex`).
- **Desempenho:** fontes no próprio site (sem Google Fonts), CSS e JS com cache de 1 ano, gzip, HTML sem script inline.
- **Acessibilidade:** um `<h1>` por página, link "Pular para o conteúdo", foco visível e contraste da marca.
- **Segurança:** CSP estrita, HSTS e demais cabeçalhos no `nginx-seguranca.conf`.
- O GitHub Actions roda o build e o `npm run seo` a cada push. Se uma página perder o título ou o canonical, o commit fica com ❌.

## Colocar no ar (VPS)

1. **DNS na HostGator:** registros `A` de `@` e de `www` apontando para o IP da VPS.
2. **Imagem:** `docker build -t comandai-site .` e suba o contêiner (porta 80 interna).
3. **Caddy** na frente, com HTTPS automático e um único endereço oficial (sem www):

```
sistemacomandai.com.br {
	reverse_proxy comandai-site:80
}

www.sistemacomandai.com.br {
	redir https://sistemacomandai.com.br{uri} permanent
}
```

4. Abra `https://sistemacomandai.com.br/robots.txt` e `https://sistemacomandai.com.br/sitemap.xml` para conferir.

## Colocar no Google

### 1. Search Console (obrigatório)

1. Entre em **https://search.google.com/search-console** com a conta Google da empresa.
2. Clique em **Adicionar propriedade** e escolha **Domínio**. Digite `sistemacomandai.com.br`. Esse tipo cobre o site, o `www` e os subdomínios (`app.`, `admin.`) de uma vez.
3. O Google mostra um registro **TXT**. Na HostGator, em **Zona DNS**, crie um registro TXT no nome `@` com esse valor. Volte ao Search Console e clique em **Verificar**. Pode levar de alguns minutos a algumas horas.
   - Se preferir o método por tag HTML, cole só o código do `content="..."` em `googleVerificacao` no `site.ts`, faça o build e publique.
4. No menu **Sitemaps**, envie: `https://sistemacomandai.com.br/sitemap.xml`
5. Em **Inspeção de URL**, cole cada endereço abaixo e clique em **Solicitar indexação**:

```
https://sistemacomandai.com.br/
https://sistemacomandai.com.br/planos
https://sistemacomandai.com.br/como-funciona
https://sistemacomandai.com.br/duvidas
https://sistemacomandai.com.br/privacidade
```

### 2. Perfil da Empresa no Google

Crie o perfil em **https://business.google.com** como empresa que atende clientes sem endereço físico (área de atendimento: Brasil) e coloque `https://sistemacomandai.com.br` como site. Ajuda a aparecer quando pesquisam o nome "Comandaí".

### 3. Bing (opcional, 2 minutos)

Em **https://www.bing.com/webmasters**, escolha **Importar do Google Search Console**. O Bing também alimenta o DuckDuckGo e o Yahoo.

### Ferramentas para conferir

| Para quê | Link |
|---|---|
| Dados estruturados (preços, perguntas) | https://search.google.com/test/rich-results |
| Velocidade e Core Web Vitals | https://pagespeed.web.dev |
| Prévia no WhatsApp e no Facebook | https://developers.facebook.com/tools/debug/ |
| Validar o sitemap | https://www.xml-sitemaps.com/validate-xml-sitemap.html |

### O que esperar

- A indexação leva de alguns dias a algumas semanas. Acompanhe em **Páginas** e **Desempenho** no Search Console.
- Pesquisas pelo nome ("Comandaí", "sistema comandaí") costumam aparecer primeiro. Termos concorridos, como "sistema de comanda para restaurante", dependem de tempo, de links de outros sites (Instagram, Perfil da Empresa, parceiros) e de conteúdo novo.
- Quando mudar uma página, atualize o `<lastmod>` dela no `sitemap.xml`.
