import AddImage from '@/components/AddImage';
import FocusHeader from '@/components/FocusHeader';
import Footer from '@/components/Footer';
import InfoSection from '@/components/InfoSection';
import PlazaTextInput from '@/components/PlazaTextInput';
import BoldStandardText from '@/components/Texts/BoldStandardText';
import Color from '@/constants/Color';
import Spacing from '@/constants/Spacing';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Formik } from 'formik';
import { createProduct } from '@/services/product';
import useGetUserByAuthId from '@/hooks/queries/useGetUserByAuthId';
import { useAuth } from '@/contexts/AuthContext';

const CreateListingScreen = () => {
  const { session } = useAuth();
  const { data: user, isLoading, error } = useGetUserByAuthId(session?.user.id);

  if (!user) return null;

  return (
    <SafeAreaView style={styles.container}>
      <FocusHeader name="List an Item" />
      <Formik
        initialValues={{
          title: '',
          category: '',
          condition: '',
          description: '',
          quantity: 1,
          price: 0,
          shippingPrice: 0,
          location: null,
        }}
        onSubmit={(values) => {
          console.log(values.title);
          createProduct({
            sellerId: user.id,
            name: values.title,
            description: values.description,
            category: 'Shirt',
            condition: 'Like New',
            quantity: values.quantity,
            price: values.price,
            shippingPrice: values.price,
            images: [],
          });
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <ScrollView contentContainerStyle={styles.container}>
              <View style={{ gap: Spacing.SPACING_3, flexDirection: 'row' }}>
                <AddImage />
                <AddImage />
                <AddImage />
                <AddImage />
              </View>

              <View style={{ gap: Spacing.SPACING_3 }}>
                <BoldStandardText>Title</BoldStandardText>
                <PlazaTextInput
                  onChangeText={handleChange('title')}
                  placeholder="example: Cat Mug"
                />
              </View>

              <View style={{ gap: Spacing.SPACING_3 }}>
                <BoldStandardText>Description</BoldStandardText>
                <PlazaTextInput
                  onChangeText={handleChange('description')}
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
                <InfoSection title="Shipping Price" description="$0.00" />
                <InfoSection title="Location" />
              </View>
            </ScrollView>

            <Footer
              leftTitle="Save to Drafts"
              rightTitle="Post Listing"
              leftOnPress={() => {}}
              rightOnPress={handleSubmit}
            />
          </KeyboardAvoidingView>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default CreateListingScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    gap: Spacing.SPACING_4,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: Color.BORDER_SECONDARY,
    gap: Spacing.SPACING_2,
    paddingHorizontal: Spacing.SPACING_2,
    paddingTop: Spacing.SPACING_3,
  },
});
