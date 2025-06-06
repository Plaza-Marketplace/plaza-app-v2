import { FlatList, StyleSheet, View } from 'react-native';
import FeedBottomSheet from './FeedBottomSheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PlazaTextInput from '../PlazaTextInput';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { FC, useState } from 'react';
import Color from '@/constants/Color';
import Spacing from '@/constants/Spacing';
import Comment from './Comment';
import useGetCommentsByVideoId from '@/hooks/queries/useGetCommentsByVideoId';
import useCreateVideoComment from '@/hooks/queries/useCreateVideoComment';
import BoldSubheaderText from '../Texts/BoldSubheaderText';
import PressableOpacity from '../Buttons/PressableOpacity';
import { ChevronUp } from '../Icons';
import Radius from '@/constants/Radius';

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
        <BoldSubheaderText>Comments</BoldSubheaderText>
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
          rightButton={
            <PressableOpacity
              onPress={handleSubmit}
              style={{
                backgroundColor: Color.PRIMARY_DEFAULT,
                padding: Spacing.SPACING_1,
                borderRadius: Radius.LG,
              }}
            >
              <ChevronUp color={Color.WHITE} />
            </PressableOpacity>
          }
        />
      </View>
    </FeedBottomSheet>
  );
};

export default CommentModal;

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.SPACING_1,
  },
  inputContainer: {
    paddingHorizontal: Spacing.SPACING_3,
    paddingTop: Spacing.SPACING_3,
    borderTopWidth: 1,
    borderTopColor: Color.BORDER_SECONDARY,
  },
});
