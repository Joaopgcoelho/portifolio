# UI Patterns Library
## Design System — Documentação de Patterns para Geração de Telas

**Versão:** 2.0  
**Última atualização:** Maio 2026  
**Propósito:** Referência de UX/UI, base para geração de telas, input para IA, guia para designers e desenvolvedores.

---

# Busca com Filtros

## Objetivo

Permitir que o usuário encontre conteúdo relevante rapidamente através de busca textual combinada com refinamento progressivo por filtros contextuais.

## Quando usar

- Telas de descoberta de conteúdo
- Catálogos com volume alto de itens
- Quando o usuário precisa refinar resultados por múltiplos critérios
- Interfaces para usuários não autenticados que precisam de acesso imediato

## Quando não usar

- Listagens com menos de 10 itens (filtros desnecessários)
- Quando há apenas um critério de busca (usar campo simples)
- Telas de configuração ou formulários
- Dashboards com dados pré-filtrados pelo sistema

## Estrutura da Interface

**Região 1 — Header**
- Logo e navegação global

**Região 2 — Busca**
- Campo de busca com ícone de pesquisa
- Sempre visível, nunca colapsado
- Posição fixa abaixo do header

**Região 3 — Filtros**
- Controles de filtro em linha: dropdowns para categoria, preço, duração
- Área de filtros ativos: tags removíveis com ícone "×"
- Botão "Limpar tudo" visível quando há filtros ativos

**Região 4 — Resultados**
- Grid ou lista de cards (delega para pattern Card List)
- Contador de resultados acima do grid

**Região 5 — Footer**
- Navegação secundária e informações institucionais

## Componentes necessários

- Search Input
- Filter Dropdown
- Filter Tag (removível)
- Button (text — "Limpar tudo")
- Card Grid
- Skeleton Card
- Empty State
- Inline Error Message

## Hierarquia visual

1. Campo de busca (maior destaque, posição superior)
2. Filtros (segundo nível, abaixo da busca)
3. Filtros ativos (indicadores visuais de estado)
4. Área de resultados (conteúdo principal)

## Interações

| Ação do usuário | Resposta do sistema |
|-----------------|---------------------|
| Digita e pressiona Enter | Dispara busca, exibe loading nos resultados |
| Clica no ícone de busca | Dispara busca |
| Clica em filtro dropdown | Abre opções; seleção aplica imediatamente |
| Clica "×" em tag de filtro | Remove filtro individual, atualiza resultados |
| Clica "Limpar tudo" | Remove todos os filtros, mantém termo de busca |

## Estados

### Loading
- Skeleton cards na área de resultados (3 a 6 placeholders)
- Filtros e busca permanecem interativos (não bloqueados)
- Animação shimmer nos skeletons

### Empty
- Mensagem contextual: "Nenhum resultado encontrado para '[termo]'"
- Sugestões de ação: verificar ortografia, usar termos genéricos, remover filtros
- CTAs: "Limpar filtros" e "Explorar categorias"
- Ilustração leve e contextual

### Error
- Mensagem inline acima da área de resultados: "Erro ao carregar resultados."
- Botão de retry visível
- Filtros e busca permanecem funcionais

### Success
- Resultados exibidos em grid com contador ("24 resultados")
- Filtros ativos visíveis como tags
- Transição suave do skeleton para conteúdo real

## Responsividade

| Viewport | Comportamento |
|----------|---------------|
| Desktop (>1024px) | Filtros em linha, grid 3 colunas |
| Tablet (768–1024px) | Filtros em linha (compactados), grid 2 colunas |
| Mobile (<768px) | Filtros em bottom sheet ou modal, grid 1 coluna, busca com ícone expansível |

## Acessibilidade

- Campo de busca com `aria-label="Buscar conteúdo"`
- Filtros dropdown com `aria-expanded` e `aria-haspopup`
- Tags de filtro ativo com `aria-label="Remover filtro [nome]"`
- Região de resultados com `aria-live="polite"` para anunciar atualizações
- Botão "Limpar tudo" com `aria-label="Remover todos os filtros ativos"`
- Navegação por teclado completa entre filtros

## UX Rationale

Busca sempre visível elimina fricção para a tarefa principal do usuário. Aplicação imediata de filtros dá feedback instantâneo. Tags de filtro ativo tornam o estado do sistema transparente — o usuário sempre sabe por que está vendo determinados resultados. Reset acessível previne situações de "preso sem resultados".

## Do

- Manter busca visível em todos os estados (loading, empty, error)
- Exibir filtros ativos como tags removíveis
- Atualizar resultados sem reload de página
- Mostrar contador de resultados após busca
- Preservar termo digitado ao navegar entre estados

## Don't

- Esconder a busca atrás de um ícone em desktop
- Exigir clique em "Aplicar" para filtros (aplicar imediatamente)
- Usar spinner centralizado para loading de resultados
- Remover filtros ativos sem feedback visual
- Bloquear interação com filtros durante loading de resultados

---

# Card List

## Objetivo

Exibir coleções de conteúdo em formato de grid responsivo, otimizado para escaneabilidade visual e comparação rápida entre itens.

## Quando usar

- Resultados de busca ou navegação por categoria
- Catálogos de produtos, cursos, artigos ou serviços
- Qualquer listagem onde comparação visual entre itens é relevante
- Quando cada item possui imagem, título, metadados e ação

## Quando não usar

- Listagens de dados tabulares (usar tabela)
- Itens sem representação visual (usar lista simples)
- Quando há apenas 1–2 itens (usar destaque individual)
- Feeds cronológicos sem necessidade de comparação (usar timeline)

## Estrutura da Interface

**Região 1 — Toolbar de resultados**
- Contador de resultados: "24 resultados encontrados"
- Controle de ordenação: dropdown (Relevância, Preço, Data)

**Região 2 — Grid de cards**
- Grid responsivo com espaçamento consistente
- Cada card segue hierarquia fixa: imagem → título → descrição → metadados → CTA

**Região 3 — Paginação**
- Navegação numérica com setas anterior/próximo
- Posição: abaixo do grid, centralizada

**Anatomia do Card:**
- Imagem/thumbnail (topo, aspect ratio fixo)
- Título (máximo 2 linhas, truncado com ellipsis)
- Descrição (máximo 3 linhas, truncada)
- Metadados (categoria, duração, preço — inline)
- CTA único: "Ver detalhes"

## Componentes necessários

- Card (com variantes de estado)
- Grid Layout (responsivo)
- Skeleton Card
- Pagination
- Sort Dropdown
- Result Counter
- Empty State
- Inline Error

## Hierarquia visual

1. Imagem do card (atrai atenção inicial)
2. Título (identificação do item)
3. Metadados (informação de decisão)
4. CTA (ação de conversão)
5. Descrição (contexto adicional)

## Interações

