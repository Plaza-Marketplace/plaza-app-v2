import Footer from '@/components/Footer';
import Spacing from '@/constants/Spacing';
import { Alert, SafeAreaView, View } from 'react-native';
import { Formik, FormikProps } from 'formik';
import useGetUserByAuthId from '@/hooks/queries/useGetUserByAuthId';
import { useAuth } from '@/contexts/AuthContext';
import * as FileSystem from 'expo-file-system';
import PlazaHeader from '@/components/PlazaHeader';
import { useEffect, useRef, useState } from 'react';
import { useTakenPhoto } from '@/contexts/TakenPhotoProvider';
import { router } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import {
  CreateListingForm,
  VariantOption,
  VariantsDisplay,
} from '@/screens/Upload/List-Product/schema';
import { styles } from '@/screens/Upload/List-Product/styles';
import Photos from '@/screens/Upload/List-Product/components/Photos';
import ProductInfo from '@/screens/Upload/List-Product/components/ProductInfo';
import Variants from '@/screens/Upload/List-Product/components/Variants';
import VariantValueModal from '@/screens/Upload/List-Product/components/VariantValueModal';
import VariantOptionAddModal from '@/screens/Upload/List-Product/components/VariantOptionAddModal';
import VariantOptionEditModal from '@/screens/Upload/List-Product/components/VariantOptionEditModal';
import * as Yup from 'yup';
import {
  useUploadProduct,
  useUploadProductsWithVariants,
} from '@/hooks/routes/list-item';
import Loading from '@/components/Loading';

const CreateListingSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  isVariantsEnabled: Yup.boolean(),
  quantity: Yup.number().when('isVariantsEnabled', {
    is: false,
    then: (schema) =>
      schema
        .min(1, 'Quantity must be at least 1')
        .required('Quantity is required'),
  }),
  price: Yup.number()
    .min(0, 'Price must be at least 0')
    .required('Price is required'),
  shippingPrice: Yup.number()
    .min(0, 'Shipping price must be at least 0')
    .required('Shipping price is required'),
  imageUris: Yup.array()
    .of(Yup.string())
    .min(1, 'At least one image is required')
    .required('At least one image is required'),
});

const CreateListingScreen = () => {
  const { session } = useAuth();
  const { data: user } = useGetUserByAuthId(session?.user.id);

  const { takenPhoto } = useTakenPhoto();

  const formRef = useRef<FormikProps<CreateListingForm>>(
    {} as FormikProps<CreateListingForm>
  );

  const optionForm = useRef<BottomSheetModal>(null);
  const optionEditForm = useRef<BottomSheetModal>(null);
  const variantValueForm = useRef<BottomSheetModal>(null);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openOptionForm = () => {
    optionForm.current?.present();
  };

  const openVariantValueForm = () => {
    variantValueForm.current?.present();
  };

  const openEditOptionForm = (index: number) => {
    setSelectedIndex(index);
    optionEditForm.current?.present();
  };

  const [variantOptions, setVariantOptions] = useState<VariantOption[]>([]);
  const [variantValues, setVariantValues] = useState<VariantsDisplay[]>([]);

  const initialVariantsRef = useRef({
    variantOptions,
  });

  const variantDirty =
    JSON.stringify(variantOptions) !==
    JSON.stringify(initialVariantsRef.current.variantOptions);

  const { mutate: createProduct, isPending: isUploadProductPending } =
    useUploadProduct();
  const {
    mutate: createProductWithVariants,
    isPending: isUploadProductVariantsPending,
  } = useUploadProductsWithVariants();

  useEffect(() => {
    if (formRef.current) {
      // If we have a recorded video, set the videoUri in the form
      if (takenPhoto) {
        formRef.current.setFieldValue('imageUris', [
          `file://${takenPhoto.path}`,
          ...formRef.current.values.imageUris,
        ]);
      }
    }
  }, [takenPhoto]);

  if (!user) return null;

  const initialValues: CreateListingForm = {
    title: '',
    // category: '',
    // condition: '',
    description: '',
    quantity: 1,
    price: 0,
    shippingPrice: 0,
    imageUris: [],
    isVariantsEnabled: false,
  };

  return (
    <SafeAreaView style={styles.container}>
      <PlazaHeader name="List a Product" accountForSafeArea={false} />

      <Formik
        initialValues={initialValues}
        innerRef={formRef}
        validationSchema={CreateListingSchema}
        onSubmit={async (values) => {
          const base64Images = await Promise.all(
            values.imageUris.map(
              async (imageUri) =>
                await FileSystem.readAsStringAsync(imageUri, {
                  encoding: 'base64',
                })
            )
          );

          try {
            const productSpec = {
              sellerId: user.id,
              name: values.title,
              description: values.description,
              quantity: values.quantity,
              price: values.price,
              shippingPrice: values.price,
              base64Images: base64Images,
              hasVariants: values.isVariantsEnabled,
            };

            if (values.isVariantsEnabled) {
              await createProductWithVariants({
                spec: productSpec,
                options: variantOptions,
                values: variantValues,
              });
            } else {
              await createProduct(productSpec);
            }

            router.push('/list-item/confirmed');
          } catch (e) {
            Alert.alert('Error', 'Failed to create listing. Please try again.');
            console.error(e);
          }
        }}
      >
        {({ handleSubmit, dirty, isValid, values }) => {
          if (isUploadProductPending || isUploadProductVariantsPending) {
            return <Loading />;
          }

          return (
            <View style={{ flex: 1 }}>
              <KeyboardAwareScrollView contentContainerStyle={styles.container}>
                <View style={{ paddingVertical: Spacing.SPACING_3 }}>
                  <Photos />
                </View>

                <View style={styles.infoContainer}>
                  <ProductInfo />

                  <Variants
                    variantOptions={variantOptions}
                    openOptionForm={openOptionForm}
                    openVariantValueForm={openVariantValueForm}
                    openEditOptionForm={openEditOptionForm}
                    setVariantOptions={setVariantOptions}
                  />
                </View>
              </KeyboardAwareScrollView>

              <Footer
                leftTitle="Save to Drafts"
                rightTitle="Post Listing"
                leftOnPress={() => {}}
                rightOnPress={handleSubmit}
                leftDisabled={!(dirty || variantDirty)}
                rightDisabled={
                  !(dirty || variantDirty) ||
                  !isValid ||
                  (variantOptions.length === 0 && values.isVariantsEnabled)
                }
              />
            </View>
          );
        }}
      </Formik>

      <VariantOptionAddModal
        innerRef={optionForm}
        variantOptions={variantOptions}
        setVariantOptions={setVariantOptions}
      />

      <VariantOptionEditModal
        innerRef={optionEditForm}
        variantOptions={variantOptions}
        setVariantOptions={setVariantOptions}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />

      <VariantValueModal
        innerRef={variantValueForm}
        variantOptions={variantOptions}
        variantValues={variantValues}
        setVariantValues={setVariantValues}
      />
    </SafeAreaView>
  );
};

export default CreateListingScreen;
