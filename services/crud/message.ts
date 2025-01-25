import { CreateMessage, Message } from "@/models/message";
import { supabase } from "@/utils/supabase";

const supabaseToMessage = (data: any): Message => {
  return {
    id: data.id,
    conversationId: data.conversation_id,
    sender: {
      id: data.sender.id,
      username: data.sender.username,
      profileImageUrl: data.sender.profile_image_url,
    },
    content: data.content,
    createdAt: data.created_at,
  }
}

export const createMessage = async (message: CreateMessage): Promise<Message> => {
  const { data, error } = await supabase
    .from('message')
    .insert({
      user_id: message.userId,
      conversation_id: message.conversationId,
      content: message.content,
    })
    .single();

  if (error) {
    throw new Error(
      `The create message query for ${message} failed with exception ${error}`
    );
  }

  return supabaseToMessage(data);
}

export const getMessagesByConversationId = async (conversationId: Id): Promise<Message[]> => {
  const { data, error } = await supabase
    .from('message')
    .select(`
      id,
      conversation_id,
      sender:user_id(
        id,
        username,
        profile_image_url
      ),
      content,
      created_at
    `)
    .eq('conversation_id', conversationId);

  if (error) {
    throw new Error(
      `The get messages query for ${conversationId} failed with exception ${error}`
    );
  }

  return data.map(supabaseToMessage);
}