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
      product_review: {
        Row: {
          created_at: string
          description: string
          id: number
          product_id: number
          reviewer_id: number
        }
        Insert: {
          created_at?: string
          description: string
          id?: number
          product_id: number
          reviewer_id: number
        }
        Update: {
          created_at?: string
          description?: string
          id?: number
          product_id?: number
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
          reviewer_id: number
          seller_id: number
        }
        Insert: {
          created_at?: string
          description: string
          id?: number
          reviewer_id: number
          seller_id: number
        }
        Update: {
          created_at?: string
          description?: string
          id?: number
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      community_post_type: "POST" | "SHOWCASE" | "REVIEW"
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
