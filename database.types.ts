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
      cart_item: {
        Row: {
          created_at: string
          id: number
          product_id: number
          quantity: number | null
          user_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          product_id: number
          quantity?: number | null
          user_id: number
        }
        Update: {
          created_at?: string
          id?: number
          product_id?: number
          quantity?: number | null
          user_id?: number
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
        ]
      }
      community: {
        Row: {
          banner_url: string | null
          created_at: string
          description: string
          icon_url: string | null
          id: number
          name: string
        }
        Insert: {
          banner_url?: string | null
          created_at?: string
          description: string
          icon_url?: string | null
          id?: number
          name: string
        }
        Update: {
          banner_url?: string | null
          created_at?: string
          description?: string
          icon_url?: string | null
          id?: number
          name?: string
        }
        Relationships: []
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
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
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
            referencedRelation: "community"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "community"
            referencedColumns: ["id"]
          },
        ]
      }
      order_history_item: {
        Row: {
          created_at: string
          id: number
          product_id: number
          seller_id: number
          status: Database["public"]["Enums"]["order_status"]
          user_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          product_id: number
          seller_id: number
          status: Database["public"]["Enums"]["order_status"]
          user_id: number
        }
        Update: {
          created_at?: string
          id?: number
          product_id?: number
          seller_id?: number
          status?: Database["public"]["Enums"]["order_status"]
          user_id?: number
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
            foreignKeyName: "order_history_item_user_id_fkey"
            foreignKeyName: "message_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      product: {
        Row: {
          category: string
          condition: string
          created_at: string
          description: string
          id: number
          name: string
          price: number
          quantity: number | null
          seller_id: number
          shipping_price: number
        }
        Insert: {
          category: string
          condition: string
          created_at?: string
          description: string
          id?: number
          name: string
          price: number
          quantity?: number | null
          seller_id: number
          shipping_price: number
        }
        Update: {
          category?: string
          condition?: string
          created_at?: string
          description?: string
          id?: number
          name?: string
          price?: number
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
          created_at: string
          description: string | null
          email: string
          first_name: string
          id: number
          last_name: string
          location: unknown | null
          profile_image_url: string | null
          username: string
        }
        Insert: {
          auth_id?: string
          created_at?: string
          description?: string | null
          email: string
          first_name: string
          id?: number
          last_name: string
          location?: unknown | null
          profile_image_url?: string | null
          username: string
        }
        Update: {
          auth_id?: string
          created_at?: string
          description?: string | null
          email?: string
          first_name?: string
          id?: number
          last_name?: string
          location?: unknown | null
          profile_image_url?: string | null
          username?: string
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
      [_ in never]: never
    }
    Enums: {
      community_post_type: "POST" | "SHOWCASE" | "REVIEW"
      order_status: "PENDING"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
