export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      ingredients: {
        Row: {
          id: number
          created_at: string
          ingredient_name: string
          benefit: string | ""
          risks: string | ""
          easily_grown: boolean
          user_id: string
        }
        Insert: {
          id?: number
          created_at?: string
          ingredient_name: string
          benefit: string | ""
          risks?: string | ""
          easily_grown: boolean
          user_id: string
        }
        Update: {
          id?: number
          created_at?: string
          ingredient_name?: string
          benefit?: string | ""
          risks?: string | ""
          easily_grown?: boolean
          user_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
