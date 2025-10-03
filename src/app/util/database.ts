export interface Database {
  public: {
    Tables: {
      exercise: {
        Row: {
          created_at: string;
          id: string;
          name: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
        };
        Relationships: [];
      }
    };
    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: Record<never, never>;
  };
}
