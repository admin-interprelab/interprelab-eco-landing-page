// Service Worker for InterpreLab - Offline Support for Critical Resources
const CACHE_NAME = 'interprelab-critical-v1';
const OFFLINE_CACHE_NAME = 'interprelab-offline-v1';

// Critical resources that must be available offline for interpreter support
const CRITICAL_RESOURCES = [
  '/',
  '/crisis-support',
  '/peer-community',
  '/self-care',
  '/emergency-contacts',
  '/offline.html',
  // CSS and JS files
  '/static/css/main.css',
  '/static/js/main.js',
  // Critical images
  '/images/crisis-support-icon.svg',
  '/images/peer-support-icon.svg',
  '/images/self-care-icon.svg'
];

// API endpoints for critical support data
const CRITICAL_API_ENDPOINTS = [
  '/api/crisis-support',
  '/api/community/quick-access',
  '/api/support/offline',
  '/api/tools/emergency',
  '/api/health'
];

// Install event - cache critical resources
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');

  event.waitUntil(
    Promise.all([
      // Cache critical static resources
      caches.open(CACHE_NAME).then((cache) => {
        console.log('Service Worker: Caching critical resources');
        return cache.addAll(CRITICAL_RESOURCES.map(url => new Request(url, {
          cache: 'reload' // Ensure we get fresh content
        })));
      }),

      // Pre-cache critical API data
      caches.open(OFFLINE_CACHE_NAME).then(async (cache) => {
        console.log('Service Worker: Pre-caching critical API data');

        for (const endpoint of CRITICAL_API_ENDPOINTS) {
          try {
            const response = await fetch(endpoint);
            if (response.ok) {
              await cache.put(endpoint, response.clone());
            }
          } catch (error) {
            console.warn(`Failed to pre-cache ${endpoint}:`, error);
          }
        }
      })
    ]).then(() => {
      console.log('Service Worker: Installation complete');
      // Force activation of new service worker
      return self.skipWaiting();
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Delete old caches
          if (cacheName !== CACHE_NAME && cacheName !== OFFLINE_CACHE_NAME) {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: Activation complete');
      // Take control of all pages immediately
      return self.clients.claim();
    })
  );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle different types of requests
  if (url.pathname.startsWith('/api/')) {
    // API requests - critical support data
    event.respondWith(handleApiRequest(request));
  } else if (CRITICAL_RESOURCES.includes(url.pathname) || url.pathname === '/') {
    // Critical static resources
    event.respondWith(handleCriticalResource(request));
  } else {
    // Other resources - network first, cache fallback
    event.respondWith(handleOtherResource(request));
  }
});

// Handle API requests with offline support
async function handleApiRequest(request) {
  const url = new URL(request.url);

  try {
    // Try network first for fresh data
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      // Cache successful responses for offline use
      const cache = await caches.open(OFFLINE_CACHE_NAME);
      await cache.put(request, networkResponse.clone());
      return networkResponse;
    }

    throw new Error('Network response not ok');
  } catch (error) {
    console.log('Service Worker: Network failed, trying cache for:', url.pathname);

    // Network failed, try cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      // Add offline indicator header
      const response = cachedResponse.clone();
      response.headers.set('X-Served-By', 'ServiceWorker-Offline');
      return response;
    }

    // No cache available, return offline support data
    return createOfflineSupportResponse(url.pathname);
  }
}

// Handle critical resources (cache first for reliability)
async function handleCriticalResource(request) {
  try {
    // Try cache first for critical resources
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Cache miss, try network
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      // Update cache with fresh content
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, networkResponse.clone());
      return networkResponse;
    }

    throw new Error('Network response not ok');
  } catch (error) {
    console.log('Service Worker: Critical resource unavailable:', request.url);

    // Return offline fallback page
    return caches.match('/offline.html') || createOfflineResponse();
  }
}

// Handle other resources (network first)
async function handleOtherResource(request) {
  try {
    // Try network first
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      // Cache successful responses
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, networkResponse.clone());
      return networkResponse;
    }

    throw new Error('Network response not ok');
  } catch (error) {
    // Network failed, try cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // No cache available, return appropriate fallback
    if (request.destination === 'image') {
      return createOfflineImageResponse();
    }

    return createOfflineResponse();
  }
}

