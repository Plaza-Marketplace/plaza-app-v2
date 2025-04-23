import { supabase } from '@/utils/supabase';
import { ChatScreen } from './models';
import { getImagePublicUrl } from '@/services/crud/storage';

export const getConversationScreen = async (
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
    id: data.id,
    name: members.length === 1 ? members[0].user.username : data.name ?? '',
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

export const createDmMessage = async (
  dmConversationId: Id,
  userId: Id,
  content: string
) => {
  const { error } = await supabase.from('dm_conversation_message').insert({
    dm_conversation_id: dmConversationId,
    user_id: userId,
    content,
  });

  if (error) {
    throw new Error(error.message);
  }
};

export const createFirstMessage = async (
  senderId: Id,
  receiverId: Id,
  content: string
) => {
  const { data: dmConversation, error: dmConversationError } = await supabase
    .from('dm_conversation')
    .insert({
      user1_id: senderId,
      user2_id: receiverId,
    })
    .returns()
    .select('id')
    .single();

  if (dmConversationError) {
    throw new Error(dmConversationError.message);
  }

  const { data: message, error: messageError } = await supabase
    .from('dm_conversation_message')
    .insert({
      dm_conversation_id: dmConversation.id,
      user_id: senderId,
      content,
    })
    .returns()
    .select(
      `
      id,
      content,
      created_at,
      user (
        id,
        profile_image_key
      )
      `
    )
    .single();

  if (messageError) {
    throw new Error(messageError.message);
  }

  return {
    id: dmConversation.id,
    message: {
      id: message.id,
      content: message.content,
      createdAt: message.created_at,
      senderId: message.user.id,
      profileImageUrl: message.user.profile_image_key
        ? getImagePublicUrl(message.user.profile_image_key)
        : null,
    },
  };
};

export const getDirectMessageScreen = async (
  userId: Id,
  currentUserId: Id
): Promise<ChatScreen> => {
  const { data: user, error: userError } = await supabase
    .from('user')
    .select(
      `
      id,
      username,
      profile_image_key
      `
    )
    .eq('id', userId)
    .single();

  if (userError) {
    throw new Error(userError.message);
  }

  const { data, error } = await supabase
    .from('dm_conversation')
    .select(
      `
      id,
      user1: user!user1_id (
        id,
        username,
        profile_image_key,
        block!blocked_id(
          count
        )
      ),
      user2: user!user2_id (
        id,
        username,
        profile_image_key,
        block!blocked_id(
          count
        )
      ),
      dm_conversation_message (
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
    .or(
      `and(user1_id.eq.${userId},user2_id.eq.${currentUserId}),` +
        `and(user1_id.eq.${currentUserId},user2_id.eq.${userId})`
    )
    .eq('user1.block.blocker_id', currentUserId)
    .eq('user2.block.blocker_id', currentUserId)
    .order('created_at', {
      referencedTable: 'dm_conversation_message',
      ascending: false,
    })
    .maybeSingle();
  console.log(data?.user1.block);
  if (error) {
    throw new Error(error.message);
  }

  return {
    id: data ? data.id : null,
    name: user.username,
    members: data
      ? [
          {
            id: data.user1.id,
            username: data.user1.username,
            profileImageUrl: data.user1.profile_image_key
              ? getImagePublicUrl(data.user1.profile_image_key)
              : null,
          },
          {
            id: data.user2.id,
            username: data.user2.username,
            profileImageUrl: data.user2.profile_image_key
              ? getImagePublicUrl(data.user2.profile_image_key)
              : null,
          },
        ]
      : [],
    imageUrl: user.profile_image_key
      ? getImagePublicUrl(user.profile_image_key)
      : null,
    messages: data
      ? data.dm_conversation_message.map((message) => ({
          id: message.id,
          senderId: message.user.id,
          content: message.content,
          createdAt: message.created_at,
          profileImageUrl: message.user.profile_image_key
            ? getImagePublicUrl(message.user.profile_image_key)
            : null,
        }))
      : [],
    isBlocked: data
      ? data.user1.block[0].count > 0
        ? true
        : data.user2.block[0].count > 0
      : false,
  };
};

export const getUserInfo = async (userId: Id) => {
  const { data, error } = await supabase
    .from('user')
    .select(`id, username, profile_image_key`)
    .eq('id', userId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    id: data.id,
    username: data.username,
    profileImageUrl: data.profile_image_key
      ? getImagePublicUrl(data.profile_image_key)
      : null,
  };
};
