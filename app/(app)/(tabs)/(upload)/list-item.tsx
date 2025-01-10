import AddImage from '@/components/AddImage';
import FocusHeader from '@/components/FocusHeader';
import InfoSection from '@/components/InfoSection';
import PlazaTextInput from '@/components/PlazaTextInput';
import BoldStandardText from '@/components/Texts/BoldStandardText';
import Spacing from '@/constants/Spacing';
import { SafeAreaView, StyleSheet, View } from 'react-native';

const ListItem = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FocusHeader name="List an Item" />
      <View style={styles.container}>
        <View style={{ gap: Spacing.SPACING_3, flexDirection: 'row' }}>
          <AddImage />
          <AddImage />
          <AddImage />
          <AddImage />
        </View>
        <View style={{ gap: Spacing.SPACING_3 }}>
          <BoldStandardText>Description</BoldStandardText>
          <PlazaTextInput
            placeholder="example: handmade clay cat mug"
            style={{ height: 100 }}
          />
        </View>
        <View style={{ gap: Spacing.SPACING_3 }}>
          <BoldStandardText>Information</BoldStandardText>
          <InfoSection title="Category" />
          <InfoSection title="Condition" />
          <InfoSection title="Quantity" description="1" />
          <InfoSection title="Price" description="$0.00" />
        </View>
        <View style={{ gap: Spacing.SPACING_3 }}>
          <BoldStandardText>Shipping</BoldStandardText>
          <InfoSection title="Shipping Price" description="0.00" />
          <InfoSection title="Location" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    gap: Spacing.SPACING_4,
  },
});
