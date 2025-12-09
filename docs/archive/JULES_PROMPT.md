<instruction>You are an expert software engineer. You are working on a WIP branch. Please run `git status` and `git diff` to understand the changes and the current state of the code. Analyze the workspace context and complete the mission brief.</instruction>
<workspace_context>
<active_errors>
File: ExtensionUI.tsx Line 100: Cannot find name 'isRecording'.
File: ExtensionUI.tsx Line 102: Cannot find name 'setIsRecording'.
File: ExtensionUI.tsx Line 102: Cannot find name 'isRecording'.
File: ExtensionUI.tsx Line 105: Cannot find name 'isRecording'.
File: ExtensionUI.tsx Line 125: Cannot find name 'contextWindows'.
File: ExtensionUI.tsx Line 130: Cannot find name 'getTypeColor'.
File: ExtensionUI.tsx Line 131: Cannot find name 'getTypeIcon'.
File: ExtensionUI.tsx Line 148: Cannot find name 'isRecording'.
File: Layout.tsx Line 3: Module '"@/components/interprecoach/ExtensionUI"' has no exported member 'InterpreBotUI'.
</active_errors>
<artifacts>
--- CURRENT TASK CHECKLIST ---
# Visual Enhancements & New Features

## High Priority ⚡

### Visual Fixes

- [ ] Fix light mode statistics in StoryDrivenVideoHero.tsx
- [ ] Update InterpreStudy.tsx interactive cards to theme-aware glass
- [ ] Update card colors across all pages to match theme

### Component Refactoring

- [ ] Move ExtensionUI.tsx to src/components/interprecoach/
- [ ] Update imports in Layout.tsx
- [ ] Remove ExtensionUI from InterpreBot if present

### Gamification System 🎮

- [ ] Create Badge component (src/components/gamification/Badge.tsx)
- [ ] Create BadgeDisplay component
- [ ] Create badge types (src/types/badges.ts)
- [ ] Create useBadges hook
- [ ] Integrate badges with user avatar
- [ ] Add badge tooltips
- [ ] Define achievement criteria

## Medium Priority

### Card Color Updates

- [ ] InterpreLink.tsx - Discussion cards + buttons
- [ ] InterpreBot.tsx - Feature/metric cards + buttons
- [ ] InterpreCoach.tsx - Feature cards + buttons
- [ ] Resources.tsx - Resource cards + buttons
- [ ] About.tsx - Team/stat cards + buttons
- [ ] All pages - Ensure buttons use nobel-gold theme

### Background Enhancements

- [ ] Add hero section backgrounds
- [ ] Add page background patterns
- [ ] Test readability with backgrounds

## Badge System Details

**Badge Types to Implement:**

- First Steps (1 module)
- Dedicated Learner (5 modules)
- Master Interpreter (all modules)
- Week Warrior (7-day streak)
- Assessment Ace (3 assessments)

**Display Locations:**

- User avatar (header)
- Profile/dashboard
- Module completion screens

--- IMPLEMENTATION PLAN ---
# Visual Enhancements & Gamification Implementation Plan

## Goal Description

The goal is to finalize the InterpreLab landing page visual polish and add a gamification badge system. This includes:

- Making overlay text theme‑aware in `StoryDrivenVideoHero`.
- Updating interactive cards in `InterpreStudy` to use glass‑morphism and theme‑aware colors.
- Refactoring `ExtensionUI` into `src/components/interprecoach/` and fixing imports.
- Updating all card components across pages to use the nobel‑gold accent and theme‑aware button styles.
- Adding background images/patterns for hero sections.
- Implementing a badge component system for user achievements.

## Proposed Changes

---

### Visual Fixes

- **StoryDrivenVideoHero.tsx** – make overlay text use `text-foreground` and `dark:text-white` classes (already applied).
- **InterpreStudy.tsx** – replace fixed color classes with `glass` and `border‑border/50` plus theme‑aware button classes.
- **All pages** – ensure cards use `glass` container and button styles (`bg-nobel-gold`, `border-nobel-gold/50`).

---

### Component Refactor

- Move `src/components/ExtensionUI.tsx` to `src/components/interprecoach/ExtensionUI.tsx`.
- Update any imports (e.g., in `Layout.tsx` or pages) to the new path.
- Remove any duplicate `ExtensionUI` usage from `InterpreBot` if present.

---

### Gamification Badge System

- Create `src/components/gamification/Badge.tsx` – a styled badge component.
- Create `src/components/gamification/BadgeDisplay.tsx` – renders a list of badges.
- Add type definitions in `src/types/badges.ts` (enum of badge IDs, titles, descriptions).
- Implement `src/hooks/useBadges.ts` – hook to fetch and manage user badge state (mocked for now).
- Integrate `BadgeDisplay` into the user avatar dropdown in the navigation bar.
- Add tooltip support using `@radix-ui/react-tooltip` for badge details.

---

### Background Enhancements

- Add subtle gradient background to hero sections via Tailwind utilities (`bg-gradient-to-b from-background to-foreground/5`).
- Add a faint pattern SVG as a background image in `src/components/landing/HeroBackground.tsx`.
- Verify readability in both light and dark modes.

## Verification Plan

- **Automated Tests**: Run `npm run test` (existing test suite) and add unit tests for `Badge` component.
- **Manual Checks**:
  1. Run `npm run dev` and toggle theme to verify overlay text, cards, and buttons adapt correctly.
  2. Open each page (`InterpreLink`, `InterpreBot`, `InterpreCoach`, `Resources`, `About`, `InterpreStudy`) and confirm card styling.
  3. Verify `ExtensionUI` loads from new location and functions.
  4. Check badge icons appear on the avatar and display tooltips.
  5. Ensure background images do not hinder text contrast (use Chrome devtools contrast checker).
- **Build**: Run `npm run build` to ensure no compile errors.

---

### Estimated Effort

- Visual fixes: ~2 hours
- Component refactor: ~1 hour
- Badge system: ~4 hours (components, types, hook, integration)
- Backgrounds: ~1 hour
- Testing & verification: ~2 hours

Total: ~10 hours.
</artifacts>
</workspace_context>
<mission_brief>[Describe your task here...]</mission_brief>