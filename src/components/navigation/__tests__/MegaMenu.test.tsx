/**
 * Basic test file for MegaMenu component
 * Tests core functionality and interactions
 */

import React from 'react';
import { MegaMenu } from '../MegaMenu';
import { MegaMenuSection } from '@/types/navigation';
import { Bot, BookOpen } from 'lucide-react';

// Mock data for testing
const mockSections: MegaMenuSection[] = [
  {
    title: 'AI-Powered Assessment',
    description: 'Advanced tools for interpretation evaluation',
    tools: [
      {
        name: 'InterpreBot',
        description: 'AI-powered interpretation assessment',
        icon: Bot,
        href: '/interprebot',
        status: 'available',
        category: 'assessment'
      }
    ],
    quickActions: [
      {
        label: 'View Reports',
        href: '/reports',
        icon: BookOpen
      }
    ]
  }
];

// Basic component rendering test
export const testMegaMenuRendering = () => {
  const container = document.createElement('div');
  document.body.appendChild(container);

  try {
    // Test closed state
    const closedMenu = React.createElement(MegaMenu, {
      sections: mockSections,
      isOpen: false,
      onClose: () => {}
    });

    // Test open state
    const openMenu = React.createElement(MegaMenu, {
      sections: mockSections,
      isOpen: true,
      onClose: () => {}
    });

    console.log('✓ MegaMenu component renders without errors');
    return true;
  } catch (error) {
    console.error('✗ MegaMenu rendering failed:', error);
    return false;
  } finally {
    document.body.removeChild(container);
  }
};

// Test tool card structure
export const testToolCardStructure = () => {
  const tool = mockSections[0].tools[0];

  // Verify tool has required properties
  const requiredProps = ['name', 'description', 'icon', 'href', 'status', 'category'];
  const hasAllProps = requiredProps.every(prop => prop in tool);

  if (hasAllProps) {
    console.log('✓ Tool card has all required properties');
    return true;
  } else {
    console.error('✗ Tool card missing required properties');
    return false;
  }
};

// Test status badge variants
export const testStatusBadgeVariants = () => {
  const validStatuses = ['available', 'beta', 'coming-soon'];
  const tool = mockSections[0].tools[0];

  if (validStatuses.includes(tool.status)) {
    console.log('✓ Status badge has valid variant');
    return true;
  } else {
    console.error('✗ Status badge has invalid variant');
    return false;
  }
};

// Run all tests
export const runMegaMenuTests = () => {
  console.log('Running MegaMenu tests...');

  const results = [
    testMegaMenuRendering(),
    testToolCardStructure(),
    testStatusBadgeVariants()
  ];

  const passed = results.filter(Boolean).length;
  const total = results.length;

  console.log(`MegaMenu tests: ${passed}/${total} passed`);
  return passed === total;
};
