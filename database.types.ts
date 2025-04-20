export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      address: {
        Row: {
          addr_line1: string
          addr_line2: string | null
          addressed_to: string
          city: string
          country: string
          created_at: string
          created_id: number
          id: number
          state: string
          zip_code: string
        }
        Insert: {
          addr_line1: string
          addr_line2?: string | null
          addressed_to: string
          city: string
          country: string
          created_at?: string
          created_id: number
          id?: number
          state: string
          zip_code: string
        }
        Update: {
          addr_line1?: string
          addr_line2?: string | null
          addressed_to?: string
          city?: string
          country?: string
          created_at?: string
          created_id?: number
          id?: number
          state?: string
          zip_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "address_created_id_fkey"
            columns: ["created_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      block: {
        Row: {
          block_id: number
          created_at: string
          id: number
          user_id: number
        }
        Insert: {
          block_id: number
          created_at?: string
          id?: number
          user_id: number
        }
        Update: {
          block_id?: number
          created_at?: string
          id?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "blocks_block_id_fkey"
            columns: ["block_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blocks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      cart_item: {
        Row: {
          created_at: string
          id: number
          product_id: number
          quantity: number
          user_id: number
          variant_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          product_id: number
          quantity?: number
          user_id: number
          variant_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          product_id?: number
          quantity?: number
          user_id?: number
          variant_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cart_item_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_item_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_item_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "product_variant"
            referencedColumns: ["id"]
          },
        ]
      }
      community: {
        Row: {
          banner_key: string | null
          created_at: string
          description: string
          icon_key: string | null
          id: number
          name: string
          community_member_count: number | null
        }
        Insert: {
          banner_key?: string | null
          created_at?: string
          description: string
          icon_key?: string | null
          id?: number
          name: string
        }
        Update: {
          banner_key?: string | null
          created_at?: string
          description?: string
          icon_key?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      community_collection_item: {
        Row: {
          community_id: number
          created_at: string
          description: string | null
          id: number
          product_id: number
        }
        Insert: {
          community_id: number
          created_at?: string
          description?: string | null
          id?: number
          product_id: number
        }
        Update: {
          community_id?: number
          created_at?: string
          description?: string | null
          id?: number
          product_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "community_collection_item_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "community"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_collection_item_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
        ]
      }
      community_member: {
        Row: {
          community_id: number
          created_at: string
          id: number
          user_id: number
        }
        Insert: {
          community_id: number
          created_at?: string
          id?: number
          user_id: number
        }
        Update: {
          community_id?: number
          created_at?: string
          id?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "community_member_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "community"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_member_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      community_post: {
        Row: {
          community_id: number
          created_at: string
          description: string
          id: number
          image_url: string | null
          post_type: Database["public"]["Enums"]["community_post_type"]
          poster_id: number
          product_id: number | null
          title: string
        }
        Insert: {
          community_id: number
          created_at?: string
          description: string
          id?: number
          image_url?: string | null
          post_type: Database["public"]["Enums"]["community_post_type"]
          poster_id: number
          product_id?: number | null
          title: string
        }
        Update: {
          community_id?: number
          created_at?: string
          description?: string
          id?: number
          image_url?: string | null
          post_type?: Database["public"]["Enums"]["community_post_type"]
          poster_id?: number
          product_id?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_posts_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "community"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_posts_poster_id_fkey"
            columns: ["poster_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_posts_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
        ]
      }
      conversation: {
        Row: {
          created_at: string
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      conversation_member: {
        Row: {
          conversation_id: number
          created_at: string
          id: number
          user_id: number
        }
        Insert: {
          conversation_id: number
          created_at?: string
          id?: number
          user_id: number
        }
        Update: {
          conversation_id?: number
          created_at?: string
          id?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "conversation_member_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversation"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversation_member_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      dm_conversation: {
        Row: {
          created_at: string
          id: number
          user1_id: number
          user2_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          user1_id: number
          user2_id: number
        }
        Update: {
          created_at?: string
          id?: number
          user1_id?: number
          user2_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "dm_conversation_user1_id_fkey"
            columns: ["user1_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dm_conversation_user2_id_fkey"
            columns: ["user2_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      dm_conversation_message: {
        Row: {
          content: string
          created_at: string
          dm_conversation_id: number
          id: number
          user_id: number
        }
        Insert: {
          content: string
          created_at?: string
          dm_conversation_id: number
          id?: number
          user_id: number
        }
        Update: {
          content?: string
          created_at?: string
          dm_conversation_id?: number
          id?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "dm_conversation_message_dm_conversation_id_fkey"
            columns: ["dm_conversation_id"]
            isOneToOne: false
            referencedRelation: "dm_conversation"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dm_conversation_message_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      event: {
        Row: {
          address: string
          banner_key: string | null
          city: string
          community_id: number
          coordinates: unknown
          created_at: string
          end_date: string
          icon_key: string | null
          id: number
          name: string
          start_date: string
          state: string
        }
        Insert: {
          address: string
          banner_key?: string | null
          city: string
          community_id: number
          coordinates: unknown
          created_at?: string
          end_date: string
          icon_key?: string | null
          id?: number
          name: string
          start_date: string
          state: string
        }
        Update: {
          address?: string
          banner_key?: string | null
          city?: string
          community_id?: number
          coordinates?: unknown
          created_at?: string
          end_date?: string
          icon_key?: string | null
          id?: number
          name?: string
          start_date?: string
          state?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "community"
            referencedColumns: ["id"]
          },
        ]
      }
      featured_community: {
        Row: {
          community_id: number
          created_at: string
          id: number
        }
        Insert: {
          community_id: number
          created_at?: string
          id?: number
        }
        Update: {
          community_id?: number
          created_at?: string
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "featured_community_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "community"
            referencedColumns: ["id"]
          },
        ]
      }
      follow: {
        Row: {
          created_at: string
          dest_id: number
          id: number
          source_id: number
        }
        Insert: {
          created_at?: string
          dest_id: number
          id?: number
          source_id: number
        }
        Update: {
          created_at?: string
          dest_id?: number
          id?: number
          source_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "follow_dest_id_fkey"
            columns: ["dest_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "follow_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      follow_request: {
        Row: {
          created_at: string
          id: number
          recipient_id: number
          sender_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          recipient_id: number
          sender_id: number
        }
        Update: {
          created_at?: string
          id?: number
          recipient_id?: number
          sender_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "follow_request_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "follow_request_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      message: {
        Row: {
          content: string
          conversation_id: number
          created_at: string
          id: number
          user_id: number
        }
        Insert: {
          content: string
          conversation_id: number
          created_at?: string
          id?: number
          user_id: number
        }
        Update: {
          content?: string
          conversation_id?: number
          created_at?: string
          id?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "message_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversation"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      notification: {
        Row: {
          created_at: string
          description: string
          id: number
          is_read: boolean
          type: Database["public"]["Enums"]["notification_type"]
          user_id: number
        }
        Insert: {
          created_at?: string
          description: string
          id?: number
          is_read: boolean
          type: Database["public"]["Enums"]["notification_type"]
          user_id: number
        }
        Update: {
          created_at?: string
          description?: string
          id?: number
          is_read?: boolean
          type?: Database["public"]["Enums"]["notification_type"]
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_image: {
        Row: {
          created_at: string
          id: number
          image_key: string
          is_left: boolean
          is_user: boolean
          notification_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          image_key: string
          is_left?: boolean
          is_user: boolean
          notification_id: number
        }
        Update: {
          created_at?: string
          id?: number
          image_key?: string
          is_left?: boolean
          is_user?: boolean
          notification_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "notification_image_notification_id_fkey"
            columns: ["notification_id"]
            isOneToOne: false
            referencedRelation: "notification"
            referencedColumns: ["id"]
          },
        ]
      }
      order_history_item: {
        Row: {
          buyer_id: number
          created_at: string
          delivered_date: string | null
          final_price: number
          id: number
          product_id: number
          quantity: number
          seller_id: number
          shipping_address_id: number
          shipping_date: string | null
          shipping_provider: string | null
          status: Database["public"]["Enums"]["order_status"]
          tracking_number: string | null
          variant_id: number | null
        }
        Insert: {
          buyer_id: number
          created_at?: string
          delivered_date?: string | null
          final_price: number
          id?: number
          product_id: number
          quantity?: number
          seller_id: number
          shipping_address_id: number
          shipping_date?: string | null
          shipping_provider?: string | null
          status?: Database["public"]["Enums"]["order_status"]
          tracking_number?: string | null
          variant_id?: number | null
        }
        Update: {
          buyer_id?: number
          created_at?: string
          delivered_date?: string | null
          final_price?: number
          id?: number
          product_id?: number
          quantity?: number
          seller_id?: number
          shipping_address_id?: number
          shipping_date?: string | null
          shipping_provider?: string | null
          status?: Database["public"]["Enums"]["order_status"]
          tracking_number?: string | null
          variant_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "order_history_item_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_history_item_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_history_item_shipping_address_id_fkey"
            columns: ["shipping_address_id"]
            isOneToOne: false
            referencedRelation: "address"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_history_item_user_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_history_item_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "product_variant"
            referencedColumns: ["id"]
          },
        ]
      }
      product: {
        Row: {
          average_rating: number
          category: string
          condition: string
          created_at: string
          description: string
          has_variants: boolean
          id: number
          name: string
          price: number | null
          quantity: number | null
          seller_id: number
          shipping_price: number
        }
        Insert: {
          average_rating?: number
          category: string
          condition: string
          created_at?: string
          description: string
          has_variants?: boolean
          id?: number
          name: string
          price?: number | null
          quantity?: number | null
          seller_id: number
          shipping_price: number
        }
        Update: {
          average_rating?: number
          category?: string
          condition?: string
          created_at?: string
          description?: string
          has_variants?: boolean
          id?: number
          name?: string
          price?: number | null
          quantity?: number | null
          seller_id?: number
          shipping_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "product_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      product_image: {
        Row: {
          created_at: string
          id: number
          image_key: string
          product_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          image_key: string
          product_id: number
        }
        Update: {
          created_at?: string
          id?: number
          image_key?: string
          product_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "product_image_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
        ]
      }
      product_review: {
        Row: {
          created_at: string
          description: string
          id: number
          product_id: number
          rating: number
          reviewer_id: number
        }
        Insert: {
          created_at?: string
          description: string
          id?: number
          product_id: number
          rating: number
          reviewer_id: number
        }
        Update: {
          created_at?: string
          description?: string
          id?: number
          product_id?: number
          rating?: number
          reviewer_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "product_review_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_review_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      product_variant: {
        Row: {
          created_at: string
          id: number
          price: number
          product_id: number
          quantity: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          price: number
          product_id: number
          quantity?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          price?: number
          product_id?: number
          quantity?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "product_variant_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
        ]
      }
      product_variant_option: {
        Row: {
          created_at: string
          id: number
          value_id: number
          variant_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          value_id: number
          variant_id: number
        }
        Update: {
          created_at?: string
          id?: number
          value_id?: number
          variant_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "product_variant_option_value_id_fkey"
            columns: ["value_id"]
            isOneToOne: false
            referencedRelation: "product_variant_value"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_variant_option_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "product_variant"
            referencedColumns: ["id"]
          },
        ]
      }
      product_variant_type: {
        Row: {
          created_at: string
          id: number
          name: string
          product_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          product_id: number
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          product_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "product_variant_type_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
        ]
      }
      product_variant_value: {
        Row: {
          created_at: string
          id: number
          name: string
          type_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          type_id: number
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          type_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "product_variant_value_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "product_variant_type"
            referencedColumns: ["id"]
          },
        ]
      }
      report_community: {
        Row: {
          community_id: number
          created_at: string
          id: number
          reason: string | null
          reporter_id: number | null
        }
        Insert: {
          community_id: number
          created_at?: string
          id?: number
          reason?: string | null
          reporter_id?: number | null
        }
        Update: {
          community_id?: number
          created_at?: string
          id?: number
          reason?: string | null
          reporter_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "report_community_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "community"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "report_community_reporter_id_fkey"
            columns: ["reporter_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      report_community_collection: {
        Row: {
          collection_id: number
          community_id: number
          created_at: string
          id: number
          reason: string | null
          reporter_id: number | null
        }
        Insert: {
          collection_id: number
          community_id: number
          created_at?: string
          id?: number
          reason?: string | null
          reporter_id?: number | null
        }
        Update: {
          collection_id?: number
          community_id?: number
          created_at?: string
          id?: number
          reason?: string | null
          reporter_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "report_community_collection_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "community_collection_item"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "report_community_collection_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "community"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "report_community_collection_reporter_id_fkey"
            columns: ["reporter_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      report_community_member: {
        Row: {
          community_id: number | null
          created_at: string
          id: number
          reason: string | null
          reporter_id: number | null
          user_id: number
        }
        Insert: {
          community_id?: number | null
          created_at?: string
          id?: number
          reason?: string | null
          reporter_id?: number | null
          user_id: number
        }
        Update: {
          community_id?: number | null
          created_at?: string
          id?: number
          reason?: string | null
          reporter_id?: number | null
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "report_community_member_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "community"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "report_community_member_reporter_id_fkey"
            columns: ["reporter_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "report_community_member_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      report_community_post: {
        Row: {
          community_id: number
          created_at: string
          id: number
          post_id: number
          reason: string | null
          reporter_id: number | null
        }
        Insert: {
          community_id: number
          created_at?: string
          id?: number
          post_id: number
          reason?: string | null
          reporter_id?: number | null
        }
        Update: {
          community_id?: number
          created_at?: string
          id?: number
          post_id?: number
          reason?: string | null
          reporter_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "report_community_post_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "community"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "report_community_post_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_post"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "report_community_post_reporter_id_fkey"
            columns: ["reporter_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      report_member: {
        Row: {
          created_at: string
          id: number
          reason: string | null
          reporter_id: number | null
          user_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          reason?: string | null
          reporter_id?: number | null
          user_id: number
        }
        Update: {
          created_at?: string
          id?: number
          reason?: string | null
          reporter_id?: number | null
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "report_member_reporter_id_fkey"
            columns: ["reporter_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "report_member_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      report_product: {
        Row: {
          created_at: string
          id: number
          product_id: number
          reason: string | null
          reporter_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          product_id: number
          reason?: string | null
          reporter_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          product_id?: number
          reason?: string | null
          reporter_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "report_product_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "report_product_reporter_id_fkey"
            columns: ["reporter_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      report_video: {
        Row: {
          created_at: string
          id: number
          reason: string | null
          reporter_id: number | null
          video_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          reason?: string | null
          reporter_id?: number | null
          video_id: number
        }
        Update: {
          created_at?: string
          id?: number
          reason?: string | null
          reporter_id?: number | null
          video_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "report_video_reporter_id_fkey"
            columns: ["reporter_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "report_video_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "video"
            referencedColumns: ["id"]
          },
        ]
      }
      seller_review: {
        Row: {
          created_at: string
          description: string
          id: number
          rating: number
          reviewer_id: number
          seller_id: number
        }
        Insert: {
          created_at?: string
          description: string
          id?: number
          rating: number
          reviewer_id: number
          seller_id: number
        }
        Update: {
          created_at?: string
          description?: string
          id?: number
          rating?: number
          reviewer_id?: number
          seller_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "seller_review_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "seller_review_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      user: {
        Row: {
          auth_id: string
          average_rating: number
          created_at: string
          description: string | null
          display_name: string
          email: string
          first_name: string | null
          id: number
          last_name: string | null
          location: unknown | null
          profile_image_key: string | null
          stripe_account_id: string | null
          stripe_customer_id: string | null
          username: string | null
        }
        Insert: {
          auth_id?: string
          average_rating?: number
          created_at?: string
          description?: string | null
          display_name?: string
          email: string
          first_name?: string | null
          id?: number
          last_name?: string | null
          location?: unknown | null
          profile_image_key?: string | null
          stripe_account_id?: string | null
          stripe_customer_id?: string | null
          username?: string | null
        }
        Update: {
          auth_id?: string
          average_rating?: number
          created_at?: string
          description?: string | null
          display_name?: string
          email?: string
          first_name?: string | null
          id?: number
          last_name?: string | null
          location?: unknown | null
          profile_image_key?: string | null
          stripe_account_id?: string | null
          stripe_customer_id?: string | null
          username?: string | null
        }
        Relationships: []
      }
      video: {
        Row: {
          created_at: string
          description: string | null
          id: number
          poster_id: number
          video_key: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          poster_id: number
          video_key: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          poster_id?: number
          video_key?: string
        }
        Relationships: [
          {
            foreignKeyName: "video_poster_id_fkey"
            columns: ["poster_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      video_comment: {
        Row: {
          created_at: string
          description: string
          id: number
          poster_id: number
          video_id: number
        }
        Insert: {
          created_at?: string
          description: string
          id?: number
          poster_id: number
          video_id: number
        }
        Update: {
          created_at?: string
          description?: string
          id?: number
          poster_id?: number
          video_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "video_comment_poster_id_fkey"
            columns: ["poster_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "video_comment_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "video"
            referencedColumns: ["id"]
          },
        ]
      }
      video_like: {
        Row: {
          created_at: string
          id: number
          liker_id: number
          video_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          liker_id: number
          video_id: number
        }
        Update: {
          created_at?: string
          id?: number
          liker_id?: number
          video_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "video_like_liker_id_fkey"
            columns: ["liker_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "video_like_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "video"
            referencedColumns: ["id"]
          },
        ]
      }
      video_product: {
        Row: {
          created_at: string
          id: number
          product_id: number
          video_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          product_id: number
          video_id: number
        }
        Update: {
          created_at?: string
          id?: number
          product_id?: number
          video_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "video_product_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "video_product_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "video"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      community_member_count: {
        Args: { "": Database["public"]["Tables"]["community"]["Row"] }
        Returns: number
      }
      create_ephemeral_key: {
        Args: { customer_id: string; stripe_version: string }
        Returns: Json
      }
      create_payment_intent: {
        Args: { customer_id: string; amount: number; currency: string }
        Returns: Json
      }
      does_object_exist: {
        Args: { key: string } | { key: string; bucket: string }
        Returns: boolean
      }
      does_user_follow_other_user: {
        Args: { user_id: number }
        Returns: boolean
      }
      does_user_own_product: {
        Args: { product_id: number }
        Returns: boolean
      }
      does_user_own_video: {
        Args: { video_id: number }
        Returns: boolean
      }
      get_current_user_id: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      get_event: {
        Args: { event_id: number }
        Returns: {
          id: number
          name: string
          longitude: number
          latitude: number
        }[]
      }
      increment_cart_quantity: {
        Args: { item_id: number; increment_by: number }
        Returns: number
      }
      is_current_user: {
        Args: { entity_id: number }
        Returns: boolean
      }
      is_user_already_community_member: {
        Args: { community_id: number }
        Returns: boolean
      }
    }
    Enums: {
      community_post_type: "POST" | "SHOWCASE" | "REVIEW"
      notification_type:
        | "PURCHASE_CONFIRMED"
        | "ORDER_ON_THE_WAY"
        | "ORDER_DELIVERED"
        | "SOLD_ITEM"
        | "SOLD_ITEM_DELIVERED"
        | "LIKED_YOUR_VIDEO"
        | "COMMENTED_ON_YOUR_VIDEO"
        | "LIKED_YOUR_COMMENT"
        | "ITEM_ADDED_TO_COMMUNITY_COLLECTION"
        | "POST_UPLOADED_TO_COMMUNITY"
        | "LIKED_YOUR_COMMUNITY_POST"
        | "COMMENTED_ON_YOUR_COMMUNITY_POST"
      order_status:
        | "PENDING"
        | "CONFIRMED"
        | "SHIPPED"
        | "DELIVERED"
        | "CANCELED"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      community_post_type: ["POST", "SHOWCASE", "REVIEW"],
      notification_type: [
        "PURCHASE_CONFIRMED",
        "ORDER_ON_THE_WAY",
        "ORDER_DELIVERED",
        "SOLD_ITEM",
        "SOLD_ITEM_DELIVERED",
        "LIKED_YOUR_VIDEO",
        "COMMENTED_ON_YOUR_VIDEO",
        "LIKED_YOUR_COMMENT",
        "ITEM_ADDED_TO_COMMUNITY_COLLECTION",
        "POST_UPLOADED_TO_COMMUNITY",
        "LIKED_YOUR_COMMUNITY_POST",
        "COMMENTED_ON_YOUR_COMMUNITY_POST",
      ],
      order_status: [
        "PENDING",
        "CONFIRMED",
        "SHIPPED",
        "DELIVERED",
        "CANCELED",
      ],
    },
  },
} as const
