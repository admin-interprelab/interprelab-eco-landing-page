import { useState, useEffect, useCallback } from 'react';

interface CacheItem<T> {
  data: T;
  timestamp: number;
  priority: 'critical' | 'important' | 'nice-to-have';
  accessCount: number;
  lastAccessed: number;
}

interface CacheConfig {
  maxSize: number;
  defaultTTL: number; // Time to live in milliseconds
  criticalTTL: number; // Longer TTL for critical resources
  cleanupInterval: number;
}

interface SmartCacheOptions {
  priority?: 'critical' | 'important' | 'nice-to-have';
  ttl?: number;
  preload?: boolean;
}

class SmartCache<T> {
  private cache = new Map<string, CacheItem<T>>();
  private config: CacheConfig;
  private cleanupTimer: NodeJS.Timeout | null = null;

  constructor(config: Partial<CacheConfig> = {}) {
    this.config = {
      maxSize: 100,
      defaultTTL: 5 * 60 * 1000, // 5 minutes
      criticalTTL: 30 * 60 * 1000, // 30 minutes for critical resources
      cleanupInterval: 60 * 1000, // 1 minute
      ...config
    };

    this.startCleanup();
  }

  set(key: string, data: T, options: SmartCacheOptions = {}): void {
    const now = Date.now();
    const priority = options.priority || 'nice-to-have';
    const ttl = options.ttl || (priority === 'critical' ? this.config.criticalTTL : this.config.defaultTTL);

    // If cache is full, remove least important items
    if (this.cache.size >= this.config.maxSize) {
      this.evictLeastImportant();
    }

    this.cache.set(key, {
      data,
      timestamp: now,
      priority,
      accessCount: 0,
      lastAccessed: now
    });
  }

  get(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;

    const now = Date.now();
    const ttl = item.priority === 'critical' ? this.config.criticalTTL : this.config.defaultTTL;

    // Check if item has expired
    if (now - item.timestamp > ttl) {
      this.cache.delete(key);
      return null;
    }

    // Update access statistics
    item.accessCount++;
    item.lastAccessed = now;

    return item.data;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  // Get cache statistics for monitoring
  getStats() {
    const now = Date.now();
    const items = Array.from(this.cache.values());

    return {
      size: this.cache.size,
      maxSize: this.config.maxSize,
      criticalItems: items.filter(item => item.priority === 'critical').length,
      importantItems: items.filter(item => item.priority === 'important').length,
      averageAccessCount: items.reduce((sum, item) => sum + item.accessCount, 0) / items.length || 0,
      oldestItem: Math.min(...items.map(item => now - item.timestamp)),
      newestItem: Math.max(...items.map(item => now - item.timestamp))
    };
  }

  private evictLeastImportant(): void {
    const items = Array.from(this.cache.entries());

    // Sort by priority (critical last), then by access count, then by last accessed
    items.sort(([, a], [, b]) => {
      const priorityOrder = { 'critical': 3, 'important': 2, 'nice-to-have': 1 };

      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }

      if (a.accessCount !== b.accessCount) {
        return a.accessCount - b.accessCount;
      }

      return a.lastAccessed - b.lastAccessed;
    });

    // Remove the least important item
    if (items.length > 0) {
      this.cache.delete(items[0][0]);
    }
  }

  private startCleanup(): void {
    this.cleanupTimer = setInterval(() => {
      const now = Date.now();
      const keysToDelete: string[] = [];

      for (const [key, item] of this.cache.entries()) {
        const ttl = item.priority === 'critical' ? this.config.criticalTTL : this.config.defaultTTL;
        if (now - item.timestamp > ttl) {
          keysToDelete.push(key);
        }
      }

      keysToDelete.forEach(key => this.cache.delete(key));
    }, this.config.cleanupInterval);
  }

  destroy(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
      this.cleanupTimer = null;
    }
    this.cache.clear();
  }
}

// Global cache instance for support resources
const supportResourceCache = new SmartCache({
  maxSize: 200,
  defaultTTL: 10 * 60 * 1000, // 10 minutes
  criticalTTL: 60 * 60 * 1000, // 1 hour for critical support resources
});

