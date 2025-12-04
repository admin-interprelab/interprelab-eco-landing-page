---
config:
    layout: elk
    look: handDrawn
    layout: elk
---
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

    classDef entry fill:#4f46e5,color:#fff,stroke:#312e81,stroke-width:3px
    classDef provider fill:#7c3aed,color:#fff,stroke:#6d28d9,stroke-width:2px
    classDef layer fill:#06b6d4,color:#fff,stroke:#0891b2,stroke-width:2px
    classDef service fill:#10b981,color:#fff,stroke:#059669,stroke-width:2px
    classDef backend fill:#f59e0b,color:#fff,stroke:#d97706,stroke-width:2px

    class Main entry
    class AuthProvider,LangProvider,QueryProvider,ThemeProvider provider
    class Pages,Layout,FeatureComps,UIComps layer
    class Services,Hooks,Utils service
    class Supabase backend
