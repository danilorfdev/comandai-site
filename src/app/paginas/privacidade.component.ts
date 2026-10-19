import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE } from '../core/site';

/** Data mostrada no topo. Atualize sempre que mudar o texto. */
const ATUALIZADA_EM = '[DATA DA PUBLICAÇÃO]';

@Component({
  selector: 'cs-privacidade',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container pilha abertura-pagina" style="gap: 12px">
      <p class="rotulo">Privacidade</p>
      <h1 class="titulo-pagina" style="font-size: clamp(34px, 5vw, 48px)">Política de privacidade</h1>
      <p class="suave">Última atualização: {{ atualizada }}</p>
    </section>

    <div class="container corpo">
      <nav class="sumario" aria-labelledby="sumario-titulo">
        <p id="sumario-titulo" class="rotulo">Nesta página</p>
        <ol>
          @for (s of secoes; track s.id) { <li><a [routerLink]="[]" [fragment]="s.id">{{ s.nome }}</a></li> }
        </ol>
      </nav>

      <article class="texto">
        <h2 id="resumo">Resumo</h2>
        <div class="resumo">
          <ul>
            <li>Usamos os dados só para fazer o Comandaí funcionar e para mantê-lo seguro.</li>
            <li>Não vendemos dados e não usamos dados para publicidade.</li>
            <li>Do cliente na mesa, guardamos apenas o pedido e o nome que ele quiser informar.</li>
            <li>Os dados ficam em servidores no Brasil, com cópia de segurança diária.</li>
            <li>Você pode pedir acesso, correção ou exclusão dos seus dados a qualquer momento.</li>
          </ul>
        </div>

        <h2 id="quem">1. Quem somos</h2>
        <p>O Comandaí é um sistema de pedidos pela mesa para lanchonetes e restaurantes, oferecido por <strong>{{ site.razaoSocial }}</strong>, inscrita no CNPJ sob o nº <strong>{{ site.cnpj }}</strong>, com sede em <strong>{{ site.endereco }}</strong>.</p>
        <p>Esta política explica como tratamos dados pessoais no site sistemacomandai.com.br e no sistema, de acordo com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018, a LGPD).</p>

        <h2 id="papeis">2. Quem decide sobre cada dado</h2>
        <p>A LGPD separa quem decide sobre os dados (controlador) de quem trata os dados em nome de outro (operador). No Comandaí, isso funciona assim:</p>
        <ul>
          <li><strong>Dados do restaurante e da equipe:</strong> o Comandaí é o controlador. São os dados de cadastro, de acesso e de assinatura.</li>
          <li><strong>Dados dos clientes atendidos na mesa:</strong> o restaurante é o controlador e o Comandaí atua como operador, tratando esses dados apenas para registrar e entregar o pedido, conforme as instruções do restaurante.</li>
        </ul>
        <p>Se você foi cliente de um restaurante que usa o Comandaí, o responsável pelos seus dados é aquele restaurante. Mesmo assim, pode falar com a gente que ajudamos a encaminhar o seu pedido.</p>

        <h2 id="dados">3. Quais dados tratamos</h2>
        <h3>Do restaurante</h3>
        <ul>
          <li>Nome fantasia, CPF ou CNPJ, telefone e e-mail de contato.</li>
          <li>Plano contratado, situação e vencimento da assinatura.</li>
          <li>Cardápio, mesas, pedidos, contas e formas de pagamento registradas no caixa.</li>
        </ul>
        <h3>Da equipe do restaurante</h3>
        <ul>
          <li>Nome, e-mail de acesso, perfil (dono, gerente, caixa, garçom ou cozinha) e data do último acesso.</li>
          <li>Senha, que nunca é guardada como texto: armazenamos apenas um código criptográfico gerado a partir dela.</li>
        </ul>
        <h3>Do cliente atendido na mesa</h3>
        <ul>
          <li>Os itens pedidos, as observações e o horário do pedido.</li>
          <li>O nome, apenas se o cliente quiser informar.</li>
          <li>Uma chave temporária guardada no celular, que permite pedir naquela conta e deixa de valer quando a conta é fechada.</li>
        </ul>
        <p>Não pedimos CPF, telefone, e-mail nem dados de pagamento do cliente na mesa.</p>
        <h3>Registros de segurança</h3>
        <ul>
          <li>Endereço IP, data e hora de acessos, tentativas de login, bloqueios, trocas de senha e alterações feitas no sistema.</li>
        </ul>
        <h3>Visitantes deste site</h3>
        <ul>
          <li>O servidor registra dados técnicos de acesso, como endereço IP, data, hora e página visitada, para segurança e diagnóstico.</li>
        </ul>

        <h2 id="finalidades">4. Para que usamos os dados</h2>
        <ul>
          <li><strong>Prestar o serviço:</strong> criar a conta, receber e encaminhar pedidos, fechar contas e mostrar relatórios ao restaurante. Base legal: execução de contrato (art. 7º, V, da LGPD).</li>
          <li><strong>Manter o sistema seguro:</strong> autenticar usuários, impedir acessos indevidos e investigar abusos. Base legal: legítimo interesse (art. 7º, IX) e cumprimento de obrigação legal (art. 7º, II).</li>
          <li><strong>Falar com o restaurante:</strong> avisos sobre a conta, a assinatura e mudanças no serviço. Base legal: execução de contrato.</li>
          <li><strong>Cumprir obrigações legais:</strong> guardar registros de acesso e documentos exigidos por lei. Base legal: cumprimento de obrigação legal (art. 7º, II).</li>
        </ul>
        <p>Não vendemos dados pessoais, não os usamos para publicidade e não os cruzamos com dados de outros restaurantes.</p>

        <h2 id="navegador">5. Cookies e armazenamento no navegador</h2>
        <p>Este site não usa cookies. No sistema, usamos apenas o necessário para ele funcionar:</p>
        <ul>
          <li><strong>Cookie de sessão:</strong> mantém a equipe conectada. É protegido contra leitura por scripts e vale por até [30] dias sem uso.</li>
          <li><strong>Preferência de tema:</strong> lembra se você escolheu o modo claro ou escuro, guardada só no seu aparelho.</li>
          <li><strong>Sessão da mesa:</strong> a chave temporária do cliente na mesa, descrita acima.</li>
        </ul>
        <p>Não usamos cookies de publicidade nem de rastreamento de terceiros. [SE INSTALAR UMA FERRAMENTA DE ESTATÍSTICAS DE VISITAS, DESCREVA AQUI.]</p>

        <h2 id="compartilhamento">6. Com quem compartilhamos</h2>
        <p>Compartilhamos dados apenas com quem nos ajuda a prestar o serviço, e só o necessário:</p>
        <ul>
          <li><strong>Hospedagem:</strong> [NOME DO PROVEDOR], que mantém os servidores do Comandaí no Brasil.</li>
          <li><strong>Cópia de segurança:</strong> Google Drive, onde guardamos uma cópia diária do banco de dados. Os servidores do Google podem ficar fora do Brasil; nesse caso, a transferência segue as garantias exigidas pela LGPD (art. 33).</li>
          <li><strong>Pagamentos:</strong> [NOME DO MEIO DE PAGAMENTO], para processar a cobrança da assinatura do restaurante.</li>
          <li><strong>Autoridades:</strong> quando houver obrigação legal ou ordem judicial.</li>
        </ul>

        <h2 id="guarda">7. Onde e por quanto tempo guardamos</h2>
        <p>Os dados ficam em servidores no Brasil, com cópia de segurança diária.</p>
        <ul>
          <li><strong>Enquanto a conta estiver ativa:</strong> guardamos os dados necessários para o serviço funcionar, inclusive o histórico de pedidos e contas, que aparece nos relatórios do restaurante.</li>
          <li><strong>Depois do cancelamento:</strong> os dados ficam bloqueados por [PRAZO, EX.: 6 MESES], para o caso de o restaurante voltar, e depois são apagados ou anonimizados.</li>
          <li><strong>Registros de acesso:</strong> guardados por pelo menos 6 meses, como exige o Marco Civil da Internet (art. 15 da Lei nº 12.965/2014).</li>
          <li><strong>Cópias de segurança:</strong> apagadas automaticamente em até [PRAZO, EX.: 30 DIAS].</li>
        </ul>

        <h2 id="seguranca">8. Segurança</h2>
        <ul>
          <li>Toda a comunicação usa conexão criptografada (HTTPS).</li>
          <li>As senhas são guardadas com o algoritmo Argon2id e nunca em texto.</li>
          <li>Cada restaurante só acessa os próprios dados, e cada pessoa da equipe só vê o que o perfil dela permite.</li>
          <li>Tentativas de login repetidas bloqueiam a conta temporariamente.</li>
          <li>Alterações importantes ficam registradas para auditoria.</li>
        </ul>
        <p>Nenhum sistema é totalmente imune a falhas. Se acontecer um incidente de segurança que possa causar risco ou dano relevante, avisaremos os afetados e a Autoridade Nacional de Proteção de Dados (ANPD), como determina a LGPD.</p>

        <h2 id="direitos">9. Seus direitos</h2>
        <p>Pela LGPD (art. 18), você pode pedir, a qualquer momento:</p>
        <ul>
          <li>a confirmação de que tratamos seus dados e o acesso a eles;</li>
          <li>a correção de dados incompletos, inexatos ou desatualizados;</li>
          <li>a anonimização, o bloqueio ou a exclusão de dados desnecessários;</li>
          <li>a portabilidade dos dados para outro fornecedor;</li>
          <li>informações sobre com quem compartilhamos seus dados;</li>
          <li>a exclusão dos dados tratados com o seu consentimento, quando for o caso.</li>
        </ul>
        <p>Para exercer esses direitos, escreva para <a [href]="'mailto:' + site.emailPrivacidade">{{ site.emailPrivacidade }}</a>. Respondemos em até [15] dias. Se você foi cliente de um restaurante, também pode fazer o pedido diretamente a ele.</p>
        <p>Você também pode apresentar reclamação à ANPD, em <a href="https://www.gov.br/anpd" rel="noopener">gov.br/anpd</a>.</p>

        <h2 id="alteracoes">10. Alterações nesta política</h2>
        <p>Podemos atualizar esta política quando o serviço mudar. A data da última atualização fica no topo da página. Se a mudança for importante, avisaremos os restaurantes por e-mail ou dentro do sistema.</p>

        <h2 id="contato">11. Contato</h2>
        <p>Encarregado pelo tratamento de dados pessoais: <strong>[NOME DO ENCARREGADO]</strong><br>
          E-mail: <a [href]="'mailto:' + site.emailPrivacidade">{{ site.emailPrivacidade }}</a><br>
          {{ site.razaoSocial }} · CNPJ {{ site.cnpj }}</p>
      </article>
    </div>
  `,
  styles: [`
    .abertura-pagina { padding-top: 64px; padding-bottom: 32px; }
    .corpo { display: flex; flex-wrap: wrap; gap: 32px 56px; align-items: flex-start; padding-bottom: 80px; }
    .sumario { flex: 1 1 240px; min-width: 0; padding: 24px; border-radius: var(--raio); background: var(--fundo-alt);
               border: 1px solid var(--borda); font-size: 15px; }
    .sumario .rotulo { margin-bottom: 12px; }
    .sumario ol { margin: 0; padding-left: 20px; display: flex; flex-direction: column; gap: 6px; }
    .sumario a { color: var(--texto-suave); text-decoration: none; }
    .sumario a:hover { color: var(--marca-forte); text-decoration: underline; }
    .texto { flex: 999 1 560px; min-width: 0; max-width: 760px; line-height: 1.65; }
    .texto h2 { margin: 48px 0 12px; font-size: 24px; line-height: 30px; font-weight: 600; scroll-margin-top: 24px; }
    .texto h2:first-child { margin-top: 0; }
    .texto h3 { margin: 24px 0 8px; font-size: 18px; line-height: 24px; font-weight: 600; }
    .texto p { margin: 0 0 12px; }
    .texto ul { margin: 0 0 12px; padding-left: 22px; }
    .texto li { margin-bottom: 6px; }
    .resumo { padding: 20px 24px; border-radius: var(--raio); background: var(--marca-suave); margin-bottom: 12px; }
    .resumo ul { margin: 0; }
  `],
})
export class PrivacidadeComponent {
  readonly site = SITE;
  readonly atualizada = ATUALIZADA_EM;
  readonly secoes = [
    { id: 'resumo', nome: 'Resumo' },
    { id: 'quem', nome: 'Quem somos' },
    { id: 'papeis', nome: 'Quem decide sobre cada dado' },
    { id: 'dados', nome: 'Quais dados tratamos' },
    { id: 'finalidades', nome: 'Para que usamos' },
    { id: 'navegador', nome: 'Cookies e navegador' },
    { id: 'compartilhamento', nome: 'Com quem compartilhamos' },
    { id: 'guarda', nome: 'Onde e por quanto tempo' },
    { id: 'seguranca', nome: 'Segurança' },
    { id: 'direitos', nome: 'Seus direitos' },
    { id: 'alteracoes', nome: 'Alterações' },
    { id: 'contato', nome: 'Contato' },
  ];
}
