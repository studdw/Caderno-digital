import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env.local file');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

// Types for our database
export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string;
          user_id: string;
          username: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          username: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          username?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      notes: {
              subjects: {
                Row: {
                  id: string;
                  user_id: string;
                  name: string;
                  description: string;
                  icon: string;
                  color: string;
                  created_at: string;
                  updated_at: string;
                };
                Insert: {
                  id?: string;
                  user_id: string;
                  name: string;
                  description?: string;
                  icon?: string;
                  color?: string;
                  created_at?: string;
                  updated_at?: string;
                };
                Update: {
                  id?: string;
                  user_id?: string;
                  name?: string;
                  description?: string;
                  icon?: string;
                  color?: string;
                  created_at?: string;
                  updated_at?: string;
                };
              };
        Row: {
          id: string;
          user_id: string;
          subject_id: string;
          title: string;
          content: string;
          tags: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          subject_id: string;
          title: string;
          content: string;
          tags?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          subject_id?: string;
          title?: string;
          content?: string;
          tags?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};