import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import HeadingText from '../Texts/HeadingText';
import BodyText from '../Texts/BodyText';
import Color from '@/constants/Color';
import PressableOpacity from '../Buttons/PressableOpacity';
import { router } from 'expo-router';

interface ChatPreviewProps {
  id: Id;

  imageUrl: string | null;

  name: string;

  latestMessage: string;
}

const ChatPreview: FC<ChatPreviewProps> = ({
  id,
  imageUrl,
  name,
  latestMessage,
}) => {
  const handlePress = () => {
    router.push({
      pathname: '/chat',
      params: { conversationId: id },
    });
  };

  return (
    <PressableOpacity style={styles.container} onPress={handlePress}>
      <Image style={styles.image} source={{ uri: imageUrl }} />
      <View style={styles.content}>
        <HeadingText variant="h6">{name}</HeadingText>
        <BodyText variant="md" numberOfLines={1} color={Color.NEUTRALS_DEFAULT}>
          {latestMessage}
        </BodyText>
      </View>
    </PressableOpacity>
  );
};

export default ChatPreview;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  content: {
    gap: 4,
  },
  image: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Color.GREY_200,
  },
});
