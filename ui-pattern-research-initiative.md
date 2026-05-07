# UI Pattern Research Initiative
## Strategic Design System Foundation for AI-Ready Interface Generation

**Version:** 1.0  
**Status:** Research Consolidation  
**Date:** May 2026  
**Scope:** Cross-product interface consistency, pattern governance, AI-assisted generation readiness

---

## 1. Executive Summary

### Why This Initiative Exists

Product teams across the organization are accelerating interface delivery through AI-assisted generation tools. This velocity gain has introduced a systemic problem: **structural inconsistency at scale**.

Without a governed pattern foundation, each AI-generated interface becomes an isolated artifact — visually similar but behaviorally divergent. Search behaviors differ between screens. Validation feedback follows no shared contract. Loading states range from spinners to skeletons with no governing logic. Empty states vary from blank screens to over-designed illustrations with no consistent recovery path.

### The Problem

The absence of structured, machine-readable pattern specifications creates compounding inconsistency:

- **Visual fragmentation:** Teams produce interfaces that look cohesive at surface level but break down under interaction scrutiny.
- **Behavioral divergence:** Identical user tasks (search, filter, submit) behave differently across product surfaces.
- **State management gaps:** Loading, empty, and error states are treated as afterthoughts rather than first-class design decisions.
- **AI amplification risk:** Generative tools reproduce and amplify inconsistencies because they lack structured constraints.

### Expected Impact

This initiative establishes the operational foundation for:

- Reducing interface inconsistency by 60–80% through pattern standardization
- Enabling AI systems to generate structurally correct interfaces from pattern specifications
- Creating a single source of truth for interaction behaviors across all product surfaces
- Reducing design-to-development handoff friction through unambiguous pattern contracts
- Supporting future plugin and automation tooling with machine-readable pattern definitions

---

## 2. Research Goals

### Primary Objectives

1. **Identify recurring UI/UX patterns** across existing product surfaces and map their frequency, variations, and structural commonalities.

2. **Map behavioral inconsistencies** where identical patterns exhibit different interaction logic, state management, or visual treatment across contexts.

3. **Create reusable pattern structures** that serve as both human-readable guidelines and machine-consumable specifications.

4. **Enable AI-ready generation** by defining patterns as structured inputs with explicit rules, constraints, and conditional logic that generative systems can interpret deterministically.

5. **Support Design System scalability** by establishing a pattern governance model that evolves with product complexity without requiring manual oversight of every new screen.

### Secondary Objectives

- Establish pattern composition rules (how patterns combine within a single screen)
- Define state transition contracts (how patterns move between loading, populated, empty, and error states)
- Create accessibility baselines per pattern (not per component, but per interaction structure)
- Map pattern dependencies and relationships for future automation

---

## 3. Research Methodology

### Analytical Framework

This research follows a multi-layered analysis approach combining qualitative pattern extraction with structured categorization logic.

### Analysis Dimensions

**Layout Analysis**
- Spatial organization of interface elements
- Content hierarchy and visual weight distribution
- Responsive behavior contracts (desktop → tablet → mobile)
- Spacing and alignment consistency across pattern instances

**Interaction Analysis**
- User input mechanisms (click, type, select, drag)
- Feedback timing (immediate, deferred, progressive)
- State transitions triggered by user actions
- Error recovery paths and retry mechanisms

**State Analysis**
- Loading state representation per pattern type
- Empty state messaging and recovery CTAs
- Error state severity levels and user guidance
- Transition animations and perceived performance

**Flow Analysis**
- Multi-screen pattern sequences (search → results → detail)
- Progressive disclosure patterns
- Form completion flows and abandonment points
- Confirmation and feedback loops

### Research Methods Applied

| Method | Purpose |
|--------|---------|
| Pattern extraction | Isolate recurring structural units from existing interfaces |
| Comparative analysis | Identify behavioral divergence across pattern instances |
| State mapping | Document all possible states per pattern with transition logic |
| Interaction audit | Catalog user actions and system responses per pattern |
| Accessibility review | Evaluate keyboard navigation, screen reader support, focus management |
| Benchmark analysis | Reference Atlassian, Material, Carbon, Polaris, Base for pattern maturity |

### Categorization Logic

Patterns are categorized by their **primary function** in the interface:
- **Layout patterns** define spatial structure
- **Interaction patterns** define behavioral contracts
- **Flow patterns** define multi-step sequences

A single screen may compose multiple patterns. Categorization determines governance ownership, not exclusivity.

---

## 4. Pattern Categories

### Layout Patterns

Patterns that define the spatial organization and structural hierarchy of interface content.

| Pattern | Purpose |
|---------|---------|
| Search + Filter | Content discovery with progressive refinement |
| Card List / Grid | Scannable content presentation with comparison support |
| Form Layout | Structured data input with logical grouping |
| Stepper Layout | Multi-step process visualization with progress indication |
| Modal Structure | Focused overlay for critical decisions |

**Impact on consistency:** Layout patterns establish the visual grammar of the product. When these diverge, users lose spatial memory — they cannot predict where to find actions, content, or navigation across screens.

**Scalability importance:** New screens should compose from existing layout patterns rather than inventing new spatial arrangements. This reduces design time and ensures cross-screen coherence.

---

### Interaction Patterns

Patterns that define how the system responds to user actions and communicates state changes.

| Pattern | Purpose |
|---------|---------|
| Validation | Real-time input correctness feedback |
| Feedback (Toast/Inline) | Post-action result communication |
| Loading (Skeleton/Spinner) | Processing state indication |
| Pagination | Content set navigation |
| Selection / Filtering | Content refinement through user choice |
| Confirmation | Explicit user consent for critical actions |

**Impact on consistency:** Interaction patterns form the behavioral contract between user and system. Inconsistent validation timing, feedback positioning, or loading representations erode user trust and increase cognitive load.

**Scalability importance:** Every new feature introduces interactions. Without standardized interaction patterns, each feature team reinvents feedback, validation, and loading — creating exponential divergence.

---

### Flow Patterns

Patterns that define multi-step sequences spanning multiple states or screens.

