import { supabase } from './client';
import type { Tables, TablesInsert, TablesUpdate } from './types';

// Call Log Service
export const CallLogService = {
  async createCallLog(callLog: TablesInsert<'call_logs'>) {
    return await supabase
      .from('call_logs')
      .insert(callLog)
      .select()
      .single();
  },

  async updateCallLog(id: string, updates: TablesUpdate<'call_logs'>) {
    return await supabase
      .from('call_logs')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
  },

  async getCallLogs(userId: string) {
    return await supabase
      .from('call_logs')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
  },

  async deleteCallLog(id: string) {
    return await supabase
      .from('call_logs')
      .delete()
      .eq('id', id);
  }
};

// User Settings Service
export const UserSettingsService = {
  async getUserSettings(userId: string) {
    return await supabase
      .from('user_settings')
      .select('*')
      .eq('user_id', userId)
      .single();
  },

  async updateUserSettings(userId: string, settings: Partial<TablesUpdate<'user_settings'>>) {
    return await supabase
      .from('user_settings')
      .upsert({ user_id: userId, ...settings })
      .select()
      .single();
  }
};

// Call Records Service (for the newer table structure)
export const CallRecordsService = {
  async createCallRecord(record: TablesInsert<'call_records'>) {
    return await supabase
      .from('call_records')
      .insert(record)
      .select()
      .single();
  },

  async getCallRecords(userId: string) {
    return await supabase
      .from('call_records')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
  },

  async updateCallRecord(id: string, updates: TablesUpdate<'call_records'>) {
    return await supabase
      .from('call_records')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
  },

  async deleteCallRecord(id: string) {
    return await supabase
      .from('call_records')
      .delete()
      .eq('id', id);
  }
};

// User Preferences Service
export const UserPreferencesService = {
  async getUserPreferences(userId: string) {
    return await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', userId)
      .single();
  },

  async updateUserPreferences(userId: string, preferences: Partial<TablesUpdate<'user_preferences'>>) {
    return await supabase
      .from('user_preferences')
      .upsert({ user_id: userId, ...preferences })
      .select()
      .single();
  }
};

// Contacts Service
export const ContactsService = {
  async createContact(contact: TablesInsert<'contacts'>) {
    return await supabase
      .from('contacts')
      .insert(contact)
      .select()
      .single();
  },

  async getContacts(userId?: string) {
    let query = supabase.from('contacts').select('*');

    if (userId) {
      query = query.eq('user_id', userId);
    }

    return await query.order('created_at', { ascending: false });
  }
};

// Waitlist Service
export const WaitlistService = {
  async addToWaitlist(waitlistEntry: TablesInsert<'waitlist'>) {
    return await supabase
      .from('waitlist')
      .insert(waitlistEntry)
      .select()
      .single();
  },

  async getWaitlist() {
    return await supabase
      .from('waitlist')
      .select('*')
      .order('created_at', { ascending: false });
  }
};

// Profiles Service
export const ProfilesService = {
  async getProfile(userId: string) {
    return await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
  },

  async updateProfile(userId: string, updates: TablesUpdate<'profiles'>) {
    return await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
  }
};
