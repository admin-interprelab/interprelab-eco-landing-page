# InterpreLab Eco - Architecture & Flow Diagrams

This directory contains individual Mermaid diagram files for easy viewing with the Mermaid Markdown Preview extension.

## 📊 Diagram Index

### Foundation & Setup
- **[01-global-architecture.md](./01-global-architecture.md)** - Overall app structure and provider layers
  - Entry point → App.tsx → Providers → Router → Pages/Services

### Component Structure
- **[02-component-hierarchy.md](./02-component-hierarchy.md)** - Full component tree and data flow
  - Pages, Landing Components, Features, Services, Database

### Data Flows
- **[03-call-tracking-dataflow.md](./03-call-tracking-dataflow.md)** - Detailed call tracking example
  - User action → Hook → Service → Database → Dashboard

### Authentication
- **[04-auth-protected-routes.md](./04-auth-protected-routes.md)** - Auth flow and route protection
  - Public/Protected routes → ProtectedRoute component → AuthContext

### State Management
- **[05-context-state-management.md](./05-context-state-management.md)** - Global state via Contexts
  - AuthContext, LanguageContext, their consumers

### Services & Data
- **[06-services-data-layer.md](./06-services-data-layer.md)** - Service layer architecture
  - All data services, types, hooks, and database connections

### Modules
- **[07-interpretrack-module.md](./07-interpretrack-module.md)** - InterpreTrack feature module
  - Module components, useStats hook, data aggregation

### Pages
- **[08-landing-page-tree.md](./08-landing-page-tree.md)** - Landing page component tree
  - Index page structure and all sub-components

### Optimization
- **[09-refactoring-plan.md](./09-refactoring-plan.md)** - Suggested refactoring steps
  - Path from current state to optimized architecture

### Dependencies
- **[10-import-dependencies.md](./10-import-dependencies.md)** - Key file import relationships
  - How major files import from contexts, services, etc.

---

## 🎯 Key Insights from Architecture Analysis

### Critical Redundancies Found
1. **Multiple Call Tracking** - useCallTracker + modules/interpretrack duplication
2. **Dual Routes** - /interpretrack & /call-tracker alias (same component)
3. **UserSettings Queries** - Called from 3+ places without caching
4. **UI Duplication** - Repetitive card/button patterns across pages

### Moderate Concerns
5. **Edge Functions** - No centralized error handling/retry logic
6. **Config Scattered** - Env vars referenced in multiple files
7. **Toast Duplication** - Both Sonner and shadcn/ui toaster imported
8. **Type Redundancy** - Auto-generated types + manual definitions

### Healthy Patterns (Keep)
✅ Hooks for business logic isolation
✅ Context for auth/i18n (right abstraction)
✅ Service layer for data access
✅ React Query for caching
✅ Protected route pattern

---

## 📋 Refactoring Priority

### Phase 1: High Priority
- [ ] Consolidate useCallTracker hook
- [ ] Create EdgeFunctionService wrapper
- [ ] Cache UserSettings in AuthContext or React Query

### Phase 2: Medium Priority
- [ ] Centralize env config (lib/env.ts)
- [ ] Create reusable UI component patterns
- [ ] Document toast system choice

### Phase 3: Low Priority
- [ ] Remove manual type definitions
- [ ] Consolidate route aliases
- [ ] Optimize component imports

---

## 📊 Statistics

| Metric | Count | Status |
|--------|-------|--------|
| Pages | 14 | ✅ Well organized |
| Components | 40+ | ⚠️ Some duplication |
| Services | 5 | ✅ Clean architecture |
| Contexts | 2 | ✅ Minimal & essential |
| Custom Hooks | 3 | ✅ Focused |
| Edge Functions | 4 | ⚠️ Needs wrapper |
| Data Tables | 8 | ✅ Type-safe |
| Redundancies | 8 | 🔴 Needs refactor |

---

## 🔗 Quick Navigation

**I want to understand...**
- How the app starts → See [01-global-architecture.md](./01-global-architecture.md)
- Component relationships → See [02-component-hierarchy.md](./02-component-hierarchy.md)
- How data flows → See [03-call-tracking-dataflow.md](./03-call-tracking-dataflow.md)
- Authentication system → See [04-auth-protected-routes.md](./04-auth-protected-routes.md)
- Global state → See [05-context-state-management.md](./05-context-state-management.md)
- Data services → See [06-services-data-layer.md](./06-services-data-layer.md)
- Call tracking feature → See [07-interpretrack-module.md](./07-interpretrack-module.md)
- Landing page → See [08-landing-page-tree.md](./08-landing-page-tree.md)
- What to refactor → See [09-refactoring-plan.md](./09-refactoring-plan.md)
- Who imports what → See [10-import-dependencies.md](./10-import-dependencies.md)

---

## 💡 How to Use These Diagrams

1. **View in VS Code**
   - Install "Mermaid Markdown Preview" extension
   - Open any `.md` file in this folder
   - Right-click → "Open Preview" or press `Ctrl+Shift+V`

2. **Export as Images**
   - Use mermaid.live: https://mermaid.live
   - Paste diagram content
   - Export as PNG/SVG

3. **Share & Document**
   - These diagrams are version controlled
   - Use them in pull requests and documentation
   - Reference in code review discussions

---

**Last Updated:** December 4, 2025
**Branch:** wip-jules-2025-12-01T16-48-13-712Z
