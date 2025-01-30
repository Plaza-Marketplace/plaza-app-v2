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