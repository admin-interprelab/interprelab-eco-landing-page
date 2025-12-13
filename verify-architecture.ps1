# Architecture Verification Script
# Tests all services for successful builds and proper configuration

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Architecture Verification Report" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$results = @()

# Define all services
$services = @(
    @{Name = "landing"; Port = 5173; Path = "services/landing" },
    @{Name = "auth"; Port = 3006; Path = "services/auth" },
    @{Name = "interprestudy"; Port = 3002; Path = "services/interprestudy" },
    @{Name = "interprebot"; Port = 3003; Path = "services/interprebot" },
    @{Name = "interprecoach"; Port = 3004; Path = "services/interprecoach" },
    @{Name = "interpretrack"; Port = 3005; Path = "services/interpretrack" },
    @{Name = "interprehub"; Port = 3007; Path = "services/interprehub" }
)

Write-Host "Verification Tests:" -ForegroundColor Yellow
Write-Host ""

foreach ($svc in $services) {
    Write-Host "Testing: $($svc.Name.ToUpper())" -ForegroundColor Cyan
    
    $result = @{
        Name        = $svc.Name
        Port        = $svc.Port
        PackageJson = $false
        ViteConfig  = $false
        Dockerfile  = $false
        DistFolder  = $false
        AllPassed   = $false
    }
    
    # Check package.json exists
    if (Test-Path "$($svc.Path)/package.json") {
        Write-Host "  ✓ package.json exists" -ForegroundColor Green
        $result.PackageJson = $true
    }
    else {
        Write-Host "  ✗ package.json missing" -ForegroundColor Red
    }
    
    # Check vite.config.ts (or skip for auth)
    if ($svc.Name -eq "auth") {
        $result.ViteConfig = $true
        Write-Host "  ✓ Node.js service (no vite config needed)" -ForegroundColor Green
    }
    elseif (Test-Path "$($svc.Path)/vite.config.ts") {
        Write-Host "  ✓ vite.config.ts exists" -ForegroundColor Green
        $result.ViteConfig = $true
    }
    else {
        Write-Host "  ✗ vite.config.ts missing" -ForegroundColor Red
    }
    
    # Check Dockerfile
    if (Test-Path "$($svc.Path)/Dockerfile") {
        Write-Host "  ✓ Dockerfile exists" -ForegroundColor Green
        $result.Dockerfile = $true
    }
    else {
        Write-Host "  ✗ Dockerfile missing" -ForegroundColor Red
    }
    
    # Check dist folder (build output)
    if (Test-Path "$($svc.Path)/dist") {
        Write-Host "  ✓ Build output exists (dist/)" -ForegroundColor Green
        $result.DistFolder = $true
    }
    else {
        Write-Host "  ⚠ Build output missing (run npm run build)" -ForegroundColor Yellow
    }
    
    # Overall status
    $result.AllPassed = $result.PackageJson -and $result.ViteConfig -and $result.Dockerfile
    
    if ($result.AllPassed) {
        Write-Host "  Status: READY ✅" -ForegroundColor Green
    }
    else {
        Write-Host "  Status: INCOMPLETE ⚠️" -ForegroundColor Yellow
    }
    
    Write-Host ""
    $results += $result
}

# Summary
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Summary" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$ready = ($results | Where-Object { $_.AllPassed }).Count
$total = $results.Count
$built = ($results | Where-Object { $_.DistFolder }).Count

Write-Host "Services Ready: $ready/$total" -ForegroundColor $(if ($ready -eq $total) { "Green" } else { "Yellow" })
Write-Host "Services Built: $built/$total" -ForegroundColor $(if ($built -eq $total) { "Green" } else { "Yellow" })
Write-Host ""

if ($ready -eq $total -and $built -eq $total) {
    Write-Host "🎉 ALL SERVICES READY FOR DEPLOYMENT!" -ForegroundColor Green
}
elseif ($ready -eq $total) {
    Write-Host "⚠️  All services configured. Some need building." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Run this to build all:" -ForegroundColor White
    Write-Host "  cd services/interprecoach && npm run build && \" -ForegroundColor Gray
    Write-Host "  cd ../interpretrack && npm run build && \" -ForegroundColor Gray
    Write-Host "  cd ../interprehub && npm run build" -ForegroundColor Gray
}
else {
    Write-Host "❌ Some services need configuration" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan

# Export detailed report
$reportPath = ".gemini/antigravity/brain/4bf1baa7-6c8d-44f7-9198-bfa71f52de32/verification-report.json"
$results | ConvertTo-Json | Out-File $reportPath -Encoding UTF8
Write-Host "Detailed report saved to: verification-report.json" -ForegroundColor Gray
