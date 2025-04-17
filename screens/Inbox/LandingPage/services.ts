import { supabase } from '@/utils/supabase';
import { LandingPage } from './models';
import { getImagePublicUrl } from '@/services/crud/storage';

export const getLandingPage = async (userId: Id): Promise<LandingPage> => {
  const { data, error } = await supabase
    .from('dm_conversation')
    .select(
      `
        id,
        user1: user!user1_id (
          id,
          username,
          profile_image_key
        ),
        user2: user!user2_id (
          id,
          username,
          profile_image_key
        ),
        latest_message:dm_conversation_message(
          content
        )
      `
    )
    .or(
      `and(user1_id.eq.${userId},user2_id.neq.${userId}),` +
        `and(user2_id.eq.${userId},user1_id.neq.${userId})`
    )
    .order('created_at', {
      referencedTable: 'dm_conversation_message',
      ascending: false,
    })
    .limit(1, { referencedTable: 'dm_conversation_message' });

  if (error) {
    throw new Error(error.message);
  }

  return {
    messages: data.map((dm) => {
      return {
        id: dm.id,
        imageUrl:
          userId === dm.user1.id
            ? dm.user2.profile_image_key
              ? getImagePublicUrl(dm.user2.profile_image_key)
              : null
            : dm.user1.profile_image_key
            ? getImagePublicUrl(dm.user1.profile_image_key)
            : null,
        name: userId === dm.user1.id ? dm.user2.username : dm.user1.username,
        userId: userId === dm.user1.id ? dm.user2.id : dm.user1.id,
        latestMessage:
          dm.latest_message.length > 0 ? dm.latest_message[0].content : '',
      };
    }),
  };
};