// Create offline support response for API endpoints
function createOfflineSupportResponse(pathname) {
  const offlineData = {
    '/api/crisis-support': {
      hotlines: [
        {
          name: 'National Crisis Line',
          number: '988',
          available: '24/7',
          description: 'Free, confidential crisis support'
        },
        {
          name: 'Crisis Text Line',
          number: 'Text HOME to 741741',
          available: '24/7',
          description: 'Text-based crisis support'
        }
      ],
      selfCare: [
        'Take 5 deep breaths',
        'Drink a glass of water',
        'Step outside for fresh air',
        'Call a trusted friend or family member'
      ],
      offline: true,
      message: 'You are not alone. These resources are always available to you.'
    },
    '/api/community/quick-access': {
      message: 'Community features require internet connection',
      offlineSupport: 'Crisis support and self-care tools are available offline',
      offline: true
    },
    '/api/support/offline': {
      techniques: [
        {
          name: 'Box Breathing',
          description: 'Breathe in for 4, hold for 4, out for 4, hold for 4',
          duration: '2-5 minutes'
        },
        {
          name: 'Grounding 5-4-3-2-1',
          description: '5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste',
          duration: '3-5 minutes'
        }
      ],
      affirmations: [
        'I am capable and strong',
        'This difficult moment will pass',
        'I have overcome challenges before',
        'I deserve support and care'
      ],
      offline: true
    }
  };

  const data = offlineData[pathname] || {
    message: 'This content is not available offline',
    offline: true,
    support: 'Crisis support resources are always available'
  };

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'X-Served-By': 'ServiceWorker-Offline'
    }
  });
}

// Create generic offline response
function createOfflineResponse() {
  const offlineHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>InterpreLab - Offline Support</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          margin: 0;
          padding: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .container {
          max-width: 500px;
          text-align: center;
          background: rgba(255, 255, 255, 0.1);
          padding: 40px;
          border-radius: 20px;
          backdrop-filter: blur(10px);
        }
        h1 { margin-bottom: 20px; }
        .crisis-support {
          background: rgba(255, 255, 255, 0.2);
          padding: 20px;
          border-radius: 10px;
          margin: 20px 0;
        }
        .phone-number {
          font-size: 24px;
          font-weight: bold;
          color: #FFD700;
          margin: 10px 0;
        }
        .breathing-exercise {
          margin: 20px 0;
          padding: 15px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🌟 You're Not Alone</h1>
        <p>InterpreLab is temporarily offline, but support is always available.</p>

        <div class="crisis-support">
          <h2>🆘 Immediate Support</h2>
          <div class="phone-number">988</div>
          <p>National Crisis Line - Free, 24/7</p>
          <div class="phone-number">Text HOME to 741741</div>
          <p>Crisis Text Line - Free, 24/7</p>
        </div>

        <div class="breathing-exercise">
          <h3>🫁 Quick Breathing Exercise</h3>
          <p>Breathe in for 4 counts, hold for 4, out for 4, hold for 4</p>
          <p>Repeat 4-6 times</p>
        </div>

        <p><strong>Remember:</strong> Technical difficulties are temporary. Your strength is permanent.</p>

        <button onclick="location.reload()" style="
          background: #4CAF50;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 25px;
          font-size: 16px;
          cursor: pointer;
          margin-top: 20px;
        ">Try Reconnecting</button>
      </div>
    </body>
    </html>
  `;

  return new Response(offlineHtml, {
    status: 200,
    headers: {
      'Content-Type': 'text/html',
      'X-Served-By': 'ServiceWorker-Offline'
    }
  });
}

// Create offline image response
function createOfflineImageResponse() {
  // Return a simple SVG placeholder
  const svg = `
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="#f0f0f0"/>
      <text x="100" y="100" text-anchor="middle" dy=".3em" font-family="Arial" font-size="14" fill="#666">
        Image offline
      </text>
    </svg>
  `;

  return new Response(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml',
      'X-Served-By': 'ServiceWorker-Offline'
    }
  });
}

// Handle background sync for critical data updates
self.addEventListener('sync', (event) => {
  if (event.tag === 'critical-data-sync') {
    event.waitUntil(syncCriticalData());
  }
});

// Sync critical data when connection is restored
async function syncCriticalData() {
  console.log('Service Worker: Syncing critical data...');

  const cache = await caches.open(OFFLINE_CACHE_NAME);

  for (const endpoint of CRITICAL_API_ENDPOINTS) {
    try {
      const response = await fetch(endpoint);
      if (response.ok) {
        await cache.put(endpoint, response.clone());
        console.log(`Service Worker: Synced ${endpoint}`);
      }
    } catch (error) {
      console.warn(`Service Worker: Failed to sync ${endpoint}:`, error);
    }
  }
}

// Handle push notifications for crisis support
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();

    if (data.type === 'crisis-support') {
      event.waitUntil(
        self.registration.showNotification('InterpreLab Support', {
          body: data.message || 'Support resources are available',
          icon: '/images/crisis-support-icon.svg',
          badge: '/images/badge-icon.svg',
          actions: [
            {
              action: 'open-support',
              title: 'Get Support'
            },
            {
              action: 'dismiss',
              title: 'Dismiss'
            }
          ],
          requireInteraction: true,
          tag: 'crisis-support'
        })
      );
    }
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'open-support') {
    event.waitUntil(
      clients.openWindow('/crisis-support')
    );
  }
});

console.log('Service Worker: Loaded and ready for InterpreLab critical support');
