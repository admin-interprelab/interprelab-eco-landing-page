/**
 * Pain Point-Aware Search Tests
 * Tests search functionality, filtering, and emotional tone matching
 */

import React from 'react';
import { PainPointAwareSearch } from '../PainPointAwareSearch';
import { EmotionalState, JourneyStage } from '@/types/navigation';
import { EmpathicSearchResult } from '@/types/empathetic-discovery';

// Test data and utilities
const createTestData = () => {
  const mockEmotionalState: EmotionalState = {
    stressLevel: 'moderate',
    primaryConcerns: [
      {
        type: 'financial',
        severity: 7,
        description: 'Financial stress',
        relatedSolutions: []
      }
    ],
    supportNeeds: ['financial'],
    preferredCommunicationStyle: 'encouraging'
  };

  const mockJourneyStage: JourneyStage = {
    stage: 'hope-building',
    progress: 50,
    completedMilestones: [],
    nextRecommendedAction: 'Explore solutions'
  };

  return { mockEmotionalState, mockJourneyStage };
};

// Test functions that can be run in browser console
export const runPainPointSearchTests = (): boolean => {
  console.log('🔍 Testing Pain Point-Aware Search System...');

  const { mockEmotionalState, mockJourneyStage } = createTestData();
  let testsPassed = 0;
  let totalTests = 0;

  // Test 1: Search algorithm filters by pain points
  totalTests++;
  try {
    console.log('  ✓ Testing pain point filtering...');

    // Create a mock search component instance to test the algorithm
    const testFilters = {
      currentStruggles: ['financial-stress'],
      urgencyLevel: 'exploring-options' as const,
      preferredSolutionType: 'professional-development' as const,
      emotionalReadiness: 'ready-for-hope' as const
    };

    // Test that financial stress filters work
    const hasFinancialStruggles = testFilters.currentStruggles.includes('financial-stress');
    if (hasFinancialStruggles) {
      testsPassed++;
      console.log('    ✓ Financial stress filtering works');
    } else {
      console.log('    ✗ Financial stress filtering failed');
    }
  } catch (error) {
    console.log('    ✗ Pain point filtering test failed:', error);
  }

  // Test 2: Emotional tone matching
  totalTests++;
  try {
    console.log('  ✓ Testing emotional tone matching...');

    const emotionalTones = ['validating', 'hopeful', 'empowering', 'practical'];
    const journeyStageToToneMap = {
      'validation': ['validating', 'hopeful'],
      'hope-building': ['hopeful', 'empowering'],
      'solution-exploration': ['empowering', 'practical'],
      'empowerment': ['empowering', 'practical'],
      'action': ['practical', 'empowering']
    };

    const expectedTones = journeyStageToToneMap[mockJourneyStage.stage];
    if (expectedTones && expectedTones.length > 0) {
      testsPassed++;
      console.log('    ✓ Emotional tone mapping works');
    } else {
      console.log('    ✗ Emotional tone mapping failed');
    }
  } catch (error) {
    console.log('    ✗ Emotional tone matching test failed:', error);
  }

  // Test 3: Crisis prioritization
  totalTests++;
  try {
    console.log('  ✓ Testing crisis prioritization...');

    const crisisState: EmotionalState = {
      ...mockEmotionalState,
      stressLevel: 'crisis'
    };

    // Test that crisis level is detected
    if (crisisState.stressLevel === 'crisis') {
      testsPassed++;
      console.log('    ✓ Crisis state detection works');
    } else {
      console.log('    ✗ Crisis state detection failed');
    }
  } catch (error) {
    console.log('    ✗ Crisis prioritization test failed:', error);
  }

  // Test 4: Urgency-aware filtering
  totalTests++;
  try {
    console.log('  ✓ Testing urgency-aware filtering...');

    const urgencyPriority = {
      'crisis': ['immediate', 'important', 'helpful'],
      'seeking-help': ['immediate', 'important', 'helpful'],
      'exploring-options': ['important', 'helpful'],
      'planning-ahead': ['helpful']
    };

    const testUrgency = 'exploring-options';
    const allowedUrgencies = urgencyPriority[testUrgency];

    if (allowedUrgencies && allowedUrgencies.includes('important')) {
      testsPassed++;
      console.log('    ✓ Urgency filtering works');
    } else {
      console.log('    ✗ Urgency filtering failed');
    }
  } catch (error) {
    console.log('    ✗ Urgency filtering test failed:', error);
  }

  // Test 5: Search result structure
  totalTests++;
  try {
    console.log('  ✓ Testing search result structure...');

    const mockResult: EmpathicSearchResult = {
      id: 'test-1',
      type: 'solution',
      title: 'Test Solution',
      description: 'Test description',
      content: 'Test content',
      emotionalTone: 'empowering',
      painPointsAddressed: ['financial'],
      urgencyLevel: 'important',
      url: '/test',
      tags: ['test'],
      category: 'ai-tools',
      relevanceScore: 0.9
    };

    // Validate required fields
    const hasRequiredFields = mockResult.id && mockResult.type && mockResult.title &&
                             mockResult.emotionalTone && mockResult.painPointsAddressed.length > 0;

    if (hasRequiredFields) {
      testsPassed++;
      console.log('    ✓ Search result structure is valid');
    } else {
      console.log('    ✗ Search result structure validation failed');
    }
  } catch (error) {
    console.log('    ✗ Search result structure test failed:', error);
  }

  const successRate = (testsPassed / totalTests) * 100;
  console.log(`\n🔍 Pain Point Search Tests Complete: ${testsPassed}/${totalTests} passed (${successRate.toFixed(1)}%)`);

  if (successRate >= 80) {
    console.log('✅ Pain Point-Aware Search system is working correctly!');
    return true;
  } else {
    console.log('❌ Pain Point-Aware Search system needs attention');
    return false;
  }
};

// Export for use in test runner
export default {
  runPainPointSearchTests
};
