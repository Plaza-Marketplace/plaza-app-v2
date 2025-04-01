import { supabase } from '@/utils/supabase';
import { ChatScreen } from './models';
import { getImagePublicUrl } from '@/services/crud/storage';

export const getChatScreen = async (
  conversationId: Id,
  userId: Id
): Promise<ChatScreen> => {
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
      message (
        id,
        content,
        created_at,
        user (
          id,
          username,
          profile_image_key
        )
      )
    `
    )
    .eq('id', conversationId)
    .order('created_at', { referencedTable: 'message', ascending: false })
    .single();

  if (error) {
    throw new Error(error.message);
  }

  const members = data.conversation_member.filter(
    (member) => member.user_id !== userId
  );

  return {
    name: members.length === 1 ? members[0].user.username : data.name,
    imageUrl:
      members.length === 1 && members[0].user.profile_image_key !== null
        ? getImagePublicUrl(members[0].user.profile_image_key)
        : null,
    messages: data.message.map((message) => ({
      id: message.id,
      senderId: message.user.id,
      content: message.content,
      createdAt: message.created_at,
      profileImageUrl: message.user.profile_image_key
        ? getImagePublicUrl(message.user.profile_image_key)
        : null,
    })),
    members: data.conversation_member.map((member) => ({
      id: member.user_id,
      username: member.user.username,
      profileImageUrl: member.user.profile_image_key
        ? getImagePublicUrl(member.user.profile_image_key)
        : null,
    })),
  };
};

export const createMessage = async (
  conversationId: Id,
  userId: Id,
  content: string
) => {
  const { error } = await supabase.from('message').insert({
    conversation_id: conversationId,
    user_id: userId,
    content,
  });

  if (error) {
    throw new Error(error.message);
  }
};
