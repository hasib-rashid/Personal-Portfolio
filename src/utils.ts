import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uwyucaypyleqwknagaxh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3eXVjYXlweWxlcXdrbmFnYXhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc1MTQwMzEsImV4cCI6MjAwMzA5MDAzMX0.ylpLq105bwbzYmG_wqlsqHmvATq5sKCBBaiWcLdKHQg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey)