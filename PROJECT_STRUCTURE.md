# InterpreLab Project Structure

This document provides a visual representation of the entire project structure using Mermaid diagrams.

## Project Root Structure

```mermaid
graph TD
    Root["interprelab-eco-landing-page/"]
    
    Root --> Config["📄 Configuration Files"]
    Root --> Src["📁 src/"]
    Root --> Public["📁 public/"]
    Root --> Docs["📁 docs/"]
    Root --> Build["📁 dist/"]
    Root --> NodeModules["📁 node_modules/"]
    Root --> Supabase["📁 supabase/"]
    
    Config --> package["package.json"]
    Config --> tsconfig["tsconfig.json"]
    Config --> vite["vite.config.ts"]
    Config --> vitest["vitest.config.ts"]
    Config --> tailwind["tailwind.config.ts"]
    Config --> eslint["eslint.config.js"]
    Config --> index["index.html"]
    Config --> env[".env"]
    Config --> firebase["firebase.json"]
    
    Public --> favicon["favicon.svg"]
    Public --> logo["logo.png"]
    Public --> placeholder["placeholder.svg"]
    
    style Root fill:#2E5266,color:#fff
    style Src fill:#5FB3B3,color:#000
    style Config fill:#E8E8E8,color:#000
```

## Source Directory Structure

```mermaid
graph TD
    Src["src/"]
    
    Src --> Pages["📁 pages/ (16 files)"]
    Src --> Components["📁 components/ (78 children)"]
    Src --> Contexts["📁 contexts/ (2 files)"]
    Src --> Hooks["📁 hooks/ (3 files)"]
    Src --> Lib["📁 lib/ (5 files)"]
    Src --> Modules["📁 modules/ (20 children)"]
    Src --> Integrations["📁 integrations/"]
    Src --> Services["📁 services/ (1 file)"]
    Src --> Utils["📁 utils/ (7 files)"]
    Src --> Test["📁 test/ (2 files)"]
    Src --> Assets["📁 assets/"]
    
    Src --> AppTsx["App.tsx"]
    Src --> MainTsx["main.tsx"]
    Src --> IndexCss["index.css"]
    Src --> AppCss["App.css"]
    Src --> ViteEnv["vite-env.d.ts"]
    
    style Src fill:#5FB3B3,color:#000
    style Pages fill:#FFE5B4,color:#000
    style Components fill:#FFE5B4,color:#000
```

## Pages Directory

```mermaid
graph LR
    Pages["pages/"]
    
    Pages --> Index["Index.tsx<br/>(Landing Page)"]
    Pages --> InterpreBot["InterpreBot.tsx<br/>(AI Assessment)"]
    Pages --> InterpreCoach["InterpreCoach.tsx<br/>(Real-time Assistant)"]
    Pages --> InterpreStudy["InterpreStudy.tsx<br/>(Training Hub - 1108 lines)"]
    Pages --> InterpreLink["InterpreLink.tsx<br/>(Community)"]
    Pages --> InterpreTrack["InterpreTrack.tsx<br/>(Tracking - Lazy)"]
    Pages --> Dashboard["Dashboard.tsx<br/>(Protected)"]
    Pages --> Settings["Settings.tsx<br/>(Protected)"]
    Pages --> SignIn["SignIn.tsx"]
    Pages --> Waitlist["Waitlist.tsx"]
    Pages --> About["About.tsx"]
    Pages --> Contact["Contact.tsx"]
    Pages --> Resources["Resources.tsx"]
    Pages --> Dilemma["Dilemma.tsx"]
    Pages --> NotFound["NotFound.tsx"]
    Pages --> CallTracker["CallTracker.tsx"]
    
    style Pages fill:#FFE5B4,color:#000
    style InterpreStudy fill:#FFB6C1,color:#000
```

## Components Directory Structure

```mermaid
graph TD
    Components["components/"]
    
    Components --> UI["📁 ui/ (49 components)"]
    Components --> Landing["📁 landing/ (8 components)"]
    Components --> Features["📁 features/"]
    Components --> Sections["📁 sections/"]
    Components --> Dashboard["📁 dashboard/ (5 files)"]
    Components --> Dilemma["📁 dilemma/ (3 files)"]
    
    Components --> Navigation["Navigation.tsx"]
    Components --> Footer["Footer.tsx"]
    Components --> Layout["Layout.tsx"]
    Components --> ProtectedRoute["ProtectedRoute.tsx"]
    Components --> ExtensionUI["ExtensionUI.tsx<br/>(22KB)"]
    
    UI --> Button["button.tsx"]
    UI --> Card["card.tsx"]
    UI --> Badge["badge.tsx"]
    UI --> Dialog["dialog.tsx"]
    UI --> Dropdown["dropdown-menu.tsx"]
    UI --> Form["form.tsx"]
    UI --> Input["input.tsx"]
    UI --> Toast["toast.tsx"]
    UI --> Sonner["sonner.tsx"]
    UI --> More["... 40 more components"]
    
    Landing --> Hero["Hero.tsx"]
    Landing --> StoryVideo["StoryDrivenVideoHero.tsx"]
    Landing --> ProductShowcase["ProductShowcase.tsx"]
    Landing --> Certificates["CertificatesPremium.tsx"]
    Landing --> Testimonials["Testimonials.tsx"]
    Landing --> Stats["StatsSection.tsx"]
    
    Features --> InterpreTrackDir["📁 InterpreTrack/"]
    Features --> InterpreStudyDir["📁 InterpreStudy/"]
    
    Sections --> FAQ["📁 FAQ/"]
    Sections --> Wellness["WellnessSection.tsx"]
    Sections --> QAFeedback["QAFeedbackSection.tsx"]
    
    style Components fill:#FFE5B4,color:#000
    style UI fill:#E0F7FA,color:#000
    style Landing fill:#FFF9C4,color:#000
```

