import { ScrollView, StyleSheet, View } from 'react-native';
import { useGetLandingPage } from './hooks';
import ChatPreview from '@/components/Inbox/ChatPreview';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeadingText from '@/components/Texts/HeadingText';
import PressableOpacity from '@/components/Buttons/PressableOpacity';
import BodyText from '@/components/Texts/BodyText';
import { router } from 'expo-router';

export const LandingPage = () => {
  const { data, error } = useGetLandingPage();

  const messages = data?.messages ?? [];

  return (
    <SafeAreaView style={styles.container}>
      <HeadingText variant="h6-bold">Inbox</HeadingText>
      <PressableOpacity onPress={() => router.push('/your-orders')}>
        <BodyText variant="md">Your Orders</BodyText>
      </PressableOpacity>
      <PressableOpacity onPress={() => router.push('/your-sales')}>
        <BodyText variant="md">Your Sales</BodyText>
      </PressableOpacity>
      <ScrollView>
        <HeadingText variant="h5-bold">Messages</HeadingText>
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
