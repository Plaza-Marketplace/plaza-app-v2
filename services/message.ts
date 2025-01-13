import { supabase } from "@/utils/supabase";

const supabaseToMessage = (data: any): Message => {
  return {
    id: data.id,
    senderId: data.sender_id,
    recipientId: data.recipient_id,
    content: data.content,
    createdAt: data.created_at,
  };
}

export const getConversations = async (userId: Id): Promise<Id[]> => {
  const { data, error } = await supabase
    .from('message')
    .select('recipient_id')
    .eq('sender_id', userId)

  if (error) {
    throw new Error(
      `The get conversations query for user ${userId} failed with exception ${error}`
    );
  }

  return data.map((d: any) => d.recipient_id);
}

export const createMessage = async (message: CreateMessage): Promise<Message> => {
  const { data, error } = await supabase
    .from('message')
    .insert({
      sender_id: message.senderId,
      recipient_id: message.recipientId,
      content: message.content,
    })
    .single();

  if (error) {
    throw new Error(
      `The create message query for ${message} failed with exception ${error}`
    );
  } else if (!data) {
    throw new Error(
      `The create message query ${message} failed for unknown reasons`
    );
  }

  return supabaseToMessage(data);
}

export const getMessages = async (senderId: Id, recipientId: Id): Promise<Message[]> => {
  const { data, error } = await supabase
    .from('message')
    .select('*')
    .eq('sender_id', senderId)
    .eq('recipient_id', recipientId);

  if (error) {
    throw new Error(
      `The get messages query for senderId ${senderId} and recipientId ${recipientId} failed with exception ${error}`
    );
  }

  return data.map(supabaseToMessage);
}

export const getMessageChannel = async (senderId: Id, recipientId: Id) => {
  const channel = supabase
  .channel('supabase-realtime')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'message',
      filter: `sender_id=eq.${senderId} and recipient_id=eq.${recipientId}`,
    },
    (payload) => console.log(payload)
  )
  .subscribe()

  return channel
}

