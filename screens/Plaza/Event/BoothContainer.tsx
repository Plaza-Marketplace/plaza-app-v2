import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { Event } from './models';
import { FC } from 'react';
import HeadingText from '@/components/Texts/HeadingText';
import { StyleSheet } from 'react-native';
import Booth from './Booth';

interface BoothContainerProps {
  name: string;
  sellers: Event['sellers'];
  fetchNextPage?: () => void;
}

export const BoothContainer: FC<BoothContainerProps> = ({
  name,
  sellers,
  fetchNextPage,
}) => {
  return (
    <BottomSheetFlatList
      data={sellers}
      ListHeaderComponent={<HeadingText variant="h5-bold">{name}</HeadingText>}
      contentContainerStyle={styles.contentContainer}
      renderItem={({ item }) => <Booth seller={item} />}
      onEndReachedThreshold={0.5}
      onEndReached={fetchNextPage}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 16,
    gap: 16,
  },
});
