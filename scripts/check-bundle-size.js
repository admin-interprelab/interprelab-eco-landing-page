#!/usr/bin/env node

/**
 * Bundle size checker script
 * Analyzes the production build and reports bundle sizes
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, '..', 'dist');
const SIZE_LIMITS = {
  'index.html': 50 * 1024, // 50KB
  'main': 150 * 1024, // 150KB gzipped target
  'vendor': 300 * 1024, // 300KB for all vendors
};

function getFileSize(filePath) {
  const stats = fs.statSync(filePath);
  return stats.size;
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

function analyzeDirectory(dir, results = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      analyzeDirectory(filePath, results);
    } else if (stat.isFile()) {
      const ext = path.extname(file);
      if (['.js', '.css', '.html'].includes(ext)) {
        results.push({
          path: path.relative(DIST_DIR, filePath),
          size: stat.size,
          ext,
        });
      }
    }
  });

  return results;
}

function main() {
  console.log('📦 Analyzing bundle sizes...\n');

  if (!fs.existsSync(DIST_DIR)) {
    console.error('❌ dist/ directory not found. Run `npm run build` first.');
    process.exit(1);
  }

  const files = analyzeDirectory(DIST_DIR);

  // Group by type
  const byType = {
    js: files.filter((f) => f.ext === '.js'),
    css: files.filter((f) => f.ext === '.css'),
    html: files.filter((f) => f.ext === '.html'),
  };

  // Calculate totals
  const totals = {
    js: byType.js.reduce((sum, f) => sum + f.size, 0),
    css: byType.css.reduce((sum, f) => sum + f.size, 0),
    html: byType.html.reduce((sum, f) => sum + f.size, 0),
  };

  // Report
  console.log('JavaScript Files:');
  console.log('─'.repeat(60));
  byType.js
    .sort((a, b) => b.size - a.size)
    .forEach((file) => {
      const sizeStr = formatBytes(file.size).padStart(10);
      console.log(`  ${sizeStr}  ${file.path}`);
    });
  console.log(`  ${'─'.repeat(58)}`);
  console.log(`  ${formatBytes(totals.js).padStart(10)}  TOTAL\n`);

  console.log('CSS Files:');
  console.log('─'.repeat(60));
  byType.css
    .sort((a, b) => b.size - a.size)
    .forEach((file) => {
      const sizeStr = formatBytes(file.size).padStart(10);
      console.log(`  ${sizeStr}  ${file.path}`);
    });
  console.log(`  ${'─'.repeat(58)}`);
  console.log(`  ${formatBytes(totals.css).padStart(10)}  TOTAL\n`);

  console.log('HTML Files:');
  console.log('─'.repeat(60));
  byType.html.forEach((file) => {
    const sizeStr = formatBytes(file.size).padStart(10);
    console.log(`  ${sizeStr}  ${file.path}`);
  });
  console.log(`  ${'─'.repeat(58)}`);
  console.log(`  ${formatBytes(totals.html).padStart(10)}  TOTAL\n`);

  // Overall summary
  const grandTotal = totals.js + totals.css + totals.html;
  console.log('Summary:');
  console.log('─'.repeat(60));
  console.log(`  Total Bundle Size: ${formatBytes(grandTotal)}`);
  console.log(`  JavaScript: ${formatBytes(totals.js)} (${Math.round((totals.js / grandTotal) * 100)}%)`);
  console.log(`  CSS: ${formatBytes(totals.css)} (${Math.round((totals.css / grandTotal) * 100)}%)`);
  console.log(`  HTML: ${formatBytes(totals.html)} (${Math.round((totals.html / grandTotal) * 100)}%)`);

  // Warnings
  console.log('\n⚠️  Warnings:');
  let hasWarnings = false;

  const largeJsFiles = byType.js.filter((f) => f.size > 200 * 1024);
  if (largeJsFiles.length > 0) {
    hasWarnings = true;
    console.log(`  • ${largeJsFiles.length} JavaScript file(s) exceed 200KB:`);
    largeJsFiles.forEach((f) => {
      console.log(`    - ${f.path} (${formatBytes(f.size)})`);
    });
  }

  if (totals.js > 500 * 1024) {
    hasWarnings = true;
    console.log(`  • Total JavaScript size (${formatBytes(totals.js)}) exceeds 500KB`);
    console.log(`    Consider code splitting or lazy loading`);
  }

  if (!hasWarnings) {
    console.log('  ✅ No warnings - bundle sizes look good!');
  }

  console.log('\n💡 Tips:');
  console.log('  • Run `npm run build:analyze` for detailed bundle visualization');
  console.log('  • Use lazy loading for routes and heavy components');
  console.log('  • Consider using dynamic imports for large dependencies');
  console.log('  • Optimize images and use WebP format');
}

main();
