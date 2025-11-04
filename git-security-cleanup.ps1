# Git Security Cleanup Script (PowerShell)
# This script removes sensitive files from Git history

Write-Host "🚨 Git Security Cleanup - Removing sensitive files from history" -ForegroundColor Red
Write-Host "==================================================" -ForegroundColor Yellow

# Set warning suppression for filter-branch
$env:FILTER_BRANCH_SQUELCH_WARNING = "1"

Write-Host "📋 Step 1: Remove .env files from current index..." -ForegroundColor Cyan
try { git rm --cached .env 2>$null } catch { Write-Host ".env already removed from index" }
try { git rm --cached .env.production 2>$null } catch { Write-Host ".env.production already removed from index" }

Write-Host "📋 Step 2: Remove sensitive files from Git history..." -ForegroundColor Cyan
git filter-branch --force --index-filter "git rm --cached --ignore-unmatch .env .env.production .env.local .env.development .env.test .env.staging" --prune-empty --tag-name-filter cat -- --all

Write-Host "📋 Step 3: Clean up refs and garbage collect..." -ForegroundColor Cyan
Remove-Item -Recurse -Force .git/refs/original/ -ErrorAction SilentlyContinue
git reflog expire --expire=now --all
git gc --prune=now --aggressive

Write-Host "📋 Step 4: Force push to update remote (WARNING: This rewrites history!)" -ForegroundColor Cyan
Write-Host "⚠️  Run this manually after review: git push --force --all" -ForegroundColor Yellow
Write-Host "⚠️  Run this manually after review: git push --force --tags" -ForegroundColor Yellow

Write-Host "✅ Git security cleanup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "🔥 CRITICAL NEXT STEPS:" -ForegroundColor Red
Write-Host "1. Rotate ALL API keys that were exposed"
Write-Host "2. Review git log to ensure sensitive data is removed"
Write-Host "3. Force push to update remote repository"
Write-Host "4. Notify team members to re-clone the repository"
Write-Host ""
Write-Host "🔑 Exposed keys that MUST be rotated:" -ForegroundColor Red
Write-Host "- Google API Key: AIzaSyDw4TmUaofJEFi23Sw2MK40tVNARvitqeo"
Write-Host "- Any Supabase keys in the files"
Write-Host "- Any other API keys that were in .env files"
