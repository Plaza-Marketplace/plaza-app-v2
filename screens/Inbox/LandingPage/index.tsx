import { ScrollView, StyleSheet, View } from 'react-native';
import { useGetLandingPage } from './hooks';
import ChatPreview from '@/components/Inbox/ChatPreview';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HeadingText from '@/components/Texts/HeadingText';
import PressableOpacity from '@/components/Buttons/PressableOpacity';
import { router } from 'expo-router';
import { Box, Sales } from '@/components/Icons';
import Color from '@/constants/Color';
import PlazaReference from './PlazaReference';

export const LandingPage = () => {
  const { data, error } = useGetLandingPage();
  const insets = useSafeAreaInsets();

  const messages = data?.messages ?? [];

  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignSelf: 'center', paddingTop: insets.top }}>
        <HeadingText variant="h6-bold">Inbox</HeadingText>
      </View>
      <ScrollView contentContainerStyle={[styles.container, { gap: 16 }]}>
        <View style={styles.rows}>
          <PressableOpacity
            style={styles.row}
            onPress={() => router.push('/your-orders')}
          >
            <View style={styles.circle}>
              <Box color={Color.WHITE} />
            </View>
            <HeadingText variant="h6">Your Orders</HeadingText>
          </PressableOpacity>
          <PressableOpacity
            style={styles.row}
            onPress={() => router.push('/your-sales')}
          >
            <View style={styles.circle}>
              <Sales color={Color.WHITE} />
            </View>
            <HeadingText variant="h6">Your Sales</HeadingText>
          </PressableOpacity>
        </View>

        <View style={{ gap: 16 }}>
          <HeadingText variant="h5-bold">Messages</HeadingText>
          {messages.map((message) => (
            <ChatPreview
              key={message.id}
              id={message.id}
              userId={message.userId}
              name={message.name}
              imageUrl={message.imageUrl}
              latestMessage={message.latestMessage}
            />
          ))}
          <PlazaReference />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  circle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Color.PRIMARY_DEFAULT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rows: {
    gap: 16,
  },
});
