import { useState, useEffect, useRef, type ReactNode } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Crosshair, Gauge, Flame, Eye, Trophy, BookOpen, TrendingUp,
  BarChart3, MessageSquare, Megaphone, Layers, Award, ChevronDown,
  ChevronRight, MapPin, Clock, Focus, Hash, Bookmark, UserCheck,
  AlarmClock, MousePointerClick, ArrowUpRight, Wand2, Handshake,
  Play, Coins, Medal, Crown, CircleDot, PenLine, Percent,
  FlaskConical, List, ScanLine, Target, Volume2, Cpu, Zap,
  Activity, Radio, Siren, BadgeCheck, Binoculars, Radar,
  type LucideIcon
} from "lucide-react";

// ─── TOKENS ──────────────────────────────────────────────────────────────────
const T = {
  bg: "var(--fm-bg)", surface: "var(--fm-surface)", card: "var(--fm-card)", card2: "var(--fm-card2)",
  border: "var(--fm-border)", border2: "var(--fm-border2)",
  ct: "var(--fm-ct)", ctDim: "var(--fm-ct-dim)", ctGlow: "var(--fm-ct-glow)",
  t: "var(--fm-t)", tDim: "var(--fm-t-dim)",
  green: "var(--fm-green)", greenDim: "var(--fm-green-dim)",
  red: "var(--fm-red)", redDim: "var(--fm-red-dim)",
  gold: "var(--fm-gold)", goldDim: "var(--fm-gold-dim)",
  txt: "var(--fm-txt)", txt2: "var(--fm-txt2)", muted: "var(--fm-muted)",
  ffD: "'Rajdhani', sans-serif", ffB: "'IBM Plex Sans', sans-serif",
};

// ─── DATA ────────────────────────────────────────────────────────────────────
const STATS = [
  { label: "faturado na internet", value: "R$300M+", color: T.ct },
  { label: "anos de mercado", value: "15+", color: T.t },
  { label: "elementos da oferta irresistível", value: "34", color: T.green },
  { label: "livros obrigatórios", value: "3", color: T.gold },
];

interface GroupData {
  id: number;
  name: string;
  sub: string;
  color: string;
  dim: string;
  items: number[];
  icon: LucideIcon;
  desc: string;
}

const GROUPS: GroupData[] = [
  { id: 1, name: "PRÉ-MATCH INTEL", sub: "Fundamentos de Mercado", color: T.ct, dim: T.ctDim, items: [1,2,3,4], icon: Radar, desc: "Antes de entrar no servidor, você precisa saber como o jogo funciona. Esses 4 fundamentos são o demo review que todo mundo deveria assistir mas quase ninguém assiste." },
  { id: 2, name: "RADAR SCAN", sub: "Diagnóstico de Mercado", color: T.t, dim: T.tDim, items: [5,6,7,8,9,10,11,12], icon: ScanLine, desc: "Você não atira sem radar. Esses 8 pontos são os inimigos no mapa que você precisa identificar antes de qualquer execução." },
  { id: 3, name: "UTILITY USAGE", sub: "Diferenciações Estratégicas", color: T.green, dim: T.greenDim, items: [13,14,15,16,17,18,19], icon: FlaskConical, desc: "Smoke perfeita no timing certo. Flash que cega sem avisar. Esses 7 elementos criam a vantagem que nenhum concorrente consegue copiar." },
  { id: 4, name: "EXECUTE THE ROUND", sub: "Construção da Oferta", color: T.red, dim: T.redDim, items: [20,21,22,23,24,25,26,27,28,29,30,31,32,33,34], icon: Target, desc: "O execute de B no Major. Você já fez o setup. Agora é seguir o plano. Cada um desses 15 passos é um player com um papel específico no round." },
];

interface ItemData {
  id: number;
  group: number;
  title: string;
  sub: string;
  weapon: string;
  weaponDesc: string;
  cs: string;
  concept: string;
  apply: string;
  example: string;
}

