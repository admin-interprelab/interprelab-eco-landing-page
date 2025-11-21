/**
 * Dashboard Page Component Types
 */

export interface DashboardStats {
  monthTotal: number;
  monthEarnings: number;
  monthCalls: number;
  yearTotal: number;
  yearEarnings: number;
  yearCalls: number;
  avgCallDuration: number;
  totalCalls: number;
}

export interface CallLogEntry {
  id: string;
  user_id: string;
  start_time: string;
  end_time?: string;
  duration_seconds: number;
  earnings: string;
  notes?: string;
  call_type?: string;
  client_name?: string;
  created_at: string;
  updated_at: string;
}

export interface DashboardPageProps {
  className?: string;
  customContent?: {
    title?: string;
    statsConfig?: {
      showMonthly?: boolean;
      showYearly?: boolean;
      showAverage?: boolean;
      showTotal?: boolean;
    };
    recentCallsConfig?: {
      title?: string;
      description?: string;
      limit?: number;
    };
  };
  onCallClick?: (call: CallLogEntry) => void;
}

export interface StatsCardsProps {
  stats: DashboardStats;
  currency: string;
  className?: string;
  showMonthly?: boolean;
  showYearly?: boolean;
  showAverage?: boolean;
  showTotal?: boolean;
}

export interface RecentCallsProps {
  calls: CallLogEntry[];
  currency: string;
  title?: string;
  description?: string;
  onCallClick?: (call: CallLogEntry) => void;
  className?: string;
}

export interface DashboardHeaderProps {
  title?: string;
  className?: string;
}
