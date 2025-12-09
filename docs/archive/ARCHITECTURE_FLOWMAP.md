# InterpreLab Eco Landing Page - Architecture Flowmap

## Overview
This document maps file interconnections, data flows, and identifies redundant processes across the codebase.

---

## 1. Global Architecture Overview

```mermaid
graph TB
    Main["main.tsx<br/>(Entry Point)"] --> App["App.tsx<br/>(Router + Providers)"]

    App --> AuthProvider["AuthProvider<br/>(contexts/AuthContext)"]
    App --> LangProvider["LanguageProvider<br/>(contexts/LanguageContext)"]
    App --> QueryProvider["QueryClientProvider<br/>(@tanstack/react-query)"]
    App --> ThemeProvider["ThemeProvider<br/>(next-themes)"]

    AuthProvider --> Router["BrowserRouter<br/>(react-router-dom)"]
    LangProvider --> Router
    QueryProvider --> Router
    ThemeProvider --> Router

    Router --> Pages["Pages Layer<br/>(public & protected)"]
    Pages --> Layout["Layout Components<br/>(Navigation, Footer, Layout)"]
    Layout --> FeatureComps["Feature Components<br/>(dashboard/, features/, sections/)"]
    FeatureComps --> UIComps["UI Components<br/>(components/ui/)"]

    Pages --> Services["Services Layer<br/>(integrations/supabase/)"]
    FeatureComps --> Services

    Services --> Supabase["Supabase Database<br/>(Real-time, Auth, Functions)"]

    Pages --> Hooks["Custom Hooks<br/>(useCallTracker, use-toast, use-mobile)"]
    FeatureComps --> Hooks

    Hooks --> Utils["Utils & Libs<br/>(lib/, utils/)"]
```

---

## 2. Component Hierarchy & Data Flow

```mermaid
graph TD
    AppRoot["App.tsx"]

    subgraph ProviderStack["Provider Stack"]
        AuthCtx["AuthContext<br/>- user<br/>- session<br/>- signIn/Out"]
        LangCtx["LanguageContext<br/>- language<br/>- setLanguage<br/>- t()"]
        ReactQuery["React Query<br/>- queryClient<br/>- cache management"]
    end

    subgraph PublicPages["Public Pages"]
        Index["Index.tsx<br/>Landing"]
        InterpreBot["InterpreBot.tsx<br/>Training & Assessment"]
        InterpreCoach["InterpreCoach.tsx<br/>Real-time Assistance"]
        InterpreLink["InterpreLink.tsx<br/>Community"]
        Resources["Resources.tsx"]
        About["About.tsx"]
        Contact["Contact.tsx"]
        SignIn["SignIn.tsx"]
        Waitlist["Waitlist.tsx"]
    end

    subgraph ProtectedPages["Protected Pages<br/>(via ProtectedRoute)"]
        Dashboard["Dashboard.tsx<br/>Stats & Analytics"]
        InterpreTrack["InterpreTrack.tsx<br/>Call Tracking"]
        Settings["Settings.tsx<br/>User Preferences"]
    end

    subgraph LandingComps["Landing Components<br/>(Index Page)"]
        Hero["Hero.tsx"]
        StoryVideo["StoryDrivenVideoHero.tsx"]
        ProductShowcase["ProductShowcase.tsx"]
        StatsSection["StatsSection.tsx"]
        Testimonials["Testimonials.tsx"]
    end

    subgraph FeatureComps["Feature Components"]
        InterpreTrackModule["InterpreTrack Feature<br/>(components/features/)"]
        InterpreStudyModule["InterpreStudy Feature<br/>(components/features/)"]
        DashboardModule["Dashboard Components<br/>(components/dashboard/)"]
    end

    subgraph DataServices["Data Services Layer"]
        SupabaseClient["supabase client<br/>(integrations/supabase/client.ts)"]
        CallLogService["CallLogService"]
        UserSettingsService["UserSettingsService"]
        ContactsService["ContactsService"]
        WaitlistService["WaitlistService"]
        ProfilesService["ProfilesService"]
    end

    subgraph Database["Supabase Backend"]
        CallLogs["call_logs table"]
        UserSettings["user_settings table"]
        Contacts["contacts table"]
        Waitlist["waitlist table"]
        Profiles["profiles table"]
        EdgeFunctions["Edge Functions<br/>- wellness-chat<br/>- study-chat<br/>- debriefing<br/>- earnings"]
    end

    AppRoot --> ProviderStack
    AppRoot --> PublicPages
    AppRoot --> ProtectedPages
    Index --> LandingComps
    PublicPages --> FeatureComps
    ProtectedPages --> FeatureComps
    FeatureComps --> DataServices
    DataServices --> SupabaseClient
    SupabaseClient --> Database
```

