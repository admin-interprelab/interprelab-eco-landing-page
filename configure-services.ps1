# Configure InterpreCoach, InterpreTrack, and InterpreHub services

$services = @(
    @{Name = "interprecoach"; Port = "3004"; BasePath = "/interprecoach"; PageComponent = "InterpreCoach" },
    @{Name = "interpretrack"; Port = "3005"; BasePath = "/interpretrack"; PageComponent = "InterpreTrack" },
    @{Name = "interprehub"; Port = "3006"; BasePath = "/interprehub"; PageComponent = "InterpreLink" }
)

foreach ($svc in $services) {
    Write-Host "Configuring $($svc.Name)..." -ForegroundColor Cyan
    
    # Update package.json
    $packageJson = Get-Content "services/$($svc.Name)/package.json" -Raw
    $packageJson = $packageJson -replace '"@interprelab/interprebot"', "`"@interprelab/$($svc.Name)`""
    Set-Content "services/$($svc.Name)/package.json" $packageJson
    
    # Update vite.config.ts  
    $viteConfig = Get-Content "services/$($svc.Name)/vite.config.ts" -Raw
    $viteConfig = $viteConfig -replace "base: '/interprebot'", "base: '$($svc.BasePath)'"
    $viteConfig = $viteConfig -replace "port: 3001", "port: $($svc.Port)"
    Set-Content "services/$($svc.Name)/vite.config.ts" $viteConfig
    
    # Update nginx.conf
    $nginxConf = Get-Content "services/$($svc.Name)/nginx.conf" -Raw
    $nginxConf = $nginxConf -replace "InterpreBot", "$($svc.PageComponent)"
    $nginxConf = $nginxConf -replace "/interprebot", "$($svc.BasePath)"
    Set-Content "services/$($svc.Name)/nginx.conf" $nginxConf
    
    # Create App.tsx
    $appTsx = @"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import $($svc.PageComponent) from './pages/$($svc.PageComponent)';
import './index.css';

function App() {
  return (
    <BrowserRouter basename="`"$($svc.BasePath)`">
      <Routes>
        <Route path="`"/"` element={<$($svc.PageComponent) />} />
        <Route path="`"*"` element={
          <div className="`"min-h-screen flex items-center justify-center"`>
            <div className="`"text-center"`">
              <h1 className="`"text-4xl font-bold mb-4"`">404 - Page Not Found</h1>
              <p className="`"text-muted-foreground"`">The page you're looking for doesn't exist.</p>
            </div>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
"@
    Set-Content "services/$($svc.Name)/src/App.tsx" $appTsx
    
    # Create main.tsx
    $mainTsx = @"
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
"@
    Set-Content "services/$($svc.Name)/src/main.tsx" $mainTsx
    
    Write-Host "✓ $($svc.Name) configured!" -ForegroundColor Green
}

Write-Host ""
Write-Host "All services configured successfully!" -ForegroundColor Green
