<instruction>You are an expert software engineer. You are working on a WIP branch. Please run `git status` and `git diff` to understand the changes and the current state of the code. Analyze the workspace context and complete the mission brief.</instruction>
<workspace_context>
<active_errors>
File: deploy.yml Line 2: Expected a scalar value, a sequence, or a mapping
</active_errors>
<artifacts>
--- CURRENT TASK CHECKLIST ---
# InterpreLab Architecture Implementation - Task Tracker

**Start Date**: December 1, 2024  
**Timeline**: 4 Weeks  
**Based On**: [Project Architecture Assessment](file:///C:/Users/LSA/.gemini/antigravity/brain/2979ae68-7c1d-4717-9a92-3f44e294f163/project-architecture-assessment.md)  
**Implementation Plan**: [Detailed Plan](file:///C:/Users/LSA/.gemini/antigravity/brain/2979ae68-7c1d-4717-9a92-3f44e294f163/implementation_plan.md)

---

## Week 1: Foundation & Modularization (Current)

### Phase 1.1: Directory Restructuring (Days 1-2)
- [ ] Create `src/modules/interpretrack/` structure
  - [ ] components/ subdirectory
  - [ ] hooks/ subdirectory
  - [ ] services/ subdirectory
  - [ ] utils/ subdirectory
  - [ ] types/ subdirectory
- [ ] Create `src/utils/` global utilities
  - [ ] formatting/ subdirectory
  - [ ] validation/ subdirectory
  - [ ] constants/ subdirectory
- [ ] Update `tsconfig.json` with path aliases
- [ ] Test import resolution

### Phase 1.2: Extract Utility Functions (Days 2-3)
- [ ] **Currency Formatting** (`src/utils/formatting/currency.ts`)
  - [ ] Implement formatCurrency()
  - [ ] Implement parseCurrency()
  - [ ] Implement convertCurrency()
  - [ ] Write tests (>80% coverage)
  - [ ] Update existing components to use utils

- [ ] **Date Formatting** (`src/utils/formatting/date.ts`)
  - [ ] Install date-fns: `npm install date-fns`
  - [ ] Implement formatDate()
  - [ ] Implement formatRelativeTime()
  - [ ] Implement formatCallDuration()
  - [ ] Write tests
  - [ ] Update existing components

- [ ] **Number Formatting** (`src/utils/formatting/numbers.ts`)
  - [ ] Implement formatNumber()
  - [ ] Implement formatPercentage()
  - [ ] Implement roundToNearest()
  - [ ] Implement calculatePercentageChange()
  - [ ] Write tests
  - [ ] Update existing components

### Phase 1.3: Create Service Layer (Days 3-4)
- [ ] **CallService Implementation**
  - [ ] Create `src/modules/interpretrack/services/callService.ts`
  - [ ] Implement CRUD methods (create, get, update, delete)
  - [ ] Implement analytics methods
  - [ ] Implement getCallTypeStats()
  - [ ] Implement getWeeklyData()
  - [ ] Implement getAggregatedStats()
  - [ ] Move sample data generation from lib/data.ts
  - [ ] Write unit tests

- [ ] **Custom Hooks**
  - [ ] Create `useCallData` hook
  - [ ] Create `useStats` hook
  - [ ] Write integration tests
  - [ ] Document hook usage

### Phase 1.4: Component Modularization (Days 4-5)
- [ ] **Extract StatsCards Component**
  - [ ] Create `src/modules/interpretrack/components/StatsCards/`
  - [ ] Move component logic
  - [ ] Add barrel export (index.ts)
  - [ ] Update imports in InterpreTrack page
  - [ ] Test component isolation

- [ ] **Update InterpreTrack Page**
  - [ ] Update to use new hooks
  - [ ] Update imports to modular paths
  - [ ] Add loading state
  - [ ] Test page functionality

---

## Week 2: Testing Infrastructure & Remaining Components

### Phase 2.1: Testing Setup (Days 6-7)
- [ ] **Install Testing Dependencies**
  - [ ] `npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event happy-dom`
  - [ ] Create `vitest.config.ts`
  - [ ] Create test setup file
  - [ ] Add test scripts to package.json
  - [ ] Verify test environment

- [ ] **Write Service Tests**
  - [ ] Test CallService.createCall()
  - [ ] Test CallService.getCalls()
  - [ ] Test CallService.updateCall()
  - [ ] Test CallService.deleteCall()
  - [ ] Test CallService.getCallTypeStats()
  - [ ] Test CallService.getWeeklyData()
  - [ ] Test CallService.getAggregatedStats()
  - [ ] Achieve >80% coverage

- [ ] **Write Utility Tests**
  - [ ] Test currency formatting functions
  - [ ] Test date formatting functions
  - [ ] Test number formatting functions
  - [ ] Achieve >90% coverage

### Phase 2.2: Extract Remaining Components (Days 8-10)
Following the StatsCards pattern:

- [ ] **CallTypeChart Module**
  - [ ] Create directory structure
  - [ ] Move component
  - [ ] Add barrel export
  - [ ] Update imports
  - [ ] Write component tests

- [ ] **WeeklyChart Module**
  - [ ] Create directory structure
  - [ ] Move component
  - [ ] Add barrel export
  - [ ] Update imports
  - [ ] Write component tests

- [ ] **ManualLog Module**
  - [ ] Create directory structure
  - [ ] Move component
  - [ ] Extract form logic
  - [ ] Add input validation
  - [ ] Add barrel export
  - [ ] Update imports
  - [ ] Write component tests

- [ ] **RecentCalls Module**
  - [ ] Create directory structure
  - [ ] Move component
  - [ ] Add barrel export
  - [ ] Update imports
  - [ ] Write component tests

- [ ] **AIInsights Module**
  - [ ] Create directory structure
  - [ ] Move component
  - [ ] Add barrel export
  - [ ] Update imports
  - [ ] Write component tests

- [ ] **DemoBanner Module**
  - [ ] Create new component
  - [ ] Extract demo banner logic from page
  - [ ] Add barrel export
  - [ ] Write component tests

---

## Week 3: Advanced Features & Firebase Setup

### Phase 3.1: Firebase Project Setup (Days 11-12)
- [ ] **Initialize Firebase**
  - [ ] `npm install firebase`
  - [ ] `npm install -D firebase-tools`
  - [ ] `npx firebase login`
  - [ ] `npx firebase init`
  - [ ] Select Firestore, Auth, Hosting, Storage, Functions

- [ ] **Configure Firebase**
  - [ ] Create Firebase project in console
  - [ ] Set up environment variables (.env.local)
  - [ ] Create `src/services/firebase/config.ts`
  - [ ] Initialize Firebase SDK
  - [ ] Test connection

- [ ] **Firestore Setup**
  - [ ] Design collections schema
  - [ ] Create security rules
  - [ ] Test Firestore connection
  - [ ] Set up indexes

### Phase 3.2: Firestore Integration (Days 13-14)
- [ ] **FirestoreCallService**
  - [ ] Create `firestoreCallService.ts`
  - [ ] Implement createCall()
  - [ ] Implement getCalls()
  - [ ] Implement updateCall()
  - [ ] Implement deleteCall()
  - [ ] Add offline support
  - [ ] Implement sync mechanism
  - [ ] Write integration tests

- [ ] **Update Hooks for Firebase**
  - [ ] Update useCallData to use Firestore
  - [ ] Add real-time listeners
  - [ ] Handle loading states
  - [ ] Handle error states
  - [ ] Test with real data

---

## Week 4: Polish & Documentation

### Phase 4.1: Performance Optimization (Days 15-16)
- [ ] **Code Splitting**
  - [ ] Implement React.lazy for routes
  - [ ] Add Suspense boundaries
  - [ ] Test lazy loading
  - [ ] Measure bundle size reduction

- [ ] **Optimization**
  - [ ] Analyze bundle size
  - [ ] Optimize images
  - [ ] Add loading states
  - [ ] Implement error boundaries
  - [ ] Test performance metrics

### Phase 4.2: Documentation (Days 17-18)
- [ ] **Update README**
  - [ ] Document new architecture
  - [ ] Add getting started guide
  - [ ] Document environment setup
  - [ ] Add troubleshooting section

- [ ] **Code Documentation**
  - [ ] Document service layer patterns
  - [ ] Create component usage examples
  - [ ] Document testing approach
  - [ ] Add inline JSDoc comments

- [ ] **Create Developer Guide**
  - [ ] How to add new modules
  - [ ] How to create services
  - [ ] How to write tests
  - [ ] Best practices

---

## Success Criteria

### Code Quality ✅
- [ ] All components extracted to modules
- [ ] Service layer fully abstracted
- [ ] >80% test coverage  
- [ ] Zero TypeScript errors
- [ ] Zero console warnings
- [ ] All ESLint rules passing

### Performance 🚀
- [ ] Bundle size < 500KB (gzipped)
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s
- [ ] Lighthouse score > 90

### Architecture 🏗️
- [ ] Clear separation of concerns
- [ ] Reusable utility functions
- [ ] Scalable component structure
- [ ] Documented patterns
- [ ] Consistent naming conventions

---

## Progress Tracking

### Week 1: Foundation & Modularization
**Status**: 🟡 Planning Complete, Starting Execution  
**Completion**: 0%

### Week 2: Testing Infrastructure  
**Status**: ⚪ Not Started  
**Completion**: 0%

### Week 3: Firebase Setup
**Status**: ⚪ Not Started  
**Completion**: 0%

### Week 4: Polish & Documentation
**Status**: ⚪ Not Started  
**Completion**: 0%

---

## Daily Standup Questions

### What did I accomplish yesterday?
- Created comprehensive architecture assessment
- Defined 4-week implementation plan
- Fixed InterpreTrack navigation and chart display

### What will I work on today?
- Phase 1.1: Create module directories
- Phase 1.2: Extract utility functions

### Any blockers?
- None currently

---

## Notes & Decisions

### Architecture Decisions
1. **Module Structure**: Each product (InterpreTrack, InterpreBot, InterpreCoach) gets its own module with components/, hooks/, services/, utils/, and types/
2. **Service Layer**: Abstraction allows easy switch from local data to Firebase without changing components
3. **Testing First**: Write tests as we extract components to ensure no regressions
4. **Gradual Migration**: Keep old code until new code is proven to work

### Technical Debt to Address
- [ ] Remove `src/lib/data.ts` after migration complete
- [ ] Update all imports to use path aliases
- [ ] Consolidate duplicate utility functions
- [ ] Remove unused dependencies

---

## Next Phase (After Week 4)

1. **Apply patterns to InterpreBot**
2. **Apply patterns to InterpreCoach**
3. **Begin Vertex AI integration**
4. **Implement payment system**

---

**Last Updated**: December 1, 2024  
**Current Phase**: Week 1, Phase 1.1  
**Overall Progress**: 0% (Planning Complete)

--- IMPLEMENTATION PLAN ---
# InterpreLab Architecture Implementation Plan

**Plan Created**: December 1, 2024  
**Branch**: landing-page-redesign → architecture-implementation  
**Timeline**: 4 Weeks  
**Based On**: [Project Architecture Assessment](file:///C:/Users/LSA/.gemini/antigravity/brain/2979ae68-7c1d-4717-9a92-3f44e294f163/project-architecture-assessment.md)

---

## Executive Summary

This plan implements the comprehensive architecture assessment to transform InterpreLab from a prototype into a production-ready, scalable platform. The focus is on modularization, separation of concerns, and establishing patterns that will support future growth.

**Key Goals**:
1. ✅ Modular component organization
2. ✅ Service layer abstraction  
3. ✅ Utility function library
4. ✅ Testing infrastructure
5. ⏸️ Firebase integration (Phase 2)

---

## Week 1: Foundation & Modularization

### Phase 1.1: Directory Restructuring (Days 1-2)

#### Task 1: Create New Module Directories
```bash
# Create modular structure
src/modules/interpretrack/
  ├── components/
  │   ├── StatsCards/
  │   ├── CallTypeChart/
  │   ├── WeeklyChart/
  │   ├── ManualLog/
  │   ├── RecentCalls/
  │   └── AIInsights/
  ├── hooks/
  │   ├── useCallData.ts
  │   ├── useStats.ts
  │   └── useAnalytics.ts
  ├── services/
  │   ├── callService.ts
  │   ├── analyticsService.ts
  │   └── syncService.ts
  ├── utils/
  │   ├── calculations.ts
  │   └── formatters.ts
  └── types/
      └── index.ts

src/utils/
  ├── formatting/
  │   ├── currency.ts
  │   ├── date.ts
  │   └── numbers.ts
  ├── validation/
  │   └── forms.ts
  └── constants/
      └── index.ts
```

**Implementation**:
- [ ] Create `src/modules/interpretrack/` directory structure
- [ ] Create `src/utils/` directory with subdirectories
- [ ] Update `tsconfig.json` with path aliases for clean imports

---

### Phase 1.2: Extract Utility Functions (Days 2-3)

#### Task 2: Create Currency Formatting Utils
**File**: `src/utils/formatting/currency.ts`

```typescript
export interface CurrencyOptions {
  currency: string;
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

export const formatCurrency = (
  amount: number,
  options: CurrencyOptions = { currency: 'USD' }
): string => {
  const  {
    currency,
    locale = 'en-US',
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
  } = options;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(amount);
};

export const parseCurrency = (value: string): number => {
  return parseFloat(value.replace(/[^0-9.-]+/g, ''));
};

export const convertCurrency = (
  amount: number,
  fromRate: number,
  toRate: number
): number => {
  return (amount / fromRate) * toRate;
};
```

**Tasks**:
- [ ] Implement currency formatting functions
- [ ] Add tests for currency utils
- [ ] Update existing components to use utilities

---

#### Task 3: Create Date Formatting Utils
**File**: `src/utils/formatting/date.ts`

```typescript
import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns';

export const formatDate = (date: Date | string, formatStr: string = 'PPP'): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return format(d, formatStr);
};

export const formatRelativeTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  if (isToday(d)) return `Today at ${format(d, 'p')}`;
  if (isYesterday(d)) return `Yesterday at ${format(d, 'p')}`;
  
  return formatDistanceToNow(d, { addSuffix: true });
};

export const formatCallDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  }
  return `${secs}s`;
};
```

**Tasks**:
- [ ] Install date-fns: `npm install date-fns`
- [ ] Implement date formatting functions
- [ ] Add tests for date utils
- [ ] Update components to use date formatters

---

#### Task 4: Create Number Formatting Utils
**File**: `src/utils/formatting/numbers.ts`

```typescript
export const formatNumber = (num: number, decimals: number = 0): string => {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${(value * 100).toFixed(decimals)}%`;
};

export const roundToNearest = (value: number, nearest: number = 1): number => {
  return Math.round(value / nearest) * nearest;
};

export const calculatePercentageChange = (
  current: number,
  previous: number
): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};
```

**Tasks**:
- [ ] Implement number formatting functions
- [ ] Add tests for number utils
- [ ] Update stats calculations to use utilities

---

### Phase 1.3: Create Service Layer (Days 3-4)

#### Task 5: Implement CallService
**File**: `src/modules/interpretrack/services/callService.ts`

```typescript
import { CallRecord, CallTypeStats, WeeklyData } from '../types';

export class CallService {
  private calls: CallRecord[] = [];

  // CRUD Operations
  async createCall(call: Omit<CallRecord, 'id'>): Promise<CallRecord> {
    const newCall: CallRecord = {
      ...call,
      id: `call_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
    this.calls.unshift(newCall);
    return newCall;
  }

  async getCalls(limit?: number): Promise<CallRecord[]> {
    if (limit) {
      return this.calls.slice(0, limit);
    }
    return [...this.calls];
  }

  async updateCall(id: string, updates: Partial<CallRecord>): Promise<CallRecord | null> {
    const index = this.calls.findIndex(c => c.id === id);
    if (index === -1) return null;

    this.calls[index] = { ...this.calls[index], ...updates };
    return this.calls[index];
  }

  async deleteCall(id: string): Promise<boolean> {
    const index = this.calls.findIndex(c => c.id === id);
    if (index === -1) return false;

    this.calls.splice(index, 1);
    return true;
  }

  // Analytics
  getCallTypeStats(): CallTypeStats {
    return this.calls.reduce(
      (stats, call) => {
        if (call.callType === 'VRI') stats.vri += 1;
        else stats.opi += 1;
        return stats;
      },
      { vri: 0, opi: 0 }
    );
  }

  getWeeklyData(): WeeklyData[] {
    const weeklyData: WeeklyData[] = [
      { day: 'Sun', calls: 0, earnings: 0 },
      { day: 'Mon', calls: 0, earnings: 0 },
      { day: 'Tue', calls: 0, earnings: 0 },
      { day: 'Wed', calls: 0, earnings: 0 },
      { day: 'Thu', calls: 0, earnings: 0 },
      { day: 'Fri', calls: 0, earnings: 0 },
      { day: 'Sat', calls: 0, earnings: 0 },
    ];

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    this.calls
      .filter(call => call.startTime > oneWeekAgo)
      .forEach(call => {
        const dayIndex = call.startTime.getDay();
        weeklyData[dayIndex].calls += 1;
        weeklyData[dayIndex].earnings += call.earnings;
      });

    return weeklyData;
  }

  getAggregatedStats() {
    return {
      totalCalls: this.calls.length,
      totalMinutes: this.calls.reduce((sum, call) => sum + call.duration, 0),
      totalEarnings: this.calls.reduce((sum, call) => sum + call.earnings, 0),
    };
  }

  // Seed with sample data
  seedSampleData(count: number = 75) {
    // Implementation same as in data.ts
    // Move the generateCallRecords function here
  }
}

export const callService = new CallService();
```

**Tasks**:
- [ ] Implement CallService class
- [ ] Move data generation logic from `lib/data.ts`
- [ ] Add TypeScript types
- [ ] Write unit tests for CallService methods

---

#### Task 6: Create Custom Hooks
**File**: `src/modules/interpretrack/hooks/useCallData.ts`

```typescript
import { useState, useEffect } from 'react';
import { callService } from '../services/callService';
import { CallRecord } from '../types';

export const useCallData = () => {
  const [calls, setCalls] = useState<CallRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCalls = async () => {
      try {
        setLoading(true);
        const data = await callService.getCalls();
        setCalls(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchCalls();
  }, []);

  const addCall = async (call: Omit<CallRecord, 'id'>) => {
    try {
      const newCall = await callService.createCall(call);
      setCalls(prev => [newCall, ...prev]);
      return newCall;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return { calls, loading, error, addCall };
};
```

**File**: `src/modules/interpretrack/hooks/useStats.ts`

```typescript
import { useMemo } from 'react';
import { callService } from '../services/callService';
import { useCallData } from './useCallData';

export const useStats = () => {
  const { calls, loading } = useCallData();

  const stats = useMemo(() => {
    return callService.getAggregatedStats();
  }, [calls]);

  const callTypeStats = useMemo(() => {
    return callService.getCallTypeStats();
  }, [calls]);

  const weeklyData = useMemo(() => {
    return callService.getWeeklyData();
  }, [calls]);

  return {
    stats,
    callTypeStats,
    weeklyData,
    loading,
  };
};
```

**Tasks**:
- [ ] Implement useCallData hook
- [ ] Implement useStats hook
- [ ] Write integration tests for hooks
- [ ] Update InterpreTrack page to use hooks

---

### Phase 1.4: Component Modularization (Days 4-5)

#### Task 7: Extract StatsCards Component
**File**: `src/modules/interpretrack/components/StatsCards/StatsCards.tsx`

```typescript
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Clock, DollarSign, TrendingUp } from 'lucide-react';
import { formatCurrency } from '@/utils/formatting/currency';
import { formatNumber } from '@/utils/formatting/numbers';

interface StatsCardsProps {
  stats: {
    totalCalls: number;
    totalMinutes: number;
    totalEarnings: number;
  };
}

export const StatsCards = ({ stats }: StatsCardsProps) => {
  const cards = [
    {
      title: 'Total Calls',
      value: formatNumber(stats.totalCalls),
      subtitle: 'This month',
      icon: Phone,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Total Minutes',
      value: formatNumber(stats.totalMinutes),
      subtitle: 'Billable time',
      icon: Clock,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Total Earnings',
      value: formatCurrency(stats.totalEarnings, { currency: 'USD' }),
      subtitle: 'Gross income',
      icon: DollarSign,
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.title} className="border-border/50 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-lg bg-gradient-to-br ${card.gradient}`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>              <p className="text-2xl md:text-3xl font-bold">{card.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{card.subtitle}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsCards;
```

**File**: `src/modules/interpretrack/components/StatsCards/index.ts`
```typescript
export { StatsCards as default } from './StatsCards';
export type { StatsCardsProps } from './StatsCards';
```

**Tasks**:
- [ ] Extract StatsCards to module
- [ ] Add barrel export (index.ts)
- [ ] Update imports in InterpreTrack page
- [ ] Test component isolation

---

#### Task 8: Update InterpreTrack Page
**File**: `src/pages/InterpreTrack.tsx`

```typescript
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import StatsCards from '@/modules/interpretrack/components/StatsCards';
import CallTypeChart from '@/modules/interpretrack/components/CallTypeChart';
import WeeklyChart from '@/modules/interpretrack/components/WeeklyChart';
import ManualLog from '@/modules/interpretrack/components/ManualLog';
import RecentCalls from '@/modules/interpretrack/components/RecentCalls';
import AIInsights from '@/modules/interpretrack/components/AIInsights';
import { useStats } from '@/modules/interpretrack/hooks/useStats';
import { isDemoMode } from '@/lib/data';
import { DemoBanner } from '@/modules/interpretrack/components/DemoBanner';

export default function InterpreTrack() {
  const { stats, callTypeStats, weeklyData, loading } = useStats();
  const demoMode = isDemoMode();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 bg-gradient-to-b from-background to-muted/20">
        <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
          <header className="space-y-2">
           <div className="flex items-center gap-3">
              <div className="w-1 h-10 bg-gradient-to-b from-primary to-success rounded-full" />
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">
                  InterpreTrack Dashboard
                </h1>
                <p className="text-muted-foreground mt-1">
                  {demoMode ? 'Viewing Demo Data' : 'Welcome back, Interpreter!'}
                </p>
              </div>
            </div>
          </header>

          {demoMode && <DemoBanner />}

          <StatsCards stats={stats} />

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <ManualLog />
            </div>

            <div className="lg:col-span-2 grid gap-6">
              <div className="grid md:grid-cols-2 gap-6">
                <CallTypeChart data={callTypeStats} />
                <AIInsights />
              </div>
              
              <WeeklyChart data={weeklyData} />
            </div>
          </div>

          <RecentCalls />
        </div>
      </main>

      <Footer />
    </div>
  );
}
```

**Tasks**:
- [ ] Update InterpreTrack page to use new hooks
- [ ] Update imports to use modular paths
- [ ] Add loading state
- [ ] Test page functionality

---

## Week 2: Testing Infrastructure & Remaining Components

### Phase 2.1: Testing Setup (Days 6-7)

#### Task 9: Install Testing Dependencies
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event happy-dom
```

**File**: `vitest.config.ts`
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./src/__tests__/setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

**File**: `src/__tests__/setup.ts`
```typescript
import '@testing-library/jest-dom';
```

**Tasks**:
- [ ] Install Vitest and testing libraries
- [ ] Create vitest.config.ts
- [ ] Set up test utilities
- [ ] Add test scripts to package.json

---

#### Task 10: Write Service Tests
**File**: `src/modules/interpretrack/__tests__/services/callService.test.ts`

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { CallService } from '../../services/callService';

describe('CallService', () => {
  let service: CallService;

  beforeEach(() => {
    service = new CallService();
  });

  describe('createCall', () => {
    it('should create a call with generated ID', async () => {
      const callData = {
        startTime: new Date(),
        endTime: new Date(),
        duration: 30,
        earnings: 22.50,
        platform: 'Platform A' as const,
        callType: 'VRI' as const,
      };

      const result = await service.createCall(callData);

      expect(result).toHaveProperty('id');
      expect(result.duration).toBe(30);
      expect(result.earnings).toBe(22.50);
    });
  });

  describe('getCallTypeStats', () => {
    it('should calculate VRI/OPI distribution', async () => {
      await service.createCall({
        startTime: new Date(),
        endTime: new Date(),
        duration: 30,
        earnings: 22.50,
        platform: 'Platform A',
        callType: 'VRI',
       });

      await service.createCall({
        startTime: new Date(),
        endTime: new Date(),
        duration: 45,
        earnings: 33.75,
        platform: 'Platform B',
        callType: 'OPI',
      });

      const stats = service.getCallTypeStats();

      expect(stats.vri).toBe(1);
      expect(stats.opi).toBe(1);
    });
  });

  describe('getAggregatedStats', () => {
    it('should calculate total calls, minutes, and earnings', async () => {
      await service.createCall({
        startTime: new Date(),
        endTime: new Date(),
        duration: 30,
        earnings: 22.50,
        platform: 'Platform A',
        callType: 'VRI',
      });

      await service.createCall({
        startTime: new Date(),
        endTime: new Date(),
        duration: 45,
        earnings: 33.75,
        platform: 'Platform B',
        callType: 'OPI',
      });

      const stats = service.getAggregatedStats();

      expect(stats.totalCalls).toBe(2);
      expect(stats.totalMinutes).toBe(75);
      expect(stats.totalEarnings).toBe(56.25);
    });
  });
});
```

**Tasks**:
- [ ] Write CallService tests
- [ ] Test all CRUD operations
- [ ] Test analytics methods
- [ ] Achieve >80% coverage

---

### Phase 2.2: Extract Remaining Components (Days 8-10)

Following the same pattern as StatsCards, extract:

- [ ] CallTypeChart → `src/modules/interpretrack/components/CallTypeChart/`
- [ ] WeeklyChart → `src/modules/interpretrack/components/WeeklyChart/`
- [ ] ManualLog → `src/modules/interpretrack/components/ManualLog/`
- [ ] RecentCalls → `src/modules/interpretrack/components/RecentCalls/`
- [ ] AIInsights → `src/modules/interpretrack/components/AIInsights/`
- [ ] DemoBanner → `src/modules/interpretrack/components/DemoBanner/`

Each component should:
1. Have its own directory
2. Have a barrel export (index.ts)
3. Import utilities from `@/utils`
4. Be tested independently

---

## Week 3: Advanced Features & Firebase Setup

### Phase 3.1: Firebase Integration (Days 11-14)

#### Task 11: Set Up Firebase Project
```bash
npm install firebase
npm install -D firebase-tools
npx firebase login
npx firebase init
```

Select:
- ✅ Firestore
- ✅ Authentication
- ✅ Hosting
- ✅ Storage
- ✅ Functions

**File**: `src/services/firebase/config.ts`
```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

**Tasks**:
- [ ] Create Firebase project
- [ ] Set up environment variables
- [ ] Initialize Firebase SDK
- [ ] Configure Firestore security rules

---

#### Task 12: Implement Firestore CallService
**File**: `src/modules/interpretrack/services/firestoreCallService.ts`

```typescript
import { db } from '@/services/firebase/config';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  limit as firestoreLimit,
} from 'firebase/firestore';
import { CallRecord } from '../types';

export class FirestoreCallService {
  private collectionName = 'calls';

  async createCall(userId: string, call: Omit<CallRecord, 'id'>): Promise<CallRecord> {
    const docRef = await addDoc(collection(db, `users/${userId}/${this.collectionName}`), {
      ...call,
      createdAt: new Date(),
    });

    return { ...call, id: docRef.id };
  }

  async getCalls(userId: string, limitCount?: number): Promise<CallRecord[]> {
    const callsRef = collection(db, `users/${userId}/${this.collectionName}`);
    let q = query(callsRef, orderBy('startTime', 'desc'));

    if (limitCount) {
      q = query(q, firestoreLimit(limitCount));
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CallRecord));
  }

  // ... other methods
}
```

**Tasks**:
- [ ] Implement Firestore CallService
- [ ] Add offline support
- [ ] Implement sync mechanism
- [ ] Test Firestore integration

---

## Week 4: Polish & Documentation

### Phase 4.1: Performance Optimization (Days 15-16)

- [ ] Implement code splitting
- [ ] Add lazy loading for routes
- [ ] Optimize bundle size
- [ ] Add loading states
- [ ] Implement error boundaries

### Phase 4.2: Documentation (Days 17-18)

- [ ] Update README with new architecture
- [ ] Document service layer patterns
- [ ] Create component usage examples
- [ ] Document testing approach

---

## Success Criteria

### Code Quality
- [ ] All components extracted to modules
- [ ] Service layer fully abstracted
- [ ] >80% test coverage
- [ ] Zero TypeScript errors
- [ ] Zero console warnings

### Performance
- [ ] Bundle size < 500KB (gzipped)
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s

### Architecture
- [ ] Clear separation of concerns
- [ ] Reusable utility functions
- [ ] Scalable component structure
- [ ] Documented patterns

---

## Next Steps After Week 4

1. **InterpreBot Module**: Apply same patterns
2. **InterpreCoach Module**: Apply same patterns  
3. **Vertex AI Integration**: Begin AI services
4. **Payment Integration**: Add subscription management

---

## Migration Strategy

To avoid breaking changes:

1. **Keep Old Code**: Don't delete `src/lib/data.ts` immediately
2. **Gradual Migration**: One component at a time
3. **Feature Flags**: Use flags to toggle new vs old code
4. **Testing**: Test each migration thoroughly
5. **Rollback Plan**: Be ready to revert if needed

---

**Implementation Owner**: Development Team  
**Review Frequency**: Daily standups  
**Deployment Strategy**: Continuous to `landing-page-redesign` branch  
**Production Deployment**: After Week 4 completion
</artifacts>
</workspace_context>
<mission_brief>[Describe your task here...]</mission_brief>