---

## 3. Data Flow: Call Tracking Example

```mermaid
graph LR
    User["User<br/>(InterpreTrack page)"]
    User -->|triggers| StartCall["Start Call Button"]
    StartCall -->|useCallTracker.startCall()| CallTracker["useCallTracker Hook"]
    CallTracker -->|calls| CallLogService["CallLogService.createCallLog()"]
    CallLogService -->|insert| Supabase["Supabase<br/>call_logs table"]

    Timer["Timer Running<br/>(interval: 1000ms)"]
    CallTracker -->|manages| Timer
    Timer -->|updates| ElapsedSeconds["elapsedSeconds state"]

    User -->|triggers| EndCall["End Call Button"]
    EndCall -->|useCallTracker.endCall()| CalcEarnings["Calculate Earnings"]
    CalcEarnings -->|uses| UserSettings["UserSettingsService<br/>get pay_rate"]
    UserSettings -->|query| SupabaseSettings["user_settings table"]
    CalcEarnings -->|update| CallLogService
    CallLogService -->|update| Supabase

    Supabase -->|emit| Dashboard["Dashboard page<br/>displays updated stats"]
```

---

## 4. Authentication & Protected Routes

```mermaid
graph TD
    BrowserRouter["BrowserRouter"]

    BrowserRouter -->|All Routes| Router["Routes<br/>(App.tsx)"]

    Router -->|Public| PublicRoutes["Public Routes<br/>- /<br/>- /interprebot<br/>- /interprecoach<br/>- /resources<br/>- /about<br/>- /signin<br/>- /waitlist"]

    Router -->|Protected| ProtectedRoutes["Protected Routes<br/>- /dashboard<br/>- /interpretrack<br/>- /call-tracker<br/>- /settings"]

    ProtectedRoutes -->|Wrapped in| ProtectedRoute["ProtectedRoute.tsx<br/>Component"]

    ProtectedRoute -->|Checks| AuthContext["AuthContext.user"]
    AuthContext -->|Loading?| ShowSpinner["Show Loading Spinner"]
    AuthContext -->|User? true| RenderPage["Render Protected Page"]
    AuthContext -->|User? false| Redirect["Navigate to /signin"]

    SignIn["SignIn Page"] -->|useAuth().signIn()| SupabaseAuth["Supabase Auth"]
    SupabaseAuth -->|success| SetSession["AuthContext.session updated"]
    SetSession -->|trigger| RerenderApp["App rerenders"]
    RerenderApp -->|user exists| AllowAccess["User can access protected routes"]
```

---

## 5. Context & Global State Management

```mermaid
graph TB
    App["App.tsx<br/>(Root)"]

    subgraph ContextA["AuthContext.tsx"]
        AuthState["State:<br/>- user: User | null<br/>- session: Session | null<br/>- loading: boolean"]
        AuthMethods["Methods:<br/>- signIn(email, pwd)<br/>- signUp(email, pwd, name)<br/>- signOut()"]
        AuthListener["useEffect:<br/>onAuthStateChange()"]
    end

    subgraph ContextB["LanguageContext.tsx"]
        LangState["State:<br/>- language: string<br/>- availableLanguages[]"]
        LangMethods["Methods:<br/>- setLanguage(lang)<br/>- t(key) -> string"]
        LangEffect["useEffect:<br/>loadUserLanguage()<br/>from user_settings"]
    end

    App -->|Wraps| AuthContext
    App -->|Wraps| LanguageContext
    AuthContext -->|provides| AuthState
    AuthContext -->|provides| AuthMethods
    AuthContext -->|uses| SupabaseAuth["supabase.auth"]

    LanguageContext -->|provides| LangState
    LanguageContext -->|provides| LangMethods
    LanguageContext -->|uses| AuthState
    LanguageContext -->|queries| UserSettings["user_settings table"]

    AuthContext -->|consumed by| SignIn["SignIn.tsx"]
    AuthContext -->|consumed by| Dashboard["Dashboard.tsx"]
    AuthContext -->|consumed by| Settings["Settings.tsx"]

    LanguageContext -->|consumed by| Navigation["Navigation.tsx"]
    LanguageContext -->|consumed by| Settings
```

---

## 6. Services & Data Access Layer