| Pattern | Purpose |
|---------|---------|
| Search Flow | Query → Filter → Results → Empty/Error |
| Multi-step Form Flow | Step 1 → ... → Review → Submit |
| Confirmation Flow | Action → Modal → Confirm/Cancel → Feedback |
| Error Recovery Flow | Error → Guidance → Retry → Success |
| Onboarding Flow | Welcome → Setup → Completion |

**Impact on consistency:** Flow patterns ensure that multi-step experiences feel cohesive. A search flow that handles empty states differently than a filter flow creates dissonance within the same user journey.

**Scalability importance:** Complex products introduce new flows regularly. Standardized flow patterns provide templates that reduce design effort while maintaining experiential coherence.

---

## 5. Consolidated Pattern Inventory

---

### 5.1 Search + Filter

#### Summary
Persistent search interface with progressive filter refinement. Enables content discovery without authentication barriers. Search input remains visible across all states to reduce interaction cost.

#### Structure
- Persistent search bar (top-level, never hidden)
- Filter controls (inline or sidebar): category, price, duration
- Active filter indicators (removable tags)
- Bulk reset mechanism ("Clear all")
- Results area (delegates to Card List pattern)

#### Behaviors
- Search triggers on Enter or icon click
- Filters apply immediately on selection (no separate "Apply" button)
- Active filters render as dismissible tags
- "Clear all" resets filter state without clearing search term
- Results update without full page reload

#### States

**Loading:**
- Skeleton cards in results area (3–6 placeholders matching final card structure)
- Filter controls remain interactive and unblocked

**Empty:**
- Contextual message including the search term: "No results for '[term]'"
- Actionable suggestions (check spelling, broaden terms, remove filters)
- CTAs: "Clear filters" / "Explore categories"

**Error:**
- Inline error message above results area
- Retry button visible
- Search and filters remain functional

#### Accessibility Considerations
- Search input has explicit `aria-label`
- Filter dropdowns announce selected state to screen readers
- Active filter tags are focusable with keyboard dismiss
- Results region uses `aria-live="polite"` for dynamic updates
- Clear all button has descriptive `aria-label` ("Remove all active filters")

#### Consistency Rules
- Search bar position: always below header, above filters
- Filter position: always below search, above results
- Active state indication: always tags with "×" dismiss
- Reset mechanism: always available when filters are active
- Results loading: always skeleton (never spinner)

#### Related Components
- Card List (results display)
- Empty State (zero results)
- Loading Skeleton (transition state)
- Toast (error feedback)

#### UX Rationale
Persistent search reduces interaction cost for the primary user goal (finding content). Immediate filter application provides instant feedback. Visible active state prevents "hidden filter" confusion — a common source of support tickets in content platforms.

#### AI Generation Rules
```
IF screen_type == "search" OR screen_type == "discovery":
  → Search input MUST be always visible (never collapsed)
  → Filters MUST show active state as removable tags
  → Results area MUST use skeleton loading (not spinner)
  → Empty state MUST include search term in message
  → Reset mechanism MUST be available when filters active
  → Primary action: "Search" button (single per screen)
```

---

### 5.2 Card List / Grid

#### Summary
Responsive grid of content cards optimized for scannability and comparison. Each card follows a strict content hierarchy: image → title → description → metadata → CTA. Grid adapts column count by viewport.

#### Structure
- Results counter ("24 results found")
- Sort control (relevance, date, price)
- Responsive grid (3 col desktop, 2 col tablet, 1 col mobile)
- Card unit: image, title, description (truncated), metadata, CTA
- Pagination (numbered pages, not infinite scroll for SEO)

#### Behaviors
- Hover: subtle elevation change + CTA highlight
- Card CTA: "View details" — one primary action per card
- Sort changes trigger results refresh without page reload
- Pagination preserves scroll position context
- Grid reflows responsively without content reordering

#### States

**Loading:**
- 6 skeleton cards matching exact card structure (image placeholder, text lines, button placeholder)
- Shimmer/pulse animation on skeleton elements

**Empty:**
- Illustration + message: "No content available at this time."
- CTA: "Explore categories"

**Error:**
- Inline message above grid: "Failed to load content."
- Retry button

#### Accessibility Considerations
- Cards are not focusable as a unit; CTA within card receives focus
- Card images have descriptive `alt` text
- Grid uses semantic list markup (`<ul>` / `<li>`)
- Sort control announces current sort state
- Pagination uses `nav` landmark with `aria-label`

#### Consistency Rules
- Card content order: image → title → description → metadata → CTA (never reordered)
- Grid columns: 3/2/1 breakpoint pattern (consistent across all card lists)
- CTA per card: exactly one, always at card bottom
- Hover effect: elevation only (no color change, no scale)
- Pagination: always numbered (not "Load more" for primary lists)

#### Related Components
- Search + Filter (content source)
- Loading Skeleton (transition)
- Empty State (zero content)
- Pagination (navigation)

#### UX Rationale
Consistent card structure enables rapid scanning — users develop spatial memory for where to find title, price, or CTA. Responsive grid maintains information density appropriate to viewport. Pagination over infinite scroll supports SEO and gives users a sense of dataset size.

#### AI Generation Rules
```
IF screen_type == "list" OR screen_type == "catalog" OR screen_type == "results":
  → Cards MUST follow hierarchy: image → title → description → metadata → CTA
  → Grid MUST be responsive: 3 col / 2 col / 1 col
  → Each card MUST have exactly ONE CTA
  → Loading MUST use skeleton matching card structure
  → Sort control MUST be present above grid
  → Pagination MUST use numbered pages (not infinite scroll)
  → Hover MUST use elevation change only
```

---

### 5.3 Empty State

#### Summary
Purposeful communication screen displayed when a query, list, or action returns no data. Designed to prevent abandonment by providing clear explanation and actionable recovery paths.

#### Structure
- Contextual illustration (lightweight, non-blocking)
- Primary message (includes context: search term, filter state)
- Guidance list (suggestions for resolution)
- Action CTAs (clear filters, explore alternatives, retry)

