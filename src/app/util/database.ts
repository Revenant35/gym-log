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
      exercise: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      schedule: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          updated_at?: string
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      schedule_day: {
        Row: {
          created_at: string
          day_of_week: string
          id: string
          name: string
          schedule_id: string
        }
        Insert: {
          created_at?: string
          day_of_week: string
          id?: string
          name: string
          schedule_id: string
        }
        Update: {
          created_at?: string
          day_of_week?: string
          id?: string
          name?: string
          schedule_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_schedule"
            columns: ["schedule_id"]
            isOneToOne: false
            referencedRelation: "schedule"
            referencedColumns: ["id"]
          },
        ]
      }
      schedule_exercise: {
        Row: {
          created_at: string
          exercise_id: string
          exercise_index: number
          id: string
          reps: number
          schedule_day_id: string
          sets: number
          weight: number
          weight_unit: Database["public"]["Enums"]["weight_unit"]
        }
        Insert: {
          created_at?: string
          exercise_id: string
          exercise_index: number
          id?: string
          reps: number
          schedule_day_id: string
          sets: number
          weight?: number
          weight_unit?: Database["public"]["Enums"]["weight_unit"]
        }
        Update: {
          created_at?: string
          exercise_id?: string
          exercise_index?: number
          id?: string
          reps?: number
          schedule_day_id?: string
          sets?: number
          weight?: number
          weight_unit?: Database["public"]["Enums"]["weight_unit"]
        }
        Relationships: [
          {
            foreignKeyName: "fk_exercise"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercise"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_schedule_day"
            columns: ["schedule_day_id"]
            isOneToOne: false
            referencedRelation: "schedule_day"
            referencedColumns: ["id"]
          },
        ]
      }
      session: {
        Row: {
          completed_at: string | null
          created_at: string
          duration_minutes: number | null
          id: string
          schedule_day_id: string | null
          schedule_id: string | null
          started_at: string
          user_id: string
          workout_name: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          duration_minutes?: number | null
          id?: string
          schedule_day_id?: string | null
          schedule_id?: string | null
          started_at?: string
          user_id?: string
          workout_name?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          duration_minutes?: number | null
          id?: string
          schedule_day_id?: string | null
          schedule_id?: string | null
          started_at?: string
          user_id?: string
          workout_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "session_schedule_day_id_fkey"
            columns: ["schedule_day_id"]
            isOneToOne: false
            referencedRelation: "schedule_day"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "session_schedule_id_fkey"
            columns: ["schedule_id"]
            isOneToOne: false
            referencedRelation: "schedule"
            referencedColumns: ["id"]
          },
        ]
      }
      session_exercise: {
        Row: {
          created_at: string
          exercise_id: string
          session_id: string
          session_index: number
        }
        Insert: {
          created_at?: string
          exercise_id: string
          session_id: string
          session_index: number
        }
        Update: {
          created_at?: string
          exercise_id?: string
          session_id?: string
          session_index?: number
        }
        Relationships: [
          {
            foreignKeyName: "session_exercise_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercise"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "session_exercise_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "session"
            referencedColumns: ["id"]
          },
        ]
      }
      session_set: {
        Row: {
          created_at: string
          did_fail: boolean
          exercise_index: number
          reps: number
          session_id: string
          session_index: number
          type: Database["public"]["Enums"]["set_type"]
          weight: number
          weight_unit: Database["public"]["Enums"]["weight_unit"]
        }
        Insert: {
          created_at?: string
          did_fail?: boolean
          exercise_index: number
          reps: number
          session_id: string
          session_index: number
          type?: Database["public"]["Enums"]["set_type"]
          weight: number
          weight_unit: Database["public"]["Enums"]["weight_unit"]
        }
        Update: {
          created_at?: string
          did_fail?: boolean
          exercise_index?: number
          reps?: number
          session_id?: string
          session_index?: number
          type?: Database["public"]["Enums"]["set_type"]
          weight?: number
          weight_unit?: Database["public"]["Enums"]["weight_unit"]
        }
        Relationships: [
          {
            foreignKeyName: "session_set_session_id_session_index_fkey"
            columns: ["session_id", "session_index"]
            isOneToOne: false
            referencedRelation: "session_exercise"
            referencedColumns: ["session_id", "session_index"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      set_type: "WARMUP" | "WORK" | "DROP"
      weight_unit: "KG" | "LB"
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
      set_type: ["WARMUP", "WORK", "DROP"],
      weight_unit: ["KG", "LB"],
    },
  },
} as const
