import { StyleSheet, View } from 'react-native';
import ProfileIcon from '../ProfileIcon';
import CaptionText from '../Texts/CaptionText';
import StandardText from '../Texts/StandardText';
import Spacing from '@/constants/Spacing';

const Comment = () => {
  return (
    <View style={styles.container}>
      <ProfileIcon variant="user" />
      <View style={styles.contentContainer}>
        <View style={styles.infoContainer}>
          <CaptionText>Display Name</CaptionText>
          <CaptionText>{new Date().toLocaleDateString()}</CaptionText>
        </View>
        <StandardText>This is a comment from a user</StandardText>
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