#### Behaviors
- Search input remains visible and editable (preserves user's term)
- If filters were active, first suggestion is filter removal
- CTAs lead to constructive paths (never dead ends)
- Illustration scales down on mobile (does not dominate viewport)

#### States

**Loading:**
- N/A (empty state IS a resultant state)

**Empty:**
- This IS the empty state — always displays message + guidance + CTA

**Error:**
- Distinct from empty: "An error occurred while searching. Try again."
- Retry button replaces guidance list

#### Accessibility Considerations
- Message uses heading hierarchy (`h2` or `h3`)
- Illustration has `role="presentation"` (decorative)
- CTAs are keyboard-focusable with clear labels
- `aria-live` region announces state change from loading to empty

#### Consistency Rules
- Always include: illustration + message + at least one CTA
- Message must reference what the user did (search term, filter combination)
- Never show a blank screen — empty state is a designed state
- Illustration style: consistent across all empty states (same artist/style)
- CTA hierarchy: primary recovery action + secondary exploration action

#### Related Components
- Search + Filter (parent context)
- Card List (what would normally display)
- Illustration Library (consistent visual language)

#### UX Rationale
Empty states are high-abandonment moments. Providing context (what was searched), guidance (what to try), and action (clear path forward) converts potential exits into continued engagement. Consistent illustration style reinforces brand even in failure states.

#### AI Generation Rules
```
IF data_response == empty OR results_count == 0:
  → MUST display empty state (never blank screen)
  → MUST include contextual message with user's search term or action
  → MUST provide at least ONE actionable CTA
  → MUST include guidance suggestions (2-3 items)
  → Illustration MUST be present but not dominant
  → Search/filter controls MUST remain visible and interactive
  → NEVER auto-redirect away from empty state
```

---

### 5.4 Loading State (Skeleton)

#### Summary
Skeleton screen pattern for list and grid loading. Mirrors the exact structural layout of the final content to create cognitive continuity and reduce perceived wait time.

#### Structure
- Skeleton cards matching final card dimensions and element positions
- Shimmer/pulse animation (subtle, not distracting)
- Same grid layout as populated state
- Interactive elements (search, filters) remain functional

#### Behaviors
- Skeleton layout mirrors final content structure exactly
- Animation: horizontal shimmer or opacity pulse (2s cycle)
- Non-blocking: search and filter controls remain interactive during load
- Timeout handling: 5s → "Still loading..." message; 15s → retry option
- Transition: skeleton fades to real content (no layout shift)

#### States

**Loading:**
- This IS the loading state — skeleton cards with animation

**Empty:**
- Transitions to Empty State pattern when response returns zero items

**Error:**
- Skeleton disappears, replaced by inline error message with retry

#### Accessibility Considerations
- Skeleton region has `aria-busy="true"` during load
- `aria-live="polite"` announces when content loads
- Animation respects `prefers-reduced-motion` (static gray blocks if reduced)
- Screen readers announce "Loading content" on state entry

#### Consistency Rules
- List/grid loading: ALWAYS skeleton (never spinner)
- Button/action loading: ALWAYS spinner (never skeleton)
- Skeleton must match final layout structure (same heights, widths, positions)
- Animation: consistent timing across all skeleton instances (2s cycle)
- Timeout thresholds: 5s (message), 15s (retry) — universal

#### Related Components
- Card List (target state)
- Empty State (alternative outcome)
- Error Message (failure outcome)
- Spinner (for action-level loading only)

#### UX Rationale
Research shows skeleton screens reduce perceived load time by ~30% compared to spinners. Matching the final layout structure prevents layout shift (CLS) and creates visual continuity. Keeping interactive elements functional during load respects user agency.

#### AI Generation Rules
```
IF loading_type == "list" OR loading_type == "grid" OR loading_type == "content":
  → MUST use skeleton screen (NEVER spinner for content loading)
  → Skeleton MUST mirror exact final layout structure
  → Interactive controls MUST remain functional during load
  → Animation MUST be subtle (shimmer or pulse, 2s cycle)
  → MUST implement timeout: 5s message, 15s retry option
  → Transition to content MUST NOT cause layout shift

IF loading_type == "action" OR loading_type == "button":
  → MUST use inline spinner (NEVER skeleton)
  → Button text MUST change to progressive label ("Saving...")
  → Button MUST be disabled during processing
```

---

### 5.5 Form Layout (Simple)

#### Summary
Single-page form with logical field grouping, persistent labels, and inline validation. Designed for authenticated users completing structured data entry with minimal friction.

#### Structure
- Form title + purpose description
- Semantic field groups (labeled sections)
- Fields: label (above) + input + helper text (below)
- Required field indicator (asterisk *)
- Action bar: secondary (Cancel) + primary (Submit)

#### Behaviors
- Labels always visible above input (never placeholder-only)
- Validation triggers onBlur (field exit)
- Required fields marked with asterisk; legend at form bottom
- Helper text provides format guidance before errors occur
- Submit button: single primary action per form
- Cancel: secondary style, no confirmation needed for empty forms

#### States

**Loading:**
- Spinner replaces submit button text during submission
- All fields disabled during processing
- No navigation allowed during submit

**Empty:**
- Initial state: fields empty with placeholder hints
- No validation indicators until first interaction

**Error:**
- Inline error below field: icon + descriptive message
- Field border changes to error color (red)
- Auto-scroll to first error on submit attempt
- Optional: error summary banner at form top

#### Accessibility Considerations
- Labels explicitly associated with inputs via `for`/`id`
- Required fields use `aria-required="true"`
- Error messages linked via `aria-describedby`
- Field groups use `<fieldset>` + `<legend>`
- Focus moves to first error field on submit failure
- Submit button announces loading state change

#### Consistency Rules
- Labels: always above input, never inline or placeholder-only
- Grouping: related fields in labeled sections
- Required indicator: asterisk (*) with legend
- Validation timing: onBlur (not onChange for text fields)
- Action bar: right-aligned, primary rightmost
- One primary action per form (never two filled buttons)

#### Related Components
- Validation (error feedback)
- Feedback Toast (post-submit confirmation)
- Loading Spinner (submit state)
- Primary Action (button hierarchy)

#### UX Rationale
Persistent labels prevent context loss during entry. Logical grouping reduces cognitive load by chunking related information. onBlur validation provides feedback at the natural pause point without interrupting typing flow. Single primary action eliminates decision paralysis at the commitment moment.

#### AI Generation Rules
```
IF screen_type == "form" AND step_count == 1:
  → Labels MUST be above inputs (never placeholder-only)
  → Fields MUST be grouped in semantic sections with headings
  → Required fields MUST use asterisk (*) indicator
  → Validation MUST trigger onBlur (not onChange for text)
  → Action bar MUST have exactly ONE primary button (rightmost)
  → Cancel MUST be secondary style (outlined or ghost)
  → Helper text SHOULD appear below fields for format guidance
  → Error messages MUST be inline below the field
```

---

### 5.6 Multi-step Form

#### Summary
Complex form divided into sequential steps with visual progress indication. Reduces perceived complexity and increases completion rates for processes requiring extensive data input.

#### Structure
- Stepper component (top): numbered steps with labels and status indicators
- Step content area: form fields for current step only
- Navigation bar: Back (secondary) + Next/Submit (primary)
- Progress indicator: "Step X of Y"
- Final step: review/summary before submission

#### Behaviors
- Stepper shows: completed (✓), current (●), upcoming (○)
- "Next" validates current step before advancing
- "Back" preserves entered data (no data loss)
- Completed steps are clickable for editing
- Final step shows summary of all entered data
- Last step CTA changes from "Next" to "Submit"
- Data persists across step navigation (client-side state)

#### States

**Loading:**
- Spinner on "Next" or "Submit" button during transition/submission
- Stepper remains visible and static during processing

**Empty:**
- Initial state per step: empty fields with appropriate placeholders

**Error:**
- Inline errors on current step fields
- Stepper marks errored step with alert icon
- Cannot advance past step with validation errors
- Error count badge on step indicator (optional)

#### Accessibility Considerations
- Stepper uses `aria-current="step"` for active step
- Step navigation announced to screen readers
- Focus moves to first field of new step on advance
- Back button does not require confirmation
- Progress communicated via `aria-label` ("Step 2 of 4: Address")
- Completed steps use `aria-label` indicating editability

#### Consistency Rules
- Stepper: always visible at top, horizontal on desktop, vertical on mobile (optional)
- Step count: 3–5 steps maximum (more indicates need for flow redesign)
- Navigation: Back (left, secondary) + Next (right, primary) — always
- Validation: per-step, blocking (cannot advance with errors)
- Data persistence: mandatory (no data loss on back navigation)
- Final step: always includes review/summary

#### Related Components
- Form Layout (per-step content)
- Validation (per-step error handling)
- Stepper Component (progress visualization)
- Primary Action (Next/Submit button)
- Confirmation Modal (optional before final submit)

#### UX Rationale
Breaking complex forms into steps reduces abandonment by making progress visible and manageable. Per-step validation prevents error accumulation. Data persistence respects user effort. Review step before submission builds confidence and reduces post-submit corrections.

#### AI Generation Rules
```
IF screen_type == "form" AND (field_count > 8 OR logical_groups > 3):
  → MUST use multi-step form pattern
  → Stepper MUST be visible showing all steps
  → Each step MUST contain 3-5 fields maximum
  → Validation MUST be per-step (blocking advancement)
  → "Back" MUST preserve all entered data
  → Final step MUST show review/summary
  → Primary action: "Next" (steps 1 to N-1), "Submit" (final step)
  → Step count SHOULD be 3-5 (redesign if more)
```

---

### 5.7 Validation + Error Feedback

#### Summary
Real-time validation system providing immediate, inline, descriptive feedback on field correctness. Combines visual indicators (color, icons) with actionable text guidance to minimize correction cycles.

#### Structure
- Field-level indicators: ✓ (valid) / ✗ (invalid) icons
- Error message: below field, icon + descriptive text
- Success indicator: green border + checkmark
- Password requirements: checklist with individual status
- Helper text: format guidance (pre-error state)
- Error summary: banner at form top (post-submit)

#### Behaviors
- Validation timing: onBlur for text fields, onChange for password
- Visual feedback: border color change + icon appearance
- Error messages: descriptive and actionable (not just "Invalid")
- Password: live checklist showing requirement status
- Submit attempt: scroll to first error + focus
- Async validation (e.g., email uniqueness): inline spinner during check
- No validation indicators on untouched fields

#### States

**Loading:**
- Inline spinner on field during async validation
- Field remains editable during async check

**Empty:**
- Neutral state: no validation indicators
- Helper text visible for format guidance

**Error:**
- Red border + ✗ icon + descriptive message below field
- Error summary banner at form top (multiple errors)
- Focus trap on first error field after submit attempt

#### Accessibility Considerations
- Error messages linked to fields via `aria-describedby`
- `aria-invalid="true"` on errored fields
- Error summary uses `role="alert"` for immediate announcement
- Color is never the sole indicator (always paired with icon + text)
- Focus management: first error receives focus on submit
- Live regions announce validation state changes

#### Consistency Rules
- Timing: onBlur (text), onChange (password), onSubmit (final check)
- Visual: red = error, green = valid, gray = neutral/untouched
- Messages: always descriptive + actionable (include expected format)
- Icons: ✓ for valid, ✗ for invalid (consistent across all forms)
- No validation on untouched fields (avoid premature red states)
- Error summary: appears only after submit attempt, not during typing

#### Related Components
- Form Layout (parent structure)
- Multi-step Form (per-step validation)
- Feedback Toast (post-submit errors)
- Helper Text (pre-error guidance)

#### UX Rationale
Immediate inline feedback reduces correction cycles from "fill all → submit → see errors → fix" to "fill → see → fix" per field. Descriptive messages eliminate guesswork. Password checklists reduce failed attempts. Avoiding premature validation (untouched fields) prevents anxiety.

#### AI Generation Rules
```
IF pattern == "form" (any type):
  → Validation MUST be inline (below field, never tooltip or modal)
  → Error messages MUST be descriptive (include expected format)
  → Timing: onBlur for text, onChange for password
  → Visual indicators MUST combine color + icon + text (never color alone)
  → Untouched fields MUST show no validation state
  → Submit failure MUST scroll to and focus first error
  → Password fields MUST show requirement checklist
  → Async validation MUST show inline spinner
```

---

### 5.8 Confirmation Modal

#### Summary
Focused overlay dialog requiring explicit user consent before executing critical or irreversible actions. Prevents accidental data loss, deletion, or submission through deliberate friction.

#### Structure
- Overlay: semi-transparent dark background
- Modal container: centered, constrained width
- Close button: top-right "✕"
- Warning icon + title (describes the action)
- Body: identifies affected item + consequences
- Action bar: Cancel (secondary) + Confirm (primary/destructive)

#### Behaviors
- Opens centered with overlay dimming background
- Focus trapped within modal (Tab cycles through modal elements only)
- Dismiss: "✕" button, overlay click, Escape key
- Destructive action styled with alert color (red), not standard primary
- Cancel is the "safe" default — no destructive action on Enter for delete modals
- Identifies the specific item affected (name, title, ID)
- Modal remains open during processing (spinner on confirm button)

#### States

**Loading:**
- Spinner replaces confirm button text
- Both buttons disabled during processing
- Modal stays open until action completes or fails

**Empty:**
- N/A (modal is contextual, always has content)

**Error:**
- Inline error within modal: "Action failed. Try again."
- Buttons re-enabled for retry
- Modal does not auto-close on error

#### Accessibility Considerations
- `role="dialog"` with `aria-modal="true"`
- `aria-labelledby` pointing to modal title
- Focus trapped: Tab/Shift+Tab cycle within modal
- Focus returns to trigger element on close
- Escape key closes modal (same as Cancel)
- Destructive button has `aria-label` describing consequence

#### Consistency Rules
- Use ONLY for critical/irreversible actions (never for confirmations like "Are you sure you want to leave?")
- Destructive actions: red/alert button color (never standard primary blue)
- Always identify the affected item by name
- Always state consequences ("This cannot be undone")
- Cancel is always the safe default
- No auto-close on error — user must acknowledge

#### Related Components
- Primary Action (trigger button)
- Feedback Toast (post-confirmation result)
- Loading Spinner (processing state)
- Error Message (failure within modal)

#### UX Rationale
Deliberate friction at critical moments prevents costly mistakes. Identifying the affected item prevents "wrong item" deletions. Alert-colored destructive buttons create visual pause. Focus trapping ensures keyboard users cannot accidentally interact with background content.

#### AI Generation Rules
```
IF action_type == "delete" OR action_type == "irreversible" OR action_type == "critical":
  → MUST show confirmation modal before execution
  → Modal MUST identify the specific affected item
  → Modal MUST state consequences
  → Destructive button MUST use alert/red color (not primary blue)
  → Cancel MUST be the safe default
  → Enter key MUST NOT trigger destructive action
  → Focus MUST be trapped within modal
  → Modal MUST NOT auto-close on error
```

---

### 5.9 Feedback (Toast / Inline)

#### Summary
Post-action communication system using toast notifications and inline messages to confirm action results. Differentiates between success, error, and warning through consistent visual language and behavioral rules.

#### Structure
- **Toast:** floating notification, top-right position, icon + message + dismiss
- **Inline:** contextual message near action source, icon + message + optional CTA
- **Types:** success (green/✓), error (red/✗), warning (yellow/⚠), info (blue/ℹ)

#### Behaviors
- **Success toast:** auto-dismiss after 5 seconds, dismissible with "✕"
- **Error toast:** NO auto-dismiss (requires user acknowledgment)
- **Inline success:** persists until navigation
- **Inline error:** persists with retry CTA until resolved
- **Warning:** dismissible, informational
- Multiple toasts stack vertically (newest on top)
- Entry animation: slide-in from right
- Exit animation: fade-out

#### States

**Loading:**
- N/A (feedback appears AFTER action completion)

**Empty:**
- N/A (feedback is contextual, not a persistent screen element)

**Error:**
- Error toast/inline with clear message and recovery action
- Never auto-dismisses — user must acknowledge or act

#### Accessibility Considerations
- Toast container uses `role="status"` (success) or `role="alert"` (error)
- `aria-live="polite"` for success, `aria-live="assertive"` for errors
- Dismiss button has `aria-label="Dismiss notification"`
- Color paired with icon (never color-only differentiation)
- Toast does not steal focus from current task
- Inline messages associated with triggering action via proximity

#### Consistency Rules
- Success: auto-dismiss 5s, green, ✓ icon
- Error: NO auto-dismiss, red, ✗ icon, retry CTA
- Warning: dismissible, yellow/orange, ⚠ icon
- Info: dismissible, blue, ℹ icon
- Position: toasts always top-right; inline always near action source
- Stacking: vertical, newest on top, max 3 visible
- Animation: consistent slide-in/fade-out across all instances

#### Related Components
- Form Layout (post-submit feedback)
- Confirmation Modal (post-confirm feedback)
- Primary Action (action that triggers feedback)
- Error State (for persistent/page-level errors)

#### UX Rationale
Immediate feedback closes the action-result loop — users know their action was processed. Non-dismissing error toasts prevent users from missing critical failures. Consistent positioning creates predictability. Visual differentiation (color + icon + behavior) enables instant recognition without reading.

#### AI Generation Rules
```
IF action_completed == true:
  → MUST show feedback (toast or inline)
  → Success: auto-dismiss 5s, green, top-right toast
  → Error: NO auto-dismiss, red, include retry/guidance
  → Position: toast for global actions, inline for contextual actions
  → NEVER use alert/confirm dialogs for feedback
  → Multiple feedbacks MUST stack (not replace)
  → Error feedback MUST persist until user acknowledges
```

---

### 5.10 Primary Action

#### Summary
Governance pattern ensuring exactly one primary (highest-emphasis) action per screen. Establishes visual hierarchy through button styling tiers and consistent positioning rules.

#### Structure
- **Primary:** filled button, brand color, highest visual weight — ONE per screen
- **Secondary:** outlined or ghost button, neutral color
- **Tertiary:** text-only link style, lowest visual weight
- Positioning: right-aligned in forms, top-right in listings

#### Behaviors
- Primary button: largest touch target, highest contrast
- Loading state: spinner replaces text, button disabled
- Disabled state: reduced opacity, cursor change, tooltip explaining why
- Mobile: primary action may become sticky bottom bar
- Never two filled/primary buttons adjacent

#### States

**Loading:**
- Spinner inside primary button
- Text changes to progressive label ("Saving...", "Sending...")
- Button disabled, prevents double-submission

**Empty:**
- Primary may be disabled if preconditions unmet
- Tooltip or helper text explains activation requirements

**Error:**
- Button re-enabled after error for retry
- Error feedback via toast or inline (not on button itself)

#### Accessibility Considerations
- Primary button has clear, action-oriented label (verb + noun)
- Disabled buttons include `aria-disabled="true"` + explanation
- Loading state announced via `aria-live`
- Button hierarchy communicated through visual weight (not just color)
- Touch targets: minimum 44×44px

#### Consistency Rules
- ONE primary action per screen (absolute rule)
- Positioning: right-aligned (forms), top-right (listings), bottom-right (modals)
- Hierarchy: Primary > Secondary > Tertiary (visual weight descending)
- Loading: always spinner inside button (never external spinner)
- Disabled: reduced opacity + explanation (never hidden)
- Mobile: consider sticky positioning for primary action

#### Related Components
- Form Layout (submit button)
- Multi-step Form (Next/Submit)
- Confirmation Modal (Confirm/Delete)
- Card List (per-card CTA — secondary level)

#### UX Rationale
Single primary action eliminates decision paralysis. Consistent positioning builds muscle memory across screens. Visual hierarchy guides attention to the most important action. Loading state within the button maintains spatial stability.

#### AI Generation Rules
```
FOR every_screen:
  → MUST have exactly ONE primary action button
  → Primary MUST be visually distinct (filled, brand color)
  → Secondary actions MUST be lower visual weight (outlined/ghost)
  → Position: right-aligned for forms, top-right for listings
  → Loading: spinner INSIDE button, text changes to progressive label
  → NEVER place two primary-styled buttons on same screen
  → Mobile: consider sticky bottom positioning for primary action
```


---

## 6. Global Consistency Rules

These rules operate as system-level constraints. They are not guidelines — they are governance contracts that every pattern instance must satisfy.

| Category | Rule | Rationale |
|----------|------|-----------|
| **Hierarchy** | Maximum ONE primary action per screen | Eliminates decision paralysis; directs user behavior |
| **Button Usage** | Primary: filled/brand. Secondary: outlined. Tertiary: text-only | Visual weight hierarchy guides attention predictably |
| **Feedback — Success** | Auto-dismiss toast, 5 seconds, top-right | Confirms without interrupting flow |
| **Feedback — Error** | Never auto-dismiss. Requires user acknowledgment | Prevents users from missing critical failures |
| **Validation Timing** | onBlur for text fields, onChange for password | Feedback at natural pause points without interrupting typing |
| **Validation Display** | Always inline, below field, icon + descriptive text | Proximity to error source reduces scanning effort |
| **Loading — Lists** | Always skeleton screens (never spinner) | Reduces perceived wait time by ~30%; maintains layout stability |
| **Loading — Actions** | Always spinner inside button | Maintains spatial stability; communicates processing |
| **Modal Usage** | Only for critical/irreversible actions | Prevents modal fatigue; reserves pattern for genuine decisions |
| **Empty States** | Always: illustration + message + CTA | Prevents abandonment; provides recovery path |
| **Accessibility** | Focus trap in modals, aria-labels, WCAG AA contrast | Legal compliance + inclusive experience |
| **Responsive** | Grid: 3→2→1 columns. Forms: single column on mobile | Maintains readability and touch targets across viewports |
| **Spacing** | Consistent vertical rhythm within pattern instances | Visual coherence; reduces cognitive load |
| **Interaction** | No action without feedback. Every user action gets a system response | Closes action-result loop; builds trust |
| **Color Semantics** | Green=success, Red=error/destructive, Yellow=warning, Blue=info | Universal recognition; reduces learning curve |
| **Labels** | Always visible above input (never placeholder-only) | Prevents context loss during entry; accessibility requirement |
| **Timeout Handling** | 5s: "Still loading..." message. 15s: retry option | Manages expectations; provides escape hatch |

### Why These Rules Matter

Consistency rules are not aesthetic preferences — they are **operational contracts** that:

1. **Reduce cognitive load:** Users learn the system once and apply that knowledge everywhere.
2. **Enable AI generation:** Rules become deterministic constraints that generative systems can enforce without human review.
3. **Scale governance:** New screens built by any team automatically inherit system-level quality.
4. **Reduce QA effort:** Automated checks can validate rule compliance.
5. **Build user trust:** Predictable behavior creates confidence in the product.

---

## 7. Gap Analysis

### Identified Gaps

| Gap | Impact | Opportunity |
|-----|--------|-------------|
| No standardized transition animations between states | Users experience jarring state changes; perceived quality drops | Define animation tokens (duration, easing, type) per state transition |
| Inconsistent empty state illustrations across products | Brand fragmentation; users don't recognize empty states as intentional | Create shared illustration library with consistent style guide |
| No defined behavior for partial loading (some cards load, others don't) | Confusing mixed states; users unsure if page is done loading | Define progressive loading rules: all-or-nothing vs. incremental |
| Missing pattern for inline editing (edit-in-place) | Teams invent different edit patterns; inconsistent save/cancel behavior | Define inline edit pattern with consistent trigger, save, and cancel rules |
| No standardized keyboard shortcuts across patterns | Power users cannot develop muscle memory; accessibility gaps | Define keyboard interaction map per pattern |
| Pagination vs. infinite scroll decision lacks governance | Different teams choose differently for same content type; SEO impact | Define decision matrix based on content type, SEO needs, dataset size |
| No pattern for bulk actions (select multiple → act) | Teams implement selection differently; inconsistent multi-select behavior | Define bulk action pattern with selection state, action bar, confirmation |
| Toast stacking behavior undefined beyond "vertical" | Multiple simultaneous toasts create visual noise; priority unclear | Define max visible count, priority queue, and grouping rules |
| No offline/connectivity loss pattern | Users lose work or see cryptic errors when connection drops | Define offline state pattern with data persistence and recovery |
| Form autosave behavior not standardized | Some forms autosave, others don't; users unsure if data is preserved | Define autosave rules: when to save, how to indicate, how to recover |
| No pattern for contextual help / onboarding tooltips | New features lack discoverability; help is inconsistent | Define tooltip/coach-mark pattern with trigger, dismiss, and frequency rules |
| Responsive behavior for modals undefined | Modals may be unusable on mobile; no full-screen fallback rule | Define modal responsive contract: overlay on desktop, full-screen on mobile |

### Risk Assessment

**High Risk (AI Amplification):**
- Without explicit rules, AI tools will generate inconsistent loading states, validation timing, and empty states across every new screen — compounding divergence at generation speed.

**Medium Risk (Team Divergence):**
- Missing patterns (bulk actions, inline edit, offline) force teams to invent solutions independently, creating technical debt that's expensive to reconcile later.

**Low Risk (Polish Gaps):**
- Animation and transition inconsistencies affect perceived quality but don't break functionality.

---

## 8. Standardization Opportunities

### Reusable Guidelines

| Opportunity | Deliverable | Impact |
|-------------|-------------|--------|
| State management contract | Document defining loading → populated → empty → error transitions for every pattern | Eliminates state handling inconsistency across teams |
| Validation rulebook | Comprehensive validation timing, messaging, and visual treatment guide | Reduces form abandonment; standardizes error experience |
| Feedback behavior matrix | Decision tree for toast vs. inline vs. modal feedback by action type | Consistent post-action communication |
| Responsive breakpoint contract | Defined behavior per pattern at each breakpoint | Cross-device consistency without per-screen decisions |

### Reusable Components

| Component | Patterns Served | Governance Value |
|-----------|----------------|-----------------|
| Skeleton Card | Card List, Search Results, Loading State | Single implementation for all list loading |
| Toast Notification | Feedback, Form Submit, Confirmation Result | Unified feedback mechanism |
| Stepper | Multi-step Form, Onboarding, Checkout | Consistent progress indication |
| Empty State Template | Search, Lists, Filters, Data Tables | Standardized recovery experience |
| Validation Message | All form patterns | Consistent error communication |
| Confirmation Modal | Delete, Submit, Critical Actions | Unified critical decision interface |

### Reusable Flows

| Flow | Steps | Standardization Value |
|------|-------|----------------------|
| Search → Results → Empty/Error | 3-4 states | Every search experience behaves identically |
| Form → Validate → Submit → Feedback | 4 states | Every form completion feels the same |
| Action → Confirm → Process → Result | 4 states | Every critical action follows same safety pattern |

### Governance Documentation

- Pattern usage decision trees (when to use which pattern)
- Anti-patterns catalog (what NOT to do, with examples)
- Pattern composition rules (how patterns combine on a single screen)
- Version control for pattern evolution (breaking vs. non-breaking changes)

### AI Prompt Templates

Standardized prompts that teams can use with AI generation tools to produce pattern-compliant interfaces:

```
Generate a [screen_type] screen using:
- Layout: [pattern_name]
- Interaction: [pattern_name]
- States: loading (skeleton), empty (message + CTA), error (inline + retry)
- Primary action: [action_label] (single, right-aligned)
- Validation: inline, onBlur, descriptive messages
- Feedback: toast for success, persistent for error
```

### Automation Rules

- Linting rules that flag multiple primary buttons per screen
- Automated accessibility checks per pattern (focus management, aria attributes)
- Visual regression tests per pattern state (loading, empty, error, populated)
- Design token validation (correct colors for state semantics)

---

## 9. AI-Ready Opportunities

### The Strategic Vision

Patterns are not just documentation — they are **structured specifications that AI systems can consume as deterministic inputs**. This transforms pattern governance from a human-review bottleneck into an automated quality gate.

### How Patterns Become Structured AI Inputs

Each pattern in this inventory is defined with:
1. **Structure** — spatial layout rules (what goes where)
2. **Behaviors** — interaction contracts (what happens when)
3. **States** — all possible conditions (loading, empty, error, populated)
4. **Constraints** — absolute rules (one primary action, skeleton for lists)
5. **Relationships** — pattern dependencies (form requires validation)

This structure maps directly to AI consumption:

```
PATTERN_SPEC = {
  name: "Search + Filter",
  layout: { search: "top, always visible", filters: "below search", results: "below filters" },
  behaviors: { search_trigger: "Enter or click", filter_apply: "immediate", reset: "clear all button" },
  states: { loading: "skeleton cards", empty: "message + CTA", error: "inline + retry" },
  constraints: { primary_action: 1, search_visibility: "always", loading_type: "skeleton" },
  relationships: ["Card List", "Empty State", "Loading Skeleton"]
}
```

### How AI Consumes Pattern Specifications

**Input:** Screen requirements (type, user goal, content type)  
**Processing:** Pattern matching against specification library  
**Output:** Structurally correct interface following all governance rules

The AI system does not "design" — it **assembles** from governed specifications, ensuring every generated interface is compliant by construction.

### How This Improves Consistency

| Without Pattern Specs | With Pattern Specs |
|----------------------|-------------------|
| AI generates arbitrary layouts | AI selects from governed layout patterns |
| Loading states vary (spinner, skeleton, blank) | Loading state determined by content type (list=skeleton, action=spinner) |
| Validation timing inconsistent | Validation timing determined by field type (text=onBlur, password=onChange) |
| Empty states missing or generic | Empty states always include message + context + CTA |
| Multiple primary actions per screen | Exactly one primary action enforced |

### How Patterns Become a Design Language

When patterns are codified as specifications, they form a **generative grammar** — a finite set of rules that can produce infinite valid interfaces:

- **Vocabulary:** Individual patterns (Card, Form, Modal, Toast)
- **Syntax:** Composition rules (how patterns combine)
- **Semantics:** Behavioral contracts (what each pattern means to the user)
- **Constraints:** Governance rules (what is never allowed)

### Conditional Logic Examples for AI Generation

```
# Screen Classification → Pattern Selection

IF screen.contains("search") OR screen.contains("discovery"):
  → APPLY Search + Filter pattern
  → APPLY Card List pattern for results
  → REQUIRE Empty State for zero results
  → REQUIRE Skeleton Loading for content fetch

IF screen.contains("form") AND field_count <= 8:
  → APPLY Simple Form Layout
  → APPLY Inline Validation
  → REQUIRE single Primary Action ("Submit")

IF screen.contains("form") AND field_count > 8:
  → APPLY Multi-step Form pattern
  → APPLY Stepper with step count = ceil(field_count / 4)
  → APPLY per-step Validation
  → REQUIRE Review step before final submit

IF action.type == "delete" OR action.type == "irreversible":
  → REQUIRE Confirmation Modal
  → Destructive button MUST use alert color
  → Cancel MUST be safe default

IF action.completed == true:
  → APPLY Feedback pattern
  → Success: auto-dismiss toast (5s)
  → Error: persistent toast with retry CTA

IF content.loading == true AND content.type == "list":
  → APPLY Skeleton Loading (never spinner)
  → Skeleton MUST mirror final layout structure
  → Interactive controls MUST remain functional

IF content.loading == true AND content.type == "action":
  → APPLY Spinner inside trigger button
  → Button MUST be disabled during processing
  → Label MUST change to progressive text

IF screen.primary_actions > 1:
  → ERROR: Violation of single primary action rule
  → DEMOTE secondary actions to outlined/ghost style
```

### Structured AI Prompt Template

```markdown
## Generate Interface: [Screen Name]

### Context
- User type: [authenticated/anonymous]
- User goal: [primary task]
- Content type: [list/form/detail/dashboard]

### Required Patterns
- Layout: [from pattern inventory]
- Interaction: [from pattern inventory]
- Flow: [if multi-step]

### Mandatory States
- Loading: [skeleton/spinner based on content type]
- Empty: [message + CTA, contextual]
- Error: [inline + retry, descriptive]

### Constraints
- Primary action: exactly 1, [label], [position]
- Validation: inline, [timing based on field type]
- Feedback: [toast type based on action criticality]
- Accessibility: focus management, aria-labels, WCAG AA

### Do NOT
- Add multiple primary actions
- Use spinner for list loading
- Use placeholder-only labels
- Auto-dismiss error feedback
- Show blank screen for empty state
```

---

## 10. Future Evolution Roadmap

### Phase 1 — Research Consolidation (Current)

**Objectives:**
- Complete pattern inventory from existing product surfaces
- Document all identified gaps and inconsistencies
- Establish pattern categorization taxonomy
- Create initial AI generation rules per pattern

**Deliverables:**
- This document (UI Pattern Research Initiative)
- Gap analysis with prioritized remediation plan
- Pattern relationship map
- Initial AI rule specifications

**Expected Impact:**
- Shared understanding of current state across teams
- Prioritized backlog for standardization work
- Foundation for all subsequent phases

---

### Phase 2 — Pattern Guidelines (Month 2–3)

**Objectives:**
- Transform pattern inventory into actionable design guidelines
- Create usage decision trees (when to use which pattern)
- Define anti-patterns with examples
- Establish pattern composition rules

**Deliverables:**
- Pattern guideline documentation (human-readable)
- Decision tree diagrams for pattern selection
- Anti-pattern catalog with "do/don't" examples
- Composition rules for multi-pattern screens

**Expected Impact:**
- Teams can self-serve pattern decisions without design system team review
- Reduced inconsistency in new feature design
- Faster design iteration with clear constraints

---

### Phase 3 — Component Alignment (Month 3–5)

**Objectives:**
- Align existing component libraries with pattern specifications
- Identify component gaps (patterns without implementations)
- Standardize component APIs to support pattern states
- Create shared component variants for all pattern states

**Deliverables:**
- Component audit report (alignment vs. gaps)
- Updated component library with state variants (loading, empty, error)
- Shared tokens for state colors, animations, spacing
- Component documentation linked to pattern specifications

**Expected Impact:**
- Development teams implement patterns correctly by using governed components
- Reduced custom implementations
- Consistent state handling across all product surfaces

---

### Phase 4 — AI Structured Inputs (Month 5–7)

**Objectives:**
- Transform pattern specifications into machine-readable format
- Create structured input schemas for AI generation tools
- Build validation layer that checks AI output against pattern rules
- Develop prompt templates for common screen types

**Deliverables:**
- JSON/YAML pattern specification schemas
- AI prompt template library
- Output validation rules (automated compliance checking)
- Integration documentation for AI tools

**Expected Impact:**
- AI-generated interfaces are pattern-compliant by construction
- Reduced manual review of AI output
- Consistent quality regardless of which team or tool generates the interface

---

### Phase 5 — Automated Layout Generation (Month 7–10)

**Objectives:**
- Build generation pipeline: requirements → pattern selection → layout output
- Implement conditional logic engine (IF/THEN pattern rules)
- Create feedback loop: generated output → validation → correction
- Support multi-screen flow generation (not just single screens)

**Deliverables:**
- Layout generation engine (prototype)
- Pattern selection algorithm
- Automated validation pipeline
- Flow generation capability (multi-screen sequences)

**Expected Impact:**
- Screen generation time reduced from hours to minutes
- Consistent output quality across all generated interfaces
- Teams focus on unique business logic, not structural decisions

---

### Phase 6 — Plugin / Tooling Integration (Month 10–14)

**Objectives:**
- Integrate pattern system into design tools (Figma plugin)
- Integrate into development tools (code generation, linting)
- Build real-time compliance checking in design and development workflows
- Create governance dashboard for pattern adoption metrics

**Deliverables:**
- Figma plugin: pattern insertion, validation, state generation
- Code generation templates aligned with pattern specs
- Linting rules for pattern compliance (CI/CD integration)
- Governance dashboard: adoption rates, violation tracking, coverage metrics

**Expected Impact:**
- Pattern compliance becomes frictionless (built into existing workflows)
- Violations caught at creation time, not review time
- Measurable governance: track consistency improvement over time
- Self-reinforcing system: easier to comply than to deviate

---

## Appendix: Pattern Relationship Map

```
Search + Filter ──→ Card List ──→ Empty State
       │                │              │
       │                ▼              ▼
       │         Loading Skeleton   Illustration + CTA
       │                │
       ▼                ▼
  Primary Action    Pagination
       │
       ▼
Form Layout ──→ Validation ──→ Feedback (Toast)
       │              │
       ▼              ▼
Multi-step Form   Error Summary
       │
       ▼
Confirmation Modal ──→ Feedback (Toast)
       │
       ▼
  Primary Action (Destructive)
```

---

*This document represents the foundation of a scalable, AI-ready Design System initiative. It is a living artifact that evolves with product complexity, team growth, and tooling capabilities.*
