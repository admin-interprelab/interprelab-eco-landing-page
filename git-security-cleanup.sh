#!/bin/bash

# Git Security Cleanup Script
# This script removes sensitive files from Git history

echo "🚨 Git Security Cleanup - Removing sensitive files from history"
echo "=================================================="

# Set warning suppression for filter-branch
export FILTER_BRANCH_SQUELCH_WARNING=1

echo "📋 Step 1: Remove .env files from current index..."
git rm --cached .env 2>/dev/null || echo ".env already removed from index"
git rm --cached .env.production 2>/dev/null || echo ".env.production already removed from index"

echo "📋 Step 2: Remove sensitive files from Git history..."
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env .env.production .env.local .env.development .env.test .env.staging" \
  --prune-empty --tag-name-filter cat -- --all

echo "📋 Step 3: Clean up refs and garbage collect..."
rm -rf .git/refs/original/
git reflog expire --expire=now --all
git gc --prune=now --aggressive

echo "📋 Step 4: Force push to update remote (WARNING: This rewrites history!)"
echo "⚠️  Run this manually after review: git push --force --all"
echo "⚠️  Run this manually after review: git push --force --tags"

echo "✅ Git security cleanup complete!"
echo ""
echo "🔥 CRITICAL NEXT STEPS:"
echo "1. Rotate ALL API keys that were exposed"
echo "2. Review git log to ensure sensitive data is removed"
echo "3. Force push to update remote repository"
echo "4. Notify team members to re-clone the repository"
echo ""
echo "🔑 Exposed keys that MUST be rotated:"
echo "- Google API Key: AIzaSyDw4TmUaofJEFi23Sw2MK40tVNARvitqeo"
echo "- Any Supabase keys in the files"
echo "- Any other API keys that were in .env files"
