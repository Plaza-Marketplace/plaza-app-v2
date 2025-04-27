import Ionicons from '@expo/vector-icons/Ionicons';
import PressableOpacity from './Buttons/PressableOpacity';
import { FC } from 'react';
import BoldCaptionText from './Texts/BoldCaptionText';
import { StyleSheet, View } from 'react-native';
import {
  Bookmark,
  CollectionAdd,
  Comment,
  HeartActive,
  HeartInactive,
  Review,
} from './Icons';

interface FeedVideoButtonProps {
  name:
    | 'like-inactive'
    | 'like-active'
    | 'review'
    | 'comment'
    | 'bookmark'
    | 'report';
  count?: number;
  onPress: () => void;
  color?: string;
}

const handleName = (name: string) => {
  switch (name) {
    case 'like-inactive':
      return <HeartInactive width={40} height={40} color={'white'} />;
    case 'like-active':
      return <HeartActive width={40} height={40} color={'red'} />;
    case 'review':
      return <Review width={40} height={40} color={'white'} />;
    case 'comment':
      return <Comment width={40} height={40} color={'white'} />;
    case 'bookmark':
      return <Bookmark width={40} height={40} color={'white'} />;
    case 'report':
      return <Ionicons name="flag-outline" size={40} color={'white'} />;
  }
};

const FeedVideoButton: FC<FeedVideoButtonProps> = ({
  name,
  count,
  onPress,
  color = 'white',
}) => {
  // let iconName: 'heart' | 'star' | 'chatbubble' | 'share' = 'heart';

  return (
    <PressableOpacity onPress={onPress} style={styles.container}>
      {handleName(name)}

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
  shadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowRadius: 6,
    shadowOpacity: 0.75,
  },
});
