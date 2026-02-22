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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      balkan_rides: {
        Row: {
          available_seats: number
          contact_info: string
          created_at: string
          departure_city: string
          destination_city: string
          fuel_contribution: string | null
          id: string
          is_active: boolean
          ride_date: string
          user_id: string
        }
        Insert: {
          available_seats?: number
          contact_info: string
          created_at?: string
          departure_city: string
          destination_city: string
          fuel_contribution?: string | null
          id?: string
          is_active?: boolean
          ride_date: string
          user_id: string
        }
        Update: {
          available_seats?: number
          contact_info?: string
          created_at?: string
          departure_city?: string
          destination_city?: string
          fuel_contribution?: string | null
          id?: string
          is_active?: boolean
          ride_date?: string
          user_id?: string
        }
        Relationships: []
      }
      community_listings: {
        Row: {
          address: string | null
          bundesland: string
          business_status: string | null
          category_confidence: number | null
          city: string
          created_at: string
          description: string | null
          google_maps_url: string | null
          google_place_id: string
          id: string
          imported_at: string | null
          instagram: string | null
          lat: number | null
          lng: number | null
          locked_fields: Json | null
          main_category: string
          name: string
          needs_review: boolean
          origin_confidence: number | null
          origin_country: string
          override_address: string | null
          override_city: string | null
          override_lat: number | null
          override_lng: number | null
          override_name: string | null
          override_postal: string | null
          override_updated_at: string | null
          postal_code: string | null
          review_reason: string | null
          source: string
          sub_category: string
          verified_by_admin: boolean
          website: string | null
        }
        Insert: {
          address?: string | null
          bundesland: string
          business_status?: string | null
          category_confidence?: number | null
          city: string
          created_at?: string
          description?: string | null
          google_maps_url?: string | null
          google_place_id: string
          id?: string
          imported_at?: string | null
          instagram?: string | null
          lat?: number | null
          lng?: number | null
          locked_fields?: Json | null
          main_category: string
          name: string
          needs_review?: boolean
          origin_confidence?: number | null
          origin_country: string
          override_address?: string | null
          override_city?: string | null
          override_lat?: number | null
          override_lng?: number | null
          override_name?: string | null
          override_postal?: string | null
          override_updated_at?: string | null
          postal_code?: string | null
          review_reason?: string | null
          source?: string
          sub_category: string
          verified_by_admin?: boolean
          website?: string | null
        }
        Update: {
          address?: string | null
          bundesland?: string
          business_status?: string | null
          category_confidence?: number | null
          city?: string
          created_at?: string
          description?: string | null
          google_maps_url?: string | null
          google_place_id?: string
          id?: string
          imported_at?: string | null
          instagram?: string | null
          lat?: number | null
          lng?: number | null
          locked_fields?: Json | null
          main_category?: string
          name?: string
          needs_review?: boolean
          origin_confidence?: number | null
          origin_country?: string
          override_address?: string | null
          override_city?: string | null
          override_lat?: number | null
          override_lng?: number | null
          override_name?: string | null
          override_postal?: string | null
          override_updated_at?: string | null
          postal_code?: string | null
          review_reason?: string | null
          source?: string
          sub_category?: string
          verified_by_admin?: boolean
          website?: string | null
        }
        Relationships: []
      }
      directory_listings: {
        Row: {
          address: string | null
          category: string
          city: string
          created_at: string
          description: string | null
          id: string
          name: string
          origin_country: string
          phone: string | null
          verified: boolean
          website: string | null
        }
        Insert: {
          address?: string | null
          category: string
          city: string
          created_at?: string
          description?: string | null
          id?: string
          name: string
          origin_country: string
          phone?: string | null
          verified?: boolean
          website?: string | null
        }
        Update: {
          address?: string | null
          category?: string
          city?: string
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          origin_country?: string
          phone?: string | null
          verified?: boolean
          website?: string | null
        }
        Relationships: []
      }
      missions: {
        Row: {
          address_line: string
          city: string
          country_code: string
          country_name: string
          created_at: string
          email: string | null
          id: string
          mission_type: string
          phone: string | null
          postal_code: string
          website: string | null
        }
        Insert: {
          address_line: string
          city: string
          country_code: string
          country_name: string
          created_at?: string
          email?: string | null
          id?: string
          mission_type: string
          phone?: string | null
          postal_code: string
          website?: string | null
        }
        Update: {
          address_line?: string
          city?: string
          country_code?: string
          country_name?: string
          created_at?: string
          email?: string | null
          id?: string
          mission_type?: string
          phone?: string | null
          postal_code?: string
          website?: string | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          currency: string
          id: string
          paid_at: string | null
          provider: string
          status: string
          transaction_id: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          id?: string
          paid_at?: string | null
          provider?: string
          status?: string
          transaction_id?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          id?: string
          paid_at?: string | null
          provider?: string
          status?: string
          transaction_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          id: string
          is_premium: boolean
          last_login_at: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          is_premium?: boolean
          last_login_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_premium?: boolean
          last_login_at?: string | null
        }
        Relationships: []
      }
      qa_items: {
        Row: {
          category: string
          created_at: string
          id: string
          is_premium: boolean
          last_updated: string
          question: string
          short_answer: string
          sources: string[] | null
          step_by_step: string | null
          tags: string[] | null
        }
        Insert: {
          category: string
          created_at?: string
          id?: string
          is_premium?: boolean
          last_updated?: string
          question: string
          short_answer: string
          sources?: string[] | null
          step_by_step?: string | null
          tags?: string[] | null
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          is_premium?: boolean
          last_updated?: string
          question?: string
          short_answer?: string
          sources?: string[] | null
          step_by_step?: string | null
          tags?: string[] | null
        }
        Relationships: []
      }
      rides: {
        Row: {
          contact_phone: string | null
          contact_whatsapp: string | null
          created_at: string
          depart_at: string
          from_city: string | null
          from_lat: number | null
          from_lng: number | null
          from_text: string
          id: string
          notes: string | null
          price_eur: number | null
          price_type: string
          seats_available: number
          seats_total: number
          status: string
          to_city: string | null
          to_lat: number | null
          to_lng: number | null
          to_text: string
          user_id: string | null
        }
        Insert: {
          contact_phone?: string | null
          contact_whatsapp?: string | null
          created_at?: string
          depart_at: string
          from_city?: string | null
          from_lat?: number | null
          from_lng?: number | null
          from_text: string
          id?: string
          notes?: string | null
          price_eur?: number | null
          price_type?: string
          seats_available: number
          seats_total: number
          status?: string
          to_city?: string | null
          to_lat?: number | null
          to_lng?: number | null
          to_text: string
          user_id?: string | null
        }
        Update: {
          contact_phone?: string | null
          contact_whatsapp?: string | null
          created_at?: string
          depart_at?: string
          from_city?: string | null
          from_lat?: number | null
          from_lng?: number | null
          from_text?: string
          id?: string
          notes?: string | null
          price_eur?: number | null
          price_type?: string
          seats_available?: number
          seats_total?: number
          status?: string
          to_city?: string | null
          to_lat?: number | null
          to_lng?: number | null
          to_text?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
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
      search_community_listings: {
        Args: { search_terms: string[] }
        Returns: {
          address: string | null
          bundesland: string
          business_status: string | null
          category_confidence: number | null
          city: string
          created_at: string
          description: string | null
          google_maps_url: string | null
          google_place_id: string
          id: string
          imported_at: string | null
          instagram: string | null
          lat: number | null
          lng: number | null
          locked_fields: Json | null
          main_category: string
          name: string
          needs_review: boolean
          origin_confidence: number | null
          origin_country: string
          override_address: string | null
          override_city: string | null
          override_lat: number | null
          override_lng: number | null
          override_name: string | null
          override_postal: string | null
          override_updated_at: string | null
          postal_code: string | null
          review_reason: string | null
          source: string
          sub_category: string
          verified_by_admin: boolean
          website: string | null
        }[]
        SetofOptions: {
          from: "*"
          to: "community_listings"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      unaccent: { Args: { "": string }; Returns: string }
    }
    Enums: {
      app_role: "admin" | "user"
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
      app_role: ["admin", "user"],
    },
  },
} as const
