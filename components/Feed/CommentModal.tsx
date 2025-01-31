import { FlatList, StyleSheet, View } from 'react-native';
import FeedBottomSheet from './FeedBottomSheet';
import StandardText from '../Texts/StandardText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PlazaTextInput from '../PlazaTextInput';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { FC, useState } from 'react';
import Color from '@/constants/Color';
import Spacing from '@/constants/Spacing';
import Comment from './Comment';
import useGetCommentsByVideoId from '@/hooks/queries/useGetCommentsByVideoId';
import PlazaButton from '../Buttons/PlazaButton';
import useCreateVideoComment from '@/hooks/queries/useCreateVideoComment';

interface CommentModalProps {
  videoId: Id;
  bottomSheetRef: React.RefObject<BottomSheetModal>;
}

const CommentModal: FC<CommentModalProps> = ({ videoId, bottomSheetRef }) => {
  const insets = useSafeAreaInsets();
  const [description, setDescription] = useState('');
  const { data } = useGetCommentsByVideoId(videoId);
  const { mutate: createComment } = useCreateVideoComment(videoId);

  const handleSubmit = () => {
    if (!description) return;

    createComment(description);
  };

  return (
    <FeedBottomSheet bottomSheetRef={bottomSheetRef}>
      <View style={styles.titleContainer}>
        <StandardText>Comments</StandardText>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => <Comment comment={item} />}
        contentContainerStyle={{
          gap: Spacing.SPACING_3,
          padding: Spacing.SPACING_3,
        }}
      />
      <View style={[styles.inputContainer, { paddingBottom: insets.bottom }]}>
        <PlazaTextInput
          placeholder="Add a comment..."
          style={{ flex: 1 }}
          onChangeText={setDescription}
        />
        <PlazaButton title="Send" onPress={handleSubmit} />
      </View>
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
    flexDirection: 'row',
    gap: Spacing.SPACING_2,
    paddingHorizontal: Spacing.SPACING_2,
  },
});