const ITEMS: ItemData[] = [
  { id: 1, group: 1, title: "Pessoas compram desejo, não necessidade", sub: "Ninguém compra porque precisa. Compram porque querem sentir algo.", weapon: "O AWP da Emoção", weaponDesc: "Longa distância, alto impacto, vai direto ao coração.", cs: "FalleN, você já clutchou no force buy e ganhou? Não porque PRECISAVA ganhar aquele round. Porque QUERIA. Seu cliente é igual. Nenhum dono de restaurante acorda pensando 'eu preciso de um gestor de tráfego'. Ele acorda pensando: 'quero agenda cheia'. Você não é a necessidade. Você é o AWP que atinge o desejo.", concept: "Mark Ford (Agora Financial) é cirúrgico: precisamos de pouquíssimas coisas na vida — teto, comida, 2 pares de sapato. Para TUDO o resto, compramos por desejo. A mulher com 40 pares de sapato não precisa do 41º. Ela QUER a sensação de se sentir bonita. Ícaro comprou uma bolsa Chanel de R$10.000. Toda loja de luxo tem fila num país onde 95% ganha menos de R$10k.", apply: "Pare de vender 'gestão de tráfego pago'. Venda o estado emocional que o cliente quer atingir. 'Vou gerenciar seus Meta Ads' não ativa desejo. 'Você vai olhar o WhatsApp às 9h de sábado e ver 30 pedidos esperando resposta' — isso ativa.", example: "Proposta para a Pizzaria Camelo: troque 'gerencio seus anúncios no Meta Ads' por 'você vai fechar o forno na sexta à noite sabendo que o salão de sexta até domingo já está reservado.'" },
  { id: 2, group: 1, title: "Fluxo de desejo (Desire Flow)", sub: "Uma vez ativado, o desejo se auto-alimenta. Venda o estado, não o produto.", weapon: "A Flash Perfeita", weaponDesc: "3 segundos de vantagem. Cega o racional. Ativa o emocional.", cs: "Sabe quando você flasha o B antes de entrar? O CT fica cego por 3-4 segundos. Você não removeu o revólver dele — você mudou o estado dele de 'defender' para 'sobreviver'. O ciclo do desejo funciona igual: 1) Produto parece útil 2) Mas já tenho um... 3) AH, mas esse aqui vai me fazer PARECER X 4) Quando pareço X, me sinto bem 5) Compro. Seu anúncio é a flash. Cega o julgamento racional.", concept: "O fluxo de desejo se auto-alimenta: uma vez que o cliente entende que comprar ESSE produto dá aquela sensação específica, ele vai comprar de novo. É por isso que o melhor momento para vender algo para o cliente é IMEDIATAMENTE após a primeira compra — não semanas depois. Ele acabou de confirmar que comprar de você gera a sensação boa.", apply: "Cada criativo que você sobe precisa ativar UMA sensação específica no consumidor final do seu cliente. Não 'pizza boa e barata'. Mas: 'Essa pizza vai fazer a família toda pedir bis'. A sensação de ser o herói do domingo é o fluxo de desejo que você precisa ativar.", example: "Anúncio da Pizzaria Camelo: não 'Pizza Grande R$45'. Mas: 'A pizza que faz todo mundo perguntar onde você pediu' + foto do segundo slice sendo pego pela criança sorrindo." },
  { id: 3, group: 1, title: "Sofisticação do mercado", sub: "O mercado não satura de produto. Satura de PROMESSA repetida.", weapon: "Demo Review do Adversário", weaponDesc: "Quanto mais o adversário te viu jogar, mais difícil é passar nele.", cs: "Antes de um Major, o time passa horas assistindo demos dos adversários. Por quê? Porque quanto mais o adversário viu seu estilo de jogo, mais difícil é de enganá-lo. O mercado é igual: se seu prospect já ouviu 50 vezes 'dobro seu faturamento em 30 dias', ele desenvolveu defesa. Não é o mercado que saturou — é o criativo que virou lixo.", concept: "Schwartz (Breaking Through Advertising): sofisticação do mercado não é medida pela inteligência do público, mas pelo número de vezes que ele já ouviu promessas parecidas. Quanto mais repetida, mais específica e única precisa ser sua promessa para furar. Ícaro prova: a Hotmart fatura mais hoje do que em qualquer ano. Mercados evoluem, não saturam.", apply: "Donos de restaurante já viram centenas de 'vou gerar mais clientes'. Você precisa de promessa diferente. Não 'mais clientes'. Mas: 'Vou fazer com que seus próximos 10 clientes novos voltem sem você precisar pagar um centavo para trazê-los de volta.'", example: "Em vez de 'Vou gerar leads para sua pizzaria', use: 'Vou construir o grupo de clientes recorrentes que vão encher o salão toda sexta sem você precisar pagar anúncio para eles na segunda visita.'" },
  { id: 4, group: 1, title: "Mercado validado > mercado virgem", sub: "Jogar no Dust2 é mais fácil que inventar um mapa novo.", weapon: "Map Pool Conhecida", weaponDesc: "Os callouts são conhecidos. A economia é previsível. Você tem vantagem.", cs: "Por que todos os times jogam Mirage, Dust2, Inferno? Porque os callouts são estabelecidos, os timings são conhecidos, as economias são previsíveis. Você NÃO QUER criar um mapa do zero no Major. Você quer entrar num mapa que todo mundo conhece e jogar MELHOR que os outros. No digital: restaurante, saúde, estética, finanças — mercados com demanda provada.", concept: "Ícaro: há 10 anos era mais difícil vender porque não existia remarketing, CTR era diferente, não havia padrões. Hoje você sabe quais anúncios funcionam, quais páginas convertem, quais nichos têm mais volume. Mercado validado tem tudo mapeado. Você só precisa executar melhor.", apply: "Especialize-se em 2-3 segmentos. Restaurante + saúde local + serviço residencial é infinitamente mais poderoso do que 'atendo qualquer nicho'. Você terá linguagem certa, cases reais e benchmarks do mercado.", example: "Sua proposta para o Olegário deve ter: 'Tenho especialidade em [segmento]. Já vi o que funciona e o que queima verba nesse mercado específico. Aqui estão os dados que coletei.'" },
  { id: 5, group: 2, title: "Mercado onde o desejo já existe", sub: "Você não cria desejo. Você encontra onde ele já existe.", weapon: "Scout de Território", weaponDesc: "Reconhecimento antes do ataque. Nunca vá para onde não há vantagem.", cs: "FalleN nunca pede execute sem info. 'Qual site tá mais fraco? Onde tem menos CT?' Você nunca ataca onde não tem vantagem. No mercado, o desejo de ter mais clientes, faturar mais, ter agenda cheia — esse desejo JÁ EXISTE. Você não cria esse desejo. Você aparece na frente de quem já tem ele com a solução certa.", concept: "Schwartz: a função do copywriter não é CRIAR desejo. É encontrar o desejo que já existe e canalizá-lo para o produto. Mounjaro não criou o desejo de perder peso — ele apenas apareceu como o novo mecanismo para um desejo que existia há décadas. Bitcoin não criou o desejo de ficar rico. Seu trabalho como gestor é aparecer no caminho do desejo que já existe.", apply: "Como gestor de tráfego, você conecta o desejo que o consumidor final JÁ TEM (quero pizza gostosa perto de mim, agora) com a solução do seu cliente. Não crie demanda — capture o que já existe. Use palavras-chave de intenção, segmentação comportamental, geolocalização.", example: "Pizzaria Camelo: nas buscas do Google, pessoas já digitam 'pizza delivery [cidade]' todo dia. Você não precisa criar essa demanda. Precisa garantir que a Pizzaria Camelo apareça primeiro quando alguém com fome e celular na mão pesquisa isso num raio de 5km." },
  { id: 6, group: 2, title: "Estágio correto de sofisticação", sub: "Fale a linguagem do round em que você está jogando.", weapon: "Comunicação de Radio", weaponDesc: "Round 1 tem linguagem diferente do round 15. Calibre o sinal.", cs: "No primeiro pistol round você não pede uma jogada complexa de fake B + rotate + double AWP setup. Você fala: 'eco, pistol B, simples.' Conforme o jogo evolui, você aumenta a complexidade. Dono de restaurante não está no mesmo round que CMO de multinacional. Fale com cada um na linguagem do round DELE.", concept: "Ícaro usa o exemplo das casas de bet: 'Quem é o imbecil que cria propaganda assim?' Exatamente as pessoas que o seu cliente quer alcançar. Mensagem complexa para público simples = zero conversão. Mensagem simples para público sofisticado = falta de credibilidade. Calibre.", apply: "Dono de restaurante local (nível 2-3 de consciência): sabe que tem o problema de poucos clientes, mas não sabe que tráfego pago é a solução. Sua comunicação confirma o problema dele e apresenta sua solução de forma simples, concreta, com resultado em período curto.", example: "Não diga: 'Vou otimizar seu funil de aquisição com campanhas de conversão usando lookalike audiences e retargeting dinâmico.' Diga: 'Vou mostrar sua pizza para exatamente as pessoas certas, no horário certo, e fazer elas ligarem pra você.'" },
  { id: 7, group: 2, title: "Público-alvo claramente definido", sub: "Mira em tudo = não acerta nada.", weapon: "Crosshair Placement", weaponDesc: "FalleN nunca mira onde ACHA que pode ter inimigo. Mira onde ELE VAI APARECER.", cs: "O FalleN é o maior AWPer do Brasil porque ele nunca mira aleatório. Ele mira EXATAMENTE onde o inimigo vai aparecer baseado no mapa, na economia do adversário e nos padrões do time. Comprar tráfego 'para todo mundo' é atirar de olho fechado. Você gasta a verba, faz barulho e não mata ninguém.", concept: "Ícaro perdeu uma fortuna comprando público aberto demais. Numa formação de copywriting, metade do público era senhoras de 70 anos professoras aposentadas que nunca iam comprar. Você paga por cada impressão. Impressão errada = dinheiro no lixo. Quanto mais específico o público, mais barato e eficiente o tráfego.", apply: "Antes de subir qualquer campanha, defina: idade, gênero, localização, renda estimada, comportamento online, o QUE pesquisam quando estão com o problema do seu cliente. Crie personas com nome, rotina, dores específicas.", example: "Pizzaria Camelo: não 'homens e mulheres 18-65 de [cidade]'. Mas: 'Famílias com filhos de 25-45 anos num raio de 4km, que interagem com conteúdo de comida e delivery, principalmente entre 18h e 21h de quinta a domingo.'" },
  { id: 8, group: 2, title: "Dor central específica e consciente", sub: "Uma única dor. Uma única promessa. Não polua o sinal.", weapon: "Info de Radar", weaponDesc: "Radar com 50 pontos é inútil. 1 ponto, preciso, acionável.", cs: "No radar do CS, cada ponto vermelho é um inimigo específico. Se o radar mostrasse todas as posições POSSÍVEIS que um inimigo poderia estar, seria uma nuvem vermelha inútil. A informação só tem valor quando é específica. 'CT tá no A main' é acionável. 'CT pode estar em algum lugar do mapa' é lixo. Sua oferta funciona igual.", concept: "Ícaro: UMA DOR. UMA PROMESSA. Exemplo real: mercado de finanças pessoais tem 10 dores (nome sujo, visto negado, perrengue no supermercado...). Mas ele escolhe APENAS uma: '53% dos casamentos terminam por dívida'. As outras dores existem, mas são subsidiárias. Uma dor canaliza criativos, copy, time, página de vendas — TUDO.", apply: "Quando fizer sua proposta, não liste 20 benefícios do seu serviço. Encontre A DOR específica do cliente e bata nela. 'Você está perdendo X clientes toda semana para concorrentes que investem em tráfego enquanto você não aparece quando as pessoas buscam [produto/serviço].'", example: "Para a Pizzaria Camelo, a dor não é 'pouca visibilidade'. A dor específica e consciente é: 'Você faz uma pizza melhor que a [Pizzaria Concorrente], mas eles têm fila e você está fechando cedo.' Mensurável, consciente, dolorosa." },
  { id: 9, group: 2, title: "Desejo dominante associado à dor", sub: "Toda dor tem um desejo oposto. Bata na dor, mostre a saída.", weapon: "Entry Frag", weaponDesc: "O entry remove o bloqueio. Abre o site para o bomb plant.", cs: "O entry frag abre o B site porque remove o CT que bloqueia. A dor é o CT bloqueando. O desejo dominante é a bomba plantada. Em cada round você remove a dor (o CT) e revela o desejo (site livre, bomba plantada, round ganho). Nos seus criativos funciona igual: mostra a dor, aponta a saída.", concept: "Uma vez identificada a dor principal (casamento acabando por dívida), o desejo dominante é o oposto: casamento estável, paz financeira, confiança mútua. Todas as outras dores são subsidiárias. Bata sempre na dor principal + aponte sempre o mesmo desejo dominante. Consistência cria momentum.", apply: "Cada criativo do seu cliente deve ter os dois elementos: a dor reconhecível (cliente identificado) + o desejo dominante (o estado que ele quer). Não apenas 'restaurante vazio'. Não apenas 'restaurante cheio'. A TRANSIÇÃO entre os dois é o que converte.", example: "Criativo para Pizzaria Camelo: Frame 1: salão vazio numa sexta (dor) + texto 'Sexta à noite e o salão pela metade?' → Frame 2: salão cheio, família feliz (desejo) + 'Seus vizinhos vão perguntar onde estão pedindo.' → CTA." },
  { id: 10, group: 2, title: "Promessa principal única, clara e mensurável", sub: "Uma call. Um objetivo. Uma métrica. Sem ambiguidade.", weapon: "Call de Entrada", weaponDesc: "FalleN nunca faz call confuso. Execute A. Ponto.", cs: "FalleN não faz call assim: 'vai pro B, ou talvez A, ou faz de conta que vai mas vai pra mid.' Ele fala: 'A EXECUTE. Smoke CT. Flash main. Dois entram janela.' Clareza total. Sua promessa precisa ter essa mesma clareza. Sem ela, seu time (anúncio, página, criativo) não sabe pra onde ir.", concept: "Uma boa promessa tem 3 elementos: específica (o quê), mensurável (quanto), temporal (em quanto tempo). 'Você vai ter mais clientes' é promessa ruim — não é mensurável. 'Você vai receber 40 pedidos novos nos primeiros 30 dias' é uma promessa real que você pode defender, medir e provar.", apply: "Na sua proposta, sua promessa precisa ser mensurável. 'Gerenciar suas redes' não é promessa. 'Trazer X leads qualificados por mês com CPL máximo de Y, mantendo ROAS acima de Z' é uma promessa que você pode defender e o cliente pode avaliar.", example: "Proposta para Olegário: 'Nos primeiros 90 dias, a meta é gerar [X] novas visitas ou pedidos, com investimento de mídia de R$[Y]/mês. Métricas de acompanhamento semanais. Se não batermos 70% da meta no mês 2, revisamos estratégia sem custo adicional.'" },
  { id: 11, group: 2, title: "Antes e depois (transformação)", sub: "O depoimento é o melhor antes/depois — e passa pelo algoritmo.", weapon: "Highlight de Round", weaponDesc: "De 3-14 para 16-14. O contraste conta a história melhor que qualquer stat.", cs: "Você já viu highlights de FalleN no HLTV? A diferença do time perdendo 3-14 e a virada épica para 16-14 conta a história melhor que qualquer comentarista. Seu produto precisa do mesmo contraste. Mas — diferente dos highlights — você usa DEPOIMENTOS como veículo para o antes/depois, porque o algoritmo do Meta pune comparações diretas.", concept: "Ícaro: o antes/depois perfeito não vem de foto comparativa (que reguladores punem). Vem do DEPOIMENTO que conta a transformação. 'Antes do curso eu mal conseguia 5 clientes por mês. Hoje tenho 40 e uma equipe.' Isso É um antes/depois completo que passa pelo algoritmo e converte mais que qualquer comparação direta.", apply: "Colete depoimentos sistematicamente dos CLIENTES dos seus clientes — ou resultados dos seus clientes. 'Antes de contratar o Gabriel, investia R$800/mês em impulsionamento sem resultado. Depois de 60 dias, chegamos a 40% mais pedidos com o mesmo valor.' Esse é ouro para qualquer proposta.", example: "Seção da proposta: antes/depois narrado com número real. 'Cliente X (restaurante similar): antes = X pedidos/semana, investimento Y. Após 60 dias de gestão = Z pedidos/semana, mesmo investimento.' Com foto/screenshot do cliente se possível." },
  { id: 12, group: 2, title: "Linguagem alinhada ao nível de consciência", sub: "Não adianta pedir rotação quando o time ainda não sabe o que é rotação.", weapon: "Communication Pause", weaponDesc: "Pausa o radio. Ouve o nível do time. Adapta o callout.", cs: "Você não usa terminologia de IGL profissional com um player que acabou de sair do Silver 4. 'Fake B para forçar CT rotate e então A execute com double AWP mid support' — esse player vai morrer no A main sem fazer nada. Com seu cliente, a mesma regra. Dono de restaurante não sabe o que é ROAS. Fale na língua DELE.", concept: "Os níveis de consciência vão de 'não sabe que tem o problema' até 'sabe tudo e está comparando soluções'. Dono de restaurante geralmente está no nível 2-3: sabe que tem poucos clientes, mas não sabe ainda que tráfego pago é a solução ideal. Sua comunicação confirma o problema e apresenta a solução de forma simples.", apply: "Calibre a linguagem da proposta para o nível do prospect. Para donos de negócio local: resultados concretos, linguagem do dia-a-dia do negócio deles, prazo curto, sem jargão técnico. Para CMOs de médias empresas: pode usar métricas de marketing, benchmarks de mercado.", example: "Proposta Pizzaria Camelo: zero jargão. Não escreva 'otimização de campanhas de conversão com retargeting dinâmico'. Escreva: 'Mostrarei sua pizza para as pessoas que já demonstraram interesse em delivery na sua região, até elas pedirem.'" },
  { id: 13, group: 3, title: "Mecanismo único", sub: "Seu mecanismo cria crença de que esse produto vai funcionar quando os outros falharam.", weapon: "Smoke Lineup Secreto", weaponDesc: "Sabe da smoke que só o FalleN sabe jogar? Esse é o mecanismo.", cs: "Você sabe aquelas smokes perfeitas do FalleN que bloqueiam exatamente o CT sem que ninguém mais saiba como jogar? O adversário sabe que vem fumaça, mas não sabe como exatamente vai ser usada. O mecanismo único funciona igual: o cliente sabe que existe algo diferente no seu método, mas não entende completamente como. Esse mistério inteligente CRIA o desejo de saber mais.", concept: "Schwartz explica: o mecanismo único é a razão pela qual ESSE produto vai funcionar quando todos os outros falharam. A Cláudia fez dieta cetogênica, paleo, da lua — nenhuma funcionou. Mas vai funcionar comendo MAÇÃ porque o 'motivo pelo qual ela não emagrecia' é diferente de tudo que ela tentou. Quanto MENOS você explica, mais você converte.", apply: "Seu mecanismo único como gestor de tráfego não é 'rodar anúncios no Meta'. É algo como: 'O Sistema dos Micro-Momentos: identifico os 3 janelas de 45 minutos por dia em que o consumidor do SEU tipo de negócio está no estado exato de decisão de compra. A maioria dos gestores roda anúncio 24h. Eu concentro o orçamento nesses momentos.'", example: "Proposta para Olegário: 'Uso um sistema de segmentação comportamental por micro-momentos que identifica quando o cliente ideal está com o problema do [negócio do Olegário] ativo e o celular na mão. Não é sobre gastar mais. É sobre gastar no momento certo.' — e não explique mais do que isso antes da venda." },
  { id: 14, group: 3, title: "Formato de descoberta", sub: "As melhores ofertas não parecem ofertas. Parecem revelações.", weapon: "Information Play", weaponDesc: "Você move o time de um jeito que o adversário não sabe se é fake ou real.", cs: "FalleN é mestre em information plays: o time se move de forma que o adversário não sabe se é fake ou real — até ser tarde demais. A oferta em formato de descoberta funciona igual: você não aparece vendendo. Você aparece revelando algo que o cliente não sabia. A curiosidade abre a porta que o pitch de vendas tranca.", concept: "Bill Bonner (Agora Financial): as melhores ofertas do mundo não vêm no formato de pit de vendas, mas no formato de descoberta. Ícaro não subiu no palco do Novo Mercado Ao Vivo dizendo 'tenho uma promoção'. Ele contou a história de onde deveria estar o dinheiro dos seus filhos. A descoberta criou o desejo de ouvir mais.", apply: "Sua proposta comercial não deve começar com 'meus serviços incluem...'. Deve começar com UMA descoberta: dados reais que o prospect não sabia sobre o mercado DELE. Isso para atenção ANTES de qualquer pitch. Transforma vendedor em consultor.", example: "Abertura da proposta para Olegário: 'Pesquisei o mercado antes de escrever isso. Entre quinta e domingo, o volume de buscas por [produto/serviço] na sua cidade aumenta 340%. Os anúncios dos seus concorrentes estão completamente ignorando esse pico. Aqui o que encontrei — e o que significa para você:'" },
  { id: 15, group: 3, title: "Storytelling que legitima a promessa", sub: "Seus números só convencem depois que a história cria credibilidade.", weapon: "Highlight Reel do HLTV", weaponDesc: "A stat 1.24 de rating convence menos do que ver o ace ao vivo.", cs: "Por que o HLTV tem highlight reel de cada jogada importante? Porque a estatística 'FalleN tem 1.24 de rating' é menos convincente do que você VER ele fazer um ace no pistol round da Grand Final. A história PROVA o número. Na sua proposta, os resultados só convencem depois que a história sobre como você chegou lá é contada.", concept: "Ícaro começou a palestra mostrando caso após caso: TV Invest 2010 (R$3.500 virou R$60k), Liberta Global 2013 (R$1.6M), Brasil Paralelo 2016 (R$6M+)... Por quê? Para criar percepção de autoridade ANTES de qualquer oferta. O storytelling é a moldura que faz a foto parecer arte.", apply: "Toda proposta sua deve ter uma seção de credibilidade narrativa. Não 'tenho X anos de experiência'. Mas: 'Em [mês/ano], peguei a conta de um [tipo de negócio] que investia R$2k/mês sem conversão. Identifiquei que o problema era na segmentação. Em 90 dias, mesmo orçamento, 3x mais clientes.'", example: "Na proposta para Olegário, inclua um mini-case narrado em 3 parágrafos: o problema do cliente anterior → o que você identificou → o resultado. Uma história de transformação é mais poderosa que qualquer lista de habilidades técnicas." },
  { id: 16, group: 3, title: "Expert: persona transformada + autoridade", sub: "O melhor IGL é aquele que já jogou em todas as posições.", weapon: "IGL Experience", weaponDesc: "FalleN não virou IGL lendo livro. Viveu cada posição. Por isso o time obedece.", cs: "FalleN não virou o melhor IGL do Brasil estudando teoria. Ele jogou em todas as posições, viveu todas as rotações, errou todos os erros possíveis. Quando ele diz 'rotaciona agora', o time obedece porque sabem que ele JÁ ESTEVE lá. Seu cliente precisa sentir isso sobre você: você não apenas estudou o mercado — você viveu o problema que ele tem.", concept: "Ícaro: o expert ideal tem dois elementos obrigatórios: (1) produz muito conteúdo — prova de conhecimento público e (2) é a persona transformada — viveu o caminho que está vendendo. O dentista com dentes podres cria desconfiança. Se você foi cliente de um gestor ruim, se tentou rodar anúncio sozinho e perdeu verba — isso é sua persona transformada.", apply: "Se você já tentou anunciar algo e aprendeu na prática o que não funciona, ou se ajudou o próprio negócio com tráfego — use essa história. Você entende o problema por dentro, não apenas da perspectiva de quem vende solução.", example: "Abertura de proposta: 'Antes de ser gestor, tentei rodar anúncios para [experiência pessoal]. Perdi R$X em 45 dias sem resultado. Foi exatamente aí que entendi por que a maioria dos anúncios de pequenos negócios não funciona — e o que fazer diferente.'" },
  { id: 17, group: 3, title: "Prova de que o mecanismo funciona", sub: "Depoimento, depoimento, depoimento. Todo outro tipo perde.", weapon: "Demo File", weaponDesc: "Prova irrefutável. Você vê no replay o que aconteceu de verdade.", cs: "Depois de um Major, os times passam horas vendo demo para entender o que funcionou e por quê. A demo é prova irrefutável — você vê o que aconteceu de verdade, sem filtro. No marketing, o depoimento é a demo. Não é você dizendo que funciona. É o cliente mostrando que funcionou. Na primeira dobra da página: depoimento antes de qualquer headline.", concept: "Ícaro: em uma página longa de vendas, a estrutura é depoimento, depoimento, matéria de jornal, depoimento, depoimento. 'Todo outro tipo de prova perde para depoimento.' O depoimento na primeira dobra converte mais do que qualquer copy técnica porque reduz o risco percebido instantaneamente.", apply: "Colete sistematicamente depoimentos dos clientes dos seus clientes. Screenshots do WhatsApp com resultados, gravações curtas de vídeo, prints de dashboard. Coloque o depoimento mais impactante no INÍCIO da proposta, antes do seu pitch. Deixe o cliente anterior vender por você.", example: "Bloco de depoimento na proposta (antes de tudo): [Foto do dono] 'Antes do [Gabriel], investia R$800/mês em boost de post e não via resultado mensurável. Depois de 60 dias com gestão profissional, 40% mais pedidos e o mesmo orçamento.' — [Nome Real], [Restaurante Real, cidade]" },
  { id: 18, group: 3, title: "Prova que funciona para pessoas como eu", sub: "O cliente precisa se ver no resultado. Não nos seus resultados — nos similares a ele.", weapon: "Team Match-Up", weaponDesc: "Você não convence o FalleN com estratégia que funcionou no Silver.", cs: "Você não vai convencer o FalleN de uma estratégia mostrando que ela funcionou numa partida de Silver. Você mostra que funcionou no Major, contra times parecidos. Dono de pizzaria local não se convence com case de e-commerce global. Mostre resultado de outro restaurante local, similar ao dele, em situação similar.", concept: "Ícaro: 'funciona para você que é novinha e solteira E para mim que sou mãe de criança pequena' — essa é a objeção que você precisa remover. As pessoas se identificam com histórias de pessoas COMO ELAS, não como você. O case precisa ter personagem identificável, situação similar, resultado real.", apply: "Segmente seus cases por tipo de cliente. Cases de restaurante para clientes de restaurante. Cases de negócio local para clientes de negócio local. Cases de cidade pequena para prospects de cidade pequena. A identificação multiplica o poder da prova.", example: "Se você tem um case de pizzaria: 'Aqui está o que aconteceu quando apliquei esse método para a [Pizzaria X], que também era um restaurante local sem presença digital, na cidade de [cidade similar ao prospect], com investimento inicial de R$[valor similar]:'" },
  { id: 19, group: 3, title: "Sem ambiguidade sobre como/por que funciona", sub: "Nada contraditório. Uma mensagem. Um caminho.", weapon: "Clear Communication", weaponDesc: "Ambiguidade no round mata. Ambiguidade na oferta mata a venda.", cs: "No CS, ambiguidade mata literalmente. 'Vai pro B mas se tiver info vai pro A' — metade do time vai pro B, metade pro A, adversário planta no A main. Contradição na oferta mata a venda. Se você fala que o serviço é simples MAS tem 20 entregas técnicas, você destruiu a confiança antes do início.", concept: "Ícaro: não venda que será fácil se não for fácil. Não venda que não precisa de tempo se precisar de tempo. O chargeback que você vai receber em 30 dias custa mais caro que a venda. E o fantasma da reputação assombra lançamentos futuros. Clareza honesta protege você tanto quanto o cliente.", apply: "Na proposta, seja explícito sobre o que você faz E o que o cliente precisa fazer. Não prometa 'resultado em 7 dias' se o mercado leva 30-60 dias para aquecer. Promessa honesta hoje = case de sucesso em 90 dias = renovação + indicação.", example: "Inclua na proposta uma seção: 'O que EU faço vs. o que EU NÃO faço' e 'O que VOCÊ precisa fornecer para isso funcionar (acesso, imagens, aprovação de criativo em até 24h)'. Isso elimina mal-entendidos e filtra clientes que não estão prontos para o processo." },
  { id: 20, group: 4, title: "Oferta estruturada (12 camadas)", sub: "Sua oferta tem camadas. O cliente precisa entender cada uma delas.", weapon: "Strategy Board", weaponDesc: "FalleN não fala só 'vai pro B'. Tem smoke, flash, timing, ângulo.", cs: "FalleN não faz call assim: 'vai pro B'. Ele tem um strategy board completo: qual smoke primeiro, quem molotova o corner, quem entra pela janela, qual tempo de execução, quem fica de apoio. Cada detalhe tem seu lugar. Sua oferta é igual — o que o cliente recebe, onde acessa, por quanto tempo, tem suporte, quais bônus, quando expiram.", concept: "Ícaro recomenda usar IA para isso: descreva seu serviço e peça ao ChatGPT para separar nas 12 camadas de oferta: produto principal, formato de entrega, prazo de acesso, tipo de suporte, bônus (e seus prazos), garantia, o que precisa para começar. A estrutura deve aparecer na proposta E em qualquer vídeo ou apresentação.", apply: "Sua proposta comercial é uma oferta. Ela precisa das 12 camadas: o que você faz (produto), como reporta (processo), com qual frequência você se comunica (acesso), o que está incluso (escopo), o que não está (limites), prazo mínimo, forma de pagamento, o que acontece se não bater meta, o que o cliente precisa fornecer.", example: "Tabela clara na proposta: VOCÊ RECEBE: gestão de campanhas, criativos em texto (8/mês), relatório semanal automatizado, reunião quinzenal de 45min, otimizações contínuas. VOCÊ NÃO RECEBE: produção de vídeo, design de identidade, gestão de perfil orgânico." },
  { id: 21, group: 4, title: "Clareza total na entrega, formato, prazo e acesso", sub: "Todo player precisa saber o que vai acontecer antes de entrar no servidor.", weapon: "Briefing Pré-Jogo", weaponDesc: "Antes do Major, todo detalhe operacional está definido.", cs: "Antes de qualquer partida de Major, existe um briefing: horário de warmup, protocolo técnico, quais periféricos são permitidos. Ninguém entra no servidor sem saber o que vai acontecer. Seu cliente precisa da mesma clareza. A ansiedade pós-compra (o que agora?) é o maior causador de cancelamento e chargeback.", concept: "Ícaro: 'após a compra, vai cair um e-mail. É só colocar login e senha. Você vai entrar, é aqui que você vai ver nossa plataforma. Olha só, tá todo o conteúdo postado.' Esse nível de detalhe sobre o próximo passo ELIMINA ansiedade. Clareza na entrega = cliente feliz = renovação.", apply: "No contrato/proposta: descreva o DIA 1 completo. O que acontece após a assinatura. Quem entra em contato, quando, com o quê. Elimine zero de ansiedade do processo de onboarding. Isso é parte da oferta — não é protocolo interno.", example: "Cronograma na proposta: DIA 1-2: você recebe formulário de briefing (10 min para preencher). DIA 3: call de onboarding de 45min. DIA 5-7: primeiras campanhas no ar. DIA 14: primeiro relatório com dados iniciais. DIA 30: reunião de estratégia com ajustes." },
  { id: 22, group: 4, title: "Empilhamento de valor (Value Stacking)", sub: "Mostre tudo que vale. Depois mostre o preço. O contraste converte.", weapon: "Economy Round Setup", weaponDesc: "Eu sacrifico agora para ter full buy nas próximas 3 rodadas.", cs: "No economy round, o FalleN mostra: 'Se fizermos full buy agora, sobrevivemos 1 round. Se fizermos eco perfeito, salvamos as rifles e temos full buy por 3 rounds seguidos.' Ele empilha o valor do sacrifice vs. o ganho futuro. Seu value stacking funciona igual: mostre quanto cada entrega vale, some tudo, depois apresente o preço real.", concept: "DeSantis (livro do Russell Brunson) empilha: 'esse produto, mais esse, mais esse, mais esse... custaria R$5.000. Mas quanto valeria pra você ter o corpo que sempre sonhou? R$10.000? R$15.000? [click] Você paga R$197/mês.' Ridículo? Funciona há 10 anos porque existe um contraste que o cérebro processa como 'negócio'.", apply: "Na proposta: valorize cada entrega individualmente antes de apresentar o total. 'Gestão de campanhas: valor de mercado R$X. Criação de criativos: R$Y. Relatório analítico: R$Z. Reuniões estratégicas: R$W. Total de mercado: R$X+Y+Z+W. Você investe: R$[preço real].'", example: "Proposta para Olegário: lista cada deliverable com valor estimado de mercado, soma tudo como 'Valor total de mercado', depois apresenta seu preço. 'Se contratasse cada profissional separado...' A diferença entre os dois números é o que o cliente percebe como economia." },
  { id: 23, group: 4, title: "Bônus estratégicos (removem objeções do próximo produto)", sub: "Bônus não é entrega extra. É preparação para o próximo round.", weapon: "Setup para o Próximo Round", weaponDesc: "FalleN não salva rifle pra usar agora. Salva pra garantir o buy seguinte.", cs: "O FalleN não salva a rifle só para usar no mesmo round. Ele salva para garantir o buy do round seguinte. Bônus estratégico funciona igual: você o design para remover a objeção do PRÓXIMO produto que vai oferecer, não para inflar o valor do produto atual. Cada bônus é um setup para o próximo round.", concept: "Ícaro: se você vendeu um cursinho de finanças por R$29, o bônus estratégico é uma planilha de diagnóstico financeiro. Por quê? Para que, na entrega, você identifique quem tem mais de R$100k investido e os convide para o próximo produto (consultoria de R$5.000). O bônus filtra e prepara o upsell.", apply: "No seu serviço de gestão de tráfego, o bônus pode ser: 'Diagnóstico gratuito de presença digital' (que vai mostrar ao cliente outras oportunidades = abre porta para serviços adicionais) ou 'Mapa de concorrência' (que mostra o gap que você vai fechar — e outros que você pode fechar depois).", example: "Proposta: 'Como bônus na primeira semana: Relatório de Inteligência Competitiva — vou mostrar o que os 3 principais concorrentes estão fazendo em anúncios, quanto estimamos que investem, e qual é a brecha que nenhum deles está explorando.' [Este relatório naturalmente revela outras oportunidades de serviço.]" },
  { id: 24, group: 4, title: "Preço coerente com estágio de mercado", sub: "A economy de cada round é diferente. Leia antes de fazer o buy.", weapon: "Economy Awareness", weaponDesc: "Full buy no pistol round = suicídio. Conheça o estágio do round.", cs: "No CS, cada round tem uma economy diferente. No pistol round, full buy é suicídio. Em eco completo, comprar um rifle é desperdício. A economy do round define o que faz sentido. Seu preço precisa ser coerente com o que o cliente percebe como valor HOJE — não o que você acha que deveria valer.", concept: "Ícaro: Conrado Adolfo vendia uma lista de 600 títulos de email por centenas de reais em 2013. Hoje ninguém pagaria. O mercado evoluiu. Preço precisa ser calibrado para o que o cliente percebe como valor no estágio atual do mercado dele — sua concorrência, a maturidade digital do segmento, o ticket médio do negócio do cliente.", apply: "Para pequenos negócios locais (restaurante, salão, clínica), o preço precisa ser compatível com a realidade deles. R$5.000/mês pode ser impossível. R$1.200-1.800/mês com demonstração de R$3.000+ de retorno pode ser o ponto certo.", example: "Estruture 3 opções: BÁSICO (gestão de 1 plataforma, R$X), PROFISSIONAL (multi-plataforma + estratégia, R$Y), PARCERIA ESTRATÉGICA (tudo + consultoria mensal, R$Z). Assim você captura clientes em diferentes estágios de maturidade e orçamento." },
  { id: 25, group: 4, title: "Âncora de preço explícita", sub: "O primeiro número que o cliente vê é a âncora. Escolha com intenção.", weapon: "First Impression", weaponDesc: "O posicionamento do round 1 define como te leem pelo resto da partida.", cs: "Na primeira rodada, o posicionamento que você faz define como o adversário vai te ler pelo resto da partida. Vai rush full agressivo no pistol? Te marcam como agressivo. Vai jogo passivo? Te marcam como passive. A âncora de preço funciona igual: o primeiro número que o cliente vê fica na cabeça dele e serve de referência para tudo que vem depois.", concept: "Sempre apresente o valor de mercado comparativo ou o custo de oportunidade ANTES do seu preço. 'Se você contratasse social media + gestor de tráfego + analista de dados separadamente, custaria R$7.500/mês. Meu serviço faz tudo isso por R$2.000.' A âncora é R$7.500. O preço real parece um presente.", apply: "Compare com: (1) o custo de contratar profissionais separados, (2) agências digitais do mercado, (3) o custo de NÃO ter tráfego — quantos clientes perdidos por semana × ticket médio × 12 meses.", example: "Na proposta: 'Uma agência digital cobra em média R$4.500/mês pelo mesmo escopo. Como especialista independente, sem overhead de agência, entrego o mesmo resultado por R$1.800/mês — e com atenção 100% dedicada ao seu negócio, não dividida entre 30 clientes.'" },
  { id: 26, group: 4, title: "Justificativa lógica do preço", sub: "O preço precisa fazer sentido na cabeça. Mostre a conta do ROI.", weapon: "Economy Math", weaponDesc: "FalleN explica a economy pra todo o time. A lógica precisa estar clara.", cs: "FalleN explica pro time: 'Se a gente gasta X agora, em Y rounds quebramos a economy deles porque eles vão ter que full buy duas vezes com pistol e perder.' A lógica precisa ser clara para o time seguir o plano. Seu cliente precisa fazer a mesma conta mental sobre o preço do seu serviço antes de assinar.", concept: "Justificativa lógica é obrigatória para qualquer produto que não é luxo de branding consagrado (só a Chanel pode não justificar). Para serviços de performance como tráfego pago, mostre matematicamente por que o preço faz sentido com base em ROI esperado.", apply: "Mostre o cálculo de ROI esperado. 'Investimento: R$1.800 gestão + R$1.000 mídia = R$2.800/mês. Ticket médio do cliente: R$[X]. Meta: [Y] novos clientes/mês = R$[X×Y] de receita nova. ROI esperado: R$[resultado - R$2.800].' Transforme proposta em business case.", example: "Proposta Pizzaria Camelo: 'Investimento total: R$1.500 gestão + R$800 verba = R$2.300/mês. Se trazemos 25 pedidos novos/mês com ticket médio R$65 = R$1.625 de receita nova só nos novos pedidos. Mas clientes que voltam (30% de retenção) geram mais R$X no mês 2 sem custo adicional de aquisição.'" },
  { id: 27, group: 4, title: "Justificativa emocional do preço", sub: "A lógica convence. A emoção decide. Sempre.", weapon: "Clutch Motivation", weaponDesc: "No clutch, não é a estratégia que sustenta. É a vontade de ganhar.", cs: "FalleN não ganhou Grand Finals apenas com estratégia. Nos momentos de 1v3 clutch com 3 segundos de bomb, é a vontade — a emoção — que sustenta a mão firme no AWP. A justificativa lógica convence. Mas é a emoção que faz o cliente apertar o botão. Golding: 'No final, não convencemos o cliente. Fazemos ele pensar que a decisão foi dele.'", concept: "Após a justificativa lógica (ROI, números), vem a emocional: o estado que o cliente vai viver após trabalhar com você. Não o produto. Não as métricas. O ESTADO. 'Quanto vale para você finalmente não se preocupar com clientes novos toda segunda-feira?'", apply: "Final da proposta: um parágrafo emocional descrevendo o estado que o cliente vai estar em 90 dias. Não o que você vai fazer. Não os números. O sentimento de ter resolvido o problema. Esse parágrafo é o que fecha.", example: "Final da proposta para Olegário: 'Imagine fechar a semana na sexta à tarde, olhar para os números e ver que a agenda da semana que vem já está 70% cheia — sem que você tenha feito uma ligação ativa ou gasto 1 hora em postagem nas redes. Isso é o que acontece quando o tráfego está trabalhando enquanto você dorme.'" },
  { id: 28, group: 4, title: "Garantia e remoção de risco percebido", sub: "A garantia é o defuse kit. Remove o risco e acelera a decisão.", weapon: "Defuse Kit", weaponDesc: "O CT com defuse kit pode se arriscar mais. A garantia funciona igual.", cs: "No CS, o CT que tem defuse kit tem vantagem psicológica enorme. Pode se arriscar mais porque sabe que tem backup se a bomba plantar. A garantia funciona igual para o cliente: com ela, ele pode 'comprar' com mais confiança porque sabe que o risco está coberto. Você não pede um ato de fé cego.", concept: "Ícaro: garantia de 7 dias é obrigatória por lei para produtos digitais. Mas remoção de risco vai além: é você assumir publicamente mais risco do que o mínimo legal. 'Se não ver resultado mensurável em 30 dias, trabalhamos mais 30 dias sem custo adicional.' Isso transforma a decisão de 'risco' para 'no pior cenário, eu não perco nada'.", apply: "Para serviço de tráfego, garantia total é difícil (você não controla o produto/atendimento do cliente). Mas você pode garantir: dedicação (X horas/semana), entregáveis (Y relatórios, Z reuniões), processo (otimizações semanais). 'Se não cumprir meus entregáveis, você não paga o mês.'", example: "Na proposta: 'Minha garantia: nos primeiros 30 dias, se você sentir que não está recebendo atenção e dedicação suficientes, você pode cancelar sem multa, sem burocracia, sem carta de advogado. Meu negócio funciona na base de resultado e renovação — não de contrato de cárcere.'" },
  { id: 29, group: 4, title: "Escassez real ou estrutural", sub: "O round sempre tem um timer. Sua oferta também precisa ter.", weapon: "Round Timer", weaponDesc: "Sem timer, todo time fica esperando na base. O timer FORÇA a ação.", cs: "No CS, o timer do round É a escassez. Sem ele, todo time ficaria esperando para o adversário aparecer. É o timer que força decisão e ação. Seus clientes são iguais: sem uma razão para decidir AGORA, a decisão vai para 'vou pensar'. E 'vou pensar' quase sempre vira 'não'.", concept: "Ícaro: você SEMPRE vende com escassez porque está competindo com um feed inteiro de pessoas mais bonitas, simpáticas e ricas vendendo soluções parecidas. Sem urgência, você perde para o próximo vídeo. Escassez real (vagas limitadas) ou estrutural (condição especial com prazo determinado).", apply: "Para serviço de gestão: escassez real — 'tenho espaço para mais 2 clientes em abril'. Escassez estrutural — 'o onboarding gratuito (R$500) está disponível apenas para quem fechar até sexta-feira'. Não invente escassez falsa — isso destrói credibilidade. Mas estruture sua oferta para que a escassez seja real.", example: "Email de follow-up da proposta: 'Preciso de uma resposta até quinta-feira porque tenho outro prospect interessado no mesmo horário de reunião semanal. Como trabalho com atenção individualizada e não aceito dois clientes do mesmo segmento na mesma cidade, o slot é único.'" },
  { id: 30, group: 4, title: "CTA único e objetivo", sub: "Uma ação. Um objetivo. Planta a bomba e vai embora.", weapon: "Bomb Plant", weaponDesc: "O round tem um objetivo. Planta e defende. Sem distração.", cs: "Quando o time planta a bomba, existe uma única prioridade: defender até explodir. Não é 'planta E também pega o kit do CT E também salva o rifle.' Um objetivo. Seu CTA funciona igual: uma única ação que você quer que o cliente tome AGORA. Dois CTAs criam paralisia. Um CTA cria ação.", concept: "Ícaro: uma única promessa, sobre uma única dor, com um único CTA. Múltiplos CTAs criam paralisia de decisão — o cliente não sabe o que fazer primeiro e não faz nada. 'Me ligue OU me mande email OU preencha o formulário OU me manda DM' = o cliente não faz nada.", apply: "Na proposta: o único CTA é 'clique aqui para agendar uma call de 30 minutos' ou 'responda esse email confirmando interesse'. Um caminho. Claro. Simples. O botão tem uma cor, um texto, uma ação. Só.", example: "Final da proposta para Olegário: botão/link único, texto claro: 'AGENDAR MINHA CALL DE DIAGNÓSTICO (30 MINUTOS)'. Não 'entre em contato' — vago. Não 'clique aqui para saber mais' — você já disse tudo. Uma ação. Específica." },
  { id: 31, group: 4, title: "Próximo passo simples", sub: "Após o CTA, o próximo passo deve ser tão simples que não gere fricção.", weapon: "Callout Direto do FalleN", weaponDesc: "'Dois mid, um window, dois A main.' Cada player sabe o que fazer.", cs: "FalleN dá callouts assim: 'dois mid, um window, dois A main.' Todo player sabe exatamente o que fazer. Se o callout fosse 'bem, dependendo do info, talvez mid, considerando a possibilidade de window se tiver espaço' — ninguém faz nada. O próximo passo após o CTA precisa ser tão claro quanto um callout do FalleN.", concept: "Ícaro: 'após a compra, vai cair um email. É só colocar login e senha. Você vai entrar. Aqui é onde você vai ver nossa plataforma. Olha, tá todo o conteúdo postado.' Esse nível de detalhe elimina o medo do desconhecido. Ansiedade zero pós-compra = chargeback zero.", apply: "Após o cliente aceitar: fluxo automatizado e simples. Email com próximos passos: preencher briefing (5 minutos), agendar onboarding (Calendly), assinar contrato digital. Cada etapa deve levar menos de 5 minutos. Nenhum passo pode ser vago.", example: "Rodapé da proposta: 'Quando você confirmar, aqui está o que acontece nos próximos 3 dias: 1) Você recebe formulário de briefing (10 perguntas, 5 minutos). 2) Agendamos call de 45min de alinhamento. 3) Contrato digital para assinar online. 4) Começamos.' Simples. Concreto." },
  { id: 32, group: 4, title: "Nenhum elemento que gere atrito cognitivo", sub: "Não distraia o cliente com outros produtos durante a oferta.", weapon: "Clean Setup", weaponDesc: "No meio do execute pro A, FalleN não fala 'e aliás podemos ir pro B'.", cs: "Quando o time está no meio de um execute para o A, o FalleN não fala: 'e aliás, podemos também fazer rush B.' Isso quebra o foco, gera dúvida, atrasa a execução. Mencionar outros produtos ou serviços DURANTE a oferta principal é exatamente isso — confundir o time no meio do round mais importante.", concept: "Ícaro: o maior gerador de atrito é você começar a vender um produto e mencionar que tem outro. 'Dentro do pacote tem 50% de desconto para o outro serviço' cria a sensação de produto insuficiente. O cliente começa a pensar qual é o certo para ele. Resultado: ninguém compra nada.", apply: "Na proposta de gestão de tráfego: zero menção a outros serviços que você oferece (social media, branding, copywriting, etc.). Foque EM UM serviço. Os outros virão depois, naturalmente, após a confiança ser estabelecida e os primeiros resultados aparecerem.", example: "Proposta limpa: fala apenas sobre gestão de tráfego pago. Sem 'também faço gestão de redes' ou 'se precisar posso fazer o design dos criativos'. Zero. Tudo que está além da proposta atual vai numa conversa separada, depois do fechamento." },
  { id: 33, group: 4, title: "Continuidade implícita", sub: "Mostre onde o cliente vai estar depois. O jogo não termina no round 15.", weapon: "Season Pass", weaponDesc: "O round 15 não é o fim. Existe o segundo half, overtime, toda a série.", cs: "No CS, o round 15 não é o fim. Existe o segundo half, os overtimes, a série best-of-3, e o campeonato todo. O cliente que contrata seu serviço também não quer só 'um round'. Ele quer saber que existe uma jornada de crescimento clara. Você precisa mostrar essa jornada desde o início — ou ele vai pensar que você é apenas temporário.", concept: "Ícaro usa o exemplo do Novo Mercado: após a social mídia, você vai pro mercado de trabalho. Após o mercado, tem o mutirão do primeiro cliente. Cada produto leva naturalmente ao próximo. A continuidade implícita cria um ecossistema onde o cliente QUER ficar e crescer com você.", apply: "Na proposta, mostre a jornada de 12 meses: 'Fase 1 (meses 1-3): construção da base e primeiros resultados. Fase 2 (meses 4-6): otimização e início de escala. Fase 3 (mês 7+): expansão de canais e estratégia avançada.' O cliente vê onde está indo. Isso converte proposta em parceria.", example: "Seção 'Nossa jornada juntos' na proposta: mapa visual dos 12 primeiros meses. Objetivos de cada trimestre. 'No mês 6, revisamos a estratégia e decidimos juntos para onde crescer: mais volume no canal atual, novo canal, ou estratégia de retenção.' Parceria, não contrato." },
  { id: 34, group: 4, title: "Possibilidades claras de upsell e high ticket", sub: "Alguns chegam de econômica. Outros de jato privado. Ofereça os dois.", weapon: "VIP Access", weaponDesc: "Existem os players free-to-play e os que compram o passe de elite.", cs: "No CS, existem os players free-to-play e os que compram o passe de elite com skins, casos, todos os itens. O jogo base é o mesmo. Mas quem quer mais paga mais. Na sua oferta você precisa ter opções para o cliente que quer o básico E para o que quer tudo. Deixar de oferecer o high ticket é deixar dinheiro na mesa de clientes que QUERIAM pagar mais.", concept: "Ícaro (citando Marçal): 'Todo mundo vai chegar na Disney. Alguns de classe econômica, outros de jato privado.' Desde o início você pode filtrar quem está numa condição diferente: 'se você tem X condição, se cadastra nessa lista que vou oferecer algo diferente.' O high ticket paga sua paz de espírito. O básico garante volume.", apply: "Você deve ter 3 versões: BÁSICO (gestão simples, 1 plataforma), PROFISSIONAL (multi-plataforma + estratégia + relatórios), PARCERIA ESTRATÉGICA (tudo + consultoria mensal + acesso direto + sessões de estratégia). O high ticket é diferente em atenção e acesso — não apenas em entregáveis.", example: "Nota discreta no final da proposta: 'Se você está pensando em uma parceria mais próxima — onde eu atuo quase como um co-gestor de marketing do seu negócio, com acesso direto e sessões semanais de estratégia — tenho uma conversa diferente para fazer. Me avise e agendamos separado.'" },
];

