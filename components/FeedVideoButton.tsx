import Ionicons from '@expo/vector-icons/Ionicons';
import PressableOpacity from './Buttons/PressableOpacity';
import { FC } from 'react';
import BoldCaptionText from './Texts/BoldCaptionText';
import { StyleSheet, View } from 'react-native';

interface FeedVideoButtonProps {
  name: 'like' | 'review' | 'comment' | 'share';
  count?: number;
  onPress: () => void;
  color?: string;
}

const FeedVideoButton: FC<FeedVideoButtonProps> = ({
  name,
  count,
  onPress,
  color = 'white',
}) => {
  let iconName: 'heart' | 'star' | 'chatbubble' | 'share' = 'heart';
  switch (name) {
    case 'like':
      iconName = 'heart';
      break;
    case 'review':
      iconName = 'star';
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
      <Ionicons
        name={iconName}
        size={40}
        color={color}
        style={styles.iconShadow}
      />
      {count !== null && (
        <BoldCaptionText
          style={{
            color: 'white',
            textShadowColor: 'black',
            textShadowOffset: { width: 0.5, height: 0.5 },
            textShadowRadius: 4,
          }}
        >
          {count}
        </BoldCaptionText>
      )}
    </PressableOpacity>
  );
};

export default FeedVideoButton;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  iconShadow: {
    textShadowColor: 'black',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 6,
  },
});
