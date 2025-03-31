import { supabase } from '@/utils/supabase';
import { LandingPage } from './models';
import { getImagePublicUrl } from '@/services/crud/storage';

export const getLandingPage = async (userId: Id): Promise<LandingPage> => {
  const { data, error } = await supabase
    .from('conversation')
    .select(
      `
        id,
        name,
        conversation_member(
          user_id,
          user (
            username,
            profile_image_key
          )
        ),
        latest_message:message!inner(
          content
        )
      `
    )
    .order('created_at', { referencedTable: 'message', ascending: false })
    .limit(1, { referencedTable: 'message' });

  if (error) {
    throw new Error(error.message);
  }

  return {
    messages: data.map((conversation) => {
      const members = conversation.conversation_member.filter(
        (member) => member.user_id !== userId
      );

      return {
        id: conversation.id,
        imageUrl:
          members.length === 1 && members[0].user.profile_image_key !== null
            ? getImagePublicUrl(members[0].user.profile_image_key)
            : null,
        name:
          members.length === 1 ? members[0].user.username : conversation.name,
        latestMessage: conversation.latest_message[0].content,
      };
    }),
  };
};