```mermaid
graph TB
    subgraph Services["Services Layer<br/>(integrations/supabase/services.ts)"]
        CallLogSvc["CallLogService<br/>- createCallLog()<br/>- updateCallLog()<br/>- getCallLogs()<br/>- deleteCallLog()"]

        UserSettingsSvc["UserSettingsService<br/>- getUserSettings()<br/>- updateUserSettings()"]

        ContactsSvc["ContactsService<br/>- createContact()<br/>- getContacts()"]

        WaitlistSvc["WaitlistService<br/>- addToWaitlist()<br/>- getWaitlist()"]

        ProfilesSvc["ProfilesService<br/>- getProfile()<br/>- updateProfile()"]
    end

    subgraph Types["Type System<br/>(integrations/supabase/types.ts)"]
        Tables["Tables<br/>(Row types)"]
        Insert["TablesInsert<br/>(Insert types)"]
        Update["TablesUpdate<br/>(Update types)"]
    end

    subgraph Hooks["Custom Hooks"]
        CallTracker["useCallTracker<br/>- manages call session<br/>- calculates earnings<br/>- formats display"]
        Toast["useToast<br/>- show notifications"]
        Mobile["useMobile<br/>- breakpoint detection"]
    end

    CallTracker -->|uses| CallLogSvc
    CallTracker -->|uses| UserSettingsSvc

    Dashboard["Dashboard.tsx"] -->|uses| CallLogSvc
    Dashboard -->|uses| UserSettingsSvc

    SignIn["SignIn.tsx"] -->|uses| supabaseAuth["supabase.auth"]
    Waitlist["Waitlist.tsx"] -->|uses| WaitlistSvc
    Contact["Contact.tsx"] -->|uses| ContactsSvc
    Settings["Settings.tsx"] -->|uses| UserSettingsSvc

    Services -->|uses| Types
    Services -->|calls| SupabaseClient["supabase client"]
    SupabaseClient -->|connects| Database["Supabase Database"]
```

---

## 7. Module-Based Architecture: InterpreTrack

```mermaid
graph TB
    InterpreTrackPage["InterpreTrack.tsx<br/>(pages/)"]

    InterpreTrackPage -->|imports| StatsCards["StatsCards Component"]
    InterpreTrackPage -->|imports| CallTypeChart["CallTypeChart Component"]
    InterpreTrackPage -->|imports| WeeklyChart["WeeklyChart Component"]
    InterpreTrackPage -->|imports| ManualLog["ManualLog Component"]
    InterpreTrackPage -->|imports| RecentCalls["RecentCalls Component"]
    InterpreTrackPage -->|imports| AIInsights["AIInsights Component"]
    InterpreTrackPage -->|imports| DemoBanner["DemoBanner Component"]

    InterpreTrackPage -->|uses| useStats["useStats Hook<br/>(modules/interpretrack/hooks/)"]

    useStats -->|queries| CallLogService["CallLogService"]
    useStats -->|queries| UserSettingsService["UserSettingsService"]

    subgraph Dashboard["modules/interpretrack/components/"]
        StatsCards
        CallTypeChart
        WeeklyChart
        ManualLog
        RecentCalls
        AIInsights
        DemoBanner
    end

    Dashboard -->|display| Data["Aggregated Call Data<br/>- total calls<br/>- earnings<br/>- call types<br/>- weekly stats"]
```

---

## 8. Landing Page Component Tree

```mermaid
graph TD
    Index["Index.tsx<br/>(pages/)"]

    Index -->|renders| Navigation["Navigation.tsx"]
    Index -->|renders| Hero["Hero.tsx"]
    Index -->|renders| StoryVideo["StoryDrivenVideoHero.tsx"]
    Index -->|renders| ProductShowcase["ProductShowcase.tsx"]
    Index -->|renders| WellnessSection["WellnessSection.tsx<br/>(sections/)"]
    Index -->|renders| QAFeedback["QAFeedbackSection.tsx<br/>(sections/)"]
    Index -->|renders| InterpreTrackSec["InterpreTrackSection.tsx<br/>(features/)"]
    Index -->|renders| InterpreStudySec["InterpreStudySection.tsx<br/>(features/)"]
    Index -->|renders| FAQSection["FAQSection.tsx<br/>(sections/)"]
    Index -->|renders| StatsSection["StatsSection.tsx"]
    Index -->|renders| Testimonials["Testimonials.tsx"]
    Index -->|renders| Footer["Footer.tsx"]

    Navigation -->|provides| NavLinks["Route Navigation<br/>- /interprebot<br/>- /interprecoach<br/>- /interprelink<br/>- /resources"]
```

---

## 9. Identified Redundancies & Optimization Opportunities

### 🔴 Critical Redundancies

#### 1. **Multiple Call Tracking Implementations**
- `useCallTracker.ts` (custom hook)
- `modules/interpretrack/` (module-based approach)
- Possible duplication in logic

**Recommendation:** Consolidate into single `useCallTracker` hook, re-export from hooks directory.

