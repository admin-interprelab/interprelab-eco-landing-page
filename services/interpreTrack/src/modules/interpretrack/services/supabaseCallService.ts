import { supabase } from '@/lib/supabase';
import { CallRecord } from '../types';

const TABLE_NAME = 'call_logs';

export class SupabaseCallService {
  
  private mapToCallRecord(data: any): CallRecord {
    const metadata = data.metadata || {};
    // Calculate duration in minutes from duration_seconds (if available) or metadata
    const duration = data.duration_seconds 
      ? Math.round(data.duration_seconds / 60) 
      : (metadata.durationMinutes || 0);

    return {
      id: data.id,
      startTime: new Date(data.start_time),
      endTime: new Date(data.end_time),
      duration: duration,
      earnings: metadata.earnings || 0,
      platform: metadata.platform || 'Platform A',
      callType: metadata.callType || 'VRI'
    };
  }

  async createCall(call: Omit<CallRecord, 'id'>): Promise<CallRecord> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const metadata = {
      platform: call.platform,
      callType: call.callType,
      earnings: call.earnings,
      durationMinutes: call.duration
    };

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert({
        user_id: user.id,
        start_time: call.startTime.toISOString(),
        end_time: call.endTime.toISOString(),
        metadata: metadata
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating call in Supabase:', error);
      throw error;
    }

    return this.mapToCallRecord(data);
  }

  async getCalls(limit?: number): Promise<CallRecord[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    let query = supabase
      .from(TABLE_NAME)
      .select('*')
      .eq('user_id', user.id)
      .order('start_time', { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching calls from Supabase:', error);
      throw error;
    }

    return data.map(this.mapToCallRecord);
  }

  async updateCall(id: string, updates: Partial<CallRecord>): Promise<CallRecord | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // We need to fetch the existing call to merge metadata if needed, 
    // or just update what's changed.
    // For simplicity, we'll assume we can update fields directly.

    const updateData: any = {};
    const metadataUpdates: any = {};

    if (updates.startTime) updateData.start_time = updates.startTime.toISOString();
    if (updates.endTime) updateData.end_time = updates.endTime.toISOString();
    
    if (updates.platform) metadataUpdates.platform = updates.platform;
    if (updates.callType) metadataUpdates.callType = updates.callType;
    if (updates.earnings !== undefined) metadataUpdates.earnings = updates.earnings;
    if (updates.duration !== undefined) metadataUpdates.durationMinutes = updates.duration;

    // If we have metadata updates, we might need to merge them with existing metadata.
    // Supabase/Postgres JSONB updates can be tricky.
    // For now, let's fetch, merge, and update.
    
    const { data: existingData, error: fetchError } = await supabase
      .from(TABLE_NAME)
      .select('metadata')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();
      
    if (fetchError) throw fetchError;

    const newMetadata = { ...existingData.metadata, ...metadataUpdates };
    updateData.metadata = newMetadata;

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .update(updateData)
      .eq('id', id)
      .eq('user_id', user.id) // Security check
      .select()
      .single();

    if (error) {
      console.error('Error updating call in Supabase:', error);
      throw error;
    }

    return this.mapToCallRecord(data);
  }

  async deleteCall(id: string): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from(TABLE_NAME)
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error deleting call from Supabase:', error);
      return false;
    }

    return true;
  }
  
  // Real-time subscription could be implemented here using supabase.channel
  subscribeToCalls(onUpdate: (calls: CallRecord[]) => void): () => void {
    // Basic implementation for now
    const channel = supabase
      .channel('public:call_logs')
      .on('postgres_changes', { event: '*', schema: 'public', table: TABLE_NAME }, () => {
        this.getCalls().then(onUpdate);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }
}

export const supabaseCallService = new SupabaseCallService();