| Ação do usuário | Resposta do sistema |
|-----------------|---------------------|
| Hover no card | Elevação sutil (shadow) + destaque no CTA |
| Clica no CTA | Navega para página de detalhe |
| Altera ordenação | Resultados reordenam sem reload |
| Clica em página | Carrega nova página de resultados |

## Estados

### Loading
- 6 skeleton cards espelhando estrutura final (placeholder de imagem, linhas de texto, botão)
- Animação shimmer/pulse
- Toolbar de resultados visível (sem contador)

### Empty
- Ilustração contextual centralizada
- Mensagem: "Nenhum conteúdo disponível no momento."
- CTA: "Explorar categorias"

### Error
- Mensagem inline acima do grid: "Falha ao carregar conteúdos."
- Botão: "Tentar novamente"
- Grid não exibe skeletons (substituído pela mensagem)

### Success
- Cards populados com dados reais
- Contador atualizado
- Transição suave de skeleton para conteúdo

## Responsividade

| Viewport | Colunas | Comportamento |
|----------|---------|---------------|
| Desktop (>1024px) | 3 colunas | Grid padrão com gap de 24px |
| Tablet (768–1024px) | 2 colunas | Gap reduzido para 16px |
| Mobile (<768px) | 1 coluna | Cards full-width, stack vertical |

## Acessibilidade

- Grid usa markup semântico: `<ul>` com `<li>` por card
- Imagens com `alt` descritivo (não decorativo)
- CTA dentro do card recebe foco (card inteiro não é clicável)
- Ordenação anuncia estado atual para screen readers
- Paginação usa `<nav>` com `aria-label="Paginação de resultados"`
- Contraste mínimo WCAG AA em todos os textos sobre imagem

## UX Rationale

Estrutura consistente de card (mesma ordem de elementos em todos os cards) permite que o usuário desenvolva padrão de leitura. Grid responsivo mantém densidade de informação adequada por viewport. Paginação numérica dá senso de escala do dataset e permite navegação não-linear. Metadados visíveis no card reduzem cliques exploratórios desnecessários.

## Do

- Manter ordem fixa dos elementos dentro do card (imagem → título → descrição → meta → CTA)
- Usar aspect ratio fixo para imagens (evitar saltos de layout)
- Truncar textos longos com ellipsis (nunca quebrar layout)
- Usar paginação numérica para SEO e senso de escala
- Manter hover sutil (elevação, não transformação de escala)

## Don't

- Colocar múltiplos CTAs por card
- Tornar o card inteiro clicável (prejudica acessibilidade)
- Usar infinite scroll como padrão (prejudica SEO e senso de posição)
- Variar a estrutura do card entre itens da mesma lista
- Omitir skeleton durante loading (nunca mostrar grid vazio)

---

# Empty State

## Objetivo

Comunicar de forma clara e construtiva a ausência de dados, oferecendo orientação e caminhos alternativos para manter o usuário engajado e evitar abandono.

## Quando usar

- Busca sem resultados
- Listagens vazias (sem itens cadastrados)
- Filtros que eliminam todos os resultados
- Primeiro acesso a uma seção sem dados
- Após exclusão do último item de uma lista

## Quando não usar

- Quando há erro de sistema (usar Error State)
- Durante carregamento (usar Loading State)
- Quando a ausência é temporária e previsível (usar mensagem inline simples)

## Estrutura da Interface

**Região 1 — Contexto preservado**
- Busca e/ou filtros permanecem visíveis e editáveis
- Estado anterior do usuário é mantido (termo digitado, filtros selecionados)

**Região 2 — Comunicação central**
- Ilustração contextual (leve, não dominante)
- Mensagem principal com contexto: inclui o termo buscado ou ação realizada
- Lista de sugestões (2–3 itens acionáveis)

**Região 3 — Ações de recuperação**
- CTA primário: ação mais provável de resolver (ex: "Limpar filtros")
- CTA secundário: caminho alternativo (ex: "Explorar categorias")

## Componentes necessários

- Illustration (contextual, estilo consistente)
- Heading (mensagem principal)
- Body Text (sugestões)
- Button Primary (ação de recuperação)
- Button Secondary (caminho alternativo)
- Search Input (preservado do estado anterior)

## Hierarquia visual

1. Ilustração (atrai atenção, comunica tom)
2. Mensagem principal (explica a situação)
3. Sugestões (orienta próximos passos)
4. CTAs (oferece saída concreta)

## Interações

| Ação do usuário | Resposta do sistema |
|-----------------|---------------------|
| Edita termo de busca | Nova busca é disparada |
| Clica "Limpar filtros" | Remove filtros, recarrega resultados |
| Clica "Explorar categorias" | Navega para página de categorias |

## Estados

### Loading
- N/A — Empty State é um estado resultante, não possui loading próprio

### Empty
- Este É o estado — sempre exibe: ilustração + mensagem + sugestões + CTAs
- Mensagem deve incluir contexto (termo buscado, filtro aplicado)

### Error
- Distinto do empty: "Ocorreu um erro ao buscar. Tente novamente."
- Substitui sugestões por botão de retry
- Mantém busca editável

### Success
- Transição para estado populado (Card List ou resultado relevante)

## Responsividade

| Viewport | Comportamento |
|----------|---------------|
| Desktop | Ilustração + texto centralizados, CTAs lado a lado |
| Tablet | Mesmo layout, ilustração reduzida |
| Mobile | Ilustração menor ou oculta, CTAs empilhados verticalmente |

## Acessibilidade

- Mensagem principal usa heading semântico (`h2` ou `h3`)
- Ilustração com `role="presentation"` (decorativa, não informativa)
- CTAs focáveis por teclado com labels descritivos
- `aria-live="polite"` na região para anunciar transição de loading para empty
- Sugestões em lista semântica (`<ul>`)

## UX Rationale

Estados vazios são momentos de alto risco de abandono. Fornecer contexto (o que foi buscado), orientação (o que tentar) e ação (como resolver) transforma um beco sem saída em um ponto de redirecionamento. Manter controles de busca visíveis permite correção imediata sem navegação adicional.

## Do

- Sempre incluir pelo menos um CTA acionável
- Referenciar o que o usuário fez (termo, filtro) na mensagem
- Manter busca/filtros visíveis e editáveis
- Usar ilustração com estilo visual consistente em todo o sistema
- Oferecer sugestões práticas e específicas

## Don't

- Exibir tela completamente em branco
- Usar mensagens genéricas sem contexto ("Nenhum resultado")
- Esconder a busca ou filtros no estado vazio
- Usar ilustrações que ocupem mais de 40% do viewport
- Redirecionar automaticamente para outra página

---

# Loading State

## Objetivo

Comunicar que o sistema está processando uma requisição de dados, mantendo a percepção de velocidade e a continuidade visual entre o estado de espera e o conteúdo final.

## Quando usar

- Carregamento de listas ou grids de conteúdo
- Fetch de dados após busca ou aplicação de filtros
- Navegação entre páginas de resultados
- Qualquer requisição que retorne coleções de dados

