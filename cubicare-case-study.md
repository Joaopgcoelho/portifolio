# CubiCare — Case Study de Refatoração de Produto

## ETAPA 1 — DIAGNÓSTICO COMPLETO

---

### O que é o CubiCare (estado atual)

Um sistema de controle alimentar infantil baseado em **batch cooking** (cozinhar em lote). O conceito central: pais preparam alimentos em cubos congelados de 25ml, organizados por grupos nutricionais (proteína, leguminosa, vegetal A, vegetal B, carboidrato, fruta). O app gerencia estoque, produção, refeições e compras.

**Stack:** React 18 + TypeScript + Tailwind CSS 4 + Radix UI + Vite  
**Estilo visual:** iOS-inspired (glass morphism, SF Pro, safe areas)

---

### Problemas de UX Identificados

| # | Problema | Impacto |
|---|----------|---------|
| 1 | **Sem onboarding** — o app abre direto no Dashboard vazio, sem explicar o conceito de "cubos" | Abandono imediato |
| 2 | **Splash screen de 3 segundos** sem propósito funcional | Frustração, sensação de lentidão |
| 3 | **Dashboard como home** sem hierarquia de ação — mostra dados mas não guia o próximo passo | Paralisia de decisão |
| 4 | **6 seções na nav** sem priorização — Estoque, Congelados, Refeições, Produção, Compras, Docs | Carga cognitiva alta |
| 5 | **Fluxo principal não é claro** — o ciclo é: Comprar → Produzir → Estocar → Montar Refeição, mas a UI não comunica isso | Usuário não entende a jornada |
| 6 | **Cardápio Fixo** é um modal gigante com 28 slots para preencher — UX de formulário pesada | Desistência no setup |
| 7 | **Ausência de empty states** significativos — "Nenhum dado" sem orientação | Usuário perdido |
| 8 | **Sem feedback de progresso** — não há senso de "missão cumprida" ou gamificação leve | Baixo engajamento |

### Problemas de UI Identificados

| # | Problema | Detalhe |
|---|----------|---------|
| 1 | **Excesso de componentes UI** — 49 componentes em `/ui` (muitos não usados) | Peso desnecessário, manutenção difícil |
| 2 | **Glass morphism excessivo** — tudo é `.glass`, perde hierarquia | Quando tudo brilha, nada se destaca |
| 3 | **Espaçamentos inconsistentes** — mix de `p-3`, `p-4`, `p-5`, `p-6` sem sistema | Ritmo visual quebrado |
| 4 | **Tipografia sem escala definida** — h1 a 2.5rem no CSS mas usado como 3xl/4xl inline | Conflito de fontes |
| 5 | **Cores de status sem contraste suficiente** — badges com `bg-success/10` em fundo glass | Acessibilidade comprometida |
| 6 | **Border radius inconsistente** — `rounded-xl`, `rounded-2xl`, `rounded-3xl`, `rounded-[2rem]` | Falta de padrão |
| 7 | **Sidebar com animações de entrada** desnecessárias em cada item | Performance e distração |
| 8 | **Bottom nav com 6 itens** — acima do recomendado (5 max) para mobile | Targets apertados |

### Problemas de Copy

| # | Problema | Exemplo atual |
|---|----------|---------------|
| 1 | **Tagline genérica** | "Controle alimentar estratégico" — não diz para quem nem o benefício |
| 2 | **Labels técnicos** | "Grupamento", "Gargalo Identificado", "Batch Cooking" — jargão |
| 3 | **Sem tom emocional** | Pais cuidando da alimentação dos filhos = contexto emocional ignorado |
| 4 | **CTAs sem urgência** | "Carregar Dados de Exemplo" — não comunica valor |
| 5 | **Descrição meta genérica** | "Sistema de controle estratégico de alimentação infantil baseado em batch cooking" |

---

## ETAPA 2 — RECONSTRUÇÃO DO POSICIONAMENTO

### Definição do Produto

| Aspecto | Definição |
|---------|-----------|
| **O que é** | Um app mobile-first que ajuda pais a organizar a alimentação dos filhos com o método de cubos congelados |
| **Para quem** | Pais e mães de crianças de 6 meses a 6 anos que praticam introdução alimentar ou batch cooking |
| **Problema que resolve** | A rotina de preparar refeições variadas e nutritivas todo dia é exaustiva e gera culpa quando não dá certo |
| **Benefício principal** | Saber exatamente o que tem pronto, o que precisa produzir, e montar refeições completas em 2 minutos |

### Proposta de Valor

> **"Refeições completas para seu filho, prontas em minutos."**
> 
> Organize cubos congelados por grupo nutricional, saiba quando produzir mais, e monte pratos equilibrados sem pensar.

