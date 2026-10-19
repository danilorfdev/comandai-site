import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { SITE } from './site';

/** O que cada rota declara em `data.seo` (app.routes.ts). */
export interface DadosSeo {
  /** Título da aba e do resultado no Google (até ~60 caracteres). */
  titulo: string;
  /** Texto do resultado no Google e da prévia no WhatsApp (até ~155 caracteres). */
  descricao: string;
  /** Caminho da página, sem domínio: '/', '/planos'... */
  caminho: string;
  /** Nome curto da página na trilha do Google (Início › Planos). */
  nome?: string;
  /** false = pede ao Google para não indexar (página 404). */
  indexar?: boolean;
  /** Dados estruturados (schema.org) específicos da página. */
  dados?: Record<string, unknown>[];
}

const IMAGEM = `${SITE.url}/og-image.png`;
const ID_JSON_LD = 'dados-pagina';

/**
 * Aplica as tags de SEO a cada navegação. Na pré-renderização isso roda no
 * build, então o HTML de cada página já sai com título, descrição, canonical,
 * Open Graph e dados estruturados: o Google e o WhatsApp leem sem executar JS.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);
  private doc = inject(DOCUMENT);
  private router = inject(Router);

  iniciar() {
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      let rota: ActivatedRouteSnapshot = this.router.routerState.snapshot.root;
      while (rota.firstChild) rota = rota.firstChild;
      const seo = rota.data['seo'] as DadosSeo | undefined;
      if (seo) this.aplicar(seo);
    });
  }

  aplicar(seo: DadosSeo) {
    const url = SITE.url + (seo.caminho === '/' ? '/' : seo.caminho);
    this.title.setTitle(seo.titulo);

    const tags: Record<string, string> = {
      description: seo.descricao,
      robots: seo.indexar === false ? 'noindex, follow' : 'index, follow, max-image-preview:large',
      'twitter:card': 'summary_large_image',
      'twitter:title': seo.titulo,
      'twitter:description': seo.descricao,
      'twitter:image': IMAGEM,
    };
    for (const [name, content] of Object.entries(tags)) this.meta.updateTag({ name, content });

    const og: Record<string, string> = {
      'og:type': 'website',
      'og:site_name': SITE.nome,
      'og:locale': 'pt_BR',
      'og:title': seo.titulo,
      'og:description': seo.descricao,
      'og:url': url,
      'og:image': IMAGEM,
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:image:alt': 'Comandaí: pedidos pela mesa com QR Code',
    };
    for (const [property, content] of Object.entries(og)) this.meta.updateTag({ property, content });

    if (SITE.googleVerificacao) this.meta.updateTag({ name: 'google-site-verification', content: SITE.googleVerificacao });

    if (seo.indexar === false) this.doc.head.querySelector('link[rel="canonical"]')?.remove();
    else this.link('canonical', url);
    this.jsonLd([...this.trilha(seo), ...(seo.dados ?? [])]);
  }

  /** Caminho de navegação (Início › Planos) para o Google mostrar no resultado. */
  private trilha(seo: DadosSeo): Record<string, unknown>[] {
    if (seo.caminho === '/' || seo.indexar === false) return [];
    return [{
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Início', item: `${SITE.url}/` },
        { '@type': 'ListItem', position: 2, name: seo.nome ?? seo.titulo, item: SITE.url + seo.caminho },
      ],
    }];
  }

  private link(rel: string, href: string) {
    let el = this.doc.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
    if (!el) {
      el = this.doc.createElement('link');
      el.setAttribute('rel', rel);
      this.doc.head.appendChild(el);
    }
    el.setAttribute('href', href);
  }

  private jsonLd(dados: Record<string, unknown>[]) {
    this.doc.getElementById(ID_JSON_LD)?.remove();
    if (!dados.length) return;
    const script = this.doc.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('id', ID_JSON_LD);
    // "<" escapado: um texto de conteúdo nunca fecha a tag <script> por engano
    script.textContent = JSON.stringify(dados.length === 1 ? dados[0] : dados).replace(/</g, '\\u003c');
    this.doc.head.appendChild(script);
  }
}
