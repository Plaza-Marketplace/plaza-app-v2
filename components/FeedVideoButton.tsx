import Ionicons from '@expo/vector-icons/Ionicons';
import PressableOpacity from './Buttons/PressableOpacity';
import { FC } from 'react';
import BoldCaptionText from './Texts/BoldCaptionText';
import { StyleSheet } from 'react-native';

interface FeedVideoButtonProps {
  name: 'like' | 'review' | 'comment' | 'share';
  count?: number;
  onPress: () => void;
}

const FeedVideoButton: FC<FeedVideoButtonProps> = ({
  name,
  count,
  onPress,
}) => {
  let iconName: 'heart' | 'chatbox' | 'chatbubble' | 'share' = 'heart';
  switch (name) {
    case 'like':
      iconName = 'heart';
      break;
    case 'review':
      iconName = 'chatbox';
      break;
    case 'comment':
      iconName = 'chatbubble';
      break;
    case 'share':
      iconName = 'share';
      break;
  }

  return (
    <PressableOpacity onPress={onPress} style={styles.container}>
      <Ionicons name={iconName} size={40} />
      {count !== null && <BoldCaptionText>{count}</BoldCaptionText>}
    </PressableOpacity>
  );
};

export default FeedVideoButton;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
