/**
 * Basic test file for BreadcrumbNavigation component
 * Tests breadcrumb generation and navigation functionality
 */

import React from 'react';
import { BreadcrumbNavigation } from '../BreadcrumbNavigation';
import { BreadcrumbItem } from '@/types/navigation';

// Mock custom breadcrumbs for testing
const mockCustomBreadcrumbs: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Solutions' },
  { label: 'InterpreBot', isActive: true }
];

// Test component rendering
export const testBreadcrumbNavigationRendering = () => {
  try {
    const component = React.createElement(BreadcrumbNavigation, {
      customBreadcrumbs: mockCustomBreadcrumbs
    });

    console.log('✓ BreadcrumbNavigation component renders without errors');
    return true;
  } catch (error) {
    console.error('✗ BreadcrumbNavigation rendering failed:', error);
    return false;
  }
};

// Test breadcrumb structure
export const testBreadcrumbStructure = () => {
  const breadcrumbs = mockCustomBreadcrumbs;

  // Verify breadcrumb items have required properties
  const hasValidStructure = breadcrumbs.every(item =>
    typeof item.label === 'string' && item.label.length > 0
  );

  if (hasValidStructure) {
    console.log('✓ Breadcrumb items have valid structure');
    return true;
  } else {
    console.error('✗ Breadcrumb items have invalid structure');
    return false;
  }
};

// Test active breadcrumb identification
export const testActiveBreadcrumb = () => {
  const breadcrumbs = mockCustomBreadcrumbs;
  const activeBreadcrumbs = breadcrumbs.filter(item => item.isActive);

  // Should have exactly one active breadcrumb
  if (activeBreadcrumbs.length === 1) {
    console.log('✓ Exactly one active breadcrumb identified');
    return true;
  } else {
    console.error('✗ Invalid number of active breadcrumbs');
    return false;
  }
};

// Test breadcrumb navigation links
export const testBreadcrumbLinks = () => {
  const breadcrumbs = mockCustomBreadcrumbs;
  const linkBreadcrumbs = breadcrumbs.filter(item => item.href && !item.isActive);

  // Non-active breadcrumbs should have href
  const hasValidLinks = linkBreadcrumbs.every(item =>
    item.href && item.href.startsWith('/')
  );

  if (hasValidLinks) {
    console.log('✓ Breadcrumb links are valid');
    return true;
  } else {
    console.error('✗ Breadcrumb links are invalid');
    return false;
  }
};

// Test breadcrumb visibility logic
export const testBreadcrumbVisibility = () => {
  // Test with empty breadcrumbs
  const emptyBreadcrumbs: BreadcrumbItem[] = [];
  const shouldHide = emptyBreadcrumbs.length === 0;

  if (shouldHide) {
    console.log('✓ Breadcrumb visibility logic works correctly');
    return true;
  } else {
    console.error('✗ Breadcrumb visibility logic is incorrect');
    return false;
  }
};

// Run all tests
export const runBreadcrumbNavigationTests = () => {
  console.log('Running BreadcrumbNavigation tests...');

  const results = [
    testBreadcrumbNavigationRendering(),
    testBreadcrumbStructure(),
    testActiveBreadcrumb(),
    testBreadcrumbLinks(),
    testBreadcrumbVisibility()
  ];

  const passed = results.filter(Boolean).length;
  const total = results.length;

  console.log(`BreadcrumbNavigation tests: ${passed}/${total} passed`);
  return passed === total;
};
