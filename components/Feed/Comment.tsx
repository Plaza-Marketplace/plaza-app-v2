import { StyleSheet, View } from 'react-native';
import ProfileIcon from '../ProfileIcon';
import CaptionText from '../Texts/CaptionText';
import StandardText from '../Texts/StandardText';
import Spacing from '@/constants/Spacing';
import { FC } from 'react';

interface CommentProps {
  comment: VideoComment;
}

const Comment: FC<CommentProps> = ({ comment }) => {
  return (
    <View style={styles.container}>
      <ProfileIcon
        variant="user"
        url={comment.poster.profileImageUrl ?? undefined}
      />
      <View style={styles.contentContainer}>
        <View style={styles.infoContainer}>
          <CaptionText>{comment.poster.username}</CaptionText>
          <CaptionText>
            {new Date(comment.createdAt).toLocaleString()}
          </CaptionText>
        </View>
        <StandardText>{comment.description}</StandardText>
      </View>
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: Spacing.SPACING_2,
  },
  infoContainer: {
    flexDirection: 'row',
    gap: Spacing.SPACING_1,
  },
  contentContainer: {
    gap: Spacing.SPACING_1,
  },
});
