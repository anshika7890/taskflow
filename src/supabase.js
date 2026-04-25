import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://plfiqfwbdjoubkpyaasd.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsZmlxZndiZGpvdWJrcHlhYXNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxMDg5NjYsImV4cCI6MjA5MjY4NDk2Nn0.2xI777540eJwnpH-o4PmdowKqxvnUb5Ta_1jFLyLFgA";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);