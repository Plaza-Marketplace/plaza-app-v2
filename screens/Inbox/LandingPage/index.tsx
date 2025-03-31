import { ScrollView, StyleSheet, View } from 'react-native';
import { useGetLandingPage } from './hooks';
import ChatPreview from '@/components/Inbox/ChatPreview';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeadingText from '@/components/Texts/HeadingText';

export const LandingPage = () => {
  const { data, error } = useGetLandingPage();

  const messages = data?.messages ?? [];

  return (
    <SafeAreaView style={styles.container}>
      <HeadingText variant="h6-bold">Inbox</HeadingText>
      <ScrollView>
        {messages.map((message) => (
          <ChatPreview
            key={message.id}
            id={message.id}
            name={message.name}
            imageUrl={message.imageUrl}
            latestMessage={message.latestMessage}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
