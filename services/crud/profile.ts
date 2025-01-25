import { supabase } from "@/utils/supabase"

export const getAllProfileInformation = async (userId: number) => {
  const { data, error } = await supabase
  .from('user')
  .select(`
    *,
    followers: follow!(source_id, count),
    following: follow!(dest_id, count),
    `)
}