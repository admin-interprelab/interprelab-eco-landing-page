# 4. Authentication & Protected Routes

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
