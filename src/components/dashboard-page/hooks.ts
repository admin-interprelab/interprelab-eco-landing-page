/**
 * Dashboard Page Component Hooks
 */

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import type { DashboardStats, CallLogEntry } from './types';
import { processDashboardStats, sanitizeCallData } from './utils';
import { DEFAULT_CURRENCY, STATS_CONFIG } from './constants';

/**
 * Hook for managing dashboard data
 */
export const useDashboardData = () => {
  const [stats, setStats] = useState<DashboardStats>({
    monthTotal: 0,
    monthEarnings: 0,
    monthCalls: 0,
    yearTotal: 0,
    yearEarnings: 0,
    yearCalls: 0,
    avgCallDuration: 0,
    totalCalls: 0,
  });
  const [recentCalls, setRecentCalls] = useState<CallLogEntry[]>([]);
  const [currency, setCurrency] = useState(DEFAULT_CURRENCY);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const loadDashboardData = useCallback(async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Get user currency preference
      const { data: settings } = await supabase
        .from('user_settings')
        .select('preferred_currency')
        .eq('user_id', user.id)
        .maybeSingle();

      if (settings?.preferred_currency) {
        setCurrency(settings.preferred_currency);
      }

      // Get all call logs for the user
      const { data: allCalls, error: callsError } = await supabase
        .from('call_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('start_time', { ascending: false });

      if (callsError) throw callsError;

      const sanitizedCalls = sanitizeCallData(allCalls || []);

      // Process statistics
      const dashboardStats = processDashboardStats(sanitizedCalls);
      setStats(dashboardStats);

      // Set recent calls (limit to 5)
      setRecentCalls(sanitizedCalls.slice(0, STATS_CONFIG.DEFAULT_RECENT_CALLS_LIMIT));

    } catch (err) {
      console.error('Error loading dashboard data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Load data on mount and when user changes
  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  // Set up periodic refresh
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(loadDashboardData, STATS_CONFIG.REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [user, loadDashboardData]);

  const refreshData = useCallback(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  return {
    stats,
    recentCalls,
    currency,
    isLoading,
    error,
    refreshData,
  };
};

/**
 * Hook for dashboard analytics
 */
export const useDashboardAnalytics = () => {
  const trackPageView = useCallback(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: 'Dashboard',
        page_location: window.location.href,
      });
    }
  }, []);

  const trackStatsInteraction = useCallback((statType: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'dashboard_interaction', {
        event_category: 'Dashboard',
        event_label: statType,
      });
    }
  }, []);

  const trackCallClick = useCallback((callId: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'call_click', {
        event_category: 'Dashboard',
        event_label: callId,
      });
    }
  }, []);

  return {
    trackPageView,
    trackStatsInteraction,
    trackCallClick,
  };
};

/**
 * Hook for managing dashboard preferences
 */
export const useDashboardPreferences = () => {
  const [preferences, setPreferences] = useState({
    showMonthly: true,
    showYearly: true,
    showAverage: true,
    showTotal: true,
    autoRefresh: true,
  });

  const updatePreference = useCallback((key: string, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const resetPreferences = useCallback(() => {
    setPreferences({
      showMonthly: true,
      showYearly: true,
      showAverage: true,
      showTotal: true,
      autoRefresh: true,
    });
  }, []);

  return {
    preferences,
    updatePreference,
    resetPreferences,
  };
};
