import { supabase } from "@/utils/supabase"

type ProfileHeaderData = {
  username: string;
  profileImageUrl: string;
  followerCount: number;
  followingCount: number;
}

const getProfileHeaderData = async (userId: Id, currUserId: Id): Promise<ProfileHeaderData> => {
  const { data, error } = await supabase
  .from('user')
  .select(`
    *,
    followers: follow!id(source_id, count),
    following: follow!id(dest_id, count),
    sales: order_history_item(soldProduct:product!id(seller_id, count))
    `)
    .eq('id', userId)
    .single();
  }