### Tom de Voz

- Acolhedor mas prático
- Fala como uma amiga nutricionista, não como um sistema
- Celebra pequenas vitórias ("Semana toda coberta! 🎉")
- Evita jargão técnico — "cubos" sim, "batch cooking" não

---

## ETAPA 3 — NOVA ESTRUTURA (se fosse Landing Page / Onboarding)

Como o CubiCare é um **app** (não uma landing page), a reestruturação se aplica ao **onboarding flow** e à **hierarquia do Dashboard**:

### Novo Fluxo de Onboarding (primeira abertura)

```
1. HERO / WELCOME
   Headline: "Refeições completas para seu filho, prontas em minutos"
   Sub: "Organize seus cubos congelados e nunca mais se pergunte 'o que tem pra comer?'"
   CTA: "Começar" (único)
   Visual: Ilustração de cubos coloridos formando um prato

2. COMO FUNCIONA (3 passos)
   ① Cadastre seus cubos por grupo (proteína, vegetal, carboidrato...)
   ② O app calcula quantas refeições você tem prontas
   ③ Quando acabar, ele avisa o que produzir

3. SETUP RÁPIDO
   "Quantas refeições por dia?" → 2 (almoço + jantar)
   "Meta de cubos por grupo?" → 30 (sugestão padrão)
   CTA: "Pronto, vamos lá!"

4. DASHBOARD (com dados zerados + orientação)
   Empty state guiado: "Adicione seus primeiros cubos →"
```

### Nova Hierarquia do Dashboard

```
┌─────────────────────────────────────────┐
│ HEADER                                   │
│ "Olá! Você tem 12 refeições prontas"    │
│ Subtexto: "Suficiente para 6 dias"      │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ AÇÃO PRINCIPAL (se houver gargalo)       │
│ "Proteína acabando — produzir frango?"  │
│ [Registrar Produção]                     │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ VISÃO DO ESTOQUE (compacta)             │
│ 6 barras de progresso com cores         │
│ Tap para expandir detalhes              │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ ATALHOS RÁPIDOS                          │
│ [+ Registrar Refeição] [+ Produzir]     │
└─────────────────────────────────────────┘
```

---

## ETAPA 4 — REFATORAÇÃO DE UI (Design System)

### Sistema de Espaçamento (múltiplos de 8)

```css
--space-1: 4px;   /* micro ajustes */
--space-2: 8px;   /* gap mínimo */
--space-3: 12px;  /* padding interno compacto */
--space-4: 16px;  /* padding padrão */
--space-5: 24px;  /* separação de seções */
--space-6: 32px;  /* margem entre blocos */
--space-7: 48px;  /* separação de áreas */
--space-8: 64px;  /* topo/base de página */
```

**Regra:** Usar apenas `p-2`, `p-3`, `p-4`, `p-6`, `p-8` no Tailwind. Eliminar `p-5`, `p-7`.

### Tipografia Hierárquica

```css
/* Títulos de página */
h1: 32px / 700 / -0.03em (mobile: 28px)

/* Títulos de seção */
h2: 22px / 600 / -0.02em

/* Subtítulos / cards */
h3: 18px / 600 / -0.01em

/* Body */
p: 15px / 400 / normal

/* Captions / labels */
small: 13px / 500

/* Micro (badges, timestamps) */
.micro: 11px / 500
```

### Botões (apenas 2 variantes)

```
PRIMÁRIO: bg-primary text-white rounded-xl h-12 px-6
  → Usado para: ação principal da tela (1 por tela)
  
SECUNDÁRIO: bg-secondary text-foreground rounded-xl h-10 px-4
  → Usado para: ações complementares

GHOST (link): text-primary underline-offset-4
  → Usado para: navegação contextual
```

### Border Radius Padronizado

```
Cards / Containers: rounded-2xl (16px)
Botões / Inputs: rounded-xl (12px)
Badges / Chips: rounded-full
Ícones containers: rounded-lg (8px)
```

### Sombras (apenas 2 níveis)

```css
--shadow-card: 0 2px 12px rgba(0,0,0,0.06);
--shadow-elevated: 0 8px 32px rgba(0,0,0,0.12);
```

---

## ETAPA 5 — REFATORAÇÃO DE COMPONENTES

### Componentes para REMOVER (não usados ou redundantes)

