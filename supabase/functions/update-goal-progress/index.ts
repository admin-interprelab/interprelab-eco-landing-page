import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface Goal {
  id: string;
  title: string;
  target_value: number;
  current_value: number;
  unit: 'dollars' | 'hours' | 'calls';
  goal_type: 'daily' | 'weekly' | 'monthly' | 'yearly';
  deadline: string;
  status: 'active' | 'completed' | 'paused' | 'cancelled';
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { data: { user } } = await supabaseClient.auth.getUser()

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { goalId, triggerType = 'manual' } = await req.json()

    // Get active goals for the user
    const { data: goals, error: goalsError } = await supabaseClient
      .from('user_goals')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .lte('deadline', new Date().toISOString())

    if (goalsError) {
      throw goalsError
    }

    const updatedGoals: Goal[] = []
    const completedGoals: Goal[] = []

    // Update progress for each active goal
    for (const goal of goals as Goal[]) {
      // Skip if specific goal ID was provided and this isn't it
      if (goalId && goal.id !== goalId) continue

      const updatedGoal = await updateGoalProgress(supabaseClient, user.id, goal)
      updatedGoals.push(updatedGoal)

      // Check if goal was completed
      if (updatedGoal.status === 'completed' && goal.status !== 'completed') {
        completedGoals.push(updatedGoal)
      }
    }

    // Send notifications for completed goals
    for (const completedGoal of completedGoals) {
      await sendGoalCompletionNotification(supabaseClient, user.id, completedGoal)
    }

    return new Response(
      JSON.stringify({
        success: true,
        updatedGoals: updatedGoals.length,
        completedGoals: completedGoals.length,
        triggerType,
        goals: updatedGoals
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error updating goal progress:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

async function updateGoalProgress(supabaseClient: any, userId: string, goal: Goal): Promise<Goal> {
  const now = new Date()
  let periodStart: Date

  // Calculate period start based on goal type
  switch (goal.goal_type) {
    case 'daily':
      periodStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      break
    case 'weekly':
      const dayOfWeek = now.getDay()
      periodStart = new Date(now)
      periodStart.setDate(now.getDate() - dayOfWeek)
      periodStart.setHours(0, 0, 0, 0)
      break
    case 'monthly':
      periodStart = new Date(now.getFullYear(), now.getMonth(), 1)
      break
    case 'yearly':
      periodStart = new Date(now.getFullYear(), 0, 1)
      break
    default:
      periodStart = new Date(0) // Beginning of time for custom periods
  }

  let currentValue = 0

  // Calculate current progress based on goal unit
  if (goal.unit === 'dollars') {
    const { data: earnings } = await supabaseClient
      .from('call_logs')
      .select('earnings')
      .eq('user_id', userId)
      .gte('start_time', periodStart.toISOString())
      .lte('start_time', goal.deadline)

    currentValue = earnings?.reduce((sum: number, log: any) => sum + (log.earnings || 0), 0) || 0

  } else if (goal.unit === 'hours') {
    const { data: durations } = await supabaseClient
      .from('call_logs')
      .select('duration_seconds')
      .eq('user_id', userId)
      .gte('start_time', periodStart.toISOString())
      .lte('start_time', goal.deadline)

    const totalSeconds = durations?.reduce((sum: number, log: any) => sum + (log.duration_seconds || 0), 0) || 0
    currentValue = totalSeconds / 3600 // Convert to hours

  } else if (goal.unit === 'calls') {
    const { count } = await supabaseClient
      .from('call_logs')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .gte('start_time', periodStart.toISOString())
      .lte('start_time', goal.deadline)

    currentValue = count || 0
  }

  // Determine if goal is completed
  const isCompleted = currentValue >= goal.target_value
  const newStatus = isCompleted ? 'completed' : goal.status

  // Update goal in database
  const { data: updatedGoal, error } = await supabaseClient
    .from('user_goals')
    .update({
      current_value: Math.round(currentValue * 100) / 100, // Round to 2 decimal places
      status: newStatus,
      updated_at: now.toISOString()
    })
    .eq('id', goal.id)
    .select()
    .single()

  if (error) {
    console.error('Error updating goal:', error)
    return goal
  }

  return updatedGoal
}

async function sendGoalCompletionNotification(supabaseClient: any, userId: string, goal: Goal) {
  // This would typically integrate with a notification service
  // For now, we'll just log the completion

  console.log(`🎉 Goal completed for user ${userId}:`, {
    goalId: goal.id,
    title: goal.title,
    targetValue: goal.target_value,
    currentValue: goal.current_value,
    unit: goal.unit,
    completedAt: new Date().toISOString()
  })

  // In a real implementation, you might:
  // 1. Send an email notification
  // 2. Create an in-app notification
  // 3. Send a push notification
  // 4. Update user achievements/badges
  // 5. Trigger celebration animations in the UI

  // Example: Create an in-app notification record
  try {
    await supabaseClient
      .from('notifications')
      .insert({
        user_id: userId,
        type: 'goal_completed',
        title: 'Goal Completed! 🎉',
        message: `Congratulations! You've achieved your goal: ${goal.title}`,
        data: {
          goalId: goal.id,
          goalTitle: goal.title,
          targetValue: goal.target_value,
          unit: goal.unit
        },
        read: false
      })
  } catch (error) {
    console.error('Error creating notification:', error)
    // Don't throw here as notification failure shouldn't break goal update
  }
}
