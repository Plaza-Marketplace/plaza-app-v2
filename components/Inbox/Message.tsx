import { FC } from 'react';
import PressableOpacity from '../Buttons/PressableOpacity';
import { StyleSheet, View } from 'react-native';
import BodyText from '../Texts/BodyText';
import { formatDatetime } from '@/utils/datetime';
import { router } from 'expo-router';
import Color from '@/constants/Color';
import Radius from '@/constants/Radius';
import ProfileIcon from '../ProfileIcon';

interface MessageProps {
  senderId: Id;

  profileImageUrl: Url | null;

  content: string;

  createdAt: Timestamp;

  isCurrentUser: boolean;
}

const Message: FC<MessageProps> = ({
  senderId,
  profileImageUrl,
  content,
  createdAt,
  isCurrentUser,
}) => {
  const handlePress = () => {
    router.push({
      pathname: '/profile-modal',
      params: { id: senderId },
    });
  };

  return (
    <View
      style={[
        styles.container,
        { flexDirection: isCurrentUser ? 'row-reverse' : 'row' },
      ]}
    >
      <PressableOpacity onPress={handlePress}>
        <ProfileIcon variant="user" url={profileImageUrl || undefined} />
      </PressableOpacity>
      <View
        style={[
          {
            backgroundColor: isCurrentUser
              ? Color.PRIMARY_DEFAULT
              : Color.NEUTRALS_150,
          },
          styles.content,
        ]}
      >
        <BodyText
          variant="lg"
          color={isCurrentUser ? Color.WHITE : Color.BLACK}
        >
          {content}
        </BodyText>
        <BodyText
          variant="sm"
          color={isCurrentUser ? Color.NEUTRALS_200 : Color.NEUTRALS_DEFAULT}
        >
          {formatDatetime(createdAt)}
        </BodyText>
      </View>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  content: {
    borderRadius: Radius.ROUNDED,
    paddingHorizontal: 12,
    paddingVertical: 8,
    maxWidth: '80%',
  },
});