```
accordion.tsx        → não usado nas pages
aspect-ratio.tsx     → não usado
breadcrumb.tsx       → não usado
calendar.tsx         → complexo demais para o uso
carousel.tsx         → substituir por scroll horizontal nativo
chart.tsx            → não usado (recharts direto)
collapsible.tsx      → usar accordion ou estado local
command.tsx          → não usado
context-menu.tsx     → não usado
drawer.tsx           → usar sheet
form.tsx             → react-hook-form direto
hover-card.tsx       → não usado
input-otp.tsx        → não usado
menubar.tsx          → não usado
navigation-menu.tsx  → não usado
pagination.tsx       → não usado
radio-group.tsx      → não usado
resizable.tsx        → não usado
sidebar.tsx          → layout customizado já existe
slider.tsx           → não usado
toggle.tsx           → usar switch
toggle-group.tsx     → não usado
```

**Resultado:** De 49 componentes → ~20 componentes necessários.

### Componentes para CRIAR/REFATORAR

```tsx
// 1. EmptyState — componente reutilizável
<EmptyState
  icon={Package}
  title="Nenhum cubo cadastrado"
  description="Adicione seus primeiros cubos para começar"
  action={{ label: "Adicionar Cubos", onClick: () => {} }}
/>

// 2. StockBar — barra de progresso com contexto
<StockBar
  group="proteina"
  current={18}
  target={30}
  status="atencao"
/>

// 3. ActionCard — card com CTA contextual
<ActionCard
  variant="warning"
  title="Proteína acabando"
  description="Restam 4 cubos — suficiente para 2 refeições"
  action={{ label: "Produzir", href: "/producao" }}
/>

// 4. QuickAction — botão de ação rápida flutuante
<QuickAction
  icon={Plus}
  label="Registrar Refeição"
  onClick={() => {}}
/>
```

---

## ETAPA 6 — MELHORIAS DE EXPERIÊNCIA

### Estados de Loading
```tsx
// Skeleton para cards de estoque
<div className="animate-pulse space-y-3">
  <div className="h-4 bg-muted rounded w-1/3" />
  <div className="h-2 bg-muted rounded w-full" />
</div>
```

### Empty States (por página)

| Página | Empty State |
|--------|-------------|
| Dashboard | "Adicione seus primeiros cubos para ver quantas refeições você tem prontas" + CTA |
| Estoque | "Seu estoque está vazio. Registre uma produção para começar" + CTA |
| Refeições | "Nenhuma refeição registrada esta semana. Monte uma agora!" + CTA |
| Produção | "Hora de cozinhar? Registre o que você produziu" + CTA |
| Compras | "Lista de compras vazia — seu estoque está em dia! 🎉" |

### Feedback de Sucesso

```tsx
// Após registrar refeição
toast.success("Refeição registrada! Restam 10 refeições prontas.");

// Após produção
toast.success("12 cubos de frango adicionados ao estoque!");

// Gargalo resolvido
toast.success("Proteína reabastecida — semana coberta! 🎉");
```

### Microinterações

```css
/* Transição suave em cards ao expandir */
.stock-card { transition: all 200ms ease-out; }

/* Progress bar com animação de preenchimento */
.progress-fill { transition: width 600ms cubic-bezier(0.4, 0, 0.2, 1); }

/* Botão com feedback tátil */
button:active { transform: scale(0.97); }

/* Badge de status com pulse quando crítico */
.status-critical { animation: pulse 2s infinite; }
```

---

## ETAPA 7 — COPYWRITING COMPLETO

### Splash / Tagline
- **Antes:** "Controle alimentar estratégico"
- **Depois:** "Refeições prontas, rotina leve"

### Meta Description
- **Antes:** "Sistema de controle estratégico de alimentação infantil baseado em batch cooking"
- **Depois:** "Organize os cubos congelados do seu filho e saiba sempre o que tem pronto para a próxima refeição"

### Dashboard — Header
- **Antes:** "Dashboard — Visão geral do controle alimentar"
- **Depois:** "Olá! Você tem **{n} refeições** prontas" / "Suficiente para {d} dias"

### Gargalo
- **Antes:** "Gargalo Identificado — Limitado por Proteína com 4 cubos"
- **Depois:** "Proteína acabando — restam 2 refeições. Hora de produzir?"

### Botão de dados exemplo
- **Antes:** "Carregar Dados de Exemplo"
- **Depois:** "Ver como funciona com dados reais"

### Estoque
- **Antes:** "Estoque por Grupamento — 6 grupos · 120 cubos total"
- **Depois:** "Seu estoque — 12 refeições completas disponíveis"

### Status Labels
- **Antes:** Estável / Atenção / Produzir
- **Depois:** Tranquilo ✓ / Acabando ⚠ / Produzir agora ⚡

### Navegação
- **Antes:** Dashboard / Estoque / Congelados / Refeições / Produção / Compras
- **Depois:** Início / Estoque / Refeições / Produzir / Compras (5 itens, "Congelados" vira sub-seção de Estoque)

