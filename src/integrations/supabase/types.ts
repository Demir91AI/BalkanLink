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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      admin_notifications: {
        Row: {
          body: string | null
          created_at: string
          id: string
          metadata: Json
          read_at: string | null
          severity: string
          title: string
          type: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          id?: string
          metadata?: Json
          read_at?: string | null
          severity?: string
          title: string
          type: string
        }
        Update: {
          body?: string | null
          created_at?: string
          id?: string
          metadata?: Json
          read_at?: string | null
          severity?: string
          title?: string
          type?: string
        }
        Relationships: []
      }
      ads: {
        Row: {
          activated_at: string | null
          bundesland: string
          category: string | null
          city: string
          city_lat: number | null
          city_lng: number | null
          contact_type: Database["public"]["Enums"]["ad_contact_type"]
          contact_value: string
          created_at: string
          description: string
          domain: Database["public"]["Enums"]["ad_domain"]
          expires_at: string | null
          id: string
          last_reported_at: string | null
          owner_email: string
          reported_count: number
          status: Database["public"]["Enums"]["ad_status"]
          title: string
          type: Database["public"]["Enums"]["ad_type"]
          user_id: string
        }
        Insert: {
          activated_at?: string | null
          bundesland: string
          category?: string | null
          city: string
          city_lat?: number | null
          city_lng?: number | null
          contact_type: Database["public"]["Enums"]["ad_contact_type"]
          contact_value: string
          created_at?: string
          description: string
          domain: Database["public"]["Enums"]["ad_domain"]
          expires_at?: string | null
          id?: string
          last_reported_at?: string | null
          owner_email: string
          reported_count?: number
          status?: Database["public"]["Enums"]["ad_status"]
          title: string
          type: Database["public"]["Enums"]["ad_type"]
          user_id: string
        }
        Update: {
          activated_at?: string | null
          bundesland?: string
          category?: string | null
          city?: string
          city_lat?: number | null
          city_lng?: number | null
          contact_type?: Database["public"]["Enums"]["ad_contact_type"]
          contact_value?: string
          created_at?: string
          description?: string
          domain?: Database["public"]["Enums"]["ad_domain"]
          expires_at?: string | null
          id?: string
          last_reported_at?: string | null
          owner_email?: string
          reported_count?: number
          status?: Database["public"]["Enums"]["ad_status"]
          title?: string
          type?: Database["public"]["Enums"]["ad_type"]
          user_id?: string
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          metadata: Json | null
          role: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          metadata?: Json | null
          role: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          metadata?: Json | null
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      chat_usage: {
        Row: {
          id: string
          query_date: string
          used_at: string
          user_id: string
        }
        Insert: {
          id?: string
          query_date?: string
          used_at?: string
          user_id: string
        }
        Update: {
          id?: string
          query_date?: string
          used_at?: string
          user_id?: string
        }
        Relationships: []
      }
      city_geo: {
        Row: {
          bundesland: string
          city_name: string
          id: string
          lat: number
          lng: number
        }
        Insert: {
          bundesland: string
          city_name: string
          id?: string
          lat: number
          lng: number
        }
        Update: {
          bundesland?: string
          city_name?: string
          id?: string
          lat?: number
          lng?: number
        }
        Relationships: []
      }
      community_answers: {
        Row: {
          author_name: string | null
          body: string
          created_at: string
          id: string
          question_id: string
          status: string
          updated_at: string
          upvotes: number
          user_id: string | null
        }
        Insert: {
          author_name?: string | null
          body: string
          created_at?: string
          id?: string
          question_id: string
          status?: string
          updated_at?: string
          upvotes?: number
          user_id?: string | null
        }
        Update: {
          author_name?: string | null
          body?: string
          created_at?: string
          id?: string
          question_id?: string
          status?: string
          updated_at?: string
          upvotes?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "community_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "community_questions"
            referencedColumns: ["id"]
          },
        ]
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
          google_rating: number | null
          google_rating_count: number | null
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
          google_rating?: number | null
          google_rating_count?: number | null
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
          google_rating?: number | null
          google_rating_count?: number | null
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
      community_questions: {
        Row: {
          answer: string | null
          answered_at: string | null
          answered_by: string | null
          author_name: string | null
          body: string
          category: string | null
          created_at: string
          id: string
          lang: string
          status: string
          title: string
          updated_at: string
          user_id: string | null
          view_count: number
        }
        Insert: {
          answer?: string | null
          answered_at?: string | null
          answered_by?: string | null
          author_name?: string | null
          body: string
          category?: string | null
          created_at?: string
          id?: string
          lang?: string
          status?: string
          title: string
          updated_at?: string
          user_id?: string | null
          view_count?: number
        }
        Update: {
          answer?: string | null
          answered_at?: string | null
          answered_by?: string | null
          author_name?: string | null
          body?: string
          category?: string | null
          created_at?: string
          id?: string
          lang?: string
          status?: string
          title?: string
          updated_at?: string
          user_id?: string | null
          view_count?: number
        }
        Relationships: []
      }
      doc_check_credits: {
        Row: {
          amount_cents: number
          consumed_at: string | null
          created_at: string
          currency: string
          id: string
          stripe_session_id: string
          user_id: string
        }
        Insert: {
          amount_cents?: number
          consumed_at?: string | null
          created_at?: string
          currency?: string
          id?: string
          stripe_session_id: string
          user_id: string
        }
        Update: {
          amount_cents?: number
          consumed_at?: string | null
          created_at?: string
          currency?: string
          id?: string
          stripe_session_id?: string
          user_id?: string
        }
        Relationships: []
      }
      doc_check_premium_usage: {
        Row: {
          check_date: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          check_date?: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          check_date?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      doc_check_usage: {
        Row: {
          count: number
          id: string
          used_at: string
          user_id: string
        }
        Insert: {
          count?: number
          id?: string
          used_at?: string
          user_id: string
        }
        Update: {
          count?: number
          id?: string
          used_at?: string
          user_id?: string
        }
        Relationships: []
      }
      email_jobs: {
        Row: {
          id: string
          payload: Json | null
          scheduled_at: string
          sent_at: string | null
          status: Database["public"]["Enums"]["email_job_status"]
          template: Database["public"]["Enums"]["email_template"]
          to_email: string
        }
        Insert: {
          id?: string
          payload?: Json | null
          scheduled_at?: string
          sent_at?: string | null
          status?: Database["public"]["Enums"]["email_job_status"]
          template: Database["public"]["Enums"]["email_template"]
          to_email: string
        }
        Update: {
          id?: string
          payload?: Json | null
          scheduled_at?: string
          sent_at?: string | null
          status?: Database["public"]["Enums"]["email_job_status"]
          template?: Database["public"]["Enums"]["email_template"]
          to_email?: string
        }
        Relationships: []
      }
      email_send_log: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          message_id: string | null
          metadata: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email?: string
          status?: string
          template_name?: string
        }
        Relationships: []
      }
      email_send_state: {
        Row: {
          auth_email_ttl_minutes: number
          batch_size: number
          id: number
          retry_after_until: string | null
          send_delay_ms: number
          transactional_email_ttl_minutes: number
          updated_at: string
        }
        Insert: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Update: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Relationships: []
      }
      email_unsubscribe_tokens: {
        Row: {
          created_at: string
          email: string
          id: string
          token: string
          used_at: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          token: string
          used_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          token?: string
          used_at?: string | null
        }
        Relationships: []
      }
      external_pdf_versions: {
        Row: {
          content_length: number | null
          created_at: string
          etag: string | null
          form_key: string
          id: string
          last_changed_at: string | null
          last_checked_at: string | null
          last_modified: string | null
          notified_at: string | null
          source_url: string
        }
        Insert: {
          content_length?: number | null
          created_at?: string
          etag?: string | null
          form_key: string
          id?: string
          last_changed_at?: string | null
          last_checked_at?: string | null
          last_modified?: string | null
          notified_at?: string | null
          source_url: string
        }
        Update: {
          content_length?: number | null
          created_at?: string
          etag?: string | null
          form_key?: string
          id?: string
          last_changed_at?: string | null
          last_checked_at?: string | null
          last_modified?: string | null
          notified_at?: string | null
          source_url?: string
        }
        Relationships: []
      }
      field_mapping: {
        Row: {
          field_key: string
          form_slug: string
          height: number
          id: string
          page_number: number
          width: number
          x: number
          y: number
        }
        Insert: {
          field_key: string
          form_slug: string
          height: number
          id?: string
          page_number: number
          width: number
          x: number
          y: number
        }
        Update: {
          field_key?: string
          form_slug?: string
          height?: number
          id?: string
          page_number?: number
          width?: number
          x?: number
          y?: number
        }
        Relationships: [
          {
            foreignKeyName: "field_mapping_form_slug_fkey"
            columns: ["form_slug"]
            isOneToOne: false
            referencedRelation: "forms"
            referencedColumns: ["slug"]
          },
        ]
      }
      form_fields: {
        Row: {
          common_mistakes_bs: string | null
          example: string | null
          field_key: string
          form_slug: string
          format_hint_bs: string | null
          help_text_bs: string | null
          id: string
          label_bs: string
          label_de: string
          section: string | null
          sort_order: number | null
          validation_type: string | null
          where_to_find_bs: string | null
        }
        Insert: {
          common_mistakes_bs?: string | null
          example?: string | null
          field_key: string
          form_slug: string
          format_hint_bs?: string | null
          help_text_bs?: string | null
          id?: string
          label_bs: string
          label_de: string
          section?: string | null
          sort_order?: number | null
          validation_type?: string | null
          where_to_find_bs?: string | null
        }
        Update: {
          common_mistakes_bs?: string | null
          example?: string | null
          field_key?: string
          form_slug?: string
          format_hint_bs?: string | null
          help_text_bs?: string | null
          id?: string
          label_bs?: string
          label_de?: string
          section?: string | null
          sort_order?: number | null
          validation_type?: string | null
          where_to_find_bs?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "form_fields_form_slug_fkey"
            columns: ["form_slug"]
            isOneToOne: false
            referencedRelation: "forms"
            referencedColumns: ["slug"]
          },
        ]
      }
      forms: {
        Row: {
          authority_name: string
          created_at: string
          id: string
          last_checked_at: string | null
          name: string
          official_pdf_url: string
          slug: string
          status: string
          version_hash: string | null
        }
        Insert: {
          authority_name: string
          created_at?: string
          id?: string
          last_checked_at?: string | null
          name: string
          official_pdf_url: string
          slug: string
          status?: string
          version_hash?: string | null
        }
        Update: {
          authority_name?: string
          created_at?: string
          id?: string
          last_checked_at?: string | null
          name?: string
          official_pdf_url?: string
          slug?: string
          status?: string
          version_hash?: string | null
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
      mreza_payments: {
        Row: {
          amount: number
          created_at: string
          currency: string
          id: string
          paid_at: string | null
          product_id: string
          product_type: Database["public"]["Enums"]["payment_product_type"]
          provider: Database["public"]["Enums"]["payment_provider"]
          provider_payment_id: string | null
          status: Database["public"]["Enums"]["payment_status"]
          user_id: string
        }
        Insert: {
          amount?: number
          created_at?: string
          currency?: string
          id?: string
          paid_at?: string | null
          product_id: string
          product_type: Database["public"]["Enums"]["payment_product_type"]
          provider?: Database["public"]["Enums"]["payment_provider"]
          provider_payment_id?: string | null
          status?: Database["public"]["Enums"]["payment_status"]
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          id?: string
          paid_at?: string | null
          product_id?: string
          product_type?: Database["public"]["Enums"]["payment_product_type"]
          provider?: Database["public"]["Enums"]["payment_provider"]
          provider_payment_id?: string | null
          status?: Database["public"]["Enums"]["payment_status"]
          user_id?: string
        }
        Relationships: []
      }
      page_views: {
        Row: {
          city: string | null
          country: string | null
          created_at: string
          id: string
          ip_hash: string | null
          path: string
          referrer: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          city?: string | null
          country?: string | null
          created_at?: string
          id?: string
          ip_hash?: string | null
          path: string
          referrer?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          city?: string | null
          country?: string | null
          created_at?: string
          id?: string
          ip_hash?: string | null
          path?: string
          referrer?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      pro_services: {
        Row: {
          billing_email: string
          bundesland: string
          city: string
          city_lat: number | null
          city_lng: number | null
          created_at: string
          description: string
          email: string | null
          expires_at: string | null
          id: string
          name_or_business: string
          phone: string | null
          service_category: string
          started_at: string | null
          status: Database["public"]["Enums"]["pro_status"]
          updated_at: string
          user_id: string | null
          website: string | null
          whatsapp: string | null
        }
        Insert: {
          billing_email: string
          bundesland: string
          city: string
          city_lat?: number | null
          city_lng?: number | null
          created_at?: string
          description: string
          email?: string | null
          expires_at?: string | null
          id?: string
          name_or_business: string
          phone?: string | null
          service_category: string
          started_at?: string | null
          status?: Database["public"]["Enums"]["pro_status"]
          updated_at?: string
          user_id?: string | null
          website?: string | null
          whatsapp?: string | null
        }
        Update: {
          billing_email?: string
          bundesland?: string
          city?: string
          city_lat?: number | null
          city_lng?: number | null
          created_at?: string
          description?: string
          email?: string | null
          expires_at?: string | null
          id?: string
          name_or_business?: string
          phone?: string | null
          service_category?: string
          started_at?: string | null
          status?: Database["public"]["Enums"]["pro_status"]
          updated_at?: string
          user_id?: string | null
          website?: string | null
          whatsapp?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          email_opt_out: boolean | null
          first_name: string | null
          id: string
          is_premium: boolean
          last_login_at: string | null
          preferred_lang: string | null
          reengagement_30d_sent_at: string | null
          reengagement_7d_sent_at: string | null
          single_formular_access: string[]
          subscription_expires_at: string | null
          subscription_tier: string
        }
        Insert: {
          created_at?: string
          email: string
          email_opt_out?: boolean | null
          first_name?: string | null
          id: string
          is_premium?: boolean
          last_login_at?: string | null
          preferred_lang?: string | null
          reengagement_30d_sent_at?: string | null
          reengagement_7d_sent_at?: string | null
          single_formular_access?: string[]
          subscription_expires_at?: string | null
          subscription_tier?: string
        }
        Update: {
          created_at?: string
          email?: string
          email_opt_out?: boolean | null
          first_name?: string | null
          id?: string
          is_premium?: boolean
          last_login_at?: string | null
          preferred_lang?: string | null
          reengagement_30d_sent_at?: string | null
          reengagement_7d_sent_at?: string | null
          single_formular_access?: string[]
          subscription_expires_at?: string | null
          subscription_tier?: string
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
      reviews: {
        Row: {
          comment: string
          created_at: string
          id: string
          is_approved: boolean
          rating: number
          user_id: string | null
          username: string
        }
        Insert: {
          comment?: string
          created_at?: string
          id?: string
          is_approved?: boolean
          rating?: number
          user_id?: string | null
          username?: string
        }
        Update: {
          comment?: string
          created_at?: string
          id?: string
          is_approved?: boolean
          rating?: number
          user_id?: string | null
          username?: string
        }
        Relationships: []
      }
      stripe_sync_log: {
        Row: {
          action: string
          admin_email: string | null
          admin_user_id: string | null
          created_at: string
          details: Json
          error_message: string | null
          id: string
          mismatches_found: number
          records_updated: number
          success: boolean
          target_email: string | null
          target_user_id: string | null
        }
        Insert: {
          action?: string
          admin_email?: string | null
          admin_user_id?: string | null
          created_at?: string
          details?: Json
          error_message?: string | null
          id?: string
          mismatches_found?: number
          records_updated?: number
          success?: boolean
          target_email?: string | null
          target_user_id?: string | null
        }
        Update: {
          action?: string
          admin_email?: string | null
          admin_user_id?: string | null
          created_at?: string
          details?: Json
          error_message?: string | null
          id?: string
          mismatches_found?: number
          records_updated?: number
          success?: boolean
          target_email?: string | null
          target_user_id?: string | null
        }
        Relationships: []
      }
      stripe_sync_log_settings: {
        Row: {
          auto_purge_enabled: boolean
          id: number
          last_purged_at: string | null
          last_purged_count: number
          retention_days: number
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          auto_purge_enabled?: boolean
          id?: number
          last_purged_at?: string | null
          last_purged_count?: number
          retention_days?: number
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          auto_purge_enabled?: boolean
          id?: number
          last_purged_at?: string | null
          last_purged_count?: number
          retention_days?: number
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      suppressed_emails: {
        Row: {
          created_at: string
          email: string
          id: string
          metadata: Json | null
          reason: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          metadata?: Json | null
          reason: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          metadata?: Json | null
          reason?: string
        }
        Relationships: []
      }
      trainer_progress: {
        Row: {
          completed_lessons: string[]
          id: string
          level: number
          streak: number
          updated_at: string
          user_id: string
          xp: number
        }
        Insert: {
          completed_lessons?: string[]
          id?: string
          level?: number
          streak?: number
          updated_at?: string
          user_id: string
          xp?: number
        }
        Update: {
          completed_lessons?: string[]
          id?: string
          level?: number
          streak?: number
          updated_at?: string
          user_id?: string
          xp?: number
        }
        Relationships: []
      }
      trial_codes: {
        Row: {
          code: string
          created_at: string
          created_by: string | null
          description: string | null
          duration_days: number
          expires_at: string | null
          id: string
          is_active: boolean
          max_uses: number | null
          used_count: number
        }
        Insert: {
          code: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          duration_days?: number
          expires_at?: string | null
          id?: string
          is_active?: boolean
          max_uses?: number | null
          used_count?: number
        }
        Update: {
          code?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          duration_days?: number
          expires_at?: string | null
          id?: string
          is_active?: boolean
          max_uses?: number | null
          used_count?: number
        }
        Relationships: []
      }
      trial_redemptions: {
        Row: {
          code: string
          deactivated_at: string | null
          expires_at: string
          id: string
          redeemed_at: string
          trial_code_id: string
          user_id: string
        }
        Insert: {
          code: string
          deactivated_at?: string | null
          expires_at: string
          id?: string
          redeemed_at?: string
          trial_code_id: string
          user_id: string
        }
        Update: {
          code?: string
          deactivated_at?: string | null
          expires_at?: string
          id?: string
          redeemed_at?: string
          trial_code_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "trial_redemptions_trial_code_id_fkey"
            columns: ["trial_code_id"]
            isOneToOne: false
            referencedRelation: "trial_codes"
            referencedColumns: ["id"]
          },
        ]
      }
      user_form_access: {
        Row: {
          form_slug: string
          id: string
          purchased_at: string
          status: string
          user_id: string
        }
        Insert: {
          form_slug: string
          id?: string
          purchased_at?: string
          status?: string
          user_id: string
        }
        Update: {
          form_slug?: string
          id?: string
          purchased_at?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_form_access_form_slug_fkey"
            columns: ["form_slug"]
            isOneToOne: false
            referencedRelation: "forms"
            referencedColumns: ["slug"]
          },
        ]
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
      ads_public: {
        Row: {
          activated_at: string | null
          bundesland: string | null
          category: string | null
          city: string | null
          city_lat: number | null
          city_lng: number | null
          contact_type: Database["public"]["Enums"]["ad_contact_type"] | null
          contact_value: string | null
          created_at: string | null
          description: string | null
          domain: Database["public"]["Enums"]["ad_domain"] | null
          expires_at: string | null
          id: string | null
          status: Database["public"]["Enums"]["ad_status"] | null
          title: string | null
          type: Database["public"]["Enums"]["ad_type"] | null
          user_id: string | null
        }
        Insert: {
          activated_at?: string | null
          bundesland?: string | null
          category?: string | null
          city?: string | null
          city_lat?: number | null
          city_lng?: number | null
          contact_type?: Database["public"]["Enums"]["ad_contact_type"] | null
          contact_value?: string | null
          created_at?: string | null
          description?: string | null
          domain?: Database["public"]["Enums"]["ad_domain"] | null
          expires_at?: string | null
          id?: string | null
          status?: Database["public"]["Enums"]["ad_status"] | null
          title?: string | null
          type?: Database["public"]["Enums"]["ad_type"] | null
          user_id?: string | null
        }
        Update: {
          activated_at?: string | null
          bundesland?: string | null
          category?: string | null
          city?: string | null
          city_lat?: number | null
          city_lng?: number | null
          contact_type?: Database["public"]["Enums"]["ad_contact_type"] | null
          contact_value?: string | null
          created_at?: string | null
          description?: string | null
          domain?: Database["public"]["Enums"]["ad_domain"] | null
          expires_at?: string | null
          id?: string | null
          status?: Database["public"]["Enums"]["ad_status"] | null
          title?: string | null
          type?: Database["public"]["Enums"]["ad_type"] | null
          user_id?: string | null
        }
        Relationships: []
      }
      directory_listings: {
        Row: {
          created_at: string | null
          id: string | null
          verified: boolean | null
        }
        Insert: {
          created_at?: string | null
          id?: string | null
          verified?: boolean | null
        }
        Update: {
          created_at?: string | null
          id?: string | null
          verified?: boolean | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number | null
          created_at: string | null
          currency: string | null
          id: string | null
          paid_at: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          amount?: never
          created_at?: string | null
          currency?: string | null
          id?: string | null
          paid_at?: string | null
          status?: never
          user_id?: string | null
        }
        Update: {
          amount?: never
          created_at?: string | null
          currency?: string | null
          id?: string | null
          paid_at?: string | null
          status?: never
          user_id?: string | null
        }
        Relationships: []
      }
      pro_services_public: {
        Row: {
          bundesland: string | null
          city: string | null
          city_lat: number | null
          city_lng: number | null
          created_at: string | null
          description: string | null
          expires_at: string | null
          id: string | null
          name_or_business: string | null
          service_category: string | null
          started_at: string | null
          status: Database["public"]["Enums"]["pro_status"] | null
          website: string | null
        }
        Insert: {
          bundesland?: string | null
          city?: string | null
          city_lat?: number | null
          city_lng?: number | null
          created_at?: string | null
          description?: string | null
          expires_at?: string | null
          id?: string | null
          name_or_business?: string | null
          service_category?: string | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["pro_status"] | null
          website?: string | null
        }
        Update: {
          bundesland?: string | null
          city?: string | null
          city_lat?: number | null
          city_lng?: number | null
          created_at?: string | null
          description?: string | null
          expires_at?: string | null
          id?: string | null
          name_or_business?: string | null
          service_category?: string | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["pro_status"] | null
          website?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      consume_doc_check: {
        Args: { daily_limit?: number; uid: string }
        Returns: boolean
      }
      consume_doc_check_credit: { Args: { uid: string }; Returns: boolean }
      consume_premium_doc_check: { Args: { uid: string }; Returns: boolean }
      cq_increment_view: { Args: { _id: string }; Returns: undefined }
      deactivate_expired_launch_trials: { Args: never; Returns: number }
      deactivate_expired_trials: { Args: never; Returns: number }
      delete_email: {
        Args: { message_id: number; queue_name: string }
        Returns: boolean
      }
      email_queue_dispatch: { Args: never; Returns: undefined }
      enqueue_email: {
        Args: { payload: Json; queue_name: string }
        Returns: number
      }
      fulfill_stripe_checkout: {
        Args: {
          amt_cents: number
          curr: string
          product_key: string
          session_id: string
          uid: string
        }
        Returns: Json
      }
      get_admin_dashboard_extra: { Args: never; Returns: Json }
      get_admin_payments: {
        Args: { _limit?: number }
        Returns: {
          amount: number
          created_at: string
          currency: string
          email: string
          id: string
          paid_at: string
          status: string
          user_id: string
        }[]
      }
      get_admin_stats: { Args: never; Returns: Json }
      get_admin_users: {
        Args: { _limit?: number; _search?: string }
        Returns: {
          created_at: string
          email: string
          first_name: string
          id: string
          is_premium: boolean
          last_login_at: string
          subscription_expires_at: string
          subscription_tier: string
        }[]
      }
      get_admin_users_list: {
        Args: { _limit?: number; _search?: string; _tier_filter?: string }
        Returns: {
          activity: string
          created_at: string
          email: string
          first_name: string
          id: string
          is_premium: boolean
          last_login_at: string
          pages_per_session: number
          preferred_lang: string
          subscription_expires_at: string
          subscription_tier: string
          user_type: string
        }[]
      }
      get_daily_chat_count: { Args: { _user_id: string }; Returns: number }
      get_doc_check_status: {
        Args: { uid: string }
        Returns: {
          is_premium: boolean
          paid_credits: number
          premium_daily_limit: number
          premium_remaining_today: number
          premium_used_today: number
        }[]
      }
      get_live_stats: { Args: never; Returns: Json }
      grant_doc_check_credit: {
        Args: {
          amt_cents?: number
          curr?: string
          session_id: string
          uid: string
        }
        Returns: boolean
      }
      grant_premium_access: {
        Args: {
          new_expires_at?: string
          new_tier?: string
          target_user_id: string
        }
        Returns: undefined
      }
      has_full_access: { Args: { uid: string }; Returns: boolean }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      haversine_distance: {
        Args: { lat1: number; lat2: number; lng1: number; lng2: number }
        Returns: number
      }
      is_legacy_doccheck_user: { Args: { uid: string }; Returns: boolean }
      move_to_dlq: {
        Args: {
          dlq_name: string
          message_id: number
          payload: Json
          source_queue: string
        }
        Returns: number
      }
      purge_stripe_sync_log: { Args: { _force?: boolean }; Returns: number }
      read_email_batch: {
        Args: { batch_size: number; queue_name: string; vt: number }
        Returns: {
          message: Json
          msg_id: number
          read_ct: number
        }[]
      }
      redeem_trial_code: {
        Args: { _code: string; _user_id: string }
        Returns: Json
      }
      release_doc_check_credit: {
        Args: { credit_id: string }
        Returns: boolean
      }
      release_legacy_doc_check: { Args: { usage_id: string }; Returns: boolean }
      reserve_doc_check_credit: { Args: { uid: string }; Returns: string }
      reserve_legacy_doc_check: { Args: { uid: string }; Returns: string }
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
          google_rating: number | null
          google_rating_count: number | null
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
    }
    Enums: {
      ad_contact_type: "PHONE" | "EMAIL"
      ad_domain: "JOB" | "SERVICE" | "HOUSING" | "CAR"
      ad_status: "PENDING" | "ACTIVE" | "EXPIRED" | "REMOVED"
      ad_type: "SEEKING" | "OFFERING"
      app_role: "admin" | "user"
      email_job_status: "PENDING" | "SENT" | "FAILED"
      email_template:
        | "AD_VERIFY"
        | "AD_EXPIRE_SOON"
        | "PRO_EXPIRE_30"
        | "PRO_EXPIRE_7"
        | "PRO_EXPIRED"
      payment_product_type:
        | "PRO_SERVICE"
        | "PREMIUM_FORMULARE"
        | "PLUS_LIFETIME"
        | "DOC_CHECK"
      payment_provider: "STUB" | "STRIPE"
      payment_status: "PENDING" | "PAID" | "FAILED" | "CANCELED"
      pro_status: "PENDING_PAYMENT" | "ACTIVE" | "EXPIRED" | "REMOVED"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
      ad_contact_type: ["PHONE", "EMAIL"],
      ad_domain: ["JOB", "SERVICE", "HOUSING", "CAR"],
      ad_status: ["PENDING", "ACTIVE", "EXPIRED", "REMOVED"],
      ad_type: ["SEEKING", "OFFERING"],
      app_role: ["admin", "user"],
      email_job_status: ["PENDING", "SENT", "FAILED"],
      email_template: [
        "AD_VERIFY",
        "AD_EXPIRE_SOON",
        "PRO_EXPIRE_30",
        "PRO_EXPIRE_7",
        "PRO_EXPIRED",
      ],
      payment_product_type: [
        "PRO_SERVICE",
        "PREMIUM_FORMULARE",
        "PLUS_LIFETIME",
        "DOC_CHECK",
      ],
      payment_provider: ["STUB", "STRIPE"],
      payment_status: ["PENDING", "PAID", "FAILED", "CANCELED"],
      pro_status: ["PENDING_PAYMENT", "ACTIVE", "EXPIRED", "REMOVED"],
    },
  },
} as const
