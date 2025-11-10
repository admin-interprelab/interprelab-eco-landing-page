import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface CallLog {
  start_time: string;
  earnings: number;
  duration_seconds: number;
  platform: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    const { data: { user } } = await supabaseClient.auth.getUser()

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Check premium access
    const { data: premiumAccess } = await supabaseClient.rpc('has_premium_access', {
      user_uuid: user.id
    })

    if (!premiumAccess) {
      return new Response(
        JSON.stringify({ error: 'Premium subscription required' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { startDate, endDate } = await req.json()

    // Get call logs for the specified period
    const { data: callLogs, error: callLogsError } = await supabaseClient
      .from('call_logs')
      .select('start_time, earnings, duration_seconds, platform')
      .eq('user_id', user.id)
      .gte('start_time', startDate)
      .lte('start_time', endDate)
      .order('start_time', { ascending: true })

    if (callLogsError) {
      throw callLogsError
    }

    // Generate performance heatmap data
    await supabaseClient.rpc('generate_performance_heatmap_data', {
      user_uuid: user.id,
      start_date: startDate,
      end_date: endDate
    })

    // Calculate platform metrics
    await supabaseClient.rpc('calculate_platform_metrics', {
      user_uuid: user.id,
      start_date: startDate,
      end_date: endDate
    })

    // Generate aggregated metrics
    const metrics = generatePerformanceMetrics(callLogs as CallLog[])

    return new Response(
      JSON.stringify({
        success: true,
        metrics,
        heatmapGenerated: true,
        platformMetricsCalculated: true
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error calculating performance metrics:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

function generatePerformanceMetrics(callLogs: CallLog[]) {
  if (!callLogs || callLogs.length === 0) {
    return {
      totalCalls: 0,
      totalEarnings: 0,
      avgDuration: 0,
      peakHours: [],
      topPlatforms: []
    }
  }

  const totalCalls = callLogs.length
  const totalEarnings = callLogs.reduce((sum, log) => sum + (log.earnings || 0), 0)
  const avgDuration = callLogs.reduce((sum, log) => sum + (log.duration_seconds || 0), 0) / totalCalls

  // Calculate peak hours
  const hourlyData: { [hour: number]: { calls: number, earnings: number } } = {}

  callLogs.forEach(log => {
    const hour = new Date(log.start_time).getHours()
    if (!hourlyData[hour]) {
      hourlyData[hour] = { calls: 0, earnings: 0 }
    }
    hourlyData[hour].calls += 1
    hourlyData[hour].earnings += log.earnings || 0
  })

  const peakHours = Object.entries(hourlyData)
    .sort(([,a], [,b]) => b.earnings - a.earnings)
    .slice(0, 3)
    .map(([hour, data]) => ({
      hour: parseInt(hour),
      calls: data.calls,
      earnings: data.earnings
    }))

  // Calculate top platforms
  const platformData: { [platform: string]: { calls: number, earnings: number } } = {}

  callLogs.forEach(log => {
    if (!log.platform) return
    if (!platformData[log.platform]) {
      platformData[log.platform] = { calls: 0, earnings: 0 }
    }
    platformData[log.platform].calls += 1
    platformData[log.platform].earnings += log.earnings || 0
  })

  const topPlatforms = Object.entries(platformData)
    .sort(([,a], [,b]) => b.earnings - a.earnings)
    .slice(0, 5)
    .map(([platform, data]) => ({
      platform,
      calls: data.calls,
      earnings: data.earnings
    }))

  return {
    totalCalls,
    totalEarnings: Math.round(totalEarnings * 100) / 100,
    avgDuration: Math.round(avgDuration),
    peakHours,
    topPlatforms
  }
}
