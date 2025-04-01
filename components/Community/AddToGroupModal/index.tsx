import HeadingText from '@/components/Texts/HeadingText';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { FC, RefObject, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useAddToGroupCollection, useGetGroups } from './hooks';
import GroupIcon from '../GroupIcon';
import { Check, Plus } from '@/components/Icons';
import Color from '@/constants/Color';
import PressableOpacity from '@/components/Buttons/PressableOpacity';

interface AddToGroupModalProps {
  productId: Id;
  bottomSheetRef: RefObject<BottomSheetModal>;
}

const AddToGroupModal: FC<AddToGroupModalProps> = ({
  productId,
  bottomSheetRef,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, error } = useGetGroups(productId, isOpen);
  const { mutate: addToGroupCollection } = useAddToGroupCollection(productId);

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      backdropComponent={(props) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />
      )}
      snapPoints={['50%']}
      enableDynamicSizing={false}
      onChange={(index) => {
        if (index === -1) {
          setIsOpen(false);
        } else {
          setIsOpen(true);
        }
      }}
    >
      <BottomSheetView>
        <View style={styles.header}>
          <HeadingText variant="h6-bold">Add to Groups</HeadingText>
        </View>
        <BottomSheetScrollView contentContainerStyle={styles.container}>
          {data?.map((group) => (
            <View key={group.id} style={styles.row}>
              <View style={styles.groupContainer}>
                <GroupIcon
                  id={group.id}
                  size={40}
                  url={group.iconUrl}
                  isPressable={false}
                />
                <HeadingText variant="h6-bold">{group.name}</HeadingText>
              </View>
              <View
                style={{
                  width: 32,
                  height: 32,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 16,
                  backgroundColor: Color.NEUTRALS_200,
                }}
              >
                {group.isInCollection ? (
                  <Check color={Color.NEUTRALS_DEFAULT} />
                ) : (
                  <PressableOpacity
                    onPress={() => addToGroupCollection(group.id)}
                  >
                    <Plus color={Color.NEUTRALS_DEFAULT} />
                  </PressableOpacity>
                )}
              </View>
            </View>
          ))}
        </BottomSheetScrollView>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default AddToGroupModal;

const styles = StyleSheet.create({
  header: {
    alignSelf: 'center',
  },
  container: {
    padding: 16,
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  groupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