## Quando não usar

- Loading de ações pontuais (usar spinner no botão)
- Transições de navegação entre páginas (usar progress bar no topo)
- Upload de arquivos (usar progress bar com porcentagem)
- Ações instantâneas (<300ms — não exibir loading)

## Estrutura da Interface

**Região 1 — Elementos interativos (preservados)**
- Busca, filtros e navegação permanecem funcionais
- Não bloqueados durante o carregamento

**Região 2 — Skeleton Grid**
- Cards placeholder espelhando exatamente a estrutura final
- Mesma quantidade de colunas do grid populado
- Cada skeleton card replica: área de imagem, linhas de título, linhas de texto, área de botão
- Quantidade: 6 skeleton cards (2 linhas do grid)

**Região 3 — Feedback de timeout (condicional)**
- Após 5s: mensagem "Ainda carregando..."
- Após 15s: botão de retry

## Componentes necessários

- Skeleton Card (espelha Card real)
- Shimmer Animation
- Timeout Message
- Retry Button
- Progress Indicator (opcional, para timeout)

## Hierarquia visual

1. Skeleton grid (ocupa área principal, comunica estrutura esperada)
2. Elementos interativos preservados (busca, filtros)
3. Mensagem de timeout (aparece condicionalmente)

## Interações

| Ação do usuário | Resposta do sistema |
|-----------------|---------------------|
| Interage com busca/filtros | Nova requisição é disparada (cancela anterior) |
| Aguarda >5s | Exibe mensagem "Ainda carregando..." |
| Aguarda >15s | Exibe botão "Tentar novamente" |
| Clica retry | Refaz requisição, reinicia skeleton |

## Estados

### Loading
- Este É o estado de loading
- Skeleton cards com animação shimmer (ciclo de 2s)
- Layout espelha exatamente o grid final (sem layout shift na transição)

### Empty
- Transição: skeleton desaparece → Empty State é exibido
- Transição suave (fade)

### Error
- Transição: skeleton desaparece → mensagem de erro inline com retry
- Sem animação de skeleton durante erro

### Success
- Transição: skeleton → conteúdo real (fade-in, sem layout shift)
- Contador de resultados aparece

## Responsividade

| Viewport | Comportamento |
|----------|---------------|
| Desktop | 6 skeleton cards (3×2 grid) |
| Tablet | 4 skeleton cards (2×2 grid) |
| Mobile | 3 skeleton cards (1×3 stack) |

## Acessibilidade

- Região de loading com `aria-busy="true"`
- `aria-live="polite"` anuncia quando conteúdo carrega
- Animação respeita `prefers-reduced-motion` (blocos estáticos cinza se reduzido)
- Screen readers anunciam "Carregando conteúdo" na entrada do estado
- Elementos interativos mantêm foco e funcionalidade

## UX Rationale

Skeleton screens reduzem percepção de lentidão em até 30% comparado a spinners genéricos. Espelhar a estrutura final cria continuidade cognitiva — o usuário "vê" o layout antes dos dados chegarem, eliminando surpresa. Manter elementos interativos funcionais respeita a agência do usuário durante a espera.

## Do

- Espelhar exatamente a estrutura do conteúdo final no skeleton
- Manter busca e filtros interativos durante loading
- Usar animação shimmer sutil (não distrativa)
- Implementar timeouts com feedback progressivo (5s, 15s)
- Transicionar sem layout shift (skeleton → conteúdo)

## Don't

- Usar spinner centralizado para loading de listas
- Bloquear toda a interface durante carregamento
- Exibir skeleton por menos de 300ms (causa flash)
- Usar quantidade de skeletons diferente do grid real
- Ignorar timeout — loading infinito sem feedback é inaceitável

---

# Formulário Simples

## Objetivo

Coletar dados do usuário de forma rápida e sem erros, organizando campos em grupos lógicos com validação inline e uma única ação de submissão clara.

## Quando usar

- Cadastro de informações pessoais ou preferências
- Edição de perfil ou configurações
- Formulários com até 8 campos
- Quando todos os campos podem ser exibidos em uma única tela sem scroll excessivo

## Quando não usar

- Formulários com mais de 8 campos ou 3+ grupos lógicos (usar Multi-step Form)
- Processos que exigem revisão antes do envio (usar Multi-step Form)
- Coleta de dados em contexto de conversa (usar chat/wizard)
- Quando o usuário não está autenticado e o formulário exige dados sensíveis

## Estrutura da Interface

**Região 1 — Cabeçalho do formulário**
- Título descritivo (o que o formulário faz)
- Descrição breve do propósito (1–2 linhas)

**Região 2 — Grupos de campos**
- Campos organizados em seções semânticas com heading de grupo
- Cada campo: label (acima) + input + helper text (abaixo, opcional)
- Campos obrigatórios marcados com asterisco (*)
- Legenda de obrigatoriedade no final dos grupos

**Região 3 — Barra de ações**
- Alinhada à direita
- Botão secundário: "Cancelar" (outlined/ghost)
- Botão primário: "Enviar" (filled, cor principal) — único por formulário

## Componentes necessários

- Form Title
- Form Description
- Field Group (com heading)
- Label
- Text Input
- Select / Dropdown
- Textarea
- Helper Text
- Error Message (inline)
- Button Primary ("Enviar")
- Button Secondary ("Cancelar")
- Spinner (para estado de submissão)

## Hierarquia visual

1. Título do formulário (contexto)
2. Grupos de campos (organização lógica)
3. Labels (identificação de cada campo)
4. Inputs (área de interação)
5. Barra de ações (conclusão)

## Interações

| Ação do usuário | Resposta do sistema |
|-----------------|---------------------|
| Foca em campo | Borda do input destaca (cor primária) |
| Sai do campo (blur) | Validação inline é executada |
| Preenche campo obrigatório corretamente | Indicador de sucesso (✓ verde, opcional) |
| Preenche campo com erro | Erro inline abaixo do campo (ícone + mensagem) |
| Clica "Enviar" | Valida todos os campos → submete ou exibe erros |
| Clica "Cancelar" | Retorna à tela anterior (sem confirmação se form vazio) |

## Estados

### Loading
- Spinner substitui texto do botão "Enviar" → "Enviando..."
- Todos os campos desabilitados durante submissão
- Navegação bloqueada até conclusão

### Empty
- Estado inicial: campos vazios com placeholders informativos
- Nenhum indicador de validação visível
- Botão primário habilitado (validação no submit) ou desabilitado (validação progressiva)

### Error
- Erros inline abaixo do campo: ícone ⚠ + mensagem descritiva em vermelho
- Borda do campo muda para vermelho
- Scroll automático para o primeiro campo com erro
- Resumo de erros no topo do formulário (opcional, para forms com muitos campos)
- Focus move para primeiro campo com erro