// Hook for using smart cache with support resources
export const useSmartCache = <T>() => {
  const [cacheStats, setCacheStats] = useState(supportResourceCache.getStats());

  useEffect(() => {
    const interval = setInterval(() => {
      setCacheStats(supportResourceCache.getStats());
    }, 30000); // Update stats every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const setCache = useCallback((key: string, data: T, options?: SmartCacheOptions) => {
    supportResourceCache.set(key, data, options);
    setCacheStats(supportResourceCache.getStats());
  }, []);

  const getCache = useCallback((key: string): T | null => {
    return supportResourceCache.get(key) as T | null;
  }, []);

  const hasCache = useCallback((key: string): boolean => {
    return supportResourceCache.has(key);
  }, []);

  const deleteCache = useCallback((key: string): boolean => {
    const result = supportResourceCache.delete(key);
    setCacheStats(supportResourceCache.getStats());
    return result;
  }, []);

  const clearCache = useCallback(() => {
    supportResourceCache.clear();
    setCacheStats(supportResourceCache.getStats());
  }, []);

  return {
    setCache,
    getCache,
    hasCache,
    deleteCache,
    clearCache,
    cacheStats
  };
};

// Hook for caching critical support resources
export const useCriticalResourceCache = () => {
  const { setCache, getCache, hasCache } = useSmartCache<unknown>();

  const cacheCriticalResource = useCallback(async (
    key: string,
    fetchFn: () => Promise<unknown>
  ) => {
    // Check if we already have this critical resource
    if (hasCache(key)) {
      return getCache(key);
    }

    try {
      const data = await fetchFn();
      setCache(key, data, { priority: 'critical', preload: true });
      return data;
    } catch (error) {
      console.error(`Failed to cache critical resource ${key}:`, error);
      throw error;
    }
  }, [setCache, getCache, hasCache]);

  const preloadCriticalResources = useCallback(async () => {
    const criticalResources = [
      {
        key: 'crisis-support-contacts',
        fetchFn: () => fetch('/api/crisis-support').then(r => r.json())
      },
      {
        key: 'peer-community-access',
        fetchFn: () => fetch('/api/community/quick-access').then(r => r.json())
      },
      {
        key: 'offline-support-content',
        fetchFn: () => fetch('/api/support/offline').then(r => r.json())
      },
      {
        key: 'emergency-tools',
        fetchFn: () => fetch('/api/tools/emergency').then(r => r.json())
      }
    ];

    const results = await Promise.allSettled(
      criticalResources.map(resource =>
        cacheCriticalResource(resource.key, resource.fetchFn)
      )
    );

    const failed = results.filter(result => result.status === 'rejected');
    if (failed.length > 0) {
      console.warn(`Failed to preload ${failed.length} critical resources`);
    }

    return {
      loaded: results.length - failed.length,
      failed: failed.length,
      total: results.length
    };
  }, [cacheCriticalResource]);

  return {
    cacheCriticalResource,
    preloadCriticalResources,
    getCriticalResource: getCache,
    hasCriticalResource: hasCache
  };
};

// Hook for offline support content
export const useOfflineSupport = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { getCache, setCache, hasCache } = useSmartCache<unknown>();

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const getOfflineContent = useCallback((contentType: string) => {
    if (isOnline) {
      return null; // Use online content when available
    }

    const offlineKey = `offline-${contentType}`;
    return getCache(offlineKey);
  }, [isOnline, getCache]);

  const cacheForOffline = useCallback((contentType: string, content: unknown) => {
    const offlineKey = `offline-${contentType}`;
    setCache(offlineKey, content, {
      priority: 'critical',
      ttl: 24 * 60 * 60 * 1000 // 24 hours for offline content
    });
  }, [setCache]);

  const hasOfflineContent = useCallback((contentType: string) => {
    const offlineKey = `offline-${contentType}`;
    return hasCache(offlineKey);
  }, [hasCache]);

  return {
    isOnline,
    getOfflineContent,
    cacheForOffline,
    hasOfflineContent
  };
};

export default useSmartCache;
