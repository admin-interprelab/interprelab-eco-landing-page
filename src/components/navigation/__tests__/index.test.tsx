/**
 * Navigation Components Test Runner
 * Executes all navigation component tests
 */

import { runMegaMenuTests } from './MegaMenu.test';
import { runMobileNavigationTests } from './MobileNavigation.test';
import { runBreadcrumbNavigationTests } from './BreadcrumbNavigation.test';

// Test runner function
export const runAllNavigationTests = () => {
  console.log('🧪 Starting Navigation Components Test Suite...\n');

  const testResults = [
    runMegaMenuTests(),
    runMobileNavigationTests(),
    runBreadcrumbNavigationTests()
  ];

  const totalPassed = testResults.filter(Boolean).length;
  const totalTests = testResults.length;

  console.log('\n📊 Navigation Test Suite Results:');
  console.log(`${totalPassed}/${totalTests} test suites passed`);

  if (totalPassed === totalTests) {
    console.log('✅ All navigation tests passed!');
  } else {
    console.log('❌ Some navigation tests failed');
  }

  return totalPassed === totalTests;
};

// Auto-run tests if this file is executed directly
if (typeof window !== 'undefined') {
  // Browser environment - can be run manually
  (window as any).runNavigationTests = runAllNavigationTests;
  console.log('Navigation tests loaded. Run window.runNavigationTests() to execute.');
}