### Success
- Feedback via toast: "Dados enviados com sucesso."
- Redirecionamento para tela de confirmação ou listagem
- Formulário limpo ou desabilitado após sucesso

## Responsividade

| Viewport | Comportamento |
|----------|---------------|
| Desktop | Campos em coluna única (max-width 600px centralizado) ou 2 colunas para campos curtos |
| Tablet | Coluna única, full-width com padding lateral |
| Mobile | Coluna única, inputs full-width, barra de ações sticky no bottom |

## Acessibilidade

- Labels associados via `for`/`id` (nunca placeholder-only)
- Campos obrigatórios com `aria-required="true"`
- Mensagens de erro vinculadas via `aria-describedby`
- Grupos de campos em `<fieldset>` com `<legend>`
- Focus move para primeiro erro após submit falho
- Botão de submit anuncia estado de loading via `aria-live`
- Tab order segue ordem visual dos campos

## UX Rationale

Agrupamento lógico reduz carga cognitiva — o usuário processa informação em chunks. Labels persistentes (acima do campo) evitam perda de contexto durante digitação. Validação onBlur fornece feedback no momento natural de pausa sem interromper o fluxo de preenchimento. Ação primária única elimina ambiguidade sobre o que acontece ao clicar.

## Do

- Usar labels visíveis acima de cada campo (nunca apenas placeholder)
- Agrupar campos relacionados com headings de seção
- Validar onBlur (ao sair do campo)
- Marcar campos obrigatórios com asterisco (*)
- Fornecer helper text para formatos esperados (ex: "nome@email.com")
- Manter uma única ação primária por formulário
- Scroll para primeiro erro após submit falho

## Don't

- Usar placeholder como substituto de label
- Validar enquanto o usuário ainda está digitando (onChange para texto)
- Colocar dois botões primários (filled) na barra de ações
- Exigir confirmação ao cancelar formulário vazio
- Desabilitar botão de submit sem explicar o motivo
- Usar modal para exibir erros de validação

---

# Formulário Multi-etapas

## Objetivo

Dividir processos complexos de coleta de dados em etapas sequenciais gerenciáveis, reduzindo a complexidade percebida e aumentando a taxa de conclusão.

## Quando usar

- Formulários com mais de 8 campos
- Processos com 3 ou mais grupos lógicos distintos
- Quando é necessária revisão antes do envio final
- Cadastros completos (onboarding, checkout, inscrição)
- Quando campos de uma etapa dependem de respostas anteriores

## Quando não usar

- Formulários com menos de 8 campos (usar Formulário Simples)
- Quando todas as informações são do mesmo grupo lógico
- Edição rápida de poucos campos
- Quando o usuário precisa ver todos os campos simultaneamente para tomar decisão

## Estrutura da Interface

**Região 1 — Stepper de progresso**
- Indicador visual de etapas: numeradas com labels
- Estados do step: completo (✓), atual (●), pendente (○)
- Posição: topo da área de conteúdo, abaixo do header

**Região 2 — Conteúdo da etapa**
- Título da etapa atual
- Campos do formulário (3–5 por etapa)
- Segue regras do pattern Formulário Simples para campos individuais

**Região 3 — Navegação entre etapas**
- Botão secundário: "Voltar" (esquerda)
- Botão primário: "Próximo" (direita) — muda para "Enviar" na última etapa
- Indicador textual: "Etapa X de Y"

**Região 4 — Etapa final (Revisão)**
- Resumo de todos os dados inseridos, organizados por etapa
- Possibilidade de editar cada seção (link "Editar" por grupo)
- Botão primário: "Enviar" / "Confirmar"

## Componentes necessários

- Stepper (horizontal)
- Step Indicator (completo, atual, pendente, erro)
- Form Fields (por etapa)
- Button Primary ("Próximo" / "Enviar")
- Button Secondary ("Voltar")
- Step Counter ("Etapa X de Y")
- Review Summary
- Edit Link (por seção no resumo)
- Spinner (submissão)
- Inline Error

## Hierarquia visual

1. Stepper (orientação e progresso)
2. Título da etapa (contexto imediato)
3. Campos (interação principal)
4. Navegação (avanço/retorno)
5. Contador de etapas (reforço de posição)

## Interações

| Ação do usuário | Resposta do sistema |
|-----------------|---------------------|
| Clica "Próximo" | Valida etapa atual → avança se válido |
| Clica "Voltar" | Retorna à etapa anterior (dados preservados) |
| Clica em step completo no stepper | Navega para aquela etapa (dados preservados) |
| Clica "Enviar" (última etapa) | Submete todos os dados |
| Clica "Editar" no resumo | Navega para etapa correspondente |

## Estados

### Loading
- Spinner no botão "Próximo" ou "Enviar" durante transição/submissão
- Stepper permanece visível e estático
- Campos desabilitados durante processamento

### Empty
- Estado inicial de cada etapa: campos vazios com placeholders
- Stepper mostra apenas primeira etapa como atual, demais como pendentes

### Error
- Erros inline por campo na etapa atual (mesmo padrão do Formulário Simples)
- Stepper marca etapa com erro: ícone de alerta (⚠) substituindo número
- Bloqueio de avanço: não permite ir para próxima etapa com erros
- Focus no primeiro campo com erro

### Success
- Toast: "Dados enviados com sucesso."
- Redirecionamento para tela de confirmação
- Stepper mostra todas as etapas como completas (✓)

## Responsividade

| Viewport | Comportamento |
|----------|---------------|
| Desktop | Stepper horizontal, campos em coluna única (max-width 600px) |
| Tablet | Stepper horizontal compacto (apenas números), campos full-width |
| Mobile | Stepper simplificado (apenas "Etapa X de Y" textual), campos full-width, botões sticky no bottom |

## Acessibilidade

- Stepper com `aria-current="step"` na etapa ativa
- Transição de etapa anunciada: "Etapa 2 de 4: Endereço"
- Focus move para primeiro campo da nova etapa ao avançar
- "Voltar" não requer confirmação
- Steps completos com `aria-label="Etapa 1: Dados Pessoais — completa, clique para editar"`
- Progresso comunicado via `aria-label` no stepper

## UX Rationale

Dividir formulários longos em etapas de 3–5 campos reduz a percepção de esforço. O stepper visual fornece senso de progresso e controle — o usuário sabe onde está e quanto falta. Validação por etapa evita acúmulo de erros no final. Persistência de dados entre etapas respeita o esforço já investido. Etapa de revisão antes do envio final constrói confiança.

## Do

- Limitar cada etapa a 3–5 campos
- Manter dados ao navegar entre etapas (nunca perder preenchimento)
- Permitir navegação para etapas anteriores via stepper
- Incluir etapa de revisão antes do envio final
- Validar por etapa (bloquear avanço com erros)
- Mostrar progresso claro (stepper + contador textual)

## Don't

