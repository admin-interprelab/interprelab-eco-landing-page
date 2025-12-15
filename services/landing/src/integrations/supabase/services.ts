import { supabase } from './client';

export const CallLogService = {
  async createCallLog(callLog: any) {
    return await supabase.from('call_logs').insert(callLog).select().single();
  },
  
  async updateCallLog(id: string, updates: any) {
    return await supabase.from('call_logs').update(updates).eq('id', id).select().single();
  }
};

export const UserSettingsService = {
  async getUserSettings(userId: string) {
    return await supabase
      .from('user_settings')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();
  },

  async updateUserSettings(userId: string, settings: any) {
    const { data, error } = await supabase
      .from('user_settings')
      .upsert({ user_id: userId, ...settings })
      .select()
      .single();
      
    return { data, error };
  }
};
