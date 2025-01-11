import FocusHeader from '@/components/FocusHeader';
import LinkItemsProduct from '@/components/LinkItemsProduct';
import Footer from '@/components/Footer';
import { router } from 'expo-router';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LinkItems = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusHeader name="Link Items" />
      <FlatList
        numColumns={2}
        data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
        renderItem={({ item }) => <LinkItemsProduct />}
      />
      <Footer
        leftTitle="Cancel"
        rightTitle="Confirm Items"
        leftOnPress={router.back}
        rightOnPress={() => router.navigate('/video-upload/landing-page')}
      />
    </SafeAreaView>
  );
};

export default LinkItems;