- Criar mais de 5 etapas (redesenhar se necessário)
- Perder dados ao clicar "Voltar"
- Permitir avanço com campos obrigatórios vazios
- Esconder o stepper em qualquer viewport
- Usar "Cancelar" que descarta todas as etapas sem confirmação
- Validar apenas no final (acumular erros de todas as etapas)

---

# Validação de Formulário

## Objetivo

Fornecer feedback imediato, inline e descritivo sobre a validade dos dados inseridos, permitindo correção rápida e reduzindo ciclos de erro.

## Quando usar

- Todos os formulários do sistema (simples e multi-etapas)
- Campos com formato específico (e-mail, CPF, telefone, senha)
- Campos obrigatórios
- Validações assíncronas (verificar unicidade de e-mail, disponibilidade de username)

## Quando não usar

- Campos puramente opcionais sem restrição de formato
- Campos de texto livre sem limite (observações, comentários abertos)
- Busca (não validar formato do termo de busca)

## Estrutura da Interface

**Região 1 — Resumo de erros (condicional)**
- Banner no topo do formulário após tentativa de submit com erros
- Ícone ⚠ + mensagem: "Corrija os erros abaixo para continuar"
- Aparece apenas após submit, não durante preenchimento

**Região 2 — Campo com validação**
- Label + Input com indicador de estado na borda
- Ícone de status à direita do input: ✓ (válido) ou ✗ (inválido)
- Mensagem de erro abaixo do input: ícone + texto descritivo
- Helper text abaixo do input: formato esperado (pré-erro)

**Região 3 — Validação de senha (caso especial)**
- Checklist de requisitos abaixo do campo
- Cada requisito com status individual: ✓ atendido / ✗ pendente
- Atualização em tempo real (onChange)

## Componentes necessários

- Error Banner (resumo no topo)
- Field Error Message (inline, abaixo do campo)
- Field Success Indicator (✓ verde)
- Field Error Indicator (✗ vermelho)
- Helper Text (formato esperado)
- Password Checklist
- Async Validation Spinner (inline)
- Input States (neutral, focus, valid, invalid, disabled)

## Hierarquia visual

1. Resumo de erros no topo (visão geral — apenas pós-submit)
2. Indicadores de campo (✓/✗ — status individual)
3. Mensagens de erro (orientação para correção)
4. Helper text (prevenção de erro)

## Interações

| Ação do usuário | Resposta do sistema |
|-----------------|---------------------|
| Sai do campo (blur) — campo de texto | Valida e exibe resultado (✓ ou ✗ + mensagem) |
| Digita em campo de senha (change) | Atualiza checklist de requisitos em tempo real |
| Tenta submit com erros | Exibe resumo no topo + scroll para primeiro erro + focus |
| Corrige campo com erro | Remove erro inline imediatamente (onBlur ou onChange) |
| Campo com validação assíncrona | Spinner inline durante verificação |

## Estados

### Loading
- Spinner inline no campo durante validação assíncrona
- Campo permanece editável durante verificação
- Mensagem: "Verificando..." (opcional)

### Empty
- Campos neutros: borda padrão, sem ícones de validação
- Nenhum feedback visual até primeira interação (blur)
- Helper text visível para campos com formato específico

### Error
- Borda do input: vermelho
- Ícone ✗ à direita do input
- Mensagem abaixo: ícone ⚠ + texto descritivo e acionável
- Resumo no topo (apenas após submit)
- Focus automático no primeiro campo com erro (após submit)

### Success
- Borda do input: verde (sutil)
- Ícone ✓ à direita do input
- Sem mensagem adicional (sucesso é silencioso)

## Responsividade

| Viewport | Comportamento |
|----------|---------------|
| Desktop | Mensagens de erro abaixo do campo, ícones à direita do input |
| Tablet | Mesmo comportamento |
| Mobile | Mensagens de erro abaixo do campo (full-width), ícones à direita |

## Acessibilidade

- Mensagens de erro vinculadas ao campo via `aria-describedby`
- Campo inválido com `aria-invalid="true"`
- Resumo de erros com `role="alert"` (anúncio imediato)
- Cor nunca é o único indicador (sempre acompanhada de ícone + texto)
- Focus gerenciado: primeiro erro recebe focus após submit
- Checklist de senha com `aria-live="polite"` para atualizações
- Contraste mínimo WCAG AA em mensagens de erro

## UX Rationale

Validação onBlur fornece feedback no momento natural de pausa (saída do campo) sem interromper digitação. Mensagens descritivas e acionáveis ("Insira um e-mail válido, ex: nome@site.com") eliminam adivinhação. Checklist de senha com status individual reduz tentativas frustradas. Resumo no topo após submit dá visão geral sem substituir feedback inline.

## Do

- Validar onBlur para campos de texto, onChange para senha
- Usar mensagens descritivas com exemplo do formato esperado
- Combinar cor + ícone + texto (nunca cor sozinha)
- Exibir helper text preventivo antes do erro ocorrer
- Mover focus para primeiro erro após submit falho
- Remover indicador de erro assim que o campo for corrigido

## Don't

- Validar enquanto o usuário ainda digita (exceto senha)
- Exibir validação em campos não tocados
- Usar mensagens genéricas ("Campo inválido", "Erro")
- Usar apenas cor para indicar estado (inacessível)
- Exibir erros em tooltip ou modal
- Manter indicador de erro após correção do campo

---

# Modal de Confirmação

## Objetivo

Prevenir execução acidental de ações críticas ou irreversíveis, exigindo confirmação explícita do usuário antes de prosseguir.

## Quando usar

- Exclusão de dados (itens, contas, arquivos)
- Envio irreversível (publicação, submissão final)
- Ações com impacto em outros usuários
- Cancelamento de processos em andamento
- Qualquer ação que não pode ser desfeita

## Quando não usar

- Confirmação de ações reversíveis (editar, salvar rascunho)
- Navegação entre páginas
- Fechamento de formulários vazios
- Ações de baixo impacto (favoritar, curtir)
- Feedback de sucesso (usar Toast)

## Estrutura da Interface

**Região 1 — Overlay**
- Fundo escurecido (semi-transparente) cobrindo toda a tela
- Clique no overlay fecha o modal (ação segura = cancelar)

**Região 2 — Container do modal**
- Centralizado vertical e horizontalmente
- Largura máxima: 480px
- Botão de fechar "✕" no canto superior direito

**Região 3 — Conteúdo**
- Ícone de alerta (⚠) + Título descritivo da ação
- Corpo: identifica o item afetado (nome/título) + descreve consequências
- Texto de consequência: "Esta ação não pode ser desfeita."

**Região 4 — Barra de ações**
- Botão secundário: "Cancelar" (esquerda, outlined/ghost)
- Botão primário destrutivo: "Excluir" / "Confirmar" (direita, cor de alerta/vermelho)

## Componentes necessários

