import { ConversationMember, CreateConversationMember } from "@/models/conversationMember";
import { supabase } from "@/utils/supabase";

export const supabaseToConversationMember = (data: any): ConversationMember => {
  return {
    id: data.id,
    conversationId: {
      id: data.conversation.id,
      name: data.conversation.name,
      createdAt: data.conversation.created_at,
    },
    user: {
      id: data.user.id,
      username: data.user.username,
      profileImageUrl: data.user.profile_image_url,
    },
    createdAt: data.created_at,
  };
}

export const createConversationMember = async (conversationMember: CreateConversationMember): Promise<ConversationMember> => {
  const { data, error } = await supabase
    .from('conversation_member')
    .insert({
      conversation_id: conversationMember.conversationId,
      user_id: conversationMember.userId,
    })
    .single();

  if (error) {
    throw new Error(
      `The create conversation member query for ${conversationMember} failed with exception ${error}`
    );
  }

  return supabaseToConversationMember(data);
}

export const getConversationMembersByConversationId = async (conversationId: Id): Promise<ConversationMember[]> => {
  const { data, error } = await supabase
    .from('conversation_member')
    .select(`
      id,
      conversation_id,
      user:user_id(
        id,
        username,
        profile_image_url
      ),
      created_at
    `)
    .eq('conversation_id', conversationId);

  if (error) {
    throw new Error(
      `The get conversation members query for ${conversationId} failed with exception ${error}`
    );
  }

  return data.map(supabaseToConversationMember);
}

export const getConversationMembersByUserId = async (userId: Id): Promise<ConversationMember[]> => {
  const { data, error } = await supabase
    .from('conversation_member')
    .select(`
      id,
      conversation:conversation_id(
        id,
        name,
        created_at  
      ),
      user:user_id(
        id,
        username,
        profile_image_url
      ),
      created_at
    `)
    .eq('user_id', userId);

  if (error) {
    throw new Error(
      `The get conversation members query for ${userId} failed with exception ${error}`
    );
  }

  return data.map(supabaseToConversationMember);
}

export const deleteConversationMember = async (conversationMemberId: Id): Promise<void> => {
  const { error } = await supabase
    .from('conversation_member')
    .delete()
    .eq('id', conversationMemberId);

  if (error) {
    throw new Error(
      `The delete conversation member query for ${conversationMemberId} failed with exception ${error}`
    );
  }
}