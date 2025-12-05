# InterpreLab

InterpreLab is a cutting-edge, AI-driven training and real-time assistance platform for medical interpreters, focused on human skill optimization and bridging critical communication gaps in healthcare.

## Features

## A/B Testing Note

**InterpreCoach Implementation:**
This project implements two different versions of the InterpreCoach solution for A/B testing purposes:

1. **Current Version** (in `/interprecoach` route): Standard solution with AI coaching features
2. **Agentic Version** (removed from Extension UI): Multi-agent system implementation with distributed AI agents

The agentic version with multi-agent architecture has been removed to allow for performance comparison. Future A/B testing will help determine which approach users prefer and which performs better in real-world scenarios.

Key differences to test:
- Single AI model vs. multi-agent system
- User experience and response quality
- Performance and resource usage
- User preference and satisfaction

## Development Sprints

### Sprint 1 & 2: Core Visuals & Interactivity (Completed)
✅ Hero background images generated and implemented
✅ Animated stats counters with scroll-triggered visibility
✅ Scroll-triggered animations for all major sections
✅ Enhanced hover effects and micro-interactions on cards
✅ Testimonial avatar images and auto-rotation
✅ Basic accessibility improvements

### Sprint 3: Polish & Optimization (Completed)
✅ **Scroll Progress Indicator** - Visual feedback for page navigation
✅ **Enhanced Accessibility**
   - ARIA labels on all interactive elements
   - Focus-visible states with primary color ring
   - Reduced motion support for accessibility
   - Semantic HTML with proper role attributes
✅ **Advanced Micro-interactions**
   - Button shine effects on hover
   - Icon rotations and scaling on hover
   - Staggered fade-in animations with delay
   - Smooth scroll snap for video sections
✅ **Loading States** - Created reusable LoadingSpinner component
✅ **Custom Hooks** - useScrollAnimation and useParallax for smooth interactions
✅ **Design System Enhancements**
   - Glass button effects with animated shine
   - Skeleton loading patterns
   - Scroll snap containers
✅ **Performance Optimization**
   - Lazy loading support in CSS
   - Passive event listeners for scroll
   - Optimized animation performance

## How can I edit this code?

## Development

To start the development server:

```bash
npm install
npm run dev
```

## Build

To build the project:

```bash
npm run build
```