- Modal Overlay
- Modal Container
- Close Button ("✕")
- Alert Icon
- Modal Title
- Modal Body Text
- Button Secondary ("Cancelar")
- Button Destructive ("Excluir" — vermelho/alerta)
- Spinner (estado de processamento)
- Inline Error Message

## Hierarquia visual

1. Título com ícone de alerta (gravidade da ação)
2. Identificação do item afetado (o que será impactado)
3. Consequências (o que acontece se confirmar)
4. Ações (cancelar vs. confirmar)

## Interações

| Ação do usuário | Resposta do sistema |
|-----------------|---------------------|
| Clica "Cancelar" | Fecha modal, nenhuma ação executada |
| Clica "✕" | Fecha modal (mesmo que cancelar) |
| Clica no overlay | Fecha modal (mesmo que cancelar) |
| Pressiona Escape | Fecha modal (mesmo que cancelar) |
| Clica botão destrutivo | Executa ação, exibe loading |
| Pressiona Enter | NÃO executa ação destrutiva (segurança) |
| Pressiona Tab | Cicla focus dentro do modal (focus trap) |

## Estados

### Loading
- Spinner substitui texto do botão destrutivo
- Ambos os botões desabilitados
- Modal permanece aberto até conclusão ou erro
- Overlay não-dismissível durante processamento

### Empty
- N/A — modal sempre tem conteúdo contextual

### Error
- Mensagem inline dentro do modal: "Erro ao executar ação. Tente novamente."
- Botões reabilitados para nova tentativa
- Modal não fecha automaticamente em caso de erro

### Success
- Modal fecha
- Toast de sucesso: "Item excluído com sucesso."
- Tela atualiza (item removido da lista)

## Responsividade

| Viewport | Comportamento |
|----------|---------------|
| Desktop | Modal centralizado, max-width 480px |
| Tablet | Modal centralizado, max-width 480px |
| Mobile | Modal como bottom sheet (sobe do rodapé) ou full-width com padding |

## Acessibilidade

- `role="dialog"` com `aria-modal="true"`
- `aria-labelledby` apontando para o título do modal
- Focus trap: Tab/Shift+Tab cicla apenas dentro do modal
- Focus inicial no botão "Cancelar" (ação segura)
- Focus retorna ao elemento que abriu o modal ao fechar
- Escape fecha o modal
- Botão destrutivo com `aria-label` descritivo: "Excluir [nome do item]"
- Overlay com `aria-hidden="true"` para conteúdo de fundo

## UX Rationale

Fricção deliberada em momentos críticos previne erros custosos. Identificar o item afetado por nome evita exclusões do item errado. Cor de alerta (vermelho) no botão destrutivo cria pausa visual — diferencia da ação primária padrão (azul). Focus trap garante que usuários de teclado não interajam acidentalmente com o fundo. Enter não executar ação destrutiva é uma camada extra de segurança.

## Do

- Identificar claramente O QUE será afetado (nome do item)
- Descrever as consequências da ação
- Usar cor de alerta (vermelho) para ação destrutiva
- Implementar focus trap completo
- Manter modal aberto durante processamento e em caso de erro
- Permitir múltiplas formas de cancelar (✕, overlay, Escape, botão)

## Don't

- Usar modal para confirmações de baixo impacto
- Executar ação destrutiva com Enter (apenas clique explícito)
- Fechar modal automaticamente em caso de erro
- Usar cor primária padrão (azul) para ação destrutiva
- Omitir o nome do item afetado
- Permitir interação com conteúdo de fundo enquanto modal está aberto

---

# Feedback de Ação

## Objetivo

Comunicar o resultado de ações do usuário (sucesso, erro, alerta) de forma imediata, clara e não-obstrutiva, fechando o ciclo ação → resposta.

## Quando usar

- Após submissão de formulário (sucesso ou erro)
- Após ação destrutiva confirmada (exclusão concluída)
- Após salvamento automático ou manual
- Para alertas do sistema (sessão expirando, manutenção)
- Após qualquer ação que modifica dados

## Quando não usar

- Durante loading (feedback é pós-ação)
- Para erros de validação de campo (usar Validação inline)
- Para estados vazios (usar Empty State)
- Para erros de página inteira / 404 / 500 (usar Error Page)

## Estrutura da Interface

**Variante 1 — Toast Notification**
- Posição: canto superior direito (fixo)
- Estrutura: ícone de status + mensagem + botão dismiss "✕"
- Empilhamento: vertical (mais recente no topo), máximo 3 visíveis

**Variante 2 — Inline Feedback**
- Posição: próximo à ação que gerou o feedback
- Estrutura: ícone de status + mensagem + CTA opcional (retry)
- Contexto: dentro do fluxo da página, não flutuante

**Tipos de feedback:**

| Tipo | Cor | Ícone | Comportamento |
|------|-----|-------|---------------|
| Sucesso | Verde | ✓ | Auto-dismiss 5s |
| Erro | Vermelho | ✗ | Persistente (não auto-dismiss) |
| Alerta | Amarelo/Laranja | ⚠ | Dismissível pelo usuário |
| Informativo | Azul | ℹ | Dismissível pelo usuário |

## Componentes necessários

- Toast Container (posição fixa, gerencia stack)
- Toast Item (ícone + mensagem + dismiss)
- Inline Alert (ícone + mensagem + CTA opcional)
- Dismiss Button ("✕")
- Retry Button (para erros)
- Animation (slide-in, fade-out)

## Hierarquia visual

1. Ícone de status (reconhecimento imediato do tipo)
2. Mensagem (o que aconteceu)
3. Ação (o que fazer — apenas para erros)
4. Dismiss (controle do usuário)

## Interações

| Ação do usuário | Resposta do sistema |
|-----------------|---------------------|
| Nenhuma (sucesso) | Toast aparece, auto-dismiss em 5s |
| Clica "✕" no toast | Toast é removido imediatamente |
| Nenhuma (erro) | Toast persiste até ação do usuário |
| Clica "Tentar novamente" | Refaz ação, exibe loading |
| Múltiplas ações rápidas | Toasts empilham (máximo 3 visíveis) |

**Animações:**
- Entrada: slide-in da direita (300ms, ease-out)
- Saída: fade-out (200ms, ease-in)
- Auto-dismiss: fade-out após 5s

## Estados

### Loading
- N/A — feedback aparece após conclusão da ação

### Empty
- N/A — feedback é contextual, não é estado de tela

### Error
- Toast de erro: mensagem clara + CTA de retry
- Persistente: não desaparece sozinho
- Cor vermelha + ícone ✗
- Exemplo: "Falha ao salvar. Tente novamente. [Tentar]"

### Success
- Toast de sucesso: mensagem de confirmação
- Auto-dismiss em 5s
- Cor verde + ícone ✓
- Exemplo: "Dados salvos com sucesso."

## Responsividade

| Viewport | Comportamento |
|----------|---------------|
| Desktop | Toast no canto superior direito, largura fixa (360px) |
| Tablet | Toast no canto superior direito, largura fixa (320px) |
| Mobile | Toast full-width no topo da tela (abaixo do header) |