### Cardápio Fixo
- **Antes:** "Configurar Cardápio Fixo — Defina as refeições semanais. 0/28 refeições configuradas."
- **Depois:** "Monte seu cardápio da semana — escolha o que seu filho come em cada refeição"

### Empty States
- **Antes:** (nenhum ou genérico)
- **Depois:** 
  - Estoque vazio: "Nenhum cubo cadastrado ainda. Registre sua primeira produção e veja a mágica acontecer."
  - Sem refeições: "Nenhuma refeição montada hoje. Que tal montar uma agora? Leva menos de 1 minuto."

---

## ETAPA 8 — RECOMENDAÇÕES DE IMPLEMENTAÇÃO

### Prioridade 1 (Alto impacto, baixo esforço)

1. **Remover splash screen** — substituir por transição suave do loading nativo
2. **Reescrever toda a copy** do Dashboard seguindo o guia acima
3. **Reduzir nav mobile para 5 itens** — mover "Congelados" para dentro de "Estoque"
4. **Adicionar empty states** em todas as páginas
5. **Padronizar border-radius** para `rounded-2xl` em cards, `rounded-xl` em botões

### Prioridade 2 (Médio impacto, médio esforço)

6. **Criar componente EmptyState** reutilizável
7. **Criar onboarding de 3 telas** na primeira abertura
8. **Refatorar Dashboard** — headline dinâmica + ação principal contextual
9. **Limpar componentes UI não usados** (remover ~25 arquivos)
10. **Padronizar espaçamentos** — audit e substituir por sistema de 8px

### Prioridade 3 (Alto impacto, alto esforço)

11. **Redesenhar o fluxo de Cardápio Fixo** — wizard step-by-step ao invés de modal gigante
12. **Adicionar microinterações** — progress bars animadas, feedback tátil
13. **Implementar dark mode** consistente (já tem variáveis, falta testar)
14. **Criar página de "Semana"** — visão consolidada do que foi comido vs planejado

### Código: Mudanças Imediatas Sugeridas

```tsx
// Dashboard.tsx — Nova headline dinâmica
<h1 className="text-[28px] md:text-[32px] text-primary-foreground mb-1">
  {stats.totalMealsAvailable > 0 
    ? `${stats.totalMealsAvailable} refeições prontas`
    : 'Vamos começar?'
  }
</h1>
<p className="text-primary-foreground/70 text-[15px]">
  {stats.daysRemaining > 0
    ? `Suficiente para ${stats.daysRemaining} dias`
    : 'Adicione seus primeiros cubos para ver o que tem pronto'
  }
</p>
```

```tsx
// Layout.tsx — Nav reduzida para 5 itens
const navItems = [
  { path: '/', icon: LayoutGrid, label: 'Início' },
  { path: '/estoque', icon: Package, label: 'Estoque' },
  { path: '/refeicoes', icon: Utensils, label: 'Refeições' },
  { path: '/producao', icon: ChefHat, label: 'Produzir' },
  { path: '/compras', icon: ShoppingCart, label: 'Compras' },
];
```

```tsx
// Novo componente: EmptyState.tsx
interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: { label: string; onClick: () => void };
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
        <Icon className="w-7 h-7 text-primary" />
      </div>
      <h3 className="text-[18px] text-foreground mb-2">{title}</h3>
      <p className="text-[15px] text-muted-foreground max-w-[280px] mb-6">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="h-12 px-6 bg-primary text-primary-foreground rounded-xl text-[15px] font-semibold"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
```

---

## RESUMO DA TRANSFORMAÇÃO

| Aspecto | Antes (6/10) | Depois (9/10) |
|---------|--------------|---------------|
| **Posicionamento** | "Sistema de controle alimentar" | "Refeições prontas para seu filho em minutos" |
| **Primeiro contato** | Splash 3s → Dashboard vazio | Onboarding 3 passos → Dashboard guiado |
| **Navegação** | 6 itens sem hierarquia | 5 itens com fluxo lógico |
| **Copy** | Técnica, genérica | Humana, específica, orientada a benefício |
| **Componentes** | 49 (muitos não usados) | ~20 (todos necessários) |
| **Espaçamento** | Inconsistente | Sistema de 8px |
| **Empty states** | Inexistentes | Orientadores com CTA |
| **Hierarquia visual** | Tudo glass = tudo igual | Cards com níveis claros de importância |
| **Ação principal** | Escondida entre dados | Sempre visível e contextual |

---

*Este documento serve como guia de refatoração. A implementação pode ser feita incrementalmente seguindo as prioridades listadas.*
