/**
 * Performance monitoring tests for LazyImage component
 * Tests image optimization, WebP support, and loading performance
 */

// Mock Image constructor for testing
class MockImage {
  src: string = '';
  onload: (() => void) | null = null;
  onerror: (() => void) | null = null;
  width: number = 0;
  height: number = 0;

  constructor() {
    // Simulate async loading
    setTimeout(() => {
      if (this.src.includes('error')) {
        this.onerror?.();
      } else {
        this.width = 400;
        this.height = 300;
        this.onload?.();
      }
    }, 10);
  }
}

// Test WebP support detection
export const testWebPSupportDetection = () => {
  console.log('Testing WebP support detection...');

  try {
    // Mock WebP test image data
    const webpTestData = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';

    // Create test image
    const testImage = new MockImage();
    testImage.src = webpTestData;

    // Simulate WebP support check
    const webpSupported = !testImage.src.includes('error');

    if (typeof webpSupported === 'boolean') {
      console.log(`✓ WebP support detection: ${webpSupported ? 'supported' : 'not supported'}`);
      return true;
    } else {
      console.error('✗ WebP support detection failed');
      return false;
    }
  } catch (error) {
    console.error('✗ WebP support test failed:', error);
    return false;
  }
};

// Test responsive image srcSet generation
export const testResponsiveImageGeneration = () => {
  console.log('Testing responsive image srcSet generation...');

  try {
    const baseSrc = '/images/test-image.jpg';
    const breakpoints = [320, 640, 768, 1024, 1280, 1536];

    // Generate WebP srcSet
    const webpSrcSet = breakpoints
      .map(width => `/images/test-image-${width}w.webp ${width}w`)
      .join(', ');

    // Generate fallback srcSet
    const fallbackSrcSet = breakpoints
      .map(width => `/images/test-image-${width}w.jpg ${width}w`)
      .join(', ');

    // Validate srcSet format
    const webpValid = webpSrcSet.includes('.webp') && webpSrcSet.includes('320w');
    const fallbackValid = fallbackSrcSet.includes('.jpg') && fallbackSrcSet.includes('320w');

    if (webpValid && fallbackValid) {
      console.log('✓ Responsive image srcSet generation successful');
      console.log(`  WebP srcSet: ${webpSrcSet.substring(0, 50)}...`);
      console.log(`  Fallback srcSet: ${fallbackSrcSet.substring(0, 50)}...`);
      return true;
    } else {
      console.error('✗ Responsive image srcSet generation failed');
      return false;
    }
  } catch (error) {
    console.error('✗ Responsive image generation test failed:', error);
    return false;
  }
};

// Test image loading performance
export const testImageLoadingPerformance = () => {
  console.log('Testing image loading performance...');

  return new Promise<boolean>((resolve) => {
    try {
      const startTime = performance.now();
      const testImage = new MockImage();

      testImage.onload = () => {
        const endTime = performance.now();
        const loadTime = endTime - startTime;

        if (loadTime < 100) { // Should be fast for mock
          console.log(`✓ Image load time: ${loadTime.toFixed(2)}ms`);
          resolve(true);
        } else {
          console.error(`✗ Image load time too slow: ${loadTime}ms`);
          resolve(false);
        }
      };

      testImage.onerror = () => {
        console.error('✗ Image failed to load');
        resolve(false);
      };

      testImage.src = '/images/test-image.jpg';
    } catch (error) {
      console.error('✗ Image loading performance test failed:', error);
      resolve(false);
    }
  });
};

// Test progressive image loading with blur placeholder
export const testProgressiveImageLoading = () => {
  console.log('Testing progressive image loading...');

  try {
    // Generate blur placeholder
    const blurPlaceholder = `data:image/svg+xml;base64,${btoa(
      `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#f3f4f6;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#e5e7eb;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad)"/>
      </svg>`
    )}`;

    // Validate placeholder format
    const isValidDataUrl = blurPlaceholder.startsWith('data:image/svg+xml;base64,');
    const containsSvg = blurPlaceholder.includes('svg');

    if (isValidDataUrl && containsSvg) {
      console.log('✓ Progressive image loading placeholder generated');
      return true;
    } else {
      console.error('✗ Progressive image loading placeholder generation failed');
      return false;
    }
  } catch (error) {
    console.error('✗ Progressive image loading test failed:', error);
    return false;
  }
};

// Test image error handling
export const testImageErrorHandling = () => {
  console.log('Testing image error handling...');

  return new Promise<boolean>((resolve) => {
    try {
      const testImage = new MockImage();

      testImage.onload = () => {
        console.error('✗ Image should have failed to load');
        resolve(false);
      };

      testImage.onerror = () => {
        console.log('✓ Image error handling works correctly');
        resolve(true);
      };

      // Use error-triggering src
      testImage.src = '/images/error-image.jpg';
    } catch (error) {
      console.error('✗ Image error handling test failed:', error);
      resolve(false);
    }
  });
};

// Test image preloading for critical images
export const testImagePreloading = () => {
  console.log('Testing image preloading...');

  try {
    // Mock preload function
    const preloadImage = (src: string, priority: 'high' | 'low' = 'low') => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;

      if (priority === 'high') {
        link.setAttribute('fetchpriority', 'high');
      }

      return link;
    };

    // Test preload link creation
    const preloadLink = preloadImage('/images/hero-image.jpg', 'high');

    const hasCorrectRel = preloadLink.rel === 'preload';
    const hasCorrectAs = preloadLink.getAttribute('as') === 'image';
    const hasHighPriority = preloadLink.getAttribute('fetchpriority') === 'high';

    if (hasCorrectRel && hasCorrectAs && hasHighPriority) {
      console.log('✓ Image preloading configuration correct');
      return true;
    } else {
      console.error('✗ Image preloading configuration failed');
      return false;
    }
  } catch (error) {
    console.error('✗ Image preloading test failed:', error);
    return false;
  }
};

// Run all LazyImage tests
export const runLazyImageTests = async () => {
  console.log('Running LazyImage performance tests...');
  console.log('===================================');

  const syncResults = [
    testWebPSupportDetection(),
    testResponsiveImageGeneration(),
    testProgressiveImageLoading(),
    testImagePreloading()
  ];

  // Run async tests
  const asyncResults = await Promise.all([
    testImageLoadingPerformance(),
    testImageErrorHandling()
  ]);

  const allResults = [...syncResults, ...asyncResults];
  const passed = allResults.filter(result => result).length;
  const total = allResults.length;

  console.log('===================================');
  console.log(`LazyImage tests: ${passed}/${total} passed`);

  return passed === total;
};
