/**
 * Comprehensive performance monitoring test suite
 * Tests all performance optimization components and functionality
 */

import { runLazyComponentTests } from '@/components/lazy/__tests__/LazyComponent.test';
import { runLazyImageTests } from '@/components/lazy/__tests__/LazyImage.test';
import { runErrorBoundaryTests } from '@/components/error/__tests__/ErrorBoundary.test';

// Performance metrics collection
interface PerformanceMetrics {
  testSuite: string;
  startTime: number;
  endTime: number;
  duration: number;
  passed: number;
  total: number;
  success: boolean;
}

class PerformanceTestRunner {
  private metrics: PerformanceMetrics[] = [];

  async runTestSuite(
    name: string,
    testFunction: () => Promise<boolean> | boolean
  ): Promise<PerformanceMetrics> {
    console.log(`\n🚀 Starting ${name}...`);
    const startTime = performance.now();

    try {
      const result = await testFunction();
      const endTime = performance.now();

      const metrics: PerformanceMetrics = {
        testSuite: name,
        startTime,
        endTime,
        duration: endTime - startTime,
        passed: result ? 1 : 0,
        total: 1,
        success: result
      };

      this.metrics.push(metrics);

      console.log(`${result ? '✅' : '❌'} ${name} completed in ${metrics.duration.toFixed(2)}ms`);
      return metrics;
    } catch (error) {
      const endTime = performance.now();
      const metrics: PerformanceMetrics = {
        testSuite: name,
        startTime,
        endTime,
        duration: endTime - startTime,
        passed: 0,
        total: 1,
        success: false
      };

      this.metrics.push(metrics);
      console.error(`❌ ${name} failed:`, error);
      return metrics;
    }
  }

  generateReport(): void {
    console.log('\n📊 PERFORMANCE TEST REPORT');
    console.log('==========================');

    const totalTests = this.metrics.length;
    const passedTests = this.metrics.filter(m => m.success).length;
    const totalDuration = this.metrics.reduce((sum, m) => sum + m.duration, 0);

    console.log(`\n📈 Overall Results:`);
    console.log(`   Tests Passed: ${passedTests}/${totalTests}`);
    console.log(`   Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);
    console.log(`   Total Duration: ${totalDuration.toFixed(2)}ms`);
    console.log(`   Average Duration: ${(totalDuration / totalTests).toFixed(2)}ms`);

    console.log(`\n📋 Detailed Results:`);
    this.metrics.forEach(metric => {
      const status = metric.success ? '✅' : '❌';
      console.log(`   ${status} ${metric.testSuite}: ${metric.duration.toFixed(2)}ms`);
    });

    // Performance analysis
    console.log(`\n⚡ Performance Analysis:`);
    const slowTests = this.metrics.filter(m => m.duration > 100);
    if (slowTests.length > 0) {
      console.log(`   ⚠️  Slow tests (>100ms):`);
      slowTests.forEach(test => {
        console.log(`      - ${test.testSuite}: ${test.duration.toFixed(2)}ms`);
      });
    } else {
      console.log(`   ✅ All tests completed quickly (<100ms)`);
    }

    const fastestTest = this.metrics.reduce((min, m) => m.duration < min.duration ? m : min);
    const slowestTest = this.metrics.reduce((max, m) => m.duration > max.duration ? m : max);

    console.log(`   🏃 Fastest: ${fastestTest.testSuite} (${fastestTest.duration.toFixed(2)}ms)`);
    console.log(`   🐌 Slowest: ${slowestTest.testSuite} (${slowestTest.duration.toFixed(2)}ms)`);
  }

  getMetrics(): PerformanceMetrics[] {
    return [...this.metrics];
  }

  reset(): void {
    this.metrics = [];
  }
}

// Test browser capabilities
export const testBrowserCapabilities = () => {
  console.log('Testing browser capabilities...');

  try {
    const capabilities = {
      intersectionObserver: 'IntersectionObserver' in window,
      webp: true, // Would be detected async in real implementation
      customProperties: CSS.supports('color', 'var(--test)'),
      gridLayout: CSS.supports('display', 'grid'),
      flexbox: CSS.supports('display', 'flex'),
      performanceAPI: 'performance' in window,
      requestIdleCallback: 'requestIdleCallback' in window
    };

    const supportedFeatures = Object.entries(capabilities)
      .filter(([, supported]) => supported)
      .map(([feature]) => feature);

    const unsupportedFeatures = Object.entries(capabilities)
      .filter(([, supported]) => !supported)
      .map(([feature]) => feature);

    console.log(`✅ Supported features: ${supportedFeatures.join(', ')}`);
    if (unsupportedFeatures.length > 0) {
      console.log(`⚠️  Unsupported features: ${unsupportedFeatures.join(', ')}`);
    }

    // All critical features should be supported
    const criticalFeatures = ['intersectionObserver', 'customProperties', 'performanceAPI'];
    const criticalSupported = criticalFeatures.every(feature => capabilities[feature as keyof typeof capabilities]);

    return criticalSupported;
  } catch (error) {
    console.error('✗ Browser capabilities test failed:', error);
    return false;
  }
};

// Test memory usage monitoring
export const testMemoryUsage = () => {
  console.log('Testing memory usage monitoring...');

  try {
    // Check if memory API is available
    const memoryAPI = (performance as any).memory;

    if (memoryAPI) {
      const memoryInfo = {
        usedJSHeapSize: memoryAPI.usedJSHeapSize,
        totalJSHeapSize: memoryAPI.totalJSHeapSize,
        jsHeapSizeLimit: memoryAPI.jsHeapSizeLimit
      };

      const memoryUsagePercent = (memoryInfo.usedJSHeapSize / memoryInfo.totalJSHeapSize) * 100;

      console.log(`📊 Memory Usage: ${memoryUsagePercent.toFixed(1)}%`);
      console.log(`   Used: ${(memoryInfo.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`);
      console.log(`   Total: ${(memoryInfo.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`);

      return memoryUsagePercent < 80; // Should be under 80% usage
    } else {
      console.log('⚠️  Memory API not available in this browser');
      return true; // Not a failure, just not available
    }
  } catch (error) {
    console.error('✗ Memory usage test failed:', error);
    return false;
  }
};

// Main test runner function
export const runAllPerformanceTests = async (): Promise<boolean> => {
  console.log('🎯 PERFORMANCE OPTIMIZATION TEST SUITE');
  console.log('======================================');
  console.log('Testing lazy loading, image optimization, and error handling...\n');

  const runner = new PerformanceTestRunner();

  // Run all test suites
  await runner.runTestSuite('Browser Capabilities', testBrowserCapabilities);
  await runner.runTestSuite('Memory Usage Monitoring', testMemoryUsage);
  await runner.runTestSuite('LazyComponent Tests', runLazyComponentTests);
  await runner.runTestSuite('LazyImage Tests', runLazyImageTests);
  await runner.runTestSuite('ErrorBoundary Tests', runErrorBoundaryTests);

  // Generate comprehensive report
  runner.generateReport();

  // Return overall success
  const metrics = runner.getMetrics();
  const allPassed = metrics.every(m => m.success);

  console.log(`\n🎉 Performance test suite ${allPassed ? 'PASSED' : 'FAILED'}`);

  return allPassed;
};

// Export for use in development
export { PerformanceTestRunner };

// Auto-run tests in development mode
if (process.env.NODE_ENV === 'development') {
  // Uncomment to auto-run tests on import
  // runAllPerformanceTests();
}
