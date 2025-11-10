/**
 * Test runner utility for browser console
 * Provides easy access to performance tests during development
 */

import { runAllPerformanceTests } from '@/tests/performanceTests';

// Global test runner interface
interface TestRunner {
  runPerformanceTests: () => Promise<boolean>;
  runLazyLoadingTests: () => boolean;
  runImageOptimizationTests: () => Promise<boolean>;
  runErrorBoundaryTests: () => boolean;
  help: () => void;
}

// Create test runner instance
const createTestRunner = (): TestRunner => {
  return {
    async runPerformanceTests() {
      console.log('🧪 Running all performance tests...');
      return await runAllPerformanceTests();
    },

    runLazyLoadingTests() {
      console.log('🔄 Running lazy loading tests...');
      // Import and run lazy component tests
      import('@/components/lazy/__tests__/LazyComponent.test').then(module => {
        return module.runLazyComponentTests();
      });
      return true;
    },

    async runImageOptimizationTests() {
      console.log('🖼️ Running image optimization tests...');
      const module = await import('@/components/lazy/__tests__/LazyImage.test');
      return await module.runLazyImageTests();
    },

    runErrorBoundaryTests() {
      console.log('🛡️ Running error boundary tests...');
      import('@/components/error/__tests__/ErrorBoundary.test').then(module => {
        return module.runErrorBoundaryTests();
      });
      return true;
    },

    help() {
      console.log(`
🧪 InterpreLab Performance Test Runner
=====================================

Available commands:
  testRunner.runPerformanceTests()     - Run all performance tests
  testRunner.runLazyLoadingTests()     - Test lazy loading components
  testRunner.runImageOptimizationTests() - Test image optimization
  testRunner.runErrorBoundaryTests()   - Test error boundaries
  testRunner.help()                    - Show this help message

Example usage:
  await testRunner.runPerformanceTests()

Performance monitoring:
  - Tests lazy loading behavior
  - Validates image optimization
  - Checks error boundary functionality
  - Measures loading performance
  - Monitors memory usage
      `);
    }
  };
};

// Create and export test runner instance
export const testRunner = createTestRunner();

// Make available globally in development
if (process.env.NODE_ENV === 'development') {
  (window as any).testRunner = testRunner;
  console.log('🧪 Performance test runner available as window.testRunner');
  console.log('Type testRunner.help() for available commands');
}

export default testRunner;
