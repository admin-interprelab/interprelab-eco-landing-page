import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface LearningData {
  studyHours: number;
  termsLearned: number;
  quizzesCompleted: number;
  scenariosPracticed: number;
  botConversations: number;
  currentStreak: number;
  longestStreak: number;
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

    // Get current period dates
    const now = new Date()
    const periodStart = new Date(now.getFullYear(), now.getMonth(), 1)
    const periodEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0)

    // Sync data from InterpreStudy
    const interpreStudyData = await syncInterpreStudyData(user.id)

    // Sync data from InterpreBot
    const interpreBotData = await syncInterpreBotData(user.id)

    // Combine learning data
    const combinedData: LearningData = {
      studyHours: interpreStudyData.studyHours + interpreBotData.studyHours,
      termsLearned: interpreStudyData.termsLearned,
      quizzesCompleted: interpreStudyData.quizzesCompleted,
      scenariosPracticed: interpreStudyData.scenariosPracticed + interpreBotData.scenariosPracticed,
      botConversations: interpreBotData.conversations,
      currentStreak: Math.max(interpreStudyData.currentStreak, interpreBotData.currentStreak),
      longestStreak: Math.max(interpreStudyData.longestStreak, interpreBotData.longestStreak)
    }

    // Update learning metrics in database
    const { error: upsertError } = await supabaseClient
      .from('learning_metrics')
      .upsert({
        user_id: user.id,
        period_start: periodStart.toISOString().split('T')[0],
        period_end: periodEnd.toISOString().split('T')[0],
        ...combinedData,
        last_activity: now.toISOString()
      }, {
        onConflict: 'user_id,period_start,period_end'
      })

    if (upsertError) {
      throw upsertError
    }

    // Update integration status
    await updateIntegrationStatus(supabaseClient, user.id, 'interpreStudy', 'connected')
    await updateIntegrationStatus(supabaseClient, user.id, 'interpreBot', 'connected')

    return new Response(
      JSON.stringify({
        success: true,
        data: combinedData,
        syncedAt: now.toISOString()
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error syncing learning data:', error)

    // Update integration status to error
    try {
      const supabaseClient = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
      )

      const { data: { user } } = await supabaseClient.auth.getUser()
      if (user) {
        await updateIntegrationStatus(supabaseClient, user.id, 'interpreStudy', 'error', error.message)
        await updateIntegrationStatus(supabaseClient, user.id, 'interpreBot', 'error', error.message)
      }
    } catch (statusError) {
      console.error('Error updating integration status:', statusError)
    }

    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

async function syncInterpreStudyData(userId: string): Promise<Partial<LearningData>> {
  // Mock implementation - replace with actual InterpreStudy API calls
  // This would typically make HTTP requests to InterpreStudy's API

  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 100))

    // Mock data - replace with actual API response parsing
    return {
      studyHours: Math.floor(Math.random() * 20) + 5,
      termsLearned: Math.floor(Math.random() * 50) + 10,
      quizzesCompleted: Math.floor(Math.random() * 10) + 2,
      scenariosPracticed: Math.floor(Math.random() * 15) + 3,
      currentStreak: Math.floor(Math.random() * 7) + 1,
      longestStreak: Math.floor(Math.random() * 30) + 5
    }
  } catch (error) {
    console.error('Error syncing InterpreStudy data:', error)
    return {
      studyHours: 0,
      termsLearned: 0,
      quizzesCompleted: 0,
      scenariosPracticed: 0,
      currentStreak: 0,
      longestStreak: 0
    }
  }
}

async function syncInterpreBotData(userId: string): Promise<Partial<LearningData>> {
  // Mock implementation - replace with actual InterpreBot API calls

  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 100))

    // Mock data - replace with actual API response parsing
    return {
      studyHours: Math.floor(Math.random() * 10) + 2,
      scenariosPracticed: Math.floor(Math.random() * 20) + 5,
      conversations: Math.floor(Math.random() * 25) + 8,
      currentStreak: Math.floor(Math.random() * 5) + 1,
      longestStreak: Math.floor(Math.random() * 20) + 3
    }
  } catch (error) {
    console.error('Error syncing InterpreBot data:', error)
    return {
      studyHours: 0,
      scenariosPracticed: 0,
      conversations: 0,
      currentStreak: 0,
      longestStreak: 0
    }
  }
}

async function updateIntegrationStatus(
  supabaseClient: any,
  userId: string,
  integrationName: string,
  status: 'connected' | 'disconnected' | 'syncing' | 'error',
  errorMessage?: string
) {
  const now = new Date().toISOString()

  await supabaseClient
    .from('user_integrations')
    .upsert({
      user_id: userId,
      integration_name: integrationName,
      integration_type: integrationName === 'interpreStudy' ? 'interpreStudy' : 'interpreBot',
      status,
      last_sync: status === 'connected' ? now : null,
      error_message: errorMessage || null,
      data_points_collected: status === 'connected' ? 1 : 0
    }, {
      onConflict: 'user_id,integration_name'
    })
}
