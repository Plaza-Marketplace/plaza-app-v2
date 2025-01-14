import AddImage from '@/components/AddImage';
import FocusHeader from '@/components/FocusHeader';
import Footer from '@/components/Footer';
import InfoSection from '@/components/InfoSection';
import PlazaTextInput from '@/components/PlazaTextInput';
import BoldStandardText from '@/components/Texts/BoldStandardText';
import Color from '@/constants/Color';
import Spacing from '@/constants/Spacing';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import { createProduct } from '@/services/product';
import useGetUserByAuthId from '@/hooks/queries/useGetUserByAuthId';
import { useAuth } from '@/contexts/AuthContext';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

type CreateListingForm = {
  title: string;
  category: string;
  condition: string;
  description: string;
  quantity: number;
  price: number;
  shippingPrice: number;
  location: string | null;
  imageUris: string[];
};

const CreateListingScreen = () => {
  const { session } = useAuth();
  const { data: user, isLoading, error } = useGetUserByAuthId(session?.user.id);

  if (!user) return null;

  const initialValues: CreateListingForm = {
    title: '',
    category: '',
    condition: '',
    description: '',
    quantity: 1,
    price: 0,
    shippingPrice: 0,
    location: null,
    imageUris: [],
  };

  return (
    <SafeAreaView style={styles.container}>
      <FocusHeader name="List an Item" />

      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          const base64Images = await Promise.all(
            values.imageUris.map(
              async (imageUri) =>
                await FileSystem.readAsStringAsync(imageUri, {
                  encoding: 'base64',
                })
            )
          );

          createProduct({
            sellerId: user.id,
            name: values.title,
            description: values.description,
            category: 'Shirt',
            condition: 'Like New',
            quantity: values.quantity,
            price: values.price,
            shippingPrice: values.price,
            base64Images: base64Images,
          });
        }}
      >
        {({ handleChange, handleSubmit, setFieldValue, values }) => {
          const handleAddImage = async () => {
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ['images'],
              allowsMultipleSelection: true,
              selectionLimit: 4,
            });

            if (result.canceled) return;

            const uris = result.assets.map((asset) => asset.uri);
            setFieldValue('imageUris', uris);
          };

          return (
            <View style={{ flex: 1 }}>
              <ScrollView contentContainerStyle={styles.container}>
                <View style={{ gap: Spacing.SPACING_3, flexDirection: 'row' }}>
                  <AddImage
                    onPress={handleAddImage}
                    imageUri={values.imageUris.at(0)}
                  />
                  <AddImage
                    onPress={handleAddImage}
                    imageUri={values.imageUris.at(1)}
                  />
                  <AddImage
                    onPress={handleAddImage}
                    imageUri={values.imageUris.at(2)}
                  />
                  <AddImage
                    onPress={handleAddImage}
                    imageUri={values.imageUris.at(3)}
                  />
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
            </View>
          );
        }}
      </Formik>
    </SafeAreaView>
  );
};

export default CreateListingScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,

    flexGrow: 1,
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
