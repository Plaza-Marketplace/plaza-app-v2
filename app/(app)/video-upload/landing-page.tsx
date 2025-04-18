import PressableOpacity from '@/components/Buttons/PressableOpacity';
import PlazaTextInput from '@/components/PlazaTextInput';
import BoldStandardText from '@/components/Texts/BoldStandardText';
import CaptionText from '@/components/Texts/CaptionText';
import PlazaText from '@/components/Texts/PlazaText';
import Footer from '@/components/Footer';
import VideoPreview from '@/components/VideoPreview';
import Color from '@/constants/Color';
import Radius from '@/constants/Radius';
import Spacing from '@/constants/Spacing';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import {
  Alert,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { createVideo } from '@/services/crud/video';
import { useAuth } from '@/contexts/AuthContext';
import useGetUserByAuthId from '@/hooks/queries/useGetUserByAuthId';
import { Formik, FormikProps } from 'formik';
import { useSelectedProducts } from '@/contexts/SelectedProductsContext';
import PlazaHeader from '@/components/PlazaHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import HighlightButton from '@/components/Buttons/HighlightButton';
import { Upload } from '@/components/Icons';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useGetProductsBySellerId } from '@/hooks/queries/useGetProductsBySellerId';
import LinkItemsProduct from '@/components/LinkItemsProduct';
import PlazaButton from '@/components/Buttons/PlazaButton';
import { useRecordedVideo } from '@/contexts/RecordedVideoProvider';
import KeyboardView from '@/components/KeyboardView';

type VideoUploadForm = {
  videoUri: string | null;
  description: string;
};

