import AddImage from '@/components/AddImage';
import Footer from '@/components/Footer';
import PlazaTextInput from '@/components/PlazaTextInput';
import Color from '@/constants/Color';
import Spacing from '@/constants/Spacing';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import { createProduct } from '@/services/crud/product';
import useGetUserByAuthId from '@/hooks/queries/useGetUserByAuthId';
import { useAuth } from '@/contexts/AuthContext';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import PlazaHeader from '@/components/PlazaHeader';
import { Image } from 'expo-image';
import IconButton from '@/components/Buttons/IconButton';
import { Upload } from '@/components/Icons';
import {
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import KeyboardView from '@/components/KeyboardView';

type CreateListingForm = {
  title: string;
  // category: string;
  // condition: string;
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
    // category: '',
    // condition: '',
    description: '',
    quantity: 1,
    price: 0,
    shippingPrice: 0,
    location: null,
    imageUris: [],
  };

  return (
    <SafeAreaView style={styles.container}>
      <PlazaHeader name="List a Product" accountForSafeArea={false} />

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
            <KeyboardView>
              <View style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.container}>
                  <View style={{ paddingVertical: Spacing.SPACING_3 }}>
                    <ScrollView
                      horizontal
                      contentContainerStyle={{
                        flexDirection: 'row',
                        gap: Spacing.SPACING_3,
                        paddingHorizontal: Spacing.SPACING_3,
                      }}
                      showsHorizontalScrollIndicator={false}
                      bounces={false}
                    >
                      <IconButton
                        icon={<Upload color={Color.PRIMARY_DEFAULT} />}
                        label={'add'}
                        style={{ width: 100, height: 100 }}
                        onPress={handleAddImage}
                      />
                      <AddImage
                        onPress={() => {}}
                        imageUri={values.imageUris.at(0)}
                      />
                      <AddImage
                        onPress={() => {}}
                        imageUri={values.imageUris.at(1)}
                      />
                      <AddImage
                        onPress={() => {}}
                        imageUri={values.imageUris.at(2)}
                      />
                      <AddImage
                        onPress={() => {}}
                        imageUri={values.imageUris.at(3)}
                      />
                    </ScrollView>
                  </View>

                  <View style={styles.infoContainer}>
                    <View style={styles.inputContainer}>
                      <PlazaTextInput
                        label="Product Name"
                        onChangeText={handleChange('title')}
                        placeholder="example: Cat Mug"
                      />
                    </View>

                    <View style={styles.inputContainer}>
                      <PlazaTextInput
                        label="Description"
                        onChangeText={handleChange('description')}
                        placeholder="example: handmade clay cat mug"
                        style={{ height: 100 }}
                      />
                    </View>
                    <View style={styles.inputContainer}>
                      <PlazaTextInput
                        label="Price"
                        onChangeText={handleChange('price')}
                        placeholder="example: 10.00"
                        keyboardType="numeric"
                        style={{ flex: 1 }}
                      />
                      <PlazaTextInput
                        label="Shipping Price"
                        onChangeText={handleChange('shippingPrice')}
                        placeholder="example: 5.00"
                        keyboardType="numeric"
                        style={{ flex: 1 }}
                      />
                      <PlazaTextInput
                        label="Location"
                        onChangeText={handleChange('location')}
                        placeholder="example: San Francisco, CA"
                        style={{ flex: 1 }}
                      />
                    </View>

                    <View
                      style={[
                        styles.inputContainer,
                        { marginBottom: Spacing.SPACING_3 },
                      ]}
                    >
                      <PlazaTextInput
                        onChangeText={handleChange('quantity')}
                        placeholder="example: 1"
                        keyboardType="numeric"
                      />
                    </View>
                  </View>
                </ScrollView>

                <Footer
                  leftTitle="Save to Drafts"
                  rightTitle="Post Listing"
                  leftOnPress={() => {}}
                  rightOnPress={handleSubmit}
                />
              </View>
            </KeyboardView>
          );
        }}
      </Formik>
    </SafeAreaView>
  );
};

export default CreateListingScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Color.GREY_100,
  },
  infoContainer: {
    gap: Spacing.SPACING_4,
    paddingHorizontal: Spacing.SPACING_3,
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
  inputContainer: {
    gap: Spacing.SPACING_2,
  },
});
