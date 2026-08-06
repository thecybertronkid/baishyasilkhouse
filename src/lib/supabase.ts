import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://gmnynjfiiankinllllgk.supabase.co";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtbnluamZpaWFua2lubGxsbGdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwMDY3MzMsImV4cCI6MjEwMTU4MjczM30.ABoZlHoTHRk_eN-IGuaNbk2k8sfXmotAAF4coM-s0RA";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