const LandingPage = () => {
  const { session } = useAuth();
  const { data: user, isLoading } = useGetUserByAuthId(session?.user.id);
  const { selectedProducts, setSelectedProducts } = useSelectedProducts();
  const { recordedVideo } = useRecordedVideo();
  const [tempSelectedProducts, setTempSelectedProducts] = useState<Product[]>(
    []
  );
  const { data: products, error } = useGetProductsBySellerId(user?.id);
  const formRef = useRef<FormikProps<VideoUploadForm>>(
    {} as FormikProps<VideoUploadForm>
  );

  const listItemsModalRef = useRef<BottomSheetModal>(null);
  const snappoints = useMemo(() => ['90%'], []);

  useEffect(() => {
    setTempSelectedProducts(selectedProducts);
  }, [selectedProducts]);

  useEffect(() => {
    if (formRef.current) {
      // If we have a recorded video, set the videoUri in the form
      if (recordedVideo && formRef.current.values.videoUri === null) {
        formRef.current.setFieldValue(
          'videoUri',
          `file://${recordedVideo.path}`
        );
      }
    }
  }, [recordedVideo]);

  const handleSelectProduct = (product: Product) => {
    if (tempSelectedProducts.includes(product)) {
      setTempSelectedProducts(
        tempSelectedProducts.filter((p) => p !== product)
      );
    } else {
      setTempSelectedProducts([...tempSelectedProducts, product]);
    }
  };

  const handleSubmitItems = () => {
    listItemsModalRef.current?.dismiss();
    setSelectedProducts(tempSelectedProducts);
  };

  if (isLoading || !user) return null;

  const initialValues: VideoUploadForm = {
    videoUri: null,
    description: '',
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: Color.GREY_100 }}>
        <PlazaHeader name="Upload a Video" accountForSafeArea={false} />
        <Formik
          innerRef={formRef}
          initialValues={initialValues}
          onSubmit={async (values) => {
            if (!values.videoUri) return;

            const base64Video = await FileSystem.readAsStringAsync(
              values.videoUri,
              {
                encoding: 'base64',
              }
            );

            try {
              await createVideo({
                posterId: user.id,
                description: values.description || null,
                base64Video: base64Video,
                products: selectedProducts,
              });

              router.push('/video-upload/confirmed');
            } catch (e) {
              Alert.alert('Error', 'Failed to upload video. Please try again.');
              console.error('Error uploading video:', e);
            }
          }}
        >
          {({ handleChange, handleSubmit, values }) => {
            const handleSelect = async () => {
              const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['videos'],
                allowsEditing: true,
              });

              if (result.canceled) {
                return;
              }

              const video = result.assets[0];

              handleChange('videoUri')(video.uri);
            };

            return (
              <KeyboardView>
                <View style={styles.container}>
                  {values.videoUri ? (
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <View
                        style={{
                          width: '50%',
                          height: '100%',
                          borderRadius: Radius.LG,
                          overflow: 'hidden',
                        }}
                      >
                        <VideoPreview
                          uri={values.videoUri}
                          onPress={handleSelect}
                        />
                      </View>
                    </View>
                  ) : (
                    <>
                      <HighlightButton
                        title="Select a Video"
                        icon={
                          <Upload
                            color={Color.PRIMARY_DEFAULT}
                            width={24}
                            height={24}
                          />
                        }
                        onPress={handleSelect}
                        style={{ width: '100%' }}
                      />

                      <HighlightButton
                        title="Record a Video"
                        icon={
                          <Upload
                            color={Color.PRIMARY_DEFAULT}
                            width={24}
                            height={24}
                          />
                        }
                        onPress={() => {
                          router.navigate('/video-upload/video-record');
                        }}
                        style={{ width: '100%' }}
                      />
                    </>
                  )}
                  <View style={{ gap: Spacing.SPACING_3 }}>
                    <BoldStandardText>Description</BoldStandardText>
                    <PlazaTextInput
                      onChangeText={handleChange('description')}
                      placeholder="write a caption for your post"
                      multiline
                      style={{ height: 100 }}
                    />
                  </View>
                  <View style={styles.linkItemsContainer}>
                    <BoldStandardText>Link Items</BoldStandardText>
                    <CaptionText>
                      Add at least 1 item from your store to your post.
                    </CaptionText>
                    <View style={styles.iconsContainer}>
                      {selectedProducts.map((product) => (
                        <Image
                          key={product.id}
                          style={styles.iconContainer}
                          source={{ uri: product.imageUrls[0] }}
                        />
                      ))}
                      <PressableOpacity
                        style={styles.iconContainer}
                        onPress={() => {
                          listItemsModalRef.current?.present();
                        }}
                      >
                        <PlazaText>+</PlazaText>
                      </PressableOpacity>
                    </View>
                  </View>
                </View>
                <Footer
                  leftTitle="Save to Drafts"
                  rightTitle="Post Video"
                  rightOnPress={handleSubmit}
                />
              </KeyboardView>
            );
          }}
        </Formik>
        <BottomSheetModal
          ref={listItemsModalRef}
          snapPoints={snappoints}
          backdropComponent={(props) => (
            <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />
          )}
          enableDynamicSizing={false}
        >
          <BottomSheetView style={{ flex: 1, position: 'relative' }}>
            <PlazaHeader
              name="Link Items"
              leftOnClick={() => listItemsModalRef.current?.dismiss()}
              accountForSafeArea={false}
              headerDropdown={false}
            />
            <PlazaButton
              title="Save"
              style={{ position: 'absolute', right: Spacing.SPACING_3 }}
              onPress={handleSubmitItems}
            />
            <FlatList
              numColumns={2}
              data={products}
              renderItem={({ item }) => (
                <LinkItemsProduct
                  product={item}
                  isSelected={tempSelectedProducts.includes(item)}
                  onPress={handleSelectProduct}
                />
              )}
            />
          </BottomSheetView>
        </BottomSheetModal>
      </SafeAreaView>
    </>
  );
};

export default LandingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.SPACING_3,
    gap: Spacing.SPACING_3,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderWidth: 1,
    borderColor: Color.BORDER_SECONDARY,
    borderRadius: Radius.ROUNDED,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkItemsContainer: {
    gap: Spacing.SPACING_2,
  },
  iconsContainer: {
    flexDirection: 'row',
    gap: Spacing.SPACING_2,
  },
});
