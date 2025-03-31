import Chat from '@/screens/Chat';
import { useLocalSearchParams } from 'expo-router';

const ChatScreen = () => {
  const { conversationId } = useLocalSearchParams<{ conversationId: string }>();

  return <Chat conversationId={parseInt(conversationId)} />;
};

export default ChatScreen;