## Contexts & Hooks

```mermaid
graph LR
    Contexts["contexts/"]
    Hooks["hooks/"]
    
    Contexts --> AuthContext["AuthContext.tsx<br/>(Auth State)"]
    Contexts --> LanguageContext["LanguageContext.tsx<br/>(i18n)"]
    
    Hooks --> UseToast["use-toast.ts"]
    Hooks --> UseMobile["use-mobile.tsx"]
    Hooks --> UseOther["... other hooks"]
    
    style Contexts fill:#C8E6C9,color:#000
    style Hooks fill:#FFCCBC,color:#000
```

## Integrations & Services

```mermaid
graph TD
    Integrations["integrations/"]
    Services["services/"]
    Lib["lib/"]
    Utils["utils/"]
    
    Integrations --> Supabase["📁 supabase/"]
    Supabase --> Client["client.ts"]
    Supabase --> Types["types.ts"]
    
    Services --> API["API Service Files"]
    
    Lib --> UtilsLib["utils.ts<br/>(cn, helpers)"]
    Lib --> OtherLib["... 4 more files"]
    
    Utils --> UtilsFiles["7 utility files"]
    
    style Integrations fill:#E1BEE7,color:#000
    style Services fill:#FFECB3,color:#000
```

## Modules Directory

```mermaid
graph TD
    Modules["modules/<br/>(20 children)"]
    
    Modules --> InterpreTrack["📁 interpretrack/"]
    Modules --> OtherModules["... other business logic modules"]
    
    InterpreTrack --> TrackComponents["20 tracking-related files"]
    
    style Modules fill:#F8BBD0,color:#000
```

## Configuration Files Detail

```mermaid
graph LR
    ConfigRoot["Configuration"]
    
    ConfigRoot --> TS["TypeScript"]
    ConfigRoot --> Build["Build Tools"]
    ConfigRoot --> Style["Styling"]
    ConfigRoot --> Test["Testing"]
    ConfigRoot --> Deploy["Deployment"]
    
    TS --> tsconfig["tsconfig.json"]
    TS --> tsconfigApp["tsconfig.app.json"]
    TS --> tsconfigNode["tsconfig.node.json"]
    
    Build --> vite["vite.config.ts"]
    Build --> package["package.json"]
    
    Style --> tailwind["tailwind.config.ts"]
    Style --> postcss["postcss.config.js"]
    Style --> components["components.json"]
    
    Test --> vitest["vitest.config.ts"]
    
    Deploy --> firebase["firebase.json"]
    Deploy --> firestore["firestore.rules"]
    Deploy --> storage["storage.rules"]
    
    style ConfigRoot fill:#B0BEC5,color:#000
```

## Complete File Tree Summary

```mermaid
mindmap
  root((InterpreLab))
    Configuration
      package.json
      tsconfig files
      vite.config.ts
      tailwind.config.ts
      eslint.config.js
    Source Code
      pages 16 files
        Index.tsx
        InterpreStudy.tsx
        InterpreBot.tsx
        InterpreCoach.tsx
        InterpreLink.tsx
        InterpreTrack.tsx
        Dashboard.tsx
        Settings.tsx
        SignIn.tsx
        Others
      components 78 children
        ui 49 components
        landing 8 components
        features
        sections
        Navigation
        Footer
      contexts
        AuthContext
        LanguageContext
      hooks 3 files
      lib 5 files
      modules 20 children
      integrations
        supabase
      services
      utils 7 files
    Public Assets
      favicon.svg
      logo.png
      placeholder.svg
    Documentation
      README.md
      ARCHITECTURE.md
      GEMINI.md
    Build Output
      dist
```

## Key Statistics

- **Total Pages**: 16 route components
- **Total Components**: 78+ reusable components
- **UI Components**: 49 shadcn/ui components
- **Contexts**: 2 global state providers
- **Hooks**: 3+ custom hooks
- **Modules**: 20+ business logic modules
- **Largest File**: InterpreStudy.tsx (1,108 lines)
- **Lazy Loaded**: InterpreTrack.tsx

## Technology Stack Visualization

```mermaid
graph TB
    subgraph Frontend
        React["React 19.2.1"]
        TS["TypeScript 5.8.3"]
        Vite["Vite 6.0.0"]
        Router["React Router 6.30.1"]
    end
    
    subgraph Styling
        Tailwind["Tailwind CSS 3.4.17"]
        Shadcn["shadcn/ui"]
        Framer["Framer Motion"]
    end
    
    subgraph State
        Query["TanStack Query"]
        Context["React Context"]
        RHF["React Hook Form"]
    end
    
    subgraph Backend
        Supabase["Supabase"]
        Firebase["Firebase"]
        Gemini["Google Gemini API"]
    end
    
    subgraph Testing
        Vitest["Vitest"]
        TestingLib["Testing Library"]
    end
    
    React --> Tailwind
    React --> Query
    React --> Router
    Query --> Supabase
    Query --> Firebase
    Query --> Gemini
    
    style Frontend fill:#5FB3B3,color:#000
    style Styling fill:#FFE5B4,color:#000
    style State fill:#C8E6C9,color:#000
    style Backend fill:#E1BEE7,color:#000
```