## Acessibilidade

- Toast de sucesso: `role="status"` com `aria-live="polite"`
- Toast de erro: `role="alert"` com `aria-live="assertive"`
- Botão dismiss com `aria-label="Fechar notificação"`
- Cor nunca é o único diferenciador (sempre ícone + texto)
- Toast não rouba focus da tarefa atual
- Inline feedback associado à ação via proximidade visual
- Animações respeitam `prefers-reduced-motion`

## UX Rationale

Feedback imediato fecha o ciclo cognitivo ação → resultado. O usuário precisa saber que sua ação foi processada. Diferenciação visual consistente (cor + ícone + comportamento) permite reconhecimento instantâneo sem leitura. Erros persistentes garantem que falhas críticas não passem despercebidas. Sucesso auto-dismiss respeita o fluxo sem exigir ação adicional.

## Do

- Usar toast para ações globais (salvar, excluir, enviar)
- Usar inline para feedback contextual (próximo à ação)
- Auto-dismiss apenas para sucesso (5s)
- Persistir erros até ação do usuário
- Incluir CTA de retry em feedbacks de erro
- Empilhar toasts verticalmente (máximo 3)
- Manter mensagens curtas e acionáveis

## Don't

- Auto-dismiss toasts de erro
- Usar alert/confirm nativo do browser para feedback
- Exibir mais de 3 toasts simultaneamente
- Usar toast para erros de validação de campo (usar inline no campo)
- Bloquear interação com a página durante feedback de sucesso
- Usar mensagens vagas ("Erro" sem contexto ou orientação)

---

# Ação Principal da Tela

## Objetivo

Garantir hierarquia clara de ações em cada interface, destacando uma única ação primária por tela para direcionar o comportamento do usuário e eliminar ambiguidade.

## Quando usar

- Toda tela do sistema deve aplicar este pattern
- Listagens (ação: "Criar novo")
- Formulários (ação: "Enviar" / "Salvar")
- Detalhes (ação: "Editar" / "Compartilhar")
- Modais (ação: "Confirmar" / "Excluir")

## Quando não usar

- N/A — este é um pattern universal obrigatório
- Exceção: telas puramente informativas sem ação do usuário (ex: página de status)

## Estrutura da Interface

**Hierarquia de botões (3 níveis):**

| Nível | Estilo | Uso | Quantidade |
|-------|--------|-----|------------|
| Primário | Filled, cor principal, maior destaque | Ação principal da tela | Exatamente 1 |
| Secundário | Outlined ou ghost, cor neutra | Ações complementares | 1–2 |
| Terciário | Text-only, menor destaque | Ações de baixa prioridade | Conforme necessário |

**Posicionamento por contexto:**

| Contexto | Posição da ação primária |
|----------|--------------------------|
| Formulários | Direita inferior da barra de ações |
| Listagens | Topo direito (acima da lista) |
| Detalhes | Topo direito ou barra de ações inferior |
| Modais | Direita inferior do modal |

## Componentes necessários

- Button Primary (filled, cor principal)
- Button Secondary (outlined ou ghost)
- Button Tertiary (text-only / link)
- Button Loading State (spinner + texto progressivo)
- Button Disabled State (opacidade reduzida + tooltip)

## Hierarquia visual

1. Botão primário (maior peso visual, cor de destaque, maior padding)
2. Botão secundário (peso médio, borda ou transparente)
3. Botão terciário (menor peso, apenas texto)

## Interações

| Ação do usuário | Resposta do sistema |
|-----------------|---------------------|
| Clica botão primário | Executa ação principal (com loading se assíncrono) |
| Hover no botão primário | Leve mudança de tom (darken ou lighten) |
| Botão em loading | Spinner substitui texto, botão desabilitado |
| Botão desabilitado | Cursor not-allowed, tooltip explica motivo |
| Ação concluída | Feedback via Toast ou navegação |

## Estados

### Loading
- Spinner substitui texto do botão primário
- Texto muda para verbo progressivo: "Salvando...", "Enviando...", "Excluindo..."
- Botão desabilitado (previne double-click)
- Botões secundários também desabilitados durante processamento

### Empty
- Botão primário pode estar desabilitado se pré-condições não atendidas
- Tooltip ou helper text explica o que é necessário para habilitar
- Exemplo: "Preencha os campos obrigatórios para enviar"

### Error
- Botão reabilitado após erro (permite retry)
- Feedback de erro via Toast ou inline (não no botão)
- Estado visual do botão retorna ao padrão

### Success
- Feedback via Toast de sucesso
- Botão pode retornar ao estado padrão ou tela navega

## Responsividade

| Viewport | Comportamento |
|----------|---------------|
| Desktop | Botões na posição padrão por contexto (ver tabela acima) |
| Tablet | Mesmo posicionamento, touch targets mínimos de 44×44px |
| Mobile | Botão primário pode ser sticky no bottom da tela (full-width) |

## Acessibilidade

- Label do botão: verbo + substantivo (ex: "Criar projeto", não apenas "Criar")
- Botão desabilitado com `aria-disabled="true"` + explicação acessível
- Loading anunciado via `aria-live="polite"`: "Salvando dados"
- Touch target mínimo: 44×44px
- Contraste mínimo WCAG AA entre texto do botão e fundo
- Hierarquia comunicada por peso visual (não apenas cor)

## UX Rationale

Uma única ação primária por tela elimina paralisia de decisão — o usuário sabe imediatamente o que o sistema espera dele. Hierarquia visual consistente (primário > secundário > terciário) guia o olhar naturalmente para a ação mais importante. Posicionamento previsível por contexto cria memória muscular entre telas.

## Do

- Manter exatamente UM botão primário por tela
- Usar verbo + substantivo no label ("Salvar alterações", não "Salvar")
- Posicionar consistentemente por tipo de tela
- Usar spinner dentro do botão durante loading
- Mudar texto para progressivo durante loading ("Salvando...")
- Explicar via tooltip por que o botão está desabilitado

## Don't

- Colocar dois botões filled/primários na mesma tela
- Usar labels vagos ("OK", "Sim", "Continuar" sem contexto)
- Esconder o botão primário abaixo do fold sem indicação
- Desabilitar sem explicar o motivo
- Usar o mesmo peso visual para ações primárias e secundárias
- Mudar a posição do botão primário entre telas do mesmo tipo

---

# Regras Globais do Sistema

Estas regras operam como contratos de governança. Aplicam-se a todos os patterns e todas as telas do sistema sem exceção.

---

## Hierarquia de Ações

