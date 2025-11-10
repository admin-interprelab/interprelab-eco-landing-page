export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      assessment_results: {
        Row: {
          assessment_type: string
          created_at: string
          difficulty_level: string | null
          feedback: string | null
          id: string
          language_code: string
          max_score: number | null
          percentage: number | null
          questions_correct: number | null
          questions_total: number | null
          results: Json | null
          score: number | null
          time_taken_seconds: number | null
          user_id: string
        }
        Insert: {
          assessment_type: string
          created_at?: string
          difficulty_level?: string | null
          feedback?: string | null
          id?: string
          language_code: string
          max_score?: number | null
          percentage?: number | null
          questions_correct?: number | null
          questions_total?: number | null
          results?: Json | null
          score?: number | null
          time_taken_seconds?: number | null
          user_id: string
        }
        Update: {
          assessment_type?: string
          created_at?: string
          difficulty_level?: string | null
          feedback?: string | null
          id?: string
          language_code?: string
          max_score?: number | null
          percentage?: number | null
          questions_correct?: number | null
          questions_total?: number | null
          results?: Json | null
          score?: number | null
          time_taken_seconds?: number | null
          user_id?: string
        }
        Relationships: []
      }
      call_logs: {
        Row: {
          client_name: string | null
          client_phone: string | null
          created_at: string
          currency: string
          duration_seconds: number | null
          earnings: number | null
          end_time: string | null
          id: string
          interpretation_type: string | null
          language_pair: string | null
          notes: string | null
          rating: number | null
          start_time: string
          updated_at: string
          user_id: string
        }
        Insert: {
          client_name?: string | null
          client_phone?: string | null
          created_at?: string
          currency?: string
          duration_seconds?: number | null
          earnings?: number | null
          end_time?: string | null
          id?: string
          interpretation_type?: string | null
          language_pair?: string | null
          notes?: string | null
          rating?: number | null
          start_time: string
          updated_at?: string
          user_id: string
        }
        Update: {
          client_name?: string | null
          client_phone?: string | null
          created_at?: string
          currency?: string
          duration_seconds?: number | null
          earnings?: number | null
          end_time?: string | null
          id?: string
          interpretation_type?: string | null
          language_pair?: string | null
          notes?: string | null
          rating?: number | null
          start_time?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      coaching_sessions: {
        Row: {
          areas_for_improvement: string[] | null
          audio_url: string | null
          created_at: string
          duration_seconds: number | null
          feedback: Json | null
          id: string
          language_code: string
          score: number | null
          session_type: string
          strengths: string[] | null
          topic: string | null
          transcript: string | null
          user_id: string
        }
        Insert: {
          areas_for_improvement?: string[] | null
          audio_url?: string | null
          created_at?: string
          duration_seconds?: number | null
          feedback?: Json | null
          id?: string
          language_code: string
          score?: number | null
          session_type: string
          strengths?: string[] | null
          topic?: string | null
          transcript?: string | null
          user_id: string
        }
        Update: {
          areas_for_improvement?: string[] | null
          audio_url?: string | null
          created_at?: string
          duration_seconds?: number | null
          feedback?: Json | null
          id?: string
          language_code?: string
          score?: number | null
          session_type?: string
          strengths?: string[] | null
          topic?: string | null
          transcript?: string | null
          user_id?: string
        }
        Relationships: []
      }
      contacts: {
        Row: {
          created_at: string
          email: string
          id: string
          inquiry_type: string
          message: string
          name: string
          organization: string | null
          phone: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          inquiry_type: string
          message: string
          name: string
          organization?: string | null
          phone?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          inquiry_type?: string
          message?: string
          name?: string
          organization?: string | null
          phone?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      glossary_terms: {
        Row: {
          category: string | null
          created_at: string
          definition: string
          difficulty_level: string | null
          id: string
          is_public: boolean | null
          is_verified: boolean | null
          language_code: string | null
          notes: string | null
          pronunciation: string | null
          source_language: string | null
          subcategory: string | null
          tags: string[] | null
          target_language: string | null
          term: string
          updated_at: string
          usage_count: number | null
          usage_example: string | null
          user_id: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          definition: string
          difficulty_level?: string | null
          id?: string
          is_public?: boolean | null
          is_verified?: boolean | null
          language_code?: string | null
          notes?: string | null
          pronunciation?: string | null
          source_language?: string | null
          subcategory?: string | null
          tags?: string[] | null
          target_language?: string | null
          term: string
          updated_at?: string
          usage_count?: number | null
          usage_example?: string | null
          user_id?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          definition?: string
          difficulty_level?: string | null
          id?: string
          is_public?: boolean | null
          is_verified?: boolean | null
          language_code?: string | null
          notes?: string | null
          pronunciation?: string | null
          source_language?: string | null
          subcategory?: string | null
          tags?: string[] | null
          target_language?: string | null
          term?: string
          updated_at?: string
          usage_count?: number | null
          usage_example?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      study_sessions: {
        Row: {
          completed: boolean | null
          created_at: string
          duration_seconds: number | null
          id: string
          language_code: string | null
          questions_attempted: number | null
          questions_correct: number | null
          score: number | null
          session_data: Json | null
          session_type: string
          topic: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          created_at?: string
          duration_seconds?: number | null
          id?: string
          language_code?: string | null
          questions_attempted?: number | null
          questions_correct?: number | null
          score?: number | null
          session_data?: Json | null
          session_type: string
          topic?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          completed?: boolean | null
          created_at?: string
          duration_seconds?: number | null
          id?: string
          language_code?: string | null
          questions_attempted?: number | null
          questions_correct?: number | null
          score?: number | null
          session_data?: Json | null
          session_type?: string
          topic?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achievement_name: string
          achievement_type: string
          badge_url: string | null
          description: string | null
          id: string
          points_earned: number | null
          unlocked_at: string
          user_id: string
        }
        Insert: {
          achievement_name: string
          achievement_type: string
          badge_url?: string | null
          description?: string | null
          id?: string
          points_earned?: number | null
          unlocked_at?: string
          user_id: string
        }
        Update: {
          achievement_name?: string
          achievement_type?: string
          badge_url?: string | null
          description?: string | null
          id?: string
          points_earned?: number | null
          unlocked_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      user_settings: {
        Row: {
          created_at: string
          email_notifications: boolean | null
          id: string
          notifications_enabled: boolean | null
          pay_rate: number | null
          pay_rate_type: string | null
          preferred_currency: string | null
          preferred_language: string | null
          timezone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email_notifications?: boolean | null
          id?: string
          notifications_enabled?: boolean | null
          pay_rate?: number | null
          pay_rate_type?: string | null
          preferred_currency?: string | null
          preferred_language?: string | null
          timezone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email_notifications?: boolean | null
          id?: string
          notifications_enabled?: boolean | null
          pay_rate?: number | null
          pay_rate_type?: string | null
          preferred_currency?: string | null
          preferred_language?: string | null
          timezone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      waitlist: {
        Row: {
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
        }
        Insert: {
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
