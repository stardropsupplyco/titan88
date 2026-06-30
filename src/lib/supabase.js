import { createClient } from '@supabase/supabase-js'
const SUPABASE_URL = 'https://ekrqtyokuoeycrkbezmn.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrcnF0eW9rdW9leWNya2Jlem1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2NzgwNzksImV4cCI6MjA5NTI1NDA3OX0.7xxu5_r-TbCLOWWO7le2TSP9O5FZZzhYC7_9Uo50AiQ'
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