const BOOKS = [
  { title: "Dot Com Secrets, Expert Secrets & Traffic Secrets", author: "Russell Brunson", why: "Vai te ensinar o senso de fluxo entre produtos, a venda graduada e tirar o medo de oferecer produto logo após a compra. Os dois primeiros são obrigatórios. O terceiro é útil mesmo sendo zoado (o próprio Ícaro disse).", tag: "FUNIL & PRODUTO" },
  { title: "Big Black Book of Marketing Secrets", author: "Agora Financial / Mark Ford", why: "A bíblia dos fundamentos de desejo, sofisticação de mercado e construção de oferta irresistível. Fonte direta de onde vêm os melhores frameworks desta aula. Tem em PDF — você já sabe onde encontrar.", tag: "COPY & DESEJO" },
  { title: "Breakthrough Advertising", author: "Eugene Schwartz", why: "O livro mais importante de copywriting já escrito. Ensina que copy não é escrita — é montagem. Você pega partes, desmonta, remonta. Schwartz passou mais de 30 anos esgotado no mercado. Ícaro está fazendo leitura guiada com seus alunos.", tag: "COPY MESTRE" },
];

// ─── HELPER COMPONENTS ──────────────────────────────────────────────────────
function InViewAnim({ children, delay = 0, direction = "up", className = "" }: { children: ReactNode; delay?: number; direction?: string; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const variants = {
    hidden: { opacity: 0, y: direction === "up" ? 28 : direction === "down" ? -28 : 0, x: direction === "left" ? 28 : direction === "right" ? -28 : 0, scale: direction === "scale" ? 0.94 : 1 },
    visible: { opacity: 1, y: 0, x: 0, scale: 1 }
  };
  return (
    <motion.div ref={ref} className={className} variants={variants} initial="hidden" animate={isInView ? "visible" : "hidden"} transition={{ duration: 0.55, delay, type: "spring", stiffness: 180, damping: 22 }}>
      {children}
    </motion.div>
  );
}

function CounterAnim({ target }: { target: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref as any, { once: true });
  useEffect(() => {
    if (!isInView) return;
    const num = parseFloat(target.replace(/[^0-9.]/g, ""));
    const duration = 1600;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * num));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, target]);
  return <span ref={ref}>{count}{target.includes("+") ? "+" : ""}</span>;
}

function GroupIconComp({ group }: { group: GroupData }) {
  const G = group.icon;
  return <G size={22} color={group.color} />;
}

function ItemCard({ item, groupColor }: { item: ItemData; groupColor: string }) {
  const [open, setOpen] = useState(false);
  const icons: Record<number, LucideIcon> = { 1: Crosshair, 2: Flame, 3: Gauge, 4: MapPin, 5: Binoculars, 6: Radio, 7: Focus, 8: ScanLine, 9: Play, 10: Target, 11: BarChart3, 12: Volume2, 13: FlaskConical, 14: Wand2, 15: BookOpen, 16: UserCheck, 17: BadgeCheck, 18: Handshake, 19: CircleDot, 20: Layers, 21: List, 22: Coins, 23: Award, 24: Gauge, 25: Hash, 26: Percent, 27: Flame, 28: Medal, 29: AlarmClock, 30: MousePointerClick, 31: ArrowUpRight, 32: Cpu, 33: TrendingUp, 34: Crown };
  const Icon = icons[item.id] || CircleDot;
  return (
    <motion.div style={{ background: T.card, border: `1px solid ${T.border}`, borderLeft: `3px solid ${groupColor}`, borderRadius: 8, marginBottom: 12, overflow: "hidden" }} whileHover={{ borderColor: "rgba(96,165,250,0.25)", transition: { duration: 0.2 } }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", padding: "16px 20px", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 14, textAlign: "left" }}>
        <div style={{ width: 40, height: 40, borderRadius: 8, background: `${groupColor}15`, border: `1px solid ${groupColor}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon size={18} color={groupColor} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
            <span style={{ fontFamily: T.ffD, fontSize: 11, color: groupColor, letterSpacing: 2, fontWeight: 700 }}>#{String(item.id).padStart(2, "0")}</span>
            <span style={{ fontFamily: T.ffD, fontSize: 10, color: T.muted, letterSpacing: 1.5, textTransform: "uppercase" }}>{item.weapon}</span>
          </div>
          <div style={{ fontFamily: T.ffD, fontSize: 18, fontWeight: 700, color: T.txt2, lineHeight: 1.25 }}>{item.title}</div>
          <div style={{ fontSize: 13, color: T.muted, marginTop: 2, lineHeight: 1.5 }}>{item.sub}</div>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown size={18} color={T.muted} />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} style={{ overflow: "hidden" }}>
            <div style={{ padding: "0 20px 20px" }}>
              <div style={{ background: T.surface, border: `1px solid ${groupColor}25`, borderRadius: 8, padding: "14px 16px", marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <Crosshair size={13} color={groupColor} />
                  <span style={{ fontFamily: T.ffD, fontSize: 11, color: groupColor, letterSpacing: 2, fontWeight: 700 }}>METÁFORA CS: {item.weaponDesc}</span>
                </div>
                <p style={{ fontSize: 14, color: T.txt, lineHeight: 1.7 }}>{item.cs}</p>
              </div>
              <div style={{ background: "rgba(96,165,250,0.04)", borderRadius: 8, padding: "14px 16px", marginBottom: 12, borderLeft: `2px solid ${T.ct}` }}>
                <div style={{ fontFamily: T.ffD, fontSize: 11, color: T.ct, letterSpacing: 2, fontWeight: 700, marginBottom: 8 }}>📖 O CONCEITO (O QUE O ÍCARO ENSINA)</div>
                <p style={{ fontSize: 14, color: T.txt, lineHeight: 1.7 }}>{item.concept}</p>
              </div>
              <div style={{ background: "rgba(245,158,11,0.04)", borderRadius: 8, padding: "14px 16px", marginBottom: 12, borderLeft: `2px solid ${T.t}` }}>
                <div style={{ fontFamily: T.ffD, fontSize: 11, color: T.t, letterSpacing: 2, fontWeight: 700, marginBottom: 8 }}>⚡ COMO VOCÊ (GESTOR DE TRÁFEGO) USA ISSO</div>
                <p style={{ fontSize: 14, color: T.txt, lineHeight: 1.7 }}>{item.apply}</p>
              </div>
              <div style={{ background: "rgba(52,211,153,0.04)", borderRadius: 8, padding: "14px 16px", borderLeft: `2px solid ${T.green}` }}>
                <div style={{ fontFamily: T.ffD, fontSize: 11, color: T.green, letterSpacing: 2, fontWeight: 700, marginBottom: 8 }}>🎯 EXEMPLO PRÁTICO (APLIQUE AGORA)</div>
                <p style={{ fontSize: 14, color: T.txt, lineHeight: 1.7 }}>{item.example}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────
export default function FallenMajorPlaybook() {
  const [activeGroup, setActiveGroup] = useState<number | null>(null);
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  const [activeBook, setActiveBook] = useState<number | null>(0);

  const totalChecked = Object.values(checkedItems).filter(Boolean).length;
  const filteredItems = activeGroup ? ITEMS.filter(i => i.group === activeGroup) : ITEMS;

  return (
    <div style={{ minHeight: "100vh", background: T.bg, color: T.txt, fontFamily: T.ffB, lineHeight: 1.7 }}>
      {/* HERO */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 24px", textAlign: "center", overflow: "hidden", backgroundImage: `radial-gradient(circle at 20% 15%, rgba(96,165,250,0.05) 0%, transparent 55%), radial-gradient(circle at 85% 80%, rgba(245,158,11,0.05) 0%, transparent 55%), radial-gradient(rgba(96,165,250,0.03) 1px, transparent 1px)`, backgroundSize: "100%, 100%, 44px 44px" }}>
        <div style={{ position: "absolute", top: "15%", left: "10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(96,165,250,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "8%", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, border: `1px solid ${T.ct}`, padding: "4px 16px", borderRadius: 4, marginBottom: 24, fontSize: 11, letterSpacing: 3, fontFamily: T.ffD, color: T.ct, fontWeight: 700, textTransform: "uppercase" }}>
            <Crosshair size={12} color={T.ct} /> MAJOR BRIEFING — CHECKLIST DA OFERTA IRRESISTÍVEL <Crosshair size={12} color={T.ct} />
          </div>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7, type: "spring", stiffness: 150 }} style={{ fontFamily: T.ffD, fontSize: "clamp(2.2rem, 7vw, 5.5rem)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.02em", marginBottom: 20, maxWidth: 860 }}>
          <span style={{ color: T.txt2 }}>FALLEN'S</span>{" "}
          <span style={{ background: `linear-gradient(135deg, ${T.ct} 0%, #A78BFA 45%, ${T.t} 100%)`, backgroundSize: "200% 200%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>PLAYBOOK</span>
          <br />
          <span style={{ color: T.txt2 }}>DA OFERTA</span>{" "}
          <span style={{ color: T.t }}>IRRESISTÍVEL</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }} style={{ fontSize: "clamp(1rem, 2.5vw, 1.2rem)", color: T.muted, maxWidth: 680, lineHeight: 1.7, marginBottom: 40 }}>
          Os 34 elementos que transformam qualquer oferta em máquina de conversão.<br />
          Baseado em Ícaro de Carvalho. Personalizado para{" "}
          <span style={{ color: T.ct, fontStyle: "italic" }}>gestores de tráfego</span>.
          Com metáforas de CS para que qualquer um com QI 83 entenda.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.6 }} style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ background: T.card, border: `1px solid ${T.border2}`, borderRadius: 8, padding: "16px 24px", textAlign: "center", minWidth: 120 }}>
              <div style={{ fontFamily: T.ffD, fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 700, color: s.color, lineHeight: 1 }}>
                <CounterAnim target={s.value} />
              </div>
              <div style={{ fontSize: 11, color: T.muted, letterSpacing: 1, marginTop: 4, textTransform: "uppercase", fontFamily: T.ffD }}>{s.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", color: T.muted, fontSize: 12, letterSpacing: 2, fontFamily: T.ffD }}>
          ↓ SCROLL TO ENTER
        </motion.div>
      </section>

      {/* POR QUE VOCÊ PRECISA DISSO */}
      <section style={{ padding: "80px 24px", background: T.surface, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <InViewAnim direction="up">
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{ fontFamily: T.ffD, fontSize: 11, color: T.ct, letterSpacing: 3, marginBottom: 12, fontWeight: 700 }}>PRÉ-JOGO — SITUAÇÃO ATUAL</div>
              <h2 style={{ fontFamily: T.ffD, fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 700, color: T.txt2, lineHeight: 1.15 }}>
                FalleN, você é o gestor de tráfego.<br />
                <span style={{ color: T.t }}>Mas você ainda está jogando o jogo errado.</span>
              </h2>
            </div>
          </InViewAnim>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginBottom: 40 }}>
            {[
              { icon: <Siren size={20} color={T.red} />, title: "O problema real", text: "Você é bom em tráfego. Sabe configurar campanha, criar público, testar criativo. Mas se a OFERTA do seu cliente é ruim, o melhor tráfego do mundo não salva o round.", color: T.red },
              { icon: <Activity size={20} color={T.t} />, title: "O que muda com esse guia", text: "Você vai entender como avaliar e melhorar a oferta dos seus clientes antes de subir qualquer campanha. Isso multiplica seus resultados E aumenta o valor que você entrega.", color: T.t },
              { icon: <Trophy size={20} color={T.green} />, title: "O resultado esperado", text: "Clientes que renovam porque viram resultado real. Cases que você pode usar em propostas futuras. Reputação de gestor que entende de negócio, não só de tráfego.", color: T.green },
            ].map((item, i) => (
              <InViewAnim key={i} delay={i * 0.12} direction="up">
                <div style={{ background: T.card, border: `1px solid ${T.border}`, borderTop: `2px solid ${item.color}`, borderRadius: 8, padding: 20, height: "100%" }}>
                  <div style={{ marginBottom: 10 }}>{item.icon}</div>
                  <div style={{ fontFamily: T.ffD, fontSize: 17, fontWeight: 700, color: T.txt2, marginBottom: 8 }}>{item.title}</div>
                  <p style={{ fontSize: 14, color: T.muted, lineHeight: 1.7 }}>{item.text}</p>
                </div>
              </InViewAnim>
            ))}
          </div>
          <InViewAnim direction="scale">
            <div style={{ background: T.card, border: `1px solid ${T.ct}`, borderRadius: 8, padding: "20px 24px", display: "flex", alignItems: "flex-start", gap: 14 }}>
              <Crosshair size={22} color={T.ct} style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <div style={{ fontFamily: T.ffD, fontSize: 16, fontWeight: 700, color: T.ct, marginBottom: 6 }}>REGRA DO MAJOR QUE NINGUÉM TE CONTOU</div>
                <p style={{ fontSize: 14, color: T.txt, lineHeight: 1.75 }}>
                  O FalleN não ganhou Majors apenas porque era bom de mira. Ganhou porque entendia o jogo INTEIRO — não só a parte técnica. Você como gestor de tráfego precisa entender a oferta, o cliente e o mercado — não só Meta Ads e Google. <strong style={{ color: T.txt2 }}>Esse guia é o que separa o gestor que "roda anúncio" do gestor que "gera resultado."</strong>
                </p>
              </div>
            </div>
          </InViewAnim>
        </div>
      </section>

      {/* OS 4 MACRO-GRUPOS */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <InViewAnim direction="up">
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{ fontFamily: T.ffD, fontSize: 11, color: T.ct, letterSpacing: 3, marginBottom: 12, fontWeight: 700 }}>MAPA DO JOGO — VISÃO GERAL</div>
              <h2 style={{ fontFamily: T.ffD, fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 700, color: T.txt2, lineHeight: 1.15 }}>Os 4 Grupos Táticos da Oferta</h2>
              <p style={{ fontSize: 15, color: T.muted, marginTop: 12 }}>Cada grupo é uma fase do round. Você precisa de todos os quatro para o execute perfeito.</p>
            </div>
          </InViewAnim>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 48 }}>
            {GROUPS.map((g, i) => (
              <InViewAnim key={g.id} delay={i * 0.1} direction="scale">
                <motion.button onClick={() => setActiveGroup(activeGroup === g.id ? null : g.id)} style={{ width: "100%", background: activeGroup === g.id ? `${g.color}15` : T.card, border: `1px solid ${activeGroup === g.id ? g.color : T.border}`, borderRadius: 8, padding: "20px 16px", cursor: "pointer", textAlign: "left" }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                  <div style={{ marginBottom: 12 }}><GroupIconComp group={g} /></div>
                  <div style={{ fontFamily: T.ffD, fontSize: 14, fontWeight: 700, color: g.color, letterSpacing: 1.5, marginBottom: 4 }}>{g.name}</div>
                  <div style={{ fontFamily: T.ffD, fontSize: 16, fontWeight: 700, color: T.txt2, marginBottom: 8 }}>{g.sub}</div>
                  <p style={{ fontSize: 12, color: T.muted, lineHeight: 1.6 }}>{g.desc}</p>
                  <div style={{ marginTop: 12, fontSize: 11, color: g.color, fontFamily: T.ffD, letterSpacing: 1 }}>{g.items.length} elementos →</div>
                </motion.button>
              </InViewAnim>
            ))}
          </div>
          {activeGroup && (
            <InViewAnim direction="up">
              <div style={{ marginBottom: 12, padding: "10px 16px", background: T.surface, borderRadius: 6, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, color: T.muted }}>
                  Mostrando: <span style={{ color: T.txt2, fontFamily: T.ffD, fontWeight: 700 }}>{GROUPS.find(g => g.id === activeGroup)?.sub}</span>
                </span>
                <button onClick={() => setActiveGroup(null)} style={{ background: "none", border: "none", cursor: "pointer", color: T.muted, fontSize: 12, fontFamily: T.ffD, letterSpacing: 1 }}>VER TODOS ×</button>
              </div>
            </InViewAnim>
          )}
        </div>
      </section>

      {/* OS 34 ELEMENTOS */}
      <section style={{ padding: "0 24px 80px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <InViewAnim direction="up">
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <h2 style={{ fontFamily: T.ffD, fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", fontWeight: 700, color: T.txt2 }}>
                Os {filteredItems.length} {activeGroup ? "Elementos do Grupo" : "Elementos Completos"}
              </h2>
              <p style={{ fontSize: 14, color: T.muted, marginTop: 8 }}>Clique em qualquer card para ver a explicação completa + metáfora CS + aplicação para gestor de tráfego.</p>
            </div>
          </InViewAnim>
          {GROUPS.filter(g => !activeGroup || g.id === activeGroup).map((group) => {
            const groupItems = ITEMS.filter(i => i.group === group.id);
            if (filteredItems.length > 0 && !filteredItems.some(fi => fi.group === group.id)) return null;
            return (
              <div key={group.id} style={{ marginBottom: 48 }}>
                <InViewAnim direction="left">
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, paddingBottom: 12, borderBottom: `1px solid ${group.color}30` }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: `${group.color}15`, border: `1px solid ${group.color}40`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <GroupIconComp group={group} />
                    </div>
                    <div>
                      <div style={{ fontFamily: T.ffD, fontSize: 11, color: group.color, letterSpacing: 2, fontWeight: 700 }}>GRUPO {group.id} — {group.name}</div>
                      <div style={{ fontFamily: T.ffD, fontSize: 20, fontWeight: 700, color: T.txt2 }}>{group.sub}</div>
                    </div>
                    <div style={{ marginLeft: "auto", fontFamily: T.ffD, fontSize: 12, color: T.muted }}>{group.items.length} elementos</div>
                  </div>
                </InViewAnim>
                {groupItems.map((item, i) => (
                  <InViewAnim key={item.id} delay={i * 0.05} direction="up">
                    <ItemCard item={item} groupColor={group.color} />
                  </InViewAnim>
                ))}
              </div>
            );
          })}
        </div>
      </section>

      {/* CHECKLIST INTERATIVO */}
      <section style={{ padding: "80px 24px", background: T.surface, borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <InViewAnim direction="up">
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <div style={{ fontFamily: T.ffD, fontSize: 11, color: T.green, letterSpacing: 3, marginBottom: 12, fontWeight: 700 }}>CHECKLIST DO MAJOR</div>
              <h2 style={{ fontFamily: T.ffD, fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 700, color: T.txt2, marginBottom: 12 }}>Sua Oferta Está Pronta?</h2>
              <p style={{ fontSize: 15, color: T.muted }}>Marque cada elemento que você já tem na sua próxima oferta ou proposta comercial.</p>
              <div style={{ marginTop: 16, display: "inline-flex", alignItems: "center", gap: 12, background: T.card, border: `1px solid ${T.border2}`, borderRadius: 8, padding: "10px 20px" }}>
                <div style={{ fontFamily: T.ffD, fontSize: 28, fontWeight: 700, color: totalChecked === 34 ? T.green : totalChecked > 20 ? T.t : T.ct }}>{totalChecked}/34</div>
                <div style={{ fontSize: 13, color: T.muted }}>{totalChecked === 34 ? "🏆 READY FOR MAJOR!" : totalChecked > 20 ? "⚡ Quase lá" : totalChecked > 10 ? "📈 Progresso sólido" : "🎯 Começando o setup"}</div>
              </div>
            </div>
          </InViewAnim>
          {GROUPS.map((group) => (
            <div key={group.id} style={{ marginBottom: 32 }}>
              <div style={{ fontFamily: T.ffD, fontSize: 13, color: group.color, letterSpacing: 2, fontWeight: 700, marginBottom: 12 }}>{group.name} — {group.sub}</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 8 }}>
                {ITEMS.filter(i => i.group === group.id).map((item) => (
                  <motion.button key={item.id} onClick={() => setCheckedItems(prev => ({ ...prev, [item.id]: !prev[item.id] }))} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 12px", background: checkedItems[item.id] ? `${group.color}12` : T.card, border: `1px solid ${checkedItems[item.id] ? group.color : T.border}`, borderRadius: 6, cursor: "pointer", textAlign: "left" }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                    <div style={{ width: 18, height: 18, borderRadius: 3, border: `2px solid ${checkedItems[item.id] ? group.color : T.muted}`, background: checkedItems[item.id] ? group.color : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1, transition: "all 0.2s" }}>
                      {checkedItems[item.id] && <span style={{ fontSize: 11, color: "#000", fontWeight: 700 }}>✓</span>}
                    </div>
                    <span style={{ fontSize: 12, color: checkedItems[item.id] ? T.txt2 : T.muted, lineHeight: 1.4, fontFamily: T.ffD, fontWeight: checkedItems[item.id] ? 600 : 400 }}>#{String(item.id).padStart(2, "0")} {item.title}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROPOSTA COMERCIAL */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <InViewAnim direction="up">
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{ fontFamily: T.ffD, fontSize: 11, color: T.t, letterSpacing: 3, marginBottom: 12, fontWeight: 700 }}>APLICAÇÃO REAL — SUA ARMA NO CAMPO</div>
              <h2 style={{ fontFamily: T.ffD, fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 700, color: T.txt2, lineHeight: 1.15 }}>
                Como Aplicar na Sua<br /><span style={{ color: T.t }}>Proposta Comercial</span>
              </h2>
            </div>
          </InViewAnim>
          <div style={{ display: "grid", gap: 20 }}>
            {[
              { num: "01", title: "Comece com descoberta, não com lista de serviços", color: T.ct, desc: "Os primeiros 2 parágrafos da proposta devem revelar algo que o cliente não sabia sobre o próprio mercado. Dados de concorrência, volume de busca, gap de posicionamento. DEPOIS você fala o que faz.", icon: <Eye size={18} color={T.ct} /> },
              { num: "02", title: "UMA dor, UMA promessa mensurável", color: T.t, desc: "Identifique a dor principal do prospect (não as 10 dores possíveis) e faça UMA promessa com número, prazo e métrica. 'Vou gerar X novos clientes em Y dias usando Z de investimento em mídia.'", icon: <Focus size={18} color={T.t} /> },
              { num: "03", title: "Mini-case narrado antes do pitch", color: T.green, desc: "Antes de listar seus serviços, conte a história de um cliente similar. Problema → identificação → ação → resultado. 3 parágrafos. Isso cria credibilidade ANTES da proposta.", icon: <BookOpen size={18} color={T.green} /> },
              { num: "04", title: "Value stacking + âncora de preço", color: T.red, desc: "Liste o que está incluso com valores individuais de mercado. Some tudo. Depois apresente seu preço real. A diferença é a percepção de valor. Nunca apresente preço sem contexto.", icon: <Layers size={18} color={T.red} /> },
              { num: "05", title: "CTA único + próximos passos claros", color: T.gold, desc: "Finalize com UM botão, UM link, UM próximo passo. Depois explique o que acontece nos próximos 3 dias após o 'sim'. Elimine zero de ansiedade do processo.", icon: <MousePointerClick size={18} color={T.gold} /> },
            ].map((step, i) => (
              <InViewAnim key={i} delay={i * 0.1} direction="left">
                <div style={{ background: T.card, border: `1px solid ${T.border}`, borderLeft: `3px solid ${step.color}`, borderRadius: 8, padding: "20px 24px", display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ fontFamily: T.ffD, fontSize: 32, fontWeight: 700, color: step.color, opacity: 0.3, lineHeight: 1, flexShrink: 0, minWidth: 36 }}>{step.num}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      {step.icon}
                      <div style={{ fontFamily: T.ffD, fontSize: 18, fontWeight: 700, color: T.txt2 }}>{step.title}</div>
                    </div>
                    <p style={{ fontSize: 14, color: T.muted, lineHeight: 1.7 }}>{step.desc}</p>
                  </div>
                </div>
              </InViewAnim>
            ))}
          </div>
          <InViewAnim direction="up" delay={0.5}>
            <div style={{ marginTop: 32, background: T.surface, border: `1px solid ${T.border2}`, borderRadius: 8, padding: 24, textAlign: "center" }}>
              <div style={{ fontFamily: T.ffD, fontSize: 13, color: T.ct, letterSpacing: 2, marginBottom: 12 }}>🔗 SUA PROPOSTA ATUAL — GITHUB</div>
              <p style={{ fontSize: 14, color: T.muted, lineHeight: 1.7, maxWidth: 600, margin: "0 auto" }}>
                Seu projeto em <span style={{ color: T.ct, fontFamily: T.ffD, fontWeight: 600 }}>github.com/gabrielditullio/pizzariacamelo</span> já é um ótimo começo. Agora aplique os 34 elementos acima como checklist de revisão antes de enviar qualquer proposta. Especialmente: Elemento 14 (formato de descoberta), Elemento 8 (dor central), Elemento 10 (promessa mensurável) e Elemento 22 (value stacking).
              </p>
            </div>
          </InViewAnim>
        </div>
      </section>

      {/* ARSENAL DE LIVROS */}
      <section style={{ padding: "80px 24px", background: T.surface, borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <InViewAnim direction="up">
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{ fontFamily: T.ffD, fontSize: 11, color: T.gold, letterSpacing: 3, marginBottom: 12, fontWeight: 700 }}>ARSENAL BIBLIOGRÁFICO — OBRIGATÓRIO</div>
              <h2 style={{ fontFamily: T.ffD, fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 700, color: T.txt2, lineHeight: 1.15 }}>
                Os 3 Livros que o<br /><span style={{ color: T.gold }}>FalleN Tem que Ler</span>
              </h2>
              <p style={{ fontSize: 15, color: T.muted, marginTop: 12 }}>Palavras do Ícaro: "Não é sugestão. É obrigatório." Você pode usar IA para fazer resumo e podcast de cada capítulo.</p>
            </div>
          </InViewAnim>
          <div style={{ display: "grid", gap: 16 }}>
            {BOOKS.map((book, i) => (
              <InViewAnim key={i} delay={i * 0.12} direction="up">
                <motion.div onClick={() => setActiveBook(activeBook === i ? null : i)} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 8, padding: "20px 24px", cursor: "pointer" }} whileHover={{ borderColor: "rgba(212,160,23,0.35)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: activeBook === i ? 16 : 0 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 8, background: T.goldDim, border: "1px solid rgba(212,160,23,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <BookOpen size={20} color={T.gold} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                        <span style={{ fontFamily: T.ffD, fontSize: 10, color: T.gold, letterSpacing: 2, border: "1px solid rgba(212,160,23,0.4)", padding: "1px 8px", borderRadius: 3 }}>#{i + 1} — {book.tag}</span>
                      </div>
                      <div style={{ fontFamily: T.ffD, fontSize: 18, fontWeight: 700, color: T.txt2 }}>{book.title}</div>
                      <div style={{ fontSize: 13, color: T.muted }}>{book.author}</div>
                    </div>
                    <motion.div animate={{ rotate: activeBook === i ? 90 : 0 }}>
                      <ChevronRight size={18} color={T.muted} />
                    </motion.div>
                  </div>
                  <AnimatePresence>
                    {activeBook === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                        <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 16 }}>
                          <p style={{ fontSize: 14, color: T.txt, lineHeight: 1.75 }}>{book.why}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </InViewAnim>
            ))}
          </div>
          <InViewAnim direction="scale" delay={0.4}>
            <div style={{ marginTop: 24, background: "rgba(96,165,250,0.06)", border: `1px solid ${T.ct}`, borderRadius: 8, padding: "16px 20px", display: "flex", alignItems: "flex-start", gap: 12 }}>
              <Cpu size={18} color={T.ct} style={{ flexShrink: 0, marginTop: 2 }} />
              <p style={{ fontSize: 14, color: T.txt, lineHeight: 1.75 }}>
                <strong style={{ color: T.ct, fontFamily: T.ffD }}>HACK DO ÍCARO:</strong>{" "}
                "Você pode fotografar tudo isso, jogar no GPT ou na IA que quiser e pedir: 'me dê uma aula em formato de podcast sobre cada um desses 34 elementos.' É muito fácil ser burro hoje em dia — é só fazer os bagulhos que o resultado vem."
              </p>
            </div>
          </InViewAnim>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "40px 24px", borderTop: `1px solid ${T.border}`, textAlign: "center" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ fontFamily: T.ffD, fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
            <span style={{ background: `linear-gradient(135deg, ${T.ct} 0%, #A78BFA 45%, ${T.t} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>BOA SORTE NO MAJOR, FALLEN.</span>
          </div>
          <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.7, maxWidth: 500, margin: "0 auto 20px" }}>
            Baseado na aula "Checklist da Oferta Irresistível" de Ícaro de Carvalho.<br />
            Personalizado para gestores de tráfego. Com metáforas de CS:GO porque sim.
          </p>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16 }}>
            <Crosshair size={14} color={T.muted} />
            <span style={{ fontSize: 11, color: T.muted, letterSpacing: 2, fontFamily: T.ffD }}>GG WP</span>
            <Crosshair size={14} color={T.muted} />
          </div>
        </div>
      </footer>
    </div>
  );
}
