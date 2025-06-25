import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import HeadingText from '../Texts/HeadingText';
import BodyText from '../Texts/BodyText';
import Color from '@/constants/Color';
import PressableOpacity from '../Buttons/PressableOpacity';
import { router } from 'expo-router';
import ProfileIcon from '../ProfileIcon';

interface ChatPreviewProps {
  id: Id;

  imageUrl: string | null;

  userId: Id;

  name: string;

  latestMessage: string;
}

const ChatPreview: FC<ChatPreviewProps> = ({
  id,
  imageUrl,
  userId,
  name,
  latestMessage,
}) => {
  const handlePress = () => {
    router.push({
      pathname: '/chat',
      params: { userId: userId },
    });
  };

  return (
    <PressableOpacity style={styles.container} onPress={handlePress}>
      <ProfileIcon variant="user" url={imageUrl || undefined} size={52} />
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
});
