import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Get user from JWT
    const {
      data: { user },
    } = await supabaseClient.auth.getUser()

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Check if user has premium access
    const { data: premiumAccess } = await supabaseClient.rpc('has_premium_access', {
      user_uuid: user.id
    })

    if (!premiumAccess) {
      return new Response(
        JSON.stringify({ error: 'Premium subscription required' }),
        {
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Get user's historical call data for the last 6 months
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const { data: callLogs, error: callLogsError } = await supabaseClient
      .from('call_logs')
      .select('start_time, earnings, duration_seconds')
      .eq('user_id', user.id)
      .gte('start_time', sixMonthsAgo.toISOString())
      .order('start_time', { ascending: true })

    if (callLogsError) {
      throw callLogsError
    }

    // Generate projections based on historical data
    const projections = generateEarningsProjections(callLogs)

    // Store projections in database
    const { error: insertError } = await supabaseClient
      .from('earnings_projections')
      .upsert(
        projections.map(projection => ({
          user_id: user.id,
          ...projection
        })),
        { onConflict: 'user_id,projection_date' }
      )

    if (insertError) {
      throw insertError
    }

    return new Response(
      JSON.stringify({
        success: true,
        projections: projections.length,
        data: projections
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Error generating earnings projection:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})

function generateEarningsProjections(callLogs: any[]) {
  if (!callLogs || callLogs.length === 0) {
    return generateDefaultProjections()
  }

  // Group data by month
  const monthlyData = groupByMonth(callLogs)

  // Calculate trends and patterns
  const trends = calculateTrends(monthlyData)

  // Generate 6-month projections
  const projections = []
  const currentDate = new Date()

  for (let i = 0; i < 6; i++) {
    const projectionDate = new Date(currentDate)
    projectionDate.setMonth(projectionDate.getMonth() + i)

    const baseProjection = calculateBaseProjection(trends, i)
    const seasonalAdjustment = getSeasonalAdjustment(projectionDate.getMonth())

    const projected = baseProjection * seasonalAdjustment
    const conservative = projected * 0.8
    const optimistic = projected * 1.2

    projections.push({
      projection_date: projectionDate.toISOString().split('T')[0],
      projected_earnings: Math.round(projected * 100) / 100,
      conservative_estimate: Math.round(conservative * 100) / 100,
      optimistic_estimate: Math.round(optimistic * 100) / 100,
      confidence_score: Math.max(0.3, Math.min(0.9, 0.7 - (i * 0.1))),
      model_version: 'v1.0'
    })
  }

  return projections
}

function groupByMonth(callLogs: any[]) {
  const monthlyData: { [key: string]: { earnings: number, calls: number, hours: number } } = {}

  callLogs.forEach(log => {
    const month = log.start_time.substring(0, 7) // YYYY-MM format
    if (!monthlyData[month]) {
      monthlyData[month] = { earnings: 0, calls: 0, hours: 0 }
    }

    monthlyData[month].earnings += log.earnings || 0
    monthlyData[month].calls += 1
    monthlyData[month].hours += (log.duration_seconds || 0) / 3600
  })

  return monthlyData
}

function calculateTrends(monthlyData: any) {
  const months = Object.keys(monthlyData).sort()
  if (months.length < 2) {
    return { earningsGrowth: 0, avgMonthlyEarnings: 0 }
  }

  const earnings = months.map(month => monthlyData[month].earnings)
  const avgMonthlyEarnings = earnings.reduce((sum, val) => sum + val, 0) / earnings.length

  // Simple linear trend calculation
  let earningsGrowth = 0
  if (earnings.length >= 3) {
    const recent = earnings.slice(-3).reduce((sum, val) => sum + val, 0) / 3
    const older = earnings.slice(0, 3).reduce((sum, val) => sum + val, 0) / 3
    earningsGrowth = older > 0 ? (recent - older) / older : 0
  }

  return { earningsGrowth, avgMonthlyEarnings }
}

function calculateBaseProjection(trends: any, monthsAhead: number) {
  const { earningsGrowth, avgMonthlyEarnings } = trends

  // Apply growth trend with diminishing effect over time
  const growthFactor = 1 + (earningsGrowth * Math.pow(0.9, monthsAhead))
  return avgMonthlyEarnings * growthFactor
}

function getSeasonalAdjustment(month: number) {
  // Simple seasonal adjustments (can be enhanced with more data)
  const seasonalFactors = [
    0.95, // January
    0.98, // February
    1.02, // March
    1.05, // April
    1.08, // May
    1.10, // June
    1.05, // July
    1.02, // August
    1.08, // September
    1.10, // October
    1.05, // November
    0.95  // December
  ]

  return seasonalFactors[month] || 1.0
}

function generateDefaultProjections() {
  const projections = []
  const currentDate = new Date()
  const baseEarnings = 2500 // Default base projection

  for (let i = 0; i < 6; i++) {
    const projectionDate = new Date(currentDate)
    projectionDate.setMonth(projectionDate.getMonth() + i)

    const projected = baseEarnings * (1 + (i * 0.05)) // 5% growth per month
    const conservative = projected * 0.8
    const optimistic = projected * 1.2

    projections.push({
      projection_date: projectionDate.toISOString().split('T')[0],
      projected_earnings: Math.round(projected * 100) / 100,
      conservative_estimate: Math.round(conservative * 100) / 100,
      optimistic_estimate: Math.round(optimistic * 100) / 100,
      confidence_score: 0.5,
      model_version: 'v1.0'
    })
  }

  return projections
}