| Regra | Descrição |
|-------|-----------|
| Uma ação primária por tela | Nunca dois botões filled/primários na mesma interface |
| Primário > Secundário > Terciário | Peso visual decrescente, sempre respeitado |
| Posição consistente | Formulários: direita inferior. Listagens: topo direito. Modais: direita inferior |
| Labels acionáveis | Verbo + substantivo (ex: "Criar projeto", "Excluir item") |
| Destrutivo ≠ Primário padrão | Ações destrutivas usam cor de alerta (vermelho), nunca cor primária (azul) |

---

## Regras de Loading

| Contexto | Tipo de loading | Regra |
|----------|-----------------|-------|
| Listas e grids | Skeleton screen | Sempre skeleton, nunca spinner |
| Ações de botão | Spinner inline | Spinner dentro do botão + texto progressivo |
| Validação assíncrona | Spinner inline no campo | Campo permanece editável |
| Navegação entre páginas | Progress bar no topo | Sutil, não-bloqueante |
| Ações <300ms | Nenhum indicador | Não exibir loading para ações instantâneas |

**Timeouts obrigatórios:**
- 5 segundos: exibir mensagem "Ainda carregando..."
- 15 segundos: exibir botão de retry
- Nunca: loading infinito sem escape

---

## Feedbacks

| Tipo | Formato | Comportamento | Cor | Ícone |
|------|---------|---------------|-----|-------|
| Sucesso | Toast | Auto-dismiss 5s | Verde | ✓ |
| Erro | Toast | Persistente (não auto-dismiss) | Vermelho | ✗ |
| Alerta | Toast ou Inline | Dismissível pelo usuário | Amarelo/Laranja | ⚠ |
| Informativo | Inline | Dismissível pelo usuário | Azul | ℹ |

**Regras:**
- Toda ação do usuário recebe feedback do sistema (nunca silêncio)
- Erros nunca desaparecem sozinhos
- Sucesso não exige ação do usuário
- Máximo 3 toasts visíveis simultaneamente
- Posição: toasts no canto superior direito (mobile: topo full-width)

---

## Empty States

| Regra | Descrição |
|-------|-----------|
| Nunca tela em branco | Todo estado vazio é um estado desenhado |
| Sempre incluir | Ilustração + mensagem contextual + pelo menos 1 CTA |
| Mensagem contextual | Referenciar o que o usuário fez (termo buscado, filtro aplicado) |
| CTAs construtivos | Oferecer caminhos de recuperação (limpar filtros, explorar alternativas) |
| Controles preservados | Busca e filtros permanecem visíveis e editáveis |
| Estilo consistente | Mesma linguagem visual de ilustração em todos os empty states |

---

## Validação

| Regra | Descrição |
|-------|-----------|
| Timing — texto | onBlur (ao sair do campo) |
| Timing — senha | onChange (em tempo real) |
| Timing — submit | Validação completa ao tentar enviar |
| Display | Sempre inline, abaixo do campo |
| Indicadores | Cor + ícone + texto (nunca cor sozinha) |
| Mensagens | Descritivas e acionáveis (incluir formato esperado) |
| Campos não tocados | Nenhum indicador de validação |
| Após correção | Remover erro imediatamente |
| Focus | Mover para primeiro erro após submit falho |
| Resumo | Banner no topo apenas após tentativa de submit |

---

## Modais

| Regra | Descrição |
|-------|-----------|
| Uso exclusivo | Apenas para ações críticas e irreversíveis |
| Focus trap | Tab cicla apenas dentro do modal |
| Dismiss | ✕, overlay click, Escape — todos fecham |
| Enter | NÃO executa ação destrutiva |
| Identificação | Sempre nomear o item afetado |
| Consequências | Sempre descrever o que acontece |
| Cor destrutiva | Vermelho/alerta para ações irreversíveis |
| Erro | Modal permanece aberto, mensagem inline |
| Loading | Modal permanece aberto, botões desabilitados |
| Focus de retorno | Ao fechar, focus volta ao elemento que abriu |

---

## Acessibilidade

| Regra | Aplicação |
|-------|-----------|
| Labels de formulário | Sempre visíveis acima do campo, associados via `for`/`id` |
| Campos obrigatórios | `aria-required="true"` + asterisco visual |
| Erros | `aria-describedby` + `aria-invalid="true"` |
| Modais | `role="dialog"` + `aria-modal="true"` + focus trap |
| Regiões dinâmicas | `aria-live="polite"` (sucesso) ou `aria-live="assertive"` (erro) |
| Contraste | Mínimo WCAG AA (4.5:1 texto, 3:1 elementos gráficos) |
| Touch targets | Mínimo 44×44px |
| Animações | Respeitar `prefers-reduced-motion` |
| Navegação por teclado | Todos os elementos interativos acessíveis via Tab |
| Cor como indicador | Nunca usar cor como único diferenciador |

---

## Comportamento Responsivo

| Elemento | Desktop (>1024px) | Tablet (768–1024px) | Mobile (<768px) |
|----------|-------------------|---------------------|-----------------|
| Grid de cards | 3 colunas | 2 colunas | 1 coluna |
| Formulários | Coluna única (max 600px) | Full-width com padding | Full-width, inputs 100% |
| Filtros | Inline (dropdowns) | Inline (compactos) | Bottom sheet ou modal |
| Modais | Centralizado (max 480px) | Centralizado (max 480px) | Bottom sheet ou full-width |
| Toasts | Top-right (360px) | Top-right (320px) | Full-width no topo |
| Botão primário | Posição padrão | Posição padrão | Sticky bottom (opcional) |
| Stepper | Horizontal com labels | Horizontal (números) | Textual ("Etapa X de Y") |
| Busca | Sempre visível | Sempre visível | Ícone expansível (opcional) |

---

## Cores Semânticas de Estado

| Estado | Cor | Uso |
|--------|-----|-----|
| Sucesso | Verde | Confirmação de ação concluída, campo válido |
| Erro | Vermelho | Falha, campo inválido, ação destrutiva |
| Alerta | Amarelo/Laranja | Aviso, atenção necessária |
| Informativo | Azul | Dica, informação contextual |
| Neutro | Cinza | Estado padrão, desabilitado, placeholder |

---

## Transições entre Estados

| De | Para | Comportamento |
|----|------|---------------|
| Loading → Success | Skeleton fade-out, conteúdo fade-in (sem layout shift) |
| Loading → Empty | Skeleton fade-out, empty state fade-in |
| Loading → Error | Skeleton desaparece, mensagem de erro aparece |
| Action → Loading | Spinner no botão, campos desabilitados |
| Action → Success | Toast de sucesso, navegação ou reset |
| Action → Error | Toast de erro persistente, botão reabilitado |
| Modal open | Focus trap ativado, overlay aparece |
| Modal close | Focus retorna ao trigger, overlay desaparece |

---

*Esta documentação serve como fonte única de verdade para patterns de interface. Todos os patterns seguem a mesma estrutura, as mesmas regras de estado e os mesmos princípios de acessibilidade. Qualquer nova tela gerada — por designer, desenvolvedor ou IA — deve respeitar estas regras como contratos invioláveis.*
