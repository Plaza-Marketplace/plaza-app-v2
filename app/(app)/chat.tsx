import Chat from '@/screens/Chat';
import { useLocalSearchParams } from 'expo-router';

const ChatScreen = () => {
  const { conversationId, userId } = useLocalSearchParams<{
    conversationId?: string;
    userId?: string;
  }>();

  return (
    <Chat
      conversationId={conversationId ? parseInt(conversationId) : undefined}
      userId={userId ? parseInt(userId) : undefined}
    />
  );
};

export default ChatScreen;
