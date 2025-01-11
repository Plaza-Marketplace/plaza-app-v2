import { FlatList, StyleSheet, View } from 'react-native';
import FeedBottomSheet from './FeedBottomSheet';
import StandardText from '../Texts/StandardText';
import { SafeAreaView } from 'react-native-safe-area-context';
import PlazaTextInput from '../PlazaTextInput';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { FC } from 'react';
import Color from '@/constants/Color';
import Spacing from '@/constants/Spacing';
import Comment from './Comment';

interface CommentModalProps {
  bottomSheetRef: React.RefObject<BottomSheetModal>;
}

const CommentModal: FC<CommentModalProps> = ({ bottomSheetRef }) => {
  return (
    <FeedBottomSheet bottomSheetRef={bottomSheetRef}>
      <View style={styles.titleContainer}>
        <StandardText>Comments</StandardText>
      </View>
      <FlatList
        data={[0, 1, 2]}
        renderItem={() => <Comment />}
        contentContainerStyle={{
          gap: Spacing.SPACING_3,
          padding: Spacing.SPACING_2,
        }}
      />
      <SafeAreaView style={styles.inputContainer}>
        <PlazaTextInput placeholder="Add a comment..." />
      </SafeAreaView>
    </FeedBottomSheet>
  );
};

export default CommentModal;

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Color.BORDER_SECONDARY,
    paddingVertical: Spacing.SPACING_1,
  },
  inputContainer: {
    paddingHorizontal: Spacing.SPACING_2,
  },
});