#### 2. **Dual Page Routes**
- `/interpretrack` and `/call-tracker` both render same component
- `/interpre-wellness` and `/interprewellbeing` aliasing

**Recommendation:** Keep single canonical route, redirect aliases to main route.

#### 3. **Multiple Service Calls for User Settings**
- `UserSettingsService.getUserSettings()` called in:
  - `LanguageContext.tsx` (on user change)
  - `useCallTracker.ts` (on mount)
  - `Settings.tsx` (page load)
  - Possibly multiple component re-renders

**Recommendation:** Cache in `AuthContext` or use React Query for centralized state.

#### 4. **Redundant UI Components**
- `components/ui/` has many shadcn/ui primitives
- Many pages duplicate similar card, button, badge patterns

**Recommendation:** Create reusable component library patterns (e.g., `DataCard`, `FormCard`, `StatsCard`).

### 🟡 Moderate Concerns

#### 5. **Edge Function Invocations**
- `wellness-chat`, `study-chat`, `debriefing-questionnaire`, `generate-earnings-projection`
- Each invoked separately from different components
- No centralized error handling or retry logic

**Recommendation:** Create unified `EdgeFunctionService` with error handling, caching, retry logic.

#### 6. **Environment Variable Dependencies**
- Multiple files reference `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
- Different env files (`.env`, `.env.local`, `.env.production`)

**Recommendation:** Centralize env config in `lib/env.ts` or `config.ts`.

#### 7. **Toast/Notification Duplication**
- `useToast()` called in many components (SignIn, Waitlist, Dashboard, Settings)
- Sonner and shadcn/ui toaster both imported in App.tsx

**Recommendation:** Document which one to use; consider removing one.

#### 8. **Type Redundancy**
- Supabase-generated `types.ts` is auto-generated
- Manual type definitions may exist in lib/types.ts

**Recommendation:** Single source of truth - use generated types exclusively.

### 🟢 Healthy Patterns (Keep)

✅ **Hooks for Business Logic** - `useCallTracker`, `useMobile`, `useToast` properly isolated
✅ **Context for Auth/i18n** - Right abstraction level
✅ **Service Layer** - Supabase CRUD centralized
✅ **React Query** - Good for server state caching
✅ **Protected Routes** - Proper access control pattern

---

## 10. Suggested Refactoring Plan

```mermaid
graph LR
    Current["Current State<br/>- Scattered logic<br/>- Some duplication<br/>- Multiple sources"]

    Step1["Step 1: Consolidate<br/>- useCallTracker hook<br/>- UserSettings cache<br/>- Edge function service"]

    Step2["Step 2: Centralize Config<br/>- env variables<br/>- API endpoints<br/>- constants"]

    Step3["Step 3: Standardize UI<br/>- Reusable patterns<br/>- Remove component duplication<br/>- Consistent styling"]

    Step4["Step 4: Type Safety<br/>- Single source truth<br/>- Remove manual types<br/>- Full type coverage"]

    Step5["Optimized State<br/>- 20-30% less code<br/>- Better maintainability<br/>- Fewer bugs"]

    Current --> Step1 --> Step2 --> Step3 --> Step4 --> Step5
```

---

## 11. File Import Dependency Graph (Key Files)

```mermaid
graph TB
    App.tsx -->|imports| AuthContext
    App.tsx -->|imports| LanguageContext
    App.tsx -->|imports| Pages

    Dashboard.tsx -->|imports| AuthContext
    Dashboard.tsx -->|imports| supabase
    Dashboard.tsx -->|imports| utils

    InterpreTrack.tsx -->|imports| useStats
    InterpreTrack.tsx -->|imports| modules
    InterpreTrack.tsx -->|imports| components

    useCallTracker.ts -->|imports| UserSettingsService
    useCallTracker.ts -->|imports| CallLogService
    useCallTracker.ts -->|imports| AuthContext

    Settings.tsx -->|imports| AuthContext
    Settings.tsx -->|imports| LanguageContext
    Settings.tsx -->|imports| UserSettingsService

    SignIn.tsx -->|imports| AuthContext
    SignIn.tsx -->|imports| validations

    Waitlist.tsx -->|imports| WaitlistService
    Waitlist.tsx -->|imports| validations
```

---

## Summary Statistics

| Category | Count | Health |
|----------|-------|--------|
| Pages | 14 | ✅ Good separation |
| Components | 40+ | ⚠️ Some duplication |
| Services | 5 | ✅ Well organized |
| Contexts | 2 | ✅ Essential only |
| Custom Hooks | 3 | ✅ Focused purposes |
| Edge Functions | 4 | ⚠️ Needs wrapper |
| Data Tables | 8 | ✅ Type-safe |
| Redundant Patterns | 8 | 🔴 Needs refactor |

