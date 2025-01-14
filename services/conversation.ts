import { supabase } from "@/utils/supabase";

const supabaseToConversation = (data: any): Conversation => {
  return {
    id: data.id,
    name: data.name,
    createdAt: data.created_at,
  }
}

export const createConversation = async (conversation: CreateConversation): Promise<Conversation> => {
  const { data, error } = await supabase
    .from('conversation')
    .insert({
      name: conversation.name,
    })
    .single();

  if (error) {
    throw new Error(
      `The create conversation query for ${conversation} failed with exception ${error}`
    );
  }

  return supabaseToConversation(data);
}

export const createConversationByUserIds = async (conversation:CreateConversation, userIds: Id[]): Promise<Conversation> => {
  const { data:createdConvo, error:convoError } = await supabase
    .from('conversation')
    .insert({
      name: conversation.name,
    })
    .select()
    .single();

  if (convoError) {
    throw new Error(
      `The create conversation query for ${conversation} failed with exception ${convoError}`
    );
  }

  const { error:memberError } = await supabase
    .from('conversation_member')
    .insert(userIds.map(userId => ({
      conversation_id: createdConvo.id,
      user_id: userId,
    })));

  if (memberError) {
    throw new Error(
      `The create conversation member query for ${userIds} failed with exception ${memberError} (failed adding members)`
    );
  }

  return supabaseToConversation(createdConvo);
}

export const getConversation = async (conversationId: Id): Promise<Conversation> => {
  const { data, error } = await supabase
    .from('conversation')
    .select('*')
    .eq('id', conversationId)
    .single();

  if (error) {
    throw new Error(
      `The get conversation query for ${conversationId} failed with exception ${error}`
    );
  }

  return supabaseToConversation(data);
}