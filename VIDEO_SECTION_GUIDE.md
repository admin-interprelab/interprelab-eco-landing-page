# 🎥 Video Section with Pain Points Guide

## 📍 **Current Status**
The video section with pain points is **implemented** but **disabled by default** on the landing page.

## 🎯 **The Three Pain Points**

### 1. **High-Stress Situations Leave No Room for Mistakes**
- **Statistic**: 73% of interpreters report high stress from unknown terminology
- **Description**: Interpreters face intense pressure when encountering unknown medical terminology during critical encounters

### 2. **High Demand Has Lowered Quality Standards**
- **Statistic**: 1 in 6 months average QA feedback frequency
- **Description**: The shortage of qualified interpreters has led to hiring untrained bilinguals with minimal feedback

### 3. **Language Barriers Cost Lives**
- **Statistic**: 2x higher mortality rate for LEP patients
- **Description**: Limited English Proficiency patients are twice as likely to die when hospitalized

## 🔧 **How to Enable Video Section**

### **Option 1: Enable Globally (Recommended)**
Edit `src/components/index-page/constants.ts`:
```typescript
export const DEFAULT_SECTION_CONFIG = {
  showHero: true,
  showVideoSection: true, // Change from false to true
  showProductShowcase: true,
  showStats: true,
  showTestimonials: true,
};
```

### **Option 2: Enable Per Page**
When using the Index component:
```typescript
<Index customContent={{ showVideoSection: true }} />
```

## 📂 **File Locations**

- **Video Section Component**: `src/components/VideoSection.tsx`
- **Pain Points Content**: `src/components/hero/constants.ts` (VIDEO_HERO_SECTIONS)
- **Individual Video Component**: `src/components/hero/VideoHeroSection.tsx`
- **Landing Page Integration**: `src/components/index-page/MainContent.tsx`

## 🎨 **Features**

- **Full-screen video backgrounds** for each pain point
- **Auto-playing videos** with intersection observer
- **Smooth scroll-snap behavior** between sections
- **Statistics overlays** with compelling data
- **Responsive design** for all devices
- **Accessibility support** with proper ARIA labels
- **Error handling** and loading states

## 🚀 **To See It Live**

1. **Enable the section** using Option 1 above
2. **Visit**: `http://127.0.0.1:8082/`
3. **Scroll down** past the hero section to see the video pain points

## 📱 **Mobile Experience**

The video section is fully responsive and includes:
- Touch-friendly scroll navigation
- Optimized video loading for mobile
- Reduced motion support for accessibility
- Proper text sizing for small screens

## 🎬 **Video Assets Needed**

The component expects these video files in the `public/videos/` directory:
- `interpreter-stress.mp4` + `interpreter-stress-poster.jpg`
- `quality-gap.mp4` + `quality-gap-poster.jpg`
- `patient-outcomes.mp4` + `patient-outcomes-poster.jpg`

**Note**: Currently using placeholder paths - you'll need to add actual video files.

---

**Ready to enable?** Just change `showVideoSection: false` to `true` in the constants file!
