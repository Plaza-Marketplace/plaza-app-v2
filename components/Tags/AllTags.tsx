import { StyleSheet } from 'react-native';
import JewelryTag from './JewelryTag';
import CeramicsTag from './CeramicsTag';
import NeedleworkTag from './NeedleworkTag';
import GlassTag from './GlassTag';
import { ScrollView } from 'react-native-gesture-handler';
import { View } from 'react-native';

const AllTags = () => {
  return (
    <View>
      <ScrollView
        horizontal
        contentContainerStyle={styles.container}
        showsHorizontalScrollIndicator={false}
        bounces={false}
      >
        <JewelryTag />
        <CeramicsTag />
        <NeedleworkTag />
        <GlassTag />
      </ScrollView>
    </View>
  );
};

export default AllTags;

const styles = StyleSheet.create({
  container: {
    gap: 8,
    paddingHorizontal: 16,
  },
});
