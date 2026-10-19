// Confere o HTML gerado pelo build: cada página do sitemap precisa existir,
// ter título, descrição, canonical igual ao endereço do sitemap, Open Graph e um só <h1>.
// Uso: npm run build && node scripts/conferir-seo.mjs
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const PASTA = 'dist/comandai-site/browser';
const sitemap = readFileSync('public/sitemap.xml', 'utf8');
const enderecos = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
const erros = [];

const pegar = (html, re) => html.match(re)?.[1] ?? '';

for (const url of enderecos) {
  const caminho = new URL(url).pathname;
  const arquivo = join(PASTA, caminho === '/' ? 'index.html' : `${caminho.slice(1)}/index.html`);
  if (!existsSync(arquivo)) { erros.push(`${caminho}: página não foi gerada (${arquivo})`); continue; }
  const html = readFileSync(arquivo, 'utf8');
  const titulo = pegar(html, /<title>(.*?)<\/title>/s);
  const descricao = pegar(html, /<meta name="description" content="(.*?)"/);
  const canonical = pegar(html, /<link rel="canonical" href="(.*?)"/);
  const h1 = (html.match(/<h1[\s>]/g) ?? []).length;

  if (!titulo || titulo.length > 65) erros.push(`${caminho}: título ausente ou com mais de 65 caracteres (${titulo.length})`);
  if (descricao.length < 70 || descricao.length > 160) erros.push(`${caminho}: descrição com ${descricao.length} caracteres (ideal: 70 a 160)`);
  if (canonical !== url) erros.push(`${caminho}: canonical "${canonical}" diferente do sitemap "${url}"`);
  if (!html.includes('property="og:image"')) erros.push(`${caminho}: sem og:image`);
  if (h1 !== 1) erros.push(`${caminho}: ${h1} títulos <h1> (precisa de exatamente 1)`);
  if (/name="robots" content="noindex/.test(html)) erros.push(`${caminho}: marcada como noindex, mas está no sitemap`);
  console.log(`✔ ${caminho.padEnd(16)} ${titulo}`);
}

const pagina404 = join(PASTA, '404/index.html');
if (!existsSync(pagina404) || !/name="robots" content="noindex/.test(readFileSync(pagina404, 'utf8'))) {
  erros.push('/404: precisa existir e estar marcada como noindex');
}

if (erros.length) {
  console.error(`\n✘ ${erros.length} problema(s) de SEO:\n- ${erros.join('\n- ')}`);
  process.exit(1);
}
console.log(`\nTudo certo: ${enderecos.length} páginas conferidas.`);
